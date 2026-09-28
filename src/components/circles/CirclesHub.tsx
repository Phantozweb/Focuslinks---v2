import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Sparkles,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Flame,
  Check,
  Plus,
  ArrowRight,
  Hash,
  Calendar,
  Clock,
  Award,
  CalendarDays,
} from 'lucide-react';
import { motion } from 'motion/react';
import { OdGroup, DoctorProfile, ClinicalEvent } from '../../types';

interface CirclesHubProps {
  groups: OdGroup[];
  currentUser: DoctorProfile;
  events?: ClinicalEvent[];
  onSelectCircle: (circleId: string) => void;
  onJoinToggle: (groupId: string) => void;
  onOpenProposeModal: () => void;
  onOpenEventsCalendar: () => void;
  onToggleRegisterEvent?: (eventId: string) => void;
  onViewDoctorProfile?: (doctorId: string) => void;
}

export const CirclesHub: React.FC<CirclesHubProps> = ({
  groups,
  currentUser,
  events = [],
  onSelectCircle,
  onJoinToggle,
  onOpenProposeModal,
  onOpenEventsCalendar,
  onToggleRegisterEvent,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [criteriaSort, setCriteriaSort] = useState<'popular' | 'trending' | 'discussions' | 'joined'>('popular');

  const categories = useMemo(() => {
    const cats = new Set(groups.map((g) => g.category));
    return ['All', ...Array.from(cats)];
  }, [groups]);

  // Filter and sort groups
  const filteredAndSortedGroups = useMemo(() => {
    return groups
      .filter((group) => {
        const matchesCategory = selectedCategory === 'All' || group.category === selectedCategory;
        const matchesJoined = criteriaSort === 'joined' ? group.isJoined : true;
        const matchesSearch =
          !searchQuery.trim() ||
          group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.channelHandle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.recentTopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesJoined && matchesSearch;
      })
      .sort((a, b) => {
        if (criteriaSort === 'popular') return b.membersCount - a.membersCount;
        if (criteriaSort === 'trending') return (b.activeOnline || 0) - (a.activeOnline || 0);
        if (criteriaSort === 'discussions') return b.activeDiscussions - a.activeDiscussions;
        if (criteriaSort === 'joined') return (b.activeOnline || 0) - (a.activeOnline || 0);
        return 0;
      });
  }, [groups, selectedCategory, criteriaSort, searchQuery]);

  // Featured / Most Popular Circles for Spotlight section
  const featuredCircles = useMemo(() => {
    return [...groups].sort((a, b) => b.membersCount - a.membersCount).slice(0, 3);
  }, [groups]);

  const totalMembers = useMemo(() => {
    return groups.reduce((acc, g) => acc + g.membersCount, 0);
  }, [groups]);

  const totalDiscussions = useMemo(() => {
    return groups.reduce((acc, g) => acc + g.activeDiscussions, 0);
  }, [groups]);

  // Upcoming 2 events for quick ticker/preview
  const imminentEvents = useMemo(() => {
    return [...events].sort((a, b) => a.daysUntil - b.daysUntil).slice(0, 2);
  }, [events]);

  return (
    <div className="w-full space-y-7">
      {/* Top Hero Banner - Global Optometry Community Hub Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-blue-950 text-white p-6 sm:p-8 md:p-10 shadow-2xl border border-neutral-800">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold tracking-wide border border-blue-500/30">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>Global Optometrists Clinical Exchange</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
              Clinical Circles
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Connect with fellow optometrists worldwide. Join dedicated subspecialty channels for acute case triage, 
              evidence consensus polls, chairside case discussion, and collaborative learning.
            </p>

            {/* Quick Community Highlights Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-400 text-base">{groups.length}</span>
                <span className="text-neutral-400">Subspecialty Circles</span>
              </div>
              <span className="text-neutral-600 hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-400 text-base">24/7</span>
                <span className="text-neutral-400">Global Peer Collaboration</span>
              </div>
              <span className="text-neutral-600 hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-indigo-300 text-base">Verified</span>
                <span className="text-neutral-400">Optometrist Network</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={onOpenEventsCalendar}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 active:scale-95 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Calendar className="h-4 w-4 text-indigo-200" />
              <span>Events & Webinars Calendar</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            <button
              onClick={onOpenProposeModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-medium text-xs border border-white/15 transition-all cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Propose New Subspecialty Circle</span>
            </button>
            <div className="flex items-center gap-2 text-[11px] text-neutral-400 px-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>100% HIPAA De-identified Peer Network</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Clinical Events & Calendar Card (On Demand / Tap to View) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-white dark:from-neutral-900 dark:via-neutral-900/90 dark:to-blue-950/30 border border-blue-200/80 dark:border-neutral-800 shadow-sm transition-all">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <CalendarDays className="h-4 w-4" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <span>Upcoming Grand Rounds, Webinars & CPD Masterclasses</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[11px] font-extrabold">
                  {events.length} Scheduled
                </span>
              </h2>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              Keep updated with continuing education credits, live case panels, and international clinical symposia hosted by verified optometric communities.
            </p>
          </div>

          <button
            onClick={onOpenEventsCalendar}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 font-bold text-xs shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Open Clinical Events Calendar</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Quick Imminent Events Preview Ticker */}
        {imminentEvents.length > 0 && (
          <div className="mt-4 pt-3.5 border-t border-blue-100 dark:border-neutral-800/80 grid grid-cols-1 md:grid-cols-2 gap-3">
            {imminentEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={onOpenEventsCalendar}
                className="group p-3.5 rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200/90 dark:border-neutral-700/60 hover:border-blue-500 dark:hover:border-blue-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                        {evt.category}
                      </span>
                      {evt.ceCredits && (
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          {evt.ceCredits}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {evt.title}
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-[10px] font-bold border border-rose-200 dark:border-rose-900/50 whitespace-nowrap shrink-0">
                    {evt.daysUntil === 0 ? 'Today!' : `In ${evt.daysUntil} days`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 pt-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <Clock className="h-3 w-3 text-neutral-400 shrink-0" />
                    <span className="truncate">{evt.date} • {evt.time.split('(')[0]}</span>
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:underline flex items-center gap-0.5 shrink-0 ml-2">
                    Details <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Featured / Most Popular Spotlight Row */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-1 bg-blue-600 rounded-full" />
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2 font-['Plus_Jakarta_Sans',sans-serif]">
              <Flame className="h-5 w-5 text-amber-500" />
              <span>Most Popular Global Communities</span>
            </h2>
          </div>
          <span className="text-xs text-neutral-500 font-medium">Largest Active Memberships</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredCircles.map((circle) => (
            <motion.div
              key={circle.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelectCircle(circle.id)}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all cursor-pointer"
            >
              {/* Cover Header */}
              <div className="relative h-32 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={circle.coverImage}
                  alt={circle.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                    {circle.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/80 backdrop-blur-md text-white text-[11px] font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    {circle.activeOnline || 42} Online
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <h3 className="font-bold text-base leading-snug line-clamp-1 group-hover:text-blue-300 transition-colors">
                    {circle.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                  {circle.description}
                </p>

                {/* Channel Previews */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Featured Channels
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {circle.channels?.slice(0, 3).map((ch) => (
                      <span
                        key={ch.id}
                        className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                      >
                        <Hash className="h-3 w-3 text-neutral-400" />
                        {ch.name}
                      </span>
                    ))}
                    {(circle.channels?.length || 0) > 3 && (
                      <span className="text-[10px] font-semibold text-neutral-400 px-1.5 py-0.5">
                        +{circle.channels!.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer with stats & CTA */}
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div className="text-xs text-neutral-500 flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-blue-500" />
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                      {circle.membersCount.toLocaleString()}
                    </span>
                    <span>optoms</span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Enter Community</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Discovery & Search / Filter Controls (Facebook Groups style) */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-1 bg-emerald-600 rounded-full" />
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
              Explore All Clinical Communities
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              {filteredAndSortedGroups.length}
            </span>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search circles, nomograms, topics..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Criteria Sort Pills & Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          {/* Criteria Pills: Most Popular, Trending, Most Discussions, My Joined */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setCriteriaSort('popular')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                criteriaSort === 'popular'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
              <span>Most Popular</span>
            </button>

            <button
              onClick={() => setCriteriaSort('trending')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                criteriaSort === 'trending'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Trending Now</span>
            </button>

            <button
              onClick={() => setCriteriaSort('discussions')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                criteriaSort === 'discussions'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Most Discussions</span>
            </button>

            <button
              onClick={() => setCriteriaSort('joined')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                criteriaSort === 'joined'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <Check className="h-3.5 w-3.5" />
              <span>My Joined Circles</span>
            </button>
          </div>

          {/* Subspecialty Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Communities Grid - Facebook Groups Style Cards */}
        {filteredAndSortedGroups.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredAndSortedGroups.map((group) => {
              return (
                <div
                  key={group.id}
                  onClick={() => onSelectCircle(group.id)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  {/* Top Cover Visual with Channel Handle */}
                  <div className="relative h-40 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={group.coverImage}
                      alt={group.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                        {group.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-xs font-bold shadow-xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        {group.activeOnline || 18} Live
                      </span>
                    </div>

                    {/* Bottom Title inside Cover */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[11px] font-mono text-blue-300 font-semibold block mb-0.5">
                        {group.channelHandle || `@${group.name.replace(/\s+/g, '')}`}
                      </span>
                      <h3 className="font-bold text-lg leading-tight group-hover:text-blue-300 transition-colors">
                        {group.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                      {group.description}
                    </p>

                    {/* Recent Topic / Case Box */}
                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-700/50 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                        <MessageSquare className="h-3 w-3 text-blue-500" />
                        <span>Recent Active Topic:</span>
                      </div>
                      <p className="text-xs text-neutral-800 dark:text-neutral-200 font-medium line-clamp-1 italic">
                        "{group.recentTopic}"
                      </p>
                    </div>

                    {/* Available Channels Preview */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                        <span>Subspecialty Channels</span>
                        <span>{group.channels?.length || 0} channels</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {group.channels?.slice(0, 4).map((ch) => (
                          <span
                            key={ch.id}
                            className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/50 dark:border-neutral-700/50"
                          >
                            <Hash className="h-3 w-3 text-neutral-400" />
                            {ch.name}
                          </span>
                        ))}
                        {(group.channels?.length || 0) > 4 && (
                          <span className="text-[11px] font-semibold text-neutral-400 px-1 py-0.5">
                            +{group.channels!.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Metadata & Primary Actions */}
                    <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3 text-xs text-neutral-500">
                        <span className="flex items-center gap-1 font-semibold text-neutral-800 dark:text-neutral-200">
                          <Users className="h-3.5 w-3.5 text-blue-500" />
                          {group.membersCount.toLocaleString()}
                        </span>
                        <span>•</span>
                        <span>{group.activeDiscussions} debates</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onJoinToggle(group.id);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            group.isJoined
                              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                              : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800'
                          }`}
                        >
                          {group.isJoined ? 'Joined ✓' : '+ Join'}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCircle(group.id);
                          }}
                          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                        >
                          <span>Enter</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="h-12 w-12 mx-auto rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              No clinical communities matched your filter
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Try adjusting your search criteria, selecting "All Communities", or propose a new circle!
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setCriteriaSort('popular');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
