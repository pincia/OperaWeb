namespace OperaWeb.Server.Models.DTO.Project
{
  public class EntryDTO
  {
    public int Id { get; set; }
    public string Description { get; set; }
    public string Unit { get; set; }
    public decimal Price { get; set; }
    public string Code { get; set; }
    public List<MeasurementDTO> Measurements  { get;set;}
  }
}
