using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.DataClasses.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OperaWeb.Server.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ConfigNumeriController : ControllerBase
  {
    private readonly OperaWebDbContext _context;

    public ConfigNumeriController(OperaWebDbContext context)
    {
      _context = context;
    }

    // GET: api/ConfigNumeri
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ConfigNumeri>>> GetConfigNumeri()
    {
      return await _context.ConfigNumeri.ToListAsync();
    }

    // GET: api/ConfigNumeri/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<ConfigNumeri>> GetConfigNumeri(int id)
    {
      var configNumeri = await _context.ConfigNumeri.FindAsync(id);

      if (configNumeri == null)
      {
        return NotFound();
      }

      return configNumeri;
    }

    // POST: api/ConfigNumeri
    [HttpPost]
    public async Task<ActionResult<ConfigNumeri>> PostConfigNumeri(ConfigNumeri configNumeri)
    {
      _context.ConfigNumeri.Add(configNumeri);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetConfigNumeri", new { id = configNumeri.ID }, configNumeri);
    }

    // PUT: api/ConfigNumeri/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> PutConfigNumeri(int id, ConfigNumeri configNumeri)
    {
      if (id != configNumeri.ID)
      {
        return BadRequest();
      }

      _context.Entry(configNumeri).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!ConfigNumeriExists(id))
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

    // DELETE: api/ConfigNumeri/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteConfigNumeri(int id)
    {
      var configNumeri = await _context.ConfigNumeri.FindAsync(id);
      if (configNumeri == null)
      {
        return NotFound();
      }

      _context.ConfigNumeri.Remove(configNumeri);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool ConfigNumeriExists(int id)
    {
      return _context.ConfigNumeri.Any(e => e.ID == id);
    }
  }
}
