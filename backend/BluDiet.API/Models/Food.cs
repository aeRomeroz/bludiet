using System.ComponentModel.DataAnnotations.Schema;

namespace BluDiet.API.Models;

[Table("foods")]
public class Food {
    public Guid Id { get; set; }
    public string? ExternalId { get; set; }
    public string Source { get; set; } = "BEDCA";
    public string NameEs { get; set; } = string.Empty;
    public string? NameEn { get; set; }
    public string? GroupName { get; set; }
    
    [Column("kcal_per_100g")] // Revisa que tenga el _ antes de 100
    public decimal KcalPer100g { get; set; }
    
    [Column("protein_per_100g")]
    public decimal ProteinPer100g { get; set; }
    
    [Column("fats_per_100g")]
    public decimal FatsPer100g { get; set; }
    
    [Column("carbs_per_100g")] // <--- ESTE ES EL QUE ESTÁ DANDO ERROR
    public decimal CarbsPer100g { get; set; }
    
    [Column("fiber_per_100g")]
    public decimal FiberPer100g { get; set; }
    
    [Column(TypeName = "jsonb")]
    public string FullNutrients { get; set; } = "[]";
}