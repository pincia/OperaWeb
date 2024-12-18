﻿using OperaWeb.Server.DataClasses;
using OperaWeb.SharedClasses.Enums;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Notifications")]
public class Notification
{
  public int Id { get; set; }
  public string Title { get; set; }
  public string Message { get; set; }
  public bool IsRead { get; set; } = false;
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

  // Relazione con ApplicationUser
  public virtual ApplicationUser User { get; set; }

  // Nuovo campo Type
  public NotificationType Type { get; set; } = NotificationType.Info;

  // Nuovo campo Link
  public string Link { get; set; } // URL per il reindirizzamento
}