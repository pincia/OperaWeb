using OperaWeb.Server.DataClasses;
using Microsoft.AspNetCore.Identity;
using Azure.Core;
using System;
using System.Security.Cryptography;
using OperaWeb.Server.Models.DTO;
using OperaWeb.Server.Models.DTO.Account;
using System.Security.Claims;
using static System.Net.WebRequestMethods;

namespace Services.UserGroup
{
    public class UserRegisterRequest
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }
    public partial class UserService
    {

        public async Task<AppResponse<object>> UserRegisterAsync(UserRegisterRequest request, string origin)
        {
            var user = new ApplicationUser()
            {
                UserName = request.Email,
                Email = request.Email,

            };
            var result = await _userManager.CreateAsync(user, request.Password);

            var newUser = _context.Users.Where(u => u.Email == request.Email).FirstOrDefault();
            newUser.VerificationToken = generateVerificationToken();

            if (result.Succeeded)
            {
#if DEBUG
        origin = @"https://localhost:7017";
#endif
        sendVerificationEmail(user, origin);
        _context.SaveChanges();
                return new AppResponse<object>().SetSuccessResponse(new {Name= newUser.UserName, Id = newUser.Id, Email = newUser.Email});
               // return new AppResponse<object>().SetSuccessResponse(new { Name = "TESTNAME", Id = 12, Email ="email@email.it" });
            }
            else
            {
                return new AppResponse<object>().SetErrorResponse(GetRegisterErrors(result));
            }
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

            if(user == null)
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

    }
}
