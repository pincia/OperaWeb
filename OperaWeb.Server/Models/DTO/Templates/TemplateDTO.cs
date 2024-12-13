namespace OperaWeb.Server.Models.DTO.Templates
{
  /// <summary>
  /// DTO Template class
  /// </summary>
  public class TemplateDTO
  {
    public int ID { get; set; }

    public string Nome { get; set; }

    public string Codice { get; set; }

    public string Descrizione { get; set; }

    public string ImagePath { get; set; }

    public string JsonTemplate { get; set; }

  }
}
