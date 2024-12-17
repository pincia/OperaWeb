namespace OperaWeb.Server.DataClasses.Models
{
  public class Comune
  {
    public int Id { get; set; } // Primary key
    public string Nome { get; set; } // Nome del comune
    public int ProvinciaId { get; set; } // Foreign key verso Provincia
    public virtual Provincia Provincia { get; set; } // Relazione con Provincia
    public string SiglaProvincia { get; internal set; }
  }
}
