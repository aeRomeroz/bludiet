namespace BluDiet.API.Models;

public class DietSlot
{
    public Guid Id { get; set; }
    public Guid MealId { get; set; }
    public int SlotIndex { get; set; }

    [System.Text.Json.Serialization.JsonIgnore]
    public DietMeal Meal { get; set; } = null!;
    public ICollection<DietSlotItem> Items { get; set; } = new List<DietSlotItem>();
}