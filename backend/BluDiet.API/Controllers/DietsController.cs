using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BluDiet.API.Data;
using BluDiet.API.Models;
using BluDiet.API.DTOs;

namespace BluDiet.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DietsController : ControllerBase
{
    private readonly AppDbContext _context;

    public DietsController(AppDbContext context)
    {
        _context = context;
    }

    // 1. Obtener todas las dietas (Usado por el Contexto al inicio)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Diet>>> GetDiets()
    {
        return await _context.Diets
            .Include(d => d.Meals)
                .ThenInclude(m => m.Slots)
                    .ThenInclude(s => s.Items)
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync();
    }

    // 2. Obtener dietas de un paciente específico
    [HttpGet("patient/{patientId}")]
    public async Task<ActionResult<IEnumerable<Diet>>> GetByPatient(Guid patientId)
    {
        return await _context.Diets
            .Where(d => d.PatientId == patientId)
            .Include(d => d.Meals)
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync();
    }

    // 3. CREAR DIETA (El corazón de tu Modal)
    [HttpPost]
    public async Task<ActionResult<DietResponseDto>> CreateDiet(CreateDietDto request)
    {
        try
        {
            // 1. Verificar que el paciente existe
            var patient = await _context.Patients.FindAsync(request.PatientId);
            if (patient == null) return NotFound("Paciente no encontrado");

            var diet = new Diet
            {
                Id = Guid.NewGuid(),
                PatientId = request.PatientId,
                Name = request.Name,
                DurationDays = request.DurationDays,
                StartDate = request.StartDate,
                TargetKcalPerDay = (int)request.TargetKcalPerDay,
                TargetProtein = request.TargetProtein,
                TargetFats = request.TargetFats,
                TargetCarbs = request.TargetCarbs,
                CreatedAt = DateTime.UtcNow,
            };

            for (int i = 1; i <= request.DurationDays; i++)
            {
                diet.Days.Add(new DietDay
                {
                    Id = Guid.NewGuid(),
                    DayNumber = i,
                    Date = request.StartDate.AddDays(i - 1)
                });
            }

            // Generamos las comidas y un slot por defecto para cada una
            for (int i = 0; i < request.SelectedMealNames.Count; i++)
            {
                var meal = new DietMeal
                {
                    Id = Guid.NewGuid(),
                    Name = request.SelectedMealNames[i],
                    OrderIndex = i
                };

                // Añadimos un slot inicial por defecto a cada comida
                meal.Slots.Add(new DietSlot { Id = Guid.NewGuid(), SlotIndex = 0 });

                diet.Meals.Add(meal);
            }

            _context.Diets.Add(diet);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDiet), new { id = diet.Id }, MapToResponseDto(diet));
        }
        catch (Exception ex)
        {
            // Esto nos dirá si es un error de "Duplicate Key", "Null Value", etc.
            var innerError = ex.InnerException?.Message ?? ex.Message;
            return BadRequest(new { message = "Error de Base de Datos", details = innerError });
        }
    }

    // 4. Obtener una dieta por ID
    [HttpGet("{id}")]
    public async Task<ActionResult<DietResponseDto>> GetDiet(Guid id)
    {
        var diet = await _context.Diets
            .Include(d => d.Days)
            .Include(d => d.Meals)
                .ThenInclude(m => m.Slots)
                    .ThenInclude(s => s.Items)
                        .ThenInclude(i => i.Food)
            .Include(d => d.Meals)
            .ThenInclude(m => m.Slots)
                .ThenInclude(s => s.Items)
                    .ThenInclude(i => i.Day)
            .FirstOrDefaultAsync(d => d.Id == id);

        if (diet == null) return NotFound();
        return MapToResponseDto(diet);
    }

    // 5. Eliminar Dieta
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDiet(Guid id)
    {
        var diet = await _context.Diets.FindAsync(id);
        if (diet == null) return NotFound();

        _context.Diets.Remove(diet);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // PUT: api/diets/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDiet(Guid id, DietResponseDto request)
    {
        if (id != request.Id) return BadRequest("ID mismatch");

        // 1. Cargar la dieta con TODA su estructura para poder comparar
        var diet = await _context.Diets
        .Include(d => d.Days)
        .Include(d => d.Meals)
            .ThenInclude(m => m.Slots)
                .ThenInclude(s => s.Items)
        .FirstOrDefaultAsync(d => d.Id == id);

        if (diet == null) return NotFound();

        // 2. Actualizar datos básicos
        diet.Name = request.Name;
        diet.TargetKcalPerDay = (int)request.TargetKcalPerDay;
        diet.TargetProtein = request.TargetProtein;
        diet.TargetFats = request.TargetFats;
        diet.TargetCarbs = request.TargetCarbs;

        // 3. Sincronizar Alimentos (La parte clave)
        // Para simplificar esta versión, vamos a actualizar los ítems de los slots
        foreach (var mealDto in request.Meals)
        {
            var mealEntity = diet.Meals.FirstOrDefault(m => m.Id == mealDto.Id);
            if (mealEntity == null) continue;

            foreach (var slotDto in mealDto.Slots)
            {
                var slotEntity = mealEntity.Slots.FirstOrDefault(s => s.Id == slotDto.Id);
                if (slotEntity == null) continue;

                _context.DietSlotItems.RemoveRange(slotEntity.Items);
                slotEntity.Items.Clear();

                foreach (var itemDto in slotDto.Items)
                {
                    var targetDay = diet.Days.FirstOrDefault(d => d.DayNumber == itemDto.DayNumber);

                    if (targetDay != null)
                {
                    slotEntity.Items.Add(new DietSlotItem
                    {
                        Id = Guid.NewGuid(),
                        FoodId = itemDto.FoodId,
                        QuantityGrams = itemDto.Grams,
                        DayId = targetDay.Id, // <--- Crucial vincularlo al ID real de la DB
                        SlotId = slotEntity.Id,
                        CreatedAt = DateTime.UtcNow
                    });
                }
                }
            }
        }

        try
        {
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            // Esto te ayudará a ver en la consola de Docker si hay un error de clave foránea
            Console.WriteLine($"Error actualizando dieta: {ex.Message}");
            return StatusCode(500, "Internal server error during save");
        }
    }

    private bool DietExists(Guid id) => _context.Diets.Any(e => e.Id == id);

    // Helper manual de mapeo (luego lo pasamos a MappingProfile)
    private static DietResponseDto MapToResponseDto(Diet d)
    {
        return new DietResponseDto
        {
            Id = d.Id,
            PatientId = d.PatientId,
            Name = d.Name,
            DurationDays = d.DurationDays,
            StartDate = d.StartDate,
            CreatedAt = d.CreatedAt,
            TargetKcalPerDay = d.TargetKcalPerDay,
            TargetProtein = d.TargetProtein,
            TargetFats = d.TargetFats,
            TargetCarbs = d.TargetCarbs,
            Days = d.Days.Select(day => new DietDayDto
            {
                Id = day.Id,
                DayNumber = day.DayNumber,
                Date = day.Date ?? DateOnly.FromDateTime(DateTime.Now),
                Notes = day.Notes
            }).ToList(),
            Meals = d.Meals.Select(m => new DietMealDto
            {
                Id = m.Id,
                Name = m.Name,
                OrderIndex = m.OrderIndex,
                Slots = m.Slots.Select(s => new DietSlotDto
                {
                    Id = s.Id,
                    SlotIndex = s.SlotIndex,
                    Items = s.Items.Select(i => new DietSlotItemDto
                    {
                        Id = i.Id,
                        FoodId = i.FoodId,
                        FoodName = i.Food?.NameEs ?? "Nombre no disponible",
                        Grams = i.QuantityGrams,
                        DayNumber = i.Day.DayNumber,
                        Kcal = (i.Food?.KcalPer100g ?? 0) * (i.QuantityGrams / 100)
                    }).ToList()
                }).ToList()
            }).ToList()
        };
    }
}