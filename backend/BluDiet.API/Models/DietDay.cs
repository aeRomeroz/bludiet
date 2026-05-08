using System.ComponentModel.DataAnnotations.Schema; 

namespace BluDiet.API.Models;

[Table("diet_days")]
public class DietDay {
    public Guid Id { get; set; }
    public Guid DietId { get; set; }
    public int DayNumber { get; set; }
    public DateOnly? Date { get; set; }
    public string? Notes { get; set; }
}