import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Search, SlidersHorizontal, MapPin } from 'lucide-react';

interface DirectorySceneProps {
  drElena: {
    name: string;
    credentials: string;
    headline: string;
    clinicName: string;
    avatar: string;
  };
  drMarcus: {
    name: string;
    credentials: string;
    clinicName: string;
    avatar: string;
  };
  drSarah: {
    name: string;
    credentials: string;
    clinicName: string;
    avatar: string;
  };
}

export const DirectoryScene: React.FC<DirectorySceneProps> = ({
  drElena,
  drMarcus,
  drSarah
}) => {
  const listItems = [
    {
      id: 'elena',
      doctor: drElena,
      isElena: true,
      tag: 'Recommended Peer',
      specialty: drElena.credentials,
      desc: drElena.headline,
      clinic: drElena.clinicName,
    },
    {
      id: 'marcus',
      doctor: drMarcus,
      isElena: false,
      tag: null,
      specialty: 'Pediatric Specialist',
      desc: 'Expert in children vision therapy and school visual readiness.',
      clinic: drMarcus.clinicName,
    },
    {
      id: 'sarah',
      doctor: drSarah,
      isElena: false,
      tag: null,
      specialty: 'Therapeutics Expert',
      desc: 'Focused on therapeutic dry eye care and ocular disease.',
      clinic: drSarah.clinicName,
    }
  ];

  return (
    <div className="space-y-4 text-left">
      {/* Network Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1"
      >
        <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
          <ShieldCheck className="h-4 w-4" />
          <span className="text-[10px] uppercase font-black tracking-widest">Verified Directory</span>
        </div>
        <h4 className="text-sm font-black text-neutral-900 dark:text-white">Optometry Peer Finder</h4>
        <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-normal">
          Connect with trusted optometrists. Filter by clinical focuses, credentials, and custom peer endorsements.
        </p>
      </motion.div>

      {/* Search Input Bar with Entry Animation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500" />
        <input
          type="text"
          readOnly
          value="Specialty Contact Lenses"
          className="w-full pl-9 pr-3 py-2 bg-white dark:bg-[#121217] border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs text-neutral-900 dark:text-white focus:outline-none shadow-xs font-semibold"
        />
        <div className="absolute right-3 top-2.5 flex items-center gap-1 text-[9px] text-blue-600 dark:text-blue-400 font-extrabold bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 rounded-md">
          <SlidersHorizontal className="h-2.5 w-2.5" />
          <span>1 Filter</span>
        </div>
      </motion.div>

      {/* Filter Pills with Staggered Entry */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {['Contact Lenses', 'Pediatrics', 'Dry Eye Care'].map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
            className={`px-3 py-1 rounded-full text-[9px] shrink-0 font-bold ${
              i === 0 
                ? 'bg-blue-600 text-white font-black shadow-sm' 
                : 'bg-white dark:bg-[#121217] text-neutral-500 border border-neutral-200 dark:border-neutral-800'
            }`}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Optometrist listings with one-by-one stagger animation */}
      <div className="space-y-3">
        {listItems.map((item, idx) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: 0.3 + idx * 0.12 
              }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className={`p-3.5 bg-white dark:bg-[#121217] border rounded-2xl flex items-start gap-3 shadow-2xs relative overflow-hidden ${
                item.isElena 
                  ? 'border-blue-500/80 shadow-xs' 
                  : 'border-neutral-200/50 dark:border-neutral-850'
              }`}
            >
              {item.tag && (
                <div className="absolute right-2 top-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-[8px] font-extrabold px-1.5 py-0.5 rounded-full border border-blue-200/30 dark:border-blue-900/30">
                  {item.tag}
                </div>
              )}

              <img 
                src={item.doctor.avatar} 
                alt={item.doctor.name} 
                className="h-10 w-10 rounded-xl object-cover border border-neutral-200/60 dark:border-neutral-800/60 shrink-0" 
              />

              <div className="space-y-1 text-left min-w-0 pr-8">
                <div className="flex items-center gap-1">
                  <p className="text-[11px] font-black text-neutral-900 dark:text-white truncate">{item.doctor.name}</p>
                  <ShieldCheck className="h-3 w-3 text-blue-500 fill-blue-500/10 shrink-0" />
                </div>
                <p className="text-[9px] text-blue-600 dark:text-blue-400 font-extrabold truncate">{item.specialty}</p>
                <p className="text-[9px] text-neutral-500 dark:text-neutral-400 font-medium line-clamp-1 leading-relaxed">{item.desc}</p>
                <div className="flex items-center gap-1 text-[8px] text-neutral-400 pt-0.5">
                  <MapPin className="h-2.5 w-2.5 shrink-0" />
                  <span className="truncate">{item.clinic}</span>
                </div>
              </div>

              {/* simulated tap indicator on Dr Elena (the first option) */}
              {item.isElena && (
                <div className="absolute bottom-3 right-3 h-6 w-6 rounded-full bg-blue-500/25 border border-blue-500 flex items-center justify-center pointer-events-none">
                  <span className="absolute inset-0 rounded-full bg-blue-500/40 animate-ping" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
