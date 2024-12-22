using AutoMapper;
using OperaWeb.Server.Models.DTO.Project;
using OperaWeb.Server.DataClasses.Models;
using System.Data;
using OperaWeb.Server.Models.DTO.Project.ProjectManagement.Models.DTO;

namespace OperaWeb.Server.MappingProfiles
{
  public class AutoMapperProfile : Profile
  {
    public AutoMapperProfile()
    {
      CreateMap<CreateProjectRequestDTO, Project>()
          .ForMember(dest => dest.ID, opt => opt.Ignore())
          .ForMember(dest => dest.CreationDate, opt => opt.Ignore())
          .ForMember(dest => dest.LastUpdateDate, opt => opt.Ignore())
          .ForMember(dest => dest.Deleted, opt => opt.Ignore());
      CreateMap<UpdateProjectRequestDTO, Project>()
          .ForMember(dest => dest.CreationDate, opt => opt.Ignore())
          .ForMember(dest => dest.LastUpdateDate, opt => opt.Ignore())
          .ForMember(dest => dest.Deleted, opt => opt.Ignore());

      CreateMap<Categoria, CategoriaDTO>()
    .ReverseMap();

      CreateMap<ConfigNumeri, ConfigNumeriDTO>()
          .ReverseMap();

      CreateMap<DatiGenerali, DatiGeneraliDTO>()
          .ReverseMap();

      CreateMap<ElencoPrezzo, ElencoPrezzoDTO>()
          .ReverseMap();

      CreateMap<Misura, MisuraDTO>()
          .ReverseMap();

      CreateMap<Project, ProjectDTO>()
          .ReverseMap();

      CreateMap<SubCategoria, SubCategoriaDTO>()
          .ReverseMap();

      CreateMap<SuperCategoria, SuperCategoriaDTO>()
          .ReverseMap();

      CreateMap<VoceComputo, VoceComputoDTO>()
          .ReverseMap();

      CreateMap<Project, ProjectHeaderDTO>()
           .ForMember(dest => dest.SoaCategory, opt => opt.MapFrom(src => src.SoaCategory.Description))
           .ForMember(dest => dest.SoaCategoryId, opt => opt.MapFrom(src => src.SoaCategory.Id))
           .ForMember(dest => dest.SoaClassification, opt => opt.MapFrom(src => src.SoaClassification.Description))
           .ForMember(dest => dest.SoaClassificationId, opt => opt.MapFrom(src => src.SoaClassification.Id));

      CreateMap<ProjectTask, ProjectTaskDTO>()
           .ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Name))
           .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndDate == DateTime.MinValue ? (DateTime?)null : src.EndDate))
           .ForMember(dest => dest.Progress, opt => opt.MapFrom(src => (double)src.Progress))
           .ForMember(dest => dest.Open, opt => opt.Ignore()) // Da implementare se necessario
           .ForMember(dest => dest.Order, opt => opt.Ignore()); // Da implementare se necessario

      // Mappa da ProjectTaskDTO a ProjectTask
      CreateMap<ProjectTaskDTO, ProjectTask>()
          .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Text))
          .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndDate ?? src.StartDate.AddDays(src.Duration)))
          .ForMember(dest => dest.Progress, opt => opt.MapFrom(src => (decimal)src.Progress))
          .ForMember(dest => dest.Description, opt => opt.Ignore()) // Da aggiungere se il DTO include una descrizione più completa
          .ForMember(dest => dest.Project, opt => opt.Ignore()) // Da gestire tramite navigazione se necessario
          .ForMember(dest => dest.SubTasks, opt => opt.Ignore()); // Ignoriamo la navigazione dei subtasks per ora


    }
  }
}
