using System.ComponentModel.DataAnnotations.Schema;

namespace BluDiet.API.Models;

[Table("diet_slot_items")]
public class DietSlotItem
{
    [Column("id")]
    public Guid Id { get; set; }

    [Column("slot_id")]
    public Guid SlotId { get; set; }

    [Column("day_id")] // <--- Cambiado de DayIndex a DayId para apuntar a la tabla diet_days
    public Guid DayId { get; set; }

    [Column("food_id")] // <--- Ahora es obligatorio porque los alimentos vienen de la DB
    public Guid FoodId { get; set; }

    [Column("quantity_grams")] // <--- Coincide con el SQL que ejecutamos
    public decimal QuantityGrams { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Propiedades de navegación
    [ForeignKey("SlotId")]
    public DietSlot Slot { get; set; } = null!;

    [ForeignKey("FoodId")]
    public Food Food { get; set; } = null!;

    [ForeignKey("DayId")]
    public DietDay Day { get; set; } = null!;
}