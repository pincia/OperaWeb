using Microsoft.AspNetCore.Identity;
using OperaWeb.Server.DataClasses.Models.User;
using System.Collections.Generic;

namespace OperaWeb.Server.DataClasses.Models
{
  public class Company
  {
    /// <summary>
    /// Primary key of the company.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Legal name of the company.
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// VAT number or tax code of the company (unique).
    /// </summary>
    public string VatOrTaxCode { get; set; }

    /// <summary>
    /// Address of the company.
    /// </summary>
    public string? Address { get; set; }

    /// <summary>
    /// ID of the related municipality (optional FK).
    /// </summary>
    public int? ComuneId { get; set; }

    /// <summary>
    /// Relationship with the municipality.
    /// </summary>
    public virtual Comune Comune { get; set; }

    /// <summary>
    /// ID of the related province (optional FK).
    /// </summary>
    public int? ProvinciaId { get; set; }

    /// <summary>
    /// Relationship with the province.
    /// </summary>
    public virtual Provincia Provincia { get; set; }

    /// <summary>
    /// Postal code of the company's address.
    /// </summary>
    public string? PostalCode { get; set; }

    /// <summary>
    /// Country of the company.
    /// </summary>
    public string? Country { get; set; }

    /// <summary>
    /// Phone number of the company.
    /// </summary>
    public string? PhoneNumber { get; set; }

    /// <summary>
    /// Email address of the company.
    /// </summary>
    public string? Email { get; set; }

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
    /// Type of the company (e.g., SRL, SPA, etc.).
    /// </summary>
    public string? CompanyType { get; set; }


    /// <summary>
    /// ID of the related Figure
    /// </summary>
    public int FigureId { get; set; }

    /// <summary>
    /// Relationship with the Figure.
    /// </summary>
    public virtual Figure Figure { get; set; }

    /// <summary>
    /// ID of the related SubFigure
    /// </summary>
    public int? SubFigureId { get; set; }

    /// <summary>
    /// Relationship with the SubFigure.
    /// </summary>
    public virtual SubFigure? SubFigure { get; set; }

    /// <summary>
    /// Organization Members
    /// </summary>
    public ICollection<OrganizationMember> OrganizationMembers { get; set; }
  }
}
