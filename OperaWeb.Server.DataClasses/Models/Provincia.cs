
namespace OperaWeb.Server.DataClasses.Models
{
  public class Provincia
  {
    public int Id { get; set; } // Primary key
    public string Nome { get; set; } // Nome della provincia
    public string Sigla { get; set; } // Sigla (es. MI, RM)
    public virtual ICollection<Comune> Comuni { get; set; } // Relazione con i comuni
  }
}
