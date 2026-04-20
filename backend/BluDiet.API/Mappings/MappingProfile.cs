using AutoMapper;
using BluDiet.API.Models;
using BluDiet.API.DTOs;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // 1. Mapeo de Paciente
        CreateMap<UpdatePatientDto, Patient>()
            .ForMember(dest => dest.Id, opt => opt.Ignore()) // El ID nunca se cambia
            .ForMember(dest => dest.CreatedAt, opt => opt.Ignore()) // Mantener fecha de creación
            .ForMember(dest => dest.BirthDate, opt => opt.MapFrom(src => 
                string.IsNullOrEmpty(src.BirthDate) ? DateOnly.MinValue : DateOnly.Parse(src.BirthDate)))
            .ForPath(dest => dest.MedicalHistory, opt => opt.MapFrom(src => src.MedicalHistory));

        // 2. Mapeo del Historial Médico (Dinamismo para las condiciones)
        CreateMap<MedicalHistoryDto, MedicalHistory>()
            .ForMember(dest => dest.PatientId, opt => opt.Ignore())
            .ForMember(dest => dest.Patient, opt => opt.Ignore())
            // Aquí mapeamos las propiedades de los registros médicos
            .AfterMap((src, dest) => {
                dest.ChronicDiseasesHasCondition = src.ChronicDiseases.HasCondition;
                dest.ChronicDiseasesObservation = src.ChronicDiseases.Observation;
                dest.PreviousSurgeriesHasCondition = src.PreviousSurgeries.HasCondition;
                dest.PreviousSurgeriesObservation = src.PreviousSurgeries.Observation;
                dest.AllergiesHasCondition = src.Allergies.HasCondition;
                dest.AllergiesObservation = src.Allergies.Observation;
                dest.MedicationsHasCondition = src.Medications.HasCondition;
                dest.MedicationsObservation = src.Medications.Observation;
                dest.SmokesHasCondition = src.Smokes.HasCondition;
                dest.SmokesObservation = src.Smokes.Observation;
                dest.DrinksAlcoholHasCondition = src.DrinksAlcohol.HasCondition;
                dest.DrinksAlcoholObservation = src.DrinksAlcohol.Observation;
            });
    }
}