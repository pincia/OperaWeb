using AutoMapper;
using OperaWeb.Server.Models.DTO.Project;
using OperaWeb.Server.DataClasses.Models;

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
        }
    }
}
