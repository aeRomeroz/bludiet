import { apiClient } from '../lib/apiClient';
import { apiRoutes } from './apiRoutes';
import type { Patient } from '../types/patients';

export const patientService = {
  async getAll(): Promise<Patient[]> {
    const { data } = await apiClient.get(apiRoutes.patients.index);
    return data.map(mapToPatient);
  },

  async create(patient: Omit<Patient, 'id'>): Promise<Patient> {
    const { data } = await apiClient.post(apiRoutes.patients.index, mapToDto(patient));
    return mapToPatient(data);
  },

  async update(id: string, patient: Partial<Patient>): Promise<Patient> {
    const { data } = await apiClient.put(apiRoutes.patients.update(id), mapToDto(patient));
    return mapToPatient(data);
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(apiRoutes.patients.delete(id));
  },
};

function mapToPatient(row: any): Patient {
  return {
    ...row, // Mantenemos campos planos (id, names, dates)
    initialMeasurement: row.initialMeasurement ? {
      date: row.initialMeasurement.date,
      weight: row.initialMeasurement.weight,
      height: row.initialMeasurement.height,
    } : undefined,
    // El historial se mapea dinámicamente si existe
    medicalHistory: row.medicalHistory ? mapMedicalHistory(row.medicalHistory) : undefined
  };
}

function mapToDto(patient: Partial<Patient>) {
  return {
    firstName: patient.firstName,
    lastName: patient.lastName,
    birthDate: patient.birthDate,
    gender: patient.gender,
    occupation: patient.occupation,
    consultationReason: patient.consultationReason,
    status: patient.status,
    avatarUrl: patient.avatarUrl,
    initialMeasurement: patient.initialMeasurement || null,
    medicalHistory: patient.medicalHistory ? mapMedicalHistory(patient.medicalHistory) : null,
  };
}

function mapMedicalHistory(mh: any) {
  const result: any = {};
  Object.keys(mh).forEach(key => {
    result[key] = {
      hasCondition: mh[key].hasCondition,
      observation: mh[key].observation || ""
    };
  });
  return result;
}