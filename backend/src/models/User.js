import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    usuario: {
        type: String,
        required: [true, 'Por favor agrega un nombre de usuario']
    },
    email: {
        type: String,
        required: [true, 'Por favor agrega un email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Por favor agrega un email válido'
        ]
    },
    password: {
        type: String,
        required: [true, 'Por favor agrega una contraseña']
    },
    edad: {
        type: Number,
        required: true
    },
    objetivo: {
        type: String,
        enum: ['Aprender', 'Hobby', 'Experto'],
        required: true
    },
    puntos: {
        type: Number,
        default: 0
    },
    diamantes: {
        type: Number,
        default: 0
    },
    cursos: [{
        cursoId: Number,
        titulo: String,
        progreso: { type: Number, default: 0 },
        completado: { type: Boolean, default: false }
    }]
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);
