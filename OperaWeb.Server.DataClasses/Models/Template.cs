using System.ComponentModel.DataAnnotations.Schema;

namespace OperaWeb.Server.DataClasses.Models
{
  [Table("Templates")]
  public class Template
  {
    public int ID { get; set; }

    public string Nome { get; set; }

    public string Codice { get; set; }

    public string Descrizione { get; set; }

    public string ImagePath { get; set; }

    public string JsonTemplate { get; set; }

  }
}
