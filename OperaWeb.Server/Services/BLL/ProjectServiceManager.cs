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

namespace OperaWeb.Server.Services.BLL
{
    public class ProjectServiceManager
  {
    private OperaWebDbContext _context;

    private  ILogger _logger;

    public ProjectServiceManager(OperaWebDbContext context, ILogger logger)
    {
        _logger = logger;
        _context = context;
    }

    /// <summary>
    /// Imports data from xmlString to a new Project
    /// </summary>
    /// <param name="xmlString"></param>
    /// <param name="newProject"></param>
    public void ImportData(string xmlString, Progetto newProject)
    {
      _logger.Log(LogLevel.Information, $"[ImportData] Start Import Data for project: {newProject}");

      var importedProject = _context.Progetti.Add(newProject);

      PweDocumento importedPwe;

      using (var stringReader = new StringReader(RemoveInvalidXmlChars(xmlString)))
      {
        var serializer = new XmlSerializer(typeof(PweDocumento));
        importedPwe = (PweDocumento)serializer.Deserialize(stringReader);
      }

      _logger.Log(LogLevel.Information, $"[ImportData] Start Import Data -> Dati Generali");
      //dati generali
      _context.DatiGenerali.Add(new DatiGenerali()
      {
        PercPrezzi = importedPwe.PweDatiGenerali.PweDGProgetto.PweDGDatiGenerali.PercPrezzi,
        Comune = importedPwe.PweDatiGenerali.PweDGProgetto.PweDGDatiGenerali.Comune,
        Provincia = importedPwe.PweDatiGenerali.PweDGProgetto.PweDGDatiGenerali.Provincia,
        Oggetto = importedPwe.PweDatiGenerali.PweDGProgetto.PweDGDatiGenerali.Oggetto,
        Committente = importedPwe.PweDatiGenerali.PweDGProgetto.PweDGDatiGenerali.Committente,
        Impresa = importedPwe.PweDatiGenerali.PweDGProgetto.PweDGDatiGenerali.Impresa,
        ParteOpera = importedPwe.PweDatiGenerali.PweDGProgetto.PweDGDatiGenerali.ParteOpera,
        Progetto = importedProject.Entity
      });

      _logger.Log(LogLevel.Information, $"[ImportData] Start Import Data -> Categorie");
      //Categorie
      List<EntityEntry<Categoria>> addedCategories = new List<EntityEntry<Categoria>>();

      foreach (var importedCategoria in importedPwe.PweDatiGenerali.PweDGCapitoliCategorie.PweDGCategorie)
      {
        addedCategories.Add(_context.Categorie.Add(new Categoria()
        {
          ExternalID = importedCategoria.ID,
          DesSintetica = importedCategoria.DesSintetica,
          DesEstesa = importedCategoria.DesEstesa,
          DataInit = DateTime.ParseExact(importedCategoria.DataInit, "dd/MM/yyyy", CultureInfo.InvariantCulture),
          Durata = importedCategoria.Durata,
          CodFase = importedCategoria.CodFase,
          Percentuale = importedCategoria.Percentuale,
          Codice = importedCategoria.Codice,
          Progetto = importedProject.Entity
        }));
      }

      List<EntityEntry<SuperCategoria>> addedSuperCategories = new List<EntityEntry<SuperCategoria>>();

      _logger.Log(LogLevel.Information, $"[ImportData] Start Import Data -> SuperCategorie");
      foreach (var importedCategoria in importedPwe.PweDatiGenerali.PweDGCapitoliCategorie.PweDGSuperCategorie)
      {
        addedSuperCategories.Add(_context.SuperCategorie.Add(new SuperCategoria()
        {
          ExternalID = importedCategoria.ID,
          DesSintetica = importedCategoria.DesSintetica,
          DesEstesa = importedCategoria.DesEstesa,
          DataInit = DateTime.ParseExact(importedCategoria.DataInit, "dd/MM/yyyy", null),
          Durata = importedCategoria.Durata,
          CodFase = importedCategoria.CodFase,
          Percentuale = importedCategoria.Percentuale,
          Codice = importedCategoria.Codice,
          Progetto = importedProject.Entity
        }));
      }

      List<EntityEntry<SubCategoria>> addedSubCategories = new List<EntityEntry<SubCategoria>>();

      _logger.Log(LogLevel.Information, $"[ImportData] Start Import Data -> SubCategorie");
      foreach (var importedCategoria in importedPwe.PweDatiGenerali.PweDGCapitoliCategorie.PweDGSubCategorie)
      {
        addedSubCategories.Add( _context.SubCategorie.Add(new SubCategoria()
        {
          ExternalID = importedCategoria.ID,
          DesSintetica = importedCategoria.DesSintetica,
          DesEstesa = importedCategoria.DesEstesa,
          DataInit = DateTime.ParseExact(importedCategoria.DataInit, "dd/MM/yyyy", null),
          Durata = importedCategoria.Durata,
          CodFase = importedCategoria.CodFase,
          Percentuale = importedCategoria.Percentuale,
          Codice = importedCategoria.Codice,
          Progetto = importedProject.Entity
        }));

      }

      _logger.Log(LogLevel.Information, $"[ImportData] Start Import Data -> ElencoPrezzi");
      //elenco prezzi
      foreach (var importedPrezzo in importedPwe.PweMisurazioni.PweElencoPrezzi)
      {
        _context.ElencoPrezzi.Add(new ElencoPrezzo()
        {
          TipoEP = importedPrezzo.TipoEP,
          Tariffa = importedPrezzo.Tariffa,
          Articolo = importedPrezzo.Articolo,
          DesRidotta = importedPrezzo.DesRidotta,
          DesEstesa = importedPrezzo.DesEstesa,
          DesBreve = importedPrezzo.DesBreve,
          UnMisura = importedPrezzo.UnMisura,
          Prezzo1 = importedPrezzo.Prezzo1,
          Prezzo2 = importedPrezzo.Prezzo2,
          Prezzo3 = importedPrezzo.Prezzo3,
          Prezzo4 = importedPrezzo.Prezzo4,
          Prezzo5 = importedPrezzo.Prezzo5,
          SuperCapID = 0,
          SubCapID = 0,
          CapID = 0,
          Flags = importedPrezzo.Flags,
          Data = DateTime.ParseExact(importedPrezzo.Data, "dd/MM/yyyy", null),
          AdrInternet = importedPrezzo.AdrInternet,
          PweEPAnalisi = importedPrezzo.PweEPAnalisi,
          Progetto = importedProject.Entity
        });
      }

      int count = 0;

      _logger.Log(LogLevel.Information, $"[ImportData] Start Import Data -> Voci Computo Start");
      //voci computo
      foreach (var voceComputoImported in importedPwe.PweMisurazioni.PweVociComputo)
      {
        if (voceComputoImported.IDCat <= 0) 
        {
          continue;
        }
        
        var category = addedCategories.FirstOrDefault(c => c.Entity.ExternalID == voceComputoImported.IDCat && c.Entity.ProgettoID == importedProject.Entity.ID);
        if (category == null) 
        {
          continue;
        }

        if (voceComputoImported.IDSpCat <= 0)
        {
          continue;
        }

        var superCategory = addedSuperCategories.FirstOrDefault(c => c.Entity.ExternalID == voceComputoImported.IDCat && c.Entity.ProgettoID == importedProject.Entity.ID);
        if (superCategory == null)
        {
          continue;
        }

        if (voceComputoImported.IDSbCat <= 0)
        {
          continue;
        }

        var subCategory = addedSubCategories.FirstOrDefault(c => c.Entity.ExternalID == voceComputoImported.IDCat && c.Entity.ProgettoID == importedProject.Entity.ID);
        if (subCategory == null)
        {
          continue;
        }

        var newVoceComputo = new VoceComputo()
        {
          IDEP = voceComputoImported.IDEP,
          Quantita = voceComputoImported.Quantita,
          DataMis = DateTime.ParseExact(voceComputoImported.DataMis, "dd/MM/yyyy", null),
          Flags = voceComputoImported.Flags,
          Progetto = importedProject.Entity,
          Categoria = category.Entity,
          SubCategoria = subCategory.Entity,
          SuperCategoria = superCategory.Entity
        };

        //misurazioni
        foreach (var misurazioneImpoerted in voceComputoImported.PweVCMisure)
        {
          _context.Misure.Add(new Misura()
          {
            IDVV = misurazioneImpoerted.IDVV,
            Descrizione = misurazioneImpoerted.Descrizione,
            PartiUguali = misurazioneImpoerted.PartiUguali,
            Lunghezza = SafeConvert.ToDecimal(misurazioneImpoerted.Lunghezza),
            Larghezza = SafeConvert.ToDecimal(misurazioneImpoerted.Larghezza),
            HPeso = SafeConvert.ToDecimal(misurazioneImpoerted.HPeso),
            Quantita = SafeConvert.ToDecimal(misurazioneImpoerted.Quantita),
            Flags = misurazioneImpoerted.Flags,
            VoceComputo = newVoceComputo
          });
        }
        
        if(count%10 == 0)
        {
          _logger.Log(LogLevel.Information, $"[ImportData] Start Import Data -> Voci Computo Importing -> Count: {count}");
        }


        count++;
      }

      _logger.Log(LogLevel.Information, $"[ImportData] End Import Data");
      _context.SaveChanges();
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
