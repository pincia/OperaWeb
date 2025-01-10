namespace OperaWeb.Server.Models.DTO
{
  public class UserDTO
  {
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public List<string> Roles { get; set; }
    public CompanyProfileDto? Company { get; set; }
  }
}
