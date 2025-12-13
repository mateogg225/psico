import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cursos, NIVELES, LOGROS } from '../data/data';
import { useGame } from '../context/GameContext';
import { shopCategories } from '../data/shopCategories';

export default function DashboardPage() {
    const navigate = useNavigate();
    const { diamonds, inventory } = useGame();

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

    // Get purchased furniture/decoration items
    const getAllShopItems = () => {
        const allItems = [];
        shopCategories.forEach(cat => {
            cat.items.forEach(item => allItems.push(item));
        });
        return allItems;
    };

    const consultorioItems = getAllShopItems().filter(item =>
        inventory.includes(item.id) && (item.tipo === 'MUEBLE' || item.tipo === 'DECORACIÓN')
    );

    return (
        <div className="vista active">
            {/* HERO SECTION - Avatar y Identidad */}
            <div className="divan-hero-banner">
                <div className="divan-hero-content">
                    {/* Avatar 3D Central */}
                    <div className="divan-avatar-container">
                        <div className="divan-avatar-3d">
                            <div className="avatar-placeholder">
                                {usuario.nombre[0]?.toUpperCase()}
                            </div>
                        </div>

                        {/* Nombre de usuario */}
                        <h2 className="divan-user-name">{usuario.nombre}</h2>

                        {/* Nivel/Arquetipo Gamificado */}
                        <div className="divan-level-badge">
                            {nivelData.icono} Nivel {nivelData.nivel}: {nivelData.nombre}
                        </div>
                    </div>

                    {/* Botón Personalizar Avatar (derecha) */}
                    <button className="divan-customize-button" onClick={() => navigate('/avatar')}>
                        <span className="customize-icon">✏️</span>
                        <span>Personalizar mi Avatar</span>
                    </button>
                </div>
            </div>

            {/* Contenedor principal */}
            <div className="divan-container">
                {/* SECCIÓN DE ESTADÍSTICAS - 3 tarjetas premium */}
                <div className="divan-stats-grid">
                    <div className="divan-stat-card">
                        <div className="stat-icon-premium">📊</div>
                        <div className="stat-value-premium">{progresoPorcentaje}%</div>
                        <div className="stat-name-premium">Progreso General</div>
                    </div>

                    <div className="divan-stat-card">
                        <div className="stat-icon-premium">✅</div>
                        <div className="stat-value-premium">{usuario.progreso.cursosCompletados.length}</div>
                        <div className="stat-name-premium">Cursos Completados</div>
                    </div>

                    <div className="divan-stat-card">
                        <div className="stat-icon-premium">🔥</div>
                        <div className="stat-value-premium">{usuario.progreso.racha}</div>
                        <div className="stat-name-premium">Días Consecutivos</div>
                    </div>
                </div>

                {/* SECCIÓN MI CONSULTORIO - Visualización de Inventario */}
                <div className="divan-consultorio-section">
                    <h2 className="divan-section-title">🏡 Mi Consultorio</h2>
                    <p className="divan-section-subtitle">Así se ve tu espacio personalizado</p>

                    <div className="consultorio-room">
                        {consultorioItems.length > 0 ? (
                            <div className="consultorio-items-display">
                                {consultorioItems.map(item => (
                                    <div key={item.id} className="consultorio-item-placed">
                                        <div className="item-icon-lg">{item.img}</div>
                                        <div className="item-name-sm">{item.titulo}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="consultorio-empty-state">
                                <div className="empty-icon-lg">🏚️</div>
                                <p className="empty-text-main">Tu espacio está vacío</p>
                                <p className="empty-text-sub">¡Visita el Bazar para decorarlo!</p>
                                <button
                                    className="btn-to-shop"
                                    onClick={() => navigate('/shop')}
                                >
                                    💎 Ir al Bazar
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* CURSOS EN PROGRESO */}
                <div className="divan-section-card">
                    <h2 className="divan-section-title">📚 Mis Cursos en Progreso</h2>
                    {cursosEnProgreso.length > 0 ? (
                        <div className="cursos-en-progreso-grid">
                            {cursosEnProgreso.map(curso => (
                                <div
                                    key={curso.id}
                                    className="curso-progreso-card"
                                    onClick={() => navigate(`/course/${curso.id}`)}
                                >
                                    <div className="curso-icon-lg">{curso.imagen}</div>
                                    <div className="curso-info">
                                        <h4>{curso.nombre}</h4>
                                        <p className="curso-categoria">{curso.categoria}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="empty-message">No tienes cursos en progreso</p>
                    )}
                </div>

                {/* LOGROS */}
                <div className="divan-section-card">
                    <h2 className="divan-section-title">🏆 Logros Desbloqueados</h2>
                    <div className="logros-grid">
                        {LOGROS.map(logro => {
                            const desbloqueado = logro.condicion();
                            return (
                                <div
                                    key={logro.id}
                                    className={`logro-card ${desbloqueado ? 'unlocked' : 'locked'}`}
                                >
                                    <div className={`logro-icon ${!desbloqueado ? 'grayscale' : ''}`}>
                                        {logro.icono}
                                    </div>
                                    <div className="logro-name">{logro.nombre}</div>
                                    <div className="logro-desc">{logro.descripcion}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
