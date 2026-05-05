using System.ComponentModel.DataAnnotations.Schema;

namespace BluDiet.API.Models;

[Table("patients")]
public class Patient
{
    [Column("id")]
    public Guid Id { get; set; }

    [Column("first_name")]
    public string FirstName { get; set; } = string.Empty;

    [Column("last_name")]
    public string LastName { get; set; } = string.Empty;

    [Column("birth_date")]
    public DateOnly BirthDate { get; set; }

    [Column("gender")]
    public string Gender { get; set; } = string.Empty;

    [Column("occupation")]
    public string? Occupation { get; set; }

    [Column("consultation_reason")]
    public string ConsultationReason { get; set; } = string.Empty;

    [Column("status")]
    public string Status { get; set; } = "PENDING";

    [Column("avatar_url")]
    public string? AvatarUrl { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Measurement> Measurements { get; set; } = new List<Measurement>();
    public MedicalHistory? MedicalHistory { get; set; }
    public ICollection<Diet> Diets { get; set; } = new List<Diet>();
}