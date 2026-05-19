using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace BluDiet.API.Extensions;

public static class SupabaseAuthExtensions
{
    public static IServiceCollection AddSupabaseAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var supabaseUrl = configuration["Supabase:Url"];
        var jwtJwk = configuration["Supabase:JwtJwk"];

        if (string.IsNullOrEmpty(supabaseUrl) || string.IsNullOrEmpty(jwtJwk))
        {
            throw new InvalidOperationException("ERROR: Falta la configuración crítica de Supabase en las variables de entorno.");
        }

        var cleanUrl = supabaseUrl.TrimEnd('/');
        
        var jwkSet = JsonWebKeySet.Create(jwtJwk);
        var signingKeys = jwkSet.GetSigningKeys();

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKeys = signingKeys, 
                
                ValidateIssuer = true,
                ValidIssuer = $"{cleanUrl}/auth/v1",
                
                ValidateAudience = true,
                ValidAudience = "authenticated",
                
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
        });

        return services;
    }
}