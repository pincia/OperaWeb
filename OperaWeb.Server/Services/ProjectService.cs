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

namespace OperaWeb.Server.Services
{
  public class ProjectService : IProjectService
  {
    private readonly OperaWebDbContext _context;
    private readonly ILogger<ProjectService> _logger;
    private readonly IMapper _mapper;
    private readonly IConfiguration _config;
    private ProjectServiceManager _projectServiceManager;
    public ProjectService(OperaWebDbContext context, ILogger<ProjectService> logger, IMapper mapper, IConfiguration config)
    {
      _context = context;
      _logger = logger;
      _mapper = mapper;
      _config = config;
      _projectServiceManager = new ProjectServiceManager(_context, _logger);
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
    public async Task<IEnumerable<Project>> GetAllProjects(string userId)
    {
      var projects = _context.Projects.Where(p => p.Deleted == false && p.User.Id == userId).ToList();
      if (projects == null)
      {
        throw new Exception(" No Projects found");
      }
      return projects;
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
        var project = _context.Projects.Include(p => p.User).FirstOrDefault(p => p.ID == id && p.User.Id == userId);
        if (project == null)
        {
          _logger.LogTrace("Project not found!");
          throw new Exception("Project not found!");
        }
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
    public async Task<(int, string)> ImportNewProject(CreateProjectFromFileRequestDTO request, string userId)
    {
      string fileName = "";
      var projectId = -1;
      try
      {
        var uploadedFilePath = _config["OperaWeb:UploadedFilePath"];

        var user = _context.Users.FirstOrDefault(p => p.Id == userId);

        if (user == null)
        {
          return (projectId, "User not found!");
        }

        if (request.File.Length > 0)
        {
          StringBuilder sb = new StringBuilder();
          using var reader = new StreamReader(request.File.OpenReadStream());

          await reader.ReadLineAsync();

          while (reader.Peek() >= 0)
          {
            sb.Append(await reader.ReadLineAsync());
          }

          projectId = _projectServiceManager.ImportData(sb.ToString(), new Project()
          {
            User = user,
            CreationDate = DateTime.Now,
            LastUpdateDate = DateTime.Now,
            File = new DataClasses.Models.File()
            {
              FileName = fileName,
              User = user
            }
          });


          var res = _context.SaveChanges();
        }

        return (projectId, "");
      }
      catch (Exception ex)
      {
        if (!string.IsNullOrEmpty(fileName))
        {
          System.IO.File.Delete(fileName);
        }
        return (projectId, ex.Message);
      }
    }

    /// <inheritdoc/>
    public async Task UpdateProjectAsync(UpdateProjectRequestDTO request)
    {
      try
      {
        var project = _mapper.Map<Project>(request);
        var found = _context.Projects.Any(p => p.ID == request.ID);
        if (!found)
        {
          _logger.LogTrace("Project not found!");
          throw new Exception("Project not found!");
        }
        _context.Projects.Update(project);
        await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while updating the Project item.");
        throw new Exception("An error occurred while updating the Project item.");
      }
    }
  }
}
