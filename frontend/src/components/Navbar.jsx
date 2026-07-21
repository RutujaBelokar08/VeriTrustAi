import { Link, useNavigate } from 'react-router-dom';
import { Bell, LayoutDashboard, LogOut, Sparkles, UserCircle2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'History', to: '/history' },
  { label: 'Reports', to: '/result' },
];

export default function Navbar({ theme, onToggle, isAuthenticated, onLogout, role }) {
  const navigate = useNavigate();
  const signInLabel = role === 'admin' ? 'Admin Console' : role === 'user' ? 'User Portal' : 'Sign In';
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-20 border-b backdrop-blur-2xl ${isDark ? 'border-white/10 bg-slate-950/70' : 'border-slate-200/80 bg-white/70'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to={isAuthenticated ? '/dashboard' : '/'} className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 transition ${isDark ? 'border-white/10 bg-white/5 hover:border-blue-400/40 hover:bg-white/10' : 'border-slate-200 bg-white/80 hover:border-blue-400/40 hover:bg-slate-50'}`}>
          <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${isDark ? 'bg-blue-500/10 text-blue-300' : 'bg-blue-600/10 text-blue-600'}`}>
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className={`text-sm font-semibold tracking-tight ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>VeriTrust AI</p>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>AI Trust Platform</p>
          </div>
        </Link>

        <nav className={`hidden items-center gap-2 rounded-full border px-2 py-2 text-sm md:flex ${isDark ? 'border-white/10 bg-white/5 text-slate-300' : 'border-slate-200 bg-white/80 text-slate-600'}`}>
          {navLinks.map((link) => (
            <Link key={link.label} to={link.to} className={`rounded-full px-3 py-2 transition ${isDark ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-slate-100 hover:text-slate-900'}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className={`hidden items-center gap-2 rounded-full border px-3 py-2 text-sm md:flex ${isDark ? 'border-white/10 bg-white/5 text-slate-300' : 'border-slate-200 bg-white/80 text-slate-600'}`}>
            <LayoutDashboard className={`h-4 w-4 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
            <span>System Health</span>
          </div>
          <button type="button" className={`hidden rounded-full p-2.5 transition md:inline-flex ${isDark ? 'bg-white/5 text-slate-200 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            <Bell className="h-4 w-4" />
          </button>
          <ThemeToggle theme={theme} onToggle={onToggle} />
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => {
                onLogout();
                navigate('/login');
              }}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${isDark ? 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10' : 'border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-100'}`}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          ) : (
            <Link to="/login" className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${isDark ? 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10' : 'border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-100'}`}>
              <UserCircle2 className="h-4 w-4" />
              {signInLabel}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
