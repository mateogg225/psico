# app/core/config.py
import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()


class Settings(BaseSettings):
    """
    Configuración global de la aplicación.
    Lee valores desde variables de entorno (.env) con validación de Pydantic.
    """
    
    # --- BASE DE DATOS ---
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    
    # --- SEGURIDAD JWT ---
    SECRET_KEY: str = os.getenv("SECRET_KEY", "default-secret-key-CHANGE-ME")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
    # --- CONFIGURACIÓN DEL JUEGO ---
    MAX_LIVES: int = int(os.getenv("MAX_LIVES", "5"))
    LIFE_REGEN_MINUTES: int = int(os.getenv("LIFE_REGEN_MINUTES", "30"))
    DAILY_BONUS_DIAMONDS: int = int(os.getenv("DAILY_BONUS_DIAMONDS", "50"))
    
    # --- INFORMACIÓN DE LA APLICACIÓN ---
    APP_NAME: str = "Psico Isla API"
    VERSION: str = "1.0.0"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Instancia global de configuración
settings = Settings()
