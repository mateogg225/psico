import CourseCard from './CourseCard';

export default function CategoryRow({ categoria }) {
    return (
        <div className="netflix-category-section">
            {/* Título de la categoría */}
            <h2 className="netflix-category-title">
                {categoria.titulo}
            </h2>

            {/* Contenedor con scroll horizontal + snap */}
            <div className="netflix-scroll-container">
                {categoria.cursos.map(curso => (
                    <CourseCard
                        key={curso.id}
                        curso={curso}
                        categoria={categoria.titulo}
                    />
                ))}
            </div>
        </div>
    );
}
