
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Servistar.Server.Models;
using Servistar.Server.Services;

namespace Servistar.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("Login")]
        [Produces("application/json")]
        [Consumes("application/json")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(AuthenticateRequestModel request)
        {
            return StatusCode(StatusCodes.Status200OK, await _authenticationService.LoginAsync(request));
        }
    }
}
