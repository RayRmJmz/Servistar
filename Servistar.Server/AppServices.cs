using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Servistar.Server.Entities;
using Servistar.Server.Contexts;
using Servistar.Server.Services;
using Servistar.Server.Services.Implementations;

namespace Servistar.Server
{
    public static class AppServices
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services)
        {
            services.AddSingleton(provider =>
            {
                return new MapperConfiguration(config =>
                {
                    config.AddProfile<AutoMapperProfile>();
                    config.ConstructServicesUsing(type =>
                    ActivatorUtilities.GetServiceOrCreateInstance(provider, type));
                }).CreateMapper();
            });


            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IMunicipalitiesService, MunicipalitiesService>();


            services.AddValidatorsFromAssembly(typeof(AppServices).Assembly);

            return services;
        }
        public static IServiceCollection AddIdentity(this IServiceCollection services)
        {
            services.AddDefaultIdentity<ApplicationUserEntity>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<ServistarContext>()
                .AddTokenProvider<DataProtectorTokenProvider<ApplicationUserEntity>>("ServistarProject");

            services.Configure<IdentityOptions>(options =>
            {
                // Password settings.
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 1;

                // Lockout settings.
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromDays(31);
                options.Lockout.MaxFailedAccessAttempts = 8;
                options.Lockout.AllowedForNewUsers = true;

                // User settings.
                options.User.AllowedUserNameCharacters =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+&$ ";
                options.User.RequireUniqueEmail = false;
            });

            return services;
        }

        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration config)
        {
            var secret = config["AppSettings:JwtSecret"];
            var key = Encoding.ASCII.GetBytes(secret);
            services.AddAuthentication(opts =>
            {
                opts.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opts.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(opts =>
            {
                opts.RequireHttpsMetadata = false;
                opts.SaveToken = true;
                opts.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                };
            });

            return services;
        }
    }
}

