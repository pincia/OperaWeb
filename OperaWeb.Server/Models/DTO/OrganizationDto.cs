namespace OperaWeb.Server.Models.DTO
{
  namespace OperaWeb.Server.Models.DTO
  {
    /// <summary>
    /// Data Transfer Object per un'organizzazione e i suoi membri.
    /// </summary>
    public class OrganizationDto
    {
      /// <summary>
      /// Identificativo dell'organizzazione.
      /// </summary>
      public int OrganizationId { get; set; }

      /// <summary>
      /// Nome dell'organizzazione.
      /// </summary>
      public string OrganizationName { get; set; }

      /// <summary>
      /// Lista dei membri dell'organizzazione.
      /// </summary>
      public List<OrganizationMemberDto> Members { get; set; }
    }
  }

}
