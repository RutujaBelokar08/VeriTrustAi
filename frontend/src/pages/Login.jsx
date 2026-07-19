import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';

const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Login failed');
      }

      const data = await response.json();
      onLogin(data.access_token, data.role);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-slate-950 px-6 py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.12),_transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_18%)]" />
      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900/90 p-10 shadow-glow backdrop-blur-xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-300">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/80">Sign in</p>
            <h1 className="text-3xl font-semibold">Admin or user access</h1>
          </div>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Username</label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/40"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/40"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button className="w-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
}
