// Catálogo de la tienda organizado por categorías
export const shopCategories = [
    {
        id: "cat_muebles",
        titulo: "🛋️ Muebles y Decoración",
        items: [
            {
                id: "divan",
                titulo: "El Diván Clásico",
                descripcion: "Imprescindible para el psicoanálisis.",
                precio: 100,
                img: "🛋️", // Usando emoji temporalmente
                tipo: "MUEBLE"
            },
            {
                id: "piaget_desk",
                titulo: "Escritorio de Piaget",
                descripcion: "Ideal para estudiar el desarrollo.",
                precio: 200,
                img: "🪑",
                tipo: "MUEBLE"
            },
            {
                id: "maslow_pyramid",
                titulo: "Pirámide de Maslow",
                descripcion: "Cubre tus necesidades básicas de decoración.",
                precio: 120,
                img: "🔺",
                tipo: "DECORACIÓN"
            },
            {
                id: "rorschach_poster",
                titulo: "Póster de Rorschach",
                descripcion: "¿Qué ves en esta mancha?",
                precio: 80,
                img: "🖼️",
                tipo: "DECORACIÓN"
            },
            {
                id: "brain_jar",
                titulo: "Cerebro en Formol",
                descripcion: "Mente abierta para tu laboratorio.",
                precio: 150,
                img: "🧠",
                tipo: "DECORACIÓN"
            }
        ]
    },
    {
        id: "cat_mascotas",
        titulo: "🐾 Mascotas de Laboratorio",
        items: [
            {
                id: "pavlov_dog",
                titulo: "El Perro de Pavlov",
                descripcion: "Saliva cuando escucha notificaciones.",
                precio: 180,
                img: "🐕",
                tipo: "MASCOTA"
            },
            {
                id: "skinner_pigeon",
                titulo: "Paloma Entrenada",
                descripcion: "La mascota favorita de Skinner.",
                precio: 150,
                img: "🕊️",
                tipo: "MASCOTA"
            }
        ]
    },
    {
        id: "cat_accesorios",
        titulo: "🎩 Accesorios y Power-ups",
        items: [
            {
                id: "freud_glasses",
                titulo: "Gafas de Freud",
                descripcion: "Para ver el inconsciente mejor.",
                precio: 120,
                img: "👓",
                tipo: "ACCESORIO"
            },
            {
                id: "denial_shield",
                titulo: "Escudo de Negación",
                descripcion: "Protege tu racha. 'Yo no perdí hoy'.",
                precio: 50,
                img: "🛡️",
                tipo: "POWER-UP"
            }
        ]
    }
];
