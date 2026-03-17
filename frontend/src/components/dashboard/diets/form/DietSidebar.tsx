import type { SetupMacros } from "../../../../types/diet";
import MacroPieChart from "./MacroPieChart";

interface DietSidebarProps {
    targetKcal: number;
    targetMacros: SetupMacros;
}

export default function DietSidebar({ targetKcal, targetMacros }: DietSidebarProps) {
    return (
        <div className="flex flex-col gap-6 w-[260px] shrink-0">
            <div className="bg-white rounded-xl border border-primary-30 p-4 flex flex-col gap-4">
                <p className="text-xs font-bold text-gray-primary uppercase tracking-wider text-center">
                    Distribución Objetivo
                </p>
                <MacroPieChart targetKcal={targetKcal} targetMacros={targetMacros} showLegend={true} size="md" />
            </div>

            <div className="bg-white rounded-xl border border-primary-30 p-4 text-center">
                <p className="text-xs font-bold text-gray-primary uppercase tracking-wider mb-1">Objetivo Calórico</p>
                <p className="text-3xl font-bold text-blue-brand">{targetKcal}</p>
                <p className="text-xs text-gray-secondary">kcal / día</p>
            </div>
        </div>
    );
}