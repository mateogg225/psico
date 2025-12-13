# 🎮 Psico Isla Backend

Backend gamificado para aprender psicología estilo Duolingo, construido con **FastAPI**, **SQLModel** y **PostgreSQL (Supabase)**.

---

## 📁 Estructura del Proyecto

```
backend/
├── 📄 .env                  # Configuración (NO COMMITEAR)
├── 📄 .env.example          # Plantilla de configuración
├── 📄 main.py               # Entry point FastAPI
├── 📄 requirements.txt      # Dependencias Python
└── 📂 app/
    ├── 📂 core/
    │   ├── config.py        # Variables de entorno centralizadas
    │   ├── database.py      # Motor asíncrono + get_session()
    │   └── init_db.py       # Script para crear tablas
    ├── 📂 models/
    │   └── user.py          # Modelo User con UUID + gamificación
    ├── 📂 schemas/          # (Pydantic Request/Response)
    ├── 📂 api/v1/           # (Endpoints REST)
    └── 📂 services/         # (Lógica de negocio)
```

---

## 🚀 Instalación y Configuración

### 1. Crear Entorno Virtual
```powershell
# Crear entorno virtual
python -m venv venv

# Activar (Windows)
.\venv\Scripts\Activate.ps1

# Activar (Linux/Mac)
source venv/bin/activate
```

### 2. Instalar Dependencias
```powershell
pip install -r requirements.txt
```

> [!IMPORTANT]
> Si usas **Python 3.13** y tienes errores con `pydantic-core`, las versiones en `requirements.txt` ya están actualizadas para evitar problemas de compilación con Rust.

### 3. Configurar Variables de Entorno

```powershell
# Copiar plantilla
Copy-Item .env.example .env

# Editar con tus credenciales
notepad .env  # Windows
nano .env     # Linux/Mac
```

**Obtener DATABASE_URL de Supabase:**
1. Ve a tu proyecto en [Supabase](https://supabase.com)
2. Settings → Database → Connection String
3. Copia la URL (formato: `postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres`)
4. Pégala en `.env`

**Generar SECRET_KEY seguro:**
```powershell
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 4. Crear Tablas en la Base de Datos
```powershell
python -m app.core.init_db
```

**Output esperado:**
```
🔧 Iniciando creación de tablas...
✅ Tablas creadas exitosamente!
📋 Tablas registradas: ['users']
🔌 Conexión a la base de datos cerrada.
```

### 5. Ejecutar Servidor
```powershell
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Endpoints disponibles:**
- 🌐 API Root: http://localhost:8000
- 📖 Documentación Interactiva: http://localhost:8000/docs
- 🔍 Health Check: http://localhost:8000/health

---

## 🎯 Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Python | 3.10+ | Lenguaje principal |
| FastAPI | 0.115.6 | Framework web |
| SQLModel | 0.0.22 | ORM (Pydantic + SQLAlchemy) |
| Supabase | - | PostgreSQL hospedado |
| asyncpg | 0.30.0 | Driver PostgreSQL asíncrono |
| JWT | 2.10.1 | Autenticación |
| Passlib | 1.7.4 | Hash de contraseñas |

---

## 🔑 Características del Modelo User

El modelo de usuario incluye:

### Autenticación
- `id`: UUID (mayor seguridad que int)
- `email`: Único, indexado
- `hashed_password`: Bcrypt
- `role`: 'student', 'admin', 'moderator'

### Gamificación
- `diamonds`: Moneda virtual (default: 100)
- `lives`: Vidas actuales (max: 5, min: 0)
- `streak_count`: Días consecutivos de login

### Sistema de Bonus Diario
- `last_login`: Timestamp del último login
- `last_daily_bonus`: Fecha (Date) del último cobro de bonus
- `last_life_regen`: Para regeneración temporal de vidas

### Auditoría
- `created_at`: Fecha de registro
- `updated_at`: Última actualización
- `is_active`: Estado de la cuenta
- `is_verified`: Email verificado

---

## 🎮 Reglas de Negocio Implementadas

| ID | Regla | Estado |
|----|-------|--------|
| RN1 | Economía (Diamantes/Vidas) | ✅ |
| RN2 | Max 5 vidas, regeneración temporal | ✅ |
| RN5 | Bonus diario separado del login | ✅ |
| RN6 | Soft-lock (navegación con 0 vidas) | ✅ |

---

## 📝 Configuración del Juego (.env)

```env
# Valores por defecto configurables
MAX_LIVES=5                    # Máximo de vidas
LIFE_REGEN_MINUTES=30          # Minutos para regenerar 1 vida
DAILY_BONUS_DIAMONDS=50        # Diamantes por login diario
ACCESS_TOKEN_EXPIRE_MINUTES=30 # Expiración del JWT
```

---

## 🔐 Seguridad

- ✅ Contraseñas hasheadas con **bcrypt**
- ✅ Autenticación JWT con OAuth2 Password Bearer
- ✅ UUIDs en lugar de IDs secuenciales
- ✅ Validación de tipos con Pydantic
- ✅ Variables sensibles en `.env` (excluido de Git)

---

## 🧪 Testing

```powershell
# Ejecutar tests
pytest

# Con coverage
pytest --cov=app tests/
```

---

## 📦 Próximas Fases

### Fase 2: Autenticación (Próximo)
- [ ] `app/core/security.py` (Hash + JWT)
- [ ] `app/schemas/user.py` (UserCreate, UserRead, Token)
- [ ] `app/api/v1/auth.py` (Register, Login, Refresh)
- [ ] `app/services/auth_service.py` (Lógica de autenticación)

### Fase 3: Endpoints de Usuario
- [ ] GET `/api/v1/users/me` (Perfil actual)
- [ ] PUT `/api/v1/users/me` (Actualizar perfil)
- [ ] GET `/api/v1/users/{id}` (Ver usuario)

### Fase 4: Gamificación
- [ ] `app/services/game_service.py`
- [ ] Sistema de regeneración de vidas
- [ ] Cálculo de bonus diario
- [ ] Manejo de streaks

---

## 🐛 Troubleshooting

### Error: `ModuleNotFoundError: No module named 'fastapi'`
La instalación de dependencias falló. Reinstala:
```powershell
pip install --no-cache-dir -r requirements.txt
```

### Error: `DATABASE_URL no está configurada`
Revisa tu archivo `.env` y asegúrate de que existe y tiene la variable `DATABASE_URL`.

### Error: Rust/Cargo requerido (pydantic-core)
Actualiza a versiones más recientes en `requirements.txt`:
```txt
pydantic[email]==2.10.6
pydantic-settings==2.7.1
```

### Puerto 8000 en uso
Cambia el puerto:
```powershell
uvicorn main:app --reload --port 8001
```

---

## 📚 Recursos

- [FastAPI Docs](https://fastapi.tiangolo.com)
- [SQLModel Docs](https://sqlmodel.tiangolo.com)
- [Supabase Docs](https://supabase.com/docs)
- [Pydantic Docs](https://docs.pydantic.dev)

---

## 👨‍💻 Desarrollo

**Autor**: Equipo Psico Isla  
**Versión**: 1.0.0  
**Licencia**: MIT  

---

¿Preguntas? Revisa la documentación en `http://localhost:8000/docs` cuando el servidor esté corriendo 🚀
