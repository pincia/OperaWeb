using System.ComponentModel.DataAnnotations;

namespace OperaWeb.Server.Models.DTO
{
    public class VerifyEmailRequest
    {
        [Required]
        public string Token { get; set; }
    }
}
