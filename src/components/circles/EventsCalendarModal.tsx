import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Award,
  Users,
  Search,
  Check,
  Share2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  X,
  Plus,
  Video,
  BookOpen,
  Filter,
  CheckCircle2,
  CalendarPlus,
  Download,
  Flame,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ClinicalEvent } from '../../types';

interface EventsCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: ClinicalEvent[];
  onToggleRegister: (eventId: string) => void;
  onSelectCircle?: (circleId: string) => void;
}

export const EventsCalendarModal: React.FC<EventsCalendarModalProps> = ({
  isOpen,
  onClose,
  events,
  onToggleRegister,
  onSelectCircle,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Helper to trigger calendar .ics file download
  const handleDownloadIcs = (event: ClinicalEvent) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Optoms Global Network//Clinical Calendar//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, ' ')}\\n\\nSpeaker: ${event.speaker.name} (${event.speaker.credentials})\\nAccreditation: ${event.ceCredits || 'COPE/CPD'}
STATUS:CONFIRMED
LOCATION:${event.locationType}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = (event: ClinicalEvent) => {
    setCopiedId(event.id);
    navigator.clipboard?.writeText?.(
      `Join ${event.title} on Optoms Global Network! Speaker: ${event.speaker.name}, ${event.speaker.credentials} (${event.ceCredits || 'COPE/CPD Accredited'})`
    );
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchesFilter =
        selectedFilter === 'All'
          ? true
          : selectedFilter === 'Registered'
          ? evt.isRegistered
          : evt.category === selectedFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        evt.title.toLowerCase().includes(q) ||
        evt.speaker.name.toLowerCase().includes(q) ||
        evt.subspecialty.toLowerCase().includes(q) ||
        evt.tags.some((t) => t.toLowerCase().includes(q));

      return matchesFilter && matchesSearch;
    });
  }, [events, selectedFilter, searchQuery]);

  const registeredCount = useMemo(
    () => events.filter((e) => e.isRegistered).length,
    [events]
  );

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 15 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/90 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Top Header */}
        <div className="relative p-5 sm:p-6 bg-gradient-to-r from-blue-900 via-indigo-950 to-neutral-950 text-white border-b border-white/10 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
                <Calendar className="h-3.5 w-3.5 text-blue-400" />
                <span>Optoms Global Clinical Calendar</span>
                <span className="h-1 w-1 rounded-full bg-blue-300" />
                <span>{events.length} Upcoming Events</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Upcoming Webinars, Grand Rounds & Congresses
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
                Stay updated with accredited continuing education (COPE / CPD), live surgical & scleral lens masterclasses, and international optometric symposia.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              title="Close Calendar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Filter & Search Bar */}
          <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-72 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topic, speaker, #Cornea..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/10 text-xs text-white placeholder-neutral-400 border border-white/15 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
              {[
                { id: 'All', label: 'All Events' },
                { id: 'Webinar', label: 'Webinars' },
                { id: 'Grand Rounds', label: 'Grand Rounds' },
                { id: 'Global Congress', label: 'Congresses' },
                { id: 'Workshop', label: 'Workshops' },
                { id: 'Registered', label: `My Registered (${registeredCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedFilter === tab.id
                      ? 'bg-white text-neutral-900 shadow-md'
                      : 'bg-white/10 hover:bg-white/15 text-neutral-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Events List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-3">
              <Calendar className="h-10 w-10 text-neutral-400 mx-auto" />
              <h3 className="font-bold text-neutral-900 dark:text-white">
                No events match your search criteria
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Try clearing your search or switching to "All Events" to explore the full schedule.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('All');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredEvents.map((evt) => {
                const isUrgent = evt.daysUntil <= 3;
                return (
                  <motion.div
                    key={evt.id}
                    layout
                    className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-md transition-all space-y-4"
                  >
                    {/* Top Row: Category, CE Credits, Countdown */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            evt.category === 'Webinar'
                              ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400'
                              : evt.category === 'Grand Rounds'
                              ? 'bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400'
                              : evt.category === 'Global Congress'
                              ? 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400'
                              : 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400'
                          }`}
                        >
                          {evt.category}
                        </span>

                        <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-[11px] font-medium">
                          {evt.subspecialty}
                        </span>

                        {evt.ceCredits && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold border border-indigo-200 dark:border-indigo-800">
                            <Award className="h-3 w-3" />
                            {evt.ceCredits}
                          </span>
                        )}
                      </div>

                      {/* Days until badge */}
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            isUrgent
                              ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              isUrgent
                                ? 'bg-rose-500 animate-pulse'
                                : 'bg-emerald-500'
                            }`}
                          />
                          {evt.daysUntil === 0
                            ? 'Happening Today!'
                            : evt.daysUntil === 1
                            ? 'Tomorrow!'
                            : `In ${evt.daysUntil} days`}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-snug">
                        {evt.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>

                    {/* Key Clinical Takeaways */}
                    {evt.keyLearnings && evt.keyLearnings.length > 0 && (
                      <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 space-y-1.5">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-amber-500" />
                          High-Yield Clinical Takeaways
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                          {evt.keyLearnings.map((learning, idx) => (
                            <div key={idx} className="flex items-start gap-1.5">
                              <span className="text-blue-500 font-bold">•</span>
                              <span className="leading-snug">{learning}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Middle Info: Speaker + Time & Platform */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
                      {/* Speaker Box */}
                      <div className="flex items-center gap-3">
                        <img
                          src={evt.speaker.avatar}
                          alt={evt.speaker.name}
                          className="h-10 w-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-700 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                              {evt.speaker.name}
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                              {evt.speaker.credentials}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 line-clamp-1">
                            {evt.speaker.role} • {evt.speaker.institution}
                          </p>
                        </div>
                      </div>

                      {/* Date & Time details */}
                      <div className="space-y-1 text-xs text-neutral-600 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/50 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800/80">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                          <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                            {evt.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>{evt.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-500 text-[11px]">
                          <MapPin className="h-3 w-3 text-purple-500 shrink-0" />
                          <span>{evt.locationType}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                      {/* Host Circle & Attendees */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                        {evt.hostCircleName && (
                          <button
                            type="button"
                            onClick={() => {
                              if (evt.hostCircleId && onSelectCircle) {
                                onClose();
                                onSelectCircle(evt.hostCircleId);
                              }
                            }}
                            className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
                          >
                            <span>Hosted by {evt.hostCircleName}</span>
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 text-neutral-400" />
                          <span>{evt.attendeesCount} Optoms attending</span>
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="flex items-center gap-2">
                        {/* Share Button */}
                        <button
                          onClick={() => handleShare(evt)}
                          className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                          title="Share event link"
                        >
                          <Share2 className="h-3.5 w-3.5" />
                          {copiedId === evt.id ? (
                            <span className="text-emerald-500 font-bold">Copied!</span>
                          ) : (
                            <span className="hidden sm:inline">Share</span>
                          )}
                        </button>

                        {/* Calendar .ICS Button */}
                        <button
                          onClick={() => handleDownloadIcs(evt)}
                          className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                          title="Add to Google / Apple Calendar (.ics)"
                        >
                          <CalendarPlus className="h-3.5 w-3.5 text-blue-500" />
                          <span className="hidden sm:inline">Add to Cal</span>
                        </button>

                        {/* Register Toggle CTA */}
                        <button
                          onClick={() => onToggleRegister(evt.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                            evt.isRegistered
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                              : 'bg-blue-600 hover:bg-blue-500 text-white'
                          }`}
                        >
                          {evt.isRegistered ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>Registered (Pass Sent)</span>
                            </>
                          ) : (
                            <>
                              <Plus className="h-3.5 w-3.5" />
                              <span>Register (Free for Optoms)</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 shrink-0">
          <span>
            All sessions provide digital COPE / CPD verification attendance certificates.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl font-semibold bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 cursor-pointer"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
