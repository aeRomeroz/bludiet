namespace BluDiet.API.Models;

public class Measurement
{
    public Guid Id { get; set; }
    public Guid PatientId { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public decimal Weight { get; set; }
    public decimal Height { get; set; }
    public bool IsInitial { get; set; } = false;

    public Patient Patient { get; set; } = null!;
}