import React, { useState } from 'react';
import {
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Bookmark,
  Share2,
  CheckCircle2,
  Sparkles,
  PenTool,
  Clock,
  Eye,
  Send,
  AlertCircle,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
  Lightbulb,
  FileText,
  UserCheck,
  GraduationCap
} from 'lucide-react';
import { ClinicalQuestion, DoctorProfile } from '../../types';
import { DoctorAvatar } from '../common/DoctorAvatar';

interface ConsultCardProps {
  question: ClinicalQuestion;
  currentUser: DoctorProfile;
  onVoteQuestion: (questionId: string, direction: 'up' | 'down') => void;
  onVoteAnswer: (questionId: string, answerId: string, direction: 'up' | 'down') => void;
  onToggleBookmark: (questionId: string) => void;
  onToggleFollow: (questionId: string) => void;
  onSelectConsult: (question: ClinicalQuestion) => void;
  onViewDoctorProfile: (doctorId: string) => void;
  onAddAnswer: (questionId: string, answerText: string, pearls?: string[]) => void;
  onFilterByTopic?: (topicId: string) => void;
}

type CardTab = 'consensus' | 'all-answers' | 'write-opinion';

export const ConsultCard: React.FC<ConsultCardProps> = ({
  question,
  currentUser,
  onVoteQuestion,
  onVoteAnswer,
  onToggleBookmark,
  onToggleFollow,
  onSelectConsult,
  onViewDoctorProfile,
  onAddAnswer,
  onFilterByTopic,
}) => {
  const [activeTab, setActiveTab] = useState<CardTab>('consensus');
  const [isAnswersExpanded, setIsAnswersExpanded] = useState(false);
  const [newAnswerText, setNewAnswerText] = useState('');
  const [newPearlText, setNewPearlText] = useState('');
  const [pearls, setPearls] = useState<string[]>([]);
  const [showFullNarrative, setShowFullNarrative] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [contributorRole, setContributorRole] = useState<'attending' | 'resident' | 'student'>('attending');

  // Top voted answer or accepted answer
  const topAnswer = question.answers.length > 0
    ? [...question.answers].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))[0]
    : null;

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleAddPearl = () => {
    if (!newPearlText.trim()) return;
    setPearls([...pearls, newPearlText.trim()]);
    setNewPearlText('');
  };

  const handleSubmitOpinion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswerText.trim()) return;
    const rolePrefix = contributorRole === 'student' ? '🎓 [Optometry Student Reasoning]: ' : contributorRole === 'resident' ? '🩺 [Resident / Fellow Analysis]: ' : '';
    onAddAnswer(question.id, rolePrefix + newAnswerText.trim(), pearls.length > 0 ? pearls : undefined);
    setNewAnswerText('');
    setPearls([]);
    setActiveTab('all-answers');
    setIsAnswersExpanded(true);
  };

  // Ticket code generated from ID
  const ticketCode = `INQ-${question.id.replace('q-', '').slice(0, 6).toUpperCase()}`;

  return (
    <article className="relative bg-white dark:bg-[#111115] border border-neutral-200/90 dark:border-neutral-800/90 rounded-3xl p-4 sm:p-6 transition-all hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-xl dark:hover:shadow-neutral-950/60 overflow-hidden">
      
      {/* Top Clinical Header Ribbon: Distinguishes this completely from a social post */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-3.5 border-b border-neutral-100 dark:border-neutral-800/80">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          
          {/* Ticket Badge */}
          <span className="font-mono text-[11px] font-bold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/80 px-2 py-0.5 rounded-md tracking-wider">
            {ticketCode}
          </span>

          {/* Subspecialty Topic */}
          <button
            onClick={() => onFilterByTopic?.(question.topicId)}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/70 dark:border-blue-900/70 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors cursor-pointer"
          >
            <Stethoscope className="h-3 w-3" />
            <span>{question.topicName}</span>
          </button>

          {/* Urgency / Consult Type Pill */}
          {question.urgency === 'urgent' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900">
              <AlertCircle className="h-3 w-3" /> STAT Second Opinion
            </span>
          )}
          {question.urgency === 'grand-rounds' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900">
              <Sparkles className="h-3 w-3" /> Grand Rounds
            </span>
          )}
          {question.isStudentFriendly && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-800">
              <span>🎓 Student & Trainee Case</span>
            </span>
          )}

          {/* Status Indicator */}
          {question.answersCount > 0 ? (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {question.answersCount} {question.answersCount === 1 ? 'Peer Answer' : 'Peer Answers'}
            </span>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Awaiting Doctor Opinion
            </span>
          )}
        </div>

        {/* Doctor Inquirer Snapshot & Views */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onViewDoctorProfile(question.author.id)}
              className="font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-500 cursor-pointer truncate max-w-[120px]"
            >
              {question.author.name}
            </button>
            <span>•</span>
            <span className="text-[11px]">{question.createdAt}</span>
          </div>
        </div>
      </div>

      {/* Main Question Headline: Bold, prominent, inviting */}
      <h2
        onClick={() => onSelectConsult(question)}
        className="text-lg sm:text-xl font-extrabold text-neutral-900 dark:text-neutral-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer leading-snug tracking-tight mb-3"
      >
        {question.title}
      </h2>

      {/* Clinical Patient Baseline Data Ribbon (Telemetry Strip) */}
      {question.clinicalData && (
        <div className="mb-3.5 p-3 rounded-2xl bg-neutral-50 dark:bg-[#16161b] border border-neutral-200/80 dark:border-neutral-800/90 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {question.clinicalData.patientAgeSex && (
            <div>
              <span className="text-neutral-400 text-[10px] uppercase font-bold tracking-wider block">Demographics</span>
              <strong className="text-neutral-800 dark:text-neutral-200 font-bold">{question.clinicalData.patientAgeSex}</strong>
            </div>
          )}
          {question.clinicalData.visualAcuity && (
            <div>
              <span className="text-neutral-400 text-[10px] uppercase font-bold tracking-wider block">Visual Acuity</span>
              <strong className="text-neutral-800 dark:text-neutral-200 font-bold">{question.clinicalData.visualAcuity}</strong>
            </div>
          )}
          {question.clinicalData.intraocularPressure && (
            <div>
              <span className="text-neutral-400 text-[10px] uppercase font-bold tracking-wider block">Intraocular Pressure</span>
              <strong className="text-neutral-800 dark:text-neutral-200 font-bold">{question.clinicalData.intraocularPressure}</strong>
            </div>
          )}
          {question.clinicalData.instrumentUsed && (
            <div className="truncate">
              <span className="text-neutral-400 text-[10px] uppercase font-bold tracking-wider block">Diagnostic Modality</span>
              <span className="text-neutral-700 dark:text-neutral-300 font-medium truncate block">{question.clinicalData.instrumentUsed}</span>
            </div>
          )}
        </div>
      )}

      {/* Detailed Clinical Dilemma / Narrative */}
      <div className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3.5">
        <p className={`whitespace-pre-line ${showFullNarrative ? '' : 'line-clamp-3'}`}>
          {question.content}
        </p>
        {question.content.length > 220 && (
          <button
            onClick={() => setShowFullNarrative(!showFullNarrative)}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-flex items-center gap-0.5 cursor-pointer"
          >
            {showFullNarrative ? 'Collapse narrative' : 'Read full clinical background...'}
          </button>
        )}
      </div>

      {/* Attached Scans Preview */}
      {question.images && question.images.length > 0 && (
        <div
          onClick={() => onSelectConsult(question)}
          className="mb-4 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-950 relative group cursor-pointer"
        >
          <img
            src={question.images[0]}
            alt="Clinical scan thumbnail"
            className="w-full h-44 sm:h-60 object-cover group-hover:scale-[1.01] transition-transform opacity-95"
          />
          <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5" />
            <span>Click to inspect high-res scan</span>
          </div>
        </div>
      )}

      {/* Unique In-Card Multi-Tab Diagnostic Interactive Section */}
      <div className="my-4 rounded-2xl border border-neutral-200 dark:border-neutral-800/90 bg-neutral-50/70 dark:bg-[#141419] overflow-hidden">
        
        {/* In-Card Sub-Navigation */}
        <div className="flex items-center border-b border-neutral-200 dark:border-neutral-800/90 bg-neutral-100/70 dark:bg-[#181820] px-3 pt-2 gap-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('consensus')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'consensus'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-[#141419] rounded-t-xl'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Top Consensus Opinion</span>
          </button>

          <button
            onClick={() => setActiveTab('all-answers')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'all-answers'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-[#141419] rounded-t-xl'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>All Doctor Answers ({question.answersCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('write-opinion')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'write-opinion'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-[#141419] rounded-t-xl'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            <PenTool className="h-3.5 w-3.5" />
            <span>Submit Opinion</span>
          </button>
        </div>

        {/* Tab 1: Top Consensus Answer Preview */}
        {activeTab === 'consensus' && (
          <div className="p-4 sm:p-5">
            {topAnswer ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <button
                      onClick={() => onViewDoctorProfile(topAnswer.author.id)}
                      className="shrink-0"
                    >
                      <DoctorAvatar
                        src={topAnswer.author.avatar}
                        name={topAnswer.author.name}
                        size="sm"
                      />
                    </button>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onViewDoctorProfile(topAnswer.author.id)}
                          className="text-xs font-bold text-neutral-900 dark:text-white hover:underline truncate"
                        >
                          {topAnswer.author.name}
                        </button>
                        <span className="text-[11px] text-neutral-500 font-medium">
                          ({topAnswer.author.credentials})
                        </span>
                        {topAnswer.authorRoleBadge && (
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                            {topAnswer.authorRoleBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate">
                        {topAnswer.author.clinicName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                    {topAnswer.isAttendingEndorsed && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                        <CheckCircle2 className="h-3 w-3 text-blue-500" />
                        <span>Attending Endorsed</span>
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      <CheckCircle2 className="h-3 w-3" /> Peer Consensus
                    </span>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-line line-clamp-4">
                  {topAnswer.content}
                </div>

                {topAnswer.clinicalPearlsCited && topAnswer.clinicalPearlsCited.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Clinical Pearl:</strong> {topAnswer.clinicalPearlsCited[0]}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 text-xs">
                  <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                    <span>▲ {topAnswer.upvotes} doctor upvotes</span>
                    <span>•</span>
                    <span>{topAnswer.comments?.length || 0} peer comments</span>
                  </div>

                  <button
                    onClick={() => onSelectConsult(question)}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read full protocol & citations</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center space-y-2">
                <Sparkles className="h-7 w-7 text-amber-500 mx-auto opacity-70" />
                <p className="text-xs text-neutral-600 dark:text-neutral-300 font-semibold">
                  No verified answers yet. Be the first specialist to provide a management opinion!
                </p>
                <button
                  onClick={() => setActiveTab('write-opinion')}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Submit First Opinion
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: All Doctor Answers */}
        {activeTab === 'all-answers' && (
          <div className="p-4 sm:p-5 space-y-3.5">
            {question.answers.length === 0 ? (
              <p className="text-xs text-neutral-500 text-center py-3">
                No answers posted yet. Click 'Submit Opinion' to contribute.
              </p>
            ) : (
              question.answers.map((ans) => (
                <div key={ans.id} className="p-3.5 rounded-xl bg-white dark:bg-[#111116] border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <DoctorAvatar
                        src={ans.author.avatar}
                        name={ans.author.name}
                        size="xs"
                      />
                      <button
                        onClick={() => onViewDoctorProfile(ans.author.id)}
                        className="text-xs font-bold text-neutral-900 dark:text-white hover:underline"
                      >
                        {ans.author.name}
                      </button>
                      <span className="text-[10px] text-neutral-400">
                        {ans.author.credentials}
                      </span>
                      {ans.authorRoleBadge && (
                        <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                          {ans.authorRoleBadge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {ans.isAttendingEndorsed && (
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Endorsed Reasoning</span>
                        </span>
                      )}

                      {/* Upvote Pill for Answer */}
                      <div className="flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-xs font-bold">
                        <button
                          onClick={() => onVoteAnswer(question.id, ans.id, 'up')}
                          className={`p-0.5 hover:text-blue-500 ${ans.userVote === 'up' ? 'text-blue-600' : 'text-neutral-500'}`}
                        >
                          <ArrowUp className="h-3 w-3" />
                        </button>
                        <span className="mx-1 text-[11px]">{ans.upvotes}</span>
                        <button
                          onClick={() => onVoteAnswer(question.id, ans.id, 'down')}
                          className={`p-0.5 hover:text-red-500 ${ans.userVote === 'down' ? 'text-red-600' : 'text-neutral-500'}`}
                        >
                          <ArrowDown className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed line-clamp-3">
                    {ans.content}
                  </p>
                </div>
              ))
            )}
            
            {question.answers.length > 0 && (
              <button
                onClick={() => onSelectConsult(question)}
                className="w-full py-2 text-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 rounded-xl transition-colors"
              >
                Expand all discussions in deep-dive drawer →
              </button>
            )}
          </div>
        )}

        {/* Tab 3: Write Your Opinion */}
        {activeTab === 'write-opinion' && (
          <form onSubmit={handleSubmitOpinion} className="p-4 sm:p-5 space-y-3.5">
            
            {/* Trainee Inclusive Welcome Card */}
            <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5">
              <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-extrabold block">All Training Levels Welcome (Students, Residents & Specialists):</span>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 leading-relaxed font-normal">
                  Share your clinical reasoning, propose differential diagnoses, or cite textbook pearls. Attending ODs review and endorse top trainee contributions!
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-neutral-500">Contributing As:</span>
                <button
                  type="button"
                  onClick={() => setContributorRole('attending')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                    contributorRole === 'attending'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  Attending OD
                </button>
                <button
                  type="button"
                  onClick={() => setContributorRole('resident')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                    contributorRole === 'resident'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  🩺 Resident
                </button>
                <button
                  type="button"
                  onClick={() => setContributorRole('student')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                    contributorRole === 'student'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  🎓 Optom Student
                </button>
              </div>

              <span className="text-[10px] text-neutral-400">
                {currentUser.name} ({currentUser.credentials})
              </span>
            </div>

            <textarea
              required
              rows={3}
              value={newAnswerText}
              onChange={(e) => setNewAnswerText(e.target.value)}
              placeholder={
                contributorRole === 'student'
                  ? "Share your differential diagnosis, board prep pearls, or learning question for attendings..."
                  : "Detail your clinical reasoning, diagnostic pearls, or recommended therapy..."
              }
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#101014] text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-y"
            />

            {/* Optional Pearl Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newPearlText}
                onChange={(e) => setNewPearlText(e.target.value)}
                placeholder="Key study or guideline cited (optional)..."
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#101014] text-neutral-900 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddPearl}
                disabled={!newPearlText.trim()}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 disabled:opacity-50 transition-colors"
              >
                + Add Pearl
              </button>
            </div>

            {pearls.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {pearls.map((p, idx) => (
                  <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    {p}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setActiveTab('consensus')}
                className="px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newAnswerText.trim()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white shadow-xs transition-all"
              >
                <Send className="h-3 w-3" />
                <span>Publish Peer Opinion</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Bottom Medical Action Bar */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
        
        {/* Left: Quora Signature Upvote/Downvote */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800/80 p-0.5 border border-neutral-200/80 dark:border-neutral-700/80">
            <button
              onClick={() => onVoteQuestion(question.id, 'up')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                question.userVote === 'up'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/80 dark:hover:bg-neutral-700'
              }`}
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>Upvote</span>
              <span className="font-extrabold ml-0.5">{question.upvotes}</span>
            </button>
            <div className="w-[1px] h-3.5 bg-neutral-300 dark:bg-neutral-700 mx-0.5" />
            <button
              onClick={() => onVoteQuestion(question.id, 'down')}
              className={`p-1.5 rounded-full text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-200/80 dark:hover:bg-neutral-700 transition-colors cursor-pointer ${
                question.userVote === 'down' ? 'text-red-500 font-bold' : ''
              }`}
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Quick Answer Toggle */}
          <button
            onClick={() => setActiveTab(activeTab === 'write-opinion' ? 'consensus' : 'write-opinion')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            <PenTool className="h-3.5 w-3.5" />
            <span>Answer</span>
            <span className="px-1.5 py-0.2 rounded-full bg-neutral-200/60 dark:bg-neutral-700 text-[10px]">
              {question.answersCount}
            </span>
          </button>

          {/* Follow Inquiry */}
          <button
            onClick={() => onToggleFollow(question.id)}
            className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              question.isFollowed
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30'
                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            <span>{question.isFollowed ? '✓ Following' : '+ Follow'}</span>
          </button>
        </div>

        {/* Right: Bookmark + Share + Deep Dive Drawer */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleBookmark(question.id)}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              question.isBookmarked
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
            title={question.isBookmarked ? 'Saved to Personal Vault' : 'Save to Study Vault'}
          >
            <Bookmark className={`h-4 w-4 ${question.isBookmarked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer relative"
          >
            <Share2 className="h-4 w-4" />
            {copiedShare && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-neutral-900 text-white text-[10px] rounded shadow-md whitespace-nowrap animate-in fade-in">
                Link copied!
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectConsult(question)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-full transition-colors cursor-pointer"
          >
            <span>Deep Dive</span>
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>

    </article>
  );
};
