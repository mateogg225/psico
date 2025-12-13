# app/models/course.py
from datetime import datetime
from typing import Optional, List
from uuid import UUID, uuid4
from sqlmodel import Field, SQLModel, Relationship
from enum import Enum


class QuestionType(str, Enum):
    """Tipos de preguntas disponibles en el quiz."""
    CHOICE = "CHOICE"  # Opción múltiple
    TRUE_FALSE = "TRUE_FALSE"  # Verdadero/Falso


class Course(SQLModel, table=True):
    """
    Modelo de Curso/Mentor para Psico Isla.
    
    Representa un mentor de psicología con sus temas y quizzes asociados.
    """
    __tablename__ = "courses"
    
    # --- IDENTIFICADORES ---
    id: Optional[UUID] = Field(
        default_factory=uuid4,
        primary_key=True,
        index=True,
        nullable=False,
        description="UUID único del curso/mentor"
    )
    
    # --- INFORMACIÓN DEL MENTOR ---
    mentor_name: str = Field(
        nullable=False,
        max_length=100,
        index=True,
        description="Nombre del mentor/psicólogo (ej: Sigmund Freud)"
    )
    topic: str = Field(
        nullable=False,
        max_length=100,
        description="Tema principal del mentor (ej: Psicoanálisis)"
    )
    image_url: str = Field(
        nullable=False,
        max_length=500,
        description="URL o path de la imagen del avatar del mentor"
    )
    bg_color: str = Field(
        default="bg-blue-100",
        max_length=50,
        description="Clase de Tailwind para el color de fondo de la tarjeta"
    )
    
    # --- METADATA ---
    description: Optional[str] = Field(
        default=None,
        description="Descripción breve del curso/mentor"
    )
    order: int = Field(
        default=0,
        description="Orden de aparición en la UI"
    )
    is_premium: bool = Field(
        default=False,
        description="Indica si requiere suscripción premium"
    )
    is_active: bool = Field(
        default=True,
        description="Indica si el curso está activo y visible"
    )
    
    # --- AUDITORÍA ---
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        description="Fecha de creación del curso"
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        description="Última actualización del curso"
    )
    
    # --- RELACIONES ---
    questions: List["Question"] = Relationship(
        back_populates="course",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"}
    )


class Question(SQLModel, table=True):
    """
    Modelo de Pregunta de Quiz.
    
    Cada pregunta pertenece a un curso y tiene múltiples opciones de respuesta.
    """
    __tablename__ = "questions"
    
    # --- IDENTIFICADORES ---
    id: Optional[UUID] = Field(
        default_factory=uuid4,
        primary_key=True,
        index=True,
        nullable=False,
        description="UUID único de la pregunta"
    )
    course_id: UUID = Field(
        foreign_key="courses.id",
        nullable=False,
        index=True,
        description="ID del curso al que pertenece esta pregunta"
    )
    
    # --- CONTENIDO DE LA PREGUNTA ---
    text: str = Field(
        nullable=False,
        description="Texto de la pregunta"
    )
    question_type: QuestionType = Field(
        default=QuestionType.CHOICE,
        nullable=False,
        description="Tipo de pregunta (CHOICE o TRUE_FALSE)"
    )
    explanation: Optional[str] = Field(
        default=None,
        description="Explicación que se muestra después de responder"
    )
    
    # --- METADATA ---
    order: int = Field(
        default=0,
        description="Orden de la pregunta dentro del curso"
    )
    difficulty: int = Field(
        default=1,
        ge=1,
        le=5,
        description="Nivel de dificultad de 1 a 5"
    )
    
    # --- AUDITORÍA ---
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False
    )
    
    # --- RELACIONES ---
    course: Course = Relationship(back_populates="questions")
    answers: List["Answer"] = Relationship(
        back_populates="question",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"}
    )


class Answer(SQLModel, table=True):
    """
    Modelo de Respuesta/Opción de una Pregunta.
    
    Cada pregunta tiene múltiples respuestas, solo una es correcta.
    """
    __tablename__ = "answers"
    
    # --- IDENTIFICADORES ---
    id: Optional[UUID] = Field(
        default_factory=uuid4,
        primary_key=True,
        index=True,
        nullable=False,
        description="UUID único de la respuesta"
    )
    question_id: UUID = Field(
        foreign_key="questions.id",
        nullable=False,
        index=True,
        description="ID de la pregunta a la que pertenece esta respuesta"
    )
    
    # --- CONTENIDO DE LA RESPUESTA ---
    text: str = Field(
        nullable=False,
        description="Texto de la opción de respuesta"
    )
    is_correct: bool = Field(
        default=False,
        nullable=False,
        description="Indica si esta es la respuesta correcta"
    )
    
    # --- METADATA ---
    order: int = Field(
        default=0,
        description="Orden de aparición de la opción"
    )
    
    # --- AUDITORÍA ---
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False
    )
    
    # --- RELACIONES ---
    question: Question = Relationship(back_populates="answers")
