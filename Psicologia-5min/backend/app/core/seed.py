# app/core/seed.py
"""
Script para poblar la base de datos con los 9 Mentores y sus preguntas.

Uso:
    python -m app.core.seed

Este script:
1. Borra todas las tablas existentes (CUIDADO: solo para desarrollo)
2. Crea las tablas desde cero
3. Inserta los 9 mentores con sus 5 preguntas cada uno
"""
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import SQLModel
from app.core.database import engine, async_session_maker
from app.models import Course, Question, Answer, QuestionType


# ==================== DATOS DE LOS 9 MENTORES ====================
DATA_PACK = [
    {
        "mentor": "Sigmund Freud",
        "topic": "Psicoanálisis",
        "image": "/freud-avatar.png",
        "bg_color": "bg-blue-100",
        "questions": [
            {"text": "¿Cuál de estas estructuras NO forma parte de la segunda tópica freudiana?", "type": "CHOICE", "options": [{"text": "Ello", "ok": False}, {"text": "Yo", "ok": False}, {"text": "Inconsciente", "ok": True}, {"text": "Superyó", "ok": False}], "explanation": "El Inconsciente pertenece a la primera tópica (junto con Preconsciente y Consciente)."},
            {"text": "¿Qué mecanismo de defensa implica atribuir a otros los propios deseos inaceptables?", "type": "CHOICE", "options": [{"text": "Represión", "ok": False}, {"text": "Proyección", "ok": True}, {"text": "Negación", "ok": False}], "explanation": "En la proyección, 'ponemos afuera' lo que no toleramos adentro."},
            {"text": "¿Cómo llamó Freud a la energía psíquica de las pulsiones de vida?", "type": "CHOICE", "options": [{"text": "Tanatos", "ok": False}, {"text": "Libido", "ok": True}, {"text": "Catarsis", "ok": False}], "explanation": "La libido es la energía del Eros o pulsión de vida."},
            {"text": "La fase 'Operacional' es una etapa del desarrollo psicosexual de Freud.", "type": "TRUE_FALSE", "options": [{"text": "Verdadero", "ok": False}, {"text": "Falso", "ok": True}], "explanation": "Falso. La fase Operacional es de Piaget. Freud habló de Oral, Anal, Fálica, Latencia y Genital."},
            {"text": "¿Qué obra de 1900 es la piedra angular del psicoanálisis?", "type": "CHOICE", "options": [{"text": "La interpretación de los sueños", "ok": True}, {"text": "El malestar en la cultura", "ok": False}], "explanation": "Die Traumdeutung (1900) inauguró el método psicoanalítico."}
        ]
    },
    {
        "mentor": "B.F. Skinner",
        "topic": "Conductismo",
        "image": "/skinner-avatar.png",
        "bg_color": "bg-orange-100",
        "questions": [
            {"text": "¿Qué aprendizaje se basa en consecuencias (premios/castigos)?", "type": "CHOICE", "options": [{"text": "Condicionamiento Clásico", "ok": False}, {"text": "Condicionamiento Operante", "ok": True}], "explanation": "Operante porque el sujeto 'opera' sobre el medio y recibe una consecuencia."},
            {"text": "Un refuerzo negativo consiste en aplicar un castigo.", "type": "TRUE_FALSE", "options": [{"text": "Verdadero", "ok": False}, {"text": "Falso", "ok": True}], "explanation": "Falso. El refuerzo negativo RETIRA algo desagradable para aumentar la conducta."},
            {"text": "¿Cómo se llama el dispositivo para estudiar el comportamiento animal?", "type": "CHOICE", "options": [{"text": "Caja de Skinner", "ok": True}, {"text": "Laberinto de Pavlov", "ok": False}], "explanation": "La cámara de condicionamiento operante es conocida como Caja de Skinner."},
            {"text": "¿Qué programa de reforzamiento produce la tasa de respuesta más alta?", "type": "CHOICE", "options": [{"text": "RazónFija", "ok": False}, {"text": "Razón Variable", "ok": True}], "explanation": "Como en las máquinas tragamonedas, la incertidumbre (variable) genera más adicción."},
            {"text": "El objetivo del conductismo radical es entender la mente interna.", "type": "TRUE_FALSE", "options": [{"text": "Verdadero", "ok": False}, {"text": "Falso", "ok": True}], "explanation": "Falso. Su objetivo es predecir y controlar la conducta observable."}
        ]
    },
    {
        "mentor": "Jacques Lacan",
        "topic": "Estructuralismo",
        "image": "/lacan-avatar.png",
        "bg_color": "bg-yellow-100",
        "questions": [
            {"text": "¿En qué estadio el niño se reconoce en el espejo?", "type": "CHOICE", "options": [{"text": "Estadio del Espejo", "ok": True}, {"text": "Estadio del Narcisismo", "ok": False}], "explanation": "Ocurre entre los 6 y 18 meses y forma el Yo imaginario."},
            {"text": "El inconsciente está estructurado como un...", "type": "CHOICE", "options": [{"text": "Lenguaje", "ok": True}, {"text": "Sueño", "ok": False}, {"text": "Reloj", "ok": False}], "explanation": "Lacan une psicoanálisis y lingüística: el inconsciente sigue reglas de metáfora y metonimia."},
            {"text": "¿Cuál NO es un registro lacaniano?", "type": "CHOICE", "options": [{"text": "Real", "ok": False}, {"text": "Simbólico", "ok": False}, {"text": "Imaginario", "ok": False}, {"text": "Fantástico", "ok": True}], "explanation": "Los tres registros son RSI: Real, Simbólico e Imaginario."},
            {"text": "¿Qué es el 'Objeto a'?", "type": "CHOICE", "options": [{"text": "El objeto del deseo", "ok": False}, {"text": "La causa del deseo", "ok": True}], "explanation": "Es el objeto causa del deseo, aquello inalcanzable que nos mantiene deseando."},
            {"text": "El deseo del hombre es el deseo del Otro.", "type": "TRUE_FALSE", "options": [{"text": "Verdadero", "ok": True}, {"text": "Falso", "ok": False}], "explanation": "Deseamos lo que creemos que el Otro desea o deseamos ser deseados por el Otro."}
        ]
    },
    {
        "mentor": "Jean Piaget",
        "topic": "Desarrollo Cognitivo",
        "image": "/piaget-avatar.png",
        "bg_color": "bg-teal-100",
        "questions": [
            {"text": "¿Cuál es el primer estadio del desarrollo cognitivo?", "type": "CHOICE", "options": [{"text": "Preoperacional", "ok": False}, {"text": "Sensoriomotor", "ok": True}], "explanation": "Abarca desde el nacimiento hasta los 2 años."},
            {"text": "¿Qué proceso incorpora nueva info a esquemas existentes?", "type": "CHOICE", "options": [{"text": "Acomodación", "ok": False}, {"text": "Asimilación", "ok": True}], "explanation": "Asimilación es usar esquemas viejos. Acomodación es cambiar el esquema."},
            {"text": "¿Cuándo se desarrolla el pensamiento abstracto?", "type": "CHOICE", "options": [{"text": "Operaciones Concretas", "ok": False}, {"text": "Operaciones Formales", "ok": True}], "explanation": "A partir de la adolescencia (11-12 años en adelante)."},
            {"text": "La permanencia del objeto se logra en el estadio Sensoriomotor.", "type": "TRUE_FALSE", "options": [{"text": "Verdadero", "ok": True}, {"text": "Falso", "ok": False}], "explanation": "Saber que las cosas existen aunque no las veamos."},
            {"text": "Para Piaget, el aprendizaje es un proceso pasivo.", "type": "TRUE_FALSE", "options": [{"text": "Verdadero", "ok": False}, {"text": "Falso", "ok": True}], "explanation": "Falso. Es una construcción activa (Constructivismo)."}
        ]
    },
    {
        "mentor": "Melanie Klein",
        "topic": "Psicoanálisis Infantil",
        "image": "/klein-avatar.png",
        "bg_color": "bg-pink-100",
        "questions": [
            {"text": "¿Qué técnica desarrolló para analizar niños?", "type": "CHOICE", "options": [{"text": "Asociación Libre", "ok": False}, {"text": "Juego (Play Technique)", "ok": True}], "explanation": "El juego es al niño lo que la asociación libre es al adulto."},
            {"text": "¿Cuáles son las dos posiciones kleinianas?", "type": "CHOICE", "options": [{"text": "Oral y Anal", "ok": False}, {"text": "Esquizo-paranoide y Depresiva", "ok": True}], "explanation": "No son etapas que se superan, sino posiciones mentales."},
            {"text": "¿Qué mecanismo divide los objetos en 'buenos' y 'malos'?", "type": "CHOICE", "options": [{"text": "Escisión (Splitting)", "ok": True}, {"text": "Represión", "ok": False}], "explanation": "T típico de la posición esquizo-paranoide."},
            {"text": "La posición depresiva implica culpa y deseo de reparación.", "type": "TRUE_FALSE", "options": [{"text": "Verdadero", "ok": True}, {"text": "Falso", "ok": False}], "explanation": "El niño teme haber dañado al objeto amado."},
            {"text": "Klein enfatizó el Complejo de Edipo temprano.", "type": "TRUE_FALSE", "options": [{"text": "Verdadero", "ok": True}, {"text": "Falso", "ok": False}], "explanation": "Lo situó mucho antes que Freud, en el primer año de vida."}
        ]
    },
    {
        "mentor": "Anna Freud",
        "topic": "Mecanismos de Defensa",
        "image": "/anna-avatar.png",
        "bg_color": "bg-rose-100",
        "questions": [
            {"text": "Anna Freud se centró en el estudio del...", "type": "CHOICE", "options": [{"text": "Ello", "ok": False}, {"text": "Yo", "ok": True}], "explanation": "Fundó la Psicología del Yo."},
            {"text": "¿Qué libro escribió en 1936?", "type": "CHOICE", "options": [{"text": "El Yo y los mecanismos de defensa", "ok": True}, {"text": "El malestar en la cultura", "ok": False}], "explanation": "Su obra cumbre clasificando las defensas."},
            {"text": "¿Qué ansiedad es crucial en el desarrollo infantil?", "type": "CHOICE", "options": [{"text": "Separación", "ok": True}, {"text": "Castración", "ok": False}], "explanation": "El miedo a perder el objeto amado."},
            {"text": "La intelectualización es un mecanismo de defensa.", "type": "TRUE_FALSE", "options": [{"text": "Verdadero", "ok": True}, {"text": "Falso", "ok": False}], "explanation": "Aislar la emoción hablando de forma abstracta."},
            {"text": "Anna Freud apoyaba completamente las ideas de Melanie Klein.", "type": "TRUE_FALSE", "options": [{"text": "Verdadero", "ok": False}, {"text": "Falso", "ok": True}], "explanation": "Falso. Tuvieron grandes debates (Controversias de Londres)."}
        ]
    },
    {
        "mentor": "Carl Jung",
        "topic": "Psicología Analítica",
        "image": "/jung-avatar.png",
        "bg_color": "bg-indigo-100",
        "questions": [
            {"text": "¿Qué concepto refiere a contenidos heredados universales?", "type": "CHOICE", "options": [{"text": "Inconsciente Colectivo", "ok": True}, {"text": "Preconsciente", "ok": False}], "explanation": "La capa más profunda de la psique humana."},
            {"text": "Los Arquetipos son imágenes universales.", "type": "TRUE_FALSE", "options": [{"text": "Verdadero", "ok": True}, {"text": "Falso", "ok": False}], "explanation": "Patrones como el Héroe, la Madre, el Sabio."},
            {"text": "¿Qué arquetipo es el lado oscuro de la personalidad?", "type": "CHOICE", "options": [{"text": "La Persona", "ok": False}, {"text": "La Sombra", "ok": True}], "explanation": "Lo que negamos de nosotros mismos."},
            {"text": "¿Qué actitudes básicas describió Jung?", "type": "CHOICE", "options": [{"text": "Introversión / Extroversión", "ok": True}, {"text": "Neurosis / Psicosis", "ok": False}], "explanation": "Hacia dónde se dirige la libido (adentro o afuera)."},
            {"text": "El proceso de realización personal se llama...", "type": "CHOICE", "options": [{"text": "Individuación", "ok": True}, {"text": "Sublimación", "ok": False}], "explanation": "Llegar a ser uno mismo integrando los opuestos."}
        ]
    },
    {
        "mentor": "Carl Rogers",
        "topic": "Humanismo",
        "image": "/rogers-avatar.png",
        "bg_color": "bg-green-100",
        "questions": [
            {"text": "Rogers es fundador de la Psicología...", "type": "CHOICE", "options": [{"text": "Conductista", "ok": False}, {"text": "Humanista", "ok": True}], "explanation": "La 'Tercera Fuerza' de la psicología."},
            {"text": "Su terapia se llama 'Centrada en el Cliente'.", "type": "TRUE_FALSE", "options": [{"text": "Verdadero", "ok": True}, {"text": "Falso", "ok": False}], "explanation": "Cambió 'paciente' por 'cliente' para dar poder a la persona."},
            {"text": "¿Qué es condición necesaria para la terapia?", "type": "CHOICE", "options": [{"text": "Aceptación incondicional", "ok": True}, {"text": "Interpretación", "ok": False}], "explanation": "Aceptar al otro sin juzgarlo."},
            {"text": "¿Qué es la Congruencia?", "type": "CHOICE", "options": [{"text": "Equilibrio entre Yo Real y Yo Ideal", "ok": True}, {"text": "Tener mucho dinero", "ok": False}], "explanation": "Ser auténtico."},
            {"text": "El reflejo es una técnica de escucha activa.", "type": "TRUE_FALSE", "options": [{"text": "Verdadero", "ok": True}, {"text": "Falso", "ok": False}], "explanation": "Devolver al cliente lo que dijo para mostrar comprensión."}
        ]
    },
    {
        "mentor": "John Bowlby",
        "topic": "Teoría del Apego",
        "image": "/bowlby-avatar.png",
        "bg_color": "bg-rose-100",
        "questions": [
            {"text": "El apego es una necesidad...", "type": "CHOICE", "options": [{"text": "Secundaria", "ok": False}, {"text": "Biológica primaria", "ok": True}], "explanation": "Evolutivamente diseñada para la supervivencia."},
            {"text": "¿Qué apego implica confianza en el cuidador?", "type": "CHOICE", "options": [{"text": "Seguro", "ok": True}, {"text": "Evitativo", "ok": False}], "explanation": "Saber que el cuidador estará ahí si se le necesita."},
            {"text": "¿Quién creó la 'Situación Extraña'?", "type": "CHOICE", "options": [{"text": "Bowlby", "ok": False}, {"text": "Mary Ainsworth", "ok": True}], "explanation": "Colaboradora clave de Bowlby."},
            {"text": "Los esquemas mentales sobre las relaciones se llaman...", "type": "CHOICE", "options": [{"text": "Modelos Operativos Internos", "ok": True}, {"text": "Arquetipos", "ok": False}], "explanation": "Mapas mentales de cómo funciona el amor y la seguridad."},
            {"text": "Bowlby estudió principalmente el condicionamiento en ratas.", "type": "TRUE_FALSE", "options": [{"text": "Verdadero", "ok": False}, {"text": "Falso", "ok": True}], "explanation": "Falso. Estudió niños institucionalizados y vínculos afectivos."}
        ]
    }
]


async def drop_all_tables():
    """
    PELIGRO: Borra todas las tablas de la base de datos.
    Solo usar en desarrollo.
    """
    print("⚠️  Borrando todas las tablas...")
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.drop_all)
    print("✅ Tablas borradas")


async def create_all_tables():
    """
    Crea todas las tablas definidas en los modelos SQLModel.
    """
    print("📦 Creando tablas...")
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
    print("✅ Tablas creadas")


async def seed_mentors_and_questions():
    """
    Puebla la base de datos con los 9 mentores y sus preguntas.
    """
    print("\n🌱 Iniciando seed de datos...\n")
    
    async with async_session_maker() as session:
        for idx, mentor_data in enumerate(DATA_PACK, 1):
            print(f"📚 [{idx}/9] Creando mentor: {mentor_data['mentor']}")
            
            # Crear el Course (Mentor)
            course = Course(
                mentor_name=mentor_data["mentor"],
                topic=mentor_data["topic"],
                image_url=mentor_data["image"],
                bg_color=mentor_data["bg_color"],
                order=idx,
                is_active=True
            )
            session.add(course)
            await session.flush()  # Para obtener el ID del course
            
            # Crear las preguntas y respuestas
            for q_idx, q_data in enumerate(mentor_data["questions"], 1):
                # Determinar el tipo de pregunta
                question_type = QuestionType.TRUE_FALSE if q_data["type"] == "TRUE_FALSE" else QuestionType.CHOICE
                
                # Crear la Question
                question = Question(
                    course_id=course.id,
                    text=q_data["text"],
                    question_type=question_type,
                    explanation=q_data.get("explanation"),
                    order=q_idx
                )
                session.add(question)
                await session.flush()  # Para obtener el ID de la question
                
                # Crear las Answer (opciones)
                for a_idx, option in enumerate(q_data["options"], 1):
                    answer = Answer(
                        question_id=question.id,
                        text=option["text"],
                        is_correct=option["ok"],
                        order=a_idx
                    )
                    session.add(answer)
                
                print(f"   ✓ Pregunta {q_idx}: {q_data['text'][:60]}...")
            
            await session.commit()
            print(f"   ✅ Mentor completado con {len(mentor_data['questions'])} preguntas\n")
    
    print("🎉 ¡Seed completado exitosamente!")
    print(f"   - {len(DATA_PACK)} mentores creados")
    print(f"   - {len(DATA_PACK) * 5} preguntas totales")
    print(f"   - ~{len(DATA_PACK) * 5 * 3} respuestas promedio\n")


async def main():
    """
    Punto de entrada principal del script.
    
    ADVERTENCIA: Borra todas las tablas antes de crear nuevas.
    Solo ejecutar en desarrollo.
    """
    print("=" * 60)
    print("🏝️  PSICO ISLA - SEED DATABASE")
    print("=" * 60)
    print("\n⚠️  ADVERTENCIA: Este script borrará todas las tablas existentes.")
    print("   Solo ejecutar en entornos de desarrollo.\n")
    
    # Paso 1: Borrar tablas existentes
    await drop_all_tables()
    
    # Paso 2: Crear tablas desde cero
    await create_all_tables()
    
    # Paso 3: Poblar con datos
    await seed_mentors_and_questions()
    
    print("=" * 60)
    print("✨ Proceso completado. Base de datos lista para usar.")
    print("=" * 60)


if __name__ == "__main__":
    # Ejecutar el script
    asyncio.run(main())
