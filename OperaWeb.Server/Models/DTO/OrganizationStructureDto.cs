namespace OperaWeb.Server.Models.DTO
{
  public class OrganizationStructureDto
  {
    public string RoleName { get; set; }
    public List<MemberDto> Members { get; set; } = new List<MemberDto>();
    public List<OrganizationStructureDto> Children { get; set; } = new List<OrganizationStructureDto>();
  }

}
