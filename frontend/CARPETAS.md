# 📂 Guía de Carpetas - Qué va dónde

## ⚠️ REGLA DE ORO

> **"Una carpeta = Una responsabilidad"**

## 📍 Ubicación de Cada Cosa

### 📄 `src/pages/` - PÁGINAS COMPLETAS
**Una página = Una URL completa**

```
Características:
- ✅ Representan una pantalla/ruta completa
- ✅ Se renderiza en el <Outlet /> del Layout
- ✅ Pueden importar componentes
- ✅ Pueden tener estado (useState)
- ✅ Un archivo por ruta

Ejemplos:
├── Home.tsx .................... / (inicio)
├── About.tsx ................... /about
├── Contact.tsx ................. /contact
├── Dashboard.tsx ............... /dashboard
├── Profile.tsx ................. /profile (usuario)
├── Settings.tsx ................ /settings (configuración)
└── NotFound.tsx ................ 404

¿Agregar nueva página?
1. Crea archivo en src/pages/MyPage.tsx
2. Define la ruta en src/router/index.tsx
3. Agrega enlace en Navbar
```

---

### 🧩 `src/components/` - BLOQUES REUTILIZABLES

#### `/components/ui` - Componentes Base
```
Características:
- ✅ Componentes genéricos (Button, Card, Input, etc)
- ✅ No tienen lógica específica de la app
- ✅ Los usas en múltiples páginas
- ✅ Agnosticismo (no saben qué app los usa)
- ✅ Tipados con Props

Ejemplos:
├── Button.tsx .................. Botón genérico
├── Card.tsx .................... Tarjeta genérica
├── Input.tsx ................... Campo de entrada
├── Modal.tsx ................... Modal/diálogo
├── Badge.tsx ................... Etiqueta pequeña
├── Loading.tsx ................. Spinner de carga
├── Alert.tsx ................... Alertas
└── Pagination.tsx .............. Paginación

¿Cuándo crear un componente aquí?
- Si lo usas en 2+ lugares
- Si es genérico (no específico de tu app)
```

#### `/components/layout` - Estructura de Página
```
Características:
- ✅ Componentes que estructuran la página
- ✅ Navbar, Footer, Sidebar, etc
- ✅ Se usan en Layout.tsx
- ✅ Contienen navegación

Ejemplos:
├── Layout.tsx .................. Contenedor principal
├── Navbar.tsx .................. Barra de navegación
├── Footer.tsx .................. Pie de página
├── Sidebar.tsx ................. Barra lateral
└── Header.tsx .................. Encabezado

¿Qué debe estar en Layout?
- Navbar
- Footer
- Barra lateral (si existe)
- <Outlet /> para el contenido
```

#### `/components/dashboard` - Componentes Específicos
```
Características:
- ✅ Componentes específicos de funcionalidades
- ✅ Pueden tener lógica de la app
- ✅ Se usan en 1-2 páginas
- ✅ Relacionados con una función específica

Ejemplos:
├── MealCard.tsx ................ Tarjeta de comida
├── MealForm.tsx ................ Formulario de comida
├── DashboardStats.tsx .......... Estadísticas
├── UserStats.tsx ............... Estadísticas del usuario
├── MealsList.tsx ............... Lista de comidas
└── ProgressChart.tsx ........... Gráfico de progreso

✅ CORRECTO: Usar en dashboard/
❌ INCORRECTO: Usar en /ui
```

---

### 🪝 `src/hooks/` - LÓGICA REUTILIZABLE
**Para usar cuando tu código sea muy usado**

```
Características:
- ✅ Funciones que encapsulan lógica
- ✅ Comienzan con "use"
- ✅ Reutilizables en múltiples componentes
- ✅ Pueden tener estado (useState)
- ✅ Pueden tener efectos (useEffect)

Ejemplos:
├── useMeals.ts ................. Lógica de comidas
├── useAuth.ts .................. Lógica de autenticación
├── useUser.ts .................. Lógica de usuario
└── useForm.ts .................. Lógica de formularios

Ejemplo de hook:
export function useMeals() {
  const [meals, setMeals] = useState([]);
  
  const addMeal = (meal) => { /* ... */ };
  const removeMeal = (id) => { /* ... */ };
  
  return { meals, addMeal, removeMeal };
}

Uso en componente:
function MealsPage() {
  const { meals, addMeal } = useMeals();
  return <div>...</div>;
}
```

---

### 🌐 `src/services/` - LLAMADAS A API
**Funciones para comunicarse con el servidor**

```
Características:
- ✅ Funciones para llamar APIs
- ✅ Centralizan el acceso a datos
- ✅ Reutilizables
- ✅ Fáciles de testear

Ejemplos:
├── mealsService.ts ............ CRUD de comidas
├── authService.ts ............ Autenticación
├── userService.ts ............ Operaciones de usuario
└── apiClient.ts .............. Cliente HTTP base

Ejemplo:
// src/services/mealsService.ts
export async function getMeals() {
  const response = await fetch('/api/meals');
  return await response.json();
}

Uso en componente:
// src/pages/Meals.tsx
const meals = await getMeals();
```

---

### 🏪 `src/store/` - ESTADO GLOBAL
**Para datos compartidos entre componentes**

```
Características:
- ✅ Estado global (zustand, Redux, Context)
- ✅ Para datos usados en múltiples páginas
- ✅ Persistente entre rutas
- ✅ Centralizados

Ejemplos:
├── mealStore.ts ............... Estado de comidas
├── userStore.ts ............... Estado del usuario
└── authStore.ts ............... Estado de autenticación

Ejemplo con zustand:
// src/store/mealStore.ts
import { create } from 'zustand';

export const useMealStore = create((set) => ({
  meals: [],
  addMeal: (meal) => set(state => ({
    meals: [...state.meals, meal]
  }))
}));

Uso en componente:
function MealsPage() {
  const meals = useMealStore(state => state.meals);
  return <div>{meals}</div>;
}
```

---

### 📝 `src/types/` - TIPOS TYPESCRIPT
**Definiciones de tipos reutilizables**

```
Características:
- ✅ Interfaces para objetos
- ✅ Tipos comunes de la app
- ✅ Evita repetir tipos
- ✅ Tipado centralizado

Ejemplos:
├── meal.ts .................... Tipos relacionados a comidas
├── user.ts .................... Tipos de usuario
└── api.ts ..................... Tipos de respuestas API

Ejemplo:
// src/types/meal.ts
export interface Meal {
  id: number;
  name: string;
  calories: number;
  date: Date;
}

// Importar donde sea necesario
import type { Meal } from '@/types/meal';
```

---

### 🛣️ `src/router/` - CONFIGURACIÓN DE RUTAS
**Define cómo se navega entre páginas**

```
src/router/
└── index.tsx .................. Todas las rutas

Estructura:
{
  path: '/',
  element: <Layout />,
  children: [
    { index: true, element: <Home /> },
    { path: 'about', element: <About /> },
    { path: 'contact', element: <Contact /> },
  ]
}

Notas:
- ✅ Centralizado en un solo archivo
- ✅ Fácil de mantener
- ✅ Rápido de ver todas las rutas
```

---

## 🚫 ¿DÓNDE NO PONER COSAS?

```
❌ NO poner componentes en /pages
   - /pages es solo para PÁGINAS COMPLETAS
   - Los componentes van en /components

❌ NO poner lógica en componentes
   - Si repites lógica, crea un hook
   - Si llamas APIs, usa /services

❌ NO poner tipos en componentes
   - Los tipos van en /types
   - Úsalos en múltiples archivos

❌ NO usar estado global para todo
   - Solo para datos compartidos
   - Estado local es más eficiente
```

---

## 🎯 Resumen Rápido

| Carpeta | Qué va | Características |
|---------|--------|-----------------|
| `/pages` | Páginas completas | 1 página = 1 URL |
| `/components/ui` | Componentes base | Reutilizables, genéricos |
| `/components/layout` | Estructura | Navbar, Footer |
| `/components/dashboard` | Componentes específicos | Lógica de funcionalidad |
| `/hooks` | Lógica reutilizable | Hooks personalizados |
| `/services` | APIs | Llamadas a servidor |
| `/store` | Estado global | Datos compartidos |
| `/types` | Tipos | Interfaces TypeScript |
| `/router` | Rutas | Configuración de navegación |

---

## 📊 Diagrama de Importes

```
App.tsx
  ├─ router/index.tsx
  │   ├─ pages/Home.tsx
  │   ├─ pages/About.tsx
  │   └─ components/layout/Layout.tsx
  │
pages/Home.tsx
  ├─ components/ui/Button.tsx
  ├─ components/ui/Card.tsx
  └─ components/dashboard/MealCard.tsx
  
components/
  ├─ ui/Button.tsx
  │   └─ (sin dependencias)
  ├─ dashboard/MealForm.tsx
  │   ├─ ui/Button.tsx
  │   ├─ ui/Input.tsx
  │   └─ hooks/useForm.ts
  │
hooks/useForm.ts
  └─ types/form.ts

services/mealService.ts
  └─ types/meal.ts

store/mealStore.ts
  └─ services/mealService.ts
```

---

## ✅ Checklist para el código

Cuando hagas algo nuevo, pregúntate:

```
¿Dónde va este archivo?

1. ¿Es una página completa con URL?
   → /pages

2. ¿Es un componente pequeño que reutilizo?
   → /components/ui (si es genérico)
   → /components/dashboard (si es específico)

3. ¿Es una función que reutilizo?
   → /hooks (si usa estado/efectos)
   → /services (si llama API)

4. ¿Es un tipo TypeScript?
   → /types

5. ¿Es estado global?
   → /store

6. ¿Es configuración de rutas?
   → /router
```

---

**¡Recuerda: Orden = Código limpio y fácil de mantener!** 🎯
