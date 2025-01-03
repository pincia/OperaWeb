using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.DataClasses.Context;
using Services.UserGroup;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using OperaWeb.Server.DataClasses.Models.User;

namespace OperaWeb.Server.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SubFigureController : ControllerBase
  {
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly OperaWebDbContext _context;

    public SubFigureController(OperaWebDbContext context, UserManager<ApplicationUser> userManager)
    {
      _userManager = userManager;
      _context = context;
    }

    // GET: api/usersubfigure
    [HttpGet("user-sub-figures")]
    public async Task<ActionResult<IEnumerable<SubFigure>>> GetUserSubFigures()
    {
      var userId = User.FindFirstValue("Id");
      if (string.IsNullOrEmpty(userId))
        return Unauthorized("User ID not found");

      var user = await _userManager.FindByIdAsync(userId);
      if (user == null)
      {
        return new List<SubFigure>();
      }

      if (user.CompanyId == null || user.CompanyId <= 0)
      {
        return new List<SubFigure>();
      }

      var userCompany = _context.Companies.Include(x=>x.Figure).FirstOrDefault(x => x.Id == user.CompanyId);

      var subFigures = await _context.FigureSubFigures
          .Include(fsf => fsf.SubFigure)
          .Where(fsf => fsf.Figure.Id == userCompany.FigureId)
          .Select(fsf => fsf.SubFigure)
          .ToListAsync();

      return Ok(subFigures);
    }

    // POST: api/subfigure
    [HttpPost]
    public async Task<ActionResult<SubFigure>> CreateSubFigure(SubFigure subFigure)
    {
      _context.SubFigures.Add(subFigure);
      await _context.SaveChangesAsync();
      return CreatedAtAction(nameof(GetUserSubFigures), new { id = subFigure.ID }, subFigure);
    }
  }
}
