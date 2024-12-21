using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.DataClasses;
using System.ComponentModel.DataAnnotations;

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
    public DateTime CreationDate { get; set; }
    public DateTime LastUpdateDate { get; set; }
    public string UserID { get; set; }
    public int SoaCategorId { get; set; }
    public int SoaClassificationID { get; set; }
    public List<JobDTO> Jobs { get; set; }
  }
}