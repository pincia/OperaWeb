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
            _logger.Log(LogLevel.Information, "[UserLoginAsync] START");
            var user = await _userManager.FindByEmailAsync(request.Email);
      _logger.Log(LogLevel.Information, "[UserLoginAsync] user found");
      if (user == null)
            {

                return new AppResponse<UserLoginResponse>().SetErrorResponse("email", "Email not found");
            }
            else
            {
                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, true);
                if (result.Succeeded)
                {
                    var token = await GenerateUserToken(user);
                    return new AppResponse<UserLoginResponse>().SetSuccessResponse(token);
                }
                else
                {
                    return new AppResponse<UserLoginResponse>().SetErrorResponse("password", result.ToString());
                }
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
