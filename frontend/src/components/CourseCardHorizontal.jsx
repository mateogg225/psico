import { useNavigate } from 'react-router-dom';

export default function CourseCardHorizontal({ course }) {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navegar a la página de lecciones del curso
        navigate(`/course/${course.id}`);
    };

    return (
        <div className="course-card-horizontal" onClick={handleClick}>
            {/* Premium Badge */}
            {course.premium && (
                <div className="premium-badge-horizontal">
                    ⭐ Premium
                </div>
            )}

            {/* Course Icon */}
            <div className="course-icon-horizontal">
                {course.imagen}
            </div>

            {/* Course Title */}
            <h3 className="course-title-horizontal">
                {course.nombre}
            </h3>

            {/* Course Description */}
            <p className="course-description-horizontal">
                {course.descripcion}
            </p>

            {/* Course Category Tag */}
            <div className="course-category-tag">
                {course.categoria}
            </div>

            {/* Action Button */}
            <button
                className="course-button-horizontal"
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                }}
            >
                Ver Lecciones →
            </button>
        </div>
    );
}
