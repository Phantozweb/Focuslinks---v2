import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Building2, MapPin, Users, Check } from 'lucide-react';

interface ProfileSceneProps {
  drElena: {
    name: string;
    credentials: string;
    headline: string;
    clinicName: string;
    location: string;
    avatar: string;
    bannerImage: string;
    specialties: { name: string; count: number }[];
  };
}

export const ProfileScene: React.FC<ProfileSceneProps> = ({ drElena }) => {
  return (
    <div className="space-y-4 pb-6 text-left">
      {/* Profile Header Block */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="rounded-2xl border border-neutral-200/60 dark:border-neutral-900 bg-white dark:bg-[#121217] overflow-hidden shadow-sm relative"
      >
        {/* Cover image header with panning motion */}
        <div className="h-24 w-full relative bg-blue-900 overflow-hidden">
          <motion.img 
            initial={{ scale: 1.15, opacity: 0.4 }}
            animate={{ scale: 1.0, opacity: 0.6 }}
            transition={{ duration: 5, ease: 'easeOut' }}
            src={drElena.bannerImage} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121217]/90 via-[#121217]/40 to-transparent" />
        </div>

        {/* Overlapping profile picture with elegant scale entry */}
        <div className="absolute top-12 left-4">
          <div className="relative">
            <motion.img 
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.15 }}
              src={drElena.avatar} 
              className="h-16 w-16 rounded-full border-4 border-white dark:border-[#121217] object-cover shadow-md" 
            />
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.35 }}
              className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-blue-600 border-2 border-white dark:border-[#121217] flex items-center justify-center shadow-xs"
            >
              <ShieldCheck className="h-2.5 w-2.5 text-white" />
            </motion.div>
          </div>
        </div>

        {/* Profile bio details section with staggered slide-ups */}
        <div className="pt-8 px-4 pb-4 space-y-3">
          <div className="space-y-1">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-wrap items-center gap-1.5"
            >
              <h3 className="text-xs font-black text-neutral-900 dark:text-white">
                {drElena.name}
              </h3>
              <span className="text-[8px] bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                Optometrist Peer
              </span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="text-[9.5px] text-blue-600 dark:text-blue-400 font-extrabold"
            >
              {drElena.credentials}
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-[9.5px] text-neutral-500 dark:text-neutral-400 leading-relaxed font-semibold mt-1 pr-4"
            >
              {drElena.headline}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="flex flex-col gap-1 text-[8.5px] text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-900/60"
          >
            <div className="flex items-center gap-1.5">
              <Building2 className="h-3 w-3 text-neutral-500" />
              <span className="font-semibold">{drElena.clinicName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-neutral-500" />
              <span className="font-semibold">{drElena.location}</span>
            </div>
          </motion.div>

          {/* Action Callouts */}
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="grid grid-cols-2 gap-2 pt-1"
          >
            <div className="py-2 px-3 rounded-xl bg-blue-600 text-white text-[9px] font-black text-center flex items-center justify-center gap-1 shadow-xs cursor-pointer hover:bg-blue-700 transition-colors">
              <Users className="h-3 w-3" />
              <span>Connect updates</span>
            </div>
            <div className="py-2 px-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200/50 dark:border-neutral-800 text-[9px] font-extrabold text-center cursor-pointer hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 transition-colors">
              Discuss cases
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Peer Specialties Endorsements Section */}
      <div className="rounded-2xl border border-neutral-200/50 dark:border-neutral-900 bg-white dark:bg-[#121217] p-3.5 space-y-2.5 shadow-2xs">
        <motion.h4 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.45 }}
          className="text-[10px] font-black uppercase text-neutral-900 dark:text-white tracking-wider flex items-center gap-1.5"
        >
          <Award className="h-3.5 w-3.5 text-blue-500" />
          <span>Optometric Endorsements</span>
        </motion.h4>

        <div className="space-y-2">
          {drElena.specialties.map((spec, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.5 + i * 0.1 }}
              className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50/80 dark:bg-[#0c0c0f] border border-neutral-100/50 dark:border-neutral-900"
            >
              <span className="text-[9.5px] font-bold text-neutral-800 dark:text-neutral-200 truncate pr-4">{spec.name}</span>
              <div className="flex items-center gap-1 text-[8.5px] bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-extrabold px-2 py-0.5 rounded-full shrink-0 border border-blue-100/30 dark:border-blue-900/30">
                <Check className="h-2.5 w-2.5" />
                <span>Verified Endorsement</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
