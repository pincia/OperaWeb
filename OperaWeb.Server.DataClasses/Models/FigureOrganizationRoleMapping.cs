using Microsoft.AspNetCore.Identity;
using OperaWeb.Server.DataClasses.Models;

namespace OperaWeb.Server.Models
{
  public class FigureOrganizationRoleMapping
  {
    public int Id { get; set; }

    public int FigureId { get; set; } // Chiave esterna verso Figure
    public int OrganizationRoleId { get; set; } // Chiave esterna verso OrganizationRole

    public Figure Figure { get; set; } // Navigazione verso Figure
    public OrganizationRole OrganizationRole { get; set; } // Navigazione verso OrganizationRole
  }

}
