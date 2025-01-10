namespace OperaWeb.Server.Models.DTO
{
  public class FileCheckResponseDTO
  {
    public bool CanBeImported { get; set; }
    public List<FileCheckDTO> Checks { get; set; }
  }

}
