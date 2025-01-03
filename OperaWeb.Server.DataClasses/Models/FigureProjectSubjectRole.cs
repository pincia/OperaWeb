using Microsoft.AspNetCore.Identity;

namespace OperaWeb.Server.DataClasses.Models.User
{
    public class FigureProjectSubjectRole
  {
    public int FigureId { get; set; }
    public virtual Figure Figure { get; set; }

    public int ProjectSubjectRoleId { get; set; }
    public virtual ProjectSubjectRole ProjectSubjectRole { get; set; }
  }
}
