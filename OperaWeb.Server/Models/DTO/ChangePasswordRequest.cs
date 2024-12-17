namespace OperaWeb.Server.Models.DTO
{
    public class ChangePasswordRequest
    {
      /// <summary>
      /// La vecchia password dell'utente.
      /// </summary>
      public string OldPassword { get; set; } = string.Empty;

      /// <summary>
      /// La nuova password desiderata dall'utente.
      /// </summary>
      public string NewPassword { get; set; } = string.Empty;
    }
  }
