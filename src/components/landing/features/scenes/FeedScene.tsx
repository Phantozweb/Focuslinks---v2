import React from 'react';
import {
  Compass,
  UserCheck,
  Bookmark,
  Plus,
  Sparkles,
  Images,
  BookOpen,
  BarChart2,
  Stethoscope,
  Heart,
  MessageSquare,
  Repeat2,
  Check,
  ArrowUp,
  ArrowRight,
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
import { enterStyle, phase, easeOutCubic, tickNumber, easeOutBack, adTiming, contentClock } from '../sceneKit';
import { DoctorAvatar } from '../../../common/DoctorAvatar';

/**
 * SPOT 06 — FEED (13.5s ad, see brag-output/brag-plan.md)
 * HOOK: "Built from your connections. Nothing else." → stream selector →
 * Marcus Chen's equipment day post → live myopia poll (325 votes) → vault.
 * Authored once at 1280×720 — identical composition on every device.
 */
export const FeedScene: React.FC<{ t: number }> = ({ t: tG }) => {
  const DURATION = 13500;
  const CONTENT_DURATION = 10000;
  const { REVEAL_END, PUNCH_AT } = adTiming(DURATION);
  const t = contentClock(tG, REVEAL_END, PUNCH_AT, CONTENT_DURATION);

  const following = t >= 1100;
  const likeP = easeOutCubic(phase(t, 4800, 5300));
  const liked = t >= 5000;
  const likes = liked ? tickNumber(t, 5000, 5600, 96, 97) : 96;
  const voted = t >= 7200;
  const votes = voted ? tickNumber(t, 7200, 8200, 325, 326) : 325;
  const vaulted = t >= 8300;
  const vaultP = easeOutBack(phase(t, 8300, 8700));
  const newPostsP = easeOutCubic(phase(t, 8800, 9400));

  const streams = [
    { id: 'for-you', label: 'For You', icon: <Compass className="h-3 w-3 text-blue-500" /> },
    { id: 'following', label: 'Following Optometrists', icon: <UserCheck className="h-3 w-3 text-indigo-500" /> },
    { id: 'vault', label: 'Vault (3)', icon: <Bookmark className="h-3 w-3 text-amber-500 fill-current" /> },
  ];

  const pills = [
    { label: 'Pearl', icon: <Sparkles className="h-3 w-3 text-amber-500" /> },
    { label: 'Photo', icon: <Images className="h-3 w-3 text-blue-500" /> },
    { label: 'Article', icon: <BookOpen className="h-3 w-3 text-indigo-500" /> },
    { label: 'Poll', icon: <BarChart2 className="h-3 w-3 text-purple-500" /> },
    { label: 'Case File', icon: <Stethoscope className="h-3 w-3 text-emerald-500" /> },
  ];

  const pollOptions = [
    { text: 'Dual Therapy: Ortho-K + 0.05% Atropine', votes: 142, pct: 46 },
    { text: 'Dual-Focus / EDOF Soft Lenses (MiSight)', votes: 88, pct: 28 },
    { text: 'Ortho-K alone, 6-month biometry re-check', votes: 64, pct: 22 },
    { text: 'DIMS Lenslet Spectacle Lenses', votes: 31, pct: 12 },
  ];

  return (
    <DemoWindow
      url="focuslinks.app/feed"
      accent="sky"
      t={tG}
      screen={
        <>
          <AppHeaderBar breadcrumb="Feed" />

          <div className="flex-1 min-h-0 relative px-5 pt-3 pb-3">
            <div className="flex flex-col h-full space-y-2">
              {/* stream selector — real segmented control */}
              <div
                className="flex items-center justify-between gap-3 bg-white/90 dark:bg-[#141420]/90 border border-neutral-200/70 dark:border-white/10 rounded-xl px-2 py-1.5 shadow-sm h-[46px] shrink-0"
                style={enterStyle(t, 100, 500)}
              >
                <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800/80 p-0.5 rounded-lg overflow-hidden">
                  {streams.map((s) => {
                    const active = s.id === 'following' ? following : !following && s.id === 'for-you';
                    return (
                      <span
                        key={s.id}
                        className={`px-2.5 py-1 rounded-md text-[10.5px] font-bold whitespace-nowrap flex items-center gap-1.5 ${
                          active
                            ? 'bg-white dark:bg-[#202024] text-neutral-900 dark:text-white shadow-sm'
                            : 'text-neutral-500 dark:text-neutral-400'
                        }`}
                      >
                        {s.icon}
                        {s.label}
                      </span>
                    );
                  })}
                </div>
                <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-600 text-white text-[10px] font-bold">
                  <Plus className="h-3 w-3" /> Post to Feed
                </span>
              </div>

              {/* composer — real recipe with 5 post types */}
              <div
                className="rounded-xl border border-neutral-200/70 dark:border-white/10 bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl px-2.5 py-2 shadow-sm shrink-0"
                style={enterStyle(t, 600, 1100)}
              >
                <div className="flex items-center gap-2.5">
                  <DoctorAvatar
                    src="https://images.unsplash.com/photo-1594824813501-4838e82ef573?w=200&auto=format&fit=crop&q=80"
                    alt="Dr. Sirenjeev"
                    className="h-8 w-8 rounded-full ring-2 ring-blue-500/20 shrink-0"
                  />
                  <div className="flex-1 rounded-full border border-neutral-200 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#1f1f23] px-3.5 py-2 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate">
                    Share a clinical pearl, photo, article, poll, or case file...
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-1.5 mt-1.5 pt-1.5 border-t border-neutral-100 dark:border-neutral-800/60">
                  {pills.map((p) => (
                    <span
                      key={p.label}
                      className="flex items-center justify-center gap-1.5 py-1 rounded-lg text-[10px] font-bold text-neutral-700 dark:text-neutral-300"
                    >
                      {p.icon}
                      {p.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3-column wall — real posts */}
              <div className="grid grid-cols-3 gap-2.5 flex-1 min-h-0 overflow-hidden">
                {/* col 1 — media post (real post-media-1) */}
                <div
                  className="rounded-xl border border-neutral-200/70 dark:border-white/10 bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl overflow-hidden shadow-sm flex flex-col"
                  style={enterStyle(t, 2400, 3000)}
                >
                  <div className="relative shrink-0">
                    <SceneImg
                      src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=80"
                      alt="New examination lane"
                      className="h-[104px] w-full"
                      gradient="from-sky-900 to-neutral-900"
                    />
                    <div className="grid grid-cols-2 gap-px bg-neutral-200 dark:bg-neutral-800">
                      <SceneImg
                        src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&auto=format&fit=crop&q=80"
                        alt="Zeiss SL 120 slit lamp"
                        className="h-[64px]"
                        gradient="from-blue-900 to-neutral-900"
                      />
                      <SceneImg
                        src="https://images.unsplash.com/photo-1583912267670-6575ad472688?w=400&auto=format&fit=crop&q=80"
                        alt="Topcon Maestro2 OCT"
                        className="h-[64px]"
                        gradient="from-indigo-900 to-neutral-900"
                      />
                    </div>
                    <div className="absolute top-1.5 left-1.5 flex items-center gap-1">
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-md bg-neutral-900/80 backdrop-blur-md text-white border border-white/10 flex items-center gap-0.5">
                        <Images className="h-2.5 w-2.5 text-sky-400" /> 3 photos
                      </span>
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-md bg-neutral-900/80 backdrop-blur-md text-white border border-white/10">
                        Zeiss SL 120 · Maestro2
                      </span>
                    </div>
                    <span
                      className={`absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full text-[8px] font-bold shadow-sm flex items-center gap-0.5 ${
                        vaulted ? 'bg-amber-500 text-white' : 'bg-neutral-900/80 backdrop-blur-md text-white border border-white/20'
                      }`}
                      style={vaulted ? { transform: `scale(${1 + vaultP * 0.12})` } : undefined}
                    >
                      <Bookmark className={`h-2.5 w-2.5 ${vaulted ? 'fill-current' : ''}`} />
                      {vaulted ? 'In Vault' : 'Vault'}
                    </span>
                  </div>
                  <div className="p-2.5 space-y-1.5 flex-1 min-h-0 overflow-hidden">
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className="relative shrink-0">
                          <DoctorAvatar
                            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80"
                            alt="Dr. Marcus Chen"
                            className="h-6 w-6 rounded-full ring-1 ring-blue-500/20"
                          />
                          <VerifiedShield className="h-3 w-3 p-[2px] -bottom-0.5 -right-0.5" badge="h-1.5 w-1.5" />
                        </div>
                        <div className="min-w-0 leading-tight">
                          <span className="block text-[10.5px] font-bold text-neutral-900 dark:text-neutral-100 truncate">
                            Dr. Marcus Chen
                          </span>
                          <span className="block text-[8.5px] font-medium text-blue-600 dark:text-blue-400">OD, FAAO</span>
                        </div>
                      </div>
                      <span className="text-[8.5px] text-neutral-400 shrink-0">45 mins ago</span>
                    </div>
                    <p className="text-[10px] text-neutral-700 dark:text-neutral-300 leading-snug line-clamp-2">
                      New equipment day at Bright Vision Eye Care! Lane 3 refreshed — Zeiss SL 120 slit lamp & Topcon
                      Maestro2 OCT now live. 📸
                    </p>
                    <div className="flex items-center gap-3 text-[9.5px] font-bold text-neutral-500 dark:text-neutral-400 pt-1 border-t border-neutral-100 dark:border-neutral-800/60">
                      <span
                        className={`flex items-center gap-1 ${liked ? 'text-rose-500' : ''}`}
                        style={liked ? { transform: `scale(${1 + likeP * 0.08})` } : undefined}
                      >
                        <Heart className={`h-3 w-3 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} /> {likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" /> 9
                      </span>
                      <span className="flex items-center gap-1">
                        <Repeat2 className="h-3 w-3" /> 18
                      </span>
                    </div>
                  </div>
                </div>

                {/* col 2 — poll (real poll post) */}
                <div
                  className="rounded-xl border border-neutral-200/70 dark:border-white/10 bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl overflow-hidden shadow-sm p-2.5 space-y-1.5 flex flex-col"
                  style={enterStyle(t, 2900, 3500)}
                >
                  <div className="flex items-center justify-between gap-1.5 shrink-0">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="relative shrink-0">
                        <DoctorAvatar
                          src="https://images.unsplash.com/photo-1594824813501-4838e82ef573?w=200&auto=format&fit=crop&q=80"
                          alt="Dr. Sirenjeev"
                          className="h-6 w-6 rounded-full ring-1 ring-blue-500/20"
                        />
                        <VerifiedShield className="h-3 w-3 p-[2px] -bottom-0.5 -right-0.5" badge="h-1.5 w-1.5" />
                      </div>
                      <div className="min-w-0 leading-tight">
                        <span className="block text-[10.5px] font-bold text-neutral-900 dark:text-neutral-100 truncate">
                          Dr. Sirenjeev, OD
                        </span>
                        <span className="block text-[8.5px] font-medium text-blue-600 dark:text-blue-400">OD, FAAO, FSLS</span>
                      </div>
                    </div>
                    <span className="text-[8.5px] text-neutral-400 shrink-0">8h</span>
                  </div>
                  <p className="text-[10.5px] font-bold text-neutral-800 dark:text-neutral-100 leading-snug shrink-0">
                    Primary first-line myopia intervention for this 10yo with rapid axial elongation:
                  </p>
                  <div className="space-y-1 flex-1 min-h-0">
                    {pollOptions.map((o, i) => {
                      const fill = easeOutCubic(phase(t, 6000 + i * 250, 7300 + i * 250));
                      const isWinner = i === 0;
                      return (
                        <div key={o.text} className="relative rounded-md overflow-hidden bg-neutral-100 dark:bg-neutral-800/70 h-[26px]">
                          <div
                            className={`absolute inset-y-0 left-0 ${isWinner ? 'bg-blue-500/25' : 'bg-neutral-400/20 dark:bg-neutral-600/25'}`}
                            style={{ width: `${fill * o.pct * 2}%` }}
                          />
                          <div className="relative flex items-center justify-between h-full px-2">
                            <span
                              className={`text-[8.5px] font-semibold truncate ${isWinner ? 'text-blue-700 dark:text-blue-300' : 'text-neutral-600 dark:text-neutral-300'}`}
                            >
                              {isWinner && voted && <Check className="inline h-2.5 w-2.5 mr-0.5 -mt-px" />}
                              {o.text}
                            </span>
                            <span className="text-[8.5px] font-black text-neutral-700 dark:text-neutral-200 shrink-0 pl-1">
                              {o.pct}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-1 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center gap-3 text-[9.5px] font-bold text-neutral-500 dark:text-neutral-400 shrink-0">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" /> 112
                    </span>
                    <span className="flex items-center gap-1">
                      <ArrowUp className="h-3 w-3" /> 325
                    </span>
                    <span className="text-[8.5px] font-semibold text-emerald-600 dark:text-emerald-400 ml-auto">
                      {votes} votes counted
                    </span>
                  </div>
                </div>

                {/* col 3 — pearl + article */}
                <div className="space-y-2.5 min-h-0 overflow-hidden">
                  <div
                    className="rounded-xl border border-neutral-200/70 dark:border-white/10 bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl overflow-hidden shadow-sm p-2.5 space-y-1.5"
                    style={enterStyle(t, 3400, 4000)}
                  >
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-amber-500 shrink-0" />
                      <span className="text-[9px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        Clinical Pearl
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-700 dark:text-neutral-300 leading-snug line-clamp-3">
                      Fogging on sclerals after 4h? Check the tear reservoir first — a shallow vault mimics mucin
                      fog. Aim 250–300µm central clearance.
                    </p>
                    <div className="flex items-center justify-between text-[9px] font-bold text-neutral-500 dark:text-neutral-400 pt-1 border-t border-neutral-100 dark:border-neutral-800/60">
                      <span className="flex items-center gap-1">
                        <Heart className="h-2.5 w-2.5" /> 87
                      </span>
                      <span className="flex items-center gap-1">
                        <Bookmark className="h-2.5 w-2.5" /> 41
                      </span>
                      <span className="flex items-center gap-0.5 text-blue-500">
                        Save <ArrowRight className="h-2.5 w-2.5" />
                      </span>
                    </div>
                  </div>

                  <div
                    className="rounded-xl border border-neutral-200/70 dark:border-white/10 bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl overflow-hidden shadow-sm p-2.5 space-y-1.5"
                    style={enterStyle(t, 3900, 4500)}
                  >
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-3 w-3 text-indigo-500 shrink-0" />
                      <span className="text-[9px] font-black uppercase tracking-wider text-indigo-500">
                        Journal Digest
                      </span>
                    </div>
                    <p className="text-[10px] font-semibold text-neutral-800 dark:text-neutral-100 leading-snug line-clamp-2">
                      Atropine 0.05% vs 0.025%: 24-month axial growth outcomes compared.
                    </p>
                    <span className="block text-[9px] font-medium text-neutral-400">Ophthalmic Science · 6 min read</span>
                  </div>
                </div>
              </div>

              {/* new posts pill — drops from under the header */}
              <div
                className="absolute top-1 left-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-lg shadow-blue-500/30"
                style={{ opacity: newPostsP, transform: `translate(-50%, ${(1 - newPostsP) * -26}px)` }}
              >
                <ArrowUp className="h-3.5 w-3.5" /> 2 new posts from your connections
              </div>

              <TapCursor
                moves={[
                  { start: 500, end: 2000, x: 34, y: 6, clickAt: 1100 },
                  { start: 4300, end: 5900, x: 16, y: 78, clickAt: 5000 },
                  { start: 7000, end: 8700, x: 52, y: 72, clickAt: 7200 },
                ]}
              />
            </div>
          </div>

          <SceneCaption
            t={tG}
            beats={[
              [0, 2500, 'Built from your connections. Nothing else.'],
              [2500, 4600, 'Feed — For You, Following, or your Vault'],
              [4600, 7300, 'Cases and wins from the people you chose'],
              [7300, 9300, 'Like it. Vault it. Vote in the poll.'],
              [9300, 11300, 'Two new posts — never miss the discussion'],
              [11300, 13500, 'FocusLinks Feed — where your circle talks shop.'],
            ]}
          />
        </>
      }
    >
      <AdHook
        t={tG}
        revealAt={2400}
        eyebrow="Your timeline"
        line="Built from your connections. Nothing else."
        accent="sky"
        spotNo="06"
      />
      <KineticBeat
        t={tG}
        start={8700}
        end={PUNCH_AT - 200}
        line="Your people. Your pace. Only optometry."
        accent="sky"
      />
      <AdPunchline
        t={tG}
        start={PUNCH_AT}
        feature="Feed"
        tagline="Where your circle talks shop."
        cta="Open Feed"
        accent="sky"
      />
    </DemoWindow>
  );
};
