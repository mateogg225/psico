// ==================== GESTIÓN DE USUARIO ====================
import { db } from './firebase.js';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, increment } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const COLLECTION_NAME = "usuarios";

export async function crearUsuario(firebaseUser) {
    const nuevoUsuario = {
        uid: firebaseUser.uid,
        nombre: firebaseUser.displayName,
        email: firebaseUser.email,
        foto: firebaseUser.photoURL,
        premium: false,
        puntos: 0,
        nivel: 1,
        progreso: {
            leccionesCompletadas: [],
            cursosCompletados: [],
            racha: 0,
            ultimaVisita: new Date().toISOString()
        },
        estrellas: {}, // Mapa cursoId -> estrellas
        logros: [], // IDs de logros
        historialPuntos: [],
        avatar: null, // Para el avatar personalizado
        fechaRegistro: new Date().toISOString()
    };

    try {
        await setDoc(doc(db, COLLECTION_NAME, firebaseUser.uid), nuevoUsuario);
        return nuevoUsuario;
    } catch (error) {
        console.error("Error creando usuario:", error);
        throw error;
    }
}

export async function obtenerUsuario(uid) {
    try {
        const docRef = doc(db, COLLECTION_NAME, uid);
        const docSnap = getDoc(docRef);

        if ((await docSnap).exists()) {
            return (await docSnap).data();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error obteniendo usuario:", error);
        return null;
    }
}

export async function actualizarUsuario(uid, datos) {
    try {
        const docRef = doc(db, COLLECTION_NAME, uid);
        await updateDoc(docRef, datos);
    } catch (error) {
        console.error("Error actualizando usuario:", error);
    }
}

export async function guardarProgresoLeccion(uid, leccionId) {
    try {
        const docRef = doc(db, COLLECTION_NAME, uid);
        await updateDoc(docRef, {
            "progreso.leccionesCompletadas": arrayUnion(leccionId)
        });
    } catch (error) {
        console.error("Error guardando progreso:", error);
    }
}

export async function guardarPuntos(uid, puntos, razon) {
    try {
        const docRef = doc(db, COLLECTION_NAME, uid);
        const nuevoHistorial = {
            fecha: new Date().toISOString(),
            cantidad: puntos,
            razon: razon
        };

        await updateDoc(docRef, {
            puntos: increment(puntos),
            historialPuntos: arrayUnion(nuevoHistorial)
        });
    } catch (error) {
        console.error("Error guardando puntos:", error);
    }
}
