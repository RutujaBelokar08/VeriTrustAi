export default function TransparencyMeter({ value = 0 }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>Transparency</span>
        <span className="font-semibold text-white">{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/5">
        <div className="h-full rounded-full bg-emerald-400 transition-all duration-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
