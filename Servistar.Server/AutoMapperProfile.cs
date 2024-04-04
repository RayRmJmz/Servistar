using AutoMapper;
using Microsoft.AspNetCore.Identity;
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
            SetRoleMappings();
            SetUsersMappings();
        }

        private void SetUsersMappings()
        {
            CreateMap<ApplicationUserEntity, UsersResponseModel>()
                .ForMember(dest => dest.BirthDate , opt=> opt.MapFrom(src => src.BirthDate.Value.ToString("yyyy-MM-dd")))
                .ForMember(dest => dest.TerminationDate, opt => opt.MapFrom(src => src.TerminationDate.Value.ToString("yyyy-MM-dd")))
                .ForMember(dest => dest.StartedDate, opt => opt.MapFrom(src => src.StartedDate.Value.ToString("yyyy-MM-dd")))
                .AfterMap((src, dest) =>
                {
                    if (dest.Roles != null)
                    {
                        foreach (var role in dest.Roles)
                        {
                            role.Selected = true;
                        }
                    }
                }); ;
            CreateMap<ApplicationUserEntity, UsersCreateModel>().ReverseMap();
        }

        private void SetRoleMappings()
        {
        //    CreateMap<IdentityRole, RoleViewModel>();

            CreateMap<IdentityRole, RoleResponseModel>()
               .AfterMap((src, dest) =>
               {
                   dest.Selected = true;
               });
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
            CreateMap<CustomersAddressEntity, CustomerAddressResponseModel>()
                .ForMember(dest => dest.Minicipality, opt => opt.MapFrom(src => src.Municipalities.Minicipality))
                .ReverseMap();
        }
    }
}
