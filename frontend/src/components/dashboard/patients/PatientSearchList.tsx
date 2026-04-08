import { useState } from "react";
import { 
    MagnifyingGlassIcon, 
    ArrowRightIcon, 
    UserPlusIcon 
} from "@heroicons/react/24/outline";
import { type Patient } from "../../../types/patients";
import { PatientSelectionCard } from "./PatientSelectionCard";

interface PatientSearchListProps {
    patients: Patient[];
    selectedId: string;
    onSelect: (id: string) => void;
}

export function PatientSearchList({ patients, selectedId, onSelect }: PatientSearchListProps) {
    const [searchTerm, setSearchTerm] = useState("");

    // Lógica de filtrado: buscamos por nombre completo
    const filteredPatients = patients.filter((p) =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Limitamos la vista inicial a 5 para no saturar el Modal
    const displayedPatients = filteredPatients.slice(0, 5);

    return (
        <div className="flex flex-col gap-4">
            {/* 1. Buscador */}
            <div className="relative group">
                <MagnifyingGlassIcon 
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-brand transition-colors" 
                />
                <input 
                    type="text"
                    placeholder="Buscar paciente por nombre o apellido, email, ID..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-primary-30 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-brand/20 focus:bg-white focus:border-blue-brand/40 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* 2. Lista de Pacientes Filtrados */}
            <div className="flex flex-col gap-2 min-h-[320px]">
                {displayedPatients.length > 0 ? (
                    displayedPatients.map((p) => (
                        <PatientSelectionCard 
                            key={p.id}
                            patient={p}
                            isSelected={selectedId === p.id}
                            onSelect={onSelect}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
                        <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                            <UserPlusIcon className="w-6 h-6 text-gray-300" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 text-center">
                            {searchTerm 
                                ? `No hay resultados para "${searchTerm}"` 
                                : "No hay pacientes registrados"}
                        </p>
                    </div>
                )}
            </div>

            {/* 3. Footer de la lista: Acción para ir al listado completo */}
            <div className="pt-2 border-t border-gray-100 flex justify-center">
                <a 
                    href="/patients" 
                    className="group flex items-center gap-2 text-xs font-bold text-blue-brand hover:text-blue-700 transition-colors uppercase tracking-widest"
                >
                    Gestionar todos los pacientes
                    <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </div>
    );
}