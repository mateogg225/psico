# app/models/user.py
from datetime import datetime, date
from typing import Optional
from uuid import UUID, uuid4
from sqlmodel import Field, SQLModel, Relationship


class User(SQLModel, table=True):
    """
    Modelo de Usuario para Psico Isla.
    
    Representa al jugador con su perfil, autenticación y economía del juego.
    Incluye la gestión de diamantes, vidas y sistema de bonus por login diario.
    
    Reglas de Negocio Implementadas:
    - RN1: Economía (Diamantes y Vidas)
    - RN2: Vidas con max 5, regeneración temporal
    - RN5: Login diario con bonus de diamantes
    - RN6: Soft-lock (navegación sin restricción total)
    """
    __tablename__ = "users"

    # --- IDENTIFICADORES Y AUTENTICACIÓN ---
    id: Optional[UUID] = Field(
        default_factory=uuid4,
        primary_key=True,
        index=True,
        nullable=False,
        description="UUID único del usuario (mayor seguridad que int)"
    )
    email: str = Field(
        unique=True, 
        index=True, 
        nullable=False,
        max_length=255,
        description="Email único del usuario para autenticación"
    )
    hashed_password: str = Field(
        nullable=False,
        description="Contraseña hasheada con bcrypt (nunca almacenar en texto plano)"
    )
    
    # --- PERFIL DEL USUARIO ---
    full_name: Optional[str] = Field(
        default=None,
        max_length=200,
        description="Nombre completo del usuario visible en la plataforma"
    )
    username: Optional[str] = Field(
        default=None,
        unique=True,
        index=True,
        max_length=50,
        description="Nombre de usuario único (opcional, puede usar email)"
    )
    avatar_url: Optional[str] = Field(
        default=None,
        description="URL del avatar del usuario (puede ser iniciales o imagen)"
    )
    role: str = Field(
        default="student",
        max_length=20,
        description="Rol del usuario: 'student', 'admin', 'moderator'"
    )
    
    # --- ESTADO DE LA CUENTA ---
    is_active: bool = Field(
        default=True,
        description="Indica si la cuenta está activa (suspensiones temporales)"
    )
    is_verified: bool = Field(
        default=False,
        description="Indica si el email ha sido verificado"
    )
    is_superuser: bool = Field(
        default=False,
        description="Indica si tiene permisos de administrador"
    )

    # --- GAMIFICACIÓN: ECONOMÍA (RN1) ---
    diamonds: int = Field(
        default=100,  # Regalo inicial para incentivar engagement
        ge=0,  # No puede ser negativo
        description="Moneda virtual para comprar vidas, cursos premium o cosméticos"
    )
    
    # --- GAMIFICACIÓN: VIDAS (RN2) ---
    lives: int = Field(
        default=5,
        ge=0,  # Puede llegar a 0 (soft-lock)
        le=5,  # Máximo 5 vidas
        description="Vidas actuales del jugador. Se pierden al fallar preguntas"
    )
    last_life_regen: Optional[datetime] = Field(
        default=None,
        description="Timestamp de la última regeneración automática de vida"
    )
    
    # --- BONUS Y STREAKS (RN5) ---
    last_login: Optional[datetime] = Field(
        default=None,
        description="Fecha del último login exitoso (para tracking general)"
    )
    last_daily_bonus: Optional[date] = Field(
        default=None,
        description="Fecha del último cobro de bonus diario (separado del login)"
    )
    streak_count: int = Field(
        default=0,
        ge=0,
        description="Días consecutivos de login (para bonus progresivos)"
    )
    
    # --- AUDITORÍA Y TIMESTAMPS ---
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        description="Fecha de registro del usuario en la plataforma"
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        description="Última actualización del perfil del usuario"
    )
    
    # --- RELACIONES (se configurarán cuando existan los modelos relacionados) ---
    # course_progress: list["CourseProgress"] = Relationship(back_populates="user")
    # transactions: list["Transaction"] = Relationship(back_populates="user")
    # achievements: list["UserAchievement"] = Relationship(back_populates="user")
