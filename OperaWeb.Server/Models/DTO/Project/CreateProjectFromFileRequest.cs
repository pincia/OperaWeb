namespace OperaWeb.Server.Models.DTO.Project
{
  public class CreateProjectFromFileRequest
  {
    public string Name { get; set; }
    public string Description { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string ZipCode { get; set; }
    public IFormFile File { get; set; }

  }
}
