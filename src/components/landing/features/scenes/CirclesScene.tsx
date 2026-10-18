import React from 'react';
import { Users, CalendarDays, Clock, Check, BellRing, MapPin } from 'lucide-react';
import { DemoWindow, SceneTopBar, DemoAvatar, SceneCaption } from './chrome';
import { enterStyle, phase, easeOutCubic, easeOutBack, tickNumber } from '../sceneKit';

/**
 * CIRCLES — "Your community, and every event in one place."
 * Story: pick a circle → members pile in → the shared event board shows
 * what's on and when → RSVP ticks up → reminder lands. The point FocusLinks
 * solves: nobody misses an event because it was buried in a group chat.
 * Duration 11s.
 */
export const CirclesScene: React.FC<{ t: number }> = ({ t }) => {
  const DURATION = 11000;

  const circles = [
    { name: 'Myopia Control', members: 214, active: true },
    { name: 'Sclerals & KC', members: 186, active: false },
    { name: 'Dry Eye', members: 142, active: false },
  ];
  const activeIdx = t < 5200 ? 0 : 1;
  const active = circles[activeIdx];

  // member avatars stack into the active circle, count ticks
  const memberTick = tickNumber(t, 1200, 2400, active.members, active.members + 7);
  const stackP = easeOutBack(phase(t, 1000, 2000));

  // RSVP counter on first event
  const rsvp = tickNumber(t, 6400, 7600, 86, 97);
  const joined = t >= 7600;
  const joinP = easeOutCubic(phase(t, 7600, 8000));

  // reminder banner slides down at 8.8s
  const rem = enterStyle(t, 8800, 9300, -26);

  const events = [
    {
      title: 'Grand Rounds: Retinal Imaging Masterclass',
      when: 'Fri, Nov 14 · 8:00 PM GMT',
      where: 'Live online · 90 min',
      going: 97,
      hot: true,
    },
    {
      title: 'Scleral Fitting Workshop — Case Review',
      when: 'Sun, Nov 23 · 7:30 PM GMT',
      where: 'Live online · 60 min',
      going: 41,
      hot: false,
    },
  ];

  return (
    <DemoWindow url="focuslinks.app/circles" accent="bg-emerald-500">
      <div className="flex flex-col h-full">
        <SceneTopBar
          title="Circles"
          right={
            <span className="flex items-center gap-1 text-[9px] font-bold text-neutral-400 dark:text-neutral-500">
              <Users className="h-3 w-3" /> My circles
            </span>
          }
        />

        {/* Circle chips with member count */}
        <div className="px-4 pt-3 flex gap-1.5 overflow-hidden">
          {circles.map((c, i) => {
            const isActive = i === activeIdx;
            const p = easeOutBack(phase(t, 200 + i * 180, 700 + i * 180));
            return (
              <span
                key={c.name}
                className={`px-2.5 py-1.5 rounded-xl text-[9.5px] font-bold border whitespace-nowrap transition-colors duration-300 ${
                  isActive
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                    : 'bg-white dark:bg-[#15151b] border-neutral-200/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300'
                }`}
                style={{ opacity: p, transform: `scale(${0.7 + 0.3 * p})` }}
              >
                {c.name}
                <span className={`ml-1 ${isActive ? 'text-emerald-100' : 'text-neutral-400'}`}>· {c.members}</span>
              </span>
            );
          })}
        </div>

        {/* Active circle header — avatars pile in */}
        <div className="px-4 pt-3 flex items-center gap-2.5">
          <div className="flex -space-x-1.5" style={{ opacity: Math.min(stackP, 1) }}>
            {['Amara Osei', 'Rafael Domingo', 'Priya Nair', 'Ken Watanabe'].map((n, i) => (
              <span
                key={n}
                style={{
                  transform: `translateY(${(1 - Math.min(Math.max(stackP - i * 0.15, 0), 1)) * 10}px)`,
                  opacity: Math.min(Math.max(stackP - i * 0.15, 0), 1),
                }}
                className="inline-block"
              >
                <DemoAvatar name={n} size={24} ring />
              </span>
            ))}
            <span
              className="h-6 min-w-6 px-1 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[8px] font-black flex items-center justify-center ring-2 ring-white dark:ring-[#16161c]"
              style={{ opacity: Math.min(Math.max(stackP - 0.6, 0), 1) }}
            >
              +9
            </span>
          </div>
          <div>
            <div className="text-[11px] font-black text-neutral-900 dark:text-white">{active.name}</div>
            <div className="text-[8.5px] font-bold text-neutral-400 dark:text-neutral-500">
              <span className="text-emerald-600 dark:text-emerald-400">{memberTick}</span> members · 14 online now
            </div>
          </div>
          <span className="ml-auto text-[8px] font-black px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300">
            You're in
          </span>
        </div>

        {/* Central event board */}
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[8.5px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
              <CalendarDays className="h-3 w-3" /> Circle events · everyone sees them here
            </span>
          </div>

          <div className="space-y-2">
            {events.map((ev, i) => {
              const start = i === 0 ? 4600 : 6000;
              const style = enterStyle(t, start, start + 550);
              const visible = (style.opacity as number) > 0.01;
              if (!visible) return <div key={ev.title} style={{ height: 58 }} />;
              return (
                <div
                  key={ev.title}
                  style={style}
                  className={`rounded-xl border p-2.5 shadow-sm ${
                    ev.hot
                      ? 'border-emerald-300/80 dark:border-emerald-800/80 bg-white dark:bg-[#15151b]'
                      : 'border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#15151b]'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                        ev.hot
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      <CalendarDays className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10.5px] font-bold text-neutral-900 dark:text-white leading-tight truncate">
                        {ev.title}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[8.5px] font-bold text-neutral-500 dark:text-neutral-400">
                        <span className="flex items-center gap-0.5">
                          <Clock className="h-2.5 w-2.5" /> {ev.when}
                        </span>
                        <span className="flex items-center gap-0.5 truncate">
                          <MapPin className="h-2.5 w-2.5" /> {ev.where}
                        </span>
                      </div>
                    </div>
                    {i === 0 ? (
                      <span
                        className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-black transition-colors ${
                          joined ? 'bg-emerald-500 text-white' : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                        }`}
                        style={{ transform: joined ? `scale(${1 + 0.06 * (1 - joinP)})` : 'scale(1)' }}
                      >
                        {joined ? (
                          <>
                            <Check className="h-2.5 w-2.5" style={{ opacity: joinP }} /> Going
                          </>
                        ) : (
                          'Join event'
                        )}
                      </span>
                    ) : (
                      <span className="shrink-0 text-[8.5px] font-black text-neutral-400 dark:text-neutral-500">
                        {ev.going} going
                      </span>
                    )}
                  </div>
                  {ev.hot && (
                    <div className="mt-1.5 flex items-center gap-1">
                      <div className="flex -space-x-1">
                        {['Nadia Hassan', 'Tom Okafor', 'Lena Fischer'].map((n) => (
                          <DemoAvatar key={n} name={n} size={13} ring />
                        ))}
                      </div>
                      <span className="text-[8px] font-bold text-neutral-400 dark:text-neutral-500">
                        <span className="text-emerald-600 dark:text-emerald-400 font-black">{rsvp}</span> optometrists going
                        {joined && ' — you too'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Reminder toast — the "nobody misses it" moment */}
        <div className="px-4 pb-3 mt-auto" style={{ opacity: (rem.opacity as number), transform: `translateY(${(1 - (rem.opacity as number)) * -26}px)` }}>
          <div className="rounded-xl bg-white dark:bg-[#15151b] border border-neutral-200/80 dark:border-neutral-800 shadow-md px-3 py-2 flex items-center gap-2">
            <BellRing className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span className="text-[9px] font-bold text-neutral-700 dark:text-neutral-200 truncate">
              Reminder set · Grand Rounds starts in 2 hours
            </span>
            <span className="ml-auto text-[8px] font-black text-emerald-600 dark:text-emerald-400 shrink-0">Joined ✓</span>
          </div>
        </div>

        <SceneCaption
          t={t}
          duration={DURATION}
          beats={[
            [0, 1000, 'Join circles built around your clinical interests'],
            [1000, 4600, 'Meet the optometrists inside each circle'],
            [4600, 8800, 'Every circle event lives on one shared board — date, time, RSVPs'],
            [8800, 11000, 'Reminders make sure nobody misses it'],
          ]}
        />
      </div>
    </DemoWindow>
  );
};
