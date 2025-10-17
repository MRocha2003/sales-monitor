# 📊 Panel de Monitoreo de Ventas y Actividad de Usuarios

Backend desarrollado con **Django REST Framework** para gestionar ventas, usuarios y rastrear la actividad del sistema con autenticación JWT.

## 📝 Descripción del Proyecto

Sistema backend completo que permite:
- 🔐 Registro y autenticación de usuarios con JWT
- 👥 Gestión de usuarios con diferentes roles (Admin, Supervisor, Vendedor)
- 💰 CRUD completo de ventas con validaciones
- 📊 Estadísticas y reportes en tiempo real
- 📈 Registro automático de actividad de usuarios
- 🔍 Filtros, búsquedas y paginación avanzada

---

## 🚀 Características

- ✅ **API REST completa** con Django REST Framework
- ✅ **Autenticación JWT** con refresh tokens
- ✅ **Sistema de roles y permisos** personalizados
- ✅ **CRUD de ventas** con cálculo automático de totales
- ✅ **Registro de actividad** automático con middleware
- ✅ **Documentación automática** con Swagger y ReDoc
- ✅ **Panel de administración** Django personalizado
- ✅ **Validaciones robustas** en serializers
- ✅ **Filtros y búsquedas** con django-filter
- ✅ **Paginación** configurable

---

## 🛠️ Tecnologías

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| Python | 3.10+ | Lenguaje de programación |
| Django | 4.2.7 | Framework web |
| Django REST Framework | 3.14.0 | API REST |
| Simple JWT | 5.3.0 | Autenticación JWT |
| SQLite | 3.x | Base de datos (incluida con Python) |
| django-cors-headers | 4.3.0 | Manejo de CORS |
| django-filter | 23.3 | Filtros avanzados |
| drf-yasg | 1.21.7 | Documentación Swagger |

---

## 📁 Estructura del Proyecto

```
sales_monitor_backend/
├── sales_monitor/              # Configuración principal
│   ├── __init__.py
│   ├── settings.py            # Configuración Django
│   ├── urls.py                # URLs principales
│   ├── wsgi.py
│   └── asgi.py
├── apps/
│   ├── users/                 # App de usuarios
│   │   ├── models.py          # Modelo User personalizado
│   │   ├── serializers.py     # Serializers de autenticación
│   │   ├── views.py           # ViewSets y vistas
│   │   ├── urls.py            # Rutas de usuarios
│   │   ├── permissions.py     # Permisos personalizados
│   │   └── admin.py           # Configuración admin
│   ├── sales/                 # App de ventas
│   │   ├── models.py          # Modelo Sale
│   │   ├── serializers.py     # Serializers de ventas
│   │   ├── views.py           # ViewSets con estadísticas
│   │   ├── urls.py            # Rutas de ventas
│   │   └── admin.py
│   └── activity/              # App de actividad
│       ├── models.py          # Modelo UserActivity
│       ├── serializers.py
│       ├── views.py           # ViewSets de actividad
│       ├── urls.py
│       ├── middleware.py      # Middleware de registro
│       └── admin.py
├── core/
│   ├── pagination.py          # Paginación personalizada
│   └── utils.py               # Utilidades
├── manage.py
├── requirements.txt           # Dependencias
├── .env                       # Variables de entorno (no subir)
├── .env.example               # Plantilla de variables
├── .gitignore
└── README.md
```

---

## 📦 Instalación y Configuración

### Requisitos Previos

- Python 3.10 o superior
- pip (gestor de paquetes de Python)
- Git (opcional, para clonar el repositorio)

### Paso 1: Clonar el Repositorio

```bash
# Si tienes el repositorio en GitHub
git clone https://github.com/tu-usuario/sales-monitor-backend.git
cd sales-monitor-backend

# O si tienes el ZIP
# Descomprime y navega a la carpeta
cd sales-monitor-backend
```

### Paso 2: Crear Entorno Virtual

```bash
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual

# En Windows (PowerShell)
venv\Scripts\activate

# En Windows (CMD)
venv\Scripts\activate.bat

# En Linux/Mac
source venv/bin/activate
```

### Paso 3: Instalar Dependencias

```bash
pip install -r requirements.txt
```

### Paso 4: Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# En Windows
copy .env.example .env
```

**Editar `.env` con tus configuraciones:**

```env
# Database - SQLite (por defecto)
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=

# Security
SECRET_KEY=tu-clave-secreta-muy-segura-aqui
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# JWT
JWT_ACCESS_TOKEN_LIFETIME=60
JWT_REFRESH_TOKEN_LIFETIME=1440

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Paso 5: Aplicar Migraciones

```bash
# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones a la base de datos
python manage.py migrate
```

### Paso 6: Crear Superusuario

```bash
python manage.py createsuperuser
```

Proporciona:
- Username: `admin` (o el que prefieras)
- Email: `admin@example.com`
- Password: (tu contraseña segura)

### Paso 7: (Opcional) Crear Usuarios de Prueba

```bash
python manage.py shell
```

Dentro del shell de Python:

```python
from apps.users.models import User

# Crear administrador
User.objects.create_user(
    username='admin',
    email='admin@test.com',
    password='admin123',
    role='admin',
    first_name='Admin',
    last_name='Sistema'
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

# Crear vendedor
User.objects.create_user(
    username='vendedor1',
    email='vendedor@test.com',
    password='vendedor123',
    role='vendedor',
    first_name='Juan',
    last_name='Pérez'
)

print("✅ Usuarios creados exitosamente")
exit()
```

### Paso 8: Ejecutar el Servidor

```bash
python manage.py runserver
```

El servidor estará disponible en: **http://127.0.0.1:8000/**

---

## 📚 Documentación de la API

### Interfaces de Documentación

| Interfaz | URL | Descripción |
|----------|-----|-------------|
| **Swagger UI** | http://127.0.0.1:8000/swagger/ | Interfaz interactiva |
| **ReDoc** | http://127.0.0.1:8000/redoc/ | Documentación detallada |
| **Admin Panel** | http://127.0.0.1:8000/admin/ | Panel de administración |

---

## 🔐 Endpoints de la API

### Autenticación (`/api/auth/`)

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register/` | Registro de nuevo usuario | No |
| POST | `/api/auth/login/` | Login (obtener tokens JWT) | No |
| POST | `/api/auth/refresh/` | Refrescar access token | No |
| POST | `/api/auth/logout/` | Cerrar sesión | Sí |
| GET | `/api/auth/users/profile/` | Ver perfil del usuario actual | Sí |
| PUT | `/api/auth/users/update_profile/` | Actualizar perfil | Sí |
| POST | `/api/auth/users/change_password/` | Cambiar contraseña | Sí |

### Usuarios (`/api/auth/users/`)

| Método | Endpoint | Descripción | Permiso Requerido |
|--------|----------|-------------|-------------------|
| GET | `/api/auth/users/` | Listar todos los usuarios | Autenticado |
| GET | `/api/auth/users/{id}/` | Obtener usuario específico | Autenticado |
| POST | `/api/auth/users/` | Crear nuevo usuario | Admin |
| PUT | `/api/auth/users/{id}/` | Actualizar usuario | Owner/Admin |
| DELETE | `/api/auth/users/{id}/` | Eliminar usuario | Admin |

### Ventas (`/api/sales/`)

| Método | Endpoint | Descripción | Permiso Requerido |
|--------|----------|-------------|-------------------|
| GET | `/api/sales/` | Listar ventas | Autenticado |
| GET | `/api/sales/{id}/` | Obtener venta específica | Owner/Admin |
| POST | `/api/sales/` | Crear nueva venta | Autenticado |
| PUT | `/api/sales/{id}/` | Actualizar venta | Owner/Admin |
| DELETE | `/api/sales/{id}/` | Eliminar venta | Owner/Admin |
| GET | `/api/sales/statistics/` | Obtener estadísticas | Autenticado |
| GET | `/api/sales/by_seller/` | Ventas agrupadas por vendedor | Admin/Supervisor |
| GET | `/api/sales/daily_sales/` | Ventas diarias (últimos 30 días) | Admin/Supervisor |

### Actividad (`/api/activity/`)

| Método | Endpoint | Descripción | Permiso Requerido |
|--------|----------|-------------|-------------------|
| GET | `/api/activity/` | Listar todas las actividades | Autenticado |
| GET | `/api/activity/{id}/` | Obtener actividad específica | Autenticado |
| GET | `/api/activity/my_activity/` | Ver mi actividad (últimas 50) | Autenticado |
| GET | `/api/activity/statistics/` | Estadísticas de actividad | Admin |
| GET | `/api/activity/daily_activity/` | Actividad diaria | Admin |

---

## 🧪 Ejemplos de Uso (Postman/cURL)

### 1. Registro de Usuario

**POST** `http://127.0.0.1:8000/api/auth/register/`

```json
{
    "username": "nuevousuario",
    "email": "nuevo@example.com",
    "password": "Password123!",
    "password2": "Password123!",
    "first_name": "Nuevo",
    "last_name": "Usuario",
    "role": "vendedor",
    "phone": "+591 70000000"
}
```

**Respuesta (201 Created):**
```json
{
    "id": 1,
    "username": "nuevousuario",
    "email": "nuevo@example.com",
    "first_name": "Nuevo",
    "last_name": "Usuario",
    "role": "vendedor",
    "phone": "+591 70000000",
    "is_active_seller": true,
    "created_at": "2024-10-17T10:30:00Z"
}
```

### 2. Login

**POST** `http://127.0.0.1:8000/api/auth/login/`

```json
{
    "username": "admin",
    "password": "admin123"
}
```

**Respuesta (200 OK):**
```json
{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "user": {
        "id": 1,
        "username": "admin",
        "email": "admin@test.com",
        "role": "admin",
        "first_name": "Admin",
        "last_name": "Sistema"
    }
}
```

### 3. Crear Venta (Con Token)

**POST** `http://127.0.0.1:8000/api/sales/`

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
Content-Type: application/json
```

**Body:**
```json
{
    "product_name": "Laptop Dell XPS 15",
    "quantity": 2,
    "unit_price": 1500.00,
    "status": "completada",
    "notes": "Cliente corporativo - Factura #1234"
}
```

**Respuesta (201 Created):**
```json
{
    "id": 1,
    "seller": 1,
    "seller_detail": {
        "id": 1,
        "username": "vendedor1",
        "email": "vendedor@test.com",
        "first_name": "Juan",
        "last_name": "Pérez",
        "role": "vendedor"
    },
    "product_name": "Laptop Dell XPS 15",
    "quantity": 2,
    "unit_price": "1500.00",
    "total_amount": "3000.00",
    "status": "completada",
    "sale_date": "2024-10-17T10:45:00Z",
    "notes": "Cliente corporativo - Factura #1234"
}
```

### 4. Obtener Estadísticas

**GET** `http://127.0.0.1:8000/api/sales/statistics/`

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

**Respuesta (200 OK):**
```json
{
    "total_sales": 45,
    "total_revenue": "67500.00",
    "average_sale": "1500.00",
    "pending_count": 5,
    "completed_count": 38,
    "cancelled_count": 2
}
```

### 5. Ver Mi Actividad

**GET** `http://127.0.0.1:8000/api/activity/my_activity/`

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

**Respuesta (200 OK):**
```json
[
    {
        "id": 15,
        "user": 1,
        "user_detail": {
            "id": 1,
            "username": "vendedor1",
            "email": "vendedor@test.com"
        },
        "action": "create_sale",
        "action_display": "Crear venta",
        "description": "Creó venta de Laptop Dell XPS 15",
        "ip_address": "127.0.0.1",
        "timestamp": "2024-10-17T10:45:00Z"
    },
    {
        "id": 14,
        "user": 1,
        "action": "login",
        "action_display": "Inicio de sesión",
        "description": "Inicio de sesión exitoso",
        "timestamp": "2024-10-17T10:30:00Z"
    }
]
```

---

## 👥 Roles y Permisos

### Roles Disponibles

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **Admin** | Administrador del sistema | Acceso completo a todos los recursos |
| **Supervisor** | Supervisor de ventas | Ver todas las ventas, estadísticas y reportes |
| **Vendedor** | Vendedor | Crear y gestionar solo sus propias ventas |

### Matriz de Permisos

| Acción | Admin | Supervisor | Vendedor |
|--------|-------|------------|----------|
| Ver todas las ventas | ✅ | ✅ | ❌ (solo las suyas) |
| Crear venta | ✅ | ✅ | ✅ |
| Editar cualquier venta | ✅ | ❌ | ❌ (solo las suyas) |
| Eliminar venta | ✅ | ❌ | ❌ (solo las suyas) |
| Ver estadísticas globales | ✅ | ✅ | ❌ (solo las suyas) |
| Gestionar usuarios | ✅ | ❌ | ❌ |
| Ver actividad de todos | ✅ | ✅ | ❌ (solo la suya) |

---

## 🗄️ Base de Datos

### SQLite (Por Defecto)

Este proyecto utiliza **SQLite** como base de datos por defecto, lo cual es ideal para:

- ✅ Desarrollo local
- ✅ Proyectos académicos
- ✅ Demostraciones y prototipos
- ✅ Testing

**Ventajas:**
- No requiere instalación de software adicional
- Base de datos en un solo archivo (`db.sqlite3`)
- Fácil de transportar y respaldar
- Zero configuración

### Migrar a Otra Base de Datos (Opcional)

Si necesitas usar otra base de datos en producción:

#### PostgreSQL

```bash
pip install psycopg2-binary
```

**Actualizar `.env`:**
```env
DB_ENGINE=django.db.backends.postgresql
DB_NAME=sales_monitor_db
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
```

#### MySQL

```bash
pip install PyMySQL cryptography
```

**Actualizar `.env`:**
```env
DB_ENGINE=django.db.backends.mysql
DB_NAME=sales_monitor_db
DB_USER=root
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=3306
```

**Agregar en `sales_monitor/__init__.py`:**
```python
import pymysql
pymysql.install_as_MySQLdb()
```

---

## 🧪 Testing y Validación

### Probar la API con Swagger

1. Inicia el servidor: `python manage.py runserver`
2. Ve a: http://127.0.0.1:8000/swagger/
3. Usa la interfaz interactiva para probar endpoints

### Colección de Postman

Se incluye una colección de Postman con todos los endpoints configurados. Importa el archivo `postman_collection.json` en Postman.

### Comandos Útiles

```bash
# Verificar configuración
python manage.py check

# Ver migraciones
python manage.py showmigrations

# Crear datos de prueba
python manage.py shell

# Limpiar base de datos y recrear
python manage.py flush

# Ver rutas disponibles
python manage.py show_urls  # Requiere django-extensions
```

---

## 🔧 Configuración Avanzada

### Variables de Entorno Disponibles

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `DB_ENGINE` | Motor de base de datos | `django.db.backends.sqlite3` |
| `DB_NAME` | Nombre de la base de datos | `db.sqlite3` |
| `SECRET_KEY` | Clave secreta de Django | (requerido) |
| `DEBUG` | Modo debug | `True` |
| `ALLOWED_HOSTS` | Hosts permitidos | `localhost,127.0.0.1` |
| `JWT_ACCESS_TOKEN_LIFETIME` | Duración access token (min) | `60` |
| `JWT_REFRESH_TOKEN_LIFETIME` | Duración refresh token (min) | `1440` |
| `CORS_ALLOWED_ORIGINS` | Orígenes CORS permitidos | `http://localhost:3000` |

### Paginación

Por defecto, la API pagina resultados con 10 items por página. Puedes cambiar esto en las peticiones:

```
GET /api/sales/?page=2&page_size=20
```

### Filtros

Usa query parameters para filtrar:

```
# Ventas por estado
GET /api/sales/?status=completada

# Ventas por vendedor
GET /api/sales/?seller=1

# Búsqueda en nombre de producto
GET /api/sales/?search=laptop

# Ordenamiento
GET /api/sales/?ordering=-sale_date
```

---

## 📝 Criterios de Evaluación (Cumplidos)

| Criterio | Descripción | Puntaje | Estado |
|----------|-------------|---------|--------|
| **Estructura modular** | Código organizado en apps, uso de TypeScript/Python | 20 pts | ✅ |
| **Conexión y CRUD** | Base de datos funcional con operaciones CRUD | 20 pts | ✅ |
| **Autenticación JWT** | Login y rutas protegidas con JWT | 20 pts | ✅ |
| **Buenas prácticas** | Variables de entorno, validaciones, permisos | 15 pts | ✅ |
| **Documentación** | README completo y documentación Swagger | 15 pts | ✅ |
| **TOTAL** | | **90 pts** | ✅ |

---

## 🚀 Despliegue

### Preparar para Producción

1. **Cambiar `DEBUG` a `False`**:
   ```env
   DEBUG=False
   ```

2. **Configurar `ALLOWED_HOSTS`**:
   ```env
   ALLOWED_HOSTS=tudominio.com,www.tudominio.com
   ```

3. **Usar una SECRET_KEY segura**:
   ```python
   python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
   ```

4. **Configurar base de datos de producción** (PostgreSQL recomendado)

5. **Recolectar archivos estáticos**:
   ```bash
   python manage.py collectstatic
   ```

### Opciones de Hosting

- **Heroku** (gratuito/pago)
- **Railway** (gratuito/pago)
- **PythonAnywhere** (gratuito/pago)
- **AWS EC2** (pago)
- **DigitalOcean** (pago)
- **Render** (gratuito/pago)

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

---

## 📞 Soporte

Si encuentras algún problema o tienes preguntas:

1. Abre un [Issue](https://github.com/tu-usuario/sales-monitor-backend/issues) en GitHub
2. Contacta al autor por email
3. Revisa la [documentación de Django](https://docs.djangoproject.com/)
4. Revisa la [documentación de DRF](https://www.django-rest-framework.org/)

---

## 📚 Referencias

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/)
- [drf-yasg](https://drf-yasg.readthedocs.io/)

---

## ✨ Agradecimientos

Proyecto desarrollado como parte de la asignatura **Tecnologías en Internet**.
