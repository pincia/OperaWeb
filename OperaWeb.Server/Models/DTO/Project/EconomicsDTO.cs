using OperaWeb.SharedClasses.Enums;

namespace OperaWeb.Server.Models.DTO.Project
{
  public class EconomicsDTO
  {
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
  }

}
