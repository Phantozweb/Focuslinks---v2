import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  CheckCircle2,
  Eye,
  Flame,
  GraduationCap,
  Hash,
  Info,
  MessageSquare,
  MessagesSquare,
  Newspaper,
  Plus,
  ScrollText,
  ShieldCheck,
  Bookmark,
  Users,
  Trophy,
  AlertCircle,
  ChevronRight,
  Stethoscope,
  TrendingUp
} from 'lucide-react';
import { ClinicalQuestion, DoctorProfile, QuestionAnswer, QuestionTopic, TopicCategory } from '../../types';
import { DoctorAvatar } from '../common/DoctorAvatar';
import { resolveHubIcon } from './hubIcons';
import { TopicHubLeaderboard } from './TopicHubLeaderboard';
import { getTopicLeaderboard } from '../../data/mockLeaderboardData';

interface TopicHubViewProps {
  /** The hub being visited. */
  topic: QuestionTopic;
  /** All sibling hubs (used for the About tab's related-hub cards). */
  topics: QuestionTopic[];
  /** Hub categories (breadcrumb + category badge). */
  categories: TopicCategory[];
  /** Every clinical question — the hub scopes its own feed internally. */
  questions: ClinicalQuestion[];
  currentUser: DoctorProfile;
  onBack: () => void;
  /** Navigate to another hub (related-hub cards in About). */
  onOpenHub: (topicId: string) => void;
  /** Opens the existing AskConsultModal flow owned by ConsultsView. */
  onOpenAskModal: () => void;
  onToggleFollowTopic: (topicId: string) => void;
  onVoteQuestion: (questionId: string, direction: 'up' | 'down') => void;
  onViewDoctorProfile: (doctorId: string) => void;
  onToggleBookmark: (questionId: string) => void;
  onToggleFollowQuestion: (questionId: string) => void;
  /** Opens the existing ConsultDetailDrawer for a question. */
  onSelectQuestion: (question: ClinicalQuestion) => void;
}

type HubTab = 'feed' | 'qa' | 'leaderboard' | 'about';
type FeedSort = 'new' | 'top' | 'unanswered';

const HUB_TABS: { id: HubTab; label: string }[] = [
  { id: 'feed', label: 'Feed' },
  { id: 'qa', label: 'Q&A' },
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'about', label: 'About' },
];

const HUB_TAB_ICONS: Record<HubTab, React.ComponentType<{ className?: string }>> = {
  feed: Newspaper,
  qa: MessagesSquare,
  leaderboard: Trophy,
  about: Info,
};

const DEFAULT_HUB_RULES = [
  'De-identify all patient images and data before posting.',
  'Keep the discussion clinical and evidence-based — cite sources where possible.',
  'Be constructive and mentor-led; students and residents are encouraged to ask.',
];

const URGENCY_STYLES: Record<NonNullable<ClinicalQuestion['urgency']>, string> = {
  urgent: 'bg-rose-500/15 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30',
  'case-consult': 'bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  'grand-rounds': 'bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
  routine: 'bg-neutral-500/10 dark:bg-white/5 text-neutral-500 dark:text-neutral-400 border-neutral-400/30 dark:border-white/10',
};

const URGENCY_LABELS: Record<NonNullable<ClinicalQuestion['urgency']>, string> = {
  urgent: 'Urgent',
  'case-consult': 'Case Consult',
  'grand-rounds': 'Grand Rounds',
  routine: 'Routine',
};

// Accepted answer first, else the most-upvoted reply
const pickTopAnswer = (question: ClinicalQuestion): QuestionAnswer | null => {
  if (question.answers.length === 0) return null;
  const accepted = question.answers.find((a) => a.isAcceptedAnswer);
  if (accepted) return accepted;
  return [...question.answers].sort((a, b) => b.upvotes - a.upvotes)[0];
};

/* ------------------------------------------------------------------
   TopicHubView — a full hub space for one consult topic:
   Hero (gradient banner, follow, stats, Ask CTA) + 4 tabs
   (Feed · Q&A · Leaderboard · About). All data arrives via props
   or the mock leaderboard module — nothing topic-specific is
   hardcoded here.
   ------------------------------------------------------------------ */
export const TopicHubView: React.FC<TopicHubViewProps> = ({
  topic,
  topics,
  categories,
  questions,
  currentUser,
  onBack,
  onOpenHub,
  onOpenAskModal,
  onToggleFollowTopic,
  onVoteQuestion,
  onViewDoctorProfile,
  onToggleBookmark,
  onToggleFollowQuestion,
  onSelectQuestion,
}) => {
  const [activeTab, setActiveTab] = useState<HubTab>('feed');
  const [feedSort, setFeedSort] = useState<FeedSort>('new');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  // Opening a hub always starts at the top of the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const category = categories.find((c) => c.id === topic.categoryId);
  const gradient = topic.gradient || category?.gradient || 'from-blue-600 via-indigo-600 to-sky-500';

  // The hub's own consultations
  const hubQuestions = useMemo(
    () => questions.filter((q) => q.topicId === topic.id),
    [questions, topic.id]
  );

  const sortedHubQuestions = useMemo(() => {
    const list = [...hubQuestions];
    if (feedSort === 'top') {
      return list.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
    }
    if (feedSort === 'unanswered') {
      return list.sort(
        (a, b) => (a.answers.length - b.answers.length) || ((b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
      );
    }
    // Newest first (mock ids are sequential)
    return list.sort((a, b) => b.id.localeCompare(a.id));
  }, [hubQuestions, feedSort]);

  // Activity summary for the Feed tab chips
  const activity = useMemo(() => {
    const answers = hubQuestions.reduce((sum, q) => sum + q.answers.length, 0);
    const acceptedRatio = hubQuestions.length
      ? Math.round((hubQuestions.filter((q) => q.answers.some((a) => a.isAcceptedAnswer)).length / hubQuestions.length) * 100)
      : 0;
    return {
      weeklyAsks: topic.weeklyAsks ?? 0,
      answers,
      acceptance: topic.acceptanceRate ?? acceptedRatio,
    };
  }, [hubQuestions, topic.weeklyAsks, topic.acceptanceRate]);

  const relatedHubs = useMemo(
    () => topics.filter((t) => t.categoryId === topic.categoryId && t.id !== topic.id).slice(0, 4),
    [topics, topic.categoryId, topic.id]
  );

  const gradientFor = (t: QuestionTopic) =>
    t.gradient || categories.find((c) => c.id === t.categoryId)?.gradient || 'from-blue-500 to-indigo-500';

  const leaderboardEntries = useMemo(() => getTopicLeaderboard(topic.id), [topic.id]);

  // Tablist keyboard behavior: arrows / Home / End move selection + focus
  const handleTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % HUB_TABS.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + HUB_TABS.length) % HUB_TABS.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = HUB_TABS.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActiveTab(HUB_TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  const panelVariants = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 } };

  const tabCountFor = (tab: HubTab): number | null => {
    if (tab === 'feed' || tab === 'qa') return hubQuestions.length;
    if (tab === 'leaderboard') return getTopicLeaderboard(topic.id, 'week').length;
    return null;
  };

  return (
    <div className="w-full space-y-5">

      {/* ============================================================ */}
      {/* 1. BREADCRUMB / BACK ROW                                     */}
      {/* ============================================================ */}
      <nav aria-label="Hub breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 flex-wrap">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to Consults hub browser"
          className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl -ml-2.5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          <span>Consults</span>
        </button>
        <ChevronRight className="h-3 w-3 opacity-50" aria-hidden="true" />
        {category && (
          <>
            <span className={category.accentText}>{category.name}</span>
            <ChevronRight className="h-3 w-3 opacity-50" aria-hidden="true" />
          </>
        )}
        <span className="text-neutral-900 dark:text-white font-extrabold" aria-current="page">{topic.name}</span>
      </nav>

      {/* ============================================================ */}
      {/* 2. HERO HEADER — gradient banner, follow, stats, CTA         */}
      {/* ============================================================ */}
      <section
        aria-label={`${topic.name} hub overview`}
        className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${gradient} shadow-lg shadow-blue-500/10 border border-neutral-200/50 dark:border-white/10`}
      >
        {/* Readability scrim + ambient glows (keep white text legible on any gradient) */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/35 via-black/20 to-black/40" aria-hidden="true" />
        <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full bg-white/15 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-28 left-1/4 w-72 h-72 rounded-full bg-black/20 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 p-5 sm:p-7 md:p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
            <div className="flex items-start gap-4 min-w-0">
              {/* Hub icon tile */}
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl flex items-center justify-center shrink-0 bg-white/20 backdrop-blur-md border border-white/25 shadow-sm">
                {resolveHubIcon(topic.iconName, 'h-7 w-7 sm:h-8 sm:w-8')}
              </div>

              <div className="min-w-0 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-display-sm sm:text-display-md font-black tracking-tight leading-tight">
                    {topic.name}
                  </h1>
                  {topic.isPopular && (
                    <ShieldCheck className="h-5 w-5 shrink-0 text-white/90" aria-label="Verified high-traffic hub" />
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap text-[11px] font-bold">
                  {category && (
                    <span className="px-2.5 py-0.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm">
                      {category.name}
                    </span>
                  )}
                  {topic.isStudentFriendly && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-200/40 text-emerald-50">
                      <GraduationCap className="h-3 w-3" aria-hidden="true" />
                      <span>Student-friendly</span>
                    </span>
                  )}
                  {topic.isTrending && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-200/40 text-amber-50">
                      <Flame className="h-3 w-3" aria-hidden="true" />
                      <span>Trending</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-2xl font-medium">
                  {topic.description}
                </p>
              </div>
            </div>

            {/* Follow + Ask CTAs */}
            <div className="flex items-center gap-2.5 shrink-0 self-start">
              <button
                type="button"
                onClick={() => onToggleFollowTopic(topic.id)}
                aria-pressed={topic.isFollowed}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-extrabold backdrop-blur-md border transition-all cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 ${
                  topic.isFollowed
                    ? 'bg-emerald-400/25 border-emerald-200/50 text-white hover:bg-emerald-400/35'
                    : 'bg-white/15 border-white/30 text-white hover:bg-white/25'
                }`}
              >
                {topic.isFollowed ? (
                  <>
                    <Check className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
                    <span>Follow Hub</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onOpenAskModal}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-extrabold shadow-md shadow-black/20 transition-all cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
              >
                <Plus className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
                <span>Ask this Hub</span>
              </button>
            </div>
          </div>

          {/* Hub stats — mono numerals */}
          <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {[
              { label: 'Members', value: topic.followersCount.toLocaleString(), icon: Users },
              { label: 'Questions', value: topic.questionsCount.toLocaleString(), icon: Stethoscope },
              { label: 'Weekly asks', value: String(activity.weeklyAsks), icon: TrendingUp },
              { label: 'Acceptance', value: `${activity.acceptance}%`, icon: CheckCircle2 },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm px-3.5 py-2.5"
              >
                <dt className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/70">
                  <stat.icon className="h-3 w-3" aria-hidden="true" />
                  <span>{stat.label}</span>
                </dt>
                <dd className="font-mono text-lg sm:text-xl font-black text-white leading-tight mt-0.5">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. TAB BAR — role=tablist, roving tabindex, arrow keys       */}
      {/* ============================================================ */}
      <div
        role="tablist"
        aria-label={`${topic.name} hub sections`}
        onKeyDown={(e) => {
          const activeIndex = Math.max(0, HUB_TABS.findIndex((t) => t.id === activeTab));
          handleTabKeyDown(e, activeIndex);
        }}
        className="flex items-stretch gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none snap-x p-1.5 rounded-2xl bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl border border-neutral-200/70 dark:border-white/10 shadow-xs"
      >
        {HUB_TABS.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const Icon = HUB_TAB_ICONS[tab.id];
          const count = tabCountFor(tab.id);
          return (
            <button
              key={tab.id}
              ref={(node) => { tabRefs.current[index] = node; }}
              type="button"
              role="tab"
              id={`hub-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`hub-tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap shrink-0 snap-start transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141420] ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-white/5'
              }`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{tab.label}</span>
              {count !== null && (
                <span
                  className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 4. TAB PANELS — AnimatePresence crossfade per section        */}
      {/* ============================================================ */}
      <AnimatePresence mode="wait" initial={false}>
        {/* ------------------------------------------------ FEED --- */}
        {activeTab === 'feed' && (
          <motion.div
            key="feed"
            role="tabpanel"
            id="hub-tabpanel-feed"
            aria-labelledby="hub-tab-feed"
            tabIndex={0}
            initial={panelVariants.initial}
            animate={panelVariants.animate}
            exit={panelVariants.exit}
            transition={{ duration: 0.2 }}
            className="focus:outline-none space-y-4"
          >
            {/* Activity summary chips */}
            <div className="flex items-center gap-2 flex-wrap" aria-label="Hub activity summary">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50">
                <Flame className="h-3 w-3" aria-hidden="true" />
                <span><span className="font-mono">{activity.weeklyAsks}</span> asks this week</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-900/50">
                <MessageSquare className="h-3 w-3" aria-hidden="true" />
                <span><span className="font-mono">{activity.answers}</span> answers</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/50">
                <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                <span><span className="font-mono">{activity.acceptance}%</span> acceptance</span>
              </span>
              {topic.isStudentFriendly && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-900/50">
                  <GraduationCap className="h-3 w-3" aria-hidden="true" />
                  <span>Trainees welcome</span>
                </span>
              )}
            </div>

            {/* Sort chips */}
            <div className="flex items-center gap-1.5 flex-wrap" role="group" aria-label="Sort hub feed">
              {([
                { id: 'new', label: 'New' },
                { id: 'top', label: 'Top' },
                { id: 'unanswered', label: 'Unanswered' },
              ] as { id: FeedSort; label: string }[]).map((sort) => (
                <button
                  key={sort.id}
                  type="button"
                  onClick={() => setFeedSort(sort.id)}
                  aria-pressed={feedSort === sort.id}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141420] ${
                    feedSort === sort.id
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                      : 'bg-white/90 dark:bg-white/5 text-neutral-500 dark:text-neutral-400 border border-neutral-200/70 dark:border-white/10 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {sort.label}
                </button>
              ))}
            </div>

            {/* Hub feed cards */}
            {sortedHubQuestions.length === 0 ? (
              <div className="p-10 sm:p-12 rounded-3xl bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl border border-neutral-200/70 dark:border-white/10 text-center space-y-3">
                <MessagesSquare className="h-9 w-9 text-neutral-400 mx-auto opacity-50" aria-hidden="true" />
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                  This hub is quiet right now
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
                  No consults in {topic.name} yet — be the first to ask, {currentUser.name}. This community is ready for a second opinion.
                </p>
                <button
                  type="button"
                  onClick={onOpenAskModal}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-500/25 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141420]"
                >
                  <Plus className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
                  <span>Ask this Hub</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {sortedHubQuestions.map((question, index) => {
                  const topAnswer = pickTopAnswer(question);
                  return (
                    <motion.article
                      key={question.id}
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: prefersReducedMotion ? 0 : Math.min(index * 0.04, 0.2) }}
                      className="rounded-2xl bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl border border-neutral-200/70 dark:border-white/10 p-4 sm:p-5 space-y-3 transition-all hover:border-blue-400/50 dark:hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5"
                    >
                      {/* Author row */}
                      <div className="flex items-center gap-2.5 min-w-0">
                        <DoctorAvatar src={question.author.avatar} name={question.author.name} size="sm" />
                        <div className="min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => onViewDoctorProfile(question.author.id)}
                            className="text-xs font-extrabold text-neutral-900 dark:text-white hover:text-blue-500 transition-colors truncate block max-w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                          >
                            {question.author.name}
                          </button>
                          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block truncate">
                            {question.author.credentials} · {question.createdAt}
                          </span>
                        </div>
                        {question.urgency && (
                          <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black border ${URGENCY_STYLES[question.urgency]}`}>
                            {question.urgency === 'urgent' && <AlertCircle className="h-2.5 w-2.5" aria-hidden="true" />}
                            {URGENCY_LABELS[question.urgency]}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => onToggleBookmark(question.id)}
                          aria-pressed={question.isBookmarked}
                          aria-label={question.isBookmarked ? `Remove "${question.title}" from Study Vault` : `Save "${question.title}" to Study Vault`}
                          className={`shrink-0 h-8 w-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                            question.isBookmarked
                              ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                              : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/5'
                          }`}
                        >
                          <Bookmark className={`h-3.5 w-3.5 ${question.isBookmarked ? 'fill-amber-500' : ''}`} aria-hidden="true" />
                        </button>
                      </div>

                      {/* Question body */}
                      <button
                        type="button"
                        onClick={() => onSelectQuestion(question)}
                        className="block w-full text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141420] rounded-xl"
                      >
                        <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 dark:text-white tracking-tight leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {question.title}
                        </h3>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mt-1 line-clamp-2">
                          {question.content}
                        </p>
                      </button>

                      {/* Top / accepted answer excerpt */}
                      {topAnswer && (
                        <div className="rounded-xl bg-neutral-50/80 dark:bg-white/[0.03] border border-neutral-200/60 dark:border-white/10 p-3.5 space-y-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <DoctorAvatar src={topAnswer.author.avatar} name={topAnswer.author.name} size="xs" />
                            <span className="text-[11px] font-extrabold text-neutral-700 dark:text-neutral-200 truncate">
                              {topAnswer.author.name}
                            </span>
                            {topAnswer.isAcceptedAnswer && (
                              <span className="shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                                <CheckCircle2 className="h-2.5 w-2.5" aria-hidden="true" />
                                Accepted
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-2">
                            {topAnswer.content}
                          </p>
                          <div className="flex items-center gap-3 text-[10px] font-semibold text-neutral-500 dark:text-neutral-400">
                            <span className="flex items-center gap-1">
                              <ArrowUp className="h-3 w-3" aria-hidden="true" />
                              <span className="font-mono font-bold">{topAnswer.upvotes}</span>
                            </span>
                            {topAnswer.clinicalPearlsCited && topAnswer.clinicalPearlsCited.length > 0 && (
                              <span className="text-amber-600 dark:text-amber-400 font-bold">
                                💡 {topAnswer.clinicalPearlsCited.length} pearl{topAnswer.clinicalPearlsCited.length === 1 ? '' : 's'} cited
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Footer meta */}
                      <div className="flex items-center gap-2 flex-wrap pt-0.5">
                        <button
                          type="button"
                          onClick={() => onVoteQuestion(question.id, question.userVote === 'up' ? 'down' : 'up')}
                          aria-pressed={question.userVote === 'up'}
                          aria-label={`Upvote question: ${question.title}`}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                            question.userVote === 'up'
                              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                              : 'bg-neutral-100/80 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/80 dark:hover:bg-white/10'
                          }`}
                        >
                          <ArrowUp className={`h-3.5 w-3.5 ${question.userVote === 'up' ? 'fill-white/30' : ''}`} aria-hidden="true" />
                          <span className="font-mono">{question.upvotes - question.downvotes}</span>
                        </button>

                        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                          <MessageSquare className="h-3 w-3" aria-hidden="true" />
                          <span className="font-mono">{question.answersCount}</span>
                          <span>{question.answersCount === 1 ? 'answer' : 'answers'}</span>
                        </span>

                        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                          <Eye className="h-3 w-3" aria-hidden="true" />
                          <span className="font-mono">{question.viewsCount.toLocaleString()}</span>
                        </span>

                        <button
                          type="button"
                          onClick={() => onSelectQuestion(question)}
                          className="ml-auto inline-flex items-center gap-1 text-[11px] font-extrabold text-blue-600 dark:text-blue-400 hover:gap-1.5 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                        >
                          <span>View discussion</span>
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* ------------------------------------------------- Q&A --- */}
        {activeTab === 'qa' && (
          <motion.div
            key="qa"
            role="tabpanel"
            id="hub-tabpanel-qa"
            aria-labelledby="hub-tab-qa"
            tabIndex={0}
            initial={panelVariants.initial}
            animate={panelVariants.animate}
            exit={panelVariants.exit}
            transition={{ duration: 0.2 }}
            className="focus:outline-none space-y-3"
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                Tap a consult to open the full Q&amp;A thread — vote, answer &amp; comment.
              </p>
              <button
                type="button"
                onClick={onOpenAskModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-sm shadow-blue-500/25 transition-all cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141420]"
              >
                <Plus className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
                <span>Ask this Hub</span>
              </button>
            </div>

            {sortedHubQuestions.length === 0 ? (
              <div className="p-10 rounded-3xl bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl border border-neutral-200/70 dark:border-white/10 text-center space-y-2">
                <Stethoscope className="h-8 w-8 text-neutral-400 mx-auto opacity-50" aria-hidden="true" />
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">No questions in this hub yet</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Start the first thread with "Ask this Hub".</p>
              </div>
            ) : (
              <ul className="rounded-2xl bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl border border-neutral-200/70 dark:border-white/10 divide-y divide-neutral-200/70 dark:divide-white/5 overflow-hidden">
                {sortedHubQuestions.map((question) => (
                  <li key={question.id}>
                    <button
                      type="button"
                      onClick={() => onSelectQuestion(question)}
                      className="w-full text-left px-3.5 sm:px-5 py-3.5 flex items-start gap-3.5 hover:bg-blue-50/40 dark:hover:bg-white/[0.03] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 group"
                    >
                      {/* Upvote column */}
                      <span className="flex flex-col items-center shrink-0 pt-0.5 min-w-[34px]">
                        <ArrowUp className={`h-3.5 w-3.5 ${question.userVote === 'up' ? 'text-blue-600 dark:text-blue-400 fill-blue-600/20' : 'text-neutral-400'}`} aria-hidden="true" />
                        <span className="font-mono text-xs font-black text-neutral-700 dark:text-neutral-200">
                          {question.upvotes - question.downvotes}
                        </span>
                      </span>

                      <span className="min-w-0 flex-1 space-y-1">
                        <span className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs sm:text-sm font-extrabold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {question.title}
                          </span>
                          {question.urgency && (
                            <span className={`shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-black border ${URGENCY_STYLES[question.urgency]}`}>
                              {URGENCY_LABELS[question.urgency]}
                            </span>
                          )}
                          {question.isStudentFriendly && (
                            <span
                              className="shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                              title="Trainees encouraged to answer"
                            >
                              <GraduationCap className="h-2.5 w-2.5" aria-hidden="true" />
                              Student-friendly
                            </span>
                          )}
                        </span>
                        <span className="flex items-center gap-2.5 text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 flex-wrap">
                          <span className={`inline-flex items-center gap-1 ${question.answersCount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                            <MessageSquare className="h-3 w-3" aria-hidden="true" />
                            {question.answersCount > 0 ? (
                              <span><span className="font-mono font-bold">{question.answersCount}</span> {question.answersCount === 1 ? 'answer' : 'answers'}</span>
                            ) : (
                              <span>Awaiting answers</span>
                            )}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Eye className="h-3 w-3" aria-hidden="true" />
                            <span className="font-mono">{question.viewsCount.toLocaleString()}</span> views
                          </span>
                          <span className="truncate">{question.author.name} · {question.createdAt}</span>
                        </span>
                      </span>

                      <ChevronRight className="h-4 w-4 shrink-0 self-center text-neutral-300 dark:text-neutral-600 group-hover:text-blue-500 transition-colors" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}

        {/* ---------------------------------------- LEADERBOARD --- */}
        {activeTab === 'leaderboard' && (
          <motion.div
            key="leaderboard"
            role="tabpanel"
            id="hub-tabpanel-leaderboard"
            aria-labelledby="hub-tab-leaderboard"
            tabIndex={0}
            initial={panelVariants.initial}
            animate={panelVariants.animate}
            exit={panelVariants.exit}
            transition={{ duration: 0.2 }}
            className="focus:outline-none"
          >
            <TopicHubLeaderboard topicId={topic.id} topicName={topic.name} entries={leaderboardEntries} />
          </motion.div>
        )}

        {/* ------------------------------------------------ ABOUT --- */}
        {activeTab === 'about' && (
          <motion.div
            key="about"
            role="tabpanel"
            id="hub-tabpanel-about"
            aria-labelledby="hub-tab-about"
            tabIndex={0}
            initial={panelVariants.initial}
            animate={panelVariants.animate}
            exit={panelVariants.exit}
            transition={{ duration: 0.2 }}
            className="focus:outline-none grid grid-cols-1 lg:grid-cols-3 gap-4 items-start"
          >
            {/* Main column: description + stats + rules */}
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-2xl bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl border border-neutral-200/70 dark:border-white/10 p-4 sm:p-5 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-black text-neutral-900 dark:text-white tracking-tight">About this hub</h3>
                  {category && (
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-neutral-100/80 dark:bg-white/5 border-neutral-200/70 dark:border-white/10 ${category.accentText}`}>
                      {category.name}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {topic.description}
                </p>
                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { label: 'Members', value: topic.followersCount.toLocaleString() },
                    { label: 'Questions', value: topic.questionsCount.toLocaleString() },
                    { label: 'Weekly asks', value: String(topic.weeklyAsks ?? 0) },
                    { label: 'Acceptance', value: `${topic.acceptanceRate ?? activity.acceptance}%` },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl bg-neutral-50/80 dark:bg-white/[0.03] border border-neutral-200/60 dark:border-white/10 px-3 py-2.5 text-center"
                    >
                      <dd className="font-mono text-base font-black text-neutral-900 dark:text-white leading-tight">{stat.value}</dd>
                      <dt className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 mt-0.5">{stat.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Hub rules (numbered, styled; fallback text when the topic has none) */}
              <div className="rounded-2xl bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl border border-neutral-200/70 dark:border-white/10 p-4 sm:p-5 space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-black text-neutral-900 dark:text-white tracking-tight">
                  <ScrollText className="h-4 w-4 text-blue-500" aria-hidden="true" />
                  <span>Hub rules</span>
                </h3>
                <ol className="space-y-2.5">
                  {(topic.hubRules ?? DEFAULT_HUB_RULES).map((rule, ruleIndex) => (
                    <li key={ruleIndex} className="flex items-start gap-3">
                      <span className="h-6 w-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 font-mono text-[11px] font-black flex items-center justify-center shrink-0" aria-hidden="true">
                        {ruleIndex + 1}
                      </span>
                      <span className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pt-0.5">{rule}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Side column: tags + related hubs */}
            <div className="space-y-4">
              {(topic.trendingTags ?? []).length > 0 && (
                <div className="rounded-2xl bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl border border-neutral-200/70 dark:border-white/10 p-4 sm:p-5 space-y-3">
                  <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                    <Hash className="h-3.5 w-3.5 text-blue-500" aria-hidden="true" />
                    <span>Trending tags</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {topic.trendingTags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-neutral-100/80 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 border border-neutral-200/70 dark:border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {relatedHubs.length > 0 && (
                <div className="rounded-2xl bg-white/90 dark:bg-[#141420]/90 backdrop-blur-xl border border-neutral-200/70 dark:border-white/10 p-4 sm:p-5 space-y-3">
                  <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                    <ArrowRight className="h-3.5 w-3.5 text-blue-500" aria-hidden="true" />
                    <span>Related hubs</span>
                  </h3>
                  <ul className="space-y-2">
                    {relatedHubs.map((related) => (
                      <li key={related.id}>
                        <button
                          type="button"
                          onClick={() => onOpenHub(related.id)}
                          aria-label={`Open ${related.name} hub`}
                          className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-neutral-50/80 dark:bg-white/[0.03] border border-neutral-200/70 dark:border-white/10 hover:border-blue-400/60 dark:hover:border-blue-500/40 transition-all cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 group/related"
                        >
                          <span className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 text-white bg-gradient-to-br ${gradientFor(related)} shadow-sm`}>
                            {resolveHubIcon(related.iconName, 'h-4 w-4')}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-xs font-extrabold text-neutral-900 dark:text-white truncate group-hover/related:text-blue-600 dark:group-hover/related:text-blue-400 transition-colors">
                              {related.name}
                            </span>
                            <span className="block text-[10px] font-semibold text-neutral-500 dark:text-neutral-400">
                              <span className="font-mono">{related.followersCount.toLocaleString()}</span> members ·
                              <span className="font-mono"> {related.questionsCount}</span> questions
                            </span>
                          </span>
                          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-neutral-400" aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
