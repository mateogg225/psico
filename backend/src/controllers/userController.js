import User from '../models/User.js';

// @desc    Obtener datos del usuario
// @route   GET /user/profile
// @access  Private
export const getProfile = async (req, res) => {
    res.json(req.user);
};

// @desc    Sumar puntos y diamantes
// @route   POST /user/sumar
// @access  Private
export const sumarStats = async (req, res) => {
    const { puntos, diamantes } = req.body;

    const user = await User.findById(req.user.id);

    if (user) {
        user.puntos += puntos || 0;
        user.diamantes += diamantes || 0;

        const updatedUser = await user.save();

        res.json({
            puntos: updatedUser.puntos,
            diamantes: updatedUser.diamantes,
            message: 'Estadísticas actualizadas'
        });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

// @desc    Inscribirse a un curso
// @route   POST /user/enroll
// @access  Private
export const enrollCourse = async (req, res) => {
    const { cursoId, titulo } = req.body;

    const user = await User.findById(req.user.id);

    if (user) {
        // Verificar si ya está inscrito
        const yaInscrito = user.cursos.find(c => c.cursoId === cursoId);

        if (yaInscrito) {
            return res.status(400).json({ message: 'Ya estás inscrito en este curso' });
        }

        // Agregar curso
        user.cursos.push({
            cursoId,
            titulo,
            progreso: 0,
            completado: false
        });

        await user.save();

        res.json({
            message: 'Inscrito exitosamente',
            cursos: user.cursos
        });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};
