import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useDiets } from "../context/DietsContext";
import { usePatients } from "../context/PatientsContext";
import DietGrid from "../components/dashboard/diets/form/DietGrid";

export default function DietForm() {
    const { patientId, dietId } = useParams();
    const navigate = useNavigate();
    const { diets } = useDiets();
    const { patients } = usePatients();

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

            {/* Grid */}
            <DietGrid
                diet={diet}
                onAddItem={(dayId, mealId) => console.log('Añadir item:', dayId, mealId)}
                onRemoveItem={(dayId, mealId, itemId) => console.log('Eliminar item:', dayId, mealId, itemId)}
            />
        </div>
    );
}
