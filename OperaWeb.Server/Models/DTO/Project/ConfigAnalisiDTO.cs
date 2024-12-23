using OperaWeb.SharedClasses.Enums;

namespace OperaWeb.Server.Models.DTO.Project
{
  public class ConfigAnalisiDTO
  {
    public decimal SpeseUtili { get; set; }

    public decimal SpeseGenerali { get; set; }

    public decimal UtiliImpresa { get; set; }

    public decimal OneriAccessoriSc { get; set; }

    public decimal ConfQuantita { get; set; }
    public AnalisiApplicataA ApplicataA { get; set; }
    public AnalisiMetodi Metodo { get; set; }
  }
}