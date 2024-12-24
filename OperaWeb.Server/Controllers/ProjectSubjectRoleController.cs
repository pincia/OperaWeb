using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.DataClasses.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

[Route("api/[controller]")]
[ApiController]
public class ProjectSubjectRoleController : ControllerBase
{
  private readonly OperaWebDbContext _context;
  private readonly RoleManager<IdentityRole> _roleManager;
  public ProjectSubjectRoleController(OperaWebDbContext context, RoleManager<IdentityRole> roleManager)
  {
    _context = context;
    _roleManager = roleManager;
  }

  // GET: api/ProjectSubjectRole
  [HttpGet]
  public async Task<ActionResult<IEnumerable<ProjectSubjectRole>>> GetProjectSubjectRoles()
  {
    return await _context.SubjectRoles.ToListAsync();
  }

  // GET: api/SubRole/UserSubRoles/{userId}
  [HttpGet("role-project-roles/{roleName}")]
  public async Task<IActionResult> GetUserSubRoles(string roleName)
  {
    var role = await _roleManager.FindByNameAsync(roleName);

    if (role == null)
      return NotFound("Ruolo non trovato.");

    var subRoles = await _context.RoleProjectRoles
        .Include(ur => ur.ProjectRole).Where(r=>r.Role.Name == roleName)
        .Select(ur => ur.ProjectRole)
        .ToListAsync();

    return Ok(subRoles);
  }
}
