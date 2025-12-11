// ==================== UI MANAGER ====================
import { cursos } from './data/cursos.js';
import { NIVELES } from './data/niveles.js';
import { LOGROS } from './data/logros.js';
import { loginConGoogle, logout } from './auth.js';
import { sumarPuntos, verificarNivel, verificarLogros } from './gamificacion.js';
import { guardarProgresoLeccion, actualizarUsuario } from './usuario.js';

let usuarioActual = null;
let leccionActual = null;
let quizActual = 0;
let respuestasCorrectas = 0;

export function initUI(usuario) {
    usuarioActual = usuario;

    // Configurar event listeners globales
    setupEventListeners();

    // Renderizar estado inicial
    actualizarInterfazUsuario();

    // Si no hay usuario, mostrar login o home genérico
    if (!usuario) {
        // Opcional: mostrar modal de login
        console.log("Usuario no logueado");
    } else {
        // Verificar avatar
        if (!usuario.avatar && !localStorage.getItem('avatarCreado')) {
            mostrarVista('creacion-avatar');
        } else {
            mostrarVista('home');
        }
    }
}

function setupEventListeners() {
    // Navegación
    document.querySelectorAll('[data-vista]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const vista = e.target.closest('[data-vista]').dataset.vista;
            mostrarVista(vista);
        });
    });

    // Botones de acción
    const btnLogin = document.getElementById('btn-login');
    if (btnLogin) btnLogin.addEventListener('click', handleLogin);

    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) btnLogout.addEventListener('click', handleLogout);

    // Avatar controls
    document.querySelectorAll('.opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.target.closest('.control-group').querySelector('h3').textContent.toLowerCase();
            // Mapeo simple, idealmente usar data-attributes
            let key = 'shape';
            if (type.includes('color')) key = 'color';
            if (type.includes('expresión')) key = 'face';

            // Lógica simplificada para demo
            // En una implementación real, usaríamos data-attributes en los botones
        });
    });
}

export function mostrarVista(vista) {
    document.querySelectorAll('.vista').forEach(v => v.classList.remove('active'));
    const vistaElement = document.getElementById(`vista-${vista}`);
    if (vistaElement) {
        vistaElement.classList.add('active');

        if (vista === 'home') cargarHome();
        if (vista === 'cursos') cargarCursos();
        if (vista === 'perfil') cargarPerfil();
    }
}

async function handleLogin() {
    try {
        usuarioActual = await loginConGoogle();
        actualizarInterfazUsuario();
        mostrarVista('home');
    } catch (error) {
        alert("Error al iniciar sesión: " + error.message);
    }
}

async function handleLogout() {
    await logout();
    usuarioActual = null;
    actualizarInterfazUsuario();
    mostrarVista('home');
}

function actualizarInterfazUsuario() {
    const navLinks = document.querySelector('.nav-links');
    // Actualizar UI basado en si hay usuario o no
    // Esto requeriría modificar el HTML para tener botones de login/logout dinámicos
}

// ==================== HOME ====================
function cargarHome() {
    cargarTemaAleatorio();
    cargarCursosPopulares();
}

function cargarTemaAleatorio() {
    const cursoRandom = cursos[Math.floor(Math.random() * cursos.length)];
    const leccionRandom = cursoRandom.lecciones[0];
    const container = document.getElementById('tema-aleatorio');

    if (container) {
        container.innerHTML = `
            <div class="course-card" style="cursor: pointer">
                <h3>${leccionRandom.titulo}</h3>
                <p>${leccionRandom.contenido.substring(0, 150)}...</p>
                <button class="btn-primary" id="btn-tema-random">Aprender Ahora</button>
            </div>
        `;

        document.getElementById('btn-tema-random').addEventListener('click', () => verLeccion(leccionRandom.id));
    }
}

function cargarCursosPopulares() {
    const grid = document.getElementById('cursos-populares');
    if (grid) {
        grid.innerHTML = cursos.slice(0, 3).map(curso => `
            <div class="course-card" data-curso-id="${curso.id}">
                <div class="course-icon">${curso.imagen}</div>
                <h3 class="course-name">${curso.nombre}</h3>
                <p class="course-description">${curso.descripcion}</p>
                ${curso.premium ? '<span class="course-badge">👑 Premium</span>' : ''}
            </div>
        `).join('');

        grid.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', () => verCurso(parseInt(card.dataset.cursoId)));
        });
    }
}

// ==================== CURSOS ====================
function cargarCursos() {
    const categorias = [...new Set(cursos.map(c => c.categoria))];
    const container = document.getElementById('categorias-cursos');

    if (container) {
        container.innerHTML = categorias.map(cat => `
            <div class="categoria-seccion">
                <h2>${cat}</h2>
                <div class="courses-grid">
                    ${cursos.filter(c => c.categoria === cat).map(curso => `
                        <div class="course-card" data-curso-id="${curso.id}">
                            <div class="course-icon">${curso.imagen}</div>
                            <h3 class="course-name">${curso.nombre}</h3>
                            <p class="course-description">${curso.descripcion}</p>
                            ${curso.premium ? '<span class="course-badge">👑 Premium</span>' : ''}
                            <button class="btn-primary">Ver Lecciones</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', () => verCurso(parseInt(card.dataset.cursoId)));
        });
    }
}

function verCurso(cursoId) {
    const curso = cursos.find(c => c.id === cursoId);
    if (curso.premium && (!usuarioActual || !usuarioActual.premium)) {
        mostrarModalPremium();
        return;
    }
    verLeccion(curso.lecciones[0].id);
}

// ==================== LECCIÓN ====================
function verLeccion(leccionId) {
    leccionActual = null;
    for (let curso of cursos) {
        const leccion = curso.lecciones.find(l => l.id === leccionId);
        if (leccion) {
            leccionActual = { ...leccion, curso };
            break;
        }
    }

    if (!leccionActual) return;

    mostrarVista('leccion');
    quizActual = 0;
    respuestasCorrectas = 0;

    const container = document.getElementById('leccion-contenido');
    if (container) {
        container.innerHTML = `
            <h1 class="leccion-titulo">${leccionActual.titulo}</h1>
            <div class="leccion-categoria">${leccionActual.curso.categoria}</div>
            
            <div class="leccion-contenido">
                <h3>📖 Contenido</h3>
                <p>${leccionActual.contenido}</p>
            </div>
            
            <div class="leccion-ejemplo">
                <h3>💡 Ejemplo Práctico</h3>
                <p>${leccionActual.ejemplo}</p>
            </div>
            
            <div class="quiz-container">
                <h2>❓ Mini-Quiz</h2>
                <div id="quiz-area"></div>
            </div>
            
            <button class="btn-primary" id="btn-completar-leccion">✅ Marcar como Completada</button>
        `;

        document.getElementById('btn-completar-leccion').addEventListener('click', completarLeccion);
        mostrarPreguntaQuiz();
    }
}

function mostrarPreguntaQuiz() {
    if (quizActual >= leccionActual.quiz.length) {
        document.getElementById('quiz-area').innerHTML = `
            <div class="quiz-resultado">
                <h3>¡Quiz Completado!</h3>
                <p>Respuestas correctas: ${respuestasCorrectas} de ${leccionActual.quiz.length}</p>
            </div>
        `;
        return;
    }

    const pregunta = leccionActual.quiz[quizActual];
    const quizArea = document.getElementById('quiz-area');

    quizArea.innerHTML = `
        <div class="quiz-pregunta">Pregunta ${quizActual + 1}: ${pregunta.pregunta}</div>
        <div class="quiz-opciones">
            ${pregunta.opciones.map((opcion, i) => `
                <div class="quiz-opcion" data-index="${i}">
                    ${opcion}
                </div>
            `).join('')}
        </div>
        <div id="quiz-feedback"></div>
    `;

    quizArea.querySelectorAll('.quiz-opcion').forEach(opcion => {
        opcion.addEventListener('click', (e) => responderQuiz(parseInt(e.target.dataset.index)));
    });
}

function responderQuiz(opcionSeleccionada) {
    const pregunta = leccionActual.quiz[quizActual];
    const opciones = document.querySelectorAll('.quiz-opcion');

    opciones.forEach((opcion, i) => {
        // Remover listener clonando (hack rápido) o simplemente deshabilitar visualmente
        opcion.style.pointerEvents = 'none';
        if (i === pregunta.correcta) {
            opcion.classList.add('correcta');
        } else if (i === opcionSeleccionada) {
            opcion.classList.add('incorrecta');
        }
    });

    if (opcionSeleccionada === pregunta.correcta) {
        respuestasCorrectas++;
    }

    const feedback = document.getElementById('quiz-feedback');
    feedback.innerHTML = `
        <p><strong>${opcionSeleccionada === pregunta.correcta ? '✅ Correcto!' : '❌ Incorrecto'}</strong></p>
        <p>${pregunta.explicacion}</p>
        <button class="btn-primary" id="btn-siguiente-pregunta">Siguiente</button>
    `;

    document.getElementById('btn-siguiente-pregunta').addEventListener('click', () => {
        quizActual++;
        mostrarPreguntaQuiz();
    });
}

async function completarLeccion() {
    if (!usuarioActual) {
        alert("Debes iniciar sesión para guardar tu progreso.");
        return;
    }

    if (!usuarioActual.progreso.leccionesCompletadas.includes(leccionActual.id)) {
        // Actualizar local
        usuarioActual.progreso.leccionesCompletadas.push(leccionActual.id);

        // Guardar en BD
        await guardarProgresoLeccion(usuarioActual.uid, leccionActual.id);

        // Gamificación
        const nuevosPuntos = await sumarPuntos(usuarioActual, 10, "Completar lección 📖");

        // Verificar nivel
        const resultadoNivel = await verificarNivel(usuarioActual);
        if (resultadoNivel.subio) {
            alert(`¡Subiste de nivel! Ahora eres ${resultadoNivel.datos.nombre} ${resultadoNivel.datos.icono}`);
        }

        // Verificar logros
        const nuevosLogros = await verificarLogros(usuarioActual);
        if (nuevosLogros.length > 0) {
            nuevosLogros.forEach(l => alert(`¡Logro desbloqueado: ${l.nombre}! ${l.icono}`));
        }

        alert('✅ ¡Lección completada! +10 puntos.');
    } else {
        alert('Ya completaste esta lección anteriormente.');
    }
}

// ==================== PERFIL ====================
function cargarPerfil() {
    if (!usuarioActual) return;

    document.getElementById('perfil-progreso').textContent = "0%"; // Calcular real
    // ... Resto de lógica de perfil similar a app.js pero usando usuarioActual

    // Renderizar Logros
    const container = document.getElementById('logros-grid');
    if (container) {
        const logrosDesbloqueados = usuarioActual.logros || [];
        container.innerHTML = LOGROS.map(logro => `
            <div class="logro-card ${logrosDesbloqueados.includes(logro.id) ? '' : 'bloqueado'}">
                <div class="logro-icono">${logro.icono}</div>
                <h4>${logro.nombre}</h4>
                <p class="logro-descripcion">${logro.descripcion}</p>
            </div>
        `).join('');
    }
}

function mostrarModalPremium() {
    const modal = document.getElementById('modal-premium');
    if (modal) modal.classList.add('active');
}

// Exportar funciones necesarias para el HTML (si se usan onclick inline, aunque idealmente no)
window.mostrarVista = mostrarVista;
window.toggleDarkMode = () => { /* Implementar */ };
window.mostrarModalPremium = mostrarModalPremium;
window.cerrarModalPremium = () => document.getElementById('modal-premium').classList.remove('active');
