namespace BluDiet.API.DTOs;

// 1. Representa el alimento específico asignado a un día
public class DietSlotItemDto
{
    public Guid? Id { get; set; }
    public Guid FoodId { get; set; }
    public string FoodName { get; set; } = string.Empty;
    public decimal Grams { get; set; }
    public int DayNumber { get; set; } // Referencia a qué día pertenece
    public decimal Kcal { get; set; }
    public decimal Protein { get; set; }
    public decimal Fats { get; set; }
    public decimal Carbs { get; set; }
}

// 2. El hueco (Slot) que contiene alimentos
public class DietSlotDto
{
    public Guid? Id { get; set; }
    public int SlotIndex { get; set; }
    public List<DietSlotItemDto> Items { get; set; } = new();
}

// 3. La comida (Desayuno, Almuerzo...)
public class DietMealDto
{
    public Guid? Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int OrderIndex { get; set; }
    public List<DietSlotDto> Slots { get; set; } = new();
}

public class DietDayDto
{
    public Guid Id { get; set; }
    public int DayNumber { get; set; }
    public DateOnly Date { get; set; }
    public string? Notes { get; set; }
}

// 4. La respuesta completa que enviamos al Frontend (incluye IDs)
public class DietResponseDto
{
    public Guid Id { get; set; }
    public Guid PatientId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int DurationDays { get; set; }
    public DateOnly StartDate { get; set; }
    public List<DietDayDto> Days { get; set; } = new();
    public decimal TargetKcalPerDay { get; set; }
    public decimal TargetProtein { get; set; }
    public decimal TargetFats { get; set; }
    public decimal TargetCarbs { get; set; }
    public DateTime CreatedAt { get; set; }
    
    // Aquí incluimos la estructura que el Back acaba de generar
    public List<DietMealDto> Meals { get; set; } = new();
}

// 5. Lo que recibimos del Modal "Diet Setup"
public class CreateDietDto
{
    public Guid PatientId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int DurationDays { get; set; }
    public decimal TargetKcalPerDay { get; set; }
    public decimal TargetProtein { get; set; }
    public decimal TargetFats { get; set; }
    public decimal TargetCarbs { get; set; }
    public DateOnly StartDate { get; set; }
    
    // Cambiamos la lista de DTOs complejos por una lista de nombres simples
    // Ejemplo: ["Desayuno", "Comida", "Cena"]
    public List<string> SelectedMealNames { get; set; } = new();
}