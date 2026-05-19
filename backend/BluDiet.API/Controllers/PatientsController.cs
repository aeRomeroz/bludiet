using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BluDiet.API.Data;
using BluDiet.API.Models;
using BluDiet.API.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace BluDiet.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PatientsController : BaseApiController
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
            .Where(p => p.UserId == CurrentUserId)
            .Include(p => p.Measurements.Where(m => m.IsInitial))
            .Include(p => p.MedicalHistory)
            .Include(p => p.Diets)
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
            .Include(p => p.Diets)
            .FirstOrDefaultAsync(p => p.Id == id && p.UserId == CurrentUserId);

        if (patient == null) return NotFound();

        return Ok(MapToResponseDto(patient));
    }

    [HttpPost]
    public async Task<ActionResult<PatientResponseDto>> CreatePatient(CreatePatientDto dto)
    {
        var patient = new Patient
        {
            UserId = CurrentUserId,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            BirthDate = dto.BirthDate,
            Gender = dto.Gender,
            Occupation = dto.Occupation,
            ConsultationReason = dto.ConsultationReason,
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
            .FirstOrDefaultAsync(p => p.Id == id && p.UserId == CurrentUserId);

        if (patient == null) return NotFound();

        _mapper.Map(dto, patient);

        try
        {
            await _context.SaveChangesAsync();
            return NoContent(); // 204
        }
        catch (DbUpdateException ex)
        {
            // Log the actual error here
            return StatusCode(500, "Database update failed");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePatient(Guid id)
    {
        var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Id == id && p.UserId == CurrentUserId);
        if (patient == null) return NotFound();

        _context.Patients.Remove(patient);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static PatientResponseDto MapToResponseDto(Patient p)
    {
        var initialMeasurement = p.Measurements.FirstOrDefault(m => m.IsInitial);
        var lastDietDate = p.Diets != null && p.Diets.Any()
            ? p.Diets.Max(d => d.CreatedAt) // Usamos solo CreatedAt
            : (DateTime?)null;


        return new PatientResponseDto
        {
            Id = p.Id,
            FirstName = p.FirstName,
            LastName = p.LastName,
            BirthDate = p.BirthDate,
            Gender = p.Gender,
            Occupation = p.Occupation,
            ConsultationReason = p.ConsultationReason,
            Status = p.Status,
            AvatarUrl = p.AvatarUrl,
            LastDietUpdate = lastDietDate,
            InitialMeasurement = initialMeasurement == null ? null : new MeasurementDto
            {
                Weight = initialMeasurement.Weight,
                Height = initialMeasurement.Height,
                Date = initialMeasurement.Date,
            },
            MedicalHistory = p.MedicalHistory == null ? null : new MedicalHistoryDto
            {
                ChronicDiseases = new MedicalRecordDto(p.MedicalHistory.ChronicDiseasesHasCondition, p.MedicalHistory.ChronicDiseasesObservation ?? string.Empty),
                PreviousSurgeries = new MedicalRecordDto(p.MedicalHistory.PreviousSurgeriesHasCondition, p.MedicalHistory.PreviousSurgeriesObservation ?? string.Empty),
                Allergies = new MedicalRecordDto(p.MedicalHistory.AllergiesHasCondition, p.MedicalHistory.AllergiesObservation ?? string.Empty),
                Medications = new MedicalRecordDto(p.MedicalHistory.MedicationsHasCondition, p.MedicalHistory.MedicationsObservation ?? string.Empty),
                Smokes = new MedicalRecordDto(p.MedicalHistory.SmokesHasCondition, p.MedicalHistory.SmokesObservation ?? string.Empty),
                DrinksAlcohol = new MedicalRecordDto(p.MedicalHistory.DrinksAlcoholHasCondition, p.MedicalHistory.DrinksAlcoholObservation ?? string.Empty),
            }
        };
    }
}