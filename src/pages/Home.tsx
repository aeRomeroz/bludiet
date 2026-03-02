import { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { UtensilsCrossedIcon } from 'lucide-react';
import TableComponent from '../components/ui/TableComponent';
import { dummyPatients } from '../constants/patients';
import type { Patient } from '../types/patients';
import type { DietSetupData } from '../types/diet';
import PatientCreateModal from '../components/dashboard/patients/PatientCreateModal';
import DietSetupModal from '../components/dashboard/diets/DietSetupModal';

/**
 * Home Page - Página de inicio
 * 
 * Muestra un ejemplo de cómo usar componentes reutilizables
 * en lugar de escribir el código cada vez
 */

export default function Home() {
  const [name] = useState('Dietista');
  const [patients, setPatients] = useState<Patient[]>(dummyPatients);
  const [diets, setDiets] = useState<DietSetupData[]>([]);

  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isDietModalOpen, setIsDietModalOpen] = useState(false);
  
  const headers = ['PACIENTE', 'ESTADO', 'ULTIMA ACCIÓN', 'FECHA'];

  
  const handleAddPatient = (newPatient: Patient) => {
    setPatients((prev) => [newPatient, ...prev]);
  };

  const handleCreateDiet = (newDiet: DietSetupData) => {
    setDiets((prev) => [newDiet, ...prev]);
    // fetch a la API en un futuro
    console.log("Dieta guardada en el estado:", newDiet);
  };

  const features = [
    {
      title: 'Pacientes totales',
      value: patients.length,
      description: '+0% desde el último mes',
      icon: (
        <div className="flex items-center justify-center rounded-lg bg-blue-brand/20 p-4 shrink-0">
          <UserGroupIcon className="text-blue-brand h-8 w-8" />
        </div>
      )
    },
    {
      title: 'Dietas Activas',
      value: diets.length > 0 ? diets.length : 12,
      description: '+4% desde el último mes',
      icon: (
        <div className="flex items-center justify-center rounded-lg bg-green-brand/20 p-4 shrink-0">
          <UtensilsCrossedIcon className="text-green-brand h-8 w-8 fill-green-brand" fill="currentColor"/>
        </div>
      )
    },
    {
      title: 'Pacientes Por Revisar',
      value: patients.filter(p => p.status === 'REVIEW').length,
      description: '+0% desde el último mes',
      icon: (
        <div className="flex items-center justify-center rounded-lg bg-yellow-warning/20 p-4 shrink-0">
          <ExclamationCircleIcon className="text-yellow-warning h-8 w-8" />
        </div>
      )
    },
  ];


  return (
    <div className="space-y-12">
      <div className='flex justify-between items-center'>
        <div>
          <h1 className="text-black-primary font-serif text-4xl font-bold mb-1">¡Buen día, {name}!</ h1>
          <span className='text-gray-primary'>Accede a tus dietas y pacientes más recientes facilmente!</span>
        </div>

        <div className='flex gap-4'>
          <Button variant="primary" className='flex items-center gap-3' onClick={()=>{setIsPatientModalOpen(true)}}> <PlusIcon className='text-green-brand h-5 w-5'/> Paciente</Button>
          <Button variant="primary" className='flex items-center gap-3' onClick={()=>{setIsDietModalOpen(true)}}> <PlusIcon className='text-blue-brand h-5 w-5'/> Dieta</Button>
        </div>
      </div>

      {/* ATAJOS */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} title={feature.title} value={feature.value} icon={feature.icon}>
              <p className="text-gray-secondary">{feature.description}</p>
              <Button
                variant="primary"
                size="small"
                className="mt-4 w-full"
                onClick={() => alert(`Clicked: ${feature.title}`)}
              >
                Saber más
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <TableComponent title="Actividad de Pacientes Reciente" buttonText="Ver todos" buttonRoute="/pacientes" headers={headers} data={patients}/>
      <PatientCreateModal 
        isOpen={isPatientModalOpen} 
        onClose={() => setIsPatientModalOpen(false)}
        onPatientCreate={handleAddPatient} 
      />
      
      <DietSetupModal 
        isOpen={isDietModalOpen} 
        onClose={() => setIsDietModalOpen(false)}
        patients={patients}
        onDietCreate={handleCreateDiet}
      />

      {/* SECCIÓN CTA */}
      <section className="text-center py-12 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">¿Listo para transformar tu vida?</h2>
        <p className="text-gray-600 mb-6">
          Únete a miles de personas que ya están mejorando su salud
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button variant="primary">Crear Cuenta</Button>
          <Button variant="secondary">Aprender Más</Button>
        </div>
      </section>
    </div>
  );
}