// ConfigurationsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.DataClasses.Context;
using YourNamespace.Models;

namespace OperaWeb.Server.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ConfigurationsController : ControllerBase
  {
    private readonly OperaWebDbContext _context;

    public ConfigurationsController(OperaWebDbContext context)
    {
      _context = context;
    }

    // Endpoint per salvare o aggiornare le configurazioni di un progetto
    [HttpPost("{projectId}/save-configurations")]
    public async Task<IActionResult> SaveConfigurations(int projectId, [FromBody] ProjectConfigurations configurations)
    {
      // Trova il progetto associato
      var project = await _context.Projects
          .Include(p => p.ProjectConfigurations)
          .FirstOrDefaultAsync(p => p.ID == projectId);

      if (project == null)
      {
        return NotFound(new { message = "Progetto non trovato." });
      }

      // Aggiorna o crea le configurazioni
      if (project.ConfigNumeri == null)
      {
        project.Configurations = new ProjectConfigurations
        {
          NPU = configurations.NPU,
          Lunghezza = configurations.Lunghezza,
          Larghezza = configurations.Larghezza,
          AltezzaPeso = configurations.AltezzaPeso,
          ProdottoQta = configurations.ProdottoQta,
          PrezzoValuta1 = configurations.PrezzoValuta1,
          PrezzoValuta2 = configurations.PrezzoValuta2,
          ImportoValuta1 = configurations.ImportoValuta1,
          ImportoValuta2 = configurations.ImportoValuta2,
          Aliquote = configurations.Aliquote,
          Currency = configurations.Currency
        };

        _context.Entry(project).State = EntityState.Modified;
      }
      else
      {
        // Aggiorna i campi esistenti
        project.Configurations.NPU = configurations.NPU;
        project.Configurations.Lunghezza = configurations.Lunghezza;
        project.Configurations.Larghezza = configurations.Larghezza;
        project.Configurations.AltezzaPeso = configurations.AltezzaPeso;
        project.Configurations.ProdottoQta = configurations.ProdottoQta;
        project.Configurations.PrezzoValuta1 = configurations.PrezzoValuta1;
        project.Configurations.PrezzoValuta2 = configurations.PrezzoValuta2;
        project.Configurations.ImportoValuta1 = configurations.ImportoValuta1;
        project.Configurations.ImportoValuta2 = configurations.ImportoValuta2;
        project.Configurations.Aliquote = configurations.Aliquote;
        project.Configurations.Currency = configurations.Currency;
      }

      try
      {
        await _context.SaveChangesAsync();
        return Ok(new { message = "Configurazioni salvate con successo." });
      }
      catch (DbUpdateException ex)
      {
        return StatusCode(500, new { message = "Errore durante il salvataggio delle configurazioni.", details = ex.Message });
      }
    }
  }
}

// ProjectConfigurations.cs
namespace YourNamespace.Models
{
  public class ProjectConfigurations
  {
    public int Id { get; set; }
    public int NPU { get; set; }
    public int Lunghezza { get; set; }
    public int Larghezza { get; set; }
    public int AltezzaPeso { get; set; }
    public int ProdottoQta { get; set; }
    public int PrezzoValuta1 { get; set; }
    public int PrezzoValuta2 { get; set; }
    public int ImportoValuta1 { get; set; }
    public int ImportoValuta2 { get; set; }
    public int Aliquote { get; set; }
    public string Currency { get; set; }
  }
}
