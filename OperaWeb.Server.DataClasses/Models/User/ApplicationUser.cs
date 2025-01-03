using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace OperaWeb.Server.DataClasses.Models.User
{
    public class ApplicationUser : IdentityUser
  {
    /// <summary>
    /// Verification token for user account.
    /// </summary>
    public string? VerificationToken { get; set; }

    /// <summary>
    /// Date when the user was verified.
    /// </summary>
    public DateTime? VerifiedAt { get; set; }

    /// <summary>
    /// Token for password reset.
    /// </summary>
    public string? ResetToken { get; set; }

    /// <summary>
    /// Expiration date for the reset token.
    /// </summary>
    public DateTime? ResetTokenExpiresAt { get; set; }

    /// <summary>
    /// Date when the password was last reset.
    /// </summary>
    public DateTime? PasswordReset { get; set; }

    /// <summary>
    /// ID of the related municipality (optional FK).
    /// </summary>
    public int? ComuneId { get; set; }

    /// <summary>
    /// Relationship with the municipality.
    /// </summary>
    public virtual Comune Comune { get; set; }

    /// <summary>
    /// ID of the related province (optional FK).
    /// </summary>
    public int? ProvinciaId { get; set; }

    /// <summary>
    /// Relationship with the province.
    /// </summary>
    public virtual Provincia Provincia { get; set; }

    /// <summary>
    /// ID of the related sub-role (optional FK).
    /// </summary>
    public int? SubRoleId { get; set; }

    /// <summary>
    /// Relationship with the sub-role.
    /// </summary>
    public virtual SubFigure SubRole { get; set; }

    /// <summary>
    /// First name of the user.
    /// </summary>
    public string? FirstName { get; set; }

    /// <summary>
    /// Last name of the user.
    /// </summary>
    public string? LastName { get; set; }

    /// <summary>
    /// Full name of the user.
    /// </summary>
    public string? FullName { get; set; }

    /// <summary>
    /// Mobile phone number.
    /// </summary>
    public string? MobileNumber { get; set; }

    /// <summary>
    /// Alternate email address.
    /// </summary>
    public string? AlternateEmail { get; set; }

    /// <summary>
    /// Address of the user.
    /// </summary>
    public string? Address { get; set; }

    /// <summary>
    /// City of the user.
    /// </summary>
    public string? City { get; set; }

    /// <summary>
    /// Postal code of the user's address.
    /// </summary>
    public string? PostalCode { get; set; }

    /// <summary>
    /// Country of the user.
    /// </summary>
    public string? Country { get; set; }

    /// <summary>
    /// Tax code of the user.
    /// </summary>
    public string? TaxCode { get; set; }

    /// <summary>
    /// ID of the associated company (optional FK).
    /// </summary>
    public int? CompanyId { get; set; }

    /// <summary>
    /// Relationship with the company.
    /// </summary>
    public virtual Company Company { get; set; }

    /// <summary>
    /// Indicates if the user must change his password.
    /// </summary>
    public bool MustChangePassword { get; set; }

    /// <summary>
    /// Collection of project accesses for the user.
    /// </summary>
    public ICollection<UserProjectAccess> UserProjectAccesses { get; set; }
  }
}
