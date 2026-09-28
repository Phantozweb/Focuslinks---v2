import React from 'react';
import {
  Compass,
  Layers,
  Users,
  UserCheck,
  User,
  Plus,
  Eye,
  LogOut,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  KeyRound,
  BookOpen,
  Bell,
  Stethoscope,
  Flame,
  Award,
  BarChart3,
  Settings,
  Shield,
  HelpCircle
} from 'lucide-react';
import { DoctorProfile } from '../../types';
import { DoctorAvatar } from '../common/DoctorAvatar';

export type ActiveTabType = 'feed' | 'consults' | 'qa' | 'gallery' | 'groups' | 'doctors' | 'analytics' | 'profile' | 'settings';

interface AppSidebarProps {
  currentTab: ActiveTabType;
  onSelectTab: (tab: ActiveTabType) => void;
  currentUser: DoctorProfile;
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onOpenCreatePost: () => void;
  onOpenLandingPage: () => void;
  onLogOut: () => void;
  unreadCount?: number;
  onOpenNotifications?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  isLoggedIn,
  onOpenLogin,
  onOpenCreatePost,
  onOpenLandingPage,
  onLogOut,
  unreadCount = 0,
  onOpenNotifications,
}) => {
  // Main Clinical Workspace Items
  const workspaceItems = [
    {
      id: 'feed' as const,
      label: 'Feed',
      subtext: 'Cases, polls & pearls',
      icon: Compass,
      badge: 'Live',
    },
    {
      id: 'consults' as const,
      label: 'Consults',
      subtext: 'Peer inquiries & topics',
      icon: Stethoscope,
      badge: 'Brain Trust',
    },
    {
      id: 'gallery' as const,
      label: 'Explore',
      subtext: 'Imaging & case vault',
      icon: Flame,
    },
    {
      id: 'groups' as const,
      label: 'Circles',
      subtext: 'Specialty peer rounds',
      icon: Users,
    },
    {
      id: 'doctors' as const,
      label: 'Directory',
      subtext: 'Verified peer network',
      icon: UserCheck,
    },
  ];

  // Professional Intelligence & Management Items
  const intelligenceItems = [
    {
      id: 'analytics' as const,
      label: 'Analytics',
      subtext: 'Case impact & CE credits',
      icon: BarChart3,
      badge: 'Hub',
    },
    {
      id: 'profile' as const,
      label: 'My Profile',
      subtext: 'Credentials & case CV',
      icon: User,
    },
    {
      id: 'settings' as const,
      label: 'Settings',
      subtext: 'Preferences & HIPAA rules',
      icon: Settings,
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 h-screen sticky top-0 border-r border-neutral-200/80 dark:border-neutral-800/80 bg-white/90 dark:bg-[#0c0c11]/90 backdrop-blur-xl shrink-0 z-30 transition-all select-none">
      
      {/* Top Brand Logo */}
      <div className="p-4 xl:p-5 border-b border-neutral-200/70 dark:border-neutral-800/70 flex items-center justify-between">
        <button
          onClick={() => onSelectTab('feed')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="relative flex items-center justify-center h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Eye className="h-5 w-5" />
            <div className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0c0c11]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                FocusLinks
              </span>
              <span className="px-1.5 py-0.2 rounded-md text-[10px] font-black bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/60 uppercase">
                OD
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 font-medium">
              Sovereign Clinical Network
            </p>
          </div>
        </button>

        {/* Notification Bell in Sidebar Header */}
        {onOpenNotifications && (
          <button
            onClick={onOpenNotifications}
            className="relative h-8 w-8 rounded-xl flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500" />
            )}
          </button>
        )}
      </div>

      {/* Primary Action Button: Create Post / Login Callout */}
      <div className="p-3.5 pb-1">
        {isLoggedIn ? (
          <button
            onClick={onOpenCreatePost}
            className="w-full py-2.5 px-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 active:scale-98 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>New Clinical Case / Pearl</span>
          </button>
        ) : (
          <button
            onClick={onOpenLogin}
            className="w-full py-2.5 px-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 active:scale-98 transition-all cursor-pointer"
          >
            <KeyRound className="h-4 w-4" />
            <span>Sign In to Post Cases</span>
          </button>
        )}
      </div>

      {/* Main Navigation Menu Links */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-5">
        
        {/* SECTION 1: CLINICAL WORKSPACE */}
        <div>
          <span className="block px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1">
            Clinical Workspace
          </span>
          <nav className="space-y-0.5">
            {workspaceItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full p-2 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold border border-blue-200/60 dark:border-blue-900/40 shadow-2xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`h-7.5 w-7.5 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold leading-tight truncate">{item.label}</p>
                      <p className="text-[10px] text-neutral-400 font-normal leading-tight truncate">
                        {item.subtext}
                      </p>
                    </div>
                  </div>

                  {item.badge && (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/40 shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* SECTION 2: INTELLIGENCE & PRACTICE */}
        <div>
          <span className="block px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1">
            Intelligence & Profile
          </span>
          <nav className="space-y-0.5">
            {intelligenceItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full p-2 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold border border-blue-200/60 dark:border-blue-900/40 shadow-2xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`h-7.5 w-7.5 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold leading-tight truncate">{item.label}</p>
                      <p className="text-[10px] text-neutral-400 font-normal leading-tight truncate">
                        {item.subtext}
                      </p>
                    </div>
                  </div>

                  {item.badge && (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/40 shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* SECTION 3: PUBLIC PORTAL */}
        <div>
          <span className="block px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1">
            Visitor Portal
          </span>
          <div className="space-y-0.5">
            <button
              onClick={onOpenLandingPage}
              className="w-full p-2 rounded-2xl flex items-center gap-2.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50 transition-colors text-left cursor-pointer group"
            >
              <div className="h-7.5 w-7.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 group-hover:text-blue-500 transition-colors shrink-0">
                <ArrowLeft className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold truncate">Public Landing Page</p>
                <p className="text-[10px] text-neutral-400 font-normal truncate">
                  Overview, FAQ & Mission
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Clinician Identity Card in Footer */}
      <div className="p-3 border-t border-neutral-200/70 dark:border-neutral-800/70">
        {isLoggedIn ? (
          <div className="p-2.5 rounded-2xl bg-neutral-50 dark:bg-[#14141e] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between gap-2">
            <button
              onClick={() => onSelectTab('profile')}
              className="flex items-center gap-2 min-w-0 text-left cursor-pointer group"
            >
              <div className="relative shrink-0">
                <DoctorAvatar
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-8.5 w-8.5 rounded-full border border-neutral-200 dark:border-neutral-700"
                />
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#14141e]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-neutral-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {currentUser.name}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                  <ShieldCheck className="h-3 w-3 shrink-0" />
                  <span className="truncate">{currentUser.membershipId || 'FL-29841-OD'}</span>
                </div>
              </div>
            </button>

            <button
              onClick={onLogOut}
              className="h-7.5 w-7.5 rounded-xl flex items-center justify-center text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
              title="Log Out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="p-2.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 dark:text-blue-300">
                Demo OD Session
              </span>
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <button
              onClick={onOpenLogin}
              className="w-full py-1.5 px-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <KeyRound className="h-3 w-3" />
              <span>Activate Demo Doctor</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
