import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="vista active">
            <section className="hero">
                <div className="container">
                    <div className="hero-emoji floating-animation">🏝️</div>
                    <h1 className="hero-title floating-animation-slow">Psico Isla</h1>
                    <p className="hero-subtitle">
                        La isla donde todos los amantes de la psicología nos encontramos
                    </p>
                    <button className="btn-primary" onClick={() => navigate('/courses')}>
                        🏝️ Comenzar la Aventura
                    </button>
                </div>
            </section>

            {/* Mentor Selection Grid - Choose Your Mentor */}
            <section className="mentor-selection" style={{ marginBottom: '3rem' }}>
                <div className="container">
                    <div className="mentor-header">
                        <h2 className="section-title text-center">🎓 Elige tu <span className="mentor-highlight">Mentor</span></h2>
                        <p className="section-subtitle text-center">
                            Aprende de los grandes maestros de la psicología
                        </p>
                    </div>

                    <div className="mentors-grid">
                        {/* Mentor 1: Sigmund Freud */}
                        <div
                            className="mentor-card"
                            onClick={() => navigate('/lesson/1')}
                        >
                            <div className="mentor-avatar-container">
                                <img
                                    src="/freud-avatar.png"
                                    alt="Sigmund Freud"
                                    className="mentor-avatar"
                                />
                            </div>
                            <div className="mentor-info">
                                <h3 className="mentor-name">Sigmund Freud</h3>
                                <p className="mentor-topic">Psicoanálisis</p>
                                <span className="mentor-badge">🧠 Fundador</span>
                            </div>
                        </div>

                        {/* Mentor 2: B.F. Skinner */}
                        <div
                            className="mentor-card"
                            onClick={() => navigate('/lesson/2')}
                        >
                            <div className="mentor-avatar-container">
                                <img
                                    src="/skinner-avatar.png"
                                    alt="B.F. Skinner"
                                    className="mentor-avatar"
                                />
                            </div>
                            <div className="mentor-info">
                                <h3 className="mentor-name">B.F. Skinner</h3>
                                <p className="mentor-topic">Conductismo</p>
                                <span className="mentor-badge">🔔 Condicionamiento</span>
                            </div>
                        </div>

                        {/* Mentor 3: Jacques Lacan */}
                        <div
                            className="mentor-card"
                            onClick={() => navigate('/lesson/3')}
                        >
                            <div className="mentor-avatar-container">
                                <img
                                    src="/lacan-avatar.png"
                                    alt="Jacques Lacan"
                                    className="mentor-avatar"
                                />
                            </div>
                            <div className="mentor-info">
                                <h3 className="mentor-name">Jacques Lacan</h3>
                                <p className="mentor-topic">El Inconsciente</p>
                                <span className="mentor-badge">💭 Lenguaje</span>
                            </div>
                        </div>

                        {/* Mentor 4: Jean Piaget */}
                        <div
                            className="mentor-card"
                            onClick={() => navigate('/lesson/4')}
                        >
                            <div className="mentor-avatar-container">
                                <img
                                    src="/piaget-avatar.png"
                                    alt="Jean Piaget"
                                    className="mentor-avatar"
                                />
                            </div>
                            <div className="mentor-info">
                                <h3 className="mentor-name">Jean Piaget</h3>
                                <p className="mentor-topic">Desarrollo Cognitivo</p>
                                <span className="mentor-badge">🧩 Etapas</span>
                            </div>
                        </div>

                        {/* Mentor 5: Melanie Klein */}
                        <div
                            className="mentor-card"
                            onClick={() => navigate('/lesson/5')}
                        >
                            <div className="mentor-avatar-container">
                                <img
                                    src="/klein-avatar.png"
                                    alt="Melanie Klein"
                                    className="mentor-avatar"
                                />
                            </div>
                            <div className="mentor-info">
                                <h3 className="mentor-name">Melanie Klein</h3>
                                <p className="mentor-topic">Psicoanálisis Infantil</p>
                                <span className="mentor-badge">🎨 Juego</span>
                            </div>
                        </div>

                        {/* Mentor 6: Anna Freud */}
                        <div
                            className="mentor-card"
                            onClick={() => navigate('/lesson/6')}
                        >
                            <div className="mentor-avatar-container">
                                <img
                                    src="/anna-avatar.png"
                                    alt="Anna Freud"
                                    className="mentor-avatar"
                                />
                            </div>
                            <div className="mentor-info">
                                <h3 className="mentor-name">Anna Freud</h3>
                                <p className="mentor-topic">Mecanismos de Defensa</p>
                                <span className="mentor-badge">🛡️ Protección</span>
                            </div>
                        </div>

                        {/* Mentor 7: Carl Jung */}
                        <div
                            className="mentor-card"
                            onClick={() => navigate('/lesson/7')}
                        >
                            <div className="mentor-avatar-container">
                                <img
                                    src="/jung-avatar.png"
                                    alt="Carl Jung"
                                    className="mentor-avatar"
                                />
                            </div>
                            <div className="mentor-info">
                                <h3 className="mentor-name">Carl Jung</h3>
                                <p className="mentor-topic">Psicología Analítica</p>
                                <span className="mentor-badge">🌙 Arquetipos</span>
                            </div>
                        </div>

                        {/* Mentor 8: Carl Rogers */}
                        <div
                            className="mentor-card"
                            onClick={() => navigate('/lesson/8')}
                        >
                            <div className="mentor-avatar-container">
                                <img
                                    src="/rogers-avatar.png"
                                    alt="Carl Rogers"
                                    className="mentor-avatar"
                                />
                            </div>
                            <div className="mentor-info">
                                <h3 className="mentor-name">Carl Rogers</h3>
                                <p className="mentor-topic">Humanismo</p>
                                <span className="mentor-badge">💚 Empatía</span>
                            </div>
                        </div>

                        {/* Mentor 9: John Bowlby */}
                        <div
                            className="mentor-card"
                            onClick={() => navigate('/lesson/9')}
                        >
                            <div className="mentor-avatar-container">
                                <img
                                    src="/bowlby-avatar.png"
                                    alt="John Bowlby"
                                    className="mentor-avatar"
                                />
                            </div>
                            <div className="mentor-info">
                                <h3 className="mentor-name">John Bowlby</h3>
                                <p className="mentor-topic">Teoría del Apego</p>
                                <span className="mentor-badge">🤱 Vínculos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="stats">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-number" id="stat-usuarios">1,234</div>
                            <div className="stat-label">Usuarios Aprendiendo</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number" id="stat-lecciones">48</div>
                            <div className="stat-label">Lecciones Disponibles</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">5 min</div>
                            <div className="stat-label">Por Lección</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
