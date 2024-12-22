
using Microsoft.AspNetCore.Identity;
using OperaWeb.Server.DataClasses.Models.User;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class RoleSubRole
{
  public string RoleId { get; set; }
  public virtual IdentityRole Role { get; set; }

  public int SubRoleId { get; set; }
  public virtual SubRole SubRole { get; set; }
}
