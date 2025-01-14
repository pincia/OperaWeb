namespace OperaWeb.Server.Models.DTO.Project
{
  public class ResourceTeamTypeDTO
  {
    /// <summary>
    /// Unique identifier for the TeamType.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Foreign key for the associated project.
    /// </summary>
    public int ProjectId { get; set; }

    // Specialized manpower
    /// <summary>
    /// Quantity of specialized manpower.
    /// </summary>
    public int SpecializedQuantity { get; set; }

    /// <summary>
    /// Hourly rate for specialized manpower.
    /// </summary>
    public decimal SpecializedHourlyRate { get; set; }

    // Qualified manpower
    /// <summary>
    /// Quantity of qualified manpower.
    /// </summary>
    public int QualifiedQuantity { get; set; }

    /// <summary>
    /// Hourly rate for qualified manpower.
    /// </summary>
    public decimal QualifiedHourlyRate { get; set; }

    // Common manpower
    /// <summary>
    /// Quantity of common manpower.
    /// </summary>
    public int CommonQuantity { get; set; }

    /// <summary>
    /// Hourly rate for common manpower.
    /// </summary>
    public decimal CommonHourlyRate { get; set; }
  }
}
