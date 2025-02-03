using Azure.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.VisualBasic;
using OperaWeb.Server.Models.XPVE;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.SharedClasses.Helpers;
using System.Globalization;
using System.Xml;
using System.Xml.Serialization;
using Services.UserGroup;
using System.Diagnostics.Metrics;
using System.Net;
using System.Reflection.Emit;
using Microsoft.AspNetCore.SignalR;
using OperaWeb.Server.Hubs;
using AutoMapper;
using OperaWeb.Server.Models.DTO.Project;
using OperaWeb.Server.Models.Mapper;
using OperaWeb.SharedClasses.Enums;

namespace OperaWeb.Server.Services.BLL
{
  public class ProjectServiceManager
  {
    private OperaWebDbContext _context;
    private readonly IHubContext<ImportHub> _hubContext;
    private ILogger _logger;
    private readonly IMapper _mapper;
    public ProjectServiceManager(OperaWebDbContext context, ILogger logger, IHubContext<ImportHub> hubContext, IMapper mapper)
    {
      _logger = logger;
      _context = context;
      _mapper = mapper;
      _hubContext = hubContext;
    }

    /// <summary>
    /// Importa idati ricevuti dall'xml nelle entità del server
    /// </summary>
    /// <param name="xmlString"></param>
    /// <param name="newProject"></param>
    /// <param name="connectionId"></param>
    /// <returns></returns>
    public async Task<ImportResult> ImportProjectDataAsync(string xmlString, Project newProject, string connectionId)
    {
      _logger.Log(LogLevel.Information, $"[ImportData] Start Import Data for project: {newProject}");

      // Risultato da restituire
      var result = new ImportResult { IsSuccess = false };

      // Step totali per la progressione
      const int totalSteps = 5;
      int currentStep = 0;

      // Metodo per inviare aggiornamenti
      async Task UpdateProgress()
      {
        int progress = ++currentStep * 100 / totalSteps;
        await _hubContext.Clients.Client(connectionId).SendAsync("UpdateProgress", progress);
      }
      // Avvia la transazione
      using var transaction = await _context.Database.BeginTransactionAsync();

      try
      {
        newProject.Status = ProjectStatus.Draft;
        // Step 1: Deserializzazione del documento XML
        PweDocumento importedPwe;
        using (var stringReader = new StringReader(StringHelper.RemoveInvalidXmlChars(xmlString)))
        {
          var serializer = new XmlSerializer(typeof(PweDocumento));
          importedPwe = (PweDocumento)serializer.Deserialize(stringReader);
        }
        await UpdateProgress();

        // Step 2: Importazione Dati Generali
        _logger.Log(LogLevel.Information, $"[ImportData] Import Dati Generali");
        var datiGenerali = new DatiGenerali
        {
          PercPrezzi = importedPwe.PweDatiGenerali.PweDGProgetto.PweDGDatiGenerali.PercPrezzi,
          Comune = importedPwe.PweDatiGenerali.PweDGProgetto.PweDGDatiGenerali.Comune,
          Provincia = importedPwe.PweDatiGenerali.PweDGProgetto.PweDGDatiGenerali.Provincia,
          Oggetto = importedPwe.PweDatiGenerali.PweDGProgetto.PweDGDatiGenerali.Oggetto,
          Committente = importedPwe.PweDatiGenerali.PweDGProgetto.PweDGDatiGenerali.Committente,
          Impresa = importedPwe.PweDatiGenerali.PweDGProgetto.PweDGDatiGenerali.Impresa,
          ParteOpera = importedPwe.PweDatiGenerali.PweDGProgetto.PweDGDatiGenerali.ParteOpera
        };

        newProject.Object = datiGenerali.Oggetto;
        newProject.City = datiGenerali.Comune;
        newProject.Province = datiGenerali.Provincia;
        newProject.Works = datiGenerali.ParteOpera;
        newProject.DatiGenerali = datiGenerali;
        var importedProject = _context.Projects.Add(newProject);
        datiGenerali.Project = importedProject.Entity;
        await UpdateProgress();

        // Step 3: Importazione Categorie, SuperCategorie e SubCategorie
        _logger.Log(LogLevel.Information, $"[ImportData] Import Categorie e SuperCategorie");
        var categoryLookup = new Dictionary<int, Categoria>();
        if (importedPwe.PweDatiGenerali.PweDGCapitoliCategorie.PweDGCategorie != null)
        {
          var categories = importedPwe.PweDatiGenerali.PweDGCapitoliCategorie.PweDGCategorie
            .Select(c => new Categoria
            {
              ExternalID = c.ID,
              DesSintetica = c.DesSintetica ?? "",
              DesEstesa = c.DesEstesa,
              DataInit = DateTime.ParseExact(c.DataInit, "dd/MM/yyyy", CultureInfo.InvariantCulture),
            // Durata = c.Durata,
              CodFase = c.CodFase,
              Percentuale = c.Percentuale,
              Codice = c.Codice,
              Project = importedProject.Entity
            }).ToList();
          _context.Categorie.AddRange(categories);
          categoryLookup = categories.ToDictionary(c => c.ExternalID);
          result.EntitiesImported["Categorie"] = categories.Count;
        }
        else
        {
          result.EntitiesImported["Categorie"] =0;
        }
        var superCategoryLookup = new Dictionary<int,SuperCategoria>();
        if (importedPwe.PweDatiGenerali.PweDGCapitoliCategorie.PweDGSuperCategorie != null)
        {
          var superCategories = importedPwe.PweDatiGenerali.PweDGCapitoliCategorie.PweDGSuperCategorie
          .Select(c => new SuperCategoria
          {
            ExternalID = c.ID,
            DesSintetica = c.DesSintetica ?? "",
            DesEstesa = c.DesEstesa ?? "",
            DataInit = DateTime.ParseExact(c.DataInit, "dd/MM/yyyy", null),
            //  Durata = c.Durata,
            CodFase = c.CodFase,
            Percentuale = c.Percentuale,
            Codice = c.Codice,
            Project = importedProject.Entity,
            JobType = JobTypes.Misura
          }).ToList();
          result.EntitiesImported["SuperCategorie"] = superCategories.Count;
          _context.SuperCategorie.AddRange(superCategories);
          superCategoryLookup = superCategories.ToDictionary(c => c.ExternalID);
        }
        else
        {
          result.EntitiesImported["SuperCategorie"] = 0;
        }

        var subCategoryLookup = new Dictionary<int, SubCategoria>();
        if (importedPwe.PweDatiGenerali.PweDGCapitoliCategorie.PweDGSubCategorie != null)
        {
          var subCategories = importedPwe.PweDatiGenerali.PweDGCapitoliCategorie.PweDGSubCategorie
              .Select(c => new SubCategoria
              {
                ExternalID = c.ID,
                DesSintetica = c.DesSintetica ?? "",
                DesEstesa = c.DesEstesa ?? "",
                DataInit = DateTime.ParseExact(c.DataInit, "dd/MM/yyyy", null),
                // Durata = c.Durata,
                CodFase = c.CodFase,
                Percentuale = c.Percentuale,
                Codice = c.Codice,
                Project = importedProject.Entity
              }).ToList();
          _context.SubCategorie.AddRange(subCategories);
          result.EntitiesImported["SubCategorie"] = subCategories.Count;
          subCategoryLookup = subCategories.ToDictionary(c => c.ExternalID);
        }
        else
        {
          result.EntitiesImported["SubCategorie"] = 0;
        }
       
        await UpdateProgress();

        // Step 4: Importazione Elenco Prezzi
        _logger.Log(LogLevel.Information, $"[ImportData] Import Elenco Prezzi");
        var elencoPrezzi = importedPwe.PweMisurazioni.PweElencoPrezzi
            .Select(e => new ElencoPrezzo
            {
              IDEP = e.ID,
              TipoEP = e.TipoEP,
              Tariffa = e.Tariffa,
              Articolo = e.Articolo,
              DesRidotta = e.DesRidotta ?? "",
              DesBreve = e.DesBreve ?? "",
              DesEstesa = e.DesEstesa ?? "",
              UnMisura = e.UnMisura ?? "",
              Prezzo1 = e.Prezzo1,
              Manodopera = e.Manodopera,
              Data = DateTime.ParseExact(e.Data, "dd/MM/yyyy", null),
              Project = importedProject.Entity
            }).ToList();

        _context.ElencoPrezzi.AddRange(elencoPrezzi);
        result.EntitiesImported["ElencoPrezzi"] = elencoPrezzi.Count;
        await UpdateProgress();

        var elencoPrezziLookup = elencoPrezzi.ToDictionary(e => e.IDEP);

        //Step5 Configurazioni
        var configNumeri = new ConfigNumeri
        {
          Valuta = SafeConvert.ToString(importedPwe.PweDatiGenerali.PweDGConfigurazione.PweDGConfigNumeri.Divisa),
          PartiUguali = SafeConvert.ToInt32(importedPwe.PweDatiGenerali.PweDGConfigurazione.PweDGConfigNumeri.PartiUguali.Split('|')[0].Split('.')[1]),
          Lunghezza = SafeConvert.ToInt32(importedPwe.PweDatiGenerali.PweDGConfigurazione.PweDGConfigNumeri.Lunghezza.Split('|')[0].Split('.')[1]),
          Larghezza = SafeConvert.ToInt32(importedPwe.PweDatiGenerali.PweDGConfigurazione.PweDGConfigNumeri.Larghezza.Split('|')[0].Split('.')[1]),
          HPeso = SafeConvert.ToInt32(importedPwe.PweDatiGenerali.PweDGConfigurazione.PweDGConfigNumeri.HPeso.Split('|')[0].Split('.')[1]),
          Quantita = SafeConvert.ToInt32(importedPwe.PweDatiGenerali.PweDGConfigurazione.PweDGConfigNumeri.Quantita.Split('|')[0].Split('.')[1]),
          Prezzi = SafeConvert.ToInt32(importedPwe.PweDatiGenerali.PweDGConfigurazione.PweDGConfigNumeri.Prezzi.Split('|')[0].Split('.')[1]),
          PrezziTotale = SafeConvert.ToInt32(importedPwe.PweDatiGenerali.PweDGConfigurazione.PweDGConfigNumeri.PrezziTotale.Split('|')[0].Split('.')[1]),
          ConvPrezzi = SafeConvert.ToInt32(importedPwe.PweDatiGenerali.PweDGConfigurazione.PweDGConfigNumeri.ConvPrezzi.Split('|')[0].Split('.')[1]),
          ConvPrezziTotale = SafeConvert.ToInt32(importedPwe.PweDatiGenerali.PweDGConfigurazione.PweDGConfigNumeri.ConvPrezziTotale.Split('|')[0].Split('.')[1]),
          IncidenzaPercentuale = SafeConvert.ToInt32(importedPwe.PweDatiGenerali.PweDGConfigurazione.PweDGConfigNumeri.IncidenzaPercentuale.Split('|')[0].Split('.')[1]),
          Aliquote = SafeConvert.ToInt32(importedPwe.PweDatiGenerali.PweDGConfigurazione.PweDGConfigNumeri.Aliquote.Split('|')[0].Split('.')[1])
        };
        configNumeri.Project = importedProject.Entity;
        newProject.ConfigNumeri = configNumeri;

        //Step 6 Configurazioni
        var analisi = new Analisi
        {
          SpeseUtili = SafeConvert.ToInt32(importedPwe.PweDatiGenerali.PweDGModuli.PweDGAnalisi.SpeseUtili),
          SpeseGenerali = SafeConvert.ToInt32(importedPwe.PweDatiGenerali.PweDGModuli.PweDGAnalisi.SpeseGenerali),
          UtiliImpresa = SafeConvert.ToInt32(importedPwe.PweDatiGenerali.PweDGModuli.PweDGAnalisi.UtiliImpresa),
          OneriAccessoriSc = SafeConvert.ToInt32(importedPwe.PweDatiGenerali.PweDGModuli.PweDGAnalisi.OneriAccessoriSc),
          ConfQuantita = SafeConvert.ToInt32(importedPwe.PweDatiGenerali.PweDGModuli.PweDGAnalisi.ConfQuantita),
        };
        analisi.Project = importedProject.Entity;
        newProject.Analisi = analisi;

        // Step 7: Importazione Voci Computo e Misurazioni
        // (Aggiungere il conteggio per VociComputo e Misure)
        var totalAmount = 0M;
        var vociComputo = new List<VoceComputo>();
        var misure = new List<Misura>();

        foreach (var voce in importedPwe.PweMisurazioni.PweVociComputo)
        {
         // if (!categoryLookup.ContainsKey(voce.IDCat)) continue;
          var exsitsSubCategory = subCategoryLookup.TryGetValue(voce.IDSbCat, out SubCategoria subCategory);
          var exsitsSuperCategory = superCategoryLookup.TryGetValue(voce.IDSpCat, out SuperCategoria superCategory);
          var exsitsCategory = categoryLookup.TryGetValue(voce.IDCat, out Categoria category);

          var voceComputo = new VoceComputo
          {
            ElencoPrezzo = elencoPrezziLookup.GetValueOrDefault(voce.IDEP),
            ElencoPrezzoID = voce.IDEP,
            Quantita = voce.Quantita,
            DataMis = DateTime.ParseExact(voce.DataMis, "dd/MM/yyyy", null),
            Flags = voce.Flags,
            Project = importedProject.Entity,
            Categoria = exsitsCategory ? category : null,
            SubCategoria = exsitsSubCategory ? subCategory : null,
            SuperCategoria = exsitsSuperCategory ? superCategory : null,
            JobType = JobTypes.Misura
          };


          //Aggiorno gli id esterni delle categorie
          if(voceComputo.Categoria != null && voceComputo.SuperCategoria != null && voceComputo.Categoria.SuperCategoriaId == null)
          {
            voceComputo.Categoria.SuperCategoria = voceComputo.SuperCategoria;
            _context.SaveChanges();
          }

          if (voceComputo.SubCategoria != null && voceComputo.Categoria != null && voceComputo.SubCategoria.CategoriaId == null)
          {
            voceComputo.SubCategoria.Categoria = voceComputo.Categoria;
            _context.SaveChanges();
          }

          foreach (var misura in voce.PweVCMisure)
          {
            var nuovaMisura = new Misura
            {
              IDVV = misura.IDVV,
              Descrizione = misura.Descrizione,
              PartiUguali = SafeConvert.ToDecimal(misura.PartiUguali),
              Lunghezza = SafeConvert.ToDecimal(misura.Lunghezza),
              Larghezza = SafeConvert.ToDecimal(misura.Larghezza),
              HPeso = SafeConvert.ToDecimal(misura.HPeso),
              Quantita = SafeConvert.ToDecimal(misura.Quantita),
              Flags = misura.Flags,
              VoceComputo = voceComputo
            };
            misure.Add(nuovaMisura);
           
          }
          
          voceComputo.Prezzo = misure.Where(m => m.VoceComputoID == voceComputo.ID).Sum(m => m.Quantita * m.VoceComputo.ElencoPrezzo?.Prezzo1 ?? 0);
          totalAmount += voceComputo.Prezzo;
          vociComputo.Add(voceComputo);
        }
        importedProject.Entity.TotalAmount = totalAmount;
        _context.VociComputo.AddRange(vociComputo);
        _context.Misure.AddRange(misure);

        // Conto economico
        importedProject.Entity.Economics = new Economics()
        {
          MeasuredWorks = vociComputo.Where(x => x.JobType == JobTypes.Misura).Sum(x => x.Prezzo),
          LaborCosts = vociComputo.Sum(x => ((x.Prezzo * x.ElencoPrezzo.Manodopera ?? 0) /100)),
          LumpSumWorks = vociComputo.Where(x => x.JobType == JobTypes.Corpo).Sum(x => x.Prezzo),
        };
        await _context.SaveChangesAsync();        
        result.EntitiesImported["VociComputo"] = vociComputo.Count;
        result.EntitiesImported["Misure"] = misure.Count;

   
        transaction.Commit();
        result.ImportedProject = ProjectMapper.ToProjectDTO(importedProject.Entity, true);

        await UpdateProgress();

        result.IsSuccess = true;
        result.ProjectId = importedProject.Entity.ID;
        result.Messages.Add("Import completed successfully.");
        _logger.Log(LogLevel.Information, $"[ImportData] End Import Data");
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, $"[ImportData] Error occurred: {ex.Message}");
        transaction.Rollback();
        result.IsSuccess = false;
        result.Messages.Add($"Import failed: {ex.Message}");
      }

      return result;
    }

    static bool IsValidXmlString(string text)
    {
      try
      {
        XmlConvert.VerifyXmlChars(text);
        return true;
      }
      catch
      {
        return false;
      }
    }
  }
}
