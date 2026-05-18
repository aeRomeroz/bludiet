import { useState, useEffect } from "react";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";
import toast from "react-hot-toast";
import type { FoodPortion } from "../../../../types/diet";
import type { ApiFood } from "../../../../types/food";
import { foodService } from "../../../../services/foodService";

interface AddFoodItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (item: FoodPortion) => void;
    onEdit?: (item: FoodPortion) => void;
    mealName?: string;
    dayNumber: number;
    editingItem?: FoodPortion | null;
}

export default function AddFoodItemModal({ isOpen, onClose, onAdd, onEdit, mealName, dayNumber, editingItem }: AddFoodItemModalProps) {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<ApiFood[]>([]);
    const [selected, setSelected] = useState<ApiFood | null>(null);
    const [grams, setGrams] = useState(100);
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = !!editingItem;

    useEffect(() => {
        if (isEditing && editingItem) {
            setSearch(editingItem.name);
            setGrams(editingItem.grams);
            setSelected({
                id: editingItem.foodId,
                nameEs: editingItem.name,
                kcalPer100g: editingItem.kcal ? (editingItem.kcal * 100) / editingItem.grams : 0,
                proteinPer100g: editingItem.protein ? (editingItem.protein * 100) / editingItem.grams : 0,
                fatsPer100g: editingItem.fats ? (editingItem.fats * 100) / editingItem.grams : 0,
                carbsPer100g: editingItem.carbs ? (editingItem.carbs * 100) / editingItem.grams : 0,
            } as ApiFood);
        }
    }, [isEditing, editingItem]);

    // Efecto de búsqueda reactiva
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (search.trim().length >= 2 && !selected) {
                setIsLoading(true);
                try {
                    const data = await foodService.search(search);
                    setResults(data);
                } catch (error) {
                    console.error("Error buscando alimentos:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults([]);
            }
        }, 300); // Debounce de 300ms para no ametrallar la API

        return () => clearTimeout(delayDebounceFn);
    }, [search, selected]);

    const handleSelect = (food: ApiFood) => {
        setSelected(food);
        setSearch(food.nameEs);
    };

    const handleSubmit = () => {
        if (!selected) {
            toast.error("Selecciona un alimento de la lista");
            return;
        }
        if (grams <= 0) {
            toast.error("Los gramos deben ser mayores a 0");
            return;
        }

        const foodData: FoodPortion = {
            id: isEditing && editingItem ? editingItem.id : crypto.randomUUID(),
            name: selected.nameEs,
            grams,
            foodId: selected.id,
            dayNumber: dayNumber,
            kcal: (selected.kcalPer100g * grams) / 100,
            protein: (selected.proteinPer100g * grams) / 100,
            fats: (selected.fatsPer100g * grams) / 100,
            carbs: (selected.carbsPer100g * grams) / 100,
        };

        if (isEditing && onEdit) {
            onEdit(foodData);
        } else {
            onAdd(foodData);
        }

        handleClose();
    };

    const handleClose = () => {
        setSearch('');
        setResults([]);
        setSelected(null);
        setGrams(100);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={isEditing ? "Editar Alimento" : "Añadir Alimento"}
            size="sm"
            footer={
                <div className="flex gap-3 w-full">
                    <Button variant="secondary" className="flex-1" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button
                        className="flex-1 bg-blue-brand text-white hover:bg-blue-brand/90"
                        onClick={handleSubmit}
                        disabled={!selected}
                    >
                        {isEditing ? "Guardar" : "Añadir"}
                    </Button>
                </div>
            }
        >
            <div className="space-y-4">
                {mealName && (
                    <p className="text-xs text-gray-secondary">
                        {isEditing ? "Editando" : "Añadiendo"} a <span className="font-semibold text-black-primary">{mealName}</span> (Día {dayNumber})
                    </p>
                )}

                {/* Buscador */}
                <div className="flex flex-col gap-1 relative">
                    <label className="text-xs font-bold text-gray-primary uppercase tracking-wider">Alimento</label>
                    <input
                        autoFocus
                        type="text"
                        placeholder="Buscar en la base de datos..."
                        className="bg-white border border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-brand/20"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setSelected(null);
                        }}
                    />

                    {/* Resultados de la API */}
                    {results.length > 0 && !selected && (
                        <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-primary-30 rounded-xl shadow-lg z-[200] max-h-60 overflow-y-auto">
                            {results.map(food => (
                                <button
                                    key={food.id}
                                    onClick={() => handleSelect(food)}
                                    className="w-full text-left px-3 py-2.5 hover:bg-blue-50 transition-colors border-b border-primary-30 last:border-0"
                                >
                                    <p className="text-sm text-black-primary font-medium">{food.nameEs}</p>
                                    <p className="text-[10px] text-gray-secondary uppercase">
                                        {food.groupName} · {food.kcalPer100g} kcal/100g
                                    </p>
                                </button>
                            ))}
                        </div>
                    )}
                    {isLoading && <p className="text-[10px] mt-1 text-blue-brand animate-pulse">Buscando...</p>}
                </div>

                {/* Gramos */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-primary uppercase tracking-wider">Gramos</label>
                    <input
                        type="number"
                        min="1"
                        className="bg-white border border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-brand/20"
                        value={grams}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => setGrams(Number(e.target.value))}
                    />
                </div>

                {/* Macros dinámicos */}
                {selected && (
                    <div className="bg-blue-50 rounded-xl border border-blue-100 p-3 grid grid-cols-4 gap-2 text-center">
                        <div>
                            <p className="text-[10px] text-gray-secondary uppercase font-bold">Kcal</p>
                            <p className="text-sm font-bold text-blue-brand">{Math.round((selected.kcalPer100g * grams) / 100)}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-secondary uppercase font-bold">Prot</p>
                            <p className="text-sm font-bold text-black-primary">{((selected.proteinPer100g * grams) / 100).toFixed(1)}g</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-secondary uppercase font-bold">Grasa</p>
                            <p className="text-sm font-bold text-black-primary">{((selected.fatsPer100g * grams) / 100).toFixed(1)}g</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-secondary uppercase font-bold">Carb</p>
                            <p className="text-sm font-bold text-black-primary">{((selected.carbsPer100g * grams) / 100).toFixed(1)}g</p>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}