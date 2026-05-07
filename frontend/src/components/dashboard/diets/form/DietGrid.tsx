import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import type { Diet } from "../../../../types/diet";
import DietMealCell from "./DietMealCell";
import { calculateDayMacros } from "../../../../utils/diets/dietMath";
import MacroPieChart from "./MacroPieChart";

interface DietGridProps {
    diet: Diet;
    selectedSlot?: { mealId: string, slotIndex: number } | null;
    onSelectSlot?: (slot: { mealId: string, slotIndex: number } | null) => void;
    onAddSlot?: (mealId: string) => void;
    onRemoveSlot?: (mealId: string) => void;
    onAddItem?: (mealId: string, slotIndex: number, dayIndex: number) => void;
    onRemoveItem?: (mealId: string, slotIndex: number, dayIndex: number) => void;
    onUpdateGrams?: (mealId: string, slotIndex: number, dayIndex: number, grams: number) => void;
}

const DAYS_PER_PAGE = 7;

export default function DietGrid({ diet, selectedSlot, onSelectSlot, onAddSlot, onRemoveSlot, onAddItem, onRemoveItem, onUpdateGrams }: DietGridProps) {
    const [weekOffset, setWeekOffset] = useState(0);

    const totalWeeks = Math.ceil(diet.days.length / DAYS_PER_PAGE);
    const visibleDays = diet.days.slice(
        weekOffset * DAYS_PER_PAGE,
        (weekOffset + 1) * DAYS_PER_PAGE
    );
    const dayOffset = weekOffset * DAYS_PER_PAGE;

    return (
        <div className="flex flex-col gap-4">
            {/* Navegación de semanas */}
            <div className="flex items-center justify-end gap-5">
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
            <div className="overflow-x-auto pb-2">
                <div
                    className="grid gap-2"
                    style={{
                        gridTemplateColumns: `140px repeat(${visibleDays.length}, minmax(160px, 200px))`
                    }}
                >
                    {/* Header row - días */}
                    <div />
                    {visibleDays.map((day, visibleIndex) => {
                        const dayIndex = dayOffset + visibleIndex;
                        const dayMacros = calculateDayMacros(diet, dayIndex);
                        return (
                            <div key={day.id} className="bg-white rounded-xl border border-primary-30 px-3 py-2 flex flex-col items-center gap-1">
                                <p className="text-xs font-bold text-black-primary uppercase tracking-wider">
                                    Día {day.dayNumber}
                                </p>
                                <MacroPieChart
                                    data={{ ...dayMacros, targetKcal: diet.targetKcalPerDay }}
                                    showLegend={false}
                                    size="sm"
                                />
                            </div>
                        );
                    })}

                    {/* Mensaje de estado vacío */}
                    {diet.meals.length === 0 && (
                        <div
                            className="col-span-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-12 text-center"
                            style={{ gridColumn: `1 / span ${visibleDays.length + 1}` }}
                        >
                            <p className="text-gray-secondary font-medium">
                                No hay ingestas configuradas en esta dieta.
                            </p>
                        </div>
                    )}

                    {/* Filas por ingesta */}
                    {diet.meals.map((meal) => (
                        <>
                            {meal.slots.map((slot, slotIndex) => (
                                <>
                                    {slotIndex === 0 && meal.slots.length === 1 ? (
                                        // Un solo slot: nombre + (+)
                                        <div
                                            key={`label-${meal.id}`}
                                            onClick={() => onSelectSlot?.({ mealId: meal.id, slotIndex: 0 })}
                                            className="flex items-center justify-between px-2 py-1 cursor-pointer hover:bg-blue-50/50 rounded-lg"
                                        >
                                            <p className="text-xs font-bold text-gray-primary uppercase tracking-wider">
                                                {meal.name}
                                            </p>
                                            <button
                                                onClick={() => onAddSlot?.(meal.id)}
                                                className="w-5 h-5 rounded flex items-center justify-center text-gray-secondary hover:bg-blue-50 hover:text-blue-brand transition-colors text-sm font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : slotIndex === 0 ? (
                                        // Primer slot con múltiples: solo nombre
                                        <div
                                            key={`label-${meal.id}`}
                                            onClick={() => onSelectSlot?.({ mealId: meal.id, slotIndex: 0 })}
                                            className="flex items-center px-2 py-1 cursor-pointer hover:bg-blue-50/50 rounded-lg"
                                        >
                                            <p className="text-xs font-bold text-gray-primary uppercase tracking-wider">
                                                {meal.name}
                                            </p>
                                        </div>
                                    ) : slotIndex === meal.slots.length - 1 ? (
                                        // Último slot: (-)(+)
                                        <div
                                            key={`label-${meal.id}-${slotIndex}`}
                                            onClick={() => onSelectSlot?.({ mealId: meal.id, slotIndex })}
                                            className="flex items-center justify-end px-2 py-1 gap-1 cursor-pointer hover:bg-blue-50/50 rounded-lg"
                                        >
                                            <button
                                                onClick={() => onRemoveSlot?.(meal.id)}
                                                className="w-5 h-5 rounded flex items-center justify-center text-gray-secondary hover:bg-red-50 hover:text-red-400 transition-colors text-sm font-bold"
                                            >
                                                −
                                            </button>
                                            <button
                                                onClick={() => onAddSlot?.(meal.id)}
                                                className="w-5 h-5 rounded flex items-center justify-center text-gray-secondary hover:bg-blue-50 hover:text-blue-brand transition-colors text-sm font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        // Slots intermedios: vacío
                                        <div key={`empty-label-${meal.id}-${slotIndex}`} onClick={() => onSelectSlot?.({ mealId: meal.id, slotIndex })} className="cursor-pointer hover:bg-blue-50/50 rounded-lg cursor-pointer hover:bg-blue-50/50 rounded-lg" />
                                    )}

                                    {/* Celdas por día */}
                                    {visibleDays.map((_, visibleIndex) => {
                                        const dayIndex = dayOffset + visibleIndex;
                                        const item = slot.items[dayIndex] ?? null;
                                        return (
                                            <DietMealCell
                                                key={`${slot.id}-${dayIndex}`}
                                                item={item}
                                                isSelected={selectedSlot?.mealId === meal.id && selectedSlot?.slotIndex === slotIndex}
                                                onAdd={() => onAddItem?.(meal.id, slotIndex, dayIndex)}
                                                onRemove={() => onRemoveItem?.(meal.id, slotIndex, dayIndex)}
                                                onUpdateGrams={(grams) => onUpdateGrams?.(meal.id, slotIndex, dayIndex, grams)}
                                            />
                                        );
                                    })}
                                </>
                            ))}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}
