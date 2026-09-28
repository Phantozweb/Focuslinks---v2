import React, { useState } from 'react';
import { 
  Eye, 
  Sun, 
  Moon, 
  ArrowRight, 
  Menu, 
  X, 
  BookOpen, 
  HelpCircle, 
  KeyRound, 
  Sparkles, 
  Home as HomeIcon,
  Award,
  Bell,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { DoctorProfile } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface LandingNavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onEnterApp: (destination?: 'feed' | 'consults' | 'qa' | 'gallery' | 'groups' | 'doctors') => void;
  onGetFreeId?: () => void;
  onOpenLogin?: () => void;
  currentUser: DoctorProfile;
  isLoggedIn?: boolean;
  activeSubView?: 'home' | 'about' | 'membership';
  onChangeSubView?: (view: 'home' | 'about' | 'membership', tab?: 'beginner' | 'advanced' | 'tips' | 'playbooks' | 'faqs') => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  onEnterApp,
  onGetFreeId,
  onOpenLogin,
  currentUser,
  isLoggedIn = false,
  activeSubView = 'home',
  onChangeSubView,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smooth scroll handler for FAQ
  const handleScrollToFaq = () => {
    if (activeSubView !== 'home' && onChangeSubView) {
      onChangeSubView('home');
    }
    setTimeout(() => {
      const el = document.getElementById('faq-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleScrollToAnnouncements = () => {
    if (activeSubView !== 'home' && onChangeSubView) {
      onChangeSubView('home');
    }
    setTimeout(() => {
      const el = document.getElementById('announcements');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/70 dark:border-neutral-800/70 bg-white/85 dark:bg-[#0b0b10]/85 backdrop-blur-xl transition-colors">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-16 flex items-center justify-between gap-4">
        
        {/* BRAND LOGO — Minimal & Sophisticated */}
        <div 
          onClick={() => {
            if (onChangeSubView) onChangeSubView('home');
          }}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="relative flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white shadow-sm shadow-blue-500/25 group-hover:scale-105 transition-all">
            <Eye className="h-5 w-5" />
            <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0b0b10]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-black tracking-tight text-neutral-900 dark:text-white">
              FocusLinks
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/50 tracking-wider">
              OD
            </span>
          </div>
        </div>

        {/* CENTER NAVIGATION DOCK — Desktop (lg+) Only to prevent clutter on Tablet */}
        <nav className="hidden lg:flex items-center p-1 bg-neutral-100/80 dark:bg-[#14141e]/90 rounded-full border border-neutral-200/70 dark:border-neutral-800/70 shadow-2xs">
          <button
            onClick={() => onChangeSubView?.('home')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeSubView === 'home'
                ? 'bg-white dark:bg-[#20202e] text-neutral-900 dark:text-white shadow-xs font-bold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => onChangeSubView?.('about')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeSubView === 'about'
                ? 'bg-white dark:bg-[#20202e] text-neutral-900 dark:text-white shadow-xs font-bold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            Clinical Guide
          </button>

          <button
            onClick={() => onChangeSubView?.('membership')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeSubView === 'membership'
                ? 'bg-white dark:bg-[#20202e] text-neutral-900 dark:text-white shadow-xs font-bold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            Membership
          </button>

          <button
            onClick={handleScrollToAnnouncements}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all cursor-pointer"
          >
            Updates
          </button>

          <button
            onClick={handleScrollToFaq}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-all cursor-pointer"
          >
            FAQs
          </button>
        </nav>

        {/* RIGHT ACTIONS — Clean & Uncluttered for Desktop, Tablet & Mobile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Dark Mode Icon Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="h-9 w-9 rounded-xl flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-neutral-600" />}
          </button>

          {/* Logged In Status Pill */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 rounded-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono font-bold text-emerald-800 dark:text-emerald-300">
                {currentUser.membershipId || 'FL-29841-OD'}
              </span>
            </div>
          ) : (
            /* Log In Ghost Button — Opens Login Modal */
            <button
              onClick={onOpenLogin}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 rounded-xl transition-all cursor-pointer"
              id="nav-btn-signin"
              title="Sign in with your Google account or FocusLinks Membership ID"
            >
              <KeyRound className="h-3.5 w-3.5 text-blue-500" />
              <span>Log In</span>
            </button>
          )}

          {/* Primary CTA Button — Enters Platform Workspace directly */}
          <button
            onClick={() => onEnterApp('feed')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-97 text-white text-xs font-bold shadow-sm shadow-blue-500/25 transition-all cursor-pointer"
            title={isLoggedIn ? 'Go to your clinical workspace' : 'Explore clinical cases, OCT scans, and pearls immediately'}
          >
            <span>{isLoggedIn ? 'Open Workspace' : 'Explore Platform'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden h-9 w-9 rounded-xl flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE & TABLET DRAWER OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-neutral-200/80 dark:border-neutral-800/80 bg-white/95 dark:bg-[#0c0c11]/95 backdrop-blur-2xl px-4 py-5 shadow-2xl"
          >
            <div className="max-w-md mx-auto space-y-4">
              
              {/* Navigation Items with clean cards */}
              <div className="space-y-1.5">
                <button
                  onClick={() => {
                    onChangeSubView?.('home');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all text-left cursor-pointer ${
                    activeSubView === 'home'
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold border border-blue-200/60 dark:border-blue-900/40'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400">
                      <HomeIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Home</p>
                      <p className="text-[11px] text-neutral-400">Cases, peer feed & stories</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-40" />
                </button>

                <button
                  onClick={() => {
                    onChangeSubView?.('about');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all text-left cursor-pointer ${
                    activeSubView === 'about'
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold border border-blue-200/60 dark:border-blue-900/40'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-blue-500">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Clinical Guide</p>
                      <p className="text-[11px] text-neutral-400">Workflows, scleral & anterior protocols</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-40" />
                </button>

                <button
                  onClick={() => {
                    onChangeSubView?.('membership');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all text-left cursor-pointer ${
                    activeSubView === 'membership'
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold border border-blue-200/60 dark:border-blue-900/40'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-amber-500">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Membership Benefits</p>
                      <p className="text-[11px] text-neutral-400">Free perks & growth milestones</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-40" />
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleScrollToAnnouncements();
                  }}
                  className="w-full p-3 rounded-2xl flex items-center justify-between transition-all text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-purple-500">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Announcements</p>
                      <p className="text-[11px] text-neutral-400">Latest platform releases</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-40" />
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleScrollToFaq();
                  }}
                  className="w-full p-3 rounded-2xl flex items-center justify-between transition-all text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-teal-500">
                      <HelpCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">FAQs</p>
                      <p className="text-[11px] text-neutral-400">Licensing, HIPAA & verification</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-40" />
                </button>
              </div>

              {/* Action Buttons Container */}
              <div className="pt-3 border-t border-neutral-150 dark:border-neutral-800 space-y-2.5">
                {/* Primary Enter App Button */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onEnterApp('feed');
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  <span>{isLoggedIn ? 'Open Clinical Workspace' : 'Explore Clinical Cases (Guest)'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Secondary Row: Log in & Free ID */}
                {!isLoggedIn && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenLogin?.();
                      }}
                      className="py-2.5 px-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-neutral-200/60 dark:border-neutral-700"
                    >
                      <KeyRound className="h-3.5 w-3.5 text-blue-500" />
                      <span>Log In (Gmail/ID)</span>
                    </button>

                    <button
                      onClick={() => {
                        onChangeSubView?.('membership');
                        setIsMobileMenuOpen(false);
                      }}
                      className="py-2.5 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-blue-200/60 dark:border-blue-800/60"
                    >
                      <Award className="h-3.5 w-3.5" />
                      <span>Free ID</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
