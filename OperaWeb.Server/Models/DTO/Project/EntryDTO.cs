namespace OperaWeb.Server.Models.DTO.Project
{
  public class EntryDTO
  {
    public string Id { get; set; }
    public string? Description { get; set; }
    public string? Unit { get; set; }
    public decimal Price { get; set; }
    public int OriginalElencoPrezzoId { get; set; }
    public int OriginalVoceVomputoId { get; set; }
    public string? Code { get; set; }
    public List<MeasurementDTO>? Measurements  { get;set;}
    public int JobType { get; set; }
  }
}
