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
using Microsoft.Extensions.Logging;

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
      var project = ProjectMapper.ToProject(projectDto, userId);
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
    public async Task DeleteProjectAsync(Project project)
    {
      try
      {
        project.Deleted = true;
        project.DeleteDate = DateTime.Now;
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
      var involvedProjects = _context.Projects.Include(p => p.SoaCategory).Include(p => p.SoaClassification).Include(p => p.ProjectSubjects).Where(p => p.Deleted == false && p.ProjectSubjects.Any(s => s.UserId == userId)).ToList();


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
        var project = _context.Projects
            .Include(p => p.DatiGenerali)
            .Include(p => p.ProjectResourceTeamType)
            .Include(p => p.ConfigNumeri)
            .Include(p => p.Economics)
            .Include(p => p.ElencoPrezzi)
            .Include(p => p.ProjectTasks)
            .Include(p => p.Analisi)
            .FirstOrDefault(p => p.ID == id && p.User.Id == userId);

        if (project == null)
        {
          _logger.LogTrace("Project not found!");
          throw new Exception("Project not found!");
        }

        var vociComputo = _context.VociComputo.Include(v => v.Misure).Include(v => v.ElencoPrezzo).Where(e => e.ProjectID == id);
        var categorie = _context.Categorie.Where(e => e.ProjectID == id);
        var subCategorie = _context.SubCategorie.Where(e => e.ProjectID == id);
        var superCategorie = _context.SuperCategorie.Where(e => e.ProjectID == id);
        var elencoPrezzi = _context.ElencoPrezzi.Where(e => e.ProjectID == id);
        var projectTasks = _context.ProjectTasks.Where(e => e.ProjectId == id);
        var subjects = _context.ProjectSubjects.Include(s => s.User).Include(u => u.User.Company).Include(s => s.ProjectSubjectRole).Where(e => e.ProjectId == id);
        project.VociComputo = vociComputo.ToList();
        project.Categorie = categorie.ToList();
        project.SubCategorie = subCategorie.ToList();
        project.SuperCategorie = superCategorie.ToList();
        project.ProjectSubjects = subjects.ToList();
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
    public async Task HardDeleteProjectAsync(int id, string userId)
    {
      try
      {
        // Recupera il progetto con tutte le entità correlate
        var project = await _context.Projects
            .Include(p => p.ConfigNumeri)
            .Include(p => p.DatiGenerali)
            .Include(p => p.Analisi)
            .Include(p => p.ProjectSubjects)
            .Include(p => p.UserProjectAccesses)
            .Include(p => p.ProjectResourceTeamType)
            .Include(p => p.Economics)
            .FirstOrDefaultAsync(p => p.ID == id);

        var vociComputo = _context.VociComputo.Include(v => v.Misure).Include(v => v.ElencoPrezzo).Where(e => e.ProjectID == id);
        var categorie = _context.Categorie.Where(e => e.ProjectID == id);
        var subCategorie = _context.SubCategorie.Where(e => e.ProjectID == id);
        var superCategorie = _context.SuperCategorie.Where(e => e.ProjectID == id);
        var elencoPrezzi = _context.ElencoPrezzi.Where(e => e.ProjectID == id);
        var projectTasks = _context.ProjectTasks.Where(e => e.ProjectId == id);
        var subjects = _context.ProjectSubjects.Include(s => s.User).Include(u => u.User.Company).Include(s => s.ProjectSubjectRole).Where(e => e.ProjectId == id);
       
        project.VociComputo = vociComputo.ToList();
        project.Categorie = categorie.ToList();
        project.SubCategorie = subCategorie.ToList();
        project.SuperCategorie = superCategorie.ToList();
        project.ProjectSubjects = subjects.ToList();
        project.ProjectTasks = projectTasks.ToList();
        project.ElencoPrezzi = elencoPrezzi.ToList();

        if (project == null)
        {
          _logger.LogTrace("Project not found!");
          throw new Exception("Project not found!");
        }

        if (project.UserId != userId)
        {
          _logger.LogTrace("User Can't delete project!");
          throw new Exception("User Can't delete project!");
        }

        // Rimuovi manualmente tutte le entità correlate
        _context.VociComputo.RemoveRange(project.VociComputo);
        _context.Categorie.RemoveRange(project.Categorie);
        _context.SubCategorie.RemoveRange(project.SubCategorie);
        _context.SuperCategorie.RemoveRange(project.SuperCategorie);
        _context.ElencoPrezzi.RemoveRange(project.ElencoPrezzi);
        _context.ProjectSubjects.RemoveRange(project.ProjectSubjects);
        _context.ProjectTasks.RemoveRange(project.ProjectTasks);
        _context.UserProjectAccess.RemoveRange(project.UserProjectAccesses);

        if (project.ConfigNumeri != null)
        {
          _context.ConfigNumeri.Remove(project.ConfigNumeri);
        }

        if (project.DatiGenerali != null)
        {
          _context.DatiGenerali.Remove(project.DatiGenerali);
        }

        if (project.Analisi != null)
        {
          _context.Analisi.Remove(project.Analisi);
        }

        if (project.ProjectResourceTeamType != null)
        {
          _context.ProjectResourceTeamTypes.Remove(project.ProjectResourceTeamType);
        }

        if (project.Economics != null)
        {
          _context.Economics.Remove(project.Economics);
        }

        // Infine, rimuovi il progetto stesso
        _context.Projects.Remove(project);

        // Salva le modifiche al database
        await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while deleting the Project item.");
        throw new Exception("An error occurred while deleting the Project item.");
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

          // var Test = await reader.ReadLineAsync();

          while (reader.Peek() >= 0)
          {
            sb.Append(await reader.ReadLineAsync());
          }

          res = await _projectServiceManager.ImportProjectDataAsync(sb.ToString(), new Project()
          {
            User = user,
            CreationDate = DateTime.Now,
            LastUpdateDate = DateTime.Now,
            Status = ProjectStatus.Created,
            //ProjectResourceTeamType = new ProjectResourceTeamType()
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
      using var transaction = await _context.Database.BeginTransactionAsync();
      try
      {
        var existingProject = await _context.Projects.Include(p => p.Categorie)
      .Include(p => p.Analisi)
      .Include(p => p.DatiGenerali)
      .Include(p => p.ConfigNumeri)
      .Include(p => p.ProjectSubjects).ThenInclude(p => p.ProjectSubjectRole)
      .Include(p => p.Economics)
      .Include(p => p.ProjectResourceTeamType)
      .Include(p => p.ProjectTasks)
      .FirstOrDefaultAsync(p => p.ID == projectDto.Id);

        if (existingProject == null)
        {
          _logger.LogTrace("Project not found!");
          throw new Exception("Project not found!");
        }
        var vociComputo = _context.VociComputo.Include(v => v.Misure).Include(v => v.ElencoPrezzo).Where(e => e.ProjectID == existingProject.ID);
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
        existingProject = ProjectMapper.ToProject(projectDto, existingProject.UserId, existingProject);
        existingProject.LastUpdateDate = DateTime.Now;

        // Al primo salvataggio metto lo stato a created
        if (existingProject.Status == ProjectStatus.Draft)
        {
          existingProject.Status = ProjectStatus.Created;
        }

        // Aggiorna il database
        _context.Projects.Update(existingProject);
        await _context.SaveChangesAsync();

        // Conferma la transazione
        await transaction.CommitAsync();

        // Ritorna il progetto aggiornato come DTO
        return ProjectMapper.ToProjectDTO(existingProject);
      }
      catch (Exception ex)
      {
        await transaction.RollbackAsync();
        _logger.LogError($"Errore durante l'aggiornamento del progetto: {ex.Message}", ex);
        throw;
      }
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
          _logger.LogDebug("CheckXPWEFile - Try to deserialize xml");
          importedPwe = (PweDocumento)serializer.Deserialize(stringReader);
        }

        wellFormattedXmlCheck.Succeeded = true;
      }
      catch (Exception ex)
      {
        _logger.LogError(ex.Message);
        wellFormattedXmlCheck.Message = "Errore di formattazione " + ex.Message;
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

        if (importedPwe.PweMisurazioni.PweElencoPrezzi[0].Manodopera != null && importedPwe.PweMisurazioni.PweElencoPrezzi[0].Manodopera != 0)
        {
          incidenzaManodoperaCheck.Succeeded = true;
          incidenzaManodoperaCheck.Message = "Incidenza manodopera presente";
        }
        else
        {
          incidenzaManodoperaCheck.Succeeded = false;
          incidenzaManodoperaCheck.Message = "Tag di incidenza manodopera non presente.\r\nSarà necessario inserire un valore di incidenza sezione conto economico della configurazione del progetto.";
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

    /// <inheritdoc/>
    public async Task RestoreProject(int id)
    {
      try
      {
        var project = await _context.Projects.FirstOrDefaultAsync(p => p.ID == id);

        if (project == null)
        {
          throw new Exception("Project not found.");
        }

        project.Deleted = false;
        project.LastUpdateDate = DateTime.UtcNow;

        _context.Projects.Update(project);
        await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while restoring the project.");
        throw new Exception("An error occurred while restoring the project.");
      }
    }

    /// <inheritdoc/>
    public async Task<List<ProjectHeaderDTO>> GetDeletedProjects(string userId)
    {
      try
      {
        // Recupera i progetti eliminati per l'utente specifico
        var deletedProjects = await _context.Projects
            .Include(p => p.SoaCategory)
            .Include(p => p.SoaClassification)
            .Where(p => p.Deleted && p.User.Id == userId)
            .ToListAsync();

        // Mappa i progetti eliminati nel DTO ProjectHeaderDTO
        return deletedProjects.Select(project => _mapper.Map<ProjectHeaderDTO>(project)).ToList();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while retrieving deleted projects.");
        throw new Exception("An error occurred while retrieving deleted projects.", ex);
      }
    }

  }
}
