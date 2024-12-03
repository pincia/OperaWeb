using Microsoft.AspNetCore.Identity;
using System.Diagnostics.CodeAnalysis;
namespace OperaWeb.Server.DataClasses
{
    public class ApplicationUser : IdentityUser
    {
        public string? VerificationToken { get; set; }

        public DateTime? VerifiedAt { get; set; }
        public string? ResetToken { get; set; }

        public DateTime? ResetTokenExpiresAt { get; set; }

        public DateTime? PasswordReset { get; set; }

    }
}
