using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Net;
using System.Text;

namespace OperaWeb.Server.Services;

public class EmailSender : IEmailSender
{
    private readonly ILogger _logger;
    private readonly IConfiguration _config;
    public EmailSender(ILogger<EmailSender> logger, IConfiguration config)
    {
        _logger = logger;
        _config = config;
    }

    public async Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        string MailServer = _config["EmailSettings:MailServer"];
        string FromEmail = _config["EmailSettings:FromEmail"];
        string SenderName = _config["EmailSettings:SenderName"];
        string Password = _config["EmailSettings:Password"];
        string Username = _config["EmailSettings:Username"];
        int Port = int.Parse(_config["EmailSettings:MailPort"]);

        // Set up SMTP client
        SmtpClient client = new SmtpClient(MailServer, Port);
        client.EnableSsl = true;
        client.UseDefaultCredentials = false;
        client.Credentials = new NetworkCredential(Username, Password);

        // Create email message
        MailMessage mailMessage = new MailMessage();
        mailMessage.From = new MailAddress(FromEmail, SenderName);
        mailMessage.To.Add(email);
        mailMessage.Subject = subject;
        mailMessage.IsBodyHtml = true;
        mailMessage.Body = htmlMessage;

        // Send email
        client.Send(mailMessage);
        
    }
}