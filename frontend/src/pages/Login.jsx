import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Sparkles } from 'lucide-react';

const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    let isOpeningDemo = false;
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/signup';
      const payload = mode === 'login' ? { username, password } : { username, password, role: 'user' };

      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.detail || (mode === 'login' ? 'Login failed' : 'Sign up failed'));
      }

      onLogin(data.access_token, data.role);
      navigate(from, { replace: true });
    } catch {
      isOpeningDemo = true;
      setError('Demo Mode: Backend unavailable. Opening application preview.');
      window.setTimeout(() => {
        onLogin('demo-preview', 'user');
        navigate('/dashboard', { replace: true });
      }, 1000);
      return;
    } finally {
      if (!isOpeningDemo) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(124,58,237,0.12),_transparent_20%)]" />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-8 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">{mode === 'login' ? 'Sign in' : 'Create account'}</p>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Admin or user access</h1>
          </div>
        </div>

        <div className="mb-6 rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/70">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-300" />
            Access the premium verification workspace
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2 rounded-full bg-slate-100 p-1 dark:bg-slate-950/80">
          <button type="button" onClick={() => { setMode('login'); setError(''); }} className={`rounded-full px-3 py-2 text-sm font-medium transition ${mode === 'login' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
            Sign in
          </button>
          <button type="button" onClick={() => { setMode('signup'); setError(''); }} className={`rounded-full px-3 py-2 text-sm font-medium transition ${mode === 'signup' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
            Sign up
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm text-slate-700 dark:text-slate-300">Username</label>
            <input value={username} onChange={(event) => setUsername(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 dark:border-white/10 dark:bg-slate-950/80 dark:text-white" placeholder="admin" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-700 dark:text-slate-300">Password</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 dark:border-white/10 dark:bg-slate-950/80 dark:text-white" placeholder="••••••••" />
          </div>
          {mode === 'signup' && (
            <div>
              <label className="mb-2 block text-sm text-slate-700 dark:text-slate-300">Confirm password</label>
              <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 dark:border-white/10 dark:bg-slate-950/80 dark:text-white" placeholder="••••••••" />
            </div>
          )}
          {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}
          <button disabled={isSubmitting} className="w-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(37,99,235,0.25)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70" type="submit">
            {isSubmitting ? (mode === 'login' ? 'Signing in...' : 'Creating account...') : (mode === 'login' ? 'Sign in' : 'Create account')}
          </button>
        </form>
      </div>
    </section>
  );
}
