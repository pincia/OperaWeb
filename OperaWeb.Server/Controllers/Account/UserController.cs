using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OperaWeb.Server.DataClasses.Models.User;
using OperaWeb.Server.Models.DTO;
using OperaWeb.Server.Models.DTO.Account;
using Services;
using Services.UserGroup;
using System.Security.Claims;

namespace OperaWeb.Server.Controllers.Account
{
    [ApiController]
  [Route("api/[controller]/[action]")]
  public class UserController : ControllerBase
  {
    private readonly ILogger<UserController> _logger;
    private readonly UserService _userService;

    public UserController(UserService userService, ILogger<UserController> logger)
    {
      _userService = userService;
      _logger = logger;
    }

    [HttpPost]
    public async Task<AppResponse<object>> Register(UserRegisterRequest req)
    {
      return await _userService.UserRegisterAsync(req, Request.Headers["origin"]);
    }


    [HttpGet]
    public async Task<AppResponse<UserDTO>> Me()
    {
      var userId = User.FindFirstValue("Id");

      var user = await _userService.Me(userId);

      return user;
    }

    [HttpPost]
    public async Task<AppResponse<UserLoginResponse>> Login(UserLoginRequest req)
    {
      _logger.Log(LogLevel.Information, "[UserController] try to log");
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
      try
      {
        _userService.VerifyEmail(token);
        // Reindirizza alla pagina di conferma (per una SPA usa il path della tua app React)
        return Redirect("/confirm-registration");
      }
      catch (Exception ex)
      {
        // Se il token non è valido, reindirizza a una pagina di errore o restituisci un messaggio di errore
        return Redirect($"/error?message={Uri.EscapeDataString(ex.Message)}");
      }
    }


    [AllowAnonymous]
    [HttpPost("forgot-password")]
    public IActionResult ForgotPassword(ForgotPasswordRequest model)
    {
      _userService.ForgotPassword(model, Request.Headers["origin"]);
      return Ok(new { message = "Please check your email for password reset instructions" });
    }

    /// <summary>
    /// Checks if the user's profile is complete.
    /// </summary>
    /// <returns>True if profile is complete, otherwise false</returns>
    [HttpGet]
    public async Task<IActionResult> IsProfileComplete()
    {
      var userId = User.FindFirstValue("Id");
      if (string.IsNullOrEmpty(userId))
        return Unauthorized("User ID not found");

      var isComplete = await _userService.IsProfileCompleteAsync(userId);
      return Ok(new { isComplete });
    }

    /// <summary>
    /// Updates the user's profile.
    /// </summary>
    /// <param name="updatedUser">Updated user information</param>
    /// <returns>ActionResult</returns>
    [HttpPost]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto updatedUser)
    {
      var userId = User.FindFirstValue("Id");
      if (string.IsNullOrEmpty(userId))
        return Unauthorized("User ID not found");

      try
      {
        await _userService.UpdateProfileAsync(userId, updatedUser);
        return Ok(new { message = "Profile updated successfully" });
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(new { message = ex.Message });
      }
      catch (ApplicationException ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }
    /// <summary>
    /// Recupera i sottoruoli in base al ruolo corrente dell'utente.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetSubRoles()
    {
      // Ottieni l'ID del ruolo corrente dell'utente dai Claims
      var userId = User.FindFirstValue("Id");
      if (string.IsNullOrEmpty(userId))
        return Unauthorized("User ID not found");

      // Ottieni i subroles filtrati tramite UserService
      var subRoles = await _userService.GetFilteredSubRolesAsync(userId);

      return Ok(subRoles);
    }

    [Authorize]
    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest model)
    {
      // Recupera l'ID dell'utente autenticato
      var userId = User.FindFirst("Id")?.Value;
      if (string.IsNullOrEmpty(userId))
      {
        return Unauthorized(new { message = "User not authenticated." });
      }

      // Chiama il metodo nel servizio
      var result = await _userService.ChangePasswordAsync(userId, model.OldPassword, model.NewPassword);

      if (!result.IsSucceed)
      {
        return BadRequest(new { message = "bad request for change password"});
      }

      return Ok(new { message = "Password changed successfully." });
    }
    /// <summary>
    /// Ottiene il profilo dell'utente corrente.
    /// </summary>
    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetProfile()
    {
      // Recupera l'ID dell'utente autenticato dal JWT
      var userId = User.FindFirstValue("Id");

      if (string.IsNullOrEmpty(userId))
      {
        return Unauthorized(new { message = "User ID not found" });
      }

      try
      {
        var profile = await _userService.GetProfileAsync(userId);
        return Ok(profile);
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(new { message = ex.Message });
      }
      catch (System.Exception ex)
      {
        return StatusCode(500, new { message = "An error occurred while retrieving the profile", details = ex.Message });
      }
    }
  }

}