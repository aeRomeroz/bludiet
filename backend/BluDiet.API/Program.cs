using Microsoft.EntityFrameworkCore;
using BluDiet.API.Data;
using AutoMapper;
using BluDiet.API.DTOs;
using BluDiet.API;
using BluDiet.API.Extensions;

var builder = WebApplication.CreateBuilder(args);

//Configurar el puerto para Render
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Servicios
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(MappingProfile));

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddScoped<BedcaSeederService>();
}

// =========================================================
//              Autenticación de Supabase
// =========================================================
builder.Services.AddSupabaseAuthentication(builder.Configuration);
// =========================================================

// Base de datos
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"),
        npgsqlOptions => npgsqlOptions.CommandTimeout(30))
    .UseSnakeCaseNamingConvention();
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        if (builder.Environment.IsDevelopment())
        {
            // En desarrollo local (iPad/PC), permitimos todo para no tener fricción
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
        else
        {
            // EN PRODUCCIÓN: Solo tu URL real
            policy.WithOrigins("https://bludiet-web.onrender.com") 
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
    });
});

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// ---------------------------------------------------------
var app = builder.Build(); // A partir de aquí ya no puedes registrar servicios
// ---------------------------------------------------------

// 3. PIPELINE (Middleware)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseCors("FrontendPolicy");

app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();

// 4. SEEDER (Seguro)
if (app.Environment.IsDevelopment())
{
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        // Verificamos si el servicio existe antes de pedirlo
        var seeder = services.GetService<BedcaSeederService>();
        if (seeder != null) await seeder.SeedAsync("BEDCA.json");
    }
}

app.Run();