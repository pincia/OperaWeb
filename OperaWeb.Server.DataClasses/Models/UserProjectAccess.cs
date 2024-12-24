using OperaWeb.Server.DataClasses.Models.User;

namespace OperaWeb.Server.DataClasses.Models
{
  public class UserProjectAccess
  {
    public int Id { get; set; } // Chiave primaria
    public string UserId { get; set; } // ID dell'utente
    public int ProjectId { get; set; } // ID del progetto
    public DateTime LastAccessed { get; set; } // Ultima data di accesso

    // Relazioni
    public ApplicationUser User { get; set; } // Navigazione all'utente
    public Project Project { get; set; } // Navigazione al progetto
  }

}
