import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Result from './pages/Result';
import History from './pages/History';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [token, setToken] = useState(localStorage.getItem('accessToken') || '');
  const [role, setRole] = useState(localStorage.getItem('userRole') || '');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const handleLogin = (accessToken, userRole) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userRole', userRole);
    setToken(accessToken);
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    setToken('');
    setRole('');
  };

  return (
    <div className="relative min-h-screen overflow-hidden transition-colors duration-700">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.14),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.16),_transparent_25%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.06),_transparent_35%)]" />
      <Navbar theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} isAuthenticated={Boolean(token)} onLogout={handleLogout} role={role} />

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={Boolean(token)}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute isAuthenticated={Boolean(token)}>
                <Result />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute isAuthenticated={Boolean(token)}>
                <History />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
