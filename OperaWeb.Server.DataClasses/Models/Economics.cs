using OperaWeb.SharedClasses.Enums;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OperaWeb.Server.DataClasses.Models
{
  /// <summary>
  /// Represents the economic details associated with a project.
  /// </summary>
  public class Economics
  {
    /// <summary>
    /// Id
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Measured Works.
    /// </summary>
    public decimal MeasuredWorks { get; set; }

    /// <summary>
    /// Lump Sum Works.
    /// </summary>
    public decimal LumpSumWorks { get; set; }

    /// <summary>
    /// Safety Costs.
    /// </summary>
    public decimal SafetyCosts { get; set; }

    /// <summary>
    /// Labor Costs.
    /// </summary>
    public decimal LaborCosts { get; set; }

    /// <summary>
    /// Auction Variation Percentage.
    /// </summary>
    public decimal AuctionVariationPercentage { get; set; }

    /// <summary>
    /// Available Sums.
    /// </summary>
    public decimal AvailableSums { get; set; }

    /// <summary>
    /// Total Project Calculation Type.
    /// </summary>
    public TotalProjectCalculationType TotalProjectCalculationType { get; set; }

    /// <summary>
    /// The project reference
    /// </summary>
    public virtual Project Project { get; set; }
    public int ProjectId { get; set; }
  }

}
