import React, { useState, useMemo, useEffect } from 'react';
import {
  Hash,
  Volume2,
  BarChart2,
  FileText,
  Award,
  MessageSquare,
  Send,
  Mic,
  Paperclip,
  Image as ImageIcon,
  Smile,
  Share2,
  Bell,
  BellOff,
  ChevronLeft,
  Download,
  Check,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Radio,
  Play,
  Pause,
  Clock,
  Sparkles,
  ShieldCheck,
  Users,
  Search,
  X,
  Plus,
  BookOpen,
  HelpCircle,
  AlertCircle,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  OdGroup,
  DoctorProfile,
  CircleChatMessage,
  CircleThread,
  CircleChannel,
} from '../../types';

interface CircleWorkspaceProps {
  circle: OdGroup;
  currentUser: DoctorProfile;
  allDoctors: DoctorProfile[];
  messages: CircleChatMessage[];
  threads: CircleThread[];
  onBackToHub: () => void;
  onJoinToggle: (groupId: string) => void;
  onViewDoctorProfile?: (doctorId: string) => void;
  onSendMessage: (text: string, channelId?: string) => void;
  onSendVoiceNote: (duration: string, channelId?: string) => void;
  onVoteMessagePoll: (msgId: string, optionId: string) => void;
  onVoteThread: (threadId: string, direction: 'up' | 'down') => void;
  onReactMessage: (msgId: string, emoji: string) => void;
  onOpenCreatePoll: () => void;
}

export const CircleWorkspace: React.FC<CircleWorkspaceProps> = ({
  circle,
  currentUser,
  allDoctors,
  messages,
  threads,
  onBackToHub,
  onJoinToggle,
  onViewDoctorProfile,
  onSendMessage,
  onSendVoiceNote,
  onVoteMessagePoll,
  onVoteThread,
  onReactMessage,
  onOpenCreatePoll,
}) => {
  // Available channels for this circle (fallback to standard set if none)
  const channels: CircleChannel[] = useMemo(() => {
    if (circle.channels && circle.channels.length > 0) {
      return circle.channels;
    }
    return [
      { id: 'ch-announcements', name: 'announcements-protocols', description: 'Official protocols and nomograms', category: 'protocols' },
      { id: 'ch-triage', name: 'acute-triage', description: 'Real-time peer second opinions and urgent chairside consults', category: 'text' },
      { id: 'ch-polls', name: 'clinical-polls', description: 'Consensus voting and diagnostic dilemma quizzes', category: 'polls' },
      { id: 'ch-voice', name: 'voice-pearls', description: 'Audio case notes from chairside practice', category: 'voice' },
      { id: 'ch-rounds', name: 'grand-rounds', description: 'In-depth Reddit/Discord style case debates', category: 'grand-rounds' },
    ];
  }, [circle]);

  // Selected Channel State
  const [activeChannelId, setActiveChannelId] = useState<string>(channels[0]?.id || 'ch-triage');

  const activeChannel = useMemo(() => {
    return channels.find((c) => c.id === activeChannelId) || channels[0];
  }, [channels, activeChannelId]);

  // Channel Category Groups (Discord style)
  const channelCategories = useMemo(() => {
    const protocols = channels.filter((c) => c.category === 'protocols' || c.category === 'announcements');
    const textChannels = channels.filter((c) => c.category === 'text');
    const polls = channels.filter((c) => c.category === 'polls');
    const voice = channels.filter((c) => c.category === 'voice');
    const grandRounds = channels.filter((c) => c.category === 'grand-rounds');

    return [
      { label: 'ANNOUNCEMENTS & PROTOCOLS', channels: protocols },
      { label: 'CASE & TRIAGE CHANNELS', channels: textChannels },
      { label: 'CONSENSUS & POLLS', channels: polls },
      { label: 'AUDIO & VOICE PEARLS', channels: voice },
      { label: 'GRAND ROUNDS & DEBATES', channels: grandRounds },
    ].filter((cat) => cat.channels.length > 0);
  }, [channels]);

  // Workspace Local States
  const [isMuted, setIsMuted] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [showMembersDrawer, setShowMembersDrawer] = useState(true);

  // Input states
  const [messageInput, setMessageInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<'1x' | '1.5x' | '2x'>('1x');

  // Timer for voice note simulation
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Filter messages for current circle
  const circleMessages = useMemo(() => {
    return messages.filter((m) => m.circleId === circle.id || !m.circleId);
  }, [messages, circle.id]);

  // Filter threads for current circle
  const circleThreads = useMemo(() => {
    return threads.filter((t) => t.circleId === circle.id || !t.circleId);
  }, [threads, circle.id]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    onSendMessage(messageInput.trim(), activeChannel.id);
    setMessageInput('');
  };

  const handleFinishVoiceRecord = () => {
    setIsRecording(false);
    const duration = `0:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds}`;
    onSendVoiceNote(duration, activeChannel.id);
    setRecordingSeconds(0);
  };

  const handleDownloadProtocol = (title: string) => {
    setDownloadToast(`Downloaded: ${title}`);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  const handleShareInvite = () => {
    setShareToast(`Invite link copied for ${circle.name}`);
    setTimeout(() => setShareToast(null), 2500);
  };

  return (
    <div className="w-full space-y-4">
      {/* Toast Notification */}
      <AnimatePresence>
        {(downloadToast || shareToast) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold"
          >
            {downloadToast ? <Download className="h-4 w-4 text-emerald-400" /> : <Check className="h-4 w-4 text-blue-400" />}
            <span>{downloadToast || shareToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full cursor-pointer transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <img
                src={lightboxImage}
                alt="High-resolution clinical scan"
                className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
              />
              <span className="mt-3 text-xs text-neutral-300 font-mono">
                Click background or close button to dismiss scan
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rules & Guidelines Modal */}
      <AnimatePresence>
        {showRulesModal && (
          <div
            onClick={() => setShowRulesModal(false)}
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
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                    Community Guidelines & HIPAA Rules
                  </h3>
                </div>
                <button
                  onClick={() => setShowRulesModal(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-neutral-600 dark:text-neutral-300">
                {circle.rules && circle.rules.length > 0 ? (
                  circle.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{rule}</p>
                    </div>
                  ))
                ) : (
                  <p>Standard peer review rules apply: All scans must be de-identified and HIPAA compliant.</p>
                )}
              </div>

              <button
                onClick={() => setShowRulesModal(false)}
                className="w-full py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold cursor-pointer"
              >
                I Understand & Agree
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Top Breadcrumb & Community Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-neutral-900 px-4 py-3 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
        {/* Left: Back Button & Community Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHub}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>All Circles Hub</span>
          </button>

          <div className="h-4 w-[1px] bg-neutral-200 dark:bg-neutral-700" />

          <div className="flex items-center gap-2">
            <span className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white line-clamp-1">
              {circle.name}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-semibold border border-blue-200 dark:border-blue-900">
              {circle.category}
            </span>
          </div>
        </div>

        {/* Right: Actions (Mute, Share, Join toggle) */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Unmute Circle' : 'Mute Circle'}
            className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            {isMuted ? <BellOff className="h-4 w-4 text-amber-500" /> : <Bell className="h-4 w-4" />}
          </button>

          <button
            onClick={handleShareInvite}
            title="Share Invite Link"
            className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
          </button>

          <button
            onClick={() => onJoinToggle(circle.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              circle.isJoined
                ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
            }`}
          >
            {circle.isJoined ? 'Joined ✓' : '+ Join Community'}
          </button>

          <button
            onClick={() => setShowMembersDrawer(!showMembersDrawer)}
            title="Toggle Members Sidebar"
            className={`p-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              showMembersDrawer
                ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
            }`}
          >
            <Users className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Community Artwork Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md">
        <div className="relative h-28 sm:h-32 w-full">
          <img
            src={circle.coverImage}
            alt={circle.name}
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

          {/* Banner Contents */}
          <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-white">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-extrabold tracking-tight drop-shadow-md">
                    {circle.name}
                  </h2>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-neutral-900/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {circle.activeOnline || 48} Online
                  </span>
                </div>
                <p className="text-xs text-neutral-300 line-clamp-1 max-w-2xl">
                  {circle.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowRulesModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs font-semibold text-white border border-white/20 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Rules & HIPAA</span>
                </button>

                {circle.pinnedProtocol && (
                  <button
                    onClick={() => handleDownloadProtocol(circle.pinnedProtocol!.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600/80 hover:bg-blue-600 backdrop-blur-md text-xs font-semibold text-white border border-blue-400/30 transition-colors cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Nomogram PDF</span>
                    <span className="sm:hidden">PDF</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Discord-Inspired Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT CHANNEL RAIL (Discord Server Channels) - 3 Columns on large screens */}
        <div className="lg:col-span-3 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-3 flex flex-col justify-between shadow-sm space-y-4">
          <div className="space-y-4">
            {/* Server Header */}
            <div className="px-2 py-1.5 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 tracking-wide uppercase flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
                <span>Channels Rail</span>
              </span>
              <span className="text-[10px] font-bold text-neutral-400">
                {channels.length} Total
              </span>
            </div>

            {/* Channels Categorized List */}
            <div className="space-y-4">
              {channelCategories.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <div className="px-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    {group.label}
                  </div>
                  <div className="space-y-0.5">
                    {group.channels.map((ch) => {
                      const isActive = ch.id === activeChannel.id;
                      let IconComponent = Hash;
                      if (ch.category === 'protocols' || ch.category === 'announcements') IconComponent = FileText;
                      if (ch.category === 'polls') IconComponent = BarChart2;
                      if (ch.category === 'voice') IconComponent = Volume2;
                      if (ch.category === 'grand-rounds') IconComponent = Award;

                      return (
                        <button
                          key={ch.id}
                          onClick={() => setActiveChannelId(ch.id)}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/80'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <IconComponent className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                            <span className="truncate">{ch.name}</span>
                          </div>

                          {ch.unreadCount && ch.unreadCount > 0 && (
                            <span
                              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold shrink-0 ${
                                isActive ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
                              }`}
                            >
                              {ch.unreadCount}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Doctor Status Bar at Bottom of Rail (Discord Style) */}
          <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-700/50 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-900" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 truncate">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-neutral-400 truncate">
                  {currentUser.credentials} • Online
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER MAIN STAGE (Active Channel Content) */}
        <div
          className={`${
            showMembersDrawer ? 'lg:col-span-6 xl:col-span-6' : 'lg:col-span-9 xl:col-span-9'
          } bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-4 sm:p-5 flex flex-col justify-between shadow-sm min-h-[480px] lg:min-h-[640px]`}
        >
          {/* Active Channel Header */}
          <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                <Hash className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <span>#{activeChannel.name}</span>
                </h3>
                <p className="text-[11px] text-neutral-500 line-clamp-1">
                  {activeChannel.description}
                </p>
              </div>
            </div>

            {/* Quick Action Button based on category */}
            {activeChannel.category === 'polls' && (
              <button
                onClick={onOpenCreatePoll}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Poll</span>
              </button>
            )}
          </div>

          {/* CHANNEL CONTENT VIEWS */}
          <div className="flex-1 py-4 overflow-y-auto space-y-4 max-h-[520px]">
            {/* VIEW A: Protocols Channel */}
            {(activeChannel.category === 'protocols' || activeChannel.category === 'announcements') && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200/50 dark:border-blue-900/40 flex items-start gap-3">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                      Verified Clinical PDF Guidelines & Nomograms
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300">
                      Standardized clinical nomograms curated by subspecialty fellows. Download and use at the chairside.
                    </p>
                  </div>
                </div>

                {circle.pinnedProtocol && (
                  <div className="p-4 rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center font-bold text-xs shrink-0">
                        PDF
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white truncate">
                          {circle.pinnedProtocol.title}
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          {circle.pinnedProtocol.size} • {circle.pinnedProtocol.downloads.toLocaleString()} clinical downloads
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownloadProtocol(circle.pinnedProtocol!.title)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shrink-0 cursor-pointer shadow-sm"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* VIEW B: Polls Channel */}
            {activeChannel.category === 'polls' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    Live Clinical Decision Consensus Polls
                  </span>
                  <button
                    onClick={onOpenCreatePoll}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Create Poll</span>
                  </button>
                </div>

                {/* Render polls found in messages or default polls */}
                {circleMessages
                  .filter((m) => m.poll)
                  .map((msg) => (
                    <div
                      key={msg.id}
                      className="p-4 rounded-2xl bg-white dark:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-700 shadow-sm space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                          <BarChart2 className="h-4 w-4 text-blue-500" />
                          <span>{msg.poll!.question}</span>
                        </span>
                        <span className="text-neutral-400 text-[11px]">
                          {msg.poll!.totalVotes} votes
                        </span>
                      </div>

                      <div className="space-y-2 pt-1">
                        {msg.poll!.options.map((option) => {
                          const percentage =
                            msg.poll!.totalVotes > 0
                              ? Math.round((option.votes / msg.poll!.totalVotes) * 100)
                              : 0;
                          const hasVotedThis = msg.poll!.userVotedId === option.id;

                          return (
                            <button
                              key={option.id}
                              onClick={() => onVoteMessagePoll(msg.id, option.id)}
                              className={`w-full relative overflow-hidden rounded-xl p-3 text-left text-xs font-medium border transition-all cursor-pointer ${
                                hasVotedThis
                                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 font-bold'
                                  : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 bg-neutral-50 dark:bg-neutral-800'
                              }`}
                            >
                              <div
                                className="absolute left-0 top-0 bottom-0 bg-blue-500/15 dark:bg-blue-500/25 transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                              <div className="relative flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                  {hasVotedThis && <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                                  <span>{option.text}</span>
                                </span>
                                <span className="font-bold text-neutral-600 dark:text-neutral-300">
                                  {percentage}% ({option.votes})
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {msg.poll!.explanation && (
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 italic pt-1">
                          Evidence note: {msg.poll!.explanation}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            )}

            {/* VIEW C: Grand Rounds Case Debates */}
            {activeChannel.category === 'grand-rounds' && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
                  Threaded Case Consults & Differential Discussions
                </span>

                {circleThreads.map((thread) => {
                  const hasUpvoted = thread.userVote === 'up';
                  const hasDownvoted = thread.userVote === 'down';

                  return (
                    <div
                      key={thread.id}
                      className="p-4 rounded-2xl bg-white dark:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-700 shadow-sm space-y-3"
                    >
                      {/* Thread Top */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={thread.author.avatar}
                            alt={thread.author.name}
                            onClick={() => onViewDoctorProfile && onViewDoctorProfile(thread.author.id)}
                            className="h-7 w-7 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-blue-500"
                          />
                          <div>
                            <span
                              onClick={() => onViewDoctorProfile && onViewDoctorProfile(thread.author.id)}
                              className="text-xs font-bold text-neutral-900 dark:text-white cursor-pointer hover:underline"
                            >
                              {thread.author.name}
                            </span>
                            <span className="text-[10px] text-neutral-400 ml-1.5">
                              {thread.createdAt}
                            </span>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                          {thread.flair}
                        </span>
                      </div>

                      {/* Thread Title & Content */}
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white leading-snug">
                          {thread.title}
                        </h4>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
                          {thread.content}
                        </p>
                      </div>

                      {/* Optional Thread Image */}
                      {thread.image && (
                        <div
                          onClick={() => setLightboxImage(thread.image!)}
                          className="relative h-44 rounded-xl overflow-hidden cursor-zoom-in group"
                        >
                          <img
                            src={thread.image}
                            alt="Case scan"
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-mono">
                            Click to Inspect
                          </div>
                        </div>
                      )}

                      {/* Voting & Comments Bar */}
                      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-700/50 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1">
                          <button
                            onClick={() => onVoteThread(thread.id, 'up')}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              hasUpvoted ? 'bg-emerald-500 text-white font-bold' : 'hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                            }`}
                          >
                            <ThumbsUp className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-2 font-bold text-xs text-neutral-800 dark:text-neutral-200">
                            {thread.upvotes}
                          </span>
                          <button
                            onClick={() => onVoteThread(thread.id, 'down')}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              hasDownvoted ? 'bg-rose-500 text-white font-bold' : 'hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                            }`}
                          >
                            <ThumbsDown className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5 text-neutral-500 font-semibold text-xs">
                          <MessageSquare className="h-3.5 w-3.5 text-blue-500" />
                          <span>{thread.commentsCount} Peer Responses</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* VIEW D: Voice Pearls Feed */}
            {activeChannel.category === 'voice' && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
                  Chairside Clinical Voice Memos & Audio Pearls
                </span>

                {circleMessages
                  .filter((m) => m.voiceNote)
                  .map((msg) => {
                    const isPlaying = playingVoiceId === msg.id;

                    return (
                      <div
                        key={msg.id}
                        className="p-4 rounded-2xl bg-white dark:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-700 shadow-sm space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={msg.author.avatar}
                              alt={msg.author.name}
                              className="h-7 w-7 rounded-full object-cover"
                            />
                            <div>
                              <span className="text-xs font-bold text-neutral-900 dark:text-white">
                                {msg.author.name}
                              </span>
                              <span className="text-[10px] text-neutral-400 ml-1.5">
                                {msg.timestamp}
                              </span>
                            </div>
                          </div>
                          <span className="text-[11px] font-mono text-neutral-500 font-bold">
                            {msg.voiceNote!.duration}
                          </span>
                        </div>

                        {/* Audio Waveform Player Card */}
                        <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-900/40 flex items-center gap-3">
                          <button
                            onClick={() => setPlayingVoiceId(isPlaying ? null : msg.id)}
                            className="h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shrink-0 cursor-pointer shadow-md transition-all active:scale-95"
                          >
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                          </button>

                          {/* Simulated Waveform Bars */}
                          <div className="flex-1 flex items-center gap-1 h-6">
                            {msg.voiceNote!.waveform.map((bar, i) => (
                              <div
                                key={i}
                                className={`w-1 rounded-full transition-all duration-300 ${
                                  isPlaying ? 'bg-blue-600 dark:bg-blue-400 animate-pulse' : 'bg-blue-300 dark:bg-blue-800'
                                }`}
                                style={{ height: `${Math.max(20, bar * 0.25)}px` }}
                              />
                            ))}
                          </div>

                          {/* Playback speed toggle */}
                          <button
                            onClick={() => {
                              const speeds: ('1x' | '1.5x' | '2x')[] = ['1x', '1.5x', '2x'];
                              const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                              setPlaybackSpeed(speeds[nextIdx]);
                            }}
                            className="px-2 py-1 rounded-md bg-white dark:bg-neutral-800 text-[10px] font-bold text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 cursor-pointer"
                          >
                            {playbackSpeed}
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            {/* VIEW E: Standard Text / Triage Chat Messages */}
            {activeChannel.category === 'text' && (
              <div className="space-y-4">
                {/* Encrypted consult disclaimers */}
                <div className="py-1 px-3 rounded-full bg-neutral-100 dark:bg-neutral-800/80 text-[11px] text-neutral-500 flex items-center justify-center gap-1.5 w-fit mx-auto border border-neutral-200/50 dark:border-neutral-700/50">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Peer-to-peer consult encryption • HIPAA De-identified</span>
                </div>

                {circleMessages.map((msg) => {
                  const isAuthor = msg.author.id === currentUser.id;

                  return (
                    <div key={msg.id} className="space-y-1">
                      <div className="flex items-start gap-2.5">
                        <img
                          src={msg.author.avatar}
                          alt={msg.author.name}
                          onClick={() => onViewDoctorProfile && onViewDoctorProfile(msg.author.id)}
                          className="h-8 w-8 rounded-full object-cover shrink-0 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                        />

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              onClick={() => onViewDoctorProfile && onViewDoctorProfile(msg.author.id)}
                              className="text-xs font-bold text-neutral-900 dark:text-white cursor-pointer hover:underline"
                            >
                              {msg.author.name}
                            </span>
                            <span className="text-[10px] font-semibold text-neutral-400">
                              {msg.author.credentials}
                            </span>
                            <span className="text-[10px] text-neutral-400 ml-auto">
                              {msg.timestamp}
                            </span>
                          </div>

                          {/* Message Body */}
                          <div className="p-3 rounded-2xl rounded-tl-sm bg-neutral-50 dark:bg-neutral-800/90 border border-neutral-100 dark:border-neutral-700/60 text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed space-y-2">
                            <p>{msg.text}</p>

                            {/* Image Attachment */}
                            {msg.image && (
                              <div
                                onClick={() => setLightboxImage(msg.image!)}
                                className="relative rounded-xl overflow-hidden cursor-zoom-in max-w-sm border border-neutral-200 dark:border-neutral-700 group"
                              >
                                <img
                                  src={msg.image}
                                  alt="Clinical scan"
                                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                                  Click to Zoom
                                </div>
                              </div>
                            )}

                            {/* Voice Note Attachment */}
                            {msg.voiceNote && (
                              <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-900/40 flex items-center gap-2.5">
                                <button
                                  onClick={() => setPlayingVoiceId(playingVoiceId === msg.id ? null : msg.id)}
                                  className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 cursor-pointer"
                                >
                                  {playingVoiceId === msg.id ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
                                </button>
                                <div className="flex-1 flex items-center gap-0.5 h-4">
                                  {msg.voiceNote.waveform.map((w, idx) => (
                                    <div
                                      key={idx}
                                      className="w-1 bg-blue-500 rounded-full"
                                      style={{ height: `${Math.max(10, w * 0.16)}px` }}
                                    />
                                  ))}
                                </div>
                                <span className="text-[10px] font-mono text-neutral-500">
                                  {msg.voiceNote.duration}
                                </span>
                              </div>
                            )}

                            {/* Telegram / Discord Poll in text channel */}
                            {msg.poll && (
                              <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 space-y-2">
                                <p className="font-bold text-xs text-neutral-900 dark:text-white">
                                  📊 {msg.poll.question}
                                </p>
                                <div className="space-y-1.5">
                                  {msg.poll.options.map((opt) => (
                                    <button
                                      key={opt.id}
                                      onClick={() => onVoteMessagePoll(msg.id, opt.id)}
                                      className={`w-full p-2 rounded-lg text-left text-[11px] font-medium border flex items-center justify-between transition-colors cursor-pointer ${
                                        msg.poll!.userVotedId === opt.id
                                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 font-bold'
                                          : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50'
                                      }`}
                                    >
                                      <span>{opt.text}</span>
                                      <span className="font-bold">{opt.votes}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Reaction Chips */}
                          <div className="flex items-center gap-1.5 pt-0.5">
                            {msg.reactions?.map((rx, rIdx) => (
                              <button
                                key={rIdx}
                                onClick={() => onReactMessage(msg.id, rx.emoji)}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] border transition-colors cursor-pointer ${
                                  rx.userReacted
                                    ? 'bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold'
                                    : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300'
                                }`}
                              >
                                <span>{rx.emoji}</span>
                                <span>{rx.count}</span>
                              </button>
                            ))}

                            {/* Add reaction quick buttons */}
                            <button
                              onClick={() => onReactMessage(msg.id, '🔬')}
                              className="px-1.5 py-0.5 rounded-md text-[11px] text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                              title="React with 🔬"
                            >
                              +🔬
                            </button>
                            <button
                              onClick={() => onReactMessage(msg.id, '💡')}
                              className="px-1.5 py-0.5 rounded-md text-[11px] text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                              title="React with 💡"
                            >
                              +💡
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* CHANNEL BOTTOM INPUT BAR (WhatsApp / Discord style) */}
          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
            {isRecording ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-600 animate-ping" />
                  <span className="font-bold text-xs">
                    Recording Chairside Voice Pearl: 0:{recordingSeconds < 10 ? '0' : ''}{recordingSeconds}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsRecording(false)}
                    className="px-3 py-1 rounded-xl text-xs font-semibold text-neutral-500 hover:bg-rose-100 dark:hover:bg-rose-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFinishVoiceRecord}
                    className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-sm cursor-pointer"
                  >
                    Send Audio
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-neutral-400">
                  <button
                    type="button"
                    onClick={() => onOpenCreatePoll()}
                    title="Create clinical decision poll"
                    className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-blue-500 transition-colors cursor-pointer"
                  >
                    <BarChart2 className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRecording(true)}
                    title="Record chairside audio note"
                    className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Mic className="h-4 w-4" />
                  </button>
                </div>

                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={`Message #${activeChannel.name}...`}
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none transition-all"
                />

                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="p-2.5 rounded-2xl bg-blue-600 disabled:opacity-40 hover:bg-blue-500 text-white transition-all cursor-pointer shadow-sm shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT MEMBER PANEL (Discord style Member List) - 3 Columns */}
        {showMembersDrawer && (
          <div className="lg:col-span-3 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-3 flex flex-col justify-between shadow-sm space-y-4">
            <div className="space-y-4">
              <div className="px-2 py-1.5 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 tracking-wide uppercase flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-blue-500" />
                  <span>Members</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-500">
                  {circle.activeOnline || 24} Online
                </span>
              </div>

              {/* Online Doctors List */}
              <div className="space-y-3">
                <span className="px-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Online Clinicians & Fellows
                </span>

                <div className="space-y-1">
                  {allDoctors.slice(0, 5).map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => onViewDoctorProfile && onViewDoctorProfile(doc.id)}
                      className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2.5 cursor-pointer transition-colors group"
                    >
                      <div className="relative shrink-0">
                        <img
                          src={doc.avatar}
                          alt={doc.name}
                          className="h-8 w-8 rounded-full object-cover group-hover:ring-2 group-hover:ring-blue-500"
                        />
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-900" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-neutral-900 dark:text-white truncate group-hover:text-blue-500 transition-colors">
                          {doc.name}
                        </p>
                        <p className="text-[10px] text-neutral-400 truncate">
                          {doc.credentials} • {doc.subspecialtyCategory}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Offline Section */}
                <span className="px-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider block pt-2">
                  Offline Members ({(circle.membersCount - (circle.activeOnline || 24)).toLocaleString()})
                </span>

                <div className="space-y-1">
                  {allDoctors.slice(5, 7).map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => onViewDoctorProfile && onViewDoctorProfile(doc.id)}
                      className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2.5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        className="h-7 w-7 rounded-full object-cover grayscale"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200 truncate">
                          {doc.name}
                        </p>
                        <p className="text-[10px] text-neutral-400 truncate">
                          {doc.credentials}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Community Security Info */}
            <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700/50 text-[10px] text-neutral-500 space-y-1">
              <div className="flex items-center gap-1 text-emerald-600 font-bold">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Verified Peer Network</span>
              </div>
              <p>Only verified OD & MD clinicians are granted posting rights in this circle.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
