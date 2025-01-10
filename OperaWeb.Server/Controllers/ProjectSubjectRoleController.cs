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

  [HttpGet("figure-clasifications/{figureName}")]
  public async Task<ActionResult<IEnumerable<ProjectSubjectRole>>> GetFigureProjectRoles(string figureName)
  {
    var figureClassifications = await _context.FigureProjectSubjectRoles
        .Include(ur => ur.ProjectSubjectRole).Where(r=>r.Figure.Name == figureName.ToLower())
        .Select(ur => ur.ProjectSubjectRole)
        .ToListAsync();

    return Ok(figureClassifications);
  }
}
