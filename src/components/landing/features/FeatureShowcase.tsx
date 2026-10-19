import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Clapperboard, MousePointerClick, Zap } from 'lucide-react';
import { StageFrame } from './scenes/chrome';
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
 *
 * Presentation contract (user): zero media-player chrome. The reel
 * autoplays and loops like a native video embed — no seek bar, no
 * play/pause, no timecode, no chapter tabs. Every spot is drawn once
 * on a fixed 1280×720 canvas and uniformly scaled: 16:9 on every
 * device, the same composition everywhere, nothing ever overlaps.
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
const SPOT_UI: Record<SpotAccent, { dot: string; cta: string; text: string }> = {
  blue: { dot: 'bg-blue-500', cta: 'bg-blue-600 hover:bg-blue-500', text: 'text-blue-400' },
  emerald: { dot: 'bg-emerald-500', cta: 'bg-emerald-600 hover:bg-emerald-500', text: 'text-emerald-400' },
  violet: { dot: 'bg-violet-500', cta: 'bg-violet-600 hover:bg-violet-500', text: 'text-violet-400' },
  fuchsia: { dot: 'bg-fuchsia-500', cta: 'bg-fuchsia-600 hover:bg-fuchsia-500', text: 'text-fuchsia-400' },
  amber: { dot: 'bg-amber-500', cta: 'bg-amber-500 hover:bg-amber-400', text: 'text-amber-400' },
  sky: { dot: 'bg-sky-500', cta: 'bg-sky-600 hover:bg-sky-500', text: 'text-sky-400' },
  rose: { dot: 'bg-rose-500', cta: 'bg-rose-600 hover:bg-rose-500', text: 'text-rose-400' },
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

/* ---------- the embedded reel ---------- */

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ onEnterApp }) => {
  const [spotIdx, setSpotIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [inView, setInView] = useState(true);

  const elapsedRef = useRef(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const spot = SPOTS[spotIdx];
  const duration = spot.duration;
  const Scene = spot.Scene;
  const ui = SPOT_UI[spot.accent];
  const accentHex = SPOT_ACCENT[spot.accent].hex;

  // pause when off-screen so the reel never burns CPU in the background
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // reduced motion: hold a fully-populated "poster" frame, no autoplay
  useEffect(() => {
    if (reduced) {
      elapsedRef.current = duration * 0.78;
      setElapsed(elapsedRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, duration]);

  // master clock — plays the reel straight through, spot after spot
  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = Math.min(Math.max(now - last, 0), 80);
      last = now;
      elapsedRef.current += delta;
      if (elapsedRef.current >= duration) {
        elapsedRef.current = 0;
        setSpotIdx((i) => (i + 1) % SPOTS.length);
      }
      setElapsed(elapsedRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, duration, reduced]);

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
          Features we designed for eye care to <AnimatedTriad />
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-4">
          Six scripted spots —{' '}
          <span className="font-bold text-neutral-800 dark:text-neutral-200">hook, proof, punchline</span>{' '}
          — performed by the real interface with real data. It plays like a video because every
          frame is coded.
        </p>
      </div>

      {/* ======== cinema frame — pure embedded video, zero controls ======== */}
      <div className="rounded-[1.75rem] sm:rounded-[2rem] bg-[#0a0a0f] border border-neutral-800/80 shadow-2xl shadow-neutral-900/30 dark:shadow-none p-2 sm:p-4">
        <div className="rounded-[1.35rem] sm:rounded-2xl overflow-hidden">
          <StageFrame>
            <AnimatePresence mode="wait">
              <motion.div
                key={spot.id}
                className="absolute inset-0"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.28 }}
              >
                <Scene t={elapsed} />
              </motion.div>
            </AnimatePresence>
          </StageFrame>
        </div>

        {/* now-showing strip — the embed's title bar, not a player */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-2 sm:px-3 pt-3.5 pb-1">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
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
            <span className="text-[10.5px] font-medium text-neutral-500 truncate min-w-0">
              — "{spot.hook}"
            </span>
          </div>
          <button
            onClick={() => onEnterApp(spot.destination)}
            style={{ boxShadow: `0 8px 24px -8px ${accentHex}66` }}
            className={`px-4 py-2 rounded-xl text-white text-xs font-bold inline-flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer shrink-0 self-start sm:self-auto ${ui.cta}`}
          >
            {spot.cta}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
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
