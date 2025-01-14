using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.Models.DTO;

[ApiController]
[Route("api/[controller]")]
public class SubjectsController : ControllerBase
{
  private readonly OperaWebDbContext _context;

  public SubjectsController(OperaWebDbContext context)
  {
    _context = context;
  }

  /// <summary>
  /// Ottiene una lista di soggetti filtrata e paginata.
  /// </summary>
  /// <param name="request"></param>
  /// <returns></returns>
  [HttpPost("search")]
  public async Task<IActionResult> Search([FromBody] PaginatedRequestDTO request)
  {
    var subjectsQuery = _context.OrganizationMembers
        .Include(om => om.User)
        .Include(om => om.Role)
        .Include(om => om.Company)
        .Where(om =>
            string.IsNullOrEmpty(request.Query) ||
            om.User.FirstName.Contains(request.Query) ||
            om.User.LastName.Contains(request.Query) ||
            (!string.IsNullOrEmpty(om.User.Email) && om.User.Email.Contains(request.Query)) ||
            (!string.IsNullOrEmpty(om.User.TaxCode) && om.User.TaxCode.Contains(request.Query)) ||
            (!string.IsNullOrEmpty(om.Company.VatOrTaxCode) && om.Company.VatOrTaxCode.Contains(request.Query)) ||
            (!string.IsNullOrEmpty(om.Company.Name) && om.Company.Name.Contains(request.Query)) ||
            (!string.IsNullOrEmpty(om.Company.Figure.Name) && om.Company.Figure.Name.Contains(request.Query)) ||
            (!string.IsNullOrEmpty(om.Role.Name) && om.Role.Name.Contains(request.Query))
        )
        .Select(u => new SearchSubjectDTO
        {
          UserId = u.User.Id,
          Name = $"{u.User.FirstName} {u.User.LastName}",
          Email = u.User.Email,
          CfPiva = u.Company.VatOrTaxCode,
          Cf = u.User.TaxCode,
          Company = u.User.Company.Name,
          OrganizationRole = u.Role.Name,
          Figure = u.Company.Figure.Name
        });

    var totalCount = await subjectsQuery.CountAsync();
    var subjects = await subjectsQuery
        .Skip((request.Page - 1) * request.PageSize)
        .Take(request.PageSize)
        .ToListAsync();

    return Ok(new
    {
      Data = subjects,
      TotalCount = totalCount,
      Page = request.Page,
      PageSize = request.PageSize
    });
  }
}

