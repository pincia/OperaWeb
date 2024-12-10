using AutoMapper;
using OperaWeb.Server.Abstractions;
using OperaWeb.Server.DataClasses;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.DataClasses.Models;
using System.Text;
using OperaWeb.Server.Models.DTO.Project;
using OperaWeb.Server.Services.BLL;
using System.Net.NetworkInformation;
using System.Reflection.PortableExecutable;
using Microsoft.EntityFrameworkCore;
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
    public ProjectService(OperaWebDbContext context, ILogger<ProjectService> logger, IMapper mapper, IConfiguration config)
    {
      _context = context;
      _logger = logger;
      _mapper = mapper;
      _config = config;
      _projectServiceManager = new ProjectServiceManager(_context, _logger);
    }
    public async Task CreateProjectAsync(CreateProjectRequest request)
    {
      try
      {
        var project = _mapper.Map<Progetto>(request);
        project.CreationDate = DateTime.UtcNow;
        project.LastUpdateDate = DateTime.UtcNow;
        _context.Progetti.Add(project);
        await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while creating the Project item.");
        throw new Exception("An error occurred while creating the Project item.");
      }
    }

    public async Task DeleteProjectAsync(int id)
    {
      try
      {
        var project = _context.Progetti.FirstOrDefault(p => p.ID == id);
        if (project == null)
        {
          _logger.LogTrace("Project not found!");
          throw new Exception("Project not found!");
        }
        project.isDeleted = true;
        _context.Progetti.Update(project);
        await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while deleting the Project item.");
        throw new Exception("An error occurred while creating the Project item.");
      }
    }

    public async Task<IEnumerable<Progetto>> GetAllAsync(string userId)
    {
      var projects = _context.Progetti.Where(p => p.isDeleted == false && p.User.Id == userId).ToList();
      if (projects == null)
      {
        throw new Exception(" No Projects found");
      }
      return projects;
    }

    public async Task<Progetto> GetByIdAsync(int id)
    {
      try
      {
        var project = _context.Progetti.Include(p => p.User).FirstOrDefault(p => p.ID == id);
        if (project == null)
        {
          _logger.LogTrace("Project not found!");
          throw new Exception("Project not found!");
        }
        return project;
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while deleting the Project item.");
        throw new Exception("An error occurred while deleting the Project item.");
      }
    }

    public async Task HardDeleteProjectAsync(int id)
    {
      try
      {
        var project = _context.Progetti
          .Include(p => p.File)
          .Include(v=>v.VociComputo)
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
        _context.Progetti.Remove(project);
         await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while deleting the Project item.");
        throw new Exception("An error occurred while creating the Project item.");
      }
    }

    /// <summary>
    /// Import new project from XPV file.
    /// </summary>
    /// <param name="request"></param>
    /// <param name="userId"></param>
    /// <returns></returns>
    public async Task<(bool, string)> ImportNewProject(CreateProjectFromFileRequest request, string userId)
    {
      string fileName = "";
      try
      {
        var uploadedFilePath = _config["OperaWeb:UploadedFilePath"];

        var user = _context.Users.FirstOrDefault(p => p.Id == userId);

        if (user == null)
        {
          return (false, "User not found!");
        }

        if (request.File.Length > 0)
        {
          var existingProject = _context.Progetti.Any(x => x.User == user && x.Name == request.Name);

          if (existingProject)
          {
            return (false, $"Project with name {request.Name} already exists!");
          }
          //var filePath = uploadedFilePath + user.UserName;

          //bool exists = Directory.Exists(filePath);

          //if (!exists)
          //  Directory.CreateDirectory(filePath);

          //fileName = filePath + $"\\{request.Name}.XPVE";

          //using (var stream = System.IO.File.Create(fileName))
          //{
          //  await request.File.CopyToAsync(stream);
          //}

          StringBuilder sb = new StringBuilder();
          using var reader = new StreamReader(request.File.OpenReadStream());

          await reader.ReadLineAsync();

          while (reader.Peek() >= 0)
          {
            sb.Append(await reader.ReadLineAsync());
          }

          _projectServiceManager.ImportData(sb.ToString(), new Progetto()
          {
            Name = request.Name,
            Description = request.Description,
            Address = request.Address,
            City = request.City,
            Country = request.Country,
            ZipCode = request.ZipCode,
            User = user,
            File = new DataClasses.Models.File()
            {
              FileName = fileName,
              User = user
            }
          });


          var res = _context.SaveChanges();
        }

        return (true, "");
      }
      catch (Exception ex)
      {
        if (!string.IsNullOrEmpty(fileName))
        {
          System.IO.File.Delete(fileName);
        }
        return (false, ex.Message);
      }
    }
    
    public async Task UpdateProjectAsync(UpdateProjectRequest request)
    {
      try
      {
        var project = _mapper.Map<Progetto>(request);
        var found = _context.Progetti.Any(p => p.ID == request.ID);
        if (!found)
        {
          _logger.LogTrace("Project not found!");
          throw new Exception("Project not found!");
        }
        _context.Progetti.Update(project);
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
