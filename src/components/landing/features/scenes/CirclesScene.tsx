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
  ChevronRight,
  Flame,
  Bell,
} from 'lucide-react';
import { DemoWindow, AppHeaderBar, SceneCaption, SceneImg, TapCursor, SceneToast } from './chrome';
import { enterStyle, phase, easeOutCubic, tickNumber } from '../sceneKit';

/**
 * CIRCLES — native replica of the real "Clinical Circles" hub.
 * Story: event info used to be scattered across chats & inboxes →
 * one central board with real events (Scleral Symposium, Myopia Summit),
 * one-tap RSVP, then the Grand Rounds circle itself.
 * Real data from MOCK_CLINICAL_EVENTS / MOCK_GROUPS. Duration 11s.
 */
export const CirclesScene: React.FC<{ t: number }> = ({ t }) => {
  const DURATION = 11000;

  // pain-point scatter chips dissolve at ~1.7-2.3s
  const scatterOut = 1 - phase(t, 1700, 2300);

  // RSVP on the Scleral Symposium at 4.6s
  const registered = t >= 4900;
  const attendees = registered ? tickNumber(t, 4900, 5600, 342, 343) : 342;

  const registeredP = easeOutCubic(phase(t, 4900, 5300));

  return (
    <DemoWindow url="focuslinks.app/circles" accent="bg-indigo-500">
      <div className="flex flex-col h-full relative">
        <AppHeaderBar breadcrumb="Circles" />

        <div className="flex-1 overflow-hidden relative p-3 sm:p-4 space-y-2.5">
          {/* hero — real Clinical Circles banner recipe */}
          <div
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-blue-950 p-2.5 sm:p-3.5 text-white shadow-lg border border-neutral-800"
            style={enterStyle(t, 100, 600)}
          >
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[8px] font-semibold border border-blue-500/30">
                  <Sparkles className="h-2.5 w-2.5 text-blue-400" />
                  Global Optometrists Clinical Exchange
                </span>
                <h3 className="text-[13px] sm:text-sm font-extrabold tracking-tight mt-1">Clinical Circles</h3>
                <div className="flex items-center gap-2 mt-0.5 text-[8px] text-neutral-400">
                  <span className="font-bold text-emerald-400">6</span> Circles
                  <span className="text-neutral-600">•</span>
                  <span className="font-bold text-blue-400">24/7</span> Peer Collaboration
                </div>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold text-[9px] shadow-lg shadow-indigo-600/30">
                <Calendar className="h-3 w-3 text-indigo-200" />
                Events & Webinars
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
            </div>
          </div>

          {/* pain-point: scattered event info dissolves into the central board */}
          <div
            className="flex items-center justify-center gap-2 py-0.5"
            style={{ opacity: scatterOut, filter: `blur(${(1 - scatterOut) * 3}px)`, transform: `scale(${1 - (1 - scatterOut) * 0.06})` }}
          >
            {['WhatsApp group', 'Email thread', 'IG story'].map((s) => (
              <span key={s} className="px-2 py-1 rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80 text-[8px] font-semibold text-neutral-500 dark:text-neutral-400 line-through decoration-rose-400">
                {s}
              </span>
            ))}
            <span className="text-[8px] font-black text-rose-500 uppercase tracking-wider">"which event, when?"</span>
          </div>

          {/* central events board — real events card recipe */}
          <div
            className="rounded-xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-white dark:from-neutral-900 dark:via-neutral-900/90 dark:to-blue-950/30 border border-blue-200/80 dark:border-neutral-800 shadow-sm p-2.5 sm:p-3"
            style={enterStyle(t, 2200, 2800)}
          >
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-5 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
                <CalendarDays className="h-3 w-3" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-neutral-900 dark:text-white truncate">
                Upcoming Grand Rounds, Webinars & CPD Masterclasses
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[8px] font-extrabold shrink-0">
                6 Scheduled
              </span>
            </div>

            {/* event 1 — Global Scleral Lens Symposium (real event) */}
            <div
              className="mt-2 p-2.5 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200/90 dark:border-neutral-700/60 shadow-sm"
              style={enterStyle(t, 2900, 3500)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[7.5px] font-bold">
                      Webinar
                    </span>
                    <span className="text-[7.5px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                      <Award className="h-2.5 w-2.5" /> 2.0 COPE
                    </span>
                  </div>
                  <h4 className="font-bold text-[9.5px] sm:text-[10.5px] text-neutral-900 dark:text-white leading-snug mt-1 line-clamp-2">
                    Global Scleral Lens Symposium: Advanced Ectasia & Wavefront Optics Masterclass
                  </h4>
                </div>
                <span className="px-1.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-[7.5px] font-bold border border-rose-200 dark:border-rose-900/50 whitespace-nowrap shrink-0">
                  In 2 days
                </span>
              </div>
              <div className="flex items-center justify-between mt-1.5 text-[8px] text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1 truncate">
                  <Clock className="h-2.5 w-2.5 text-neutral-400 shrink-0" />
                  Oct 14 • 19:00–20:30 UTC • Dr. Elena Vance
                </span>
                <span
                  className={`shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[8px] font-bold transition-colors ${
                    registered
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40'
                      : 'bg-blue-600 text-white shadow-sm ring-4 ring-blue-500/10'
                  }`}
                  style={registered ? { transform: `scale(${1 + registeredP * 0.05})` } : undefined}
                >
                  {registered ? (
                    <>
                      <Check className="h-2.5 w-2.5" /> Going · {attendees}
                    </>
                  ) : (
                    <>
                      <Users className="h-2.5 w-2.5" /> RSVP · {attendees}
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* event 2 — International Pediatric Myopia Summit (real event) */}
            <div
              className="mt-1.5 p-2.5 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200/90 dark:border-neutral-700/60 shadow-sm flex items-start justify-between gap-2"
              style={enterStyle(t, 5900, 6500)}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[7.5px] font-bold">
                    Global Congress
                  </span>
                  <span className="text-[7.5px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                    <Award className="h-2.5 w-2.5" /> 3.5 COPE
                  </span>
                </div>
                <h4 className="font-bold text-[9.5px] sm:text-[10.5px] text-neutral-900 dark:text-white leading-snug mt-1 line-clamp-1">
                  International Pediatric Myopia Summit: 2026 Atropine & Ortho-K Guidelines
                </h4>
                <div className="flex items-center gap-1 mt-1 text-[8px] text-neutral-500 dark:text-neutral-400">
                  <Clock className="h-2.5 w-2.5 text-neutral-400" /> Oct 17 • London & Online • 518 attending
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-[7.5px] font-bold border border-rose-200 dark:border-rose-900/50 whitespace-nowrap shrink-0">
                In 5 days
              </span>
            </div>
          </div>

          {/* the circle itself — Grand Rounds Diagnostic Circle (real group) */}
          <div
            className="group relative overflow-hidden rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm"
            style={enterStyle(t, 8100, 8700)}
          >
            <div className="flex items-stretch">
              <SceneImg
                src="https://images.unsplash.com/photo-1583912267670-6575ad472688?w=400&auto=format&fit=crop&q=80"
                alt="Grand Rounds Diagnostic Circle"
                className="w-24 sm:w-32 shrink-0"
                gradient="from-neutral-800 to-blue-950"
              />
              <div className="relative flex-1 p-2.5 min-w-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-1">
                    <span className="px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[7.5px] font-semibold border border-white/20">
                      Clinical Pathology
                    </span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/80 text-white text-[7.5px] font-bold">
                      <span className="h-1 w-1 rounded-full bg-white animate-pulse" />
                      388 Online
                    </span>
                  </div>
                  <h4 className="text-[10px] font-bold text-white mt-1 truncate">Grand Rounds Diagnostic Circle</h4>
                  <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                    {['case-debates', 'diagnostic-puzzles'].map((ch) => (
                      <span key={ch} className="inline-flex items-center gap-0.5 text-[7.5px] font-medium px-1 py-0.5 rounded bg-white/15 text-white/90">
                        <Hash className="h-2 w-2" />
                        {ch}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-1.5 text-[8px] text-neutral-300">
                    <span className="flex items-center gap-1">
                      <Users className="h-2.5 w-2.5 text-blue-400" />
                      <b className="text-white">12,400</b> optoms
                    </span>
                    <span className="inline-flex items-center gap-0.5 font-semibold text-blue-300">
                      Enter Community <ArrowRight className="h-2.5 w-2.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <TapCursor
            moves={[
              { start: 3900, end: 5600, x: 84, y: 46, clickAt: 4900 },
              { start: 8700, end: 9900, x: 78, y: 84, clickAt: 9000 },
            ]}
          />

          <SceneToast t={t} start={10100}>
            <span className="h-4 w-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Bell className="h-2.5 w-2.5" />
            </span>
            <span className="text-[10px] font-bold text-white dark:text-neutral-900">
              Reminder set · Grand Rounds starts in 2 hours
            </span>
          </SceneToast>

          {/* trending flame accent, bottom-left, late beat */}
          <div
            className="absolute bottom-3 left-3 flex items-center gap-1 text-[8px] font-bold text-amber-600 dark:text-amber-400"
            style={{ opacity: phase(t, 9300, 9800) * (1 - phase(t, 10450, 10500)) }}
          >
            <Flame className="h-3 w-3" /> Most Popular Global Communities
            <ChevronRight className="h-2.5 w-2.5" />
          </div>
        </div>

        <SceneCaption
          t={t}
          duration={DURATION}
          beats={[
            [0, 1700, 'Circles — clinical communities that actually stay in sync'],
            [1700, 3300, 'No more event info scattered across chats'],
            [3300, 6200, 'One central board: date, time, CE credits, RSVP'],
            [6200, 8300, 'Every circle event, in one place'],
            [8300, 11000, 'Join, share knowledge & get reminders'],
          ]}
        />
      </div>
    </DemoWindow>
  );
};
