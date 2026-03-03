import { type Patient, PATIENT_STATUS } from "../../../types/patients";
import { calculateAge } from "../../../utils/patients/patientCalculations";
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export function PatientSelectionCard({ 
    patient, 
    isSelected, 
    onSelect 
}: { 
    patient: Patient, 
    isSelected: boolean, 
    onSelect: (id: string) => void 
}) {
    const age = calculateAge(patient.birthDate);
    const statusLabel = PATIENT_STATUS[patient.status];

    // Colores dinámicos según el estado - ******CENTRALIZAR ESTILOS*******
    const statusStyles = {
        ACTIVE: 'bg-green-100 text-green-700',
        PENDING: 'bg-amber-100 text-amber-700',
        REVIEW: 'bg-blue-100 text-blue-700'
    };

    const initials = `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`;

    return (
        <button
            type="button"
            onClick={() => onSelect(patient.id)}
            className={`w-full flex items-center justify-between py-2 px-3 rounded-xl transition-all duration-200 group ${
                isSelected 
                ? 'bg-blue-brand/10 shadow-sm ring-1 ring-blue-brand/50' 
                : 'border border-gray-secondary/5 hover:border-gray-secondary/30 hover:bg-gray-50'
            }`}
        >
            <div className="flex items-center gap-4 text-left">
                <div className="relative shrink-0">
                    {patient.avatarUrl ? (
                        <img 
                            src={patient.avatarUrl} 
                            alt={patient.firstName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-md shadow-xs">
                            {initials}
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-start">
                    <span className="font-semibold text-black-primary">
                        {patient.firstName} {patient.lastName}
                    </span>
                    
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-primary tracking-tight">
                        <span className="rounded">
                            {patient.gender === 'Male' ? 'Hombre' : 'Mujer'}, {age} años - ID: {patient.id}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Badge de Estado */}
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${statusStyles[patient.status]}`}>
                    {statusLabel}
                </span>

                {/* Indicador de selección*/}
                <Checkbox.Root
                    checked={isSelected}
                    className="flex h-5 w-5 items-center justify-center rounded-full outline-none"
                >
                    <Checkbox.Indicator className="animate-in zoom-in fade-in duration-300">
                        <CheckCircleIcon className="h-5 w-5 text-blue-brand" />
                    </Checkbox.Indicator>
                    
                </Checkbox.Root>
            </div>
        </button>
    );
}