# 📚 Guía de Estructura de Proyecto BluDiet

## 🎯 Conceptos Clave

### 1. **App.tsx** - Punto de entrada de la aplicación
El archivo `App.tsx` es el componente raíz. Aquí inicializamos **React Router** para que maneje la navegación entre páginas.

```
App.tsx
  └─→ RouterProvider (inicia el sistema de rutas)
      └─→ Layout (contenedor común para todas las páginas)
          ├─→ Navbar (componente en el Layout)
          ├─→ <Outlet /> (aquí se renderiza el contenido de cada página)
          └─→ Footer (componente en el Layout)
```

### 2. **Carpeta `/router`** - Configuración de rutas
Define todas las URLs y qué componente mostrar en cada una.

**Archivo: `src/router/index.tsx`**
- Define las rutas de la aplicación
- Importa las páginas y el Layout
- `path`: URL de la ruta ('/', '/about', '/contact')
- `element`: Qué componente renderizar
- `children`: Rutas anidadas

**Ejemplo:**
```tsx
{
  path: '/about',
  element: <About />
}
```

### 3. **Carpeta `/pages`** - Páginas completas
Las **páginas** representan pantallas completas de tu aplicación.

**Regla de oro:** Una página ≈ Una URL completa

Archivos:
- `Home.tsx` - Página de inicio
- `About.tsx` - Página de información
- `Contact.tsx` - Página de contacto

Cada página es un componente que se renderiza dentro del `<Outlet />` del Layout.

### 4. **Carpeta `/components`** - Componentes reutilizables
Aquí van los **bloques de construcción** que usas en múltiples lugares.

#### `/components/ui`
Componentes base sin lógica específica de la app:
- `Button.tsx` - Botón personalizado
- `Card.tsx` - Tarjeta reutilizable
- `Input.tsx` - Campo de entrada
- etc.

#### `/components/layout`
Componentes que estructuran la página:
- `Layout.tsx` - Contenedor principal (Navbar + Outlet + Footer)
- `Navbar.tsx` - Barra de navegación
- `Footer.tsx` - Pie de página

#### `/components/dashboard`
Componentes específicos de funcionalidades:
- `DashboardStats.tsx` - Estadísticas
- `MealCard.tsx` - Tarjeta de comida
- etc.

## 🔄 Flujo de navegación

```
Usuario hace clic en "/about"
  ↓
React Router detecta el cambio de ruta
  ↓
Renderiza el componente About.tsx
  ↓
Layout mantiene Navbar y Footer intactos
  ↓
Solo cambia el contenido del <Outlet />
```

## 💡 Cómo crear una nueva página

### Paso 1: Crear el archivo de página
Archivo: `src/pages/Profile.tsx`

```tsx
export default function Profile() {
  return (
    <div>
      <h1>Mi Perfil</h1>
      <p>Contenido del perfil...</p>
    </div>
  );
}
```

### Paso 2: Importar en el router
Archivo: `src/router/index.tsx`

```tsx
import Profile from '../pages/Profile';

// Dentro del array de routes:
{
  path: 'profile',
  element: <Profile />,
}
```

### Paso 3: Agregar enlace en el Navbar
Archivo: `src/components/layout/Layout.tsx`

```tsx
<a href="/profile" className="hover:underline">Perfil</a>
```

¡Listo! La nueva página está accesible en `/profile`

## 🧩 Cómo crear un componente reutilizable

### Ejemplo: Componente de comida

**Archivo: `src/components/dashboard/MealCard.tsx`**

```tsx
interface MealCardProps {
  name: string;
  calories: number;
  image: string;
}

export default function MealCard({ name, calories, image }: MealCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-bold mt-2">{name}</h3>
      <p className="text-sm text-gray-600">{calories} calorías</p>
    </div>
  );
}
```

**Uso en una página:**

```tsx
import MealCard from '../components/dashboard/MealCard';

export default function MealsPage() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <MealCard name="Ensalada" calories={150} image="..." />
      <MealCard name="Pollo" calories={300} image="..." />
      <MealCard name="Arroz" calories={200} image="..." />
    </div>
  );
}
```

## 📁 Estructura actual del proyecto

```
src/
├── App.tsx                    ← Componente raíz
├── main.tsx                   ← Punto de entrada
├── App.css
├── index.css
│
├── router/
│   └── index.tsx             ← Configuración de rutas
│
├── pages/                     ← Páginas completas
│   ├── Home.tsx
│   ├── About.tsx
│   └── Contact.tsx
│
├── components/
│   ├── layout/
│   │   └── Layout.tsx        ← Contenedor principal
│   ├── ui/
│   │   ├── Button.tsx        ← Componente reutilizable
│   │   └── Card.tsx          ← Componente reutilizable
│   └── dashboard/            ← Componentes específicos (futuro)
│
├── hooks/                     ← Hooks personalizados (futuro)
├── lib/                       ← Funciones utilitarias (futuro)
├── services/                  ← Llamadas a APIs (futuro)
├── store/                     ← Estado global (futuro)
└── types/                     ← Tipos TypeScript (futuro)
```

## ✅ Checklist de buenas prácticas

- ✅ Las páginas van en `/pages`
- ✅ Los componentes reutilizables van en `/components`
- ✅ Las rutas se definen en `/router/index.tsx`
- ✅ El Layout contiene elementos comunes (Navbar, Footer)
- ✅ Cada componente tiene comentarios explicativos
- ✅ Los componentes reciben props con tipado
- ✅ No repites código (extrae a componentes)
- ✅ Las URLs son navegables desde el Navbar

## 🚀 Próximos pasos

1. **Estado global:** Aprende sobre `zustand` o `Redux`
2. **Llamadas a API:** Crea en `/services` funciones para llamar APIs
3. **Hooks personalizados:** En `/hooks` crea lógica reutilizable
4. **Autenticación:** Implementa login/logout
5. **Protected Routes:** Rutas que solo usuarios autenticados ven

## 📝 Comandos útiles

```bash
# Iniciar desarrollo
npm run dev

# Compilar para producción
npm run build

# Preview de la build
npm run preview

# Linter
npm run lint
```

---

**¡Felicidades!** 🎉 Ya tienes una estructura profesional y escalable para tu proyecto.
