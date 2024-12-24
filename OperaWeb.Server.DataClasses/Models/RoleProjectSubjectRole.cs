using Microsoft.AspNetCore.Identity;

namespace OperaWeb.Server.DataClasses.Models.User
{
    public class RoleProjectSubjectRole
  {
    public string RoleId { get; set; }
    public virtual IdentityRole Role { get; set; }

    public int ProjectSubjectRoleId { get; set; }
    public virtual ProjectSubjectRole ProjectRole { get; set; }
  }
}
