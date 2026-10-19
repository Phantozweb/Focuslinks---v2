import React from 'react';
import { Check, UserPlus, Users } from 'lucide-react';
import {
  DemoWindow,
  AppHeaderBar,
  SceneCaption,
  TapCursor,
  SceneToast,
  VerifiedShield,
  AdHook,
  KineticBeat,
  AdPunchline,
} from './chrome';
import { enterStyle, phase, easeOutCubic, tickNumber, adTiming, contentClock } from '../sceneKit';
import { DoctorAvatar } from '../../../common/DoctorAvatar';
import { DIRECTORY_FILTERS, roleById, type EcosystemRoleId } from '../../../../data/ecosystem';

/**
 * WHO CAN JOIN US? — the membership spot (16s, brag contract hook → proof → punchline).
 *
 * HOOK   0 → 2400   "Who can join FocusLinks?" over ghost questions from the community
 * WIPE   2400 → 3050
 * PROOF  3050 → 13900  the real Eye Care Directory: every profession badged, the cursor
 *                      walking the real profession filters (Allied → Research & Academia),
 *                      welcome toasts and the member counter ticking
 * PUNCH  13900 → 16000 "Everyone who moves eye care forward belongs here."
 *
 * Brag law: real members from mockData, real filter labels from DIRECTORY_FILTERS,
 * real role badges from ECOSYSTEM_ROLES — a frozen frame reads like a screenshot.
 * Authored once at 1280×720 — identical composition on every device.
 */

const DURATION = 16000;
/** proof window (PUNCH_AT − REVEAL_END) → content plays at exactly 1× */
const CONTENT_DURATION = 10850;

interface Member {
  role: EcosystemRoleId;
  name: string;
  line: string;
  org: string;
  avatar: string;
}

/** Real members from the app's mock data — three professions per beat, one per slot. */
const PHASE_CAST: Member[][] = [
  [
    {
      role: 'ophthalmologist',
      name: 'Dr. Hannah Weiss',
      line: 'Glaucoma Specialist & Surgeon',
      org: 'Great Lakes Eye & Glaucoma Center · Chicago, IL',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    },
    {
      role: 'optometrist',
      name: 'Dr. Amara Thorne',
      line: 'OD, MS, FAAO · Glaucoma & Neuro',
      org: 'Apex Ophthalmic Consultants · Boston, MA',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&auto=format&fit=crop&q=80',
    },
    {
      role: 'optician',
      name: 'James Whitfield',
      line: 'Master Ophthalmic Optician',
      org: 'Lakeshore Optical Studio · Oakland, CA',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    },
  ],
  [
    {
      role: 'orthoptist',
      name: 'Sofia Marchetti',
      line: 'Certified Orthoptist · Strabismus & Amblyopia',
      org: "Children's Hospital of Philadelphia · Philadelphia, PA",
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    },
    {
      role: 'ophthalmic-nurse',
      name: 'Grace Adeyemi',
      line: 'Ophthalmic Nurse Specialist · Intravitreal Clinic',
      org: 'Emory Eye Center · Atlanta, GA',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&auto=format&fit=crop&q=80',
    },
    {
      role: 'ophthalmic-technician',
      name: 'Derek Santos',
      line: 'Ophthalmic Technician & Imaging Lead',
      org: 'Retina Consultants of the Gulf Coast · Houston, TX',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    },
  ],
  [
    {
      role: 'vision-scientist',
      name: 'Dr. Leila Haddad',
      line: 'Visual Neuroscientist · Adaptive Optics',
      org: 'Stanford Byers Eye Institute · Palo Alto, CA',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&auto=format&fit=crop&q=80',
    },
    {
      role: 'educator',
      name: 'Dr. Alison Hartley',
      line: 'Professor of Clinical Optometry',
      org: 'The Ohio State University College of Optometry · Columbus, OH',
      avatar: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=200&auto=format&fit=crop&q=80',
    },
    {
      role: 'resident',
      name: 'Dr. Andre Boucher',
      line: 'Ophthalmology Resident (PGY-3)',
      org: 'Wills Eye Hospital · Philadelphia, PA',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&auto=format&fit=crop&q=80',
    },
  ],
];

/** content-clock beat boundaries: All → Allied click → Research & Academia click */
const PHASE_STARTS = [0, 3700, 6600];
const PHASE_COUNTS = [1240, 412, 233];

export const WhoJoinsScene: React.FC<{ t: number }> = ({ t: tG }) => {
  const { REVEAL_END, PUNCH_AT } = adTiming(DURATION);
  // proof content keeps its authored timings, speed-squeezed into the ad contract
  const t = contentClock(tG, REVEAL_END, PUNCH_AT, CONTENT_DURATION);

  // active profession phase: 0 = All, 1 = Allied clicked, 2 = Research & Academia clicked
  const phaseIdx = t >= PHASE_STARTS[2] ? 2 : t >= PHASE_STARTS[1] ? 1 : 0;
  const cast = PHASE_CAST[phaseIdx];

  // summary count ticks down as the filter applies
  const shownCount =
    phaseIdx === 0
      ? PHASE_COUNTS[0]
      : phaseIdx === 1
        ? tickNumber(t, 3700, 4100, PHASE_COUNTS[0], PHASE_COUNTS[1])
        : tickNumber(t, 6600, 7000, PHASE_COUNTS[1], PHASE_COUNTS[2]);

  // member counter in the banner ticks up as new members land late in the spot
  const bannerCount = tickNumber(t, 8600, 10200, 12400, 12404);

  return (
    <DemoWindow
      url="focuslinks.app/directory"
      accent="rose"
      t={tG}
      screen={
        <>
          <AppHeaderBar breadcrumb="Eye Care Directory" />

          <div className="flex-1 min-h-0 relative px-5 pt-3 pb-2">
            <div className="flex flex-col h-full space-y-2">
              {/* — the membership proof begins under the hook — */}

              {/* slim directory hero — real banner recipe + shine sweep */}
              <div
                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-900 via-indigo-950 to-neutral-900 px-4 h-[54px] shrink-0 text-white shadow-sm border border-neutral-800 flex items-center justify-between gap-3"
                style={enterStyle(t, 100, 600)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[9px] font-semibold border border-blue-400/30">
                        <Users className="h-2.5 w-2.5 text-blue-300" />
                        Verified Eye Care Network
                      </span>
                      <span className="text-[9px] text-neutral-400 font-mono">
                        {bannerCount.toLocaleString()} Professionals · 94 Countries
                      </span>
                    </div>
                    <h3 className="text-[15px] font-black tracking-tight mt-0.5">Eye Care Directory</h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-[10px] font-bold text-neutral-200 shrink-0">
                  12 Professions Inside
                </span>
                {/* cinematic shine sweep */}
                <div
                  className="absolute inset-y-0 w-40 bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
                  style={{ transform: `translateX(${(t - 1200) * 0.7}px) skewX(-14deg)`, opacity: phase(t, 1200, 2600) * (1 - phase(t, 2600, 2900)) }}
                />
              </div>

              {/* profession filter chips — the REAL directory filter labels */}
              <div className="flex items-center gap-1.5 h-[28px] shrink-0 overflow-hidden">
                {DIRECTORY_FILTERS.map((f, i) => {
                  const isAllied = f.id === 'allied';
                  const isResearch = f.id === 'research';
                  const active =
                    (isAllied && t >= 3400 && t < 6300) || (isResearch && t >= 6300) || (f.id === 'all' && t < 3400);
                  return (
                    <span
                      key={f.id}
                      className={`px-2 py-1 rounded-lg text-[9.5px] whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/30'
                          : 'bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400'
                      }`}
                      style={enterStyle(t, 500 + i * 80, 1100 + i * 80, 8)}
                    >
                      {f.label}
                    </span>
                  );
                })}
              </div>

              {/* summary bar — real copy */}
              <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 h-[18px] shrink-0">
                <span>
                  Showing{' '}
                  <strong className="text-neutral-900 dark:text-white font-bold">{shownCount.toLocaleString()}</strong>{' '}
                  eye care professionals
                  {phaseIdx > 0 && ' (1 filter applied)'}
                </span>
                {phaseIdx > 0 && (
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">Clear all filters</span>
                )}
              </div>

              {/* member cards — every slot shows a different profession, badged */}
              <div className="space-y-2">
                {cast.map((m, mi) => {
                  const role = roleById(m.role);
                  const start = (phaseIdx === 0 ? 1000 : PHASE_STARTS[phaseIdx] + 300) + mi * 260;
                  return (
                    <div
                      key={`${phaseIdx}-${m.name}`}
                      className="rounded-xl bg-white dark:bg-[#18181c] border border-neutral-200 dark:border-neutral-800 shadow-sm px-3.5 h-[84px] flex items-center gap-3.5"
                      style={enterStyle(t, start, start + 520)}
                    >
                      <div className="relative shrink-0">
                        <DoctorAvatar
                          src={m.avatar}
                          alt={m.name}
                          className="h-[52px] w-[52px] rounded-full ring-2 ring-neutral-200 dark:ring-neutral-700"
                        />
                        <VerifiedShield className="h-5 w-5 p-[3px] -bottom-1 -right-1" badge="h-3 w-3" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="text-[15px] font-bold text-neutral-900 dark:text-white truncate block">
                          {m.name}
                        </span>
                        <span className="block text-[11px] font-semibold text-blue-600 dark:text-blue-400 leading-tight truncate">
                          {m.line}
                        </span>
                        <span className="block text-[11px] text-neutral-500 dark:text-neutral-400 truncate leading-tight mt-0.5">
                          {m.org}
                        </span>
                      </div>

                      <div className="shrink-0 flex flex-col items-end gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold ${role.badgeClasses}`}
                        >
                          <role.icon className="h-3 w-3" aria-hidden="true" />
                          {role.label}
                        </span>
                        <span className="h-[28px] px-2.5 rounded-lg bg-blue-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                          <UserPlus className="h-3 w-3" /> Connect
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* the rest of the ecosystem — one quiet dashed line */}
                <div
                  className="rounded-xl border border-dashed border-neutral-300/80 dark:border-neutral-700 bg-white/60 dark:bg-[#141418]/60 px-3.5 h-[46px] flex items-center justify-between gap-3"
                  style={enterStyle(t, 2400, 3000)}
                >
                  <span className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 truncate">
                    + Students, residents, industry &amp; public-health specialists — every discipline verified
                  </span>
                  <span className="text-[10px] font-black text-neutral-400 shrink-0">9 MORE ROLES</span>
                </div>
              </div>

              {/* simulated cursor: click Allied → click Research & Academia */}
              <TapCursor
                moves={[
                  { start: 2700, end: 3950, x: 44, y: 18, clickAt: 3400 },
                  { start: 5600, end: 6850, x: 64, y: 18, clickAt: 6300 },
                ]}
              />

              {/* welcome toast — a profession that isn't on the cards above */}
              <SceneToast t={t} start={8000}>
                <span className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-[12px] font-bold text-white dark:text-neutral-900">
                  Welcome, Osazee Agbonlahor — Public Health &amp; Rehabilitation
                </span>
              </SceneToast>
            </div>
          </div>

          <SceneCaption
            t={tG}
            beats={[
              [0, 3050, 'The question we hear every day: "Who can join?"'],
              [3050, 6450, 'Eye Care Directory — every profession, one verified network'],
              [6450, 9350, 'Orthoptics, nursing & imaging — all inside'],
              [9350, 11500, 'Research & academia — publishing and teaching here'],
              [11500, 13900, 'New members join every discipline, every day'],
              [13900, 16000, 'FocusLinks — a seat for every eye care professional'],
            ]}
          />
        </>
      }
    >
      <AdHook
        t={tG}
        revealAt={2400}
        eyebrow="The membership question"
        line="Who can join FocusLinks?"
        accent="rose"
        bubbles={["I'm an optician…", 'Do residents count?', "I'm a nurse — me?", 'What about PhDs?']}
      />
      <KineticBeat
        t={tG}
        start={10200}
        end={PUNCH_AT - 200}
        line="Every discipline. One verified network."
        accent="rose"
      />
      <AdPunchline
        t={tG}
        start={PUNCH_AT}
        feature="Open to All"
        tagline="Everyone who moves eye care forward belongs here."
        cta="Claim your free ID"
        accent="rose"
      />
    </DemoWindow>
  );
};
