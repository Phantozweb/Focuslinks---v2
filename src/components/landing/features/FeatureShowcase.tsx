import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  Repeat,
  ArrowRight,
  Zap,
  Clapperboard,
  ChevronRight,
  MousePointerClick,
} from 'lucide-react';
import { formatSceneTime, clamp01 } from './sceneKit';
import { SPOT_ACCENT, SpotAccent } from './scenes/chrome';
import { DirectoryScene } from './scenes/DirectoryScene';
import { CirclesScene } from './scenes/CirclesScene';
import { ConsultsScene } from './scenes/ConsultsScene';
import { SpotlightScene } from './scenes/SpotlightScene';
import { ExploreScene } from './scenes/ExploreScene';
import { FeedScene } from './scenes/FeedScene';

interface FeatureShowcaseProps {
  onEnterApp: (destination?: 'feed' | 'consults' | 'qa' | 'gallery' | 'groups' | 'doctors') => void;
}

/**
 * THE SHOWREEL — six brag-style advertisement spots, one per feature.
 * Creative contract: brag-output/brag-plan.md (hook → proof → punchline).
 * No tabs, no feature cards: one screening-room player + a chapter filmstrip.
 */

interface SpotDef {
  id: string;
  no: string;
  name: string;
  hook: string;
  cta: string;
  destination: 'feed' | 'consults' | 'gallery' | 'groups' | 'doctors';
  duration: number;
  accent: SpotAccent;
  Scene: React.FC<{ t: number }>;
}

const SPOTS: SpotDef[] = [
  {
    id: 'directory',
    no: '01',
    name: 'Directory',
    hook: 'The right specialist exists.',
    cta: 'Open Directory',
    destination: 'doctors',
    duration: 13500,
    accent: 'blue',
    Scene: DirectoryScene,
  },
  {
    id: 'circles',
    no: '02',
    name: 'Circles',
    hook: 'Buried in a group chat.',
    cta: 'Open Circles',
    destination: 'groups',
    duration: 14500,
    accent: 'emerald',
    Scene: CirclesScene,
  },
  {
    id: 'consults',
    no: '03',
    name: 'Consults',
    hook: 'Who do you ask?',
    cta: 'Open Consults',
    destination: 'consults',
    duration: 15000,
    accent: 'violet',
    Scene: ConsultsScene,
  },
  {
    id: 'spotlight',
    no: '04',
    name: 'Spotlight',
    hook: 'Share it before it expires.',
    cta: 'Open Spotlight',
    destination: 'feed',
    duration: 13500,
    accent: 'fuchsia',
    Scene: SpotlightScene,
  },
  {
    id: 'explore',
    no: '05',
    name: 'Explore',
    hook: 'One wall. Every post.',
    cta: 'Open Explore',
    destination: 'gallery',
    duration: 14000,
    accent: 'amber',
    Scene: ExploreScene,
  },
  {
    id: 'feed',
    no: '06',
    name: 'Feed',
    hook: 'Only your circle.',
    cta: 'Open Feed',
    destination: 'feed',
    duration: 13500,
    accent: 'sky',
    Scene: FeedScene,
  },
];

/** Static Tailwind classes per spot accent (section chrome only — scenes own theirs). */
const SPOT_UI: Record<SpotAccent, { fill: string; cta: string; text: string }> = {
  blue: { fill: 'bg-blue-500', cta: 'bg-blue-600 hover:bg-blue-500', text: 'text-blue-400' },
  emerald: { fill: 'bg-emerald-500', cta: 'bg-emerald-600 hover:bg-emerald-500', text: 'text-emerald-400' },
  violet: { fill: 'bg-violet-500', cta: 'bg-violet-600 hover:bg-violet-500', text: 'text-violet-400' },
  fuchsia: { fill: 'bg-fuchsia-500', cta: 'bg-fuchsia-600 hover:bg-fuchsia-500', text: 'text-fuchsia-400' },
  amber: { fill: 'bg-amber-500', cta: 'bg-amber-500 hover:bg-amber-400', text: 'text-amber-400' },
  sky: { fill: 'bg-sky-500', cta: 'bg-sky-600 hover:bg-sky-500', text: 'text-sky-400' },
};

/* ---------- animated Connect / Learn / Grow headline ---------- */

const WORDS = [
  { text: 'Connect', grad: 'from-blue-600 via-blue-500 to-indigo-500', bar: 'bg-blue-500' },
  { text: 'Learn', grad: 'from-violet-600 via-violet-500 to-fuchsia-500', bar: 'bg-violet-500' },
  { text: 'Grow', grad: 'from-emerald-600 via-emerald-500 to-teal-500', bar: 'bg-emerald-500' },
] as const;

const AnimatedTriad: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % WORDS.length), 2400);
    return () => clearInterval(id);
  }, [reduced]);

  const word = WORDS[idx];

  return (
    <span className="relative inline-block align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={word.text}
          initial={reduced ? false : { y: '60%', opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={reduced ? undefined : { y: '-60%', opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`inline-block bg-gradient-to-r ${word.grad} bg-clip-text text-transparent pb-1`}
        >
          {word.text}
        </motion.span>
      </AnimatePresence>
      {/* sweeping underline */}
      <motion.span
        key={`bar-${word.text}`}
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`absolute left-0 right-0 -bottom-0.5 h-[3px] rounded-full origin-left ${word.bar}`}
      />
    </span>
  );
};

/* ---------- the screening room ---------- */

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ onEnterApp }) => {
  const [spotIdx, setSpotIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [autoTour, setAutoTour] = useState(true);
  const [inView, setInView] = useState(true);

  const elapsedRef = useRef(0);
  const autoTourRef = useRef(autoTour);
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const spot = SPOTS[spotIdx];
  const duration = spot.duration;
  const Scene = spot.Scene;
  const ui = SPOT_UI[spot.accent];
  const accentHex = SPOT_ACCENT[spot.accent].hex;
  const nextSpot = SPOTS[(spotIdx + 1) % SPOTS.length];
  const totalReel = SPOTS.reduce((a, s) => a + s.duration, 0);

  autoTourRef.current = autoTour;

  // pause when off-screen so the showreel never burns CPU in the background
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // reduced motion: start paused on a fully-populated frame
  useEffect(() => {
    if (reduced) {
      setPlaying(false);
      setAutoTour(false);
      elapsedRef.current = duration * 0.78;
      setElapsed(elapsedRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // master clock — drives the active spot frame-by-frame, advances the tour on wrap
  useEffect(() => {
    if (!playing || !inView) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = Math.min(Math.max(now - last, 0), 80);
      last = now;
      elapsedRef.current += delta;
      if (elapsedRef.current >= duration) {
        elapsedRef.current = 0;
        if (autoTourRef.current && !reduced) {
          setSpotIdx((i) => (i + 1) % SPOTS.length);
        }
      }
      setElapsed(elapsedRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, inView, duration, reduced]);

  const selectSpot = (idx: number) => {
    if (idx === spotIdx) {
      elapsedRef.current = 0;
      setElapsed(0);
      setPlaying(true);
      return;
    }
    setSpotIdx(idx);
    elapsedRef.current = 0;
    setElapsed(0);
    setPlaying(true);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ms = (parseFloat(e.target.value) / 100) * duration;
    elapsedRef.current = ms;
    setElapsed(ms);
  };

  const progressPct = clamp01(elapsed / duration) * 100;

  /** how full each filmstrip chapter should be */
  const chapterFill = (idx: number) => {
    if (idx < spotIdx) return 100;
    if (idx > spotIdx) return 0;
    return progressPct;
  };

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif]"
    >
      {/* header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-700 dark:text-neutral-200 uppercase tracking-[0.22em] bg-neutral-100 dark:bg-white/[0.06] px-3.5 py-1.5 rounded-full border border-neutral-200/80 dark:border-white/10">
          <Clapperboard className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
          The Showreel
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mt-4 leading-tight">
          Features we designed for optometrists to <AnimatedTriad />
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-4">
          Six short spots. One storyline each —{' '}
          <span className="font-bold text-neutral-800 dark:text-neutral-200">hook, proof, punchline</span>{' '}
          — played by the real interface with real data. Not a video file: every frame is
          recoded, seekable and alive.
        </p>
      </div>

      {/* ======== cinema frame ======== */}
      <div className="rounded-[1.75rem] sm:rounded-[2rem] bg-[#0a0a0f] border border-neutral-800/80 shadow-2xl shadow-neutral-900/30 dark:shadow-none p-3 sm:p-5">
        {/* cinema top bar */}
        <div className="flex items-center justify-between gap-3 px-1.5 pb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white shrink-0">
              Spot {spot.no} / 06
            </span>
            <span className="h-3.5 w-px bg-white/15 shrink-0" />
            <span className={`text-[10px] font-black uppercase tracking-[0.18em] shrink-0 ${ui.text}`}>
              {spot.name}
            </span>
            <span className="hidden md:block text-[10.5px] font-medium text-neutral-500 truncate">
              — "{spot.hook}"
            </span>
          </div>
          <span className="font-mono text-[10px] font-bold text-neutral-400 bg-white/[0.06] border border-white/10 px-2 py-1 rounded-lg shrink-0">
            <span className="text-white">{formatSceneTime(elapsed)}</span>
            <span className="mx-1 text-neutral-600">/</span>
            {formatSceneTime(duration)}
          </span>
        </div>

        {/* the spot itself — crossfading between chapters */}
        <AnimatePresence mode="wait">
          <motion.div
            key={spot.id}
            initial={reduced ? false : { opacity: 0, scale: 0.988 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.26 }}
          >
            <Scene t={elapsed} />
          </motion.div>
        </AnimatePresence>

        {/* deck */}
        <div className="mt-3.5 rounded-2xl bg-white/[0.04] border border-white/10 p-3.5 select-none">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progressPct}
            onChange={seek}
            aria-label={`Seek ${spot.name} spot`}
            className="w-full h-1 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-0"
            style={{
              background: `linear-gradient(to right, ${accentHex} ${progressPct}%, rgba(255,255,255,0.14) ${progressPct}%, rgba(255,255,255,0.14) 100%)`,
            }}
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? 'Pause showreel' : 'Play showreel'}
                className="h-8 w-8 rounded-full bg-white text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center"
              >
                {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}
              </button>
              <button
                onClick={() => {
                  elapsedRef.current = 0;
                  setElapsed(0);
                  setPlaying(true);
                }}
                aria-label="Replay this spot from the hook"
                className="h-8 w-8 rounded-full border border-white/15 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-center"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
              <button
                onClick={() => setAutoTour((a) => !a)}
                aria-pressed={autoTour}
                title="Auto tour: play the whole reel, spot after spot"
                className={`h-8 px-2.5 rounded-full border text-[9px] font-black uppercase tracking-wide transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                  autoTour
                    ? 'border-white/25 bg-white/10 text-white'
                    : 'border-white/15 text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <Repeat className="h-3 w-3" />
                <span className="hidden sm:inline">Auto tour</span>
              </button>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[8.5px] font-black uppercase tracking-[0.18em] text-neutral-500 hidden sm:block">
                {Math.round(totalReel / 1000)}s reel · six spots
              </span>
              <span className="text-[8.5px] font-black uppercase tracking-[0.18em] px-2 py-1 rounded-full bg-white text-neutral-900 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                Ad spot
              </span>
            </div>
          </div>
        </div>

        {/* chapter filmstrip — the timeline, not tabs */}
        <div className="mt-3 grid grid-cols-6 gap-1.5" role="tablist" aria-label="Showreel chapters">
          {SPOTS.map((s, idx) => {
            const isActive = idx === spotIdx;
            const su = SPOT_UI[s.accent];
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={isActive}
                aria-label={`Chapter ${s.no}: ${s.name} — ${s.hook}`}
                onClick={() => selectSpot(idx)}
                className={`group relative h-9 sm:h-10 rounded-lg overflow-hidden border transition-colors cursor-pointer ${
                  isActive ? 'border-white/30 bg-white/[0.07]' : 'border-white/[0.07] bg-white/[0.03] hover:border-white/20'
                }`}
              >
                {/* progress fill */}
                <span
                  className={`absolute left-0 top-0 bottom-0 ${su.fill} ${idx < spotIdx ? 'opacity-30' : 'opacity-80'}`}
                  style={{ width: `${chapterFill(idx)}%` }}
                />
                <span className="relative z-10 h-full flex items-center justify-center gap-1.5 px-1">
                  <span
                    className={`font-mono text-[8.5px] sm:text-[9px] font-bold ${
                      isActive ? 'text-white/90' : 'text-neutral-500 group-hover:text-neutral-400'
                    }`}
                  >
                    {s.no}
                  </span>
                  <span
                    className={`hidden sm:block text-[9.5px] font-black tracking-tight truncate ${
                      isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
                    }`}
                  >
                    {s.name}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* CTA + up next */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1.5">
          <button
            onClick={() => onEnterApp(spot.destination)}
            className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold inline-flex items-center gap-2 shadow-lg transition-all hover:scale-[1.02] cursor-pointer self-start sm:self-auto ${ui.cta}`}
          >
            {spot.cta}
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="text-[10px] font-medium text-neutral-500 flex items-center gap-1.5 min-w-0">
            <ChevronRight className="h-3 w-3 shrink-0 text-neutral-600" />
            <span className="truncate">
              Up next ·{' '}
              <span className="font-black text-neutral-300">
                {nextSpot.no} {nextSpot.name}
              </span>{' '}
              — "{nextSpot.hook}"
            </span>
          </p>
        </div>
      </div>

      {/* share-copy line */}
      <p className="mt-5 text-center text-[10.5px] font-medium text-neutral-400 dark:text-neutral-500 flex items-center justify-center gap-1.5">
        <MousePointerClick className="h-3.5 w-3.5 shrink-0" />
        Real interface, real data — recoded frame-by-frame. Not a video file.
      </p>
      <p className="mt-1.5 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-300 dark:text-neutral-600 flex items-center justify-center gap-1.5">
        <Zap className="h-3 w-3" />
        Directed by the brag playbook · hook / proof / punchline
      </p>
    </section>
  );
};
