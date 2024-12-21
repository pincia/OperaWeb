using AutoMapper;
using OperaWeb.Server.Models.DTO.Project;
using OperaWeb.Server.DataClasses.Models;
using System.Data;

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
    }
    }
}
