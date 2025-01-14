using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
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
          CompleteAddress = model.CompleteAddress,
          Subjects = model.ProjectSubjects?.Select(subject => new SubjectDTO
          {
            Name = subject.SubjectName,
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
          HasEntry = false
        };

        dtoProject.Jobs.Add(lavoroAMisura);

        foreach (var superCategory in model.SuperCategorie)
        {
          var superCategoryDTO = new JobDTO
          {
            Id = superCategory.ID.ToString(),
            Description = superCategory.DesSintetica,
            Children = new List<JobDTO>(),
            ParentId = lavoroAMisura.Id.ToString(),
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

              var parentDTO = superCategoryDTO;

              if (voce.Categoria != null)
              {
                var categoryDTO = superCategoryDTO.Children.FirstOrDefault(j => j.Level == 3 && j.OriginalId == voce.CategoriaID);
                if (categoryDTO == null)
                {
                  categoryDTO = new JobDTO
                  {
                    Id = voce.Categoria.ID.ToString(),
                    Description = voce.Categoria.DesSintetica,
                    Children = new List<JobDTO>(),
                    Level = 3,
                    OriginalId = voce.Categoria.ID,
                    Entries = new List<EntryDTO>(),
                    HasEntry = false
                  };
                  superCategoryDTO.Children.Add(categoryDTO);
                }

                parentDTO = categoryDTO;
              }

              if (voce.SubCategoria != null)
              {
                var subCategoryDTO = parentDTO.Children.FirstOrDefault(j => j.Level == 4 && j.OriginalId == voce.SubCategoriaID);
                if (subCategoryDTO == null)
                {
                  subCategoryDTO = new JobDTO
                  {
                    Id = voce.SubCategoria.ID.ToString(),
                    Description = voce.SubCategoria.DesSintetica,
                    Children = new List<JobDTO>(),
                    Level = 4,
                    OriginalId = voce.SubCategoria.ID,
                    Entries = new List<EntryDTO>(),
                    HasEntry = true
                  };
                  parentDTO.Children.Add(subCategoryDTO);
                }

                subCategoryDTO.Entries.Add(entryDTO);
              }
              else
              {
                parentDTO.HasEntry = true;
                parentDTO.Entries.Add(entryDTO);
              }
            }
          }
        }

        return dtoProject;
      }
      catch (Exception ex)
      {
        return new ProjectDTO();
      }
    }


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
          Progress = (decimal)task.Progress,
          ParentId = task.ParentId,
          EndDate = task.EndDate ?? task.StartDate.AddDays(task.Duration),
          Priority = task.Priority,
          Color = task.Color,
          Type = task.Type,
          ProjectId = dto.Id ?? 0
        }).ToList();


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
          // Rimuovi subjects che non esistono più nel DTO
          var dtoSubjectEmails = dto.Subjects
             .Where(s => !string.IsNullOrEmpty(s.Email))
             .Select(s => s.Email)
             .ToHashSet();

          var existingSubjects = project.ProjectSubjects == null ? new List<ProjectSubject>() : project.ProjectSubjects.ToList();
          existingSubjects.RemoveAll(ps => ps.Email != null && !dtoSubjectEmails.Contains(ps.Email));
          project.ProjectSubjects = existingSubjects;

          // Aggiungi o aggiorna i subjects
          foreach (var dtoSubject in dto.Subjects)
          {
            var existingSubject = project.ProjectSubjects.FirstOrDefault(ps => ps.Email == dtoSubject.Email);

            if (existingSubject == null)
            {
              // Aggiungi nuovo subject
              var newSubject = new ProjectSubject
              {
                SubjectName = dtoSubject.Name,
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
              existingSubject.SubjectName = dtoSubject.Name;
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
