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
    <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="space-y-8">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">History</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">Verification activity and audit trail</h1>
              <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">Search, filter, and manage your organization verification records with high-fidelity insights.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-300">
              <Filter className="h-4 w-4 text-blue-600 dark:text-blue-300" />
              Status: {filter}
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_0.4fr]">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search campaigns or NGOs" className="w-full rounded-full border border-slate-200 bg-slate-50 px-12 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white" />
              </div>
              <div className="flex flex-wrap gap-3">
                {['All', 'Verified', 'Review', 'Watch', 'Alert'].map((option) => (
                  <button key={option} type="button" onClick={() => { setFilter(option); setPage(1); }} className={`rounded-full px-4 py-2 text-sm transition ${filter === option ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-950/70 dark:text-slate-300 dark:hover:bg-slate-800'}`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50/80 dark:border-white/10 dark:bg-slate-950/70">
              <table className="w-full border-separate border-spacing-0 text-left text-sm">
                <thead>
                  <tr className="bg-white/80 text-slate-500 dark:bg-slate-900/80 dark:text-slate-400">
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
                      <td colSpan={5} className="px-6 py-10 text-center text-slate-500 dark:text-slate-400">No verification yet. Start a new analysis from the dashboard.</td>
                    </tr>
                  ) : (
                    paginated.map((row) => (
                      <tr key={row.title} className="border-t border-slate-200 transition hover:bg-white/80 dark:border-white/10 dark:hover:bg-slate-900/70">
                        <td className="px-6 py-5 text-slate-600 dark:text-slate-300">{row.date}</td>
                        <td className="px-6 py-5 text-slate-900 dark:text-white">{row.title}</td>
                        <td className="px-6 py-5 text-slate-600 dark:text-slate-300">{row.status}</td>
                        <td className="px-6 py-5 font-semibold text-emerald-600 dark:text-emerald-300">{row.score}</td>
                        <td className="px-6 py-5 text-slate-500 dark:text-slate-400">
                          <div className="flex flex-wrap items-center gap-2">
                            <button type="button" className="rounded-full bg-white px-3 py-2 text-xs text-slate-700 transition hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200"> <Eye className="mr-1 inline-block h-3.5 w-3.5" /> View </button>
                            <button type="button" className="rounded-full bg-white px-3 py-2 text-xs text-slate-700 transition hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200"> <Trash2 className="mr-1 inline-block h-3.5 w-3.5" /> Delete </button>
                            <button type="button" className="rounded-full bg-emerald-500/10 px-3 py-2 text-xs text-emerald-600 transition hover:bg-emerald-500/20 dark:text-emerald-300"> <Star className="inline-block h-3.5 w-3.5" /> </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">Showing {paginated.length} of {filtered.length} records</p>
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 dark:border-white/10 dark:bg-slate-950/70">
                <button type="button" onClick={() => setPage(Math.max(1, page - 1))} className="rounded-full p-2 text-slate-600 transition hover:bg-white dark:text-slate-300 dark:hover:bg-slate-900">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm text-slate-700 dark:text-slate-200">{page} / {pages}</span>
                <button type="button" onClick={() => setPage(Math.min(pages, page + 1))} className="rounded-full p-2 text-slate-600 transition hover:bg-white dark:text-slate-300 dark:hover:bg-slate-900">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">Recent bookmarks</p>
              <div className="mt-5 space-y-4">
                {historyRows.filter((row) => row.favorite).map((row) => (
                  <div key={row.title} className="rounded-[1.25rem] bg-slate-50 p-4 dark:bg-slate-950/70">
                    <p className="font-semibold text-slate-900 dark:text-white">{row.title}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Score: {row.score} — {row.status}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">System health</p>
              <div className="mt-5 grid gap-4">
                <div className="rounded-[1.25rem] bg-slate-50 p-4 dark:bg-slate-950/70">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-slate-600 dark:text-slate-300">API Status</p>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-600 dark:text-emerald-300">Online</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">All systems nominal. No incidents detected.</p>
                </div>
                <div className="rounded-[1.25rem] bg-slate-50 p-4 dark:bg-slate-950/70">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-slate-600 dark:text-slate-300">Notifications</p>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-300">3 new</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Trusted alerts keep you ahead of scam campaigns.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
