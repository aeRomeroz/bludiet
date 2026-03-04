import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useDiets } from "../context/DietsContext";
import { usePatients } from "../context/PatientsContext";
import DietGrid from "../components/dashboard/diets/form/DietGrid";
import DietSidebar from "../components/dashboard/diets/form/DietSidebar";
import AddFoodItemModal from "../components/dashboard/diets/form/AddFoodItemModal";
import type { FoodPortion } from "../types/diet";

export default function DietForm() {
    const { patientId, dietId } = useParams();
    const navigate = useNavigate();
    const { diets, updateDiet } = useDiets();
    const { patients } = usePatients();

    const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
    const [activeMealId, setActiveMealId] = useState<string | null>(null);
    const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);
    const [activeDayIndex, setActiveDayIndex] = useState<number | null>(null);

    const diet = diets.find(d => d.id === dietId);
    const patient = patients.find(p => p.id === patientId);

    if (!diet || !patient) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-gray-secondary">Dieta no encontrada.</p>
                <button
                    onClick={() => navigate(`/patients/${patientId}`)}
                    className="text-sm text-blue-brand hover:underline"
                >
                    Volver al paciente
                </button>
            </div>
        );
    }

    const activeMealName = diet.meals.find(m => m.id === activeMealId)?.name;

    const handleAddItem = (mealId: string, slotIndex: number, dayIndex: number) => {
        setActiveMealId(mealId);
        setActiveSlotIndex(slotIndex);
        setActiveDayIndex(dayIndex);
        setIsAddFoodOpen(true);
    };

    const handleFoodAdded = (item: FoodPortion) => {
        if (!activeMealId || activeSlotIndex === null || activeDayIndex === null) return;

        const updatedDiet = {
            ...diet,
            meals: diet.meals.map(meal =>
                meal.id !== activeMealId ? meal : {
                    ...meal,
                    slots: meal.slots.map((slot, si) =>
                        si !== activeSlotIndex ? slot : {
                            ...slot,
                            items: slot.items.map((existing, di) =>
                                di !== activeDayIndex ? existing : item
                            )
                        }
                    )
                }
            )
        };

        updateDiet(updatedDiet);
    };

    const handleAddSlot = (mealId: string) => {
        const updatedDiet = {
            ...diet,
            meals: diet.meals.map(meal =>
                meal.id !== mealId ? meal : {
                    ...meal,
                    slots: [
                        ...meal.slots,
                        {
                            id: crypto.randomUUID(),
                            items: Array(diet.durationDays).fill(null),
                        }
                    ]
                }
            )
        };
        updateDiet(updatedDiet);
    };

    const handleRemoveSlot = (mealId: string) => {
        const updatedDiet = {
            ...diet,
            meals: diet.meals.map(meal =>
                meal.id !== mealId ? meal : {
                    ...meal,
                    slots: meal.slots.slice(0, -1)
                }
            )
        };
        updateDiet(updatedDiet);
    };

    const handleRemoveItem = (mealId: string, slotIndex: number, dayIndex: number) => {
        const updatedDiet = {
            ...diet,
            meals: diet.meals.map(meal =>
                meal.id !== mealId ? meal : {
                    ...meal,
                    slots: meal.slots.map((slot, si) =>
                        si !== slotIndex ? slot : {
                            ...slot,
                            items: slot.items.map((existing, di) =>
                                di !== dayIndex ? existing : null
                            )
                        }
                    )
                }
            )
        };
        updateDiet(updatedDiet);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate(`/patients/${patientId}`)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5 text-gray-primary" />
                </button>
                <div>
                    <h1 className="text-black-primary font-serif text-4xl font-bold">
                        {diet.name}
                    </h1>
                    <span className="text-gray-primary text-sm">
                        {patient.firstName} {patient.lastName} · {diet.durationDays} días 
                    </span>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="flex gap-6 items-start">
                <div className="flex-1 min-w-0">
                    <DietGrid
                        diet={diet}
                        onAddSlot={handleAddSlot}
                        onRemoveSlot={handleRemoveSlot}
                        onAddItem={handleAddItem}
                        onRemoveItem={handleRemoveItem}
                    />
                </div>
                <DietSidebar
                    targetKcal={diet.targetKcalPerDay}
                    targetMacros={diet.targetMacros}
                />
            </div>

            <AddFoodItemModal
                isOpen={isAddFoodOpen}
                onClose={() => setIsAddFoodOpen(false)}
                onAdd={handleFoodAdded}
                mealName={activeMealName}
            />
        </div>
    );
}
