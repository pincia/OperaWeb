namespace OperaWeb.Server.Models.DTO.Project
{
  public class JobDTO
  {

    public string Id { get; set; }
    public string Description { get; set; }

    public int OriginalId {  get; set; }
    public string? ParentId { get; set; }
    public int Level { get; set; }
    public List<EntryDTO>? Entries { get; set; }
    public List<JobDTO>? Children { get; set; }
    public bool HasEntry { get; set; }
  }
}