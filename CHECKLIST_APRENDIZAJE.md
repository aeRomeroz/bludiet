# 🚀 CHECKLIST DE APRENDIZAJE - Paso a Paso

## Fase 1️⃣: Entender la estructura (HECHO)

- [x] Instalamos React Router
- [x] Creamos carpeta `/router` con `index.tsx`
- [x] Entendemos qué es un Layout
- [x] Creamos páginas en `/pages`
- [x] Entendemos qué son componentes reutilizables

## Fase 2️⃣: Práctica Básica (TU TURNO)

### Tarea 1: Navega por las páginas
```bash
npm run dev
```
- [ ] Abre http://localhost:5173
- [ ] Haz clic en "Inicio" (Home)
- [ ] Haz clic en "About"
- [ ] Haz clic en "Contacto"
- [ ] Las URLs deben cambiar (/about, /contact)
- [ ] El Navbar y Footer deben permanecer

### Tarea 2: Modifica Home.tsx
- [ ] Cambia el título
- [ ] Agrega más tarjetas de características
- [ ] Modifica los colores de los botones

### Tarea 3: Crea una nueva página
1. [ ] Crea `src/pages/Goals.tsx`
   ```tsx
   export default function Goals() {
     return <div>
       <h1>Mis Objetivos</h1>
       <p>Aquí irán tus objetivos...</p>
     </div>;
   }
   ```
2. [ ] Importa en `src/router/index.tsx`
3. [ ] Agrega la ruta:
   ```tsx
   {
     path: 'goals',
     element: <Goals />,
   }
   ```
4. [ ] Agrega el enlace en el Navbar (Layout.tsx)
5. [ ] Prueba haciendo clic

## Fase 3️⃣: Componentes Reutilizables

### Tarea 4: Usa Button y Card
- [ ] En Home.tsx, importa Button y Card
- [ ] Reemplaza todos los `<button>` con `<Button>`
- [ ] Reemplaza los `<div>` de tarjetas con `<Card>`

### Tarea 5: Crea tu primer componente
1. [ ] Crea `src/components/ui/Badge.tsx`:
   ```tsx
   interface BadgeProps {
     label: string;
     color?: 'green' | 'blue' | 'red';
   }

   export default function Badge({ label, color = 'blue' }: BadgeProps) {
     const colors = {
       green: 'bg-green-100 text-green-800',
       blue: 'bg-blue-100 text-blue-800',
       red: 'bg-red-100 text-red-800',
     };
     
     return (
       <span className={`px-3 py-1 rounded-full ${colors[color]}`}>
         {label}
       </span>
     );
   }
   ```
2. [ ] Importa en una página
3. [ ] Usa:
   ```tsx
   <Badge label="Nuevo" color="green" />
   <Badge label="Popular" color="blue" />
   ```

## Fase 4️⃣: Estado (useState)

### Tarea 6: Agrega contador en Home
1. [ ] En Home.tsx importa useState:
   ```tsx
   import { useState } from 'react';
   ```
2. [ ] Agrega componente:
   ```tsx
   export default function Home() {
     const [count, setCount] = useState(0);
     
     return (
       <div>
         <p>Has hacido clic {count} veces</p>
         <Button onClick={() => setCount(count + 1)}>
           Incrementar
         </Button>
       </div>
     );
   }
   ```
3. [ ] Prueba hacer clic en el botón

### Tarea 7: Formulario en Contact
Contact.tsx ya tiene un formulario (¡lo hicimos por ti!)
- [ ] Abre Contact.tsx
- [ ] Entiende cómo funciona:
  - `useState` para guardar datos
  - `onChange` para actualizar estado
  - `onSubmit` para manejar el envío
- [ ] ¡Modifica los campos del formulario!

## Fase 5️⃣: Listas (map)

### Tarea 8: Crea página de productos
1. [ ] Crea `src/pages/Products.tsx`:
   ```tsx
   interface Product {
     id: number;
     name: string;
     price: number;
   }

   export default function Products() {
     const products: Product[] = [
       { id: 1, name: 'Producto A', price: 100 },
       { id: 2, name: 'Producto B', price: 200 },
       { id: 3, name: 'Producto C', price: 150 },
     ];

     return (
       <div className="grid grid-cols-3 gap-4">
         {products.map((product) => (
           <Card key={product.id} title={product.name}>
             <p className="text-2xl font-bold">${product.price}</p>
             <Button>Comprar</Button>
           </Card>
         ))}
       </div>
     );
   }
   ```
2. [ ] Agrega la ruta en router
3. [ ] Agrega el enlace en Navbar

## Fase 6️⃣: Condicionales

### Tarea 9: Página con lógica
1. [ ] Crea `src/pages/Status.tsx`:
   ```tsx
   import { useState } from 'react';

   export default function Status() {
     const [isLoggedIn, setIsLoggedIn] = useState(false);

     return (
       <div>
         {isLoggedIn ? (
           <>
             <p>¡Bienvenido!</p>
             <Button 
               onClick={() => setIsLoggedIn(false)}
               variant="danger"
             >
               Cerrar Sesión
             </Button>
           </>
         ) : (
           <>
             <p>Por favor, inicia sesión</p>
             <Button 
               onClick={() => setIsLoggedIn(true)}
             >
               Iniciar Sesión
             </Button>
           </>
         )}
       </div>
     );
   }
   ```
2. [ ] Agrega esta página al router
3. [ ] Agrega enlace en Navbar

## Fase 7️⃣: Componentes que reciben Props

### Tarea 10: Crea WelcomeCard
1. [ ] Crea `src/components/ui/WelcomeCard.tsx`:
   ```tsx
   interface WelcomeCardProps {
     userName: string;
     message: string;
   }

   export default function WelcomeCard({ userName, message }: WelcomeCardProps) {
     return (
       <Card title={`¡Bienvenido, ${userName}!`}>
         <p>{message}</p>
       </Card>
     );
   }
   ```
2. [ ] Úsalo en Home:
   ```tsx
   <WelcomeCard 
     userName="Juan" 
     message="Hoy es un gran día para comenzar"
   />
   ```

## Fase 8️⃣: Mini Proyecto (Reto)

### Proyecto: Gestor de Tareas

Crea una página con:
- [x] Título "Mi Lista de Tareas"
- [ ] Formulario para agregar tareas
- [ ] Lista de tareas que se muestra
- [ ] Botón para marcar como completa
- [ ] Botón para eliminar tarea

**Hints:**
```tsx
// estructura básica
export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    // agregar tarea
  };

  const deleteTask = (id: number) => {
    // eliminar tarea
  };

  return (
    // tu JSX aquí
  );
}
```

## Fase 9️⃣: Próximas Habilidades (Cuando ya domines esto)

- [ ] APIs: Aprender `fetch` para traer datos del servidor
- [ ] useEffect: Para ejecutar código cuando carga la página
- [ ] Context API: Para compartir estado entre componentes
- [ ] Custom Hooks: Para crear lógica reutilizable
- [ ] TypeScript: Tipado más avanzado
- [ ] Testing: Escribir pruebas para tu código

## 🎓 Conceptos Clave por Entender

### React Basics
- [ ] Entiendo qué es un componente
- [ ] Entiendo qué son props
- [ ] Entiendo qué es estado (useState)
- [ ] Entiendo qué es JSX

### Routing
- [ ] Entiendo cómo funcionan las rutas
- [ ] Entiendo qué es un Layout
- [ ] Sé cómo crear nuevas rutas
- [ ] Sé cómo crear nuevas páginas

### Componentes
- [ ] Sé la diferencia entre página y componente
- [ ] Puedo crear componentes reutilizables
- [ ] Paso props correctamente
- [ ] Recibo props con TypeScript

### Estilos
- [ ] Entiendo Tailwind CSS
- [ ] Puedo hacer un layout responsivo
- [ ] Sé usar clases Tailwind comunes

## 📚 Archivos que Creamos para ti

```
src/
├── router/index.tsx ............ Configuración de rutas ✅
├── pages/
│   ├── Home.tsx ............... Página de inicio ✅
│   ├── About.tsx .............. Página info ✅
│   └── Contact.tsx ............ Con formulario ✅
└── components/
    ├── layout/Layout.tsx ...... Navbar + Footer ✅
    ├── ui/Button.tsx .......... Botón reutilizable ✅
    └── ui/Card.tsx ............ Tarjeta reutilizable ✅

DOCS:
├── ESTRUCTURA.md ............... Guía de arquitectura
├── ARQUITECTURA.md ............ Diagramas visuales
└── EJEMPLOS_PATRONES.tsx ...... Código de ejemplo
```

## 🎯 Tu Próximo Paso

1. Abre Terminal en VS Code
2. Ejecuta: `npm run dev`
3. Abre: http://localhost:5173
4. Comienza con **Tarea 1** del Checklist
5. ¡Diviértete aprendiendo! 🎉

---

### 🆘 Si algo no funciona:

1. Verifica los nombres de archivo (case-sensitive)
2. Verifica los imports (¿están correctos?)
3. Abre la consola del navegador (F12)
4. Le el error que aparece
5. Busca el error en Google o ChatGPT

### 💡 Pro Tips:

- El hot reload hace que los cambios aparezcan instantáneamente
- Usa las DevTools de React (extensión del navegador)
- Lee los comentarios en el código
- No tengas miedo de experimentar
- Lo importante es entender **por qué** funciona

¡Eres capaz de esto! 🚀
