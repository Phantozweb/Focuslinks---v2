import React from 'react';
import {
  Stethoscope,
  Plus,
  ArrowUp,
  Check,
  BadgeCheck,
  Eye,
  MessageSquare,
  Users,
} from 'lucide-react';
import { DemoWindow, AppHeaderBar, SceneCaption, SceneImg, TapCursor, VerifiedShield } from './chrome';
import { enterStyle, phase, easeOutCubic, tickNumber } from '../sceneKit';
import { DoctorAvatar } from '../../../common/DoctorAvatar';

/**
 * CONSULTS — native replica of the real "Peer Consults & Second Opinions" screen.
 * Real data: hub pills from MOCK_TOPICS + the real q-retina-1 consult
 * (CSR vs occult Type 1 CNV) with Dr. Sirenjeev's accepted answer.
 * Duration 11.5s.
 */
export const ConsultsScene: React.FC<{ t: number }> = ({ t }) => {
  const DURATION = 11500;

  const hubs = [
    { name: 'Retina & Macula', color: 'bg-amber-500', followers: '4,820' },
    { name: 'Glaucoma & Neuro', color: 'bg-emerald-500', followers: '5,120' },
    { name: 'Cornea & Sclerals', color: 'bg-blue-500', followers: '6,340' },
    { name: 'Pediatrics & Myopia', color: 'bg-purple-500', followers: '3,910' },
    { name: 'Dry Eye', color: 'bg-sky-500', followers: '4,210' },
  ];

  const hubSelected = t >= 2300;
  const answersIn = t >= 5200;
  const upvoted = t >= 7300;
  const upvotes = upvoted ? tickNumber(t, 7300, 7900, 98, 99) : 98;
  const voteP = easeOutCubic(phase(t, 7300, 7700));

  return (
    <DemoWindow url="focuslinks.app/consults" accent="bg-violet-500">
      <div className="flex flex-col h-full relative">
        <AppHeaderBar breadcrumb="Consults" />

        <div className="flex-1 overflow-hidden relative p-3 sm:p-4 space-y-2.5">
          {/* hero — real Consults banner recipe */}
          <div
            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-2.5 sm:p-3 text-white shadow-lg border border-blue-900/40"
            style={enterStyle(t, 100, 600)}
          >
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
            <div className="relative flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[7.5px] font-bold">
                  <Stethoscope className="h-2.5 w-2.5" />
                  Clinical Consults • The Peer Brain Trust
                </span>
                <h3 className="text-[13px] sm:text-sm font-black tracking-tight mt-1">
                  Peer Consults & Second Opinions
                </h3>
                <span className="text-[8px] text-neutral-400 hidden sm:block">
                  Crowdsourced from verified optometrists & ophthalmologists worldwide
                </span>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1 px-2 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-[8.5px] shadow-lg shadow-blue-500/30">
                <Plus className="h-2.5 w-2.5 stroke-[3]" /> Initiate Case Consult
              </span>
            </div>
          </div>

          {/* hub pills — real topic names & colors */}
          <div className="flex items-center gap-1.5 overflow-hidden">
            {hubs.map((h, i) => {
              const active = hubSelected && h.name === 'Retina & Macula';
              return (
                <span
                  key={h.name}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[8.5px] font-bold whitespace-nowrap shrink-0 border ${
                    active
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500/40 text-amber-700 dark:text-amber-300'
                      : 'bg-white dark:bg-[#18181c] border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300'
                  }`}
                  style={enterStyle(t, 1000 + i * 130, 1600 + i * 130, 8)}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${h.color} shrink-0`} />
                  {h.name}
                  {active && <span className="text-[7px] font-bold text-amber-600 dark:text-amber-400">· 4,820</span>}
                </span>
              );
            })}
          </div>

          {/* the real q-retina-1 consult card */}
          <div
            className="rounded-xl bg-white dark:bg-[#121216] border border-neutral-200/90 dark:border-neutral-800/90 shadow-sm p-2.5 sm:p-3"
            style={enterStyle(t, 2900, 3500)}
          >
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-1.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-[7.5px] font-bold">
                Retina & Macula
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-[7.5px] font-bold">
                Case Consult
              </span>
            </div>
            <h4 className="text-[10px] sm:text-[11px] font-bold text-neutral-900 dark:text-white leading-snug mt-1.5 line-clamp-2">
              How do you differentiate chronic CSR with flat irregular PED from occult Type 1 CNV on SD-OCT?
            </h4>
            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
              <span className="text-[7.5px] font-semibold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                47yo M
              </span>
              <span className="text-[7.5px] font-semibold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                OD 20/40
              </span>
              <span className="text-[7.5px] font-semibold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                IOP 14 mmHg
              </span>
              <span className="text-[7.5px] font-semibold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center gap-0.5">
                <Eye className="h-2 w-2" /> Spectralis SD-OCT
              </span>
            </div>
            <div className="flex items-center justify-between mt-2 gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="relative shrink-0">
                  <DoctorAvatar
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80"
                    alt="Dr. Marcus Chen"
                    className="h-6 w-6 rounded-full"
                  />
                  <VerifiedShield className="h-3 w-3 p-[2px] -bottom-0.5 -right-0.5" badge="h-2 w-2" />
                </div>
                <div className="min-w-0 leading-tight">
                  <span className="block text-[9px] font-bold text-neutral-900 dark:text-neutral-100 truncate">
                    Dr. Marcus Chen
                  </span>
                  <span className="block text-[7.5px] font-medium text-blue-600 dark:text-blue-400">
                    OD, FAAO · 3h ago
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-[8.5px] font-black">
                  <ArrowUp className="h-2.5 w-2.5" /> 142
                </span>
                <span className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg text-neutral-500 text-[8px] font-bold">
                  <MessageSquare className="h-2.5 w-2.5" /> 4
                </span>
              </div>
            </div>
          </div>

          {/* accepted answer — real content distilled from ans-r1-1 */}
          {answersIn && (
            <div
              className="rounded-xl bg-white dark:bg-[#121216] border border-emerald-500/30 dark:border-emerald-500/30 shadow-sm p-2.5 sm:p-3 relative"
              style={enterStyle(t, 5200, 5800)}
            >
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[7.5px] font-bold">
                  <Check className="h-2 w-2" /> Accepted Answer
                </span>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[7.5px] font-bold">
                  <BadgeCheck className="h-2 w-2" /> Peer Endorsed
                </span>
                <span className="text-[7.5px] font-semibold text-neutral-400">Top consensus</span>
              </div>
              <p className="text-[9px] sm:text-[9.5px] text-neutral-700 dark:text-neutral-200 leading-relaxed mt-1.5 line-clamp-3">
                "Look for <b>heterogeneous internal reflectivity</b> within the flat irregular PED — assume Type 1 CNV
                until proven otherwise. Stop the nasal steroid, and expedite retina referral if acuity drops a line…"
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <DoctorAvatar
                    src="https://images.unsplash.com/photo-1594824813501-4838e82ef573?w=200&auto=format&fit=crop&q=80"
                    alt="Dr. Sirenjeev"
                    className="h-6 w-6 rounded-full"
                  />
                  <div className="min-w-0 leading-tight">
                    <span className="block text-[9px] font-bold text-neutral-900 dark:text-neutral-100 truncate">
                      Dr. Sirenjeev, OD
                    </span>
                    <span className="block text-[7.5px] font-medium text-blue-600 dark:text-blue-400">
                      OD, FAAO, FSLS · 1h ago
                    </span>
                  </div>
                </div>
                <span
                  className={`shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-[8.5px] font-black transition-colors ${
                    upvoted
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200'
                  }`}
                  style={upvoted ? { transform: `scale(${1 + voteP * 0.08})` } : undefined}
                >
                  <ArrowUp className="h-2.5 w-2.5" /> {upvotes}
                </span>
              </div>
            </div>
          )}

          {/* peer answer teaser */}
          <div
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/70 dark:bg-[#141418]/70 border border-neutral-200/70 dark:border-neutral-800/70"
            style={enterStyle(t, 8300, 8900)}
          >
            <DoctorAvatar
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80"
              alt="Dr. Sarah Jenkins"
              className="h-5 w-5 rounded-full"
            />
            <span className="text-[8.5px] font-bold text-neutral-700 dark:text-neutral-200 truncate">
              Dr. Sarah Jenkins — "Watch for subretinal fibrin & shaggy photoreceptors…"
            </span>
            <span className="ml-auto shrink-0 flex items-center gap-0.5 text-[8px] font-black text-neutral-500 dark:text-neutral-400">
              <ArrowUp className="h-2.5 w-2.5" /> 46
            </span>
          </div>

          {/* ask bar — real quick-consult prompt */}
          <div
            className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#121216] border border-neutral-200/90 dark:border-neutral-800/90 shadow-sm"
            style={enterStyle(t, 9300, 9900)}
          >
            <DoctorAvatar
              src="https://images.unsplash.com/photo-1594824813501-4838e82ef573?w=200&auto=format&fit=crop&q=80"
              alt="Dr. Sirenjeev"
              className="h-7 w-7 rounded-full"
            />
            <div className="flex-1 bg-neutral-100/80 dark:bg-[#181820] text-neutral-500 dark:text-neutral-400 text-[8.5px] px-2.5 py-1.5 rounded-lg truncate font-medium">
              Have a challenging cornea, retina, or glaucoma case, Dr. Sirenjeev?
            </div>
            <span className="px-2.5 py-1.5 rounded-lg bg-blue-600 text-white text-[8.5px] font-extrabold shrink-0 shadow-sm">
              Ask ODs
            </span>
          </div>

          {/* contributor stat */}
          <div
            className="flex items-center gap-1 text-[8px] font-semibold text-neutral-400 dark:text-neutral-500"
            style={{ opacity: phase(t, 10300, 10800) * (1 - phase(t, 11100, 11150)) }}
          >
            <Users className="h-2.5 w-2.5" /> 19 specialty hubs · answers ranked by community upvotes
          </div>

          <TapCursor
            moves={[
              { start: 1300, end: 3000, x: 17, y: 25, clickAt: 2300 },
              { start: 6300, end: 8100, x: 89, y: 63, clickAt: 7300 },
            ]}
          />
        </div>

        <SceneCaption
          t={t}
          duration={DURATION}
          beats={[
            [0, 2000, 'Nineteen specialty hubs of verified peers'],
            [2000, 4400, 'Real case: chronic CSR vs occult Type 1 CNV'],
            [4400, 7300, 'Fellows answer — the best rises by upvotes'],
            [7300, 9500, 'Accepted answers, peer-endorsed'],
            [9500, 11500, 'Ask ODs — contribute to any hub'],
          ]}
        />
      </div>
    </DemoWindow>
  );
};
