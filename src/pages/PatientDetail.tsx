import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { usePatients } from "../context/PatientsContext";
import Button from "../components/ui/Button";

export default function PatientDetail() {
    const { id } = useParams();
    console.log('PatientDetail montado, id:', id);
    const navigate = useNavigate();
    const { patients } = usePatients();

    const patient = patients.find(p => p.id === id);

    if (!patient) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-gray-secondary">Paciente no encontrado.</p>
                <Button variant="secondary" onClick={() => navigate('/patients')}>
                    Volver a pacientes
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/patients')}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5 text-gray-primary" />
                </button>
                <div>
                    <h1 className="text-black-primary font-serif text-4xl font-bold">
                        {patient.firstName} {patient.lastName}
                    </h1>
                    <span className="text-gray-primary">{patient.occupation}</span>
                </div>
            </div>

            {/* Contenido pendiente */}
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-100 rounded-2xl">
                <p className="text-gray-secondary text-sm">Detalle del paciente — en construcción</p>
            </div>
        </div>
    );
}