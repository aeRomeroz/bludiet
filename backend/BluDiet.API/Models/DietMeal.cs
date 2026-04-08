namespace BluDiet.API.Models;

public class DietMeal
{
    public Guid Id { get; set; }
    public Guid DietId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int OrderIndex { get; set; }

    public Diet Diet { get; set; } = null!;
    public ICollection<DietSlot> Slots { get; set; } = new List<DietSlot>();
}