using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.DataClasses.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class ProjectSubjectRoleController : ControllerBase
{
  private readonly OperaWebDbContext _context;

  public ProjectSubjectRoleController(OperaWebDbContext context)
  {
    _context = context;
  }

  // GET: api/ProjectSubjectRole
  [HttpGet]
  public async Task<ActionResult<IEnumerable<ProjectSubjectRole>>> GetProjectSubjectRoles()
  {
    return await _context.SubjectRoles.ToListAsync();
  }

  // GET: api/ProjectSubjectRole/5
  [HttpGet("{id}")]
  public async Task<ActionResult<ProjectSubjectRole>> GetProjectSubjectRole(int id)
  {
    var role = await _context.SubjectRoles.FindAsync(id);

    if (role == null)
    {
      return NotFound();
    }

    return role;
  }

  // POST: api/ProjectSubjectRole
  [HttpPost]
  public async Task<ActionResult<ProjectSubjectRole>> CreateProjectSubjectRole(ProjectSubjectRole role)
  {
    _context.SubjectRoles.Add(role);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetProjectSubjectRole), new { id = role.Id }, role);
  }

  // PUT: api/ProjectSubjectRole/5
  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateProjectSubjectRole(int id, ProjectSubjectRole role)
  {
    if (id != role.Id)
    {
      return BadRequest();
    }

    _context.Entry(role).State = EntityState.Modified;

    try
    {
      await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
      if (!ProjectSubjectRoleExists(id))
      {
        return NotFound();
      }
      else
      {
        throw;
      }
    }

    return NoContent();
  }

  // DELETE: api/ProjectSubjectRole/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteProjectSubjectRole(int id)
  {
    var role = await _context.SubjectRoles.FindAsync(id);
    if (role == null)
    {
      return NotFound();
    }

    _context.SubjectRoles.Remove(role);
    await _context.SaveChangesAsync();

    return NoContent();
  }

  private bool ProjectSubjectRoleExists(int id)
  {
    return _context.SubjectRoles.Any(e => e.Id == id);
  }
}
