import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getPatients = async (req: Request, res: Response) => {
    try {
        const patients = await prisma.patient.findMany({
            include: {
                measurements: { where: { isInitial: true } },
                medicalHistory: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener pacientes' });
    }
};

export const createPatient = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, birthDate, gender, occupation, consultationReason, status, avatarUrl, initialMeasurement, medicalHistory } = req.body;

        const patient = await prisma.patient.create({
            data: {
                firstName,
                lastName,
                birthDate: new Date(birthDate),
                gender,
                occupation,
                consultationReason,
                status,
                avatarUrl,
                ...(initialMeasurement ? {
                    measurements: {
                        create: {
                            weight: initialMeasurement.weight,
                            height: initialMeasurement.height,
                            date: new Date(initialMeasurement.date),
                            isInitial: true,
                        }
                    }
                } : {}),
                ...(medicalHistory ? {
                    medicalHistory: {
                        create: {
                            chronicDiseasesHasCondition: medicalHistory.chronicDiseases.hasCondition,
                            chronicDiseasesObservation: medicalHistory.chronicDiseases.observation,
                            previousSurgeriesHasCondition: medicalHistory.previousSurgeries.hasCondition,
                            previousSurgeriesObservation: medicalHistory.previousSurgeries.observation,
                            allergiesHasCondition: medicalHistory.allergies.hasCondition,
                            allergiesObservation: medicalHistory.allergies.observation,
                            medicationsHasCondition: medicalHistory.medications.hasCondition,
                            medicationsObservation: medicalHistory.medications.observation,
                            smokesHasCondition: medicalHistory.smokes.hasCondition,
                            smokesObservation: medicalHistory.smokes.observation,
                            drinksAlcoholHasCondition: medicalHistory.drinksAlcohol.hasCondition,
                            drinksAlcoholObservation: medicalHistory.drinksAlcohol.observation,
                        }
                    }
                } : {}),
            },
            include: {
                measurements: true,
                medicalHistory: true,
            }
        });

        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear paciente' });
    }
};

export const deletePatient = async (req: Request, res: Response) => {
    try {
        await prisma.patient.delete({ where: { id: req.params.id as string } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar paciente' });
    }
};