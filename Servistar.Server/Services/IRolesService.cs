using Servistar.Server.Models.Sources;

namespace Servistar.Server.Services
{
    public interface IRolesService
    {
        Task<IEnumerable<RoleResponseModel>> GetAllRolesAsync();
    }
}
