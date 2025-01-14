using OperaWeb.Server.DataClasses.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using OperaWeb.Server.DataClasses.Context;
using Microsoft.AspNetCore.Identity.UI.Services;
using OperaWeb.Server.Models.DTO;
using OperaWeb.Server.Controllers.Account;
using OperaWeb.Server.DataClasses.Models.User;
using Microsoft.EntityFrameworkCore;
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
    private readonly AccessLogService _accessLogService;

    public UserService(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            OperaWebDbContext applicationDbContext,
            AppSettings appSettings,
            IEmailSender emailService,
            ILogger<UserService> logger,
             AccessLogService accessLogService,
    INotificationService notificationService)
    {
      _accessLogService = accessLogService;
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
      var organizationMember = _context.OrganizationMembers.Include(member => member.Company).Include(m => m.Company.SubFigure).Include(m => m.Company.Figure).FirstOrDefault(o => o.UserId == user.Id);
      var company = new CompanyProfileDto
      {
        Name = organizationMember.Company.Name,
        VatOrTaxCode = organizationMember.Company.VatOrTaxCode,
        Address = organizationMember.Company.Address,
        CityId = organizationMember.Company.ComuneId,
        ProvinceId = organizationMember.Company.ProvinciaId,
        PostalCode = organizationMember.Company.PostalCode,
        Country = organizationMember.Company.Country,
        PhoneNumber = organizationMember.Company.PhoneNumber,
        Email = organizationMember.Company.Email,
        Website = organizationMember.Company.Website,
        SDICode = organizationMember.Company.SDICode,
        PEC = organizationMember.Company.PEC,
        FigureClassificationId = organizationMember.Company.SubFigureId ?? -1,
        FigureClassification = organizationMember.Company.SubFigure?.Name ?? "",
        Figure = organizationMember.Company.Figure.Name,
        FigureId = organizationMember.Company.FigureId,
      };
      return new UserLoginResponse() { AccessToken = token, RefreshToken = refreshToken, User = new UserDTO() { Id = user.Id, Cf = user.TaxCode, Username = user.UserName, FirstName = user.FirstName, LastName = user.LastName, Roles = userRoles.ToList(), Company = company} };
    }

    /// <summary>
    /// Retrieves the profile of a user by their ID.
    /// </summary>
    /// <param name="userId">The ID of the user to retrieve.</param>
    /// <returns>A <see cref="UserProfileDto"/> containing the user's profile information.</returns>
    /// <exception cref="KeyNotFoundException">Thrown if the user is not found.</exception>
    public async Task<UserProfileDto> GetProfileAsync(string userId)
    {
      // Attempt to find the user by their ID
      var user = await _userManager.FindByIdAsync(userId);
      if (user == null)
      {
        // Throw an exception if the user does not exist
        throw new KeyNotFoundException("User not found");
      }

      var userRole = await  _userManager.GetRolesAsync(user);
      var organizationMember = _context.OrganizationMembers.FirstOrDefault(x => x.UserId == user.Id);

      // Map the user entity to the UserProfileDto
      return new UserProfileDto
      {
        FirstName = user.FirstName,
        LastName = user.LastName,
        FullName = user.FullName,
        PhoneNumber = user.PhoneNumber ?? string.Empty,
        Email = user.Email,
        AlternateEmail = user.AlternateEmail ?? string.Empty,
        Address = user.Address ?? string.Empty,
        City = user.City ?? string.Empty,
        PostalCode = user.PostalCode ?? string.Empty,
        Country = user.Country ?? string.Empty,
        CF = user.TaxCode ?? string.Empty,
        ProvinceId =user.ProvinciaId ?? -1,
        CityId = user.ComuneId ?? -1,
        OrganizationRoleId = organizationMember?.RoleId ?? -1
      };
    }

    /// <summary>
    /// Updates the profile of a user.
    /// </summary>
    /// <param name="userId">The ID of the user to update.</param>
    /// <param name="dto">The data transfer object containing updated user information.</param>
    /// <returns>True if the update was successful; otherwise, false.</returns>
    public async Task<bool> UpdateProfileAsync(string userId, UserProfileDto dto)
    {
      // Retrieve the user
      var user = await _context.Users.FindAsync(userId);
      if (user == null) return false;

      // Update user fields
      user.FirstName = dto.FirstName;
      user.LastName = dto.LastName;
      user.FullName = $"{dto.FirstName} {dto.LastName}";
      user.PhoneNumber = dto.PhoneNumber;
      user.AlternateEmail = dto.AlternateEmail;
      user.Address = dto.Address;
      user.City = dto.City;
      user.PostalCode = dto.PostalCode;
      user.Country = dto.Country;
      user.TaxCode = dto.CF;
      user.ProvinciaId = dto.ProvinceId;
      user.ComuneId = dto.CityId;
      user.TaxCode = dto.CF;
      // Save changes to the database
      _context.Users.Update(user);

      var organizationMember = _context.OrganizationMembers.FirstOrDefault(x => x.UserId == user.Id);

      if (organizationMember != null)
      {
        organizationMember.RoleId = dto.OrganizationRoleId;
        _context.Update(organizationMember);
      }
      await _context.SaveChangesAsync();
      return true;
    }


  }
}
