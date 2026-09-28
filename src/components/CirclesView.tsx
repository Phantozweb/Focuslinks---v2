import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BarChart2, Plus } from 'lucide-react';
import { OdGroup, DoctorProfile, CircleThread, CircleChatMessage, ClinicalEvent } from '../types';
import { MOCK_CIRCLE_THREADS, MOCK_CIRCLE_MESSAGES, OTHER_DOCTORS, MOCK_CLINICAL_EVENTS } from '../data/mockData';
import { CirclesHub } from './circles/CirclesHub';
import { CircleWorkspace } from './circles/CircleWorkspace';
import { ProposeCircleModal } from './circles/ProposeCircleModal';
import { EventsCalendarModal } from './circles/EventsCalendarModal';

interface CirclesViewProps {
  groups: OdGroup[];
  currentUser: DoctorProfile;
  onJoinToggle: (groupId: string) => void;
  onViewDoctorProfile: (doctorId: string) => void;
}

export const CirclesView: React.FC<CirclesViewProps> = ({
  groups,
  currentUser,
  onJoinToggle,
  onViewDoctorProfile,
}) => {
  // Navigation State: null = Circles & Communities Hub (Facebook Groups style), string = Nested Workspace (Discord style)
  const [activeCircleId, setActiveCircleId] = useState<string | null>(null);

  // Local state for groups, messages, and grand rounds threads
  const [groupsList, setGroupsList] = useState<OdGroup[]>(groups);
  const [messages, setMessages] = useState<CircleChatMessage[]>(MOCK_CIRCLE_MESSAGES);
  const [threads, setThreads] = useState<CircleThread[]>(MOCK_CIRCLE_THREADS);
  const [events, setEvents] = useState<ClinicalEvent[]>(MOCK_CLINICAL_EVENTS);

  // Modals state
  const [isProposeModalOpen, setIsProposeModalOpen] = useState(false);
  const [isCreatePollOpen, setIsCreatePollOpen] = useState(false);
  const [isEventsCalendarOpen, setIsEventsCalendarOpen] = useState(false);

  // New poll form states
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOption1, setPollOption1] = useState('');
  const [pollOption2, setPollOption2] = useState('');
  const [pollExplanation, setPollExplanation] = useState('');

  // Selected Circle object
  const activeCircle = groupsList.find((g) => g.id === activeCircleId);

  // Handlers
  const handleSelectCircle = (circleId: string) => {
    setActiveCircleId(circleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHub = () => {
    setActiveCircleId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleRegisterEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((evt) =>
        evt.id === eventId
          ? {
              ...evt,
              isRegistered: !evt.isRegistered,
              attendeesCount: evt.isRegistered ? evt.attendeesCount - 1 : evt.attendeesCount + 1,
            }
          : evt
      )
    );
  };

  const handleToggleJoin = (groupId: string) => {
    setGroupsList((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              isJoined: !g.isJoined,
              membersCount: g.isJoined ? g.membersCount - 1 : g.membersCount + 1,
            }
          : g
      )
    );
    onJoinToggle(groupId);
  };

  const handleSendMessage = (text: string, channelId?: string) => {
    if (!activeCircle) return;
    const newMsg: CircleChatMessage = {
      id: `cm-${Date.now()}`,
      circleId: activeCircle.id,
      author: currentUser,
      timestamp: 'Just now',
      text,
      reactions: [],
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleSendVoiceNote = (duration: string, channelId?: string) => {
    if (!activeCircle) return;
    const newMsg: CircleChatMessage = {
      id: `cm-${Date.now()}`,
      circleId: activeCircle.id,
      author: currentUser,
      timestamp: 'Just now',
      text: '🎙️ Clinical Voice Pearl from chairside consult:',
      voiceNote: {
        duration,
        waveform: [25, 40, 75, 90, 60, 45, 80, 100, 70, 50, 85, 95, 40, 30],
      },
      reactions: [{ emoji: '🎧', count: 1, userReacted: true }],
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleVoteMessagePoll = (msgId: string, optionId: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId && msg.poll) {
          const alreadyVoted = msg.poll.userVotedId;
          const updatedOptions = msg.poll.options.map((opt) => {
            if (opt.id === optionId) {
              return { ...opt, votes: alreadyVoted === optionId ? opt.votes : opt.votes + 1 };
            }
            if (alreadyVoted === opt.id) {
              return { ...opt, votes: Math.max(0, opt.votes - 1) };
            }
            return opt;
          });

          const totalVotes = updatedOptions.reduce((acc, curr) => acc + curr.votes, 0);

          return {
            ...msg,
            poll: {
              ...msg.poll,
              options: updatedOptions,
              totalVotes,
              userVotedId: optionId,
            },
          };
        }
        return msg;
      })
    );
  };

  const handleVoteThread = (threadId: string, direction: 'up' | 'down') => {
    setThreads((prev) =>
      prev.map((th) => {
        if (th.id === threadId) {
          const currentVote = th.userVote;
          let delta = 0;
          let newVote: 'up' | 'down' | undefined = undefined;

          if (currentVote === direction) {
            delta = direction === 'up' ? -1 : 1;
            newVote = undefined;
          } else if (currentVote) {
            delta = direction === 'up' ? 2 : -2;
            newVote = direction;
          } else {
            delta = direction === 'up' ? 1 : -1;
            newVote = direction;
          }

          return {
            ...th,
            upvotes: th.upvotes + delta,
            userVote: newVote,
          };
        }
        return th;
      })
    );
  };

  const handleReactMessage = (msgId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId) {
          const existingReaction = msg.reactions?.find((r) => r.emoji === emoji);
          let updatedReactions = msg.reactions || [];

          if (existingReaction) {
            if (existingReaction.userReacted) {
              updatedReactions = updatedReactions
                .map((r) =>
                  r.emoji === emoji ? { ...r, count: r.count - 1, userReacted: false } : r
                )
                .filter((r) => r.count > 0);
            } else {
              updatedReactions = updatedReactions.map((r) =>
                r.emoji === emoji ? { ...r, count: r.count + 1, userReacted: true } : r
              );
            }
          } else {
            updatedReactions = [...updatedReactions, { emoji, count: 1, userReacted: true }];
          }
          return { ...msg, reactions: updatedReactions };
        }
        return msg;
      })
    );
  };

  const handleCreatePollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pollQuestion.trim() || !pollOption1.trim() || !pollOption2.trim() || !activeCircle) return;

    const newMsg: CircleChatMessage = {
      id: `cm-${Date.now()}`,
      circleId: activeCircle.id,
      author: currentUser,
      timestamp: 'Just now',
      text: '📊 Live Community Clinical Decision Poll:',
      poll: {
        id: `poll-${Date.now()}`,
        question: pollQuestion.trim(),
        options: [
          { id: 'opt-1', text: pollOption1.trim(), votes: 1 },
          { id: 'opt-2', text: pollOption2.trim(), votes: 0 },
        ],
        totalVotes: 1,
        userVotedId: 'opt-1',
        explanation: pollExplanation.trim() || undefined,
      },
      reactions: [{ emoji: '📊', count: 1, userReacted: true }],
    };

    setMessages((prev) => [...prev, newMsg]);
    setIsCreatePollOpen(false);
    setPollQuestion('');
    setPollOption1('');
    setPollOption2('');
    setPollExplanation('');
  };

  const handleProposeCircleSubmit = (newCircle: Partial<OdGroup>) => {
    const fullCircle = newCircle as OdGroup;
    setGroupsList((prev) => [fullCircle, ...prev]);
    setActiveCircleId(fullCircle.id);
  };

  return (
    <div className="w-full">
      {/* Create Poll Modal */}
      <AnimatePresence>
        {isCreatePollOpen && (
          <div
            onClick={() => setIsCreatePollOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-blue-500" />
                  <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                    Create Clinical Decision Poll
                  </h3>
                </div>
                <button
                  onClick={() => setIsCreatePollOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePollSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Clinical Question or Dilemma *
                  </label>
                  <input
                    type="text"
                    required
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                    placeholder="e.g., Preferred intervention for 28yo with severe hydrops?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Option 1 *
                  </label>
                  <input
                    type="text"
                    required
                    value={pollOption1}
                    onChange={(e) => setPollOption1(e.target.value)}
                    placeholder="e.g., Hyperosmotic saline + cyclopentolate + bandage CL"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Option 2 *
                  </label>
                  <input
                    type="text"
                    required
                    value={pollOption2}
                    onChange={(e) => setPollOption2(e.target.value)}
                    placeholder="e.g., Urgent intracameral C3F8 gas bubble injection"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Clinical Evidence Note (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={pollExplanation}
                    onChange={(e) => setPollExplanation(e.target.value)}
                    placeholder="Brief rationale or peer study reference..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreatePollOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-sm transition-all cursor-pointer"
                  >
                    Publish Poll
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Propose Circle Modal */}
      <ProposeCircleModal
        isOpen={isProposeModalOpen}
        onClose={() => setIsProposeModalOpen(false)}
        onSubmit={handleProposeCircleSubmit}
      />

      {/* Events & Webinars Calendar Modal */}
      <EventsCalendarModal
        isOpen={isEventsCalendarOpen}
        onClose={() => setIsEventsCalendarOpen(false)}
        events={events}
        onToggleRegister={handleToggleRegisterEvent}
        onSelectCircle={(circleId) => {
          handleSelectCircle(circleId);
        }}
      />

      {/* Main View Router: Hub (Facebook Groups style) VS Workspace (Discord style) */}
      <AnimatePresence mode="wait">
        {!activeCircleId || !activeCircle ? (
          <motion.div
            key="circles-hub"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <CirclesHub
              groups={groupsList}
              currentUser={currentUser}
              events={events}
              onSelectCircle={handleSelectCircle}
              onJoinToggle={handleToggleJoin}
              onOpenProposeModal={() => setIsProposeModalOpen(true)}
              onOpenEventsCalendar={() => setIsEventsCalendarOpen(true)}
              onToggleRegisterEvent={handleToggleRegisterEvent}
              onViewDoctorProfile={onViewDoctorProfile}
            />
          </motion.div>
        ) : (
          <motion.div
            key={`circle-workspace-${activeCircle.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <CircleWorkspace
              circle={activeCircle}
              currentUser={currentUser}
              allDoctors={OTHER_DOCTORS}
              messages={messages}
              threads={threads}
              onBackToHub={handleBackToHub}
              onJoinToggle={handleToggleJoin}
              onViewDoctorProfile={onViewDoctorProfile}
              onSendMessage={handleSendMessage}
              onSendVoiceNote={handleSendVoiceNote}
              onVoteMessagePoll={handleVoteMessagePoll}
              onVoteThread={handleVoteThread}
              onReactMessage={handleReactMessage}
              onOpenCreatePoll={() => setIsCreatePollOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
