import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Filter, Search, Star, Trash2 } from 'lucide-react';

const historyRows = [
  { date: '2026-07-19', title: 'GreenFuture Fund', status: 'Verified', score: '91', favorite: true },
  { date: '2026-07-17', title: 'HelpNow Campaign', status: 'Review', score: '83', favorite: false },
  { date: '2026-07-15', title: 'AidConnect NGO', status: 'Watch', score: '74', favorite: false },
  { date: '2026-07-10', title: 'Charity Pulse', status: 'Verified', score: '88', favorite: true },
  { date: '2026-07-07', title: 'HopeBridge', status: 'Alert', score: '62', favorite: false },
];

export default function History() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const filtered = useMemo(() => {
    const lower = search.toLowerCase();
    return historyRows.filter((row) => {
      const matchesSearch = row.title.toLowerCase().includes(lower) || row.status.toLowerCase().includes(lower);
      const matchesFilter = filter === 'All' || row.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const pages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="absolute right-0 top-10 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="space-y-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-glow backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-400/80">History</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Verification activity and audit trail</h1>
              <p className="mt-4 max-w-2xl text-slate-400">Search, filter, and manage your organization verification records with high-fidelity insights.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
              <Filter className="h-4 w-4 text-emerald-300" />
              Status: {filter}
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_0.4fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search campaigns or NGOs"
                  className="w-full rounded-full border border-white/10 bg-slate-900/70 px-12 py-3 text-sm text-white outline-none transition focus:border-emerald-400/40"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                {['All', 'Verified', 'Review', 'Watch', 'Alert'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => { setFilter(option); setPage(1); }}
                    className={`rounded-full px-4 py-2 text-sm transition ${filter === option ? 'bg-emerald-500/15 text-emerald-300' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/70">
              <table className="w-full border-separate border-spacing-0 text-left text-sm">
                <thead>
                  <tr className="bg-slate-950/90 text-slate-400">
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Campaign</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Score</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                        No verification yet. Start a new analysis from the dashboard.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((row) => (
                      <tr key={row.title} className="border-t border-white/10 transition hover:bg-white/5">
                        <td className="px-6 py-5 text-slate-300">{row.date}</td>
                        <td className="px-6 py-5 text-white">{row.title}</td>
                        <td className="px-6 py-5 text-slate-400">{row.status}</td>
                        <td className="px-6 py-5 text-emerald-300">{row.score}</td>
                        <td className="px-6 py-5 text-slate-400">
                          <div className="flex items-center gap-3">
                            <button type="button" className="rounded-full bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10">
                              <Eye className="inline-block h-3.5 w-3.5" /> View
                            </button>
                            <button type="button" className="rounded-full bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10">
                              <Trash2 className="inline-block h-3.5 w-3.5" /> Delete
                            </button>
                            <button type="button" className="rounded-full bg-emerald-500/15 px-3 py-2 text-xs text-emerald-300 transition hover:bg-emerald-500/20">
                              <Star className="inline-block h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-400">Showing {paginated.length} of {filtered.length} records</p>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-900/70 px-3 py-2">
                <button type="button" onClick={() => setPage(Math.max(1, page - 1))} className="rounded-full p-2 text-slate-300 transition hover:bg-white/5">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm text-slate-200">{page} / {pages}</span>
                <button type="button" onClick={() => setPage(Math.min(pages, page + 1))} className="rounded-full p-2 text-slate-300 transition hover:bg-white/5">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-400/80">Recent bookmarks</p>
              <div className="mt-5 space-y-4">
                {historyRows.filter((row) => row.favorite).map((row) => (
                  <div key={row.title} className="rounded-3xl bg-slate-900/70 p-4">
                    <p className="font-semibold text-white">{row.title}</p>
                    <p className="mt-1 text-sm text-slate-400">Score: {row.score} — {row.status}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-400/80">System health</p>
              <div className="mt-5 grid gap-4">
                <div className="rounded-3xl bg-slate-900/70 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-slate-300">API Status</p>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">Online</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-400">All systems nominal. No incidents detected.</p>
                </div>
                <div className="rounded-3xl bg-slate-900/70 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-slate-300">Notifications</p>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">3 new</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-400">Trusted alerts keep you ahead of scam campaigns.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
