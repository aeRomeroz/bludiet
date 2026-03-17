import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { EllipsisHorizontalIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Patient, Status } from "../../../types/patients";
import { PATIENT_STATUS } from "../../../types/patients";

interface PatientsTableProps {
    patients: Patient[];
    onEdit?: (patient: Patient) => void;
    onDelete?: (patient: Patient) => void;
    onCreateDiet?: (patient: Patient) => void;
}

const PAGE_SIZE = 10;

const statusStyles: Record<Status, string> = {
    ACTIVE: 'bg-green-active/30 text-green-active',
    PENDING: 'bg-yellow-warning/30 text-yellow-warning',
    REVIEW: 'bg-blue-100 text-blue-700',
};

const headers = ['Paciente', 'Edad', 'Motivo de Consulta', 'Estado', 'Última Acción'];

function calculateAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
}

export default function PatientsTable({ patients, onEdit, onDelete, onCreateDiet }: PatientsTableProps) {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const totalPages = Math.ceil(patients.length / PAGE_SIZE);
    const paginated = patients.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white border-[0.5px] border-primary-30 rounded-lg overflow-hidden w-full">
                <Table.Root variant="ghost" className="w-full">
                    <Table.Header>
                        <Table.Row className="bg-gray-secondary/30">
                            {headers.map((header) => (
                                <Table.ColumnHeaderCell key={header} className="p-0">
                                    <div className="text-gray-primary font-medium uppercase tracking-wider py-4 px-6 text-xs">
                                        {header}
                                    </div>
                                </Table.ColumnHeaderCell>
                            ))}
                            <Table.ColumnHeaderCell className="w-10" />
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {paginated.map((patient) => (
                            <Table.Row
                                key={patient.id}
                                className="hover:bg-gray-50 transition-colors cursor-pointer justify-center align-middle"
                                onClick={() => navigate(`/patients/${patient.id}`)}
                            >
                                <Table.Cell className="p-0 align-middle justify-center">
                                    <div className="py-3 px-6 font-medium text-black-primary flex items-center gap-3">
                                        {patient.avatarUrl ? (
                                            <img src={patient.avatarUrl} className="w-8 h-8 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-blue-brand/20 flex items-center justify-center text-blue-brand text-xs font-bold">
                                                {patient.firstName[0]}{patient.lastName[0]}
                                            </div>
                                        )}
                                        {patient.firstName} {patient.lastName}
                                    </div>
                                </Table.Cell>

                                <Table.Cell className="p-0 align-middle justify-center">
                                    <div className="py-3 px-6 text-black-primary text-sm">
                                        {calculateAge(patient.birthDate)} años
                                    </div>
                                </Table.Cell>

                                <Table.Cell className="p-0 max-w-[220px] align-middle">
                                    <div className="py-3 px-6 text-black-primary truncate text-sm">
                                        {patient.consultationReason}
                                    </div>
                                </Table.Cell>

                                <Table.Cell className="p-0 align-middle">
                                    <div className="py-3 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${statusStyles[patient.status]}`}>
                                            {PATIENT_STATUS[patient.status]}
                                        </span>
                                    </div>
                                </Table.Cell>

                                <Table.Cell className="p-0 align-middle">
                                    <div className="py-3 px-6 text-gray-secondary text-sm">
                                        —
                                    </div>
                                </Table.Cell>

                                {/* Menú 3 puntos */}
                                <Table.Cell className="p-0 align-middle" onClick={(e) => e.stopPropagation()}>
                                    <div className="py-3 px-6 flex justify-center">
                                        <DropdownMenu.Root>
                                            <DropdownMenu.Trigger asChild>
                                                <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors outline-none">
                                                    <EllipsisHorizontalIcon className="w-5 h-5 text-gray-primary" />
                                                </button>
                                            </DropdownMenu.Trigger>

                                            <DropdownMenu.Portal>
                                                <DropdownMenu.Content
                                                    align="end"
                                                    sideOffset={4}
                                                    className="bg-white rounded-xl shadow-lg border border-primary-30 p-1 min-w-[180px] z-50 animate-in fade-in zoom-in-95 duration-150"
                                                >
                                                    <DropdownMenu.Item
                                                        className="flex items-center gap-2 px-3 py-2 text-sm text-black-primary rounded-lg hover:bg-gray-50 cursor-pointer outline-none"
                                                        onSelect={() => onEdit?.(patient)}
                                                    >
                                                        Editar Paciente
                                                    </DropdownMenu.Item>

                                                    <DropdownMenu.Item
                                                        className="flex items-center gap-2 px-3 py-2 text-sm text-black-primary rounded-lg hover:bg-gray-50 cursor-pointer outline-none"
                                                        onSelect={() => onCreateDiet?.(patient)}
                                                    >
                                                        Crear Dieta
                                                    </DropdownMenu.Item>

                                                    <DropdownMenu.Separator className="my-1 border-t border-primary-30" />

                                                    <DropdownMenu.Item
                                                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 cursor-pointer outline-none"
                                                        onSelect={() => onDelete?.(patient)}
                                                    >
                                                        Eliminar Paciente
                                                    </DropdownMenu.Item>
                                                </DropdownMenu.Content>
                                            </DropdownMenu.Portal>
                                        </DropdownMenu.Root>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-between px-1">
                <p className="text-xs text-gray-secondary">
                    Mostrando {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, patients.length)} de {patients.length} pacientes
                </p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPage(p => p - 1)}
                        disabled={page === 1}
                        className="p-1.5 rounded-lg border border-primary-30 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeftIcon className="w-4 h-4 text-gray-primary" />
                    </button>
                    <span className="text-xs font-medium text-gray-primary">
                        {page} / {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={page === totalPages}
                        className="p-1.5 rounded-lg border border-primary-30 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRightIcon className="w-4 h-4 text-gray-primary" />
                    </button>
                </div>
            </div>
        </div>
    );
}