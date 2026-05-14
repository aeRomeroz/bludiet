import { useNavigate } from "react-router-dom"; 
import { useDiets } from "../../../context/DietsContext";
import { type Patient } from "../../../types/patients";
import { type SetupStep, type DietSetupData } from "../../../types/diet";
import { useEffect, useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import MacronutrientDistributionSlider from "./MacronutrientDistributionSlider";
import { calculateGramsFromKcalPercentage, KCAL_PER_GRAM } from "../../../utils/diets/dietMath";
import { FireIcon } from "@heroicons/react/24/solid";
import * as Slider from "@radix-ui/react-slider";
import * as Progress from '@radix-ui/react-progress';
import { MacroCard } from "./MacroCard";
import { DEFAULT_MEALS } from "../../../constants/diet";
import { PatientSearchList } from "../patients/PatientSearchList";
import { useAppNavigation } from "../../../hooks/useAppNavigation";

// Helper para mapear IDs de comidas a sus labels en español
const getMealLabelsFromIds = (mealIds: string[]): string[] => {
    return mealIds.map(id => {
        const meal = DEFAULT_MEALS.find(m => m.id === id);
        return meal?.label || id;
    });
};

interface DietSetupModalProps {
    isOpen: boolean;
    onClose: () => void;
    patients: Patient[];
    onDietCreate: (data: DietSetupData) => void;
    initialPatientId?: string;
    initialStep?: SetupStep;
}

const INITIAL_DIET_DATA: DietSetupData = {
    patientId: '',
    dietName: '',
    durationDays: 7,
    selectedMeals: [],
    targetKcal: 1800,
    macros: { protein: 25, fats: 35, carbs: 40 },
    startDate: new Date()
};

export default function DietSetupModal({ isOpen, onClose, patients, onDietCreate, initialPatientId, initialStep }: DietSetupModalProps) {
    const [step, setStep] = useState<SetupStep>(initialStep ?? 1);
    const [formData, setFormData] = useState<DietSetupData>({ ...INITIAL_DIET_DATA, patientId: initialPatientId ?? '' });
    const [isLoading, setIsLoading] = useState(false);
    const { addDiet } = useDiets();
    const { goToDietForm } = useAppNavigation();
    const navigate = useNavigate();
    const progressValue = (step / 2) * 100;

    const resetForm = () => {
        setStep(1);
        setFormData(INITIAL_DIET_DATA);
    };

    useEffect(() => {
        if (isOpen) {
            setStep(initialStep ?? 1);
            setFormData({
                ...INITIAL_DIET_DATA,
                patientId: initialPatientId ?? '',
            });
        } else {
            resetForm();
        }
    }, [isOpen, initialPatientId, initialStep]);

    const handleNext = () => {
        if (!formData.patientId || formData.patientId === '') {
            toast.error("Por favor selecciona un paciente para continuar");
            return;
        }
        setStep(2);
    };

    const handleSubmit = async () => {
        if (!formData.dietName?.trim()) {
            toast.error("El nombre de la dieta no puede estar vacío");
            return;
        }

        if (formData.durationDays <= 0) {
            toast.error("La duración de la dieta debe ser mayor a 0 días");
            return;
        }

        // Validación rápida de macros (opcional: que sumen algo lógico)
        if (formData.targetKcal <= 0) {
            toast.error("Las calorías deben ser mayores a 0");
            return;
        }

        if (formData.selectedMeals.length === 0) {
            toast.error("Selecciona al menos una comida (ej. Desayuno)");
            return;
        }

        if (isLoading) return;
        setIsLoading(true);

        const dietPayload = {
        patientId: formData.patientId,
        name: formData.dietName,
        durationDays: formData.durationDays,
        targetKcalPerDay: formData.targetKcal,
        targetProtein: formData.macros.protein,
        targetFats: formData.macros.fats,
        targetCarbs: formData.macros.carbs,
        startDate: formData.startDate.toISOString().split('T')[0], 
        selectedMealNames: getMealLabelsFromIds(formData.selectedMeals)    
        };

    try {
        const createdDiet = await addDiet(dietPayload);
        onClose();
        resetForm();
        setIsLoading(false);
        goToDietForm(createdDiet.id, formData.patientId);
    } catch (error) {
        console.error("Error creating diet:", error);
        toast.error("No se pudo crear la dieta. Por favor intenta de nuevo.");
        setIsLoading(false);
    }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={step === 1 ? "Crear nueva dieta" : "Configuración inicial"}
            size="xl"
            headerExtension={
                <div className="space-y-2">
                    {/* Subtítulo dinámico */}
                    <p className="text-xs font-bold text-blue-brand uppercase">
                        Paso
                        {step === 1
                            ? " 1: Seleccionar paciente"
                            : " 2: Configurar parámetros iniciales"
                        }
                    </p>

                    {/* Radix Progress Bar */}
                    <Progress.Root
                        className="relative overflow-hidden bg-gray-100 rounded-full w-full h-1"
                        value={progressValue}
                    >
                        <Progress.Indicator
                            className="bg-blue-brand w-full h-full transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${100 - progressValue}%)` }}
                        />
                    </Progress.Root>
                </div>
            }
            footer={
                <div className="flex justify-between items-center w-full">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        className="px-6 border-none text-gray-500 hover:bg-gray-100"
                    >
                        Cancelar
                    </Button>

                    <div className="flex gap-3 items-center">
                        {step === 2 && (
                            <Button variant="secondary" onClick={() => setStep(1)} className="px-4 text-sm">
                                Anterior
                            </Button>
                        )}
                        <Button
                            onClick={step === 1 ? handleNext : handleSubmit}
                            disabled={step === 2 && isLoading}
                            className="min-w-[120px] px-8 bg-blue-brand text-white hover:bg-blue-brand/90 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Creando..." : step === 1 ? "Siguiente " : "Crear"}
                        </Button>
                    </div>
                </div>
            }
        >
            <div className="space-y-6">
                {step === 1 ? (
                    <div className="space-y-4">
                        <PatientSearchList
                            patients={patients}
                            selectedId={formData.patientId}
                            onSelect={(id) => setFormData({ ...formData, patientId: id })}
                        />
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/*SECCION CARACTERÍSTICAS*/}
                        <div className="text-xl font-bold">Características<hr className="border-gray-300" /></div>
                        <div className="flex gap-6">
                            {/* Nombre de la Dieta */}
                            <div className="flex flex-col gap-1 w-3/5">
                                <label className="text-xs font-bold text-black-primary">Nombre de la Dieta</label>
                                <input
                                    type="text"
                                    placeholder="Ej. Definición Verano / Volumen Limpio"
                                    className="bg-white border border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-brand/20"
                                    value={formData.dietName}
                                    onChange={(e) => setFormData({ ...formData, dietName: e.target.value })}
                                />
                            </div>
                            {/* Duración */}
                            <div className="flex flex-col gap-1 w-2/5">
                                <label className="text-xs font-bold text-black-primary">Duración (Días)</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="bg-white border border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-brand/20"
                                    value={formData.durationDays ||""}
                                    onChange={(e) => {
                                        setFormData({ 
                                            ...formData, 
                                            durationDays: e.target.value === "" ? 0 : Number(e.target.value) 
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        {/*COMIDAS*/}
                        <div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-black-primary uppercase">Comidas</label>
                                <div className="flex flex-wrap gap-2">
                                    {DEFAULT_MEALS.map((meal) => {
                                        const isSelected = formData.selectedMeals.includes(meal.id);

                                        return (
                                            <button
                                                key={meal.id}
                                                type="button"
                                                onClick={() => {
                                                    const newMeals = isSelected
                                                        ? formData.selectedMeals.filter(id => id !== meal.id)
                                                        : [...formData.selectedMeals, meal.id];
                                                    const orderedMeals = DEFAULT_MEALS
                                                        .map(m => m.id)
                                                        .filter(id => newMeals.includes(id));

                                                    setFormData({ ...formData, selectedMeals: orderedMeals });
                                                }}
                                                className={`
                                                    px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 cursor-pointer
                                                    ${isSelected
                                                        ? 'bg-blue-brand border-blue-brand text-white shadow-sm scale-105'
                                                        : 'bg-white border-gray-200 text-gray-500 hover:border-blue-brand/50 hover:text-blue-brand'}
                                                `}
                                            >
                                                {meal.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/*SECCION INGESTA DIARIA*/}
                        <div className="text-xl font-bold">Ingesta Diaria<hr className="border-gray-300" /></div>
                        {/* Target Calorías */}
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">

                            <label className="text-center items-center justify-center inline-flex gap-2 text-sm font-semibold text-black-primary uppercase mb-2"><FireIcon className="w-4 h-4 mx-auto text-fire shrink-0" /> Objetivo Calórico Total (Kcal)</label>
                            <Slider.Root className="relative flex items-center select-none touch-none w-full h-5"
                                min={500}
                                max={5000}
                                step={50}
                                value={[formData.targetKcal]}
                                onValueChange={([val]) => setFormData({ ...formData, targetKcal: val })}
                            >
                                <Slider.Track className="bg-blue-brand/40 relative grow rounded-full h-1">
                                    <Slider.Range className="absolute bg-blue-brand rounded-full h-full" />
                                </Slider.Track>


                                <Slider.Thumb className="block w-3 h-3 bg-blue-brand rounded-full outline-none hover:scale-110 cursor-grab shadow-[0_0_8px_3px_rgba(59,130,246,0.4)]" />
                            </Slider.Root>

                            <input
                                type="number"
                                className="w-full text-center text-2xl font-bold text-blue-brand bg-transparent border-none outline-none focus:bg-blue-50 focus:rounded-lg transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                value={formData.targetKcal}
                                min={500}
                                max={5000}
                                onChange={(e) => setFormData({ ...formData, targetKcal: Number(e.target.value) })}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>

                        {/* Slider de Macros */}
                        <div>
                            <MacronutrientDistributionSlider
                                value={{
                                    p: formData.macros.protein,
                                    g: formData.macros.fats,
                                    c: formData.macros.carbs
                                }}
                                onChange={(newMacros) => setFormData({
                                    ...formData,
                                    macros: {
                                        protein: newMacros.p,
                                        fats: newMacros.g,
                                        carbs: newMacros.c
                                    }
                                })}
                            />
                        </div>

                        {/* DESGLOSE EN GRAMOS (Visualización de resultados) */}
                        <div className="grid grid-cols-3 gap-3">
                            <MacroCard
                                label="Proteínas"
                                color="text-blue-brand"
                                grams={calculateGramsFromKcalPercentage(formData.macros.protein, KCAL_PER_GRAM.PROTEIN, formData.targetKcal)}
                            />
                            <MacroCard
                                label="Grasas"
                                color="text-green-brand"
                                grams={calculateGramsFromKcalPercentage(formData.macros.fats, KCAL_PER_GRAM.FATS, formData.targetKcal)}
                            />
                            <MacroCard
                                label="Carbos"
                                color="text-yellow-warning"
                                grams={calculateGramsFromKcalPercentage(formData.macros.carbs, KCAL_PER_GRAM.CARBS, formData.targetKcal)}
                            />
                        </div>

                    </div>
                )}
            </div>
        </Modal>
    );

}