
namespace OperaWeb.Server.DataClasses.Models
{
  public class AccessLog
  {
    public int Id { get; set; }
    public string UserId { get; set; } // ID dell'utente autenticato
    public string Username { get; set; } // Nome utente o email
    public string Action { get; set; } // LOGIN, LOGOUT, LOGIN_FAILED
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string IPAddress { get; set; } // Indirizzo IP del client
    public string UserAgent { get; set; } // Dettagli del browser/dispositivo
    public bool Success { get; set; } // Indica se l'accesso è riuscito
  }

}
