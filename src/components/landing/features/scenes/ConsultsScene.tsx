import React from 'react';
import { ArrowBigUp, MessageSquareQuote, Check, Sparkles, Hash, TrendingUp } from 'lucide-react';
import { DemoWindow, SceneTopBar, DemoAvatar, VerifiedChip, SceneCaption } from './chrome';
import { enterStyle, phase, easeOutCubic, easeOutBack, typedText, tickNumber } from '../sceneKit';

/**
 * CONSULTS — "Ask the hub. Get answered by fellows."
 * Story: open a hub → a real clinical question is typed → fellow optometrists'
 * answers stack in → the community upvotes the best one → accepted-answer
 * badge lands. Duration 11.5s.
 */
export const ConsultsScene: React.FC<{ t: number }> = ({ t }) => {
  const DURATION = 11500;

  const hubs = ['Retina & Macula', 'Glaucoma & Neuro', 'Cornea & Sclerals', 'Myopia'];
  const question = typedText(t, 900, 3400, '34M, myopic. OCT shows subtle subfoveal fluid, VA 20/25. Observe or treat?');

  const answers = [
    {
      name: 'Amara Osei',
      creds: 'OD, FAAO · Retina',
      text: 'Watch for 6 weeks with monthly OCT — if EZ disruption appears, refer for anti-VEGF evaluation.',
      votes: [12, 27] as [number, number],
      accepted: true,
      start: 4200,
    },
    {
      name: 'Rafael Domingo',
      creds: 'OD, MPH · Med Retina',
      text: 'Agree with observation. Add FAF + SD-OCT B-scan review each visit — document baseline carefully.',
      votes: [5, 9] as [number, number],
      accepted: false,
      start: 5400,
    },
  ];

  // hub header stats tick up while answers arrive
  const asksTick = tickNumber(t, 4200, 5600, 312, 313);

  return (
    <DemoWindow url="focuslinks.app/consults/retina-macula" accent="bg-violet-500">
      <div className="flex flex-col h-full">
        <SceneTopBar
          title="Consults"
          right={
            <span className="flex items-center gap-1 text-[9px] font-bold text-neutral-400 dark:text-neutral-500">
              <MessageSquareQuote className="h-3 w-3" /> 19 hubs
            </span>
          }
        />

        {/* Hub rail */}
        <div className="px-4 pt-3 flex gap-1.5 overflow-hidden">
          {hubs.map((h, i) => {
            const isActive = i === 0;
            const p = easeOutBack(phase(t, 150 + i * 160, 600 + i * 160));
            return (
              <span
                key={h}
                className={`px-2.5 py-1.5 rounded-xl text-[9.5px] font-bold border whitespace-nowrap ${
                  isActive
                    ? 'bg-violet-600 border-violet-600 text-white shadow-sm'
                    : 'bg-white dark:bg-[#15151b] border-neutral-200/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300'
                }`}
                style={{ opacity: p, transform: `scale(${0.7 + 0.3 * p})` }}
              >
                {h}
              </span>
            );
          })}
        </div>

        {/* Hub header */}
        <div className="px-4 pt-3 flex items-center gap-2">
          <span className="h-7 w-7 rounded-lg bg-violet-500/10 border border-violet-200/60 dark:border-violet-900/60 flex items-center justify-center shrink-0">
            <Hash className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
          </span>
          <div>
            <div className="text-[11.5px] font-black text-neutral-900 dark:text-white leading-none">Retina & Macula Hub</div>
            <div className="text-[8.5px] font-bold text-neutral-400 dark:text-neutral-500 mt-0.5">
              1,248 members · <span className="text-violet-600 dark:text-violet-400 font-black">{asksTick}</span> asks this
              week · 92% answered
            </div>
          </div>
          <span className="ml-auto text-[8.5px] font-black px-2 py-1 rounded-lg bg-violet-600 text-white shadow-sm shrink-0">
            Ask this hub
          </span>
        </div>

        {/* Question card — types itself */}
        <div className="mx-4 mt-2.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#15151b] p-2.5 shadow-sm">
          <div className="flex items-center gap-2">
            <DemoAvatar name="Lena Fischer" size={24} />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-neutral-900 dark:text-white">Lena Fischer</span>
                <span className="text-[8.5px] font-bold text-neutral-400">B.Optom</span>
              </div>
              <div className="text-[8px] font-bold text-neutral-400 dark:text-neutral-500">asked 2 min ago</div>
            </div>
            <span className="ml-auto text-[8px] font-black px-1.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200/60 dark:border-amber-900/60 text-amber-700 dark:text-amber-300 shrink-0">
              Rising
            </span>
          </div>
          <p className="mt-1.5 text-[10px] leading-snug font-medium text-neutral-700 dark:text-neutral-200 min-h-[26px]">
            {question}
            <span className="inline-block w-[1.5px] h-2.5 align-middle bg-violet-500 ml-0.5" style={{ opacity: t % 700 < 350 && t < 3600 ? 1 : 0 }} />
          </p>
        </div>

        {/* Answers stack in */}
        <div className="flex-1 px-4 pt-2.5 pb-3 space-y-2 overflow-hidden">
          {answers.map((a, i) => {
            const style = enterStyle(t, a.start, a.start + 600);
            const visible = (style.opacity as number) > 0.01;
            const votes = tickNumber(t, a.start + 900, a.start + 2100, a.votes[0], a.votes[1]);
            const accP = easeOutCubic(phase(t, a.start + 2400, a.start + 2900));
            if (!visible) return <div key={a.name} style={{ height: 64 }} />;
            return (
              <div
                key={a.name}
                style={style}
                className={`rounded-xl border p-2.5 shadow-sm relative ${
                  a.accepted
                    ? 'border-emerald-300/70 dark:border-emerald-800/70 bg-emerald-50/40 dark:bg-emerald-950/20'
                    : 'border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#15151b]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <DemoAvatar name={a.name} size={22} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9.5px] font-bold text-neutral-900 dark:text-white">{a.name}</span>
                      <VerifiedChip />
                    </div>
                    <span className="text-[8px] font-bold text-neutral-400 dark:text-neutral-500">{a.creds}</span>
                  </div>
                  {/* upvote */}
                  <span
                    className={`shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black border ${
                      i === 0
                        ? 'border-violet-300 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-300'
                    }`}
                  >
                    <ArrowBigUp className={`h-3 w-3 ${i === 0 ? 'fill-violet-500 text-violet-500' : ''}`} />
                    {votes}
                  </span>
                </div>
                <p className="mt-1 text-[9.5px] leading-snug text-neutral-600 dark:text-neutral-300">{a.text}</p>
                {a.accepted && (
                  <span
                    className="mt-1 inline-flex items-center gap-1 text-[8px] font-black text-emerald-700 dark:text-emerald-300"
                    style={{ opacity: accP, transform: `scale(${0.7 + 0.3 * easeOutBack(phase(t, a.start + 2400, a.start + 2900))})` }}
                  >
                    <Check className="h-2.5 w-2.5" /> Top consensus · upvoted by fellows
                  </span>
                )}
              </div>
            );
          })}

          {/* Your answer CTA */}
          <div
            className="rounded-xl border border-dashed border-violet-300/80 dark:border-violet-800/80 px-3 py-2 flex items-center gap-2"
            style={enterStyle(t, 7000, 7500, 8)}
          >
            <Sparkles className="h-3.5 w-3.5 text-violet-500 shrink-0" />
            <span className="text-[9px] font-bold text-violet-700 dark:text-violet-300 truncate">
              Add your opinion — upvotes rank it for 1,248 colleagues
            </span>
            <TrendingUp className="h-3 w-3 text-violet-400 ml-auto shrink-0" />
          </div>
        </div>

        <SceneCaption
          t={t}
          duration={DURATION}
          beats={[
            [0, 900, 'Pick one of 19 specialty hubs'],
            [900, 4200, 'Ask in plain language — your question reaches fellows in minutes'],
            [4200, 7000, 'Fellow optometrists answer with evidence-based opinions'],
            [7000, 11500, 'Upvotes surface the top consensus for everyone who follows'],
          ]}
        />
      </div>
    </DemoWindow>
  );
};
