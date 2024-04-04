using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Servistar.Server.Models;
using Servistar.Server.Services;

namespace Servistar.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IBrandsService _service;
        public BrandsController(IBrandsService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(BrandsResponseModel), 200)]
        public async Task<IActionResult> GetBrandById(int id)
        {
            return Ok(await _service.GetBrandByIdAsync(id));
        }


        [HttpGet("All")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(IList<BrandsResponseModel>), 200)]
        public async Task<IActionResult> GetAllBrands()
        {
            return Ok(await _service.GetAllBrandsAsync());
        }


        [HttpPost]
        [Produces("application/json")]
        [ProducesResponseType(typeof(BrandsResponseModel), 200)]
        public async Task<IActionResult> PostBrand(BrandsRequestModel request)
        {
            return Ok(await _service.PostBrandAsync(request));
        }
    }
}
