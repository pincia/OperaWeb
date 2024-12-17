using Microsoft.AspNetCore.Identity;
using OperaWeb.Server.DataClasses.Models;

namespace OperaWeb.Server.Models
{
  public class IdentityRoleOrganizationRoleMapping
  {
    public int Id { get; set; }

    public string IdentityRoleId { get; set; } // Chiave esterna verso IdentityRole
    public int OrganizationRoleId { get; set; } // Chiave esterna verso OrganizationRole

    public IdentityRole IdentityRole { get; set; } // Navigazione verso IdentityRole
    public OrganizationRole OrganizationRole { get; set; } // Navigazione verso OrganizationRole
  }

}
