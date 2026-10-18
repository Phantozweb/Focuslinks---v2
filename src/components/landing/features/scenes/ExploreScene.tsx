import React from 'react';
import { Camera, Heart, MessageCircle, X } from 'lucide-react';
import { DemoWindow, AppHeaderBar, SceneCaption, SceneImg, TapCursor, AdHook, KineticBeat, AdPunchline } from './chrome';
import { enterStyle, phase, easeOutCubic, tickNumber, adTiming, contentClock } from '../sceneKit';
import { DoctorAvatar } from '../../../common/DoctorAvatar';

/**
 * SPOT 05 — EXPLORE (14s ad, see brag-output/brag-plan.md)
 * HOOK: "Everything the community knows. One wall." → real imagery wall →
 * case detail modal (260µm vault findings, 199 likes).
 * Authored once at 1280×720 — identical composition on every device.
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
    {
      title: 'Scleral Landing Zone Fluorescein Ring',
      modality: 'Fluorescein',
      img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
      likes: 149,
      comments: 19,
    },
    {
      title: 'Corneal Stroma Haze — Confocal Microscopy',
      modality: 'Confocal',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
      likes: 121,
      comments: 17,
    },
  ];

  const tabs = ['All Visuals', 'Slit Lamp', 'AS-OCT / Retina', 'Fluorescein', 'Topography'];

  // hover overlay on tile 2 (index 1) from 5.2s, tap at 6.4s → modal 6.9-7.7s
  const hoverP = easeOutCubic(phase(t, 5200, 5800));
  const modalP = easeOutCubic(phase(t, 6900, 7700));
  const modalOut = t >= 9300 ? 1 - easeOutCubic(phase(t, 9300, 9800)) : 1;
  const modalVisible = t >= 6900 && modalOut > 0.01;
  const modalS = Math.min(modalP, modalOut);
  const liked = t >= 6400;
  const likes = liked ? tickNumber(t, 6400, 7000, 198, 199) : 198;

  return (
    <DemoWindow
      url="focuslinks.app/explore"
      accent="amber"
      t={tG}
      screen={
        <>
          <AppHeaderBar breadcrumb="Explore" />

          <div className="flex-1 min-h-0 relative px-5 pt-3 pb-3">
            <div className="flex flex-col h-full space-y-2">
              {/* header — real gallery header recipe */}
              <div
                className="flex items-center justify-between gap-3 rounded-xl bg-white dark:bg-[#18181b] px-3 h-[48px] shrink-0 border border-neutral-200 dark:border-neutral-800 shadow-sm"
                style={enterStyle(t, 100, 600)}
              >
                <div className="min-w-0 flex items-center gap-2.5">
                  <Camera className="h-4 w-4 text-rose-500 shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[12.5px] font-bold text-neutral-900 dark:text-neutral-100 truncate leading-tight">
                      Ophthalmic Diagnostic & Clinical Imagery
                    </span>
                    <span className="block text-[9px] text-neutral-500 dark:text-neutral-400 truncate leading-tight">
                      Slit-lamp photography, topography maps, fluorescein & OCT
                    </span>
                  </div>
                </div>
                <span className="shrink-0 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-500 to-indigo-600 text-white px-3 py-1.5 text-[10px] font-semibold shadow-sm">
                  <Camera className="h-3 w-3" /> Upload Clinical Visual
                </span>
              </div>

              {/* filter tabs — real labels */}
              <div className="flex items-center gap-1.5 h-[30px] shrink-0 overflow-hidden">
                {tabs.map((c, i) => (
                  <span
                    key={c}
                    className={`px-3 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap shrink-0 ${
                      i === 0
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm'
                        : 'bg-white dark:bg-[#18181b] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800'
                    }`}
                    style={enterStyle(t, 800 + i * 100, 1300 + i * 100, 8)}
                  >
                    {c}
                  </span>
                ))}
                <span className="ml-auto text-[9.5px] font-bold text-neutral-400 shrink-0">
                  2,148 clinical visuals
                </span>
              </div>

              {/* visual wall — real tiles, 4 × 2 */}
              <div className="grid grid-cols-4 grid-rows-2 gap-2.5 flex-1 min-h-0">
                {tiles.map((tile, i) => {
                  const isTarget = i === 1;
                  return (
                    <div
                      key={tile.title}
                      className="relative overflow-hidden rounded-xl bg-black border border-neutral-200 dark:border-neutral-800 shadow-sm"
                      style={enterStyle(t, 2200 + i * 160, 2900 + i * 160)}
                    >
                      <SceneImg
                        src={tile.img}
                        alt={tile.title}
                        className="absolute inset-0 w-full h-full"
                        gradient="from-neutral-800 to-neutral-950"
                      />
                      {/* modality tag — real recipe */}
                      <div className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[8px] font-bold text-white uppercase tracking-wider border border-white/15">
                        {tile.modality}
                      </div>
                      {/* like count bottom-right — always on, like the real wall */}
                      <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 bg-black/55 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[8.5px] font-bold text-white border border-white/10">
                        <Heart
                          className={`h-2.5 w-2.5 fill-rose-500 text-rose-500 ${liked && isTarget ? 'scale-125' : ''}`}
                        />
                        {isTarget ? likes : tile.likes}
                      </div>
                      {/* hover overlay — real Instagram-style overlay */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end text-white p-2.5"
                        style={{ opacity: isTarget ? hoverP : 0 }}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <DoctorAvatar
                            src="https://images.unsplash.com/photo-1594824813501-4838e82ef573?w=100&auto=format&fit=crop&q=80"
                            alt="Dr. Sirenjeev"
                            className="h-5 w-5 rounded-full ring-1 ring-white/60"
                          />
                          <span className="text-[9px] font-semibold truncate">Dr. Sirenjeev</span>
                        </div>
                        <h4 className="text-[10px] font-bold line-clamp-2 leading-tight">{tile.title}</h4>
                        <div className="flex items-center gap-2.5 mt-1 pt-1 border-t border-white/20 text-[9px] font-semibold">
                          <span className="flex items-center gap-0.5">
                            <Heart className="h-2.5 w-2.5 fill-rose-500 text-rose-500" /> {likes}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <MessageCircle className="h-2.5 w-2.5" /> {tile.comments}
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
                  className="absolute inset-x-6 top-1 bottom-1 z-20 rounded-xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex"
                  style={{
                    opacity: modalS,
                    transform: `scale(${0.95 + modalS * 0.05})`,
                    pointerEvents: 'none',
                  }}
                >
                  {/* left: high-res image */}
                  <div className="w-[58%] bg-black relative">
                    <SceneImg
                      src="https://images.unsplash.com/photo-1583912267670-6575ad472688?w=1000&auto=format&fit=crop&q=80"
                      alt="AS-OCT vault clearance"
                      className="absolute inset-0 w-full h-full"
                      gradient="from-neutral-800 to-neutral-950"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-white border border-white/20">
                      AS-OCT / Retina
                    </div>
                    <X className="absolute top-2.5 right-2.5 h-4 w-4 text-white/80" />
                  </div>
                  {/* right: clinical details */}
                  <div className="flex-1 p-3.5 flex flex-col gap-2 bg-white dark:bg-[#18181b] overflow-hidden">
                    <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                      <DoctorAvatar
                        src="https://images.unsplash.com/photo-1594824813501-4838e82ef573?w=200&auto=format&fit=crop&q=80"
                        alt="Dr. Sirenjeev"
                        className="h-8 w-8 rounded-full ring-2 ring-blue-500/20"
                      />
                      <div className="min-w-0 leading-tight">
                        <span className="text-[11px] font-bold text-neutral-900 dark:text-neutral-100 truncate block">
                          Dr. Sirenjeev, OD{' '}
                          <span className="text-[9px] text-blue-600 font-semibold">(OD, FAAO, FSLS)</span>
                        </span>
                        <span className="text-[9px] text-neutral-400 truncate block">
                          Vision Vanguard Advanced Cornea & Eye Center
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[8.5px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                        Biomicroscopic Diagnosis
                      </span>
                      <h4 className="text-[12px] font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                        Post-Graft Irregular Ectasia Optical Clearance
                      </h4>
                    </div>
                    <div className="p-2 rounded-lg bg-neutral-50 dark:bg-[#121215] border border-neutral-200/80 dark:border-neutral-800">
                      <p className="text-[10px] text-neutral-600 dark:text-neutral-300 leading-snug">
                        Central apical fluid clearance of <b>260µm</b> with harmonious landing zone alignment across 4
                        quadrants. 18.0mm custom quadrant-specific scleral, BCVA restored to 20/20-2.
                      </p>
                    </div>
                    <div className="mt-auto flex items-center gap-3 pt-1">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-neutral-600 dark:text-neutral-300">
                        <Heart className="h-3 w-3 fill-rose-500 text-rose-500" /> {likes}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-neutral-600 dark:text-neutral-300">
                        <MessageCircle className="h-3 w-3" /> 45 comments
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <TapCursor moves={[{ start: 4300, end: 6900, x: 37, y: 42, clickAt: 6400 }]} />
            </div>
          </div>

          <SceneCaption
            t={tG}
            beats={[
              [0, 2500, 'Everything the community knows. One wall.'],
              [2500, 4700, 'Explore — cases, pearls, polls, articles'],
              [4700, 7400, 'Filter by modality. Hover any case.'],
              [7400, 9700, 'Open it — full diagnosis & lens data inside'],
              [9700, 11800, 'Live polls, 325 votes and counting'],
              [11800, 14000, 'FocusLinks Explore — scroll less, find more.'],
            ]}
          />
        </>
      }
    >
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
    </DemoWindow>
  );
};
