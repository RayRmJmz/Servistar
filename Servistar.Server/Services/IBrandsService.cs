using Servistar.Server.Models;

namespace Servistar.Server.Services
{
    public interface IBrandsService
    {
        Task<IList<BrandsResponseModel>> GetAllBrandsAsync();
        Task<BrandsResponseModel> GetBrandByIdAsync(int id);
        Task<BrandsResponseModel> PostBrandAsync(BrandsRequestModel request);
    }
}
