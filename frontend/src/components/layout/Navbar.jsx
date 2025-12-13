import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    Avatar,
    Menu,
    MenuItem,
    Tooltip,
    Badge
} from '@mui/material';
import {
    Menu as MenuIcon,
    Brightness4,
    Brightness7,
    LocalFireDepartment,
    Diamond
} from '@mui/icons-material';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { diamonds } = useGame();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [user] = useState(JSON.parse(localStorage.getItem('usuario')) || { nombre: 'Invitado' });
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [moonPhase, setMoonPhase] = useState(theme === 'light' ? '🌕' : '🌑');
    const [isAnimating, setIsAnimating] = useState(false);

    // Hide Navbar on Login and Register pages
    if (['/login', '/register'].includes(location.pathname)) {
        return null;
    }

    const toggleTheme = () => {
        if (isAnimating) return; // Prevent multiple clicks during animation

        setIsAnimating(true);
        const newTheme = theme === 'light' ? 'dark' : 'light';

        // Step 1: Show crescent moon (transition phase)
        setMoonPhase('🌓');

        // Step 2: After 200ms, show final moon phase and change theme
        setTimeout(() => {
            setMoonPhase(newTheme === 'light' ? '🌕' : '🌑');
            setTheme(newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            setIsAnimating(false);
        }, 200);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: '#e0e0e0', color: '#333', boxShadow: 1 }}>
            <Toolbar>
                {/* Logo Section */}
                <div
                    className="mr-4 hidden md:flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => navigate('/dashboard')}
                >
                    <span className="text-4xl">🏝️</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Psico Isla
                    </span>
                </div>

                {/* Mobile Menu Icon (Placeholder for responsiveness) */}
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>

                {/* Desktop Menu/Stats */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', gap: 3, alignItems: 'center' }}>
                    {/* Stats */}
                    <Tooltip title="Racha de días consecutivos">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LocalFireDepartment color="error" />
                            <Typography variant="subtitle1" fontWeight="bold">0</Typography>
                        </Box>
                    </Tooltip>

                    <Tooltip title="Diamantes - Clic para ir a la tienda">
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                cursor: 'pointer',
                                padding: '4px 8px',
                                borderRadius: '8px',
                                transition: 'background-color 0.2s',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 215, 0, 0.2)'
                                }
                            }}
                            onClick={() => navigate('/shop')}
                        >
                            <Diamond sx={{ color: '#FFD700' }} />
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#FFD700' }}>
                                {diamonds}
                            </Typography>
                        </Box>
                    </Tooltip>

                    {/* Navigation Buttons */}
                    <Button color="inherit" onClick={() => navigate('/dashboard')}>🚹🚺</Button>
                    <Button color="inherit" onClick={() => navigate('/courses')}>Cursos</Button>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/mentores')}
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                        🎓 Mentores
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/shop')}
                        sx={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                            color: '#000',
                            fontWeight: 'bold',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)'
                            }
                        }}
                    >
                        💎 Tienda
                    </Button>
                </Box>

                {/* Theme & Profile Actions */}
                <Box sx={{ flexGrow: 0, ml: 3, display: 'flex', gap: 1 }}>
                    <IconButton
                        onClick={toggleTheme}
                        color="inherit"
                        sx={{ fontSize: '1.75rem', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }}
                    >
                        {moonPhase}
                    </IconButton>

                    <Tooltip title="Abrir perfil">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt={user.nombre} sx={{ bgcolor: '#2196f3' }}>
                                {user.nombre[0]?.toUpperCase()}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/dashboard'); }}>
                            <Typography textAlign="center">Perfil</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => { handleCloseUserMenu(); alert('Logout placeholder'); }}>
                            <Typography textAlign="center">Cerrar Sesión</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
