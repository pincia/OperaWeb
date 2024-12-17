using OperaWeb.Server.Models.DTO;
using OperaWeb.Server.DataClasses;
using Azure.Core;

namespace Services.UserGroup
{
    public class UserLoginRequest
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }
    public class UserLoginResponse
    {
        public string AccessToken { get; set; } = "";
        public string RefreshToken { get; set; } = "";
        public User User { get; set; }
    }
    public partial class UserService
    {
    public async Task<AppResponse<UserLoginResponse>> UserLoginAsync(UserLoginRequest request)
    {
      _logger.LogInformation("[UserLoginAsync] START for Email: {Email}", request.Email);

      // Trova l'utente per email
      var user = await _userManager.FindByEmailAsync(request.Email);
      if (user == null)
      {
        _logger.LogWarning("[UserLoginAsync] User not found for Email: {Email}", request.Email);
        return new AppResponse<UserLoginResponse>().SetErrorResponse("email", "Email not found");
      }

      // Controlla la password
      var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, true);
      if (result.Succeeded)
      {
        if (user.MustChangePassword)
        {
          _logger.LogInformation("[UserLoginAsync] User ID: {UserId} must change password.", user.Id);

          // Restituisci una risposta con il flag MustChangePassword
          return new AppResponse<UserLoginResponse>().SetErrorResponse("change_password", "Password must be changed.");
        }

        // Genera il token di accesso e refresh
        var token = await GenerateUserToken(user);
        _logger.LogInformation("[UserLoginAsync] Login successful for User ID: {UserId}", user.Id);

        return new AppResponse<UserLoginResponse>().SetSuccessResponse(token);
      }
      else
      {
        var errorMessage = result.IsLockedOut ? "Account locked." :
                           result.IsNotAllowed ? "Account not allowed." :
                           "Invalid password.";

        _logger.LogWarning("[UserLoginAsync] Login failed for User ID: {UserId} - {Error}", user.Id, errorMessage);
        return new AppResponse<UserLoginResponse>().SetErrorResponse("password", errorMessage);
      }
    }

    public async Task<AppResponse<ApplicationUser>> Me(string userId)
    {
      var user = await _userManager.FindByIdAsync(userId);

      if (user == null)
      {
        return new AppResponse<ApplicationUser>().SetErrorResponse("user", "user id not found");
      }
      else
      {
        return new AppResponse<ApplicationUser>().SetSuccessResponse(user);
      }
    }

  }
}
