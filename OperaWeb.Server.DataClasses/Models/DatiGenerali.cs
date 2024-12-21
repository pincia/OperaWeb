using System.ComponentModel.DataAnnotations.Schema;

namespace OperaWeb.Server.DataClasses.Models
{
  [Table("DatiGenerali")]
  public class DatiGenerali
  {
    public int ID { get; set; }
    public decimal PercPrezzi { get; set; }

    public string Comune { get; set; }

    public string Provincia { get; set; }

    public string Oggetto { get; set; }

    public string Committente { get; set; }

    public string Impresa { get; set; }

    public string ParteOpera { get; set; }

    public int ProjectID { get; set; }
    public virtual Project Project { get; set; }

  }
}
