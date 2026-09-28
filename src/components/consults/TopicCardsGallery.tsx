import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Eye,
  Activity,
  Shield,
  Baby,
  Droplets,
  Layers,
  Pill,
  Sparkles,
  Flame,
  Check,
  Plus,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  Tag,
  Stethoscope,
  Filter,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  X,
  Compass
} from 'lucide-react';
import { QuestionTopic } from '../../types';

interface TopicCardsGalleryProps {
  topics: QuestionTopic[];
  selectedTopicId: string | null;
  onSelectTopic: (topicId: string | null) => void;
  onToggleFollowTopic: (topicId: string) => void;
  onSelectTag?: (tag: string) => void;
  onJumpToConsults?: () => void;
}

export type TopicFilterType = 'all' | 'student' | 'popular' | 'recommended' | 'trending' | 'following';

const getTopicIcon = (iconName: string, className = "h-4 w-4") => {
  switch (iconName.toLowerCase()) {
    case 'eye':
      return <Eye className={className} />;
    case 'activity':
      return <Activity className={className} />;
    case 'shield':
      return <Shield className={className} />;
    case 'baby':
      return <Baby className={className} />;
    case 'droplets':
      return <Droplets className={className} />;
    case 'layers':
      return <Layers className={className} />;
    case 'pill':
      return <Pill className={className} />;
    default:
      return <Tag className={className} />;
  }
};

export const TopicCardsGallery: React.FC<TopicCardsGalleryProps> = ({
  topics,
  selectedTopicId,
  onSelectTopic,
  onToggleFollowTopic,
  onSelectTag,
  onJumpToConsults,
}) => {
  const [activeFilter, setActiveFilter] = useState<TopicFilterType>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter topics according to selected tab
  const filteredTopics = useMemo(() => {
    switch (activeFilter) {
      case 'student':
        return topics.filter((t) => t.isStudentFriendly !== false);
      case 'popular':
        return [...topics].sort(
          (a, b) => (b.followersCount + b.questionsCount * 3) - (a.followersCount + a.questionsCount * 3)
        );
      case 'recommended':
        return topics.filter((t) => t.isRecommended || t.isFollowed);
      case 'trending':
        return topics.filter((t) => t.isTrending || (t.trendingTags && t.trendingTags.length > 0));
      case 'following':
        return topics.filter((t) => t.isFollowed);
      case 'all':
      default:
        return topics;
    }
  }, [topics, activeFilter]);

  // Check scroll boundary to enable/disable arrow buttons
  const checkScrollPosition = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScrollPosition();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollPosition, { passive: true });
      return () => el.removeEventListener('scroll', checkScrollPosition);
    }
  }, [filteredTopics]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = direction === 'left' ? -310 : 310;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleCardClick = (topicId: string) => {
    onSelectTopic(selectedTopicId === topicId ? null : topicId);
    if (onJumpToConsults) {
      onJumpToConsults();
    }
  };

  const selectedTopic = topics.find((t) => t.id === selectedTopicId);

  return (
    <section className="relative w-full rounded-3xl bg-white dark:bg-[#111116] border border-neutral-200/90 dark:border-neutral-800/90 p-4 sm:p-5 shadow-xs transition-all">
      
      {/* Top Header Bar & Category Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
        
        {/* Title & Micro Subtext */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <h2 className="text-sm sm:text-base font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>Specialty Consult Hubs</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/70 dark:border-blue-900/60">
                {topics.length} Hubs
              </span>
            </h2>
          </div>
          <span className="hidden sm:inline text-xs text-neutral-400">•</span>
          <p className="hidden sm:block text-xs text-neutral-500 dark:text-neutral-400">
            Scroll horizontally to explore specialty topics & peer inquiries.
          </p>
        </div>

        {/* Horizontal Navigation Arrow Buttons & Active Filter Pill */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          {selectedTopic && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-xs text-blue-700 dark:text-blue-300">
              <span className="font-bold truncate max-w-[130px]">{selectedTopic.name}</span>
              <button
                type="button"
                onClick={() => onSelectTopic(null)}
                className="p-0.5 rounded-md hover:bg-blue-200/50 text-blue-700 dark:text-blue-300 cursor-pointer"
                title="Clear filter"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className="h-8 w-8 rounded-xl flex items-center justify-center border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#16161c] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              title="Scroll left"
              aria-label="Scroll topics left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className="h-8 w-8 rounded-xl flex items-center justify-center border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#16161c] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              title="Scroll right"
              aria-label="Scroll topics right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Filter Switcher Tabs Ribbon */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none">
        
        {/* All Hubs */}
        <button
          onClick={() => setActiveFilter('all')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95 ${
            activeFilter === 'all'
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
          }`}
        >
          <Compass className="h-3.5 w-3.5 text-blue-500" />
          <span>All Hubs ({topics.length})</span>
        </button>

        {/* Student & Resident Friendly Hub (New) */}
        <button
          onClick={() => setActiveFilter('student')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95 ${
            activeFilter === 'student'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-emerald-700 dark:text-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200/60 dark:border-emerald-800/50'
          }`}
        >
          <GraduationCap className="h-3.5 w-3.5" />
          <span>Student & Resident Hub 🎓</span>
        </button>

        {/* Most Popular */}
        <button
          onClick={() => setActiveFilter('popular')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95 ${
            activeFilter === 'popular'
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
          }`}
        >
          <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500/20" />
          <span>Most Popular</span>
        </button>

        {/* Recommended */}
        <button
          onClick={() => setActiveFilter('recommended')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95 ${
            activeFilter === 'recommended'
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-500" />
          <span>Recommended</span>
        </button>

        {/* New & Trending */}
        <button
          onClick={() => setActiveFilter('trending')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95 ${
            activeFilter === 'trending'
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
          }`}
        >
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          <span>New & Trending</span>
        </button>

        {/* Following */}
        <button
          onClick={() => setActiveFilter('following')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95 ${
            activeFilter === 'following'
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
          }`}
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500" />
          <span>Following ({topics.filter((t) => t.isFollowed).length})</span>
        </button>

      </div>

      {/* Horizontal Scrollable Carousel Container */}
      <div
        ref={scrollContainerRef}
        tabIndex={0}
        role="region"
        aria-label="Specialty consult hubs carousel"
        className="flex items-stretch gap-3.5 overflow-x-auto scroll-smooth scrollbar-none py-1.5 px-0.5 snap-x snap-mandatory focus:outline-hidden"
      >
        {filteredTopics.map((topic, index) => {
          const isSelected = selectedTopicId === topic.id;
          return (
            <div
              key={topic.id}
              onClick={() => handleCardClick(topic.id)}
              style={{ animationDelay: `${index * 35}ms` }}
              className={`group relative w-[265px] sm:w-[295px] h-[175px] shrink-0 snap-start rounded-2xl overflow-hidden cursor-pointer select-none transition-all duration-300 animate-card-in hover:-translate-y-1 ${
                isSelected
                  ? 'ring-2 ring-blue-500 border border-blue-400 shadow-lg shadow-blue-500/20'
                  : 'border border-neutral-200/90 dark:border-neutral-800/90 hover:border-blue-400/80 hover:shadow-md'
              }`}
            >
              {/* Background Clinical Image with Dark Vignette Gradient */}
              <div className="absolute inset-0 z-0 bg-neutral-900">
                {topic.imageUrl ? (
                  <img
                    src={topic.imageUrl}
                    alt={topic.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-70"
                    loading="lazy"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${topic.bannerColor} opacity-40`} />
                )}
                {/* Multi-stage dark gradient overlay ensuring accessible text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/35 group-hover:via-black/65 transition-colors" />
              </div>

              {/* Radiant Subspecialty Top Stripe */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                  topic.gradient || 'from-blue-500 to-indigo-500'
                } z-10`}
              />

              {/* Card Foreground Content */}
              <div className="relative z-10 p-3.5 h-full flex flex-col justify-between text-white">
                
                {/* Top Row: Icon + Badges */}
                <div className="flex items-start justify-between gap-2">
                  <div className="h-8 w-8 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-xs group-hover:scale-110 transition-transform">
                    {getTopicIcon(topic.iconName, 'h-4 w-4')}
                  </div>

                  <div className="flex items-center gap-1">
                    {topic.isTrending && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/90 text-white backdrop-blur-xs">
                        <Flame className="h-2.5 w-2.5 fill-white" />
                        <span>Hot</span>
                      </span>
                    )}

                    {topic.isStudentFriendly && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white backdrop-blur-xs" title="Open to students & residents">
                        🎓 Trainees
                      </span>
                    )}

                    {isSelected && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-600 text-white shadow-xs">
                        <Check className="h-3 w-3 stroke-[3]" />
                        <span>Selected</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Middle: Topic Name & Scope */}
                <div className="mt-1">
                  <h3 className="text-sm font-extrabold text-white tracking-tight group-hover:text-blue-300 transition-colors line-clamp-1">
                    {topic.name}
                  </h3>
                  <p className="text-[11px] text-neutral-300 line-clamp-2 leading-relaxed mt-0.5">
                    {topic.description}
                  </p>
                </div>

                {/* Bottom Row: Metrics & Follow Action */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                  
                  <div className="flex items-center gap-2 text-neutral-300 text-[10px] font-semibold">
                    <span className="flex items-center gap-1">
                      <Stethoscope className="h-3 w-3 text-blue-400" />
                      {topic.questionsCount} Inquiries
                    </span>
                    <span>•</span>
                    <span>{topic.followersCount.toLocaleString()} ODs</span>
                  </div>

                  {/* Follow Toggle Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFollowTopic(topic.id);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer active:scale-95 ${
                      topic.isFollowed
                        ? 'bg-white/20 text-white hover:bg-red-500/80 backdrop-blur-md'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs'
                    }`}
                  >
                    {topic.isFollowed ? 'Following' : '+ Follow'}
                  </button>

                </div>

              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
