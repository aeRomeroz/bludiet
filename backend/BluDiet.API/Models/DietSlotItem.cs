using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BluDiet.API.Models;

public class DietSlotItem
{
    [Key]
    public Guid Id { get; set; }
    public Guid SlotId { get; set; }
    public Guid DayId { get; set; }
    public Guid FoodId { get; set; }
    
    [Range(0.1, 10000)]
    public decimal QuantityGrams { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigators and Relationships
    [JsonIgnore]
    [ForeignKey("SlotId")]
    public virtual DietSlot Slot { get; set; } = null!;
    
    [JsonIgnore]
    [ForeignKey("DayId")]
    public virtual DietDay Day { get; set; } = null!;
    
    [ForeignKey("FoodId")]
    public virtual Food Food { get; set; } = null!;

}