using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 

namespace BluDiet.API.Models;

public class DietDay {
    [Key]
    public Guid Id { get; set; }
    public Guid DietId { get; set; }
    public int DayNumber { get; set; }
    public DateOnly? Date { get; set; }
    public string? Notes { get; set; }

    // Navigators and Relationships
    [ForeignKey("DietId")]
    public virtual Diet Diet { get; set; } = null!;
}