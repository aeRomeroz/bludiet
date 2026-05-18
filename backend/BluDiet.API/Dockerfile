# Etapa de compilación
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# 1. Copiar archivos de proyecto y restaurar dependencias
# Esto se hace por separado para aprovechar la caché de capas de Docker
COPY *.csproj ./
RUN dotnet restore

# 2. Copiar todo el código fuente y el JSON de datos
COPY . ./

# 3. Publicar la aplicación
# El flag -c Release compila para producción
RUN dotnet publish -c Release -o out

# Etapa de ejecución (Runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# 4. Copiar los archivos publicados desde la etapa anterior
COPY --from=build /app/out .

# 5. IMPORTANTE: Render usa la variable PORT. 
# ASP.NET Core 8 detecta automáticamente la variable de entorno PORT si no se redefine,
# pero con la línea que añadimos en Program.cs (UseUrls), ya estamos cubiertos.

ENTRYPOINT ["dotnet", "BluDiet.API.dll"]