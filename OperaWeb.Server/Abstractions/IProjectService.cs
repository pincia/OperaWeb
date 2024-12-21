using OperaWeb.Server.Models.DTO.Project;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.Models.DTO.Templates;

namespace OperaWeb.Server.Abstractions
{
  public interface IProjectService
  {
    /// <summary>
    /// Gets all projects
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<IEnumerable<Project>> GetAllProjects(string userId);

    /// <summary>
    /// Get project by id
    /// </summary>
    /// <param name="id"></param>
    /// <param name="userId"></param>
    /// <returns></returns>
    Project GetProjectById(int id, string userId);

    /// <summary>
    /// Creates project
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    Task<int> CreateProjectAsync(CreateProjectRequestDTO request);

    /// <summary>
    /// Update projec
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    Task UpdateProjectAsync(UpdateProjectRequestDTO request);

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
  }
}
