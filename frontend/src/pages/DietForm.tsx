import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useDiets } from "../context/DietsContext";
import { usePatients } from "../context/PatientsContext";
import DietGrid from "../components/dashboard/diets/form/DietGrid";
import DietSidebar from "../components/dashboard/diets/form/DietSidebar";
import AddFoodItemModal from "../components/dashboard/diets/form/AddFoodItemModal";
import type { FoodPortion, MealEntry, SetupMacros } from "../types/diet";
import toast from "react-hot-toast";
import DietSettingsModal from "../components/dashboard/diets/DietSettingsModal";
import { dietService } from "../services/dietService";

export default function DietForm() {
    const { patientId, dietId } = useParams();
    const navigate = useNavigate();
    const { diets, updateDiet } = useDiets();
    const { patients } = usePatients();

    const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<FoodPortion | null>(null);
    const [activeMealId, setActiveMealId] = useState<string | null>(null);
    const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);
    const [activeDayIndex, setActiveDayIndex] = useState<number | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Funcionalidad Copy-Paste
    const [selectedSlot, setSelectedSlot] = useState<{ mealId: string, slotIndex: number } | null>(null);
    const [copiedSlot, setCopiedSlot] = useState<(FoodPortion | null)[] | null>(null);

    const diet = diets.find(d => d.id === dietId);
    const patient = patients.find(p => p.id === patientId);

    useEffect(() => {
        // Solo actuamos si la dieta existe y tiene comidas, pero no tiene slots
        if (diet && diet.meals.length > 0) {
            const hasNoSlots = diet.meals.every(m => !m.slots || m.slots.length === 0);

            if (hasNoSlots) {
                console.log("Generando estructura inicial de slots...");

                const initializedDiet = {
                    ...diet,
                    // Mapeamos cada comida (Desayuno, Comida, etc.) para que tenga su primer slot
                    meals: diet.meals.map(meal => ({
                        ...meal,
                        slots: [
                            {
                                id: crypto.randomUUID(),
                                slotIndex: 0,
                                // Importante: creamos el array con el tamaño de la duración elegida
                                items: Array(diet.durationDays).fill(null),
                            }
                        ]
                    }))
                };

                // Esto actualiza el contexto y hace que el Grid se renderice con las filas
                updateDiet(initializedDiet);
            }
        }
    }, [diet?.id, diet?.durationDays]);

    // Funcionalidad Copy-Paste
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement) return;

            if (e.ctrlKey && e.key === 'c' && selectedSlot && diet) {
                const meal = diet.meals.find(m => m.id === selectedSlot.mealId);
                const slot = meal?.slots[selectedSlot.slotIndex];
                if (slot) {
                    setCopiedSlot([...slot.items]);
                    toast.success("Fila copiada");
                }
            }

            if (e.ctrlKey && e.key === 'v' && copiedSlot && selectedSlot && diet) {
                const updatedDiet = {
                    ...diet,
                    meals: diet.meals.map(meal =>
                        meal.id !== selectedSlot.mealId ? meal : {
                            ...meal,
                            slots: meal.slots.map((slot, si) =>
                                si !== selectedSlot.slotIndex ? slot : {
                                    ...slot,
                                    items: copiedSlot.map(item => item ? { ...item, id: crypto.randomUUID() } : null)
                                }
                            )
                        }
                    )
                };
                updateDiet(updatedDiet);
                toast.success("Fila pegada");
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedSlot, copiedSlot, diet]);

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

    const handleUpdateSettings = (name: string, kcal: number, macros: SetupMacros) => {
        const updatedDiet = {
            ...diet,
            name,
            targetKcalPerDay: kcal,
            targetMacros: macros
        };
        updateDiet(updatedDiet);
    };

    const handleUpdateMealName = async (mealId: string, newName: string) => {
    // 1. Clonar la dieta actual para no mutar el estado directamente
    const updatedDiet = {
        ...diet,
        meals: diet.meals.map(m => m.id === mealId ? { ...m, name: newName } : m)
    };

    // 2. Actualizamos SOLO el estado local de la UI primero
    updateDiet(updatedDiet);

    // 3. Intentamos persistir con un pequeño retraso o control de errores
    try {
        await dietService.update(diet.id, updatedDiet);
        // Quitamos el toast de éxito para no saturar la pantalla
    } catch (error) {
        console.error("Error persistiendo nombre:", error);
        toast.error("Error al sincronizar con el servidor");
    }
};

    const handleAddMeal = async () => {
    // 1. Definimos la nueva ingesta
    const newMeal: MealEntry = {
        id: crypto.randomUUID(),
        name: "NUEVA INGESTA",
        orderIndex: diet.meals.length,
        slots: [{
            id: crypto.randomUUID(),
            slotIndex: 0,
            // Creamos los items vacíos (null) según la duración de la dieta
            items: Array(diet.durationDays).fill(null)
        }]
    };

    // 2. Actualizamos la dieta local
    const updatedDiet = {
        ...diet,
        meals: [...diet.meals, newMeal]
    };

    updateDiet(updatedDiet);

    // 3. Persistimos inmediatamente en la BDD
    try {
        await dietService.update(diet.id, updatedDiet);
        toast.success("Ingesta añadida");
    } catch (error) {
        toast.error("Error al guardar la nueva ingesta");
    }
};

    const handleRemoveMeal = async (mealId: string) => {
        if (!window.confirm("¿Eliminar toda la ingesta y sus alimentos?")) return;

        const updatedDiet = {
            ...diet,
            meals: diet.meals.filter(m => m.id !== mealId)
        };

        // 1. Actualizamos la UI
        updateDiet(updatedDiet);

        // 2. Persistimos en la BDD (Llamando a tu servicio de API)
        try {
            await dietService.update(diet.id, updatedDiet);
            toast.success("Ingesta eliminada de la base de datos");
        } catch (error) {
            toast.error("Error al persistir el borrado");
        }
    };

    const handleAddItem = (mealId: string, slotIndex: number, dayIndex: number) => {
        setActiveMealId(mealId);
        setActiveSlotIndex(slotIndex);
        setActiveDayIndex(dayIndex);
        setEditingItem(null);
        setIsAddFoodOpen(true);
    };

    const handleEditItem = (mealId: string, slotIndex: number, dayIndex: number) => {
        const meal = diet.meals.find(m => m.id === mealId);
        const slot = meal?.slots[slotIndex];
        const item = slot?.items[dayIndex];

        if (!item) return;

        setActiveMealId(mealId);
        setActiveSlotIndex(slotIndex);
        setActiveDayIndex(dayIndex);
        setEditingItem(item);
        setIsAddFoodOpen(true);
    };

    const handleFoodAdded = (item: FoodPortion) => {
        if (!activeMealId || activeSlotIndex === null || activeDayIndex === null) return;

        const itemWithDay = {
            ...item,
            dayNumber: activeDayIndex + 1 // Los días en el array son 0-indexed, en DB son 1-indexed
        };

        const updatedDiet = {
            ...diet,
            meals: diet.meals.map(meal =>
                meal.id !== activeMealId ? meal : {
                    ...meal,
                    slots: meal.slots.map((slot, si) =>
                        si !== activeSlotIndex ? slot : {
                            ...slot,
                            items: slot.items.map((existing, di) =>
                                di !== activeDayIndex ? existing : itemWithDay
                            )
                        }
                    )
                }
            )
        };

        updateDiet(updatedDiet);
        setIsAddFoodOpen(false);
    };

    const handleFoodEdited = (item: FoodPortion) => {
        if (!activeMealId || activeSlotIndex === null || activeDayIndex === null) return;

        const itemWithDay = {
            ...item,
            dayNumber: activeDayIndex + 1
        };

        const updatedDiet = {
            ...diet,
            meals: diet.meals.map(meal =>
                meal.id !== activeMealId ? meal : {
                    ...meal,
                    slots: meal.slots.map((slot, si) =>
                        si !== activeSlotIndex ? slot : {
                            ...slot,
                            items: slot.items.map((existing, di) =>
                                di !== activeDayIndex ? existing : itemWithDay
                            )
                        }
                    )
                }
            )
        };

        updateDiet(updatedDiet);
        setIsAddFoodOpen(false);
        setEditingItem(null);
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
                            slotIndex: meal.slots.length,
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

    const handleUpdateGrams = (mealId: string, slotIndex: number, dayIndex: number, grams: number) => {
        if (grams <= 0) return;
        const updatedDiet = {
            ...diet,
            meals: diet.meals.map(meal =>
                meal.id !== mealId ? meal : {
                    ...meal,
                    slots: meal.slots.map((slot, si) =>
                        si !== slotIndex ? slot : {
                            ...slot,
                            items: slot.items.map((item, di) =>
                                di !== dayIndex || !item ? item : { ...item, grams }
                            )
                        }
                    )
                }
            )
        };
        updateDiet(updatedDiet);
    };

    console.log("DEBUG - Dieta completa:", diet);
    console.log("DEBUG - Comidas:", diet.meals);
    console.log("DEBUG - Días de la dieta:", diet.days);

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
                        selectedSlot={selectedSlot}
                        onSelectSlot={setSelectedSlot}
                        onAddSlot={handleAddSlot}
                        onRemoveSlot={handleRemoveSlot}
                        onAddItem={handleAddItem}
                        onEditItem={handleEditItem}
                        onRemoveItem={handleRemoveItem}
                        onUpdateGrams={handleUpdateGrams}
                        onUpdateMealName={handleUpdateMealName}
                        onRemoveMeal={handleRemoveMeal}
                        onAddMeal={handleAddMeal}
                    />
                </div>
                <DietSidebar
                    diet={diet}
                    onEditClick={() => setIsSettingsOpen(true)}
                />
                <DietSettingsModal
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                    diet={diet}
                    onSave={handleUpdateSettings}
                />
            </div>

            <AddFoodItemModal
                isOpen={isAddFoodOpen}
                onClose={() => {
                    setIsAddFoodOpen(false);
                    setEditingItem(null);
                }}
                onAdd={handleFoodAdded}
                onEdit={handleFoodEdited}
                editingItem={editingItem}
                mealName={activeMealName}
                dayNumber={activeDayIndex !== null ? activeDayIndex + 1 : 1}
            />
        </div>
    );
}
