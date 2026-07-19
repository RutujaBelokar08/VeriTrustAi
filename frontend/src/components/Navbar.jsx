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

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white shadow-glow transition hover:border-emerald-400/40 hover:bg-white/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300 shadow-sm shadow-emerald-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-emerald-300">VeriTrust AI</p>
            <p className="text-xs text-slate-300">AI Trust Platform</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 text-sm text-slate-300 md:flex">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.to} className="rounded-2xl px-4 py-2 transition hover:bg-white/10 hover:text-white">
              {link.label}
            </Link>
          ))}
          <Link to="/settings" className="rounded-2xl px-4 py-2 transition hover:bg-white/10 hover:text-white">
            Settings
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-2 text-slate-300 shadow-glow md:flex">
            <LayoutDashboard className="h-4 w-4 text-emerald-300" />
            <span>System Health</span>
          </div>
          <ThemeToggle theme={theme} onToggle={onToggle} />
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => {
                onLogout();
                navigate('/login');
              }}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          ) : (
            <Link to="/login" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10">
              <UserCircle2 className="h-4 w-4" />
              {signInLabel}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
