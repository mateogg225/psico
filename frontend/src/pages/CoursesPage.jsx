import { useNavigate } from 'react-router-dom';
import { cursos } from '../data/data';

export default function CoursesPage() {
    const navigate = useNavigate();
    // Group courses by category
    const categories = [...new Set(cursos.map(c => c.categoria))];

    return (
        <div className="vista active">
            <div className="container">
                <h1 className="page-title">📚 Biblioteca de Cursos</h1>
                <p className="page-subtitle">Explorá nuestros microcursos organizados por categoría</p>

                <div id="categorias-cursos">
                    {categories.map(cat => (
                        <div key={cat} className="categoria-seccion">
                            <h2>{cat}</h2>
                            <div className="courses-grid">
                                {cursos.filter(c => c.categoria === cat).map(curso => (
                                    <div key={curso.id} className="course-card" onClick={() => navigate(`/course/${curso.id}`)}>
                                        <div className="course-icon">{curso.imagen}</div>
                                        <h3 className="course-name">{curso.nombre}</h3>
                                        <p className="course-description">{curso.descripcion}</p>
                                        {curso.premium && <span className="course-badge">👑 Premium</span>}
                                        <button className="btn-primary">Ver Lecciones</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
