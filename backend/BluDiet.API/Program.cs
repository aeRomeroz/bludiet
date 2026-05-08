using Microsoft.EntityFrameworkCore;
using BluDiet.API.Data;
using AutoMapper;
using BluDiet.API.DTOs;
using BluDiet.API;

var builder = WebApplication.CreateBuilder(args);

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
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// En la sección de servicios (antes del builder.Build())
builder.Services.AddScoped<BedcaSeederService>();

var app = builder.Build();

// Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

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