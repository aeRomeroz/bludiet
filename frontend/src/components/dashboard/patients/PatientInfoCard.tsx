import { PATIENT_STATUS, type Patient } from "../../../types/patients";
import { calculateAge, calculateBMI, getBMILabel } from "../../../utils/patients/patientCalculations";

const statusStyles = {
    ACTIVE: 'bg-green-active/30 text-green-active',
    PENDING: 'bg-yellow-warning/30 text-yellow-warning',
    REVIEW: 'bg-blue-100 text-blue-700',
};

const genderLabel = { Male: 'Masculino', Female: 'Femenino' };

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
}

interface PatientInfoCardProps {
    patient: Patient;
    isEditing?: boolean;
}

const inputClasses = "w-full bg-white border border-primary-30 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-brand/20 focus:border-blue-brand outline-none transition-all font-sans font-normal text-black-primary";

export default function PatientInfoCard({ patient, isEditing, }: PatientInfoCardProps) {
    const age = calculateAge(patient.birthDate);
    const medicalHistory = patient.medicalHistory;
    const measurement = patient.initialMeasurement;
    const bmi = measurement ? calculateBMI(measurement.weight, measurement.height) : null;

    if (isEditing) {
        return (
            <form id="edit-patient-form" className="bg-white border-2 border-blue-brand/30 rounded-2xl p-6 space-y-6 shadow-sm">
                <div className="flex flex-col gap-6">
                    {/* Sección Identidad Edición */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-primary uppercase">Nombre</label>
                            <input name="firstName" defaultValue={patient.firstName} className={inputClasses} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-primary uppercase">Apellidos</label>
                            <input name="lastName" defaultValue={patient.lastName} className={inputClasses} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-primary uppercase">Ocupación</label>
                            <input name="occupation" defaultValue={patient.occupation} className={inputClasses} />
                        </div>
                    </div>

                    {/* Datos Rápidos Edición */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-primary/50 p-4 rounded-xl">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-primary uppercase">Nacimiento</label>
                            <input type="date" name="birthDate" defaultValue={patient.birthDate} className={inputClasses} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-primary uppercase">Género</label>
                            <select name="gender" defaultValue={patient.gender} className={inputClasses}>
                                <option value="Male text-black">Masculino</option>
                                <option value="Female">Femenino</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-primary uppercase">Estado</label>
                            <select name="status" defaultValue={patient.status} className={inputClasses}>
                                <option value="ACTIVE text-black">Activo</option>
                                <option value="PENDING">Pendiente</option>
                                <option value="REVIEW">Revisión</option>
                            </select>
                        </div>
                    </div>

                    {/* Motivo de consulta Edición */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-primary uppercase">Motivo de consulta</label>
                        <textarea
                            name="consultationReason"
                            defaultValue={patient.consultationReason}
                            rows={3}
                            className={`${inputClasses} resize-none`}
                        />
                    </div>

                    {/* Historial Médico Edición */}
                    <div className="space-y-3">
                        <p className="text-xs font-bold text-gray-primary uppercase tracking-wider">Historial médico</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {[
                                { id: 'chronicDiseases', label: 'Enfermedades crónicas' },
                                { id: 'previousSurgeries', label: 'Cirugías previas' },
                                { id: 'allergies', label: 'Alergias' },
                                { id: 'medications', label: 'Medicamentos' },
                                { id: 'smokes', label: 'Tabaco' },
                                { id: 'drinksAlcohol', label: 'Alcohol' },
                            ].map((item) => {
                                const data = (medicalHistory as any)?.[item.id];
                                return (
                                    <div key={item.id} className="p-3 border border-primary-30 rounded-xl bg-primary/30 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-semibold text-black-primary">{item.label}</label>
                                            <input
                                                type="checkbox"
                                                name={`${item.id}.hasCondition`}
                                                defaultChecked={data?.hasCondition}
                                                className="w-4 h-4 text-blue-brand rounded border-gray-300 focus:ring-blue-brand"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            name={`${item.id}.observation`}
                                            defaultValue={data?.observation}
                                            placeholder="Observaciones..."
                                            className="w-full bg-white border border-primary-30 rounded-md px-2 py-1 text-xs outline-none focus:border-blue-brand"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <p className="text-[10px] text-blue-brand italic font-medium">* Edición de historial médico disponible en ajustes avanzados.</p>
            </form>
        );
    }

    // --- MODO VISTA  ---
    const quickStats = [
        { label: 'Fecha de nacimiento', value: formatDate(patient.birthDate) },
        { label: 'Edad', value: `${age} años` },
        { label: 'Género', value: genderLabel[patient.gender] },
        { label: 'Estado', value: PATIENT_STATUS[patient.status] },
        ...(measurement ? [
            { label: 'Peso', value: `${measurement.weight} kg` },
            { label: 'Talla', value: `${measurement.height} cm` },
            { label: 'IMC', value: `${bmi} — ${getBMILabel(bmi!)}` },
        ] : []),
    ];

    const medicalItems = medicalHistory ? [
        { label: 'Enfermedades crónicas', data: medicalHistory.chronicDiseases },
        { label: 'Cirugías previas', data: medicalHistory.previousSurgeries },
        { label: 'Alergias', data: medicalHistory.allergies },
        { label: 'Medicamentos', data: medicalHistory.medications },
        { label: 'Tabaco', data: medicalHistory.smokes },
        { label: 'Alcohol', data: medicalHistory.drinksAlcohol },
    ] : [];

    return (
        <div className="bg-white border border-primary-30 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-4">
                {patient.avatarUrl ? (
                    <img src={patient.avatarUrl} className="w-16 h-16 rounded-full object-cover" />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-brand/20 flex items-center justify-center text-blue-brand text-xl font-bold shrink-0">
                        {patient.firstName[0]}{patient.lastName[0]}
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-xl font-serif font-bold text-black-primary">
                            {patient.firstName} {patient.lastName}
                        </h2>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${statusStyles[patient.status]}`}>
                            {PATIENT_STATUS[patient.status]}
                        </span>
                    </div>
                    <p className="text-sm text-gray-secondary mt-0.5">{patient.occupation || '—'}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickStats.map(({ label, value }) => (
                    <div key={label} className="bg-primary rounded-xl px-4 py-3">
                        <p className="text-xs text-gray-secondary uppercase tracking-wider font-medium">{label}</p>
                        <p className="text-sm font-semibold text-black-primary mt-1">{value}</p>
                    </div>
                ))}
            </div>

            <div>
                <p className="text-xs font-bold text-gray-primary uppercase tracking-wider mb-2">Motivo de consulta</p>
                <p className="text-sm text-black-primary leading-relaxed">{patient.consultationReason}</p>
            </div>

            {medicalHistory && (
                <div>
                    <p className="text-xs font-bold text-gray-primary uppercase tracking-wider mb-3">Historial médico</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {medicalItems.map(({ label, data }) => (
                            <div key={label} className={`rounded-xl px-4 py-3 border ${data.hasCondition ? 'bg-red-50 border-red-100' : 'bg-primary border-primary-30'}`}>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full shrink-0 ${data.hasCondition ? 'bg-red-400' : 'bg-green-active'}`} />
                                    <p className="text-xs font-medium text-black-primary">{label}</p>
                                </div>
                                {data.hasCondition && data.observation && (
                                    <p className="text-xs text-gray-secondary mt-1 ml-4">{data.observation}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}