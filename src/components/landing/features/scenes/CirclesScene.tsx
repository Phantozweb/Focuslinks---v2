import React from 'react';
import {
  Sparkles,
  Calendar,
  CalendarDays,
  Clock,
  Award,
  Users,
  Hash,
  Check,
  ArrowRight,
  Bell,
} from 'lucide-react';
import {
  DemoWindow,
  AppHeaderBar,
  SceneCaption,
  SceneImg,
  TapCursor,
  SceneToast,
  AVATARS,
  AdHook,
  KineticBeat,
  AdPunchline,
} from './chrome';
import { enterStyle, phase, easeOutCubic, tickNumber, adTiming, contentClock } from '../sceneKit';

/**
 * SPOT 02 — CIRCLES (14.5s ad, see brag-output/brag-plan.md)
 * HOOK: event info buried in group chats (ghost bubbles) → central board proof.
 * Real events: Scleral Symposium (Oct 14 · 2.0 COPE · 342), Myopia Summit
 * (Oct 17 · 3.5 COPE · 518). Real data from MOCK_CLINICAL_EVENTS / MOCK_GROUPS.
 * Authored once at 1280×720 — identical composition on every device.
 */
export const CirclesScene: React.FC<{ t: number }> = ({ t: tG }) => {
  const DURATION = 14500;
  const CONTENT_DURATION = 11000;
  const { REVEAL_END, PUNCH_AT } = adTiming(DURATION);
  const t = contentClock(tG, REVEAL_END, PUNCH_AT, CONTENT_DURATION);

  // pain-point scatter chips dissolve at ~1.7-2.3s
  const scatterOut = 1 - phase(t, 1700, 2300);

  // RSVP on the Scleral Symposium at 4.6s
  const registered = t >= 4900;
  const attendees = registered ? tickNumber(t, 4900, 5600, 342, 343) : 342;
  const registeredP = easeOutCubic(phase(t, 4900, 5300));
  // avatar stack pop when RSVP lands
  const stackP = easeOutCubic(phase(t, 5300, 5900));

  return (
    <DemoWindow
      url="focuslinks.app/circles"
      accent="emerald"
      t={tG}
      screen={
        <>
          <AppHeaderBar breadcrumb="Circles" />

          <div className="flex-1 min-h-0 relative px-5 pt-3 pb-2">
            <div className="flex flex-col h-full space-y-2">
              {/* hero — real Clinical Circles banner recipe */}
              <div
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-blue-950 px-4 h-[56px] shrink-0 text-white shadow-lg border border-neutral-800 flex items-center justify-between gap-3"
                style={enterStyle(t, 100, 600)}
              >
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-52 h-52 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[9px] font-semibold border border-blue-500/30">
                      <Sparkles className="h-2.5 w-2.5 text-blue-400" />
                      Global Eye Care Clinical Exchange
                    </span>
                    <span className="text-[9px] text-neutral-400">
                      <b className="text-emerald-400 font-black">6</b> Circles
                      <span className="mx-1.5 text-neutral-600">•</span>
                      <b className="text-blue-400 font-black">24/7</b> Peer Collaboration
                    </span>
                  </div>
                  <h3 className="text-[15px] font-extrabold tracking-tight mt-0.5">Clinical Circles</h3>
                </div>
                <span className="relative shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold text-[11px] shadow-lg shadow-indigo-600/30">
                  <Calendar className="h-3.5 w-3.5 text-indigo-200" />
                  Events & Webinars
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </span>
              </div>

              {/* pain-point: scattered event info dissolves into the central board */}
              <div
                className="flex items-center justify-center gap-2.5 h-[28px] shrink-0"
                style={{
                  opacity: scatterOut,
                  filter: `blur(${(1 - scatterOut) * 3}px)`,
                  transform: `scale(${1 - (1 - scatterOut) * 0.06})`,
                }}
              >
                {['WhatsApp group', 'Email thread', 'IG story'].map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80 text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 line-through decoration-rose-400"
                  >
                    {s}
                  </span>
                ))}
                <span className="text-[10px] font-black text-rose-500 uppercase tracking-wider">
                  "which event, when?"
                </span>
              </div>

              {/* central events board — real events card recipe */}
              <div
                className="rounded-xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-white dark:from-neutral-900 dark:via-neutral-900/90 dark:to-blue-950/30 border border-blue-200/80 dark:border-neutral-800 shadow-sm p-3"
                style={enterStyle(t, 2200, 2800)}
              >
                <div className="flex items-center gap-2 h-[26px]">
                  <div className="h-6 w-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
                    <CalendarDays className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[12px] font-bold text-neutral-900 dark:text-white truncate">
                    Upcoming Grand Rounds, Webinars & CPD Masterclasses
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[9px] font-extrabold shrink-0">
                    6 Scheduled
                  </span>
                </div>

                {/* event 1 — Global Scleral Lens Symposium (real event) */}
                <div
                  className="mt-2 px-3 py-2.5 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200/90 dark:border-neutral-700/60 shadow-sm"
                  style={enterStyle(t, 2900, 3500)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[9px] font-bold">
                          Webinar
                        </span>
                        <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                          <Award className="h-2.5 w-2.5" /> 2.0 COPE
                        </span>
                      </div>
                      <h4 className="font-bold text-[12px] text-neutral-900 dark:text-white leading-snug mt-1 line-clamp-1">
                        Global Scleral Lens Symposium: Advanced Ectasia & Wavefront Optics Masterclass
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-[9px] font-bold border border-rose-200 dark:border-rose-900/50 whitespace-nowrap shrink-0">
                      In 2 days
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1.5 text-[10px] text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1.5 truncate">
                      <Clock className="h-3 w-3 text-neutral-400 shrink-0" />
                      Oct 14 • 19:00–20:30 UTC • Dr. Elena Vance
                    </span>
                    <span className="flex items-center gap-2 shrink-0">
                      {/* connections who RSVPed — pops after you join */}
                      <span
                        className="flex items-center"
                        style={{ opacity: stackP, transform: `translateY(${(1 - stackP) * 6}px)` }}
                      >
                        {[AVATARS.marcus, AVATARS.sarah, AVATARS.amara, AVATARS.tariq].map((src, i) => (
                          <span key={i} className={i > 0 ? '-ml-1.5' : ''}>
                            <DoctorAvatarMini src={src} i={i} />
                          </span>
                        ))}
                        <span className="-ml-1.5 h-5 px-1.5 rounded-full bg-neutral-100 dark:bg-neutral-700 text-[8px] font-black text-neutral-600 dark:text-neutral-200 flex items-center border border-white dark:border-neutral-800">
                          +12
                        </span>
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                          registered
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40'
                            : 'bg-blue-600 text-white shadow-sm ring-4 ring-blue-500/10'
                        }`}
                        style={registered ? { transform: `scale(${1 + registeredP * 0.05})` } : undefined}
                      >
                        {registered ? (
                          <>
                            <Check className="h-3 w-3" /> Going · {attendees}
                          </>
                        ) : (
                          <>
                            <Users className="h-3 w-3" /> RSVP · {attendees}
                          </>
                        )}
                      </span>
                    </span>
                  </div>
                </div>

                {/* event 2 — International Pediatric Myopia Summit (real event) */}
                <div
                  className="mt-1.5 px-3 py-2.5 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200/90 dark:border-neutral-700/60 shadow-sm flex items-start justify-between gap-3"
                  style={enterStyle(t, 5900, 6500)}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[9px] font-bold">
                        Global Congress
                      </span>
                      <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                        <Award className="h-2.5 w-2.5" /> 3.5 COPE
                      </span>
                    </div>
                    <h4 className="font-bold text-[12px] text-neutral-900 dark:text-white leading-snug mt-1 line-clamp-1">
                      International Pediatric Myopia Summit: 2026 Atropine & Ortho-K Guidelines
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-neutral-500 dark:text-neutral-400">
                      <Clock className="h-3 w-3 text-neutral-400" /> Oct 17 • London & Online • 518 attending
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-[9px] font-bold border border-rose-200 dark:border-rose-900/50 whitespace-nowrap shrink-0">
                    In 5 days
                  </span>
                </div>
              </div>

              {/* the circle itself — Grand Rounds Diagnostic Circle (real group) */}
              <div
                className="relative overflow-hidden rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm h-[84px] shrink-0"
                style={enterStyle(t, 8100, 8700)}
              >
                <div className="flex items-stretch h-full">
                  <SceneImg
                    src="https://images.unsplash.com/photo-1583912267670-6575ad472688?w=400&auto=format&fit=crop&q=80"
                    alt="Grand Rounds Diagnostic Circle"
                    className="w-40 shrink-0"
                    gradient="from-neutral-800 to-blue-950"
                  />
                  <div className="relative flex-1 px-3 py-2 min-w-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                    <div className="relative h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-semibold border border-white/20">
                          Clinical Pathology
                        </span>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/80 text-white text-[9px] font-bold">
                          <span className="h-1 w-1 rounded-full bg-white animate-pulse" />
                          388 Online
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="text-[12px] font-bold text-white truncate">
                            Grand Rounds Diagnostic Circle
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1 text-[9px] text-neutral-300">
                              <Users className="h-2.5 w-2.5 text-blue-400" />
                              <b className="text-white">12,400</b> members
                            </span>
                            {['case-debates', 'diagnostic-puzzles'].map((ch) => (
                              <span
                                key={ch}
                                className="inline-flex items-center gap-0.5 text-[9px] font-medium px-1.5 py-0.5 rounded bg-white/15 text-white/90"
                              >
                                <Hash className="h-2 w-2" />
                                {ch}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-300 shrink-0">
                          Enter Community <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <TapCursor
                moves={[
                  { start: 3900, end: 5600, x: 84, y: 46, clickAt: 4900 },
                  { start: 8700, end: 9900, x: 80, y: 88, clickAt: 9000 },
                ]}
              />

              <SceneToast t={t} start={10100}>
                <span className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Bell className="h-3 w-3" />
                </span>
                <span className="text-[12px] font-bold text-white dark:text-neutral-900">
                  Reminder set · Grand Rounds starts in 2 hours
                </span>
              </SceneToast>
            </div>
          </div>

          <SceneCaption
            t={tG}
            beats={[
              [0, 2500, 'Your next grand rounds is buried in a group chat.'],
              [2500, 4700, 'FocusLinks Circles — one central event board'],
              [4700, 7300, 'Scleral Symposium · Oct 14 · 342 going — one tap to RSVP'],
              [7300, 10100, 'Every circle, every event — date, time, RSVPs'],
              [10100, 12200, 'Reminders before doors open'],
              [12200, 14500, "FocusLinks Circles — never ask 'which event, when?' again."],
            ]}
          />
        </>
      }
    >
      <AdHook
        t={tG}
        revealAt={2400}
        eyebrow="Every clinician knows this"
        line="Your next grand rounds is buried in a group chat."
        accent="emerald"
        spotNo="02"
        bubbles={['which event??', 'was it Oct 14 or 17?', 'link pls', "who's going?"]}
      />
      <KineticBeat
        t={tG}
        start={9900}
        end={PUNCH_AT - 200}
        line="One board. Every event. Zero scroll-back."
        accent="emerald"
      />
      <AdPunchline
        t={tG}
        start={PUNCH_AT}
        feature="Circles"
        tagline="Never ask 'which event, when?' again."
        cta="Open Circles"
        accent="emerald"
      />
    </DemoWindow>
  );
};

/** tiny stacked avatar used in the RSVP strip */
const DoctorAvatarMini: React.FC<{ src: string; i: number }> = ({ src, i }) => (
  <span
    className="relative inline-block h-5 w-5 rounded-full ring-2 ring-white dark:ring-neutral-800 overflow-hidden bg-neutral-200 dark:bg-neutral-700 align-middle"
    style={{ zIndex: 4 - i }}
  >
    <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
  </span>
);
