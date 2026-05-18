using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BluDiet.API.Models;

public class Measurement
{
    [Key]
    public Guid Id { get; set; }
    public Guid PatientId { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public decimal Weight { get; set; }
    public decimal Height { get; set; }
    public bool IsInitial { get; set; } = false;

    // Navigators and Relationships

    [ForeignKey("PatientId")]
    public virtual Patient Patient { get; set; } = null!;
}