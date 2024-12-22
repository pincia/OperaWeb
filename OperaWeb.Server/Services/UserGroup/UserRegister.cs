using Microsoft.AspNetCore.Identity;
using Azure.Core;
using System;
using System.Security.Cryptography;
using OperaWeb.Server.Models.DTO;
using OperaWeb.Server.Models.DTO.Account;
using System.Security.Claims;
using static System.Net.WebRequestMethods;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.DataClasses.Models.User;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.SharedClasses.Enums;

namespace Services.UserGroup
{
    public class UserRegisterRequest
  {
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string Role { get; set; } = "";
  }
  public partial class UserService
  {
    public async Task<AppResponse<object>> UserRegisterAsync(UserRegisterRequest request, string origin)
    {
      try
      {
        var user = new ApplicationUser()
        {
          UserName = request.Email,
          Email = request.Email,

        };
        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
          return new AppResponse<object>().SetErrorResponse(GetRegisterErrors(result));
        }

        var newUser = _context.Users.Where(u => u.Email == request.Email).FirstOrDefault();

        var res = await _userManager.AddToRoleAsync(newUser, request.Role);
        newUser.FirstName = request.FirstName;
        newUser.LastName = request.LastName;
        newUser.FullName = request.FirstName + " " + request.LastName;
        newUser.VerificationToken = generateVerificationToken();

        if (result.Succeeded)
        {
#if DEBUG
          origin = @"https://localhost:7017";
#endif
          sendVerificationEmail(user, origin);
          if (request.Role == "Impresa" || request.Role == "Committente" || request.Role == "Professionista")
          {
            await CreateNewOrganizationAsync(newUser.Id);
          }
          await sendNotifcation(newUser);
          _context.SaveChanges();
          return new AppResponse<object>().SetSuccessResponse(new { Name = newUser.UserName, Id = newUser.Id, Email = newUser.Email });
        }
        else
        {
          return new AppResponse<object>().SetErrorResponse(GetRegisterErrors(result));
        }
      }
      catch (Exception ex)
      {
        return new AppResponse<object>().SetErrorResponse("register", ex.Message);
      }

    }

    private async Task sendNotifcation(ApplicationUser newUser)
    {
      // Crea una notifica di benvenuto
      await _notificationService.CreateNotificationAsync(
          newUser.Id,
          "Benvenuto",
          "Grazie per la registrazione. Benvenuto in OperaWeb!",
          NotificationType.Info,
          ""
      );
    }

    private Dictionary<string, string[]> GetRegisterErrors(IdentityResult result)
    {
      var errorDictionary = new Dictionary<string, string[]>(1);

      foreach (var error in result.Errors)
      {
        string[] newDescriptions;

        if (errorDictionary.TryGetValue(error.Code, out var descriptions))
        {
          newDescriptions = new string[descriptions.Length + 1];
          Array.Copy(descriptions, newDescriptions, descriptions.Length);
          newDescriptions[descriptions.Length] = error.Description;
        }
        else
        {
          newDescriptions = [error.Description];
        }

        errorDictionary[error.Code] = newDescriptions;
      }

      return errorDictionary;
    }

    private string generateVerificationToken()
    {
      // token is a cryptographically strong random sequence of values
      var token = Convert.ToHexString(RandomNumberGenerator.GetBytes(64));

      // ensure token is unique by checking against db
      var tokenIsUnique = !_context.Users.Any(x => x.VerificationToken == token);
      if (!tokenIsUnique)
        return generateVerificationToken();

      return token;
    }

    private void sendVerificationEmail(ApplicationUser account, string origin)
    {
      string message;
      if (!string.IsNullOrEmpty(origin))
      {
        // origin exists if request sent from browser single page app (e.g. Angular or React)
        // so send link to verify via single page app
        var verifyUrl = $"{origin}/api/User/VerifyEmail/verify-email?token={account.VerificationToken}";
        message = $@"<p>Please click the below link to verify your email address:</p>
                            <p><a href=""{verifyUrl}"">{verifyUrl}</a></p>";
      }
      else
      {
        // origin missing if request sent directly to api (e.g. from Postman)
        // so send instructions to verify directly with api
        message = $@"<p>Please use the below token to verify your email address with the <code>/accounts/verify-email</code> api route:</p>
                            <p><code>{account.VerificationToken}</code></p>";
      }

      _emailService.SendEmailAsync(
          email: account.Email,
          subject: "Sign-up Verification API - Verify Email",
          htmlMessage: $@"<h4>Verify Email</h4>
                        <p>Thanks for registering!</p>
                        {message}"
      );
    }

    private void sendAlreadyRegisteredEmail(string email, string origin)
    {
      string message;
      if (!string.IsNullOrEmpty(origin))
        message = $@"<p>If you don't know your password please visit the <a href=""{origin}/account/forgot-password"">forgot password</a> page.</p>";
      else
        message = "<p>If you don't know your password you can reset it via the <code>/accounts/forgot-password</code> api route.</p>";

      _emailService.SendEmailAsync(
          email: email,
          subject: "Sign-up Verification API - Email Already Registered",
          htmlMessage: $@"<h4>Email Already Registered</h4>
                        <p>Your email <strong>{email}</strong> is already registered.</p>
                        {message}"
      );
    }

    private void sendPasswordResetEmail(ApplicationUser account, string origin)
    {
      //string message;
      //if (!string.IsNullOrEmpty(origin))
      //{
      //    var resetUrl = $"{origin}/account/reset-password?token={account.ResetToken}";
      //    message = $@"<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
      //                <p><a href=""{resetUrl}"">{resetUrl}</a></p>";
      //}
      //else
      //{
      //    message = $@"<p>Please use the below token to reset your password with the <code>/accounts/reset-password</code> api route:</p>
      //                <p><code>{account.ResetToken}</code></p>";
      //}

      //_emailService.SendEmailAsync(
      //    email: account.Email,
      //    subject: "Sign-up Verification API - Reset Password",
      //    htmlMessage: $@"<h4>Reset Password Email</h4>
      //            {message}"
      //);
    }

    public void VerifyEmail(string token)
    {
      var account = _context.Users.SingleOrDefault(x => x.VerificationToken == token);

      if (account == null)
        throw new Exception("Verification failed");

      account.VerifiedAt = DateTime.UtcNow;
      account.EmailConfirmed = true;
      account.VerificationToken = null;

      _context.Users.Update(account);
      _context.SaveChanges();
    }

    public void ForgotPassword(ForgotPasswordRequest model, string origin)
    {
      var user = _context.Users.SingleOrDefault(x => x.Email == model.Email);

      // always return ok response to prevent email enumeration
      if (user == null) return;

      // create reset token that expires after 1 day
      user.ResetToken = generateResetToken();
      user.ResetTokenExpiresAt = DateTime.UtcNow.AddDays(1);

      _context.Users.Update(user);
      _context.SaveChanges();

      // send email
      sendPasswordResetEmail(user, origin);
    }

    public void ValidateResetToken(ValidateResetTokenRequest model)
    {
      getAccountByResetToken(model.Token);
    }
    public async Task<AppResponse<bool>> DeleteUser(string email)
    {
      var user = _context.Users.FirstOrDefault(x => x.Email == email);

      if (user == null)
      {
        return new AppResponse<bool>().SetSuccessResponse(false);
      }

      _context.Users.Remove(user);
      _context.SaveChanges(true);

      return new AppResponse<bool>().SetSuccessResponse(true);
    }
    public void ResetPassword(ResetPasswordRequest model)
    {
      //TODO
      var user = getAccountByResetToken(model.Token);

      // update password and remove reset token
      //user.PasswordHash = BCrypt.HashPassword(model.Password);
      //user.PasswordReset = DateTime.UtcNow;
      //user.ResetToken = null;
      //user.ResetTokenExpires = null;

      //_context.Users.Update(user);
      //_context.SaveChanges();
    }

    private ApplicationUser getAccountByRefreshToken(string token)
    {
      //TODO
      return null;
      //var account = _context.Users.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));
      //if (account == null) throw new Exception("Invalid token");
      //return account;
    }

    private ApplicationUser getAccountByResetToken(string token)
    {
      var account = _context.Users.SingleOrDefault(x =>
          x.ResetToken == token && x.ResetTokenExpiresAt > DateTime.UtcNow);
      if (account == null) throw new Exception("Invalid token");
      return account;
    }

    private string generateResetToken()
    {
      // token is a cryptographically strong random sequence of values
      var token = Convert.ToHexString(RandomNumberGenerator.GetBytes(64));

      // ensure token is unique by checking against db
      var tokenIsUnique = !_context.Users.Any(x => x.ResetToken == token);
      if (!tokenIsUnique)
        return generateResetToken();

      return token;
    }

    public async Task<bool> UpdateProfileAsync(string userId, UpdateProfileDto dto)
    {
      var user = await _context.Users.FindAsync(userId);
      if (user == null) return false;

      // Update user fields
      user.FirstName = dto.FirstName;
      user.LastName = dto.LastName;
      user.PhoneNumber = dto.PhoneNumber;
      user.ComuneId = dto.ComuneId;
      user.ProvinciaId = dto.ProvinciaId;

      // Update company fields
      user.RagioneSociale = dto.RagioneSociale;
      user.PIVA = dto.PIVA;
      user.CompanyTaxCode = dto.CompanyTaxCode;
      user.CompanyComuneId = dto.CompanyComuneId;
      user.CompanyProvinciaId = dto.CompanyProvinciaId;
      user.SDICode = dto.SDICode;
      user.PEC = dto.PEC;
      user.SubRoleId = dto.SubRoleId;
      _context.Users.Update(user);
      await _context.SaveChangesAsync();
      return true;
    }



    public async Task<bool> IsProfileCompleteAsync(string userId)
    {
      var user = await _context.Users
          .Include(u => u.Comune)
          .Include(u => u.Provincia)
          .FirstOrDefaultAsync(u => u.Id == userId);

      return user != null &&
             !string.IsNullOrEmpty(user.FirstName) &&
             !string.IsNullOrEmpty(user.LastName) &&
             !string.IsNullOrEmpty(user.PhoneNumber) &&
             user.ComuneId.HasValue &&
             user.ProvinciaId.HasValue &&
             !string.IsNullOrEmpty(user.RagioneSociale) &&
             user.CompanyComuneId.HasValue &&
             user.CompanyProvinciaId.HasValue;
    }


    /// <summary>
    /// Retrieves a user by their ID.
    /// </summary>
    /// <param name="userId">User ID</param>
    /// <returns>ApplicationUser</returns>
    public async Task<ApplicationUser> GetUserByIdAsync(string userId)
    {
      var user = await _userManager.FindByIdAsync(userId);
      if (user == null)
        throw new KeyNotFoundException("User not found");

      return user;
    }

    /// <summary>
    /// Recupera i subroles filtrati in base al ruolo dell'utente.
    /// </summary>
    public async Task<List<SubRole>> GetFilteredSubRolesAsync(string userId)
    {
      var user = await _userManager.FindByIdAsync(userId);
      if (user == null)
      {
        return new List<SubRole>();
      }

      var roles = await _userManager.GetRolesAsync(user); // Restituisce una lista di ruoli

      if (roles == null || !roles.Any())
      {
        return new List<SubRole>();
      }

      var userRole = roles.First();

      // Recupera i subroles correlati al ruolo corrente dalla tabella rolesubroles
      var subRoles = await _context.RoleSubRoles
          .Where(rsr => rsr.Role.Name == userRole) // Filtro basato sul ruolo
          .Include(rsr => rsr.SubRole)            // Include la relazione SubRole
          .Select(rsr => rsr.SubRole)             // Seleziona i subroles
          .ToListAsync();

      return subRoles;
    }

    public async Task<AppResponse<bool>> CreateUserAndAddToOrganizationAsync(string organizationId, string fullName, string email, string roleName)
    {
      using var transaction = await _context.Database.BeginTransactionAsync();
      try
      {
        // Verifica se l'utente esiste già
        var existingUser = await _userManager.FindByEmailAsync(email);
        if (existingUser != null)
          return new AppResponse<bool>().SetErrorResponse("email", "User already exists.");

        // Genera una password temporanea
        var temporaryPassword = GenerateCompliantPassword();

        // Crea un nuovo utente
        var user = new ApplicationUser
        {
          UserName = email,
          Email = email,
          FullName = fullName,
          MustChangePassword = true
        };

        var createUserResult = await _userManager.CreateAsync(user, temporaryPassword);
        if (!createUserResult.Succeeded)
          return new AppResponse<bool>().SetErrorResponse("user", "Failed to create user.");

        // Conferma automaticamente l'email
        user.EmailConfirmed = true;
        await _userManager.UpdateAsync(user);

        // Verifica e assegna il ruolo
        var role = await _roleManager.FindByNameAsync("OrganizationMember");
        if (role == null)
        {
          return new AppResponse<bool>().SetErrorResponse("role", "Failed to create role. OrganizationMember not found");
        }
        await _userManager.AddToRoleAsync(user, role.Name);

        // Aggiungi all'organigramma
        var organizationRole = await _context.OrganizationRoles.FirstOrDefaultAsync(r => r.Name == roleName);
        var member = new OrganizationMember
        {
          UserId = user.Id,
          RoleId = organizationRole.Id,
          OrganizationId = organizationId
        };
        _context.OrganizationMembers.Add(member);
        await _context.SaveChangesAsync();

        // Invia l'email con la password temporanea
        await _emailService.SendEmailAsync(user.Email, "Welcome to OperaWeb",
            $"Hello {fullName},\n\nYour account has been created.\nTemporary Password: {temporaryPassword}");

        await transaction.CommitAsync();
        return new AppResponse<bool>().SetSuccessResponse(true);
      }
      catch (Exception ex)
      {
        await transaction.RollbackAsync();
        return new AppResponse<bool>().SetErrorResponse("exception", $"An error occurred: {ex.Message}");
      }
    }

    public async Task<AppResponse<bool>> ChangePasswordAsync(string userId, string oldPassword, string newPassword)
    {
      // Recupera l'utente in base all'ID
      var user = await _userManager.FindByIdAsync(userId);
      if (user == null)
      {
        return new AppResponse<bool>().SetErrorResponse("user", "User not found.");
      }

      // Cambia la password usando UserManager
      var result = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);
      if (!result.Succeeded)
      {
        var errors = string.Join(", ", result.Errors.Select(e => e.Description));
        return new AppResponse<bool>().SetErrorResponse("password", errors);
      }

      // Opzionale: Resetta il flag MustChangePassword se presente
      if (user.MustChangePassword)
      {
        user.MustChangePassword = false;
        await _userManager.UpdateAsync(user);
      }

      return new AppResponse<bool>().SetSuccessResponse(true);
    }


    private string GenerateCompliantPassword(int length = 12)
    {
      const string upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const string lowerChars = "abcdefghijklmnopqrstuvwxyz";
      const string digits = "0123456789";
      const string specialChars = "!@#$%^&*";

      var random = new Random();
      var passwordChars = new List<char>();

      // Assicurati di includere almeno un carattere di ciascun tipo
      passwordChars.Add(upperChars[random.Next(upperChars.Length)]);
      passwordChars.Add(lowerChars[random.Next(lowerChars.Length)]);
      passwordChars.Add(digits[random.Next(digits.Length)]);
      passwordChars.Add(specialChars[random.Next(specialChars.Length)]);

      // Completa la lunghezza con caratteri casuali dai set combinati
      string allChars = upperChars + lowerChars + digits + specialChars;
      for (int i = passwordChars.Count; i < length; i++)
      {
        passwordChars.Add(allChars[random.Next(allChars.Length)]);
      }

      // Mescola i caratteri per evitare prevedibilità
      return new string(passwordChars.OrderBy(_ => random.Next()).ToArray());
    }

    public async Task<AppResponse<bool>> RemoveMemberFromOrganizationAsync(int memberId)
    {
      // Trova il membro nell'organigramma
      var member = await _context.OrganizationMembers
                                 .Include(m => m.User)
                                 .FirstOrDefaultAsync(m => m.Id == memberId);

      if (member == null)
        return new AppResponse<bool>().SetErrorResponse("member", "Member not found.");

      var user = member.User;
      if (user == null)
        return new AppResponse<bool>().SetErrorResponse("user", "User not found.");

      // Elimina l'utente dal sistema Identity
      var result = await _userManager.DeleteAsync(user);
      if (!result.Succeeded)
        return new AppResponse<bool>().SetErrorResponse("delete", "Failed to delete user.");

      // Rimuovi il membro dall'organigramma
      _context.OrganizationMembers.Remove(member);
      await _context.SaveChangesAsync();

      return new AppResponse<bool>().SetSuccessResponse(true);
    }


    public async Task<AppResponse<bool>> UpdateMemberRoleAsync(int memberId, string newRoleName)
    {
      // Trova il membro nell'organigramma
      var member = await _context.OrganizationMembers
                                 .Include(m => m.User)
                                 .FirstOrDefaultAsync(m => m.Id == memberId);

      if (member == null)
        return new AppResponse<bool>().SetErrorResponse("member", "Member not found.");

      // Controlla se il ruolo esiste, altrimenti lo crea
      if (!await _roleManager.RoleExistsAsync(newRoleName))
        await _roleManager.CreateAsync(new IdentityRole(newRoleName));

      var user = member.User;
      if (user == null)
        return new AppResponse<bool>().SetErrorResponse("user", "User not found.");

      // Rimuovi i ruoli attuali e assegna il nuovo
      var currentRoles = await _userManager.GetRolesAsync(user);
      await _userManager.RemoveFromRolesAsync(user, currentRoles);
      await _userManager.AddToRoleAsync(user, newRoleName);

      // Aggiorna l'organigramma
      var newRole = await _context.OrganizationRoles.FirstOrDefaultAsync(r => r.Name == newRoleName);
      if (newRole == null)
        return new AppResponse<bool>().SetErrorResponse("role", "Role not found.");

      member.RoleId = newRole.Id;
      _context.OrganizationMembers.Update(member);

      await _context.SaveChangesAsync();

      return new AppResponse<bool>().SetSuccessResponse(true);
    }

    public async Task<AppResponse<List<OrganizationRole>>> GetAvailableOrganizationRolesAsync(string userId)
    {
      // Ottieni l'utente autenticato
      var currentUser = await GetUserByIdAsync(userId);
      if (currentUser == null)
        return new AppResponse<List<OrganizationRole>>().SetErrorResponse("user", "User not found.");

      // Ottieni i ruoli Identity dell'utente
      var userRoles = await _userManager.GetRolesAsync(currentUser);
      if (!userRoles.Any())
        return new AppResponse<List<OrganizationRole>>().SetErrorResponse("roles", "User has no roles.");

      // Trova i ruoli organizzativi mappati ai ruoli Identity
      var organizationRoles = await _context.OrganizationRoleMappings
          .Where(rm => userRoles.Contains(rm.IdentityRole.Name))
          .Select(rm => rm.OrganizationRole)
          .Distinct()
          .ToListAsync();

      return new AppResponse<List<OrganizationRole>>().SetSuccessResponse(organizationRoles);
    }

    public async Task<AppResponse<bool>> CreateNewOrganizationAsync(string userId)
    {
      // Controlla se l'utente esiste
      var user = await _userManager.FindByIdAsync(userId);
      if (user == null)
        return new AppResponse<bool>().SetErrorResponse("user", "User not found.");

      // Verifica se il ruolo "Organization" esiste
      var organizationRole = await _context.OrganizationRoles.FirstOrDefaultAsync(r => r.Name == "Organization");
      if (organizationRole == null)
        return new AppResponse<bool>().SetErrorResponse("role", "Organization role not found.");

      // Controlla se l'utente è già un membro dell'organizzazione
      var existingMember = await _context.OrganizationMembers
          .FirstOrDefaultAsync(m => m.UserId == userId && m.RoleId == organizationRole.Id);

      if (existingMember != null)
        return new AppResponse<bool>().SetErrorResponse("member", "User is already an organization member.");

      // Crea il nuovo OrganizationMember
      var organizationMember = new OrganizationMember
      {
        UserId = user.Id,
        RoleId = organizationRole.Id,
        OrganizationId = user.Id // L'organizzazione punta all'utente stesso
      };

      _context.OrganizationMembers.Add(organizationMember);
      await _context.SaveChangesAsync();

      return new AppResponse<bool>().SetSuccessResponse(true);
    }
    public async Task<List<OrganizationStructureDto>> GetOrganizationStructure(string userId)
    {
      // Recupera l'organizationMember dell'utente
      var organizationMember = _context.OrganizationMembers
          .Where(m => m.UserId == userId)
          .FirstOrDefault();

      if (organizationMember == null)
        throw new Exception("Organization member not found.");

      // Recupera l'utente principale dell'organizzazione
      var organizationUser = await _userManager.FindByIdAsync(organizationMember.OrganizationId);
      if (organizationUser == null)
        throw new Exception("Organization not found.");

      // Recupera i ruoli associati all'utente dell'organizzazione
      var organizationRoles = await _userManager.GetRolesAsync(organizationUser);

      // Recupera i ruoli validi dall'OrganizationRoleMapping
      var validRoles = await _context.OrganizationRoleMappings
          .Where(rm => organizationRoles.Contains(rm.IdentityRole.Name))
          .Select(rm => rm.OrganizationRole)
          .ToListAsync();

      // Recupera tutti i membri dell'organizzazione con i ruoli validi
      var organizationMembers = await _context.OrganizationMembers
          .Include(m => m.User)
          .Include(m => m.Role)
          .Where(m => m.OrganizationId == organizationMember.OrganizationId && validRoles.Contains(m.Role))
          .ToListAsync();

      // Prendi solo i ruoli radice per costruire l'albero
      var rootRoles = validRoles.Where(r => r.ParentRoleId == null).ToList();
      return BuildTree(rootRoles, organizationMembers, validRoles);
    }

    private List<OrganizationStructureDto> BuildTree(
    List<OrganizationRole> roles,
    List<OrganizationMember> organizationMembers,
    List<OrganizationRole> validRoles)
    {
      var result = new List<OrganizationStructureDto>();

      foreach (var role in roles)
      {
        // Recupera i membri per questo ruolo
        var members = organizationMembers
            .Where(m => m.RoleId == role.Id)
            .Select(m => new MemberDto
            {
              UserId = m.User.Id,
              FullName = m.User.FullName,
              Email = m.User.Email
            })
            .ToList();

        // Escludi i nodi senza membri
        //if (!members.Any())
        //  continue;

        // Costruisci il nodo
        var node = new OrganizationStructureDto
        {
          RoleName = role.Name,
          Members = members,
          Children = BuildTree(validRoles.Where(r => r.ParentRoleId == role.Id).ToList(), organizationMembers, validRoles)
        };

        result.Add(node);
      }

      return result;
    }

  }
}
