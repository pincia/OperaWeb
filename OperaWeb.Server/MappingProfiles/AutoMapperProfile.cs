using AutoMapper;
using OperaWeb.Server.Models.DTO.Project;
using OperaWeb.Server.DataClasses.Models;

namespace OperaWeb.Server.MappingProfiles
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<CreateProjectRequest, Progetto>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.CreationDate, opt => opt.Ignore())
                .ForMember(dest => dest.LastUpdateDate, opt => opt.Ignore())
                .ForMember(dest => dest.isDeleted, opt => opt.Ignore());
            CreateMap<UpdateProjectRequest, Progetto>()
                .ForMember(dest => dest.CreationDate, opt => opt.Ignore())
                .ForMember(dest => dest.LastUpdateDate, opt => opt.Ignore())
                .ForMember(dest => dest.isDeleted, opt => opt.Ignore());
        }
    }
}
