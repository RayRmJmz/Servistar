using AutoMapper;
using Servistar.Server.Entities;
using Servistar.Server.Models.Sources;

namespace Servistar.Server
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            SetMunicipalitiesMappings();
        }

        private void SetMunicipalitiesMappings()
        {
            CreateMap<MunicipalitiesEntity, MinicipalitiesModel>().ReverseMap();
        }
    }
}
