using OperaWeb.Server.DataClasses.Models;

namespace OperaWeb.Server.Models.DTO.Project
{
  public class MisuraDTO
  {
    public int ID { get; set; }
    public int IDVV { get; set; }

    public string Descrizione { get; set; }

    public string? PartiUguali { get; set; }

    public decimal? Lunghezza { get; set; }

    public decimal? Larghezza { get; set; }

    public decimal? HPeso { get; set; }

    public decimal? Quantita { get; set; }

    public int Flags { get; set; }

    public int VoceComputoID { get; set; }
  }
}