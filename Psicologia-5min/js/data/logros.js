// ==================== LOGROS ====================
import { cursos } from './cursos.js';

export const LOGROS = [
    {
        id: "primer_paso",
        nombre: "Primer Paso",
        descripcion: "Completaste tu primera lección",
        icono: "🎯",
        condicion: (usuario) => {
            const leccionesCompletadas = usuario.progreso.leccionesCompletadas || [];
            return leccionesCompletadas.length >= 1;
        }
    },
    {
        id: "constante",
        nombre: "Constante",
        descripcion: "Mantuviste una racha de 7 días",
        icono: "🔥",
        condicion: (usuario) => (usuario.progreso.racha || 0) >= 7
    },
    {
        id: "aprendiz_avanzado",
        nombre: "Aprendiz Avanzado",
        descripcion: "Alcanzaste 300 puntos",
        icono: "⭐",
        condicion: (usuario) => (usuario.puntos || 0) >= 300
    },
    {
        id: "psicomaster",
        nombre: "PsicoMaster",
        descripcion: "Completaste 10 cursos",
        icono: "👑",
        condicion: (usuario) => {
            const cursosCompletados = usuario.progreso.cursosCompletados || [];
            return cursosCompletados.length >= 10;
        }
    },
    {
        id: "explorador",
        nombre: "Explorador",
        descripcion: "Visitaste todas las categorías",
        icono: "🗺️",
        condicion: (usuario) => {
            const leccionesCompletadas = usuario.progreso.leccionesCompletadas || [];
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
        condicion: (usuario) => {
            const historial = usuario.historialPuntos || [];
            const hoy = new Date().toDateString();
            const leccionesHoy = historial.filter(h =>
                h.razon.includes("Completar lección") &&
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
        condicion: (usuario) => {
            let cursosConTresEstrellas = 0;
            // Asumimos que las estrellas se guardan en el objeto usuario para persistencia en Firebase
            const estrellasCursos = usuario.estrellas || {};
            Object.values(estrellasCursos).forEach(estrellas => {
                if (estrellas === 3) cursosConTresEstrellas++;
            });
            return cursosConTresEstrellas >= 5;
        }
    }
];
