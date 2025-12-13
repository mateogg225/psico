// Datos exactos para la biblioteca de cursos estilo Netflix
export const categoriasCursos = [
    {
        id: "cat_psicoanalisis",
        titulo: "🛋️ Psicoanálisis",
        descripcion: "La teoría del inconsciente y las bases freudianas.",
        cursos: [
            {
                id: "psico_1",
                titulo: "Psicoanálisis I - Fundamentos",
                subtitulo: "Primera tópica freudiana: inconsciente, preconsciente y consciente",
                img: "🛋️", // Usando emojis mientras se agregan los PNG
                premium: false
            },
            {
                id: "psico_freud",
                titulo: "El Inconsciente de Freud",
                subtitulo: "Descubre la teoría que revolucionó la psicología: Ello, Yo y Superyó",
                img: "🏔️",
                premium: false
            },
            {
                id: "psico_2",
                titulo: "Psicoanálisis II - Segunda Tópica",
                subtitulo: "Ello, Yo, Superyó. Pulsiones de vida y muerte. Lacan básico",
                img: "🧩",
                premium: true
            }
        ]
    },
    {
        id: "cat_diagnostico",
        titulo: "📋 Psicodiagnóstico y Evaluación",
        descripcion: "Herramientas para la entrevista y tests proyectivos.",
        cursos: [
            {
                id: "diag_1",
                titulo: "Psicodiagnóstico I - Fundamentos",
                subtitulo: "Entrevista, historia clínica, observación y técnicas básicas",
                img: "📋",
                premium: false
            },
            {
                id: "entrevista",
                titulo: "Técnicas de Entrevista Clínica",
                subtitulo: "Entrevista diagnóstica, listening skills, intervenciones verbales",
                img: "💬",
                premium: true
            },
            {
                id: "diag_2",
                titulo: "Psicodiagnóstico II - Proyectivas",
                subtitulo: "Rorschach, TAT, TRO, técnicas gráficas e informe profesional",
                img: "🎨",
                premium: true
            }
        ]
    },
    {
        id: "cat_neuro",
        titulo: "🧠 Neurociencia y Emociones",
        descripcion: "El cerebro, los neurotransmisores y la respuesta al estrés.",
        cursos: [
            {
                id: "neuro_1",
                titulo: "Neuropsicología I - Fundamentos",
                subtitulo: "Lóbulos cerebrales, funciones, neuroplasticidad, evaluación",
                img: "🧠",
                premium: false
            },
            {
                id: "dopamina",
                titulo: "Dopamina y Motivación",
                subtitulo: "El neurotransmisor de la recompensa y el placer",
                img: "⚡",
                premium: true
            },
            {
                id: "ansiedad",
                titulo: "Ansiedad y Estrés Moderno",
                subtitulo: "Diferencias claves entre estrés útil y ansiedad patológica",
                img: "🧘",
                premium: false
            }
        ]
    },
    {
        id: "cat_cognitiva",
        titulo: "🧩 Psicología Cognitiva",
        descripcion: "Cómo procesamos la información: atención, memoria y percepción.",
        cursos: [
            {
                id: "psico_gral_2",
                titulo: "Psicología II - Procesos Básicos",
                subtitulo: "Introducción a los procesos cognitivos fundamentales",
                img: "🧩",
                premium: false
            },
            {
                id: "atencion",
                titulo: "Atención y Percepción",
                subtitulo: "Mecanismos de filtro y organización de la información",
                img: "🎯",
                premium: false
            },
            {
                id: "cog_avanzada",
                titulo: "Psicología Cognitiva Avanzada",
                subtitulo: "Modelos mentales, toma de decisiones y resolución de problemas",
                img: "🎯",
                premium: false
            }
        ]
    },
    {
        id: "cat_conductismo",
        titulo: "🔔 Conductismo y Aprendizaje",
        descripcion: "Del condicionamiento clásico a las terapias modernas.",
        cursos: [
            {
                id: "conductismo",
                titulo: "Conductismo: ¿Por qué hacemos...?",
                subtitulo: "Desde los perros de Pavlov hasta Skinner. Conducta observable.",
                img: "🔔",
                premium: false
            },
            {
                id: "cond_clasico",
                titulo: "Condicionamiento Clásico",
                subtitulo: "El famoso experimento de Pavlov y los perros",
                img: "🐕",
                premium: false
            },
            {
                id: "intro_psicoterapia",
                titulo: "Introducción a la Psicoterapia",
                subtitulo: "Escuelas, encuadre, alianza terapéutica, ética profesional",
                img: "🌱",
                premium: true
            }
        ]
    }
];
