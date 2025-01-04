using OperaWeb.SharedClasses.Enums;

namespace OperaWeb.Server.Models.DTO
{
  /// <summary>
  /// Data Transfer Object per i membri di un'organizzazione.
  /// </summary>
  public class OrganizationMemberDto
  {
    /// <summary>
    /// Identificativo del membro dell'organizzazione.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Nome
    /// </summary>
    public string Name { get; set; }


    /// <summary>
    /// Cognome
    /// </summary>
    public string LastName { get; set; }

    /// <summary>
    /// Indirizzo email del membro.
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// Numero di telefono del membro.
    /// </summary>
    public string PhoneNumber { get; set; }

    /// <summary>
    /// Ruolo del membro all'interno dell'organizzazione.
    /// </summary>
    public string RoleName { get; set; }

    /// <summary>
    /// Indica se il membro è il proprietario dell'organizzazione.
    /// </summary>
    public bool IsOwner { get; set; }

    /// <summary>
    /// Stato del membro all'interno dell'organizzazione (es. Pending, Active, Inactive).
    /// </summary>
    public MemberStatus Status { get; set; }
  }

}
