// ESTADO GLOBAL
let vistaActual = 'home';
let leccionActual = null;
let quizActual = 0;
let respuestasCorrectas = 0;

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', function () {
    cargarHome();
    actualizarPremiumUI();
    actualizarRachaGamificada(); // Gamificación
    desbloquearLogros(); // Verificar logros al cargar
    inicializarTema();
    agregarAnimacionesScroll();
    initAvatarCreation(); // Inicializar avatar
});

// ==================== TEMA (MULTI-THEME) ====================
function inicializarTema() {
    const temaGuardado = localStorage.getItem('theme') || 'light';
    aplicarTema(temaGuardado);
}

function toggleTheme() {
    const html = document.documentElement;
    const temaActual = html.getAttribute('data-theme') || 'light';

    let nuevoTema = 'light';
    if (temaActual === 'light') nuevoTema = 'sunset';
    else if (temaActual === 'sunset') nuevoTema = 'dark';
    else if (temaActual === 'dark') nuevoTema = 'light';

    aplicarTema(nuevoTema);
}

function aplicarTema(tema) {
    const html = document.documentElement;
    html.setAttribute('data-theme', tema);
    localStorage.setItem('theme', tema);
    actualizarIconoTema(tema);

    // Actualizar fondo 3D si está cargado
    if (window.set3DTheme) {
        window.set3DTheme(tema);
    }
}

function actualizarIconoTema(tema) {
    const icono = document.getElementById('theme-icon');
    if (icono) {
        if (tema === 'light') icono.textContent = '☀️';
        else if (tema === 'sunset') icono.textContent = '🌅';
        else if (tema === 'dark') icono.textContent = '🌙';
    }
}

// ==================== ANIMACIONES AL SCROLL ====================
function agregarAnimacionesScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observar cards de cursos
    document.querySelectorAll('.course-card, .stat-card, .benefit-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// NAVEGACIÓN
function mostrarVista(vista) {
    document.querySelectorAll('.vista').forEach(v => v.classList.remove('active'));
    document.getElementById(`vista-${vista}`).classList.add('active');
    vistaActual = vista;

    if (vista === 'home') cargarHome();
    if (vista === 'cursos') cargarCursos();
    if (vista === 'perfil') cargarPerfil();
}

// HOME
function cargarHome() {
    cargarTemaAleatorio();
    cargarCursosPopulares();
}

function cargarTemaAleatorio() {
    const leccionRandom = cursos[Math.floor(Math.random() * cursos.length)].lecciones[0];
    document.getElementById('tema-aleatorio').innerHTML = `
        <div class="course-card" onclick="verLeccion(${leccionRandom.id})">
            <h3>${leccionRandom.titulo}</h3>
            <p>${leccionRandom.contenido.substring(0, 150)}...</p>
            <button class="btn-primary">Aprender Ahora</button>
        </div>
    `;
}

function cargarCursosPopulares() {
    const grid = document.getElementById('cursos-populares');
    grid.innerHTML = cursos.slice(0, 3).map(curso => `
        <div class="course-card" onclick="verCurso(${curso.id})">
            <div class="course-icon">${curso.imagen}</div>
            <h3 class="course-name">${curso.nombre}</h3>
            <p class="course-description">${curso.descripcion}</p>
            ${curso.premium ? '<span class="course-badge">👑 Premium</span>' : ''}
        </div>
    `).join('');
}

// CURSOS
function cargarCursos() {
    const categorias = [...new Set(cursos.map(c => c.categoria))];
    const container = document.getElementById('categorias-cursos');

    container.innerHTML = categorias.map(cat => `
        <div class="categoria-seccion">
            <h2>${cat}</h2>
            <div class="courses-grid">
                ${cursos.filter(c => c.categoria === cat).map(curso => `
                    <div class="course-card" onclick="verCurso(${curso.id})">
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
}

function verCurso(cursoId) {
    const curso = cursos.find(c => c.id === cursoId);
    if (curso.premium && !usuario.premium) {
        mostrarModalPremium();
        return;
    }
    verLeccion(curso.lecciones[0].id);
}

// LECCIÓN
let tarjetaActualIndex = 0;

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

    // Check for new interactive format
    if (leccionActual.tipo === 'interactivo' && leccionActual.tarjetas) {
        tarjetaActualIndex = 0;
        renderInteractiveLesson();
    } else {
        // Fallback for standard lessons
        renderStandardLesson();
    }
}

function renderStandardLesson() {
    quizActual = 0;
    respuestasCorrectas = 0;

    const container = document.getElementById('leccion-contenido');
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
        
        <div class="comentarios-seccion">
            <h2>💬 Comentarios</h2>
            <div id="comentarios-lista"></div>
            <div class="comentario-form">
                <input type="text" id="comentario-nombre" placeholder="Tu nombre">
                <textarea id="comentario-texto" placeholder="Tu comentario"></textarea>
                <button class="btn-primary" onclick="agregarComentarioLeccion()">Enviar</button>
            </div>
        </div>
        
        <button class="btn-primary" onclick="marcarCompletada()">✅ Marcar como Completada</button>
    `;

    mostrarPreguntaQuiz();
    cargarComentariosLeccion();
}

// NUEVO: CONTROLADOR DE LECCIÓN INTERACTIVA
function renderInteractiveLesson() {
    const container = document.getElementById('leccion-contenido');

    // Setup container structure
    container.innerHTML = `
        <div class="lesson-header">
            <h1 class="leccion-titulo">${leccionActual.titulo}</h1>
            <div class="progress-container">
                <div class="progress-bar" id="lesson-progress" style="width: 0%"></div>
            </div>
        </div>
        
        <div id="card-container" class="card-container-step">
            <!-- Content injected here -->
        </div>

        <div class="lesson-controls">
            <button class="btn-secondary" id="btn-prev" onclick="prevTarjeta()" style="display:none">Anterior</button>
            <button class="btn-primary" id="btn-next" onclick="nextTarjeta()">Siguiente</button>
        </div>
    `;

    mostrarTarjeta(0);
}

function mostrarTarjeta(index) {
    const tarjeta = leccionActual.tarjetas[index];
    const container = document.getElementById('card-container');
    const total = leccionActual.tarjetas.length;

    // Update Progress
    const progress = ((index + 1) / total) * 100;
    document.getElementById('lesson-progress').style.width = `${progress}%`;

    // Visual Icon
    let visualHtml = `<div class="card-visual">${tarjeta.visual || '📄'}</div>`;

    // Deepening Section
    let deepeningHtml = tarjeta.profundizando ?
        `<div class="card-deep-dive">
            <strong>🧐 Profundizando:</strong> ${tarjeta.profundizando}
         </div>` : '';

    // Example/Dialogue Section
    let exampleHtml = tarjeta.ejemplo ?
        `<div class="card-example">
            <em>${tarjeta.ejemplo}</em>
         </div>` : '';

    // Quiz Section
    let quizHtml = '';
    if (tarjeta.tipo === 'quiz') {
        quizHtml = `
            <div class="mini-quiz-card">
                <p class="quiz-question">${tarjeta.pregunta.texto}</p>
                <div class="quiz-options-vertical">
                    ${tarjeta.pregunta.opciones.map((opt, i) =>
            `<button class="btn-quiz-opt" onclick="checkInteractiveQuiz(${i}, this)">${opt}</button>`
        ).join('')}
                </div>
                <div id="quiz-feedback-step"></div>
            </div>
        `;
    }

    // Main Content
    let contentHtml = `<p class="card-text">${tarjeta.contenido}</p>`;
    // If it's pure quiz type, main content might be just instructions or empty
    if (tarjeta.tipo === 'quiz') contentHtml = `<p class="card-text">${tarjeta.contenido}</p>`;

    container.innerHTML = `
        <div class="interactive-card animate-in">
            <h2 class="card-title-step">${tarjeta.titulo}</h2>
            ${visualHtml}
            ${contentHtml}
            ${exampleHtml}
            ${deepeningHtml}
            ${quizHtml}
        </div>
    `;

    // Retrieve global vars for logic
    const nextBtn = document.getElementById('btn-next');
    const prevBtn = document.getElementById('btn-prev');

    // Controls Logic
    prevBtn.style.display = index === 0 ? 'none' : 'block';

    if (index === total - 1 && tarjeta.tipo !== 'quiz') {
        nextBtn.textContent = '🎉 Finalizar';
        nextBtn.onclick = finalizarLeccionInteractiva;
    } else if (tarjeta.tipo === 'quiz') {
        nextBtn.style.display = 'none'; // Hide next until quiz answered
    } else {
        nextBtn.textContent = 'Siguiente';
        nextBtn.onclick = nextTarjeta;
        nextBtn.style.display = 'block';
    }
}

function nextTarjeta() {
    if (tarjetaActualIndex < leccionActual.tarjetas.length - 1) {
        tarjetaActualIndex++;
        mostrarTarjeta(tarjetaActualIndex);
    }
}

function prevTarjeta() {
    if (tarjetaActualIndex > 0) {
        tarjetaActualIndex--;
        mostrarTarjeta(tarjetaActualIndex);
    }
}

function checkInteractiveQuiz(selectedIndex, btnElement) {
    const tarjeta = leccionActual.tarjetas[tarjetaActualIndex];
    const feedback = document.getElementById('quiz-feedback-step');
    const nextBtn = document.getElementById('btn-next');

    if (selectedIndex === tarjeta.pregunta.correcta) {
        btnElement.classList.add('correct');
        feedback.innerHTML = `<div class="feedback-success">✅ ${tarjeta.pregunta.feedback}</div>`;

        // Show next button or finish
        if (tarjetaActualIndex === leccionActual.tarjetas.length - 1) {
            nextBtn.textContent = '🎉 Finalizar Lección';
            nextBtn.onclick = finalizarLeccionInteractiva;
            nextBtn.style.display = 'block';
        } else {
            nextBtn.textContent = 'Siguiente';
            nextBtn.style.display = 'block';
        }
    } else {
        btnElement.classList.add('incorrect');
        feedback.innerHTML = `<div class="feedback-error">❌ Ups, intentá de nuevo.</div>`;
    }
}

function finalizarLeccionInteractiva() {
    marcarCompletada();
    // Re-render to show comments section or summary
    // For simplicity, we just mark complete and maybe show standard view or back to menu
    // Or simpler: alert is handled in marcarCompletada, then we can go back
    mostrarVista('cursos');
}

// COMENTARIOS
function cargarComentariosLeccion() {

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
        document.getElementById('quiz-area').innerHTML = `
        <div class="quiz-pregunta">Pregunta ${quizActual + 1}: ${pregunta.pregunta}</div>
        <div class="quiz-opciones">
            ${pregunta.opciones.map((opcion, i) => `
                <div class="quiz-opcion" onclick="responderQuiz(${i})">
                    ${opcion}
                </div>
            `).join('')}
        </div>
        <div id="quiz-feedback"></div>
    `;
    }

    function responderQuiz(opcionSeleccionada) {
        const pregunta = leccionActual.quiz[quizActual];
        const opciones = document.querySelectorAll('.quiz-opcion');

        opciones.forEach((opcion, i) => {
            opcion.onclick = null;
            if (i === pregunta.correcta) {
                opcion.classList.add('correcta');
            } else if (i === opcionSeleccionada) {
                opcion.classList.add('incorrecta');
            }
        });

        if (opcionSeleccionada === pregunta.correcta) {
            respuestasCorrectas++;
        }

        document.getElementById('quiz-feedback').innerHTML = `
        <p><strong>${opcionSeleccionada === pregunta.correcta ? '✅ Correcto!' : '❌ Incorrecto'}</strong></p>
        <p>${pregunta.explicacion}</p>
        <button class="btn-primary" onclick="siguientePregunta()">Siguiente</button>
    `;
    }

    function siguientePregunta() {
        quizActual++;
        mostrarPreguntaQuiz();
    }

    function marcarCompletada() {
        if (!usuario.progreso.leccionesCompletadas.includes(leccionActual.id)) {
            usuario.progreso.leccionesCompletadas.push(leccionActual.id);
            guardarUsuario();
            alert('✅ ¡Lección completada! Seguí aprendiendo.');
        }
    }

    // COMENTARIOS
    function cargarComentariosLeccion() {
        const comentariosLeccion = obtenerComentariosPorLeccion(leccionActual.id);
        document.getElementById('comentarios-lista').innerHTML = comentariosLeccion.map(c => `
        <div class="comentario-card">
            <div class="comentario-header">
                <span class="comentario-autor">${c.usuario}</span>
                <span class="comentario-fecha">${new Date(c.fecha).toLocaleDateString()}</span>
            </div>
            <p>${c.comentario}</p>
        </div>
    `).join('') || '<p>No hay comentarios aún. ¡Sé el primero!</p>';
    }

    function agregarComentarioLeccion() {
        const nombre = document.getElementById('comentario-nombre').value;
        const texto = document.getElementById('comentario-texto').value;

        if (!nombre || !texto) {
            alert('Por favor completá todos los campos');
            return;
        }

        agregarComentario(leccionActual.id, nombre, texto);
        document.getElementById('comentario-nombre').value = '';
        document.getElementById('comentario-texto').value = '';
        cargarComentariosLeccion();
    }

    // PERFIL
    function cargarPerfil() {
        document.getElementById('perfil-nombre').textContent = usuario.nombre;
        document.getElementById('perfil-inicial').textContent = usuario.nombre[0].toUpperCase();
        document.getElementById('perfil-estado').textContent = usuario.premium ? '👑 Premium' : 'Free';

        const totalLecciones = cursos.reduce((sum, c) => sum + c.lecciones.length, 0);
        const progreso = Math.round((usuario.progreso.leccionesCompletadas.length / totalLecciones) * 100);

        document.getElementById('perfil-progreso').textContent = progreso + '%';
        document.getElementById('perfil-completados').textContent = usuario.progreso.cursosCompletados.length;
        document.getElementById('perfil-racha').textContent = usuario.progreso.racha;

        // Cursos en progreso
        const cursosEnProgreso = cursos.filter(c =>
            c.lecciones.some(l => usuario.progreso.leccionesCompletadas.includes(l.id)) &&
            !usuario.progreso.cursosCompletados.includes(c.id)
        );

        document.getElementById('cursos-en-progreso').innerHTML = cursosEnProgreso.map(c => `
        <div class="course-card" onclick="verCurso(${c.id})">
            <div class="course-icon">${c.imagen}</div>
            <h3>${c.nombre}</h3>
        </div>
    `).join('') || '<p>No tenés cursos en progreso</p>';

        // Logros
        const logros = [
            { nombre: 'Primera Lección', icon: '🎯', desbloqueado: usuario.progreso.leccionesCompletadas.length >= 1 },
            { nombre: '5 Lecciones', icon: '📚', desbloqueado: usuario.progreso.leccionesCompletadas.length >= 5 },
            { nombre: 'Racha de 7 días', icon: '🔥', desbloqueado: usuario.progreso.racha >= 7 },
            { nombre: 'Primer Curso', icon: '🏆', desbloqueado: usuario.progreso.cursosCompletados.length >= 1 }
        ];

        document.getElementById('logros').innerHTML = logros.map(l => `
        <div class="logro ${l.desbloqueado ? 'desbloqueado' : 'bloqueado'}">
            <div style="font-size: 2rem; ${!l.desbloqueado ? 'filter: grayscale(1); opacity: 0.3;' : ''}">${l.icon}</div>
            <p>${l.nombre}</p>
        </div>
    `).join('');

        renderPerfilGamificado();
    }

    function editarNombre() {
        const nuevoNombre = prompt("Ingresá tu nuevo nombre:", usuario.nombre);

        if (nuevoNombre && nuevoNombre.trim() !== "") {
            usuario.nombre = nuevoNombre.trim();
            guardarUsuario();
            cargarPerfil();
            // Actualizar también el saludo si estamos en home
            if (vistaActual === 'home') {
                // Si hubiera un saludo en home lo actualizaríamos aquí
            }
            alert(`¡Hola, ${usuario.nombre}! Tu nombre se actualizó correctamente.`);
        }
    }

    // PREMIUM
    function mostrarModalPremium() {
        document.getElementById('modal-premium').classList.add('active');
    }

    function cerrarModalPremium() {
        document.getElementById('modal-premium').classList.remove('active');
    }

    function activarPremium() {
        usuario.premium = true;
        guardarUsuario();
        actualizarPremiumUI();
        cerrarModalPremium();
        alert('🎉 ¡Premium activado! Ahora tenés acceso a todo el contenido.');
    }

    function actualizarPremiumUI() {
        if (usuario.premium) {
            document.getElementById('premium-badge').textContent = '👑 Premium Activo';
            document.getElementById('btn-ia-flotante').style.display = 'block';
            document.querySelector('.btn-premium-large').textContent = '👑 Premium Activo';
        }
    }

    // IA ASISTENTE
    function mostrarModalIA() {
        if (!usuario.premium) {
            mostrarModalPremium();
            return;
        }
        document.getElementById('modal-ia').classList.add('active');
    }

    function cerrarModalIA() {
        document.getElementById('modal-ia').classList.remove('active');
    }

    function enviarPreguntaIA() {
        const pregunta = document.getElementById('ia-pregunta').value;
        if (!pregunta) return;

        const chat = document.getElementById('ia-chat');
        chat.innerHTML += `<div class="ia-mensaje usuario">${pregunta}</div>`;

        // Respuesta simulada
        setTimeout(() => {
            const respuesta = "Esa es una excelente pregunta. Te recomiendo revisar la lección sobre ese tema para profundizar más.";
            chat.innerHTML += `<div class="ia-mensaje asistente">${respuesta}</div>`;
            chat.scrollTop = chat.scrollHeight;
        }, 1000);

        document.getElementById('ia-pregunta').value = '';
    }

    // RACHA
    function actualizarRacha() {
        const hoy = new Date().toDateString();
        const ultimaVisita = usuario.progreso.ultimaVisita;

        if (ultimaVisita !== hoy) {
            const ayer = new Date();
            ayer.setDate(ayer.getDate() - 1);

            if (ultimaVisita === ayer.toDateString()) {
                usuario.progreso.racha++;
            } else if (ultimaVisita) {
                usuario.progreso.racha = 1;
            } else {
                usuario.progreso.racha = 1;
            }

            usuario.progreso.ultimaVisita = hoy;
            guardarUsuario();
        }
    }

    function volverACursos() {
        mostrarVista('cursos');
    }

    // ==================== GAMIFICACIÓN ====================

    // SISTEMA DE PUNTOS
    function sumarPuntos(cantidad, razon) {
        const puntos = parseInt(localStorage.getItem('puntosUsuario') || '0');
        const nuevosPuntos = puntos + cantidad;

        localStorage.setItem('puntosUsuario', nuevosPuntos);

        // Guardar historial
        const historial = JSON.parse(localStorage.getItem('historialPuntos') || '[]');
        historial.push({
            fecha: new Date().toISOString(),
            cantidad,
            razon
        });
        localStorage.setItem('historialPuntos', JSON.stringify(historial));

        // Actualizar nivel
        const nivelAnterior = actualizarNivel();

        // Mostrar notificación
        mostrarNotificacionPuntos(cantidad, razon);

        return nuevosPuntos;
    }

    // SISTEMA DE NIVELES
    function actualizarNivel() {
        const puntos = parseInt(localStorage.getItem('puntosUsuario') || '0');
        const nivelAnterior = parseInt(localStorage.getItem('nivelUsuario') || '1');

        let nivelActual = 1;
        for (let i = NIVELES.length - 1; i >= 0; i--) {
            if (puntos >= NIVELES[i].puntosRequeridos) {
                nivelActual = NIVELES[i].nivel;
                break;
            }
        }

        localStorage.setItem('nivelUsuario', nivelActual);

        // Si subió de nivel, mostrar celebración
        if (nivelActual > nivelAnterior) {
            mostrarCelebracionNivel(nivelActual);
        }

        return nivelActual;
    }

    function obtenerNivelActual() {
        const puntos = parseInt(localStorage.getItem('puntosUsuario') || '0');
        for (let i = NIVELES.length - 1; i >= 0; i--) {
            if (puntos >= NIVELES[i].puntosRequeridos) {
                return NIVELES[i];
            }
        }
        return NIVELES[0];
    }

    // SISTEMA DE RACHAS
    function actualizarRachaGamificada() {
        const hoy = new Date().toDateString();
        const ultimoIngreso = localStorage.getItem('ultimoIngreso');
        let racha = parseInt(localStorage.getItem('racha') || '0');

        if (ultimoIngreso) {
            const ultimaFecha = new Date(ultimoIngreso);
            const diferenciaDias = Math.floor((new Date(hoy) - ultimaFecha) / (1000 * 60 * 60 * 24));

            if (diferenciaDias === 1) {
                // Día consecutivo
                racha++;

                // Bonos por racha
                if (racha === 1) sumarPuntos(5, "Racha 1 día 🔥");
                if (racha === 3) sumarPuntos(10, "Racha 3 días 🔥🔥");
                if (racha === 7) sumarPuntos(30, "Racha 7 días 🔥🔥🔥");

            } else if (diferenciaDias > 1) {
                // Perdió la racha
                racha = 1;
            } else if (diferenciaDias === 0) {
                // Ya ingresó hoy, no hacer nada
                return racha;
            }
        } else {
            // Primer ingreso
            racha = 1;
            sumarPuntos(5, "Primer ingreso 🎉");
        }

        // Actualizar racha máxima
        const rachaMaxima = parseInt(localStorage.getItem('rachaMaxima') || '0');
        if (racha > rachaMaxima) {
            localStorage.setItem('rachaMaxima', racha);
        }

        localStorage.setItem('racha', racha);
        localStorage.setItem('ultimoIngreso', hoy);

        // Actualizar usuario
        usuario.progreso.racha = racha;
        usuario.progreso.ultimaVisita = hoy;
        guardarUsuario();

        return racha;
    }

    // ESTRELLAS POR CURSO
    function guardarEstrellasCurso(idCurso, leccionesCompletadas, totalLecciones) {
        const porcentaje = (leccionesCompletadas / totalLecciones) * 100;

        let estrellas = 0;
        if (porcentaje >= 100) estrellas = 3;
        else if (porcentaje >= 50) estrellas = 2;
        else if (porcentaje > 0) estrellas = 1;

        localStorage.setItem(`estrellas_${idCurso}`, estrellas);

        return estrellas;
    }

    function obtenerEstrellasCurso(idCurso) {
        return parseInt(localStorage.getItem(`estrellas_${idCurso}`) || '0');
    }

    // SISTEMA DE LOGROS
    function desbloquearLogros() {
        const logrosDesbloqueados = JSON.parse(localStorage.getItem('logros') || '[]');
        const nuevosLogros = [];

        LOGROS.forEach(logro => {
            if (!logrosDesbloqueados.includes(logro.id)) {
                try {
                    if (logro.condicion()) {
                        logrosDesbloqueados.push(logro.id);
                        nuevosLogros.push(logro);

                        // Dar puntos por logro
                        sumarPuntos(50, `Logro: ${logro.nombre} 🏆`);
                    }
                } catch (e) {
                    console.log('Error verificando logro:', logro.id);
                }
            }
        });

        localStorage.setItem('logros', JSON.stringify(logrosDesbloqueados));

        // Mostrar notificación de nuevos logros
        if (nuevosLogros.length > 0) {
            mostrarNotificacionLogros(nuevosLogros);
        }

        return nuevosLogros;
    }

    // RENDERIZAR PERFIL GAMIFICADO
    function renderPerfilGamificado() {
        const puntos = parseInt(localStorage.getItem('puntosUsuario') || '0');
        const nivelData = obtenerNivelActual();
        const racha = parseInt(localStorage.getItem('racha') || '0');
        const rachaMaxima = parseInt(localStorage.getItem('rachaMaxima') || '0');

        // Actualizar nivel
        const siguienteNivel = NIVELES.find(n => n.nivel === nivelData.nivel + 1);

        document.getElementById('nivel-nombre').textContent = nivelData.nombre;
        document.getElementById('nivel-icono').textContent = nivelData.icono;
        document.getElementById('nivel-puntos').textContent = `${puntos} puntos`;

        if (siguienteNivel) {
            const puntosParaSiguiente = siguienteNivel.puntosRequeridos - puntos;
            const progreso = ((puntos - nivelData.puntosRequeridos) /
                (siguienteNivel.puntosRequeridos - nivelData.puntosRequeridos)) * 100;

            document.getElementById('progreso-nivel').style.width = `${Math.max(0, Math.min(100, progreso))}%`;
            document.getElementById('puntos-actuales').textContent = puntos;
            document.getElementById('puntos-siguiente').textContent = siguienteNivel.puntosRequeridos;
            document.getElementById('siguiente-nivel').textContent = siguienteNivel.nombre;
        } else {
            // Nivel máximo alcanzado
            document.getElementById('progreso-nivel').style.width = '100%';
            document.querySelector('.progreso-texto').textContent = '¡Nivel máximo alcanzado! 👑';
        }

        // Actualizar racha
        document.getElementById('racha-dias').textContent = `${racha} días`;
        document.getElementById('racha-max').textContent = rachaMaxima;

        // Renderizar logros
        renderLogros();
    }

    function renderLogros() {
        const logrosDesbloqueados = JSON.parse(localStorage.getItem('logros') || '[]');
        const container = document.getElementById('logros-grid');

        if (!container) return;

        container.innerHTML = LOGROS.map(logro => `
        <div class="logro-card ${logrosDesbloqueados.includes(logro.id) ? '' : 'bloqueado'}">
            <div class="logro-icono">${logro.icono}</div>
            <h4>${logro.nombre}</h4>
            <p class="logro-descripcion">${logro.descripcion}</p>
        </div>
    `).join('');
    }

    // NOTIFICACIONES
    function mostrarNotificacionPuntos(cantidad, razon) {
        const notif = document.createElement('div');
        notif.className = 'notificacion-puntos';
        notif.innerHTML = `
        <strong>+${cantidad} puntos ✨</strong>
        <p>${razon}</p>
    `;

        document.body.appendChild(notif);

        setTimeout(() => {
            notif.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => notif.remove(), 500);
        }, 2500);
    }

    function mostrarNotificacionLogros(logros) {
        logros.forEach((logro, index) => {
            setTimeout(() => {
                const modal = document.createElement('div');
                modal.className = 'modal-logro';
                modal.innerHTML = `
                <div class="modal-logro-content">
                    <div class="modal-logro-icono">${logro.icono}</div>
                    <h2>¡Logro Desbloqueado!</h2>
                    <h3>${logro.nombre}</h3>
                    <p>${logro.descripcion}</p>
                    <p class="logro-puntos">+50 puntos 🌟</p>
                    <button class="btn-primary" onclick="this.closest('.modal-logro').remove()">
                        ¡Genial!
                    </button>
                </div>
            `;

                document.body.appendChild(modal);

                modal.addEventListener('click', (e) => {
                    if (e.target === modal) modal.remove();
                });
            }, index * 500);
        });
    }

    function mostrarCelebracionNivel(nivel) {
        const nivelData = NIVELES.find(n => n.nivel === nivel);

        const modal = document.createElement('div');
        modal.className = 'modal-logro';
        modal.innerHTML = `
        <div class="modal-logro-content">
            <div class="modal-logro-icono">🎉</div>
            <h2>¡Subiste de Nivel!</h2>
            <h3>Ahora eres ${nivelData.nombre} ${nivelData.icono}</h3>
            <p>Nivel ${nivel}</p>
            <button class="btn-primary" onclick="this.closest('.modal-logro').remove()">
                ¡Continuar!
            </button>
        </div>
    `;

        document.body.appendChild(modal);
    }

    // MODIFICAR FUNCIÓN MARCAR COMPLETADA
    const marcarCompletadaOriginal = marcarCompletada;
    marcarCompletada = function () {
        if (!usuario.progreso.leccionesCompletadas.includes(leccionActual.id)) {
            usuario.progreso.leccionesCompletadas.push(leccionActual.id);
            guardarUsuario();

            // GAMIFICACIÓN: Sumar puntos
            sumarPuntos(10, "Completar lección 📖");

            // Verificar si completó el curso
            const curso = leccionActual.curso;
            const leccionesDelCurso = curso.lecciones.map(l => l.id);
            const leccionesCompletadasDelCurso = leccionesDelCurso.filter(id =>
                usuario.progreso.leccionesCompletadas.includes(id)
            );

            if (leccionesCompletadasDelCurso.length === leccionesDelCurso.length) {
                // Curso completado
                if (!usuario.progreso.cursosCompletados.includes(curso.id)) {
                    usuario.progreso.cursosCompletados.push(curso.id);
                    sumarPuntos(20, `Completar curso: ${curso.nombre} 🎓`);
                    guardarUsuario();
                }
            }

            // Actualizar estrellas del curso
            guardarEstrellasCurso(curso.id, leccionesCompletadasDelCurso.length, leccionesDelCurso.length);

            // Verificar logros
            desbloquearLogros();

            alert('✅ ¡Lección completada! +10 puntos. Seguí aprendiendo.');
        }
    };

    console.log('🧠 Psicología en 5 Minutos - App cargada');
    console.log('✨ Sistema de gamificación activado');

    // ==================== AVATAR ====================
    let avatarActual = {
        shape: 'circle',
        color: '#FF6B6B',
        face: 'happy'
    };

    function initAvatarCreation() {
        // Si el usuario ya tiene avatar, cargarlo
        if (usuario.avatar) {
            avatarActual = { ...usuario.avatar };
        } else {
            // Si no tiene, mostrar pantalla de creación al inicio
            // Pero solo si no estamos ya en una vista específica
            if (!localStorage.getItem('avatarCreado')) {
                mostrarVista('creacion-avatar');
            }
        }
        renderAvatar();
    }

    function setAvatarOption(type, value) {
        avatarActual[type] = value;
        renderAvatar();

        // Actualizar UI
        document.querySelectorAll(`#${type}-options .opt-btn`).forEach(btn => {
            btn.classList.remove('active');
            if (btn.onclick.toString().includes(value)) {
                btn.classList.add('active');
            }
        });
    }

    function renderAvatar() {
        const shape = document.getElementById('avatar-shape');
        const face = document.getElementById('avatar-face');

        if (!shape || !face) return;

        // Reset classes
        shape.className = 'avatar-base ' + avatarActual.shape;
        shape.style.backgroundColor = avatarActual.color;

        // Set face
        const faces = {
            'happy': '😊',
            'neutral': '😐',
            'cool': '😎',
            'smart': '🤓'
        };
        face.textContent = faces[avatarActual.face];
    }

    function guardarAvatar() {
        usuario.avatar = avatarActual;
        localStorage.setItem('avatarCreado', 'true');
        guardarUsuario();

        // Animación de celebración o feedback
        alert('¡Avatar creado con éxito! 🚀');

        mostrarVista('home');
        cargarPerfil(); // Para actualizar el avatar en el perfil
    }

    // Modificar cargarPerfil para mostrar el avatar real
    const cargarPerfilOriginal = cargarPerfil;
    cargarPerfil = function () {
        cargarPerfilOriginal();

        const avatarContainer = document.querySelector('.perfil-avatar');
        if (usuario.avatar && avatarContainer) {
            avatarContainer.innerHTML = '';
            avatarContainer.style.background = 'transparent';
            avatarContainer.style.boxShadow = 'none';

            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'avatar-display';
            avatarDiv.style.width = '100px';
            avatarDiv.style.height = '100px';

            avatarDiv.innerHTML = `
            <div class="avatar-base ${usuario.avatar.shape}" style="background-color: ${usuario.avatar.color}"></div>
            <div class="avatar-face" style="font-size: 2.5rem">${{
                    'happy': '😊',
                    'neutral': '😐',
                    'cool': '😎',
                    'smart': '🤓'
                }[usuario.avatar.face]
                }</div>
        `;

            avatarContainer.appendChild(avatarDiv);
        }
    };
