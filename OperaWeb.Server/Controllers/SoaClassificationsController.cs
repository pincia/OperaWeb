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
  public class SoaClassificationsController : ControllerBase
  {
    private readonly OperaWebDbContext _context;

    public SoaClassificationsController(OperaWebDbContext context)
    {
      _context = context;
    }

    // GET: api/Soa
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SoaClassification>>> GetSoaClassifications()
    {
      return await _context.SoaClassifications.ToListAsync();
    }

    // GET: api/Soa/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<SoaClassification>> GetSoaClassification(int id)
    {
      var soaClassification = await _context.SoaClassifications.FirstOrDefaultAsync(s => s.Id == id);

      if (soaClassification == null)
      {
        return NotFound();
      }

      return soaClassification;
    }

    // POST: api/Soa
    [HttpPost]
    public async Task<ActionResult<SoaClassification>> PostSoa(SoaClassification soaClassification)
    {
      if (soaClassification == null)
      {
        return BadRequest("Invalid Soa data.");
      }

      _context.SoaClassifications.Add(soaClassification);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetSoaClassification), new { id = soaClassification.Id }, soaClassification);
    }

    // PUT: api/Soa/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> PutSoa(int id, SoaClassification soaClassification)
    {
      if (id != soaClassification.Id)
      {
        return BadRequest("Soa ID mismatch.");
      }

      _context.Entry(soaClassification).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!SoaClassificationExists(id))
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
    public async Task<IActionResult> DeleteSoaClassification(int id)
    {
      var soaClassification = await _context.SoaClassifications.FindAsync(id);
      if (soaClassification == null)
      {
        return NotFound();
      }

      _context.SoaClassifications.Remove(soaClassification);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool SoaClassificationExists(int id)
    {
      return _context.Soas.Any(e => e.Id == id);
    }
  }
}
