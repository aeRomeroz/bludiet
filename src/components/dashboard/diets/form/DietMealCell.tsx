import { PlusIcon } from "@heroicons/react/24/outline";
import type { MealEntry, FoodPortion } from "../../../../types/diet";
import DietFoodItem from "./DietFoodItem";

interface DietMealCellProps {
    meal: MealEntry;
    onAddItem?: (mealId: string) => void;
    onRemoveItem?: (mealId: string, itemId: string) => void;
}

export default function DietMealCell({ meal, onAddItem, onRemoveItem }: DietMealCellProps) {
    return (
        <div className="bg-white rounded-xl border border-primary-30 p-3 flex flex-col gap-2 min-h-[80px]">
            {/* Alimentos */}
            {meal.items.length > 0 ? (
                <div className="flex flex-col gap-1.5">
                    {meal.items.map((item: FoodPortion) => (
                        <DietFoodItem
                            key={item.id}
                            item={item}
                            onRemove={onRemoveItem ? (itemId) => onRemoveItem(meal.id, itemId) : undefined}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-xs text-gray-secondary italic text-center my-auto">
                    Sin alimentos
                </p>
            )}

            {/* Botón añadir */}
            {onAddItem && (
                <button
                    onClick={() => onAddItem(meal.id)}
                    className="flex items-center justify-center gap-1 w-full py-1.5 rounded-lg border border-dashed border-primary-30 hover:border-blue-brand/40 hover:bg-blue-50/50 transition-all group"
                >
                    <PlusIcon className="w-3 h-3 text-gray-secondary group-hover:text-blue-brand transition-colors" />
                    <span className="text-xs text-gray-secondary group-hover:text-blue-brand transition-colors">
                        Añadir
                    </span>
                </button>
            )}
        </div>
    );
}
