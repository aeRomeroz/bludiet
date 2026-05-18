using System.Text.Json;
using System.Text.RegularExpressions;
using BluDiet.API.Data;   // Necesario para encontrar AppDbContext
using BluDiet.API.Models; // Necesario para encontrar la clase Food

namespace BluDiet.API; // <--- AÑADE ESTO

public class BedcaSeederService {
    private readonly AppDbContext _context;

    public BedcaSeederService(AppDbContext context) {
        _context = context;
    }

    public async Task SeedAsync(string filePath) {
        if (_context.Foods.Any(f => f.Source == "BEDCA")) return;

        var jsonData = await File.ReadAllTextAsync(filePath);
        var root = JsonDocument.Parse(jsonData).RootElement;

        foreach (var group in root.EnumerateArray()) {
            var groupName = group.GetProperty("food_group_nombre").GetString();
            
            foreach (var foodItem in group.GetProperty("alimentos").EnumerateArray()) {
                var food = new Food {
                    Id = Guid.NewGuid(),
                    ExternalId = foodItem.GetProperty("id").GetString(),
                    Source = "BEDCA",
                    NameEs = foodItem.GetProperty("name").GetProperty("español").GetString(),
                    NameEn = foodItem.GetProperty("name").GetProperty("ingles").GetString(),
                    GroupName = groupName,
                    FullNutrients = foodItem.GetProperty("nutrientes").GetRawText() // GUARDAMOS TODO
                };

                // Extraemos los macros principales para las columnas dedicadas
                foreach (var nut in foodItem.GetProperty("nutrientes").EnumerateArray()) {
                    var comp = nut.GetProperty("componente").GetString().ToLower();
                    var valStr = nut.GetProperty("valor").GetString();
                    if (valStr == "-") continue;

                    if (comp.Contains("energía, total")) food.KcalPer100g = ExtractKcal(valStr);
                    else if (comp.Contains("proteina")) food.ProteinPer100g = ParseDecimal(valStr);
                    else if (comp.Contains("grasa, total")) food.FatsPer100g = ParseDecimal(valStr);
                    else if (comp.Contains("carbohidratos")) food.CarbsPer100g = ParseDecimal(valStr);
                    else if (comp.Contains("fibra")) food.FiberPer100g = ParseDecimal(valStr);
                }
                _context.Foods.Add(food);
            }
        }
        await _context.SaveChangesAsync();
    }

    private decimal ExtractKcal(string input) {
        var match = Regex.Match(input, @"\(([^)]+)\)");
        return match.Success ? ParseDecimal(match.Groups[1].Value) : 0;
    }

    private decimal ParseDecimal(string input) => decimal.TryParse(input, out var res) ? res : 0;
}