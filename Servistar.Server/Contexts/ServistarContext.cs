using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Servistar.Server.Entities;
using System.Reflection.Emit;

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

            builder.Entity<PhoneBook>()
            .HasIndex(b => b.PhoneNumber)
            .IsUnique();
            builder.Entity<AppliancesEntity>()
            .HasIndex(b => b.Appliance)
            .IsUnique();
            builder.Entity<BrandsEntity>()
            .HasIndex(b => b.Brand)
            .IsUnique();
            builder.Entity<CustumersEntity>().Property(b => b.IsActive).HasDefaultValue(true);

            AddRoles(builder);
            AddAdministrator(builder);
            AddMunicipalities(builder);
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


     
        private static void AddRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole { Id = "1", Name = "Administrador", NormalizedName = "administrador".ToUpper() },
                new IdentityRole { Id = "2", Name = "Recepcionista", NormalizedName = "recepcionista".ToUpper() },
                new IdentityRole { Id = "3", Name = "Tecnico", NormalizedName = "tecnico".ToUpper() }
                );
        }

        private static void AddMunicipalities(ModelBuilder builder)
        {
            builder.Entity<MunicipalitiesEntity>().HasData(
                new MunicipalitiesEntity { Id = 1, Minicipality = "Armería", Key= "001" },
                new MunicipalitiesEntity { Id = 2, Minicipality = "Colima", Key = "002" },
                new MunicipalitiesEntity { Id = 3, Minicipality = "Comala", Key = "003" },
                new MunicipalitiesEntity { Id = 4, Minicipality = "Coquimatlán", Key = "004" },
                new MunicipalitiesEntity { Id = 5, Minicipality = "Cuauhtémoc", Key = "005" },
                new MunicipalitiesEntity { Id = 6, Minicipality = "Ixtlahuacán", Key = "006" },
                new MunicipalitiesEntity { Id = 7, Minicipality = "Manzanillo", Key = "007"  },
                new MunicipalitiesEntity { Id = 8, Minicipality = "Minatitlán", Key = "008" },
                new MunicipalitiesEntity { Id = 9, Minicipality = "Tecomán", Key = "009" },
                new MunicipalitiesEntity { Id = 10, Minicipality = "Villa de Álvarez", Key = "010" });
        }


        #region DbSet
        public DbSet<CustomersAddressEntity> CustomersAddress => Set<CustomersAddressEntity>();
        public DbSet<CustumersPhoneNumbersEntity> CustumersPhoneNumbers => Set<CustumersPhoneNumbersEntity>();
        public DbSet<CustumersEntity> Customers => Set<CustumersEntity>();
        public DbSet<MunicipalitiesEntity> Municipalities => Set<MunicipalitiesEntity>();
        public DbSet<AppliancesEntity> Appliances => Set<AppliancesEntity>();
        public DbSet<BrandsEntity> Brands => Set<BrandsEntity>();
        #endregion
    }
}
