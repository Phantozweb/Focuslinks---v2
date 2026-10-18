import React from 'react';
import { motion } from 'motion/react';
import { Lock, MessageSquare, Send } from 'lucide-react';

interface CirclesSceneProps {
  drElena: {
    name: string;
    avatar: string;
  };
  drMarcus: {
    name: string;
    avatar: string;
  };
}

export const CirclesScene: React.FC<CirclesSceneProps> = ({
  drElena,
  drMarcus
}) => {
  return (
    <div className="text-left space-y-4 flex flex-col h-full pb-4">
      {/* Circle details bar */}
      <motion.div 
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="p-2.5 bg-blue-50/60 dark:bg-blue-950/20 rounded-xl border border-blue-100/50 dark:border-blue-900/30 flex items-center justify-between shadow-3xs shrink-0"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
          </span>
          <span className="text-[10px] font-black text-neutral-900 dark:text-white">Scleral Lens Discussion Circle</span>
        </div>
        <div className="flex items-center gap-1 text-[8.5px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          <Lock className="h-2.5 w-2.5 text-emerald-500" />
          <span>Case Chat</span>
        </div>
      </motion.div>

      {/* Messages layout thread with custom staggering */}
      <div className="space-y-4 grow overflow-y-auto pt-1 flex flex-col justify-end">
        {/* Message 1 from Dr Marcus */}
        <motion.div 
          initial={{ opacity: 0, y: 15, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 13, delay: 0.15 }}
          className="flex items-start gap-2.5"
        >
          <img src={drMarcus.avatar} className="h-7 w-7 rounded-full object-cover border border-neutral-200 dark:border-neutral-800 shrink-0 shadow-3xs" />
          <div className="space-y-0.5">
            <span className="text-[8px] text-neutral-400 font-extrabold">{drMarcus.name.split(',')[0]}</span>
            <div className="bg-white dark:bg-[#121217] p-3 rounded-2xl rounded-tl-none border border-neutral-200/50 dark:border-neutral-900 max-w-[210px] shadow-3xs">
              <p className="text-[9.5px] text-neutral-800 dark:text-neutral-200 leading-relaxed font-semibold">
                Hi Elena, did that warm compress routine solve your dry eye patient's discomfort?
              </p>
            </div>
            <span className="text-[7.5px] text-neutral-400 font-semibold block pt-0.5 pl-1">9:41 AM</span>
          </div>
        </motion.div>

        {/* Message 2 from Elena Vance (Me) with offset delay */}
        <motion.div 
          initial={{ opacity: 0, y: 15, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 13, delay: 1.1 }}
          className="flex items-start gap-2.5 justify-end"
        >
          <div className="space-y-0.5 text-right flex flex-col items-end">
            <span className="text-[8px] text-neutral-400 font-extrabold">Dr. Elena Vance, OD (You)</span>
            <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none max-w-[210px] shadow-md border border-blue-500/10">
              <p className="text-[9.5px] leading-relaxed font-semibold">
                Yes! Incorporating it twice daily stabilized the tear film wonderfully. They are extremely grateful for the advice you shared!
              </p>
            </div>
            <span className="text-[7.5px] text-neutral-400 font-semibold block pt-0.5 pr-1">9:42 AM</span>
          </div>
          <img src={drElena.avatar} className="h-7 w-7 rounded-full object-cover border border-blue-500/20 shrink-0 shadow-3xs" />
        </motion.div>
      </div>

      {/* Group discussion status footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.8 }}
        className="text-center text-[8px] text-neutral-400 dark:text-neutral-500 font-black uppercase flex items-center justify-center gap-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-900/60 shrink-0"
      >
        <Lock className="h-2.5 w-2.5 text-emerald-500" />
        <span>Fully Encrypted Optometry Group</span>
      </motion.div>
    </div>
  );
};
