import React from 'react';
import {
  Users,
  Stethoscope,
  Flame,
  Check,
  Plus,
  ArrowRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { QuestionTopic, TopicCategory } from '../../types';
import { resolveHubIcon } from './hubIcons';

interface HubCardProps {
  topic: QuestionTopic;
  category?: TopicCategory;
  isSelected: boolean;
  onEnterHub: (topicId: string) => void;
  /** When provided, activating the card opens the full hub space instead of filtering. */
  onOpenHub?: (topicId: string) => void;
  onToggleFollow: (topicId: string) => void;
  onSelectTag?: (tag: string) => void;
}

/* ------------------------------------------------------------------
   HubCard — premium categorized hub card for the consult hub browser.
   Whole card is activated by a stretched, keyboard-accessible button
   (Enter/Space + focus ring); follow & tag chips sit above it.
   ------------------------------------------------------------------ */
export const HubCard: React.FC<HubCardProps> = ({
  topic,
  category,
  isSelected,
  onEnterHub,
  onOpenHub,
  onToggleFollow,
  onSelectTag,
}) => {
  const gradient = topic.gradient || category?.gradient || 'from-blue-500 to-indigo-500';
  const visibleTags = (topic.trendingTags ?? []).slice(0, 3);

  return (
    <div
      className={`group relative h-full rounded-2xl bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl border transition-all duration-300 overflow-hidden ${
        isSelected
          ? 'border-blue-400/80 dark:border-blue-500/60 ring-2 ring-blue-500 shadow-lg shadow-blue-500/20'
          : 'border-neutral-200/70 dark:border-white/10 hover:border-blue-400/60 dark:hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5'
      }`}
    >
      {/* Category gradient signature stripe */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} aria-hidden="true" />

      {/* Stretched activation layer: whole card clickable, Enter/Space works, announces state */}
      <button
        type="button"
        onClick={() => (onOpenHub ? onOpenHub(topic.id) : onEnterHub(topic.id))}
        aria-pressed={isSelected}
        aria-label={onOpenHub ? `Open ${topic.name} hub` : `${isSelected ? 'Leave' : 'Enter'} ${topic.name} hub`}
        className="absolute inset-0 z-10 rounded-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141420]"
      />

      {/* Foreground content (non-interactive; interactive controls re-enable pointer events) */}
      <div className="relative z-20 pointer-events-none p-4 flex flex-col gap-2.5 h-full">

        {/* Top row: gradient icon tile + hub flags */}
        <div className="flex items-start justify-between gap-2">
          <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${gradient} shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300`}>
            {resolveHubIcon(topic.iconName, 'h-5 w-5')}
          </div>

          <div className="flex items-center gap-1 flex-wrap justify-end">
            {topic.isTrending && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/15 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                <Flame className="h-2.5 w-2.5 fill-amber-500/40" />
                <span>Hot</span>
              </span>
            )}
            {topic.isStudentFriendly && (
              <span
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                title="Open to students & residents"
              >
                🎓 Trainees
              </span>
            )}
            {isSelected && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-600 text-white shadow-sm">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
                <span>Selected</span>
              </span>
            )}
          </div>
        </div>

        {/* Hub name + verified-style polish */}
        <div className="min-w-0">
          <h3 className="flex items-center gap-1.5 text-sm font-extrabold text-neutral-900 dark:text-white tracking-tight">
            <span className="truncate">{topic.name}</span>
            {topic.isPopular && (
              <ShieldCheck
                className="h-3.5 w-3.5 shrink-0 text-blue-500 dark:text-blue-400"
                aria-label="Verified high-traffic hub"
              />
            )}
          </h3>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 leading-relaxed mt-0.5">
            {topic.description}
          </p>
        </div>

        {/* Stats row — JetBrains Mono numerals */}
        <div className="flex items-center gap-3 text-[10px] font-semibold text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1" title="Followers">
            <Users className="h-3 w-3 text-blue-500" />
            <span className="font-mono font-bold text-neutral-700 dark:text-neutral-200">{topic.followersCount.toLocaleString()}</span>
            <span className="hidden sm:inline">followers</span>
          </span>
          <span className="flex items-center gap-1" title="Consult inquiries">
            <Stethoscope className="h-3 w-3 text-indigo-500" />
            <span className="font-mono font-bold text-neutral-700 dark:text-neutral-200">{topic.questionsCount}</span>
            <span className="hidden sm:inline">inquiries</span>
          </span>
          <span className="flex items-center gap-1" title="New asks this week">
            <TrendingUp className="h-3 w-3 text-amber-500" />
            <span className="font-mono font-bold text-neutral-700 dark:text-neutral-200">{topic.weeklyAsks ?? 0}</span>
            <span>/wk</span>
          </span>
        </div>

        {/* Trending tag chips */}
        {visibleTags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {visibleTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onSelectTag?.(tag.replace('#', ''))}
                className="pointer-events-auto px-2 py-0.5 rounded-lg text-[10px] font-bold bg-neutral-100/80 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 border border-neutral-200/70 dark:border-white/10 hover:border-blue-400/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                title={`Search consults for ${tag}`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Footer: Enter Hub affordance + optimistic Follow toggle */}
        <div className="mt-auto pt-2.5 border-t border-neutral-200/70 dark:border-white/10 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-blue-600 dark:text-blue-400 group-hover:gap-1.5 transition-all">
            <span>Enter Hub</span>
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </span>

          <button
            type="button"
            onClick={() => onToggleFollow(topic.id)}
            aria-pressed={topic.isFollowed}
            className={`pointer-events-auto inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 ${
              topic.isFollowed
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-500/25'
            }`}
          >
            {topic.isFollowed ? (
              <>
                <Check className="h-2.5 w-2.5 stroke-[3]" />
                <span>Following</span>
              </>
            ) : (
              <>
                <Plus className="h-2.5 w-2.5 stroke-[3]" />
                <span>Follow</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
