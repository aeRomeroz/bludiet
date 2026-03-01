import { type Patient } from "../../../types/patients";
import { type SetupStep, type DietSetupData } from "../../../types/diet";
import { useEffect, useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

interface DietSetupModalProps {
    isOpen: boolean;
    onClose: () => void;
    patients: Patient[];
    onDietCreate: (data: DietSetupData) => void;
}

export default function DietSetupModal({isOpen, onClose, patients, onDietCreate}: DietSetupModalProps) {
    const [step, setStep] = useState<SetupStep>(1);
    const [formData, setFormData] = useState<DietSetupData>({
        patientId: '',
        dietName: '',
        durationDays: 30,
        selectedMeals: [],
        targetKcal: 2000,
        macros: { protein: 0, fats: 0, carbs: 0 },
        startDate: new Date()
    });

    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setFormData({
                patientId: '',
                dietName: '',
                durationDays: 30,
                selectedMeals: [],
                targetKcal: 2000,
                macros: { protein: 0, fats: 0, carbs: 0 },
                startDate: new Date()
            });
        }
    }, [isOpen, onClose]);

    const handleNext = () => {
        if (!formData.patientId || !formData.dietName) {
            toast.error("Por favor completa los datos básicos");
            return;
        }
        setStep(2);
    };

    const handleSubmit = () => {
        // Validación rápida de macros (opcional: que sumen algo lógico)
        if (formData.targetKcal <= 0) {
            toast.error("Las calorías deben ser mayores a 0");
            return;
        }
        
        onDietCreate(formData);
        toast.success("Configuración de dieta guardada");
        onClose();

        // Limpiar estado 
        setStep(1);
        setFormData({
            patientId: '',
            dietName: '',
            durationDays: 30,
            selectedMeals: [],
            targetKcal: 2000,
            macros: { protein: 0, fats: 0, carbs: 0 },
            startDate: new Date()
        }); 
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

                        {/* Nombre de la Dieta */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-gray-primary uppercase">Nombre del Plan</label>
                            <input 
                                type="text"
                                placeholder="Ej. Definición Verano / Volumen Limpio"
                                className="bg-white border border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-brand/20"
                                value={formData.dietName}
                                onChange={(e) => setFormData({...formData, dietName: e.target.value})}
                            />
                        </div>

                        {/* Duración */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-gray-primary uppercase">Duración (Días)</label>
                            <input 
                                type="number"
                                className="bg-white border border-primary-30 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-brand/20"
                                value={formData.durationDays}
                                onChange={(e) => setFormData({...formData, durationDays: Number(e.target.value)})}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Target Calorías */}
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <label className="block text-center text-xs font-bold text-blue-800 uppercase mb-2">Objetivo Calórico Total (Kcal)</label>
                            <input 
                                type="number"
                                className="w-full bg-white border-2 border-blue-200 p-3 rounded-lg text-center text-2xl font-bold text-blue-brand outline-none focus:border-blue-brand transition-all"
                                value={formData.targetKcal}
                                onChange={(e) => setFormData({...formData, targetKcal: Number(e.target.value)})}
                            />
                        </div>

                        {/* Inputs de Macros */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-gray-primary uppercase text-center">Proteínas (g)</label>
                                <input 
                                    type="number"
                                    className="border border-primary-30 p-2.5 rounded-lg text-center font-semibold focus:border-blue-brand outline-none"
                                    value={formData.macros.protein}
                                    onChange={(e) => setFormData({
                                        ...formData, 
                                        macros: {...formData.macros, protein: Number(e.target.value)}
                                    })}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-gray-primary uppercase text-center">Grasas (g)</label>
                                <input 
                                    type="number"
                                    className="border border-primary-30 p-2.5 rounded-lg text-center font-semibold focus:border-blue-brand outline-none"
                                    value={formData.macros.fats}
                                    onChange={(e) => setFormData({
                                        ...formData, 
                                        macros: {...formData.macros, fats: Number(e.target.value)}
                                    })}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-gray-primary uppercase text-center">Carbs (g)</label>
                                <input 
                                    type="number"
                                    className="border border-primary-30 p-2.5 rounded-lg text-center font-semibold focus:border-blue-brand outline-none"
                                    value={formData.macros.carbs}
                                    onChange={(e) => setFormData({
                                        ...formData, 
                                        macros: {...formData.macros, carbs: Number(e.target.value)}
                                    })}
                                />
                            </div>
                        </div>

                        {/* Info tip informativa */}
                        <p className="text-[11px] text-gray-secondary italic text-center">
                            Tip: 1g Proteína/Carbo = 4 Kcal | 1g Grasa = 9 Kcal
                        </p>
                    </div>
                )}
            </div>
        </Modal>
    );

}