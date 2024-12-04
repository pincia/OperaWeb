using OperaWeb.Server.Models.DTO.Project;
using OperaWeb.Server.DataClasses.Models;
using File = System.IO.File;

namespace OperaWeb.Server.Abstractions
{
  public interface IProjectService
  {
    Task<IEnumerable<Progetto>> GetAllAsync();
    Task<Progetto> GetByIdAsync(int id);
    Task CreateProjectAsync(CreateProjectRequest request);
    Task UpdateProjectAsync(UpdateProjectRequest request);
    Task DeleteProjectAsync(int id);
    Task HardDeleteProjectAsync(int id);
    Task<(bool, string)> ImportNewProject(CreateProjectFromFileRequest request, string username);
  }
}
