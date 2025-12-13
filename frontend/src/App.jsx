import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AvatarEditorPage from './pages/AvatarEditorPage';
import CoursesPage from './pages/CoursesPage';
import CourseLibraryPage from './pages/CourseLibraryPage';
import ShopPage from './pages/ShopPage';
import LessonPlayer from './components/LessonPlayer';
import { GameProvider } from './context/GameContext';
import './index.css';

function App() {
  return (
    <GameProvider>
      <Router>
        {/* ==================== AURORA GRADIENT MESH BACKGROUND ==================== */}
        <div className="fixed inset-0 z-[-10] bg-slate-50 overflow-hidden">
          {/* Orbe 1 - Azul Profundo (Top Left) */}
          <div
            className="absolute top-0 -left-40 w-[600px] h-[600px] rounded-full mix-blend-multiply opacity-70 animate-blob"
            style={{
              background: 'radial-gradient(circle, #4c1d95 0%, #6366f1 100%)',
              filter: 'blur(130px)'
            }}
          ></div>

          {/* Orbe 2 - Violeta Vibrante (Bottom Right) */}
          <div
            className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full mix-blend-multiply opacity-60 animate-blob-2 delay-2"
            style={{
              background: 'radial-gradient(circle, #8b5cf6 0%, #c084fc 100%)',
              filter: 'blur(140px)'
            }}
          ></div>

          {/* Orbe 3 - Cian Suave (Center) */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full mix-blend-multiply opacity-50 animate-blob-3 delay-4"
            style={{
              background: 'radial-gradient(circle, #06b6d4 0%, #22d3ee 100%)',
              filter: 'blur(150px)'
            }}
          ></div>

          {/* Orbe 4 - Ámbar/Naranja (Top Right) */}
          <div
            className="absolute top-20 right-20 w-[550px] h-[550px] rounded-full mix-blend-multiply opacity-40 animate-blob-4 delay-6"
            style={{
              background: 'radial-gradient(circle, #f59e0b 0%, #fbbf24 100%)',
              filter: 'blur(120px)'
            }}
          ></div>
        </div>
        {/* ================================================================= */}

        <div className="app-container relative z-10">
          {/* We only show Navbar if we are not in login/register, or maybe always? 
              Legacy had it always visible except maybe specific full screens. 
              For now, let's keep it always visible as per 'game-topbar' in index.html */}
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/courses" element={<CourseLibraryPage />} />
            <Route path="/avatar" element={<AvatarEditorPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/lesson/:id" element={<LessonPlayer />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
