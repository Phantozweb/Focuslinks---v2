import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Play, 
  Pause, 
  RotateCcw,
  ShieldCheck,
  Lock,
  Users,
  Award,
  MonitorPlay,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MobilePhoneFrame } from './MobilePhoneFrame';
import { InteractiveMobileDemo } from './InteractiveMobileDemo';
import { DemoScene } from './types';

interface ShowcaseScene {
  id: DemoScene;
  title: string;
  desc: string;
  duration: number;
}

export const VideoDemoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [globalElapsed, setGlobalElapsed] = useState(0);
  
  const timerRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);

  const showcaseScenes: ShowcaseScene[] = [
    {
      id: 'feed',
      title: 'Step 1: Optometry Feed & Case Pearls',
      desc: 'Browse trending clinical cases, daily rounds, peer discussions, and diagnostic pearls from verified colleagues.',
      duration: 7000,
    },
    {
      id: 'directory',
      title: 'Step 2: Optometric Peer Network',
      desc: 'Find and connect with fellow optometrists by specialty, credentials, sub-specialty filters, and verified practice location.',
      duration: 7000,
    },
    {
      id: 'typing',
      title: 'Step 3: Clinical Consultation Draft',
      desc: 'Formulate private, patient-privacy conscious clinical inquiries and consultation notes directly to trusted colleagues.',
      duration: 8000,
    },
    {
      id: 'chat',
      title: 'Step 4: Specialized Case Circles',
      desc: 'Join encrypted topic circles to co-manage complex cases, discuss research findings, and grow your optometric practice.',
      duration: 7500,
    }
  ];

  // Calculate global playback times
  const totalDuration = showcaseScenes.reduce((acc, s) => acc + s.duration, 0);

  // Deterministically compute current scene and elapsed time in scene from globalElapsed
  const getSceneInfo = (elapsedMs: number) => {
    let accumulated = 0;
    for (let i = 0; i < showcaseScenes.length; i++) {
      const scene = showcaseScenes[i];
      if (elapsedMs < accumulated + scene.duration || i === showcaseScenes.length - 1) {
        return {
          sceneIdx: i,
          elapsedInScene: Math.max(0, elapsedMs - accumulated),
          sceneStartMs: accumulated,
        };
      }
      accumulated += scene.duration;
    }
    return { sceneIdx: 0, elapsedInScene: 0, sceneStartMs: 0 };
  };

  const { sceneIdx: currentSceneIdx, elapsedInScene } = getSceneInfo(globalElapsed);
  const currentScene = showcaseScenes[currentSceneIdx];

  // Clinical inquiry note text typed out during the 'typing' scene
  const fullNoteText = "Hi Dr. Vance, I'm working with an interesting dry eye case and wanted to get your advice on the best warm compress routine you recommend. What have you found works best in your clinic? Thanks, Dr. Marcus.";

  // Calculate simulated typed note text based on elapsed time inside the typing scene
  let typingText = "";
  if (currentScene.id === 'typing') {
    const progress = Math.min(elapsedInScene / currentScene.duration, 1);
    const charCount = Math.floor(progress * fullNoteText.length);
    typingText = fullNoteText.slice(0, charCount);
  }

  const globalProgressPercent = Math.min((globalElapsed / totalDuration) * 100, 100);

  // Time format helper (00:ss)
  const formatTime = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const secs = totalSecs % 60;
    return `00:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    lastTickRef.current = performance.now();

    const tick = (now: number) => {
      const delta = now - lastTickRef.current;
      lastTickRef.current = now;

      // Cap delta to prevent huge jumps if tab lost focus
      const safeDelta = Math.min(Math.max(delta, 0), 100);

      setGlobalElapsed((prev) => {
        const next = prev + safeDelta;
        if (next >= totalDuration) {
          return 0; // Loop cleanly back to step 1
        }
        return next;
      });

      timerRef.current = requestAnimationFrame(tick);
    };

    timerRef.current = requestAnimationFrame(tick);

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, totalDuration]);

  // Handler to jump directly to any scene (step select)
  const selectSceneIdx = (idx: number) => {
    let startMs = 0;
    for (let i = 0; i < idx; i++) {
      startMs += showcaseScenes[i].duration;
    }
    setGlobalElapsed(startMs);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percent = parseFloat(e.target.value);
    const targetMs = (percent / 100) * totalDuration;
    setGlobalElapsed(targetMs);
  };

  return (
    <section className="py-24 bg-[#FAFAFC] dark:bg-[#07070a] relative overflow-hidden border-t border-neutral-200/40 dark:border-neutral-900/40 font-['Plus_Jakarta_Sans',sans-serif]" id="guided-referral-demo">
      
      {/* Premium ambient light filters */}
      <div className="absolute inset-0 pointer-events-none opacity-45 dark:opacity-25">
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-[pulse_8s_infinite]" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl animate-[pulse_10s_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(#8080800a_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Block designed to be extremely clear & simple */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-black shadow-2xs">
            <Zap className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 animate-pulse shrink-0" />
            <span>Platform Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
            How Optometrists{' '}
            <span className="glossy-shine-text-light dark:glossy-shine-text-dark font-black">
              Connect & Grow
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 font-medium">
            Watch how verified optometrists search for colleagues, share clinical case wisdom, learn from peers, and discuss professional ideas together.
          </p>
        </div>

        {/* Master Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white dark:bg-[#0c0c10] border border-neutral-200/80 dark:border-neutral-900 rounded-3xl p-6 lg:p-10 shadow-xl shadow-neutral-100/40 dark:shadow-none relative">
          
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-t-3xl opacity-80" />

          {/* LEFT: Simple Walkthrough Stages */}
          <div className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <MonitorPlay className="h-4.5 w-4.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Platform Walkthrough</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">Four Walkthrough Steps</h3>
              <p className="text-xs text-neutral-400">Watch the automated walkthrough of your primary network features, or select any step below to preview it instantly.</p>
            </div>

            {/* Walkthrough step selectors */}
            <div className="space-y-2.5">
              {showcaseScenes.map((scene, idx) => {
                const isActive = idx === currentSceneIdx;
                return (
                  <button
                    key={scene.id}
                    onClick={() => selectSceneIdx(idx)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden flex items-start gap-4 cursor-pointer ${
                      isActive 
                        ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-500 shadow-xs scale-[1.01]' 
                        : 'bg-neutral-50/50 dark:bg-[#09090c]/40 border-neutral-200/40 dark:border-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-800'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                    )}
                    
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-black transition-all ${
                      isActive ? 'bg-blue-600 text-white shadow-sm scale-110' : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-500'
                    }`}>
                      {idx + 1}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <h4 className={`text-xs font-black flex items-center gap-2 transition-colors ${
                        isActive ? 'text-neutral-900 dark:text-white' : 'text-neutral-600 dark:text-neutral-400'
                      }`}>
                        <span>{scene.title}</span>
                        {isActive && (
                          <span className="inline-flex h-2 w-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
                        )}
                      </h4>
                      <p className={`text-[11px] leading-relaxed font-medium transition-colors ${
                        isActive ? 'text-neutral-500 dark:text-neutral-300' : 'text-neutral-400 dark:text-neutral-500'
                      }`}>
                        {scene.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Simple Layman explanation block */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#09090d] border border-neutral-200/40 dark:border-neutral-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase font-black text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <span>How This Empowers Your Practice</span>
                </span>
                <span className="text-[9px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200/40 dark:border-emerald-900/30 flex items-center gap-1">
                  <span>100% Verified Community</span>
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal font-medium">
                Our design removes clinical isolation. You can find fellow optometrists, share complex case insights, learn from specialized circles, and co-manage vision solutions with full peace of mind.
              </p>
            </div>
          </div>

          {/* RIGHT: High-fidelity phone frame container acting as player canvas */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
            
            <div className="relative">
              {/* Simple HD Tag */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[9px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md border border-neutral-800 flex items-center gap-1.5 z-30">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span>DEMO MODE</span>
              </div>

              {/* Phone frame containing beautiful, exact mock app UI */}
              <MobilePhoneFrame>
                <InteractiveMobileDemo
                  currentScene={currentScene.id}
                  typingText={typingText}
                  elapsedInScene={elapsedInScene}
                />
              </MobilePhoneFrame>
            </div>

            {/* Video player control deck */}
            <div className="w-full max-w-[340px] mt-6 bg-neutral-100 dark:bg-[#111116] border border-neutral-200/70 dark:border-neutral-850 rounded-2xl p-4 space-y-3.5 shadow-md select-none">
              
              {/* Seek bar line controller */}
              <div className="space-y-1">
                <div className="relative flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={globalProgressPercent}
                    onChange={handleSeek}
                    className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-0"
                    style={{
                      background: `linear-gradient(to right, #2563eb 0%, #2563eb ${globalProgressPercent}%, #e5e7eb ${globalProgressPercent}%, #e5e7eb 100%)`
                    }}
                  />
                </div>
              </div>

              {/* Action and counters row */}
              <div className="flex items-center justify-between">
                
                {/* Left controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-8 w-8 rounded-full bg-white dark:bg-[#181820] hover:bg-neutral-50 dark:hover:bg-[#20202a] border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white transition-all cursor-pointer flex items-center justify-center shadow-xs"
                    title={isPlaying ? "Pause Demo" : "Play Demo"}
                  >
                    {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={() => {
                      setGlobalElapsed(0);
                      setIsPlaying(true);
                    }}
                    className="h-8 w-8 rounded-full bg-white dark:bg-[#181820] hover:bg-neutral-50 dark:hover:bg-[#20202a] border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all cursor-pointer flex items-center justify-center shadow-xs"
                    title="Replay from start"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </button>
                </div>

                {/* Right counters */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 font-mono text-[10px] text-neutral-600 dark:text-neutral-400 font-bold bg-white dark:bg-[#181820] border border-neutral-200/60 dark:border-neutral-800/60 px-2.5 py-1 rounded-lg">
                    <span className="text-blue-600 dark:text-blue-400">{formatTime(globalElapsed)}</span>
                    <span className="text-neutral-300 dark:text-neutral-700">/</span>
                    <span>{formatTime(totalDuration)}</span>
                  </div>
                </div>

              </div>

              {/* Verification lock */}
              <div className="text-center text-[8.5px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest flex items-center justify-center gap-1 bg-white/40 dark:bg-black/20 py-1.5 rounded-xl border border-neutral-200/30 dark:border-neutral-900/40">
                <ShieldCheck className="h-3 w-3 text-blue-500" />
                <span>Verified Optometrist Network</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
