using System.Net;

namespace Servistar.Server.Models.Sources
{
    public class GetApiMessageResponseModel
    {
        public string Message { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public bool Success => (int)StatusCode >= 200 && (int)StatusCode < 300;

        public GetApiMessageResponseModel(HttpStatusCode statusCode, string message)
        {
            StatusCode = statusCode;
            Message = message;
        }
    }
}
