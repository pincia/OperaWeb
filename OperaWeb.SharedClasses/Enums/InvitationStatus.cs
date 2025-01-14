namespace OperaWeb.SharedClasses.Enums
{
  /// <summary>
  /// Represents the status of an invitation.
  /// </summary>
  public enum InvitationStatus
  {
    /// <summary>
    /// The invitation must be sent
    /// </summary>
    ToBeSent,
    /// <summary>
    /// The invitation has been sent and is waiting for a response.
    /// </summary>
    Pending,

    /// <summary>
    /// The invitation has been accepted by the recipient.
    /// </summary>
    Accepted,

    /// <summary>
    /// The invitation has been declined by the recipient.
    /// </summary>
    Declined,

    /// <summary>
    /// The invitation has expired and is no longer valid.
    /// </summary>
    Expired
  }
}
