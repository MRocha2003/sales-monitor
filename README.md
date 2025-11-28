# 📊 Sistema de Monitoreo de Ventas

Sistema completo de gestión de ventas con autenticación JWT, roles de usuario y seguimiento de actividad. Desarrollado con **Django REST Framework** (Backend) y **React + Vite** (Frontend).

---

## 📝 Descripción del Proyecto

Sistema fullstack que permite:
- 🔐 Registro y autenticación de usuarios con JWT
- 👥 Gestión de usuarios con diferentes roles (Admin, Supervisor, Vendedor)
- 💰 CRUD completo de ventas con validaciones
- 📊 Dashboard con estadísticas y reportes en tiempo real
- 📈 Registro automático de actividad de usuarios
- 🔍 Filtros, búsquedas y paginación avanzada
- 🎨 Interfaz moderna y responsive

---

## 🏗️ Arquitectura del Sistema
```
┌─────────────────────────────────────────────────────────────┐
│                    ARQUITECTURA DEL SISTEMA                  │
└─────────────────────────────────────────────────────────────┘

    FRONTEND (React)                    BACKEND (Django)
    Puerto: 3000                        Puerto: 8000
         │                                    │
         │          HTTP Requests             │
         │  ─────────────────────────────────>│
         │     (JWT in Authorization)         │
         │                                    │
         │          JSON Responses            │
         │  <─────────────────────────────────│
         │                                    │
         ▼                                    ▼
   
   React Router                        Django REST Framework
   Zustand (State)                     JWT Authentication
   Axios (HTTP)                        SQLite Database
   Tailwind CSS                        CORS Enabled
```

---

## 📁 Estructura del Proyecto
```
sales-monitor-system/
│
├── sales_monitor_backend/          # 🔴 Backend (Django REST Framework)
│   ├── apps/
│   │   ├── users/                 # Autenticación y usuarios
│   │   ├── sales/                 # Gestión de ventas
│   │   └── activity/              # Registro de actividad
│   ├── sales_monitor/             # Configuración Django
│   ├── core/                      # Utilidades compartidas
│   ├── manage.py
│   ├── requirements.txt           # Dependencias Python
│   ├── .env.example
│   └── README.md
│
├── sales-monitor-frontend/         # 🔵 Frontend (React + Vite)
│   ├── src/
│   │   ├── api/                   # Configuración Axios
│   │   ├── components/            # Componentes React
│   │   ├── pages/                 # Páginas principales
│   │   ├── store/                 # Estado global (Zustand)
│   │   ├── utils/                 # Helpers y constantes
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json               # Dependencias Node
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env.example
│   └── README.md
│
├── .gitignore
└── README.md                       # Este archivo
```

---

## 🛠️ Tecnologías Utilizadas

### Backend (Django)
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Python** | 3.10+ | Lenguaje de programación |
| **Django** | 4.2.7 | Framework web |
| **Django REST Framework** | 3.14.0 | API REST |
| **djangorestframework-simplejwt** | 5.3.0 | Autenticación JWT |
| **SQLite** | 3.x | Base de datos relacional |
| **django-cors-headers** | 4.3.0 | Manejo de CORS |
| **django-filter** | 23.3 | Filtros avanzados |
| **drf-yasg** | 1.21.7 | Documentación Swagger/OpenAPI |
| **python-decouple** | 3.8 | Variables de entorno |

### Frontend (React)
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **React** | 18.2.0 | Librería de interfaces |
| **Vite** | 5.0.0 | Build tool y dev server |
| **Tailwind CSS** | 3.3.5 | Framework CSS utility-first |
| **React Router DOM** | 6.20.0 | Enrutamiento SPA |
| **Axios** | 1.6.2 | Cliente HTTP |
| **Zustand** | 4.4.6 | Gestión de estado global |
| **Lucide React** | 0.292.0 | Iconos SVG |
| **React Hot Toast** | 2.4.1 | Notificaciones toast |

---

## 🚀 Instalación y Ejecución

### Requisitos Previos

- **Python 3.10+** (para backend)
- **Node.js 18+** (para frontend)
- **Git** (para clonar el repositorio)
- **pip** (gestor de paquetes Python)
- **npm** (gestor de paquetes Node)

---

### 1️⃣ Clonar el Repositorio
```bash
git clone https://github.com/MRocha2003/sales-monitor.git
cd sales-monitor
```

---

### 2️⃣ Configurar el BACKEND (Django)
```bash
# Navegar a la carpeta del backend
cd sales_monitor_backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows (PowerShell):
venv\Scripts\activate
# Windows (CMD):
venv\Scripts\activate.bat
# Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
# Windows:
copy .env.example .env
# Linux/Mac:
cp .env.example .env

# Editar .env con tus datos (SECRET_KEY, etc.)

# Aplicar migraciones
python manage.py makemigrations
python manage.py migrate

# Crear superusuario (Admin)
python manage.py createsuperuser
# Username: admin
# Email: admin@test.com
# Password: (tu contraseña)

# Ejecutar servidor backend
python manage.py runserver
```

**✅ Backend disponible en:** http://127.0.0.1:8000

---

### 3️⃣ Configurar el FRONTEND (React)

**Abrir una NUEVA terminal** (dejar el backend corriendo):
```bash
# Navegar a la carpeta del frontend
cd sales-monitor-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
# Windows:
copy .env.example .env
# Linux/Mac:
cp .env.example .env

# El .env debe contener:
# VITE_API_URL=http://127.0.0.1:8000/api

# Ejecutar servidor frontend
npm run dev
```

**✅ Frontend disponible en:** http://localhost:3000

---

### 4️⃣ Acceder al Sistema

1. **Abrir navegador:** http://localhost:3000
2. **Login con superusuario:**
   - Usuario: `admin`
   - Contraseña: (la que creaste)
3. **¡Listo! Ya puedes usar el sistema** 🎉

---

## 📚 Documentación Adicional

### Swagger API (Documentación Interactiva)
- **Swagger UI:** http://127.0.0.1:8000/swagger/
- **ReDoc:** http://127.0.0.1:8000/redoc/

### Panel de Administración Django
- **Admin Panel:** http://127.0.0.1:8000/admin/
- Gestiona usuarios, ventas y actividad desde una interfaz amigable

### READMEs Específicos
- **Backend:** [sales_monitor_backend/README.md](sales_monitor_backend/README.md)
- **Frontend:** [sales-monitor-frontend/README.md](sales-monitor-frontend/README.md)

---

## 🔐 Credenciales de Prueba

Después de crear el superusuario, puedes crear usuarios de prueba:
```bash
# En la terminal del backend, con el servidor detenido:
python manage.py shell
```
```python
from django.contrib.auth import get_user_model
User = get_user_model()

# Crear vendedor
User.objects.create_user(
    username='vendedor1',
    email='vendedor@test.com',
    password='vendedor123',
    role='vendedor',
    first_name='Juan',
    last_name='Pérez'
)

# Crear supervisor
User.objects.create_user(
    username='supervisor1',
    email='supervisor@test.com',
    password='supervisor123',
    role='supervisor',
    first_name='María',
    last_name='González'
)

print("✅ Usuarios de prueba creados")
exit()
```

**Credenciales:**
```
Admin:
- Usuario: admin
- Contraseña: (la que creaste)

Vendedor:
- Usuario: vendedor1
- Contraseña: vendedor123

Supervisor:
- Usuario: supervisor1
- Contraseña: supervisor123
```

---

## ✨ Funcionalidades del Sistema

### 🔐 Autenticación y Seguridad
- ✅ Login/Logout con JWT
- ✅ Refresh automático de tokens
- ✅ Rutas protegidas por autenticación
- ✅ Permisos por roles (Admin, Supervisor, Vendedor)
- ✅ Encriptación de contraseñas

### 👥 Gestión de Usuarios
- ✅ Registro de nuevos usuarios
- ✅ 3 roles: Admin, Supervisor, Vendedor
- ✅ Edición de perfil
- ✅ Cambio de contraseña
- ✅ Lista de usuarios (solo Admin)

### 💰 Gestión de Ventas
- ✅ Crear, editar, eliminar ventas
- ✅ Cálculo automático de totales
- ✅ Estados: Pendiente, Completada, Cancelada
- ✅ Filtros por estado, vendedor, fecha
- ✅ Búsqueda por nombre de producto
- ✅ Paginación de resultados

### 📊 Dashboard y Estadísticas
- ✅ Total de ventas e ingresos
- ✅ Ventas por vendedor (Admin/Supervisor)
- ✅ Gráficas de ventas diarias
- ✅ Promedios y métricas
- ✅ Filtros por fecha

### 📈 Registro de Actividad
- ✅ Log automático de acciones
- ✅ Registro de IP y timestamp
- ✅ Visualización de actividad propia
- ✅ Historial completo (Admin)

### 🎨 Interfaz de Usuario
- ✅ Diseño moderno y responsive
- ✅ Tema oscuro/claro (opcional)
- ✅ Notificaciones toast
- ✅ Modales para formularios
- ✅ Loading states
- ✅ Validaciones en tiempo real

---

## 👥 Roles y Permisos

| Funcionalidad | Admin | Supervisor | Vendedor |
|--------------|-------|------------|----------|
| **VENTAS** |
| Ver todas las ventas | ✅ | ✅ | ❌ (solo las suyas) |
| Crear venta | ✅ | ✅ | ✅ |
| Editar cualquier venta | ✅ | ❌ | ❌ (solo las suyas) |
| Eliminar cualquier venta | ✅ | ❌ | ❌ (solo las suyas) |
| **ESTADÍSTICAS** |
| Ver estadísticas globales | ✅ | ✅ | ❌ |
| Ver ventas por vendedor | ✅ | ✅ | ❌ |
| **USUARIOS** |
| Gestionar usuarios | ✅ | ❌ | ❌ |
| Ver todos los usuarios | ✅ | ❌ | ❌ |
| **ACTIVIDAD** |
| Ver actividad de todos | ✅ | ✅ | ❌ (solo la suya) |

---

## 🔧 Scripts Útiles

### Backend (Django)
```bash
# Ver estructura de la base de datos
python manage.py dbshell

# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Shell de Python con Django
python manage.py shell

# Verificar configuración
python manage.py check

# Recolectar archivos estáticos (producción)
python manage.py collectstatic
```

### Frontend (React)
```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

---

## 🐛 Solución de Problemas Comunes

### Error: "No module named 'apps'"
```bash
# Asegúrate de estar en la carpeta correcta
cd sales_monitor_backend
# Y de tener el entorno virtual activado
venv\Scripts\activate  # Windows
```

### Error: "CORS policy error"
```bash
# Verificar que en backend/.env esté:
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Error: "Connection refused" en frontend
```bash
# Verificar que el backend esté corriendo en puerto 8000
# Y que el frontend apunte a la URL correcta en .env
VITE_API_URL=http://127.0.0.1:8000/api
```

### Error: "Invalid token" o "401 Unauthorized"
```bash
# Limpiar localStorage en el navegador:
# F12 → Application → Local Storage → Clear
# Luego volver a hacer login
```

---

## 🚀 Despliegue en Producción

### Backend (Django)

**Opciones:**
- **Heroku** - https://heroku.com
- **Railway** - https://railway.app
- **PythonAnywhere** - https://pythonanywhere.com
- **Render** - https://render.com

**Configuración:**
1. Cambiar `DEBUG=False` en `.env`
2. Usar PostgreSQL en lugar de SQLite
3. Configurar `ALLOWED_HOSTS`
4. Ejecutar `collectstatic`

### Frontend (React)

**Opciones:**
- **Vercel** - https://vercel.com (Recomendado)
- **Netlify** - https://netlify.com
- **GitHub Pages** - https://pages.github.com

**Configuración:**
1. Build: `npm run build`
2. Carpeta de salida: `dist/`
3. Configurar variable: `VITE_API_URL=https://tu-backend.com/api`

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

## 👨‍💻 Autor

**David Rocha**
- GitHub: [@MRocha2003](https://github.com/MRocha2003)
- Email: david.rocha@uab.edu.bo

---

## 🎓 Contexto Académico

- **Universidad:** Universidad Adventista de bolivia (UAB)
- **Materia:** Tecnologías en Internet / Arquitectura de Software
- **Fecha:** Noviembre 2025

---

## 📞 Soporte y Contacto

Si encuentras algún problema:

1. Revisa la [Documentación del Backend](sales_monitor_backend/README.md)
2. Revisa la [Documentación del Frontend](sales-monitor-frontend/README.md)
3. Abre un [Issue en GitHub](https://github.com/MRocha2003/sales-monitor/issues)
4. Contacta al autor por email

---

## 📚 Referencias y Recursos

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JWT.io](https://jwt.io/)

---

## ⭐ Características Destacadas

- 🔒 **Seguridad:** Autenticación JWT con refresh tokens
- 📱 **Responsive:** Funciona en móviles, tablets y desktop
- ⚡ **Rápido:** Vite para desarrollo ultra-rápido
- 🎨 **Moderno:** Tailwind CSS con diseño actual
- 📊 **Completo:** Dashboard con estadísticas en tiempo real
- 🗄️ **Base de datos:** SQLite (desarrollo) / PostgreSQL (producción)
- 📝 **Documentado:** Swagger UI para explorar la API
- 🔍 **Filtros:** Búsqueda y filtrado avanzado

---

**¡Gracias por usar el Sistema de Monitoreo de Ventas!** 🎉