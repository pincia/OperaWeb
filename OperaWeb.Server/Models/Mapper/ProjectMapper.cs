using AutoMapper;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.Models.DTO.Project;

namespace OperaWeb.Server.Models.Mapper
{
  public class ProjectMapper
  {
    public static ProjectDTO ToProjectDTO(Project model)
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
          SoaCategorId = model.SoaCategory?.Id ?? -1,
          SoaClassificationID = model.SoaClassification?.Id ?? -1,
          Jobs = new List<JobDTO>()
        };

        // Pre-caricare lookup per accesso rapido
        var elencoPrezziLookup = model.ElencoPrezzi.ToDictionary(p => p.ID);
        var vociComputoLookup = model.VociComputo.GroupBy(v => v.SuperCategoriaID).ToDictionary(g => g.Key);
        var misureLookup = model.VociComputo
                            .Where(v => v.Misure != null) // Escludi VociComputo con Misure null
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

  }

}
