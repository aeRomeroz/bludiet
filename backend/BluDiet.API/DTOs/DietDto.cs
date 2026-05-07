namespace BluDiet.API.DTOs;

// 1. El eslabón más pequeño: El ítem de alimento (opcional para la creación inicial)
public class DietSlotItemDto
{
    public Guid? Id { get; set; }
    public int DayIndex { get; set; }
    public string FoodName { get; set; } = string.Empty;
    public decimal Grams { get; set; }
    public string? ExternalFoodId { get; set; }
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

// 4. La respuesta completa que enviamos al Frontend (incluye IDs)
public class DietResponseDto
{
    public Guid Id { get; set; }
    public Guid PatientId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int DurationDays { get; set; }
    public decimal TargetKcalPerDay { get; set; }
    public decimal TargetProtein { get; set; }
    public decimal TargetFats { get; set; }
    public decimal TargetCarbs { get; set; }
    public DateTime StartDate { get; set; }
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
    public DateTime StartDate { get; set; }
    
    // Cambiamos la lista de DTOs complejos por una lista de nombres simples
    // Ejemplo: ["Desayuno", "Comida", "Cena"]
    public List<string> SelectedMealNames { get; set; } = new();
}