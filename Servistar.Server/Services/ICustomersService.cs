using Servistar.Server.Models;
using Servistar.Server.Models.Sources;

namespace Servistar.Server.Services
{
    public interface ICustomersService
    {
        Task<CustomerResponseModel> GetCustomerByIdAsync(int id);
        Task<PaginationResponseModel<CustomerResponseModel>> GetCustomersPaginationAsync(int page, int take, string? filters);
        Task<CustomerResponseModel> PostCustomerAsync(CustomerCreateModel request);
    }
}
