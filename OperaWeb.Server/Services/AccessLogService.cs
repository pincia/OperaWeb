using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.DataClasses.Models;

public class AccessLogService
{
  private readonly OperaWebDbContext _dbContext;
  private readonly IHttpContextAccessor _httpContextAccessor;

  public AccessLogService(OperaWebDbContext dbContext, IHttpContextAccessor httpContextAccessor)
  {
    _dbContext = dbContext;
    _httpContextAccessor = httpContextAccessor;
  }

  public async Task LogAccessAsync(string username, string action, bool success, string userId = null)
  {
    var ipAddress = _httpContextAccessor.HttpContext?.Connection?.RemoteIpAddress?.ToString();
    var userAgent = _httpContextAccessor.HttpContext?.Request?.Headers["User-Agent"].ToString();

    var accessLog = new AccessLog
    {
      UserId = userId,
      Username = username,
      Action = action,
      Success = success,
      IPAddress = ipAddress,
      UserAgent = userAgent
    };

    _dbContext.AccessLogs.Add(accessLog);
    await _dbContext.SaveChangesAsync();
  }
}
