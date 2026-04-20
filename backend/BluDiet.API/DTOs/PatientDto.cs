namespace BluDiet.API.DTOs;

public class MedicalRecordDto
{
    public bool HasCondition { get; set; }
    public string Observation { get; set; } = string.Empty;
}

public class MedicalHistoryDto
{
    public MedicalRecordDto ChronicDiseases { get; set; } = new();
    public MedicalRecordDto PreviousSurgeries { get; set; } = new();
    public MedicalRecordDto Allergies { get; set; } = new();
    public MedicalRecordDto Medications { get; set; } = new();
    public MedicalRecordDto Smokes { get; set; } = new();
    public MedicalRecordDto DrinksAlcohol { get; set; } = new();
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
    public string BirthDate { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public string? Occupation { get; set; }
    public string ConsultationReason { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }
    public MeasurementDto? InitialMeasurement { get; set; }
    public MedicalHistoryDto? MedicalHistory { get; set; }
}

public class CreatePatientDto
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string BirthDate { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public string? Occupation { get; set; }
    public string ConsultationReason { get; set; } = string.Empty;
    public string Status { get; set; } = "PENDING";
    public string? AvatarUrl { get; set; }
    public MeasurementDto? InitialMeasurement { get; set; }
    public MedicalHistoryDto? MedicalHistory { get; set; }
}

public class UpdatePatientDto : CreatePatientDto 
{
}