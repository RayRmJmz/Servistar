using Microsoft.EntityFrameworkCore;
using Servistar.Server.Models.Sources;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Reflection;
using System.Security.Authentication;
using System.Text.Json;

namespace Servistar.Server.ExceptionMiddleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (ValidationException ex)
            {
                await SendResponseAsync(HttpStatusCode.BadRequest, GetModelValidationErrors(ex), httpContext);
            }
            catch (ArgumentException ex)
            {
                await SendResponseAsync(HttpStatusCode.BadRequest, ex.Message, httpContext);
            }
            catch (InvalidCredentialException ex)
            {
                await SendResponseAsync(HttpStatusCode.Unauthorized, ex.Message, httpContext);
            }
            catch (InvalidOperationException ex)
            {
                await SendResponseAsync(HttpStatusCode.Forbidden, ex.Message, httpContext);
            }
            catch (NullReferenceException ex)
            {
                await SendResponseAsync(HttpStatusCode.NotFound, ex.Message, httpContext);
            }
            catch (AmbiguousMatchException ex)
            {
                await SendResponseAsync(HttpStatusCode.Conflict, ex.Message, httpContext);
            }
            catch (DbUpdateException ex)
            {
                await SendResponseAsync(HttpStatusCode.InternalServerError, ex.Message, httpContext);
            }
            catch (Exception ex)
            {
                var t = ex.ToString();
                var conversion = int.TryParse(t, out int status);

                var statusCode = conversion
                    ? (HttpStatusCode)status
                    : HttpStatusCode.InternalServerError;

                await SendResponseAsync(statusCode, ex.Message, httpContext);
            }
        }

        private async Task SendResponseAsync(HttpStatusCode statusCode, string message, HttpContext httpContext)
        {
            var response = new GetApiMessageResponseModel(statusCode, message);
            httpContext.Response.StatusCode = (int)statusCode;

            await httpContext.Response.WriteAsync(JsonSerializer.Serialize(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            }));
        }
        private string GetModelValidationErrors(System.ComponentModel.DataAnnotations.ValidationException ex)
        {
            // Construye el mensaje de error concatenando los mensajes de error de validación
            return ex.Message;
        }
    }
}
