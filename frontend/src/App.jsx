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
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    root.style.colorScheme = theme;
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
    <div className={`relative min-h-screen overflow-x-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.16),_transparent_24%),radial-gradient(circle_at_80%_10%,_rgba(124,58,237,0.16),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.16),_transparent_28%)] ${theme === 'dark' ? 'opacity-100' : 'opacity-80'}`} />
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,transparent_100%)]' : 'bg-[linear-gradient(135deg,rgba(15,23,42,0.03)_0%,transparent_100%)]'}`} />
      </div>

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
