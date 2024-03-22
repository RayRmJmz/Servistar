using System.ComponentModel.DataAnnotations;

namespace Servistar.Server.Models
{
    public class AuthenticateRequestModel
    {
        [Required]
        public string UserName { get; set; }
        [Required, MinLength(4, ErrorMessage = "La longitud mínima para el campo 'Password' es de 4 caracteres.")]
        public string Password { get; set; }
    }

    public class AuthenticateResponseModel
    {
        public string Token { get; set; }
    }
}
