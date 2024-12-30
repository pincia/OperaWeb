using OperaWeb.Server.Models.DTO.Project;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.Models.DTO.Templates;
using Task = System.Threading.Tasks.Task;

namespace OperaWeb.Server.Abstractions
{
  public interface IProjectService
  {
    /// <summary>
    /// Creates new project in DB
    /// </summary>
    /// <param name="projectDto"></param>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<int> CreateProjectAsync(ProjectDTO projectDto, string userId);

    /// <summary>
    /// Gets all projects
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<ProjectsListDTO> GetAllProjects(string userId);

    /// <summary>
    /// Get project by id
    /// </summary>
    /// <param name="id"></param>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<Project> GetProjectById(int id, string userId);

    /// <summary>
    /// Update projec
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    Task<ProjectDTO> UpdateProjectAsync(ProjectDTO request);

    /// <summary>
    /// Delete project
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task DeleteProjectAsync(int id);
    

    /// <summary>
    /// Hard delete project
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task HardDeleteProjectAsync(int id);

    /// <summary>
    /// Import project from XPWE
    /// </summary>
    /// <param name="file"></param>
    /// <param name="userId"></param>
    /// <param name="connectionId"></param>
    /// <returns></returns>
    Task<ImportResult> ImportNewProject(IFormFile file, string userId,string connectionId);

    /// <summary>
    /// Gets all templates
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    IEnumerable<TemplateDTO> GetAllTemplates();
    /// <summary>
    /// Get recent projects
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<List<ProjectHeaderDTO>> GetRecentProjectsAsync(string userId);
    /// <summary>
    /// Update recent projects
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="projectId"></param>
    /// <returns></returns>
    Task UpdateRecentProjectAsync(string userId, int projectId);
  }
}
