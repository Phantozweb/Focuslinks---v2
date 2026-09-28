import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  MapPin,
  Sparkles,
  Flame,
  Award,
  ShieldCheck,
  UserCheck,
  UserPlus,
  MessageSquare,
  ChevronRight,
  Filter,
  Check,
  Eye,
  Send,
  Navigation,
  BookOpen,
  Activity,
  Stethoscope,
  X,
  SlidersHorizontal,
  Compass,
  ArrowUpRight,
  GraduationCap
} from 'lucide-react';
import { DoctorProfile } from '../types';

interface DoctorsDirectoryViewProps {
  currentUser: DoctorProfile;
  allDoctors: DoctorProfile[];
  onViewDoctorProfile: (doctorId: string) => void;
  onEditProfile?: () => void;
}

export const DoctorsDirectoryView: React.FC<DoctorsDirectoryViewProps> = ({
  currentUser,
  allDoctors,
  onViewDoctorProfile,
  onEditProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [onlyNearby, setOnlyNearby] = useState<boolean>(false);
  const [onlyHighConcordance, setOnlyHighConcordance] = useState<boolean>(false);
  const [onlyNewFellows, setOnlyNewFellows] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'concordance' | 'distance' | 'pearls' | 'name'>('concordance');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  const [connectedDoctorIds, setConnectedDoctorIds] = useState<Set<string>>(
    new Set(['doc-marcus-chen', 'doc-amara-thorne', 'doc-sarah-jenkins', 'doc-tariq-al-mansoor'])
  );
  const [consultModalDoctor, setConsultModalDoctor] = useState<DoctorProfile | null>(null);
  const [consultSent, setConsultSent] = useState(false);
  const [consultMessage, setConsultMessage] = useState('');

  // Toggle connection state
  const handleToggleConnect = (doctorId: string) => {
    setConnectedDoctorIds((prev) => {
      const next = new Set(prev);
      if (next.has(doctorId)) {
        next.delete(doctorId);
      } else {
        next.add(doctorId);
      }
      return next;
    });
  };

  // Send quick clinical consult
  const handleSendConsult = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSent(true);
    setTimeout(() => {
      setConsultSent(false);
      setConsultModalDoctor(null);
      setConsultMessage('');
    }, 1800);
  };

  // Spotlight colleagues (top recommended colleagues curated without needing a separate tab)
  const spotlightDoctors = useMemo(() => {
    return allDoctors.filter(
      (doc) =>
        doc.id !== currentUser.id &&
        (doc.peerConcordance !== undefined && doc.peerConcordance >= 96)
    ).slice(0, 4);
  }, [allDoctors, currentUser]);

  // Unified Filtered and sorted doctors (NO TABS!)
  const filteredAndSortedDoctors = useMemo(() => {
    const list = allDoctors.filter((doc) => {
      // Search matching
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        doc.name.toLowerCase().includes(q) ||
        doc.credentials.toLowerCase().includes(q) ||
        doc.clinicName.toLowerCase().includes(q) ||
        doc.location.toLowerCase().includes(q) ||
        doc.subspecialtyCategory?.toLowerCase().includes(q) ||
        doc.diagnosticTechnologies.some((t) =>
          t.name.toLowerCase().includes(q)
        );

      // Specialty filter
      const matchesSpecialty =
        selectedSpecialty === 'all' || doc.subspecialtyCategory === selectedSpecialty;

      // Smart quick filters (toggles, not tabs)
      const matchesNearby = !onlyNearby || (doc.distanceMiles !== undefined && doc.distanceMiles <= 50);
      const matchesConcordance = !onlyHighConcordance || (doc.peerConcordance !== undefined && doc.peerConcordance >= 95);
      const matchesNewFellows = !onlyNewFellows || !!doc.isNew;

      return matchesSearch && matchesSpecialty && matchesNearby && matchesConcordance && matchesNewFellows;
    });

    // Sorting
    return list.sort((a, b) => {
      if (sortBy === 'distance') {
        return (a.distanceMiles ?? 9999) - (b.distanceMiles ?? 9999);
      }
      if (sortBy === 'pearls') {
        return (b.pearlsCited ?? 0) - (a.pearlsCited ?? 0);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // default: highest peer concordance
      return (b.peerConcordance ?? 0) - (a.peerConcordance ?? 0);
    });
  }, [allDoctors, searchQuery, selectedSpecialty, onlyNearby, onlyHighConcordance, onlyNewFellows, sortBy]);

  const activeFiltersCount =
    (selectedSpecialty !== 'all' ? 1 : 0) +
    (onlyNearby ? 1 : 0) +
    (onlyHighConcordance ? 1 : 0) +
    (onlyNewFellows ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('all');
    setOnlyNearby(false);
    setOnlyHighConcordance(false);
    setOnlyNewFellows(false);
    setSortBy('concordance');
  };

  const specialtiesList = [
    { id: 'all', label: 'All Specialties' },
    { id: 'Cornea & Sclerals', label: 'Cornea & Sclerals' },
    { id: 'Pediatric Myopia', label: 'Pediatric Myopia' },
    { id: 'Glaucoma & Neuro', label: 'Glaucoma & Neuro' },
    { id: 'Dry Eye & Aesthetics', label: 'Dry Eye & Aesthetics' },
    { id: 'Retina & Surgical', label: 'Retina & Surgical' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-28 md:pb-16">
      {/* Top Banner: Doctor Profiles & Global Referral Network */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-neutral-900 p-6 sm:p-7 text-white shadow-sm border border-neutral-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
                <ShieldCheck className="h-3 w-3 text-blue-400" />
                Verified Optometrist Network
              </span>
              <span className="text-xs text-neutral-400">
                {allDoctors.length} Optometrists On-Call
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
              Peer Directory
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
              Explore verified colleagues, co-management partners, and subspecialty leaders across the globe. Seamlessly connect, consult, or inspect full clinical CVs.
            </p>
          </div>

          {/* User's own profile preview card */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15 shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-11 w-11 rounded-full object-cover ring-2 ring-blue-400/40"
            />
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-white">{currentUser.name}</span>
                <ShieldCheck className="h-3 w-3 text-blue-400" />
              </div>
              <p className="text-[10px] text-neutral-300 truncate max-w-[140px]">
                {currentUser.credentials}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => onViewDoctorProfile(currentUser.id)}
                  className="text-[11px] font-bold text-blue-300 hover:text-white transition-colors"
                >
                  My Public Profile →
                </button>
                {onEditProfile && (
                  <button
                    onClick={onEditProfile}
                    className="text-[10px] font-medium text-neutral-400 hover:text-white underline transition-colors"
                  >
                    Edit CV
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spotlight Colleagues (Modern Showcase - Zero Tabs Needed) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-amber-500/10 text-amber-500 dark:text-amber-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
                Spotlight & Suggested Colleagues
              </h2>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Peer-matched by subspecialty synergy and high diagnostic concordance
              </p>
            </div>
          </div>
          <span className="text-xs font-medium text-neutral-400 hidden sm:inline">
            Scroll for more →
          </span>
        </div>

        {/* Horizontal Scrollable Cards */}
        <div className="flex items-stretch gap-4 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0">
          {spotlightDoctors.map((doc) => {
            const isConnected = connectedDoctorIds.has(doc.id);
            return (
              <div
                key={doc.id}
                className="w-[280px] sm:w-[310px] shrink-0 rounded-2xl bg-white dark:bg-[#18181c] border border-neutral-200 dark:border-neutral-800 p-4 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-blue-500/40 transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="relative">
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-700 group-hover:ring-blue-500 transition-all"
                      />
                      <span className="absolute bottom-0 right-0 p-0.5 rounded-full bg-blue-600 text-white">
                        <ShieldCheck className="h-2.5 w-2.5" />
                      </span>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50">
                        <Activity className="h-2.5 w-2.5" />
                        {doc.peerConcordance}% Concordance
                      </span>
                      {doc.distanceMiles !== undefined && (
                        <span className="text-[10px] text-neutral-400 mt-1 flex items-center gap-0.5">
                          <MapPin className="h-2.5 w-2.5" /> {doc.distanceMiles} mi away
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-neutral-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                    {doc.credentials}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-1">
                    {doc.clinicName}
                  </p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[10px] font-medium text-neutral-700 dark:text-neutral-300">
                    {doc.subspecialtyCategory}
                  </span>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center gap-2">
                  <button
                    onClick={() => onViewDoctorProfile(doc.id)}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white text-xs font-bold transition-all text-center"
                  >
                    View CV
                  </button>

                  <button
                    onClick={() => handleToggleConnect(doc.id)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                      isConnected
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40'
                        : 'bg-blue-600 hover:bg-blue-500 text-white'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <Check className="h-3 w-3" /> Connected
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-3 w-3" /> Connect
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Unified Colleagues Directory Toolbar (Single-Page, Frictionless UX - NO TABS) */}
      <div className="space-y-3 bg-white dark:bg-[#18181c] p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xs">
        {/* Search Bar & Quick Toggles */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {/* Search Omnibox */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by doctor name, credential, clinic, city, or tech (e.g. Scleral, AS-OCT)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Pill Switches (Fast toggles, no tab fragmentation!) */}
          <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
            {/* Near Me Toggle */}
            <button
              onClick={() => setOnlyNearby(!onlyNearby)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap min-h-[38px] ${
                onlyNearby
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>Near Me (≤50 mi)</span>
            </button>

            {/* High Concordance Toggle */}
            <button
              onClick={() => setOnlyHighConcordance(!onlyHighConcordance)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap min-h-[38px] ${
                onlyHighConcordance
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              <span>95%+ Concordance</span>
            </button>

            {/* New Fellows Toggle */}
            <button
              onClick={() => setOnlyNewFellows(!onlyNewFellows)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap min-h-[38px] ${
                onlyNewFellows
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>New Fellows</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-semibold py-2 pl-3 pr-8 rounded-xl border-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer min-h-[38px]"
              >
                <option value="concordance">Sort: Concordance</option>
                <option value="distance">Sort: Nearest</option>
                <option value="pearls">Sort: Most Pearls</option>
                <option value="name">Sort: Name (A-Z)</option>
              </select>
              <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-xl border border-neutral-200/50 dark:border-neutral-700/50">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
                title="Grid View"
              >
                <div className="grid grid-cols-2 gap-0.5 h-3.5 w-3.5">
                  <div className="bg-current rounded-xs" />
                  <div className="bg-current rounded-xs" />
                  <div className="bg-current rounded-xs" />
                  <div className="bg-current rounded-xs" />
                </div>
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'compact'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
                title="List View"
              >
                <div className="flex flex-col gap-0.5 h-3.5 w-3.5 justify-center">
                  <div className="h-0.5 bg-current rounded-xs" />
                  <div className="h-0.5 bg-current rounded-xs" />
                  <div className="h-0.5 bg-current rounded-xs" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Specialty Filter Chips (Inline row) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1 border-t border-neutral-100 dark:border-neutral-800/80">
          <span className="text-[11px] font-semibold text-neutral-400 shrink-0 mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Specialty:
          </span>
          {specialtiesList.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedSpecialty(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedSpecialty === item.id
                  ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                  : 'bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Active Filter Summary Bar */}
        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 pt-1">
          <span className="font-medium">
            Showing <strong className="text-neutral-900 dark:text-white font-bold">{filteredAndSortedDoctors.length}</strong> optometrists
            {activeFiltersCount > 0 && ` (${activeFiltersCount} filter applied)`}
          </span>

          {activeFiltersCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
            >
              <X className="h-3 w-3" /> Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Doctor Cards Directory (Grid or Compact List) */}
      {filteredAndSortedDoctors.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#18181c] border border-neutral-200 dark:border-neutral-800 space-y-3">
          <div className="h-12 w-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
            <Compass className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            No optometrists match your current criteria
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
            Try broadening your search term, clearing specialty filters, or expanding your referral proximity distance.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors shadow-xs"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAndSortedDoctors.map((doc) => {
            const isConnected = connectedDoctorIds.has(doc.id);
            return (
              <div
                key={doc.id}
                className="rounded-2xl bg-white dark:bg-[#18181c] border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xs hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Banner Header */}
                  <div className="h-20 bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-purple-600/15 p-3 relative flex items-start justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 dark:bg-black/80 backdrop-blur-xs text-neutral-700 dark:text-neutral-300 shadow-2xs">
                      {doc.subspecialtyCategory || 'Optometry Specialist'}
                    </span>

                    {doc.distanceMiles !== undefined && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                        <MapPin className="h-2.5 w-2.5" />
                        {doc.distanceMiles} mi away
                      </span>
                    )}
                  </div>

                  {/* Profile Info */}
                  <div className="px-4 pb-3 -mt-9 relative">
                    <div className="flex items-end justify-between mb-2">
                      <div className="relative">
                        <img
                          src={doc.avatar}
                          alt={doc.name}
                          className="h-16 w-16 rounded-full object-cover ring-4 ring-white dark:ring-[#18181c] shadow-sm"
                        />
                        <span className="absolute bottom-0 right-0 p-1 rounded-full bg-blue-600 text-white shadow-2xs">
                          <ShieldCheck className="h-3 w-3" />
                        </span>
                      </div>

                      {doc.peerConcordance !== undefined && (
                        <div className="text-right">
                          <span className="text-[10px] text-neutral-400 font-medium block">
                            Peer Concordance
                          </span>
                          <span className="text-xs font-black text-blue-600 dark:text-blue-400">
                            {doc.peerConcordance}% High
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {doc.credentials}
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 line-clamp-1">
                      {doc.clinicName} • {doc.location}
                    </p>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                      {doc.about}
                    </p>

                    {/* Diagnostic Technology Badges */}
                    {doc.diagnosticTechnologies && doc.diagnosticTechnologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {doc.diagnosticTechnologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech.name}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                          >
                            {tech.name}
                          </span>
                        ))}
                        {doc.diagnosticTechnologies.length > 3 && (
                          <span className="text-[10px] text-neutral-400 px-1 py-0.5">
                            +{doc.diagnosticTechnologies.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-3 bg-neutral-50 dark:bg-[#141418] border-t border-neutral-100 dark:border-neutral-800/80 flex items-center gap-2">
                  <button
                    onClick={() => onViewDoctorProfile(doc.id)}
                    className="flex-1 py-2 px-3 rounded-xl bg-white dark:bg-[#202026] hover:bg-neutral-100 dark:hover:bg-[#26262e] text-neutral-900 dark:text-white text-xs font-bold border border-neutral-200 dark:border-neutral-700/80 transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>View CV</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400" />
                  </button>

                  <button
                    onClick={() => handleToggleConnect(doc.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shrink-0 ${
                      isConnected
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <Check className="h-3 w-3" /> Connected
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-3 w-3" /> Connect
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setConsultModalDoctor(doc)}
                    className="p-2 rounded-xl text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-[#202026] border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 transition-all"
                    title="Send Quick Clinical Inquiry"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Compact List View */
        <div className="space-y-2.5">
          {filteredAndSortedDoctors.map((doc) => {
            const isConnected = connectedDoctorIds.has(doc.id);
            return (
              <div
                key={doc.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#18181c] border border-neutral-200 dark:border-neutral-800 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-700"
                    />
                    <span className="absolute bottom-0 right-0 p-0.5 rounded-full bg-blue-600 text-white">
                      <ShieldCheck className="h-2.5 w-2.5" />
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        onClick={() => onViewDoctorProfile(doc.id)}
                        className="font-bold text-sm text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                      >
                        {doc.name}
                      </h3>
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {doc.credentials}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                        {doc.subspecialtyCategory}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                      {doc.clinicName} • {doc.location}
                      {doc.distanceMiles !== undefined && ` (${doc.distanceMiles} mi)`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {doc.peerConcordance !== undefined && (
                    <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300 hidden md:inline mr-2">
                      {doc.peerConcordance}% Concordance
                    </span>
                  )}

                  <button
                    onClick={() => onViewDoctorProfile(doc.id)}
                    className="py-1.5 px-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white text-xs font-bold transition-all"
                  >
                    View CV
                  </button>

                  <button
                    onClick={() => handleToggleConnect(doc.id)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      isConnected
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40'
                        : 'bg-blue-600 hover:bg-blue-500 text-white'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <Check className="h-3 w-3" /> Connected
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-3 w-3" /> Connect
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setConsultModalDoctor(doc)}
                    className="p-2 rounded-xl text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                    title="Send Quick Consult"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Clinical Consult Inquiry Modal */}
      <AnimatePresence>
        {consultModalDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#1c1c22] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={consultModalDoctor.avatar}
                    alt={consultModalDoctor.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/30"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                      Consult with {consultModalDoctor.name}
                    </h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                      {consultModalDoctor.credentials} • {consultModalDoctor.subspecialtyCategory}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setConsultModalDoctor(null)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {consultSent ? (
                <div className="py-8 text-center space-y-2">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                    <Check className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Clinical Inquiry Dispatched
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {consultModalDoctor.name} has received your direct triage request.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendConsult} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Clinical Case Subject / Referral Reason
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={consultMessage}
                      onChange={(e) => setConsultMessage(e.target.value)}
                      placeholder="e.g. Scleral lens limbal clearance dilemma or urgent neuro consult query regarding pupil asymmetry..."
                      className="w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-500" />
                      HIPAA / Peer-to-Peer Encrypted
                    </span>
                    <span>Direct Optometric Channel</span>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setConsultModalDoctor(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Direct Consult</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
