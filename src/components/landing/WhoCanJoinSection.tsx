import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { ArrowRight, MousePointerClick, UsersRound } from 'lucide-react';
import { StageFrame, SPOT_ACCENT } from './features/scenes/chrome';
import { WhoJoinsScene } from './features/scenes/WhoJoinsScene';

/**
 * WHO CAN JOIN US? — standalone brag-video section (replaces the old
 * phone-simulator demo). Same presentation contract as the showreel:
 * zero media-player chrome — the spot autoplays and loops like a native
 * video embed, drawn once on a fixed 1280×720 canvas, 16:9 everywhere.
 */

const DURATION = 16000; // must match WhoJoinsScene's DURATION

interface WhoCanJoinSectionProps {
  /** e.g. open the free-membership signup flow */
  onJoin?: () => void;
}

export const WhoCanJoinSection: React.FC<WhoCanJoinSectionProps> = ({ onJoin }) => {
  const [elapsed, setElapsed] = useState(0);
  const [inView, setInView] = useState(true);

  const elapsedRef = useRef(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const accentHex = SPOT_ACCENT.rose.hex;

  // pause when off-screen so the spot never burns CPU in the background
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
      elapsedRef.current = DURATION * 0.78;
      setElapsed(elapsedRef.current);
    }
  }, [reduced]);

  // master clock — the spot autoplays and loops
  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = Math.min(Math.max(now - last, 0), 80);
      last = now;
      elapsedRef.current = (elapsedRef.current + delta) % DURATION;
      setElapsed(elapsedRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  return (
    <section
      ref={sectionRef}
      id="who-can-join"
      className="py-16 sm:py-24 bg-[#FAFAFC] dark:bg-[#07070a] relative overflow-hidden border-t border-neutral-200/40 dark:border-neutral-900/40 font-['Plus_Jakarta_Sans',sans-serif]"
    >
      {/* ambient light, same recipe as the other cinema sections */}
      <div className="absolute inset-0 pointer-events-none opacity-45 dark:opacity-25">
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl animate-[pulse_9s_infinite]" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-[pulse_11s_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(#8080800a_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-700 dark:text-neutral-200 uppercase tracking-[0.22em] bg-neutral-100 dark:bg-white/[0.06] px-3.5 py-1.5 rounded-full border border-neutral-200/80 dark:border-white/10">
            <UsersRound className="h-3.5 w-3.5 text-rose-500 dark:text-rose-400" />
            Verified Membership
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mt-4 leading-tight">
            Who Can{' '}
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent">
              Join Us?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-4">
            Not one profession — the entire eye care ecosystem. Watch the real directory as every
            discipline, from surgeons to students, takes its seat in one verified network.
          </p>
        </div>

        {/* ======== cinema frame — pure embedded video, zero controls ======== */}
        <div className="rounded-[1.75rem] sm:rounded-[2rem] bg-[#0a0a0f] border border-neutral-800/80 shadow-2xl shadow-neutral-900/30 dark:shadow-none p-2 sm:p-4">
          <div className="rounded-[1.35rem] sm:rounded-2xl overflow-hidden">
            <StageFrame>
              <WhoJoinsScene t={elapsed} />
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
                Now Showing
              </span>
              <span className="h-3.5 w-px bg-white/15 shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-rose-400 shrink-0">
                Membership
              </span>
              <span className="text-[10.5px] font-medium text-neutral-500 truncate min-w-0">
                — "Who can join FocusLinks?"
              </span>
            </div>
            <button
              onClick={onJoin}
              style={{ boxShadow: `0 8px 24px -8px ${accentHex}66` }}
              className="px-4 py-2 rounded-xl text-white text-xs font-bold inline-flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer shrink-0 self-start sm:self-auto bg-rose-600 hover:bg-rose-500"
            >
              Claim your free ID
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* share-copy line */}
        <p className="mt-5 text-center text-[10.5px] font-medium text-neutral-400 dark:text-neutral-500 flex items-center justify-center gap-1.5">
          <MousePointerClick className="h-3.5 w-3.5 shrink-0" />
          Real interface, real members — every profession verified before it enters the network. Not a video file.
        </p>
      </div>
    </section>
  );
};
