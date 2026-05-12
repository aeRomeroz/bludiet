import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Table } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Diet } from "../../../types/diet";

interface PatientDietsTabProps {
    patientId: string;
    diets: Diet[];
    onCreateDiet?: () => void;
}

const PAGE_SIZE = 5;
const headers = ['Nombre', 'Duración', 'Objetivo Kcal', 'Inicio'];

export default function PatientDietsTab({ patientId, diets, onCreateDiet }: PatientDietsTabProps) {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(diets.length / PAGE_SIZE));
    const paginated = diets.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    if (diets.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-48 gap-4 border-2 border-dashed border-primary-30 rounded-2xl">
                <p className="text-sm text-gray-secondary">Este paciente no tiene dietas aún.</p>
                {onCreateDiet && (
                    <button
                        onClick={onCreateDiet}
                        className="text-sm text-blue-brand hover:underline font-medium"
                    >
                        + Crear primera dieta
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white border-[0.5px] border-primary-30 rounded-lg overflow-hidden w-full">
                <Table.Root variant="ghost" className="w-full">
                    <Table.Header>
                        <Table.Row className="bg-gray-secondary/30">
                            {headers.map(header => (
                                <Table.ColumnHeaderCell key={header} className="p-0">
                                    <div className="text-gray-primary font-medium uppercase tracking-wider py-4 px-6 text-xs">
                                        {header}
                                    </div>
                                </Table.ColumnHeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {paginated.map(diet => (
                            <Table.Row
                                key={diet.id}
                                className="hover:bg-gray-50 transition-colors cursor-pointer"
                                onClick={() => navigate(`/patients/${patientId}/diets/${diet.id}`)}
                            >
                                <Table.Cell className="p-0">
                                    <div className="py-3 px-6 text-sm font-medium text-black-primary">
                                        {diet.name}
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="p-0">
                                    <div className="py-3 px-6 text-sm text-black-primary">
                                        {diet.durationDays} días
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="p-0">
                                    <div className="py-3 px-6 text-sm text-black-primary">
                                        {diet.targetKcalPerDay} kcal
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="p-0">
                                    <div className="py-3 px-6 text-sm text-gray-secondary">
                                        {new Date(diet.startDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
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
                    Mostrando {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, diets.length)} de {diets.length} dietas
                </p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPage(p => p - 1)}
                        disabled={page === 1}
                        className="p-1.5 rounded-lg border border-primary-30 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeftIcon className="w-4 h-4 text-gray-primary" />
                    </button>
                    <span className="text-xs font-medium text-gray-primary">{page} / {totalPages}</span>
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