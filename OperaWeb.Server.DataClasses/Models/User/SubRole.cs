
namespace OperaWeb.Server.DataClasses.Models.User
{
  public class SubRole
  {
    public int ID { get; set; }
    public string Name { get; set; } // Es. Muratore, Falegname
  }

  public class UserSubRole
  {
    public string UserId { get; set; }
    public virtual ApplicationUser User { get; set; }

    public int SubRoleId { get; set; }
    public virtual SubRole SubRole { get; set; }
  }
}
