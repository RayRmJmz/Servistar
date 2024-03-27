using Servistar.Server.Models.Sources;

namespace Servistar.Server.Services.Implementations
{
    public class CheckPaginationService<T> where T : class
    {
        public static PaginationResponseModel<T> CheckPaginacion(PaginationResponseModel<T> response, int page, int take, int total)
        {
            if (response.Results.Count() < take)
            {
                response.HasMore = false;
                response.NextPage = page;
                response.Total = total;
            }
            else
            {
                response.HasMore = true;
                response.NextPage = page + 1;
                response.Total = total;
            }
            return response;
        }
    }
}
