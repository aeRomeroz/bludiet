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
public async Task<ActionResult<Diet>> CreateDiet(CreateDietDto dto)
{
    try
    {
        var newDietId = Guid.NewGuid();

        var diet = new Diet
        {
            Id = newDietId,
            PatientId = dto.PatientId,
            Name = dto.Name,
            DurationDays = dto.DurationDays,
            TargetKcalPerDay = (int)dto.TargetKcalPerDay, 
            TargetProtein = dto.TargetProtein,
            TargetFats = dto.TargetFats,
            TargetCarbs = dto.TargetCarbs,
            StartDate = DateOnly.FromDateTime(dto.StartDate), 
            CreatedAt = DateTime.UtcNow,

            // GENERACIÓN DE ESTRUCTURA AUTOMÁTICA
            Meals = dto.SelectedMealNames.Select((mealName, index) => new DietMeal
            {
                Id = Guid.NewGuid(),
                DietId = newDietId,
                Name = mealName,
                OrderIndex = index,
                Slots = new List<DietSlot>
                {
                    new DietSlot
                    {
                        Id = Guid.NewGuid(),
                        SlotIndex = 0,
                        Items = new List<DietSlotItem>() // Lista vacía lista para recibir alimentos
                    }
                }
            }).ToList()
        };

        _context.Diets.Add(diet);
        await _context.SaveChangesAsync();
        return await GetById(diet.Id);
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
    public async Task<ActionResult<Diet>> GetById(Guid id)
    {
        var diet = await _context.Diets
            .Include(d => d.Meals)
                .ThenInclude(m => m.Slots)
                    .ThenInclude(s => s.Items)
            .FirstOrDefaultAsync(d => d.Id == id);

        if (diet == null) return NotFound();
        return diet;
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

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDiet(Guid id, Diet diet)
    {
        if (id != diet.Id) return BadRequest();

        // 1. Buscamos la dieta existente con todos sus hijos
        var existingDiet = await _context.Diets
            .Include(d => d.Meals)
                .ThenInclude(m => m.Slots)
                    .ThenInclude(s => s.Items)
            .FirstOrDefaultAsync(d => d.Id == id);

        if (existingDiet == null) return NotFound();

        // 2. Actualizamos campos básicos
        existingDiet.Name = diet.Name;
        existingDiet.TargetKcalPerDay = diet.TargetKcalPerDay;
        existingDiet.TargetProtein = diet.TargetProtein;
        existingDiet.TargetFats = diet.TargetFats;
        existingDiet.TargetCarbs = diet.TargetCarbs;

        // 3. Manejo de la estructura compleja
        // La forma más robusta para evitar conflictos de tracking es remover los hijos
        // y dejar que EF los vuelva a insertar (siempre que el volumen de datos sea manejable)
        _context.DietMeals.RemoveRange(existingDiet.Meals);
        
        // Asignamos las nuevas comidas (asegúrate de que los IDs sean nuevos o manejados)
        existingDiet.Meals = diet.Meals;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!DietExists(id)) return NotFound();
            throw;
        }

        return NoContent();
    }

    private bool DietExists(Guid id) => _context.Diets.Any(e => e.Id == id);
}