# 🏗️ ARQUITECTURA DE LA APLICACIÓN

## Flujo de datos y navegación

```
┌─────────────────────────────────────────────────────────────┐
│                        main.tsx                             │
│                 (Punto de entrada)                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                       App.tsx                               │
│              (Componente raíz, inicia Router)               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              RouterProvider (react-router)                  │
│         (Maneja la navegación entre páginas)                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Layout (src/components/layout)                 │
│         (Contenedor que envuelve todas las páginas)         │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Navbar (navegación)                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  <Outlet /> ← Aquí se renderiza el contenido        │  │
│  │             de cada página                          │  │
│  │                                                      │  │
│  │  Puede ser: Home | About | Contact | etc.           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Footer (pie de página)                       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Estructura de Carpetas

```
src/
│
├─ App.tsx ................................. Componente raíz
├─ main.tsx ................................ Punto de entrada
│
├─ router/
│  └─ index.tsx ........................... Configuración de rutas
│
├─ pages/ ................................. PÁGINAS (1 página = 1 URL)
│  ├─ Home.tsx ........................... /
│  ├─ About.tsx .......................... /about
│  └─ Contact.tsx ........................ /contact
│
├─ components/ ............................ COMPONENTES REUTILIZABLES
│  │
│  ├─ layout/ ............................ Estructura de la página
│  │  └─ Layout.tsx ..................... Contenedor principal
│  │
│  ├─ ui/ ................................ Componentes base
│  │  ├─ Button.tsx ..................... Botón reutilizable
│  │  ├─ Card.tsx ....................... Tarjeta reutilizable
│  │  └─ Input.tsx ...................... Campo de entrada (futuro)
│  │
│  └─ dashboard/ ......................... Componentes específicos
│     ├─ MealCard.tsx ................... Tarjeta de comida
│     ├─ DashboardStats.tsx ............ Estadísticas
│     └─ MealForm.tsx .................. Formulario de comida
│
├─ hooks/ ................................. Lógica reutilizable (futuro)
│  ├─ useMeals.ts ........................ Hook para manejar comidas
│  └─ useAuth.ts ........................ Hook para autenticación
│
├─ services/ ............................. Llamadas a API (futuro)
│  ├─ mealsService.ts .................. Operaciones con comidas
│  └─ authService.ts ................... Operaciones de autenticación
│
├─ store/ ............................... Estado global (futuro)
│  └─ mealStore.ts ..................... Estado de comidas
│
└─ types/ ............................... Tipos TypeScript (futuro)
   └─ meal.ts ........................... Tipos para comidas
```

## Flujo de Datos Completo

### Escenario: Usuario navega a `/contact`

```
1. Usuario hace clic en enlace
   └─> <a href="/contact">Contacto</a>

2. React Router detecta el cambio
   └─> createBrowserRouter ve path: 'contact'

3. Renderiza el componente Contact
   └─> Layout mantiene Navbar + Footer intactos
   └─> <Outlet /> se reemplaza con <Contact />

4. Página Contact se renderiza
   ├─> Importa componentes si es necesario
   ├─> Usa estados (useState) si tiene formulario
   └─> Maneja eventos (onClick, onChange, etc)

5. Usuario interactúa con la página
   └─> Estados se actualizan
   └─> React re-renderiza la página

6. Usuario hace clic en otro enlace
   └─> Vuelve al paso 1
```

## Ejemplo Real: Página de Dashboard

```
Dashboard.tsx (PÁGINA)
│
├─ Layout (contenedor)
│  ├─ Navbar
│  ├─ <Outlet /> → tu contenido aquí
│  └─ Footer
│
└─ Contenido de Dashboard
   │
   ├─ InfoBox (componente reutilizable)
   │  └─ Muestra estadísticas
   │
   ├─ InfoBox (componente reutilizable)
   │  └─ Muestra más estadísticas
   │
   ├─ MealForm (componente de dashboard)
   │  └─ Formulario para agregar comida
   │
   └─ MealsList (componente de dashboard)
      ├─ MealCard (componente reutilizable)
      ├─ MealCard (componente reutilizable)
      └─ MealCard (componente reutilizable)
```

## Estados y Props

```
Dashboard.tsx
│
├─ Estado: meals (lista de comidas)
│  └─ Guardado con useState
│  └─ Se actualiza cuando usuario agrega comida
│  └─ Se pasa a MealsList como prop
│
├─ Como Props:
│  ├─ MealsList recibe meals={meals}
│  │  └─ MealCard recibe meal={meal}
│  │
│  └─ InfoBox recibe value={meals.length}
```

## Flujo de Navegación

```
usuario visita "/"
    ▼
Router renderiza Home
    ▼
Home se muestra
    ▼
Usuario ve Navbar
    ▼
Usuario hace clic "/about"
    ▼
Router renderiza About
    ▼
About se muestra (Navbar sigue visible!)
    ▼
Usuario hace clic "/contact"
    ▼
Router renderiza Contact
    ▼
Contact se muestra (Navbar sigue visible!)
```

## Componentes vs Páginas

```
PÁGINAS (src/pages/)
├─ Son grandes
├─ Representan una URL completa
├─ Solo una por ruta
├─ Pueden contener múltiples componentes
├─ Ej: Home.tsx, About.tsx, Contact.tsx

COMPONENTES (src/components/)
├─ Son pequeños
├─ Reutilizables
├─ Múltiples en una página
├─ Sin URL propia
├─ Ej: Button, Card, MealCard
```

## Agregando una Nueva Página

```
1. Crear archivo
   src/pages/NewPage.tsx

2. Importar en router
   import NewPage from '../pages/NewPage';

3. Agregar ruta
   {
     path: 'newpage',
     element: <NewPage />,
   }

4. Agregar enlace en Navbar
   <a href="/newpage">New Page</a>

5. ¡Listo!
```

## Agregando un Nuevo Componente

```
1. Crear archivo
   src/components/ui/NewComponent.tsx
   
   interface Props {
     title: string;
   }
   
   export default function NewComponent({ title }: Props) {
     return <div>{title}</div>;
   }

2. Importar donde lo necesites
   import NewComponent from '../components/ui/NewComponent';

3. Usarlo
   <NewComponent title="Hola" />

4. ¡Hecho!
```

## Mejores Prácticas

```
✅ BIEN                          ❌ MAL
├─ Arquitectura clara            ├─ Todo en App.tsx
├─ Componentes pequeños          ├─ Componentes gigantes
├─ Props bien tipadas            ├─ Cualquier tipo de dato
├─ Nombres descriptivos          ├─ Nombres genéricos
├─ Reutilizar componentes        ├─ Copiar/pegar código
├─ Rutas organizadas             ├─ Rutas desordenadas
├─ Pages separadas de components ├─ Todo mezclado
└─ Una responsabilidad por comp. └─ Múltiples responsabilidades
```

---

¡Con esta arquitectura tu código será ordenado, escalable y fácil de mantener! 🚀
