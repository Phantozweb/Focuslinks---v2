import React from 'react';
import { Heart, MessageCircle, Bookmark, UserCheck, Image as ImageIcon, Rss } from 'lucide-react';
import { DemoWindow, SceneTopBar, DemoAvatar, SceneCaption } from './chrome';
import { enterStyle, phase, easeOutCubic, easeOutBack, tickNumber } from '../sceneKit';

/**
 * FEED — "A timeline built only from people you follow."
 * Story: Following vs For-you toggle → connection posts slide in one by one →
 * a like ticks up with a heart pop → "new posts" pill drops in. Duration 10s.
 */
export const FeedScene: React.FC<{ t: number }> = ({ t }) => {
  const DURATION = 10000;

  const posts = [
    {
      name: 'Amara Osei',
      creds: 'OD, FAAO',
      kind: 'Case' as const,
      title: 'Grand Rounds case: 58F, sudden arcuate defect. OCT + field inside.',
      body: 'Shared the full workup — first 12 answers pointed to the same missed step. What would you have ordered first?',
      hasImage: true,
      likeFrom: 41,
      likeTo: 63,
      start: 1700,
    },
    {
      name: 'Ken Watanabe',
      creds: 'Pediatric Myopia',
      kind: 'Pearl' as const,
      title: 'Pearl: parents accept myopia control 3× more when you show the axial-length graph.',
      body: 'Plot it live in the consult. Two minutes, changes the whole conversation.',
      hasImage: false,
      likeFrom: 18,
      likeTo: 27,
      start: 3100,
    },
    {
      name: 'Lena Fischer',
      creds: 'B.Optom',
      kind: 'Poll' as const,
      title: 'Do you dilate every first-time myope under 12?',
      body: 'Voting closes tonight — currently 71% yes across 340 clinics.',
      hasImage: false,
      likeFrom: 9,
      likeTo: 14,
      start: 4500,
    },
  ];

  // like pop on post 1
  const likePulse = t > 6300 && t < 7000;
  const heartPop = easeOutBack(phase(t, 6300, 6700));

  // "new posts" pill
  const newPill = enterStyle(t, 7600, 8200, -20);

  return (
    <DemoWindow url="focuslinks.app/feed" accent="bg-blue-500">
      <div className="flex flex-col h-full">
        <SceneTopBar
          title="FocusLinks"
          right={
            <span className="flex items-center gap-1 text-[9px] font-bold text-neutral-400 dark:text-neutral-500">
              <Rss className="h-3 w-3" /> Live
            </span>
          }
        />

        {/* Segmented control + connections row */}
        <div className="px-4 pt-3 flex items-center gap-2">
          <div className="flex rounded-xl bg-neutral-100 dark:bg-neutral-900 p-0.5 border border-neutral-200/60 dark:border-neutral-800">
            <span className="px-3 py-1 rounded-lg bg-white dark:bg-[#1b1b22] text-[9px] font-black text-neutral-900 dark:text-white shadow-sm flex items-center gap-1">
              <UserCheck className="h-2.5 w-2.5 text-blue-500" /> Following
            </span>
            <span className="px-3 py-1 text-[9px] font-bold text-neutral-400">For you</span>
          </div>
          <span className="ml-auto text-[8.5px] font-bold text-neutral-400 dark:text-neutral-500">
            personalised from <span className="text-blue-600 dark:text-blue-400 font-black">your connections</span>
          </span>
        </div>

        {/* Connection avatar strip */}
        <div className="px-4 pt-2.5 flex items-center gap-2" style={enterStyle(t, 400, 900, 8)}>
          <div className="flex -space-x-1.5">
            {['Amara Osei', 'Ken Watanabe', 'Lena Fischer', 'Rafael Domingo', 'Priya Nair'].map((n) => (
              <DemoAvatar key={n} name={n} size={22} ring />
            ))}
          </div>
          <span className="text-[8.5px] font-bold text-neutral-400 dark:text-neutral-500">+38 connections posting today</span>
        </div>

        {/* Posts */}
        <div className="flex-1 px-4 pt-2.5 pb-2 space-y-2 overflow-hidden">
          {posts.map((p, i) => {
            const style = enterStyle(t, p.start, p.start + 600);
            const visible = (style.opacity as number) > 0.01;
            const likes = tickNumber(t, p.start + 800, p.start + 2000, p.likeFrom, p.likeTo);
            if (!visible) return <div key={p.name} style={{ height: 74 }} />;
            const kindStyle =
              p.kind === 'Case'
                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border-rose-200/60 dark:border-rose-900/60'
                : p.kind === 'Pearl'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-900/60'
                  : 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-300 border-violet-200/60 dark:border-violet-900/60';
            return (
              <div
                key={p.name}
                style={style}
                className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#15151b] p-2.5 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <DemoAvatar name={p.name} size={24} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-neutral-900 dark:text-white">{p.name}</span>
                      <span className="text-[8px] font-bold text-neutral-400">{p.creds}</span>
                    </div>
                    <span className="text-[7.5px] font-bold text-neutral-400 dark:text-neutral-500">connection · 2h</span>
                  </div>
                  <span className={`ml-auto text-[7.5px] font-black px-1.5 py-0.5 rounded-full border shrink-0 ${kindStyle}`}>
                    {p.kind}
                  </span>
                </div>
                <p className="mt-1.5 text-[9.5px] font-bold text-neutral-800 dark:text-neutral-100 leading-snug">{p.title}</p>
                <p className="text-[8.5px] text-neutral-500 dark:text-neutral-400 leading-snug line-clamp-2">{p.body}</p>
                {p.hasImage && (
                  <div className="mt-1.5 h-12 rounded-lg bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950 relative overflow-hidden">
                    <svg viewBox="0 0 300 48" className="absolute inset-0 w-full h-full opacity-70" aria-hidden="true">
                      <path d="M10 34 Q80 6 150 30 T290 26" stroke="#38bdf8" strokeWidth="2" fill="none" />
                      <path d="M20 40 Q100 18 180 36 T290 34" stroke="#0284c7" strokeWidth="1.6" fill="none" opacity="0.6" />
                      <rect x="150" y="18" width="26" height="14" rx="3" fill="#f43f5e" opacity="0.85" />
                    </svg>
                    <span className="absolute bottom-1 left-1.5 text-[7px] font-black text-white/80 flex items-center gap-0.5">
                      <ImageIcon className="h-2 w-2" /> OCT B-scan
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3 mt-1.5 pt-1.5 border-t border-neutral-100 dark:border-neutral-800/70">
                  {i === 0 ? (
                    <span
                      className={`flex items-center gap-1 text-[8.5px] font-black ${likePulse ? 'text-rose-500' : 'text-neutral-400 dark:text-neutral-500'}`}
                    >
                      <Heart
                        className={`h-3 w-3 ${likePulse ? 'fill-rose-500 text-rose-500' : ''}`}
                        style={{ transform: likePulse ? `scale(${1 + 0.35 * (1 - Math.abs(heartPop - 0.5) * 2)})` : 'scale(1)' }}
                      />
                      {likes}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[8.5px] font-bold text-neutral-400 dark:text-neutral-500">
                      <Heart className="h-3 w-3" /> {likes}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[8.5px] font-bold text-neutral-400 dark:text-neutral-500">
                    <MessageCircle className="h-3 w-3" /> {i === 0 ? 12 : i === 1 ? 5 : 8}
                  </span>
                  <Bookmark className="h-3 w-3 text-neutral-300 dark:text-neutral-600 ml-auto" />
                </div>
              </div>
            );
          })}
        </div>

        {/* new-posts pill */}
        <div
          className="absolute top-[52px] left-1/2 z-20"
          style={{ opacity: newPill.opacity as number, transform: `translate(-50%, ${(1 - (newPill.opacity as number)) * -20}px)` }}
        >
          <span className="rounded-full bg-blue-600 text-white text-[8.5px] font-black px-3 py-1.5 shadow-lg shadow-blue-600/30 whitespace-nowrap">
            ↑ 2 new posts from your connections
          </span>
        </div>

        <SceneCaption
          t={t}
          duration={DURATION}
          beats={[
            [0, 1700, 'Your feed is built from who you connect with'],
            [1700, 6300, 'Cases, pearls and polls from people you chose to follow'],
            [6300, 7600, 'One tap to like, discuss or save to your vault'],
            [7600, 10000, 'New posts land at the top — never miss your circle'],
          ]}
        />
      </div>
    </DemoWindow>
  );
};
