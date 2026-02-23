# 📱 BluDiet - Guía de Inicio Rápido

## ¿Qué se hizo?

Se configuró un proyecto profesional de **React + TypeScript + Vite** con:

✅ **React Router** - Navegación entre páginas  
✅ **Layout Base** - Navbar y Footer compartidos  
✅ **3 Páginas de ejemplo** - Home, About, Contact  
✅ **Componentes reutilizables** - Button, Card  
✅ **Documentación completa** - Guías paso a paso  
✅ **Ejemplos prácticos** - Patrones comunes  

## 🚀 Primeros Pasos

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar desarrollo
```bash
npm run dev
```

La app se abre en: **http://localhost:5173**

### 3. Explorar el proyecto

Navega por:
- 🏠 **Home** - Página principal
- ℹ️ **About** - Información
- 📧 **Contact** - Formulario

## 📚 Documentación

Hemos creado 4 archivos de documentación:

| Archivo | Descripción |
|---------|------------|
| **ESTRUCTURA.md** | 📖 Explicación de carpetas y conceptos clave |
| **ARQUITECTURA.md** | 🏗️ Diagramas y flujos de datos |
| **EJEMPLOS_PATRONES.tsx** | 💡 Código de ejemplo con patrones comunes |
| **CHECKLIST_APRENDIZAJE.md** | ✅ Plan paso a paso para aprender |

## 🎯 Tu Ruta de Aprendizaje

1. **Lee ESTRUCTURA.md** - Entiende las carpetas
2. **Lee ARQUITECTURA.md** - Entiende el flujo
3. **Sigue CHECKLIST_APRENDIZAJE.md** - Aprende haciendo
4. **Consulta EJEMPLOS_PATRONES.tsx** - Cuando necesites código

## 📁 Estructura del Proyecto

```
src/
├── App.tsx                         ← Componente raíz
├── router/
│   └── index.tsx                  ← Rutas de la app
├── pages/                          ← Páginas (1 = 1 URL)
│   ├── Home.tsx
│   ├── About.tsx
│   └── Contact.tsx
└── components/
    ├── layout/
    │   └── Layout.tsx             ← Navbar + Footer
    └── ui/
        ├── Button.tsx             ← Botón reutilizable
        └── Card.tsx               ← Tarjeta reutilizable
```

## 🔑 Conceptos Clave

### **Página** vs **Componente**

**Página** (en `/pages`):
- Una pantalla completa
- Tiene su propia URL
- Se renderiza dentro del Layout

**Componente** (en `/components`):
- Un bloque pequeño reutilizable
- Usado en múltiples lugares
- No tiene URL propia

### **Layout**

El Layout es el "envoltorio" que mantiene:
- Navbar visible en todas las páginas
- Footer visible en todas las páginas
- El contenido varía según la página

```
┌─────────────────────────┐
│      Navbar             │
├─────────────────────────┤
│  Contenido (cambia)     │
├─────────────────────────┤
│      Footer             │
└─────────────────────────┘
```

### **Router**

`src/router/index.tsx` define:
```tsx
path: '/'          → Home.tsx
path: '/about'     → About.tsx
path: '/contact'   → Contact.tsx
```

## 🎓 Principales Tecnologías

| Librería | Para qué |
|----------|----------|
| **React 19** | Framework JS |
| **React Router DOM** | Navegación entre páginas |
| **TypeScript** | Tipado de datos |
| **Tailwind CSS** | Estilos |
| **Vite** | Build tool |

## ✨ Características Principales

### 1. Navegación con React Router
```jsx
// Automáticamente disponible en todas las páginas
<a href="/">Home</a>
<a href="/about">About</a>
<a href="/contact">Contact</a>
```

### 2. Componentes Reutilizables
```jsx
<Button variant="primary">Clickéame</Button>
<Card title="Titulo">Contenido</Card>
```

### 3. Formularios
```jsx
// Contact.tsx ya tiene un formulario de ejemplo
// Puedes modificarlo según tus necesidades
```

## 🛠️ Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview de la build
npm run preview

# Linter (verificar código)
npm run lint
```

## 📊 Próximos Pasos Recomendados

### Si quieres practicar:
1. Sigue el **CHECKLIST_APRENDIZAJE.md**
2. Crea nuevas páginas
3. Crea nuevos componentes
4. Agrega estilos

### Si quieres ir más allá:
1. Aprende **useState** para estado local
2. Aprende **useEffect** para efectos secundarios
3. Aprende **API Calls** para traer datos
4. Aprende **Context API** para estado global

## 🆘 Problemas Comunes

### "No puedo navegar entre páginas"
- Verifica que las rutas estén en `/router/index.tsx`
- Verifica que los imports sean correctos
- Revisa el error en la consola (F12)

### "Los estilos no se aplican"
- Verifica que uses clases de Tailwind correctas
- Prueba con `className` (no `class`)
- Asegúrate de que Tailwind esté en `index.css`

### "Componente no se encuentra"
- Verifica la ruta del import
- Verifica que el archivo exista
- Verifica mayúsculas/minúsculas en nombres

## 📖 Recursos Externos

- [React Docs](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## ✅ checklist Rápido

- [ ] Ejecuté `npm install`
- [ ] Ejecuté `npm run dev`
- [ ] Abrí http://localhost:5173
- [ ] Hice clic en los enlaces de navegación
- [ ] Leí ESTRUCTURA.md
- [ ] Leí ARQUITECTURA.md
- [ ] Empecé con el CHECKLIST_APRENDIZAJE.md

## 🎉 ¡Felicidades!

Tienes todo lo que necesitas para aprender React de forma profesional. 

**Recuerda:** La mejor forma de aprender es **haciendo**. No tengas miedo de experimentar, romper cosas y arreglarlas.

---

**¿Preguntas?** Consulta los archivos de documentación o busca en Google/ChatGPT. La comunidad de React es muy activa y encontrarás respuestas rápidamente.

**¡Mucho éxito! 🚀**
