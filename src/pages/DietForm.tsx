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
    const [activeDayId, setActiveDayId] = useState<string | null>(null);
    const [activeMealId, setActiveMealId] = useState<string | null>(null);

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

    const activeMealName = diet.days
        .find(d => d.id === activeDayId)
        ?.meals.find(m => m.id === activeMealId)
        ?.name;

    const handleAddItem = (dayId: string, mealId: string) => {
        setActiveDayId(dayId);
        setActiveMealId(mealId);
        setIsAddFoodOpen(true);
    };

    const handleFoodAdded = (item: FoodPortion) => {
        if (!activeDayId || !activeMealId) return;

        const updatedDiet = {
            ...diet,
            days: diet.days.map(day =>
                day.id !== activeDayId ? day : {
                    ...day,
                    meals: day.meals.map(meal =>
                        meal.id !== activeMealId ? meal : {
                            ...meal,
                            items: [...meal.items, item]
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
                        onAddItem={handleAddItem}
                        onRemoveItem={(dayId, mealId, itemId) => console.log('Eliminar item:', dayId, mealId, itemId)}
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
