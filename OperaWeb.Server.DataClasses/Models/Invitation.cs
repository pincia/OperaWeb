using OperaWeb.Server.DataClasses.Models.User;
using OperaWeb.SharedClasses.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OperaWeb.Server.DataClasses.Models
{
  /// <summary>
  /// Represents an invitation to register, associated with a project and the inviting user.
  /// </summary>
  public class Invitation
  {
    /// <summary>
    /// Unique identifier for the invitation.
    /// </summary>
    [Key]
    public int Id { get; set; }

    /// <summary>
    /// First name of the recipient.
    /// </summary>
    [Required]
    [MaxLength(100)]
    public string FirstName { get; set; }

    /// <summary>
    /// Last name of the recipient.
    /// </summary>
    [Required]
    [MaxLength(100)]
    public string LastName { get; set; }

    /// <summary>
    /// Email address of the recipient.
    /// </summary>
    [Required]
    [EmailAddress]
    [MaxLength(255)]
    public string RecipientEmail { get; set; }

    /// <summary>
    /// Unique token associated with the invitation.
    /// </summary>
    [Required]
    [MaxLength(255)]
    public string Token { get; set; }

    /// <summary>
    /// TaxCode 
    /// </summary>
    [Required]
    [MaxLength(20)]
    public string Cf { get; set; }

    /// <summary>
    /// Status of the invitation (e.g., Pending, Accepted, Declined).
    /// </summary>
    [Required]
    public InvitationStatus Status { get; set; } = InvitationStatus.Pending;

    /// <summary>
    /// Date and time when the invitation was sent.
    /// </summary>
    [Required]
    public DateTime SentDate { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Date and time when the invitation was accepted (if applicable).
    /// </summary>
    public DateTime? AcceptedDate { get; set; }

    /// <summary>
    /// Date and time when the invitation was declined (if applicable).
    /// </summary>
    public DateTime? DeclinedDate { get; set; }

    /// <summary>
    /// Indicates whether the invitation has expired.
    /// </summary>
    public bool IsExpired => DateTime.UtcNow > ExpirationDate;

    /// <summary>
    /// Expiration date for the invitation.
    /// </summary>
    [Required]
    public DateTime ExpirationDate { get; set; }

    /// <summary>
    /// Foreign key for the associated project.
    /// </summary>
    [Required]
    public int ProjectId { get; set; }

    /// <summary>
    /// Navigation property for the associated project.
    /// </summary>
    [ForeignKey("ProjectId")]
    public Project Project { get; set; }

    /// <summary>
    /// Foreign key for the user who sent the invitation.
    /// </summary>
    [Required]
    public string InvitedByUserId { get; set; }

    /// <summary>
    /// Navigation property for the user who sent the invitation.
    /// </summary>
    [ForeignKey("InvitedByUserId")]
    public ApplicationUser InvitedByUser { get; set; }
  }
}
