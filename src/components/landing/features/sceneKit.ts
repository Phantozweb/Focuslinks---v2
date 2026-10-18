import { useState, useEffect, useRef } from 'react';

/**
 * sceneKit — tiny frame-accurate animation toolkit for the feature demos.
 *
 * Every demo scene is a PURE function of elapsed time `t` (ms). A parent
 * "player" advances the clock with requestAnimationFrame, so scenes can be
 * paused, seeked, replayed and looped exactly like a video.
 */

export interface SceneClock {
  /** elapsed ms inside the current loop (0..duration, wraps) */
  t: number;
  /** 0..1 overall progress */
  progress: number;
}

/**
 * Advances a looping clock while `playing`. Deterministic, delta-capped so a
 * backgrounded tab never causes huge jumps.
 */
export function useSceneClock(playing: boolean, duration: number): SceneClock {
  const [t, setT] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);

  useEffect(() => {
    if (!playing) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }
    lastTickRef.current = performance.now();
    const tick = (now: number) => {
      const delta = Math.min(Math.max(now - lastTickRef.current, 0), 80);
      lastTickRef.current = now;
      setT((prev) => (prev + delta >= duration ? prev + delta - duration : prev + delta - duration));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [playing, duration]);

  return { t, progress: Math.min(t / duration, 1) };
}

/* ---------- easing + window helpers (pure, so scenes scrub perfectly) ---------- */

export const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

/** Progress (0..1) of the window [start,end] at time t; clamped before/after. */
export const phase = (t: number, start: number, end: number) => clamp01((t - start) / (end - start));

export const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);
export const easeInOutCubic = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
export const easeOutBack = (p: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
};

/** Slide+fade "in" style for cards entering between [start,end]. */
export const enterStyle = (t: number, start: number, end: number, dist = 14) => {
  const p = easeOutCubic(phase(t, start, end));
  return {
    opacity: p,
    transform: `translateY(${(1 - p) * dist}px)`,
  };
};

/** Typed-text effect: returns the substring visible at time t. */
export const typedText = (t: number, start: number, end: number, text: string) =>
  text.slice(0, Math.round(phase(t, start, end) * text.length));

/** Integer that ticks from a→b across [start,end]. */
export const tickNumber = (t: number, start: number, end: number, a: number, b: number) =>
  Math.round(a + (b - a) * easeOutCubic(phase(t, start, end)));

/** Horizontal fill (0..100%) for progress-style bars. */
export const fillPct = (t: number, start: number, end: number) =>
  `${easeInOutCubic(phase(t, start, end)) * 100}%`;

/** Format ms as 00:0s for the player deck. */
export const formatSceneTime = (ms: number) => {
  const s = Math.floor(ms / 1000) % 60;
  return `00:${s < 10 ? '0' : ''}${s}`;
};
