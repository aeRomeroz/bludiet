import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import type { Diet } from "../../../../types/diet";
import DietDayColumn from "./DietDayColumn";

interface DietGridProps {
    diet: Diet;
    onAddItem?: (dayId: string, mealId: string) => void;
    onRemoveItem?: (dayId: string, mealId: string, itemId: string) => void;
}

const DAYS_PER_PAGE = 7;

export default function DietGrid({ diet, onAddItem, onRemoveItem }: DietGridProps) {
    const [weekOffset, setWeekOffset] = useState(0);

    const mealNames = diet.days[0]?.meals.map(m => m.name) ?? [];
    const totalWeeks = Math.ceil(diet.days.length / DAYS_PER_PAGE);
    const visibleDays = diet.days.slice(
        weekOffset * DAYS_PER_PAGE,
        (weekOffset + 1) * DAYS_PER_PAGE
    );

    return (
        <div className="flex flex-col gap-4">
            {/* Navegación de semanas */}
            <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-secondary uppercase tracking-wider">
                    Semana {weekOffset + 1} de {totalWeeks}
                </p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setWeekOffset(w => w - 1)}
                        disabled={weekOffset === 0}
                        className="p-1.5 rounded-lg border border-primary-30 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeftIcon className="w-4 h-4 text-gray-primary" />
                    </button>
                    <button
                        onClick={() => setWeekOffset(w => w + 1)}
                        disabled={weekOffset === totalWeeks - 1}
                        className="p-1.5 rounded-lg border border-primary-30 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRightIcon className="w-4 h-4 text-gray-primary" />
                    </button>
                </div>
            </div>

            {/* Cuadrícula */}
            <div className="flex gap-3 overflow-x-auto pb-2">
                {/* Columna de ingestas fija */}
                <div className="flex flex-col gap-3 min-w-[110px] shrink-0">
                    {/* Espacio para alinear con el header de día */}
                    <div className="h-[40px]" />
                    {mealNames.map((mealName) => (
                        <div
                            key={mealName}
                            className="flex items-center min-h-[80px] px-2"
                        >
                            <p className="text-xs font-bold text-gray-primary uppercase tracking-wider">
                                {mealName}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Columnas de días */}
                {visibleDays.map((day) => (
                    <DietDayColumn
                        key={day.id}
                        day={day}
                        mealNames={mealNames}
                        onAddItem={onAddItem}
                        onRemoveItem={onRemoveItem}
                    />
                ))}
            </div>
        </div>
    );
}
