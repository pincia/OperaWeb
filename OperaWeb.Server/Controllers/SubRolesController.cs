
  using Microsoft.AspNetCore.Authorization;
  using Microsoft.AspNetCore.Identity;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.EntityFrameworkCore;
  using OperaWeb.Server.DataClasses.Models.User;
  using OperaWeb.Server.DataClasses;
  using System.Linq;
  using System.Threading.Tasks;
using OperaWeb.Server.DataClasses.Context;

  namespace OperaWeb.Server.Controllers
  {
    [Authorize(Roles = "Admin")] // Solo gli Admin possono gestire SubRoles
    [Route("api/[controller]")]
    [ApiController]
    public class SubRoleController : ControllerBase
    {
      private readonly OperaWebDbContext _context;
      private readonly UserManager<ApplicationUser> _userManager;

      public SubRoleController(OperaWebDbContext context, UserManager<ApplicationUser> userManager)
      {
        _context = context;
        _userManager = userManager;
      }

      // GET: api/SubRole
      [HttpGet]
      public async Task<IActionResult> GetSubRoles()
      {
        var subRoles = await _context.SubRoles.ToListAsync();
        return Ok(subRoles);
      }

      // GET: api/SubRole/{id}
      [HttpGet("{id}")]
      public async Task<IActionResult> GetSubRole(int id)
      {
        var subRole = await _context.SubRoles.FindAsync(id);

        if (subRole == null)
          return NotFound("SubRole non trovato.");

        return Ok(subRole);
      }

      // POST: api/SubRole
      [HttpPost]
      public async Task<IActionResult> CreateSubRole([FromBody] SubRole subRole)
      {
        if (string.IsNullOrWhiteSpace(subRole.Name))
          return BadRequest("Il nome del SubRole non può essere vuoto.");

        _context.SubRoles.Add(subRole);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSubRole), new { id = subRole.ID }, subRole);
      }

      // PUT: api/SubRole/{id}
      [HttpPut("{id}")]
      public async Task<IActionResult> UpdateSubRole(int id, [FromBody] SubRole subRole)
      {
        if (id != subRole.ID)
          return BadRequest("ID SubRole non corrisponde.");

        var existingSubRole = await _context.SubRoles.FindAsync(id);
        if (existingSubRole == null)
          return NotFound("SubRole non trovato.");

        existingSubRole.Name = subRole.Name;
        await _context.SaveChangesAsync();

        return NoContent();
      }

      // DELETE: api/SubRole/{id}
      [HttpDelete("{id}")]
      public async Task<IActionResult> DeleteSubRole(int id)
      {
        var subRole = await _context.SubRoles.FindAsync(id);

        if (subRole == null)
          return NotFound("SubRole non trovato.");

        _context.SubRoles.Remove(subRole);
        await _context.SaveChangesAsync();

        return NoContent();
      }

    // POST: api/SubRole/AssignToUser
    [HttpPost("AssignToUser")]
    public async Task<IActionResult> AssignSubRoleToUser(string userId, int subRoleId)
    {
      var user = await _userManager.FindByIdAsync(userId);
      if (user == null)
        return NotFound("Utente non trovato.");

      var subRole = await _context.SubRoles.FindAsync(subRoleId);
      if (subRole == null)
        return NotFound("SubRole non trovato.");

      var userSubRole = new UserSubRole
      {
        UserId = user.Id,
        SubRoleId = subRole.ID
      };

      // Evita duplicati
      var exists = await _context.UserSubRoles.AnyAsync(ur => ur.UserId == userId && ur.SubRoleId == subRoleId);
      if (exists)
        return BadRequest("L'utente ha già questo SubRole.");

      _context.UserSubRoles.Add(userSubRole);
      await _context.SaveChangesAsync();

      return Ok("SubRole assegnato con successo.");
    }

    // DELETE: api/SubRole/RemoveFromUser
    [HttpPost("RemoveFromUser")]
    public async Task<IActionResult> RemoveSubRoleFromUser(string userId, int subRoleId)
    {
      var userSubRole = await _context.UserSubRoles
          .FirstOrDefaultAsync(ur => ur.UserId == userId && ur.SubRoleId == subRoleId);

      if (userSubRole == null)
        return NotFound("SubRole non assegnato a questo utente.");

      _context.UserSubRoles.Remove(userSubRole);
      await _context.SaveChangesAsync();

      return Ok("SubRole rimosso con successo.");
    }

    // GET: api/SubRole/UserSubRoles/{userId}
    [HttpGet("UserSubRoles/{userId}")]
    public async Task<IActionResult> GetUserSubRoles(string userId)
    {
      var user = await _userManager.FindByIdAsync(userId);
      if (user == null)
        return NotFound("Utente non trovato.");

      var subRoles = await _context.UserSubRoles
          .Where(ur => ur.UserId == userId)
          .Include(ur => ur.SubRole)
          .Select(ur => ur.SubRole.Name)
          .ToListAsync();

      return Ok(subRoles);
    }
  }
}