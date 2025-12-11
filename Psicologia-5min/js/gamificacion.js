// ==================== GAMIFICACIÓN ====================
import { NIVELES } from './data/niveles.js';
import { LOGROS } from './data/logros.js';
import { actualizarUsuario, guardarPuntos } from './usuario.js';

export async function verificarNivel(usuario) {
    const puntos = usuario.puntos;
    const nivelActual = usuario.nivel;

    let nuevoNivel = 1;
    for (let i = NIVELES.length - 1; i >= 0; i--) {
        if (puntos >= NIVELES[i].puntosRequeridos) {
            nuevoNivel = NIVELES[i].nivel;
            break;
        }
    }

    if (nuevoNivel > nivelActual) {
        await actualizarUsuario(usuario.uid, { nivel: nuevoNivel });
        return { subio: true, nivel: nuevoNivel, datos: NIVELES.find(n => n.nivel === nuevoNivel) };
    }

    return { subio: false };
}

export async function verificarLogros(usuario) {
    const logrosDesbloqueados = usuario.logros || [];
    const nuevosLogros = [];

    for (const logro of LOGROS) {
        if (!logrosDesbloqueados.includes(logro.id)) {
            if (logro.condicion(usuario)) {
                nuevosLogros.push(logro);
                logrosDesbloqueados.push(logro.id);

                // Guardar en BD
                await actualizarUsuario(usuario.uid, {
                    logros: logrosDesbloqueados
                });

                // Dar puntos por logro
                await sumarPuntos(usuario, 50, `Logro: ${logro.nombre} 🏆`);
            }
        }
    }

    return nuevosLogros;
}

export async function sumarPuntos(usuario, cantidad, razon) {
    // Actualizar objeto local para reactividad inmediata
    usuario.puntos = (usuario.puntos || 0) + cantidad;
    if (!usuario.historialPuntos) usuario.historialPuntos = [];
    usuario.historialPuntos.push({
        fecha: new Date().toISOString(),
        cantidad,
        razon
    });

    // Guardar en BD
    await guardarPuntos(usuario.uid, cantidad, razon);

    return usuario.puntos;
}

export async function actualizarRacha(usuario) {
    const hoy = new Date().toDateString();
    const ultimaVisita = usuario.progreso.ultimaVisita ? new Date(usuario.progreso.ultimaVisita).toDateString() : null;

    if (ultimaVisita !== hoy) {
        const ayer = new Date();
        ayer.setDate(ayer.getDate() - 1);

        let nuevaRacha = usuario.progreso.racha;

        if (ultimaVisita === ayer.toDateString()) {
            nuevaRacha++;
        } else {
            nuevaRacha = 1; // Reiniciar racha
        }

        // Actualizar local
        usuario.progreso.racha = nuevaRacha;
        usuario.progreso.ultimaVisita = new Date().toISOString();

        // Guardar en BD
        await actualizarUsuario(usuario.uid, {
            "progreso.racha": nuevaRacha,
            "progreso.ultimaVisita": new Date().toISOString()
        });

        return nuevaRacha;
    }
    return usuario.progreso.racha;
}
