import React from 'react';
import { Camera, Heart, MessageCircle, X } from 'lucide-react';
import { DemoWindow, AppHeaderBar, SceneCaption, SceneImg, TapCursor, AdHook, KineticBeat, AdPunchline } from './chrome';
import { enterStyle, phase, easeOutCubic, tickNumber, adTiming, contentClock } from '../sceneKit';
import { DoctorAvatar } from '../../../common/DoctorAvatar';

/**
 * SPOT 05 — EXPLORE (14s ad, see brag-output/brag-plan.md)
 * HOOK: "Everything the community knows. One wall." → real imagery wall →
 * case detail modal (260µm vault findings, 199 likes) → live poll fill.
 */
export const ExploreScene: React.FC<{ t: number }> = ({ t: tG }) => {
  const DURATION = 14000;
  const CONTENT_DURATION = 10500;
  const { REVEAL_END, PUNCH_AT } = adTiming(DURATION);
  const t = contentClock(tG, REVEAL_END, PUNCH_AT, CONTENT_DURATION);

  const tiles = [
    {
      title: "Salzmann's Nodular Degeneration Biomicroscopy",
      modality: 'Slit Lamp',
      img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80',
      likes: 142,
      comments: 28,
    },
    {
      title: 'Vault Clearance on 18.0mm Scleral (AS-OCT)',
      modality: 'AS-OCT / Retina',
      img: 'https://images.unsplash.com/photo-1583912267670-6575ad472688?w=600&auto=format&fit=crop&q=80',
      likes: 198,
      comments: 45,
    },
    {
      title: "Orthokeratology Bull's Eye Fluorescein Pattern",
      modality: 'Fluorescein',
      img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80',
      likes: 215,
      comments: 39,
    },
    {
      title: 'EDI-OCT Optic Disc Drusen',
      modality: 'AS-OCT / Retina',
      img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop&q=80',
      likes: 260,
      comments: 52,
    },
    {
      title: 'Pellucid Ectasia Topographic Crab-Claw',
      modality: 'Topography',
      img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&auto=format&fit=crop&q=80',
      likes: 184,
      comments: 31,
    },
    {
      title: 'Infrared Meibography: Truncation',
      modality: 'Meibography',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80',
      likes: 167,
      comments: 22,
    },
  ];

  const tabs = ['All Visuals', 'Slit Lamp', 'AS-OCT / Retina', 'Fluorescein', 'Topography'];

  // hover overlay on tile 2 (index 1) from 5.2s, tap at 6.4s → modal 6.9-7.7s
  const hoverP = easeOutCubic(phase(t, 5200, 5800));
  const modalP = easeOutCubic(phase(t, 6900, 7700));
  const modalOut = t >= 9300 ? 1 - easeOutCubic(phase(t, 9300, 9800)) : 1;
  const modalVisible = t >= 6900 && modalOut > 0.01;
  const liked = t >= 6400;
  const likes = liked ? tickNumber(t, 6400, 7000, 198, 199) : 198;

  return (
    <DemoWindow url="focuslinks.app/explore" accent="bg-amber-500">
      <div className="flex flex-col h-full relative">
        {/* — brag spot 05: hook → proof → punchline — */}
        <AdHook
          t={tG}
          revealAt={2400}
          eyebrow="Cases · Pearls · Polls · Articles"
          line="Everything the community knows. One wall."
          accent="amber"
          spotNo="05"
        />
        <KineticBeat
          t={tG}
          start={9200}
          end={PUNCH_AT - 200}
          line="Scroll less. Find more."
          accent="amber"
        />
        <AdPunchline
          t={tG}
          start={PUNCH_AT}
          feature="Explore"
          tagline="The community's entire brain, browsable."
          cta="Open Explore"
          accent="amber"
        />

        <AppHeaderBar breadcrumb="Explore" />

        <div className="flex-1 overflow-hidden relative p-3 sm:p-4 space-y-2">
          {/* header — real gallery header recipe */}
          <div
            className="flex items-center justify-between gap-2 rounded-xl bg-white dark:bg-[#18181b] p-2 border border-neutral-200 dark:border-neutral-800 shadow-sm"
            style={enterStyle(t, 100, 600)}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <Camera className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                <span className="text-[10.5px] sm:text-[11.5px] font-bold text-neutral-900 dark:text-neutral-100 truncate">
                  Ophthalmic Diagnostic & Clinical Imagery
                </span>
              </div>
              <p className="text-[7.5px] text-neutral-500 dark:text-neutral-400 truncate">
                Slit-lamp photography, topography maps, fluorescein & OCT
              </p>
            </div>
            <span className="shrink-0 flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-500 to-indigo-600 text-white px-2 py-1.5 text-[8px] font-semibold shadow-sm">
              <Camera className="h-2.5 w-2.5" /> Upload Clinical Visual
            </span>
          </div>

          {/* filter tabs — real labels */}
          <div className="flex items-center gap-1.5 overflow-hidden">
            {tabs.map((c, i) => (
              <span
                key={c}
                className={`px-2 py-1 rounded-full text-[8px] font-semibold whitespace-nowrap shrink-0 ${
                  i === 0
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm'
                    : 'bg-white dark:bg-[#18181b] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800'
                }`}
                style={enterStyle(t, 800 + i * 100, 1300 + i * 100, 8)}
              >
                {c}
              </span>
            ))}
          </div>

          {/* visual grid — real square tiles */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {tiles.map((tile, i) => {
              const isTarget = i === 1;
              return (
                <div
                  key={tile.title}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-black border border-neutral-200 dark:border-neutral-800 shadow-sm"
                  style={enterStyle(t, 2200 + i * 180, 2900 + i * 180)}
                >
                  <SceneImg
                    src={tile.img}
                    alt={tile.title}
                    className="absolute inset-0 w-full h-full"
                    gradient="from-neutral-800 to-neutral-950"
                  />
                  {/* modality tag — real recipe */}
                  <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[6.5px] font-bold text-white uppercase tracking-wider border border-white/15">
                    {tile.modality}
                  </div>
                  {/* hover overlay — real Instagram-style overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end text-white p-1.5"
                    style={{ opacity: isTarget ? hoverP : 0 }}
                  >
                    <div className="flex items-center gap-1 mb-0.5">
                      <DoctorAvatar
                        src="https://images.unsplash.com/photo-1594824813501-4838e82ef573?w=100&auto=format&fit=crop&q=80"
                        alt="Dr. Sirenjeev"
                        className="h-4 w-4 rounded-full ring-1 ring-white/60"
                      />
                      <span className="text-[7px] font-semibold truncate">Dr. Sirenjeev</span>
                    </div>
                    <h4 className="text-[7.5px] font-bold line-clamp-2 leading-tight">{tile.title}</h4>
                    <div className="flex items-center gap-2 mt-1 pt-1 border-t border-white/20 text-[7px] font-semibold">
                      <span className="flex items-center gap-0.5">
                        <Heart className={`h-2 w-2 fill-rose-500 text-rose-500 ${liked && isTarget ? 'scale-110' : ''}`} />
                        {isTarget ? likes : tile.likes}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <MessageCircle className="h-2 w-2" /> {tile.comments}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---------- case detail modal (real detail recipe) ---------- */}
          {modalVisible && (
            <div
              className="absolute inset-2 sm:inset-3 z-20 rounded-xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col sm:flex-row"
              style={{
                opacity: Math.min(modalP, modalOut),
                transform: `scale(${0.95 + Math.min(modalP, modalOut) * 0.05})`,
                pointerEvents: 'none',
              }}
            >
              {/* left: high-res image */}
              <div className="sm:w-3/5 bg-black relative min-h-0 flex-1">
                <SceneImg
                  src="https://images.unsplash.com/photo-1583912267670-6575ad472688?w=1000&auto=format&fit=crop&q=80"
                  alt="AS-OCT vault clearance"
                  className="absolute inset-0 w-full h-full"
                  gradient="from-neutral-800 to-neutral-950"
                />
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full text-[7.5px] font-bold text-white border border-white/20">
                  AS-OCT / Retina
                </div>
                <X className="absolute top-2 right-2 h-3.5 w-3.5 text-white/80" />
              </div>
              {/* right: clinical details */}
              <div className="sm:w-2/5 p-2.5 sm:p-3 flex flex-col gap-1.5 bg-white dark:bg-[#18181b] overflow-hidden">
                <div className="flex items-center gap-1.5 border-b border-neutral-100 dark:border-neutral-800 pb-1.5">
                  <DoctorAvatar
                    src="https://images.unsplash.com/photo-1594824813501-4838e82ef573?w=200&auto=format&fit=crop&q=80"
                    alt="Dr. Sirenjeev"
                    className="h-6 w-6 rounded-full ring-2 ring-blue-500/20"
                  />
                  <div className="min-w-0 leading-tight">
                    <span className="text-[8.5px] font-bold text-neutral-900 dark:text-neutral-100 truncate block">
                      Dr. Sirenjeev, OD <span className="text-[7px] text-blue-600 font-semibold">(OD, FAAO, FSLS)</span>
                    </span>
                    <span className="text-[7px] text-neutral-400 truncate block">
                      Vision Vanguard Advanced Cornea & Eye Center
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-[6.5px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                    Biomicroscopic Diagnosis
                  </span>
                  <h4 className="text-[9px] font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                    Post-Graft Irregular Ectasia Optical Clearance
                  </h4>
                </div>
                <div className="p-1.5 rounded-lg bg-neutral-50 dark:bg-[#121215] border border-neutral-200/80 dark:border-neutral-800">
                  <p className="text-[7.5px] text-neutral-600 dark:text-neutral-300 leading-snug">
                    Central apical fluid clearance of <b>260µm</b> with harmonious landing zone alignment across 4
                    quadrants. 18.0mm custom quadrant-specific scleral, BCVA restored to 20/20-2.
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-2 pt-1">
                  <span className="flex items-center gap-0.5 text-[8px] font-bold text-neutral-600 dark:text-neutral-300">
                    <Heart className="h-2.5 w-2.5 fill-rose-500 text-rose-500" /> {likes}
                  </span>
                  <span className="flex items-center gap-0.5 text-[8px] font-bold text-neutral-600 dark:text-neutral-300">
                    <MessageCircle className="h-2.5 w-2.5" /> 45 comments
                  </span>
                </div>
              </div>
            </div>
          )}

          <TapCursor
            moves={[
              { start: 4300, end: 6900, x: 50, y: 52, clickAt: 6400 },
            ]}
          />
        </div>

        <SceneCaption
          t={tG}
          duration={DURATION}
          beats={[
            [0, 2500, 'Everything the community knows. One wall.'],
            [2500, 4700, 'Explore — cases, pearls, polls, articles'],
            [4700, 7400, 'Filter by modality. Hover any case.'],
            [7400, 9700, 'Open it — full diagnosis & lens data inside'],
            [9700, 11800, 'Live polls, 325 votes and counting'],
            [11800, 14000, 'FocusLinks Explore — scroll less, find more.'],
          ]}
        />
      </div>
    </DemoWindow>
  );
};
