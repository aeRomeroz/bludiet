import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
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
    onEditItem?: (mealId: string, slotIndex: number, dayIndex: number) => void;
    onRemoveItem?: (mealId: string, slotIndex: number, dayIndex: number) => void;
    onUpdateGrams?: (mealId: string, slotIndex: number, dayIndex: number, grams: number) => void;
    onUpdateMealName?: (mealId: string, name: string) => void;
    onRemoveMeal?: (mealId: string) => void;
    onAddMeal?: () => void; 
}

const DAYS_PER_PAGE = 7;

export default function DietGrid({ diet, selectedSlot, onSelectSlot, onAddSlot, onRemoveSlot, onAddItem, onEditItem, onRemoveItem, onUpdateGrams, onUpdateMealName, onRemoveMeal, onAddMeal }: DietGridProps) {
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
                                    {/* COLUMNA IZQUIERDA: Etiquetas y Controles */}
                                    {slotIndex === 0 ? (
                                        // SIEMPRE EL PRIMER SLOT: Input de nombre + botón añadir
                                        <div
                                            onClick={() => onSelectSlot?.({ mealId: meal.id, slotIndex: 0 })}
                                            className="flex items-center justify-between px-2 py-1 cursor-pointer hover:bg-blue-50/50 rounded-lg group/meal"
                                        >
                                            <div className="flex items-center gap-1 flex-1">
                                                <EditableMealName 
                                                    initialName={meal.name} 
                                                    onSave={(newName) => onUpdateMealName?.(meal.id, newName)} 
                                                />
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); onRemoveMeal?.(meal.id); }}
                                                    className="opacity-0 group-hover/meal:opacity-100 p-0.5 text-gray-secondary hover:text-red-500 transition-all"
                                                >
                                                    <TrashIcon className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onAddSlot?.(meal.id); }}
                                                className="w-5 h-5 rounded flex items-center justify-center text-gray-secondary hover:bg-blue-100 hover:text-blue-brand transition-colors text-sm font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : slotIndex === meal.slots.length - 1 ? (
                                        // ÚLTIMO SLOT (si hay varios): Botones +/-
                                        <div
                                            onClick={() => onSelectSlot?.({ mealId: meal.id, slotIndex })}
                                            className="flex items-center justify-end px-2 py-1 gap-1 cursor-pointer hover:bg-blue-50/50 rounded-lg"
                                        >
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onRemoveSlot?.(meal.id); }}
                                                className="w-5 h-5 rounded flex items-center justify-center text-gray-secondary hover:bg-red-50 hover:text-red-400 transition-colors text-sm font-bold"
                                            >
                                                −
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onAddSlot?.(meal.id); }}
                                                className="w-5 h-5 rounded flex items-center justify-center text-gray-secondary hover:bg-blue-50 hover:text-blue-brand transition-colors text-sm font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        // SLOTS INTERMEDIOS: Solo zona clickeable
                                        <div 
                                            onClick={() => onSelectSlot?.({ mealId: meal.id, slotIndex })} 
                                            className="cursor-pointer hover:bg-blue-50/50 rounded-lg" 
                                        />
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
                                                onEdit={() => onEditItem?.(meal.id, slotIndex, dayIndex)}
                                                onRemove={() => onRemoveItem?.(meal.id, slotIndex, dayIndex)}
                                                onUpdateGrams={(grams) => onUpdateGrams?.(meal.id, slotIndex, dayIndex, grams)}
                                            />
                                        );
                                    })}
                                </>
                            ))}
                        </>
                    ))}
                    <button
    onClick={onAddMeal} // Necesitarás añadir esta prop a la interfaz DietGridProps
    className="mt-4 flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-secondary hover:text-blue-brand hover:border-blue-brand/40 hover:bg-blue-50/30 transition-all group w-full justify-center"
>
    <PlusIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
    <span className="text-xs font-bold uppercase tracking-widest">Añadir Nueva Ingesta</span>
</button>
                </div>
            </div>
        </div>
    );
}

const EditableMealName = ({ 
    initialName, 
    onSave 
}: { 
    initialName: string, 
    onSave: (newName: string) => void 
}) => {
    const [localName, setLocalName] = useState(initialName);

    // Si el nombre cambia desde afuera (ej. por un reset), actualizamos el local
    useEffect(() => {
        setLocalName(initialName);
    }, [initialName]);

    return (
        <input
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            onBlur={() => {
                if (localName !== initialName) {
                    onSave(localName);
                }
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') e.currentTarget.blur(); // Guardar al pulsar Enter
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-transparent border-none p-0 text-[10px] font-bold text-gray-primary uppercase tracking-widest focus:ring-0 focus:bg-white w-full transition-colors cursor-text hover:bg-gray-100/50 rounded px-1"
            placeholder="INGESTA..."
        />
    );
};
