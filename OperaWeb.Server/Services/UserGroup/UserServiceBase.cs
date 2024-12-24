using OperaWeb.Server.DataClasses.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using OperaWeb.Server.DataClasses.Context;
using Microsoft.AspNetCore.Identity.UI.Services;
using OperaWeb.Server.Models.DTO;
using OperaWeb.Server.Controllers.Account;
using OperaWeb.Server.DataClasses.Models.User;

namespace Services.UserGroup
{
    public partial class UserService
  {
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly AppSettings _appSettings;
    private readonly OperaWebDbContext _context;
    private IEmailSender _emailService;
    private readonly ILogger<UserService> _logger;
    private readonly INotificationService _notificationService;
    public UserService(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            OperaWebDbContext applicationDbContext,
            AppSettings appSettings,
            IEmailSender emailService,
            ILogger<UserService> logger,
    INotificationService notificationService)
    {
      _notificationService = notificationService;
      _userManager = userManager;
      _signInManager = signInManager;
      _appSettings = appSettings;
      _roleManager = roleManager;
      _context = applicationDbContext;
      _emailService = emailService;
      _logger = logger;
    }
    private async Task<UserLoginResponse> GenerateUserToken(ApplicationUser user)
    {
      var claims = (from ur in _context.UserRoles
                    where ur.UserId == user.Id
                    join r in _context.Roles on ur.RoleId equals r.Id
                    join rc in _context.RoleClaims on r.Id equals rc.RoleId
                    select rc)
        .Where(rc => rc.ClaimValue != null && rc.ClaimType != null)
        .Select(rc => new Claim(rc.ClaimType ?? "", rc.ClaimValue ?? ""))
        .Distinct()
        .ToList();
      var token = TokenUtil.GetToken(_appSettings, user, claims);
      await _userManager.RemoveAuthenticationTokenAsync(user, "APP", "RefreshToken");
      var refreshToken = await _userManager.GenerateUserTokenAsync(user, "APP", "RefreshToken");
      await _userManager.SetAuthenticationTokenAsync(user, "APP", "RefreshToken", refreshToken);
      var userRoles = await _userManager.GetRolesAsync(user);
      return new UserLoginResponse() { AccessToken = token, RefreshToken = refreshToken, User = new UserDTO() { Username = user.UserName, FirstName = user.FirstName, LastName = user.LastName, Roles = userRoles.ToList() } };
    }

    /// <summary>
    /// Recupera il profilo dell'utente corrente.
    /// </summary>
    public async Task<UpdateProfileDto> GetProfileAsync(string userId)
    {
      var user = await _userManager.FindByIdAsync(userId);
      if (user == null)
      {
        throw new KeyNotFoundException("User not found");
      }

      // Popola il DTO con i dati dell'utente
      return new UpdateProfileDto
      {
        FirstName = user.FirstName,
        LastName = user.LastName,
        PhoneNumber = user.PhoneNumber,
        ComuneId = user.ComuneId ?? 0,
        ProvinciaId = user.ProvinciaId ?? 0,
        RagioneSociale = user.RagioneSociale,
        PIVA = user.PIVA,
        CompanyTaxCode = user.CompanyTaxCode,
        CompanyComuneId = user.CompanyComuneId ?? 0,
        CompanyProvinciaId = user.CompanyProvinciaId ?? 0,
        SDICode = user.SDICode,
        PEC = user.PEC,
        SubRoleId = user.SubRoleId ?? 0
      };
    }

  }
}
