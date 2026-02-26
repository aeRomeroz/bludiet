import { useState } from "react"
import Modal from "../../ui/Modal"
import Button from "../../ui/Button"
import type { Patient, Gender, Status } from '../../../types/patients';
import toast from 'react-hot-toast';

interface PatientCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPatientCreate: (newPatient: Patient) => void;
}

export default function PatientCreateModal({ 
  isOpen, 
  onClose, 
  onPatientCreate 
}: PatientCreateModalProps) {
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: 'Male' as Gender,
        occupation: '',
        consultationReason: '',
        status: 'PENDING' as Status
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.consultationReason.length < 10) {
            toast.error('El motivo de consulta es demasiado corto. Detalla un poco más.');
            return; 
        }

        try {
            const newPatient: Patient = {
            ...formData,
            id: crypto.randomUUID(), // Genera un ID único temporal
            medicalHistory: {
                chronicDiseases: { hasCondition: false, observation: '' },
                previousSurgeries: { hasCondition: false, observation: '' },
                allergies: { hasCondition: false, observation: '' },
                medications: { hasCondition: false, observation: '' },
                smokes: { hasCondition: false, observation: '' },
                drinksAlcohol: { hasCondition: false, observation: '' },
            }
            };

            // 4. Llamamos a la función que viene por props
            onPatientCreate(newPatient);
            toast.success(`Paciente ${formData.firstName} ${formData.lastName} registrado con éxito`);
            onClose(); // Cerramos el modal
        } catch (error) {
            toast.error('Ocurrió un error al registrar el paciente. Inténtalo de nuevo.');
            console.error('Error al crear paciente:', error);
        }

        // Opcional: Limpiar el formulario
        setFormData({
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: 'Male',
        occupation: '',
        consultationReason: '',
        status: 'PENDING'
        });
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Registrar Nuevo Paciente"
            size="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Sección: Información Personal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-primary uppercase tracking-wider">Nombre</label>
                        <input 
                            required
                            type="text"
                            placeholder="Ej. Juan"
                            className="border-[0.5px] border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:border-blue-brand transition-colors"
                            value={formData.firstName}
                            onChange={e => setFormData({...formData, firstName: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-primary uppercase tracking-wider">Apellido</label>
                        <input 
                            required
                            type="text"
                            placeholder="Ej. Pérez"
                            className="border-[0.5px] border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:border-blue-brand transition-colors"
                            value={formData.lastName}
                            onChange={e => setFormData({...formData, lastName: e.target.value})}
                        />
                    </div>
                </div>

                {/* Sección: Datos Demográficos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-primary uppercase tracking-wider">Fecha de Nacimiento</label>
                        <input 
                            required
                            type="date"
                            className="border-[0.5px] border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:border-blue-brand transition-colors bg-white"
                            value={formData.birthDate}
                            onChange={e => setFormData({...formData, birthDate: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-primary uppercase tracking-wider">Sexo</label>
                        <select 
                            className="border-[0.5px] border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:border-blue-brand transition-colors bg-white cursor-pointer"
                            value={formData.gender}
                            onChange={e => setFormData({...formData, gender: e.target.value as Gender})}
                        >
                            <option value="Male">Masculino</option>
                            <option value="Female">Femenino</option>
                        </select>
                    </div>
                </div>

                {/* Sección: Profesional */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-primary uppercase tracking-wider">Ocupación</label>
                    <input 
                        type="text"
                        placeholder="Ej. Ingeniero, Estudiante, etc."
                        className="border-[0.5px] border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:border-blue-brand transition-colors"
                        value={formData.occupation}
                        onChange={e => setFormData({...formData, occupation: e.target.value})}
                    />
                </div>

                {/* Sección: Consulta */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-primary uppercase tracking-wider">Motivo de Consulta</label>
                    <textarea 
                        required
                        placeholder="Describe brevemente el motivo de la visita..."
                        className="border-[0.5px] border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:border-blue-brand transition-colors h-24 resize-none"
                        value={formData.consultationReason}
                        onChange={e => setFormData({...formData, consultationReason: e.target.value})}
                    />
                </div>

                {/* Botones de Acción */}
                <div className="flex gap-3 pt-4 border-t border-primary-10">
                    <Button 
                        type="button" 
                        variant="secondary" 
                        className="flex-1" 
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        type="submit"
                        className="flex-1 bg-blue-brand text-white hover:bg-blue-brand/90"
                    >
                        Guardar Paciente
                    </Button>
                </div>
            </form>
        </Modal>
    )
}