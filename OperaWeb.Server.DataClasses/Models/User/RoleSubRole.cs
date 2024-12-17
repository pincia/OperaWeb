
using Microsoft.AspNetCore.Identity;
using OperaWeb.Server.DataClasses.Models.User;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class RoleSubRole
{
  [Key, Column(Order = 0)]
  public string RoleId { get; set; }
  public virtual IdentityRole Role { get; set; }

  [Key, Column(Order = 1)]
  public int SubRoleId { get; set; }
  public virtual SubRole SubRole { get; set; }
}
