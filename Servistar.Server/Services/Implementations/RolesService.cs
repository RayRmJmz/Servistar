using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Servistar.Server.Models.Sources;

namespace Servistar.Server.Services.Implementations
{
    public class RolesService : IRolesService
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IMapper _mapperService;
        public RolesService(RoleManager<IdentityRole> roleManager, IMapper mapper)
        {
            _roleManager = roleManager;
            _mapperService = mapper;
        }

        public async Task<IEnumerable<RoleResponseModel>> GetAllRolesAsync() =>
            _mapperService.Map<IEnumerable<RoleResponseModel>>(await _roleManager.Roles.ToListAsync());
    }
}
