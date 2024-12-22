using System.ComponentModel.DataAnnotations;

namespace OperaWeb.Server.DataClasses.Models
{
  public class ProjectTask
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int Duration { get; set; } //in giorni
    public decimal Progress { get; set; }
    public int? ParentId { get; set; }
    public int ProjectId { get; set; }
    public string? Priority { get; set; } 
    public string? Color { get; set; }
    public string? Type { get; set; }
    // Navigation Properties
    public ProjectTask Parent { get; set; }
    public ICollection<ProjectTask> SubTasks { get; set; }
    public Project Project { get; set; }
  }
}
