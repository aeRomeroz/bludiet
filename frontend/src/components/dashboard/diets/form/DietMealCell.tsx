import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { FoodPortion } from "../../../../types/diet";

interface DietMealCellProps {
    item: FoodPortion | null;
    isSelected?: boolean;
    onAdd?: () => void;
    onEdit?: () => void;
    onRemove?: () => void;
    onUpdateGrams?: (grams: number) => void;

}

export default function DietMealCell({ item, isSelected, onAdd, onEdit, onRemove, onUpdateGrams }: DietMealCellProps) {
    if (item) {
        return (
            <div className={`group flex items-center justify-between rounded-lg px-3 py-2 border transition-all min-h-[40px]
                ${isSelected 
                        ? 'bg-blue-50 border-blue-brand/50' 
                        : 'bg-white border-primary-30 hover:border-blue-brand/30'
                    }
            `}>
                <div className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer" onClick={onEdit} title="Click para editar">
                    <div className="inline-flex gap-0">
                        <input type="text" inputMode="numeric" pattern="[0-9]*" value={item.grams} onChange={(e) => onUpdateGrams?.(Number(e.target.value))} onFocus={(e) => e.target.select()} className="text-xs font-semibold text-blue-brand shrink-0 w-7 bg-transparent outline-none focus:bg-blue-50 rounded"/>
                        <span className="text-xs font-semibold text-blue-brand shrink-0">g</span>
                    </div>
                    <span className="text-xs text-black-primary">{item.name}</span>
                </div>
                {onRemove && (
                    <button
                        onClick={onRemove}
                        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-red-50"
                    >
                        <XMarkIcon className="w-3 h-3 text-red-400" />
                    </button>
                )}
            </div>
        );
    }

    return (
        <button
            onClick={onAdd}
            className="flex items-center justify-center w-full min-h-[40px] rounded-lg border border-dashed border-primary-30 hover:border-blue-brand/40 hover:bg-blue-50/50 transition-all group"
        >
            <PlusIcon className="w-3 h-3 text-gray-secondary group-hover:text-blue-brand transition-colors" />
        </button>
    );
}