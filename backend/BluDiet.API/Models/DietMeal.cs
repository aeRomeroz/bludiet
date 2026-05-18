using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BluDiet.API.Models;

public class DietMeal
{
    [Key]
    public Guid Id { get; set; }
    public Guid DietId { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
    public int OrderIndex { get; set; }

    // Navigators and Relationships
    [JsonIgnore]
    [ForeignKey("DietId")]
    public virtual Diet Diet { get; set; } = null!;
    public virtual ICollection<DietSlot> Slots { get; set; } = new List<DietSlot>();
}