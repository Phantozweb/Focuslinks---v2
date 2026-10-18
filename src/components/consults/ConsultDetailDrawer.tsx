import React, { useState } from 'react';
import {
  X,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Bookmark,
  Share2,
  CheckCircle2,
  Sparkles,
  Send,
  Plus,
  AlertCircle,
  Eye,
  ShieldCheck,
  ThumbsUp,
  Lightbulb,
  ExternalLink,
  Stethoscope,
  Maximize2,
  GraduationCap
} from 'lucide-react';
import { ClinicalQuestion, DoctorProfile } from '../../types';
import { DoctorAvatar } from '../common/DoctorAvatar';

interface ConsultDetailDrawerProps {
  question: ClinicalQuestion | null;
  isOpen: boolean;
  onClose: () => void;
  currentUser: DoctorProfile;
  onVoteQuestion: (questionId: string, direction: 'up' | 'down') => void;
  onVoteAnswer: (questionId: string, answerId: string, direction: 'up' | 'down') => void;
  onToggleBookmark: (questionId: string) => void;
  onToggleFollow: (questionId: string) => void;
  onAddAnswer: (questionId: string, answerText: string, pearls?: string[]) => void;
  onAddCommentToAnswer: (questionId: string, answerId: string, commentText: string) => void;
  onLikeAnswerComment: (questionId: string, answerId: string, commentId: string) => void;
  onViewDoctorProfile: (doctorId: string) => void;
}

export const ConsultDetailDrawer: React.FC<ConsultDetailDrawerProps> = ({
  question,
  isOpen,
  onClose,
  currentUser,
  onVoteQuestion,
  onVoteAnswer,
  onToggleBookmark,
  onToggleFollow,
  onAddAnswer,
  onAddCommentToAnswer,
  onLikeAnswerComment,
  onViewDoctorProfile,
}) => {
  const [newAnswerText, setNewAnswerText] = useState('');
  const [newPearlInput, setNewPearlInput] = useState('');
  const [pearlsList, setPearlsList] = useState<string[]>([]);
  const [replyingToAnswerId, setReplyingToAnswerId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sortBy, setSortBy] = useState<'upvotes' | 'recent'>('upvotes');
  const [copiedLink, setCopiedLink] = useState(false);
  const [contributorRole, setContributorRole] = useState<'attending' | 'resident' | 'student'>('attending');

  if (!isOpen || !question) return null;

  const handleAddPearl = () => {
    if (!newPearlInput.trim()) return;
    setPearlsList([...pearlsList, newPearlInput.trim()]);
    setNewPearlInput('');
  };

  const handleRemovePearl = (index: number) => {
    setPearlsList(pearlsList.filter((_, i) => i !== index));
  };

  const handlePostAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswerText.trim()) return;
    const rolePrefix = contributorRole === 'student' ? '🎓 [Optometry Student Reasoning]: ' : contributorRole === 'resident' ? '🩺 [Resident / Fellow Analysis]: ' : '';
    onAddAnswer(question.id, rolePrefix + newAnswerText.trim(), pearlsList.length > 0 ? pearlsList : undefined);
    setNewAnswerText('');
    setPearlsList([]);
  };

  const handlePostReply = (answerId: string) => {
    if (!replyText.trim()) return;
    onAddCommentToAnswer(question.id, answerId, replyText.trim());
    setReplyText('');
    setReplyingToAnswerId(null);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const sortedAnswers = [...question.answers].sort((a, b) => {
    if (sortBy === 'upvotes') {
      return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
    }
    return b.id.localeCompare(a.id);
  });

  const ticketCode = `INQ-${question.id.replace('q-', '').slice(0, 6).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-out Full Height Drawer (Tablet/Desktop: slide from right 640px to 800px; Mobile: full width) */}
      <div className="relative w-full sm:max-w-2xl lg:max-w-3xl h-full bg-white dark:bg-[#101014] border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-20 px-5 py-4 bg-white/95 dark:bg-[#101014]/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="font-mono text-xs font-bold text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
              {ticketCode}
            </span>

            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/80 flex items-center gap-1">
              <Stethoscope className="h-3 w-3" />
              <span>{question.topicName}</span>
            </span>

            {question.urgency === 'urgent' && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200">
                STAT
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onToggleFollow(question.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                question.isFollowed
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
              }`}
            >
              {question.isFollowed ? '✓ Following' : '+ Follow'}
            </button>

            <button
              onClick={() => onToggleBookmark(question.id)}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                question.isBookmarked
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
              title={question.isBookmarked ? 'Saved in Personal Vault' : 'Save to Personal Vault'}
            >
              <Bookmark className={`h-4 w-4 ${question.isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer relative"
            >
              <Share2 className="h-4 w-4" />
              {copiedLink && (
                <span className="absolute -bottom-7 right-0 px-2 py-0.5 bg-neutral-900 text-white text-[10px] rounded shadow-md whitespace-nowrap">
                  Link copied!
                </span>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer ml-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-6">
          
          {/* Inquiring Doctor Card */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onViewDoctorProfile(question.author.id);
                  onClose();
                }}
              >
                <DoctorAvatar
                  src={question.author.avatar}
                  name={question.author.name}
                  size="md"
                />
              </button>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => {
                      onViewDoctorProfile(question.author.id);
                      onClose();
                    }}
                    className="text-sm font-bold text-neutral-900 dark:text-white hover:text-blue-500"
                  >
                    {question.author.name}
                  </button>
                  <span className="text-xs text-neutral-400 font-medium">
                    ({question.author.credentials})
                  </span>
                  {question.author.verified && (
                    <ShieldCheck className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <p className="text-xs text-neutral-400">
                  {question.author.clinicName} • Posted {question.createdAt}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-neutral-400">
              <Eye className="h-3.5 w-3.5" />
              <span>{question.viewsCount.toLocaleString()} peer views</span>
            </div>
          </div>

          {/* Question Title */}
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white leading-tight tracking-tight">
              {question.title}
            </h1>
            {question.isStudentFriendly && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                <GraduationCap className="h-4 w-4" />
                <span>🎓 Student & Resident Learning Case • Open to All Trainees</span>
              </div>
            )}
          </div>

          {/* Clinical Patient Parameters */}
          {question.clinicalData && (
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#16161c] border border-neutral-200 dark:border-neutral-800 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                Clinical Parameters at Examination
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {question.clinicalData.patientAgeSex && (
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#101014] border border-neutral-200/70 dark:border-neutral-800">
                    <span className="text-neutral-400 text-[10px] block">Patient</span>
                    <strong className="text-neutral-800 dark:text-neutral-200">{question.clinicalData.patientAgeSex}</strong>
                  </div>
                )}
                {question.clinicalData.visualAcuity && (
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#101014] border border-neutral-200/70 dark:border-neutral-800">
                    <span className="text-neutral-400 text-[10px] block">Visual Acuity</span>
                    <strong className="text-neutral-800 dark:text-neutral-200">{question.clinicalData.visualAcuity}</strong>
                  </div>
                )}
                {question.clinicalData.intraocularPressure && (
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#101014] border border-neutral-200/70 dark:border-neutral-800">
                    <span className="text-neutral-400 text-[10px] block">IOP</span>
                    <strong className="text-neutral-800 dark:text-neutral-200">{question.clinicalData.intraocularPressure}</strong>
                  </div>
                )}
                {question.clinicalData.instrumentUsed && (
                  <div className="sm:col-span-2 p-2.5 rounded-xl bg-white dark:bg-[#101014] border border-neutral-200/70 dark:border-neutral-800">
                    <span className="text-neutral-400 text-[10px] block">Diagnostic Instrument</span>
                    <span className="text-neutral-700 dark:text-neutral-300 font-medium">{question.clinicalData.instrumentUsed}</span>
                  </div>
                )}
                {question.clinicalData.medicalHistory && (
                  <div className="sm:col-span-3 p-2.5 rounded-xl bg-white dark:bg-[#101014] border border-neutral-200/70 dark:border-neutral-800">
                    <span className="text-neutral-400 text-[10px] block">Relevant History / Medications</span>
                    <span className="text-neutral-700 dark:text-neutral-300">{question.clinicalData.medicalHistory}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Clinical Narrative */}
          <div className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-line">
            {question.content}
          </div>

          {/* Attached Scans */}
          {question.images && question.images.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Diagnostic Imaging
              </span>
              <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-black">
                <img
                  src={question.images[0]}
                  alt="High-resolution clinical scan"
                  className="w-full h-72 sm:h-96 object-cover"
                />
              </div>
            </div>
          )}

          {/* Upvote Question Bar */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              {question.tags.map((t) => (
                <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                  #{t}
                </span>
              ))}
            </div>

            <div className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 p-0.5 border border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => onVoteQuestion(question.id, 'up')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  question.userVote === 'up'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                <ArrowUp className="h-3.5 w-3.5" />
                <span>Upvote Consult</span>
                <span className="font-extrabold ml-1">{question.upvotes}</span>
              </button>
              <div className="w-[1px] h-3.5 bg-neutral-300 dark:bg-neutral-700 mx-0.5" />
              <button
                onClick={() => onVoteQuestion(question.id, 'down')}
                className={`p-1.5 rounded-full text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer ${
                  question.userVote === 'down' ? 'text-red-500 font-bold' : ''
                }`}
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Write an Opinion Composer */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border border-blue-500/20 space-y-3">
            <div className="flex items-center gap-2.5">
              <DoctorAvatar
                src={currentUser.avatar}
                name={currentUser.name}
                size="sm"
              />
              <div>
                <span className="text-xs font-bold text-neutral-900 dark:text-white">
                  Add verified clinical opinion as {currentUser.name}
                </span>
                <p className="text-[11px] text-neutral-400">
                  {currentUser.credentials} • Contributes to your clinical index
                </p>
              </div>
            </div>

            <textarea
              value={newAnswerText}
              onChange={(e) => setNewAnswerText(e.target.value)}
              placeholder="State diagnostic considerations, pharmacological regimens, or next steps..."
              rows={4}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#111116] text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-y"
            />

            {/* Pearl Input */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newPearlInput}
                  onChange={(e) => setNewPearlInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddPearl();
                    }
                  }}
                  placeholder="Cite a guideline or diagnostic pearl (optional)..."
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#111116] text-neutral-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleAddPearl}
                  disabled={!newPearlInput.trim()}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 disabled:opacity-50 transition-colors"
                >
                  + Add Pearl
                </button>
              </div>

              {pearlsList.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {pearlsList.map((p, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                    >
                      <Lightbulb className="h-3 w-3 text-amber-500" />
                      <span>{p}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePearl(idx)}
                        className="ml-1 text-amber-500 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end pt-1">
              <button
                type="button"
                onClick={handlePostAnswer}
                disabled={!newAnswerText.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white shadow-xs transition-all"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Clinical Opinion</span>
              </button>
            </div>
          </div>

          {/* Peer Opinions List */}
          <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <span>{question.answersCount} Doctor {question.answersCount === 1 ? 'Opinion' : 'Opinions'}</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-bold">
                  Verified OD / MD
                </span>
              </h3>

              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setSortBy('upvotes')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                    sortBy === 'upvotes'
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                      : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  Top Consensus
                </button>
                <button
                  onClick={() => setSortBy('recent')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                    sortBy === 'recent'
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                      : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  Recent
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {sortedAnswers.map((answer) => (
                <div
                  key={answer.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    answer.isAcceptedAnswer
                      ? 'bg-blue-50/20 dark:bg-[#13131c] border-blue-200 dark:border-blue-900/60 shadow-xs'
                      : 'bg-white dark:bg-[#131318] border-neutral-200/80 dark:border-neutral-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <DoctorAvatar
                        src={answer.author.avatar}
                        name={answer.author.name}
                        size="sm"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button
                            onClick={() => {
                              onViewDoctorProfile(answer.author.id);
                              onClose();
                            }}
                            className="text-xs font-bold text-neutral-900 dark:text-white hover:underline"
                          >
                            {answer.author.name}
                          </button>
                          <span className="text-[11px] text-neutral-400">
                            ({answer.author.credentials})
                          </span>
                        </div>
                        <p className="text-[10px] text-neutral-400">
                          {answer.author.clinicName} • {answer.createdAt}
                        </p>
                      </div>
                    </div>

                    {answer.isAcceptedAnswer && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        <CheckCircle2 className="h-3 w-3" /> Consensus Protocol
                      </span>
                    )}
                  </div>

                  <div className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-line mb-3">
                    {answer.content}
                  </div>

                  {answer.clinicalPearlsCited && answer.clinicalPearlsCited.length > 0 && (
                    <div className="my-2.5 p-2.5 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/40 text-xs text-neutral-700 dark:text-neutral-300 space-y-1">
                      <span className="font-bold text-amber-800 dark:text-amber-400 text-[10px] uppercase tracking-wider block">
                        Cited Evidence / Pearl
                      </span>
                      <p>{answer.clinicalPearlsCited[0]}</p>
                    </div>
                  )}

                  {/* Upvote & Discuss on this opinion */}
                  <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-neutral-100 dark:border-neutral-800/80">
                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-bold">
                        <button
                          onClick={() => onVoteAnswer(question.id, answer.id, 'up')}
                          className={`flex items-center gap-1 hover:text-blue-500 ${answer.userVote === 'up' ? 'text-blue-600' : 'text-neutral-600'}`}
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                          <span>{answer.upvotes}</span>
                        </button>
                        <span className="mx-1.5 text-neutral-300 dark:text-neutral-700">|</span>
                        <button
                          onClick={() => onVoteAnswer(question.id, answer.id, 'down')}
                          className={`hover:text-red-500 ${answer.userVote === 'down' ? 'text-red-600' : 'text-neutral-400'}`}
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => setReplyingToAnswerId(replyingToAnswerId === answer.id ? null : answer.id)}
                        className="text-xs font-semibold text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        <MessageSquare className="h-3 w-3" />
                        <span>Discuss ({answer.comments?.length || 0})</span>
                      </button>
                    </div>

                    <span className="text-[11px] text-neutral-400">
                      Verified Peer
                    </span>
                  </div>

                  {/* Threaded discussion box */}
                  {(answer.comments && answer.comments.length > 0 || replyingToAnswerId === answer.id) && (
                    <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
                      {answer.comments?.map((c) => (
                        <div key={c.id} className="flex items-start gap-2 text-xs bg-neutral-50 dark:bg-[#111116] p-2 rounded-xl">
                          <DoctorAvatar src={c.author.avatar} name={c.author.name} size="xs" />
                          <div className="flex-1 min-w-0">
                            <span className="font-bold text-neutral-900 dark:text-white mr-1.5">{c.author.name}:</span>
                            <span className="text-neutral-700 dark:text-neutral-300">{c.content}</span>
                          </div>
                          <button
                            onClick={() => onLikeAnswerComment(question.id, answer.id, c.id)}
                            className={`flex items-center gap-0.5 text-[10px] ${c.isLiked ? 'text-blue-600 font-bold' : 'text-neutral-400'}`}
                          >
                            <ThumbsUp className="h-3 w-3" />
                            <span>{c.likes}</span>
                          </button>
                        </div>
                      ))}

                      {replyingToAnswerId === answer.id && (
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handlePostReply(answer.id);
                              }
                            }}
                            placeholder="Add thought or clinical follow-up..."
                            className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#101014] text-neutral-900 dark:text-white"
                          />
                          <button
                            onClick={() => handlePostReply(answer.id)}
                            disabled={!replyText.trim()}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white disabled:opacity-50"
                          >
                            Reply
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
