using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BluDiet.API.Models;

public class DietSlot
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public Guid MealId { get; set; }
    [Required]
    public int SlotIndex { get; set; }

    // Navigators and Relationships
    [JsonIgnore]
    [ForeignKey("MealId")]
    public virtual DietMeal Meal { get; set; } = null!;
    public virtual ICollection<DietSlotItem> Items { get; set; } = new List<DietSlotItem>();
}