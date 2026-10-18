import React from 'react';
import {
  Sparkles,
  Plus,
  X,
  Stethoscope,
  Share2,
  Heart,
  ChevronRight,
  Eye,
} from 'lucide-react';
import {
  DemoWindow,
  AppHeaderBar,
  SceneCaption,
  SceneImg,
  TapCursor,
  FloatHearts,
  AdHook,
  KineticBeat,
  AdPunchline,
} from './chrome';
import { enterStyle, phase, easeOutCubic, easeOutBack, tickNumber, adTiming, contentClock } from '../sceneKit';
import { DoctorAvatar } from '../../../common/DoctorAvatar';

/**
 * SPOT 04 — SPOTLIGHT (13.5s ad, see brag-output/brag-plan.md)
 * HOOK: "A perfect pearl dies in your camera roll." → real story rail →
 * StoryModal case file (Slit Lamp: Salzmann Nodule, 62yo F) → applaud → 24h.
 * Authored once at 1280×720 — identical composition on every device.
 */
export const SpotlightScene: React.FC<{ t: number }> = ({ t: tG }) => {
  const DURATION = 13500;
  const CONTENT_DURATION = 10000;
  const { REVEAL_END, PUNCH_AT } = adTiming(DURATION);
  const t = contentClock(tG, REVEAL_END, PUNCH_AT, CONTENT_DURATION);

  // tap story 1 at 1.6s → modal in 2.1-2.9s → applaud at 7.3s → close at 8.7s
  const modalP = easeOutCubic(phase(t, 2100, 2900));
  const modalOut = t >= 8700 ? 1 - easeOutCubic(phase(t, 8700, 9200)) : 1;
  const modalScale = Math.min(modalP, modalOut);
  const modalVisible = t >= 2100 && modalOut > 0.01;

  const pressP = easeOutCubic(phase(t, 1600, 1900));

  const applauded = t >= 7300;
  const viewers = applauded ? tickNumber(t, 7300, 7900, 142, 143) : 142;
  const clapP = easeOutBack(phase(t, 7300, 7800));

  const stories = [
    {
      title: 'Slit Lamp: Salzmann Nodule',
      category: 'Cornea',
      modality: 'Slit Lamp Bio',
      author: 'Sirenjeev',
      img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80',
      urgent: false,
    },
    {
      title: 'Biometry: +0.38mm Axial Elongation',
      category: 'Myopia',
      modality: 'Optical Biometry',
      author: 'Marcus',
      img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80',
      urgent: false,
    },
    {
      title: 'EDI-OCT: Early RNFL Notch',
      category: 'Glaucoma',
      modality: 'Spectralis OCT',
      author: 'Amara',
      img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop&q=80',
      urgent: true,
    },
  ];

  const findingIn = (i: number) => enterStyle(t, 4300 + i * 500, 4900 + i * 500, 8);

  return (
    <DemoWindow
      url="focuslinks.app/feed"
      accent="fuchsia"
      t={tG}
      screen={
        <>
          <AppHeaderBar breadcrumb="Feed" />

          <div className="flex-1 min-h-0 relative px-5 pt-3 pb-3">
            {/* Clinical Stories & Highlights — real section recipe */}
            <div
              className="rounded-2xl border border-neutral-200/70 dark:border-white/10 bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl p-3.5 shadow-sm h-full flex flex-col"
              style={enterStyle(t, 100, 600)}
            >
              <div className="flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20 shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[13px] font-bold tracking-tight text-neutral-900 dark:text-neutral-100 truncate">
                        Clinical Stories & Highlights
                      </h3>
                      <span className="flex items-center gap-1 text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-900/50">
                        <span className="h-1 w-1 rounded-full bg-amber-500 animate-pulse" />
                        Daily Rounds
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                      High-yield cases & protocols from verified optometrists
                    </p>
                  </div>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-blue-600 text-white text-[10px] font-bold shadow-sm">
                  <Plus className="h-3 w-3 stroke-[2.5]" /> Post
                </span>
              </div>

              {/* rail: + Post dashed card + real story cards */}
              <div className="flex items-stretch gap-2.5 mt-3 flex-1 min-h-0 overflow-hidden">
                <div
                  className="flex flex-col items-center justify-center text-center px-3 w-36 rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50/70 dark:bg-[#1f1f23]/60 shrink-0"
                  style={{
                    ...enterStyle(t, 500, 1000),
                    boxShadow: t >= 9300 ? '0 0 0 5px rgba(59,130,246,0.15)' : undefined,
                  }}
                >
                  <div className="relative mb-1.5">
                    <DoctorAvatar
                      src="https://images.unsplash.com/photo-1594824813501-4838e82ef573?w=200&auto=format&fit=crop&q=80"
                      alt="You"
                      className="h-11 w-11 rounded-full ring-2 ring-blue-500/30"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-blue-600 text-white p-0.5 shadow-sm">
                      <Plus className="h-2.5 w-2.5" />
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-neutral-900 dark:text-neutral-100">+ Post</span>
                  <span className="text-[9px] text-neutral-500 dark:text-neutral-400 leading-tight mt-0.5">
                    Pearl, photo, article, poll or case
                  </span>
                </div>

                {stories.map((s, i) => {
                  const base = enterStyle(t, 700 + i * 150, 1200 + i * 150);
                  return (
                    <div
                      key={s.title}
                      className="relative flex-1 rounded-xl overflow-hidden bg-neutral-900 text-white shrink-0 shadow-sm flex flex-col justify-between p-2.5 text-left"
                      style={{
                        ...base,
                        transform: `${base.transform} scale(${i === 0 ? 1 - pressP * 0.05 : 1})`,
                      }}
                    >
                      <SceneImg
                        src={s.img}
                        alt={s.title}
                        className="absolute inset-0"
                        gradient="from-neutral-800 to-neutral-950"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/30" />
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-600/90 text-white">
                          {s.category}
                        </span>
                        {s.urgent && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-rose-600/90 text-white flex items-center gap-1">
                            <span className="h-1 w-1 rounded-full bg-white animate-ping" />
                            Review
                          </span>
                        )}
                      </div>
                      <div className="relative z-10 mt-auto pt-6">
                        <span className="text-[10px] font-medium text-neutral-200">{s.author}</span>
                        <h4 className="text-[12px] font-bold text-white line-clamp-2 leading-snug mt-0.5">{s.title}</h4>
                        <div className="mt-1.5 flex items-center justify-between text-[10px] text-neutral-300 font-medium pt-1.5 border-t border-white/15">
                          <span className="truncate">{s.modality}</span>
                          <span className="text-blue-400 font-bold">Inspect →</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* viewers strip */}
              <div
                className="mt-3 shrink-0 flex items-center justify-between px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#18181c] border border-neutral-200/60 dark:border-neutral-800"
                style={enterStyle(t, 9000, 9600)}
              >
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-600 dark:text-neutral-300">
                  <Eye className="h-3.5 w-3.5 text-blue-500" />
                  {viewers} colleagues viewed today's rounds
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">
                  24h highlights
                </span>
              </div>
            </div>

            {/* ---------- StoryModal replica ---------- */}
            {modalVisible && (
              <div
                className="absolute inset-x-6 top-1 bottom-1 z-20 rounded-xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
                style={{
                  opacity: modalScale,
                  transform: `scale(${0.94 + modalScale * 0.06})`,
                  pointerEvents: 'none',
                }}
              >
                {/* header — real StoryModal header recipe */}
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 px-4 py-2.5 bg-neutral-50/50 dark:bg-[#141416] shrink-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <DoctorAvatar
                      src="https://images.unsplash.com/photo-1594824813501-4838e82ef573?w=200&auto=format&fit=crop&q=80"
                      alt="Dr. Sirenjeev"
                      className="h-9 w-9 rounded-full ring-2 ring-emerald-500/30"
                    />
                    <div className="min-w-0 leading-tight">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-[12px] text-neutral-900 dark:text-neutral-100 truncate">
                          Dr. Sirenjeev, OD
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400">(OD, FAAO, FSLS)</span>
                      </div>
                      <span className="flex items-center gap-1.5">
                        <span className="rounded bg-emerald-500/10 px-1.5 py-px text-[9px] font-medium text-emerald-600 dark:text-emerald-400">
                          Verified OD
                        </span>
                        <span className="text-[9px] text-neutral-400 truncate">Vision Vanguard Eye Center</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="rounded-full bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 text-[9px] font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                      Cornea
                    </span>
                    <X className="h-4 w-4 text-neutral-400" />
                  </div>
                </div>

                {/* body */}
                <div className="flex-1 min-h-0 overflow-hidden p-2.5 space-y-1.5">
                  {/* hero image */}
                  <div className="relative overflow-hidden rounded-lg bg-black h-[132px] shrink-0">
                    <SceneImg
                      src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&auto=format&fit=crop&q=80"
                      alt="Salzmann Nodule slit lamp"
                      className="absolute inset-0 w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3 text-white">
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                        <Sparkles className="h-2.5 w-2.5" /> Clinical Pearl • Diagnostic Case File
                      </span>
                      <h4 className="text-[13px] font-bold leading-snug mt-0.5">Slit Lamp: Salzmann Nodule</h4>
                    </div>
                  </div>

                  {/* case presentation box — real sections */}
                  <div
                    className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#121214] p-2 space-y-1.5"
                    style={enterStyle(t, 3400, 4000, 8)}
                  >
                    <div>
                      <h5 className="text-[8.5px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                        <Stethoscope className="h-2.5 w-2.5 text-blue-500" /> Patient Presentation & Complaint
                      </h5>
                      <p className="text-[10px] text-neutral-700 dark:text-neutral-300 leading-snug mt-0.5">
                        62yo female — foreign body sensation, irregular astigmatism. Elevated blue-white
                        subepithelial nodules anterior to Bowman's layer.
                      </p>
                    </div>
                    <div className="pt-1 border-t border-neutral-200/60 dark:border-neutral-800/60" style={findingIn(0)}>
                      <h5 className="text-[8.5px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        Definitive Clinical Diagnosis
                      </h5>
                      <p className="text-[12px] font-semibold text-neutral-900 dark:text-neutral-100 mt-0.5">
                        Salzmann's Nodular Degeneration
                      </p>
                    </div>
                    <div style={findingIn(1)}>
                      <ul className="space-y-0.5">
                        {[
                          '2.75D asymmetric irregular astigmatism on topography',
                          'Positive fluorescein pooling at nodule bases',
                        ].map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-1.5 text-[10px] text-neutral-600 dark:text-neutral-300"
                          >
                            <span className="mt-[4px] h-1 w-1 rounded-full bg-emerald-500 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={findingIn(2)}>
                      <p className="text-[10px] text-neutral-700 dark:text-neutral-300 font-medium bg-purple-50/50 dark:bg-purple-950/20 px-1.5 py-1 rounded border border-purple-100 dark:border-purple-900/30 leading-snug">
                        <b className="text-purple-600 dark:text-purple-400">Management:</b> Superficial keratectomy +
                        amniotic membrane graft + custom bandage lens.
                      </p>
                    </div>
                  </div>
                </div>

                {/* footer — real StoryModal actions */}
                <div className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 px-4 py-2.5 bg-neutral-50 dark:bg-[#121214] shrink-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-medium transition-colors ${
                        applauded
                          ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50'
                          : 'text-neutral-600 dark:text-neutral-400 bg-white dark:bg-[#1a1a1e] border border-neutral-200 dark:border-neutral-800'
                      }`}
                      style={applauded ? { transform: `scale(${1 + clapP * 0.07})` } : undefined}
                    >
                      <Heart className={`h-3 w-3 ${applauded ? 'fill-rose-500 text-rose-500' : ''}`} />
                      {applauded ? 'Case Applauded' : 'Applaud Case'}
                      {/* heart burst on the applaud tap */}
                      {applauded && <FloatHearts t={t} start={7350} />}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-medium text-neutral-600 dark:text-neutral-400">
                      <Share2 className="h-3 w-3" /> Share to Feed
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 px-3 py-1.5 text-[10px] font-semibold text-white dark:text-neutral-900">
                    View Doctor Profile <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            )}

            <TapCursor
              moves={[
                { start: 1000, end: 2500, x: 27, y: 45, clickAt: 1600 },
                { start: 6300, end: 8000, x: 10, y: 93, clickAt: 7300 },
              ]}
            />
          </div>

          <SceneCaption
            t={tG}
            beats={[
              [0, 2500, 'A perfect pearl dies in your camera roll.'],
              [2500, 4600, 'Spotlight — stories for your connected network'],
              [4600, 7400, 'Open the case file — the full workup inside'],
              [7400, 9300, 'Applauds from the ODs who watched'],
              [9300, 11300, 'Live for 24 hours. Then it is gone.'],
              [11300, 13500, 'FocusLinks Spotlight — share it before it expires.'],
            ]}
          />
        </>
      }
    >
      <AdHook
        t={tG}
        revealAt={2400}
        eyebrow="24 hours"
        line="A perfect pearl dies in your camera roll."
        accent="fuchsia"
        spotNo="04"
      />
      <KineticBeat
        t={tG}
        start={8700}
        end={PUNCH_AT - 200}
        line="Live for 24 hours. Watched forever in your network."
        accent="fuchsia"
      />
      <AdPunchline
        t={tG}
        start={PUNCH_AT}
        feature="Spotlight"
        tagline="Share it before it expires."
        cta="Open Spotlight"
        accent="fuchsia"
      />
    </DemoWindow>
  );
};
