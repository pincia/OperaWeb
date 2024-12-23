using AutoMapper;
using OperaWeb.Server.Abstractions;
using OperaWeb.Server.DataClasses;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.DataClasses.Models;
using System.Text;
using OperaWeb.Server.Models.DTO.Project;
using OperaWeb.Server.Services.BLL;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.Models.DTO.Templates;
using Microsoft.AspNetCore.SignalR;
using OperaWeb.Server.Hubs;
using Azure.Identity;
using OperaWeb.Server.Models.Mapper;
using OperaWeb.Server.Models.DTO;

namespace OperaWeb.Server.Services
{
  public class ProjectService : IProjectService
  {
    private readonly OperaWebDbContext _context;
    private readonly ILogger<ProjectService> _logger;
    private readonly IMapper _mapper;
    private readonly IConfiguration _config;
    private ProjectServiceManager _projectServiceManager;

    public ProjectService(OperaWebDbContext context, ILogger<ProjectService> logger, IMapper mapper, IConfiguration config, IHubContext<ImportHub> hubContext)
    {
      _context = context;
      _logger = logger;
      _mapper = mapper;
      _config = config;
      _projectServiceManager = new ProjectServiceManager(_context, _logger, hubContext, mapper);
    }

    /// <inheritdoc/>
    public async Task<int> CreateProjectAsync(CreateProjectRequestDTO request)
    {
      try
      {
        var project = _mapper.Map<Project>(request);
        project.CreationDate = DateTime.UtcNow;
        project.LastUpdateDate = DateTime.UtcNow;
        var newProject = _context.Projects.Add(project);
         await _context.SaveChangesAsync();
        return newProject.Entity.ID;
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while creating the Project item.");
        throw new Exception("An error occurred while creating the Project item.");
      }
    }

    /// <inheritdoc/>
    public async Task DeleteProjectAsync(int id)
    {
      try
      {
        var project = _context.Projects.FirstOrDefault(p => p.ID == id);
        if (project == null)
        {
          _logger.LogTrace("Project not found!");
          throw new Exception("Project not found!");
        }
        project.Deleted = true;
        _context.Projects.Update(project);
        await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while deleting the Project item.");
        throw new Exception("An error occurred while creating the Project item.");
      }
    }

    /// <inheritdoc/>
    public async Task<ProjectsListDTO> GetAllProjects(string userId)
    {
      var myProjects = _context.Projects.Include(p=>p.SoaCategory).Include(p => p.SoaClassification).Where(p => p.Deleted == false && p.User.Id == userId).ToList();
      //TODO: INVOLVED PROJECTS
     // var involvedProjects = _context.Projects.Include(p => p.SoaCategory).Include(p => p.SoaClassification).Where(p => p.Deleted == false && p.User.Id == userId).ToList();

    
      return new ProjectsListDTO()
      {
        MyProjects = myProjects.Select( project =>_mapper.Map<ProjectHeaderDTO>(project)).ToList(),
        InvolvedProjects = new List<ProjectHeaderDTO>()
      };
    }

    /// <inheritdoc/>
    public IEnumerable<TemplateDTO> GetAllTemplates()
    {
      return _context.Templates.Select(t => new TemplateDTO
      {
        Codice = t.Codice,
        Nome = t.Nome,
        ID = t.ID,
        Descrizione = t.Descrizione,
        ImagePath = t.ImagePath,
        JsonTemplate = t.JsonTemplate,  
      }).ToList();
    }

    /// <inheritdoc/>
    public Project GetProjectById(int id, string userId)
    {
      try
      {
        var project = _context.Projects.Include(p => p.Categorie)
            .Include(p => p.DatiGenerali)
          .FirstOrDefault(p => p.ID == id && p.User.Id == userId);
       
        if (project == null)
        {
          _logger.LogTrace("Project not found!");
          throw new Exception("Project not found!");
        }
        
        var vociComputo = _context.VociComputo.Include(v=>v.Misure).Where(e => e.ProjectID == id);
        var categorie = _context.Categorie.Where(e => e.ProjectID == id);
        var subCategorie = _context.SubCategorie.Where(e => e.ProjectID == id);
        var superCategorie = _context.SuperCategorie.Where(e => e.ProjectID == id);
        var elencoPrezzi = _context.ElencoPrezzi.Where(e => e.ProjectID == id);
        var projectTasks = _context.ProjectTasks.Where(e => e.ProjectId == id);
        var configurazioni = _context.ConfigNumeri.FirstOrDefault(e => e.ProjectID == id);
        project.VociComputo = vociComputo.ToList();
        project.Categorie = categorie.ToList();
        project.SubCategorie = subCategorie.ToList();
        project.SuperCategorie = superCategorie.ToList();
        project.ElencoPrezzi = elencoPrezzi.ToList();
        project.ProjectTasks = projectTasks.ToList();
        project.ConfigNumeri = configurazioni;
        return project;
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while retriving the Project item.");
        throw new Exception("An error occurred while retriving the Project item.");
      }
    }

    /// <inheritdoc/>
    public async Task HardDeleteProjectAsync(int id)
    {
      try
      {
        var project = _context.Projects
          .Include(p => p.File)
          .Include(v => v.VociComputo)
          .Include(v => v.Categorie)
          .Include(v => v.SubCategorie)
          .Include(v => v.SuperCategorie)
          .Include(v => v.ConfigNumeri)
          .Include(v => v.DatiGenerali)
          .Include(v => v.ElencoPrezzi)
          .FirstOrDefault(p => p.ID == id);

        if (project == null)
        {
          _logger.LogTrace("Project not found!");
          throw new Exception("Project not found!");
        }
        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while deleting the Project item.");
        throw new Exception("An error occurred while creating the Project item.");
      }
    }

    /// <inheritdoc/>
    public async Task<ImportResult> ImportNewProject(IFormFile file, string userId, string connectionId)
    {
      string fileName = "";
      ImportResult res = null;
      try
      {
        var uploadedFilePath = _config["OperaWeb:UploadedFilePath"];

        var user = _context.Users.FirstOrDefault(p => p.Id == userId);

        if (user == null)
        {
          return new ImportResult() { IsSuccess = false, Messages = { "User not found!" } };
        }

        if (file.Length > 0)
        {
          StringBuilder sb = new StringBuilder();
          using var reader = new StreamReader(file.OpenReadStream());

          await reader.ReadLineAsync();

          while (reader.Peek() >= 0)
          {
            sb.Append(await reader.ReadLineAsync());
          }

          res = await  _projectServiceManager.ImportDataAsync(sb.ToString(), new Project()
          {
            User = user,
            CreationDate = DateTime.Now,
            LastUpdateDate = DateTime.Now,
            File = new DataClasses.Models.File()
            {
              FileName = fileName,
              User = user
            }
          }, connectionId);

        }

        return res;
      }
      catch (Exception ex)
      {
        if (!string.IsNullOrEmpty(fileName))
        {
          System.IO.File.Delete(fileName);
        }
        return new ImportResult() { IsSuccess = false, Messages = {ex.Message} };
      }
    }

    /// <inheritdoc/>
    public async Task<ProjectDTO> UpdateProjectAsync(ProjectDTO projectDto)
    {
      var existingProject = await _context.Projects.Include(p => p.Categorie)
      .Include(p => p.DatiGenerali)
            .FirstOrDefaultAsync(p => p.ID == projectDto.Id);

      if (existingProject == null)
      {
        _logger.LogTrace("Project not found!");
        throw new Exception("Project not found!");
      }
      var vociComputo = _context.VociComputo.Include(v => v.Misure).Where(e => e.ProjectID == existingProject.ID);
      var categorie = _context.Categorie.Where(e => e.ProjectID == existingProject.ID);
      var subCategorie = _context.SubCategorie.Where(e => e.ProjectID == existingProject.ID);
      var superCategorie = _context.SuperCategorie.Where(e => e.ProjectID == existingProject.ID);
      var elencoPrezzi = _context.ElencoPrezzi.Where(e => e.ProjectID == existingProject.ID);
      existingProject.VociComputo = vociComputo.ToList();
      existingProject.Categorie = categorie.ToList();
      existingProject.SubCategorie = subCategorie.ToList();
      existingProject.SuperCategorie = superCategorie.ToList();
      existingProject.ElencoPrezzi = elencoPrezzi.ToList();

   

      // Mappatura dal DTO all'entità
      existingProject = ProjectMapper.ToProject(projectDto,_context.SubjectRoles.ToList(), existingProject);

      // Aggiorna il database
      _context.Projects.Update(existingProject);
      await _context.SaveChangesAsync();

      // Ritorna il progetto aggiornato come DTO
      return _mapper.Map<ProjectDTO>(existingProject);
    }
  }
}
