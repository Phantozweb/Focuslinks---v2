import React, { useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
  MessageSquare,
  CheckCircle2,
  Lightbulb,
  Crown
} from 'lucide-react';
import { TopicLeaderboardEntry } from '../../types';
import { DoctorAvatar } from '../common/DoctorAvatar';

interface TopicHubLeaderboardProps {
  /** Hub whose board is shown (entries are pre-filtered by the parent). */
  topicId: string;
  topicName: string;
  /** Every leaderboard row for this hub, across all periods. */
  entries: TopicLeaderboardEntry[];
}

type LeaderboardPeriod = TopicLeaderboardEntry['period'];

const PERIOD_OPTIONS: { value: LeaderboardPeriod; label: string }[] = [
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'all-time', label: 'All Time' },
];

const PODIUM_STYLES: Record<number, { ring: string; medal: string; crown: string; label: string }> = {
  1: {
    ring: 'ring-2 ring-amber-400 dark:ring-amber-400/90 bg-gradient-to-b from-amber-400/15 to-transparent dark:from-amber-400/15',
    medal: 'bg-amber-400 text-amber-950 shadow-sm shadow-amber-500/40',
    crown: 'text-amber-400',
    label: '1st place',
  },
  2: {
    ring: 'ring-2 ring-neutral-300 dark:ring-neutral-400/80 bg-gradient-to-b from-neutral-300/15 to-transparent dark:from-neutral-300/10',
    medal: 'bg-neutral-300 text-neutral-800 shadow-sm',
    crown: 'text-neutral-300 dark:text-neutral-400',
    label: '2nd place',
  },
  3: {
    ring: 'ring-2 ring-orange-500/80 dark:ring-orange-500/70 bg-gradient-to-b from-orange-500/15 to-transparent dark:from-orange-500/10',
    medal: 'bg-orange-600 text-white shadow-sm shadow-orange-600/40',
    crown: 'text-orange-500 dark:text-orange-400',
    label: '3rd place',
  },
};

const TrendBadge: React.FC<{ trend: TopicLeaderboardEntry['trend'] }> = ({ trend }) => {
  if (trend === 'up') {
    return (
      <span
        className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400"
        title="Climbing since last period"
      >
        <TrendingUp className="h-3 w-3" aria-hidden="true" />
        <span className="sr-only">Trending up</span>
      </span>
    );
  }
  if (trend === 'down') {
    return (
      <span
        className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-rose-500 dark:text-rose-400"
        title="Slipping since last period"
      >
        <TrendingDown className="h-3 w-3" aria-hidden="true" />
        <span className="sr-only">Trending down</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-neutral-400 dark:text-neutral-500" title="Holding steady">
      <Minus className="h-3 w-3" aria-hidden="true" />
      <span className="sr-only">Holding steady</span>
    </span>
  );
};

/* ------------------------------------------------------------------
   TopicHubLeaderboard — "Leaderboard" tab content of a topic hub:
   period segmented control (radiogroup), top-3 podium, ranked rows
   4+ (list semantics), and a pinned "Your rank" card.
   ------------------------------------------------------------------ */
export const TopicHubLeaderboard: React.FC<TopicHubLeaderboardProps> = ({
  topicId,
  topicName,
  entries,
}) => {
  const [period, setPeriod] = useState<LeaderboardPeriod>('week');
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const ranked = useMemo(
    () =>
      entries
        .filter((entry) => entry.period === period)
        .sort((a, b) => b.points - a.points),
    [entries, period]
  );

  const podium = ranked.slice(0, 3);
  const restRows = ranked.slice(3);
  const myEntry = ranked.find((entry) => entry.isCurrentUser);

  // Radiogroup keyboard behavior: arrows / Home / End move selection + focus
  const handlePeriodKeyDown = (event: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (index + 1) % PERIOD_OPTIONS.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (index - 1 + PERIOD_OPTIONS.length) % PERIOD_OPTIONS.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = PERIOD_OPTIONS.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setPeriod(PERIOD_OPTIONS[nextIndex].value);
    optionRefs.current[nextIndex]?.focus();
  };

  const rowVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };
  const listVariants = prefersReducedMotion
    ? { visible: { transition: { staggerChildren: 0 } } }
    : { visible: { transition: { staggerChildren: 0.045 } } };

  const renderPodiumCard = (entry: TopicLeaderboardEntry, rank: number, elevated: boolean) => {
    const styles = PODIUM_STYLES[rank];
    return (
      <div
        className={`relative h-full rounded-2xl border border-neutral-200/70 dark:border-white/10 backdrop-blur-xl p-4 sm:p-5 flex flex-col items-center text-center gap-2 ${styles.ring} ${
          elevated ? 'sm:pb-7' : 'sm:pb-5'
        }`}
      >
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 h-7 w-7 rounded-full flex items-center justify-center font-mono text-xs font-black ${styles.medal}`}
          title={styles.label}
        >
          <span aria-hidden="true">{rank}</span>
          <span className="sr-only">{styles.label}</span>
        </span>

        {rank === 1 && (
          <Crown className={`h-4 w-4 -mb-1 ${styles.crown} fill-amber-400/30`} aria-hidden="true" />
        )}

        <DoctorAvatar
          src={entry.doctorAvatar}
          name={entry.doctorName}
          size={elevated ? 'lg' : 'md'}
          className={elevated ? 'h-16 w-16 rounded-full mt-1' : 'h-12 w-12 rounded-full mt-1'}
        />

        <div className="min-w-0">
          <p className="text-sm font-extrabold text-neutral-900 dark:text-white truncate max-w-full">
            {entry.doctorName}
            {entry.isCurrentUser && (
              <span className="ml-1.5 align-middle inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-blue-600 text-white">
                You
              </span>
            )}
          </p>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium truncate max-w-full">
            {entry.doctorCredentials}
          </p>
        </div>

        <span className="inline-flex max-w-full items-center px-2.5 py-1 rounded-xl text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50">
          <span className="truncate">{entry.badgeTitle}</span>
        </span>

        <p className="font-mono text-xl font-black text-neutral-900 dark:text-white leading-none pt-0.5">
          {entry.points.toLocaleString()}
          <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 ml-1 font-sans">pts</span>
        </p>

        <p className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400">
          {entry.answersCount} answers · {entry.acceptedAnswers} accepted
        </p>
      </div>
    );
  };

  return (
    <section className="space-y-4" aria-label={`${topicName} hub leaderboard`}>

      {/* ============================================================ */}
      {/* 1. HEADER + PERIOD SEGMENTED CONTROL (radiogroup)            */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm shadow-amber-500/30">
            <Trophy className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-black text-neutral-900 dark:text-white tracking-tight truncate">
              Top Contributors
            </h3>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
              Ranked by peer consensus points · answers, accepted replies &amp; pearls
            </p>
          </div>
        </div>

        <div
          role="radiogroup"
          aria-label="Leaderboard period"
          className="flex items-center gap-1 p-1 rounded-2xl bg-neutral-100/80 dark:bg-white/[0.04] border border-neutral-200/70 dark:border-white/10 self-start"
        >
          {PERIOD_OPTIONS.map((option, index) => {
            const isSelected = period === option.value;
            return (
              <button
                key={option.value}
                ref={(node) => { optionRefs.current[index] = node; }}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setPeriod(option.value)}
                onKeyDown={(e) => handlePeriodKeyDown(e, index)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold whitespace-nowrap transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141420] ${
                  isSelected
                    ? 'bg-white dark:bg-white/10 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. PODIUM — top 3 (2 | 1 | 3 on sm+, stacked on mobile)      */}
      {/* ============================================================ */}
      <motion.ol
        variants={listVariants}
        initial="hidden"
        animate="visible"
        aria-label="Top 3 contributors"
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 sm:items-end"
      >
        {/* DOM order 1,2,3 for screen readers; visual 2|1|3 podium via sm:order-* */}
        {podium[0] && (
          <motion.li key={podium[0].id} variants={rowVariants} className="list-none sm:order-2">
            {renderPodiumCard(podium[0], 1, true)}
          </motion.li>
        )}
        {podium[1] && (
          <motion.li key={podium[1].id} variants={rowVariants} className="list-none sm:order-1">
            {renderPodiumCard(podium[1], 2, false)}
          </motion.li>
        )}
        {podium[2] && (
          <motion.li key={podium[2].id} variants={rowVariants} className="list-none sm:order-3">
            {renderPodiumCard(podium[2], 3, false)}
          </motion.li>
        )}
      </motion.ol>

      {/* ============================================================ */}
      {/* 3. RANKED ROWS 4+ — ordered list semantics                   */}
      {/* ============================================================ */}
      {restRows.length > 0 && (
        <motion.ol
          variants={listVariants}
          initial="hidden"
          animate="visible"
          aria-label="Contributors ranked 4 and below"
          className="rounded-2xl bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl border border-neutral-200/70 dark:border-white/10 divide-y divide-neutral-200/70 dark:divide-white/5 overflow-hidden"
        >
          {restRows.map((entry, index) => (
            <motion.li
              key={entry.id}
              variants={rowVariants}
              className="flex items-center gap-3 px-3.5 sm:px-5 py-3 hover:bg-blue-50/40 dark:hover:bg-white/[0.03] transition-colors"
            >
              <span
                className="font-mono text-sm font-black text-neutral-400 dark:text-neutral-500 w-7 text-center shrink-0"
                aria-label={`Rank ${index + 4}`}
              >
                {index + 4}
              </span>

              <DoctorAvatar src={entry.doctorAvatar} name={entry.doctorName} size="sm" />

              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-xs font-extrabold text-neutral-900 dark:text-white truncate">
                  <span className="truncate">{entry.doctorName}</span>
                  {entry.isCurrentUser && (
                    <span className="shrink-0 inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-blue-600 text-white">
                      You
                    </span>
                  )}
                  <TrendBadge trend={entry.trend} />
                </p>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                  <span className="font-bold">{entry.badgeTitle}</span>
                  <span aria-hidden="true"> · </span>
                  {entry.doctorRole}
                </p>
              </div>

              {/* Compact stats: answers / accepted / pearls */}
              <div className="hidden md:flex items-center gap-4 shrink-0 text-[10px] font-semibold text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1" title={`${entry.answersCount} answers`}>
                  <MessageSquare className="h-3 w-3 text-blue-500" aria-hidden="true" />
                  <span className="font-mono font-bold text-neutral-700 dark:text-neutral-200">{entry.answersCount}</span>
                </span>
                <span className="flex items-center gap-1" title={`${entry.acceptedAnswers} accepted answers`}>
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" aria-hidden="true" />
                  <span className="font-mono font-bold text-neutral-700 dark:text-neutral-200">{entry.acceptedAnswers}</span>
                </span>
                <span className="flex items-center gap-1" title={`${entry.pearlsShared} pearls shared`}>
                  <Lightbulb className="h-3 w-3 text-amber-500" aria-hidden="true" />
                  <span className="font-mono font-bold text-neutral-700 dark:text-neutral-200">{entry.pearlsShared}</span>
                </span>
              </div>

              <div className="text-right shrink-0 w-16 sm:w-20">
                <span className="font-mono text-sm font-black text-neutral-900 dark:text-white block leading-tight">
                  {entry.points.toLocaleString()}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">points</span>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      )}

      {/* ============================================================ */}
      {/* 4. PINNED "YOUR RANK" CARD (isCurrentUser entry this period) */}
      {/* ============================================================ */}
      {myEntry && (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-transparent border-2 border-blue-500/60 dark:border-blue-500/50 shadow-sm shadow-blue-500/10"
        >
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <DoctorAvatar src={myEntry.doctorAvatar} name={myEntry.doctorName} size="md" />
              <span className="absolute -bottom-1.5 -right-1.5 px-1.5 py-0.5 rounded-md bg-blue-600 text-white text-[9px] font-black font-mono shadow-sm" title="Your rank">
                #{ranked.findIndex((e) => e.id === myEntry.id) + 1}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-xs font-extrabold text-neutral-900 dark:text-white">
                <span className="truncate">{myEntry.doctorName}</span>
                <span className="shrink-0 inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-blue-600 text-white">
                  You
                </span>
              </p>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                <span className="font-bold">{myEntry.badgeTitle}</span>
                <span aria-hidden="true"> · </span>
                {myEntry.answersCount} answers · {myEntry.acceptedAnswers} accepted · {myEntry.pearlsShared} pearls
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="font-mono text-lg font-black text-blue-600 dark:text-blue-400 block leading-tight">
                {myEntry.points.toLocaleString()}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">points</span>
            </div>

            <TrendBadge trend={myEntry.trend} />
          </div>
        </motion.div>
      )}
    </section>
  );
};
