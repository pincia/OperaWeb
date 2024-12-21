using OperaWeb.Server.DataClasses.Models;

namespace OperaWeb.Server.Models.DTO.Project
{
  public class VoceComputoDTO
  {
    public int ID;

    public int ElencoPrezzoID { get; set; }

    public decimal Quantita { get; set; }

    public DateTime DataMis { get; set; }

    public int Flags { get; set; }

    public int? SuperCategoriaID;

    public int? CategoriaID;

    public int? SubCategoriaID;

    public List<MisuraDTO> Misure { get; set; }

    public int ProjectID { get; set; }
  }
}