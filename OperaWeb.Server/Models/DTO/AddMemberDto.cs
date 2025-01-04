namespace OperaWeb.Server.Models.DTO
{
  /// <summary>
  /// Modello di richiesta per aggiungere un membro tramite il corpo JSON.
  /// </summary>
  public class AddMemberRequest
  {
    /// <summary>
    /// ID dell'organizzazione a cui aggiungere il membro.
    /// </summary>
    public int OrganizationId { get; set; }

    /// <summary>
    /// Nome del membro.
    /// </summary>
    public string Name { get; set; } 

    /// <summary>
    /// Cognome del membro.
    /// </summary>
    public string LastName { get; set; } // Aggiunto

    /// <summary>
    /// Indirizzo email del membro.
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// Nome del ruolo assegnato al membro.
    /// </summary>
    public string RoleName { get; set; }
  }
}
