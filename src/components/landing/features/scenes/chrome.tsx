import React from 'react';
import { Search, Bell, Eye, Moon, ShieldCheck, MapPin } from 'lucide-react';
import { DoctorAvatar } from '../../../common/DoctorAvatar';
import { phase, easeOutCubic } from '../sceneKit';

/**
 * Shared chrome for the native feature demos.
 *
 * brag law: "Show the thing — reuse the real thing from the source."
 * Every primitive below mirrors the REAL FocusLinks UI (Header.tsx,
 * DoctorAvatar, badge recipes) and the demos are populated with the app's
 * actual mock data (doctors, events, consults, posts) so a frozen frame is
 * indistinguishable from a real screenshot.
 */

/* ---------- real data assets (same URLs the live app loads) ---------- */

const u = (id: string, w = 200) =>
  `https://images.unsplash.com/${id}?w=${w}&auto=format&fit=crop&q=80`;

export const AVATARS = {
  /** the logged-in user across all demos (Dr. Sirenjeev) */
  me: u('photo-1594824813501-4838e82ef573'),
  marcus: u('photo-1622253692010-333f2da6031d'),
  amara: u('photo-1582750433449-648ed127bb54'),
  sarah: u('photo-1559839734-2b71ea197ec2'),
  tariq: u('photo-1537368910025-700350fe46c7'),
  raj: u('photo-1507003211169-0a1dd7228f2d'),
  priya: u('photo-1612349317150-e413f6a5b16d'),
};

export const CLINICAL_IMG = {
  slitLamp: u('photo-1579684385127-1ef15d508118', 800),
  myopiaKids: u('photo-1516549655169-df83a0774514', 800),
  octDrusen: u('photo-1505751172876-fa1923c5c528', 800),
  equipment: u('photo-1629909613654-28e377c37b09', 800),
  octWorkstation: u('photo-1583912267670-6575ad472688', 800),
  topographer: u('photo-1584515979956-d9f6e5d09982', 800),
  topographyScreen: u('photo-1576091160399-112ba8d25d1d', 800),
};

/** Image with a graceful gradient fallback if the network image is unavailable. */
export const SceneImg: React.FC<{
  src: string;
  alt: string;
  className?: string;
  gradient?: string;
}> = ({ src, alt, className = '', gradient = 'from-blue-600/30 via-indigo-600/30 to-purple-600/30' }) => {
  const [ok, setOk] = React.useState(true);
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      {ok && (
        <img
          src={src}
          alt={alt}
          loading="eager"
          onError={() => setOk(false)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
};

/* ---------- the real app header, replicated ---------- */

/** FocusLinks app top bar — same brand mark, search & membership chip as Header.tsx. */
export const AppHeaderBar: React.FC<{
  breadcrumb: string;
  searchPlaceholder?: string;
  width?: string;
}> = ({ breadcrumb, searchPlaceholder = 'Search cases, OCTs, #Cornea, ODs...', width = 'w-40 lg:w-56' }) => (
  <div className="h-11 shrink-0 px-3 flex items-center justify-between gap-3 border-b border-neutral-200/80 dark:border-neutral-800/90 bg-white/95 dark:bg-[#0c0c11] relative z-20">
    {/* brand — same recipe as the real mobile header */}
    <div className="flex items-center gap-2 min-w-0">
      <div className="relative flex items-center justify-center h-7 w-7 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 text-white shadow-sm shadow-blue-500/20 shrink-0">
        <Eye className="h-3.5 w-3.5" />
        <div className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0c0c11]" />
      </div>
      <span className="text-[13px] font-black tracking-tight text-neutral-900 dark:text-neutral-50 shrink-0">
        FocusLinks
      </span>
      <span className="px-1 py-[1px] rounded text-[8px] font-bold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/50 shrink-0">
        OD
      </span>
      <span className="hidden md:block h-4 w-px bg-neutral-200 dark:bg-neutral-800 mx-0.5" />
      <span className="hidden md:block text-[11px] font-extrabold text-neutral-900 dark:text-white truncate">
        {breadcrumb}
      </span>
    </div>

    {/* omnisearch — real placeholder */}
    <div className={`hidden sm:flex ${width} items-center relative`}>
      <Search className="absolute left-2.5 h-3 w-3 text-neutral-400" />
      <div className="w-full rounded-lg border border-neutral-200/90 dark:border-neutral-800 bg-neutral-100/70 dark:bg-[#15151c] pl-7 pr-2 py-1 text-[9px] text-neutral-400 truncate">
        {searchPlaceholder}
      </div>
    </div>

    {/* right controls — membership ID, notifications, theme, avatar */}
    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
      <span className="hidden md:flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-[9px] font-mono font-bold select-none">
        <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
        FL-29841-OD
      </span>
      <span className="relative flex items-center justify-center h-6 w-6 rounded-lg text-neutral-500 dark:text-neutral-400">
        <Bell className="h-3.5 w-3.5" />
        <span className="absolute top-0.5 right-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-rose-500 text-[6px] font-bold text-white">
          3
        </span>
      </span>
      <Moon className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
      <span className="rounded-full ring-1 ring-neutral-200 dark:ring-neutral-700 p-[2px] flex">
        <DoctorAvatar src={AVATARS.me} alt="Dr. Sirenjeev" className="h-5 w-5 rounded-full" />
      </span>
    </div>
  </div>
);

/* ---------- browser-style window frame (a screencast of the real web app) ---------- */

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
    <div className="relative h-[340px] sm:h-[380px] bg-neutral-50 dark:bg-[#0c0c10] overflow-hidden flex flex-col">
      {children}
    </div>
  </div>
);

/* ---------- simulated cursor (brag: "simulated clicks make it alive") ---------- */

export interface CursorMove {
  /** fade-in start (ms) */
  start: number;
  /** fade-out end (ms) */
  end: number;
  /** horizontal position, % of container width */
  x: number;
  /** vertical position, % of container height */
  y: number;
  /** click pulse happens this many ms after `start` (default 260) */
  clickAt?: number;
}

export const TapCursor: React.FC<{ moves: CursorMove[] }> = ({ moves }) => (
  <>
    {moves.map((m, i) => {
      const appear = easeOutCubic(phase(m.start, m.start, m.start + 260));
      const gone = 1 - phase(m.end - 220, m.end, m.end + 1);
      const clickP = easeOutCubic(phase(m.start + (m.clickAt ?? 260), m.start + (m.clickAt ?? 260), m.start + (m.clickAt ?? 260) + 340));
      const opacity = Math.min(appear, gone);
      if (opacity <= 0.01) return null;
      return (
        <div
          key={i}
          className="absolute z-30 pointer-events-none"
          style={{ left: `${m.x}%`, top: `${m.y}%`, opacity }}
        >
          {/* click ripple */}
          <span
            className="absolute -top-2 -left-2 h-8 w-8 rounded-full bg-blue-500/25"
            style={{ transform: `scale(${0.4 + clickP * 1.5})`, opacity: clickP * (1 - clickP) * 3.2 }}
          />
          <svg viewBox="0 0 24 24" className="h-4 w-4 drop-shadow-md -rotate-12 translate-x-1 translate-y-1">
            <path
              d="M5.5 3.2L19 11.4l-6.1 1.1-2.6 5.9z"
              className="fill-white stroke-neutral-900 dark:stroke-white"
              strokeWidth={1.4}
            />
          </svg>
        </div>
      );
    })}
  </>
);

/* ---------- verified badge (the real blue ShieldCheck overlay) ---------- */

export const VerifiedShield: React.FC<{ className?: string; badge?: string }> = ({
  className = 'h-3.5 w-3.5 p-[3px] -bottom-0.5 -right-0.5',
  badge = 'h-full w-full',
}) => (
  <span className={`absolute ${className} rounded-full bg-blue-600 text-white shadow-sm border-2 border-white dark:border-[#18181c] flex items-center justify-center`}>
    <ShieldCheck className={badge} strokeWidth={2.5} />
  </span>
);

/** Text chip version — mirrors StoryModal's "Verified OD" emerald chip. */
export const VerifiedChip: React.FC<{ label?: string; tone?: 'blue' | 'emerald' }> = ({
  label = 'Verified',
  tone = 'blue',
}) => (
  <span
    className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[8px] font-bold ${
      tone === 'emerald'
        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
        : 'bg-blue-50 dark:bg-blue-950/70 border border-blue-200/70 dark:border-blue-800/70 text-blue-700 dark:text-blue-300'
    }`}
  >
    <ShieldCheck className="h-2 w-2" strokeWidth={2.5} />
    {label}
  </span>
);

/** Small distance pill (emerald) used on directory cards. */
export const DistanceChip: React.FC<{ miles: string }> = ({ miles }) => (
  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-[8px] font-bold">
    <MapPin className="h-2 w-2" />
    {miles}
  </span>
);

/** Toast pinned to the window's bottom-right, like real in-app feedback. */
export const SceneToast: React.FC<{ t: number; start: number; children: React.ReactNode }> = ({
  t,
  start,
  children,
}) => {
  const p = easeOutCubic(phase(t, start, start + 420));
  if (p <= 0.01) return null;
  return (
    <div
      className="absolute z-30 bottom-3 right-3 left-3 sm:left-auto flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900/95 dark:bg-white/95 shadow-xl border border-white/10 dark:border-neutral-200 backdrop-blur"
      style={{ opacity: p, transform: `translateY(${(1 - p) * 14}px)` }}
    >
      {children}
    </div>
  );
};

/* ---------- bottom caption strip (unchanged API) ---------- */

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
    <div className="relative h-8 shrink-0 border-t border-neutral-200/60 dark:border-neutral-800/70 bg-white/80 dark:bg-[#101015] flex items-center px-4 z-20">
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
