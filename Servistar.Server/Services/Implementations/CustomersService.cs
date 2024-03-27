using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Servistar.Server.Contexts;
using Servistar.Server.Entities;
using Servistar.Server.Models;
using Servistar.Server.Models.Sources;
using System;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Servistar.Server.Services.Implementations
{
    public class CustomersService : ICustomersService
    {
        private readonly ServistarContext _dbContext;
        private readonly IMapper _mapperService;
        private readonly ITokenService _tokenService;
        public CustomersService(ServistarContext dbContext, IMapper mapperService, ITokenService tokenService)
        {
            _dbContext = dbContext;
            _mapperService = mapperService;
            _tokenService = tokenService;
        }


        public async Task<CustomerResponseModel> PostCustomerAsync(CustomerCreateModel request)
        {
            try
            {
                var currentUser = await _tokenService.GetUserContextAsync();

                var newCustomer = _mapperService.Map<CustumersEntity>(request);
                newCustomer.UserId = currentUser.Id;

                await _dbContext.Customers.AddAsync(newCustomer);
                await _dbContext.SaveChangesAsync();
                return _mapperService.Map<CustomerResponseModel>(newCustomer);


            }
            catch (DbUpdateException e)
            {
                throw new NullReferenceException($"Error al guardar: {e.InnerException.Message}");
            }
        }

        public async Task<CustomerResponseModel> GetCustomerByIdAsync(int id)
        {
            try
            {
                var customer = _mapperService.Map<CustomerResponseModel>(await _dbContext.Customers.FindAsync(id));
                if(customer == null)
                {
                    throw new NullReferenceException($"No se encontró cliente con id {id}.");
                }
               return customer;
            }
            catch (NullReferenceException ex)
            {
                throw new NullReferenceException(ex.Message);
            }
        }

        public async Task<PaginationResponseModel<CustomerResponseModel>> GetCustomersPaginationAsync(
            int page,
            int take,
            string? filters)
        {
            try
            {
                var custumersQuery = _dbContext.Customers.AsQueryable();
                if (filters != null)
                {
                    custumersQuery = custumersQuery.Where(c => c.Name.Contains(filters)
                    || c.LastName.Contains(filters)
                    || c.SecondLastName.Contains(filters)
                    
                    );
                }

                var total = await custumersQuery.CountAsync();
                var response = _mapperService.Map<PaginationResponseModel<CustomerResponseModel>>(await custumersQuery.OrderByDescending(d => d.Name)
                    .Skip((page - 1) * take)
                    .Take(take).ToListAsync());
                CheckPaginationService<CustomerResponseModel>.CheckPaginacion(response, page, take, total);
             
                return response;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
