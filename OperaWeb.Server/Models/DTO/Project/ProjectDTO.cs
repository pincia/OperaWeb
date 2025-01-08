using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.DataClasses;
using System.ComponentModel.DataAnnotations;
using OperaWeb.Server.Models.DTO.Project.ProjectManagement.Models.DTO;

namespace OperaWeb.Server.Models.DTO.Project
{
  public class ProjectDTO
  {
    public int Id { get; set; }
    public string Object { get; set; }
    public string Province { get; set; }
    public string City { get; set; }
    public string Works { get; set; }
    public decimal TotalAmount { get; set; }
    public string? Notes { get; set; }
    public bool Public { get; set; }
    public string? GIG { get; set; }
    public string? CUP { get; set; }
    public string CompleteAddress { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime LastUpdateDate { get; set; }
    public string? UserID { get; set; }
    public int? SoaCategoryId { get; set; }
    public int? SoaClassificationID { get; set; }
    // Lista dei lavori associati al progetto
    public List<JobDTO>? Jobs { get; set; }

    // Lista dei soggetti associati al progetto
    public List<SubjectDTO>? Subjects { get; set; } // Nuova proprietà aggiunta

    public List<ProjectTaskDTO>? Tasks { get; set; }

    public ConfigurationDTO? Configurations { get; set; }

    public EconomicsDTO? Economics { get; set; }


  }
}
