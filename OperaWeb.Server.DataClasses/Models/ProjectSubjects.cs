﻿using Microsoft.AspNetCore.Identity;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.DataClasses.Models.User;
using System;

public class ProjectSubject
{
  public int Id { get; set; }

  public int ProjectId { get; set; }

  public string SubjectName { get; set; }

  public string? Email { get; set; }

  public string? Status { get; set; } = "Pending"; // Pending, Registered
  public string Type { get; set; }


  public int ProjectSubjectRoleId { get; set; }
  public ProjectSubjectRole ProjectSubjectRole { get; set; }

  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

  public string? UserId { get; set; }

  // Navigational Properties
  public Project Project { get; set; }

  public ApplicationUser? User { get; set; }

}
