namespace BluDiet.API.Models;

public class MedicalHistory
{
    public Guid Id { get; set; }
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

    public Patient Patient { get; set; } = null!;
}