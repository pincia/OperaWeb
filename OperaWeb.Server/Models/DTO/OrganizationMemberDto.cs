namespace OperaWeb.Server.Models.DTO
{
  public class OrganizationMemberDto
  {
    public int MemberId { get; set; } // ID del membro nell'organigramma
    public string FullName { get; set; } // Nome completo dell'utente
    public string Email { get; set; } // Email dell'utente
    public string RoleName { get; set; } // Nome del ruolo assegnato
    public string OrganizationName { get; set; } // Nome dell'organizzazione/azienda
    public DateTime DateAdded { get; set; } // Data di aggiunta nell'organigramma
  }
}
