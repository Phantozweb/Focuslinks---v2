import React from 'react';
import { Search, BarChart3, FileText, ImageIcon, ListChecks, ArrowUpRight, Flame } from 'lucide-react';
import { DemoWindow, SceneTopBar, DemoAvatar, SceneCaption } from './chrome';
import { enterStyle, phase, easeOutCubic, easeOutBack, tickNumber } from '../sceneKit';

/**
 * EXPLORE — "Everything the community posted, in one mix."
 * Story: filter chips pop → a masonry wall of mixed post types (case image,
 * poll, pearl, article) cascades in → poll bar fills live → a tile lifts on
 * hover showing "Open case". Duration 10.5s.
 */
export const ExploreScene: React.FC<{ t: number }> = ({ t }) => {
  const DURATION = 10500;

  const chips = ['All', 'Cases', 'Pearls', 'Polls', 'Articles'];
  const searches = tickNumber(t, 800, 1800, 240, 1284);

  const pollPct = t < 5800 ? 0 : t < 7600 ? easeOutCubic(phase(t, 5800, 7600)) : 1;

  const lift = t >= 8200;
  const liftP = easeOutCubic(phase(t, 8200, 8800));

  return (
    <DemoWindow url="focuslinks.app/explore" accent="bg-amber-500">
      <div className="flex flex-col h-full">
        <SceneTopBar
          title="Explore"
          right={
            <span className="flex items-center gap-1 text-[9px] font-black text-amber-600 dark:text-amber-400">
              <Flame className="h-3 w-3" /> Trending
            </span>
          }
        />

        {/* search + chips */}
        <div className="px-4 pt-3">
          <div className="flex items-center gap-2">
            <div className="h-8 flex-1 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#15151b] flex items-center gap-2 px-3 shadow-sm">
              <Search className="h-3 w-3 text-neutral-400" />
              <span className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500">
                Search cases, pearls, polls…
              </span>
              <span className="ml-auto text-[8.5px] font-black text-neutral-400 dark:text-neutral-500">
                <span className="text-amber-600 dark:text-amber-400 font-black">{searches}</span> posts
              </span>
            </div>
          </div>
          <div className="flex gap-1.5 mt-2.5">
            {chips.map((c, i) => {
              const isActive = i === 0;
              const p = easeOutBack(phase(t, 900 + i * 130, 1300 + i * 130));
              return (
                <span
                  key={c}
                  className={`px-2.5 py-1 rounded-full text-[9px] font-bold border ${
                    isActive
                      ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                      : 'bg-white dark:bg-[#15151b] border-neutral-200/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300'
                  }`}
                  style={{ opacity: p, transform: `scale(${0.7 + 0.3 * p})` }}
                >
                  {c}
                </span>
              );
            })}
          </div>
        </div>

        {/* masonry wall — CSS columns for true masonry */}
        <div className="flex-1 px-4 pt-3 pb-3 columns-2 sm:columns-3 gap-2 [column-fill:balance] overflow-hidden">
          {/* Case tile with mock OCT gradient image */}
          {(() => {
            const base = enterStyle(t, 1900, 2500);
            return (
            <div
              className="break-inside-avoid mb-2 rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#15151b] shadow-sm"
              style={{ opacity: base.opacity, transform: lift ? `scale(${1 + 0.03 * liftP}) translateY(${-2 * liftP}px)` : base.transform }}
            >
            <div className="h-16 relative bg-gradient-to-br from-slate-800 via-slate-900 to-black">
              {/* mock OCT arcs */}
              <svg viewBox="0 0 200 70" className="absolute inset-0 w-full h-full opacity-80" aria-hidden="true">
                <path d="M20 45 Q100 10 180 45" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                <path d="M25 52 Q100 24 175 52" stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.7" />
                <path d="M35 58 Q100 38 165 58" stroke="#0369a1" strokeWidth="1.8" fill="none" opacity="0.5" />
                <circle cx="112" cy="34" r="4" fill="#f43f5e" opacity="0.9" />
              </svg>
              <span className="absolute top-1.5 left-1.5 text-[7.5px] font-black text-white/90 bg-black/40 rounded-full px-1.5 py-0.5 flex items-center gap-0.5">
                <ImageIcon className="h-2 w-2" /> OCT · Case
              </span>
            </div>
            <div className="p-2">
              <div className="text-[9px] font-bold text-neutral-900 dark:text-white leading-tight line-clamp-2">
                Subfoveal fluid — observe or refer? Full OCT workup inside
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <DemoAvatar name="Amara Osei" size={14} />
                <span className="text-[7.5px] font-bold text-neutral-400 truncate">Dr. Amara Osei · 214 views</span>
              </div>
            </div>
          </div>
          );
          })()}

          {/* Poll tile with live-filling bar */}
          <div
            className="break-inside-avoid mb-2 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#15151b] p-2 shadow-sm"
            style={enterStyle(t, 2300, 2900)}
          >
            <span className="text-[7.5px] font-black text-violet-600 dark:text-violet-400 flex items-center gap-1 mb-1">
              <BarChart3 className="h-2 w-2" /> POLL · Dry Eye
            </span>
            <div className="text-[9px] font-bold text-neutral-900 dark:text-white leading-tight">
              First-line for evaporative MGD?
            </div>
            <div className="mt-1.5 space-y-1">
              {[
                ['Lid hygiene + heat', 62],
                ['Omega-3 only', 14],
                ['IPL referral', 24],
              ].map(([label, pct], i) => (
                <div key={label as string}>
                  <div className="flex justify-between text-[7.5px] font-bold text-neutral-500 dark:text-neutral-400">
                    <span>{label}</span>
                    <span>{Math.round((pct as number) * pollPct)}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${i === 0 ? 'bg-violet-500' : 'bg-violet-300 dark:bg-violet-700'}`}
                      style={{ width: `${(pct as number) * pollPct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pearl tile */}
          <div
            className="break-inside-avoid mb-2 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#15151b] p-2 shadow-sm"
            style={enterStyle(t, 2700, 3300)}
          >
            <span className="text-[7.5px] font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-1">
              <ListChecks className="h-2 w-2" /> PEARL
            </span>
            <div className="text-[9px] font-bold text-neutral-900 dark:text-white leading-tight">
              Foggy sclerals? Check the vaulting first, edge then.
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <DemoAvatar name="Ken Watanabe" size={14} />
              <span className="text-[7.5px] font-bold text-neutral-400 truncate">Dr. Ken Watanabe</span>
            </div>
          </div>

          {/* Article tile */}
          <div
            className="break-inside-avoid mb-2 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#15151b] p-2 shadow-sm"
            style={enterStyle(t, 3100, 3700)}
          >
            <span className="text-[7.5px] font-black text-blue-600 dark:text-blue-400 flex items-center gap-1 mb-1">
              <FileText className="h-2 w-2" /> ARTICLE
            </span>
            <div className="text-[9px] font-bold text-neutral-900 dark:text-white leading-tight">
              Myopia control in 2026: what changed this year
            </div>
            <div className="text-[7.5px] font-bold text-neutral-400 mt-1">6 min read · 89 saves</div>
          </div>

          {/* Case discussion tile */}
          <div
            className="break-inside-avoid mb-2 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#15151b] p-2 shadow-sm"
            style={enterStyle(t, 3500, 4100)}
          >
            <span className="text-[7.5px] font-black text-rose-500 flex items-center gap-1 mb-1">
              <ImageIcon className="h-2 w-2" /> SLIT-LAMP · Case
            </span>
            <div className="text-[9px] font-bold text-neutral-900 dark:text-white leading-tight">
              Krukenberg spindle with IOP 24 — workup order?
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <DemoAvatar name="Rafael Domingo" size={14} />
              <span className="text-[7.5px] font-bold text-neutral-400 truncate">32 comments</span>
            </div>
          </div>

          {/* pearl 2 */}
          <div
            className="break-inside-avoid mb-2 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#15151b] p-2 shadow-sm"
            style={enterStyle(t, 3900, 4500)}
          >
            <span className="text-[7.5px] font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-1">
              <ListChecks className="h-2 w-2" /> PEARL
            </span>
            <div className="text-[9px] font-bold text-neutral-900 dark:text-white leading-tight">
              Van Herick at slit lamp: grade it every time, it's free screening
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <DemoAvatar name="Priya Nair" size={14} />
              <span className="text-[7.5px] font-bold text-neutral-400 truncate">Dr. Priya Nair</span>
            </div>
          </div>
        </div>

        {/* hover-lift hint */}
        <div
          className="absolute bottom-9 left-1/2 -translate-x-1/2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[8.5px] font-black px-3 py-1.5 shadow-lg flex items-center gap-1"
          style={{ opacity: liftP, transform: `translate(-50%, ${(1 - liftP) * 8}px)` }}
        >
          Open any post in one tap <ArrowUpRight className="h-2.5 w-2.5" />
        </div>

        <SceneCaption
          t={t}
          duration={DURATION}
          beats={[
            [0, 1900, 'One page mixes every post type the community shares'],
            [1900, 5800, 'Cases, polls, pearls and articles — all in one wall'],
            [5800, 8200, 'Polls fill live so you see real consensus'],
            [8200, 10500, 'Tap anything to open the full discussion'],
          ]}
        />
      </div>
    </DemoWindow>
  );
};
