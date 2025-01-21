
namespace OperaWeb.Server.Models.DTO.Project
{
  public class ProjectHeaderDTO
  {
    public int ID { get; set; }
    public string Object { get; set; }
    public string Province { get; set; }
    public string City { get; set; }
    public string Works { get; set; }
    public decimal TotalAmount { get; set; }
    public string? Notes { get; set; }
    public bool Public { get; set; }
    public bool Deleted { get; set; }
    public string? GIG { get; set; }
    public string? CUP { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime LastUpdateDate { get; set; }
    public string SoaCategory { get; set; }
    public int SoaCategoryId { get; set; }
    public string SoaClassification { get; set; }
    public int SoaClassificationId { get; set; }
    public int Status { get; set; }
  }
}