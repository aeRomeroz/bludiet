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
import { MacroCard } from "./MacroCard";

interface DietSetupModalProps {
    isOpen: boolean;
    onClose: () => void;
    patients: Patient[];
    onDietCreate: (data: DietSetupData) => void;
}

export default function DietSetupModal({isOpen, onClose, patients, onDietCreate}: DietSetupModalProps) {
    const INITIAL_DIET_DATA: DietSetupData = {
        patientId: '',
        dietName: '',
        durationDays: 7,
        selectedMeals: [],
        targetKcal: 1800,
        macros: { protein: 25, fats: 35, carbs: 40 },
        startDate: new Date()
    };

    const [step, setStep] = useState<SetupStep>(1);
    const [formData, setFormData] = useState<DietSetupData>(INITIAL_DIET_DATA);

    const resetForm = () => {
        setStep(1);
        setFormData(INITIAL_DIET_DATA);
    };

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen]);

    const handleNext = () => {
        if (!formData.patientId || formData.patientId === '') {
            toast.error("Por favor selecciona un paciente para continuar");
            return;
        }
        setStep(2);
    };

    const handleSubmit = () => {
        if (!formData.dietName || formData.dietName.trim() === '') {
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
        
        onDietCreate(formData);
        toast.success("Configuración de dieta guardada");
        onClose();

        resetForm();
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={step === 1 ? "Crear nueva dieta" : "Configuración inicial"} 
            size="lg" 
            footer={
                <div className="flex justify-between w-full gap-3">
                    {step === 2 && (
                        <Button variant="secondary" onClick={() => setStep(1)} className="flex-1">
                            Anterior
                        </Button>
                    )}
                    <Button 
                        variant="secondary" 
                        onClick={onClose} 
                        className={step === 1 ? "flex-1" : "w-24"}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        onClick={step === 1 ? handleNext : handleSubmit}
                        className="flex-1 bg-blue-brand text-white hover:bg-blue-brand/90 shadow-md transition-all"
                    >
                        {step === 1 ? "Siguiente " : "Crear"}
                    </Button>
                </div>
            }
        >
            <div className="space-y-6">
                {step === 1 ? (
                    <div className="space-y-4">
                        {/* Selección de Paciente */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-gray-primary uppercase">Paciente</label>
                            <select 
                                className="bg-white border border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-brand/20"
                                value={formData.patientId}
                                onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                            >
                                <option value="">Selecciona un paciente...</option>
                                {patients.map(p => (
                                    <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
                                ))}
                            </select>
                        </div>

                        

                        
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
                                    onChange={(e) => setFormData({...formData, dietName: e.target.value})}
                                />
                            </div>
                            {/* Duración */}
                            <div className="flex flex-col gap-1 w-2/5">
                                <label className="text-xs font-bold text-black-primary">Duración (Días)</label>
                                <input 
                                    type="number"
                                    min="1"
                                    className="bg-white border border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-brand/20"
                                    value={formData.durationDays}
                                    onChange={(e) => setFormData({...formData, durationDays: Number(e.target.value)})}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-black-primary uppercase">Comidas</label>
                                <input 
                                    type="text"
                                    placeholder="Ej. Definición Verano / Volumen Limpio"
                                    className="bg-white border border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-brand/20"
                                    value={formData.dietName}
                                    onChange={(e) => setFormData({...formData, dietName: e.target.value})}
                                />
                            </div>
                        </div>

                        {/*SECCION INGESTA DIARIA*/}
                        <div className="text-xl font-bold">Ingesta Diaria<hr className="border-gray-300" /></div>
                        {/* Target Calorías */}
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                
                            <label className="text-center items-center justify-center inline-flex gap-2 text-sm font-semibold text-black-primary uppercase mb-2"><FireIcon className="w-4 h-4 mx-auto text-fire shrink-0"/> Objetivo Calórico Total (Kcal)</label>
                            <Slider.Root className="relative flex items-center select-none touch-none w-full h-5"
                                min={500}
                                max={5000}
                                step={50}
                                value={[formData.targetKcal]}
                                onValueChange={([val]) => setFormData({...formData, targetKcal: val})}
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
                                onChange={(e) => setFormData({...formData, targetKcal: Number(e.target.value)})}
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