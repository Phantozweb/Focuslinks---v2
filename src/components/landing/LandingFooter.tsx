import React from 'react';
import {
  Eye,
  Heart,
  FileText,
  ShieldCheck,
  ScrollText,
  Cookie,
  Stethoscope,
  GraduationCap,
  Award,
  BookOpen,
  Bell,
  ArrowUpRight
} from 'lucide-react';
import type { LandingSubView } from './subViews';

interface LandingFooterProps {
  onEnterApp: (destination?: 'feed' | 'gallery' | 'groups' | 'doctors') => void;
  onChangeSubView?: (view: LandingSubView) => void;
}

interface FooterLink {
  label: string;
  onClick: () => void;
  icon?: React.FC<{ className?: string }>;
  external?: boolean;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3.5">
    {children}
  </h4>
);

const FooterLinkButton: React.FC<{ link: FooterLink }> = ({ link }) => {
  const Icon = link.icon;
  return (
    <button
      onClick={link.onClick}
      className="group flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-neutral-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer text-left"
    >
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />}
      <span>{link.label}</span>
      {link.external && (
        <ArrowUpRight className="h-3 w-3 opacity-0 -ml-1 group-hover:opacity-60 transition-opacity" />
      )}
    </button>
  );
};

export const LandingFooter: React.FC<LandingFooterProps> = ({ onEnterApp, onChangeSubView }) => {
  const navigate = (view: LandingSubView) => () => onChangeSubView?.(view);

  const scrollToUpdates = () => {
    if (onChangeSubView) onChangeSubView('home');
    setTimeout(() => {
      const el = document.getElementById('announcements');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const exploreLinks: FooterLink[] = [
    { label: 'Clinical Feed', onClick: () => onEnterApp('feed') },
    { label: 'Diagnostic Grid', onClick: () => onEnterApp('gallery') },
    { label: 'Specialty Circles', onClick: () => onEnterApp('groups') },
    { label: 'Optometrist Directory', onClick: () => onEnterApp('doctors') },
  ];

  const resourceLinks: FooterLink[] = [
    { label: 'Clinical Guide', onClick: navigate('about'), icon: BookOpen },
    { label: 'How To & FAQ', onClick: navigate('howto'), icon: GraduationCap },
    { label: 'Membership Benefits', onClick: navigate('membership'), icon: Award },
    { label: 'Announcements & Updates', onClick: scrollToUpdates, icon: Bell },
  ];

  const legalLinks: FooterLink[] = [
    { label: 'Terms of Service', onClick: navigate('terms'), icon: FileText },
    { label: 'Privacy Policy', onClick: navigate('privacy'), icon: ShieldCheck },
    { label: 'Community Rules', onClick: navigate('rules'), icon: ScrollText },
    { label: 'Cookie Policy', onClick: navigate('cookies'), icon: Cookie },
    { label: 'Medical Disclaimer', onClick: navigate('disclaimer'), icon: Stethoscope },
  ];

  return (
    <footer className="w-full border-t border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#0c0c0f] pt-12 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Top: brand + link columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-neutral-100 dark:border-neutral-800/80">
          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
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
            <p className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed max-w-xs">
              A verified, peer-only clinical sanctuary — de-identified cases, specialty consult hubs, Circles and grand rounds for the worldwide optometry community.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                Verified community · Zero ads · Zero trackers
              </span>
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-2 space-y-3">
            <SectionTitle>Explore</SectionTitle>
            <div className="space-y-2.5">
              {exploreLinks.map((link) => (
                <FooterLinkButton key={link.label} link={link} />
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="md:col-span-3 space-y-3">
            <SectionTitle>Resources</SectionTitle>
            <div className="space-y-2.5">
              {resourceLinks.map((link) => (
                <FooterLinkButton key={link.label} link={link} />
              ))}
            </div>
          </div>

          {/* Legal — pages live here, never in the menu */}
          <div className="md:col-span-3 space-y-3">
            <SectionTitle>Legal & Policies</SectionTitle>
            <div className="space-y-2.5">
              {legalLinks.map((link) => (
                <FooterLinkButton key={link.label} link={link} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 dark:text-neutral-500">
          <p>© {new Date().getFullYear()} FocusLinks. Built exclusively for the global optometry community.</p>

          {/* Compact legal row for quick reach on mobile */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            {legalLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.onClick}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <span>Crafted for patient care & clinical excellence</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
