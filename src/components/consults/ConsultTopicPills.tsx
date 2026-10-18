import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Compass, Check, Plus, Sparkles, Tag } from 'lucide-react';
import { QuestionTopic, TopicCategory } from '../../types';
import { resolveHubIcon } from './hubIcons';

interface ConsultTopicPillsProps {
  topics: QuestionTopic[];
  categories: TopicCategory[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  selectedTopicId: string | null;
  onSelectTopic: (topicId: string | null) => void;
  /** When provided, activating a topic pill opens the full hub space. */
  onOpenHub?: (topicId: string) => void;
  onToggleFollowTopic: (topicId: string) => void;
}

const ALL_HUBS_ID = 'all';

/* ------------------------------------------------------------------
   ConsultTopicPills — two-row feed filter:
   Row 1: category chips (synced with the hub browser category rail)
   Row 2: topic hub pills scoped to the active category, with a
          category gradient dot so groups stay recognizable in "All".
   ------------------------------------------------------------------ */
export const ConsultTopicPills: React.FC<ConsultTopicPillsProps> = ({
  topics,
  categories,
  selectedCategoryId,
  onSelectCategory,
  selectedTopicId,
  onSelectTopic,
  onOpenHub,
  onToggleFollowTopic,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const topicsByCategory = useMemo(() => {
    const map = new Map<string, QuestionTopic[]>();
    topics.forEach((t) => {
      const list = map.get(t.categoryId) ?? [];
      list.push(t);
      map.set(t.categoryId, list);
    });
    return map;
  }, [topics]);

  const scopedTopics = useMemo(() => {
    if (selectedCategoryId === ALL_HUBS_ID) return topics;
    return topics.filter((t) => t.categoryId === selectedCategoryId);
  }, [topics, selectedCategoryId]);

  const activeTopic = topics.find((t) => t.id === selectedTopicId);
  const activeCategory = categories.find((c) => c.id === selectedCategoryId);

  const gradientFor = (topic: QuestionTopic) =>
    topic.gradient ||
    categories.find((c) => c.id === topic.categoryId)?.gradient ||
    'from-blue-500 to-indigo-500';

  return (
    <div className="space-y-2.5">

      {/* ============================================================ */}
      {/* ROW 1 — Category chips (synced with hub browser)             */}
      {/* ============================================================ */}
      <div
        role="group"
        aria-label="Filter topic pills by category"
        className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none"
      >
        <button
          type="button"
          onClick={() => onSelectCategory(ALL_HUBS_ID)}
          aria-pressed={selectedCategoryId === ALL_HUBS_ID}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-extrabold whitespace-nowrap shrink-0 transition-all cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141420] ${
            selectedCategoryId === ALL_HUBS_ID
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
              : 'bg-white/90 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 border border-neutral-200/70 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20'
          }`}
        >
          <Compass className="h-3 w-3 text-blue-500" />
          <span>All Categories</span>
        </button>

        {categories.map((category) => {
          const isActive = selectedCategoryId === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              aria-pressed={isActive}
              title={category.tagline}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-extrabold whitespace-nowrap shrink-0 transition-all cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141420] ${
                isActive
                  ? `${category.accentText} bg-white dark:bg-white/10 border shadow-sm`
                  : 'bg-white/90 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 border border-neutral-200/70 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20'
              }`}
            >
              <span className={`h-2 w-2 rounded-full bg-gradient-to-br ${category.gradient} shrink-0`} aria-hidden="true" />
              <span>{category.name}</span>
              <span className="font-mono text-[9px] font-bold text-neutral-400 dark:text-neutral-500">
                {(topicsByCategory.get(category.id) ?? []).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* ROW 2 — Topic hub pills (scoped to active category)          */}
      {/* ============================================================ */}
      <div
        role="region"
        aria-label={`Topic hub filters${activeCategory ? ` for ${activeCategory.name}` : ' across all categories'}`}
        className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none snap-x"
      >
        <button
          type="button"
          onClick={() => onSelectTopic(null)}
          aria-pressed={selectedTopicId === null}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 snap-start transition-all cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141420] ${
            selectedTopicId === null
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 scale-[1.02]'
              : 'bg-white dark:bg-[#141418] text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>All Subspecialties</span>
        </button>

        {scopedTopics.map((topic) => {
          const isSelected = selectedTopicId === topic.id;
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => {
                if (onOpenHub) {
                  onOpenHub(topic.id);
                  return;
                }
                onSelectTopic(isSelected ? null : topic.id);
              }}
              aria-pressed={isSelected}
              title={topic.description}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 snap-start transition-all cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141420] ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 scale-[1.02]'
                  : 'bg-white dark:bg-[#141418] text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-white/10 hover:border-blue-400/60 dark:hover:border-blue-500/40'
              }`}
            >
              <span className={`h-2 w-2 rounded-full bg-gradient-to-br ${gradientFor(topic)} shrink-0`} aria-hidden="true" />
              <span className="text-neutral-400 dark:text-neutral-500">
                {resolveHubIcon(topic.iconName, 'h-3.5 w-3.5')}
              </span>
              <span>{topic.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono font-bold ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-neutral-400'
                }`}
              >
                {topic.questionsCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* Active Topic Spotlight Panel                                 */}
      {/* ============================================================ */}
      {activeTopic && (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-200/80 dark:border-blue-900/50 backdrop-blur-xs"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center text-white shadow-sm shadow-blue-500/20 shrink-0 bg-gradient-to-br ${gradientFor(activeTopic)}`}>
                {resolveHubIcon(activeTopic.iconName, 'h-5 w-5')}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">
                    {activeTopic.name}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    Hub Filter Active
                  </span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 max-w-2xl leading-relaxed">
                  {activeTopic.description}
                </p>
                <div className="text-[11px] text-neutral-400 mt-1 flex items-center gap-3 flex-wrap">
                  <span className="font-mono">{activeTopic.questionsCount} inquiries recorded</span>
                  <span aria-hidden="true">•</span>
                  <span>{activeTopic.followersCount.toLocaleString()} verified doctors following</span>
                  {typeof activeTopic.acceptanceRate === 'number' && (
                    <>
                      <span aria-hidden="true">•</span>
                      <span className="font-mono">{activeTopic.acceptanceRate}% answered</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => onToggleFollowTopic(activeTopic.id)}
                aria-pressed={activeTopic.isFollowed}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141420] ${
                  activeTopic.isFollowed
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                }`}
              >
                {activeTopic.isFollowed ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Following Hub</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5" />
                    <span>Follow Hub</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onSelectTopic(null)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Clear Filter
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Category context hint when a single category is selected */}
      {activeCategory && (
        <p className="flex items-center gap-1.5 text-[11px] text-neutral-400 dark:text-neutral-500 px-1">
          <Tag className="h-3 w-3" aria-hidden="true" />
          <span>
            Showing hub pills for <span className={`font-bold ${activeCategory.accentText}`}>{activeCategory.name}</span> — {activeCategory.tagline}
          </span>
        </p>
      )}
    </div>
  );
};
