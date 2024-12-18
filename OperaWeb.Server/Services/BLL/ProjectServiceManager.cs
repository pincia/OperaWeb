﻿using Azure.Core;
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

namespace OperaWeb.Server.Services.BLL
{
    public class ProjectServiceManager
  {
    private OperaWebDbContext _context;
    private readonly IHubContext<ImportHub> _hubContext;
    private  ILogger _logger;

    public ProjectServiceManager(OperaWebDbContext context, ILogger logger, IHubContext<ImportHub> hubContext)
    {
        _logger = logger;
        _context = context;
      _hubContext = hubContext;
    }

    public async Task<int> ImportDataAsync(string xmlString, Project newProject, string connectionId)
    {
      _logger.Log(LogLevel.Information, $"[ImportData] Start Import Data for project: {newProject}");

      // Step 1: Deserializzazione del documento XML
      PweDocumento importedPwe;
      using (var stringReader = new StringReader(RemoveInvalidXmlChars(xmlString)))
      {
        var serializer = new XmlSerializer(typeof(PweDocumento));
        importedPwe = (PweDocumento)serializer.Deserialize(stringReader);
      }

      // Totale passi per calcolare la percentuale di avanzamento
      const int totalSteps = 5;
      int currentStep = 0;

      // Metodo per inviare aggiornamenti
      async Task UpdateProgress()
      {
        int progress = ++currentStep * 100 / totalSteps;
        await _hubContext.Clients.Client(connectionId).SendAsync("UpdateProgress", progress);
      }

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

      var importedProject = _context.Projects.Add(newProject);
      datiGenerali.Project = importedProject.Entity;

      await UpdateProgress();

      // Step 3: Importazione Categorie, SuperCategorie e SubCategorie
      _logger.Log(LogLevel.Information, $"[ImportData] Import Categorie e SuperCategorie");
      var categories = importedPwe.PweDatiGenerali.PweDGCapitoliCategorie.PweDGCategorie
          .Select(c => new Categoria
          {
            ExternalID = c.ID,
            DesSintetica = c.DesSintetica ?? "",
            DesEstesa = c.DesEstesa,
            DataInit = DateTime.ParseExact(c.DataInit, "dd/MM/yyyy", CultureInfo.InvariantCulture),
            Durata = c.Durata,
            CodFase = c.CodFase,
            Percentuale = c.Percentuale,
            Codice = c.Codice,
            Project = importedProject.Entity
          }).ToList();

      var superCategories = importedPwe.PweDatiGenerali.PweDGCapitoliCategorie.PweDGSuperCategorie
          .Select(c => new SuperCategoria
          {
            ExternalID = c.ID,
            DesSintetica = c.DesSintetica ?? "",
            DesEstesa = c.DesEstesa ?? "",
            DataInit = DateTime.ParseExact(c.DataInit, "dd/MM/yyyy", null),
            Durata = c.Durata,
            CodFase = c.CodFase,
            Percentuale = c.Percentuale,
            Codice = c.Codice,
            Project = importedProject.Entity
          }).ToList();

      _context.Categorie.AddRange(categories);
      _context.SuperCategorie.AddRange(superCategories);

      await UpdateProgress();

      // Dizionari per lookup rapido
      var categoryLookup = categories.ToDictionary(c => c.ExternalID);
      var superCategoryLookup = superCategories.ToDictionary(c => c.ExternalID);

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
            DesEstesa = e.DesEstesa ?? "",
            Prezzo1 = e.Prezzo1,
            Data = DateTime.ParseExact(e.Data, "dd/MM/yyyy", null),
            Project = importedProject.Entity
          }).ToList();

      _context.ElencoPrezzi.AddRange(elencoPrezzi);
      var elencoPrezziLookup = elencoPrezzi.ToDictionary(e => e.IDEP);

      await UpdateProgress();

      // Step 5: Importazione Voci Computo e Misurazioni
      _logger.Log(LogLevel.Information, $"[ImportData] Import Voci Computo e Misurazioni");
      var totalAmount = 0M;
      var vociComputo = new List<VoceComputo>();
      var misure = new List<Misura>();

      foreach (var voce in importedPwe.PweMisurazioni.PweVociComputo)
      {
        if (!categoryLookup.ContainsKey(voce.IDCat)) continue;

        var voceComputo = new VoceComputo
        {
          ElencoPrezzo = elencoPrezziLookup.GetValueOrDefault(voce.IDEP),
          ElencoPrezzoID = voce.IDEP,
          Quantita = voce.Quantita,
          DataMis = DateTime.ParseExact(voce.DataMis, "dd/MM/yyyy", null),
          Flags = voce.Flags,
          Project = importedProject.Entity,
          Categoria = categoryLookup[voce.IDCat]
        };

        foreach (var misura in voce.PweVCMisure)
        {
          var nuovaMisura = new Misura
          {
            IDVV = misura.IDVV,
            Descrizione = misura.Descrizione,
            PartiUguali = misura.PartiUguali,
            Lunghezza = SafeConvert.ToDecimal(misura.Lunghezza),
            Larghezza = SafeConvert.ToDecimal(misura.Larghezza),
            HPeso = SafeConvert.ToDecimal(misura.HPeso),
            Quantita = SafeConvert.ToDecimal(misura.Quantita),
            Flags = misura.Flags,
            VoceComputo = voceComputo
          };

          misure.Add(nuovaMisura);
          totalAmount += nuovaMisura.Quantita.GetValueOrDefault() * (voceComputo.ElencoPrezzo?.Prezzo1 ?? 0);
        }

        vociComputo.Add(voceComputo);
      }

      _context.VociComputo.AddRange(vociComputo);
      _context.Misure.AddRange(misure);

      await UpdateProgress();

      // Salvataggio
      importedProject.Entity.TotalAmount = totalAmount;
      _context.SaveChanges();

      _logger.Log(LogLevel.Information, $"[ImportData] End Import Data");
      return importedProject.Entity.ID;
    }





    static string RemoveInvalidXmlChars(string text)
    {
      var validXmlChars = text.Where(ch => XmlConvert.IsXmlChar(ch)).ToArray();
      return new string(validXmlChars);
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
