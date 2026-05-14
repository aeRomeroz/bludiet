import { useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import MacronutrientDistributionSlider from "./MacronutrientDistributionSlider";
import type { Diet, SetupMacros } from "../../../types/diet";

interface DietSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    diet: Diet;
    onSave: (name: string, kcal: number, macros: SetupMacros) => void;
}

export default function DietSettingsModal({ isOpen, onClose, diet, onSave }: DietSettingsModalProps) {
    const [name, setName] = useState(diet.name);
    const [kcal, setKcal] = useState(diet.targetKcalPerDay);
    const [isLoading, setIsLoading] = useState(false);
    
    const [macros, setMacros] = useState({
        p: diet.targetMacros.protein,
        g: diet.targetMacros.fats,
        c: diet.targetMacros.carbs
    });

    const handleSave = () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            onSave(name, kcal, {
                protein: macros.p,
                fats: macros.g,
                carbs: macros.c
            });
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Configuración de Objetivos"
            size="sm"
            footer={
                <div className="flex gap-3 w-full">
                    <Button variant="secondary" className="flex-1" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        disabled={isLoading}
                        className="flex-1 bg-blue-brand text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSave}
                    >
                        {isLoading ? "Guardando..." : "Guardar Cambios"}
                    </Button>
                </div>
            }
        >
            <div className="space-y-6 py-2">
                {/* Nombre de la Dieta */}
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-primary uppercase">Nombre del Plan</label>
                    <input 
                        type="text"
                        className="bg-gray-50 border border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-brand/20"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Input de Kcal */}
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-primary uppercase">Objetivo Calórico (kcal)</label>
                    <input 
                        type="number"
                        className="bg-gray-50 border border-primary-30 p-2.5 rounded-lg text-sm font-bold text-blue-brand outline-none focus:ring-2 focus:ring-blue-brand/20"
                        value={kcal}
                        onChange={(e) => setKcal(Number(e.target.value))}
                    />
                </div>

                {/* El Slider Reutilizado */}
                <div className="pt-2">
                    <MacronutrientDistributionSlider 
                        value={macros} 
                        onChange={setMacros} 
                    />
                </div>
                
                <p className="text-[10px] text-gray-secondary italic text-center">
                    Los cambios se aplicarán a todos los días de la dieta.
                </p>
            </div>
        </Modal>
    );
}