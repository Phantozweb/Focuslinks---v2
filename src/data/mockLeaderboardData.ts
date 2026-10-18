import { TopicLeaderboardEntry } from '../types';
import { CURRENT_USER, OTHER_DOCTORS } from './mockData';
import { MOCK_TOPICS } from './mockQaData';

/* ------------------------------------------------------------------
   Topic Hub leaderboards — top contributors per topic hub per period.
   Generated deterministically (seeded hash — stable across reloads)
   from the doctor roster in mockData.ts so every hub ships with:
     • all 3 periods ('week' | 'month' | 'all-time')
     • 7 ranked rows, points strictly descending
     • domain-flavored badge titles per hub
     • exactly one isCurrentUser entry (CURRENT_USER) per topic-period
   ------------------------------------------------------------------ */

type LeaderboardPeriod = TopicLeaderboardEntry['period'];

/** Domain-flavored contributor badges, ordered by rank (index 0 = #1). */
const TOPIC_BADGES: Record<string, string[]> = {
  'topic-retina': ['Retina Roundtable Host', 'OCT Biomarker Ace', 'Anti-VEGF Strategist', 'DR Grading Guru', 'Pachychoroid Specialist', 'CSR Case Master', 'Fundus Imaging Pro', 'Top Answerer'],
  'topic-glaucoma': ['Target IOP Tactician', 'Field Printout Professor', 'SLT Protocol Chair', 'Progression Analysis Pro', 'Neuro-Ophthalm Ally', 'GPA Grandmaster', 'Perimetry Perfectionist', 'Top Answerer'],
  'topic-cornea': ['Scleral Lens Guru', 'Ectasia Strategist', 'AS-OCT Fitting Pro', 'CXL Threshold Chair', 'Irregular Cornea Ace', 'Vault Master', 'Wavefront Wizard', 'Top Answerer'],
  'topic-myopia': ['Myopia Maven', 'Atropine Dosage Dean', 'Ortho-K Optimizer', 'Axial Length Tracker', 'LAMP Trial Scholar', 'Binocular Vision Beacon', 'Halometer Hero', 'Top Answerer'],
  'topic-dry-eye': ['Gland Guardian', 'IPL Protocol Chair', 'Meibography Maven', 'Demodex Desk Lead', 'Serum Drop Specialist', 'Neurotrophic Ninja', 'TBUT Timekeeper', 'Top Answerer'],
  'topic-cataract': ['Premium IOL Strategist', 'Biometry Boss', 'Co-Management Captain', 'Dysphotopsia Detective', 'TASS Triage Lead', 'EDOF Evaluator', 'Post-Op Pod Master', 'Top Answerer'],
  'topic-pharma': ['Steroid Response Specialist', 'Off-Label Oracle', 'Plaquenil Protocol Chair', 'GLP-1 Watch Officer', 'Interaction Investigator', 'Formulary Fellow', 'Dosing Data Desk', 'Top Answerer'],
  'topic-uveitis': ['Uveitis Roundtable Host', 'Anterior Chamber Ace', 'JIA Screening Sentinel', 'Steroid-Sparing Strategist', 'HLA-B27 Hunter', 'Sarcoid Sleuth', 'Masquerade Detective', 'Top Answerer'],
  'topic-clfit': ['Fit & Flex Chair', 'Toric Rotation Wrangler', 'Multifocal Maestro', 'Hybrid Lens Hero', 'OCT Fit Analyst', 'Corneal Sag Specialist', 'Scleral Selection Chair', 'Top Answerer'],
  'topic-kconus': ['Cross-Linking Chair', 'Pentacam Professor', 'Ectasia Watch Officer', 'RGP Optimization Pro', 'Intacs Strategist', 'Progression Tracker', 'Corneal Hysteresis Head', 'Top Answerer'],
  'topic-bvvt': ['VT Protocol Chair', 'Vergence Virtuoso', 'CITT Scholar', 'Accommodation Ace', 'Fusion Fixer', 'Prism Strategy Pro', 'Stereopsis Specialist', 'Top Answerer'],
  'topic-strab': ['Alignment Architect', 'Amblyopia Advocate', 'Occlusion Strategist', 'Sensorimotor Specialist', 'Referral Timing Chair', 'Patch Protocol Pro', 'Muscle Math Mentor', 'Top Answerer'],
  'topic-refractive': ['Co-Management Chair', 'SMILE Suitability Scout', 'LASIK Kinetics Lead', 'Keratometry Keeper', 'Enhancement Etiquette Lead', 'Referral Referee', 'Post-Op Dry-Eye Desk', 'Top Answerer'],
  'topic-oct': ['Segmentation Sleuth', 'Artifact Annihilator', 'Scan Quality Sentinel', 'RNFL Reader', 'Angiography Ace', 'Protocol Master', 'B-scan Boss', 'Top Answerer'],
  'topic-ai': ['Algorithm Auditor', 'Digital Health Dean', 'Telehealth Tactician', 'Triaging Tools Chair', 'Model Bias Monitor', 'Data Privacy Pro', 'Workflow Wizard', 'Top Answerer'],
  'topic-retinaimaging': ['Imaging Roundtable Host', 'Ultra-Widefield Umpire', 'OCT-A Flow Master', 'En-Face Enthusiast', 'Montage Maestro', 'Pathology Spotter', 'Grading Guard', 'Top Answerer'],
  'topic-billing': ['Prior Auth Pathfinder', 'CPT Code Counsel', 'Medical Necessity Pro', 'Modifier Master', 'Audit Shield', 'Reimbursement Ranger', 'Compliance Captain', 'Top Answerer'],
  'topic-students': ['Board Prep Captain', 'NBEO Ally', 'Resident Application Coach', 'Clinic First-Year Guide', 'Study Group Chair', 'Pearl Curator', 'Mentor-at-Large', 'Top Answerer'],
  'topic-optics': ['Prism Perfectionist', 'Transposition Tutor', 'Progressive Pal', 'Vertex Virtuoso', 'Abbe Value Analyst', 'Anisometropia Arbiter', 'Lens Material Maven', 'Top Answerer'],
};

const FALLBACK_BADGES = ['Top Answerer', 'Community Pillar', 'Consensus Builder', 'Clinical Pearl Curator', 'Rising Contributor', 'Fast Responder', 'Peer Endorsed', 'Discussion Driver'];

const PERIODS: LeaderboardPeriod[] = ['week', 'month', 'all-time'];

// Relative magnitude of each period's activity vs a single week
const PERIOD_SCALE: Record<LeaderboardPeriod, number> = { week: 1, month: 3.6, 'all-time': 24 };

const ROWS_PER_BOARD = 7;

/** FNV-1a string hash → uint32 (deterministic seed source). */
const hashString = (value: string): number => {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

/** Deterministic pseudo-random integer in [min, max] from a seed string. */
const seededInt = (seed: string, min: number, max: number): number => {
  const h = hashString(seed);
  return min + (h % (max - min + 1));
};

const trendFor = (seed: string): TopicLeaderboardEntry['trend'] => {
  const bucket = hashString(seed) % 10;
  if (bucket < 4) return 'up';
  if (bucket < 7) return 'steady';
  return 'down';
};

const roleFor = (doctor: { currentRole: string; cityState?: string }): string =>
  doctor.cityState ? `${doctor.currentRole} · ${doctor.cityState}` : doctor.currentRole;

const buildLeaderboard = (): TopicLeaderboardEntry[] => {
  const entries: TopicLeaderboardEntry[] = [];

  MOCK_TOPICS.forEach((topic, topicIndex) => {
    const badges = TOPIC_BADGES[topic.id] ?? FALLBACK_BADGES;

    PERIODS.forEach((period, periodIndex) => {
      // Board size scales the peak score with hub traffic + period span
      const weeklyBase = 620 + (topic.weeklyAsks ?? 6) * 44 + (hashString(topic.id) % 180);
      const peakPoints = Math.round(weeklyBase * PERIOD_SCALE[period]);

      // Rotate a distinct 6-peer window through the doctor roster
      const rosterStart = (topicIndex * 3 + periodIndex * 5) % OTHER_DOCTORS.length;
      const peers = Array.from(
        { length: ROWS_PER_BOARD - 1 },
        (_, k) => OTHER_DOCTORS[(rosterStart + k) % OTHER_DOCTORS.length]
      );

      // The current user slots into a stable mid-rank (2–5) per board
      const currentUserRank = 2 + ((topicIndex + periodIndex * 2) % 4);

      let peerCursor = 0;
      for (let rank = 1; rank <= ROWS_PER_BOARD; rank++) {
        const isCurrentUser = rank === currentUserRank;
        const doctor = isCurrentUser ? CURRENT_USER : peers[peerCursor++];
        const doctorKey = isCurrentUser ? CURRENT_USER.id : (doctor as (typeof OTHER_DOCTORS)[number]).id;
        const seed = `${topic.id}:${period}:${rank}:${doctorKey}`;

        // Decay ~9–14% per rank (strictly descending), small rank tiebreaker
        const decay = 1 - (rank - 1) * (0.09 + (hashString(`${topic.id}${period}`) % 6) / 100);
        const points = Math.max(24, Math.round(peakPoints * decay) - (ROWS_PER_BOARD - rank));

        const answersCount = Math.max(1, Math.round(points / (period === 'week' ? 130 : period === 'month' ? 120 : 105)) + seededInt(seed, 0, 3));
        const acceptedAnswers = Math.min(answersCount, Math.round(answersCount * (0.42 + seededInt(`${seed}:a`, 0, 34) / 100)));
        const pearlsShared = seededInt(`${seed}:p`, 0, 3) + periodIndex * 2;

        entries.push({
          id: `lb-${topic.id}-${period}-${rank}`,
          topicId: topic.id,
          period,
          doctorName: doctor.name,
          doctorCredentials: doctor.credentials,
          doctorAvatar: doctor.avatar,
          doctorRole: roleFor(doctor),
          points,
          answersCount,
          acceptedAnswers,
          pearlsShared,
          badgeTitle: badges[rank - 1] ?? FALLBACK_BADGES[rank - 1] ?? 'Top Answerer',
          trend: trendFor(seed),
          isCurrentUser: isCurrentUser || undefined,
        });
      }
    });
  });

  return entries;
};

/** Flat leaderboard table: every hub × every period, 7 ranked rows each. */
export const MOCK_LEADERBOARD: TopicLeaderboardEntry[] = buildLeaderboard();

/** Convenience selector — a single topic's board, optionally scoped to one period. */
export const getTopicLeaderboard = (
  topicId: string,
  period?: LeaderboardPeriod
): TopicLeaderboardEntry[] =>
  MOCK_LEADERBOARD.filter((entry) => entry.topicId === topicId && (!period || entry.period === period));
