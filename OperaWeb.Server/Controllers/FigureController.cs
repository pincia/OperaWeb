using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OperaWeb.Server.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class FigureController : ControllerBase
  {
    private readonly OperaWebDbContext _context;

    public FigureController(OperaWebDbContext context)
    {
      _context = context;
    }

    /// <summary>
    /// Retrieves all available company figures.
    /// </summary>
    /// <returns>List of company figures</returns>
    [HttpGet]
    public async Task<IActionResult> GetAllFigures()
    {
      var figures = await _context.Figures.ToListAsync();
      if (figures == null || figures.Count == 0)
      {
        return NotFound("No company figures found.");
      }
      return Ok(figures);
    }
  }
}
