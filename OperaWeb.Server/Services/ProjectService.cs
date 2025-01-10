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
using OperaWeb.Server.DataClasses.Models.User;
using Services.UserGroup;
using OperaWeb.SharedClasses.Enums;
using OperaWeb.Server.Models.XPVE;
using System.Xml.Serialization;
using OperaWeb.SharedClasses.Helpers;
using System.Linq.Expressions;

namespace OperaWeb.Server.Services
{
  public class ProjectService : IProjectService
  {
    private readonly OperaWebDbContext _context;
    private readonly ILogger<ProjectService> _logger;
    private readonly IMapper _mapper;
    private readonly IConfiguration _config;
    private ProjectServiceManager _projectServiceManager;
    private readonly UserService _userService;

    public ProjectService(OperaWebDbContext context, ILogger<ProjectService> logger, IMapper mapper, IConfiguration config, IHubContext<ImportHub> hubContext, UserService userService)
    {
      _userService = userService;
      _context = context;
      _logger = logger;
      _mapper = mapper;
      _config = config;
      _projectServiceManager = new ProjectServiceManager(_context, _logger, hubContext, mapper);
    }

    /// <summary>
    /// Crea un nuovo progetto nel database.
    /// </summary>
    /// <param name="projectDto"></param>
    /// <param name="userId"></param>
    /// <returns></returns>
    public async Task<int> CreateProjectAsync(ProjectDTO projectDto, string userId)
    {
      var user = await _userService.GetUserByIdAsync(userId);
      // Mappa i dati del DTO al modello del database
      var project = ProjectMapper.ToProject(projectDto);

      project.UserId = userId;
      project.DatiGenerali.Committente = user.Company.Name ?? user.FirstName + user.LastName;
      project.CreationDate = DateTime.Now;
      project.LastUpdateDate = DateTime.Now;
      // Aggiungi il progetto al database
      _context.Projects.Add(project);
      await _context.SaveChangesAsync();

      // Restituisci l'ID del nuovo progetto
      return project.ID;
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
      var myProjects = _context.Projects.Include(p => p.SoaCategory).Include(p => p.SoaClassification).Where(p => p.Deleted == false && p.User.Id == userId).ToList();
      //TODO: INVOLVED PROJECTS
      // var involvedProjects = _context.Projects.Include(p => p.SoaCategory).Include(p => p.SoaClassification).Where(p => p.Deleted == false && p.User.Id == userId).ToList();


      return new ProjectsListDTO()
      {
        MyProjects = myProjects.Select(project => _mapper.Map<ProjectHeaderDTO>(project)).ToList(),
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
    public async Task<Project> GetProjectById(int id, string userId)
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

        var vociComputo = _context.VociComputo.Include(v => v.Misure).Where(e => e.ProjectID == id);
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
        await UpdateRecentProjectAsync(userId, id);
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

    // Recupera i 5 progetti recenti per un utente
    public async Task<List<ProjectHeaderDTO>> GetRecentProjectsAsync(string userId)
    {
      var recentProjects = await _context.UserProjectAccess
          .Where(rp => rp.UserId == userId && !rp.Project.Deleted)
          .OrderByDescending(rp => rp.LastAccessed)
          .Take(5)
          .Select(rp => rp.Project)
          .ToListAsync();

      return recentProjects.Select(project => _mapper.Map<ProjectHeaderDTO>(project)).ToList();
    }

    // Aggiorna il progetto recente per un utente
    public async Task UpdateRecentProjectAsync(string userId, int projectId)
    {
      // Verifica se esiste già un record per questo progetto e utente
      var existingEntry = _context.UserProjectAccess.FirstOrDefault(rp => rp.UserId == userId && rp.ProjectId == projectId);

      if (existingEntry != null)
      {
        // Aggiorna la data di accesso
        existingEntry.LastAccessed = DateTime.UtcNow;
      }
      else
      {
        // Aggiungi un nuovo record
        var recentProject = new UserProjectAccess
        {
          UserId = userId,
          ProjectId = projectId,
          LastAccessed = DateTime.UtcNow
        };

        _context.UserProjectAccess.Add(recentProject);

        // Verifica se ci sono più di 10 progetti recenti
        var userProjects = await _context.UserProjectAccess
               .Where(rp => rp.UserId == userId)
               .OrderByDescending(rp => rp.LastAccessed)
               .ToListAsync();

        if (userProjects.Count > 10)
        {
          var projectsToRemove = userProjects.Skip(10).ToList();
          _context.UserProjectAccess.RemoveRange(projectsToRemove);
        }

      }

      // Salva le modifiche al database
      await _context.SaveChangesAsync();
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

          res = await _projectServiceManager.ImportDataAsync(sb.ToString(), new Project()
          {
            User = user,
            CreationDate = DateTime.Now,
            LastUpdateDate = DateTime.Now,
            Status = ProjectStatus.Created,
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
        return new ImportResult() { IsSuccess = false, Messages = { ex.Message } };
      }
    }

    /// <inheritdoc/>
    public async Task<ProjectDTO> UpdateProjectAsync(ProjectDTO projectDto)
    {
      var existingProject = await _context.Projects.Include(p => p.Categorie)
      .Include(p => p.Analisi)
      .Include(p => p.DatiGenerali)
      .Include(p => p.ConfigNumeri)
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
      existingProject = ProjectMapper.ToProject(projectDto, existingProject);
      existingProject.LastUpdateDate = DateTime.Now;

      // Aggiorna il database
      _context.Projects.Update(existingProject);
      await _context.SaveChangesAsync();

      // Ritorna il progetto aggiornato come DTO
      return _mapper.Map<ProjectDTO>(existingProject);
    }

    /// <summary>
    /// XPWE file checks
    /// </summary>
    /// <param name="file"></param>
    /// <returns></returns>
    public async Task<FileCheckResponseDTO> CheckXPWEFile(IFormFile file)
    {
      var result = new FileCheckResponseDTO() { CanBeImported = true, Checks = new List<FileCheckDTO>() };
      PweDocumento importedPwe = null;

      var wellFormattedXmlCheck = new FileCheckDTO
      {
        Name = "Formattazione File",
        Message = "Il file XML è correttamente formattato"
      };

      try
      {
        using var reader = new StreamReader(file.OpenReadStream());
        var xmlString = await reader.ReadToEndAsync();

        using (var stringReader = new StringReader(StringHelper.RemoveInvalidXmlChars(xmlString)))
        {
          var serializer = new XmlSerializer(typeof(PweDocumento));
          importedPwe = (PweDocumento)serializer.Deserialize(stringReader);
        }

        wellFormattedXmlCheck.Succeeded = true;
      }
      catch (Exception ex)
      {
        wellFormattedXmlCheck.Message = "Errore di formattazione";
        wellFormattedXmlCheck.Succeeded = false;
        result.CanBeImported = false;
        return result;
      }
      finally
      {
        result.Checks.Add(wellFormattedXmlCheck);
      }

      try
      {
        var incidenzaManodoperaCheck = new FileCheckDTO
        {
          Name = "Check incidenza manodopera",
        };

        if (importedPwe.PweMisurazioni.PweElencoPrezzi[0].Manodopera != null)
        {
          incidenzaManodoperaCheck.Succeeded = true;
          incidenzaManodoperaCheck.Message = "Incidenza manodopera presente";
        }
        else
        {
          incidenzaManodoperaCheck.Succeeded = false;
          incidenzaManodoperaCheck.Message = "Tag di incidenza manodopera non presente.\r\nSarà necessario inserire un avlore di incidenza medio nella successiva configurazione del progetto.";
        }
        result.Checks.Add(incidenzaManodoperaCheck);

        return result;
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Errore durante il controllo dell'incidenza manodopera");
        result.Checks.Add(new FileCheckDTO
        {
          Name = "Check Incidenza Manodopera",
          Succeeded = false,
          Message = $"Errore durante il controllo dell'incidenza manodopera: {ex.Message}"
        });
        return result;
      }
    }
  }
}
