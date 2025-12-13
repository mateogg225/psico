# app/core/init_db.py
import asyncio
from sqlmodel import SQLModel
from app.core.database import engine, create_db_and_tables
from app.models.user import User  # Importar todos los modelos para que SQLModel los registre


async def init_database():
    """
    Inicializa la base de datos creando todas las tablas definidas en los modelos.
    
    Este script debe ejecutarse UNA VEZ después de configurar DATABASE_URL.
    
    Pasos:
    1. Importa todos los modelos (User, Course, etc.)
    2. SQLModel.metadata recolecta sus definiciones
    3. create_all() genera las tablas en PostgreSQL
    """
    print("🔧 Iniciando creación de tablas en la base de datos...")
    
    try:
        # Crear todas las tablas definidas en SQLModel
        await create_db_and_tables()
        print("✅ Tablas creadas exitosamente!")
        print(f"📋 Tablas registradas: {list(SQLModel.metadata.tables.keys())}")
        
    except Exception as e:
        print(f"❌ ERROR al crear tablas: {e}")
        raise
    
    finally:
        # Cerrar el motor de base de datos
        await engine.dispose()
        print("🔌 Conexión a la base de datos cerrada.")


# --- PUNTO DE ENTRADA ---
if __name__ == "__main__":
    """
    Ejecutar desde la terminal:
    
    Windows PowerShell:
        python -m app.core.init_db
    
    Linux/Mac:
        python -m app.core.init_db
    
    REQUISITOS PREVIOS:
    - Archivo .env configurado con DATABASE_URL
    - Dependencias instaladas (pip install -r requirements.txt)
    """
    asyncio.run(init_database())
