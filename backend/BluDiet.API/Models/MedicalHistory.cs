using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BluDiet.API.Models;

public class MedicalHistory
{
    [Key]
    public Guid Id { get; set; }
    // FK a Patient
    public Guid PatientId { get; set; }

    public bool ChronicDiseasesHasCondition { get; set; }
    public string? ChronicDiseasesObservation { get; set; }

    public bool PreviousSurgeriesHasCondition { get; set; }
    public string? PreviousSurgeriesObservation { get; set; }

    public bool AllergiesHasCondition { get; set; }
    public string? AllergiesObservation { get; set; }

    public bool MedicationsHasCondition { get; set; }
    public string? MedicationsObservation { get; set; }

    public bool SmokesHasCondition { get; set; }
    public string? SmokesObservation { get; set; }

    public bool DrinksAlcoholHasCondition { get; set; }
    public string? DrinksAlcoholObservation { get; set; }

    // Navigators and Relationships
    [ForeignKey("PatientId")]
    public virtual Patient Patient { get; set; } = null!;
}