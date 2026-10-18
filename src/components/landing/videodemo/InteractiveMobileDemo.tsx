import React from 'react';
import { 
  ShieldCheck, 
  Zap,
  Bell,
  Compass,
  Flame,
  Plus,
  Users,
  Search,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DemoScene } from './types';
import { FeedScene } from './FeedScene';
import { DirectoryScene } from './DirectoryScene';
import { ProfileScene } from './ProfileScene';
import { ShareCaseScene } from './ShareCaseScene';
import { CirclesScene } from './CirclesScene';

interface InteractiveMobileDemoProps {
  currentScene: DemoScene;
  typingText: string;
  elapsedInScene: number;
}

export const InteractiveMobileDemo: React.FC<InteractiveMobileDemoProps> = ({
  currentScene,
  typingText,
  elapsedInScene
}) => {
  const drElena = {
    name: 'Dr. Elena Vance, OD',
    credentials: 'Contact Lens & Dry Eye Specialist',
    headline: 'Dedicated to advanced custom contact lenses, therapeutic dry eye care, and professional collaboration.',
    clinicName: 'Valley Advanced Optometry Center',
    location: 'San Francisco, California',
    avatar: 'https://images.unsplash.com/photo-1594824813501-4838e82ef573?w=400&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&auto=format&fit=crop&q=80',
    peerConcordance: 98,
    specialties: [
      { name: 'Custom Contact Lenses (Sclerals)', count: 312 },
      { name: 'Dry Eye Therapies & IPL', count: 245 },
      { name: 'Clinical Case Presentations', count: 189 }
    ]
  };

  const drMarcus = {
    name: 'Dr. Marcus Chen, OD',
    credentials: 'Pediatric Optometry Specialist',
    clinicName: 'Oakwood Children’s Vision',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
    peerConcordance: 96,
  };

  const drSarah = {
    name: 'Dr. Sarah Jenkins, OD',
    credentials: 'Primary Care Optometrist',
    clinicName: 'Downtown Family Vision',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
    peerConcordance: 92,
  };

  const getActiveTab = (): 'feed' | 'gallery' | 'groups' | 'doctors' | 'profile' | 'create' => {
    switch (currentScene) {
      case 'feed':
        return 'feed';
      case 'directory':
        return 'doctors';
      case 'typing':
        return 'create';
      case 'chat':
        return 'groups';
      default:
        return 'feed';
    }
  };

  const activeTab = getActiveTab();

  // Top header tab items that dynamically change based on currentScene
  const topTabs = [
    { id: 'feed', label: '1. Feed' },
    { id: 'directory', label: '2. Network' },
    { id: 'typing', label: '3. Consult' },
    { id: 'chat', label: '4. Circles' }
  ];

  return (
    <div className="flex flex-col h-full bg-neutral-50 dark:bg-[#0a0a0c] text-neutral-900 dark:text-neutral-100 font-sans relative select-none">
      
      {/* 1. Header Bar matching real top navigation bar on mobile */}
      <header className="h-13 border-b border-neutral-200/60 dark:border-neutral-900/60 px-4 flex items-center justify-between bg-white dark:bg-[#111115] shrink-0 z-20">
        <div className="flex items-center gap-1.5">
          <div className="h-6.5 w-6.5 rounded-lg bg-blue-600 flex items-center justify-center shadow-xs">
            <Zap className="h-3.5 w-3.5 text-white fill-white/10" />
          </div>
          <span className="text-[12px] font-black tracking-tight text-neutral-900 dark:text-white">FocusLinks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center border border-neutral-200/50 dark:border-neutral-800">
            <Bell className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
          </div>
          <img 
            src={drElena.avatar} 
            alt="My Avatar" 
            className="h-6.5 w-6.5 rounded-full object-cover ring-2 ring-blue-500/10"
          />
        </div>
      </header>

      {/* 2. Top Header Navigation Tabs - Beautiful segmented control representing user request */}
      <div className="bg-white dark:bg-[#111115] border-b border-neutral-200/60 dark:border-neutral-900/60 p-1.5 shrink-0 z-10">
        <div className="grid grid-cols-4 gap-1 bg-neutral-100/80 dark:bg-neutral-900/80 p-1 rounded-xl relative">
          {topTabs.map((tab) => {
            const isTabActive = currentScene === tab.id;
            return (
              <div
                key={tab.id}
                className="relative flex justify-center py-1 rounded-lg text-[8.5px] font-black cursor-pointer transition-all z-10"
              >
                {isTabActive && (
                  <motion.div
                    layoutId="topActiveIndicator"
                    className="absolute inset-0 bg-white dark:bg-[#1c1c24] border border-neutral-200/30 dark:border-neutral-800/40 rounded-lg shadow-xs z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-200 ${
                  isTabActive ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-400 dark:text-neutral-500'
                }`}>
                  {tab.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Main Live Screen Container - Rendering separate independent files */}
      <main className="grow overflow-y-auto px-3.5 py-3.5 relative bg-neutral-50 dark:bg-[#0c0c0f]">
        <AnimatePresence mode="wait">
          
          {currentScene === 'feed' && (
            <motion.div
              key="feed-container"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <FeedScene 
                drElena={drElena}
                drMarcus={drMarcus}
              />
            </motion.div>
          )}

          {currentScene === 'directory' && (
            <motion.div
              key="directory-container"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <DirectoryScene 
                drElena={drElena}
                drMarcus={drMarcus}
                drSarah={drSarah}
              />
            </motion.div>
          )}

          {currentScene === 'typing' && (
            <motion.div
              key="typing-container"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <ShareCaseScene 
                drElena={drElena}
                typingText={typingText}
              />
            </motion.div>
          )}

          {currentScene === 'chat' && (
            <motion.div
              key="chat-container"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              <CirclesScene 
                drElena={drElena}
                drMarcus={drMarcus}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 4. Bottom Navigation Bar matching MobileBottomNav.tsx */}
      <footer className="h-13 border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111115] flex items-center justify-around px-2 shrink-0 select-none z-20">
        {[
          { id: 'feed', icon: <Compass className="h-4 w-4" />, label: 'Feed' },
          { id: 'gallery', icon: <Flame className="h-4 w-4" />, label: 'Explore' },
          { id: 'create', icon: <Plus className="h-4 w-4" />, label: '', isCenter: true },
          { id: 'groups', icon: <Users className="h-4 w-4" />, label: 'Circles' },
          { id: 'doctors', icon: <ShieldCheck className="h-4 w-4" />, label: 'Directory' }
        ].map((item, index) => {
          if (item.isCenter) {
            const isCreateActive = activeTab === 'create';
            return (
              <div key={index} className="relative -top-2 flex items-center justify-center">
                <div className={`h-8 w-8 rounded-full text-white flex items-center justify-center transition-all duration-300 ${
                  isCreateActive 
                    ? 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-rose-500 scale-110 shadow-md shadow-blue-500/20 ring-2 ring-blue-500/30' 
                    : 'bg-neutral-300 dark:bg-neutral-700 hover:scale-105'
                }`}>
                  <Plus className="h-4 w-4 stroke-[2.5]" />
                </div>
              </div>
            );
          }

          const isActive = activeTab === item.id;
          return (
            <div
              key={index}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400 font-black scale-105' 
                  : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-600'
              }`}
            >
              {item.icon}
              <span className="text-[7.5px] tracking-tight font-extrabold uppercase">{item.label}</span>
            </div>
          );
        })}
      </footer>

    </div>
  );
};
