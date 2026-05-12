import { useState } from "react";
import type { Diet, SetupMacros } from "../../../../types/diet";
import MacroPieChart from "./MacroPieChart";
import { PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../../../ui/Button";

interface DietSidebarProps {
    diet: Diet;
    onEditClick: () => void;
}

export default function DietSidebar({ diet, onEditClick }: DietSidebarProps) {

    return (
        <div className="flex flex-col gap-6 w-[260px] shrink-0">
            <div className="bg-white rounded-xl border border-primary-30 p-4 flex flex-col gap-4">
                <div className="flex justify-end">
                    <Button
                        className="flex items-center justify-center bg-blue-brand w-9 h-9 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 p-0"
                        onClick={onEditClick}
                    >
                        <PencilIcon className="text-white w-3 h-3 shrink-0" />
                    </Button>
                </div>
                <p className="text-xs font-bold text-gray-primary uppercase tracking-wider text-center">
                    Distribución Objetivo
                </p>
                <MacroPieChart targetKcal={diet.targetKcalPerDay} targetMacros={diet.targetMacros} showLegend={true} size="md" />
            </div>

            <div className="bg-white rounded-xl border border-primary-30 p-4 text-center">
                <p className="text-xs font-bold text-gray-primary uppercase tracking-wider mb-1">Objetivo Calórico</p>
                <p className="text-3xl font-bold text-blue-brand">{diet.targetKcalPerDay}</p>
                <p className="text-xs text-gray-secondary">kcal / día</p>
            </div>
        </div>
    );
}