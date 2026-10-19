import React from 'react';
import { DoctorAvatar } from '../../../common/DoctorAvatar';
import { AdHook, AdPunchline, StageBackdrop, TapCursor, SceneCaption, VerifiedShield } from './chrome';
import { AVATARS } from './chrome';
import { phase, easeOutCubic, easeInOutCubic, easeOutBack, adTiming } from '../sceneKit';
import { roleById, type EcosystemRoleId } from '../../../../data/ecosystem';

/** tiny default sizing for the roll-call member cards */
const DoctorAvatarSafe: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <DoctorAvatar src={src} alt={alt} className="h-10 w-10 rounded-full" />
);

/**
 * WHO CAN JOIN US? — THE ROLL-CALL CUT (20.2s membership film, brag contract).
 * Plan: brag-output/brag-plan.md → "SPOT 07 — WHO CAN JOIN US? (roll-call cut)".
 *
 * HOOK   0 → 2400        "Who can join FocusLinks?" + community ghost bubbles
 * WIPE   2400 → 3050
 * ROLL   3050 → 18050    twelve 1.25s beats, one per profession. Per beat:
 *                        a real member card floats in → cursor CLICKS it →
 *                        the card zooms into the ROLE WORD in the role's own
 *                        gradient (icon tile + one-line explainer) → out.
 * PUNCH  18100 → 20200   "Everyone who moves eye care forward belongs here."
 *
 * Brag law: real roster members, real role labels/gradients from ECOSYSTEM_ROLES.
 * Deviation (documented in the plan): no mid-spot KineticBeat — the roll call is
 * the kinetic spine. Authored once at 1280×720, 16:9 on every device, zero
 * player chrome. Every frame is transform/opacity/filter only — no layout,
 * fully scrub-safe (pure function of the clock).
 */

const DURATION = 20200;
const SEQ_START = 3050; // HOOK 2400 + WIPE 650
const BEAT = 1250; // 12 beats → ends 18050; PUNCH_AT = 20200 - 2100 = 18100

interface CastMember {
  name: string;
  cred: string;
  avatar?: string;
  initials?: string;
}

/** One beat per profession, in career-arc order (student → mission). */
const ROLL: { role: EcosystemRoleId; lead: CastMember; second?: CastMember }[] = [
  {
    role: 'student',
    lead: { name: 'Nadia Rahmani', cred: 'Doctor of Optometry Candidate · Class of 2027', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
  },
  {
    role: 'resident',
    lead: { name: 'Dr. Andre Boucher', cred: 'Ophthalmology Resident (PGY-3) · Wills Eye Hospital', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&auto=format&fit=crop&q=80' },
    second: { name: 'Dr. Maya Lin', cred: 'Resident Fellow 2026 · UW Medicine', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80' },
  },
  {
    role: 'optometrist',
    lead: { name: 'Dr. Amara Thorne', cred: 'OD, MS, FAAO · Apex Ophthalmic Consultants', avatar: AVATARS.amara },
    second: { name: 'Dr. Sarah Jenkins', cred: 'Primary Eye Care · San Jose, CA', avatar: AVATARS.sarah },
  },
  {
    role: 'ophthalmologist',
    lead: { name: 'Dr. Hannah Weiss', cred: 'Glaucoma Specialist & Surgeon · MIGS', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' },
    second: { name: 'Dr. Tariq Al-Mansoor', cred: 'Retina & Vitreous Surgery · Palo Alto', avatar: AVATARS.tariq },
  },
  {
    role: 'optician',
    lead: { name: 'James Whitfield', cred: 'Master Ophthalmic Optician · Lakeshore Optical Studio', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80' },
  },
  {
    role: 'orthoptist',
    lead: { name: 'Sofia Marchetti', cred: "Certified Orthoptist · Children's Hospital of Philadelphia", avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80' },
  },
  {
    role: 'ophthalmic-nurse',
    lead: { name: 'Grace Adeyemi', cred: 'Ophthalmic Nurse Specialist · Emory Eye Center', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&auto=format&fit=crop&q=80' },
  },
  {
    role: 'ophthalmic-technician',
    lead: { name: 'Derek Santos', cred: 'Imaging Lead · OCT, Ultra-Widefield & FAF', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
  },
  {
    role: 'vision-scientist',
    lead: { name: 'Dr. Leila Haddad', cred: 'Visual Neuroscientist · Stanford Byers Eye Institute', avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&auto=format&fit=crop&q=80' },
  },
  {
    role: 'educator',
    lead: { name: 'Dr. Alison Hartley', cred: 'Professor of Clinical Optometry · Ohio State', avatar: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=200&auto=format&fit=crop&q=80' },
  },
  {
    role: 'industry',
    lead: { name: 'Michael Tran', cred: 'Director of Clinical Affairs · Ophthalmic Imaging', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&auto=format&fit=crop&q=80' },
  },
  {
    role: 'public-health',
    lead: { name: 'Osazee Agbonlahor', cred: 'Public Health Eye Care · Treetop Vision Eye Centre, Abuja', initials: 'OA' },
  },
];

/** Giant word size that always fits the 1280px stage. */
const wordSize = (label: string) => (label.length > 24 ? 46 : label.length > 16 ? 58 : label.length > 10 ? 70 : 82);

/* ---------- one floating member card ---------- */

const MemberCard: React.FC<{
  m: CastMember;
  role: EcosystemRoleId;
  delay: number;
  x: number;
  rotate: number;
  driftPhase: number;
  ghost?: boolean;
  zoom: number;
  t: number;
}> = ({ m, role, delay, x, rotate, driftPhase, ghost = false, zoom, t }) => {
  const r = roleById(role);
  const inP = Math.min(easeOutBack(phase(t, delay, delay + 340)), 1.12);
  if (inP <= 0.001) return null;
  const drift = Math.sin(t / 700 + driftPhase) * 5;
  return (
    <div
      className={`absolute w-[300px] h-[68px] rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-md shadow-2xl flex items-center gap-3 px-3.5 ${ghost ? 'z-10' : 'z-20'}`}
      style={{
        left: `${x}%`,
        top: '30%',
        opacity: Math.min(inP, 1) * (ghost ? 0.68 : 1),
        transform: `translateX(-50%) translateY(${(1 - inP) * 26 + drift}px) rotate(${rotate}deg) scale(${(ghost ? 0.92 : 1) * (1 + zoom * 0.7)})`,
        filter: `blur(${(1 - Math.min(inP, 1)) * 6 + zoom * 7}px)`,
      }}
    >
      {m.avatar ? (
        <span className="relative shrink-0">
          <DoctorAvatarSafe src={m.avatar} alt={m.name} />
          {!ghost && <VerifiedShield className="h-4.5 w-4.5 p-[2.5px] -bottom-0.5 -right-0.5" badge="h-2.5 w-2.5" />}
        </span>
      ) : (
        <span
          className={`h-10 w-10 shrink-0 rounded-full bg-gradient-to-tr ${r.gradient} flex items-center justify-center text-[13px] font-black text-white`}
        >
          {m.initials}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-bold text-white truncate leading-tight">{m.name}</span>
        <span className="block text-[10.5px] text-neutral-400 truncate leading-tight mt-0.5">{m.cred}</span>
      </span>
      <span className="h-8 w-8 shrink-0 rounded-lg bg-white/[0.08] border border-white/10 flex items-center justify-center">
        <r.icon className="h-4 w-4 text-white" aria-hidden="true" />
      </span>
    </div>
  );
};

/* ---------- the scene ---------- */

export const WhoJoinsScene: React.FC<{ t: number }> = ({ t: tG }) => {
  const { PUNCH_AT } = adTiming(DURATION);

  // which roll-call beat is live
  const beatIdx = Math.floor((tG - SEQ_START) / BEAT);
  const inSeq = tG >= SEQ_START && beatIdx >= 0 && beatIdx < ROLL.length;
  const beat = inSeq ? ROLL[beatIdx] : null;
  const bt = inSeq ? tG - (SEQ_START + beatIdx * BEAT) : 0; // local beat clock
  const beatRole = beat ? roleById(beat.role) : null;

  // card zoom-out as the word slams in
  const zoom = inSeq ? easeInOutCubic(phase(bt, 560, 880)) : 0;
  // word in / out
  const wp = inSeq ? easeOutBack(phase(bt, 600, 980)) : 0;
  const wpClamped = Math.min(wp, 1.12);
  const outP = inSeq ? easeInOutCubic(phase(bt, 1080, BEAT)) : 0;
  const tagP = inSeq ? easeOutCubic(phase(bt, 800, 1100)) : 0;

  const side = beatIdx % 2 === 0 ? 46 : 54; // alternating card position for rhythm

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#07070c] select-none">
      {/* ---- cinematic backdrop ---- */}
      <StageBackdrop accent="rose" t={tG} />

      {/* ---- role beat: floating cards + zoom word ---- */}
      {beat && beatRole && (
        <>
          {/* role-colored glow behind the word */}
          <div
            className={`absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 h-[300px] w-[560px] rounded-full blur-[110px] bg-gradient-to-r ${beatRole.gradient}`}
            style={{ opacity: 0.16 * Math.min(wpClamped, 1) * (1 - outP), transform: `translateX(-50%) translateY(-50%) scale(${0.7 + Math.min(wpClamped, 1) * 0.3})` }}
          />

          {/* ghost second member card drifts behind the lead */}
          {beat.second && (
            <MemberCard
              m={beat.second}
              role={beat.role}
              delay={90}
              x={side - 4}
              rotate={beatIdx % 2 === 0 ? 5 : -5}
              driftPhase={beatIdx * 1.7 + 2}
              ghost
              zoom={zoom}
              t={bt}
            />
          )}

          {/* lead member card — the cursor clicks THIS */}
          <MemberCard
            m={beat.lead}
            role={beat.role}
            delay={0}
            x={side}
            rotate={beatIdx % 2 === 0 ? -4 : 4}
            driftPhase={beatIdx * 1.3}
            zoom={zoom}
            t={bt}
          />

          {/* THE WORD — card zooms into this */}
          {wp > 0.001 && outP < 1 && (
            <div
              className="absolute left-1/2 top-[54%] z-20 flex flex-col items-center text-center"
              style={{
                opacity: Math.min(wpClamped * 1.4, 1) * (1 - outP),
                transform: `translateX(-50%) translateY(-50%) scale(${(0.62 + Math.min(wpClamped, 1.12) * 0.38) * (1 + outP * 0.28)})`,
                filter: `blur(${(1 - Math.min(wp, 1)) * 14 + outP * 10}px)`,
              }}
            >
              <span
                className={`h-14 w-14 rounded-2xl bg-gradient-to-r ${beatRole.gradient} shadow-lg flex items-center justify-center mb-5`}
              >
                <beatRole.icon className="h-7 w-7 text-white" aria-hidden="true" />
              </span>
              <h3
                className="font-black tracking-tight text-balance"
                style={{ fontSize: wordSize(beatRole.label), lineHeight: 1.08 }}
              >
                <span className={`bg-gradient-to-r ${beatRole.gradient} bg-clip-text text-transparent`}>
                  {beatRole.label}
                </span>
              </h3>
              <p
                className="mt-4 max-w-[820px] text-[15px] font-medium text-neutral-400"
                style={{ opacity: tagP, transform: `translateY(${(1 - tagP) * 10}px)` }}
              >
                {beatRole.tagline}
              </p>
            </div>
          )}
        </>
      )}

      {/* ---- 12-dot progress rail ---- */}
      <div className="absolute bottom-[58px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {ROLL.map((b, i) => {
          const r = roleById(b.role);
          const active = i === beatIdx;
          const done = beatIdx > i;
          return (
            <span
              key={b.role}
              className={`h-1.5 rounded-full transition-none ${
                active ? `w-6 bg-gradient-to-r ${r.gradient}` : done ? 'w-1.5 bg-white/45' : 'w-1.5 bg-white/15'
              }`}
            />
          );
        })}
      </div>

      {/* ---- simulated cursor: one click per beat ---- */}
      <TapCursor
        moves={ROLL.map((_, i) => ({
          start: SEQ_START + i * BEAT + 180,
          end: SEQ_START + i * BEAT + 700,
          x: (i % 2 === 0 ? 46 : 54) + 3,
          y: 35,
          clickAt: SEQ_START + i * BEAT + 430,
        }))}
      />

      {/* ---- burned-in subtitle strip (voiceover script) ---- */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <SceneCaption
          t={tG}
          beats={[
            [0, 3050, 'The question we hear every day: "Who can join?"'],
            [3050, 5550, 'It starts with a student — then residency'],
            [5550, 8050, 'Into practice — optometry and ophthalmology'],
            [8050, 13050, 'The full clinical team: optical, orthoptics, nursing, imaging'],
            [13050, 15550, 'The science — and the teaching'],
            [15550, 18100, 'Industry, and eye health for communities worldwide'],
            [18100, 20200, 'FocusLinks — a seat for every eye care professional'],
          ]}
        />
      </div>

      {/* ---- ad overlays: hook → punchline ---- */}
      <AdHook
        t={tG}
        revealAt={2400}
        eyebrow="The membership question"
        line="Who can join FocusLinks?"
        accent="rose"
        bubbles={["I'm an optician…", 'Do residents count?', "I'm a nurse — me?", 'What about PhDs?']}
      />
      <AdPunchline
        t={tG}
        start={PUNCH_AT}
        feature="Open to All"
        tagline="Everyone who moves eye care forward belongs here."
        cta="Claim your free ID"
        accent="rose"
      />
    </div>
  );
};
