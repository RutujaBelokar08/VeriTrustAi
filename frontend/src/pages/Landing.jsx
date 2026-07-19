import { ArrowRight, FileText, Globe2, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.18),_transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_16%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative z-10">
            <motion.span initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex rounded-full border border-emerald-400/25 bg-emerald-500/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.35em] text-emerald-300">
              Trusted AI verification for NGOs
            </motion.span>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="mt-8 max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              AI-Powered NGO & Donation Verification
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Verify charities, NGOs and fundraising campaigns before donating using AI-powered credibility analysis.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-10 flex flex-wrap items-center gap-4">
              <a href="/dashboard" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:scale-[1.01]">
                Verify Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href="/history" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-400/40 hover:bg-white/10">
                View History
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-12 grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, label: 'Verified trust score' },
                { icon: Globe2, label: 'Global NGO intelligence' },
                { icon: Sparkles, label: 'Automated credibility checks' },
                { icon: FileText, label: 'PDF-ready reports' },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-950/70 px-5 py-4 text-sm text-slate-300 shadow-xl shadow-black/20 transition hover:border-emerald-400/30 hover:bg-slate-900/80">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p>{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75 }} className="relative z-10 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/95 p-8 shadow-glow">
            <div className="absolute -left-10 top-10 h-28 w-28 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="absolute right-8 top-28 h-24 w-24 rounded-full bg-white/10 blur-3xl" />
            <div className="flex h-full flex-col justify-between gap-6 rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 backdrop-blur-xl">
              <div className="rounded-[1.75rem] bg-slate-900/70 p-8 shadow-2xl shadow-emerald-900/20">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-3xl bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">Live AI Insights</span>
                  <span className="rounded-2xl bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">Beta</span>
                </div>
                <div className="mt-8 flex items-center justify-between gap-6">
                  <div>
                    <p className="text-3xl font-semibold text-white">86%</p>
                    <p className="mt-2 text-sm text-slate-400">Average trust score across verified NGOs</p>
                  </div>
                  <div className="grid gap-2 rounded-3xl bg-slate-950/80 px-4 py-3 text-sm text-slate-300 shadow-inner">
                    <span className="text-emerald-300">+19% this month</span>
                    <span>7 critical alerts</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">AI defender ready</p>
                    <p>Secure your donation decisions with instant credibility analysis.</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/5 p-4 text-sm text-slate-300">Fundraising campaigns</div>
                  <div className="rounded-3xl bg-white/5 p-4 text-sm text-slate-300">Global NGO coverage</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
