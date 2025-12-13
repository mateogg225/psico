import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cursos, NIVELES, LOGROS } from '../data/data';

export default function DashboardPage() {
    // Dashboard Logic Migrated
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')) || {
        nombre: "Usuario",
        email: "usuario@ejemplo.com",
        premium: false,
        progreso: {
            leccionesCompletadas: [],
            cursosCompletados: [],
            diasConsecutivos: 0,
            ultimaVisita: null,
            racha: 0
        }
    });

    const [puntos, setPuntos] = useState(parseInt(localStorage.getItem('puntosUsuario') || '0'));
    const [racha, setRacha] = useState(parseInt(localStorage.getItem('racha') || '0'));
    const [rachaMaxima, setRachaMaxima] = useState(parseInt(localStorage.getItem('rachaMaxima') || '0'));
    const [logrosDesbloqueados, setLogrosDesbloqueados] = useState(JSON.parse(localStorage.getItem('logros') || '[]'));

    // Calculate Level
    const obtenerNivelActual = () => {
        for (let i = NIVELES.length - 1; i >= 0; i--) {
            if (puntos >= NIVELES[i].puntosRequeridos) {
                return NIVELES[i];
            }
        }
        return NIVELES[0];
    };

    const nivelData = obtenerNivelActual();
    const siguienteNivel = NIVELES.find(n => n.nivel === nivelData.nivel + 1);

    // Statistics
    const totalLecciones = cursos.reduce((sum, c) => sum + c.lecciones.length, 0);
    const progresoPorcentaje = Math.round((usuario.progreso.leccionesCompletadas.length / totalLecciones) * 100);

    // Courses in Progress
    const cursosEnProgreso = cursos.filter(c =>
        c.lecciones.some(l => usuario.progreso.leccionesCompletadas.includes(l.id)) &&
        !usuario.progreso.cursosCompletados.includes(c.id)
    );

    return (
        <div className="vista active">
            <div className="perfil-container">
                {/* Profile Header */}
                <div className="perfil-header">
                    <div className="perfil-avatar">
                        {usuario.nombre[0]?.toUpperCase()}
                    </div>
                    <div className="perfil-info">
                        <h2 id="perfil-nombre">{usuario.nombre}</h2>
                        <span className="perfil-badge">{usuario.premium ? '👑 Premium' : 'Free'}</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="perfil-stats">
                    <div className="stat-box">
                        <div className="stat-icon">📊</div>
                        <div className="stat-value">{progresoPorcentaje}%</div>
                        <div className="stat-name">Progreso General</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-icon">✅</div>
                        <div className="stat-value">{usuario.progreso.cursosCompletados.length}</div>
                        <div className="stat-name">Cursos Completados</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-icon">🔥</div>
                        <div className="stat-value">{usuario.progreso.racha}</div>
                        <div className="stat-name">Días Consecutivos</div>
                    </div>
                </div>

                {/* Gamification Container */}
                <div className="gamificacion-container">
                    {/* Level Card */}
                    <div className="nivel-card">
                        <div className="nivel-header">
                            <div className="nivel-icono">{nivelData.icono}</div>
                            <div className="nivel-info">
                                <h3>{nivelData.nombre}</h3>
                                <p>{puntos} puntos</p>
                            </div>
                        </div>
                        <div className="nivel-progreso">
                            <div className="progreso-bar">
                                <div
                                    className="progreso-fill"
                                    style={{
                                        width: siguienteNivel
                                            ? `${((puntos - nivelData.puntosRequeridos) / (siguienteNivel.puntosRequeridos - nivelData.puntosRequeridos)) * 100}%`
                                            : '100%'
                                    }}
                                ></div>
                            </div>
                            <p className="progreso-texto">
                                {siguienteNivel
                                    ? `${puntos} / ${siguienteNivel.puntosRequeridos} para ${siguienteNivel.nombre}`
                                    : '¡Nivel máximo alcanzado! 👑'}
                            </p>
                        </div>
                    </div>

                    {/* Streak Card */}
                    <div className="racha-card">
                        <div className="racha-icono">🔥</div>
                        <div className="racha-info">
                            <h3>{racha} días</h3>
                            <p>Racha actual</p>
                        </div>
                        <div className="racha-maxima">
                            <p>Máxima: {rachaMaxima}</p>
                        </div>
                    </div>
                </div>

                {/* Courses in Progress Section */}
                <div className="perfil-seccion">
                    <h2>📖 Mis Cursos en Progreso</h2>
                    <div className="cursos-lista">
                        {cursosEnProgreso.length > 0 ? cursosEnProgreso.map(c => (
                            <div key={c.id} className="course-card" onClick={() => navigate(`/courses`)}>
                                <div className="course-icon">{c.imagen}</div>
                                <h3>{c.nombre}</h3>
                            </div>
                        )) : <p>No tenés cursos en progreso</p>}
                    </div>
                </div>

                {/* Achievements Section */}
                <div className="perfil-seccion">
                    <h2>🏆 Logros Desbloqueados</h2>
                    <div className="logros-grid">
                        {LOGROS.map(logro => (
                            <div key={logro.id} className={`logro-card ${logrosDesbloqueados.includes(logro.id) ? '' : 'bloqueado'}`}>
                                <div className="logro-icono">{logro.icono}</div>
                                <h4>{logro.nombre}</h4>
                                <p className="logro-descripcion">{logro.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="perfil-seccion">
                    <h2>🎯 Mis Logros (Legacy View)</h2>
                    <div id="logros" className="logros-grid">
                        {/* Simple view from array logic in original code */}
                        {[
                            { nombre: 'Primera Lección', icon: '🎯', desbloqueado: usuario.progreso.leccionesCompletadas.length >= 1 },
                            { nombre: '5 Lecciones', icon: '📚', desbloqueado: usuario.progreso.leccionesCompletadas.length >= 5 },
                            { nombre: 'Racha de 7 días', icon: '🔥', desbloqueado: usuario.progreso.racha >= 7 },
                            { nombre: 'Primer Curso', icon: '🏆', desbloqueado: usuario.progreso.cursosCompletados.length >= 1 }
                        ].map((l, idx) => (
                            <div key={idx} className={`logro ${l.desbloqueado ? 'desbloqueado' : 'bloqueado'}`}>
                                <div style={{ fontSize: '2rem', filter: !l.desbloqueado ? 'grayscale(1) opacity(0.3)' : '' }}>{l.icon}</div>
                                <p>{l.nombre}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
