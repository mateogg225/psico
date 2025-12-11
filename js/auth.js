// ==================== AUTENTICACIÓN ====================
import { auth, googleProvider } from './firebase.js';
import { signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { obtenerUsuario, crearUsuario } from './usuario.js';

export async function loginConGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Verificar si el usuario existe en Firestore, si no, crearlo
        let usuarioData = await obtenerUsuario(user.uid);

        if (!usuarioData) {
            usuarioData = await crearUsuario(user);
        }

        return usuarioData;
    } catch (error) {
        console.error("Error en login:", error);
        throw error;
    }
}

export async function logout() {
    try {
        await signOut(auth);
        // Limpiar estado local si es necesario
        localStorage.removeItem('usuario_cache');
    } catch (error) {
        console.error("Error en logout:", error);
    }
}

export function observarEstadoAuth(callback) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const usuarioData = await obtenerUsuario(user.uid);
            callback(usuarioData || user); // Devolver datos de Firestore o usuario básico si falla
        } else {
            callback(null);
        }
    });
}
