import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserCheck, Eye, Sparkles, Stethoscope, ChevronRight, Share2, Heart } from 'lucide-react';
import { ClinicalStory } from '../types';

interface StoryModalProps {
  story: ClinicalStory | null;
  onClose: () => void;
  onViewDoctorProfile?: (doctorId: string) => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ story, onClose, onViewDoctorProfile }) => {
  const [liked, setLiked] = React.useState(false);

  if (!story) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.2 }}
          className="relative w-full sm:max-w-2xl h-dvh sm:h-auto sm:max-h-[90dvh] overflow-y-auto overscroll-contain sm:overflow-hidden rounded-none sm:rounded-2xl bg-white shadow-2xl dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-800"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 px-5 py-3.5 bg-neutral-50/50 dark:bg-[#141416]">
            <div className="flex items-center gap-3">
              <img
                src={story.author.avatar}
                alt={story.author.name}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-500/30"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      onViewDoctorProfile?.(story.author.id);
                      onClose();
                    }}
                    className="font-semibold text-sm hover:underline text-neutral-900 dark:text-neutral-100 flex items-center gap-1"
                  >
                    {story.author.name}
                    <span className="text-xs font-normal text-emerald-600 dark:text-emerald-400">({story.author.credentials})</span>
                  </button>
                  <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                    Verified OD
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-xs">{story.author.clinicName}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                {story.category}
              </span>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="max-h-[80vh] overflow-y-auto p-5 space-y-4">
            {/* Main Clinical Image */}
            <div className="relative overflow-hidden rounded-xl bg-black aspect-video group">
              <img
                src={story.thumbnail}
                alt={story.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Clinical Pearl • Diagnostic Case File
                </span>
                <h3 className="text-lg font-bold leading-snug">{story.title}</h3>
              </div>
            </div>

            {/* Case Presentation */}
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#121214] p-4 space-y-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1 flex items-center gap-1.5">
                  <Stethoscope className="h-3.5 w-3.5 text-blue-500" /> Patient Presentation & Complaint
                </h4>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{story.caseDescription}</p>
              </div>

              <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                  Definitive Clinical Diagnosis
                </h4>
                <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{story.diagnosis}</p>
              </div>

              <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                  Key Biomicroscopic & Diagnostic Findings
                </h4>
                <ul className="space-y-1.5">
                  {story.findings.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
                  Management Protocol / Treatment Executed
                </h4>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium bg-purple-50/50 dark:bg-purple-950/20 p-2.5 rounded-lg border border-purple-100 dark:border-purple-900/30">
                  {story.treatment}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 px-5 py-3 bg-neutral-50 dark:bg-[#121214]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  liked
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                }`}
              >
                <Heart className={`h-4 w-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{liked ? 'Case Applauded' : 'Applaud Case'}</span>
              </button>
              <button className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                <Share2 className="h-3.5 w-3.5" /> Share to Feed
              </button>
            </div>

            <button
              onClick={() => {
                onViewDoctorProfile?.(story.author.id);
                onClose();
              }}
              className="flex items-center gap-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 px-3.5 py-1.5 text-xs font-semibold text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-white transition-colors"
            >
              <span>View Doctor Profile</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
