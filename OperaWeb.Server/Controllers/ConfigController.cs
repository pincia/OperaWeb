using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.Models.DTO;
using OperaWeb.Server.Models.DTO.Project;
using System.Linq;
using System.Security.Claims;
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

    [HttpGet]
    public async Task<IActionResult> GetConfigurations()
    {
      var userId = User.FindFirstValue("Id");

      // Recupera la configurazione specifica per l'utente
      var configuration = await Task.Run(() =>
          _context.Configuration
              .Include(c => c.ConfigNumeri)
              .Include(c => c.ProjectResourceTeamType)
              .Include(c => c.Analisi)
              .Where(c => c.ApplicationUserId == userId)
              .FirstOrDefault()
      );

      if (configuration == null)
      {
        configuration = new DataClasses.Models.Configuration()
        {
          ConfigNumeri = new ConfigNumeri() { Valuta = "Euro"},
          Analisi = new Analisi(),
          ProjectResourceTeamType = new ProjectResourceTeamType(),
          ApplicationUserId = userId
        };
        _context.Configuration.Add(configuration);
        await _context.SaveChangesAsync();
      }
      
      // Mappa i dati nel nuovo DTO
      var result = new GeneralConfigurationDTO
      {
        ConfigNumeri = configuration.ConfigNumeri != null
              ? new ConfigNumeriDTO
              {
                PartiUguali = configuration.ConfigNumeri.PartiUguali,
                Lunghezza = configuration.ConfigNumeri.Lunghezza,
                Larghezza = configuration.ConfigNumeri.Larghezza,
                HPeso = configuration.ConfigNumeri.HPeso,
                Quantita = configuration.ConfigNumeri.Quantita,
                Prezzi = configuration.ConfigNumeri.Prezzi,
                PrezziTotale = configuration.ConfigNumeri.PrezziTotale,
                ConvPrezzi = configuration.ConfigNumeri.ConvPrezzi,
                ConvPrezziTotale = configuration.ConfigNumeri.ConvPrezziTotale,
                IncidenzaPercentuale = configuration.ConfigNumeri.IncidenzaPercentuale,
                Aliquote = configuration.ConfigNumeri.Aliquote,
                Valuta = configuration.ConfigNumeri.Valuta
              }
              : null,

        ConfigAnalisi = configuration.Analisi != null
              ? new ConfigAnalisiDTO
              {
                SpeseUtili = configuration.Analisi.SpeseUtili,
                SpeseGenerali = configuration.Analisi.SpeseGenerali,
                UtiliImpresa = configuration.Analisi.UtiliImpresa,
                OneriAccessoriSc = configuration.Analisi.OneriAccessoriSc,
                ConfQuantita = configuration.Analisi.ConfQuantita,
                ApplicataA = configuration.Analisi.ApplicataA,
                Metodo = configuration.Analisi.Metodo
              }
              : null,

        ResourceTeamType = configuration.ProjectResourceTeamType != null
              ? new ResourceTeamTypeDTO
              {
                Id = configuration.ProjectResourceTeamType.Id,
                SpecializedQuantity = configuration.ProjectResourceTeamType.SpecializedQuantity,
                SpecializedHourlyRate = configuration.ProjectResourceTeamType.SpecializedHourlyRate,
                QualifiedQuantity = configuration.ProjectResourceTeamType.QualifiedQuantity,
                QualifiedHourlyRate = configuration.ProjectResourceTeamType.QualifiedHourlyRate,
                CommonQuantity = configuration.ProjectResourceTeamType.CommonQuantity,
                CommonHourlyRate = configuration.ProjectResourceTeamType.CommonHourlyRate
              }
              : null
      };

      return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> SaveConfigurations([FromBody] GeneralConfigurationDTO configurationDto)
    {
      var userId = User.FindFirstValue("Id");

      if (userId == null)
      {
        return Unauthorized(new { Message = "L'utente non è autenticato." });
      }

      // Recupera la configurazione specifica per l'utente
      var configuration = await _context.Configuration
          .Include(c => c.ConfigNumeri)
          .Include(c => c.ProjectResourceTeamType)
          .Include(c => c.Analisi)
          .FirstOrDefaultAsync(c => c.ApplicationUserId == userId);

      if (configuration == null)
      {
        // Se non esiste, crea una nuova configurazione
        configuration = new DataClasses.Models.Configuration
        {
          ApplicationUserId = userId,
          ConfigNumeri = new ConfigNumeri(),
          Analisi = new Analisi(),
          ProjectResourceTeamType = new ProjectResourceTeamType()
        };

        _context.Configuration.Add(configuration);
      }

      // Aggiorna ConfigNumeri
      if (configurationDto.ConfigNumeri != null)
      {
        configuration.ConfigNumeri.PartiUguali = configurationDto.ConfigNumeri.PartiUguali;
        configuration.ConfigNumeri.Lunghezza = configurationDto.ConfigNumeri.Lunghezza;
        configuration.ConfigNumeri.Larghezza = configurationDto.ConfigNumeri.Larghezza;
        configuration.ConfigNumeri.HPeso = configurationDto.ConfigNumeri.HPeso;
        configuration.ConfigNumeri.Quantita = configurationDto.ConfigNumeri.Quantita;
        configuration.ConfigNumeri.Prezzi = configurationDto.ConfigNumeri.Prezzi;
        configuration.ConfigNumeri.PrezziTotale = configurationDto.ConfigNumeri.PrezziTotale;
        configuration.ConfigNumeri.ConvPrezzi = configurationDto.ConfigNumeri.ConvPrezzi;
        configuration.ConfigNumeri.ConvPrezziTotale = configurationDto.ConfigNumeri.ConvPrezziTotale;
        configuration.ConfigNumeri.IncidenzaPercentuale = configurationDto.ConfigNumeri.IncidenzaPercentuale;
        configuration.ConfigNumeri.Aliquote = configurationDto.ConfigNumeri.Aliquote;
        configuration.ConfigNumeri.Valuta = configurationDto.ConfigNumeri.Valuta;
      }

      // Aggiorna Analisi
      if (configurationDto.ConfigAnalisi != null)
      {
        configuration.Analisi.SpeseUtili = configurationDto.ConfigAnalisi.SpeseUtili;
        configuration.Analisi.SpeseGenerali = configurationDto.ConfigAnalisi.SpeseGenerali;
        configuration.Analisi.UtiliImpresa = configurationDto.ConfigAnalisi.UtiliImpresa;
        configuration.Analisi.OneriAccessoriSc = configurationDto.ConfigAnalisi.OneriAccessoriSc;
        configuration.Analisi.ConfQuantita = configurationDto.ConfigAnalisi.ConfQuantita;
        configuration.Analisi.ApplicataA = configurationDto.ConfigAnalisi.ApplicataA;
        configuration.Analisi.Metodo = configurationDto.ConfigAnalisi.Metodo;
      }

      // Aggiorna ResourceTeamType
      if (configurationDto.ResourceTeamType != null)
      {
        configuration.ProjectResourceTeamType.SpecializedQuantity = configurationDto.ResourceTeamType.SpecializedQuantity;
        configuration.ProjectResourceTeamType.SpecializedHourlyRate = configurationDto.ResourceTeamType.SpecializedHourlyRate;
        configuration.ProjectResourceTeamType.QualifiedQuantity = configurationDto.ResourceTeamType.QualifiedQuantity;
        configuration.ProjectResourceTeamType.QualifiedHourlyRate = configurationDto.ResourceTeamType.QualifiedHourlyRate;
        configuration.ProjectResourceTeamType.CommonQuantity = configurationDto.ResourceTeamType.CommonQuantity;
        configuration.ProjectResourceTeamType.CommonHourlyRate = configurationDto.ResourceTeamType.CommonHourlyRate;
      }

      await _context.SaveChangesAsync();

      return Ok(new { Message = "Configurazioni salvate con successo." });
    }

  }
}

