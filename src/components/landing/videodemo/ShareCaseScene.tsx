import React from 'react';
import { motion } from 'motion/react';
import { Send, ArrowRight, BookOpen } from 'lucide-react';

interface ShareCaseSceneProps {
  drElena: {
    name: string;
    avatar: string;
  };
  typingText: string;
}

export const ShareCaseScene: React.FC<ShareCaseSceneProps> = ({
  drElena,
  typingText
}) => {
  return (
    <div className="text-left space-y-4 h-full">
      {/* Collaboration Context info bar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="p-3 bg-neutral-100/50 dark:bg-neutral-900/30 rounded-2xl border border-neutral-200/40 dark:border-neutral-800/30 flex items-center gap-3 shadow-3xs"
      >
        <img src={drElena.avatar} className="h-8 w-8 rounded-full object-cover border border-blue-500/10 shrink-0" />
        <div>
          <h5 className="text-[10px] font-black text-neutral-900 dark:text-white">Ask for Professional Advice</h5>
          <p className="text-[9px] text-neutral-500 dark:text-neutral-400 font-semibold">Consulting: {drElena.name}</p>
        </div>
      </motion.div>

      {/* Primary case share panel with custom shadow and animated glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 100, damping: 14 }}
        className="bg-white dark:bg-[#121217] border border-blue-500/80 rounded-2xl p-4 space-y-4 shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-blue-500/10 to-transparent pointer-events-none" />

        <div className="space-y-1">
          <span className="text-[8px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider flex items-center gap-1">
            <BookOpen className="h-2.5 w-2.5" />
            <span>Clinical Case Wisdom</span>
          </span>
          <h5 className="text-xs font-black text-neutral-900 dark:text-white">Formulate Case Advice Request</h5>
          <p className="text-[9px] text-neutral-400 font-medium">Draft clinical questions or findings safely. All private patient identifiers are completely omitted to ensure compliance.</p>
        </div>

        {/* Dynamic Typist Text Container */}
        <div className="space-y-1.5">
          <label className="text-[8px] font-black uppercase text-neutral-400 tracking-wider">Your Inquiry details</label>
          <div className="w-full min-h-[110px] p-3 bg-neutral-50 dark:bg-[#0c0c0f] border border-neutral-200 dark:border-neutral-800 rounded-xl text-[10px] text-neutral-900 dark:text-neutral-200 font-semibold leading-relaxed relative flex flex-col justify-between">
            <div className="whitespace-pre-wrap">
              {typingText}
              <span className="inline-block w-1.5 h-3.5 bg-blue-600 ml-0.5 animate-pulse" />
            </div>
            
            <div className="flex justify-between items-center text-[8px] text-neutral-400 font-bold border-t border-neutral-100 dark:border-neutral-900 pt-2 mt-2">
              <span>Optometry Safe Draft</span>
              <span>{typingText.length} characters</span>
            </div>
          </div>
        </div>

        {/* Form control actions with entrance physics */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex gap-2 justify-end pt-1"
        >
          <div className="px-3.5 py-1.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-500 rounded-lg text-[8.5px] font-black cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
            Discard Draft
          </div>
          <div className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-[8.5px] font-black shadow-sm flex items-center gap-1.5 cursor-pointer hover:bg-blue-700 transition-colors">
            <span>Share with Peers</span>
            <ArrowRight className="h-2.5 w-2.5" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
