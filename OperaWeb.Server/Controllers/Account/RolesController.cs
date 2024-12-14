using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class RolesController : ControllerBase
{
  private readonly RoleManager<IdentityRole> _roleManager;

  public RolesController(RoleManager<IdentityRole> roleManager)
  {
    _roleManager = roleManager;
  }

  // GET: api/roles
  [HttpGet]
  public async Task<ActionResult<IEnumerable<object>>> GetRoles()
  {
    var roles = _roleManager.Roles.Select(r => new { r.Id, r.Name }).ToList();
    return Ok(roles);
  }

  // GET: api/roles/{id}
  [HttpGet("{id}")]
  public async Task<ActionResult<object>> GetRole(string id)
  {
    var role = await _roleManager.FindByIdAsync(id);

    if (role == null)
    {
      return NotFound();
    }

    return Ok(new { role.Id, role.Name });
  }
}
