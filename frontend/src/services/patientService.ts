import { supabase } from '../lib/supabase';
import type { Patient } from '../types/patients';

export const patientService = {
    async getAll(): Promise<Patient[]> {
        const { data, error } = await supabase
            .from('patients')
            .select(`
                *,
                measurements (*),
                medical_history (*)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data.map(mapToPatient);
    },

    async create(patient: Omit<Patient, 'id'>): Promise<Patient> {
        const { initialMeasurement, medicalHistory, ...rest } = patient;

        // Insertar paciente
        const { data: patientData, error: patientError } = await supabase
            .from('patients')
            .insert({
                first_name: rest.firstName,
                last_name: rest.lastName,
                birth_date: rest.birthDate,
                gender: rest.gender,
                occupation: rest.occupation,
                consultation_reason: rest.consultationReason,
                status: rest.status,
                avatar_url: rest.avatarUrl,
            })
            .select()
            .single();

        if (patientError) throw patientError;

        // Insertar medición inicial si existe
        if (initialMeasurement) {
            const { error: measurementError } = await supabase
                .from('measurements')
                .insert({
                    patient_id: patientData.id,
                    weight: initialMeasurement.weight,
                    height: initialMeasurement.height,
                    date: initialMeasurement.date,
                    is_initial: true,
                });
            if (measurementError) throw measurementError;
        }

        // Insertar historial médico
        if (medicalHistory) {
            const { error: historyError } = await supabase
                .from('medical_history')
                .insert({
                    patient_id: patientData.id,
                    chronic_diseases_has_condition: medicalHistory.chronicDiseases.hasCondition,
                    chronic_diseases_observation: medicalHistory.chronicDiseases.observation,
                    previous_surgeries_has_condition: medicalHistory.previousSurgeries.hasCondition,
                    previous_surgeries_observation: medicalHistory.previousSurgeries.observation,
                    allergies_has_condition: medicalHistory.allergies.hasCondition,
                    allergies_observation: medicalHistory.allergies.observation,
                    medications_has_condition: medicalHistory.medications.hasCondition,
                    medications_observation: medicalHistory.medications.observation,
                    smokes_has_condition: medicalHistory.smokes.hasCondition,
                    smokes_observation: medicalHistory.smokes.observation,
                    drinks_alcohol_has_condition: medicalHistory.drinksAlcohol.hasCondition,
                    drinks_alcohol_observation: medicalHistory.drinksAlcohol.observation,
                });
            if (historyError) throw historyError;
        }

        return mapToPatient({ ...patientData, measurements: initialMeasurement ? [{ ...initialMeasurement, is_initial: true }] : [], medical_history: medicalHistory ? [medicalHistory] : [] });
    },

    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('patients')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },
};

function mapToPatient(row: any): Patient {
    const initialMeasurement = row.measurements?.find((m: any) => m.is_initial);
    const mh = row.medical_history?.[0];

    return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        birthDate: row.birth_date,
        gender: row.gender,
        occupation: row.occupation,
        consultationReason: row.consultation_reason,
        status: row.status,
        avatarUrl: row.avatar_url,
        ...(initialMeasurement ? {
            initialMeasurement: {
                date: initialMeasurement.date,
                weight: initialMeasurement.weight,
                height: initialMeasurement.height,
            }
        } : {}),
        ...(mh ? {
            medicalHistory: {
                chronicDiseases: { hasCondition: mh.chronic_diseases_has_condition, observation: mh.chronic_diseases_observation ?? '' },
                previousSurgeries: { hasCondition: mh.previous_surgeries_has_condition, observation: mh.previous_surgeries_observation ?? '' },
                allergies: { hasCondition: mh.allergies_has_condition, observation: mh.allergies_observation ?? '' },
                medications: { hasCondition: mh.medications_has_condition, observation: mh.medications_observation ?? '' },
                smokes: { hasCondition: mh.smokes_has_condition, observation: mh.smokes_observation ?? '' },
                drinksAlcohol: { hasCondition: mh.drinks_alcohol_has_condition, observation: mh.drinks_alcohol_observation ?? '' },
            }
        } : {}),
    };
}