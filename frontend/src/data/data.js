// ==================== BASE DE DATOS COMPLETA - PSICOLOGÍA EN 5 MINUTOS ====================
// 14 cursos profesionales organizados por categorías

export const cursos = [
    // ==================== PSICOANÁLISIS ====================
    {
        id: 1,
        nombre: "Psicoanálisis I - Fundamentos",
        categoria: "Psicoanálisis",
        descripcion: "Primera tópica freudiana: inconsciente, preconsciente y consciente",
        imagen: "🛋️",
        premium: false,
        lecciones: [
            {
                id: 1,
                titulo: "El Inconsciente Freudiano",
                tipo: "interactivo",
                tarjetas: [
                    {
                        titulo: "El Iceberg Mental",
                        contenido: "Imaginá tu mente como un iceberg. La parte que ves sobre el agua es pequeña: eso es tu consciencia (lo que sabés). Pero debajo, enorme y oculto, está el verdadero gigante: tu INCONSCIENTE (lo que te mueve).",
                        visual: "🏔️",
                        profundizando: "¿Sabías que Freud no inventó la idea de inconsciente? Pero sí fue el primero en darle un estatus científico y método clínico: la 'cura por la palabra'."
                    },
                    {
                        titulo: "El Lugar sin Tiempo",
                        contenido: "El inconsciente es un lugar atemporal: un deseo de la infancia sigue tan vivo hoy como hace 20 años. No existe la contradicción (podés amar y odiar a la vez) y no conoce la palabra 'NO'.",
                        visual: "⏳",
                        profundizando: "Esto se llama 'Proceso Primario': energía psíquica libre que busca satisfacción inmediata, sin importar la realidad."
                    },
                    {
                        titulo: "Cuando la verdad se escapa",
                        contenido: "El inconsciente siempre busca salir. Un 'Lapsus Linguae' es cuando querés decir una palabra y te sale otra. No es un error mecánico, ¡es tu verdad inconsciente burlando a la censura!",
                        visual: "🙊",
                        ejemplo: "— ¡Brindemos por la jefa! Digo... ¡por la fecha! (Ups, alguien no quiere a su jefa...)"
                    },
                    {
                        titulo: "La Censura: El Guardián",
                        contenido: "Si todo el inconsciente subiera a la luz, nos angustiaríamos. Por eso existe la CENSURA: un guardián que aplica la 'Represión', empujando los pensamientos peligrosos de vuelta al fondo.",
                        visual: "🛡️",
                        profundizando: "Lo reprimido siempre intenta volver. Si la puerta está cerrada, entra por la ventana (como síntoma, sueño o chiste)."
                    },
                    {
                        titulo: "Validemos lo aprendido",
                        contenido: "Para pasar a la siguiente lección, respondé esta pregunta clave.",
                        visual: "❓",
                        tipo: "quiz",
                        pregunta: {
                            texto: "¿Cuál es la función principal de la Represión?",
                            opciones: ["Olvidar cosas aburridas", "Mantener lo angustiante fuera de la consciencia", "Mejorar la memoria"],
                            correcta: 1,
                            feedback: "¡Exacto! La represión nos protege de la angustia manteniendo los conflictos lejos de la consciencia."
                        }
                    }
                ],
                quiz: [] // Quiz integrado en tarjetas
            }
        ]
    },
    {
        id: 2,
        nombre: "Psicoanálisis II - Segunda Tópica",
        categoria: "Psicoanálisis",
        descripcion: "Ello, Yo, Superyó. Pulsiones de vida y muerte. Lacan básico",
        imagen: "🧩",
        premium: true,
        lecciones: [
            {
                id: 2,
                titulo: "Ello, Yo y Superyó",
                contenido: "La segunda tópica (1923) reformula el aparato psíquico. ELLO: reservorio pulsional, rige por principio de placer. YO: mediador entre ello, superyó y realidad. SUPERYÓ: heredero del complejo de Edipo, instancia moral y crítica.",
                ejemplo: "Un adolescente desea faltar a clase (ello). Sabe que es irresponsable y se siente culpable (superyó). Decide ir pero llegar tarde (yo: compromiso).",
                quiz: [
                    { pregunta: "¿Qué instancia busca placer inmediato?", opciones: ["Yo", "Ello", "Superyó", "Ninguna"], correcta: 1, explicacion: "El ello opera bajo principio de placer, sin considerar realidad." },
                    { pregunta: "¿Cuál es la función del Yo?", opciones: ["Reprimir todo", "Mediar entre instancias", "Juzgar moralmente", "Nada"], correcta: 1, explicacion: "El yo media entre ello, superyó y realidad externa." },
                    { pregunta: "¿De dónde surge el Superyó?", opciones: ["Del nacimiento", "Del complejo de Edipo", "De la escuela", "No se sabe"], correcta: 1, explicacion: "El superyó es heredero del complejo de Edipo, internaliza figuras parentales." }
                ]
            },
            {
                id: 3,
                titulo: "Pulsión de Vida y Muerte",
                contenido: "Freud postuló dos pulsiones fundamentales: EROS (vida, unión, libido) y THANATOS (muerte, desunión, agresión). La compulsión a la repetición evidencia la pulsión de muerte: repetir situaciones dolorosas sin aprender.",
                ejemplo: "Una mujer elige parejas violentas repetidamente. No es 'mala suerte': la compulsión a la repetición la lleva a recrear vínculos traumáticos infantiles.",
                quiz: [
                    { pregunta: "¿Qué busca Eros?", opciones: ["Destrucción", "Unión y vida", "Nada", "Muerte"], correcta: 1, explicacion: "Eros tiende a la unión, conservación y creación de vida." },
                    { pregunta: "¿Qué es la compulsión a la repetición?", opciones: ["Repetir cosas buenas", "Repetir situaciones dolorosas", "No repetir nada", "Aprender de errores"], correcta: 1, explicacion: "Es la tendencia a repetir experiencias traumáticas, evidencia de Thanatos." },
                    { pregunta: "¿Thanatos representa?", opciones: ["Amor", "Pulsión de muerte", "Felicidad", "Aprendizaje"], correcta: 1, explicacion: "Thanatos es la pulsión de muerte, tiende a la desunión y retorno a lo inorgánico." }
                ]
            },
            {
                id: 4,
                titulo: "Lacan: Sujeto y Significante",
                contenido: "Lacan reformula el psicoanálisis desde el lenguaje. El SUJETO está dividido ($), determinado por el significante. El OTRO (gran Otro) es el orden simbólico, el lenguaje que nos preexiste. 'El inconsciente está estructurado como un lenguaje'.",
                ejemplo: "Un niño llamado 'el problemático' por su familia termina actuando así. El significante 'problemático' lo determina, estructura su identidad.",
                quiz: [
                    { pregunta: "¿Cómo está estructurado el inconsciente según Lacan?", opciones: ["Como el cerebro", "Como un lenguaje", "Como el cuerpo", "No tiene estructura"], correcta: 1, explicacion: "Lacan afirma que el inconsciente está estructurado como un lenguaje." },
                    { pregunta: "¿Qué es el gran Otro?", opciones: ["Otra persona", "El orden simbólico/lenguaje", "El enemigo", "Nada"], correcta: 1, explicacion: "El Otro es el orden simbólico, el lenguaje y la cultura que nos precede." },
                    { pregunta: "¿Qué determina al sujeto?", opciones: ["Su voluntad", "El significante", "La genética", "El azar"], correcta: 1, explicacion: "El sujeto está determinado por el significante, por el lenguaje." }
                ]
            }
        ]
    },

    // ==================== PSICODIAGNÓSTICO ====================
    {
        id: 3,
        nombre: "Psicodiagnóstico I - Fundamentos",
        categoria: "Psicodiagnóstico",
        descripcion: "Entrevista, historia clínica, observación y técnicas básicas",
        imagen: "📋",
        premium: false,
        lecciones: [
            {
                id: 5,
                titulo: "Marco del Psicodiagnóstico",
                contenido: "El psicodiagnóstico es un proceso científico limitado en el tiempo que busca describir y comprender la personalidad. Objetivos: diagnóstico, pronóstico, indicación terapéutica. Requiere encuadre claro, rapport y ética profesional.",
                ejemplo: "Un paciente consulta por 'ansiedad'. El psicodiagnóstico revelará si es un trastorno de ansiedad, síntoma de depresión o rasgo de personalidad, orientando el tratamiento.",
                quiz: [
                    { pregunta: "¿Qué busca el psicodiagnóstico?", opciones: ["Curar", "Describir y comprender personalidad", "Medicar", "Nada"], correcta: 1, explicacion: "Busca describir, comprender y orientar sobre la personalidad y psicopatología." },
                    { pregunta: "¿Cuál NO es un objetivo?", opciones: ["Diagnóstico", "Pronóstico", "Curación inmediata", "Indicación terapéutica"], correcta: 2, explicacion: "El psicodiagnóstico no cura, orienta el tratamiento." },
                    { pregunta: "¿Qué es el rapport?", opciones: ["Un test", "Vínculo de confianza", "Un diagnóstico", "Una técnica"], correcta: 1, explicacion: "Rapport es el vínculo de confianza necesario para el proceso diagnóstico." }
                ]
            },
            {
                id: 6,
                titulo: "Entrevista y Historia Clínica",
                contenido: "La entrevista inicial es semidirigida: permite explorar motivo de consulta, historia vital, vínculos, síntomas. La historia clínica incluye: datos filiatorios, antecedentes, genograma, evolución sintomática y estructura familiar.",
                ejemplo: "Paciente de 30 años consulta por insomnio. La entrevista revela que comenzó tras la muerte del padre hace 6 meses. El síntoma cobra sentido en su historia.",
                quiz: [
                    { pregunta: "¿Qué tipo de entrevista se usa?", opciones: ["Totalmente libre", "Semidirigida", "Cerrada", "No se entrevista"], correcta: 1, explicacion: "La entrevista semidirigida permite explorar con flexibilidad y foco." },
                    { pregunta: "¿Qué incluye la historia clínica?", opciones: ["Solo síntomas actuales", "Datos, antecedentes, genograma, evolución", "Solo edad", "Nada"], correcta: 1, explicacion: "La historia clínica es exhaustiva: datos, antecedentes, vínculos, síntomas." },
                    { pregunta: "¿Para qué sirve el genograma?", opciones: ["Decorar", "Visualizar estructura familiar", "Nada", "Confundir"], correcta: 1, explicacion: "El genograma mapea la estructura familiar y sus dinámicas." }
                ]
            }
        ]
    },
    {
        id: 4,
        nombre: "Psicodiagnóstico II - Técnicas Proyectivas",
        categoria: "Psicodiagnóstico",
        descripcion: "Rorschach, TAT, TRO, técnicas gráficas e informe profesional",
        imagen: "🎨",
        premium: true,
        lecciones: [
            {
                id: 7,
                titulo: "Test de Rorschach - Sistema Exner",
                contenido: "El Rorschach evalúa estructura de personalidad mediante 10 láminas de manchas de tinta. El Sistema Exner codifica respuestas según: localización, determinantes, contenido, popularidad. Permite evaluar pensamiento, afectos y relaciones objetales.",
                ejemplo: "Lámina I: 'Un murciélago'. Respuesta popular (P), buena forma (F+), indica pensamiento convencional. 'Sangre derramada' sería respuesta de color puro (C), sugiere descontrol afectivo.",
                quiz: [
                    { pregunta: "¿Cuántas láminas tiene el Rorschach?", opciones: ["5", "10", "15", "20"], correcta: 1, explicacion: "El Rorschach consta de 10 láminas de manchas de tinta." },
                    { pregunta: "¿Qué evalúa principalmente?", opciones: ["Inteligencia", "Estructura de personalidad", "Memoria", "Atención"], correcta: 1, explicacion: "Evalúa estructura de personalidad, pensamiento y afectos." },
                    { pregunta: "¿Qué es una respuesta P?", opciones: ["Patológica", "Popular/frecuente", "Perfecta", "Prohibida"], correcta: 1, explicacion: "P indica respuesta popular, dada frecuentemente, sugiere pensamiento convencional." }
                ]
            },
            {
                id: 8,
                titulo: "TAT - Test de Apercepción Temática",
                contenido: "El TAT presenta 31 láminas con escenas ambiguas. El sujeto crea historias revelando conflictos, defensas, vínculos y fantasías inconscientes. Se analiza: tema, héroe, necesidades, presiones ambientales y desenlace.",
                ejemplo: "Lámina 1 (niño con violín): 'Lo obligaron a tocar, lo odia'. Revela vivencia de imposición, falta de deseo propio, posible conflicto con figuras de autoridad.",
                quiz: [
                    { pregunta: "¿Qué debe hacer el sujeto en el TAT?", opciones: ["Dibujar", "Crear historias", "Responder preguntas", "Nada"], correcta: 1, explicacion: "El sujeto crea historias a partir de láminas ambiguas." },
                    { pregunta: "¿Qué revela el TAT?", opciones: ["Solo inteligencia", "Conflictos y fantasías inconscientes", "Memoria", "Nada"], correcta: 1, explicacion: "Revela conflictos, defensas, vínculos y fantasías inconscientes." },
                    { pregunta: "¿Cuántas láminas tiene?", opciones: ["10", "20", "31", "50"], correcta: 2, explicacion: "El TAT tiene 31 láminas con escenas ambiguas." }
                ]
            },
            {
                id: 9,
                titulo: "Informe Psicodiagnóstico Profesional",
                contenido: "El informe integra datos de entrevistas, tests y observación. Estructura: datos filiatorios, motivo de consulta, técnicas administradas, análisis de resultados, diagnóstico presuntivo, pronóstico e indicación terapéutica. Lenguaje claro, fundamentado.",
                ejemplo: "Diagnóstico: 'Trastorno Depresivo Mayor, episodio moderado (F32.1). Indicación: psicoterapia psicodinámica 2 veces/semana + evaluación psiquiátrica para considerar farmacoterapia.'",
                quiz: [
                    { pregunta: "¿Qué debe incluir el informe?", opciones: ["Solo diagnóstico", "Datos, técnicas, análisis, diagnóstico, pronóstico, indicación", "Solo tests", "Nada"], correcta: 1, explicacion: "El informe es exhaustivo e integra toda la información recabada." },
                    { pregunta: "¿Cómo debe ser el lenguaje?", opciones: ["Técnico incomprensible", "Claro y fundamentado", "Coloquial", "Ambiguo"], correcta: 1, explicacion: "Debe ser claro, preciso y fundamentado en los datos." },
                    { pregunta: "¿Qué es la indicación terapéutica?", opciones: ["El diagnóstico", "La sugerencia de tratamiento", "El pronóstico", "Nada"], correcta: 1, explicacion: "Es la recomendación de tratamiento según el caso." }
                ]
            }
        ]
    },

    // ==================== PSICOLOGÍA COGNITIVA ====================
    {
        id: 5,
        nombre: "Psicología II - Procesos Superiores",
        categoria: "Psicología Cognitiva",
        descripcion: "Lenguaje, pensamiento, memoria, funciones ejecutivas",
        imagen: "🧩",
        premium: false,
        lecciones: [
            {
                id: 10,
                titulo: "Lenguaje y Pensamiento",
                contenido: "El lenguaje es un sistema simbólico que permite comunicación y pensamiento abstracto. Áreas clave: Broca (producción) y Wernicke (comprensión). El pensamiento incluye razonamiento deductivo, inductivo y resolución de problemas.",
                ejemplo: "Un paciente con lesión en Broca puede comprender pero no hablar fluidamente (afasia de Broca). Uno con lesión en Wernicke habla fluido pero sin sentido (afasia de Wernicke).",
                quiz: [
                    { pregunta: "¿Qué área produce el lenguaje?", opciones: ["Wernicke", "Broca", "Hipocampo", "Amígdala"], correcta: 1, explicacion: "El área de Broca se encarga de la producción del lenguaje." },
                    { pregunta: "¿Qué es el razonamiento deductivo?", opciones: ["De lo general a lo particular", "De lo particular a lo general", "Azar", "Nada"], correcta: 0, explicacion: "El razonamiento deductivo va de premisas generales a conclusiones específicas." },
                    { pregunta: "¿Qué permite el lenguaje?", opciones: ["Solo hablar", "Comunicación y pensamiento abstracto", "Solo escribir", "Nada"], correcta: 1, explicacion: "El lenguaje permite comunicación y pensamiento abstracto complejo." }
                ]
            },
            {
                id: 11,
                titulo: "Funciones Ejecutivas",
                contenido: "Las funciones ejecutivas son procesos cognitivos superiores que permiten planificar, inhibir, flexibilizar y monitorear conductas. Incluyen: memoria de trabajo, control inhibitorio, flexibilidad cognitiva. Dependen de la corteza prefrontal.",
                ejemplo: "Un estudiante planifica estudiar (planificación), ignora el celular (inhibición), cambia de estrategia si no entiende (flexibilidad) y monitorea su comprensión (metacognición).",
                quiz: [
                    { pregunta: "¿Dónde se localizan las funciones ejecutivas?", opciones: ["Hipocampo", "Corteza prefrontal", "Cerebelo", "Médula"], correcta: 1, explicacion: "Las funciones ejecutivas dependen principalmente de la corteza prefrontal." },
                    { pregunta: "¿Cuál NO es una función ejecutiva?", opciones: ["Planificación", "Inhibición", "Digestión", "Flexibilidad"], correcta: 2, explicacion: "La digestión no es una función ejecutiva cognitiva." },
                    { pregunta: "¿Qué es el control inhibitorio?", opciones: ["No pensar", "Frenar respuestas automáticas", "Dormir", "Nada"], correcta: 1, explicacion: "El control inhibitorio permite frenar respuestas automáticas inadecuadas." }
                ]
            }
        ]
    },
    {
        id: 6,
        nombre: "Psicología Cognitiva Avanzada",
        categoria: "Psicología Cognitiva",
        descripcion: "Sesgos, heurísticos, toma de decisiones, cognición social",
        imagen: "🎯",
        premium: true,
        lecciones: [
            {
                id: 12,
                titulo: "Sesgos Cognitivos y Heurísticos",
                contenido: "Los sesgos son errores sistemáticos en el pensamiento. Heurísticos son atajos mentales. Ejemplos: sesgo de confirmación (buscar info que confirme creencias), disponibilidad (juzgar por lo fácil de recordar), anclaje (primera info influye desproporcionadamente).",
                ejemplo: "Un médico diagnostica gripe porque es común (disponibilidad), ignorando síntomas raros de otra enfermedad. El sesgo puede llevar a error diagnóstico.",
                quiz: [
                    { pregunta: "¿Qué es un sesgo cognitivo?", opciones: ["Pensamiento correcto", "Error sistemático en el pensamiento", "Inteligencia", "Nada"], correcta: 1, explicacion: "Un sesgo es un error sistemático y predecible en el razonamiento." },
                    { pregunta: "¿Qué es el sesgo de confirmación?", opciones: ["Buscar info que confirme creencias", "Dudar de todo", "No tener opinión", "Ser objetivo"], correcta: 0, explicacion: "Es la tendencia a buscar y valorar información que confirma nuestras creencias." },
                    { pregunta: "¿Qué son los heurísticos?", opciones: ["Errores", "Atajos mentales", "Enfermedades", "Tests"], correcta: 1, explicacion: "Los heurísticos son atajos mentales que simplifican decisiones." }
                ]
            }
        ]
    },

    // ==================== NEUROPSICOLOGÍA ====================
    {
        id: 7,
        nombre: "Neuropsicología I - Fundamentos",
        categoria: "Neuropsicología",
        descripcion: "Lóbulos cerebrales, funciones, neuroplasticidad, evaluación",
        imagen: "🧠",
        premium: false,
        lecciones: [
            {
                id: 13,
                titulo: "Lóbulos Cerebrales y Funciones",
                contenido: "FRONTAL: funciones ejecutivas, planificación, personalidad. PARIETAL: integración sensorial, orientación espacial. TEMPORAL: memoria, lenguaje (hemisferio izq), reconocimiento facial. OCCIPITAL: procesamiento visual.",
                ejemplo: "Un paciente con lesión frontal puede perder iniciativa, desinhibirse socialmente y tener dificultades para planificar (síndrome disejecutivo).",
                quiz: [
                    { pregunta: "¿Qué lóbulo procesa la visión?", opciones: ["Frontal", "Parietal", "Temporal", "Occipital"], correcta: 3, explicacion: "El lóbulo occipital procesa la información visual." },
                    { pregunta: "¿Dónde están las funciones ejecutivas?", opciones: ["Lóbulo frontal", "Lóbulo parietal", "Cerebelo", "Médula"], correcta: 0, explicacion: "Las funciones ejecutivas se localizan en el lóbulo frontal." },
                    { pregunta: "¿Qué procesa el lóbulo temporal?", opciones: ["Solo visión", "Memoria y lenguaje", "Solo movimiento", "Nada"], correcta: 1, explicacion: "El lóbulo temporal procesa memoria, lenguaje y reconocimiento." }
                ]
            },
            {
                id: 14,
                titulo: "Neuroplasticidad",
                contenido: "La neuroplasticidad es la capacidad del cerebro de reorganizarse formando nuevas conexiones. Ocurre tras aprendizaje, experiencia o lesión. Tipos: sináptica (cambios en sinapsis) y estructural (nuevas neuronas/conexiones). Fundamental para rehabilitación.",
                ejemplo: "Un paciente con ACV en área motora puede recuperar movimiento: otras áreas cerebrales 'aprenden' a realizar esa función (neuroplasticidad compensatoria).",
                quiz: [
                    { pregunta: "¿Qué es la neuroplasticidad?", opciones: ["Rigidez cerebral", "Capacidad de reorganización cerebral", "Una enfermedad", "Nada"], correcta: 1, explicacion: "Es la capacidad del cerebro de reorganizarse y formar nuevas conexiones." },
                    { pregunta: "¿Cuándo ocurre?", opciones: ["Solo en niños", "Tras aprendizaje, experiencia o lesión", "Nunca", "Solo al dormir"], correcta: 1, explicacion: "Ocurre continuamente: aprendizaje, experiencia, lesión estimulan neuroplasticidad." },
                    { pregunta: "¿Para qué es fundamental?", opciones: ["Nada", "Rehabilitación neuropsicológica", "Dormir", "Comer"], correcta: 1, explicacion: "Es fundamental para la rehabilitación tras lesiones cerebrales." }
                ]
            }
        ]
    },

    // ==================== PSICOPATOLOGÍA ====================
    {
        id: 8,
        nombre: "Psicopatología II - Trastornos Severos",
        categoria: "Psicopatología",
        descripcion: "Psicosis, esquizofrenia, trastornos de personalidad, conducta suicida",
        imagen: "⚕️",
        premium: true,
        lecciones: [
            {
                id: 15,
                titulo: "Psicosis y Esquizofrenia",
                contenido: "La psicosis implica pérdida de contacto con la realidad: alucinaciones, delirios, desorganización del pensamiento. ESQUIZOFRENIA: trastorno psicótico crónico con síntomas positivos (alucinaciones, delirios) y negativos (aplanamiento afectivo, abulia).",
                ejemplo: "Paciente escucha voces que comentan sus actos (alucinación auditiva) y cree que lo persiguen (delirio persecutorio). Muestra aplanamiento afectivo (síntoma negativo).",
                quiz: [
                    { pregunta: "¿Qué caracteriza la psicosis?", opciones: ["Tristeza", "Pérdida de contacto con realidad", "Ansiedad", "Nada"], correcta: 1, explicacion: "La psicosis implica pérdida de contacto con la realidad." },
                    { pregunta: "¿Qué son síntomas positivos?", opciones: ["Buenos síntomas", "Alucinaciones y delirios", "Ausencia de síntomas", "Felicidad"], correcta: 1, explicacion: "Síntomas positivos son agregados: alucinaciones, delirios." },
                    { pregunta: "¿Qué es la abulia?", opciones: ["Mucha energía", "Falta de voluntad/iniciativa", "Alegría", "Inteligencia"], correcta: 1, explicacion: "La abulia es falta de voluntad e iniciativa, síntoma negativo." }
                ]
            },
            {
                id: 16,
                titulo: "Trastorno Límite de Personalidad",
                contenido: "El TLP (Borderline) se caracteriza por: inestabilidad emocional intensa, relaciones caóticas, miedo al abandono, impulsividad, autoimagen inestable, vacío crónico. Riesgo de autolesiones y conductas suicidas. Requiere tratamiento especializado (DBT).",
                ejemplo: "Paciente idealiza a su terapeuta ('es perfecto'), luego lo devalúa ('es el peor') tras un malentendido menor. Muestra pensamiento dicotómico (blanco/negro) típico del TLP.",
                quiz: [
                    { pregunta: "¿Qué caracteriza al TLP?", opciones: ["Estabilidad", "Inestabilidad emocional intensa", "Apatía", "Nada"], correcta: 1, explicacion: "El TLP se caracteriza por inestabilidad emocional, relacional e identitaria." },
                    { pregunta: "¿Qué es el pensamiento dicotómico?", opciones: ["Pensar en grises", "Pensar en blanco/negro", "No pensar", "Pensar mucho"], correcta: 1, explicacion: "Es pensar en extremos: todo o nada, bueno o malo, sin matices." },
                    { pregunta: "¿Qué terapia es efectiva?", opciones: ["Ninguna", "DBT (Terapia Dialéctico Conductual)", "Solo medicación", "Hipnosis"], correcta: 1, explicacion: "La DBT (Dialectical Behavior Therapy) es el tratamiento de elección." }
                ]
            }
        ]
    },

    // ==================== PSICOLOGÍA DEL DESARROLLO ====================
    {
        id: 9,
        nombre: "Psicología del Desarrollo II",
        categoria: "Psicología del Desarrollo",
        descripcion: "Adolescencia, adultez temprana, media y vejez",
        imagen: "👶",
        premium: false,
        lecciones: [
            {
                id: 17,
                titulo: "Adolescencia: Identidad y Crisis",
                contenido: "La adolescencia (12-18 años) implica cambios físicos, cognitivos y sociales. Erikson: crisis de identidad vs confusión de rol. Desarrollo del pensamiento abstracto (operaciones formales, Piaget). Búsqueda de autonomía, grupo de pares central.",
                ejemplo: "Un adolescente experimenta con diferentes estilos, grupos y valores. No es 'rebeldía': es búsqueda de identidad propia, separación de figuras parentales.",
                quiz: [
                    { pregunta: "¿Cuál es la crisis de Erikson en adolescencia?", opciones: ["Confianza vs desconfianza", "Identidad vs confusión", "Intimidad vs aislamiento", "Ninguna"], correcta: 1, explicacion: "En adolescencia la crisis es identidad vs confusión de rol." },
                    { pregunta: "¿Qué pensamiento desarrolla el adolescente?", opciones: ["Concreto", "Abstracto/formal", "Ninguno", "Mágico"], correcta: 1, explicacion: "Desarrolla pensamiento abstracto (operaciones formales según Piaget)." },
                    { pregunta: "¿Qué es central en esta etapa?", opciones: ["Padres", "Grupo de pares", "Escuela", "Nada"], correcta: 1, explicacion: "El grupo de pares es central para la identidad adolescente." }
                ]
            }
        ]
    },

    // ==================== TÉCNICAS CLÍNICAS ====================
    {
        id: 10,
        nombre: "Técnicas de Entrevista Clínica",
        categoria: "Técnicas Clínicas",
        descripcion: "Entrevista diagnóstica, listening skills, intervenciones verbales",
        imagen: "💬",
        premium: true,
        lecciones: [
            {
                id: 18,
                titulo: "Listening Skills - Escucha Activa",
                contenido: "La escucha activa implica: atención plena, contacto visual, lenguaje corporal abierto, parafraseo, reflejo de emociones, preguntas abiertas. Evitar: interrumpir, juzgar, aconsejar prematuramente, interpretar sin datos.",
                ejemplo: "Paciente: 'Estoy cansado de todo'. Terapeuta: 'Escucho que te sentís agotado... ¿podés contarme más sobre ese cansancio?' (reflejo + pregunta abierta).",
                quiz: [
                    { pregunta: "¿Qué implica la escucha activa?", opciones: ["Solo oír", "Atención plena y reflejo empático", "Interrumpir", "Aconsejar"], correcta: 1, explicacion: "Implica atención plena, reflejo empático y comprensión profunda." },
                    { pregunta: "¿Qué se debe evitar?", opciones: ["Escuchar", "Juzgar y aconsejar prematuramente", "Preguntar", "Empatizar"], correcta: 1, explicacion: "Se debe evitar juzgar, interrumpir y aconsejar sin comprender." },
                    { pregunta: "¿Qué es el parafraseo?", opciones: ["Repetir exacto", "Reformular con propias palabras", "Ignorar", "Cambiar tema"], correcta: 1, explicacion: "Es reformular lo dicho con propias palabras para verificar comprensión." }
                ]
            },
            {
                id: 19,
                titulo: "Manejo de Transferencia y Contratransferencia",
                contenido: "TRANSFERENCIA: el paciente proyecta en el terapeuta sentimientos de figuras significativas pasadas. CONTRATRANSFERENCIA: reacciones emocionales del terapeuta hacia el paciente. Ambas son herramientas diagnósticas si se reconocen y analizan.",
                ejemplo: "Paciente se enoja con terapeuta por llegar 2 minutos tarde, desproporcionadamente. Transferencia: revive abandono paterno. Terapeuta siente culpa excesiva (contratransferencia): debe analizarla.",
                quiz: [
                    { pregunta: "¿Qué es la transferencia?", opciones: ["Cambiar de terapeuta", "Proyectar sentimientos pasados en terapeuta", "Nada", "Pagar"], correcta: 1, explicacion: "Es proyectar en el terapeuta sentimientos de figuras significativas pasadas." },
                    { pregunta: "¿Qué es la contratransferencia?", opciones: ["Reacciones del terapeuta", "Reacciones del paciente", "Nada", "Un test"], correcta: 0, explicacion: "Son las reacciones emocionales del terapeuta hacia el paciente." },
                    { pregunta: "¿Cómo se usan?", opciones: ["Se ignoran", "Como herramientas diagnósticas", "Se evitan", "No sirven"], correcta: 1, explicacion: "Son herramientas diagnósticas valiosas si se reconocen y analizan." }
                ]
            }
        ]
    },

    // ==================== PSICOTERAPIA ====================
    {
        id: 11,
        nombre: "Introducción a la Psicoterapia",
        categoria: "Psicoterapia",
        descripcion: "Escuelas, encuadre, alianza terapéutica, ética profesional",
        imagen: "🌱",
        premium: true,
        lecciones: [
            {
                id: 20,
                titulo: "Escuelas Psicoterapéuticas",
                contenido: "PSICOANALÍTICA: inconsciente, transferencia, insight. COGNITIVO-CONDUCTUAL: pensamientos y conductas, aquí y ahora. HUMANISTA: autorrealización, relación terapéutica. SISTÉMICA: familia como sistema. Cada una con técnicas y objetivos específicos.",
                ejemplo: "Paciente con fobia: psicoanalista explora origen inconsciente, cognitivo-conductual usa exposición gradual, humanista trabaja autoaceptación.",
                quiz: [
                    { pregunta: "¿Qué trabaja el psicoanálisis?", opciones: ["Solo conducta", "Inconsciente y transferencia", "Solo familia", "Nada"], correcta: 1, explicacion: "El psicoanálisis trabaja el inconsciente, transferencia e insight." },
                    { pregunta: "¿Qué enfatiza la terapia cognitivo-conductual?", opciones: ["Pasado", "Pensamientos y conductas actuales", "Sueños", "Familia"], correcta: 1, explicacion: "Enfatiza pensamientos y conductas en el aquí y ahora." },
                    { pregunta: "¿Qué es la terapia sistémica?", opciones: ["Individual", "Trabaja la familia como sistema", "Solo niños", "Medicación"], correcta: 1, explicacion: "Trabaja la familia o pareja como sistema interrelacionado." }
                ]
            },
            {
                id: 21,
                titulo: "Alianza Terapéutica y Encuadre",
                contenido: "La ALIANZA TERAPÉUTICA es el vínculo colaborativo entre paciente y terapeuta, predictor clave del éxito. ENCUADRE: marco que regula la terapia (horarios, honorarios, duración, confidencialidad). El encuadre da seguridad y estructura al proceso.",
                ejemplo: "Terapeuta establece: 'Nos vemos martes 15hs, 50 minutos, $X por sesión. Todo lo que digas es confidencial salvo riesgo de vida'. Encuadre claro genera confianza.",
                quiz: [
                    { pregunta: "¿Qué es la alianza terapéutica?", opciones: ["Un contrato", "Vínculo colaborativo paciente-terapeuta", "Amistad", "Nada"], correcta: 1, explicacion: "Es el vínculo colaborativo, predictor clave del éxito terapéutico." },
                    { pregunta: "¿Qué incluye el encuadre?", opciones: ["Solo horario", "Horarios, honorarios, duración, confidencialidad", "Nada", "Solo pago"], correcta: 1, explicacion: "Incluye todos los parámetros que regulan la terapia." },
                    { pregunta: "¿Para qué sirve el encuadre?", opciones: ["Confundir", "Dar seguridad y estructura", "Nada", "Cobrar más"], correcta: 1, explicacion: "Da seguridad, previsibilidad y estructura al proceso terapéutico." }
                ]
            }
        ]
    },

    // ==================== CURSOS ORIGINALES MEJORADOS ====================
    {
        id: 12,
        nombre: "Atención y Concentración",
        categoria: "Psicología Cognitiva",
        descripcion: "Tipos de atención, efecto cocktail party, atención sostenida",
        imagen: "🎯",
        premium: false,
        lecciones: [
            {
                id: 22,
                titulo: "Los tipos de atención",
                contenido: "La atención es la capacidad de concentrarnos en estímulos específicos mientras ignoramos otros. Existen varios tipos: atención selectiva (elegir qué atender), sostenida (mantener el foco) y dividida (atender múltiples cosas).",
                ejemplo: "Cuando estás en un café ruidoso pero podés concentrarte en tu conversación ignorando el ruido de fondo, estás usando atención selectiva. Esto se llama 'efecto cocktail party'.",
                quiz: [
                    { pregunta: "¿Qué es la atención selectiva?", opciones: ["Atender todo al mismo tiempo", "Elegir qué estímulos atender", "No prestar atención", "Dormir"], correcta: 1, explicacion: "La atención selectiva nos permite enfocarnos en ciertos estímulos mientras ignoramos otros." },
                    { pregunta: "¿Cómo se llama el fenómeno de poder escuchar una conversación en un lugar ruidoso?", opciones: ["Efecto Mozart", "Efecto cocktail party", "Efecto placebo", "Efecto halo"], correcta: 1, explicacion: "El efecto cocktail party describe nuestra capacidad de enfocarnos en una conversación específica en ambientes ruidosos." },
                    { pregunta: "¿Cuál NO es un tipo de atención?", opciones: ["Selectiva", "Sostenida", "Dividida", "Multiplicada"], correcta: 3, explicacion: "Los tipos principales de atención son selectiva, sostenida y dividida. 'Multiplicada' no es un tipo de atención." }
                ]
            }
        ]
    },
    {
        id: 13,
        nombre: "Dopamina y Motivación",
        categoria: "Neuropsicología",
        descripcion: "El neurotransmisor de la recompensa y el placer",
        imagen: "🧠",
        premium: true,
        lecciones: [
            {
                id: 23,
                titulo: "¿Qué es la dopamina?",
                contenido: "La dopamina es un neurotransmisor clave en el sistema de recompensa del cerebro. No solo genera placer, sino que nos motiva a buscar recompensas. Es fundamental para el aprendizaje, la motivación y el movimiento.",
                ejemplo: "Cuando revisás tu celular y ves un 'me gusta' en redes sociales, tu cerebro libera dopamina. Esto te motiva a seguir revisando, creando un ciclo de búsqueda de recompensa.",
                quiz: [
                    { pregunta: "¿Qué es la dopamina?", opciones: ["Una hormona", "Un neurotransmisor", "Una vitamina", "Una proteína"], correcta: 1, explicacion: "La dopamina es un neurotransmisor, una sustancia química que transmite señales entre neuronas." },
                    { pregunta: "¿Qué función principal tiene la dopamina?", opciones: ["Dormir mejor", "Sistema de recompensa y motivación", "Digestión", "Respiración"], correcta: 1, explicacion: "La dopamina es fundamental en el sistema de recompensa, motivación y aprendizaje." },
                    { pregunta: "¿Por qué las redes sociales pueden ser adictivas?", opciones: ["Por los colores", "Por la liberación de dopamina", "Por el sonido", "No son adictivas"], correcta: 1, explicacion: "Las redes sociales activan el sistema de recompensa dopaminérgico, creando patrones de búsqueda de recompensa." }
                ]
            }
        ]
    },
    {
        id: 14,
        nombre: "Condicionamiento Clásico",
        categoria: "Psicología del Aprendizaje",
        descripcion: "El famoso experimento de Pavlov y los perros",
        imagen: "🐕",
        premium: false,
        lecciones: [
            {
                id: 24,
                titulo: "Pavlov y sus perros",
                contenido: "El condicionamiento clásico es un tipo de aprendizaje donde asociamos un estímulo neutro con uno que naturalmente produce una respuesta. Pavlov descubrió que los perros salivaban al escuchar una campana si esta se asociaba con comida.",
                ejemplo: "Si cada vez que abrís una lata de comida para tu mascota hacés un sonido específico, eventualmente tu mascota se emocionará solo con escuchar ese sonido, incluso sin ver la comida.",
                quiz: [
                    { pregunta: "¿Quién descubrió el condicionamiento clásico?", opciones: ["Freud", "Skinner", "Pavlov", "Watson"], correcta: 2, explicacion: "Ivan Pavlov descubrió el condicionamiento clásico con sus famosos experimentos con perros." },
                    { pregunta: "En el experimento de Pavlov, ¿qué era el estímulo condicionado?", opciones: ["La comida", "La campana", "La salivación", "El perro"], correcta: 1, explicacion: "La campana era el estímulo condicionado que, tras asociarse con la comida, provocaba salivación." },
                    { pregunta: "¿Qué es un estímulo neutro?", opciones: ["Uno que no produce respuesta", "Uno que produce respuesta naturalmente", "Uno negativo", "Uno positivo"], correcta: 0, explicacion: "Un estímulo neutro es uno que inicialmente no produce ninguna respuesta particular." }
                ]
            }
        ]
    }
];

// USUARIO
let usuario = JSON.parse(localStorage.getItem('usuario')) || {
    nombre: "Usuario",
    email: "usuario@ejemplo.com",
    premium: false,
    progreso: {
        leccionesCompletadas: [],
        cursosCompletados: [],
        diasConsecutivos: 0,
        ultimaVisita: null,
        racha: 0
    }
};

// COMENTARIOS
let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

// FUNCIONES DE GUARDADO
function guardarUsuario() {
    localStorage.setItem('usuario', JSON.stringify(usuario));
}

function guardarComentarios() {
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
}

function agregarComentario(leccionId, nombre, texto) {
    comentarios.push({
        id: Date.now(),
        leccion_id: leccionId,
        usuario: nombre,
        comentario: texto,
        fecha: new Date().toISOString()
    });
    guardarComentarios();
}

function obtenerComentariosPorLeccion(leccionId) {
    return comentarios.filter(c => c.leccion_id === leccionId);
}

// ==================== GAMIFICACIÓN ====================

// Niveles del sistema de gamificación
export const NIVELES = [
    { nivel: 1, nombre: "Estudiante", puntosRequeridos: 0, icono: "📚" },
    { nivel: 2, nombre: "Explorador", puntosRequeridos: 500, icono: "🔍" },
    { nivel: 3, nombre: "Aprendiz", puntosRequeridos: 1000, icono: "🎓" },
    { nivel: 4, nombre: "Analista", puntosRequeridos: 1500, icono: "🧠" },
    { nivel: 5, nombre: "Psicólogo Junior", puntosRequeridos: 2000, icono: "👨‍⚕️" },
    { nivel: 6, nombre: "Psicólogo Senior", puntosRequeridos: 2500, icono: "👨‍🔬" },
    { nivel: 7, nombre: "Experto", puntosRequeridos: 3000, icono: "⭐" },
    { nivel: 8, nombre: "Maestro", puntosRequeridos: 3500, icono: "🏆" },
    { nivel: 9, nombre: "Sabio", puntosRequeridos: 4000, icono: "🧙" },
    { nivel: 10, nombre: "UltraMind", puntosRequeridos: 5000, icono: "👑" }
];

// Logros desbloqueables
export const LOGROS = [
    {
        id: "primer_paso",
        nombre: "Primer Paso",
        descripcion: "Completaste tu primera lección",
        icono: "🎯",
        condicion: () => {
            const leccionesCompletadas = usuario.leccionesCompletadas || [];
            return leccionesCompletadas.length >= 1;
        }
    },
    {
        id: "constante",
        nombre: "Constante",
        descripcion: "Mantuviste una racha de 7 días",
        icono: "🔥",
        condicion: () => parseInt(localStorage.getItem('racha') || '0') >= 7
    },
    {
        id: "aprendiz_avanzado",
        nombre: "Aprendiz Avanzado",
        descripcion: "Alcanzaste 300 puntos",
        icono: "⭐",
        condicion: () => parseInt(localStorage.getItem('puntosUsuario') || '0') >= 300
    },
    {
        id: "psicomaster",
        nombre: "PsicoMaster",
        descripcion: "Completaste 10 cursos",
        icono: "👑",
        condicion: () => {
            const cursosCompletados = usuario.cursosCompletados || [];
            return cursosCompletados.length >= 10;
        }
    },
    {
        id: "explorador",
        nombre: "Explorador",
        descripcion: "Visitaste todas las categorías",
        icono: "🗺️",
        condicion: () => {
            const leccionesCompletadas = usuario.leccionesCompletadas || [];
            const categorias = new Set();
            leccionesCompletadas.forEach(leccionId => {
                cursos.forEach(curso => {
                    const leccion = curso.lecciones.find(l => l.id === leccionId);
                    if (leccion) categorias.add(curso.categoria);
                });
            });
            return categorias.size >= 7;
        }
    },
    {
        id: "velocista",
        nombre: "Velocista",
        descripcion: "Completaste 5 lecciones en un día",
        icono: "⚡",
        condicion: () => {
            const historial = JSON.parse(localStorage.getItem('historialPuntos') || '[]');
            const hoy = new Date().toDateString();
            const leccionesHoy = historial.filter(h =>
                h.razon === "Completar lección" &&
                new Date(h.fecha).toDateString() === hoy
            );
            return leccionesHoy.length >= 5;
        }
    },
    {
        id: "perfeccionista",
        nombre: "Perfeccionista",
        descripcion: "Obtuviste 3 estrellas en 5 cursos",
        icono: "✨",
        condicion: () => {
            let cursosConTresEstrellas = 0;
            cursos.forEach(curso => {
                const estrellas = parseInt(localStorage.getItem(`estrellas_${curso.id}`) || '0');
                if (estrellas === 3) cursosConTresEstrellas++;
            });
            return cursosConTresEstrellas >= 5;
        }
    }
];

