import React, { useState } from 'react';
import { DoctorProfile } from '../../types';
import { LandingNavbar } from './LandingNavbar';
import { HeroSection } from './HeroSection';
import { AboutPage } from './AboutPage';
import { MembershipPage } from '../membership/MembershipPage';
import { PillarsSection } from './PillarsSection';
import { PlatformFeatures } from './PlatformFeatures';
import { VideoDemoSection } from './videodemo/VideoDemoSection';
import { AnnouncementsSection } from './AnnouncementsSection';
import { CommunityPreview } from './CommunityPreview';
import { FaqSection } from './FaqSection';
import { CtaBanner } from './CtaBanner';
import { LandingFooter } from './LandingFooter';

interface LandingPageProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onEnterApp: (destination?: 'feed' | 'consults' | 'qa' | 'gallery' | 'groups' | 'doctors') => void;
  onGetFreeId: () => void;
  onOpenLogin?: () => void;
  currentUser: DoctorProfile;
  isLoggedIn: boolean;
  onSuccessLogin?: (membershipId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  darkMode,
  onToggleDarkMode,
  onEnterApp,
  onGetFreeId,
  onOpenLogin,
  currentUser,
  isLoggedIn,
  onSuccessLogin,
}) => {
  const [activeSubView, setActiveSubView] = useState<'home' | 'about' | 'membership'>('home');
  const [aboutTab, setAboutTab] = useState<'beginner' | 'advanced' | 'tips' | 'playbooks' | 'faqs'>('beginner');

  const handleSubViewChange = (view: 'home' | 'about' | 'membership', tab?: 'beginner' | 'advanced' | 'tips' | 'playbooks' | 'faqs') => {
    setActiveSubView(view);
    if (tab) {
      setAboutTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0c0c10] text-neutral-900 dark:text-neutral-100 transition-colors selection:bg-blue-600 selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. Sleek Sticky Navbar */}
      <LandingNavbar
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
        onEnterApp={onEnterApp}
        onGetFreeId={onGetFreeId}
        onOpenLogin={onOpenLogin}
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        activeSubView={activeSubView}
        onChangeSubView={handleSubViewChange}
      />

      <main>
        {activeSubView === 'about' ? (
          <AboutPage 
            onBackToHome={() => setActiveSubView('home')} 
            onEnterApp={onEnterApp} 
            initialTab={aboutTab}
          />
        ) : activeSubView === 'membership' ? (
          <MembershipPage
            onBackToHome={() => setActiveSubView('home')}
            onEnterApp={onEnterApp}
            onGetFreeId={onGetFreeId}
            isLoggedIn={isLoggedIn}
            currentUserMembershipId={currentUser.membershipId}
            onSuccessLogin={onSuccessLogin}
          />
        ) : (
          <>
            {/* 2. Hero Section with Standout Badge & Slow Shines */}
            <HeroSection onEnterApp={onEnterApp} />

            {/* 2.5 Dynamic Interactive Video-like UI Simulator Demo */}
            <VideoDemoSection />

            {/* 3. Four Core Pillars: Connect, Share, Grow, Network */}
            <PillarsSection onEnterApp={onEnterApp} />

            {/* 4. Interactive Core Platform Features */}
            <PlatformFeatures onEnterApp={onEnterApp} />

            {/* 4.5 Announcements & Updates Section */}
            <AnnouncementsSection />

            {/* 5. Authentic Community Perspectives */}
            <CommunityPreview />

            {/* 6. Clear, Accessible FAQs */}
            <FaqSection />

            {/* 7. High-Converting Call to Action Banner */}
            <CtaBanner onEnterApp={onEnterApp} />
          </>
        )}
      </main>

      {/* 8. Modern Minimalist Footer */}
      <LandingFooter onEnterApp={onEnterApp} />
    </div>
  );
};
