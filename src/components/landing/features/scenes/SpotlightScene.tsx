import React from 'react';
import { Plus, Eye, Send, Clock3, X, ChevronRight, Heart } from 'lucide-react';
import { DemoWindow, SceneTopBar, DemoAvatar, SceneCaption } from './chrome';
import { enterStyle, phase, easeOutCubic, easeInOutCubic, tickNumber } from '../sceneKit';

/**
 * SPOTLIGHT — "Share a pearl. It lives for 24 hours."
 * Story: story rail with gradient rings → open a story → segment progress
 * bars fill like a story player → slides advance → viewers tick up → back to
 * rail, ring turns seen. Duration 10s.
 */
const SLIDES = [
  {
    author: 'Priya Nair',
    creds: 'Retina Imaging Lead',
    tag: 'OCT Pearl',
    line1: '3 signs the RNFL defect is',
    line2: 'progressing — not artifact',
    accent: 'from-blue-500 to-indigo-600',
    icon: '🔍',
  },
  {
    author: 'Priya Nair',
    creds: 'Retina Imaging Lead',
    tag: 'Clearance Check',
    line1: 'Scleral clearance target:',
    line2: '240µm central — verify on every fit',
    accent: 'from-emerald-500 to-teal-600',
    icon: '👁️',
  },
];

export const SpotlightScene: React.FC<{ t: number }> = ({ t }) => {
  const DURATION = 10000;

  const storyOpen = t >= 1600 && t < 7800;

  // viewer timeline: slide 1 fills 1.9s→4.2s, slide 2 fills 4.3s→7.2s
  const seg1 = storyOpen ? Math.min(easeInOutCubic(phase(t, 1900, 4300)), 1) : 0;
  const seg2 = storyOpen ? Math.min(easeInOutCubic(phase(t, 4400, 7300)), 1) : 0;
  const slideIdx = seg2 > 0 ? 1 : 0;

  // viewers tick while open
  const viewers = tickNumber(t, 2400, 7200, 18, 142);

  // rail ring states: Priya's ring = seen after viewer closes
  const priyaSeen = t >= 7800;
  const rail = [
    { name: 'Your Spotlight', me: true },
    { name: 'Priya Nair', seen: priyaSeen },
    { name: 'Amara Osei', seen: false },
    { name: 'Ken Watanabe', seen: false },
  ];

  // share heart at end
  const heartP = easeOutCubic(phase(t, 6500, 7000));

  return (
    <DemoWindow url="focuslinks.app/spotlight" accent="bg-fuchsia-500">
      <div className="flex flex-col h-full relative">
        <SceneTopBar
          title="Spotlight"
          right={
            <span className="flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-200/60 dark:border-fuchsia-900/60 text-fuchsia-700 dark:text-fuchsia-300">
              <Clock3 className="h-2.5 w-2.5" /> 24h
            </span>
          }
        />

        {/* Story rail */}
        <div className="px-4 pt-3.5 flex gap-3.5" style={{ opacity: storyOpen ? 0 : 1, transition: 'opacity 250ms' }}>
          {rail.map((r, i) => (
            <div key={r.name} className="flex flex-col items-center gap-1" style={enterStyle(t, 150 + i * 140, 500 + i * 140, 10)}>
              <span className="relative inline-block">
                <span
                  className={`rounded-full p-[2.5px] ${
                    r.me
                      ? 'bg-neutral-200 dark:bg-neutral-700'
                      : r.seen
                        ? 'bg-neutral-200 dark:bg-neutral-700'
                        : 'bg-gradient-to-tr from-fuchsia-500 via-violet-500 to-blue-500'
                  }`}
                >
                  <span className="block rounded-full bg-white dark:bg-[#15151b] p-[1.5px]">
                    {r.me ? (
                      <span className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center relative">
                        <Plus className="h-4 w-4 text-neutral-500 dark:text-neutral-300" />
                      </span>
                    ) : (
                      <DemoAvatar name={r.name} size={40} />
                    )}
                  </span>
                </span>
                {!r.me && !r.seen && (
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-fuchsia-500 border-2 border-white dark:border-[#16161c]" />
                )}
              </span>
              <span className="text-[8px] font-bold text-neutral-500 dark:text-neutral-400 max-w-[46px] truncate">
                {r.me ? 'Your story' : r.name.split(' ')[0]}
              </span>
            </div>
          ))}
          <div className="ml-auto self-center text-right hidden sm:block" style={enterStyle(t, 900, 1400, 6)}>
            <div className="text-[9px] font-black text-neutral-900 dark:text-white">Knowledge that expires</div>
            <div className="text-[8px] font-bold text-neutral-400 dark:text-neutral-500">pearls, quick cases, wins — gone in 24h</div>
          </div>
        </div>

        {/* Story viewer overlay */}
        {storyOpen && (
          <div className="absolute inset-x-0 top-11 bottom-8 z-20 mx-3 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {/* gradient slide background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${SLIDES[slideIdx].accent}`} />
            <div className="absolute inset-0 bg-black/25" />

            {/* progress segments */}
            <div className="absolute top-2.5 inset-x-2.5 flex gap-1 z-10">
              <span className="h-[3px] flex-1 rounded-full bg-white/30 overflow-hidden">
                <span className="block h-full bg-white rounded-full" style={{ width: `${seg1 * 100}%` }} />
              </span>
              <span className="h-[3px] flex-1 rounded-full bg-white/30 overflow-hidden">
                <span className="block h-full bg-white rounded-full" style={{ width: `${seg2 * 100}%` }} />
              </span>
              <span className="h-[3px] flex-1 rounded-full bg-white/30" />
            </div>

            {/* viewer header */}
            <div className="absolute top-6 inset-x-3 flex items-center gap-2 z-10">
              <DemoAvatar name="Priya Nair" size={22} ring />
              <span className="text-[10px] font-black text-white">Priya Nair</span>
              <span className="text-[8.5px] font-bold text-white/70">Retina Imaging Lead · 2h left</span>
              <X className="ml-auto h-3.5 w-3.5 text-white/80" />
            </div>

            {/* slide content cross-fades */}
            {SLIDES.map((s, i) => {
              const p = i === 0 ? Math.max(1 - phase(t, 4250, 4550), 0) : Math.min(phase(t, 4350, 4650), 1);
              if (p <= 0.01 && i === 0) return null;
              if (p <= 0.01 && i === 1) return null;
              return (
                <div
                  key={i}
                  className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
                  style={{ opacity: p, transform: `scale(${0.94 + 0.06 * easeOutCubic(p)})` }}
                >
                  <span className="text-3xl mb-2">{s.icon}</span>
                  <span className="text-[8.5px] font-black uppercase tracking-widest text-white/80 bg-white/15 rounded-full px-2.5 py-1 mb-2.5">
                    {s.tag}
                  </span>
                  <p className="text-[15px] leading-snug font-black text-white">
                    {s.line1}
                    <br />
                    {s.line2}
                  </p>
                </div>
              );
            })}

            {/* footer: viewers + reactions */}
            <div className="absolute bottom-3 inset-x-3 flex items-center gap-2 z-10">
              <span className="flex items-center gap-1 text-[9px] font-black text-white bg-black/30 rounded-full px-2.5 py-1.5">
                <Eye className="h-3 w-3" /> {viewers} watching
              </span>
              <span
                className="h-7 w-7 rounded-full bg-black/30 flex items-center justify-center"
                style={{ opacity: 0.6 + 0.4 * heartP, transform: `scale(${1 + 0.25 * heartP})` }}
              >
                <Heart className={`h-3.5 w-3.5 text-white ${heartP > 0.9 ? 'fill-rose-500 text-rose-500' : ''}`} />
              </span>
              <span className="ml-auto flex items-center gap-1.5 text-[9px] font-black text-white bg-white/20 rounded-full px-3 py-1.5">
                <Send className="h-3 w-3" /> Send to connection
              </span>
            </div>
          </div>
        )}

        {/* below-rail area when viewer closed: recent spotlights list */}
        {!storyOpen && (
          <div className="px-4 pt-4 space-y-2" style={enterStyle(t, storyOpen ? 7800 : 0, storyOpen ? 8300 : 1, 8)}>
            {[
              { n: 'Amara Osei', p: 'Post-op day 1 — clamp-free trab success', h: 21 },
              { n: 'Ken Watanabe', p: 'Myopia clinic walk-through in 40s', h: 19 },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#15151b] p-2.5 flex items-center gap-2.5 shadow-sm"
              >
                <DemoAvatar name={s.n} size={26} />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold text-neutral-900 dark:text-white truncate">{s.p}</div>
                  <div className="text-[8px] font-bold text-neutral-400 dark:text-neutral-500">{s.n} · {s.h}h left</div>
                </div>
                <span className="flex items-center gap-0.5 text-[8.5px] font-black text-neutral-400 shrink-0">
                  <Eye className="h-2.5 w-2.5" /> connections only
                </span>
                <ChevronRight className="h-3 w-3 text-neutral-300 shrink-0" />
              </div>
            ))}
            <p className="text-[8.5px] font-bold text-neutral-400 dark:text-neutral-500 text-center pt-1">
              Only your connected network can see your Spotlight
            </p>
          </div>
        )}

        <SceneCaption
          t={t}
          duration={DURATION}
          beats={[
            [0, 1600, 'Fellows post quick pearls to their Spotlight'],
            [1600, 4300, 'Tap in — stories auto-advance like a story player'],
            [4300, 7300, 'Visible only to your connected network'],
            [7300, 10000, 'Every spotlight self-deletes after 24 hours'],
          ]}
        />
      </div>
    </DemoWindow>
  );
};
