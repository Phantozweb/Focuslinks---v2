import React from 'react';
import { Eye, Heart } from 'lucide-react';

interface LandingFooterProps {
  onEnterApp: (destination?: 'feed' | 'gallery' | 'groups' | 'doctors') => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onEnterApp }) => {
  return (
    <footer className="w-full border-t border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#0c0c0f] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-100 dark:border-neutral-800/80">
          {/* Logo & Vision */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xs">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-neutral-900 dark:text-white">
                FocusLinks
              </span>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                The Global Platform for Optometrists
              </p>
            </div>
          </div>

          {/* Nav quick links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400">
            <button
              onClick={() => onEnterApp('feed')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Clinical Feed
            </button>
            <button
              onClick={() => onEnterApp('gallery')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Diagnostic Grid
            </button>
            <button
              onClick={() => onEnterApp('groups')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Specialty Circles
            </button>
            <button
              onClick={() => onEnterApp('doctors')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Optometrist Directory
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 dark:text-neutral-500">
          <p>© {new Date().getFullYear()} FocusLinks. Built exclusively for the global optometry community.</p>
          <div className="flex items-center gap-1">
            <span>Crafted for patient care & clinical excellence</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
