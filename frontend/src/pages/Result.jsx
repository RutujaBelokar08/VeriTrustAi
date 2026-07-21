import { motion } from 'framer-motion';
import { CheckCircle2, DownloadCloud, ShieldCheck } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const reportData = [
  { name: 'Verified', value: 55 },
  { name: 'Review', value: 25 },
  { name: 'Alert', value: 20 },
];

const scoreTrend = [
  { month: 'Jan', value: 78 },
  { month: 'Feb', value: 82 },
  { month: 'Mar', value: 87 },
  { month: 'Apr', value: 90 },
  { month: 'May', value: 93 },
  { month: 'Jun', value: 95 },
];

export default function Result() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="relative z-10 space-y-8">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">Verification dashboard</p>
              <h1 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">NGO trust score and credibility insights</h1>
              <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">Premium report with interactive charts, trust indicators, and recommendation summary for funder-ready transparency.</p>
            </div>
            <button className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(37,99,235,0.25)] transition hover:scale-[1.01]">
              <DownloadCloud className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_0.85fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">Dashboard score</p>
                <h2 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">86%</h2>
                <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-400">This organization demonstrates strong credibility, transparency, and low risk for donation decisions.</p>
              </div>
              <div className="relative h-56 w-56">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-transparent to-violet-500/10 blur-3xl" />
                <div className="relative flex h-full w-full items-center justify-center rounded-full border border-slate-200 bg-white/80 dark:border-white/10 dark:bg-slate-950/80">
                  <div className="flex h-40 w-40 items-center justify-center rounded-full bg-slate-50 text-center shadow-inner dark:bg-slate-900">
                    <div>
                      <p className="text-5xl font-semibold text-slate-900 dark:text-white">86%</p>
                      <p className="mt-2 text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Trust score</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Risk', value: 'Low', tone: 'text-emerald-600 dark:text-emerald-300' },
                { label: 'Transparency', value: '93%', tone: 'text-blue-600 dark:text-blue-300' },
                { label: 'Status', value: 'Verified', tone: 'text-emerald-600 dark:text-emerald-300' },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4 text-sm dark:border-white/10 dark:bg-slate-950/70">
                  <p className="text-slate-500 dark:text-slate-400">{item.label}</p>
                  <p className={`mt-2 text-xl font-semibold ${item.tone}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-300">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">Trust overview</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Verified by VeriTrust AI</h2>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-950/70">
                <p className="text-sm text-slate-500 dark:text-slate-400">AI Explanation</p>
                <p className="mt-3 text-slate-700 dark:text-slate-200">The organization’s funding history, registration status, and public campaign data align with high credibility patterns.</p>
              </div>
              <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-950/70">
                <p className="text-sm text-slate-500 dark:text-slate-400">Recommendation</p>
                <p className="mt-3 text-slate-700 dark:text-slate-200">Proceed with donation while monitoring campaign updates and requesting additional transparency on fund allocation.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">Trust breakdown</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Credibility distribution</h2>
              </div>
              <div className="rounded-full bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-950/70 dark:text-slate-300">Live analytics</div>
            </div>
            <div className="mt-8 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={reportData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                    {reportData.map((entry, index) => <Cell key={`cell-${index}`} fill={['#22c55e', '#0ea5e9', '#f59e0b'][index]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">Credibility timeline</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Score over time</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-950/70 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Verified
              </div>
            </div>
            <div className="mt-8 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scoreTrend} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#94a3b8" />
                  <YAxis tickLine={false} axisLine={false} stroke="#94a3b8" domain={[65, 100]} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }} />
                  <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={4} dot={{ fill: '#22c55e' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
