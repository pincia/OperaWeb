using System.ComponentModel.DataAnnotations;

namespace OperaWeb.Server.Models.DTO
{
    public class ForgotPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
