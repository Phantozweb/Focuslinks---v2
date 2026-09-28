import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Users } from 'lucide-react';

interface CtaBannerProps {
  onEnterApp: (destination?: 'feed' | 'gallery' | 'groups' | 'doctors') => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onEnterApp }) => {
  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white p-8 sm:p-12 lg:p-16 shadow-2xl shadow-blue-900/30">
        {/* Subtle Background Art */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-blue-100 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="h-4 w-4 text-sky-300" />
            <span>Join Your Global Colleagues</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Ready to Connect with Optometrists Worldwide?
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
            Step into the dedicated digital home for optometry. Share complex cases, seek peer advice, and advance your clinical knowledge today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onEnterApp('feed')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-blue-800 hover:bg-neutral-100 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-black/20 transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <span>Get Started & Explore Feed</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => onEnterApp('doctors')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/15 hover:bg-white/20 border border-white/25 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <Users className="h-4 w-4" />
              <span>Browse Directory</span>
            </button>
          </div>

          <div className="pt-3 flex items-center justify-center gap-6 text-xs text-blue-200 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-sky-300" />
              <span>Instant Access</span>
            </div>
            <span>•</span>
            <div>Zero Subscription Fees</div>
            <span>•</span>
            <div>100% Clinical Focus</div>
          </div>
        </div>
      </div>
    </section>
  );
};
