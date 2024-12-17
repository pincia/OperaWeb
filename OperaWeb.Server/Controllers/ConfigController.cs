using Microsoft.AspNetCore.Mvc;
using OperaWeb.Server.DataClasses.Context;
using System.Linq;
using System.Threading.Tasks;

namespace OperaWeb.Server.Controllers
{
  [Route("api/config")]
  [ApiController]
  public class ConfigController : ControllerBase
  {
    private readonly OperaWebDbContext _context;

    public ConfigController(OperaWebDbContext context)
    {
      _context = context;
    }

    /// <summary>
    /// Recupera tutte le province.
    /// </summary>
    [HttpGet("provinces")]
    public IActionResult GetProvinces()
    {
      var provinces = _context.Province
          .Select(p => new
          {
            p.Id,
            p.Nome
          })
          .ToList();

      return Ok(provinces);
    }

    /// <summary>
    /// Recupera i comuni associati a una specifica provincia.
    /// </summary>
    [HttpGet("cities/{provinceId}")]
    public IActionResult GetCities(int provinceId)
    {
      var cities = _context.Comuni
          .Where(c => c.ProvinciaId == provinceId)
          .Select(c => new
          {
            c.Id,
            c.Nome
          })
          .ToList();

      return Ok(cities);
    }
  }
}
