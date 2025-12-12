# app/core/database.py
import os
from typing import AsyncGenerator
from sqlmodel import SQLModel, create_engine
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker


# --- CONFIGURACIÓN DE LA BASE DE DATOS ---
# Lee la URL de conexión desde variables de entorno
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError(
        "❌ ERROR: DATABASE_URL no está configurada en el archivo .env\n"
        "Ejemplo: DATABASE_URL=postgresql+asyncpg://user:password@host:5432/database"
    )

# Convertir postgresql:// a postgresql+asyncpg:// si es necesario (Supabase usa postgres://)
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
elif DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)


# --- CREAR MOTOR ASÍNCRONO ---
# AsyncEngine para operaciones no-bloqueantes con PostgreSQL
engine: AsyncEngine = create_async_engine(
    DATABASE_URL,
    echo=True,  # Cambiar a False en producción para no imprimir queries SQL
    future=True,
    pool_pre_ping=True,  # Verifica conexiones antes de usarlas (previene errores de timeout)
)


# --- SESSION MAKER ---
# Configuración para crear sesiones asíncronas
async_session_maker = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,  # Permite usar objetos después del commit
    autocommit=False,
    autoflush=False,
)


# --- DEPENDENCIA PARA FASTAPI ---
async def get_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Generador de sesiones de base de datos para inyección de dependencias.
    
    Uso en endpoints de FastAPI:
        @app.get("/users")
        async def get_users(session: AsyncSession = Depends(get_session)):
            ...
    
    Yields:
        AsyncSession: Sesión activa de base de datos
    """
    async with async_session_maker() as session:
        try:
            yield session
            await session.commit()  # Commit automático si no hay excepciones
        except Exception:
            await session.rollback()  # Rollback en caso de error
            raise
        finally:
            await session.close()  # Cierra la conexión siempre


# --- FUNCIÓN AUXILIAR PARA INICIALIZACIÓN ---
async def create_db_and_tables():
    """
    Crea todas las tablas definidas en los modelos SQLModel.
    Se usa en init_db.py para inicializar la base de datos.
    """
    async with engine.begin() as conn:
        # SQLModel.metadata contiene todas las definiciones de tablas
        await conn.run_sync(SQLModel.metadata.create_all)
