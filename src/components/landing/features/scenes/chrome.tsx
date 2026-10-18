import React from 'react';
import { Search, Bell, Wifi, BatteryFull, SignalHigh } from 'lucide-react';
import { phase, easeOutCubic } from '../sceneKit';

/** Shared primitives for the coded feature-demo "screenshots". Pure presentational. */

/** Initials avatar with deterministic gradient — no external images so demos never flash. */
const GRADIENTS = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-violet-500 to-purple-600',
  'from-cyan-500 to-sky-600',
];

export const DemoAvatar: React.FC<{ name: string; size?: number; ring?: boolean }> = ({
  name,
  size = 30,
  ring = false,
}) => {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return (
    <div
      className={`rounded-full bg-gradient-to-br ${GRADIENTS[hash % GRADIENTS.length]} flex items-center justify-center text-white font-bold shrink-0 ${
        ring ? 'ring-2 ring-white dark:ring-[#16161c]' : ''
      }`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
};

/** Browser-style chrome bar that frames every demo like a screencast window. */
export const DemoWindow: React.FC<{
  url: string;
  accent?: string;
  children: React.ReactNode;
}> = ({ url, accent = 'bg-blue-500', children }) => (
  <div className="w-full rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#101014] shadow-xl shadow-neutral-200/50 dark:shadow-none select-none">
    {/* traffic lights + url */}
    <div className="h-8 flex items-center gap-3 px-3.5 bg-neutral-100/90 dark:bg-[#0a0a0e] border-b border-neutral-200/60 dark:border-neutral-800/80">
      <div className="flex gap-1.5 shrink-0">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <div className="flex-1 min-w-0 h-5 rounded-md bg-white dark:bg-[#15151b] border border-neutral-200/70 dark:border-neutral-800 flex items-center px-2 gap-1.5">
        <span className={`h-1.5 w-1.5 rounded-full ${accent} shrink-0`} />
        <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 truncate tracking-wide">
          {url}
        </span>
      </div>
    </div>
    {/* screen area — fixed height so scenes swap without layout jump */}
    <div className="relative h-[340px] sm:h-[380px] bg-neutral-50 dark:bg-[#0c0c10] overflow-hidden">
      {children}
    </div>
  </div>
);

/** Mock app top bar used inside scenes (mirrors the real FocusLinks header). */
export const SceneTopBar: React.FC<{ title: string; right?: React.ReactNode }> = ({ title, right }) => (
  <div className="h-11 px-4 flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-800/80 bg-white/90 dark:bg-[#121217] backdrop-blur relative z-10">
    <span className="text-[12px] font-black tracking-tight text-neutral-900 dark:text-white">{title}</span>
    <div className="flex items-center gap-2.5">
      {right}
      <span className="relative">
        <Bell className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500" />
        <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
      </span>
      <DemoAvatar name="Marcus Chen" size={20} />
    </div>
  </div>
);

/** Tiny fake phone status bar — sells the "recorded from the app" feel. */
export const PhoneStatusBar: React.FC = () => (
  <div className="h-5 px-4 flex items-center justify-between bg-white dark:bg-[#0c0c10] text-neutral-400 dark:text-neutral-600">
    <span className="text-[8px] font-bold">9:41</span>
    <div className="flex items-center gap-1">
      <SignalHigh className="h-2.5 w-2.5" />
      <Wifi className="h-2.5 w-2.5" />
      <BatteryFull className="h-2.5 w-2.5" />
    </div>
  </div>
);

/** Verified check chip used across directory/consult demos. */
export const VerifiedChip: React.FC<{ label?: string }> = ({ label = 'Verified' }) => (
  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200/70 dark:border-blue-800/70 text-blue-700 dark:text-blue-300 text-[8px] font-black uppercase tracking-wide">
    <svg viewBox="0 0 24 24" className="h-2 w-2 fill-blue-600 dark:fill-blue-400" aria-hidden="true">
      <path d="M12 1.5l2.6 2 3.3-.4 1.2 3.1 2.9 1.6-1 3.2 1 3.2-2.9 1.6-1.2 3.1-3.3-.4-2.6 2-2.6-2-3.3.4-1.2-3.1L3 15.8l1-3.2-1-3.2 2.9-1.6 1.2-3.1 3.3.4z" />
      <path d="M10.6 15.7l-3-3 1.3-1.3 1.7 1.7 4.5-4.5 1.3 1.3z" fill="white" />
    </svg>
    {label}
  </span>
);

/** Bottom caption strip that swaps copy per story beat (like subtitles). */
export const SceneCaption: React.FC<{
  t: number;
  duration: number;
  beats: [number, number, string][];
}> = ({ t, duration, beats }) => {
  const idx = Math.max(
    0,
    beats.findIndex(([s, e]) => t >= s && t < e),
  );
  const label = idx >= 0 ? beats[idx][2] : '';
  const beatStart = idx >= 0 ? beats[idx][0] : 0;
  const p = easeOutCubic(phase(t, beatStart, beatStart + 400));
  return (
    <div className="relative h-8 shrink-0 border-t border-neutral-200/60 dark:border-neutral-800/70 bg-white/80 dark:bg-[#101015] flex items-center px-4">
      <span className="h-4 w-1 rounded-full bg-blue-500 shrink-0" style={{ opacity: p }} />
      <span
        key={idx}
        className="ml-2.5 text-[10px] font-bold text-neutral-600 dark:text-neutral-300 truncate"
        style={{ opacity: p, transform: `translateX(${(1 - p) * 6}px)` }}
      >
        {label}
      </span>
      <span className="ml-auto text-[8px] font-black tracking-widest text-neutral-300 dark:text-neutral-600 uppercase shrink-0 hidden sm:block">
        {(t / 1000).toFixed(1)}s / {(duration / 1000).toFixed(0)}s
      </span>
    </div>
  );
};
