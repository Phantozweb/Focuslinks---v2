import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Plus,
  Stethoscope,
  ChevronRight,
  Check,
  Send,
  HelpCircle
} from 'lucide-react';
import { OdGroup, DoctorProfile } from '../types';

interface GroupsViewProps {
  groups: OdGroup[];
  currentUser: DoctorProfile;
  onJoinToggle: (groupId: string) => void;
  onViewDoctorProfile: (doctorId: string) => void;
}

export const GroupsView: React.FC<GroupsViewProps> = ({
  groups,
  currentUser,
  onJoinToggle,
  onViewDoctorProfile,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<OdGroup>(groups[0]);
  const [showCaseSubmit, setShowCaseSubmit] = useState(false);
  const [caseSubmitted, setCaseSubmitted] = useState(false);
  const [caseTitle, setCaseTitle] = useState('');
  const [caseBody, setCaseBody] = useState('');

  const handleCaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCaseSubmitted(true);
    setTimeout(() => {
      setCaseSubmitted(false);
      setShowCaseSubmit(false);
      setCaseTitle('');
      setCaseBody('');
    }, 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-5 pb-28 md:pb-16">
      {/* Specialty Hubs & Clinical Forums Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white dark:bg-[#18181b] p-4 sm:p-5 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <h1 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Optometrist Communities & Grand Rounds
            </h1>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Private peer forums, subspecialty roundtables, and clinical consultation exchange
          </p>
        </div>

        <button
          onClick={() => setShowCaseSubmit(true)}
          className="flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold shadow-xs transition-colors min-h-[40px]"
        >
          <Stethoscope className="h-3.5 w-3.5" />
          <span>Request Grand Rounds Peer Review</span>
        </button>
      </div>

      {/* Main Grid: Groups Sidebar + Active Forum Thread */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Groups Directory */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 px-1">
            Joined Specialty Hubs
          </h2>

          <div className="space-y-2">
            {groups.map((grp) => {
              const isSelected = selectedGroup.id === grp.id;
              return (
                <div
                  key={grp.id}
                  onClick={() => setSelectedGroup(grp)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 shadow-2xs'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b] hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                        {grp.category}
                      </span>
                      <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                        {grp.name}
                      </h3>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onJoinToggle(grp.id);
                      }}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors shrink-0 ${
                        grp.isJoined
                          ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {grp.isJoined ? 'Joined ✓' : 'Join'}
                    </button>
                  </div>

                  <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1">
                    {grp.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-neutral-100 dark:border-neutral-800/60 text-[10px] text-neutral-400 font-medium">
                    <span>{grp.membersCount.toLocaleString()} OD Colleagues</span>
                    <span>{grp.activeDiscussions} Active Cases</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Group Discussion & Cases */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b] p-5 shadow-2xs space-y-4">
            {/* Group Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    {selectedGroup.name}
                  </h2>
                  <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                    Verified OD Group
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {selectedGroup.description}
                </p>
              </div>

              <button
                onClick={() => onJoinToggle(selectedGroup.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedGroup.isJoined
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {selectedGroup.isJoined ? 'Member of Hub ✓' : 'Join Hub'}
              </button>
            </div>

            {/* Current Grand Rounds Discussion Thread */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-neutral-50/70 dark:bg-[#131316] border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded">
                    Pinned Grand Rounds Topic
                  </span>
                  <span className="text-xs text-neutral-400">Today • 18 OD replies</span>
                </div>

                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  {selectedGroup.recentTopic}
                </h3>

                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  "Colleagues, when fitting an asymmetric post-surgical graft with 300µm inferior elevation step,
                  what is your protocol for balancing quadrant-specific landing toricity versus ordering a custom
                  micro-vault notch? Looking for recent experience with 3D profilometry."
                </p>

                <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-medium">Started by Dr. Elena Vance (OD, FAAO, FSLS)</span>
                  <button
                    onClick={() => onViewDoctorProfile('doc-elena-vance')}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    View Dr. Vance Profile →
                  </button>
                </div>
              </div>

              {/* Sample Answers from fellow Optometrists */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 px-1">
                  Peer Optometrist Perspectives
                </h4>

                <div className="p-3 rounded-xl border border-neutral-100 dark:border-neutral-800/80 bg-white dark:bg-[#161619] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-neutral-900 dark:text-neutral-100">
                      Dr. Marcus Chen (OD, FAAO)
                    </span>
                    <span className="text-[10px] text-neutral-400">1 hour ago</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">
                    "If the step elevation exceeds 250µm, landing toricity alone usually produces localized edge standoff or tear pump leakage. A localized micro-vault or impression-based scleral (EyePrintPRO) produces far superior apical stability."
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-neutral-100 dark:border-neutral-800/80 bg-white dark:bg-[#161619] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-neutral-900 dark:text-neutral-100">
                      Dr. Amara Thorne (OD, MS)
                    </span>
                    <span className="text-[10px] text-neutral-400">3 hours ago</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">
                    "Make sure you evaluate intraocular pressure after 4 hours of wear on these high-vault cases. Also check for subtle limbal stem cell compression with lissamine green upon removal."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Grand Rounds Modal */}
      <AnimatePresence>
        {showCaseSubmit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-800 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    Submit Clinical Grand Rounds Case
                  </h3>
                </div>
                <button
                  onClick={() => setShowCaseSubmit(false)}
                  className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                >
                  ✕
                </button>
              </div>

              {caseSubmitted ? (
                <div className="py-8 text-center space-y-2">
                  <Check className="h-12 w-12 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    Grand Rounds Case Published
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Your de-identified consultation has been shared with {selectedGroup.name} members for peer diagnostic review.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCaseSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Target Specialty Forum
                    </label>
                    <select className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-3 py-2 text-xs text-neutral-900 dark:text-neutral-100">
                      {groups.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Case Title / Chief Diagnostic Question
                    </label>
                    <input
                      type="text"
                      value={caseTitle}
                      onChange={(e) => setCaseTitle(e.target.value)}
                      placeholder="e.g. Unexplained unilateral superior paracentral defect in 34yo"
                      className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-3 py-2 text-xs text-neutral-900 dark:text-neutral-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      De-identified History, Findings & Dilemma
                    </label>
                    <textarea
                      rows={4}
                      value={caseBody}
                      onChange={(e) => setCaseBody(e.target.value)}
                      placeholder="Include age, visual acuity, IOP, OCT parameters, and specific management question for OD peers..."
                      className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-3 py-2 text-xs text-neutral-900 dark:text-neutral-100"
                      required
                    />
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 shrink-0" />
                    <span>HIPAA Compliant. No PHI or identifiable patient tags.</span>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCaseSubmit(false)}
                      className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                    >
                      <Send className="h-3.5 w-3.5" /> Post to OD Forum
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
