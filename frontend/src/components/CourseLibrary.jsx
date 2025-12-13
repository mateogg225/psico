import { categoriasCursos } from '../data/categoriasCursos';
import CategoryRow from '../components/CategoryRow';

export default function CourseLibrary() {
    return (
        <div className="vista active">
            <div className="netflix-library-container">
                {/* Header opcional */}
                <div className="netflix-library-header">
                    <h1>📚 Biblioteca de Cursos</h1>
                    <p>Explora nuestros microcursos organizados por categoría</p>
                </div>

                {/* Iterar sobre categorías y renderizar cada fila */}
                {categoriasCursos.map(categoria => (
                    <CategoryRow
                        key={categoria.id}
                        categoria={categoria}
                    />
                ))}
            </div>
        </div>
    );
}
