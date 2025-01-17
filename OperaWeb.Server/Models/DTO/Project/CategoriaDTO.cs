namespace OperaWeb.Server.Models.DTO.Project
{
  public class CategoriaDTO
  {
    public int ID { get; set; }

    public int ExternalID { get; set; }

    public string DesSintetica { get; set; }

    public string DesEstesa { get; set; }

    public DateTime DataInit { get; set; }

    public decimal Durata { get; set; }

    public string CodFase { get; set; }

    public decimal Percentuale { get; set; }

    public string Codice { get; set; }

    public int ProjectID { get; set; }
    public int CAtegoriaID { get; set; }
  }
}