using OperaWeb.Server.DataClasses.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OperaWeb.Server.DataClasses.Models
{
  public class ProjectResourceTeamType
  {
    /// <summary>
    /// Unique identifier for the ResourceTeamType.
    /// </summary>
    [Key]
    public int Id { get; set; }

    /// <summary>
    /// Foreign key for the associated project.
    /// </summary>
    [Required]
    public int ProjectId { get; set; }

    /// <summary>
    /// Navigation property for the associated project.
    /// </summary>
    [ForeignKey(nameof(ProjectId))]
    public virtual Project Project { get; set; }

    /// <summary>
    /// Quantity of specialized manpower.
    /// </summary>
    [Required]
    public int SpecializedQuantity { get; set; }

    /// <summary>
    /// Hourly rate for specialized manpower.
    /// </summary>
    [Required]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal SpecializedHourlyRate { get; set; }

    /// <summary>
    /// Quantity of qualified manpower.
    /// </summary>
    [Required]
    public int QualifiedQuantity { get; set; }

    /// <summary>
    /// Hourly rate for qualified manpower.
    /// </summary>
    [Required]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal QualifiedHourlyRate { get; set; }

    /// <summary>
    /// Quantity of common manpower.
    /// </summary>
    [Required]
    public int CommonQuantity { get; set; }

    /// <summary>
    /// Hourly rate for common manpower.
    /// </summary>
    [Required]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal CommonHourlyRate { get; set; }
  }
}
