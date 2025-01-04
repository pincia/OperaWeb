using OperaWeb.Server.Models.DTO;
using Azure.Core;
using OperaWeb.SharedClasses.Enums;
using OperaWeb.Server.DataClasses.Models.User;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;

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
    public UserDTO User { get; set; }
    public bool UserMustChangePassword { get; set; } = false;
  }
  public partial class UserService
  {
    public async Task<AppResponse<UserLoginResponse>> UserLoginAsync(UserLoginRequest request)
    {
      _logger.LogInformation("[UserLoginAsync] START for Email: {Email}", request.Email);

      // Find the user by email
      var user = await _userManager.FindByEmailAsync(request.Email);
      if (user == null)
      {
        _logger.LogWarning("[UserLoginAsync] User not found for Email: {Email}", request.Email);
        return new AppResponse<UserLoginResponse>().SetErrorResponse("email", "Email not found");
      }

      // Check the password
      var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, true);
      if (result.Succeeded)
      {
        // Generate the access and refresh tokens
        var token = await GenerateUserToken(user);
        _logger.LogInformation("[UserLoginAsync] Login successful for User ID: {UserId}", user.Id);
        if (user.MustChangePassword)
        {
          token.UserMustChangePassword = true;
          _logger.LogInformation("[UserLoginAsync] user must change password");
        }

        CheckPendingOrganizationMemberStatus(user.Id);
        // Check if user profile is complete
        var profileComplete = await IsProfileCompleteAsync(user.Id);
        if (!profileComplete)
        {
          await HandleIncompleteProfileNotificationAsync(user.Id, NotificationType.ProfileIncomplete, "Profilo da completare", "Ti preghiamo di completare i dati anagrafici del profilo utente. Clicca qui.", "/user/profile/");
        }

        // Check if company profile is complete
        if (user.CompanyId.HasValue)
        {
          var companyProfileComplete = await IsCompanyProfileCompleteAsync(user.CompanyId.Value);
          if (!companyProfileComplete)
          {
            await HandleIncompleteProfileNotificationAsync(user.Id, NotificationType.CompanyProfileIncomplete, "Profilo aziendale da completare", "Ti preghiamo di completare i dati del profilo aziendale. Clicca qui.", "/user/profile/");
          }
        }

        // Log successful login
        await _accessLogService.LogAccessAsync(user.UserName, "LOGIN", success: true, user.Id);

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

    /// <summary>
    /// Cheks organization memberstatus, if is pending sets to active
    /// </summary>
    /// <param name="userId"></param>
    /// <exception cref="NotImplementedException"></exception>
    private  void CheckPendingOrganizationMemberStatus(string userId)
    {
      var organizationMember =  _context.OrganizationMembers
                 .Include(o => o.Company)
                 .FirstOrDefault(o => o.UserId == userId);

      if (organizationMember.Status == MemberStatus.Pending)
      {
        organizationMember.Status = MemberStatus.Active;
      }
      _context.OrganizationMembers.Update(organizationMember);
    }

    private async Task HandleIncompleteProfileNotificationAsync(string id, object companyProfileIncomplete, string v1, string v2, string v3)
    {
      throw new NotImplementedException();
    }

    /// <summary>
    /// Handles incomplete profile notifications.
    /// </summary>
    private async Task HandleIncompleteProfileNotificationAsync(string userId, NotificationType type, string title, string message, string link)
    {
      var notification = _context.Notifications
          .Where(n => n.User.Id == userId && n.Type == type)
          .FirstOrDefault();

      if (notification != null && notification.IsRead && notification.CreatedAt.AddDays(1) < DateTime.Now)
      {
        // Recreate the notification if it exists and was read more than a day ago
        await _notificationService.CreateNotificationAsync(userId, title, message, type, link);
      }
      else if (notification == null)
      {
        // Create a new notification if it doesn't exist
        await _notificationService.CreateNotificationAsync(userId, title, message, type, link);
      }
    }


    public async Task<AppResponse<UserDTO>> Me(string userId)
    {
      var user = await _userManager.FindByIdAsync(userId);

      if (user == null)
      {
        return new AppResponse<UserDTO>().SetErrorResponse("user", "user id not found");
      }
      else
      {
        var userRoles = await _userManager.GetRolesAsync(user);
        var userDTO = new UserDTO() { Username = user.UserName, FirstName = user.FirstName, LastName = user.LastName, Roles = userRoles.ToList() };

        return new AppResponse<UserDTO>().SetSuccessResponse(userDTO);
      }
    }

  }
}
