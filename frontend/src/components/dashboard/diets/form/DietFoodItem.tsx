import { XMarkIcon } from "@heroicons/react/24/outline";
import type { FoodPortion } from "../../../../types/diet";

interface DietFoodItemProps {
    item: FoodPortion;
    onRemove?: (id: string) => void;
}

export default function DietFoodItem({ item, onRemove }: DietFoodItemProps) {
    return (
        <div className="group flex items-center justify-between bg-white rounded-lg px-3 py-2 shadow-sm border border-primary-30 hover:border-blue-brand/30 transition-all">
            <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-semibold text-black-primary shrink-0">
                    {item.grams}g
                </span>
                <span className="text-xs text-black-primary truncate">
                    {item.name}
                </span>
            </div>
            {onRemove && (
                <button
                    onClick={() => onRemove(item.id)}
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-red-50"
                >
                    <XMarkIcon className="w-3 h-3 text-red-400" />
                </button>
            )}
        </div>
    );
}
