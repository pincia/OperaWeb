namespace OperaWeb.Server.Models.DTO.Project
{
  public class SubjectDTO
  {
    public string Name { get; set; }
    public string FirstName { get; set; } 
    public string LastName { get; set; }
    public string? Email { get; set; } 
    public string? Status { get; set; } 
    public DateTime CreatedAt { get; set; } 
    public string? UserId { get; set; } 
    public string Role { get; set; }
    public string? Cf { get; set; }
    public string? CfPiva { get; set; }
    public string? Company { get; set; }
    public string? Figure { get; set; }
    public bool Invite { get; set; }
  }
}
