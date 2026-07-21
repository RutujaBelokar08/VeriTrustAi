import { ArrowRight, Bot, CheckCircle2, Compass, FileText, Globe2, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const highlights = [
  { icon: ShieldCheck, title: 'Trust score', detail: 'AI credibility scoring in seconds' },
  { icon: Globe2, title: 'Global oversight', detail: 'Cross-checks organizations worldwide' },
  { icon: Sparkles, title: 'Instant reports', detail: 'Executive-ready summaries and evidence' },
  { icon: FileText, title: 'PDF-ready', detail: 'Shareable analysis for teams' },
];

const stats = [
  { label: 'Verified NGOs', value: '12k+' },
  { label: 'Fraud flags', value: '3.4k' },
  { label: 'Avg. trust', value: '92%' },
];

export default function Landing() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="relative mx-auto flex max-w-7xl flex-col gap-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-600 shadow-sm dark:border-blue-400/20 dark:text-blue-300">
              <Bot className="h-4 w-4" />
              Trusted AI verification for NGOs
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className="mt-7 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl dark:text-white">
              Verify before you donate with premium AI intelligence.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              VeriTrust AI helps teams and donors inspect charities, NGOs, and campaigns with a polished trust workflow built for modern impact organizations.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/login" state={{ from: { pathname: '/dashboard' } }} className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(37,99,235,0.3)] transition hover:scale-[1.02]">
                Verify Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/history" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-400/40 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
                View History
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-8 flex flex-wrap gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-sm shadow-sm dark:border-white/10 dark:bg-slate-900/60">
                  <span className="font-semibold text-slate-900 dark:text-white">{stat.value}</span>
                  <span className="ml-2 text-slate-500 dark:text-slate-400">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/30 via-violet-500/20 to-emerald-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/70 p-5 shadow-[0_24px_120px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
              <div className="rounded-[1.75rem] border border-slate-200/70 bg-slate-50/80 p-6 dark:border-white/10 dark:bg-slate-950/70">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-300">
                    <ShieldCheck className="h-4 w-4" />
                    Live AI signals
                  </div>
                  <div className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-500 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-400">
                    Beta
                  </div>
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Trust score</p>
                      <p className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white">94</p>
                    </div>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-lg font-semibold text-white">
                      A+
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/80">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        Registration found
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/80">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Compass className="h-4 w-4 text-blue-500" />
                        Website active
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {highlights.map((item) => (
                    <div key={item.title} className="rounded-[1.25rem] border border-slate-200 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-slate-900/70">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <p className="mt-3 font-semibold text-slate-900 dark:text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-300">Why teams choose VeriTrust</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Built like a premium AI product, not a prototype.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {['Modern verification flow', 'Secure and intuitive UI', 'Beautiful report exports'].map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
