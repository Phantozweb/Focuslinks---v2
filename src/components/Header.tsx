import React from 'react';
import {
  Search,
  Plus,
  Bell,
  Sun,
  Moon,
  ShieldCheck,
  Eye,
  MessageSquare,
  Compass,
  Flame,
  Users,
  UserCheck,
  Layers,
  Sparkles,
  LogOut,
  KeyRound
} from 'lucide-react';
import { DoctorProfile } from '../types';
import { DoctorAvatar } from './common/DoctorAvatar';

export type ActiveTabType = 'feed' | 'consults' | 'qa' | 'gallery' | 'groups' | 'doctors' | 'analytics' | 'profile' | 'settings';

interface HeaderProps {
  currentTab: ActiveTabType;
  onSelectTab: (tab: ActiveTabType) => void;
  currentUser: DoctorProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenCreatePost: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenLandingPage?: () => void;
  onLogOut?: () => void;
  isLoggedIn?: boolean;
  onOpenLogin?: () => void;
  onOpenMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  darkMode,
  onToggleDarkMode,
  onOpenCreatePost,
  onOpenNotifications,
  unreadCount,
  searchQuery,
  onSearchChange,
  onOpenLandingPage,
  onLogOut,
  isLoggedIn = true,
  onOpenLogin,
  onOpenMobileMenu,
}) => {
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false);

  // Tab Titles for Breadcrumb
  const tabTitles: Record<string, { title: string; subtitle: string }> = {
    feed: { title: 'Feed', subtitle: 'Peer pearls, anterior imaging & discussion' },
    consults: { title: 'Consults', subtitle: 'Peer case inquiries, second opinions & clinical consensus' },
    qa: { title: 'Consults', subtitle: 'Peer case inquiries, second opinions & clinical consensus' },
    gallery: { title: 'Explore', subtitle: 'High-resolution imaging & case repository' },
    groups: { title: 'Circles', subtitle: 'Specialty peer rounds & clinical groups' },
    doctors: { title: 'Directory', subtitle: 'Verified optometrist colleagues worldwide' },
    analytics: { title: 'Analytics', subtitle: 'Peer impressions, case citations & COPE credits' },
    profile: { title: 'My Profile', subtitle: 'Clinical CV, credentials & case publications' },
    settings: { title: 'Settings', subtitle: 'Practice preferences, HIPAA rules & notifications' },
  };

  const currentInfo = tabTitles[currentTab] || tabTitles.feed;

  return (
    <header className="sticky top-0 z-20 w-full border-b border-neutral-200/80 dark:border-neutral-800/90 bg-white/85 dark:bg-[#0c0c11]/85 backdrop-blur-xl transition-colors">
      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 h-16 flex items-center justify-between gap-3">
        
        {/* Left Section: Mobile Brand (< lg) OR Desktop Breadcrumb / Search (lg+) */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-6 min-w-0">
          {/* Mobile Hamburger & Brand Logo (< lg only: Mobile and Tablet) */}
          <div className="lg:hidden flex items-center gap-1.5 shrink-0">
            {onOpenMobileMenu && (
              <button
                onClick={onOpenMobileMenu}
                className="h-10 w-10 lg:h-9 lg:w-9 rounded-xl flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Open Navigation Menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <button
              onClick={() => onSelectTab('feed')}
              className="flex items-center gap-2 group text-left min-h-[44px]"
            >
              <div className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Eye className="h-4.5 w-4.5" />
                <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0c0c11]" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-tight text-neutral-900 dark:text-neutral-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  FocusLinks
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/50">
                  OD
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Breadcrumbs (lg+ only) */}
          <div className="hidden lg:block min-w-0">
            <h1 className="text-sm font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight truncate">
              {currentInfo.title}
            </h1>
            <p className="text-[11px] text-neutral-400 font-medium leading-tight truncate">
              {currentInfo.subtitle}
            </p>
          </div>

          {/* Omnisearch Bar */}
          <div className="relative hidden md:block w-48 lg:w-64 xl:w-80 2xl:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search cases, OCTs, #Cornea, ODs..."
              className="w-full rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-100/70 dark:bg-[#15151c] pl-9 pr-4 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 focus:border-blue-500 focus:bg-white dark:focus:bg-[#1a1a24] focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden flex items-center justify-center h-10 w-10 lg:h-9 lg:w-9 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Search Cases"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Guest Observer Badge or Log In Button */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span>Observer Mode</span>
              </span>
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-97 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                title="Sign in with your Google account or FocusLinks Membership ID"
              >
                <KeyRound className="h-3.5 w-3.5" />
                <span>Log In</span>
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-xl text-[11px] font-mono font-bold select-none" title="Your free clinical membership ID is active">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{currentUser.membershipId || 'FL-29841-OD'}</span>
            </div>
          )}

          {/* Create Post Button (< lg screens only since desktop has it in the sidebar) */}
          <button
            onClick={onOpenCreatePost}
            className="lg:hidden flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-bold shadow-sm transition-transform active:scale-95 cursor-pointer"
            title="Create Post (Clinical Case or Article)"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Post</span>
          </button>

          {/* Notifications Drawer Trigger */}
          <button
            onClick={onOpenNotifications}
            className="relative flex items-center justify-center h-10 w-10 lg:h-9 lg:w-9 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Clinical Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="flex items-center justify-center h-10 w-10 lg:h-9 lg:w-9 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-neutral-600" />}
          </button>

          {/* User Avatar (< lg screens only since desktop has it in the sidebar footer) */}
          <button
            onClick={() => onSelectTab('profile')}
            className={`lg:hidden relative rounded-full ring-2 transition-all p-0.5 flex items-center ${
              currentTab === 'profile'
                ? 'ring-blue-600 ring-offset-2 dark:ring-offset-[#0c0c11]'
                : 'ring-neutral-200 dark:ring-neutral-700 hover:ring-blue-400'
            }`}
            title="Go to Doctor Profile"
          >
            <DoctorAvatar
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-7 w-7 rounded-full"
            />
          </button>
        </div>
      </div>

      {/* Mobile Search Expandable Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/80 dark:bg-[#141416]/80 animate-in slide-in-from-top duration-150">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search cases, OCTs, #Cornea, ODs..."
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#202024] pl-9 pr-4 py-2 text-xs text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </header>
  );
};
