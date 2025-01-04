using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.Models.DTO;
using Services.UserGroup;
using System.Security.Claims;

namespace OperaWeb.Server.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize] // Assicura che solo utenti autenticati possano accedere
  public class CompanyController : ControllerBase
  {
    private readonly OperaWebDbContext _context;
    private readonly UserService _userService;

    public CompanyController(OperaWebDbContext context, UserService userService)
    {
      _userService = userService;
      _context = context;
    }

    /// <summary>
    /// Retrieves the profile of user specific company.
    /// </summary>
    /// <returns>Company profile DTO.</returns>
    [HttpGet("user-company-profile")]
    public async Task<IActionResult> GetUserCompanyProfile()
    {
      var userId = User.FindFirstValue("Id");
      var organizationMember = _context.OrganizationMembers.Include(member => member.Company).Include(m=>m.Company.SubFigure).Include(m => m.Company.Figure).FirstOrDefault(o => o.UserId == userId);

      if (organizationMember == null)
      {
        return NotFound("organizationMember not found.");
      }

      if (organizationMember.Company == null)
      {
        return NotFound("Company not found.");
      }

      var dto = new CompanyProfileDto
      {
        Name = organizationMember.Company.Name,
        VatOrTaxCode = organizationMember.Company.VatOrTaxCode,
        Address = organizationMember.Company.Address,
        CityId = organizationMember.Company.ComuneId,
        ProvinceId = organizationMember.Company.ProvinciaId,
        PostalCode = organizationMember.Company.PostalCode,
        Country = organizationMember.Company.Country,
        PhoneNumber = organizationMember.Company.PhoneNumber,
        Email = organizationMember.Company.Email,
        Website = organizationMember.Company.Website,
        SDICode = organizationMember.Company.SDICode,
        PEC = organizationMember.Company.PEC,
        FigureClassificationId = organizationMember.Company.SubFigureId ?? -1,
        FigureClassification = organizationMember.Company.SubFigure?.Name ?? "",
        Figure = organizationMember.Company.Figure.Name,
        FigureId = organizationMember.Company.FigureId,
      };

      return Ok(dto);
    }

    /// <summary>
    /// Updates the profile of a specific company.
    /// </summary>
    /// <param name="dto">Updated company profile data.</param>
    /// <returns>No content if successful.</returns>
    [HttpPut("profile")]
    public async Task<IActionResult> UpdateCompanyProfile([FromBody] CompanyProfileDto dto)
    {
      var userId = User.FindFirstValue("Id");
      var organizationMember = _context.OrganizationMembers.Include(member => member.Company).FirstOrDefault(o => o.UserId == userId);

      if (organizationMember == null)
      {
        return NotFound("organizationMember not found.");
      }

      // Assicura che l'utente abbia accesso solo alla propria azienda
      if (!User.IsInRole("Admin") && organizationMember != null && !organizationMember.IsOwner)
      {
        return Forbid("You are not authorized to update this company.");
      }

      // Aggiorna i campi dell'azienda
      organizationMember.Company.Name = dto.Name;
      organizationMember.Company.VatOrTaxCode = dto.VatOrTaxCode;
      organizationMember.Company.Address = dto.Address;
      organizationMember.Company.ComuneId = dto.CityId;
      organizationMember.Company.ProvinciaId = dto.ProvinceId;
      organizationMember.Company.PostalCode = dto.PostalCode;
      organizationMember.Company.Country = dto.Country;
      organizationMember.Company.PhoneNumber = dto.PhoneNumber;
      organizationMember.Company.Email = dto.Email;
      organizationMember.Company.Website = dto.Website;
      organizationMember.Company.SDICode = dto.SDICode;
      organizationMember.Company.PEC = dto.PEC;
      organizationMember.Company.FigureId = dto.FigureId;

      //update subfigure

      if (organizationMember.Company.SubFigure == null)
      {
        if (dto.FigureClassificationId > 0)
        {
          var dbSubFigure = await _context.SubFigures.FirstOrDefaultAsync(c => c.ID == dto.FigureClassificationId);

          if (dbSubFigure == null)
          {
            return BadRequest("Figure classification not found!");
          }

          organizationMember.Company.SubFigure = dbSubFigure;
        }
      }



      _context.Companies.Update(organizationMember.Company);
      await _context.SaveChangesAsync();

      return NoContent(); // Status 204 per aggiornamento riuscito
    }
  }
}
