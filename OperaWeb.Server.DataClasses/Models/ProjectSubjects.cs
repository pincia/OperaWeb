using Microsoft.AspNetCore.Identity;
using OperaWeb.Server.DataClasses.Models;
using System;

public class ProjectSubject
{
  public int Id { get; set; }

  public int ProjectId { get; set; }

  public string SubjectName { get; set; }

  public string Email { get; set; }

  public string Status { get; set; } = "Pending"; // Pending, Registered

  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

  public string? UserId { get; set; }

  // Navigational Properties
  public Project Project { get; set; }

  public IdentityUser? User { get; set; }
}
