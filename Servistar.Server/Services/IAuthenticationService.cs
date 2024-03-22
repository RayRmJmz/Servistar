using Servistar.Server.Entities;
using Servistar.Server.Models;

namespace Servistar.Server.Services
{
    public interface IAuthenticationService
    {
        Task<ApplicationUserEntity> GetUserContextAsync();
        Task<AuthenticateResponseModel> LoginAsync(AuthenticateRequestModel request);
    }
}
