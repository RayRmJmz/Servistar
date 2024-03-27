using Servistar.Server.Entities;
using System.Security.Claims;

namespace Servistar.Server.Services
{
    public interface ITokenService
    {
        string CreateToken(IEnumerable<Claim> claims, string keyProperty, DateTime expireDate);
        string? GetSecretKey(string keyProperty);
        Task<ApplicationUserEntity> GetUserContextAsync();
    }
}
