# Instrucciones para el Sistema Modular con Firebase

¡Hola! He refactorizado tu aplicación para que sea modular y use Firebase. Aquí tienes los pasos para ponerla en marcha.

## 1. Configuración de Firebase
Para que el inicio de sesión y la base de datos funcionen, necesitas poner tus propias credenciales de Firebase.

1.  Ve a [Firebase Console](https://console.firebase.google.com/).
2.  Crea un nuevo proyecto (o usa uno existente).
3.  Agrega una "Web App" a tu proyecto.
4.  Copia la configuración (`firebaseConfig`).
5.  Abre el archivo `js/firebase.js` y reemplaza el objeto `firebaseConfig` con tus datos reales.

```javascript
// js/firebase.js
const firebaseConfig = {
    apiKey: "TU_API_KEY_REAL",
    authDomain: "...",
    // ... resto de tus datos
};
```

## 2. Habilitar Autenticación y Base de Datos
En tu consola de Firebase:
1.  **Authentication**: Ve a "Sign-in method" y habilita **Google**.
2.  **Firestore Database**: Crea una base de datos. Empieza en **modo de prueba** (test mode) para desarrollar sin problemas de permisos iniciales.

## 3. Ejecutar la Aplicación
Como ahora usamos Módulos de ES (`import`/`export`), **no puedes abrir el archivo `index.html` directamente** haciendo doble clic. Los navegadores bloquean esto por seguridad (CORS).

Necesitas un servidor local. Si usas VS Code:
1.  Instala la extensión **Live Server**.
2.  Haz clic derecho en `index.html` y elige "Open with Live Server".

## 4. Estructura de Archivos
*   `js/main.js`: Punto de entrada. Inicia la app.
*   `js/firebase.js`: Conexión con Firebase.
*   `js/auth.js`: Manejo de Login/Logout con Google.
*   `js/usuario.js`: Guardado y lectura de datos del usuario en Firestore.
*   `js/gamificacion.js`: Lógica de puntos, niveles y logros.
*   `js/ui.js`: Manejo de la interfaz (lo que antes hacía `app.js`).
*   `js/data/`: Carpeta con los datos de cursos, niveles y logros.

¡Disfruta tu nueva arquitectura profesional! 🚀
