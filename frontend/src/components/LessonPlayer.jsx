import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGame } from '../context/GameContext';

/**
 * Componente LessonPlayer - Reproductor de lecciones interactivas con sistema de gamificación
 * Permite a los usuarios responder preguntas sobre diferentes mentores de psicología
 * y ganar diamantes y puntos por respuestas correctas.
 */
export default function LessonPlayer() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addDiamonds } = useGame();

    // Estado del juego
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [showDiamondPopup, setShowDiamondPopup] = useState(false);
    const [diamondsEarned, setDiamondsEarned] = useState(0);

    // Banco de preguntas por mentor (datos estáticos)
    const MENTOR_QUESTIONS = {
        1: [ // Sigmund Freud
            {
                id: "freud_01",
                category: "Historia",
                question: "¿Quién es considerado el padre del Psicoanálisis?",
                options: ["Carl Jung", "Sigmund Freud", "Lacan"],
                correctAnswer: "Sigmund Freud"
            },
            {
                id: "freud_02",
                category: "Estructura Psíquica",
                question: "¿Qué instancia psíquica representa los instintos y deseos primitivos?",
                options: ["El Yo", "El Superyó", "El Ello"],
                correctAnswer: "El Ello"
            },
            {
                id: "freud_03",
                category: "Conceptos",
                question: "Según Freud, ¿cuál es la 'vía regia' de acceso al inconsciente?",
                options: ["Los sueños", "La hipnosis", "Los actos fallidos"],
                correctAnswer: "Los sueños"
            },
            {
                id: "freud_04",
                category: "Estructura Psíquica",
                question: "¿Qué instancia actúa como mediador y principio de realidad?",
                options: ["El Ello", "El Yo", "El Superyó"],
                correctAnswer: "El Yo"
            },
            {
                id: "freud_05",
                category: "Desarrollo",
                question: "¿En qué complejo el niño siente deseo por el progenitor del sexo opuesto?",
                options: ["Complejo de Electra", "Complejo de Edipo", "Complejo de Inferioridad"],
                correctAnswer: "Complejo de Edipo"
            }
        ],
        2: [ // B.F. Skinner
            {
                id: "skinner_01",
                category: "Teoría",
                question: "¿Con qué tipo de condicionamiento se asocia principalmente a Skinner?",
                options: ["Condicionamiento Clásico", "Condicionamiento Operante", "Aprendizaje Vicario"],
                correctAnswer: "Condicionamiento Operante"
            },
            {
                id: "skinner_02",
                category: "Experimento",
                question: "¿Cómo se llama el famoso dispositivo diseñado por Skinner para estudiar el comportamiento animal?",
                options: ["La Caja de Skinner", "El Laberinto de Ratas", "La Jaula del Conductismo"],
                correctAnswer: "La Caja de Skinner"
            },
            {
                id: "skinner_03",
                category: "Conceptos",
                question: "¿Qué consecuencia aumenta la probabilidad de que una conducta se repita?",
                options: ["El Castigo", "El Refuerzo", "La Extinción"],
                correctAnswer: "El Refuerzo"
            },
            {
                id: "skinner_04",
                category: "Filosofía",
                question: "¿En qué se enfoca el conductismo radical de Skinner?",
                options: ["En los procesos mentales internos", "En la conducta observable", "En el inconsciente"],
                correctAnswer: "En la conducta observable"
            },
            {
                id: "skinner_05",
                category: "Conceptos",
                question: "¿Qué ocurre cuando se retira un estímulo desagradable para aumentar una conducta?",
                options: ["Refuerzo Positivo", "Refuerzo Negativo", "Castigo Positivo"],
                correctAnswer: "Refuerzo Negativo"
            }
        ],
        3: [ // Jacques Lacan
            {
                id: "lacan_01",
                category: "Desarrollo",
                question: "¿Qué concepto describe el momento en que el niño reconoce su propia imagen y forma su Yo?",
                options: ["El Estadio del Espejo", "El Complejo de Edipo", "La Fase Oral"],
                correctAnswer: "El Estadio del Espejo"
            },
            {
                id: "lacan_02",
                category: "Teoría",
                question: "Según Lacan, ¿cómo está estructurado el inconsciente?",
                options: ["Como un caos de instintos", "Como un lenguaje", "Como una máquina biológica"],
                correctAnswer: "Como un lenguaje"
            },
            {
                id: "lacan_03",
                category: "Registros",
                question: "¿Cuáles son los tres registros fundamentales en la teoría de Lacan?",
                options: ["Ello, Yo y Superyó", "Real, Simbólico e Imaginario", "Consciente, Preconsciente e Inconsciente"],
                correctAnswer: "Real, Simbólico e Imaginario"
            },
            {
                id: "lacan_04",
                category: "Conceptos",
                question: "¿Cómo denomina Lacan al objeto causa de deseo inalcanzable?",
                options: ["Objeto a", "El Falo", "El Gran Otro"],
                correctAnswer: "Objeto a"
            },
            {
                id: "lacan_05",
                category: "Historia",
                question: "¿Qué movimiento proponía Lacan respecto a la obra de Freud?",
                options: ["Superar a Freud", "Un retorno a Freud", "Ignorar a Freud"],
                correctAnswer: "Un retorno a Freud"
            }
        ],
        4: [ // Jean Piaget
            {
                id: "piaget_01",
                category: "Etapas",
                question: "¿Cuál es la primera etapa del desarrollo cognitivo según Piaget (0-2 años)?",
                options: ["Preoperacional", "Sensoriomotora", "Operaciones Concretas"],
                correctAnswer: "Sensoriomotora"
            },
            {
                id: "piaget_02",
                category: "Conceptos",
                question: "¿Cómo se llama el proceso de incorporar nueva información a esquemas ya existentes?",
                options: ["Acomodación", "Asimilación", "Equilibración"],
                correctAnswer: "Asimilación"
            },
            {
                id: "piaget_03",
                category: "Hitos",
                question: "¿Qué logro marca el final de la etapa sensoriomotora (saber que algo existe aunque no se vea)?",
                options: ["Permanencia del objeto", "Egocentrismo", "Pensamiento abstracto"],
                correctAnswer: "Permanencia del objeto"
            },
            {
                id: "piaget_04",
                category: "Etapas",
                question: "¿En qué etapa se desarrolla el pensamiento lógico sobre objetos físicos y la conservación?",
                options: ["Operaciones Formales", "Operaciones Concretas", "Preoperacional"],
                correctAnswer: "Operaciones Concretas"
            },
            {
                id: "piaget_05",
                category: "Conceptos",
                question: "¿Qué característica define el pensamiento de la etapa preoperacional?",
                options: ["Lógica deductiva", "Egocentrismo", "Reversibilidad"],
                correctAnswer: "Egocentrismo"
            }
        ],
        5: [ // Melanie Klein
            {
                id: "klein_01",
                category: "Técnica",
                question: "¿Qué técnica pionera utilizó Klein para analizar a niños pequeños?",
                options: ["La hipnosis", "La técnica del juego", "La asociación libre verbal"],
                correctAnswer: "La técnica del juego"
            },
            {
                id: "klein_02",
                category: "Posiciones",
                question: "¿Cuál es la primera posición mental que atraviesa el bebé (marcada por la ansiedad persecutoria)?",
                options: ["Posición Depresiva", "Posición Paranoide-Esquizoide", "Etapa del Espejo"],
                correctAnswer: "Posición Paranoide-Esquizoide"
            },
            {
                id: "klein_03",
                category: "Conceptos",
                question: "¿Cómo percibe el bebé al objeto en los primeros meses de vida (ej. el pecho)?",
                options: ["Como un objeto total", "Como un objeto parcial (bueno/malo)", "Como un objeto transicional"],
                correctAnswer: "Como un objeto parcial (bueno/malo)"
            },
            {
                id: "klein_04",
                category: "Posiciones",
                question: "¿Qué sentimiento caracteriza la entrada en la Posición Depresiva?",
                options: ["La culpa y el deseo de reparación", "El miedo a la aniquilación", "La indiferencia"],
                correctAnswer: "La culpa y el deseo de reparación"
            },
            {
                id: "klein_05",
                category: "Mecanismos",
                question: "¿Qué mecanismo consiste en expulsar partes del self e introducirlas en otro objeto?",
                options: ["Identificación Proyectiva", "Represión", "Racionalización"],
                correctAnswer: "Identificación Proyectiva"
            }
        ],
        6: [ // Anna Freud
            {
                id: "anna_01",
                category: "Obra",
                question: "¿Cuál es la obra más famosa de Anna Freud?",
                options: ["El Yo y los Mecanismos de Defensa", "Análisis de un niño", "La interpretación de los sueños"],
                correctAnswer: "El Yo y los Mecanismos de Defensa"
            },
            {
                id: "anna_02",
                category: "Enfoque",
                question: "A diferencia de su padre (centrado en el Ello), ¿en qué instancia psíquica se enfocó Anna Freud?",
                options: ["En el Superyó", "En el Yo (Ego)", "En el Inconsciente"],
                correctAnswer: "En el Yo (Ego)"
            },
            {
                id: "anna_03",
                category: "Mecanismos",
                question: "¿Qué mecanismo describe cuando una persona asume los rasgos de quien le teme o le agrede?",
                options: ["Identificación con el agresor", "Proyección", "Negación"],
                correctAnswer: "Identificación con el agresor"
            },
            {
                id: "anna_04",
                category: "Historia",
                question: "Anna Freud tuvo una famosa controversia teórica sobre el análisis de niños con...",
                options: ["Carl Jung", "Melanie Klein", "Jacques Lacan"],
                correctAnswer: "Melanie Klein"
            },
            {
                id: "anna_05",
                category: "Conceptos",
                question: "¿Cuál es la función principal de los mecanismos de defensa según Anna Freud?",
                options: ["Proteger al Yo de la ansiedad", "Satisfacer los impulsos del Ello", "Eliminar el Superyó"],
                correctAnswer: "Proteger al Yo de la ansiedad"
            }
        ],
        7: [ // Carl Jung
            {
                id: "jung_01",
                category: "Estructura Psíquica",
                question: "¿Qué concepto introdujo Jung para referirse a la capa profunda del inconsciente compartida por toda la humanidad?",
                options: ["Inconsciente Personal", "Inconsciente Colectivo", "Conciencia Cósmica"],
                correctAnswer: "Inconsciente Colectivo"
            },
            {
                id: "jung_02",
                category: "Arquetipos",
                question: "¿Cómo llamó Jung a las imágenes primordiales y patrones universales heredados?",
                options: ["Instintos", "Arquetipos", "Complejos"],
                correctAnswer: "Arquetipos"
            },
            {
                id: "jung_03",
                category: "Arquetipos",
                question: "¿Qué arquetipo representa el 'lado oscuro' o los aspectos rechazados de la personalidad?",
                options: ["La Sombra", "El Ánima", "El Viejo Sabio"],
                correctAnswer: "La Sombra"
            },
            {
                id: "jung_04",
                category: "Tipología",
                question: "¿Qué dos actitudes básicas de la personalidad definió Jung?",
                options: ["Activo y Pasivo", "Introvertido y Extrovertido", "Neurótico y Psicótico"],
                correctAnswer: "Introvertido y Extrovertido"
            },
            {
                id: "jung_05",
                category: "Proceso",
                question: "¿Cómo se llama el proceso de desarrollo para integrar los opuestos y alcanzar la totalidad del Ser?",
                options: ["Individuación", "Sublimación", "Catarsis"],
                correctAnswer: "Individuación"
            }
        ],
        8: [ // Carl Rogers
            {
                id: "rogers_01",
                category: "Terapia",
                question: "¿Cómo denominó Carl Rogers a su enfoque terapéutico?",
                options: ["Psicoanálisis", "Terapia Centrada en el Cliente", "Terapia Racional Emotiva"],
                correctAnswer: "Terapia Centrada en el Cliente"
            },
            {
                id: "rogers_02",
                category: "Conceptos",
                question: "¿Qué actitud fundamental debe tener el terapeuta hacia el cliente (aceptarlo sin juzgar)?",
                options: ["Aceptación positiva incondicional", "Neutralidad analítica", "Confrontación directa"],
                correctAnswer: "Aceptación positiva incondicional"
            },
            {
                id: "rogers_03",
                category: "Conceptos",
                question: "¿Qué término usa Rogers para describir la coincidencia entre el 'Yo real' y la experiencia (ser auténtico)?",
                options: ["Congruencia", "Resiliencia", "Introyección"],
                correctAnswer: "Congruencia"
            },
            {
                id: "rogers_04",
                category: "Habilidad",
                question: "¿Qué capacidad permite al terapeuta sentir el mundo privado del cliente 'como si' fuera propio?",
                options: ["Simpatía", "Empatía", "Transferencia"],
                correctAnswer: "Empatía"
            },
            {
                id: "rogers_05",
                category: "Escuela",
                question: "Rogers es uno de los fundadores de la...",
                options: ["Psicología Conductista", "Psicología Humanista", "Psicología Cognitiva"],
                correctAnswer: "Psicología Humanista"
            }
        ],
        9: [ // John Bowlby
            {
                id: "bowlby_01",
                category: "Teoría",
                question: "¿De qué famosa teoría es considerado el padre John Bowlby?",
                options: ["Teoría del Apego", "Teoría del Aprendizaje Social", "Teoría de la Gestalt"],
                correctAnswer: "Teoría del Apego"
            },
            {
                id: "bowlby_02",
                category: "Conceptos",
                question: "¿Qué concepto define al cuidador como un punto de partida y retorno seguro para que el niño explore el mundo?",
                options: ["Base Segura", "Objeto Transicional", "Zona de Confort"],
                correctAnswer: "Base Segura"
            },
            {
                id: "bowlby_03",
                category: "Reacción",
                question: "¿Qué respuesta instintiva exhibe un niño cuando es alejado de su figura de apego?",
                options: ["Indiferencia", "Ansiedad de separación", "Euforia"],
                correctAnswer: "Ansiedad de separación"
            },
            {
                id: "bowlby_04",
                category: "Estructura Mental",
                question: "¿Cómo llamó Bowlby a las representaciones mentales del 'self' y de los otros que guían las relaciones futuras?",
                options: ["Modelos Operativos Internos", "Arquetipos", "Esquemas Cognitivos"],
                correctAnswer: "Modelos Operativos Internos"
            },
            {
                id: "bowlby_05",
                category: "Influencia",
                question: "Además del psicoanálisis, ¿en qué ciencia se basó Bowlby (estudio del comportamiento animal) para su teoría?",
                options: ["Etología", "Sociología", "Antropología"],
                correctAnswer: "Etología"
            }
        ]
    };

    // Cargar preguntas según el ID del mentor
    useEffect(() => {
        const mentorId = parseInt(id);
        const mentorQuestions = MENTOR_QUESTIONS[mentorId] || [];

        if (mentorQuestions.length > 0) {
            setQuestions(mentorQuestions);
        } else {
            console.warn(`No hay preguntas para el mentor ID: ${mentorId}`);
            navigate('/');
        }
    }, [id, navigate]);

    /**
     * Handler para seleccionar una opción de respuesta
     * @param {number} optionIndex - Índice de la opción seleccionada
     */
    const handleOptionClick = (optionIndex) => {
        if (showFeedback || questions.length === 0) return;

        const currentQ = questions[currentQuestion];
        const selectedText = currentQ.options[optionIndex];
        const correct = selectedText === currentQ.correctAnswer;

        setSelectedOption(optionIndex);
        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            setScore(score + 100);
            // Agregar diamantes y mostrar popup
            addDiamonds(10);
            setDiamondsEarned(prev => prev + 10);
            setShowDiamondPopup(true);
            // Ocultar popup después de 2 segundos
            setTimeout(() => {
                setShowDiamondPopup(false);
            }, 2000);
        } else {
            setLives(lives - 1);
        }
    };

    /**
     * Handler para avanzar a la siguiente pregunta
     */
    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setShowFeedback(false);
            setSelectedOption(null);
        } else {
            setIsCompleted(true);
        }
    };

    /**
     * Handler para reiniciar el juego
     */
    const handleRetry = () => {
        setCurrentQuestion(0);
        setScore(0);
        setLives(3);
        setShowFeedback(false);
        setSelectedOption(null);
        setIsCorrect(false);
        setIsCompleted(false);
        setDiamondsEarned(0);
        setShowDiamondPopup(false);
    };

    // Pantalla de Game Over - Se muestra cuando se acaban las vidas
    if (lives <= 0 && !isCompleted) {
        return (
            <div className="vista active">
                <div className="container">
                    <div className="lesson-player-container">
                        <div className="game-over-card">
                            <div className="game-over-emoji">😢</div>
                            <h2 className="game-over-title">¡Fin del Juego!</h2>
                            <p className="game-over-text">Te quedaste sin vidas. No te rindas, ¡podés intentarlo de nuevo!</p>
                            <div className="final-score">
                                <span className="score-label">Puntaje Final:</span>
                                <span className="score-value">{score} puntos</span>
                            </div>
                            <div className="game-over-actions">
                                <button className="btn-primary" onClick={handleRetry}>
                                    🔄 Reintentar
                                </button>
                                <button className="btn-secondary-lesson" onClick={() => navigate('/')}>
                                    🏠 Volver al Inicio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Pantalla de Completado - Se muestra cuando se completaron todas las preguntas
    if (isCompleted) {
        return (
            <div className="vista active">
                <div className="container">
                    <div className="lesson-player-container">
                        <div className="completion-card">
                            <div className="completion-emoji">🎉</div>
                            <h2 className="completion-title">¡Felicitaciones!</h2>
                            <p className="completion-text">Completaste la lección con éxito</p>
                            <div className="final-stats">
                                <div className="stat-item">
                                    <span className="stat-icon">💎</span>
                                    <span className="stat-value">{diamondsEarned}</span>
                                    <span className="stat-label">Diamantes Ganados</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-icon">⭐</span>
                                    <span className="stat-value">{score}</span>
                                    <span className="stat-label">Puntos</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-icon">❤️</span>
                                    <span className="stat-value">{lives}</span>
                                    <span className="stat-label">Vidas Restantes</span>
                                </div>
                            </div>
                            <div className="completion-actions">
                                <button className="btn-primary" onClick={() => navigate('/')}>
                                    🎓 Ver Más Mentores
                                </button>
                                <button className="btn-secondary-lesson" onClick={() => navigate('/')}>
                                    🏠 Volver al Inicio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Mostrar loading mientras se cargan las preguntas
    if (questions.length === 0) {
        return (
            <div className="vista active">
                <div className="container">
                    <div className="lesson-player-container">
                        <div className="question-card">
                            <p style={{ textAlign: 'center', padding: '2rem' }}>
                                Cargando preguntas...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Vista principal del juego
    const currentQ = questions[currentQuestion];

    return (
        <div className="vista active">
            <div className="container">
                <div className="lesson-player-container">
                    {/* Header con progreso */}
                    <div className="lesson-header">
                        <div className="lesson-progress-bar">
                            <div
                                className="lesson-progress-fill"
                                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>
                        <div className="lesson-stats">
                            <div className="lives-container">
                                {[...Array(3)].map((_, i) => (
                                    <span key={i} className={`life-heart ${i < lives ? 'active' : 'inactive'}`}>
                                        ❤️
                                    </span>
                                ))}
                            </div>
                            <div className="score-display">
                                <span className="score-icon">⭐</span>
                                <span className="score-text">{score}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta de pregunta */}
                    <div className="question-card">
                        <div className="question-number">
                            Pregunta {currentQuestion + 1} de {questions.length}
                        </div>
                        <div className="question-category">{currentQ.category}</div>
                        <h2 className="question-text">{currentQ.question}</h2>

                        {/* Popup de diamantes ganados */}
                        {showDiamondPopup && (
                            <div className="diamond-earned-popup">
                                +10 💎
                            </div>
                        )}

                        {/* Opciones de respuesta */}
                        <div className="options-container">
                            {currentQ.options.map((option, index) => {
                                const isCorrectOption = option === currentQ.correctAnswer;
                                const isSelected = selectedOption === index;

                                return (
                                    <button
                                        key={index}
                                        className={`option-button ${isSelected
                                            ? isCorrectOption
                                                ? 'correct'
                                                : 'incorrect'
                                            : ''
                                            } ${showFeedback && isCorrectOption ? 'show-correct' : ''}`}
                                        onClick={() => handleOptionClick(index)}
                                        disabled={showFeedback}
                                    >
                                        <span className="option-letter">
                                            {String.fromCharCode(65 + index)}
                                        </span>
                                        <span className="option-text">{option}</span>
                                        {showFeedback && isCorrectOption && (
                                            <span className="option-icon">✓</span>
                                        )}
                                        {showFeedback && isSelected && !isCorrectOption && (
                                            <span className="option-icon">✗</span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Feedback de respuesta */}
                        {showFeedback && (
                            <div className={`feedback-card ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
                                <div className="feedback-header">
                                    <span className="feedback-icon">
                                        {isCorrect ? '🎉' : '😔'}
                                    </span>
                                    <span className="feedback-title">
                                        {isCorrect ? '¡Correcto!' : '¡Ups! Incorrecto'}
                                    </span>
                                </div>
                                <p className="feedback-explanation">
                                    {isCorrect
                                        ? `¡Excelente! La respuesta correcta es: ${currentQ.correctAnswer}`
                                        : `La respuesta correcta era: ${currentQ.correctAnswer}`
                                    }
                                </p>
                                <button className="btn-next" onClick={handleNext}>
                                    {currentQuestion < questions.length - 1 ? 'Siguiente Pregunta →' : 'Ver Resultados 🎯'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Botón para salir */}
                    <button className="btn-exit" onClick={() => navigate('/')}>
                        ← Salir
                    </button>
                </div>
            </div>
        </div>
    );
}
