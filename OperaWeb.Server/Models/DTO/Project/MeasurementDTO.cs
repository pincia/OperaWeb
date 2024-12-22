namespace OperaWeb.Server.Models.DTO.Project
{
  public class MeasurementDTO
  {
    public int Id { get; set; }
    public string? Description { get; set; }
    public decimal Larghezza { get; set; }
    public decimal Lunghezza { get; set; }
    public decimal HPeso { get; set; }
    public decimal Quantita { get; set; }
  }
}