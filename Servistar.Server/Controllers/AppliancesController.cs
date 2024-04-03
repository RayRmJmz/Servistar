using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Servistar.Server.Models;
using Servistar.Server.Services;

namespace Servistar.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AppliancesController : ControllerBase
    {
        private readonly IApplianceService _service;
        public AppliancesController(IApplianceService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(ApplianceResponseModel), 200)]
        public async Task<IActionResult> GetApplianceById(int id)
        {
            return Ok(await _service.GetApplianceByIdAsync(id));
        }


        [HttpGet("All")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(IList<ApplianceResponseModel>), 200)]
        public async Task<IActionResult> GetAllAppliances()
        {
            return Ok(await _service.GetAllAppliancesAsync());
        }


        [HttpPost]
        [Produces("application/json")]
        [ProducesResponseType(typeof(IList<ApplianceResponseModel>), 200)]
        public async Task<IActionResult> PostAppliance(ApplianceRequestModel request)
        {
            return Ok(await _service.PostApplianceAsync(request));
        }

    }
}
