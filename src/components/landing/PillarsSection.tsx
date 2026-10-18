import React from 'react';
import { Users2, Layers3, TrendingUp, Network, ArrowUpRight } from 'lucide-react';

interface PillarsSectionProps {
  onEnterApp: (destination?: 'feed' | 'gallery' | 'groups' | 'doctors') => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({ onEnterApp }) => {
  const pillars = [
    {
      id: 'connect',
      title: 'Connect',
      subtitle: 'Global Peer Exchange',
      description:
        'Engage directly with fellow optometrists across private practice, academic institutions, and hospital clinics globally.',
      icon: Users2,
      color: 'blue',
      badge: 'Peer Network',
      target: 'feed' as const,
      actionText: 'Join the Conversation',
    },
    {
      id: 'share',
      title: 'Share',
      subtitle: 'Real Clinical Cases & Imaging',
      description:
        'Post and inspect de-identified anterior and posterior scans, slit-lamp recordings, and surgical co-management outcomes.',
      icon: Layers3,
      color: 'indigo',
      badge: 'Clinical Imaging',
      target: 'gallery' as const,
      actionText: 'Browse Diagnostic Grid',
    },
    {
      id: 'grow',
      title: 'Grow',
      subtitle: 'Evidence-Based Practice',
      description:
        'Stay at the forefront of myopia control, dry eye therapies, neuro-optometry, and advanced contact lens innovations.',
      icon: TrendingUp,
      color: 'emerald',
      badge: 'Knowledge & Skills',
      target: 'groups' as const,
      actionText: 'Explore Subspecialties',
    },
    {
      id: 'network',
      title: 'Network',
      subtitle: 'Professional Recognition',
      description:
        'Establish your verified presence, find referral and co-management partners, and showcase your clinical achievements.',
      icon: Network,
      color: 'purple',
      badge: 'Optometrist Profiles',
      target: 'doctors' as const,
      actionText: 'Find Optometrists',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-neutral-100/60 dark:bg-[#0e0e12]/60 border-y border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800/60">
            Four Core Pillars
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mt-3">
            Everything Optometrists Need in One Dedicated Space
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-3">
            FocusLinks removes the noise of general platforms to give eye care professionals a focused, clinical-grade environment.
          </p>
        </div>

        {/* 4 Clean Visual Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                onClick={() => onEnterApp(pillar.target)}
                className="group relative rounded-3xl p-6 sm:p-7 bg-white dark:bg-[#16161c] border border-neutral-200/80 dark:border-neutral-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-mono">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-0.5 mb-3">
                    {pillar.subtitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span>{pillar.actionText}</span>
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
