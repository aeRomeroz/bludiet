import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Button from "../components/ui/Button";
import PatientsTable from "../components/dashboard/patients/PatientsTable";
import PatientsToolbar from "../components/dashboard/patients/PatientsToolbar";
import PatientCreateModal from "../components/dashboard/patients/PatientCreateModal";
import { usePatients } from "../context/PatientsContext";
import type { Patient, Status } from "../types/patients";

export default function PatientsList() {
    console.log('PatientsList montado');
    const { patients, addPatient } = usePatients();
    const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<Status | 'ALL'>('ALL');

    const filteredPatients = patients.filter((p) => {
        const matchesSearch = `${p.firstName} ${p.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleAddPatient = (newPatient: Patient) => {
        addPatient(newPatient);
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
                onDelete={(patient) => console.log('Eliminar:', patient)}
                onCreateDiet={(patient) => console.log('Crear dieta:', patient)}
            />

            <PatientCreateModal
                isOpen={isPatientModalOpen}
                onClose={() => setIsPatientModalOpen(false)}
                onPatientCreate={handleAddPatient}
            />
        </div>
    );
}