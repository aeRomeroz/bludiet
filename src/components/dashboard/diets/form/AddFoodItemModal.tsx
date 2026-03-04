import { useState } from "react";
import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";
import toast from "react-hot-toast";
import type { FoodPortion } from "../../../../types/diet";

interface AddFoodItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (item: FoodPortion) => void;
    mealName?: string;
}

const INITIAL_FORM = { name: '', grams: 100 };

export default function AddFoodItemModal({ isOpen, onClose, onAdd, mealName }: AddFoodItemModalProps) {
    const [form, setForm] = useState(INITIAL_FORM);

    const handleSubmit = () => {
        if (!form.name.trim()) {
            toast.error("El nombre del alimento no puede estar vacío");
            return;
        }
        if (form.grams <= 0) {
            toast.error("Los gramos deben ser mayores a 0");
            return;
        }

        onAdd({
            id: crypto.randomUUID(),
            name: form.name.trim(),
            grams: form.grams,
        });

        setForm(INITIAL_FORM);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Añadir Alimento"
            size="sm"
            footer={
                <>
                    <Button variant="secondary" className="flex-1" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        form="add-food-form"
                        className="flex-1 bg-blue-brand text-white hover:bg-blue-brand/90"
                    >
                        Añadir
                    </Button>
                </>
            }
        >
            <form id="add-food-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
                {mealName && (
                    <p className="text-xs text-gray-secondary">
                        Añadiendo a <span className="font-semibold text-black-primary">{mealName}</span>
                    </p>
                )}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-primary uppercase tracking-wider">Alimento</label>
                    <input
                        autoFocus
                        type="text"
                        placeholder="Ej. Pechuga de pollo"
                        className="bg-white border border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-brand/20"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-primary uppercase tracking-wider">Gramos</label>
                    <input
                        type="number"
                        min="1"
                        className="bg-white border border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-brand/20"
                        value={form.grams}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => setForm({ ...form, grams: Number(e.target.value) })}
                    />
                </div>
            </form>
        </Modal>
    );
}