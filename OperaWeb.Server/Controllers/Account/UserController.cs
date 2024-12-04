using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OperaWeb.Server.Models.DTO;
using Services;
using Services.UserGroup;

namespace OperaWeb.Server.Controllers.Account
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<AppResponse<object>> Register(UserRegisterRequest req)
        {
            return await _userService.UserRegisterAsync(req, Request.Headers["origin"]);
        }

        [HttpPost]
        public async Task<AppResponse<UserLoginResponse>> Login(UserLoginRequest req)
        {
            return await _userService.UserLoginAsync(req);
        }

        [HttpPost]
        public async Task<AppResponse<UserRefreshTokenResponce>> RefreshToken(UserRefreshTokenRequest req)
        {
            return await _userService.UserRefreshTokenAsync(req);
        }
        [HttpPost]
        public async Task<AppResponse<bool>> Logout()
        {
            return await _userService.UserLogoutAsync(User);
        }

        [HttpPost]
        [Authorize]
        public string Profile()
        {
            return User.FindFirst("UserName")?.Value ?? "";
        }

        [HttpPost]

        public async Task<AppResponse<bool>> Delete(string userName)
        {
           return await _userService.DeleteUser(userName);
        }

        [AllowAnonymous]
        [HttpGet("verify-email")]
        public IActionResult VerifyEmail(string token)
        {
            _userService.VerifyEmail(token);
            return Ok(new { message = "Verification successful, you can now login" });
        }

        [AllowAnonymous]
        [HttpPost("forgot-password")]
        public IActionResult ForgotPassword(ForgotPasswordRequest model)
        {
            _userService.ForgotPassword(model, Request.Headers["origin"]);
            return Ok(new { message = "Please check your email for password reset instructions" });
        }
    }
}
