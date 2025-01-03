namespace OperaWeb.Server.DataClasses.Models.User
{
    public class UserSubRole
  {
    public string UserId { get; set; }
    public virtual ApplicationUser User { get; set; }

    public int SubRoleId { get; set; }
    public virtual SubFigure SubRole { get; set; }
  }
}
