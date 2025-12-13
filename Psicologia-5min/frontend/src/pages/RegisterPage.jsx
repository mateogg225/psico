import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Link,
    InputAdornment,
    IconButton,
    MenuItem
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Email,
    Lock,
    Person,
    CalendarToday,
    Flag
} from '@mui/icons-material';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        usuario: '',
        email: '',
        edad: '',
        objetivo: 'Aprender',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                alert('Registro exitoso');
                navigate('/dashboard');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Error al conectar con el servidor');
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const objetivos = [
        { value: 'Aprender', label: 'Aprender' },
        { value: 'Hobby', label: 'Hobby' },
        { value: 'Experto', label: 'Experto' },
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5',
                py: 4
            }}
        >
            <Container maxWidth="xs">
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                    <Typography component="h1" variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333', mb: 3 }}>
                        Crear Cuenta
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        {/* Usuario */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="usuario"
                            label="Usuario"
                            name="usuario"
                            autoFocus
                            value={formData.usuario}
                            onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Email */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Edad & Objetivo Row */}
                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="edad"
                                label="Edad"
                                name="edad"
                                type="number"
                                value={formData.edad}
                                onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CalendarToday color="action" fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                select
                                margin="normal"
                                required
                                fullWidth
                                id="objetivo"
                                label="Objetivo"
                                name="objetivo"
                                value={formData.objetivo}
                                onChange={(e) => setFormData({ ...formData, objetivo: e.target.value })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Flag color="action" fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                            >
                                {objetivos.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>

                        {/* Password */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 3 }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                mt: 1,
                                mb: 2,
                                py: 1.5,
                                fontWeight: 'bold',
                                textTransform: 'none',
                                fontSize: '1.1rem'
                            }}
                        >
                            Registrarse
                        </Button>

                        <Box textAlign="center" sx={{ mt: 2 }}>
                            <Link component={RouterLink} to="/login" variant="body2" sx={{ textDecoration: 'none', fontWeight: 500 }}>
                                {"¿Ya tienes cuenta? Inicia sesión"}
                            </Link>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}
