using System.ComponentModel.DataAnnotations.Schema;

namespace BluDiet.API.Models;

[Table("diet_slot_items")] // Asegúrate de que este nombre coincida con tu tabla en Supabase
public class DietSlotItem
{
    [Column("id")]
    public Guid Id { get; set; }

    [Column("slot_id")]
    public Guid SlotId { get; set; }

    [Column("day_index")]
    public int DayIndex { get; set; }

    [Column("food_name")]
    public string FoodName { get; set; } = string.Empty;

    [Column("grams")] // <--- Aquí estaba el error "column d2.Grams does not exist"
    public decimal Grams { get; set; }

    [Column("external_food_id")]
    public string? ExternalFoodId { get; set; }

    [Column("food_id")]
    public Guid? FoodId { get; set; }

    // Las propiedades de navegación no llevan [Column]
    public DietSlot Slot { get; set; } = null!;
}