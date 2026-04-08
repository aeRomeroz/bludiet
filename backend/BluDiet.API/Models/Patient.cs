namespace BluDiet.API.Models;

public class Patient
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateOnly BirthDate { get; set; }
    public string Gender { get; set; } = string.Empty;
    public string? Occupation { get; set; }
    public string ConsultationReason { get; set; } = string.Empty;
    public string Status { get; set; } = "PENDING";
    public string? AvatarUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Measurement> Measurements { get; set; } = new List<Measurement>();
    public MedicalHistory? MedicalHistory { get; set; }
    public ICollection<Diet> Diets { get; set; } = new List<Diet>();
}