using AutoMapper;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.Models.DTO.Project;
using OperaWeb.Server.Models.DTO.Project.ProjectManagement.Models.DTO;
using System.Diagnostics.CodeAnalysis;

namespace OperaWeb.Server.Models.Mapper
{
  public class ProjectMapper
  {
    public static ProjectDTO ToProjectDTO(Project model, bool excludeTasks = false)
    {
      try
      {
        var dtoProject = new ProjectDTO
        {
          Id = model.ID,
          Object = model.Object,
          City = model.City,
          Works = model.Works,
          TotalAmount = model.TotalAmount,
          Notes = model.Notes,
          Public = model.Public,
          GIG = model.GIG,
          CUP = model.CUP,
          CreationDate = model.CreationDate,
          LastUpdateDate = model.LastUpdateDate,
          SoaCategoryId = model.SoaCategory?.Id ?? -1,
          SoaClassificationID = model.SoaClassification?.Id ?? -1,
          Jobs = new List<JobDTO>(),
          Configurations = new ConfigurationDTO
          {
            Numeri = model.ConfigNumeri != null ? new ConfigNumeriDTO()
            {
              PartiUguali = model.ConfigNumeri.PartiUguali,
              Lunghezza = model.ConfigNumeri.Lunghezza,
              Larghezza = model.ConfigNumeri.Larghezza,
              HPeso = model.ConfigNumeri.HPeso,
              Quantita = model.ConfigNumeri.Quantita,
              Prezzi = model.ConfigNumeri.Prezzi,
              PrezziTotale = model.ConfigNumeri.PrezziTotale,
              ConvPrezzi = model.ConfigNumeri.ConvPrezzi,
              ConvPrezziTotale = model.ConfigNumeri.ConvPrezziTotale,
              IncidenzaPercentuale = model.ConfigNumeri.IncidenzaPercentuale,
              Aliquote = model.ConfigNumeri.Aliquote
            } : new ConfigNumeriDTO(),
            Analisi = model.Analisi != null ? new ConfigAnalisiDTO()
            {
              SpeseUtili = model.Analisi.SpeseUtili,
              SpeseGenerali = model.Analisi.SpeseGenerali,
              UtiliImpresa = model.Analisi.UtiliImpresa,
              OneriAccessoriSc = model.Analisi.OneriAccessoriSc,
              ConfQuantita = model.Analisi.ConfQuantita,
              Metodo = model.Analisi.Metodo,
              ApplicataA = model.Analisi.ApplicataA
            } : new ConfigAnalisiDTO(),
          }
        };

        if (!excludeTasks)
        {
          // Mappa i ProjectTask in TaskDTO
          dtoProject.Tasks = model.ProjectTasks?.Select(task => new ProjectTaskDTO
          {
            Id = task.Id,
            Text = task.Name,
            StartDate = task.StartDate,
            Duration = task.Duration,
            Progress = (double)task.Progress,
            ParentId = task.ParentId,
            EndDate = task.EndDate,
            Priority = task.Priority,
            Color = task.Color,
            Type = task.Type
          }).ToList() ?? new List<ProjectTaskDTO>();
        }
        if (model.Economics != null)
        {
          dtoProject.Economics = new EconomicsDTO
          {
            MeasuredWorks = model.Economics.MeasuredWorks,
            LumpSumWorks = model.Economics.LumpSumWorks,
            SafetyCosts = model.Economics.SafetyCosts,
            LaborCosts = model.Economics.LaborCosts,
            AuctionVariationPercentage = model.Economics.AuctionVariationPercentage,
            AvailableSums = model.Economics.AvailableSums,
            TotalProjectCalculationType = model.Economics.TotalProjectCalculationType
          };
        }

        // Pre-caricare lookup per accesso rapido
        var elencoPrezziLookup = model.ElencoPrezzi.ToDictionary(p => p.ID);
        var vociComputoLookup = model.VociComputo.GroupBy(v => v.SuperCategoria.ID).ToDictionary(g => g.Key);
        var misureLookup = model.VociComputo
            .Where(v => v.Misure != null)
            .SelectMany(v => v.Misure)
            .ToList();

        // LAVORI A MISURA
        var lavoroAMisura = new JobDTO
        {
          Id = 1,
          Description = "LAVORI A MISURA",
          Children = new List<JobDTO>(),
          Level = 1,
          OriginalId = -1,
          HasEntry = false
        };

        dtoProject.Jobs.Add(lavoroAMisura);

        // Gestione SuperCategorie
        foreach (var superCategory in model.SuperCategorie)
        {
          var superCategoryDTO = new JobDTO
          {
            Id = superCategory.ID,
            Description = superCategory.DesSintetica,
            Children = new List<JobDTO>(),
            ParentId = lavoroAMisura.Id,
            Entries = new List<EntryDTO>(),
            Level = 2,
            OriginalId = superCategory.ID,
            HasEntry = false
          };

          lavoroAMisura.Children.Add(superCategoryDTO);

          if (vociComputoLookup.TryGetValue(superCategory.ID, out var vociCollegate))
          {
            foreach (var voce in vociCollegate)
            {
              if (!elencoPrezziLookup.TryGetValue(voce.ElencoPrezzoID, out var prezzo))
                continue;

              var entryDTO = new EntryDTO
              {
                Id = voce.ID,
                Unit = prezzo.UnMisura,
                Description = prezzo.DesBreve,
                Code = prezzo.Tariffa,
                Price = prezzo.Prezzo1,
                Measurements = voce.Misure?.Select(m => new MeasurementDTO
                {
                  Id = m.ID,
                  Quantita = m.Quantita ?? 0,
                  Description = m.Descrizione,
                  Lunghezza = m.Lunghezza ?? 0,
                  Larghezza = m.Larghezza ?? 0,
                  HPeso = m.HPeso ?? 0
                }).ToList() ?? new List<MeasurementDTO>()
              };

              // Organizzare le categorie e sottocategorie
              if (voce.SubCategoriaID == 0 && voce.CategoriaID == 0)
              {
                superCategoryDTO.HasEntry = true;
                superCategoryDTO.Entries.Add(entryDTO);
                continue;
              }

              // Categorie
              var categoryDTO = superCategoryDTO.Children.FirstOrDefault(j => j.Level == 3 && j.OriginalId == voce.CategoriaID);
              if (categoryDTO == null)
              {
                categoryDTO = new JobDTO
                {
                  Id = voce.Categoria.ID,
                  ParentId = superCategory.ID,
                  Description = voce.Categoria.DesSintetica,
                  Children = new List<JobDTO>(),
                  Level = 3,
                  OriginalId = voce.Categoria.ID,
                  Entries = new List<EntryDTO>(),
                  HasEntry = false
                };
                superCategoryDTO.Children.Add(categoryDTO);
              }

              if (voce.SubCategoriaID == 0)
              {
                categoryDTO.HasEntry = true;
                categoryDTO.Entries.Add(entryDTO);
                continue;
              }

              // SubCategorie
              var subCategoryDTO = categoryDTO.Children.FirstOrDefault(j => j.Level == 4 && j.OriginalId == voce.SubCategoriaID);
              if (subCategoryDTO == null)
              {
                subCategoryDTO = new JobDTO
                {
                  Id = voce.SubCategoria.ID,
                  Description = voce.SubCategoria.DesSintetica,
                  Children = new List<JobDTO>(),
                  Level = 4,
                  Entries = new List<EntryDTO>(),
                  ParentId = voce.Categoria.ID,
                  OriginalId = voce.SubCategoria.ID,
                  HasEntry = true
                };
                categoryDTO.Children.Add(subCategoryDTO);
              }

              subCategoryDTO.Entries.Add(entryDTO);
            }
          }
        }

        return dtoProject;
      }
      catch (Exception ex)
      {
        // Log error if necessary
        return new ProjectDTO();
      }
    }

    public static Project ToProject(ProjectDTO dto, List<ProjectSubjectRole> roles, Project existingProject = null)
    {
      try
      {
        var project = existingProject ?? new Project();

        project.ID = dto.Id;
        project.Object = dto.Object;
        project.City = dto.City;
        project.Works = dto.Works;
        project.TotalAmount = dto.TotalAmount;
        project.Notes = dto.Notes;
        project.Public = dto.Public;
        project.GIG = dto.GIG;
        project.CUP = dto.CUP;
        project.CreationDate = dto.CreationDate;
        project.LastUpdateDate = dto.LastUpdateDate;

        if (dto.SoaCategoryId > 0)
        {
          project.SoaCategoryId = dto.SoaCategoryId ?? 0;
        }

        if (dto.SoaClassificationID > 0)
        {
          project.SoaClassificationId = dto.SoaClassificationID ?? 0;
        }

        project.ProjectTasks = dto.Tasks?.Select(task => new ProjectTask
        {
          Id = task.Id,
          Name = task.Text,
          StartDate = task.StartDate,
          Duration = task.Duration,
          Progress = (decimal)task.Progress,
          ParentId = task.ParentId,
          EndDate = task.EndDate ?? task.StartDate.AddDays(task.Duration),
          Priority = task.Priority,
          Color = task.Color,
          Type = task.Type,
          ProjectId = dto.Id
        }).ToList();

        if (dto.Economics != null)
        {
          if (existingProject?.Economics == null)
          {
            project.Economics = new Economics();
          }

          project.Economics.MeasuredWorks = dto.Economics.MeasuredWorks;
          project.Economics.LumpSumWorks = dto.Economics.LumpSumWorks;
          project.Economics.SafetyCosts = dto.Economics.SafetyCosts;
          project.Economics.LaborCosts = dto.Economics.LaborCosts;
          project.Economics.AuctionVariationPercentage = dto.Economics.AuctionVariationPercentage;
          project.Economics.AvailableSums = dto.Economics.AvailableSums;
          project.Economics.TotalProjectCalculationType = dto.Economics.TotalProjectCalculationType;
        }


        if (dto.Configurations != null)
        {
          if (dto.Configurations.Numeri != null)
          {
            project.ConfigNumeri = new ConfigNumeri
            {
              PartiUguali = dto.Configurations.Numeri.PartiUguali,
              Lunghezza = dto.Configurations.Numeri.Lunghezza,
              Larghezza = dto.Configurations.Numeri.Larghezza,
              HPeso = dto.Configurations.Numeri.HPeso,
              Quantita = dto.Configurations.Numeri.Quantita,
              Prezzi = dto.Configurations.Numeri.Prezzi,
              PrezziTotale = dto.Configurations.Numeri.PrezziTotale,
              ConvPrezzi = dto.Configurations.Numeri.ConvPrezzi,
              ConvPrezziTotale = dto.Configurations.Numeri.ConvPrezziTotale,
              IncidenzaPercentuale = dto.Configurations.Numeri.IncidenzaPercentuale,
              Aliquote = dto.Configurations.Numeri.Aliquote,
              ProjectID = project.ID
            };
          }
          if (dto.Configurations.Analisi != null)
          {
            project.Analisi = new Analisi
            {
              SpeseUtili = dto.Configurations.Analisi.SpeseUtili,
              SpeseGenerali = dto.Configurations.Analisi.SpeseGenerali,
              UtiliImpresa = dto.Configurations.Analisi.UtiliImpresa,
              OneriAccessoriSc = dto.Configurations.Analisi.OneriAccessoriSc,
              ConfQuantita = dto.Configurations.Analisi.ConfQuantita,
              Metodo = dto.Configurations.Analisi.Metodo,
              ApplicataA = dto.Configurations.Analisi.ApplicataA,
              ProjectID = project.ID
            };
          }
        }
        return project;
      }
      catch (Exception ex)
      {
        throw new Exception("Errore durante la mappatura del DTO su Project", ex);
      }
    }
  }
}
