namespace BluDiet.API.Models;

public class Diet
{
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

    public Patient Patient { get; set; } = null!;
    public ICollection<DietMeal> Meals { get; set; } = new List<DietMeal>();
}