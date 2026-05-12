using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BluDiet.API.Models;

public class Diet
{
    [Key]
    public Guid Id { get; set; }
    public Guid PatientId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int DurationDays { get; set; }
    public int TargetKcalPerDay { get; set; }
    public decimal TargetProtein { get; set; }
    public decimal TargetFats { get; set; }
    public decimal TargetCarbs { get; set; }
    public DateOnly StartDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigators and Relationships
    [ForeignKey("PatientId")] 
    public virtual Patient Patient { get; set; } = null!;
    
    public virtual ICollection<DietDay> Days { get; set; } = new List<DietDay>();
    public virtual ICollection<DietMeal> Meals { get; set; } = new List<DietMeal>();
}