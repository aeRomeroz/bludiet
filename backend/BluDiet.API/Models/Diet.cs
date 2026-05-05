using System.ComponentModel.DataAnnotations.Schema;

namespace BluDiet.API.Models;

[Table("diets")] // Asegúrate de que el nombre de la tabla en Supabase sea este
public class Diet
{
    [Column("id")]
    public Guid Id { get; set; }

    [Column("patient_id")]
    public Guid PatientId { get; set; }

    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [Column("duration_days")]
    public int DurationDays { get; set; }

    [Column("target_kcal_per_day")]
    public int TargetKcalPerDay { get; set; }

    [Column("target_protein")]
    public decimal TargetProtein { get; set; }

    [Column("target_fats")]
    public decimal TargetFats { get; set; }

    [Column("target_carbs")]
    public decimal TargetCarbs { get; set; }

    [Column("start_date")]
    public DateOnly StartDate { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Relaciones (No llevan [Column])
    public Patient Patient { get; set; } = null!;
    public ICollection<DietMeal> Meals { get; set; } = new List<DietMeal>();
}