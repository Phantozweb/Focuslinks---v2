import React from 'react';
import {
  X,
  Compass,
  Flame,
  Users,
  UserCheck,
  BarChart3,
  User,
  Settings,
  ArrowLeft,
  Plus,
  ShieldCheck,
  LogOut,
  Eye,
  KeyRound,
  Sun,
  Moon,
  HelpCircle,
  Stethoscope
} from 'lucide-react';
import { DoctorProfile } from '../../types';
import { ActiveTabType } from './AppSidebar';
import { DoctorAvatar } from '../common/DoctorAvatar';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: ActiveTabType;
  onSelectTab: (tab: ActiveTabType) => void;
  currentUser: DoctorProfile;
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onOpenCreatePost: () => void;
  onOpenLandingPage: () => void;
  onLogOut: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  onSelectTab,
  currentUser,
  isLoggedIn,
  onOpenLogin,
  onOpenCreatePost,
  onOpenLandingPage,
  onLogOut,
  darkMode,
  onToggleDarkMode,
}) => {
  if (!isOpen) return null;

  const handleSelect = (tab: ActiveTabType) => {
    onSelectTab(tab);
    onClose();
  };

  const workspaceItems = [
    { id: 'feed' as const, label: 'Feed', subtext: 'Cases, polls & pearls', icon: Compass },
    { id: 'consults' as const, label: 'Consults', subtext: 'Peer inquiries & consensus', icon: Stethoscope },
    { id: 'gallery' as const, label: 'Explore', subtext: 'Imaging & case vault', icon: Flame },
    { id: 'groups' as const, label: 'Circles', subtext: 'Specialty peer rounds', icon: Users },
    { id: 'doctors' as const, label: 'Directory', subtext: 'Verified peer network', icon: UserCheck },
  ];

  const intelligenceItems = [
    { id: 'analytics' as const, label: 'Analytics', subtext: 'Case impact & CE hours', icon: BarChart3, badge: 'Hub' },
    { id: 'profile' as const, label: 'My Profile', subtext: 'Credentials & case CV', icon: User },
    { id: 'settings' as const, label: 'Settings', subtext: 'HIPAA rules & preferences', icon: Settings },
  ];

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-out Panel */}
      <div className="relative w-4/5 max-w-xs h-full bg-white dark:bg-[#0c0c11] border-r border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250">
        
        {/* Header */}
        <div className="p-4 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white shadow-xs">
              <Eye className="h-4 w-4" />
              <div className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-emerald-500 rounded-full border border-white dark:border-[#0c0c11]" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-black text-neutral-900 dark:text-white">FocusLinks</span>
                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">OD</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Action Button */}
        <div className="p-3">
          {isLoggedIn ? (
            <button
              onClick={() => {
                onOpenCreatePost();
                onClose();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>New Clinical Case</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onOpenLogin();
                onClose();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <KeyRound className="h-4 w-4" />
              <span>Log In (Gmail / ID)</span>
            </button>
          )}
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
          <div>
            <span className="block px-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
              Workspace
            </span>
            <nav className="space-y-0.5">
              {workspaceItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full p-2 rounded-xl flex items-center gap-2.5 text-left transition-all ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-900/40'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="text-xs font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div>
            <span className="block px-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
              Intelligence & Practice
            </span>
            <nav className="space-y-0.5">
              {intelligenceItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full p-2 rounded-xl flex items-center justify-between text-left transition-all ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-900/40'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-semibold">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div>
            <span className="block px-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
              Portals
            </span>
            <button
              onClick={() => {
                onOpenLandingPage();
                onClose();
              }}
              className="w-full p-2 rounded-xl flex items-center gap-2.5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-left transition-colors"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" />
              <span className="text-xs font-semibold">Public Landing Page</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
          {/* Theme switch */}
          <button
            onClick={onToggleDarkMode}
            className="w-full p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/70 text-neutral-700 dark:text-neutral-300 text-xs font-semibold flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              {darkMode ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5 text-neutral-500" />}
              <span>{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">Toggle</span>
          </button>

          {/* User Status / Logout */}
          {isLoggedIn ? (
            <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 dark:bg-[#16161e] border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2 min-w-0">
                <DoctorAvatar
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-7 w-7 rounded-full shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono truncate">{currentUser.membershipId || 'FL-29841-OD'}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  onLogOut();
                  onClose();
                }}
                className="h-7 w-7 rounded-lg flex items-center justify-center text-neutral-400 hover:text-rose-500"
                title="Log Out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onOpenLogin();
                onClose();
              }}
              className="w-full py-2 px-3 rounded-xl bg-blue-600 text-white text-xs font-bold text-center"
            >
              Sign In with ID
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
