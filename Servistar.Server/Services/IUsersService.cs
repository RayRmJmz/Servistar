using Servistar.Server.Models;

namespace Servistar.Server.Services
{
    public interface IUsersService
    {
        Task<IEnumerable<UsersResponseModel>> GetAllUsersAsync();
        Task<UsersResponseModel> GetUserByIdAsync(string userId);
        Task<UsersResponseModel> PostUsersAsync(UsersCreateModel request);
    }
}
