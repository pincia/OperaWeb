using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.DataClasses.Models.User;
using OperaWeb.Server.Models.DTO;
using OperaWeb.Server.Services;
using System.Security.Claims;

[ApiController]
[Route("api/notifications")]
public class NotificationsController : ControllerBase
{
  private readonly INotificationService _notificationService;
  private readonly UserManager<ApplicationUser> _userManager;

  public NotificationsController(INotificationService notificationService, UserManager<ApplicationUser> userManager)
  {
    _notificationService = notificationService;
    _userManager = userManager;
  }

  // Ottieni notifiche per l'utente autenticato
  [HttpGet]
  public async Task<IActionResult> GetUserNotifications()
  {
    // Recupera l'utente dal token JWT
    var userId = User.FindFirstValue("Id");
    if (userId == null)
    {
      return Ok(new List<Notification>()); // Restituisce 401 se non è autenticato
    }

    // Recupera le notifiche collegate all'utente
    var notifications = await _notificationService.GetUserNotificationsAsync(userId);
    return Ok(notifications);
  }

  // Segna una notifica come letta
  [HttpPost("mark-as-read/{id}")]
  public async Task<IActionResult> MarkAsRead(int id)
  {
    // Recupera l'utente dal token JWT
    var userId = User.FindFirstValue("Id");
    if (userId == null)
    {
      return Ok(new List<Notification>()); // Restituisce 401 se non è autenticato
    }

    // Verifica che la notifica appartenga all'utente
    var notification = await _notificationService.GetNotificationByIdAsync(id);
    if (notification == null || notification.User.Id != userId)
    {
      return Forbid(); // Restituisce 403 se non appartiene all'utente
    }

    await _notificationService.MarkAsReadAsync(id);
    return NoContent();
  }

  // Crea una nuova notifica per l'utente autenticato
  [HttpPost]
  public async Task<IActionResult> CreateNotification([FromBody] NotificationCreateDto dto)
  {
    // Recupera l'utente dal token JWT
    var userId = User.FindFirstValue("Id");
    if (userId == null)
    {
      return Ok(new List<Notification>()); // Restituisce 401 se non è autenticato
    }

    // Crea una notifica associata all'utente
    await _notificationService.AddNotificationAsync(userId, dto.Title, dto.Message);
    return CreatedAtAction(nameof(GetUserNotifications), null);
  }
  [HttpPost("mark-all-as-read")]
  public async Task<IActionResult> MarkAllAsRead()
  {
    var userId = User.FindFirstValue("Id");
    if (userId == null)
    {
      return Ok(new List<Notification>()); // Restituisce 401 se non è autenticato
    }

    await _notificationService.MarkAllAsReadAsync(userId);

    return NoContent();
  }

  /// <summary>
  /// Marks a notification as deleted.
  /// </summary>
  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteNotification(int id)
  {
    var success = await _notificationService.MarkAsDeletedAsync(id);
    if (!success)
      return NotFound(new { Message = "Notification not found" });

    return Ok(new { Message = "Notification deleted successfully" });
  }
}

