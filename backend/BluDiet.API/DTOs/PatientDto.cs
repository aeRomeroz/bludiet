namespace BluDiet.API.DTOs;

public record MedicalRecordDto(bool HasCondition, string? Observation);

public class MedicalHistoryDto
{
    public MedicalRecordDto ChronicDiseases { get; init; } = new(false, null);
    public MedicalRecordDto PreviousSurgeries { get; init; } = new(false, null);
    public MedicalRecordDto Allergies { get; init; } = new(false, null);
    public MedicalRecordDto Medications { get; init; } = new(false, null);
    public MedicalRecordDto Smokes { get; init; } = new(false, null);
    public MedicalRecordDto DrinksAlcohol { get; init; } = new(false, null);
}

public class MeasurementDto
{
    public decimal Weight { get; set; }
    public decimal Height { get; set; }
    public DateTime Date { get; set; }
}

public class PatientResponseDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateOnly BirthDate { get; set; }
    public string Gender { get; set; } = string.Empty;
    public string? Occupation { get; set; }
    public string ConsultationReason { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }
    
    // Propiedades calculadas útiles para el Front
    public DateTime? LastDietUpdate { get; set; }
    public int Age => DateTime.Now.Year - BirthDate.Year;
    public MeasurementDto? InitialMeasurement { get; set; }
    public MedicalHistoryDto? MedicalHistory { get; set; }
}

public class CreatePatientDto
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateOnly BirthDate { get; set; }
    public string Gender { get; set; } = string.Empty;
    public string? Occupation { get; set; }
    public string ConsultationReason { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }
    public MeasurementDto? InitialMeasurement { get; set; }
    public MedicalHistoryDto? MedicalHistory { get; set; }
}

public class UpdatePatientDto
{
    // El Id suele venir en la URL, pero algunos prefieren tenerlo en el DTO
    // public Guid Id { get; set; } 

    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public DateOnly? BirthDate { get; set; }
    public string? Gender { get; set; }
    public string? Occupation { get; set; }
    public string? ConsultationReason { get; set; }
    public string? Status { get; set; }
    public string? AvatarUrl { get; set; }

    // En actualizaciones, a veces estos campos se manejan en endpoints separados, 
    // pero si los dejas aquí, que sean opcionales.
    public MedicalHistoryDto? MedicalHistory { get; set; }
}