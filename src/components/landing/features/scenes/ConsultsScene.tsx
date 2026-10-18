import React from 'react';
import {
  Stethoscope,
  Plus,
  ArrowUp,
  Check,
  BadgeCheck,
  Eye,
  MessageSquare,
} from 'lucide-react';
import {
  DemoWindow,
  AppHeaderBar,
  SceneCaption,
  SceneImg,
  TapCursor,
  VerifiedShield,
  AdHook,
  KineticBeat,
  AdPunchline,
} from './chrome';
import { enterStyle, phase, easeOutCubic, tickNumber, adTiming, contentClock } from '../sceneKit';
import { DoctorAvatar } from '../../../common/DoctorAvatar';

/**
 * SPOT 03 — CONSULTS (15s ad, see brag-output/brag-plan.md)
 * HOOK: "The OCT doesn't look right. Who do you ask?" → hub → real q-retina-1
 * consult (CSR vs occult Type 1 CNV) with Dr. Sirenjeev's accepted answer.
 * Authored once at 1280×720 — identical composition on every device.
 */
export const ConsultsScene: React.FC<{ t: number }> = ({ t: tG }) => {
  const DURATION = 15000;
  const CONTENT_DURATION = 11500;
  const { REVEAL_END, PUNCH_AT } = adTiming(DURATION);
  const t = contentClock(tG, REVEAL_END, PUNCH_AT, CONTENT_DURATION);

  const hubs = [
    { name: 'Retina & Macula', color: 'bg-amber-500' },
    { name: 'Glaucoma & Neuro', color: 'bg-emerald-500' },
    { name: 'Cornea & Sclerals', color: 'bg-blue-500' },
    { name: 'Pediatrics & Myopia', color: 'bg-purple-500' },
    { name: 'Dry Eye', color: 'bg-sky-500' },
  ];

  const hubSelected = t >= 2300;
  const answersIn = t >= 5200;
  const upvoted = t >= 7300;
  const upvotes = upvoted ? tickNumber(t, 7300, 7900, 98, 99) : 98;
  const voteP = easeOutCubic(phase(t, 7300, 7700));
  // ring pulse on the upvote button right before the tap
  const ringPulse = t >= 6500 && t < 7300 ? 1 + Math.sin(t / 180) * 0.04 : 1;

  return (
    <DemoWindow
      url="focuslinks.app/consults"
      accent="violet"
      t={tG}
      screen={
        <>
          <AppHeaderBar breadcrumb="Consults" />

          <div className="flex-1 min-h-0 relative px-5 pt-3 pb-2">
            <div className="flex flex-col h-full space-y-2">
              {/* hero — real Consults banner recipe */}
              <div
                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 px-4 h-[56px] shrink-0 text-white shadow-lg border border-blue-900/40 flex items-center justify-between gap-3"
                style={enterStyle(t, 100, 600)}
              >
                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-52 h-52 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
                <div className="relative min-w-0">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[9px] font-bold">
                    <Stethoscope className="h-2.5 w-2.5" />
                    Clinical Consults • The Peer Brain Trust
                  </span>
                  <h3 className="text-[15px] font-black tracking-tight mt-0.5">
                    Peer Consults & Second Opinions
                    <span className="ml-2.5 text-[10px] font-medium text-neutral-400 hidden xl:inline">
                      Crowdsourced from verified eye care professionals worldwide
                    </span>
                  </h3>
                </div>
                <span className="relative shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-[11px] shadow-lg shadow-blue-500/30">
                  <Plus className="h-3.5 w-3.5 stroke-[3]" /> Initiate Case Consult
                </span>
              </div>

              {/* hub pills — real topic names & colors */}
              <div className="flex items-center gap-2 h-[30px] shrink-0 overflow-hidden">
                {hubs.map((h, i) => {
                  const active = hubSelected && h.name === 'Retina & Macula';
                  return (
                    <span
                      key={h.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-bold whitespace-nowrap shrink-0 border ${
                        active
                          ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500/40 text-amber-700 dark:text-amber-300 shadow-sm'
                          : 'bg-white dark:bg-[#18181c] border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300'
                      }`}
                      style={enterStyle(t, 1000 + i * 130, 1600 + i * 130, 8)}
                    >
                      <span className={`h-2 w-2 rounded-full ${h.color} shrink-0`} />
                      {h.name}
                      {active && <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400">· 4,820</span>}
                    </span>
                  );
                })}
              </div>

              {/* the real q-retina-1 consult card — with the attached OCT */}
              <div
                className="rounded-xl bg-white dark:bg-[#121216] border border-neutral-200/90 dark:border-neutral-800/90 shadow-sm p-3 flex gap-3.5"
                style={enterStyle(t, 2900, 3500)}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-[9px] font-bold">
                      Retina & Macula
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-[9px] font-bold">
                      Case Consult
                    </span>
                  </div>
                  <h4 className="text-[13px] font-bold text-neutral-900 dark:text-white leading-snug mt-1.5 line-clamp-2">
                    How do you differentiate chronic CSR with flat irregular PED from occult Type 1 CNV on
                    SD-OCT?
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {['47yo M', 'OD 20/40', 'IOP 14 mmHg'].map((m) => (
                      <span
                        key={m}
                        className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                      >
                        {m}
                      </span>
                    ))}
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center gap-0.5">
                      <Eye className="h-2.5 w-2.5" /> Spectralis SD-OCT
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="relative shrink-0">
                        <DoctorAvatar
                          src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80"
                          alt="Dr. Marcus Chen"
                          className="h-7 w-7 rounded-full"
                        />
                        <VerifiedShield className="h-3.5 w-3.5 p-[2px] -bottom-0.5 -right-0.5" badge="h-2 w-2" />
                      </div>
                      <div className="min-w-0 leading-tight">
                        <span className="block text-[11px] font-bold text-neutral-900 dark:text-neutral-100 truncate">
                          Dr. Marcus Chen
                        </span>
                        <span className="block text-[9px] font-medium text-blue-600 dark:text-blue-400">
                          OD, FAAO · 3h ago
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-[10px] font-black">
                        <ArrowUp className="h-3 w-3" /> 142
                      </span>
                      <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-neutral-500 text-[10px] font-bold">
                        <MessageSquare className="h-3 w-3" /> 4
                      </span>
                    </div>
                  </div>
                </div>
                {/* attached B-scan — real imagery recipe */}
                <div className="relative shrink-0 w-[128px] rounded-lg overflow-hidden bg-black self-stretch">
                  <SceneImg
                    src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop&q=80"
                    alt="SD-OCT B-scan attachment"
                    className="absolute inset-0 w-full h-full"
                    gradient="from-neutral-800 to-neutral-950"
                  />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[8px] font-bold text-white border border-white/15">
                    OCT attachment
                  </span>
                </div>
              </div>

              {/* accepted answer — real content distilled from ans-r1-1 */}
              {answersIn && (
                <div
                  className="rounded-xl bg-white dark:bg-[#121216] border border-emerald-500/30 shadow-sm p-3 relative"
                  style={enterStyle(t, 5200, 5800)}
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold">
                      <Check className="h-2.5 w-2.5" /> Accepted Answer
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px] font-bold">
                      <BadgeCheck className="h-2.5 w-2.5" /> Peer Endorsed
                    </span>
                    <span className="text-[9px] font-semibold text-neutral-400">Top consensus</span>
                  </div>
                  <p className="text-[11px] text-neutral-700 dark:text-neutral-200 leading-relaxed mt-1.5 line-clamp-2">
                    "Look for <b>heterogeneous internal reflectivity</b> within the flat irregular PED — assume Type 1
                    CNV until proven otherwise. Stop the nasal steroid, and expedite retina referral if acuity drops a
                    line…"
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <DoctorAvatar
                        src="https://images.unsplash.com/photo-1594824813501-4838e82ef573?w=200&auto=format&fit=crop&q=80"
                        alt="Dr. Sirenjeev"
                        className="h-7 w-7 rounded-full"
                      />
                      <div className="min-w-0 leading-tight">
                        <span className="block text-[11px] font-bold text-neutral-900 dark:text-neutral-100 truncate">
                          Dr. Sirenjeev, OD
                        </span>
                        <span className="block text-[9px] font-medium text-blue-600 dark:text-blue-400">
                          OD, FAAO, FSLS · 1h ago
                        </span>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black transition-colors ${
                        upvoted
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200'
                      }`}
                      style={{
                        transform: `scale(${(upvoted ? 1 + voteP * 0.08 : 1) * ringPulse})`,
                      }}
                    >
                      <ArrowUp className="h-3 w-3" /> {upvotes}
                    </span>
                  </div>
                </div>
              )}

              {/* peer answer teaser */}
              <div
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/70 dark:bg-[#141418]/70 border border-neutral-200/70 dark:border-neutral-800/70 h-[36px] shrink-0"
                style={enterStyle(t, 8300, 8900)}
              >
                <DoctorAvatar
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80"
                  alt="Dr. Sarah Jenkins"
                  className="h-6 w-6 rounded-full"
                />
                <span className="text-[10.5px] font-bold text-neutral-700 dark:text-neutral-200 truncate">
                  Dr. Sarah Jenkins — "Watch for subretinal fibrin & shaggy photoreceptors…"
                </span>
                <span className="ml-auto shrink-0 flex items-center gap-0.5 text-[10px] font-black text-neutral-500 dark:text-neutral-400">
                  <ArrowUp className="h-3 w-3" /> 46
                </span>
              </div>

              {/* ask bar — real quick-consult prompt */}
              <div
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-[#121216] border border-neutral-200/90 dark:border-neutral-800/90 shadow-sm h-[48px] shrink-0"
                style={enterStyle(t, 9300, 9900)}
              >
                <DoctorAvatar
                  src="https://images.unsplash.com/photo-1594824813501-4838e82ef573?w=200&auto=format&fit=crop&q=80"
                  alt="Dr. Sirenjeev"
                  className="h-8 w-8 rounded-full"
                />
                <div className="flex-1 bg-neutral-100/80 dark:bg-[#181820] text-neutral-500 dark:text-neutral-400 text-[11px] px-3 py-2 rounded-lg truncate font-medium">
                  Have a challenging cornea, retina, or glaucoma case, Dr. Sirenjeev?
                </div>
                <span className="px-3 py-2 rounded-lg bg-blue-600 text-white text-[11px] font-extrabold shrink-0 shadow-sm">
                  Ask ODs
                </span>
              </div>

              <TapCursor
                moves={[
                  { start: 1300, end: 3000, x: 16, y: 21, clickAt: 2300 },
                  { start: 6300, end: 8100, x: 89, y: 84, clickAt: 7300 },
                ]}
              />
            </div>
          </div>

          <SceneCaption
            t={tG}
            beats={[
              [0, 2500, "The OCT doesn't look right. Who do you ask?"],
              [2500, 4800, '19 specialty hubs — pick Retina & Macula'],
              [4800, 7600, 'Post the case — 4,820 retina ODs see it'],
              [7600, 10700, 'Peer-endorsed answers rise to consensus'],
              [10700, 12800, 'Ask at 11PM. Read the answer by breakfast.'],
              [12800, 15000, "FocusLinks Consults — answers from ODs who've seen it."],
            ]}
          />
        </>
      }
    >
      <AdHook
        t={tG}
        revealAt={2400}
        eyebrow="11:47 PM · Clinic tomorrow"
        line="The OCT doesn't look right. Who do you ask?"
        accent="violet"
        spotNo="03"
      />
      <KineticBeat
        t={tG}
        start={10300}
        end={PUNCH_AT - 200}
        line="19 hubs. One brain trust."
        accent="violet"
      />
      <AdPunchline
        t={tG}
        start={PUNCH_AT}
        feature="Consults"
        tagline="Answers from ODs who've seen it before."
        cta="Open Consults"
        accent="violet"
      />
    </DemoWindow>
  );
};
