export default function RiskBadge({ label }) {
  return (
    <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
      {label}
    </span>
  );
}
