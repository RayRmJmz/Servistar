using Servistar.Server.Models.Sources;

namespace Servistar.Server.Services
{
    public interface IMunicipalitiesService
    {
        Task<IList<MinicipalitiesModel>> GetMinicipalitiesAsync();
    }
}
