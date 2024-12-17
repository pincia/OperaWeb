using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.Models.DTO;
using OperaWeb.SharedClasses.Enums;

public class NotificationService : INotificationService
{
  private readonly OperaWebDbContext _context;

  public NotificationService(OperaWebDbContext context)
  {
    _context = context;
  }

  /// <summary>
  /// Aggiunge una nuova notifica per un utente specifico.
  /// </summary>
  public async Task AddNotificationAsync(string userId, string title, string message)
  {
    // Recupera l'utente basandosi sull'ID
    var user = await _context.Users.FindAsync(userId);
    if (user == null)
    {
      throw new ArgumentException("Utente non trovato.", nameof(userId));
    }

    var notification = new Notification
    {
      User = user,
      Title = title,
      Message = message,
      CreatedAt = DateTime.UtcNow,
      IsRead = false
    };

    _context.Notifications.Add(notification);
    await _context.SaveChangesAsync();
  }

  /// <summary>
  /// Recupera tutte le notifiche per un utente specifico.
  /// </summary>
  public async Task<List<Notification>> GetUserNotificationsAsync(string userId)
  {
    var user = await _context.Users.FindAsync(userId);
    if (user == null)
    {
      throw new ArgumentException("Utente non trovato.", nameof(userId));
    }

    return await _context.Notifications
        .Where(n => n.User.Id == userId)
        .OrderByDescending(n => n.CreatedAt)
        .ToListAsync();
  }

  /// <summary>
  /// Recupera una notifica specifica tramite il suo ID.
  /// </summary>
  public async Task<Notification> GetNotificationByIdAsync(int notificationId)
  {
    return  _context.Notifications.Include(u=>u.User).FirstOrDefault(n=>n.Id == notificationId);
  }

  /// <summary>
  /// Marca una specifica notifica come letta.
  /// </summary>
  public async Task MarkAsReadAsync(int notificationId)
  {
    var notification = await GetNotificationByIdAsync(notificationId);
    if (notification == null)
    {
      throw new ArgumentException("Notifica non trovata.", nameof(notificationId));
    }

    notification.IsRead = true;
    await _context.SaveChangesAsync();
  }

  /// <summary>
  /// Creates and saves a new notification for a specific user. (Duplicate of AddNotificationAsync).
  /// </summary>
  /// <param name="userId">The ID of the user to whom the notification belongs.</param>
  /// <param name="title">The title of the notification.</param>
  /// <param name="message">The content of the notification message.</param>
  /// <returns>A task representing the asynchronous operation.</returns>
  public async Task CreateNotificationAsync(string userId, string title, string message, NotificationType type, string link)
  {
    var user = await _context.Users.FindAsync(userId);
    if (user == null)
    {
      throw new ArgumentException("Utente non trovato.", nameof(userId));
    }

    var notification = new Notification
    {
      User = user,
      Title = title,
      Message = message,
      Type = type,
      Link = link
    };

    _context.Notifications.Add(notification);
    await _context.SaveChangesAsync();
  }


  /// <summary>
  /// Marca tutte le notifiche per un utente specifico come lette.
  /// </summary>
  public async Task MarkAllAsReadAsync(string userId)
  {
    var notifications = await _context.Notifications
        .Where(n => n.User.Id == userId && !n.IsRead)
        .ToListAsync();

    foreach (var notification in notifications)
    {
      notification.IsRead = true;
    }

    await _context.SaveChangesAsync();
  }
}
