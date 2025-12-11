# Instrucciones para el Backend Node.js + MongoDB

¡Tu sistema completo de backend y frontend está listo! 🚀

## 1. Requisitos Previos
Asegúrate de tener instalado:
*   [Node.js](https://nodejs.org/)
*   [MongoDB](https://www.mongodb.com/try/download/community) (o tener una URI de MongoDB Atlas)

## 2. Configuración del Backend

1.  Abre una terminal en la carpeta `backend`:
    ```bash
    cd backend
    ```

2.  Instala las dependencias:
    ```bash
    npm install
    ```

3.  Configura tu base de datos en el archivo `.env` (ya creado):
    *   Si tienes MongoDB local, la URI por defecto `mongodb://localhost:27017/psico_app` funcionará.
    *   Si usas Atlas, reemplázala con tu string de conexión.

4.  Inicia el servidor:
    ```bash
    npm run dev
    ```
    Verás: `Servidor corriendo en puerto 5000` y `MongoDB Conectado`.

## 3. Probando el Frontend

1.  Abre el archivo `register.html` en tu navegador (o usa Live Server).
2.  Crea una cuenta.
3.  Si todo sale bien, te redirigirá al `dashboard.html`.
4.  ¡Prueba los botones para sumar puntos y diamantes! Se guardarán en tu base de datos MongoDB.

## Estructura del Proyecto
*   `/backend`: Todo el código del servidor (API).
*   `register.html`, `login.html`, `dashboard.html`: Frontend minimalista para probar la API.

¡Disfruta tu nuevo stack MERN (Mongo, Express, React/HTML, Node)! 🔥
