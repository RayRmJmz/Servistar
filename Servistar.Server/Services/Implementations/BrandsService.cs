using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Servistar.Server.Contexts;
using Servistar.Server.Entities;
using Servistar.Server.Models;

namespace Servistar.Server.Services.Implementations
{
    public class BrandsService : IBrandsService
    {
        private readonly ServistarContext _dbContext;
        private readonly IMapper _mapperService;

        public BrandsService(ServistarContext dbContext, IMapper mapperService)
        {
            _dbContext = dbContext;
            _mapperService = mapperService;
        }

        public async Task<BrandsResponseModel> PostBrandAsync(BrandsRequestModel request)
        {
            try
            {
                var newBrand = _mapperService.Map<BrandsEntity>(request);
                await _dbContext.Brands.AddAsync(newBrand);
                await _dbContext.SaveChangesAsync();
                return _mapperService.Map<BrandsResponseModel>(newBrand);
            }
            catch (DbUpdateException e)
            {
                throw new NullReferenceException($"Error al agregar nueva marca: {e.InnerException.Message}");
            }
        }

        public async Task<BrandsResponseModel> GetBrandByIdAsync(int id)
        {
            try
            {
                var brand = _mapperService.Map<BrandsResponseModel>(await _dbContext.Brands.FindAsync(id));
                if (brand == null)
                {
                    throw new NullReferenceException($"No se encontró marca con id {id}.");
                }
                return brand;
            }
            catch (DbUpdateException e)
            {
                throw new NullReferenceException($"Error al guardar: {e.InnerException.Message}");
            }
        }

        public async Task<IList<BrandsResponseModel>> GetAllBrandsAsync()
        {
            try
            {
                var brands = _mapperService.Map<IList<BrandsResponseModel>>(
                    await _dbContext.Brands.ToListAsync());

                if (brands == null)
                {
                    throw new NullReferenceException($"No hay marcas agregados.");
                }
                return brands;
            }
            catch (DbUpdateException e)
            {
                throw new NullReferenceException($"Error al obtener marcas: {e.InnerException.Message}");
            }
        }

    }
}
