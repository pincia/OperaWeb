using Microsoft.EntityFrameworkCore.ValueGeneration;

namespace OperaWeb.Server.Models.DTO
{
  public class CompanyProfileDto
  {
    /// <summary>
    /// Legal name of the company.
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// VAT number or tax code of the company.
    /// </summary>
    public string VatOrTaxCode { get; set; }

    /// <summary>
    /// Address of the company.
    /// </summary>
    public string Address { get; set; }

    /// <summary>
    /// ID of the municipality associated with the company.
    /// </summary>
    public int? CityId { get; set; }

    /// <summary>
    /// ID of the province associated with the company.
    /// </summary>
    public int? ProvinceId { get; set; }

    /// <summary>
    /// Postal code of the company.
    /// </summary>
    public string? PostalCode { get; set; }

    /// <summary>
    /// Country of the company.
    /// </summary>
    public string Country { get; set; }

    /// <summary>
    /// Phone number of the company.
    /// </summary>
    public string PhoneNumber { get; set; }

    /// <summary>
    /// Email address of the company.
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// Website of the company.
    /// </summary>
    public string? Website { get; set; }

    /// <summary>
    /// SDI code for electronic invoicing.
    /// </summary>
    public string? SDICode { get; set; }

    /// <summary>
    /// Certified email (PEC) of the company.
    /// </summary>
    public string? PEC { get; set; }
    
    /// <summary>
    /// The Comany Figure Type
    /// </summary>
    public string? FigureClassification { get; set; }

    /// <summary>
    /// The Company Figure Classification id
    /// </summary>
    public int? FigureClassificationId { get; set; }

    /// <summary>
    /// The Comany Figure Type
    /// </summary>
    public string Figure { get; set; }
    /// <summary>
    /// The Company Figure id
    /// </summary>
    public int FigureId { get; set; }
  }
}
