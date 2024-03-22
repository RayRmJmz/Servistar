using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Servistar.Server.Entities;

namespace Servistar.Server.Contexts
{
    public class ServistarContext : IdentityDbContext<ApplicationUserEntity>
    {
        private readonly IPasswordHasher<ApplicationUserEntity> _passwordHasher;
        public ServistarContext(
           IPasswordHasher<ApplicationUserEntity> passwordHasher,
           DbContextOptions<ServistarContext> options) : base(options)
        {
            _passwordHasher = passwordHasher;
        }

        //   Add-Migration Initial -Context ServistarContext
        //   Remove-Migration -Context ServistarContext

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            AddRoles(builder);
            AddAdministrator(builder);
           
        }

        private void AddAdministrator(ModelBuilder builder)
        {

            var user = new ApplicationUserEntity
            {
                Id = "99999999",
                UserName = "administrador",
                NormalizedUserName = "administrador".ToUpper(),
                Email = "rayrmjmz@outlook.com",
                EmailConfirmed = true,
                NormalizedEmail = "rayrmjmz@outlook.com".ToUpper(),
            };
            user.PasswordHash = _passwordHasher.HashPassword(user, "$servistaradmi$");
            builder.Entity<ApplicationUserEntity>().HasData(user);
            builder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string> { RoleId = "1", UserId = "99999999" });
        }

        private void AddRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole { Id = "1", Name = "Administrador", NormalizedName = "Administrador".ToUpper() });
        }

        #region DbSet
        #endregion
    }
}
