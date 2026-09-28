import React from 'react';
import {
  Compass,
  Flame,
  Users,
  ShieldCheck,
  Plus,
  Stethoscope
} from 'lucide-react';
import { DoctorProfile } from '../types';

export type ActiveTabType = 'feed' | 'consults' | 'qa' | 'gallery' | 'groups' | 'doctors' | 'analytics' | 'profile' | 'settings';

interface MobileBottomNavProps {
  currentTab: ActiveTabType;
  onSelectTab: (tab: ActiveTabType) => void;
  currentUser: DoctorProfile;
  onOpenCreatePost: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  onOpenCreatePost,
}) => {
  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#121215]/95 backdrop-blur-xl border-t border-neutral-200/90 dark:border-neutral-800/90 px-2 py-1.5 shadow-lg safe-area-pb"
    >
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {/* Feed Tab */}
        <button
          onClick={() => onSelectTab('feed')}
          className={`flex flex-col items-center justify-center min-w-[46px] min-h-[44px] py-1 transition-all ${
            currentTab === 'feed'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
          }`}
        >
          <div className="relative">
            <Compass className="h-5 w-5" />
            {currentTab === 'feed' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Feed</span>
        </button>

        {/* Consults Tab (Peer Case Inquiries & Topics) */}
        <button
          onClick={() => onSelectTab('consults')}
          className={`flex flex-col items-center justify-center min-w-[46px] min-h-[44px] py-1 transition-all ${
            currentTab === 'consults' || currentTab === 'qa'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
          }`}
        >
          <div className="relative">
            <Stethoscope className="h-5 w-5" />
            {(currentTab === 'consults' || currentTab === 'qa') && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Consults</span>
        </button>

        {/* Center Floating Action Button (FAB) - Quick Post / Pearl / Article */}
        <div className="relative -top-3 flex items-center justify-center">
          <button
            onClick={onOpenCreatePost}
            aria-label="Create Post: Clinical Pearl or Article"
            title="Create Post (Pearl or Article)"
            className="flex items-center justify-center h-11 w-11 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-rose-500 text-white shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            <Plus className="h-5 w-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Circles Tab */}
        <button
          onClick={() => onSelectTab('groups')}
          className={`flex flex-col items-center justify-center min-w-[46px] min-h-[44px] py-1 transition-all ${
            currentTab === 'groups'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
          }`}
        >
          <div className="relative">
            <Users className="h-5 w-5" />
            {currentTab === 'groups' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Circles</span>
        </button>

        {/* Directory Tab */}
        <button
          onClick={() => onSelectTab('doctors')}
          className={`flex flex-col items-center justify-center min-w-[46px] min-h-[44px] py-1 transition-all ${
            currentTab === 'doctors' || currentTab === 'profile'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
          }`}
        >
          <div className="relative">
            <ShieldCheck className="h-5 w-5" />
            {(currentTab === 'doctors' || currentTab === 'profile') && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Directory</span>
        </button>
      </div>
    </nav>
  );
};

