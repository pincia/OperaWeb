using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.DataClasses.Models.User;
using OperaWeb.SharedClasses.Enums;
namespace OperaWeb.Server.DataClasses.Models
{
    public class OrganizationMember
  {
    public int Id { get; set; }
    public string UserId { get; set; } // Chiave esterna verso ApplicationUser
    public int? RoleId { get; set; } // Ruolo all'interno dell'organizzazione
    public int CompanyId { get; set; } // Riferimento all'azienda (ApplicationUser)
    public bool IsOwner { get; set; }
    public ApplicationUser User { get; set; }
    public OrganizationRole? Role { get; set; }
    public Company Company { get; set; } // Azienda di riferimento
    public MemberStatus Status { get; set; } // Stato del membro
  }

}
