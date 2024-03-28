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
    public class CustomersController : ControllerBase
    {
        private readonly ICustomersService _service;
        public CustomersController(ICustomersService service)
        {
            _service = service;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(CustomerResponseModel), 200)]
        public async Task<IActionResult> GetCustomerById(int id)
        {
            return Ok(await _service.GetCustomerByIdAsync(id));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="page">aa</param>
        /// <param name="take">bb</param>
        /// <param name="term">cc</param>
        /// <returns></returns>
        [HttpGet("pagination/{page}/{take}")]
        [ProducesResponseType(typeof(PaginationResponseModel<CustomerResponseModel>), 200)]
        public async Task<IActionResult> GetPagination(
            int page,
            int take,
            [FromQuery] string? term)
        {
            return Ok(await _service.GetCustomersPaginationAsync(page, take, term));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="requestModel"></param>
        /// <returns></returns>
        [HttpPost]
        [Produces("application/json")]
        [ProducesResponseType(typeof(CustomerResponseModel), 201)]
        public async Task<IActionResult> PostCustomer(CustomerCreateModel requestModel)
        {
            return StatusCode(201, await _service.PostCustomerAsync(requestModel));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> PutCustomerIsActive(int id)
        {
            await _service.PutCustomerIsActiveByIdAsync(id);
            return Ok();
        }
    }
}
