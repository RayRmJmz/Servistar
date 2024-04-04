using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Servistar.Server.Models;
using Servistar.Server.Models.Sources;
using Servistar.Server.Services;
using Servistar.Server.Services.Implementations;

namespace Servistar.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdministratorController : ControllerBase
    {
        private readonly IRolesService _roleService;

        private readonly IUsersService _usersService;
        public AdministratorController( IRolesService roleService, IUsersService userService)
        {
           
            _roleService = roleService;
            _usersService = userService;
        }

        [HttpGet("Roles/All")]
        [ProducesResponseType(typeof(IEnumerable<RoleResponseModel>), 200)]
        public async Task<IActionResult> GetAllRoles()
        {
            return StatusCode(200, await _roleService.GetAllRolesAsync());
        }

        [HttpGet("Users/All")]
        [ProducesResponseType(typeof(IEnumerable<UsersResponseModel>), 200)]
        public async Task<IActionResult> GetAllUsers()
        {
            return StatusCode(200, await _usersService.GetAllUsersAsync());
        }

        [HttpPost("Users/Add")]
        [ProducesResponseType(typeof(UsersResponseModel), 201)]
        public async Task<IActionResult> PostUser([FromBody] UsersCreateModel requestModel)
        {
            return StatusCode(201, await _usersService.PostUsersAsync(requestModel));
        }

        [HttpGet("Users/{id}")]
        [ProducesResponseType(typeof(UsersResponseModel), 200)]
        public async Task<IActionResult> GetUserById(string id)
        {
            return Ok(await _usersService.GetUserByIdAsync(id));
        }
    }
}
