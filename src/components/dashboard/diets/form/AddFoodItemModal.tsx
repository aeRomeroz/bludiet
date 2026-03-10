import { useState } from "react";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";
import toast from "react-hot-toast";
import type { FoodPortion } from "../../../../types/diet";
import { BEDCA_FOODS, type BedcaFood } from "../../../../utils/diets/bedca";

interface AddFoodItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (item: FoodPortion) => void;
    mealName?: string;
}

const INITIAL_FORM = { name: '', grams: 100 };

export default function AddFoodItemModal({ isOpen, onClose, onAdd, mealName }: AddFoodItemModalProps) {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<BedcaFood | null>(null);
    const [grams, setGrams] = useState(100);

    const results = search.trim().length >= 2
        ? BEDCA_FOODS.filter(f => f.name.toLowerCase().includes(search.toLowerCase())).slice(0, 8)
        : [];

    const handleSelect = (food: BedcaFood) => {
        setSelected(food);
        setSearch(food.name);
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

        onAdd({
            id: crypto.randomUUID(),
            name: selected.name,
            grams,
        });

        handleClose();
    };

    const handleClose = () => {
        setSearch('');
        setSelected(null);
        setGrams(100);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Añadir Alimento"
            size="sm"
            footer={
                <div className="flex gap-3 w-full">
                    <Button variant="secondary" className="flex-1" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button
                        className="flex-1 bg-blue-brand text-white hover:bg-blue-brand/90"
                        onClick={handleSubmit}
                    >
                        Añadir
                    </Button>
                </div>
            }
        >
            <div className="space-y-4">
                {mealName && (
                    <p className="text-xs text-gray-secondary">
                        Añadiendo a <span className="font-semibold text-black-primary">{mealName}</span>
                    </p>
                )}

                {/* Buscador */}
                <div className="flex flex-col gap-1 relative">
                    <label className="text-xs font-bold text-gray-primary uppercase tracking-wider">Alimento</label>
                    <input
                        autoFocus
                        type="text"
                        placeholder="Buscar alimento..."
                        className="bg-white border border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-brand/20"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setSelected(null);
                        }}
                    />

                    {/* Resultados */}
                    {results.length > 0 && !selected && (
                        <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-primary-30 rounded-xl shadow-lg z-[200] overflow-hidden">
                            {results.map(food => (
                                <button
                                    key={food.id}
                                    onClick={() => handleSelect(food)}
                                    className="w-full text-left px-3 py-2.5 hover:bg-blue-50 transition-colors border-b border-primary-30 last:border-0"
                                >
                                    <p className="text-sm text-black-primary">{food.name}</p>
                                    <p className="text-xs text-gray-secondary">{food.group} · {food.kcal} kcal/100g</p>
                                </button>
                            ))}
                        </div>
                    )}
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

                {/* Macros del alimento seleccionado */}
                {selected && (
                    <div className="bg-blue-50 rounded-xl border border-blue-100 p-3 grid grid-cols-4 gap-2 text-center">
                        <div>
                            <p className="text-xs text-gray-secondary">Kcal</p>
                            <p className="text-sm font-bold text-blue-brand">{Math.round(selected.kcal * grams / 100)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-secondary">Prot</p>
                            <p className="text-sm font-bold text-black-primary">{Math.round(selected.protein * grams / 100)}g</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-secondary">Grasas</p>
                            <p className="text-sm font-bold text-black-primary">{Math.round(selected.fats * grams / 100)}g</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-secondary">Carbos</p>
                            <p className="text-sm font-bold text-black-primary">{Math.round(selected.carbs * grams / 100)}g</p>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}