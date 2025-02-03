using OperaWeb.Server.Models.DTO.Project;

namespace OperaWeb.Server.Models.DTO
{
  /// <summary>
  /// DTO per rappresentare una configurazione generica.
  /// </summary>
  public class GeneralConfigurationDTO
  {
    /// <summary>
    /// Configurazione numerica generale.
    /// </summary>
    public ConfigNumeriDTO? ConfigNumeri { get; set; }

    /// <summary>
    /// Configurazione dell'analisi generale.
    /// </summary>
    public ConfigAnalisiDTO? ConfigAnalisi { get; set; }

    /// <summary>
    /// Configurazione del team delle risorse.
    /// </summary>
    public ResourceTeamTypeDTO? ResourceTeamType { get; set; }
  }
}
