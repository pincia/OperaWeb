namespace OperaWeb.Server.Models.DTO
{
  public class FileCheckDTO
  {
    /// <summary>
    /// Nome del controllo.
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// Esito del controllo.
    /// </summary>
    public bool Succeeded { get; set; }

    /// <summary>
    /// Messaggio associato al controllo.
    /// </summary>
    public string Message { get; set; }
  }
}
