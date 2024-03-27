using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Servistar.Server.Entities;
using Servistar.Server.Models.Sources;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;

namespace Servistar.Server.Services.Implementations
{
    public class TokenService(
       UserManager<ApplicationUserEntity> userManager,
        IHttpContextAccessor httpContextAccessor,
       IOptions<AppSettings> appSettings) : ITokenService
    {
        private readonly UserManager<ApplicationUserEntity> _userManager = userManager;
        private readonly AppSettings _appSettings = appSettings.Value;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        public string CreateToken(IEnumerable<Claim> claims, string keyProperty, DateTime expireDate)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(GetSecretKey(keyProperty));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expireDate,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature),
                NotBefore = DateTime.Now,
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public string? GetSecretKey(string keyProperty)
        {
            PropertyInfo[] modelProperties = _appSettings.GetType().GetProperties();

            var property = modelProperties.FirstOrDefault(modelProperty => modelProperty.Name == keyProperty);

            if (property is null)
            {
                throw new NullReferenceException($"Propiedad {keyProperty} no encontrada");
            }

            return property.GetValue(_appSettings)?.ToString();
        }

        public async Task<ApplicationUserEntity> GetUserContextAsync()
        {
            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);

            if (user == null)
            {
                throw new InvalidCredentialException($"Error en httpContext");
            }

            return user;
        }
    }
}
