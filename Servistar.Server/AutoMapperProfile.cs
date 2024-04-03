using AutoMapper;
using Servistar.Server.Entities;
using Servistar.Server.Models;
using Servistar.Server.Models.Sources;

namespace Servistar.Server
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            SetMunicipalitiesMappings();
            SetAppliancesMappings();
            SetCustomersMappings();
            SetBrandsMappings();
        }

        private void SetBrandsMappings()
        {
            CreateMap<BrandsEntity, BrandsRequestModel>().ReverseMap();
            CreateMap<BrandsEntity, BrandsResponseModel>().ReverseMap();
        }
        private void SetAppliancesMappings()
        {
            CreateMap<AppliancesEntity, ApplianceRequestModel>().ReverseMap();
            CreateMap<AppliancesEntity, ApplianceResponseModel>().ReverseMap();
        }
        private void SetMunicipalitiesMappings()
        {
            CreateMap<MunicipalitiesEntity, MinicipalitiesModel>().ReverseMap();
        }

        private void SetCustomersMappings()
        {

            CreateMap<IEnumerable<CustumersEntity>, PaginationResponseModel<CustomerResponseModel>>()
                .ForMember(dest => dest.Results, opt => opt.MapFrom(src => src));

            CreateMap<CustumersEntity, CustomerCreateModel>().ReverseMap();
            CreateMap<CustumersEntity, CustomerResponseModel>().ReverseMap();

            CreateMap<CustumersPhoneNumbersEntity, CustomersPhoneNumbersCreateModel>().ReverseMap();
            CreateMap<CustumersPhoneNumbersEntity, CustomersPhoneNumbersResponseModel>().ReverseMap();

            CreateMap<CustomersAddressEntity, CustomerAddressCreateModel>().ReverseMap();
            CreateMap<CustomersAddressEntity, CustomerAddressResponseModel>().ReverseMap();
        }
    }
}
