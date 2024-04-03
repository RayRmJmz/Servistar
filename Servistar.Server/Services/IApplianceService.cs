using Servistar.Server.Models;

namespace Servistar.Server.Services
{
    public interface IApplianceService
    {
        Task<IList<ApplianceResponseModel>> GetAllAppliancesAsync();
        Task<ApplianceResponseModel> GetApplianceByIdAsync(int id);
        Task<ApplianceResponseModel> PostApplianceAsync(ApplianceRequestModel request);
    }
}
