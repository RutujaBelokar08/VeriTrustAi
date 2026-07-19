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
    <section className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="absolute left-6 top-10 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="relative z-10 space-y-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-glow backdrop-blur-xl">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-400/80">Verification dashboard</p>
              <h1 className="mt-4 text-4xl font-semibold text-white">NGO trust score and credibility insights</h1>
              <p className="mt-4 max-w-2xl text-slate-300">Premium report with interactive charts, trust indicators, and recommendation summary for funder-ready transparency.</p>
            </div>
            <button className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:scale-[1.01]">
              <DownloadCloud className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_0.8fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-glow backdrop-blur-xl">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-emerald-400/80">Dashboard score</p>
                <h2 className="mt-3 text-4xl font-semibold text-white">86%</h2>
                <p className="mt-3 max-w-xl text-slate-400">This organization demonstrates strong credibility, transparency, and low risk for donation decisions.</p>
              </div>
              <div className="relative h-56 w-56">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/20 via-transparent to-cyan-400/10 blur-3xl" />
                <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-slate-900/80">
                  <div className="flex h-40 w-40 items-center justify-center rounded-full bg-slate-950/95 text-center shadow-2xl shadow-emerald-900/20">
                    <div>
                      <p className="text-5xl font-semibold text-white">86%</p>
                      <p className="mt-2 text-sm uppercase tracking-[0.35em] text-slate-400">Trust score</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Risk', value: 'Low', tone: 'text-emerald-300' },
                { label: 'Transparency', value: '93%', tone: 'text-cyan-300' },
                { label: 'Status', value: 'Verified', tone: 'text-emerald-300' },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-900/70 px-5 py-4 text-sm">
                  <p className="text-slate-400">{item.label}</p>
                  <p className={`mt-2 text-xl font-semibold ${item.tone}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-glow backdrop-blur-xl">
            <div className="flex items-center gap-3 text-slate-300">
              <div className="rounded-3xl bg-emerald-500/10 p-3 text-emerald-300">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-emerald-400/80">Trust overview</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Verified by VeriTrust AI</h2>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">AI Explanation</p>
                <p className="mt-3 text-white">The organization’s funding history, registration status, and public campaign data align with high credibility patterns.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">Recommendation</p>
                <p className="mt-3 text-white">Proceed with donation while monitoring campaign updates and requesting additional transparency on fund allocation.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-glow backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-emerald-400/80">Trust breakdown</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Credibility distribution</h2>
              </div>
              <div className="rounded-3xl bg-slate-900/70 px-4 py-2 text-sm text-slate-300">Live analytics</div>
            </div>
            <div className="mt-8 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={reportData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}> 
                    {reportData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#22c55e', '#0ea5e9', '#f59e0b'][index]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-glow backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-emerald-400/80">Credibility timeline</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Score over time</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
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
