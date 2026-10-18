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
import { DemoWindow, AppHeaderBar, SceneCaption, SceneImg, TapCursor } from './chrome';
import { enterStyle, phase, easeOutCubic, easeOutBack, tickNumber } from '../sceneKit';
import { DoctorAvatar } from '../../../common/DoctorAvatar';

/**
 * SPOTLIGHT — native replica of the real "Clinical Stories & Highlights" rail
 * and the StoryModal case file. Real story: "Slit Lamp: Salzmann Nodule"
 * (62yo F, Salzmann's Nodular Degeneration) from MOCK_STORIES.
 * Duration 10s.
 */
export const SpotlightScene: React.FC<{ t: number }> = ({ t }) => {
  const DURATION = 10000;

  // tap story 1 at 1.6s → modal in 2.1-2.9s → applaud at 7.1s → close at 8.7s
  const modalP = easeOutCubic(phase(t, 2100, 2900));
  const modalOut = t >= 8700 ? 1 - easeOutCubic(phase(t, 8700, 9200)) : 1;
  const modalScale = modalP < 1 ? modalP : modalOut;
  const modalVisible = t >= 2100 && modalOut > 0.01;

  const pressP = easeOutCubic(phase(t, 1600, 1900));

  const applauded = t >= 7300;
  const hearts = applauded ? tickNumber(t, 7300, 7900, 142, 143) : 142;
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
    <DemoWindow url="focuslinks.app/feed" accent="bg-fuchsia-500">
      <div className="flex flex-col h-full relative">
        <AppHeaderBar breadcrumb="Feed" />

        <div className="flex-1 overflow-hidden relative p-3 sm:p-4">
          {/* Clinical Stories & Highlights — real section recipe */}
          <div
            className="rounded-2xl border border-neutral-200/70 dark:border-white/10 bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl p-3 sm:p-3.5 shadow-sm h-full"
            style={enterStyle(t, 100, 600)}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20 shrink-0">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="text-[11px] font-bold tracking-tight text-neutral-900 dark:text-neutral-100 truncate">
                      Clinical Stories & Highlights
                    </h3>
                    <span className="flex items-center gap-1 text-[7.5px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-900/50">
                      <span className="h-1 w-1 rounded-full bg-amber-500 animate-pulse" />
                      Daily Rounds
                    </span>
                  </div>
                  <p className="text-[8px] text-neutral-500 dark:text-neutral-400 truncate">
                    High-yield cases & protocols from verified optometrists
                  </p>
                </div>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1 px-2 py-1.5 rounded-xl bg-blue-600 text-white text-[8.5px] font-bold shadow-sm">
                <Plus className="h-2.5 w-2.5 stroke-[2.5]" /> Post
              </span>
            </div>

            {/* rail: + Post dashed card + real story cards */}
            <div className="flex items-stretch gap-2.5 mt-3 overflow-hidden">
              <div
                className="flex flex-col items-center justify-center text-center p-2.5 w-24 sm:w-28 rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-blue-500 bg-neutral-50/70 dark:bg-[#1f1f23]/60 shrink-0"
                style={{
                  ...enterStyle(t, 500, 1000),
                  boxShadow: t >= 9300 ? '0 0 0 4px rgba(59,130,246,0.15)' : undefined,
                }}
              >
                <div className="relative mb-1">
                  <DoctorAvatar
                    src="https://images.unsplash.com/photo-1594824813501-4838e82ef573?w=200&auto=format&fit=crop&q=80"
                    alt="You"
                    className="h-9 w-9 rounded-full ring-2 ring-blue-500/30"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-blue-600 text-white p-0.5 shadow-sm">
                    <Plus className="h-2 w-2" />
                  </span>
                </div>
                <span className="text-[9px] font-bold text-neutral-900 dark:text-neutral-100">+ Post</span>
                <span className="text-[7px] text-neutral-500 dark:text-neutral-400 leading-tight">
                  Pearl, photo, article, poll or case
                </span>
              </div>

              {stories.map((s, i) => (
                <div
                  key={s.title}
                  className="relative w-32 sm:w-40 rounded-xl overflow-hidden bg-neutral-900 text-white shrink-0 shadow-sm flex flex-col justify-between p-2 text-left"
                  style={{
                    ...enterStyle(t, 700 + i * 150, 1200 + i * 150),
                    transform: `${enterStyle(t, 700 + i * 150, 1200 + i * 150).transform} scale(${
                      i === 0 ? 1 - pressP * 0.05 : 1
                    })`,
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
                    <span className="text-[7px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-blue-600/90 text-white">
                      {s.category}
                    </span>
                    {s.urgent && (
                      <span className="text-[7px] font-bold px-1 py-0.5 rounded-md bg-rose-600/90 text-white flex items-center gap-0.5">
                        <span className="h-1 w-1 rounded-full bg-white animate-ping" />
                        Review
                      </span>
                    )}
                  </div>
                  <div className="relative z-10 mt-auto pt-4">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-[7.5px] font-medium text-neutral-200">{s.author}</span>
                    </div>
                    <h4 className="text-[9px] font-bold text-white line-clamp-2 leading-snug">{s.title}</h4>
                    <div className="mt-1 flex items-center justify-between text-[7.5px] text-neutral-300 font-medium pt-1 border-t border-white/15">
                      <span className="truncate">{s.modality}</span>
                      <span className="text-blue-400 font-bold">Inspect →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* viewers strip */}
            <div
              className="mt-3 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-neutral-50 dark:bg-[#18181c] border border-neutral-200/60 dark:border-neutral-800"
              style={enterStyle(t, 9000, 9600)}
            >
              <span className="flex items-center gap-1 text-[8.5px] font-bold text-neutral-600 dark:text-neutral-300">
                <Eye className="h-3 w-3 text-blue-500" />
                {hearts} colleagues viewed today's rounds
              </span>
              <span className="text-[7.5px] font-black uppercase tracking-widest text-neutral-400">
                24h highlights
              </span>
            </div>
          </div>

          {/* ---------- StoryModal replica ---------- */}
          {modalVisible && (
            <div
              className="absolute inset-2 sm:inset-3 z-20 rounded-xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
              style={{
                opacity: modalScale,
                transform: `scale(${0.94 + modalScale * 0.06})`,
                pointerEvents: 'none',
              }}
            >
              {/* header — real StoryModal header recipe */}
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 px-3 py-2 bg-neutral-50/50 dark:bg-[#141416] shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <DoctorAvatar
                    src="https://images.unsplash.com/photo-1594824813501-4838e82ef573?w=200&auto=format&fit=crop&q=80"
                    alt="Dr. Sirenjeev"
                    className="h-7 w-7 rounded-full ring-2 ring-emerald-500/30"
                  />
                  <div className="min-w-0 leading-tight">
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="font-semibold text-[9.5px] text-neutral-900 dark:text-neutral-100 truncate">
                        Dr. Sirenjeev, OD
                      </span>
                      <span className="text-[8px] text-emerald-600 dark:text-emerald-400">(OD, FAAO, FSLS)</span>
                    </div>
                    <span className="flex items-center gap-1">
                      <span className="rounded bg-emerald-500/10 px-1 py-px text-[7px] font-medium text-emerald-600 dark:text-emerald-400">
                        Verified OD
                      </span>
                      <span className="text-[7.5px] text-neutral-400 truncate">Vision Vanguard Eye Center</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="rounded-full bg-blue-50 dark:bg-blue-950/50 px-1.5 py-0.5 text-[7.5px] font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                    Cornea
                  </span>
                  <X className="h-3.5 w-3.5 text-neutral-400" />
                </div>
              </div>

              {/* body */}
              <div className="flex-1 overflow-hidden p-2 space-y-1">
                {/* hero image */}
                <div className="relative overflow-hidden rounded-lg bg-black h-14 sm:h-16 shrink-0">
                  <SceneImg
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&auto=format&fit=crop&q=80"
                    alt="Salzmann Nodule slit lamp"
                    className="absolute inset-0 w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-1.5 left-2.5 right-2.5 text-white">
                    <span className="text-[7px] font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                      <Sparkles className="h-2 w-2" /> Clinical Pearl • Diagnostic Case File
                    </span>
                    <h4 className="text-[10px] font-bold leading-snug">Slit Lamp: Salzmann Nodule</h4>
                  </div>
                </div>

                {/* case presentation box — real sections */}
                <div
                  className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#121214] p-1.5 space-y-1"
                  style={enterStyle(t, 3400, 4000, 8)}
                >
                  <div>
                    <h5 className="text-[6.5px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                      <Stethoscope className="h-2 w-2 text-blue-500" /> Patient Presentation & Complaint
                    </h5>
                    <p className="text-[7.5px] text-neutral-700 dark:text-neutral-300 leading-snug">
                      62yo female — foreign body sensation, irregular astigmatism. Elevated blue-white subepithelial
                      nodules anterior to Bowman's layer.
                    </p>
                  </div>
                  <div
                    className="pt-0.5 border-t border-neutral-200/60 dark:border-neutral-800/60"
                    style={findingIn(0)}
                  >
                    <h5 className="text-[6.5px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Definitive Clinical Diagnosis
                    </h5>
                    <p className="text-[8.5px] font-semibold text-neutral-900 dark:text-neutral-100">
                      Salzmann's Nodular Degeneration
                    </p>
                  </div>
                  <div style={findingIn(1)}>
                    <ul className="space-y-px">
                      {['2.75D asymmetric irregular astigmatism on topography', 'Positive fluorescein pooling at nodule bases'].map(
                        (f) => (
                          <li key={f} className="flex items-start gap-1 text-[7px] text-neutral-600 dark:text-neutral-300">
                            <span className="mt-[3px] h-1 w-1 rounded-full bg-emerald-500 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div style={findingIn(2)}>
                    <p className="text-[7px] text-neutral-700 dark:text-neutral-300 font-medium bg-purple-50/50 dark:bg-purple-950/20 p-1 rounded border border-purple-100 dark:border-purple-900/30 leading-snug">
                      <b className="text-purple-600 dark:text-purple-400">Management:</b> Superficial keratectomy + amniotic
                      membrane graft + custom bandage lens.
                    </p>
                  </div>
                </div>
              </div>

              {/* footer — real StoryModal actions */}
              <div className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 px-3 py-2 bg-neutral-50 dark:bg-[#121214] shrink-0">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`flex items-center gap-1 rounded-full px-2 py-1 text-[8px] font-medium transition-colors ${
                      applauded
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50'
                        : 'text-neutral-600 dark:text-neutral-400 bg-white dark:bg-[#1a1a1e] border border-neutral-200 dark:border-neutral-800'
                    }`}
                    style={applauded ? { transform: `scale(${1 + clapP * 0.07})` } : undefined}
                  >
                    <Heart className={`h-2.5 w-2.5 ${applauded ? 'fill-rose-500 text-rose-500' : ''}`} />
                    {applauded ? 'Case Applauded' : 'Applaud Case'}
                  </span>
                  <span className="flex items-center gap-1 rounded-full px-2 py-1 text-[8px] font-medium text-neutral-600 dark:text-neutral-400">
                    <Share2 className="h-2.5 w-2.5" /> Share to Feed
                  </span>
                </div>
                <span className="flex items-center gap-1 rounded-lg bg-neutral-900 dark:bg-neutral-100 px-2 py-1 text-[8px] font-semibold text-white dark:text-neutral-900">
                  View Doctor Profile <ChevronRight className="h-2.5 w-2.5" />
                </span>
              </div>
            </div>
          )}

          <TapCursor
            moves={[
              { start: 1000, end: 2500, x: 36, y: 42, clickAt: 1600 },
              { start: 6300, end: 8000, x: 22, y: 88, clickAt: 7300 },
            ]}
          />
        </div>

        <SceneCaption
          t={t}
          duration={DURATION}
          beats={[
            [0, 1900, 'Daily rounds from your connected network'],
            [1900, 4000, 'Open a case file — the full workup inside'],
            [4000, 6600, 'Presentation → diagnosis → management'],
            [6600, 8700, 'Applaud & share with peers'],
            [8700, 10000, 'Post your own — pearl, photo, case or poll'],
          ]}
        />
      </div>
    </DemoWindow>
  );
};
