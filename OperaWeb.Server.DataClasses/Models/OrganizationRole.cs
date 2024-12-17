namespace OperaWeb.Server.DataClasses.Models
{
  public class OrganizationRole
  {
    public int Id { get; set; }
    public string Name { get; set; } // Nome del ruolo (es. Manager, Tecnico, etc.)
    public int? ParentRoleId { get; set; } // Riferimento al ruolo superiore
    public OrganizationRole ParentRole { get; set; }
    public ICollection<OrganizationRole> SubRoles { get; set; }
  }
}
