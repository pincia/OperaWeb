namespace OperaWeb.SharedClasses.Enums
{
  /// <summary>
  /// Enum per rappresentare gli stati di un progetto.
  /// </summary>
  public enum ProjectStatus
  {
    /// <summary>
    /// Progetto appena creato, non ancora iniziato.
    /// </summary>
    Created,

    /// <summary>
    /// Progetto in corso (avviato).
    /// </summary>
    InProgress,

    /// <summary>
    /// Progetto sospeso temporaneamente.
    /// </summary>
    Suspended,

    /// <summary>
    /// Progetto completato con successo.
    /// </summary>
    Completed,

    /// <summary>
    /// Progetto annullato.
    /// </summary>
    Cancelled,

    /// <summary>
    /// Progetto in attesa di approvazione.
    /// </summary>
    PendingApproval,

    /// <summary>
    /// Progetto archiviato.
    /// </summary>
    Archived
  }

}
