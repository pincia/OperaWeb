using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.DataClasses.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using OperaWeb.Server.DataClasses.Models.User;

[Route("api/[controller]")]
[ApiController]
public class ProjectSubjectRoleController : ControllerBase
{
  private readonly UserManager<ApplicationUser> _userManager;
  private readonly OperaWebDbContext _context;
  private readonly RoleManager<IdentityRole> _roleManager;
  public ProjectSubjectRoleController(OperaWebDbContext context, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
  {
    _userManager = userManager;
    _context = context;
    _roleManager = roleManager;
  }

  // GET: api/ProjectSubjectRole
  [HttpGet]
  public async Task<ActionResult<IEnumerable<ProjectSubjectRole>>> GetProjectSubjectRoles()
  {
    return await _context.ProjectSubjectRoles.ToListAsync();
  }

  [HttpGet("figure-project-roles/{roleName}")]
  public async Task<ActionResult<IEnumerable<ProjectSubjectRole>>> GetUserSubRoles(string roleName)
  {
    var userId = User.FindFirstValue("Id");

    var user = await _userManager.FindByIdAsync(userId);

    if (user == null)
    {
      return new List<ProjectSubjectRole>();
    }

    if (user.CompanyId == null || user.CompanyId <= 0)
    {
      return new List<ProjectSubjectRole>();
    }

    var userCompany = _context.Companies.Include(x => x.Figure).FirstOrDefault(x => x.Id == user.CompanyId);

    var subRoles = await _context.FigureProjectSubjectRoles
        .Include(ur => ur.ProjectSubjectRole).Where(r=>r.Figure.Name == userCompany.Figure.Name)
        .Select(ur => ur.ProjectSubjectRole)
        .ToListAsync();

    return Ok(subRoles);
  }
}
