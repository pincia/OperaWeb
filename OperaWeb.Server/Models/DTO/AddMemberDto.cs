namespace OperaWeb.Server.Models.DTO
{

  // Modello di richiesta per il corpo JSON
  public class AddMemberRequest
  {
    public string OrganizationId { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string RoleName { get; set; }
  }

}
