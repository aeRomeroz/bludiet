import { PATIENT_STATUS, type Patient } from "../../../types/patients";
import Toggle from "../../ui/Toggle";

interface EditPatientInfoCardProps {
    patient: Patient;
}

const inputClasses = "w-full bg-white border border-primary-30 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-brand/20 focus:border-blue-brand outline-none transition-all font-sans text-black-primary";
const labelClasses = "text-[10px] font-bold text-gray-primary uppercase tracking-wider mb-1 block";

export default function EditPatientInfoCard({ patient }: EditPatientInfoCardProps) {
    const medicalHistory = patient.medicalHistory;

    return (
        <form id="edit-patient-form" className="bg-white border-2 border-blue-brand/30 rounded-2xl p-6 space-y-6 shadow-sm animate-in fade-in duration-300">
            
            {/* 1. Identidad (Mantiene el Avatar y disposición original) */}
            <div className="flex items-center gap-4">
                {patient.avatarUrl ? (
                    <img src={patient.avatarUrl} className="w-16 h-16 rounded-full object-cover" alt="Avatar" />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-brand/20 flex items-center justify-center text-blue-brand text-xl font-bold shrink-0">
                        {patient.firstName[0]}{patient.lastName[0]}
                    </div>
                )}
                <div className="flex-1 grid grid-cols-2 gap-3">
                    <div>
                        <label className={labelClasses}>Nombre</label>
                        <input name="firstName" defaultValue={patient.firstName} className={inputClasses} />
                    </div>
                    <div>
                        <label className={labelClasses}>Apellidos</label>
                        <input name="lastName" defaultValue={patient.lastName} className={inputClasses} />
                    </div>
                </div>
            </div>

            {/* 2. Datos rápidos (Mismos recuadros, ahora con inputs) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-primary rounded-xl px-4 py-3">
                    <label className={labelClasses}>Nacimiento</label>
                    <input type="date" name="birthDate" defaultValue={patient.birthDate} className={inputClasses} />
                </div>
                <div className="bg-primary rounded-xl px-4 py-3">
                    <label className={labelClasses}>Género</label>
                    <select name="gender" defaultValue={patient.gender} className={inputClasses}>
                        <option value="Male">Masculino</option>
                        <option value="Female">Femenino</option>
                    </select>
                </div>
                <div className="bg-primary rounded-xl px-4 py-3">
                    <label className={labelClasses}>Estado</label>
                    <select name="status" defaultValue={patient.status} className={inputClasses}>
                        <option value="ACTIVE">Activo</option>
                        <option value="PENDING">Pendiente</option>
                        <option value="REVIEW">Revisión</option>
                    </select>
                </div>
                <div className="bg-primary rounded-xl px-4 py-3">
                    <label className={labelClasses}>Ocupación</label>
                    <input name="occupation" defaultValue={patient.occupation} className={inputClasses} />
                </div>
            </div>

            {/* 3. Motivo de consulta */}
            <div>
                <label className={labelClasses}>Motivo de consulta</label>
                <textarea
                    name="consultationReason"
                    defaultValue={patient.consultationReason}
                    rows={2}
                    className={`${inputClasses} resize-none`}
                />
            </div>

            {/* 4. Historial médico con Headless UI Switch */}
            {medicalHistory && (
                <div>
                    <p className="text-xs font-bold text-gray-primary uppercase tracking-wider mb-3">Historial médico</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
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
                                <div key={item.id} className="rounded-xl px-4 py-3 border border-primary-30 bg-primary/40 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-medium text-black-primary">{item.label}</p>
                                        
                                        {/* El nuevo Toggle de Headless UI */}
                                        <Toggle 
                                            name={`${item.id}.hasCondition`} 
                                            defaultChecked={data?.hasCondition} 
                                        />
                                    </div>
                                    
                                    <input
                                        type="text"
                                        name={`${item.id}.observation`}
                                        defaultValue={data?.observation}
                                        placeholder="Observación..."
                                        className="w-full bg-white/70 border-none rounded px-2 py-0.5 text-[11px] outline-none focus:ring-1 focus:ring-blue-brand/50"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </form>
    );
}