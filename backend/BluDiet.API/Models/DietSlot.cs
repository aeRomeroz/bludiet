namespace BluDiet.API.Models;

public class DietSlot
{
    public Guid Id { get; set; }
    public Guid MealId { get; set; }
    public int SlotIndex { get; set; }

    public DietMeal Meal { get; set; } = null!;
    public ICollection<DietSlotItem> Items { get; set; } = new List<DietSlotItem>();
}