namespace OperaWeb.Server.Models.DTO
{
  public class UserDTO
  {
    public string Id { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Cf { get; set;  }
    public List<string> Roles { get; set; }
    public CompanyProfileDto? Company { get; set; }
  }
}
