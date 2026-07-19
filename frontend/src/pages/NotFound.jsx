export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6 py-20">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">404</p>
        <h2 className="mt-2 text-3xl font-semibold">Page not found</h2>
        <p className="mt-4 text-slate-300">The route you requested does not exist.</p>
      </div>
    </section>
  );
}
