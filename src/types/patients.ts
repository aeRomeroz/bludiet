export const PATIENT_STATUS = {
  ACTIVE: 'Activo',
  PENDING: 'Pendiente',
  REVIEW: 'Revisión'
} as const;

export type Status = typeof PATIENT_STATUS[keyof typeof PATIENT_STATUS];
