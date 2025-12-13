import { useNavigate } from 'react-router-dom';

export default function CourseCard({ curso, categoria }) {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navegar a las lecciones del curso
        navigate(`/course/${curso.id}`);
    };

    return (
        <div className="netflix-card">
            {/* Ícono 3D grande arriba a la izquierda */}
            <div className="netflix-card-icon">
                {curso.img}
            </div>

            {/* Título en negrita */}
            <h3 className="netflix-card-title">
                {curso.titulo}
            </h3>

            {/* Subtítulo gris más pequeño */}
            <p className="netflix-card-subtitle">
                {curso.subtitulo}
            </p>

            {/* Tag de categoría (azul claro) */}
            <div className="netflix-card-category-tag">
                {categoria}
            </div>

            {/* Badge Premium (si aplica) - justo antes del botón */}
            {curso.premium && (
                <div className="netflix-card-premium-badge">
                    <span className="premium-crown">👑</span>
                    <span>Premium</span>
                </div>
            )}

            {/* Botón azul ancho "Ver Lecciones" */}
            <button
                className="netflix-card-button"
                onClick={handleClick}
            >
                Ver Lecciones →
            </button>
        </div>
    );
}
