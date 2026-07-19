import { Moon, SunMedium } from 'lucide-react';

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-200 transition hover:border-emerald-400/40 hover:bg-white/10"
    >
      {theme === 'dark' ? <Moon className="h-4 w-4" /> : <SunMedium className="h-4 w-4 text-amber-300" />}
      <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  );
}
