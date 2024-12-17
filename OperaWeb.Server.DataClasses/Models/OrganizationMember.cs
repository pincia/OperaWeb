using OperaWeb.Server.DataClasses;
using OperaWeb.Server.DataClasses.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.AspNetCore.Identity
{
  public class OrganizationMember
  {
    public int Id { get; set; }
    public string UserId { get; set; } // Chiave esterna verso ApplicationUser
    public int RoleId { get; set; } // Ruolo all'interno dell'organizzazione
    public string OrganizationId { get; set; } // Riferimento all'azienda (ApplicationUser)

    public ApplicationUser User { get; set; }
    public OrganizationRole Role { get; set; }
    public ApplicationUser Organization { get; set; } // Azienda di riferimento
  }

}
