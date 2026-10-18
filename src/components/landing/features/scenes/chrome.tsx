import React, { useLayoutEffect, useRef, useState } from 'react';
import { Search, Bell, Eye, Moon, ShieldCheck, MapPin, ArrowRight, Heart } from 'lucide-react';
import { DoctorAvatar } from '../../../common/DoctorAvatar';
import { phase, easeOutCubic, easeInOutCubic, easeOutBack } from '../sceneKit';

/**
 * Shared stage + chrome for the native feature demos.
 *
 * STAGE LAW (user contract): every spot is authored ONCE on a fixed
 * 1280×720 design canvas and uniformly scaled to fit — 16:9 on every
 * device, the exact same composition everywhere, never reflowing.
 *
 * brag law: "Show the thing — reuse the real thing from the source."
 * Every primitive mirrors the REAL FocusLinks UI (Header.tsx,
 * DoctorAvatar, badge recipes) and the demos are populated with the
 * app's actual mock data so a frozen frame is indistinguishable from a
 * real screenshot.
 */

/* ================================================================
 *  THE FIXED 16:9 STAGE
 *  Scenes are drawn at a constant 1280×720 and scaled to the
 *  container width — like an embedded video, identical on all sizes.
 * ================================================================ */

export const STAGE_W = 1280;
export const STAGE_H = 720;

export const StageFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / STAGE_W);
    measure();
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: '16 / 9', visibility: scale > 0 ? 'visible' : 'hidden' }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
};

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

/* ================================================================
 *  CINEMATIC STAGE WINDOW
 *  The whole 1280×720 frame is the video: a deep accent-tinted
 *  backdrop with drifting glows + a fixed 1080×588 app window.
 *  `screen` carries the app UI; `children` are full-canvas overlays
 *  (AdHook / KineticBeat / AdPunchline) — z-layered above the window.
 * ================================================================ */

export const DemoWindow: React.FC<{
  url: string;
  accent: SpotAccent;
  /** global ad clock — drives the ambient backdrop drift */
  t: number;
  screen: React.ReactNode;
  children?: React.ReactNode;
}> = ({ url, accent, t, screen, children }) => {
  const a = SPOT_ACCENT[accent];
  const drift1 = Math.sin(t / 2600) * 26;
  const drift2 = Math.cos(t / 3400) * 22;
  const drift3 = Math.sin(t / 4100 + 1.4) * 18;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#07070c] select-none">
      {/* ---- cinematic backdrop ---- */}
      <div
        className={`absolute -top-32 left-[22%] h-[400px] w-[400px] rounded-full blur-[110px] ${a.glow}`}
        style={{ opacity: 0.2, transform: `translate(${drift1}px, ${drift2 * 0.5}px)` }}
      />
      <div
        className={`absolute -bottom-40 right-[6%] h-[360px] w-[360px] rounded-full blur-[120px] ${a.glow}`}
        style={{ opacity: 0.13, transform: `translate(${drift2}px, ${drift1 * -0.4}px)` }}
      />
      <div
        className="absolute top-[8%] right-[30%] h-[220px] w-[220px] rounded-full blur-[100px] bg-white"
        style={{ opacity: 0.045, transform: `translate(${drift3}px, ${drift1 * 0.3}px)` }}
      />
      {/* faint blueprint grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          opacity: 0.045,
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(125% 95% at 50% 42%, transparent 52%, rgba(0,0,0,0.55) 100%)' }}
      />

      {/* ---- the app window — fixed geometry, never reflows ---- */}
      <div className="absolute left-[100px] top-[44px] w-[1080px] h-[588px] rounded-2xl overflow-hidden border border-white/10 bg-white dark:bg-[#0c0c10] shadow-[0_48px_120px_-24px_rgba(0,0,0,0.85)] flex flex-col">
        {/* browser bar */}
        <div className="h-11 shrink-0 flex items-center gap-3 px-4 bg-[#f4f4f6] dark:bg-[#0a0a0e] border-b border-black/[0.06] dark:border-white/[0.06]">
          <div className="flex gap-2 shrink-0">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 min-w-0 h-6 rounded-md bg-white dark:bg-[#15151b] border border-black/[0.07] dark:border-white/[0.07] flex items-center px-3 gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${a.dot} shrink-0`} />
            <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 truncate tracking-wide">
              {url}
            </span>
          </div>
          <div className="flex gap-2.5 shrink-0 text-neutral-400 dark:text-neutral-600">
            <span className="h-3.5 w-6 rounded-[3px] border border-current opacity-60" />
            <span className="h-3.5 w-3.5 rounded-full border border-current opacity-60" />
          </div>
        </div>
        {/* app screen */}
        <div className="flex-1 min-h-0 relative flex flex-col bg-white dark:bg-[#0c0c10]">{screen}</div>
      </div>

      {/* ---- full-canvas ad overlays (hook / kinetic / punchline) ---- */}
      {children}
    </div>
  );
};

/* ---------- the real app header, replicated ---------- */

/** FocusLinks app top bar — same brand mark, search & membership chip as Header.tsx. */
export const AppHeaderBar: React.FC<{
  breadcrumb: string;
  searchPlaceholder?: string;
}> = ({ breadcrumb, searchPlaceholder = 'Search cases, OCTs, #Cornea, ODs...' }) => (
  <div className="h-12 shrink-0 px-4 flex items-center justify-between gap-4 border-b border-neutral-200/80 dark:border-neutral-800/90 bg-white/95 dark:bg-[#0c0c11] relative z-20">
    {/* brand — same recipe as the real header */}
    <div className="flex items-center gap-2.5 min-w-0">
      <div className="relative flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 text-white shadow-sm shadow-blue-500/20 shrink-0">
        <Eye className="h-4 w-4" />
        <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0c0c11]" />
      </div>
      <span className="text-[17px] font-black tracking-tight text-neutral-900 dark:text-neutral-50 shrink-0">
        FocusLinks
      </span>
      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/50 shrink-0">
        OD
      </span>
      <span className="h-4 w-px bg-neutral-200 dark:bg-neutral-800 mx-0.5 shrink-0" />
      <span className="text-[13px] font-extrabold text-neutral-900 dark:text-white truncate">
        {breadcrumb}
      </span>
    </div>

    {/* omnisearch — real placeholder */}
    <div className="w-72 flex items-center relative shrink-0">
      <Search className="absolute left-3 h-3.5 w-3.5 text-neutral-400" />
      <div className="w-full rounded-lg border border-neutral-200/90 dark:border-neutral-800 bg-neutral-100/70 dark:bg-[#15151c] pl-8 pr-3 py-1.5 text-[11px] text-neutral-400 truncate">
        {searchPlaceholder}
      </div>
    </div>

    {/* right controls — membership ID, notifications, theme, avatar */}
    <div className="flex items-center gap-3 shrink-0">
      <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-[10px] font-mono font-bold select-none">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        FL-29841-OD
      </span>
      <span className="relative flex items-center justify-center h-7 w-7 rounded-lg text-neutral-500 dark:text-neutral-400">
        <Bell className="h-4 w-4" />
        <span className="absolute top-0 right-0 flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 text-[7px] font-bold text-white">
          3
        </span>
      </span>
      <Moon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
      <span className="rounded-full ring-1 ring-neutral-200 dark:ring-neutral-700 p-[2.5px] flex">
        <DoctorAvatar src={AVATARS.me} alt="Dr. Sirenjeev" className="h-6 w-6 rounded-full" />
      </span>
    </div>
  </div>
);

/* ---------- simulated cursor (brag: "simulated clicks make it alive") ---------- */

export interface CursorMove {
  /** fade-in start (ms) */
  start: number;
  /** fade-out end (ms) */
  end: number;
  /** horizontal position, % of the content container */
  x: number;
  /** vertical position, % of the content container */
  y: number;
  /** click pulse happens this many ms after `start` (default 260) */
  clickAt?: number;
}

export const TapCursor: React.FC<{ moves: CursorMove[] }> = ({ moves }) => (
  <>
    {moves.map((m, i) => {
      const appear = easeOutCubic(phase(m.start, m.start, m.start + 260));
      const gone = 1 - phase(m.end - 220, m.end, m.end + 1);
      const clickP = easeOutCubic(
        phase(m.start + (m.clickAt ?? 260), m.start + (m.clickAt ?? 260), m.start + (m.clickAt ?? 260) + 340),
      );
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
            className="absolute -top-3 -left-3 h-12 w-12 rounded-full bg-blue-500/25"
            style={{ transform: `scale(${0.4 + clickP * 1.5})`, opacity: clickP * (1 - clickP) * 3.2 }}
          />
          <svg viewBox="0 0 24 24" className="h-6 w-6 drop-shadow-lg -rotate-12 translate-x-1 translate-y-1">
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
  className = 'h-5 w-5 p-[4px] -bottom-1 -right-1',
  badge = 'h-full w-full',
}) => (
  <span
    className={`absolute ${className} rounded-full bg-blue-600 text-white shadow-sm border-2 border-white dark:border-[#18181c] flex items-center justify-center`}
  >
    <ShieldCheck className={badge} strokeWidth={2.5} />
  </span>
);

/** Small distance pill (emerald) used on directory cards. */
export const DistanceChip: React.FC<{ miles: string }> = ({ miles }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-[10px] font-bold">
    <MapPin className="h-2.5 w-2.5" />
    {miles}
  </span>
);

/** Toast pinned inside the app window's bottom-right, like real in-app feedback. */
export const SceneToast: React.FC<{ t: number; start: number; children: React.ReactNode }> = ({
  t,
  start,
  children,
}) => {
  const p = easeOutCubic(phase(t, start, start + 420));
  const out = 1 - phase(t, start + 3400, start + 3800);
  const o = Math.min(p, out);
  if (o <= 0.01) return null;
  return (
    <div
      className="absolute z-30 bottom-14 right-6 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-neutral-900/95 dark:bg-white/95 shadow-2xl border border-white/10 dark:border-neutral-200 backdrop-blur"
      style={{ opacity: o, transform: `translateY(${(1 - p) * 14}px)` }}
    >
      {children}
    </div>
  );
};

/* ---------- burned-in subtitle strip (video caption, not player chrome) ---------- */

export const SceneCaption: React.FC<{
  t: number;
  beats: [number, number, string][];
}> = ({ t, beats }) => {
  const idx = Math.max(
    0,
    beats.findIndex(([s, e]) => t >= s && t < e),
  );
  const label = idx >= 0 ? beats[idx][2] : '';
  const beatStart = idx >= 0 ? beats[idx][0] : 0;
  const p = easeOutCubic(phase(t, beatStart, beatStart + 400));
  return (
    <div className="relative h-11 shrink-0 border-t border-neutral-200/60 dark:border-neutral-800/70 bg-white/85 dark:bg-[#101015] flex items-center px-5 z-20">
      <span className="h-4 w-1 rounded-full bg-blue-500 shrink-0" style={{ opacity: p }} />
      <span
        key={idx}
        className="ml-3 text-[13px] font-bold text-neutral-600 dark:text-neutral-300 truncate"
        style={{ opacity: p, transform: `translateX(${(1 - p) * 6}px)` }}
      >
        {label}
      </span>
    </div>
  );
};

/* ================================================================
 *  BRAG AD PRIMITIVES — hook / kinetic beat / punchline
 *  Contract (brag-output/brag-plan.md):
 *    HOOK 0–2400 full-bleed takeover · WIPE 2400–3050 · PROOF · PUNCH D-2100→D
 *  Authored at 1280×720 — one fixed composition on every device.
 *  Every accent is a static Tailwind class — no dynamic class names.
 * ================================================================ */

export type SpotAccent = 'blue' | 'emerald' | 'violet' | 'fuchsia' | 'amber' | 'sky';

export const SPOT_ACCENT: Record<
  SpotAccent,
  { glow: string; text: string; bar: string; dot: string; cta: string; hex: string; grad: string }
> = {
  blue: {
    glow: 'bg-blue-600', text: 'text-blue-400', bar: 'bg-blue-500', dot: 'bg-blue-500',
    cta: 'bg-blue-600 hover:bg-blue-500', hex: '#2563eb', grad: 'from-blue-600 via-indigo-600 to-sky-400',
  },
  emerald: {
    glow: 'bg-emerald-500', text: 'text-emerald-400', bar: 'bg-emerald-500', dot: 'bg-emerald-500',
    cta: 'bg-emerald-600 hover:bg-emerald-500', hex: '#10b981', grad: 'from-emerald-600 via-emerald-500 to-teal-400',
  },
  violet: {
    glow: 'bg-violet-600', text: 'text-violet-400', bar: 'bg-violet-500', dot: 'bg-violet-500',
    cta: 'bg-violet-600 hover:bg-violet-500', hex: '#7c3aed', grad: 'from-violet-600 via-purple-600 to-fuchsia-500',
  },
  fuchsia: {
    glow: 'bg-fuchsia-600', text: 'text-fuchsia-400', bar: 'bg-fuchsia-500', dot: 'bg-fuchsia-500',
    cta: 'bg-fuchsia-600 hover:bg-fuchsia-500', hex: '#d946ef', grad: 'from-fuchsia-600 via-pink-600 to-rose-500',
  },
  amber: {
    glow: 'bg-amber-500', text: 'text-amber-400', bar: 'bg-amber-500', dot: 'bg-amber-500',
    cta: 'bg-amber-500 hover:bg-amber-400', hex: '#f59e0b', grad: 'from-amber-600 via-orange-600 to-amber-400',
  },
  sky: {
    glow: 'bg-sky-500', text: 'text-sky-400', bar: 'bg-sky-500', dot: 'bg-sky-500',
    cta: 'bg-sky-600 hover:bg-sky-500', hex: '#0ea5e9', grad: 'from-sky-600 via-cyan-600 to-sky-400',
  },
};

/* ---------- SCENE 1 — the hook (the first 2 seconds are everything) ---------- */

export const AdHook: React.FC<{
  t: number;
  /** wipe starts here (2400 per the plan) */
  revealAt: number;
  eyebrow: string;
  /** hook line — words slam in one by one */
  line: string;
  accent: SpotAccent;
  spotNo?: string;
  /** optional floating ghost chat bubbles (Circles pain-point) */
  bubbles?: string[];
}> = ({ t, revealAt, eyebrow, line, accent, spotNo, bubbles }) => {
  const a = SPOT_ACCENT[accent];
  const WIPE = 650;
  const wipeP = easeInOutCubic(phase(t, revealAt, revealAt + WIPE));
  if (wipeP >= 1) return null;

  const words = line.split(' ');
  const glowPulse = 1 + Math.sin(t / 420) * 0.05;

  return (
    <div
      className="absolute inset-0 z-40 overflow-hidden"
      style={{ transform: `translateY(${-104 * wipeP}%)` }}
    >
      <div className="absolute inset-0 bg-[#08080d]" />
      {/* accent glow — slow cinematic drift */}
      <div
        className={`absolute -top-28 -right-24 h-[420px] w-[420px] rounded-full blur-[110px] ${a.glow}`}
        style={{ transform: `scale(${glowPulse})`, opacity: 0.3 + wipeP * -0.2 }}
      />
      <div className="absolute -bottom-36 -left-28 h-[360px] w-[360px] rounded-full blur-[120px] bg-neutral-300 opacity-[0.1]" />

      {/* ghost chat bubbles (optional storyline prop) */}
      {bubbles?.map((b, i) => {
        const inP = easeOutCubic(phase(t, 500 + i * 150, 950 + i * 150));
        const outP = phase(t, revealAt - 480, revealAt - 240);
        const drift = Math.sin(t / 520 + i * 1.9) * 6;
        if (inP <= 0.01 || outP >= 1) return null;
        const spots = [
          'left-[7%] top-[18%]',
          'right-[9%] top-[26%]',
          'left-[13%] top-[64%]',
          'right-[15%] top-[70%]',
        ];
        return (
          <span
            key={b}
            className={`absolute ${spots[i % spots.length]} px-4 py-2.5 rounded-2xl bg-white/[0.07] border border-white/10 text-[15px] font-semibold text-neutral-300 backdrop-blur-sm whitespace-nowrap`}
            style={{ opacity: inP * (1 - outP) * 0.9, transform: `translateY(${drift}px)` }}
          >
            {b}
          </span>
        );
      })}

      {/* the line */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-20 text-center">
        <span
          className="inline-flex items-center gap-3 text-[14px] font-black uppercase tracking-[0.34em] text-neutral-500 mb-6"
          style={{ opacity: easeOutCubic(phase(t, 160, 620)) }}
        >
          <span className={`h-2 w-2 rounded-full ${a.dot}`} />
          {eyebrow}
          <span className={`h-2 w-2 rounded-full ${a.dot}`} />
        </span>
        <h3 className="max-w-[980px] text-balance text-[46px] leading-[1.12] font-black tracking-tight text-white">
          {words.map((w, i) => {
            const p = easeOutBack(phase(t, 350 + i * 160, 670 + i * 160));
            if (p <= 0.001) return <span key={i} className="inline-block">&nbsp;</span>;
            return (
              <span
                key={i}
                className="inline-block mr-[0.26em]"
                style={{
                  opacity: Math.min(p, 1),
                  transform: `translateY(${(1 - p) * 30}px)`,
                  filter: `blur(${(1 - Math.min(p, 1)) * 8}px)`,
                }}
              >
                {w}
              </span>
            );
          })}
        </h3>
      </div>

      {/* micro wordmark */}
      <span
        className="absolute bottom-6 left-10 text-[11px] font-black uppercase tracking-[0.32em] text-neutral-600"
        style={{ opacity: easeOutCubic(phase(t, 300, 800)) }}
      >
        FocusLinks{spotNo ? ` · Spot ${spotNo}` : ''}
      </span>
    </div>
  );
};

/* ---------- mid-spot kinetic beat — one line, fast in, long hold ---------- */

export const KineticBeat: React.FC<{
  t: number;
  start: number;
  end: number;
  line: string;
  accent: SpotAccent;
}> = ({ t, start, end, line, accent }) => {
  const a = SPOT_ACCENT[accent];
  const inP = easeOutBack(phase(t, start, start + 280));
  const outP = phase(t, end - 200, end);
  const p = inP * (1 - outP);
  if (p <= 0.01) return null;
  return (
    <div
      className="absolute z-30 left-1/2 bottom-[26px] -translate-x-1/2 pointer-events-none"
      style={{
        opacity: Math.min(p, 1),
        transform: `translateX(-50%) translateY(${(1 - inP) * 16}px) scale(${0.94 + Math.min(inP, 1) * 0.06})`,
      }}
    >
      <div className="flex items-center gap-4 pl-5 pr-7 py-3.5 rounded-2xl bg-[#0b0b13]/95 border border-white/10 shadow-2xl backdrop-blur-md whitespace-nowrap">
        <span className={`h-8 w-1 rounded-full shrink-0 ${a.bar}`} />
        <span className="text-[24px] font-black tracking-tight text-white">{line}</span>
      </div>
    </div>
  );
};

/* ---------- SCENE 3 — the punchline: brand lockup over dimmed UI ---------- */

export const AdPunchline: React.FC<{
  t: number;
  start: number;
  feature: string;
  tagline: string;
  cta: string;
  accent: SpotAccent;
}> = ({ t, start, feature, tagline, cta, accent }) => {
  const a = SPOT_ACCENT[accent];
  const backdrop = easeOutCubic(phase(t, start, start + 460));
  if (backdrop <= 0.01) return null;
  const rise = (at: number) => {
    const p = easeOutCubic(phase(t, start + at, start + at + 440));
    return {
      opacity: p,
      transform: `translateY(${(1 - p) * 20}px)`,
    };
  };
  return (
    <div
      className="absolute inset-0 z-40 flex flex-col items-center justify-center px-16 text-center"
      style={{ opacity: backdrop, backdropFilter: `blur(${backdrop * 4}px)` }}
    >
      {/* dim the whole stage */}
      <div className="absolute inset-0 bg-[#07070c]/[0.86]" />
      <div className={`absolute -top-20 h-56 w-[480px] rounded-full blur-[110px] opacity-25 ${a.glow}`} />

      <div className="relative flex flex-col items-center">
        {/* brand row */}
        <div style={rise(120)} className="flex items-center gap-3.5">
          <span
            className={`relative flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-tr ${a.grad} text-white shadow-lg`}
          >
            <Eye className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-[#07070c]" />
          </span>
          <span className="text-[24px] font-black tracking-tight text-white">FocusLinks</span>
          <span className="h-6 w-px bg-white/20" />
          <span className={`text-[15px] font-black uppercase tracking-[0.24em] ${a.text}`}>{feature}</span>
        </div>

        {/* tagline */}
        <p
          style={rise(260)}
          className="mt-5 text-balance text-[40px] leading-[1.15] font-black tracking-tight text-white max-w-[900px]"
        >
          {tagline}
        </p>

        {/* CTA chip */}
        <div style={rise(420)} className="mt-6 flex items-center gap-4">
          <span
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[15px] font-bold text-white shadow-lg transition-colors ${a.cta} ${accent === 'amber' ? '!text-neutral-900' : ''}`}
          >
            {cta}
            <ArrowRight className="h-4 w-4" />
          </span>
          <span className="text-[13px] font-mono font-bold text-neutral-400">focuslinks.app</span>
        </div>
      </div>
    </div>
  );
};

/* ---------- transient particle burst (Spotlight applaud) ---------- */

export const FloatHearts: React.FC<{ t: number; start: number }> = ({ t, start }) => {
  const hearts = [
    { dx: -26, dy: -74, d: 0 },
    { dx: 20, dy: -92, d: 130 },
    { dx: -46, dy: -50, d: 70 },
    { dx: 36, dy: -56, d: 210 },
    { dx: 2, dy: -108, d: 170 },
  ];
  return (
    <>
      {hearts.map((h, i) => {
        const p = easeOutCubic(phase(t, start + h.d, start + h.d + 900));
        if (p <= 0 || p >= 1) return null;
        return (
          <Heart
            key={i}
            className="absolute left-1/2 top-0 h-3.5 w-3.5 text-rose-500 fill-rose-500 pointer-events-none z-30"
            style={{
              opacity: 1 - p,
              transform: `translate(calc(-50% + ${h.dx}px), ${h.dy * p}px) scale(${0.6 + p * 0.6})`,
            }}
          />
        );
      })}
    </>
  );
};
