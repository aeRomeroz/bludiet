using Microsoft.EntityFrameworkCore;
using BluDiet.API.Data;
using AutoMapper;
using BluDiet.API.DTOs;
using BluDiet.API;

var builder = WebApplication.CreateBuilder(args);

// 1. Configurar el puerto para Render
// Render asigna un puerto aleatorio mediante la variable de entorno PORT
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Servicios
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Base de datos
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"),
        npgsqlOptions => npgsqlOptions.CommandTimeout(30))
    .UseSnakeCaseNamingConvention();
});

builder.Services.AddAutoMapper(typeof(MappingProfile));

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        // En Render/Producción, permitimos el origen de tu web desplegada
        // Puedes usar .AllowAnyOrigin() para testear rápido o poner tu URL de Render/Vercel
        policy.AllowAnyOrigin() 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// En la sección de servicios (antes del builder.Build())
builder.Services.AddScoped<BedcaSeederService>();

var app = builder.Build();

// Pipeline
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("FrontendPolicy");
app.UseAuthorization();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<BedcaSeederService>();
    // Al estar en la misma carpeta que el código, la ruta es directa
    await seeder.SeedAsync("BEDCA.json");
}

app.Run();