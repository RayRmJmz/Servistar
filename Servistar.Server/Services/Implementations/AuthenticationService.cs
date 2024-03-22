using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Servistar.Server.Entities;
using Servistar.Server.Models;
using Servistar.Server.Models.Sources;
using System.Security.Authentication;
using System.Security.Claims;

namespace Servistar.Server.Services.Implementations
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<ApplicationUserEntity> _userManager;
        private readonly SignInManager<ApplicationUserEntity> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly AppSettings _appSettings;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IWebHostEnvironment _env;
        public AuthenticationService(
           UserManager<ApplicationUserEntity> userManager,
           SignInManager<ApplicationUserEntity> signInManager,
           IOptions<AppSettings> appSettingsOptions,
           ITokenService tokenService,
           IHttpContextAccessor httpContextAccessor,
           IWebHostEnvironment env)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _appSettings = appSettingsOptions.Value;
            _httpContextAccessor = httpContextAccessor;
            _env = env;
        }

        public async Task<AuthenticateResponseModel> LoginAsync(AuthenticateRequestModel request)
        {
            var esDevelopment = _env.IsDevelopment();
            var user = await _userManager.FindByNameAsync(request.UserName);

            if (user is null)
            {
                throw new NullReferenceException("Usuario no encontrado");
            }

            // Ensure the user is allowed to sign in
            if (!await _signInManager.CanSignInAsync(user))
            {
                throw new InvalidCredentialException("El usuario o contraseña es invalido.");
            }

            var isUserLockedOut = (_userManager.SupportsUserLockout
                && await _userManager.IsLockedOutAsync(user))
                || user.LockoutEnabled;

            // Ensure the user is not already locked out
            if (isUserLockedOut)
            {
                throw new InvalidCredentialException("El usuario o contraseña es invalido.");
            }

            if (!esDevelopment)
            {
                // Ensure the password is valid
                var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, request.Password);

                if (!isPasswordCorrect)
                {
                    if (_userManager.SupportsUserLockout)
                    {
                        await _userManager.AccessFailedAsync(user);
                    }

                    throw new InvalidCredentialException("El usuario o contraseña es invalido.");
                }

                if (_userManager.SupportsUserLockout)
                {
                    await _userManager.ResetAccessFailedCountAsync(user);
                }
            }


            var roles = await _userManager.GetRolesAsync(user) ?? new List<string>();

            var claims = roles.Select(role => new Claim(ClaimTypes.Role, role)).ToList();

            claims.Add(new Claim(ClaimTypes.Name, user.UserName));
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));


            var expireDate = DateTime.Now.AddDays(10);

            var token = _tokenService.CreateToken(claims, nameof(_appSettings.JwtSecret), expireDate);

            return new AuthenticateResponseModel
            {
                Token = token,
            };
        }

        public async Task<ApplicationUserEntity> GetUserContextAsync()
        {
            var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);

            return user == null ? throw new InvalidCredentialException($"Error en httpContext: {_httpContextAccessor.HttpContext.User} not found.") : user;
        }
    }
}
