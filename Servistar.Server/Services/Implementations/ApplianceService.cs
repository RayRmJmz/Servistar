using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Servistar.Server.Contexts;
using Servistar.Server.Entities;
using Servistar.Server.Models;

namespace Servistar.Server.Services.Implementations
{
    public class ApplianceService : IApplianceService
    {
        private readonly ServistarContext _dbContext;
        private readonly IMapper _mapperService;
        
        public ApplianceService(ServistarContext dbContext, IMapper mapperService)
        {
            _dbContext = dbContext;
            _mapperService = mapperService;
          
        }

        public async Task<ApplianceResponseModel> PostApplianceAsync(ApplianceRequestModel request)
        {
            try
            {
                var newAppliance = _mapperService.Map<AppliancesEntity>(request);
                await _dbContext.Appliances.AddAsync(newAppliance);
                await _dbContext.SaveChangesAsync();
                return _mapperService.Map<ApplianceResponseModel>(newAppliance);
            }
            catch (DbUpdateException e)
            {
                throw new NullReferenceException($"Error al agregar nuevo electrodoméstico: {e.InnerException.Message}");
            }
        }

        public async Task<ApplianceResponseModel> GetApplianceByIdAsync(int id)
        {
            try
            {
                var appliance = _mapperService.Map<ApplianceResponseModel>(await _dbContext.Appliances.FindAsync(id));
                if (appliance == null)
                {
                    throw new NullReferenceException($"No se encontró electrodoméstico con id {id}.");
                }
                return appliance;
            }
            catch (DbUpdateException e)
            {
                throw new NullReferenceException($"Error al guardar: {e.InnerException.Message}");
            }
        }

        public async Task<IList<ApplianceResponseModel>> GetAllAppliancesAsync()
        {
            try
            {
                var appliances = _mapperService.Map<IList<ApplianceResponseModel>>(
                    await _dbContext.Appliances.ToListAsync());
                if (appliances == null)
                {
                    throw new NullReferenceException($"No hay electrodomésticos agregados.");
                }
                return appliances;
            }
            catch (DbUpdateException e)
            {
                throw new NullReferenceException($"Error al obtener electrodomésticos: {e.InnerException.Message}");
            }
        }



    }
}
