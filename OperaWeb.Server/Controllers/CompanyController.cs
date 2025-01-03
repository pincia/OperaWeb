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
      var user = await _userService.GetUserByIdAsync(userId);
      var company = await _context.Companies
          .Include(c => c.Figure)
          .Include(c => c.SubFigure)
          .Include(c => c.Comune)
          .Include(c => c.Provincia)
          .Include(c => c.OrganizationMembers)
          .FirstOrDefaultAsync(c => c.OrganizationMembers.Any(m => m.UserId == userId));

      if (company == null)
      {
        return NotFound("Company not found.");
      }

      var dto = new CompanyProfileDto
      {
        Name = company.Name,
        VatOrTaxCode = company.VatOrTaxCode,
        Address = company.Address,
        CityId = company.ComuneId,
        ProvinceId = company.ProvinciaId,
        PostalCode = company.PostalCode,
        Country = company.Country,
        PhoneNumber = company.PhoneNumber,
        Email = company.Email,
        Website = company.Website,
        SDICode = company.SDICode,
        PEC = company.PEC,
        FigureClassificationId = company.SubFigureId ?? -1,
        FigureClassification = company.SubFigure?.Name ?? "",
        Figure = company.Figure.Name,
        FigureId = company.FigureId,
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
      var user = await _userService.GetUserByIdAsync(userId);
      var company = await _context.Companies
          .Include(c => c.Figure)
          .Include(c => c.SubFigure)
          .Include(c => c.Comune)
          .Include(c => c.Provincia)
          .Include(c => c.OrganizationMembers)
          .FirstOrDefaultAsync(c => c.OrganizationMembers.Any(m => m.UserId == userId));

      if (company == null)
      {
        return NotFound("Company not found.");
      }

      var organizationMember = _context.OrganizationMembers.FirstOrDefault(x => x.UserId == userId);

      // Assicura che l'utente abbia accesso solo alla propria azienda
      if (!User.IsInRole("Admin") && organizationMember != null && !organizationMember.IsOwner)
      {
        return Forbid("You are not authorized to update this company.");
      }

      // Aggiorna i campi dell'azienda
      company.Name = dto.Name;
      company.VatOrTaxCode = dto.VatOrTaxCode;
      company.Address = dto.Address;
      company.ComuneId = dto.CityId;
      company.ProvinciaId = dto.ProvinceId;
      company.PostalCode = dto.PostalCode;
      company.Country = dto.Country;
      company.PhoneNumber = dto.PhoneNumber;
      company.Email = dto.Email;
      company.Website = dto.Website;
      company.SDICode = dto.SDICode;
      company.PEC = dto.PEC;
      company.FigureId = dto.FigureId;

      //update subfigure

      if (company.SubFigure == null)
      {
        if (dto.FigureClassificationId > 0)
        {
          var dbSubFigure = await _context.SubFigures.FirstOrDefaultAsync(c => c.ID == dto.FigureClassificationId);

          if (dbSubFigure == null)
          {
            return BadRequest("Figure classification not found!");
          }

          company.SubFigure = dbSubFigure;
        }
      }



      _context.Companies.Update(company);
      await _context.SaveChangesAsync();

      return NoContent(); // Status 204 per aggiornamento riuscito
    }
  }
}
