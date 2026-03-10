import type { DietDay } from "../../../../types/diet";
import DietMealCell from "./DietMealCell";

interface DietDayColumnProps {
    day: DietDay;
    mealNames: string[];
    onAddItem?: (dayId: string, mealId: string) => void;
    onRemoveItem?: (dayId: string, mealId: string, itemId: string) => void;
}

export default function DietDayColumn({ day, mealNames, onAddItem, onRemoveItem }: DietDayColumnProps) {
    return (
        <div className="flex flex-col gap-3 min-w-[200px] max-w-[220px]">
            {/* Header del día */}
            <div className="bg-white rounded-xl border border-primary-30 px-3 py-2 text-center sticky top-0 z-10">
                <p className="text-xs font-bold text-black-primary uppercase tracking-wider">
                    Día {day.dayNumber}
                </p>
            </div>

            {/* Celdas por ingesta */}
            {mealNames.map((mealName) => {
                const meal = day.meals.find(m => m.name === mealName);
                if (!meal) return (
                    <div key={mealName} className="min-h-[80px] rounded-xl border border-dashed border-primary-30" />
                );

                return (
                    <DietMealCell
                        key={meal.id}
                        meal={meal}
                        onAddItem={onAddItem ? (mealId) => onAddItem(day.id, mealId) : undefined}
                        onRemoveItem={onRemoveItem ? (mealId, itemId) => onRemoveItem(day.id, mealId, itemId) : undefined}
                    />
                );
            })}
        </div>
    );
}
