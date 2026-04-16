import { apiClient } from '../lib/apiClient';
import { apiRoutes } from './apiRoutes';
import type { Patient } from '../types/patients';

export const patientService = {
  async getAll(): Promise<Patient[]> {
    const { data } = await apiClient.get(apiRoutes.patients.index);
    return data.map(mapToPatient);
  },

  async create(patient: Omit<Patient, 'id'>): Promise<Patient> {
    const { data } = await apiClient.post(apiRoutes.patients.index, mapToCreateDto(patient));
    return mapToPatient(data);
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(apiRoutes.patients.delete(id));
  },
};

function mapToPatient(row: any): Patient {
  const initialMeasurement = row.initialMeasurement;
  const mh = row.medicalHistory;

  return {
    id: row.id,
    firstName: row.firstName,
    lastName: row.lastName,
    birthDate: row.birthDate,
    gender: row.gender,
    occupation: row.occupation,
    consultationReason: row.consultationReason,
    status: row.status,
    avatarUrl: row.avatarUrl,
    ...(initialMeasurement ? {
      initialMeasurement: {
        date: initialMeasurement.date,
        weight: initialMeasurement.weight,
        height: initialMeasurement.height,
      },
    } : {}),
    ...(mh ? {
      medicalHistory: {
        chronicDiseases: {
          hasCondition: mh.chronicDiseases.hasCondition,
          observation: mh.chronicDiseases.observation,
        },
        previousSurgeries: {
          hasCondition: mh.previousSurgeries.hasCondition,
          observation: mh.previousSurgeries.observation,
        },
        allergies: {
          hasCondition: mh.allergies.hasCondition,
          observation: mh.allergies.observation,
        },
        medications: {
          hasCondition: mh.medications.hasCondition,
          observation: mh.medications.observation,
        },
        smokes: {
          hasCondition: mh.smokes.hasCondition,
          observation: mh.smokes.observation,
        },
        drinksAlcohol: {
          hasCondition: mh.drinksAlcohol.hasCondition,
          observation: mh.drinksAlcohol.observation,
        },
      },
    } : {}),
  };
}

function mapToCreateDto(patient: Omit<Patient, 'id'>) {
  return {
    firstName: patient.firstName,
    lastName: patient.lastName,
    birthDate: patient.birthDate,
    gender: patient.gender,
    occupation: patient.occupation,
    consultationReason: patient.consultationReason,
    status: patient.status,
    avatarUrl: patient.avatarUrl,
    initialMeasurement: patient.initialMeasurement ? {
      weight: patient.initialMeasurement.weight,
      height: patient.initialMeasurement.height,
      date: patient.initialMeasurement.date,
    } : null,
    medicalHistory: patient.medicalHistory ? {
      chronicDiseases: {
        hasCondition: patient.medicalHistory.chronicDiseases.hasCondition,
        observation: patient.medicalHistory.chronicDiseases.observation,
      },
      previousSurgeries: {
        hasCondition: patient.medicalHistory.previousSurgeries.hasCondition,
        observation: patient.medicalHistory.previousSurgeries.observation,
      },
      allergies: {
        hasCondition: patient.medicalHistory.allergies.hasCondition,
        observation: patient.medicalHistory.allergies.observation,
      },
      medications: {
        hasCondition: patient.medicalHistory.medications.hasCondition,
        observation: patient.medicalHistory.medications.observation,
      },
      smokes: {
        hasCondition: patient.medicalHistory.smokes.hasCondition,
        observation: patient.medicalHistory.smokes.observation,
      },
      drinksAlcohol: {
        hasCondition: patient.medicalHistory.drinksAlcohol.hasCondition,
        observation: patient.medicalHistory.drinksAlcohol.observation,
      },
    } : null,
  };
}
