import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UploadCloud,
} from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from 'recharts';

const trustBreakdown = [
  { name: 'Verified', value: 42 },
  { name: 'Review', value: 28 },
  { name: 'Warning', value: 18 },
  { name: 'Suspicious', value: 12 },
];

const riskRadar = [
  { subject: 'Source', A: 88 },
  { subject: 'Claims', A: 75 },
  { subject: 'Transparency', A: 82 },
  { subject: 'Funding', A: 67 },
  { subject: 'Reputation', A: 94 },
];

const timeline = [
  { date: 'Jan', score: 78 },
  { date: 'Feb', score: 83 },
  { date: 'Mar', score: 86 },
  { date: 'Apr', score: 90 },
  { date: 'May', score: 88 },
  { date: 'Jun', score: 92 },
];

const recentVerifications = [
  { name: 'GreenFuture Fund', score: 91, status: 'Verified', date: '2026-07-19' },
  { name: 'HelpNow Campaign', score: 83, status: 'Review', date: '2026-07-17' },
  { name: 'AidConnect NGO', score: 74, status: 'Watch', date: '2026-07-15' },
];

const scamAlerts = [
  { title: 'False donation site flagged', category: 'Campaign spoofing' },
  { title: 'Impersonated NGO tax documents', category: 'Identity mismatch' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('website');
  const [stats, setStats] = useState([0, 0, 0, 0]);
  const [dragState, setDragState] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    const targets = [3285, 92, 16, 74];
    const interval = setInterval(() => {
      setStats((current) => current.map((value, index) => {
        const target = targets[index];
        if (value >= target) return target;
        return Math.min(target, value + Math.ceil(target / 25));
      }));
    }, 90);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const lines = ['Scanning...', 'Analyzing credibility...', 'Checking transparency...', 'Calling Gemini AI...', 'Generate report...'];
    const interval = setInterval(() => {
      setTypingIndex((current) => (current + 1) % lines.length);
    }, 2100);
    return () => clearInterval(interval);
  }, []);

  const activeContent = useMemo(() => {
    if (activeTab === 'website') {
      return {
        title: 'Paste NGO Website',
        placeholder: 'https://example-ngo.org',
      };
    }
    if (activeTab === 'campaign') {
      return {
        title: 'Paste campaign URL',
        placeholder: 'https://donate.example.org/campaign',
      };
    }
    return {
      title: 'Drop document or upload file',
      placeholder: '',
    };
  }, [activeTab]);

  const filteredVerifications = useMemo(() => recentVerifications.slice(0, 3), []);

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="relative z-10 space-y-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-glow backdrop-blur-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.4em] text-emerald-300/80">AI Trust Command Center</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Modern AI-powered cybersecurity trust platform for NGO verification.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Monitor donations, verify organizations, and uncover suspicious campaigns with a premium Glassmorphism dashboard experience.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:w-[420px]">
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/20">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Weekly health</p>
                <p className="mt-4 text-3xl font-semibold text-white">Secure</p>
                <p className="mt-2 text-sm text-slate-400">System uptime and verification throughput are stable.</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/20">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Trust signal</p>
                <p className="mt-4 text-3xl font-semibold text-emerald-300">+92%</p>
                <p className="mt-2 text-sm text-slate-400">Trusted verifications across active campaigns.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Total Verifications', value: stats[0], icon: Sparkles },
              { label: 'Average Trust Score', value: `${stats[1]}%`, icon: ShieldCheck },
              { label: 'Fraud Detected', value: stats[2], icon: BookOpen },
              { label: 'Saved Reports', value: stats[3], icon: BarChart3 },
            ].map((item) => (
              <motion.div key={item.label} whileHover={{ y: -4 }} className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20 transition">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-3xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-sm text-slate-400">{item.label}</p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-300">
                    <item.icon className="h-6 w-6" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[1.4fr_0.85fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }} className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-glow backdrop-blur-xl">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-emerald-400/70">Verification</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Verify charities, campaigns or documents</h2>
                <p className="mt-3 text-sm text-slate-400">Use advanced AI analysis to inspect NGO legitimacy and safeguard donation flows.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Trusted by leading nonprofits
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-1">
              <div className="grid grid-cols-3 gap-1 bg-slate-950/80 px-2 py-2 sm:grid-cols-3">
                {['website', 'campaign', 'document'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${activeTab === tab ? 'bg-emerald-400/15 text-emerald-200' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    {tab === 'website' ? 'Website' : tab === 'campaign' ? 'Campaign' : 'Document Upload'}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6">
              {activeTab !== 'document' ? (
                <div className="space-y-4">
                  <label className="text-sm font-medium text-slate-300">{activeContent.title}</label>
                  <input
                    type="text"
                    placeholder={activeContent.placeholder}
                    className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-4 text-sm text-white outline-none transition focus:border-emerald-400/40"
                  />
                  <p className="text-sm text-slate-500">Smart AI parsing automatically extracts organization metadata and campaign credibility signals.</p>
                </div>
              ) : (
                <div className="rounded-[1.75rem] border border-dashed border-emerald-400/30 bg-emerald-500/10 p-10 text-center transition duration-300 hover:border-emerald-300/60 hover:bg-emerald-500/15">
                  <UploadCloud className="mx-auto h-12 w-12 text-emerald-300" />
                  <p className="mt-6 text-lg font-semibold text-white">Drag & drop upload</p>
                  <p className="mt-2 text-sm text-slate-400">Supported formats: PDF, JPG, PNG</p>
                  <label className="mt-6 inline-flex cursor-pointer rounded-full bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    Select file
                    <input type="file" className="hidden" onChange={(event) => setUploadedFile(event.target.files?.[0]?.name || null)} />
                  </label>
                  {uploadedFile && <p className="mt-4 text-sm text-emerald-300">Uploaded: {uploadedFile}</p>}
                </div>
              )}

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 px-8 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Verify Now
                </button>
                <div className="rounded-3xl border border-white/10 bg-slate-900/70 px-5 py-4 text-sm text-slate-300 shadow-inner">
                  <p className="text-slate-400">Live analysis</p>
                  <p className="mt-2 font-medium text-white">{['Scanning...', 'Analyzing credibility...', 'Checking transparency...', 'Calling Gemini AI...', 'Generating report...'][typingIndex]}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.aside initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.15 }} className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-emerald-400/80">AI Assistant</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Trust Advisor</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-300">
                  <BookOpen className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm text-slate-300">
                <div className="rounded-3xl bg-slate-900/70 p-4">
                  <p className="font-semibold text-white">Today's tip</p>
                  <p className="mt-2 text-slate-400">Check website registration and charity certification before trusting fundraising campaigns.</p>
                </div>
                <div className="rounded-3xl bg-slate-900/70 p-4">
                  <p className="font-semibold text-white">Recent scams</p>
                  <ul className="mt-3 space-y-2 text-slate-400">
                    {scamAlerts.map((item) => (
                      <li key={item.title} className="rounded-2xl bg-white/5 p-3">
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.category}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="rounded-3xl bg-emerald-500/10 p-3 text-emerald-300">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Trust indicators</p>
                  <p className="text-sm text-slate-400">Real-time risk scoring, NGO validation, and campaign history.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4">
                {['Verified by VeriTrust AI', 'Global NGO coverage', '24/7 system health'].map((tag) => (
                  <span key={tag} className="inline-flex rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300">{tag}</span>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }} className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-emerald-400/80">Trust breakdown</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Verified network insights</h2>
              </div>
              <div className="rounded-3xl bg-slate-900/70 px-4 py-2 text-sm text-slate-300">Updated 3 min ago</div>
            </div>
            <div className="mt-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={trustBreakdown} dataKey="value" nameKey="name" innerRadius={52} outerRadius={90} paddingAngle={4}>
                    {trustBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#22c55e', '#10b981', '#38bdf8', '#f59e0b'][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-400/80">Risk distribution</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Campaign integrity radar</h2>
            <div className="mt-8 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={riskRadar} outerRadius="80%">
                  <PolarGrid stroke="rgba(148,163,184,0.2)" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Risk" dataKey="A" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.3 }} className="grid gap-6 xl:grid-cols-[1fr_0.65fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-emerald-400/80">Credibility timeline</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Trust trend</h2>
              </div>
              <div className="rounded-3xl bg-slate-900/70 px-4 py-2 text-sm text-slate-300">+4 pts since last month</div>
            </div>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeline} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} stroke="#94a3b8" />
                  <YAxis tickLine={false} axisLine={false} stroke="#94a3b8" domain={[60, 100]} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }} />
                  <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={4} dot={{ fill: '#22c55e' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-emerald-400/80">Recent verifications</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Recent campaigns</h2>
                </div>
                <div className="rounded-3xl bg-slate-900/70 px-4 py-2 text-sm text-slate-300">Live feed</div>
              </div>
              <div className="mt-6 space-y-3">
                {filteredVerifications.map((item) => (
                  <div key={item.name} className="rounded-3xl border border-white/10 bg-slate-900/70 p-4 transition hover:bg-white/5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="mt-1 text-sm text-slate-400">{item.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-semibold text-emerald-300">{item.score}</p>
                        <p className="text-sm text-slate-400">{item.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-400/80">Latest scam alerts</p>
              <div className="mt-5 space-y-3">
                {scamAlerts.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-4 transition hover:bg-white/5">
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
