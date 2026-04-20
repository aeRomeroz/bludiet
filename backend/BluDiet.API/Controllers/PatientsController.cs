using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BluDiet.API.Data;
using BluDiet.API.Models;
using BluDiet.API.DTOs;
using AutoMapper;

namespace BluDiet.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PatientsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public PatientsController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PatientResponseDto>>> GetPatients()
    {
        var patients = await _context.Patients
            .Include(p => p.Measurements.Where(m => m.IsInitial))
            .Include(p => p.MedicalHistory)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return Ok(patients.Select(MapToResponseDto));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PatientResponseDto>> GetPatient(Guid id)
    {
        var patient = await _context.Patients
            .Include(p => p.Measurements.Where(m => m.IsInitial))
            .Include(p => p.MedicalHistory)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (patient == null) return NotFound();

        return Ok(MapToResponseDto(patient));
    }

    [HttpPost]
    public async Task<ActionResult<PatientResponseDto>> CreatePatient(CreatePatientDto dto)
    {
        var patient = new Patient
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            BirthDate = DateOnly.Parse(dto.BirthDate),
            Gender = dto.Gender,
            Occupation = dto.Occupation,
            ConsultationReason = dto.ConsultationReason,
            Status = dto.Status,
            AvatarUrl = dto.AvatarUrl,
            CreatedAt = DateTime.UtcNow,
        };

        if (dto.InitialMeasurement != null)
        {
            patient.Measurements.Add(new Measurement
            {
                Weight = dto.InitialMeasurement.Weight,
                Height = dto.InitialMeasurement.Height,
                Date = dto.InitialMeasurement.Date.ToUniversalTime(),
                IsInitial = true,
            });
        }

        if (dto.MedicalHistory != null)
        {
            patient.MedicalHistory = new MedicalHistory
            {
                ChronicDiseasesHasCondition = dto.MedicalHistory.ChronicDiseases.HasCondition,
                ChronicDiseasesObservation = dto.MedicalHistory.ChronicDiseases.Observation,
                PreviousSurgeriesHasCondition = dto.MedicalHistory.PreviousSurgeries.HasCondition,
                PreviousSurgeriesObservation = dto.MedicalHistory.PreviousSurgeries.Observation,
                AllergiesHasCondition = dto.MedicalHistory.Allergies.HasCondition,
                AllergiesObservation = dto.MedicalHistory.Allergies.Observation,
                MedicationsHasCondition = dto.MedicalHistory.Medications.HasCondition,
                MedicationsObservation = dto.MedicalHistory.Medications.Observation,
                SmokesHasCondition = dto.MedicalHistory.Smokes.HasCondition,
                SmokesObservation = dto.MedicalHistory.Smokes.Observation,
                DrinksAlcoholHasCondition = dto.MedicalHistory.DrinksAlcohol.HasCondition,
                DrinksAlcoholObservation = dto.MedicalHistory.DrinksAlcohol.Observation,
            };
        }

        _context.Patients.Add(patient);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPatient), new { id = patient.Id }, MapToResponseDto(patient));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePatient(Guid id, [FromBody] UpdatePatientDto dto)
    {
        var patient = await _context.Patients
            .Include(p => p.MedicalHistory)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (patient == null) return NotFound();

        _mapper.Map(dto, patient); 

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePatient(Guid id)
    {
        var patient = await _context.Patients.FindAsync(id);
        if (patient == null) return NotFound();

        _context.Patients.Remove(patient);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static PatientResponseDto MapToResponseDto(Patient p)
    {
        var initialMeasurement = p.Measurements.FirstOrDefault(m => m.IsInitial);
        return new PatientResponseDto
        {
            Id = p.Id,
            FirstName = p.FirstName,
            LastName = p.LastName,
            BirthDate = p.BirthDate.ToString("yyyy-MM-dd"),
            Gender = p.Gender,
            Occupation = p.Occupation,
            ConsultationReason = p.ConsultationReason,
            Status = p.Status,
            AvatarUrl = p.AvatarUrl,
            InitialMeasurement = initialMeasurement == null ? null : new MeasurementDto
            {
                Weight = initialMeasurement.Weight,
                Height = initialMeasurement.Height,
                Date = initialMeasurement.Date,
            },
            MedicalHistory = p.MedicalHistory == null ? null : new MedicalHistoryDto
            {
                ChronicDiseases = new MedicalRecordDto { HasCondition = p.MedicalHistory.ChronicDiseasesHasCondition, Observation = p.MedicalHistory.ChronicDiseasesObservation ?? string.Empty },
                PreviousSurgeries = new MedicalRecordDto { HasCondition = p.MedicalHistory.PreviousSurgeriesHasCondition, Observation = p.MedicalHistory.PreviousSurgeriesObservation ?? string.Empty },
                Allergies = new MedicalRecordDto { HasCondition = p.MedicalHistory.AllergiesHasCondition, Observation = p.MedicalHistory.AllergiesObservation ?? string.Empty },
                Medications = new MedicalRecordDto { HasCondition = p.MedicalHistory.MedicationsHasCondition, Observation = p.MedicalHistory.MedicationsObservation ?? string.Empty },
                Smokes = new MedicalRecordDto { HasCondition = p.MedicalHistory.SmokesHasCondition, Observation = p.MedicalHistory.SmokesObservation ?? string.Empty },
                DrinksAlcohol = new MedicalRecordDto { HasCondition = p.MedicalHistory.DrinksAlcoholHasCondition, Observation = p.MedicalHistory.DrinksAlcoholObservation ?? string.Empty },
            }
        };
    }
}