import React, { useMemo, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Compass,
  Flame,
  Check,
  X,
  TrendingUp,
  Search,
  ArrowRight,
  LayoutGrid
} from 'lucide-react';
import { QuestionTopic, TopicCategory } from '../../types';
import { HubCard } from './HubCard';
import { resolveHubIcon } from './hubIcons';

interface TopicCardsGalleryProps {
  /** All topics (used for category tab counts). */
  topics: QuestionTopic[];
  /** The 6 hub categories driving the tab rail. */
  categories: TopicCategory[];
  selectedTopicId: string | null;
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  onSelectTopic: (topicId: string | null) => void;
  /** When provided, activating a hub card / trending tile opens the full hub space. */
  onOpenHub?: (topicId: string) => void;
  onToggleFollowTopic: (topicId: string) => void;
  onSelectTag?: (tag: string) => void;
  onJumpToConsults?: () => void;
  /** Hub search results already filtered upstream (overrides category filtering). */
  visibleTopics?: QuestionTopic[];
  isSearchActive?: boolean;
}

const ALL_HUBS_ID = 'all';

export const TopicCardsGallery: React.FC<TopicCardsGalleryProps> = ({
  topics,
  categories,
  selectedTopicId,
  selectedCategoryId,
  onSelectCategory,
  onSelectTopic,
  onOpenHub,
  onToggleFollowTopic,
  onSelectTag,
  onJumpToConsults,
  visibleTopics,
  isSearchActive,
}) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Tab rail entries: All Hubs + one per category (with live hub counts)
  const tabs = useMemo(() => {
    const countFor = (categoryId: string) =>
      categoryId === ALL_HUBS_ID ? topics.length : topics.filter((t) => t.categoryId === categoryId).length;
    return [
      { id: ALL_HUBS_ID, name: 'All Hubs', tagline: 'Every specialty consult hub', iconName: 'compass', gradient: 'from-blue-600 to-indigo-500', count: topics.length },
      ...categories.map((c) => ({ ...c, count: countFor(c.id) })),
    ];
  }, [topics, categories]);

  // Grid content: upstream search results, else filter by active category
  const gridTopics = useMemo(() => {
    if (visibleTopics) return visibleTopics;
    return selectedCategoryId === ALL_HUBS_ID
      ? topics
      : topics.filter((t) => t.categoryId === selectedCategoryId);
  }, [topics, visibleTopics, selectedCategoryId]);

  // Trending strip (top 3 by weekly asks) — only on the All Hubs browse view
  const trendingHubs = useMemo(() => {
    if (selectedCategoryId !== ALL_HUBS_ID || isSearchActive) return [];
    return [...topics]
      .sort((a, b) => (b.weeklyAsks ?? 0) - (a.weeklyAsks ?? 0))
      .slice(0, 3);
  }, [topics, selectedCategoryId, isSearchActive]);

  const selectedTopic = topics.find((t) => t.id === selectedTopicId);
  const activeCategory = categories.find((c) => c.id === selectedCategoryId);

  const handleCardClick = (topicId: string) => {
    if (onOpenHub) {
      onOpenHub(topicId);
      return;
    }
    onSelectTopic(selectedTopicId === topicId ? null : topicId);
    if (onJumpToConsults) onJumpToConsults();
  };

  // Accessible tablist keyboard behavior: arrow keys / Home / End move selection + focus
  const handleTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    onSelectCategory(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  // Reduced-motion aware stagger animation
  const prefersReducedMotion = useReducedMotion();
  const cardVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 10, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1 } };
  const panelVariants = prefersReducedMotion
    ? { visible: { transition: { staggerChildren: 0 } }, exit: {} }
    : { visible: { transition: { staggerChildren: 0.03 } }, exit: { opacity: 0, transition: { duration: 0.12 } } };

  return (
    <section className="relative w-full rounded-3xl bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl border border-neutral-200/70 dark:border-white/10 p-4 sm:p-5 shadow-xs transition-all">

      {/* ============================================================ */}
      {/* 1. HEADER BAR — title, hub count, active-topic chip          */}
      {/* ============================================================ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-white/5">

        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex h-2.5 w-2.5 relative shrink-0" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
          </span>
          <h2 className="text-sm sm:text-base font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2 min-w-0">
            <span>Specialty Consult Hubs</span>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded-full font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/70 dark:border-blue-900/60">
              {topics.length} Hubs
            </span>
          </h2>
          {isSearchActive && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-neutral-500 dark:text-neutral-400 px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200/70 dark:border-white/10">
              <Search className="h-3 w-3" />
              <span>Matching hubs</span>
            </span>
          )}
        </div>

        {selectedTopic && (
          <div className="inline-flex items-center gap-1.5 self-start md:self-auto px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-xs text-blue-700 dark:text-blue-300 max-w-full">
            <span className="font-bold truncate">{selectedTopic.name}</span>
            <button
              type="button"
              onClick={() => onSelectTopic(null)}
              className="p-0.5 rounded-md hover:bg-blue-200/50 text-blue-700 dark:text-blue-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              title="Clear topic filter"
              aria-label="Clear selected hub filter"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 2. CATEGORY TAB RAIL — All Hubs + 6 categories               */}
      {/*    role="tablist" + arrow-key navigation (roving tabindex)   */}
      {/* ============================================================ */}
      <div
        role="tablist"
        aria-label="Browse consult hubs by category"
        onKeyDown={(e) => {
          const activeIndex = Math.max(0, tabs.findIndex((t) => t.id === selectedCategoryId));
          handleTabKeyDown(e, activeIndex);
        }}
        className="flex items-stretch gap-2 overflow-x-auto scrollbar-none snap-x py-3 border-b border-neutral-100 dark:border-white/5 focus-within:outline-none"
      >
        {tabs.map((tab, index) => {
          const isActive = selectedCategoryId === tab.id;
          return (
            <button
              key={tab.id}
              ref={(node) => { tabRefs.current[index] = node; }}
              type="button"
              role="tab"
              id={`hub-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls="hub-grid-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelectCategory(tab.id)}
              className={`group/tab relative flex items-center gap-2.5 px-3 sm:px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap shrink-0 snap-start border transition-all cursor-pointer active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141420] ${
                isActive
                  ? 'bg-white dark:bg-white/10 border-blue-400/70 dark:border-blue-500/50 shadow-sm shadow-blue-500/10 text-neutral-900 dark:text-white'
                  : 'bg-neutral-50/80 dark:bg-white/[0.03] border-neutral-200/70 dark:border-white/10 text-neutral-600 dark:text-neutral-300 hover:border-blue-300/60 dark:hover:border-blue-500/30 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <span className={`h-7 w-7 rounded-lg flex items-center justify-center text-white shrink-0 bg-gradient-to-br ${tab.gradient} shadow-sm`}>
                {resolveHubIcon(tab.iconName, 'h-3.5 w-3.5')}
              </span>
              <span className="flex flex-col items-start leading-tight">
                <span>{tab.name}</span>
                <span className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500">
                  {tab.count} {tab.count === 1 ? 'hub' : 'hubs'}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 3. TRENDING STRIP — top 3 hubs by weekly asks (All Hubs view) */}
      {/* ============================================================ */}
      {trendingHubs.length > 0 && (
        <div className="pt-3">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500/20" aria-hidden="true" />
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Trending hubs this week
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {trendingHubs.map((topic, index) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => handleCardClick(topic.id)}
                className="flex items-center gap-2.5 p-2 rounded-2xl bg-neutral-50/80 dark:bg-white/[0.03] border border-neutral-200/70 dark:border-white/10 hover:border-amber-400/60 dark:hover:border-amber-500/40 transition-all cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141420] group/trend"
              >
                <span className="font-mono text-xs font-black text-amber-600 dark:text-amber-400 w-5 shrink-0 text-center" aria-hidden="true">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-extrabold text-neutral-900 dark:text-white truncate group-hover/trend:text-amber-600 dark:group-hover/trend:text-amber-400 transition-colors">
                    {topic.name}
                  </span>
                  <span className="block text-[10px] text-neutral-500 dark:text-neutral-400">
                    <span className="font-mono font-bold">{topic.weeklyAsks ?? 0}</span> new asks this week
                  </span>
                </span>
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. HUB GRID — responsive card grid with stagger-in on switch */}
      {/* ============================================================ */}
      <div
        role="tabpanel"
        id="hub-grid-panel"
        aria-labelledby={`hub-tab-${selectedCategoryId}`}
        aria-label={activeCategory ? `${activeCategory.name} hubs` : 'All consult hubs'}
        tabIndex={0}
        className="pt-4 focus:outline-none"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isSearchActive ? 'search' : selectedCategoryId}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4"
          >
            {gridTopics.map((topic) => (
              <motion.div key={topic.id} variants={cardVariants} className="h-full">
                <HubCard
                  topic={topic}
                  category={categories.find((c) => c.id === topic.categoryId)}
                  isSelected={selectedTopicId === topic.id}
                  onEnterHub={handleCardClick}
                  onOpenHub={onOpenHub}
                  onToggleFollow={onToggleFollowTopic}
                  onSelectTag={onSelectTag}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state: search matched no hubs */}
        {gridTopics.length === 0 && (
          <div className="p-10 rounded-2xl bg-neutral-50/80 dark:bg-white/[0.03] border border-neutral-200/70 dark:border-white/10 text-center space-y-2.5">
            <LayoutGrid className="h-8 w-8 text-neutral-400 mx-auto opacity-60" aria-hidden="true" />
            <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">No hubs match your search</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
              Try a different specialty keyword (e.g. "retina", "scleral", "billing") or browse a category above.
            </p>
            <button
              type="button"
              onClick={() => onSelectCategory(ALL_HUBS_ID)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm shadow-blue-500/25 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141420]"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Browse all hubs</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Live region hint (visual): topic selection state */}
      {selectedTopicId && !gridTopics.some((t) => t.id === selectedTopicId) && (
        <div className="pt-3 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
          <Check className="h-3 w-3 text-blue-500" aria-hidden="true" />
          <span>
            <span className="font-bold">{selectedTopic?.name}</span> hub filter is active — clear it above to browse freely.
          </span>
        </div>
      )}
    </section>
  );
};
