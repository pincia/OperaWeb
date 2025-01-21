using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.Models.DTO.Project;
using OperaWeb.Server.Models.DTO.Project.ProjectManagement.Models.DTO;
using OperaWeb.SharedClasses.Enums;
using System.Diagnostics.CodeAnalysis;

namespace OperaWeb.Server.Models.Mapper
{
  public class ProjectMapper
  {
    /// <summary>
    /// Converts project in to dto
    /// </summary>
    /// <param name="model"></param>
    /// <param name="excludeTasks"></param>
    /// <returns></returns>
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
          Province = model.Province,
          Notes = model.Notes,
          Public = model.Public,
          GIG = model.GIG ?? "",
          CUP = model.CUP ?? "",
          CreationDate = model.CreationDate,
          LastUpdateDate = model.LastUpdateDate,
          SoaCategoryId = model.SoaCategoryId,
          SoaClassificationId = model.SoaClassificationId,
          Jobs = new List<JobDTO>(),
          Configurations = new ConfigurationDTO
          {
            Numeri = model.ConfigNumeri != null
                    ? new ConfigNumeriDTO
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
                      Aliquote = model.ConfigNumeri.Aliquote,
                      Valuta = model.ConfigNumeri.Valuta,
                    }
                    : new ConfigNumeriDTO(),
            Analisi = model.Analisi != null
                    ? new ConfigAnalisiDTO
                    {
                      SpeseUtili = model.Analisi.SpeseUtili,
                      SpeseGenerali = model.Analisi.SpeseGenerali,
                      UtiliImpresa = model.Analisi.UtiliImpresa,
                      OneriAccessoriSc = model.Analisi.OneriAccessoriSc,
                      ConfQuantita = model.Analisi.ConfQuantita,
                      Metodo = model.Analisi.Metodo,
                      ApplicataA = model.Analisi.ApplicataA
                    }
                    : new ConfigAnalisiDTO(),
            ResourceTeamType = model.ProjectResourceTeamType != null ? new ResourceTeamTypeDTO
            {
              Id = model.ProjectResourceTeamType.Id,
              ProjectId = model.ProjectResourceTeamType.ProjectId,
              SpecializedQuantity = model.ProjectResourceTeamType.SpecializedQuantity,
              SpecializedHourlyRate = model.ProjectResourceTeamType.SpecializedHourlyRate,
              QualifiedQuantity = model.ProjectResourceTeamType.QualifiedQuantity,
              QualifiedHourlyRate = model.ProjectResourceTeamType.QualifiedHourlyRate,
              CommonQuantity = model.ProjectResourceTeamType.CommonQuantity,
              CommonHourlyRate = model.ProjectResourceTeamType.CommonHourlyRate
            } : new ResourceTeamTypeDTO()
          },
          Latitude = model.Latitude,
          Longitude = model.Longitude,
          Status = (int) model.Status,
          CompleteAddress = model.CompleteAddress ?? "",
          Subjects = model.ProjectSubjects?.Select(subject => new SubjectDTO
          {
            FirstName = subject.FirstName,
            LastName = subject.LastName,
            Email = subject.Email,
            Status = subject.Status,
            CreatedAt = subject.CreatedAt,
            UserId = subject.UserId,
            Role = subject.ProjectSubjectRole?.Name,
            Cf = subject.User?.TaxCode,
            CfPiva = subject.User?.Company.VatOrTaxCode,
            Company = subject.Company,
            Figure = subject.Type,
            Invite = subject.Invitation != null
          }).ToList() ?? new List<SubjectDTO>()
        };

        if (!excludeTasks)
        {
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

        var elencoPrezziLookup = model.ElencoPrezzi.ToDictionary(p => p.ID);
        var vociComputoLookup = model.VociComputo.GroupBy(v => v.SuperCategoria.ID).ToDictionary(g => g.Key);

        var lavoroAMisura = new JobDTO
        {
          Id = "1",
          Description = "LAVORI A MISURA",
          Children = new List<JobDTO>(),
          Level = 1,
          OriginalId = -1,
          HasEntry = false,
          Entries = new List<EntryDTO>(),
        };

        dtoProject.Jobs.Add(lavoroAMisura);

        // Creazione di un dizionario per velocizzare l'accesso ai JobDTO di SuperCategoria, Categoria e SubCategoria
        var superCategoryLookup = new Dictionary<int, JobDTO>();
        var categoryLookup = new Dictionary<int, JobDTO>();
        var subCategoryLookup = new Dictionary<int, JobDTO>();

        if (model.SuperCategorie != null)
        {
        // Itera sulle SuperCategorie per creare i nodi di livello 2
          foreach (var superCategory in model.SuperCategorie)
          {
            var superCategoryDTO = new JobDTO
            {
              Id = superCategory.ID.ToString(),
              Description = superCategory.DesSintetica,
              Children = new List<JobDTO>(),
              ParentId = lavoroAMisura.Id,
              Level = 2,
              OriginalId = superCategory.ID,
              Entries = new List<EntryDTO>(),
              HasEntry = false
            };

            superCategoryLookup[superCategory.ID] = superCategoryDTO;
            lavoroAMisura.Children.Add(superCategoryDTO);
          }
        }

        if (model.Categorie != null)
        {
          // Itera sulle Categorie per creare i nodi di livello 3
          foreach (var category in model.Categorie)
          {
            if (category.SuperCategoriaId.HasValue && superCategoryLookup.TryGetValue(category.SuperCategoriaId.Value, out var parentSuperCategory))
            {
              var categoryDTO = new JobDTO
              {
                Id = category.ID.ToString(),
                Description = category.DesSintetica,
                Children = new List<JobDTO>(),
                ParentId = parentSuperCategory.Id,
                Level = 3,
                OriginalId = category.ID,
                HasEntry = false,
                Entries = new List<EntryDTO>()
              };

              categoryLookup[category.ID] = categoryDTO;
              parentSuperCategory.Children.Add(categoryDTO);
            }
          }
        }
        // Itera sulle SubCategorie per creare i nodi di livello 4
        if(model.SubCategorie != null)
        {
          foreach (var subCategory in model.SubCategorie)
          {
            if (subCategory.CategoriaId.HasValue && categoryLookup.TryGetValue(subCategory.CategoriaId.Value, out var parentCategory))
            {
              var subCategoryDTO = new JobDTO
              {
                Id = subCategory.ID.ToString(),
                Description = subCategory.DesSintetica,
                Children = new List<JobDTO>(),
                ParentId = parentCategory.Id,
                Level = 4,
                OriginalId = subCategory.ID,
                Entries = new List<EntryDTO>(),
                HasEntry = true
              };

              subCategoryLookup[subCategory.ID] = subCategoryDTO;
              parentCategory.Children.Add(subCategoryDTO);
            }
          }       
        }
        int nProg = 0;

        // Itera sulle VociComputo (EntryDTO) e assegna le voci alle SubCategorie, Categorie o SuperCategorie
        foreach (var voce in model.VociComputo)
        {
          var entryDTO = new EntryDTO
          {
            Id = voce.ID.ToString(),
            NProg = nProg++,
            Unit = voce.ElencoPrezzo?.UnMisura,
            Description = voce.ElencoPrezzo?.DesEstesa,
            Code = voce.ElencoPrezzo?.Tariffa,
            TotalPrice = voce.Prezzo,
            Price = voce.ElencoPrezzo.Prezzo1,
            Quantity = voce.Quantita,
            OriginalVoceVomputoId = voce.ID,
            OriginalElencoPrezzoId = voce.ElencoPrezzoID,
            JobType =(int) voce.JobType,
            Measurements = voce.Misure?.Select(m => new MeasurementDTO
            {
              Id = m.ID.ToString(),
              Quantita = m.Quantita ?? 0,
              Description = m.Descrizione,
              Lunghezza = m.Lunghezza ?? 0,
              Larghezza = m.Larghezza ?? 0,
              OriginalId = m.ID,
              HPeso = m.HPeso ?? 0,
              Npu = m.PartiUguali ?? 0
            }).ToList() ?? new List<MeasurementDTO>()
          };

          // Verifica a quale nodo assegnare l'EntryDTO
          if (voce.SubCategoriaID.HasValue && subCategoryLookup.TryGetValue(voce.SubCategoriaID.Value, out var parentSubCategory))
          {
            parentSubCategory.HasEntry = true;
            parentSubCategory.Entries.Add(entryDTO);
          }
          else if (voce.CategoriaID.HasValue && categoryLookup.TryGetValue(voce.CategoriaID.Value, out var parentCategory))
          {
            parentCategory.HasEntry = true;
            parentCategory.Entries.Add(entryDTO);
          }
          else if (voce.SuperCategoriaID.HasValue && superCategoryLookup.TryGetValue(voce.SuperCategoriaID.Value, out var parentSuperCategory))
          {
            parentSuperCategory.HasEntry = true;
            parentSuperCategory.Entries.Add(entryDTO);
          }
        }
        return dtoProject;
      }
      catch (Exception ex)
      {
        return new ProjectDTO();
      }
    }

    /// <summary>
    /// Converts dto in to project entity
    /// </summary>
    /// <param name="dto"></param>
    /// <param name="userId"></param>
    /// <param name="existingProject"></param>
    /// <returns></returns>
    /// <exception cref="Exception"></exception>
    public static Project ToProject(ProjectDTO dto, string userId, Project existingProject = null)
    {
      try
      {
        var project = existingProject ?? new Project();

        project.ID = dto.Id ?? 0;
        project.Object = dto.Object;
        project.City = dto.City;
        project.Works = dto.Works;
        project.TotalAmount = dto.TotalAmount;
        project.Notes = dto.Notes;
        project.Public = dto.Public;
        project.GIG = dto.GIG;
        project.CUP = dto.CUP;
        project.Province = dto.Province;
        project.CreationDate = dto.CreationDate;
        project.LastUpdateDate = dto.LastUpdateDate;
        project.Latitude = dto.Latitude ?? 0;
        project.Longitude = dto.Longitude ?? 0;
        project.CompleteAddress = dto.CompleteAddress;
        project.UserId = userId;
        project.Status = (ProjectStatus) dto.Status;

        if (dto.SoaCategoryId > 0)
        {
          project.SoaCategoryId = dto.SoaCategoryId ?? 0;
        }

        if (dto.SoaClassificationId > 0)
        {
          project.SoaClassificationId = dto.SoaClassificationId ?? 0;
        }

        project.ProjectTasks = dto.Tasks?.Select(task => new ProjectTask
        {
          Id = task.Id,
          Name = task.Text,
          StartDate = task.StartDate,
          Duration = task.Duration,
          Description = "",
          Progress = (decimal)task.Progress,
          ParentId = task.ParentId,
          EndDate = task.EndDate ?? task.StartDate.AddDays(task.Duration),
          Priority = task.Priority,
          Color = task.Color,
          Type = task.Type,
          ProjectId = dto.Id ?? 0
        }).ToList();

        var superCategoryLookup = project.SuperCategorie?.ToDictionary(sc => sc.ID) ?? new Dictionary<int, SuperCategoria>();
        var categoryLookup = project.Categorie?.ToDictionary(c => c.ID) ?? new Dictionary<int, Categoria>();
        var subCategoryLookup = project.SubCategorie?.ToDictionary(sc => sc.ID) ?? new Dictionary<int, SubCategoria>();
        var priceListLookup = project.ElencoPrezzi?.ToDictionary(ep => ep.ID) ?? new Dictionary<int, ElencoPrezzo>();
        var vociComputoLookup = project.VociComputo?.ToDictionary(vc => vc.ID) ?? new Dictionary<int, VoceComputo>();
        // Lavorazioni
        foreach (var job in dto.Jobs[0].Children)
        {
          var superCategory = superCategoryLookup.GetValueOrDefault(job.OriginalId);

          if (superCategory == null)
          {
            superCategory = new SuperCategoria
            {
              ExternalID = -1,
              DesSintetica = job.Description,
              DesEstesa = "",
              DataInit = DateTime.Now,
              Durata = 0,
              CodFase = "",
              Percentuale = 0,
              Codice = "",
              ProjectID = project.ID,
              JobType = JobTypes.Misura
            };

            project.SuperCategorie.Add(superCategory);
          }
          else
          {
            superCategory.DesSintetica = job.Description;
          }

          foreach (var childJob in job.Children)
          {
            var category = categoryLookup.GetValueOrDefault(childJob.OriginalId);

            if (category == null)
            {
              category = new Categoria
              {
                ExternalID = -1,
                DesSintetica = childJob.Description,
                DesEstesa = "",
                DataInit = DateTime.Now,
                Durata = 0,
                CodFase = "",
                Percentuale = 0,
                Codice = "",
                ProjectID = project.ID,
                SuperCategoria = superCategory
              };

              project.Categorie.Add(category);
            }
            else
            {
              category.DesSintetica = childJob.Description;
            }

            foreach (var subChildJob in childJob.Children)
            {
              var subCategory = subCategoryLookup.GetValueOrDefault(subChildJob.OriginalId);

              if (subCategory == null)
              {
                subCategory = new SubCategoria
                {
                  ExternalID = -1,
                  DesSintetica = subChildJob.Description,
                  DesEstesa = "",
                  DataInit = DateTime.Now,
                  Durata = 0,
                  CodFase = "",
                  Percentuale = 0,
                  Codice = "",
                  ProjectID = project.ID,
                  Categoria = category
                };
                project.SubCategorie.Add(subCategory);
              }
              else
              {
                subCategory.DesSintetica = subChildJob.Description;
              }

              foreach (var entry in subChildJob.Entries)
              {
                var priceList = priceListLookup.GetValueOrDefault(entry.OriginalElencoPrezzoId);

                if (priceList == null)
                {
                  priceList = new ElencoPrezzo
                  {
                    UnMisura = entry.Unit,
                    DesBreve = entry.Description,
                    Tariffa = entry.Code,
                    Prezzo1 = entry.TotalPrice / entry.Measurements.Sum(m=>m.Quantita)
                  };
                  project.ElencoPrezzi.Add(priceList);
                }
                else
                {
                  priceList.UnMisura = entry.Unit;
                  priceList.DesBreve = entry.Description;
                  priceList.Tariffa = entry.Code;
                  priceList.Prezzo1 = entry.TotalPrice / entry.Measurements.Sum(m => m.Quantita);
                }

                var voceComputo = vociComputoLookup.GetValueOrDefault(entry.OriginalVoceVomputoId);
                if (voceComputo == null)
                {
                  voceComputo = new VoceComputo
                  {
                    SuperCategoriaID = superCategory != null ?superCategory.ID : null,
                    CategoriaID = category != null ?category.ID : null,
                    SubCategoriaID = subCategory != null ? subCategory.ID : null,
                    Quantita = entry.Measurements  != null ? entry.Measurements.Sum(m => m.Quantita) : 0,
                    ElencoPrezzo = priceList,
                    Misure = new List<Misura>()
                  };

                  project.VociComputo.Add(voceComputo);
                }
                else
                {
                  voceComputo.Quantita = entry.Measurements != null ? entry.Measurements.Sum(m => m.Quantita) : 0;
                }
                var totVoce = 0m;
                if (entry.Measurements != null)
                {
                
                  foreach (var measurementDto in entry.Measurements)
                  {
                    var measurement = voceComputo.Misure.FirstOrDefault(m => m.ID == measurementDto.OriginalId);
                    if (measurement == null)
                    {
                      measurement = new Misura
                      {
                        Quantita = measurementDto.Quantita,
                        Descrizione = measurementDto.Description ?? "",
                        Lunghezza = measurementDto.Lunghezza,
                        Larghezza = measurementDto.Larghezza,
                        HPeso = measurementDto.HPeso,
                        PartiUguali = measurementDto.Npu
                      };
                      voceComputo.Misure.Add(measurement);
                    }
                    else
                    {
                      measurement.Quantita = measurementDto.Quantita;
                      measurement.Descrizione = measurementDto.Description  ?? "";
                      measurement.Lunghezza = measurementDto.Lunghezza;
                      measurement.Larghezza = measurementDto.Larghezza;
                      measurement.HPeso = measurementDto.HPeso;
                    }
                    totVoce += measurement?.Quantita ?? 0;
                  }
                }
                voceComputo.Quantita = totVoce;
              }
            }
          }
        }

        var totalAmount = project?.VociComputo?
        .SelectMany(v => v.Misure, (v, m) => new
        {
          Quantita = m.Quantita,
          Prezzo1 = v.ElencoPrezzo?.Prezzo1 ?? 0 
        })
        .Sum(x => x.Quantita * x.Prezzo1) ?? 0;

        var misure = project?.VociComputo?.SelectMany(v => v.Misure, (v, m) => new
        {
          Quantita = m.Quantita,
          Prezzo1 = v.ElencoPrezzo?.Prezzo1 ?? 0
        });


        project.TotalAmount = totalAmount; 

        // Aggiorna o crea DatiGenerali
        if (dto.City != null || dto.Province != null || dto.Object != null)
        {
          if (project.DatiGenerali == null)
          {
            project.DatiGenerali = new DatiGenerali();
          }

          project.DatiGenerali.Comune = dto.City;
          project.DatiGenerali.Provincia = dto.Province;
          project.DatiGenerali.Oggetto = dto.Object;
          project.DatiGenerali.ParteOpera = dto.Works;
          project.DatiGenerali.ProjectID = project.ID;
          project.DatiGenerali.Impresa = "";
        }

        //Economics
        if (dto.Economics != null)
        {
          // Usa l'entità esistente se presente, altrimenti creane una nuova
          if (project.Economics == null)
          {
            project.Economics = new Economics
            {
              ProjectId = project.ID
            };
          }

          project.Economics.MeasuredWorks = dto.Economics.MeasuredWorks;
          project.Economics.LumpSumWorks = dto.Economics.LumpSumWorks;
          project.Economics.SafetyCosts = dto.Economics.SafetyCosts;
          project.Economics.LaborCosts = dto.Economics.LaborCosts;
          project.Economics.AuctionVariationPercentage = dto.Economics.AuctionVariationPercentage;
          project.Economics.AvailableSums = dto.Economics.AvailableSums;
          project.Economics.TotalProjectCalculationType = dto.Economics.TotalProjectCalculationType;

        }

        // Aggiorna ResourceTeamType se presente
        if (dto.Configurations?.ResourceTeamType != null)
        {
          // Usa l'entità esistente se presente, altrimenti creane una nuova
          if (project.ProjectResourceTeamType == null)
          {
            project.ProjectResourceTeamType = new ProjectResourceTeamType
            {
              ProjectId = project.ID
            };
          }

          project.ProjectResourceTeamType.SpecializedQuantity = dto.Configurations.ResourceTeamType.SpecializedQuantity;
          project.ProjectResourceTeamType.SpecializedHourlyRate = dto.Configurations.ResourceTeamType.SpecializedHourlyRate;
          project.ProjectResourceTeamType.QualifiedQuantity = dto.Configurations.ResourceTeamType.QualifiedQuantity;
          project.ProjectResourceTeamType.QualifiedHourlyRate = dto.Configurations.ResourceTeamType.QualifiedHourlyRate;
          project.ProjectResourceTeamType.CommonQuantity = dto.Configurations.ResourceTeamType.CommonQuantity;
          project.ProjectResourceTeamType.CommonHourlyRate = dto.Configurations.ResourceTeamType.CommonHourlyRate;

        }

        // Aggiorna ConfigNumeri se presente
        if (dto.Configurations?.Numeri != null)
        {
          if (project.ConfigNumeri == null)
          {
            project.ConfigNumeri = new ConfigNumeri();
          }

          project.ConfigNumeri.PartiUguali = dto.Configurations.Numeri.PartiUguali;
          project.ConfigNumeri.Lunghezza = dto.Configurations.Numeri.Lunghezza;
          project.ConfigNumeri.Larghezza = dto.Configurations.Numeri.Larghezza;
          project.ConfigNumeri.HPeso = dto.Configurations.Numeri.HPeso;
          project.ConfigNumeri.Quantita = dto.Configurations.Numeri.Quantita;
          project.ConfigNumeri.Prezzi = dto.Configurations.Numeri.Prezzi;
          project.ConfigNumeri.PrezziTotale = dto.Configurations.Numeri.PrezziTotale;
          project.ConfigNumeri.ConvPrezzi = dto.Configurations.Numeri.ConvPrezzi;
          project.ConfigNumeri.ConvPrezziTotale = dto.Configurations.Numeri.ConvPrezziTotale;
          project.ConfigNumeri.IncidenzaPercentuale = dto.Configurations.Numeri.IncidenzaPercentuale;
          project.ConfigNumeri.Aliquote = dto.Configurations.Numeri.Aliquote;
          project.ConfigNumeri.Valuta = dto.Configurations.Numeri.Valuta;
          project.ConfigNumeri.ProjectID = project.ID;
        }

        // Aggiorna Analisi se presente
        if (dto.Configurations?.Analisi != null)
        {
          // Usa l'entità esistente se presente, altrimenti creane una nuova
          if (project.Analisi == null)
          {
            project.Analisi = new Analisi
            {
              ProjectID = project.ID // Associa al progetto esistente
            };
          }

          // Aggiorna i valori di Analisi esistente
          project.Analisi.SpeseUtili = dto.Configurations.Analisi.SpeseUtili;
          project.Analisi.SpeseGenerali = dto.Configurations.Analisi.SpeseGenerali;
          project.Analisi.UtiliImpresa = dto.Configurations.Analisi.UtiliImpresa;
          project.Analisi.OneriAccessoriSc = dto.Configurations.Analisi.OneriAccessoriSc;
          project.Analisi.ConfQuantita = dto.Configurations.Analisi.ConfQuantita;
          project.Analisi.Metodo = dto.Configurations.Analisi.Metodo;
          project.Analisi.ApplicataA = dto.Configurations.Analisi.ApplicataA;
        }

        // Mappatura dei subjects
        if (dto.Subjects != null)
        {
          //remove subjects if canceled
          if (project.ProjectSubjects != null && project.ProjectSubjects.Count > 0)
          {
            var deletedSubjects = project.ProjectSubjects.Where(ps => !dto.Subjects.Any(ds => ds.Email == ps.Email))
           .ToList();
            project.ProjectSubjects.ToList().RemoveAll(ps => deletedSubjects.Any(ds => ds.Email == ps.Email));
          }

          // Aggiungi o aggiorna i subjects
          foreach (var dtoSubject in dto.Subjects)
          {
            var existingSubject = project.ProjectSubjects.FirstOrDefault(ps => ps.Email == dtoSubject.Email);

            if (existingSubject == null)
            {
              // Aggiungi nuovo subject
              var newSubject = new ProjectSubject
              {
                FirstName = dtoSubject.LastName,
                LastName = dtoSubject.LastName,
                Email = dtoSubject.Email,
                Status = dtoSubject.Status ?? "Pending",
                Type = dtoSubject.Figure ?? "Default",
                CreatedAt = DateTime.Now,
                UserId = dtoSubject.UserId,
                Company = dtoSubject.Company ?? string.Empty,
                ProjectId = project.ID,
                ProjectSubjectRole = new ProjectSubjectRole { Name = dtoSubject.Role },
              };

              if (dtoSubject.Invite)
              {
                newSubject.Invitation = new Invitation
                {
                  FirstName = dtoSubject.FirstName,
                  LastName = dtoSubject.LastName,
                  RecipientEmail = dtoSubject.Email,
                  Token = Guid.NewGuid().ToString(),
                  Cf = dtoSubject.Cf,
                  Status = SharedClasses.Enums.InvitationStatus.ToBeSent,
                  ProjectId = project.ID,
                  ExpirationDate = DateTime.Now.AddMonths(6),
                  InvitedByUserId = userId
                };
              }

              project.ProjectSubjects.Add(newSubject);
            }
            else
            {
              // Aggiorna subject esistente
              existingSubject.FirstName = dtoSubject.FirstName;
              existingSubject.LastName = dtoSubject.LastName;
              existingSubject.Status = dtoSubject.Status ?? existingSubject.Status;
              existingSubject.Type = dtoSubject.Figure ?? existingSubject.Type;
              existingSubject.UserId = dtoSubject.UserId;
              existingSubject.Company = dtoSubject.Company ?? existingSubject.Company;
              existingSubject.ProjectSubjectRole.Name = dtoSubject.Role;

              if (dtoSubject.Invite && existingSubject.Invitation == null)
              {
                existingSubject.Invitation = new Invitation
                {
                  FirstName = dtoSubject.FirstName,
                  LastName = dtoSubject.LastName,
                  RecipientEmail = dtoSubject.Email,
                  Token = Guid.NewGuid().ToString(),
                  Cf = dtoSubject.Cf,
                  Status = SharedClasses.Enums.InvitationStatus.ToBeSent,
                  ProjectId = project.ID,
                  ExpirationDate = DateTime.Now.AddMonths(6),
                  InvitedByUserId = project.UserId
                };
              }
            }
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
