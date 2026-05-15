import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Button from "../components/ui/Button";
import PatientsTable from "../components/dashboard/patients/PatientsTable";
import PatientsToolbar from "../components/dashboard/patients/PatientsToolbar";
import PatientCreateModal from "../components/dashboard/patients/PatientCreateModal";
import DietSetupModal from "../components/dashboard/diets/DietSetupModal";
import { usePatients } from "../context/PatientsContext";
import { useDiets } from "../context/DietsContext";
import { useAppNavigation } from "../hooks/useAppNavigation";
import type { Patient, Status } from "../types/patients";
import type { CreateDietRequest } from "../types/diet";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/ui/ConfirmationModal";

export default function PatientsList() {
    const { patients, addPatient, deletePatient } = usePatients();
    const { addDiet } = useDiets();
    const { goToDietForm } = useAppNavigation();

    const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState<string | null>();
    const [isDietModalOpen, setIsDietModalOpen] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState<string | undefined>(undefined);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<Status | 'ALL'>('ALL');

    const filteredPatients = patients.filter((p) => {
        const patientTerms = `${p.firstName} ${p.lastName}`.toLowerCase()

        const searchTerms = search.toLowerCase().trim().split(/\s+/);
        
        const matchesSearch = searchTerms.every(word => patientTerms.includes(word));

        const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleAddPatient = (newPatient: Patient) => {
        addPatient(newPatient);
    };

    const handleDeletePatient = async () => {
        if (patientToDelete){
            try {
                deletePatient(patientToDelete);
                setPatientToDelete(null)
                toast.success("Paciente eliminado correctamente")
            } catch (error){
                toast.error("Error al eliminar el paciente")
                console.error("Error al eliminar el paciente.")
            }
        }
    };

    const handleCreateDietForPatient = (patient: Patient) => {
        setSelectedPatientId(patient.id);
        setIsDietModalOpen(true);
    };

    const handleCreateDiet = async (payload: CreateDietRequest) => {
        try {
            const createdDiet = await addDiet(payload);
            goToDietForm(createdDiet.id, payload.patientId);
        } catch (error) {
            toast.error("Error al crear la dieta. Por favor, inténtalo de nuevo.");
            throw error; // Re-lanzamos para que el modal sepa que falló
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-black-primary font-serif text-4xl font-bold">Pacientes</h1>
                    <span className="text-gray-primary">Gestiona y consulta el listado completo de tus pacientes</span>
                </div>
                <Button
                    variant="primary"
                    className="flex items-center gap-3"
                    onClick={() => setIsPatientModalOpen(true)}
                >
                    <PlusIcon className="text-green-brand h-5 w-5" />
                    Paciente
                </Button>
            </div>

            <PatientsToolbar
                search={search}
                onSearchChange={setSearch}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
            />

            <PatientsTable
                patients={filteredPatients}
                onEdit={(patient) => console.log('Editar:', patient)}
                onDelete={(patient) => setPatientToDelete(patient.id)}
                onCreateDiet={handleCreateDietForPatient}
            />

            <PatientCreateModal
                isOpen={isPatientModalOpen}
                onClose={() => setIsPatientModalOpen(false)}
                onPatientCreate={handleAddPatient}
            />

            <ConfirmationModal
                isOpen={!!patientToDelete}
                onClose={() => setPatientToDelete(null)}
                onConfirm={handleDeletePatient}
                title="Eliminar Paciente"
                message={`¿Estás seguro de que deseas eliminar a este paciente? Todos sus datos y dietas asociadas se borrarán permanentemente.`}
                confirmText="Eliminar"    
            />

            <DietSetupModal
                isOpen={isDietModalOpen}
                onClose={() => {
                    setIsDietModalOpen(false);
                    setSelectedPatientId(undefined);
                }}
                patients={patients}
                onDietCreate={handleCreateDiet}
                initialPatientId={selectedPatientId}
                initialStep={2}
            />
        </div>
    );
}