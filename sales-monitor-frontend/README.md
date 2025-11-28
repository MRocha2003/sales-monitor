# 🎨 Panel de Monitoreo de Ventas - Frontend

Frontend desarrollado con **React + Vite + Tailwind CSS** para el Panel de Monitoreo de Ventas.

## 🚀 Características

- ✅ Interfaz moderna con React 18
- ✅ Tailwind CSS para estilos
- ✅ React Router para navegación
- ✅ Zustand para gestión de estado
- ✅ Axios con interceptores JWT
- ✅ Componentes reutilizables
- ✅ Diseño responsive
- ✅ Notificaciones toast

## 📦 Instalación

### Paso 1: Clonar/Navegar al proyecto

\`\`\`bash
cd sales-monitor-frontend
\`\`\`

### Paso 2: Instalar dependencias

\`\`\`bash
npm install
\`\`\`

### Paso 3: Configurar variables de entorno

\`\`\`bash
cp .env.example .env
\`\`\`

Editar \`.env\`:
\`\`\`env
VITE_API_URL=http://127.0.0.1:8000/api
\`\`\`

### Paso 4: Ejecutar en desarrollo

\`\`\`bash
npm run dev
\`\`\`

El frontend estará disponible en: http://localhost:3000

## 🏗️ Estructura del Proyecto

\`\`\`
src/
├── api/              # Configuración de Axios
├── components/       # Componentes reutilizables
│   ├── auth/        # Componentes de autenticación
│   ├── common/      # Componentes comunes
│   ├── dashboard/   # Componentes del dashboard
│   ├── layout/      # Layout y navegación
│   └── sales/       # Componentes de ventas
├── pages/           # Páginas principales
├── store/           # Estado global (Zustand)
├── utils/           # Utilidades y helpers
├── App.jsx          # Componente principal
├── main.jsx         # Punto de entrada
└── index.css        # Estilos globales
\`\`\`

## 🔐 Autenticación

El sistema usa JWT (JSON Web Tokens):

1. Login genera \`access_token\` y \`refresh_token\`
2. Tokens se almacenan en localStorage
3. Axios interceptor agrega token a cada petición
4. Refresh automático cuando access_token expira

## 📱 Páginas Disponibles

| Ruta | Componente | Auth |
|------|-----------|------|
| \`/login\` | Login | No |
| \`/register\` | Register | No |
| \`/dashboard\` | Dashboard | Sí |
| \`/sales\` | Sales | Sí |
| \`/users\` | Users | Admin |
| \`/activity\` | Activity | Sí |
| \`/profile\` | Profile | Sí |

## 🚀 Scripts Disponibles

\`\`\`bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
\`\`\`

## 🎯 Credenciales de Prueba

\`\`\`
Usuario: admin
Contraseña: admin123

Usuario: vendedor1
Contraseña: vendedor123
\`\`\`

## 📄 Licencia

MIT License
\`\`\`

---

## ✅ PASO 16: EJECUTAR EL PROYECTO

```bash
# 1. Asegúrate de estar en la carpeta del frontend
cd sales-monitor-frontend

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

# El servidor estará en http://localhost:3000
```

---

## 🎉 ¡FRONTEND COMPLETO!

Ahora tienes el frontend **100% funcional** con:

✅ **Configuración completa** (Vite, Tailwind, .env)  
✅ **Componentes comunes** (Button, Input, Card, Modal, Loading)  
✅ **Componentes de autenticación** (LoginForm, RegisterForm, ProtectedRoute)  
✅ **Componentes de layout** (Navbar, Sidebar, Layout)  
✅ **Componentes de ventas** (SaleForm, SaleCard)  
✅ **Componentes de dashboard** (StatsCard)  
✅ **Todas las páginas** (Login, Register, Dashboard, Sales, Profile, Activity, Users)  
✅ **App.jsx** con rutas configuradas  
✅ **Store Zustand** para autenticación  
✅ **Axios** con interceptores JWT  
✅ **Utilidades** (helpers, constants)  
✅ **README.md** completo  

---

## 🚀 ORDEN DE EJECUCIÓN

1. **Backend primero** (puerto 8000):
   ```bash
   cd sales_monitor_backend
   python manage.py runserver
   ```

2. **Frontend después** (puerto 3000):
   ```bash
   cd sales-monitor-frontend
   npm run dev
   ```

3. **Abrir navegador**: http://localhost:3000

