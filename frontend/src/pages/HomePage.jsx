import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cursos } from '../data/data';

export default function HomePage() {
    const navigate = useNavigate();
    const [randomTopic, setRandomTopic] = useState(null);
    const [popularCourses, setPopularCourses] = useState([]);

    useEffect(() => {
        // Load random topic
        if (cursos.length > 0) {
            const randomCourse = cursos[Math.floor(Math.random() * cursos.length)];
            if (randomCourse && randomCourse.lecciones.length > 0) {
                setRandomTopic(randomCourse.lecciones[0]);
            }

            // Load popular courses (first 3 for now)
            setPopularCourses(cursos.slice(0, 3));
        }
    }, []);

    return (
        <div className="vista active">
            <section className="hero">
                <div className="container">
                    <h1 className="hero-title">🧠 Psicología en 5 Minutos</h1>
                    <p className="hero-subtitle">
                        Microcursos diseñados para que entiendas conceptos fundamentales de forma rápida y clara
                    </p>
                    <button className="btn-primary" onClick={() => navigate('/courses')}>
                        Explorar Cursos
                    </button>
                </div>
            </section>

            {/* Random Topic */}
            <section className="random-topic">
                <div className="container">
                    <h2>⏱️ Aprendé en 5 minutos sobre...</h2>
                    <div id="tema-aleatorio" className="topic-card">
                        {randomTopic && (
                            <div className="course-card" onClick={() => navigate('/courses')}>
                                <h3>{randomTopic.titulo}</h3>
                                <p>{randomTopic.contenido.substring(0, 150)}...</p>
                                <button className="btn-primary">Aprender Ahora</button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Popular Courses */}
            <section className="popular-courses">
                <div className="container">
                    <h2 className="section-title">📚 Microcursos Populares</h2>
                    <div id="cursos-populares" className="courses-grid">
                        {popularCourses.map(curso => (
                            <div key={curso.id} className="course-card" onClick={() => navigate(`/courses`)}>
                                <div className="course-icon">{curso.imagen}</div>
                                <h3 className="course-name">{curso.nombre}</h3>
                                <p className="course-description">{curso.descripcion}</p>
                                {curso.premium && <span className="course-badge">👑 Premium</span>}
                            </div>
                        ))}
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
