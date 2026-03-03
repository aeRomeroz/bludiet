import { MagnifyingGlassIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import type { Status } from "../../../types/patients";
import { PATIENT_STATUS } from "../../../types/patients";
import Button from "../../ui/Button";

interface PatientsToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    statusFilter: Status | 'ALL';
    onStatusFilterChange: (value: Status | 'ALL') => void;
}

const STATUS_FILTERS: { label: string; value: Status | 'ALL' }[] = [
    { label: 'Todos', value: 'ALL' },
    { label: PATIENT_STATUS.ACTIVE, value: 'ACTIVE' },
    { label: PATIENT_STATUS.PENDING, value: 'PENDING' },
    { label: PATIENT_STATUS.REVIEW, value: 'REVIEW' },
];

export default function PatientsToolbar({
    search,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
}: PatientsToolbarProps) {
    return (
        <div className="flex items-center gap-3 flex-wrap">
            {/* Buscador */}
            <div className="relative group flex-1 min-w-[200px]">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-brand transition-colors" />
                <input
                    type="text"
                    placeholder="Buscar por nombre o apellido..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-primary-30 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-brand/20 focus:border-blue-brand/40 transition-all"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {/* Filtros de estado */}
            <div className="flex items-center gap-1 bg-white border border-primary-30 rounded-xl p-1">
                {STATUS_FILTERS.map((filter) => (
                    <button
                        key={filter.value}
                        onClick={() => onStatusFilterChange(filter.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            statusFilter === filter.value
                                ? 'bg-blue-brand text-white shadow-sm'
                                : 'text-gray-primary hover:bg-gray-50'
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Exportar */}
            <Button
                variant="primary"
                className="flex items-center gap-2 shrink-0"
                onClick={() => console.log('Exportar')}
            >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Exportar
            </Button>
        </div>
    );
}