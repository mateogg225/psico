import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AvatarPage from './pages/AvatarPage';
import CoursesPage from './pages/CoursesPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* We only show Navbar if we are not in login/register, or maybe always? 
            Legacy had it always visible except maybe specific full screens. 
            For now, let's keep it always visible as per 'game-topbar' in index.html */}
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/avatar" element={<AvatarPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
