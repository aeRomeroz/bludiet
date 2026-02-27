import { type Patient } from "../../../types/patients";
import { type SetupStep, type DietSetupData } from "../../../types/diet";
import { useState } from "react";
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
    const 

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Configurar Dieta" size="lg" footer={<></>}>
            <div className="p-4">
                <p>Paso {step}:</p>
                <div className="flex gap-2 mt-4">
                    <Button onClick={() => setStep(1)}>Paso 1</Button>
                    <Button onClick={() => setStep(2)}>Paso 2</Button>
                </div>
            </div>
        </Modal>
    );

}