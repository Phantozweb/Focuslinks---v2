import React, { useState } from 'react';
import { DoctorProfile } from '../../types';
import { LandingNavbar } from './LandingNavbar';
import { HeroSection } from './HeroSection';
import { AboutPage } from './AboutPage';
import { MembershipPage } from '../membership/MembershipPage';
import { PillarsSection } from './PillarsSection';
import { WhoCanJoinSection } from './WhoCanJoinSection';
import { FeatureShowcase } from './features/FeatureShowcase';
import { AnnouncementsSection } from './AnnouncementsSection';
import { CommunityPreview } from './CommunityPreview';
import { HowToSection } from './HowToSection';
import { HowToPage } from './pages/HowToPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { RulesPage } from './pages/RulesPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { CtaBanner } from './CtaBanner';
import { LandingFooter } from './LandingFooter';
import type { LandingSubView } from './subViews';
import { isLegalView } from './subViews';

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
  const [activeSubView, setActiveSubView] = useState<LandingSubView>('home');
  const [aboutTab, setAboutTab] = useState<'beginner' | 'advanced' | 'tips' | 'playbooks' | 'faqs'>('beginner');

  const handleSubViewChange = (view: LandingSubView, tab?: 'beginner' | 'advanced' | 'tips' | 'playbooks' | 'faqs') => {
    setActiveSubView(view);
    if (tab) {
      setAboutTab(tab);
    }
  };

  // Every sub-view (How-To, legal docs) starts from the top, like a fresh page.
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activeSubView]);

  const enterWorkspace = () => onEnterApp('feed');

  const renderPage = () => {
    if (activeSubView === 'about') {
      return (
        <AboutPage
          onBackToHome={() => setActiveSubView('home')}
          onEnterApp={onEnterApp}
          initialTab={aboutTab}
        />
      );
    }
    if (activeSubView === 'membership') {
      return (
        <MembershipPage
          onBackToHome={() => setActiveSubView('home')}
          onEnterApp={onEnterApp}
          onGetFreeId={onGetFreeId}
          isLoggedIn={isLoggedIn}
          currentUserMembershipId={currentUser.membershipId}
          onSuccessLogin={onSuccessLogin}
        />
      );
    }
    if (activeSubView === 'howto') {
      return (
        <HowToPage
          onBackToHome={() => setActiveSubView('home')}
          onEnterApp={enterWorkspace}
          onNavigate={handleSubViewChange}
        />
      );
    }
    if (isLegalView(activeSubView)) {
      const pageProps = {
        onBackToHome: () => setActiveSubView('home'),
        onEnterApp: enterWorkspace,
        onNavigate: handleSubViewChange
      };
      switch (activeSubView) {
        case 'terms':
          return <TermsPage {...pageProps} />;
        case 'privacy':
          return <PrivacyPage {...pageProps} />;
        case 'rules':
          return <RulesPage {...pageProps} />;
        case 'cookies':
          return <CookiePolicyPage {...pageProps} />;
        case 'disclaimer':
          return <DisclaimerPage {...pageProps} />;
      }
    }
    // Home
    return (
      <>
        {/* 2. Hero Section with Standout Badge & Slow Shines */}
        <HeroSection onEnterApp={onEnterApp} />

        {/* 2.5 Who Can Join Us? — brag-style membership film */}
        <WhoCanJoinSection onJoin={onGetFreeId} />

        {/* 3. Four Core Pillars: Connect, Share, Grow, Network */}
        <PillarsSection onEnterApp={onEnterApp} />

        {/* 4. Interactive Core Platform Features — animated walkthroughs */}
        <FeatureShowcase onEnterApp={onEnterApp} />

        {/* 4.5 Announcements & Updates Section */}
        <AnnouncementsSection />

        {/* 5. Authentic Community Perspectives */}
        <CommunityPreview />

        {/* 6. How-To — Clear, Accessible Quick Answers */}
        <HowToSection onOpenHowTo={() => handleSubViewChange('howto')} />

        {/* 7. High-Converting Call to Action Banner */}
        <CtaBanner onEnterApp={onEnterApp} />
      </>
    );
  };

  return (
    <div className="min-h-dvh bg-neutral-50 dark:bg-[#0c0c10] text-neutral-900 dark:text-neutral-100 transition-colors selection:bg-blue-600 selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
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

      <main>{renderPage()}</main>

      {/* 8. Modern Minimalist Footer — with resource & legal links */}
      <LandingFooter
        onEnterApp={onEnterApp}
        onChangeSubView={handleSubViewChange}
      />
    </div>
  );
};
