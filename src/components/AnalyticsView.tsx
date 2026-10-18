import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Eye,
  Award,
  BookOpen,
  Users,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  CheckCircle2,
  FileText,
  Clock,
  ChevronRight,
  Activity,
  Heart,
  Share2,
  Download,
  Filter
} from 'lucide-react';
import { DoctorProfile } from '../types';

interface AnalyticsViewProps {
  currentUser: DoctorProfile;
  onOpenNewCase?: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  currentUser,
  onOpenNewCase,
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [activeMetricTab, setActiveMetricTab] = useState<'cases' | 'ce' | 'reach' | 'concordance'>('cases');

  // Key stats
  const stats = [
    {
      id: 'reach',
      label: 'Peer Impressions',
      value: '48.2k',
      growth: '+18.4%',
      trend: 'up',
      subtitle: 'vs previous 30 days',
      icon: Eye,
      color: 'from-blue-600 to-indigo-600',
      badgeBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    },
    {
      id: 'cases',
      label: 'Cases Published',
      value: `${currentUser.casesPublished || 24}`,
      growth: '+4 this month',
      trend: 'up',
      subtitle: '94% peer concordance',
      icon: FileText,
      color: 'from-emerald-600 to-teal-600',
      badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    },
    {
      id: 'pearls',
      label: 'Pearls Cited',
      value: `${currentUser.pearlsCited || 142}`,
      growth: '+26 citations',
      trend: 'up',
      subtitle: 'by 89 verified ODs',
      icon: Award,
      color: 'from-purple-600 to-violet-600',
      badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    },
    {
      id: 'ce',
      label: 'COPE CE Hours',
      value: '24.5 / 30',
      growth: '82% Cycle Done',
      trend: 'neutral',
      subtitle: '2025-2027 renewal',
      icon: BookOpen,
      color: 'from-amber-500 to-orange-600',
      badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    },
  ];

  // Modality scan distribution data
  const modalityDistribution = [
    { name: 'Anterior Segment OCT (AS-OCT)', count: 38, percentage: 42, color: 'bg-blue-500' },
    { name: 'Corneal Topography & Elevation', count: 24, percentage: 27, color: 'bg-indigo-500' },
    { name: 'High-Mag Slit Lamp Fluoroscopy', count: 16, percentage: 18, color: 'bg-emerald-500' },
    { name: 'Posterior Pole / RNFL Scans', count: 8, percentage: 9, color: 'bg-amber-500' },
    { name: 'Meibography & Ocular Surface', count: 4, percentage: 4, color: 'bg-rose-500' },
  ];

  // Weekly activity bar chart data
  const activityData = [
    { week: 'W1 Aug', reads: 720, saves: 48, citations: 12 },
    { week: 'W2 Aug', reads: 940, saves: 64, citations: 18 },
    { week: 'W3 Aug', reads: 1120, saves: 82, citations: 24 },
    { week: 'W4 Aug', reads: 880, saves: 59, citations: 15 },
    { week: 'W1 Sep', reads: 1350, saves: 104, citations: 32 },
    { week: 'W2 Sep', reads: 1580, saves: 128, citations: 41 },
    { week: 'W3 Sep (Current)', reads: 1820, saves: 145, citations: 52 },
  ];

  const maxReads = Math.max(...activityData.map((d) => d.reads));

  // Top published clinical cases
  const topCases = [
    {
      id: 'c1',
      title: 'Bilateral Pellucid Marginal Degeneration Scleral Vault Resolution',
      modality: 'AS-OCT + Cornea',
      views: '4,280',
      bookmarks: '184',
      citations: '29',
      date: 'Sep 12, 2026',
      impactRating: 'Top 1% Case',
    },
    {
      id: 'c2',
      title: 'Neurotrophic Keratitis Stage 2 Managed with Autologous Serum & Prokera',
      modality: 'Slit Lamp Video',
      views: '3,410',
      bookmarks: '152',
      citations: '22',
      date: 'Aug 28, 2026',
      impactRating: 'Grand Rounds Highlight',
    },
    {
      id: 'c3',
      title: 'Normal-Tension Glaucoma with Asymmetric Disc Hemorrhage & RNFL Wedge Defect',
      modality: 'OCT RNFL + VF',
      views: '2,920',
      bookmarks: '118',
      citations: '17',
      date: 'Aug 14, 2026',
      impactRating: 'High Concordance',
    },
  ];

  // CE Credit Units Tracked
  const ceUnits = [
    {
      title: 'Advanced Scleral Lens Vault Alignment & Toric Haptic Management',
      provider: 'Global Scleral Society (GSS)',
      credits: '2.5 COPE Credits',
      status: 'Completed & Verified',
      date: 'Sep 18, 2026',
      accreditationId: 'COPE-94021-CL',
    },
    {
      title: 'OCT Angiography in Diabetic Macular Ischemia & Microvascular Changes',
      provider: 'Retinal Imaging Collaborative',
      credits: '2.0 COPE Credits',
      status: 'Completed & Verified',
      date: 'Aug 29, 2026',
      accreditationId: 'COPE-88412-NO',
    },
    {
      title: 'Modern Neuropathic Ocular Pain Protocols & Intense Pulsed Light (IPL)',
      provider: 'Dry Eye Think Tank',
      credits: '1.5 COPE Credits',
      status: 'Completed & Verified',
      date: 'Aug 10, 2026',
      accreditationId: 'COPE-76190-DE',
    },
  ];

  return (
    <div className="w-full space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Top Banner & Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-900 via-[#12121a] to-blue-950 p-6 sm:p-8 text-white border border-neutral-800/80 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-blue-400" />
                <span>Clinical Intelligence & Reach</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                OD Verified
              </span>
            </div>
            <h1 className="text-display-md font-black tracking-tight text-white">
              Clinical Impact & Growth Hub
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl font-normal leading-relaxed">
              Real-time analytics on your case peer reviews, diagnostic scan citations, COPE/CPD continuing education units, and specialty referral footprint.
            </p>
          </div>

          {/* Time Range Selector & Action */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-2xl p-1 border border-white/10 text-xs">
              {(['7d', '30d', '90d', 'all'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-3 py-1.5 rounded-xl font-bold uppercase text-[10px] transition-all cursor-pointer ${
                    timeRange === r
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {r === 'all' ? 'All Time' : r}
                </button>
              ))}
            </div>

            <button
              onClick={onOpenNewCase}
              className="px-4 py-2 rounded-2xl bg-white text-neutral-950 hover:bg-neutral-100 active:scale-97 font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5 text-blue-600" />
              <span>Publish Case</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.id}
              className="p-5 rounded-3xl bg-white dark:bg-[#121217] border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`h-10 w-10 rounded-2xl bg-gradient-to-tr ${st.color} text-white flex items-center justify-center shadow-md`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${st.badgeBg}`}>
                  {st.growth}
                </span>
              </div>
              <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                {st.label}
              </p>
              <p className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight mt-0.5">
                {st.value}
              </p>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-medium mt-1">
                {st.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      {/* Interactive Activity Chart & Modality Distribution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Activity Timeline */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#121217] border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800/80 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-500" />
                <span>Weekly Case Impressions & Peer Interactions</span>
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Verified eye-care practitioners engaging with your diagnostic cases
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-semibold text-neutral-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-600" /> Reads
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Saves
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-purple-500" /> Citations
              </span>
            </div>
          </div>

          {/* Bar Chart Representation */}
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 px-1 sm:px-3">
            {activityData.map((item, idx) => {
              const heightPercent = Math.round((item.reads / maxReads) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    {/* Reads Bar */}
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-blue-600 to-sky-400 group-hover:brightness-110 transition-all relative"
                    >
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap pointer-events-none transition-opacity z-20">
                        {item.reads} reads
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 truncate text-center w-full">
                    {item.week.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/50 flex items-center justify-between text-xs text-blue-900 dark:text-blue-200">
            <span className="flex items-center gap-2 font-medium">
              <Sparkles className="h-4 w-4 text-blue-500 shrink-0" />
              <span>Your case on <strong>Pellucid Marginal Degeneration</strong> is trending in #CorneaSclerals this week.</span>
            </span>
            <span className="font-mono font-bold shrink-0">+312 views</span>
          </div>
        </div>

        {/* Right 1 Col: Imaging Modality Vault Breakdown */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#121217] border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm space-y-5">
          <div className="border-b border-neutral-100 dark:border-neutral-800/80 pb-4">
            <h2 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-indigo-500" />
              <span>Diagnostic Modality Vault</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Distribution of your 90+ uploaded high-res scans
            </p>
          </div>

          <div className="space-y-3.5">
            {modalityDistribution.map((m, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-neutral-700 dark:text-neutral-300 truncate pr-2">
                    {m.name}
                  </span>
                  <span className="font-mono text-neutral-500 shrink-0">
                    {m.count} ({m.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  <div
                    style={{ width: `${m.percentage}%` }}
                    className={`h-full rounded-full ${m.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-[#181822] flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-neutral-900 dark:text-white">HIPAA De-identification</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> 100% Verified Compliant
                </p>
              </div>
              <span className="px-2 py-1 bg-neutral-200 dark:bg-neutral-700 rounded-lg text-[10px] font-mono font-bold">
                AES-256
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Top Cases + COPE CE Credit Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Published Cases */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#121217] border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 pb-4">
            <h2 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-500" />
              <span>Top Impact Clinical Publications</span>
            </h2>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
              Ranked by Citations
            </span>
          </div>

          <div className="space-y-3">
            {topCases.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-neutral-50/70 dark:bg-[#16161e] border border-neutral-200/60 dark:border-neutral-800 hover:border-blue-500/40 transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-white leading-snug">
                    {c.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-900/50 shrink-0">
                    {c.impactRating}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-500 dark:text-neutral-400 font-mono pt-1">
                  <span className="flex items-center gap-1 font-sans text-neutral-700 dark:text-neutral-300 font-semibold">
                    <Layers className="h-3 w-3 text-blue-500" /> {c.modality}
                  </span>
                  <span>•</span>
                  <span>{c.views} views</span>
                  <span>•</span>
                  <span>{c.bookmarks} saves</span>
                  <span>•</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">{c.citations} citations</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COPE / CPD Continuing Education Credit Tracker */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#121217] border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 pb-4">
            <h2 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-500" />
              <span>COPE / CPD Continuing Education Tracker</span>
            </h2>
            <button className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline cursor-pointer">
              <Download className="h-3 w-3" /> Export PDF
            </button>
          </div>

          {/* Progress to target */}
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-amber-900 dark:text-amber-300">Biennial License Cycle (2025 - 2027)</span>
              <span className="font-mono text-amber-800 dark:text-amber-400">24.5 of 30 Hours (82%)</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-amber-200/70 dark:bg-amber-900/40 overflow-hidden">
              <div className="h-full rounded-full bg-amber-500 w-[82%]" />
            </div>
            <p className="text-[10px] text-amber-700/80 dark:text-amber-400/80 font-medium">
              5.5 hours remaining. Next automated audit report sent Jan 2027.
            </p>
          </div>

          {/* CE Unit List */}
          <div className="space-y-2.5">
            {ceUnits.map((ce, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-neutral-50/70 dark:bg-[#16161e] border border-neutral-200/60 dark:border-neutral-800 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <p className="font-bold text-neutral-900 dark:text-white leading-snug">
                    {ce.title}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    {ce.provider} • <span className="font-mono">{ce.accreditationId}</span>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold font-mono">
                    {ce.credits}
                  </span>
                  <p className="text-[10px] text-neutral-400 mt-1">{ce.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
