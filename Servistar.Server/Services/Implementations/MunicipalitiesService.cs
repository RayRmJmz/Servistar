using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Servistar.Server.Contexts;
using Servistar.Server.Models.Sources;

namespace Servistar.Server.Services.Implementations
{
    public class MunicipalitiesService : IMunicipalitiesService
    {
        private readonly  ServistarContext _dbContext;
        private readonly IMapper _mapperService;
        public MunicipalitiesService(ServistarContext dbContext, IMapper mapperService)
        {
            _dbContext = dbContext;
            _mapperService = mapperService;
        }

        public async Task<IList<MinicipalitiesModel>> GetMinicipalitiesAsync()
        {
            var municipalities = _mapperService.Map<IList<MinicipalitiesModel>>(await _dbContext.Municipalities.ToListAsync()); 
            return municipalities;
        }
    }
}
