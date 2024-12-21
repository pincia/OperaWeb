namespace OperaWeb.Server.Models.DTO.Project
{
  public class ProjectsListDTO
  {
    public List<ProjectHeaderDTO> MyProjects { get; set; }
    public List<ProjectHeaderDTO> InvolvedProjects { get; set; }
    public ProjectsListDTO()
    {
      MyProjects = new List<ProjectHeaderDTO>();
      InvolvedProjects = new List<ProjectHeaderDTO>();
    }
  }
}
