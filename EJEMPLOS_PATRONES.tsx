/**
 * EJEMPLOS Y PATRONES PRÁCTICOS
 * ==============================
 * 
 * Este archivo muestra patrones comunes que usarás al construir tu aplicación
 */

// ============================================================================
// 1️⃣ COMPONENTE BÁSICO (sin estado)
// ============================================================================

function MealCard() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3>Ensalada César</h3>
      <p>250 calorías</p>
    </div>
  );
}

// ============================================================================
// 2️⃣ COMPONENTE CON PROPS (recibe datos del padre)
// ============================================================================

interface MealCardPropsExample {
  name: string;
  calories: number;
}

function MealCardWithProps({ name, calories }: MealCardPropsExample) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3>{name}</h3>
      <p>{calories} calorías</p>
    </div>
  );
}

// Uso:
// <MealCardWithProps name="Ensalada César" calories={250} />

// ============================================================================
// 3️⃣ COMPONENTE CON ESTADO (useState)
// ============================================================================

import { useState } from 'react';

function MealForm() {
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Nueva comida: ${mealName}, ${calories} calorías`);
    // Aquí guardarías los datos
    setMealName('');
    setCalories('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Nombre de comida</label>
        <input
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
          placeholder="Ej: Ensalada"
        />
      </div>
      <div>
        <label>Calorías</label>
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="Ej: 250"
        />
      </div>
      <button type="submit">Agregar Comida</button>
    </form>
  );
}

// ============================================================================
// 4️⃣ COMPONENTE CON LISTA DE ELEMENTOS
// ============================================================================

interface Meal {
  id: number;
  name: string;
  calories: number;
}

function MealsList() {
  const meals: Meal[] = [
    { id: 1, name: 'Ensalada', calories: 250 },
    { id: 2, name: 'Pollo', calories: 300 },
    { id: 3, name: 'Arroz', calories: 200 },
  ];

  return (
    <div className="space-y-4">
      {meals.map((meal) => (
        <div key={meal.id} className="bg-white p-4 rounded shadow">
          <h3>{meal.name}</h3>
          <p>{meal.calories} calorías</p>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// 5️⃣ COMPONENTE CON CONDICIONALES
// ============================================================================

function MealStatus({ eaten }: { eaten: boolean }) {
  return (
    <div>
      {eaten ? (
        <p className="text-green-500">✓ Ya comiste</p>
      ) : (
        <p className="text-gray-500">○ Pendiente</p>
      )}
    </div>
  );
}

// O usando lógica más compleja:

function MealStatusAdvanced({ caloriesEaten, caloriesGoal }: { caloriesEaten: number; caloriesGoal: number }) {
  const percentage = (caloriesEaten / caloriesGoal) * 100;

  if (percentage < 50) {
    return <p className="text-orange-500">⚠ Necesitas comer más</p>;
  } else if (percentage >= 50 && percentage < 100) {
    return <p className="text-yellow-500">~ En camino</p>;
  } else if (percentage === 100) {
    return <p className="text-green-500">✓ Meta alcanzada</p>;
  } else {
    return <p className="text-red-500">✗ Excediste tu meta</p>;
  }
}

// ============================================================================
// 6️⃣ COMPONENTE REUTILIZABLE (Extrae lógica común)
// ============================================================================

interface InfoBoxProps {
  title: string;
  value: string | number;
  icon: string;
}

function InfoBox({ title, value, icon }: InfoBoxProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

// Uso en diferentes contextos:
// <InfoBox title="Calorías Hoy" value={1500} icon="🍎" />
// <InfoBox title="Proteína" value={120} icon="🥩" />
// <InfoBox title="Agua" value="8 vasos" icon="💧" />

// ============================================================================
// 7️⃣ PÁGINA QUE USA MÚLTIPLES COMPONENTES
// ============================================================================

function DashboardPage() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  const handleAddMeal = (newMeal: Meal) => {
    setMeals([...meals, newMeal]);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <h1 className="text-3xl font-bold">Mi Dashboard</h1>

      {/* Estadísticas */}
      <div className="grid grid-cols-3 gap-4">
        <InfoBox title="Calorías Hoy" value={totalCalories} icon="🍎" />
        <InfoBox title="Comidas" value={meals.length} icon="🍽️" />
        <InfoBox title="Meta" value={2000} icon="🎯" />
      </div>

      {/* Formulario */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Agregar Comida</h2>
        <MealForm />
      </div>

      {/* Lista */}
      <div>
        <h2 className="text-xl font-bold mb-4">Comidas del día</h2>
        {meals.length === 0 ? (
          <p className="text-gray-500">No hay comidas registradas</p>
        ) : (
          <MealsList />
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 8️⃣ MANEJO DE ERRORES Y ESTADOS DE CARGA
// ============================================================================

function DataFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // const response = await fetch('/api/meals');
      // const result = await response.json();
      // setData(result);
      console.log('Datos cargados');
    } catch (err) {
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Cargar datos</button>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && <p>Datos: {JSON.stringify(data)}</p>}
    </div>
  );
}

// ============================================================================
// RESUMEN DE PATRONES
// ============================================================================

/*
✅ PATRONES A RECORDAR:

1. Componentes sin estado: Simples y rápidos
   const Header = () => <div>...</div>

2. Props: Para pasar datos del padre al hijo
   <Card title="Mi Tarjeta" />

3. useState: Para estado local del componente
   const [count, setCount] = useState(0)

4. map(): Para renderizar listas
   {items.map(item => <Item key={item.id} />)}

5. Condicionales: Mostrar/ocultar contenido
   {condition ? <A /> : <B />}

6. Componentes reutilizables: Menos código repetido
   <Button />, <Card />, <Input />

7. Página = Contenedor + Múltiples componentes
   <DashboardPage> usa <Card>, <Button>, etc

8. Async/await: Para llamadas a APIs
   const data = await fetch(...)

9. try/catch: Para manejar errores
   try { /* código */ } catch { /* error */ }

10. useState para formularios
    Guarda datos del formulario en estado local

¡Practica estos patrones y te volverás experto rápidamente! 🚀
*/
