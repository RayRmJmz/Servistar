using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Servistar.Server.Contexts;
using Servistar.Server.Entities;
using Servistar.Server.Models;
using Servistar.Server.Models.Sources;
using System.Security.Authentication;

namespace Servistar.Server.Services.Implementations
{
    public class UsersService : IUsersService
    {
        private readonly IWebHostEnvironment _env;
        private readonly ServistarContext _dbContext;
        private readonly IMapper _mapperService;
        private readonly UserManager<ApplicationUserEntity> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public UsersService (
            IWebHostEnvironment env, 
            ServistarContext dbContext, 
            IMapper mapperService, 
            UserManager<ApplicationUserEntity> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            _env = env;
            _dbContext = dbContext;
            _mapperService = mapperService;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<UsersResponseModel> PostUsersAsync(UsersCreateModel request)
        {
            using var transaction = _dbContext.Database.BeginTransaction();
            try
            {
                var newUser = _mapperService.Map<ApplicationUserEntity>(request);
                newUser.NormalizedEmail = request.Email.ToUpper();
                newUser.NormalizedUserName = request.UserName.ToUpper();
                newUser.SecurityStamp =  Guid.NewGuid().ToString();
                var result = await _userManager.CreateAsync(newUser, request.NewPassword);
                if (!result.Succeeded)
                {
                    throw new InvalidOperationException(result.Errors.ElementAt(0)?.Description);
                }

                var newRolesToAdd = request.Roles.Where(r => r.Selected).Select(r => r.Name);
                await _userManager.AddToRolesAsync(newUser, newRolesToAdd);
                newUser.LockoutEnabled = false;
                var updateResult = await _userManager.UpdateAsync(newUser);

                if (!updateResult.Succeeded)
                {
                    throw new InvalidOperationException("No se pudo agregar los roles del usuario.");
                }

                transaction.Commit();
                return _mapperService.Map<UsersResponseModel>(newUser);
            }
            catch (InvalidOperationException exception)
            {
                transaction.Rollback();
                throw new InvalidOperationException(exception.Message);
            }
            catch (Exception exception)
            {
                transaction.Rollback();
                throw new Exception(exception.Message);
            }
        }

        public async Task<IEnumerable<UsersResponseModel>> GetAllUsersAsync ()
        {
            try
            {
                var users = _dbContext.Users.AsQueryable();

                // Incluir los roles al cargar los usuarios
               

                if (_env.IsProduction())
                {
                    users = users.Where(f => f.UserName != "Administrador");
                }
                /*
                if(active != null)
                {
                    users = users.Where(f => f.Active == active);
                }
                */
                var response = _mapperService.Map<IEnumerable<UsersResponseModel>>(await users.ToListAsync());
                return response;
            }
            catch (Exception exception)
            {
                throw new Exception(exception.Message);
            }
        }

        public async Task<UsersResponseModel> GetUserByIdAsync(string userId)
        {
            var user = await _dbContext.Users.FindAsync(userId);
            if (user == null)
            {
                throw new NullReferenceException("No se encontro el usuario.");
            }
            var roles = await _userManager.GetRolesAsync(user);
            var userReturn = _mapperService.Map<UsersResponseModel>(user);
            List<RoleResponseModel> addRoles = new List<RoleResponseModel>();
            foreach (var role in _roleManager.Roles)
            {
                if (roles.Contains(role.Name))
                {
                    addRoles.Add(_mapperService.Map<RoleResponseModel>(role));
                }
            }

            userReturn.Roles = addRoles;

            return userReturn;
        }


    }
}
