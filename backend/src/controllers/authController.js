import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Generar JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

// @desc    Registrar nuevo usuario
// @route   POST /auth/register
// @access  Public
export const registerUser = async (req, res) => {
    const { usuario, email, password, edad, objetivo } = req.body;

    if (!usuario || !email || !password || !edad || !objetivo) {
        return res.status(400).json({ message: 'Por favor completa todos los campos' });
    }

    // Verificar si usuario existe
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const user = await User.create({
        usuario,
        email,
        password: hashedPassword,
        edad,
        objetivo
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            usuario: user.usuario,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
};

// @desc    Autenticar usuario
// @route   POST /auth/login
// @access  Public
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Verificar email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            usuario: user.usuario,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Credenciales inválidas' });
    }
};
