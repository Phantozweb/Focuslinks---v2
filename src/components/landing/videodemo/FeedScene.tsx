import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  MessageSquare, 
  Repeat2, 
  Bookmark, 
  ShieldCheck, 
  Sparkles,
  Award,
  Clock,
  Check
} from 'lucide-react';

interface FeedSceneProps {
  drElena: {
    name: string;
    avatar: string;
  };
  drMarcus: {
    name: string;
    avatar: string;
  };
}

export const FeedScene: React.FC<FeedSceneProps> = ({ drElena, drMarcus }) => {
  return (
    <div className="space-y-4 text-left">
      {/* Feed Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1"
      >
        <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
          <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
          <span className="text-[10px] uppercase font-black tracking-widest">Active Discussions</span>
        </div>
        <h4 className="text-sm font-black text-neutral-900 dark:text-white">Optometry Feed</h4>
        <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-normal">
          Read high-yield cases, share clinical wisdom, discuss research topics, and learn from peers.
        </p>
      </motion.div>

      {/* Daily Round banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs relative overflow-hidden"
      >
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <Award className="h-24 w-24" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[8px] bg-white/20 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
            Daily Round Case
          </span>
          <span className="text-[8px] font-bold flex items-center gap-1 text-blue-100">
            <Clock className="h-2.5 w-2.5" />
            <span>Active Now</span>
          </span>
        </div>
        <p className="text-[11px] font-extrabold mt-1.5 leading-snug">
          How do you optimize initial scleral lens landing zone alignment?
        </p>
        <div className="flex gap-2 mt-2 pt-2 border-t border-white/10 text-[8.5px] text-blue-100 font-extrabold">
          <span>14 Peers Disclosed Case</span>
          <span>•</span>
          <span>48 peer upvotes</span>
        </div>
      </motion.div>

      {/* Main Clinical Feed Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        className="p-4 bg-white dark:bg-[#121217] border border-neutral-200/60 dark:border-neutral-900 rounded-2xl shadow-2xs space-y-3"
      >
        {/* User metadata header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img 
              src={drMarcus.avatar} 
              alt={drMarcus.name} 
              className="h-8 w-8 rounded-full object-cover border border-neutral-100 dark:border-neutral-800" 
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-black text-neutral-900 dark:text-white">
                  {drMarcus.name}
                </span>
                <ShieldCheck className="h-3 w-3 text-blue-500 fill-blue-500/10" />
              </div>
              <span className="text-[8.5px] text-neutral-400 font-bold">
                Pediatric Vision Specialist • 1h ago
              </span>
            </div>
          </div>
          
          <span className="text-[8.5px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-extrabold px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-900/30">
            Clinical Pearl
          </span>
        </div>

        {/* Clinical Post Body */}
        <div className="space-y-2 text-left">
          <p className="text-[10px] text-neutral-800 dark:text-neutral-200 leading-relaxed font-semibold">
            Fitted a 9-year-old child for custom contact lenses today using advanced alignment. Noticed remarkable comfort improvements after slightly flattening the outer edges by 1.5 microns. Here is my daily lesson!
          </p>
          <div className="flex flex-wrap gap-1">
            <span className="text-[8px] bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-extrabold px-1.5 py-0.5 rounded">
              #MyopiaManagement
            </span>
            <span className="text-[8px] bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-extrabold px-1.5 py-0.5 rounded">
              #ContactLenses
            </span>
          </div>
        </div>

        {/* Interaction Actions Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-900 text-neutral-400">
          <div className="flex items-center gap-1 hover:text-rose-500 transition-colors">
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span className="text-[9px] font-black text-neutral-600 dark:text-neutral-400">28</span>
          </div>
          <div className="flex items-center gap-1 hover:text-blue-500 transition-colors">
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="text-[9px] font-bold">5 Discussions</span>
          </div>
          <div className="flex items-center gap-1 hover:text-emerald-500 transition-colors">
            <Repeat2 className="h-3.5 w-3.5" />
            <span className="text-[9px] font-bold">12</span>
          </div>
          <Bookmark className="h-3.5 w-3.5 hover:text-yellow-500 transition-colors" />
        </div>

        {/* Live Peer Comments Section with fade-up */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.5 }}
          className="bg-neutral-50 dark:bg-[#0c0c0f] p-2.5 rounded-xl space-y-2 border border-neutral-100 dark:border-neutral-900"
        >
          <div className="flex items-start gap-2">
            <img 
              src={drElena.avatar} 
              className="h-6 w-6 rounded-full object-cover border" 
            />
            <div className="space-y-0.5 min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-neutral-900 dark:text-white">
                  Elena Vance, OD
                </span>
                <span className="text-[7.5px] text-blue-600 font-black flex items-center gap-0.5">
                  <Check className="h-2 w-2" />
                  Peer Approved
                </span>
              </div>
              <p className="text-[8.5px] text-neutral-500 dark:text-neutral-400 leading-normal font-semibold">
                Fantastic outcome, Marcus! Flattening the landing curve really helps lift tension on younger corneas.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
