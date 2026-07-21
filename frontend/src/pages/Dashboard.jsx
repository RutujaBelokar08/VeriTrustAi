import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  Compass,
  FileCheck2,
  Globe2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UploadCloud,
  Zap,
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

const statCards = [
  { label: 'Verifications', value: '3.2k', icon: Sparkles, accent: 'from-blue-500 to-cyan-500' },
  { label: 'Avg trust', value: '92%', icon: ShieldCheck, accent: 'from-emerald-500 to-green-500' },
  { label: 'Alerts', value: '16', icon: Zap, accent: 'from-violet-500 to-fuchsia-500' },
  { label: 'Reports', value: '74', icon: FileCheck2, accent: 'from-amber-500 to-orange-500' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('website');
  const [stats, setStats] = useState([0, 0, 0, 0]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [query, setQuery] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

  const handleVerify = async () => {
    setVerifyError('');
    setVerificationResult(null);
    const value = query.trim();

    if (activeTab !== 'document' && !value) {
      setVerifyError('Please enter a website or campaign URL.');
      return;
    }

    if (activeTab === 'document' && !uploadedFile) {
      setVerifyError('Please upload a document before verifying.');
      return;
    }

    setIsVerifying(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const token = localStorage.getItem('accessToken') || '';
      const payload = activeTab === 'document' ? { type: 'document', value: uploadedFile } : { type: activeTab, value };

      const response = await fetch(`${apiUrl}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || 'Verification request failed.');
      }

      const data = await response.json();
      setVerificationResult(data);
    } catch (error) {
      setVerifyError(error.message);
    } finally {
      setIsVerifying(false);
    }
  };

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
    const lines = ['Checking government records...', 'Scanning website...', 'Analyzing documents...', 'Running AI credibility analysis...', 'Cross-checking sources...', 'Generating trust report...'];
    const interval = setInterval(() => {
      setTypingIndex((current) => (current + 1) % lines.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const activeContent = useMemo(() => {
    if (activeTab === 'website') return { title: 'Paste NGO URL', placeholder: 'https://example-ngo.org' };
    if (activeTab === 'campaign') return { title: 'Paste campaign URL', placeholder: 'https://donate.example.org/campaign' };
    return { title: 'Drop document or upload file', placeholder: '' };
  }, [activeTab]);

  const filteredVerifications = useMemo(() => recentVerifications.slice(0, 3), []);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="relative z-10 space-y-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">AI Trust Command Center</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                Premium verification workflows for modern donor teams.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                Review trust signals, inspect evidence, and lead with confidence using a polished AI-native experience.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-950/70">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                System health: stable and secure
              </div>
              <div className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">+92% trust</div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Trusted verifications across active campaigns.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {statCards.map((item, index) => (
              <motion.div key={item.label} whileHover={{ y: -4 }} className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-sm transition dark:border-white/10 dark:bg-slate-950/70">
                <div className={`inline-flex rounded-2xl bg-gradient-to-r ${item.accent} p-2.5 text-white`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-2xl font-semibold text-slate-900 dark:text-white">{index === 0 ? stats[0] : index === 1 ? `${stats[1]}%` : index === 2 ? stats[2] : stats[3]}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }} className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">Verification Flow</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Inspect charities, campaigns and documents with AI guidance.</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Trusted by leading nonprofits
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-1 dark:border-white/10 dark:bg-slate-950/70">
              <div className="grid grid-cols-3 gap-1 rounded-[1.2rem] bg-white/80 p-1 dark:bg-slate-900/80">
                {['website', 'campaign', 'document'].map((tab) => (
                  <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`rounded-[1rem] px-4 py-3 text-sm font-medium transition ${activeTab === tab ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}>
                    {tab === 'website' ? 'Website' : tab === 'campaign' ? 'Campaign' : 'Document'}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 dark:border-white/10 dark:bg-slate-950/70">
              {activeTab !== 'document' ? (
                <div className="space-y-4">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{activeContent.title}</label>
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={activeContent.placeholder} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 dark:border-white/10 dark:bg-slate-900 dark:text-white" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">AI parses web metadata, registration signals, and credibility context instantly.</p>
                </div>
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-blue-400/30 bg-blue-500/10 p-8 text-center">
                  <UploadCloud className="mx-auto h-10 w-10 text-blue-600 dark:text-blue-300" />
                  <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Upload supporting documents</p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">PDF, PNG, or JPG files supported.</p>
                  <label className="mt-6 inline-flex cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200">
                    Select file
                    <input type="file" className="hidden" onChange={(event) => setUploadedFile(event.target.files?.[0]?.name || null)} />
                  </label>
                  {uploadedFile && <p className="mt-4 text-sm text-blue-600 dark:text-blue-300">Uploaded: {uploadedFile}</p>}
                </div>
              )}

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button type="button" onClick={handleVerify} disabled={isVerifying} className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${isVerifying ? 'cursor-not-allowed bg-slate-400 text-white' : 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-[0_20px_60px_rgba(37,99,235,0.25)] hover:scale-[1.01]'}`}>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  {isVerifying ? 'Verifying...' : 'Verify Now'}
                </button>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Live analysis</p>
                  <p className="mt-1 font-medium text-slate-900 dark:text-white">{['Checking government records...', 'Scanning website...', 'Analyzing documents...', 'Running AI credibility analysis...', 'Cross-checking sources...', 'Generating trust report...'][typingIndex]}</p>
                </div>
              </div>

              {verifyError && <div className="mt-6 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-600 dark:text-rose-400">{verifyError}</div>}

              {verificationResult && (
                <div className={`mt-6 rounded-[1.5rem] border p-6 shadow-sm ${verificationResult.status === 'verified' ? 'border-emerald-500/20 bg-white dark:border-emerald-400/20 dark:bg-slate-900/80' : verificationResult.status === 'invalid' || verificationResult.status === 'unreachable' ? 'border-amber-500/20 bg-amber-500/10 dark:border-amber-400/20' : 'border-rose-500/20 bg-rose-500/10 dark:border-rose-400/20'}`}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Verification verdict</p>
                      <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{verificationResult.title}</h3>
                    </div>
                    {verificationResult.score !== null && (
                      <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-600 dark:text-emerald-300">Score {verificationResult.score}/100</div>
                    )}
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/70">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Trust score</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{verificationResult.score ?? 'N/A'}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/70">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Confidence</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{verificationResult.confidence}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/70">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Reviewed by</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{verificationResult.verified_by}</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>{verificationResult.summary}</p>
                    {verificationResult.reason && verificationResult.reason.length > 0 && (
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">Reason:</p>
                        <ul className="mt-2 list-inside list-disc space-y-2 pl-2">
                          {verificationResult.reason.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>

                  {verificationResult.status === 'verified' && (
                    <div className="mt-6 grid gap-5 lg:grid-cols-3">
                      <div className="rounded-[1.25rem] border border-emerald-500/20 bg-emerald-500/10 p-4">
                        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Positive Signals</p>
                        <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                          {verificationResult.positive_signals.map((item) => <li key={item}>• {item}</li>)}
                        </ul>
                      </div>
                      <div className="rounded-[1.25rem] border border-amber-500/20 bg-amber-500/10 p-4">
                        <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">Warnings</p>
                        <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                          {verificationResult.warnings.map((item) => <li key={item}>• {item}</li>)}
                        </ul>
                      </div>
                      <div className="rounded-[1.25rem] border border-slate-300 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/70">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Missing Information</p>
                        <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                          {verificationResult.missing_information.map((item) => <li key={item}>• {item}</li>)}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          <motion.aside initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }} className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-300">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">AI Assistant</p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Trust advisor</h2>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-[1.25rem] bg-slate-50 p-4 dark:bg-slate-950/70">
                  <p className="font-semibold text-slate-900 dark:text-white">Today's tip</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Cross-check registration, website activity, and financial transparency before any donation decision.</p>
                </div>
                <div className="rounded-[1.25rem] bg-slate-50 p-4 dark:bg-slate-950/70">
                  <p className="font-semibold text-slate-900 dark:text-white">Recent scam alerts</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    {scamAlerts.map((item) => (
                      <li key={item.title} className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-slate-900/70">
                        <p className="font-medium text-slate-900 dark:text-white">{item.title}</p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.category}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-300">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">Trust indicators</p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Signals that matter</h2>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Verified by VeriTrust AI', 'Global NGO coverage', '24/7 system health'].map((tag) => <span key={tag} className="rounded-full bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-950/70 dark:text-slate-300">{tag}</span>)}
              </div>
            </div>
          </motion.aside>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }} className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">Trust breakdown</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Verified network insights</h2>
              </div>
              <div className="rounded-full bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-950/70 dark:text-slate-300">Updated 3 min ago</div>
            </div>
            <div className="mt-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={trustBreakdown} dataKey="value" innerRadius={54} outerRadius={92} paddingAngle={4}>
                    {trustBreakdown.map((entry, index) => <Cell key={`cell-${index}`} fill={['#22c55e', '#10b981', '#38bdf8', '#f59e0b'][index % 4]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }} className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">Risk distribution</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Campaign integrity radar</h2>
            <div className="mt-6 h-80">
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

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.25 }} className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">Credibility timeline</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Trust trend</h2>
              </div>
              <div className="rounded-full bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-950/70 dark:text-slate-300">+4 pts since last month</div>
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
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">Recent verifications</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Recent campaigns</h2>
                </div>
                <div className="rounded-full bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-950/70 dark:text-slate-300">Live feed</div>
              </div>
              <div className="mt-6 space-y-3">
                {filteredVerifications.map((item) => (
                  <div key={item.name} className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4 transition hover:bg-white dark:border-white/10 dark:bg-slate-950/70">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-300">{item.score}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_120px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-300">Latest scam alerts</p>
              <div className="mt-5 space-y-3">
                {scamAlerts.map((item) => (
                  <div key={item.title} className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4 transition hover:bg-white dark:border-white/10 dark:bg-slate-950/70">
                    <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.category}</p>
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
