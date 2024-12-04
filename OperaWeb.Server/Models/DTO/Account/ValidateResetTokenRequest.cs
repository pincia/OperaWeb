using System.ComponentModel.DataAnnotations;

namespace OperaWeb.Server.Models.DTO.Account
{
    public class ValidateResetTokenRequest
    {
        [Required]
        public string Token { get; set; }
    }
}
