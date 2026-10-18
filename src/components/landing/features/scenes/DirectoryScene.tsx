import React from 'react';
import { Search, MapPin, SlidersHorizontal, Check, UserPlus, Eye } from 'lucide-react';
import { DemoWindow, SceneTopBar, DemoAvatar, VerifiedChip, SceneCaption } from './chrome';
import { enterStyle, phase, easeOutCubic, typedText, tickNumber } from '../sceneKit';

/**
 * DIRECTORY — "Find the right optometrist in seconds."
 * Story: type a query → filters snap in → matching verified profiles slide up
 * → Connect is tapped and flips to Requested.
 * Duration 10s.
 */
export const DirectoryScene: React.FC<{ t: number }> = ({ t }) => {
  const DURATION = 10000;

  // Search typing beats
  const query = typedText(t, 400, 2100, 'retina specialist');
  const showCaret = t % 800 < 400;

  // Filters pop in after the query lands
  const filters = ['Retina', 'Ocular Disease', 'Asia'];
  const resultsCount = tickNumber(t, 2200, 3000, 1284, 36);

  const doctors = [
    {
      name: 'Amara Osei',
      creds: 'OD, FAAO',
      role: 'Vitreoretinal Consultant · Accra',
      tags: ['Retina', 'OCT Reading'],
      match: '98% match',
      start: 3200,
    },
    {
      name: 'Rafael Domingo',
      creds: 'OD, MPH',
      role: 'Medical Retina · Manila',
      tags: ['Retina', 'Diabetes Clinic'],
      match: '94% match',
      start: 3900,
    },
    {
      name: 'Priya Nair',
      creds: 'B.Optom, FCO',
      role: 'Retina Imaging Lead · Kochi',
      tags: ['Retina', 'Fundus Photography'],
      match: '91% match',
      start: 4600,
    },
  ];

  // Connect CTA: pulse from 6.5s, flip to Requested at 7.4s
  const connectPulse = t > 6500 && t < 7400;
  const requested = t >= 7400;
  const reqP = easeOutCubic(phase(t, 7400, 7900));

  return (
    <DemoWindow url="focuslinks.app/directory" accent="bg-blue-500">
      <div className="flex flex-col h-full">
        <SceneTopBar
          title="Optometrist Directory"
          right={
            <span className="hidden sm:flex items-center gap-1 text-[9px] font-bold text-neutral-400 dark:text-neutral-500">
              <SlidersHorizontal className="h-3 w-3" /> Filters
            </span>
          }
        />

        {/* Search field with typed query */}
        <div className="px-4 pt-3">
          <div className="h-9 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#15151b] flex items-center gap-2 px-3 shadow-sm">
            <Search className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
            <span className="text-[11px] text-neutral-800 dark:text-neutral-100 font-medium truncate">
              {query}
              <span
                className="inline-block w-[1.5px] h-3 align-middle bg-blue-500 ml-0.5"
                style={{ opacity: showCaret ? 1 : 0 }}
              />
            </span>
          </div>

          {/* Filter chips snap in */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5 min-h-[22px]">
            {filters.map((f, i) => {
              const p = easeOutCubic(phase(t, 2300 + i * 220, 2800 + i * 220));
              return (
                <span
                  key={f}
                  className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/70 dark:border-blue-800/70 text-blue-700 dark:text-blue-300 text-[9px] font-bold"
                  style={{ opacity: p, transform: `scale(${0.6 + 0.4 * p})` }}
                >
                  {f} ✕
                </span>
              );
            })}
            <span
              className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 ml-auto"
              style={enterStyle(t, 2900, 3300, 4)}
            >
              <span className="text-blue-600 dark:text-blue-400 font-black">{resultsCount}</span> optometrists
            </span>
          </div>
        </div>

        {/* Result cards */}
        <div className="flex-1 px-4 pt-2.5 pb-3 space-y-2 overflow-hidden">
          {doctors.map((d) => {
            const style = enterStyle(t, d.start, d.start + 600);
            const opacity = (style.opacity as number) || 0;
            if (opacity <= 0.01) return <div key={d.name} style={{ height: 62 }} />;
            return (
              <div
                key={d.name}
                style={style}
                className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#15151b] p-2.5 flex items-center gap-2.5 shadow-sm"
              >
                <DemoAvatar name={d.name} size={34} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-neutral-900 dark:text-white truncate">{d.name}</span>
                    <span className="text-[8.5px] font-bold text-neutral-400 dark:text-neutral-500 shrink-0">{d.creds}</span>
                    <VerifiedChip />
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="h-2.5 w-2.5 text-neutral-400 shrink-0" />
                    <span className="text-[9px] text-neutral-500 dark:text-neutral-400 truncate">{d.role}</span>
                  </div>
                  <div className="flex gap-1 mt-1">
                    {d.tags.map((tg) => (
                      <span
                        key={tg}
                        className="px-1.5 py-px rounded bg-neutral-100 dark:bg-neutral-800 text-[8px] font-bold text-neutral-500 dark:text-neutral-300"
                      >
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-[8px] font-black text-emerald-600 dark:text-emerald-400">{d.match}</span>
                  {d.name === doctors[0].name ? (
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-black transition-colors ${
                        requested
                          ? 'bg-emerald-500 text-white'
                          : connectPulse
                            ? 'bg-blue-600 text-white scale-105'
                            : 'bg-blue-600/90 text-white'
                      }`}
                      style={{ transform: connectPulse ? 'scale(1.07)' : 'scale(1)', transition: 'transform 200ms' }}
                    >
                      {requested ? (
                        <>
                          <Check className="h-2.5 w-2.5" style={{ opacity: reqP }} /> Requested
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-2.5 w-2.5" /> Connect
                        </>
                      )}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-black border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-300">
                      <Eye className="h-2.5 w-2.5" /> View
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Connection-sent toast */}
          <div
            className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-900/60 px-3 py-2 flex items-center gap-2"
            style={enterStyle(t, 8000, 8500, 10)}
          >
            <span className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
              <Check className="h-3 w-3 text-white" />
            </span>
            <span className="text-[9.5px] font-bold text-emerald-700 dark:text-emerald-300">
              Connection request sent — Dr. Osei will see it in her notifications
            </span>
          </div>
        </div>

        {/* progress caption strip */}
        <SceneCaption
          t={t}
          duration={DURATION}
          beats={[
            [0, 2300, 'Search by specialty, credential or city'],
            [2300, 3100, 'Stack filters — results narrow instantly'],
            [3100, 7400, 'Every profile is credential-verified'],
            [7400, 10000, 'One tap sends a connection request'],
          ]}
        />
      </div>
    </DemoWindow>
  );
};
