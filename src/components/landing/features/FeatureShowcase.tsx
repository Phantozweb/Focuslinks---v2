import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  Repeat,
  Search,
  Users,
  MessageSquareQuote,
  Clock3,
  Compass,
  Rss,
  ArrowRight,
  Zap,
  MousePointerClick,
} from 'lucide-react';
import { formatSceneTime, clamp01 } from './sceneKit';
import { DirectoryScene } from './scenes/DirectoryScene';
import { CirclesScene } from './scenes/CirclesScene';
import { ConsultsScene } from './scenes/ConsultsScene';
import { SpotlightScene } from './scenes/SpotlightScene';
import { ExploreScene } from './scenes/ExploreScene';
import { FeedScene } from './scenes/FeedScene';

interface FeatureShowcaseProps {
  onEnterApp: (destination?: 'feed' | 'consults' | 'qa' | 'gallery' | 'groups' | 'doctors') => void;
}

interface FeatureDef {
  id: string;
  name: string;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  destination: 'feed' | 'consults' | 'gallery' | 'groups' | 'doctors';
  duration: number;
  icon: React.ElementType;
  iconClass: string;
  tileClass: string;
  activeClass: string;
  dotClass: string;
  Scene: React.FC<{ t: number }>;
}

const FEATURES: FeatureDef[] = [
  {
    id: 'directory',
    name: 'Directory',
    tag: 'Worldwide optometrist directory',
    title: 'Find the right colleague in seconds',
    description:
      'Search a global directory of verified optometrists. Filter by specialty, credentials and location, open real profiles with experience and endorsements, and send connection requests that turn into referrals, mentorship and co-management.',
    bullets: [
      'Credential-verified profiles with badges',
      'Filter by specialty, city and clinical focus',
      'One tap to connect, view or message',
    ],
    cta: 'Open Directory',
    destination: 'doctors',
    duration: 10000,
    icon: Search,
    iconClass: 'text-blue-600 dark:text-blue-400',
    tileClass: 'bg-blue-500/10 border-blue-200/60 dark:border-blue-900/60',
    activeClass: 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/30 shadow-blue-500/10',
    dotClass: 'bg-blue-500',
    Scene: DirectoryScene,
  },
  {
    id: 'circles',
    name: 'Circles',
    tag: 'Community groups & events',
    title: 'Your community — and every event, in one place',
    description:
      'Join circles built around your clinical interests, post to members who actually get it, and rely on one central event board. Every circle event has a date, time and RSVP list — no more "which event, when?" lost in chat threads.',
    bullets: [
      'Interest-based circles with real member counts',
      'Central event board — date, time, RSVPs',
      'Reminders so nobody misses an event',
    ],
    cta: 'Open Circles',
    destination: 'groups',
    duration: 11000,
    icon: Users,
    iconClass: 'text-emerald-600 dark:text-emerald-400',
    tileClass: 'bg-emerald-500/10 border-emerald-200/60 dark:border-emerald-900/60',
    activeClass: 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 shadow-emerald-500/10',
    dotClass: 'bg-emerald-500',
    Scene: CirclesScene,
  },
  {
    id: 'consults',
    name: 'Consults',
    tag: 'Specialty hubs · Q&A · upvotes',
    title: 'Rising questions, answered by fellows',
    description:
      'Contribute to any hub by posting your queries — Retina, Glaucoma, Cornea, Myopia and 15 more. Fellow optometrists answer, the community upvotes the best opinions, and top consensus rises so everyone learns from it.',
    bullets: [
      '19 specialty hubs to ask and browse',
      'Peer answers ranked by community upvotes',
      'Hub leaderboards reward contributors',
    ],
    cta: 'Open Consults',
    destination: 'consults',
    duration: 11500,
    icon: MessageSquareQuote,
    iconClass: 'text-violet-600 dark:text-violet-400',
    tileClass: 'bg-violet-500/10 border-violet-200/60 dark:border-violet-900/60',
    activeClass: 'border-violet-500 bg-violet-50/70 dark:bg-violet-950/30 shadow-violet-500/10',
    dotClass: 'bg-violet-500',
    Scene: ConsultsScene,
  },
  {
    id: 'spotlight',
    name: 'Spotlight',
    tag: '24-hour knowledge stories',
    title: 'Share a pearl that lives for 24 hours',
    description:
      'Post quick pearls, case wins and walk-throughs to your Spotlight. They auto-advance like a story player, are visible only to your connected network, and disappear after 24 hours — low-pressure sharing, high-value learning.',
    bullets: [
      'Auto-advancing story player',
      'Visible only to your connected network',
      'Self-deletes after 24 hours',
    ],
    cta: 'Open Spotlight',
    destination: 'feed',
    duration: 10000,
    icon: Clock3,
    iconClass: 'text-fuchsia-600 dark:text-fuchsia-400',
    tileClass: 'bg-fuchsia-500/10 border-fuchsia-200/60 dark:border-fuchsia-900/60',
    activeClass: 'border-fuchsia-500 bg-fuchsia-50/70 dark:bg-fuchsia-950/30 shadow-fuchsia-500/10',
    dotClass: 'bg-fuchsia-500',
    Scene: SpotlightScene,
  },
  {
    id: 'explore',
    name: 'Explore',
    tag: 'Everything, in one wall',
    title: 'Cases, pearls, polls — one mixed wall',
    description:
      'Explore mixes every post type the community shares — clinical cases, quick pearls, live polls and articles — into one scrollable wall. Filter by post type, spot what is trending, and open anything straight into the full discussion.',
    bullets: [
      'Mixed post types in one grid',
      'Filter by cases, pearls, polls, articles',
      'One tap opens the full post',
    ],
    cta: 'Open Explore',
    destination: 'gallery',
    duration: 10500,
    icon: Compass,
    iconClass: 'text-amber-600 dark:text-amber-400',
    tileClass: 'bg-amber-500/10 border-amber-200/60 dark:border-amber-900/60',
    activeClass: 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/30 shadow-amber-500/10',
    dotClass: 'bg-amber-500',
    Scene: ExploreScene,
  },
  {
    id: 'feed',
    name: 'Feed',
    tag: 'Personalised from your connections',
    title: 'A timeline built by who you follow',
    description:
      'The feed only shows what matters to you — cases, questions and wins from the people you connected with, newest first. New-post alerts mean you never miss what your circle is discussing.',
    bullets: [
      'Connections-first personalised ordering',
      'New-post alerts from your circle',
      'Like, discuss and save to your vault',
    ],
    cta: 'Open Feed',
    destination: 'feed',
    duration: 10000,
    icon: Rss,
    iconClass: 'text-sky-600 dark:text-sky-400',
    tileClass: 'bg-sky-500/10 border-sky-200/60 dark:border-sky-900/60',
    activeClass: 'border-sky-500 bg-sky-50/70 dark:bg-sky-950/30 shadow-sky-500/10',
    dotClass: 'bg-sky-500',
    Scene: FeedScene,
  },
];

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

/* ---------- the section ---------- */

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ onEnterApp }) => {
  const [featureIdx, setFeatureIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [autoTour, setAutoTour] = useState(true);
  const [inView, setInView] = useState(true);

  const elapsedRef = useRef(0);
  const autoTourRef = useRef(autoTour);
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const feature = FEATURES[featureIdx];
  const duration = feature.duration;
  const Scene = feature.Scene;

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

  // master clock — drives the active scene frame-by-frame, advances the tour on wrap
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
          setFeatureIdx((i) => (i + 1) % FEATURES.length);
        }
      }
      setElapsed(elapsedRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, inView, duration, reduced]);

  const selectFeature = (idx: number) => {
    setFeatureIdx(idx);
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
  const nextFeature = FEATURES[(featureIdx + 1) % FEATURES.length];

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 font-['Plus_Jakarta_Sans',sans-serif]"
    >
      {/* header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800/60">
          <Zap className="h-3 w-3" />
          Platform Features
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mt-4 leading-tight">
          Features we designed for optometrists to <AnimatedTriad />
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-4">
          Six spaces built for everyday optometric practice — pick one below and watch a live, coded
          walkthrough of exactly how it works.
        </p>
      </div>

      {/* feature cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-8">
        {FEATURES.map((f, idx) => {
          const Icon = f.icon;
          const isActive = idx === featureIdx;
          return (
            <button
              key={f.id}
              onClick={() => selectFeature(idx)}
              aria-pressed={isActive}
              className={`group relative rounded-2xl border p-3.5 text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                isActive
                  ? `${f.activeClass} shadow-lg scale-[1.02]`
                  : 'bg-white dark:bg-[#15151b] border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className={`h-8 w-8 rounded-xl border flex items-center justify-center ${f.tileClass}`}>
                  <Icon className={`h-4 w-4 ${f.iconClass}`} />
                </span>
                <span className="text-[9px] font-black font-mono text-neutral-300 dark:text-neutral-600">
                  0{idx + 1}
                </span>
              </div>
              <h3
                className={`text-[13px] font-black tracking-tight ${
                  isActive ? 'text-neutral-900 dark:text-white' : 'text-neutral-700 dark:text-neutral-200'
                }`}
              >
                {f.name}
              </h3>
              <p className="text-[9.5px] font-medium text-neutral-400 dark:text-neutral-500 mt-0.5 leading-snug line-clamp-2 hidden sm:block">
                {f.tag}
              </p>

              {/* story-style progress bar on the active card */}
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-neutral-100 dark:bg-neutral-800">
                <span
                  className={`block h-full ${f.dotClass} transition-none`}
                  style={{ width: isActive ? `${progressPct}%` : '0%' }}
                />
              </span>
            </button>
          );
        })}
      </div>

      {/* showcase player */}
      <div className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#101014] shadow-xl shadow-neutral-100/50 dark:shadow-none overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* story panel */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col border-b lg:border-b-0 lg:border-r border-neutral-200/80 dark:border-neutral-800">
            <AnimatePresence mode="wait">
              <motion.div
                key={feature.id}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                <span
                  className={`inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${feature.tileClass} ${feature.iconClass}`}
                >
                  <feature.icon className="h-3 w-3" />
                  {feature.tag}
                </span>

                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight mt-3.5 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mt-2.5">
                  {feature.description}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {feature.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className={`mt-1 h-2 w-2 rounded-full shrink-0 ${feature.dotClass}`} />
                      <span className="text-xs sm:text-[13px] font-medium text-neutral-700 dark:text-neutral-200">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <button
                    onClick={() => onEnterApp(feature.destination)}
                    className="px-5 py-3 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    {feature.cta}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="mt-3 text-[10px] font-medium text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
                    <MousePointerClick className="h-3 w-3" />
                    Walkthroughs are coded simulations of the real interface — not renders.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* video panel */}
          <div className="lg:col-span-7 bg-neutral-100/70 dark:bg-[#0a0a0e] p-5 sm:p-7 flex flex-col justify-center">
            {/* player header strip */}
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${feature.dotClass}`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${feature.dotClass}`} />
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                  Feature 0{featureIdx + 1} / 06 · {feature.name}
                </span>
              </div>
              <span className="text-[8.5px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
                Demo
              </span>
            </div>

            {/* the scene itself, cross-fading on feature switch */}
            <AnimatePresence mode="wait">
              <motion.div
                key={feature.id}
                initial={reduced ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.28 }}
              >
                <Scene t={elapsed} />
              </motion.div>
            </AnimatePresence>

            {/* deck */}
            <div className="mt-4 bg-white dark:bg-[#111116] border border-neutral-200/70 dark:border-neutral-800 rounded-2xl p-3.5 shadow-sm select-none">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progressPct}
                onChange={seek}
                aria-label={`Seek ${feature.name} walkthrough`}
                className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-0"
                style={{
                  background: `linear-gradient(to right, #2563eb ${progressPct}%, #e5e7eb ${progressPct}%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex items-center justify-between mt-2.5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={playing ? 'Pause walkthrough' : 'Play walkthrough'}
                    className="h-8 w-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center"
                  >
                    {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}
                  </button>
                  <button
                    onClick={() => {
                      elapsedRef.current = 0;
                      setElapsed(0);
                      setPlaying(true);
                    }}
                    aria-label="Replay from start"
                    className="h-8 w-8 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-[#1b1b22] transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => setAutoTour((a) => !a)}
                    aria-pressed={autoTour}
                    title="Auto tour: keep playing every feature"
                    className={`h-8 px-2.5 rounded-full border text-[9px] font-black uppercase tracking-wide transition-colors cursor-pointer inline-flex items-center gap-1 ${
                      autoTour
                        ? 'border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-400 dark:text-neutral-500'
                    }`}
                  >
                    <Repeat className="h-3 w-3" />
                    <span className="hidden sm:inline">Auto tour</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-[#181820] border border-neutral-200/60 dark:border-neutral-800 px-2 py-1 rounded-lg">
                    <span className="text-neutral-900 dark:text-white">{formatSceneTime(elapsed)}</span>
                    <span className="mx-1 text-neutral-300 dark:text-neutral-600">/</span>
                    {formatSceneTime(duration)}
                  </span>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800/70 flex items-center justify-between">
                <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500">
                  {autoTour && !reduced ? (
                    <>
                      Auto tour on · up next{' '}
                      <span className="text-neutral-700 dark:text-neutral-200 font-black">{nextFeature.name}</span>
                    </>
                  ) : (
                    'Pick any card above to jump to its walkthrough'
                  )}
                </span>
                <span className="text-[8px] font-black uppercase tracking-widest text-neutral-300 dark:text-neutral-600 hidden sm:block">
                  100% coded · zero video files
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
