
public interface INotificationService
{
  Task AddNotificationAsync(string userId, string title, string message);
  Task CreateNotificationAsync(string userId, string title, string message);
  Task<Notification> GetNotificationByIdAsync(int notificationId);
  Task<List<Notification>> GetUserNotificationsAsync(string userId);
  Task MarkAllAsReadAsync(string userId);
  Task MarkAsReadAsync(int notificationId);
}