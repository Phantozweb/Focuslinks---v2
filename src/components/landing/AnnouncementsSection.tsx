import React, { useState } from 'react';
import { Calendar, Tag, ChevronRight, Award, Newspaper, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AnnouncementsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'platform' | 'clinical' | 'event'>('all');

  const announcements = [
    {
      id: 1,
      category: "platform",
      badge: "Feature Release",
      title: "Anterior Segment OCT Precision Caliper Tool Released",
      description: "Measure scleral sagittal depth, corneal clearance, and limbal vault direct from your browser using our new calibrated vector markers.",
      date: "Sep 18, 2026",
      readTime: "3 min read",
      author: "Product Team",
      featured: true
    },
    {
      id: 2,
      category: "clinical",
      badge: "Partnership",
      title: "Automated Registration Board Credential Checking Active",
      description: "We have partnered with global optometrist licensing registries to deliver secure, near-instant credential validation during registration.",
      date: "Sep 10, 2026",
      readTime: "2 min read",
      author: "Security & Trust Board"
    },
    {
      id: 3,
      category: "event",
      badge: "Webinar",
      title: "Myopia Control Strategies & High Axial Elongation Case Studies",
      description: "Join Dr. Richard Chen, FAAO on Oct 12th for an interactive discussion on managing challenging progressive axial cases.",
      date: "Oct 12, 2026",
      readTime: "1 hour live",
      author: "Clinical Education Committee"
    },
    {
      id: 4,
      category: "platform",
      badge: "Optimization",
      title: "Advanced Image Security & De-Identification Engine Upgrade",
      description: "Our proprietary browser-level imaging tool now instantly checks and scrubs metadata, EXIF parameters, and patient labels before upload.",
      date: "Aug 29, 2026",
      readTime: "4 min read",
      author: "Security Team"
    }
  ];

  const filteredAnnouncements = selectedCategory === 'all' 
    ? announcements 
    : announcements.filter(a => a.category === selectedCategory);

  return (
    <section id="announcements" className="py-20 bg-neutral-50 dark:bg-[#0c0c11] relative overflow-hidden">
      {/* Decorative background grids */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 dark:bg-blue-950/70 border border-blue-200/50 dark:border-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-bold">
              <Newspaper className="h-3.5 w-3.5" />
              <span>Announcements & Platform News</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
              Latest Platform Updates
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl">
              Stay up-to-date with newly implemented clinical tools, community integrations, security audits, and educational case webinars.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-end bg-neutral-200/60 dark:bg-neutral-800/80 p-1 rounded-2xl text-xs font-bold shrink-0">
            {[
              { id: 'all', label: 'All News' },
              { id: 'platform', label: 'Platform Tools' },
              { id: 'clinical', label: 'Security & Licensing' },
              { id: 'event', label: 'Webinars' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedCategory(btn.id as any)}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                  selectedCategory === btn.id
                    ? 'bg-white dark:bg-[#1a1a26] text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <AnimatePresence mode="popLayout">
            {filteredAnnouncements.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 relative flex flex-col justify-between ${
                  item.featured 
                    ? 'bg-white dark:bg-[#12121b] border-blue-200 dark:border-blue-900/60 shadow-lg shadow-blue-500/5' 
                    : 'bg-white dark:bg-[#111118] border-neutral-200/70 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm'
                }`}
              >
                {item.featured && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-extrabold border border-blue-200 dark:border-blue-900">
                    <Star className="h-2.5 w-2.5 fill-blue-600 dark:fill-blue-400" />
                    <span>Featured</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Category badge */}
                  <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                    {item.badge}
                  </span>

                  <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900 dark:text-white leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Card footer details */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800/80 text-xs text-neutral-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold text-neutral-500 dark:text-neutral-400">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{item.date}</span>
                    </span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                  <span className="font-bold text-neutral-500 dark:text-neutral-300">
                    {item.author}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
