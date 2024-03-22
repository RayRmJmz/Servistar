namespace Servistar.Server.Models.Sources
{
    public class AppSettings
    {
        public string JwtSecret { get; init; } = string.Empty;
        public string JwtSecretResetPassword { get; init; } = string.Empty;
    }
}
