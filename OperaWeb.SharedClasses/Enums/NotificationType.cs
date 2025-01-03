using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OperaWeb.SharedClasses.Enums
{
  /// <summary>
  /// Enum per il tipo di notifica
  /// </summary>
  public enum NotificationType
  {
    Info,       // Informazione generica
    Warning,    // Avviso
    Error,      // Errore
    Success,     // Notifica di successo
    ProfileIncomplete,
    CompanyProfileIncomplete
  }
}
