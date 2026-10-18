import React from 'react';
import {
  Search,
  ShieldCheck,
  Check,
  UserPlus,
  MessageSquare,
  ArrowUpRight,
  SlidersHorizontal,
  Award,
} from 'lucide-react';
import {
  DemoWindow,
  AppHeaderBar,
  SceneCaption,
  SceneImg,
  TapCursor,
  SceneToast,
  VerifiedShield,
  DistanceChip,
  AdHook,
  KineticBeat,
  AdPunchline,
} from './chrome';
import { enterStyle, phase, easeOutCubic, typedText, tickNumber, adTiming, contentClock } from '../sceneKit';
import { DoctorAvatar } from '../../../common/DoctorAvatar';

/**
 * SPOT 01 — DIRECTORY (13.5s ad, see brag-output/brag-plan.md)
 * HOOK "The right specialist exists…" → real Peer Directory proof → punchline.
 * Real data: Dr. Amara Thorne (99% · Apex Ophthalmic Consultants, Boston)
 * and Dr. Maya Lin (93% · UW Medicine Eye Institute, Seattle).
 * Authored once at 1280×720 — identical composition on every device.
 */
export const DirectoryScene: React.FC<{ t: number }> = ({ t: tG }) => {
  const DURATION = 13500;
  const CONTENT_DURATION = 10000;
  const { REVEAL_END, PUNCH_AT } = adTiming(DURATION);
  // proof content keeps its authored timings, speed-squeezed into the ad contract
  const t = contentClock(tG, REVEAL_END, PUNCH_AT, CONTENT_DURATION);

  const query = typedText(t, 500, 2100, 'glaucoma');
  const showCaret = t % 700 < 380;

  // chip click at ~2.5s → results
  const chipActive = t >= 2500;
  const results = t >= 3100;
  const count = tickNumber(t, 3100, 3900, 1284, 2);

  // Connect tap on Amara at 5.7s
  const connected = t >= 6000;
  const flipP = easeOutCubic(phase(t, 6000, 6500));
  const pulse = t >= 5200 && t < 6000;

  // concordance micro-bars fill as the cards land
  const barA = easeOutCubic(phase(t, 3300, 4100));
  const barB = easeOutCubic(phase(t, 3800, 4600));
  // hover-lift on Amara's card while the cursor approaches the Connect button
  const hoverA = easeOutCubic(phase(t, 5100, 5500)) * (1 - phase(t, 6600, 6900));

  const doctors = [
    {
      name: 'Dr. Amara Thorne',
      creds: 'OD, MS, FAAO',
      clinic: 'Apex Ophthalmic Consultants • Boston, MA',
      specialty: 'Glaucoma & Neuro',
      concordance: '99% High',
      barPct: 99,
      bar: barA,
      distance: '2,680 mi away',
      tech: 'Spectralis OCT-A · HFA3',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&auto=format&fit=crop&q=80',
      isNew: false,
      start: 3100,
    },
    {
      name: 'Dr. Maya Lin',
      creds: 'OD, Resident Fellow 2026',
      clinic: 'UW Medicine Eye Institute • Seattle, WA',
      specialty: 'Glaucoma & Neuro',
      concordance: '93% High',
      barPct: 93,
      bar: barB,
      distance: '800 mi away',
      tech: 'Neuro-Rehab · VN',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80',
      isNew: true,
      start: 3650,
    },
  ];

  const chips = ['All Specialties', 'Cornea & Sclerals', 'Pediatric Myopia', 'Glaucoma & Neuro', 'Dry Eye & Aesthetics'];

  return (
    <DemoWindow
      url="focuslinks.app/directory"
      accent="blue"
      t={tG}
      screen={
        <>
          <AppHeaderBar breadcrumb="Directory" />

          <div className="flex-1 min-h-0 relative px-5 pt-3 pb-2">
            <div className="flex flex-col h-full space-y-2">
              {/* — brag spot 01: proof begins under the hook — */}

              {/* slim Peer Directory hero — real banner recipe + shine sweep */}
              <div
                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-900 via-indigo-950 to-neutral-900 px-4 h-[54px] shrink-0 text-white shadow-sm border border-neutral-800 flex items-center justify-between gap-3"
                style={enterStyle(t, 100, 600)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[9px] font-semibold border border-blue-400/30">
                        <ShieldCheck className="h-2.5 w-2.5 text-blue-400" />
                        Verified Optometrist Network
                      </span>
                      <span className="text-[9px] text-neutral-400 font-mono">
                        {tickNumber(t, 200, 900, 0, 1284).toLocaleString()} Optometrists On-Call
                      </span>
                    </div>
                    <h3 className="text-[15px] font-black tracking-tight mt-0.5">Peer Directory</h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-[10px] font-bold text-neutral-200 shrink-0">
                  <SlidersHorizontal className="h-3 w-3" /> Sort: Concordance
                </span>
                {/* cinematic shine sweep */}
                <div
                  className="absolute inset-y-0 w-40 bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
                  style={{ transform: `translateX(${(t - 1200) * 0.7}px) skewX(-14deg)`, opacity: phase(t, 1200, 2600) * (1 - phase(t, 2600, 2900)) }}
                />
              </div>

              {/* omnisearch row */}
              <div
                className="flex items-center h-[40px] shrink-0 rounded-lg border-2 border-neutral-200/90 dark:border-neutral-700 bg-white dark:bg-[#15151c] px-3 shadow-sm"
                style={{ ...enterStyle(t, 300, 800), borderColor: query ? undefined : 'rgba(0,0,0,0)' }}
              >
                <Search className="h-4 w-4 text-neutral-400 shrink-0" />
                <span className="ml-2.5 text-[13px] text-neutral-800 dark:text-neutral-100 font-medium truncate">
                  {query}
                  <span
                    className="inline-block w-[2px] h-3.5 align-middle bg-blue-500 ml-0.5"
                    style={{ opacity: showCaret ? 1 : 0 }}
                  />
                </span>
              </div>

              {/* specialty chips — real labels, cursor clicks Glaucoma & Neuro */}
              <div className="flex items-center gap-1.5 h-[28px] shrink-0 overflow-hidden">
                <span className="text-[10px] font-semibold text-neutral-400 shrink-0">Specialty:</span>
                {chips.map((c, i) => {
                  const isTarget = c === 'Glaucoma & Neuro';
                  const active = chipActive && isTarget;
                  return (
                    <span
                      key={c}
                      className={`px-2.5 py-1 rounded-lg text-[10px] whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/30'
                          : 'bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400'
                      }`}
                      style={enterStyle(t, 900 + i * 90, 1500 + i * 90, 8)}
                    >
                      {c}
                    </span>
                  );
                })}
              </div>

              {/* summary bar — real copy */}
              <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 h-[18px] shrink-0">
                <span>
                  Showing{' '}
                  <strong className="text-neutral-900 dark:text-white font-bold">{results ? count : 1284}</strong>{' '}
                  optometrists
                  {chipActive && ' (1 filter applied)'}
                </span>
                {chipActive && (
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">Clear all filters</span>
                )}
              </div>

              {/* doctor cards — real directory card recipe */}
              <div className="space-y-2">
                {doctors.map((d, di) => (
                  <div
                    key={d.name}
                    className="rounded-xl bg-white dark:bg-[#18181c] border border-neutral-200 dark:border-neutral-800 shadow-sm px-3.5 h-[84px] flex items-center gap-3.5"
                    style={{
                      ...enterStyle(t, d.start, d.start + 550),
                      transform: `${enterStyle(t, d.start, d.start + 550).transform} ${
                        di === 0 && hoverA > 0 ? `translateY(${-2 * hoverA}px)` : ''
                      }`,
                      boxShadow:
                        di === 0 && hoverA > 0
                          ? `0 ${10 * hoverA}px ${24 * hoverA}px -8px rgba(37,99,235,${0.25 * hoverA})`
                          : undefined,
                    }}
                  >
                    <div className="relative shrink-0">
                      <DoctorAvatar
                        src={d.avatar}
                        alt={d.name}
                        className="h-[52px] w-[52px] rounded-full ring-2 ring-neutral-200 dark:ring-neutral-700"
                      />
                      <VerifiedShield className="h-5 w-5 p-[3px] -bottom-1 -right-1" badge="h-3 w-3" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold text-neutral-900 dark:text-white truncate">{d.name}</span>
                        {d.isNew && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/60 px-1.5 py-0 rounded">
                            <Award className="h-2.5 w-2.5" /> NEW FELLOW
                          </span>
                        )}
                      </div>
                      <span className="block text-[11px] font-semibold text-blue-600 dark:text-blue-400 leading-tight">
                        {d.creds} · {d.specialty}
                      </span>
                      <span className="block text-[11px] text-neutral-500 dark:text-neutral-400 truncate leading-tight mt-0.5">
                        {d.clinic}
                      </span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <DistanceChip miles={d.distance} />
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-medium px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                          {d.tech}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 w-[188px]">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[9px] text-neutral-400 font-medium">Peer Concordance</span>
                        <span className="text-[13px] font-black text-blue-600 dark:text-blue-400">{d.concordance}</span>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                          style={{ width: `${d.bar * d.barPct}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-end gap-1.5 mt-1.5">
                        <span className="h-[30px] w-[30px] rounded-lg border border-neutral-200 dark:border-neutral-700/80 bg-white dark:bg-[#202026] flex items-center justify-center text-neutral-500">
                          <MessageSquare className="h-3.5 w-3.5" />
                        </span>
                        <span className="h-[30px] px-2 rounded-lg border border-neutral-200 dark:border-neutral-700/80 bg-white dark:bg-[#202026] text-neutral-900 dark:text-white text-[10px] font-bold flex items-center gap-0.5 whitespace-nowrap">
                          View CV <ArrowUpRight className="h-3 w-3 text-neutral-400 shrink-0" />
                        </span>
                        {/* Amara's connect button flips to Connected */}
                        <span
                          className={`h-[30px] px-2.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors ${
                            d.name === 'Dr. Amara Thorne' && connected
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40'
                              : `bg-blue-600 text-white shadow-sm ${
                                  pulse && d.name === 'Dr. Amara Thorne' ? 'ring-4 ring-blue-500/30' : ''
                                }`
                          } ${d.name !== 'Dr. Amara Thorne' ? 'opacity-90' : ''}`}
                          style={
                            d.name === 'Dr. Amara Thorne'
                              ? { transform: `scale(${1 + flipP * 0.06})` }
                              : undefined
                          }
                        >
                          {d.name === 'Dr. Amara Thorne' && connected ? (
                            <>
                              <Check className="h-3 w-3" /> Connected
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-3 w-3" /> Connect
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* CV peek card — hints at the full profile behind the tap */}
                <div
                  className="rounded-xl border border-dashed border-neutral-300/80 dark:border-neutral-700 bg-white/60 dark:bg-[#141418]/60 px-3.5 h-[52px] flex items-center gap-3.5"
                  style={enterStyle(t, 7400, 8100)}
                >
                  <SceneImg
                    src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=80"
                    alt="Profile CV preview"
                    className="h-9 w-14 rounded-lg shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="block text-[11px] font-bold text-neutral-800 dark:text-neutral-100">
                      Director of Glaucoma Services · Harvard Affiliate
                    </span>
                    <span className="block text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                      Clinical CV · licenses · endorsements · 32 published cases
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 shrink-0 flex items-center gap-0.5">
                    Open <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </div>

              {/* simulated cursor: click chip → click Connect */}
              <TapCursor
                moves={[
                  { start: 2000, end: 3350, x: 58, y: 33, clickAt: 2500 },
                  { start: 5100, end: 6600, x: 88, y: 55, clickAt: 6000 },
                ]}
              />

              <SceneToast t={t} start={6500}>
                <span className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-[12px] font-bold text-white dark:text-neutral-900">
                  Connected · Dr. Amara Thorne
                </span>
              </SceneToast>
            </div>
          </div>

          <SceneCaption
            t={tG}
            beats={[
              [0, 2500, 'The right specialist exists. Finding them is the hard part.'],
              [2500, 4600, 'Peer Directory — 1,284 verified optometrists, on-call'],
              [4600, 6600, 'Type. Filter. Two perfect matches.'],
              [6600, 9200, 'Real profiles — credentials, concordance, distance'],
              [9200, 11300, 'One tap to connect. Open the CV. Done.'],
              [11300, 13500, 'FocusLinks Directory — your network, worldwide.'],
            ]}
          />
        </>
      }
    >
      <AdHook
        t={tG}
        revealAt={2400}
        eyebrow="The referral problem"
        line="The right specialist exists. Finding them is the hard part."
        accent="blue"
        spotNo="01"
      />
      <KineticBeat
        t={tG}
        start={8600}
        end={PUNCH_AT - 200}
        line="Verified. Ranked. One tap away."
        accent="blue"
      />
      <AdPunchline
        t={tG}
        start={PUNCH_AT}
        feature="Directory"
        tagline="Your network, worldwide."
        cta="Open Directory"
        accent="blue"
      />
    </DemoWindow>
  );
};
