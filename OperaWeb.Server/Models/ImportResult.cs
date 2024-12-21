using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.Models.DTO.Project;

public class ImportResult
{
  public bool IsSuccess { get; set; }
  public int? ProjectId { get; set; }
  public Dictionary<string, int> EntitiesImported { get; set; } = new Dictionary<string, int>();
  public List<string> Messages { get; set; } = new List<string>();
  public ProjectDTO ImportedProject { get; set; } 
}
