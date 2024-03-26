using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Servistar.Server.Models;
using Servistar.Server.Models.Sources;
using Servistar.Server.Services;

namespace Servistar.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MunicipalitiesController : ControllerBase
    {
        private readonly IMunicipalitiesService _service;
        public MunicipalitiesController(IMunicipalitiesService service)
        {
            _service = service;
        }

        /// <summary>
        /// Return all municipalities of Colima
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(typeof(IList<MinicipalitiesModel>), 200)]
        public async Task<IActionResult> GetAllMunicipalities()
        {
            return StatusCode(StatusCodes.Status200OK, await _service.GetMinicipalitiesAsync());
        }
    }
}
