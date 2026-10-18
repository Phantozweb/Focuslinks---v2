import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Info,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Clock,
  CalendarDays,
  Users,
  Mail,
  LifeBuoy
} from 'lucide-react';
import { motion } from 'motion/react';
import type { DocBlock, DocSection, LegalDocId } from '../subViews';
import { LEGAL_DOCS, type DocAccent } from '../subViews';

/* ------------------------------ Tone presets -------------------------------- */

type CalloutTone = 'info' | 'warn' | 'danger' | 'success';

const CALLOUT_TONES: Record<CalloutTone, {
  wrap: string;
  tile: string;
  title: string;
  text: string;
  icon: React.FC<{ className?: string }>;
}> = {
  info: {
    wrap: 'bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30',
    tile: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400',
    title: 'text-blue-950 dark:text-white',
    text: 'text-blue-800/80 dark:text-blue-400/80',
    icon: Info
  },
  warn: {
    wrap: 'bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30',
    tile: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400',
    title: 'text-amber-950 dark:text-white',
    text: 'text-amber-800/80 dark:text-amber-400/80',
    icon: AlertTriangle
  },
  danger: {
    wrap: 'bg-rose-50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30',
    tile: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400',
    title: 'text-rose-950 dark:text-white',
    text: 'text-rose-800/80 dark:text-rose-400/80',
    icon: ShieldAlert
  },
  success: {
    wrap: 'bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30',
    tile: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400',
    title: 'text-emerald-950 dark:text-white',
    text: 'text-emerald-800/80 dark:text-emerald-400/80',
    icon: CheckCircle2
  }
};

/* --------------------------------- Props ------------------------------------ */

interface DocShellProps {
  eyebrow: string;
  /** Plain part of the H1 */
  title: string;
  /** Glossy highlighted part of the H1 */
  titleAccent: string;
  icon: React.FC<{ className?: string }>;
  accent: DocAccent;
  intro: string;
  lastUpdated: string;
  readingTime: string;
  sections: DocSection[];
  onBackToHome: () => void;
  onEnterApp: () => void;
  onNavigate?: (view: 'howto' | LegalDocId) => void;
}

/* -------------------------------- Component --------------------------------- */

export const DocShell: React.FC<DocShellProps> = ({
  eyebrow,
  title,
  titleAccent,
  icon: Icon,
  accent,
  intro,
  lastUpdated,
  readingTime,
  sections,
  onBackToHome,
  onEnterApp,
  onNavigate
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(`doc-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="py-12 sm:py-20 relative overflow-hidden bg-white dark:bg-[#07070a] text-neutral-900 dark:text-neutral-100 font-sans">
      {/* Decorative ambient background — same treatment as the Clinical Guide */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-[pulse_10s_infinite]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl animate-[pulse_12s_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(#8080800d_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
        {/* Back navigation */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 bg-neutral-100 dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs transition-all hover:scale-[1.02] cursor-pointer mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home Overview</span>
        </motion.button>

        {/* Header */}
        <div className="max-w-4xl space-y-6 mb-12 text-left">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold shadow-sm ${accent.chip}`}>
            <Icon className="h-3.5 w-3.5 animate-pulse" />
            <span>{eyebrow}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-neutral-900 dark:text-white tracking-tight leading-none">
            {title}{' '}
            <span className="glossy-shine-text-light dark:glossy-shine-text-dark font-black">
              {titleAccent}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
            {intro}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
              <CalendarDays className="h-3.5 w-3.5" />
              Last updated {lastUpdated}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
              <Clock className="h-3.5 w-3.5" />
              {readingTime}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
              <Users className="h-3.5 w-3.5" />
              Applies to every member & visitor
            </span>
          </div>
        </div>

        {/* Quick section nav */}
        <div className="flex flex-wrap gap-2 mb-12 select-none">
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className="px-3.5 py-2 rounded-xl text-[11px] font-bold bg-neutral-50 dark:bg-[#111116] border border-neutral-200/60 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 transition-all cursor-pointer"
            >
              <span className={`mr-1.5 font-black ${accent.number}`}>{String(i + 1).padStart(2, '0')}</span>
              {s.title}
            </button>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-8 mb-20 text-left">
          {sections.map((section, idx) => (
            <motion.section
              key={section.id}
              id={`doc-${section.id}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35 }}
              className={`scroll-mt-24 p-6 sm:p-10 rounded-3xl bg-neutral-50 dark:bg-[#0c0c11] border border-neutral-200/50 dark:border-neutral-900/70 ${accent.hover} transition-colors duration-300 space-y-6 relative overflow-hidden`}
            >
              {/* Ghost number */}
              <div className="absolute right-6 top-2 text-6xl sm:text-8xl font-black text-neutral-200/40 dark:text-neutral-800/15 pointer-events-none select-none">
                {String(idx + 1).padStart(2, '0')}
              </div>

              <div className="flex items-start gap-4 relative">
                <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center text-sm font-black ${accent.tile}`}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h2 className="text-lg sm:text-2xl font-black text-neutral-900 dark:text-white leading-snug pt-1.5">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-5 max-w-4xl">
                {section.blocks.map((block, bi) => {
                  if (block.type === 'p') {
                    return (
                      <p key={bi} className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === 'list') {
                    return (
                      <ul key={bi} className="space-y-2.5">
                        {block.items.map((item, li) => (
                          <li key={li} className="flex items-start gap-3">
                            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${accent.dot}`} />
                            <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (block.type === 'sub') {
                    return (
                      <div key={bi} className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {block.points.map((pt, pi) => (
                          <div
                            key={pi}
                            className="p-4 rounded-2xl bg-white dark:bg-[#111116] border border-neutral-200/60 dark:border-neutral-800/80 space-y-1.5"
                          >
                            <h4 className="text-xs font-black text-neutral-900 dark:text-white flex items-center gap-2">
                              <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                              {pt.label}
                            </h4>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                              {pt.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  // callout
                  const tone = CALLOUT_TONES[block.tone];
                  const ToneIcon = tone.icon;
                  return (
                    <div key={bi} className={`p-5 rounded-2xl flex items-start gap-4 ${tone.wrap}`}>
                      <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${tone.tile}`}>
                        <ToneIcon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className={`text-xs sm:text-sm font-black ${tone.title}`}>{block.title}</h4>
                        <p className={`text-xs font-medium leading-relaxed ${tone.text}`}>{block.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Related documents */}
        {onNavigate && (
          <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-neutral-50 to-blue-50/20 dark:from-[#0b0b10] dark:to-[#0f1124]/30 border border-neutral-200/60 dark:border-neutral-800/80 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <LifeBuoy className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-sm sm:text-base font-black text-neutral-900 dark:text-white">
                Related Policies & Help
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {LEGAL_DOCS.map((doc) => {
                const DocIcon = doc.icon;
                return (
                  <button
                    key={doc.id}
                    onClick={() => onNavigate(doc.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black border transition-all cursor-pointer hover:scale-[1.03] ${doc.accent.chip}`}
                  >
                    <DocIcon className="h-3.5 w-3.5" />
                    {doc.label}
                  </button>
                );
              })}
              <button
                onClick={() => onNavigate('howto')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black border bg-indigo-50 dark:bg-indigo-950/70 border-indigo-200/50 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 hover:scale-[1.03] transition-all cursor-pointer"
              >
                <LifeBuoy className="h-3.5 w-3.5" />
                How-To & FAQ
              </button>
            </div>
            <p className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              Questions about this document? Write to{' '}
              <strong className="font-extrabold text-neutral-800 dark:text-neutral-200">legal@focuslinks.org</strong>
              {' '}— a human on the clinical review board replies within one business day.
            </p>
          </div>
        )}

        {/* CTA Launch Banner — same gradient treatment as the Clinical Guide */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute top-[-50%] right-[-10%] w-[350px] h-[350px] bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-2xl">
            <span className="inline-block text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 bg-white/20 rounded-md">
              <Sparkles className="inline h-3 w-3 mr-1 -mt-0.5" />
              Peer-Only Clinical Community
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-none">
              Ready to Join the Verified Workspace?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-medium">
              Explore de-identified cases, specialty consult hubs and grand rounds with 12,400+ verified optometrists.
            </p>
          </div>

          <button
            onClick={onEnterApp}
            className="px-8 py-4 rounded-2xl bg-white hover:bg-neutral-50 text-blue-600 font-extrabold text-sm sm:text-base transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-black/10 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Launch Workspace</span>
            <ArrowRight className="h-4.5 w-4.5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
