import React, { useState, useMemo } from 'react';
import {
  Stethoscope,
  Plus,
  Search,
  Filter,
  Flame,
  ArrowUp,
  Award,
  Sparkles,
  BookOpen,
  Bookmark,
  TrendingUp,
  CheckCircle2,
  Users,
  Eye,
  Activity,
  Shield,
  Baby,
  Droplets,
  Layers,
  Pill,
  ChevronRight,
  Clock,
  Compass,
  X,
  UserCheck,
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { ClinicalQuestion, QuestionTopic, DoctorProfile } from '../../types';
import { ConsultCard } from './ConsultCard';
import { ConsultDetailDrawer } from './ConsultDetailDrawer';
import { AskConsultModal } from './AskConsultModal';
import { TopicCardsGallery } from './TopicCardsGallery';
import { DoctorAvatar } from '../common/DoctorAvatar';

interface ConsultsViewProps {
  questions: ClinicalQuestion[];
  topics: QuestionTopic[];
  currentUser: DoctorProfile;
  onVoteQuestion: (questionId: string, direction: 'up' | 'down') => void;
  onVoteAnswer: (questionId: string, answerId: string, direction: 'up' | 'down') => void;
  onToggleBookmark: (questionId: string) => void;
  onToggleFollowQuestion: (questionId: string) => void;
  onToggleFollowTopic: (topicId: string) => void;
  onCreateQuestion: (questionData: any) => void;
  onAddAnswer: (questionId: string, answerText: string, pearls?: string[]) => void;
  onAddCommentToAnswer: (questionId: string, answerId: string, commentText: string) => void;
  onLikeAnswerComment: (questionId: string, answerId: string, commentId: string) => void;
  onViewDoctorProfile: (doctorId: string) => void;
}

export type ConsultFilterType = 'relevant' | 'student' | 'recent' | 'popular' | 'unanswered' | 'saved';

export const ConsultsView: React.FC<ConsultsViewProps> = ({
  questions,
  topics,
  currentUser,
  onVoteQuestion,
  onVoteAnswer,
  onToggleBookmark,
  onToggleFollowQuestion,
  onToggleFollowTopic,
  onCreateQuestion,
  onAddAnswer,
  onAddCommentToAnswer,
  onLikeAnswerComment,
  onViewDoctorProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<ConsultFilterType>('relevant');
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [selectedDetailConsult, setSelectedDetailConsult] = useState<ClinicalQuestion | null>(null);

  // Filter and sort consults
  const filteredConsults = useMemo(() => {
    return questions.filter((q) => {
      // 1. Topic filter
      if (selectedTopicId && q.topicId !== selectedTopicId) {
        return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = q.title.toLowerCase().includes(query);
        const matchesContent = q.content.toLowerCase().includes(query);
        const matchesTopic = q.topicName.toLowerCase().includes(query);
        const matchesTags = q.tags.some((tag) => tag.toLowerCase().includes(query));
        const matchesAuthor = q.author.name.toLowerCase().includes(query);
        const matchesAnswers = q.answers.some(
          (a) => a.content.toLowerCase().includes(query) || a.author.name.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesContent && !matchesTopic && !matchesTags && !matchesAuthor && !matchesAnswers) {
          return false;
        }
      }

      // 3. Tab filter
      if (filterType === 'saved') {
        return q.isBookmarked;
      }
      if (filterType === 'student') {
        return q.isStudentFriendly || q.tags.some((t) => t.toLowerCase().includes('student') || t.toLowerCase().includes('board'));
      }
      if (filterType === 'unanswered') {
        return q.answersCount === 0 || q.answersCount === 1;
      }
      if (filterType === 'relevant') {
        const followedTopicIds = topics.filter((t) => t.isFollowed).map((t) => t.id);
        if (followedTopicIds.length > 0 && !selectedTopicId) {
          return followedTopicIds.includes(q.topicId) || q.isFollowed;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filterType === 'popular') {
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      }
      if (filterType === 'recent') {
        return b.id.localeCompare(a.id);
      }
      // Default: net score + recency
      return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
    });
  }, [questions, selectedTopicId, searchQuery, filterType, topics]);

  // Keep active consult updated
  const activeConsult = selectedDetailConsult
    ? questions.find((q) => q.id === selectedDetailConsult.id) || selectedDetailConsult
    : null;

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Consults Hero Command Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl overflow-hidden border border-blue-900/40">
        {/* Modern ambient glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide">
              <Stethoscope className="h-3.5 w-3.5" />
              <span>Clinical Consults • The Peer Brain Trust</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Peer Consults & Second Opinions
            </h1>
            
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
              High-stakes clinical inquiries, differential diagnoses, and peer-consensus protocols crowdsourced from verified Optometrists and Ophthalmologists worldwide.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsAskModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4 stroke-[3]" />
              <span>Initiate Case Consult</span>
            </button>
          </div>
        </div>

        {/* Omnipresent Diagnostic Search */}
        <div className="relative z-10 mt-6 max-w-3xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search consults by diagnosis, drug (e.g. Lotilaner), OCT findings, or doctor..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/20 text-white placeholder:text-neutral-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400 transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Seamless Specialty Topic Cards Hub (Cards of Topics with All, Most Popular, Recommended, New & Trending, Following) */}
      <TopicCardsGallery
        topics={topics}
        selectedTopicId={selectedTopicId}
        onSelectTopic={setSelectedTopicId}
        onToggleFollowTopic={onToggleFollowTopic}
        onSelectTag={(tag) => setSearchQuery(tag)}
      />

      {/* Main 2-Column Responsive Layout:
          - Left/Main (lg:col-span-8): Spacious Consult Inquiries Stream
          - Right (lg:col-span-4): Personal Study Vault, Faculty Leaders, Consult Index & Topic Tags
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Column: Consults Stream (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Quick Consult Prompt Box */}
          <div
            onClick={() => setIsAskModalOpen(true)}
            className="p-3.5 sm:p-4 rounded-3xl bg-white dark:bg-[#121216] border border-neutral-200/90 dark:border-neutral-800/90 shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer flex items-center gap-3.5"
          >
            <DoctorAvatar
              src={currentUser.avatar}
              name={currentUser.name}
              size="sm"
            />
            <div className="flex-1 bg-neutral-100/80 dark:bg-[#181820] hover:bg-neutral-200/60 dark:hover:bg-neutral-800/80 text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm px-4 py-2.5 rounded-2xl truncate transition-colors font-medium">
              Have a challenging cornea, retina, or glaucoma case, Dr. Sirenjeev?
            </div>
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shrink-0 shadow-sm cursor-pointer transition-colors active:scale-95"
            >
              Ask ODs
            </button>
          </div>

          {/* Academic Community & Trainee Welcome Banner */}
          <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-indigo-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <span className="font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span>Open Academic Exchange • All Training Levels Welcome</span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">
                    Students & Attendings
                  </span>
                </span>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5">
                  Optometry students, interns, and residents are invited to propose differentials and cite textbook pearls. Attending ODs review and endorse top clinical reasoning.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFilterType(filterType === 'student' ? 'relevant' : 'student')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 self-start sm:self-auto ${
                filterType === 'student'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-[#1a1a22] border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {filterType === 'student' ? 'Viewing Trainee Cases' : 'Browse Trainee Cases 🎓'}
            </button>
          </div>

          {/* Precision Filter Navigation (Relevant, Student, Recent, Popular, Unanswered, Saved) */}
          <div className="flex items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3 flex-wrap">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              
              <button
                onClick={() => setFilterType('relevant')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  filterType === 'relevant'
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Relevant</span>
              </button>

              <button
                onClick={() => setFilterType('student')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  filterType === 'student'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Student & Resident Cases 🎓</span>
              </button>

              <button
                onClick={() => setFilterType('recent')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  filterType === 'recent'
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Clock className="h-3.5 w-3.5" />
                <span>Recent</span>
              </button>

              <button
                onClick={() => setFilterType('popular')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  filterType === 'popular'
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <ArrowUp className="h-3.5 w-3.5" />
                <span>Most Popular</span>
              </button>

              <button
                onClick={() => setFilterType('unanswered')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  filterType === 'unanswered'
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <span>Awaiting Answers</span>
              </button>

              <button
                onClick={() => setFilterType('saved')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  filterType === 'saved'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>Study Vault ({questions.filter((q) => q.isBookmarked).length})</span>
              </button>
            </div>

            <span className="text-xs text-neutral-400 font-medium">
              {filteredConsults.length} {filteredConsults.length === 1 ? 'consult' : 'consults'}
            </span>
          </div>

          {/* List of Consult Cards */}
          <div className="space-y-4">
            {filteredConsults.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 text-center space-y-3.5">
                <Stethoscope className="h-10 w-10 text-neutral-400 mx-auto opacity-50" />
                <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">
                  No consults found for this criteria
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                  {searchQuery
                    ? `No peer inquiries matching "${searchQuery}". Clear your search or initiate a new clinical consult!`
                    : filterType === 'saved'
                    ? "You haven't bookmarked any clinical consults to your study vault yet."
                    : 'Be the first doctor to pose a second opinion request in this area.'}
                </p>
                <button
                  onClick={() => setIsAskModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Initiate Case Consult
                </button>
              </div>
            ) : (
              filteredConsults.map((consult) => (
                <ConsultCard
                  key={consult.id}
                  question={consult}
                  currentUser={currentUser}
                  onVoteQuestion={onVoteQuestion}
                  onVoteAnswer={onVoteAnswer}
                  onToggleBookmark={onToggleBookmark}
                  onToggleFollow={onToggleFollowQuestion}
                  onSelectConsult={(c) => setSelectedDetailConsult(c)}
                  onViewDoctorProfile={onViewDoctorProfile}
                  onAddAnswer={(qId, text, p) => onAddAnswer(qId, text, p)}
                  onFilterByTopic={(tId) => setSelectedTopicId(tId)}
                />
              ))
            )}
          </div>

        </div>

        {/* Right Column: Study Vault, Faculty Leaders, Consult Index & Tags (lg:col-span-4) */}
        <div className="hidden lg:block lg:col-span-4 space-y-4 sticky top-24">
          
          {/* Personal Clinical Study Vault Card */}
          <div className="p-4 rounded-3xl bg-white dark:bg-[#121216] border border-neutral-200/90 dark:border-neutral-800/90 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Bookmark className="h-3.5 w-3.5 text-amber-500" />
                Personal Clinical Vault
              </span>
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                {questions.filter((q) => q.isBookmarked).length} Bookmarked
              </span>
            </div>

            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Quick access to high-yield clinical consults and treatment algorithms you have saved for clinic or study.
            </p>

            <button
              onClick={() => setFilterType(filterType === 'saved' ? 'relevant' : 'saved')}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                filterType === 'saved'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800/70 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                <span>{filterType === 'saved' ? 'Viewing Saved Vault' : 'Filter Saved Cases'}</span>
              </span>
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold ${
                filterType === 'saved' ? 'bg-white/20 text-white' : 'bg-neutral-200 dark:bg-neutral-700'
              }`}>
                {questions.filter((q) => q.isBookmarked).length}
              </span>
            </button>
          </div>

          {/* Top Consulting Faculty */}
          <div className="p-4 rounded-3xl bg-white dark:bg-[#121216] border border-neutral-200/90 dark:border-neutral-800/90 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-amber-500" />
                Consulting Leaders
              </span>
              <span className="text-[10px] text-neutral-400 font-bold">This Month</span>
            </div>

            <div className="space-y-3">
              {[
                { name: currentUser.name, creds: 'OD, FAAO', answers: 24, upvotes: 512, avatar: currentUser.avatar, id: currentUser.id },
                { name: 'Dr. Marcus Chen', creds: 'OD, FAAO', answers: 19, upvotes: 394, avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80', id: 'doc-marcus' },
                { name: 'Dr. Elena Rostova', creds: 'OD, MS', answers: 16, upvotes: 348, avatar: 'https://images.unsplash.com/photo-1594824813580-c1143891d4e0?w=200&auto=format&fit=crop&q=80', id: 'doc-elena' },
              ].map((faculty, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <DoctorAvatar
                      src={faculty.avatar}
                      name={faculty.name}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <button
                        onClick={() => onViewDoctorProfile(faculty.id)}
                        className="text-xs font-bold text-neutral-900 dark:text-white hover:text-blue-500 truncate block text-left"
                      >
                        {faculty.name}
                      </button>
                      <span className="text-[10px] text-neutral-400 block truncate">
                        {faculty.answers} opinions • {faculty.upvotes} upvotes
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-black text-amber-600 dark:text-amber-400 shrink-0">
                    #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Doctor Clinical Index Pill */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-transparent border border-blue-500/25 space-y-2">
            <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              Your Clinical Consult Index
            </span>
            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-2xl bg-white dark:bg-[#16161c] border border-blue-100 dark:border-blue-900/40">
                <span className="text-lg font-black text-neutral-900 dark:text-white block">
                  348
                </span>
                <span className="text-[10px] text-neutral-400 font-medium">Consensus Upvotes</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white dark:bg-[#16161c] border border-blue-100 dark:border-blue-900/40">
                <span className="text-lg font-black text-neutral-900 dark:text-white block">
                  98%
                </span>
                <span className="text-[10px] text-neutral-400 font-medium">Agreement Rate</span>
              </div>
            </div>
          </div>

          {/* Trending Consult Tags */}
          <div className="p-4 rounded-3xl bg-white dark:bg-[#121216] border border-neutral-200/90 dark:border-neutral-800/90 space-y-2.5 shadow-xs">
            <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block">
              Active Case Topics
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['#Pachychoroid', '#OCTAngiography', '#Lotilaner', '#TargetIOP', '#ScleralToric', '#Atropine005', '#GLP1Retinopathy'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag.replace('#', ''))}
                  className="px-2.5 py-1 rounded-xl text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Initiate Consult Modal */}
      <AskConsultModal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
        topics={topics}
        currentUser={currentUser}
        onSubmitQuestion={onCreateQuestion}
      />

      {/* Deep-Dive Drawer for Full Review */}
      {activeConsult && (
        <ConsultDetailDrawer
          question={activeConsult}
          isOpen={!!selectedDetailConsult}
          onClose={() => setSelectedDetailConsult(null)}
          currentUser={currentUser}
          onVoteQuestion={onVoteQuestion}
          onVoteAnswer={onVoteAnswer}
          onToggleBookmark={onToggleBookmark}
          onToggleFollow={onToggleFollowQuestion}
          onAddAnswer={onAddAnswer}
          onAddCommentToAnswer={onAddCommentToAnswer}
          onLikeAnswerComment={onLikeAnswerComment}
          onViewDoctorProfile={onViewDoctorProfile}
        />
      )}

    </div>
  );
};
