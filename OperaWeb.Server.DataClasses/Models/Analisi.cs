using OperaWeb.Server.DataClasses.Models.User;
using OperaWeb.SharedClasses.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace OperaWeb.Server.DataClasses.Models
{
  [Table("Analisi")]
  public partial class Analisi
  {
    public int ID { get; set; }
    public decimal SpeseUtili { get; set; }

    public decimal SpeseGenerali { get; set; }

    public decimal UtiliImpresa { get; set; }

    public decimal OneriAccessoriSc { get; set; }

    public decimal ConfQuantita { get; set; }
    public AnalisiMetodi Metodo { get; set; }
    public AnalisiApplicataA ApplicataA { get; set; }
    public virtual Project? Project { get; set; }
    public int? ProjectID { get; set; }
    /// <summary>
    /// Default configuration
    /// </summary>
    public bool IsDefault { get; set; }
  }
}
