import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import { usePatients } from "../context/PatientsContext";
import { useDiets } from "../context/DietsContext";
import Button from "../components/ui/Button";
import PatientInfoCard from "../components/dashboard/patients/PatientInfoCard";
import PatientDietsTab from "../components/dashboard/patients/PatientDietsTab";
import DietSetupModal from "../components/dashboard/diets/DietSetupModal";
import { buildDietFromSetup } from "../utils/diets/dietMath";
import type { Diet, DietSetupData } from "../types/diet";
import EditPatientInfoCard from "../components/dashboard/patients/EditPatientInfoCard";
import type { Patient } from "../types/patients";
import { useAppNavigation } from "../hooks/useAppNavigation";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/ui/ConfirmationModal";

type Tab = 'dietas';

const TABS: { id: Tab; label: string }[] = [
    { id: 'dietas', label: 'Dietas' },
];

export default function PatientDetail() {
    const { patientId } = useParams();
    const { goToDietForm } = useAppNavigation();
    const navigate = useNavigate();
    const { patients, updatePatient } = usePatients();
    const { diets, addDiet, deleteDiet } = useDiets();

    // --- HOOKS ---
    const [activeTab, setActiveTab] = useState<Tab>('dietas');
    const [dietToDelete, setDietToDelete] = useState< string | null >(null);
    const [isDietModalOpen, setIsDietModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const patient = patients.find(p => p.id === patientId);
    const patientDiets = diets.filter(d => d.patientId === patientId);

    const handleCreateDiet = async (setup: DietSetupData) => {
        try {
            const dietId = crypto.randomUUID();
            // buildDietFromSetup es tu lógica de cálculos que ya tienes
            const newDiet = buildDietFromSetup(setup, dietId);

            // Asignamos el ID del paciente actual
            newDiet.patientId = patientId!;

            // 1. Guardamos en la BDD a través del contexto
            await addDiet(newDiet);

            // 2. Si el paciente estaba PENDING, lo pasamos a ACTIVE
            if (patient && patient.status !== 'ACTIVE') {
                await updatePatient(patientId!, { ...patient, status: 'ACTIVE' });
            }

            // 3. Cerramos modal y navegamos a la edición de la dieta
            setIsDietModalOpen(false);
            goToDietForm(dietId, patientId);

        } catch (error) {
            alert("Error al crear la dieta en el servidor.");
        }
    };

    const handleDeleteDiet = async () => {
        if (!dietToDelete) return;
        try {
            await deleteDiet(dietToDelete)
            toast.success("Dieta eliminada correctamente")
        } catch (error) {
            toast.error("No se pudo eliminar la dieta")
        }
    }

    const handleSave = async () => {
        if (!patient || isSaving) return;
        setIsSaving(true);
        const form = document.getElementById('edit-patient-form') as HTMLFormElement;
        const formData = new FormData(form);

        const medicalHistory = { ...patient.medicalHistory };
        const dynamicHistoryKeys = Object.keys(medicalHistory) as (keyof typeof medicalHistory)[];

        dynamicHistoryKeys.forEach(key => {
            const hasConditionValue = formData.get(`${key}.hasCondition`);
            const observationValue = formData.get(`${key}.observation`);

            medicalHistory[key] = {
                hasCondition: hasConditionValue === 'on',
                observation: observationValue as string || ""
            };

        });

        const updatedPatient: any = {
            ...patient,
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            occupation: formData.get('occupation'),
            birthDate: formData.get('birthDate'),
            gender: formData.get('gender'),
            status: patientDiets.length > 0 ? 'ACTIVE' : 'PENDING',
            consultationReason: formData.get('consultationReason'),
            medicalHistory: medicalHistory
        };

        console.log("Paciente listo para API:", updatedPatient);
        try {
            await updatePatient(patient.id, updatedPatient);
            setIsEditing(false);
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("No se pudieron guardar los cambios. Revisa la consola.");
        } finally {
            setIsSaving(false);
        }
    };

    if (!patient) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-gray-secondary">Paciente no encontrado.</p>
                <Button variant="secondary" onClick={() => navigate('/patients')}>
                    Volver a pacientes
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/patients')}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5 text-gray-primary" />
                    </button>
                    <div>
                        <h1 className="text-black-primary font-serif text-4xl font-bold">
                            {patient.firstName} {patient.lastName}
                        </h1>
                        <span className="text-gray-primary text-sm">{patient.occupation}</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    {isEditing ? (
                        <>
                            <Button variant="secondary" onClick={() => setIsEditing(false)}>
                                Cancelar
                            </Button>
                            <Button
                                variant="primary"
                                className="bg-green-600 hover:bg-green-brand/40"
                                onClick={handleSave} // <--- Llamamos directamente a la función
                            >
                                Guardar Cambios
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="primary"
                            className="flex items-center gap-3"
                            onClick={() => setIsEditing(true)}
                        >
                            <PencilIcon className="text-green-brand h-5 w-5" />
                            Editar Perfil
                        </Button>
                    )}
                </div>
            </div>

            {isEditing ? (
                <EditPatientInfoCard patient={patient} />
            ) : (
                <PatientInfoCard patient={patient} />
            )}

            {/* Tabs */}
            <div className="flex flex-col gap-4">
                <div className="flex gap-1 border-b border-primary-30">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px
                                ${activeTab === tab.id
                                    ? 'text-blue-brand border-blue-brand'
                                    : 'text-gray-secondary border-transparent hover:text-black-primary'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'dietas' && (
                    <PatientDietsTab
                        patientId={patient.id}
                        diets={patientDiets}
                        onCreateDiet={() => setIsDietModalOpen(true)}
                        onDeleteDiet={(id) => setDietToDelete(id)}
                    />
                )}
            </div>

            <DietSetupModal
                isOpen={isDietModalOpen}
                onClose={() => setIsDietModalOpen(false)}
                patients={patients}
                onDietCreate={handleCreateDiet}
                initialPatientId={patient.id}
                initialStep={2}
            />

            <ConfirmationModal 
                isOpen={!!dietToDelete}
                onClose={() => setDietToDelete(null)}
                onConfirm={handleDeleteDiet}
                title="Eliminar Dieta"
                message="¿Estas seguro que deseas eliminar esta dieta? Se perderán todos los datos y registros asociados a ella."
                confirmText="Eliminar"
            />
        </div>
    );
}