namespace BluDiet.API.Models;

public class DietSlotItem
{
    public Guid Id { get; set; }
    public Guid SlotId { get; set; }
    public int DayIndex { get; set; }
    public string FoodName { get; set; } = string.Empty;
    public decimal Grams { get; set; }
    public string? ExternalFoodId { get; set; }
    public Guid? FoodId { get; set; }

    public DietSlot Slot { get; set; } = null!;
}