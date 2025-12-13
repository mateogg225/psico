# 🎨 Psico Isla - Frontend

Frontend de la plataforma gamificada para aprender psicología, construido con **React**, **Vite**, **Material-UI** y **React Router**.

---

## 📁 Estructura del Proyecto

```
frontend/
├── 📄 index.html           # HTML principal
├── 📄 package.json         # Dependencias npm
├── 📄 vite.config.js       # Configuración Vite
├── 📄 eslint.config.js     # Reglas de linting
├── 📂 public/              # Archivos estáticos
├── 📂 src/
│   ├── 📄 main.jsx         # Entry point de React
│   ├── 📄 App.jsx          # Componente principal
│   ├── 📄 index.css        # Estilos globales
│   ├── 📂 components/      # Componentes reutilizables
│   ├── 📂 pages/           # Páginas/Vistas
│   ├── 📂 assets/          # Imágenes, íconos, etc.
│   ├── 📂 services/        # API calls al backend
│   └── 📂 context/         # Context API para estado global
└── 📂 node_modules/        # Dependencias (NO commitear)
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js** 18+ y **npm** instalados
- Git configurado

### 1️⃣ Clonar el Repositorio

```bash
# Clonar el proyecto
git clone https://github.com/mateogg225/psico.git
cd psico/frontend
```

### 2️⃣ Instalar Dependencias

```bash
# Instalar todos los paquetes npm
npm install
```

**Dependencias principales:**
- React 19.2.0
- React Router DOM 7.10.1
- Material-UI (MUI) 7.3.6
- Lucide React (íconos)
- Vite (bundler ultra-rápido)

### 3️⃣ Ejecutar el Servidor de Desarrollo

```bash
# Iniciar servidor en modo desarrollo
npm run dev
```

**Output esperado:**
```
  VITE v7.2.5  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Accede a **http://localhost:5173** en tu navegador 🎉

---

## 🛠️ Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Ejecuta el servidor de desarrollo con hot reload |
| `npm run build` | Genera el bundle de producción en `/dist` |
| `npm run preview` | Preview del build de producción |
| `npm run lint` | Ejecuta ESLint para revisar código |

---

## 🌿 Trabajar con Git (Flujo de Trabajo)

### **Configuración Inicial**

Tu compañero Mateo trabajará en su propia rama:

```bash
# 1. Asegurarse de estar en main
git checkout main
git pull origin main

# 2. Crear rama personal (solo primera vez)
git checkout -b mateo

# 3. Subir la rama al remoto
git push -u origin mateo
```

### **Flujo Diario de Trabajo**

```bash
# 1. Actualizar rama con cambios más recientes de main
git checkout main
git pull origin main
git checkout mateo
git merge main

# 2. Trabajar en tus cambios
# ... editar archivos ...

# 3. Revisar qué cambió
git status
git diff

# 4. Agregar cambios al staging
git add .
# O agregar archivos específicos:
git add src/components/MiComponente.jsx

# 5. Hacer commit con mensaje descriptivo
git commit -m "feat: Agrega componente de tarjeta de curso"

# 6. Subir cambios a tu rama en GitHub
git push origin mateo
```

### **Crear Pull Request (PR)**

Una vez que Mateo termine una funcionalidad:

1. Ve a GitHub: https://github.com/mateogg225/psico
2. Verás un botón **"Compare & pull request"** para la rama `mateo`
3. Clic en el botón
4. Título: Descripción breve del cambio
5. Descripción: Explica qué hiciste y por qué
6. Asignarte como revisor
7. Clic en **"Create pull request"**
8. **Tú revisas** y haces **merge a main**

---

## 📂 Guía de Estructura de Carpetas

### **`src/components/`** - Componentes Reutilizables

```
components/
├── Navbar.jsx           # Barra de navegación
├── CourseCard.jsx       # Tarjeta de curso
├── LessonCard.jsx       # Tarjeta de lección
├── LivesCounter.jsx     # Contador de vidas
├── DiamondCounter.jsx   # Contador de diamantes
└── ProgressBar.jsx      # Barra de progreso
```

Ejemplo de componente:
```jsx
// src/components/CourseCard.jsx
export default function CourseCard({ title, difficulty, price }) {
  return (
    <div className="course-card">
      <h3>{title}</h3>
      <span>{difficulty}</span>
      <p>{price} 💎</p>
    </div>
  );
}
```

### **`src/pages/`** - Páginas/Vistas

```
pages/
├── Home.jsx             # Dashboard principal
├── Login.jsx            # Página de login
├── Register.jsx         # Página de registro
├── Courses.jsx          # Listado de cursos
├── Lesson.jsx           # Vista de lección individual
└── Profile.jsx          # Perfil del usuario
```

Ejemplo de página:
```jsx
// src/pages/Home.jsx
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Mis Cursos</h1>
      <CourseCard title="Psicoanálisis I" difficulty="Principiante" price={0} />
    </div>
  );
}
```

### **`src/services/`** - API Calls al Backend

```
services/
├── api.js               # Configuración Axios
├── authService.js       # Login, Register, Logout
├── courseService.js     # CRUD de cursos
└── userService.js       # Perfil, gamificación
```

Ejemplo de servicio:
```jsx
// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password
  });
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};
```

### **`src/context/`** - Estado Global

```
context/
├── AuthContext.jsx      # Usuario autenticado
└── GameContext.jsx      # Vidas, diamantes, streaks
```

Ejemplo de Context:
```jsx
// src/context/AuthContext.jsx
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

---

## 🎨 Estándares de Código

### **Nomenclatura**
- **Componentes**: PascalCase (`CourseCard.jsx`)
- **Funciones**: camelCase (`getUserData()`)
- **Constantes**: UPPER_SNAKE_CASE (`API_URL`)

### **Estructura de Componente**
```jsx
// 1. Imports
import { useState, useEffect } from 'react';
import './MiComponente.css';

// 2. Definición del componente
export default function MiComponente({ prop1, prop2 }) {
  // 3. Estados y hooks
  const [estado, setEstado] = useState(0);
  
  // 4. Efectos secundarios
  useEffect(() => {
    // Lógica
  }, []);
  
  // 5. Funciones internas
  const handleClick = () => {
    setEstado(estado + 1);
  };
  
  // 6. Render
  return (
    <div onClick={handleClick}>
      <h2>{prop1}</h2>
      <p>{estado}</p>
    </div>
  );
}
```

### **ESLint**
Ejecuta antes de hacer commit:
```bash
npm run lint
```

---

## 🔗 Integración con Backend

El frontend se conecta al backend Python/FastAPI:

**Backend URL**: `http://localhost:8000`

### Configurar API Base URL

Crea `src/services/api.js`:
```javascript
import axios from 'axios';

// URL del backend (cambiar en producción)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Instancia de Axios con configuración base
const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## 🐛 Troubleshooting

### Error: `EADDRINUSE :::5173`
El puerto está ocupado. Cambia el puerto en `vite.config.js`:
```js
export default {
  server: {
    port: 3000 // Cambiar a otro puerto
  }
}
```

### Error: `Cannot find module`
Reinstala dependencias:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Hot Reload no funciona
Reinicia el servidor:
```bash
# Ctrl+C para detener
npm run dev
```

---

## 📚 Recursos

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Material-UI](https://mui.com)
- [React Router](https://reactrouter.com)

---

## 👥 Colaboradores

- **Pedro** - Full Stack Developer
- **Mateo** - Frontend Developer

---

## 📝 Checklist para Mateo

Para cada nueva funcionalidad:

- [ ] Crear rama desde `main` actualizado
- [ ] Desarrollar componente/página
- [ ] Probar localmente (`npm run dev`)
- [ ] Ejecutar linter (`npm run lint`)
- [ ] Hacer commit con mensaje descriptivo
- [ ] Push a rama `mateo`
- [ ] Crear Pull Request en GitHub
- [ ] Esperar revisión de Pedro
- [ ] Una vez aprobado, Pedro hará merge a `main`

---

¿Dudas? Contacta a Pedro 🚀
