// ==================== MAIN ====================
import { initUI } from './ui.js';
import { observarEstadoAuth } from './auth.js';
import { actualizarRacha } from './gamificacion.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando aplicación modular...');

    // Observar cambios en la autenticación
    observarEstadoAuth(async (usuario) => {
        if (usuario) {
            console.log(`Usuario autenticado: ${usuario.nombre}`);
            // Actualizar racha al iniciar sesión
            await actualizarRacha(usuario);
        } else {
            console.log("Usuario no autenticado");
        }

        // Inicializar UI con el usuario (o null)
        initUI(usuario);
    });
});
