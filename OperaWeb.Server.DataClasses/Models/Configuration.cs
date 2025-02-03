

using OperaWeb.Server.DataClasses.Models.User;

namespace OperaWeb.Server.DataClasses.Models
{
  public class Configuration
  {
    /// <summary>
    /// Configuration Id
    /// </summary>
    public int Id { get; set; }
    /// <summary>
    /// Analisi id 
    /// </summary>
    public int AnalisiId { get; set; }

    /// <summary>
    /// The Generic Analisi
    /// </summary>
    public virtual Analisi Analisi { get; set; }

    /// <summary>
    /// /Config Numeri id
    /// </summary>
    public int ConfigNumeriId { get; set; }

    /// <summary>
    /// The generic config numeri
    /// </summary>
    public virtual ConfigNumeri ConfigNumeri { get; set; }

    /// <summary>
    /// Project resoure team tyoe id
    /// </summary>
    public int ProjectResourceTeamTypeId { get; set; }

    /// <summary>
    /// The generic resource team type
    /// </summary>
    public virtual ProjectResourceTeamType ProjectResourceTeamType { get; set; }

    /// <summary>
    /// The application user id
    /// </summary>
    public string ApplicationUserId { get; set; }

    /// <summary>
    /// The application user
    /// </summary>
    public virtual ApplicationUser User { get; set; }
  }
}
