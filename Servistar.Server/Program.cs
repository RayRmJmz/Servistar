using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Servistar.Server;
using Servistar.Server.Contexts;
using Servistar.Server.ExceptionMiddleware;
using Servistar.Server.Models.Sources;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Servistar endpoints",
        Description = "This is a documentation for endpoints in Servistar project.",
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });

    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});
  

builder.Services
    .AddJwtAuthentication(builder.Configuration)
    .AddIdentity()
    .AddAppServices();

builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

builder.Services.AddDbContext<ServistarContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DbContext_Connection"),
        opt => opt.UseCompatibilityLevel(110))
    .EnableSensitiveDataLogging(true).UseLazyLoadingProxies();
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseMiddleware<ExceptionMiddleware>();
app.MapControllers();

app.MapFallbackToFile("/index.html");

using var scope = app.Services.CreateScope();
var db = scope.ServiceProvider.GetRequiredService<ServistarContext>();
db.Database.Migrate();

app.Run();
