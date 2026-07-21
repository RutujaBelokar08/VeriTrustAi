import { Moon, SunMedium } from 'lucide-react';

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${isDark ? 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10' : 'border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-100'}`}
    >
      {isDark ? <Moon className="h-4 w-4" /> : <SunMedium className="h-4 w-4 text-amber-500" />}
      <span>{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
}
