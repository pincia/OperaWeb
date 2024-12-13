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
  public class SoasController : ControllerBase
  {
    private readonly OperaWebDbContext _context;

    public SoasController(OperaWebDbContext context)
    {
      _context = context;
    }

    // GET: api/Soa
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Soa>>> GetSoas()
    {
      return await _context.Soas.ToListAsync();
    }

    // GET: api/Soa/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Soa>> GetSoa(int id)
    {
      var soa = await _context.Soas
                                   .FirstOrDefaultAsync(s => s.Id == id);

      if (soa == null)
      {
        return NotFound();
      }

      return soa;
    }

    // POST: api/Soa
    [HttpPost]
    public async Task<ActionResult<Soa>> PostSoa(Soa soa)
    {
      if (soa == null)
      {
        return BadRequest("Invalid Soa data.");
      }

      _context.Soas.Add(soa);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetSoa), new { id = soa.Id }, soa);
    }

    // PUT: api/Soa/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> PutSoa(int id, Soa soa)
    {
      if (id != soa.Id)
      {
        return BadRequest("Soa ID mismatch.");
      }

      _context.Entry(soa).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!SoaExists(id))
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

    // DELETE: api/Soa/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSoa(int id)
    {
      var soa = await _context.Soas.FindAsync(id);
      if (soa == null)
      {
        return NotFound();
      }

      _context.Soas.Remove(soa);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool SoaExists(int id)
    {
      return _context.Soas.Any(e => e.Id == id);
    }
  }
}
