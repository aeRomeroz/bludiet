import { Router } from 'express';
import { getPatients, createPatient, deletePatient } from '../controllers/patientController';

const router = Router();

router.get('/', getPatients);
router.post('/', createPatient);
router.delete('/:id', deletePatient);

export default router;