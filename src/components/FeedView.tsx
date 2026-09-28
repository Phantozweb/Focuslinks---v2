import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Repeat2,
  MessageCircle,
  Share2,
  Bookmark,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Send,
  Plus,
  BarChart2,
  Image as ImageIcon,
  CheckCircle2,
  Eye,
  ChevronRight,
  TrendingUp,
  Award,
  Users,
  Calendar,
  Layers,
  FileText,
  MapPin,
  HelpCircle,
  AlertCircle,
  Maximize2,
  Check,
  Compass,
  FolderPlus,
  Flame,
  UserCheck,
  BookOpen,
  Clock,
  Quote
} from 'lucide-react';
import { ClinicalPost, DoctorProfile, ClinicalStory } from '../types';
import { DoctorAvatar } from './common/DoctorAvatar';

interface FeedViewProps {
  posts: ClinicalPost[];
  stories: ClinicalStory[];
  currentUser: DoctorProfile;
  onOpenNewPost: (mode?: 'pearl' | 'article' | 'case' | 'poll') => void;
  onSelectStory: (story: ClinicalStory) => void;
  onViewDoctorProfile: (doctorId: string) => void;
  onLikePost: (postId: string) => void;
  onRepostPost: (postId: string) => void;
  onBookmarkPost: (postId: string) => void;
  onVotePoll: (postId: string, optionId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
}

export const FeedView: React.FC<FeedViewProps> = ({
  posts,
  stories,
  currentUser,
  onOpenNewPost,
  onSelectStory,
  onViewDoctorProfile,
  onLikePost,
  onRepostPost,
  onBookmarkPost,
  onVotePoll,
  onAddComment,
  activeFilter,
  onSelectFilter,
}) => {
  const [feedStream, setFeedStream] = useState<'for-you' | 'following' | 'vault'>('for-you');
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});
  const [zoomedImage, setZoomedImage] = useState<{ url: string; title: string; instrument?: string } | null>(null);
  const [modalityFilter, setModalityFilter] = useState<string>('all');
  const [savedNotification, setSavedNotification] = useState<string | null>(null);
  const [selectedCaseDetail, setSelectedCaseDetail] = useState<ClinicalPost | null>(null);

  // Modality category filter pills
  const modalityTabs = [
    { id: 'all', label: 'All Cases & Articles', count: posts.length },
    { id: 'pearl', label: 'Clinical Posts', count: posts.filter((p) => p.cardCategory === 'pearl').length },
    { id: 'article', label: 'Clinical Articles', count: posts.filter((p) => p.cardCategory === 'article' || !!p.articleMetadata).length },
    { id: 'oct', label: 'AS-OCT & Scans', count: posts.filter((p) => p.cardCategory === 'oct').length },
    { id: 'slit-lamp', label: 'Slit-Lamp Bio', count: posts.filter((p) => p.cardCategory === 'slit-lamp').length },
    { id: 'topography', label: 'Corneal Topography', count: posts.filter((p) => p.cardCategory === 'topography').length },
    { id: 'poll', label: 'Diagnostic Polls', count: posts.filter((p) => !!p.poll).length },
  ];

  // Filtering based on Feed stream (For You / Following / Vault) and Modality
  const filteredPosts = posts.filter((post) => {
    // Stream Filter
    if (feedStream === 'vault' && !post.bookmarked) return false;
    if (feedStream === 'following' && post.author.id === currentUser.id) return false;

    // Modality Tab Filter
    if (modalityFilter === 'article' && post.cardCategory !== 'article' && !post.articleMetadata) return false;
    if (modalityFilter === 'oct' && post.cardCategory !== 'oct') return false;
    if (modalityFilter === 'slit-lamp' && post.cardCategory !== 'slit-lamp') return false;
    if (modalityFilter === 'topography' && post.cardCategory !== 'topography') return false;
    if (modalityFilter === 'poll' && !post.poll) return false;
    if (modalityFilter === 'pearl' && post.cardCategory !== 'pearl') return false;

    // Hashtag Filter
    if (activeFilter === 'All Posts' || activeFilter === 'All Threads') return true;
    if (activeFilter === '#ClinicalPolls') return !!post.poll;
    return post.tags.some((t) => t.toLowerCase() === activeFilter.toLowerCase());
  });

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    onAddComment(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleSaveToVault = (post: ClinicalPost, e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmarkPost(post.id);
    const willBeSaved = !post.bookmarked;
    setSavedNotification(willBeSaved ? 'Saved to Your Clinical Vault' : 'Removed from Clinical Vault');
    setTimeout(() => setSavedNotification(null), 2500);
  };

  return (
    <div className="w-full space-y-6">
      {/* ============================================================== */}
      {/* 1. CLINICAL PEARLS (DAILY ROTATING OPTOMETRIC CASES)          */}
      {/* ============================================================== */}
      <section className="rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-[#161618] p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                  Clinical Stories & Highlights
                </h2>
                <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-900/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Daily Rounds
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                High-yield cases, slit-lamp findings, and therapeutic protocols from verified optometrists
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenNewPost('pearl')}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer active:scale-95"
            title="Create Post (Case or Article)"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Post</span>
          </button>
        </div>

        {/* Pearls Carousel Cards */}
        <div className="flex items-stretch gap-3.5 overflow-x-auto pb-2 scrollbar-none snap-x -mx-1 px-1">
          {/* Clinician Add Pearl/Article Card */}
          <button
            onClick={() => onOpenNewPost('pearl')}
            className="flex flex-col items-center justify-center text-center p-3.5 w-36 sm:w-44 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 bg-neutral-50/70 dark:bg-[#1f1f23]/60 transition-all shrink-0 snap-start group min-h-[190px] cursor-pointer"
          >
            <div className="relative mb-2">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-500/30"
              />
              <div className="absolute -bottom-1 -right-1 rounded-full bg-blue-600 text-white p-1 shadow-sm group-hover:scale-110 transition-transform">
                <Plus className="h-3 w-3" />
              </div>
            </div>
            <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block">
              + Post
            </span>
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
              Case or Clinical Article
            </span>
          </button>

          {/* Pearls Deck */}
          {stories.map((pearl) => (
            <div
              key={pearl.id}
              onClick={() => onSelectStory(pearl)}
              className="relative w-40 sm:w-48 rounded-2xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800 bg-neutral-900 text-white shrink-0 snap-start cursor-pointer group shadow-sm hover:shadow-md transition-all flex flex-col justify-between p-3"
            >
              {/* Background preview */}
              <img
                src={pearl.thumbnail}
                alt={pearl.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/30" />

              {/* Pearl Category Pill */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-600/90 backdrop-blur-xs text-white shadow-xs">
                  {pearl.category}
                </span>

                {pearl.urgency === 'urgent' && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-rose-600/90 text-white flex items-center gap-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                    Review
                  </span>
                )}
              </div>

              {/* Pearl Info */}
              <div className="relative z-10 mt-auto pt-8">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <img
                    src={pearl.author.avatar}
                    alt={pearl.author.name}
                    className="h-5 w-5 rounded-full object-cover ring-1 ring-white/50"
                  />
                  <span className="text-[10px] font-medium text-neutral-200 truncate">
                    {pearl.author.name.split(' ')[1] || pearl.author.name}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-blue-300 transition-colors">
                  {pearl.title}
                </h3>

                <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-300 font-medium pt-1.5 border-t border-white/15">
                  <span className="truncate">{pearl.modality || 'Clinical Pearl'}</span>
                  <span className="text-blue-400 group-hover:translate-x-0.5 transition-transform font-bold">
                    Inspect →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. FEED STREAM SELECTOR & MODALITY FILTER CONTROLS             */}
      {/* ============================================================== */}
      <section className="space-y-3">
        {/* Stream Selector: For You vs Following vs Vault */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#161618] border border-neutral-200/90 dark:border-neutral-800/90 rounded-2xl p-3 shadow-xs">
          {/* Main Feed Channels */}
          <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-xl">
            <button
              onClick={() => setFeedStream('for-you')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                feedStream === 'for-you'
                  ? 'bg-white dark:bg-[#202024] text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Compass className="h-3.5 w-3.5 text-blue-500" />
              <span>For You</span>
            </button>

            <button
              onClick={() => setFeedStream('following')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                feedStream === 'following'
                  ? 'bg-white dark:bg-[#202024] text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <UserCheck className="h-3.5 w-3.5 text-indigo-500" />
              <span>Following Optometrists</span>
            </button>

            <button
              onClick={() => setFeedStream('vault')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                feedStream === 'vault'
                  ? 'bg-white dark:bg-[#202024] text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Bookmark className="h-3.5 w-3.5 text-amber-500 fill-current" />
              <span>Vault ({posts.filter((p) => p.bookmarked).length})</span>
            </button>
          </div>

          {/* Quick Post CTA */}
          <button
            onClick={() => onOpenNewPost('pearl')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Post to Feed</span>
          </button>
        </div>

        {/* Modality Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x">
          {modalityTabs.map((tab) => {
            const isActive = modalityFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setModalityFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 snap-start flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                    : 'bg-white dark:bg-[#161618] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? 'bg-white/20 dark:bg-neutral-900/20 text-white dark:text-neutral-900'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Topic Tag Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x">
          {['All Posts', '#ScleralLenses', '#CornealTopography', '#AnteriorSegment', '#MyopiaManagement', '#GlaucomaDx', '#NeuroOptometry', '#OptometryPearls'].map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectFilter(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 snap-start ${
                activeFilter === tag
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2.5 NATIVE FEED POST COMPOSER (LinkedIn / Facebook Inspired)   */}
      {/* ============================================================== */}
      <section className="rounded-2xl sm:rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-[#161618] p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onViewDoctorProfile(currentUser.id)}
            className="shrink-0"
            title="My Profile"
          >
            <DoctorAvatar
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-full ring-2 ring-blue-500/20"
            />
          </button>
          <button
            onClick={() => onOpenNewPost('pearl')}
            className="flex-1 text-left px-4 py-2.5 sm:py-3 rounded-full border border-neutral-200 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#1f1f23] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 transition-colors shadow-2xs"
          >
            Share a clinical pearl, article, diagnostic poll, or case file...
          </button>
        </div>

        {/* 4 Action Pills for Post Types (LinkedIn / Facebook Inspired) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/60">
          <button
            onClick={() => onOpenNewPost('pearl')}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/30 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer group"
          >
            <Sparkles className="h-4 w-4 text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="truncate">Clinical Pearl</span>
          </button>

          <button
            onClick={() => onOpenNewPost('article')}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/30 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer group"
          >
            <BookOpen className="h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="truncate">Write Article</span>
          </button>

          <button
            onClick={() => onOpenNewPost('poll')}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/30 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer group"
          >
            <BarChart2 className="h-4 w-4 text-purple-500 group-hover:scale-110 transition-transform" />
            <span className="truncate">Create Poll</span>
          </button>

          <button
            onClick={() => onOpenNewPost('case')}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer group"
          >
            <Stethoscope className="h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="truncate">Case File</span>
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. DEFAULT PURE MASONRY FEED (NO TOGGLE OPTIONS)               */}
      {/* Dynamic ophthalmic ratios: tall, square, wide, polls, formulas */}
      {/* ============================================================== */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-4 space-y-4">
        {filteredPosts.map((post) => {
          const hasImage = post.images && post.images.length > 0;
          const isPoll = !!post.poll;
          const isPearl = post.cardCategory === 'pearl';
          const isArticle = post.cardCategory === 'article' || !!post.articleMetadata;

          // Aspect ratio matching
          let imageRatioClass = 'aspect-[4/3]';
          if (post.aspectRatio === 'tall') imageRatioClass = 'aspect-[3/4]';
          if (post.aspectRatio === 'square') imageRatioClass = 'aspect-square';
          if (post.aspectRatio === 'wide') imageRatioClass = 'aspect-[16/9]';
          if (post.aspectRatio === 'panoramic') imageRatioClass = 'aspect-[2/1]';

          return (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="break-inside-avoid rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-[#18181b] overflow-hidden shadow-xs hover:shadow-md transition-all group relative flex flex-col"
            >
              {/* IMAGE / SCAN DISPLAY */}
              {hasImage && (
                <div className="relative overflow-hidden bg-neutral-950">
                  <div className={`w-full ${imageRatioClass} overflow-hidden`}>
                    <img
                      src={post.images![0]}
                      alt={post.clinicalMetadata?.instrumentUsed || post.articleMetadata?.title || 'Clinical scan'}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103 cursor-pointer"
                      onClick={() => setSelectedCaseDetail(post)}
                    />
                  </div>

                  {/* Top Bar with Instrument/Article Badge and Save to Vault */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-neutral-900/80 backdrop-blur-md text-white border border-white/10 flex items-center gap-1 shadow-xs">
                      {isArticle ? (
                        <>
                          <BookOpen className="h-3 w-3 text-indigo-400" />
                          <span>Article • {post.articleMetadata?.readTimeMinutes || 4}m read</span>
                        </>
                      ) : (
                        <>
                          <Eye className="h-3 w-3 text-blue-400" />
                          <span>{post.clinicalMetadata?.instrumentUsed || 'Diagnostic'}</span>
                        </>
                      )}
                    </span>

                    {/* Save to Vault Action Button */}
                    <button
                      onClick={(e) => handleSaveToVault(post, e)}
                      className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-md transition-all flex items-center gap-1 ${
                        post.bookmarked
                          ? 'bg-amber-500 text-white'
                          : 'bg-neutral-900/80 backdrop-blur-md hover:bg-neutral-900 text-white border border-white/20'
                      }`}
                      title="Save to Clinical Vault"
                    >
                      <Bookmark className={`h-3.5 w-3.5 ${post.bookmarked ? 'fill-current' : ''}`} />
                      <span>{post.bookmarked ? 'In Vault' : 'Vault'}</span>
                    </button>
                  </div>

                  {/* Magnifier Hover Button */}
                  <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoomedImage({
                          url: post.images![0],
                          title: post.articleMetadata?.title || post.clinicalMetadata?.chiefComplaint || post.tags[0] || 'Clinical Scan',
                          instrument: isArticle ? 'Clinical Article Figure' : post.clinicalMetadata?.instrumentUsed,
                        });
                      }}
                      className="p-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md text-white hover:bg-neutral-900 transition-colors shadow-xs"
                      title="Inspect Full Image"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Patient Demographic / Article Category Pill */}
                  {post.clinicalMetadata?.patientAgeSex ? (
                    <div className="absolute bottom-2.5 left-2.5 z-10">
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-neutral-200">
                        {post.clinicalMetadata.patientAgeSex}
                        {post.clinicalMetadata.acuity ? ` • ${post.clinicalMetadata.acuity}` : ''}
                      </span>
                    </div>
                  ) : isArticle ? (
                    <div className="absolute bottom-2.5 left-2.5 z-10">
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-500/30 text-indigo-200">
                        Peer Reviewed Review
                      </span>
                    </div>
                  ) : null}
                </div>
              )}

              {/* CARD BODY */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
                {/* Author Info */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      onClick={() => onViewDoctorProfile(post.author.id)}
                      className="shrink-0"
                    >
                      <DoctorAvatar
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-7 w-7 rounded-full ring-1 ring-blue-500/20"
                      />
                    </button>
                    <div className="min-w-0">
                      <button
                        onClick={() => onViewDoctorProfile(post.author.id)}
                        className="text-xs font-bold text-neutral-900 dark:text-neutral-100 hover:underline truncate block text-left leading-tight"
                      >
                        {post.author.name}
                      </button>
                      <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400">
                        {post.author.credentials}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] text-neutral-400 shrink-0">{post.createdAt}</span>
                </div>

                {/* Article Header Card if post is an Article */}
                {isArticle && post.articleMetadata ? (
                  <div
                    onClick={() => setSelectedCaseDetail(post)}
                    className="cursor-pointer space-y-1.5 p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all"
                  >
                    <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                      <BookOpen className="h-3 w-3" />
                      <span>Clinical Article</span>
                      <span className="text-neutral-300 dark:text-neutral-600">•</span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="h-2.5 w-2.5" />
                        {post.articleMetadata.readTimeMinutes || 4}m read
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-snug">
                      {post.articleMetadata.title}
                    </h4>
                    {post.articleMetadata.subtitle && (
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                        {post.articleMetadata.subtitle}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 pt-1">
                      Read Full Article <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                ) : isPearl ? (
                  /* Clinical Pearl Algorithm Banner */
                  <div className="rounded-xl p-3 bg-gradient-to-br from-amber-50 via-rose-50 to-neutral-50 dark:from-amber-950/40 dark:via-rose-950/30 dark:to-neutral-900 border border-amber-200/70 dark:border-amber-900/50">
                    <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 text-[10px] font-extrabold uppercase tracking-wider mb-1">
                      <Sparkles className="h-3 w-3" />
                      Optometry Pearl
                    </div>
                    <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                      {post.pearlHeadline || 'High-Yield Clinical Practice Pearl'}
                    </p>
                  </div>
                ) : null}

                {/* Content Excerpt (if not an article with metadata card, or as supplementary text) */}
                {!isArticle && (
                  <p
                    onClick={() => setSelectedCaseDetail(post)}
                    className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed line-clamp-3 cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    {post.content}
                  </p>
                )}

                {/* Interactive Diagnostic Poll */}
                {isPoll && post.poll && (
                  <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-[#202024]/80 p-2.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1">
                        <BarChart2 className="h-3 w-3 text-purple-500" />
                        Diagnostic Poll
                      </span>
                      <span className="text-[9px] text-neutral-400 font-semibold">
                        {post.poll.totalVotes} votes
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {post.poll.options.slice(0, 3).map((opt) => {
                        const percentage =
                          post.poll!.totalVotes > 0
                            ? Math.round((opt.votes / post.poll!.totalVotes) * 100)
                            : 0;
                        const isVoted = post.poll?.userVotedOptionId === opt.id;

                        return (
                          <button
                            key={opt.id}
                            onClick={() => onVotePoll(post.id, opt.id)}
                            className={`w-full relative overflow-hidden rounded-lg border p-1.5 text-left text-[11px] transition-all flex items-center justify-between ${
                              isVoted
                                ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-950/40 font-bold'
                                : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#18181b] hover:border-purple-300'
                            }`}
                          >
                            <div
                              className={`absolute inset-y-0 left-0 transition-all ${
                                isVoted ? 'bg-purple-200/50 dark:bg-purple-900/40' : 'bg-neutral-100 dark:bg-neutral-800'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                            <span className="relative z-10 truncate text-neutral-800 dark:text-neutral-200">
                              {opt.text}
                            </span>
                            <span className="relative z-10 text-[10px] font-bold text-neutral-500 shrink-0 ml-1">
                              {percentage}%
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => onSelectFilter(tag)}
                      className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Action Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-neutral-500 dark:text-neutral-400">
                  <button
                    onClick={() => onLikePost(post.id)}
                    className={`flex items-center gap-1 text-xs hover:text-rose-500 transition-colors ${
                      post.isLiked ? 'text-rose-600 dark:text-rose-500 font-bold' : ''
                    }`}
                  >
                    <Heart className={`h-3.5 w-3.5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likes}</span>
                  </button>

                  <button
                    onClick={() => setSelectedCaseDetail(post)}
                    className="flex items-center gap-1 text-xs hover:text-blue-500 transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>{post.comments.length}</span>
                  </button>

                  <button
                    onClick={() => onRepostPost(post.id)}
                    className={`flex items-center gap-1 text-xs hover:text-emerald-500 transition-colors ${
                      post.isReposted ? 'text-emerald-600 font-bold' : ''
                    }`}
                  >
                    <Repeat2 className="h-3.5 w-3.5" />
                    <span>{post.reposts}</span>
                  </button>

                  <button
                    onClick={(e) => handleSaveToVault(post, e)}
                    className={`p-1 rounded-md hover:text-amber-500 transition-colors ${
                      post.bookmarked ? 'text-amber-500' : ''
                    }`}
                    title="Save to Vault"
                  >
                    <Bookmark className={`h-3.5 w-3.5 ${post.bookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* 4. MODALS: CASE INSPECTION & HIGH-RES MEDICAL VIEWER           */}
      {/* ============================================================== */}

      {/* Case Pin Detail Modal */}
      <AnimatePresence>
        {selectedCaseDetail && (
          <div
            onClick={() => setSelectedCaseDetail(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full rounded-3xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={selectedCaseDetail.author.avatar}
                    alt={selectedCaseDetail.author.name}
                    className="h-9 w-9 rounded-full object-cover ring-1 ring-blue-500/20"
                  />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {selectedCaseDetail.author.name}
                    </h3>
                    <p className="text-[10px] text-blue-600 dark:text-blue-400">
                      {selectedCaseDetail.author.credentials} • {selectedCaseDetail.author.clinicName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleSaveToVault(selectedCaseDetail, e)}
                    className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1"
                  >
                    <Bookmark className={`h-3 w-3 ${selectedCaseDetail.bookmarked ? 'fill-current text-amber-500' : ''}`} />
                    <span>{selectedCaseDetail.bookmarked ? 'In Vault' : 'Save to Vault'}</span>
                  </button>
                  <button
                    onClick={() => setSelectedCaseDetail(null)}
                    className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
                {/* Article Header View */}
                {selectedCaseDetail.articleMetadata ? (
                  <div className="space-y-4 pb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/50 flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        Clinical Article
                      </span>
                      {selectedCaseDetail.articleMetadata.readTimeMinutes && (
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {selectedCaseDetail.articleMetadata.readTimeMinutes} min read
                        </span>
                      )}
                      {selectedCaseDetail.articleMetadata.peerReviewed && (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Peer Reviewed
                        </span>
                      )}
                    </div>

                    <h2 className="text-base sm:text-xl font-bold text-neutral-900 dark:text-white leading-tight">
                      {selectedCaseDetail.articleMetadata.title}
                    </h2>

                    {selectedCaseDetail.articleMetadata.subtitle && (
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                        {selectedCaseDetail.articleMetadata.subtitle}
                      </p>
                    )}

                    {/* Abstract Box */}
                    {selectedCaseDetail.articleMetadata.abstract && (
                      <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/80 dark:border-indigo-900/40">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider mb-1">
                          <Quote className="h-3 w-3" />
                          Abstract & Objective
                        </div>
                        <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed italic">
                          {selectedCaseDetail.articleMetadata.abstract}
                        </p>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Main Scan / Figure */}
                {selectedCaseDetail.images && selectedCaseDetail.images.length > 0 && (
                  <div className="rounded-2xl overflow-hidden bg-black flex items-center justify-center max-h-[400px]">
                    <img
                      src={selectedCaseDetail.images[0]}
                      alt="Diagnostic Case or Article Figure"
                      className="max-h-[380px] w-auto object-contain"
                    />
                  </div>
                )}

                {/* Metadata for Clinical Cases */}
                {selectedCaseDetail.clinicalMetadata && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-2xl bg-neutral-50 dark:bg-[#202024] text-xs">
                    {selectedCaseDetail.clinicalMetadata.instrumentUsed && (
                      <div>
                        <span className="text-[10px] text-neutral-400 block font-medium">Instrument</span>
                        <span className="font-bold text-neutral-800 dark:text-neutral-200">
                          {selectedCaseDetail.clinicalMetadata.instrumentUsed}
                        </span>
                      </div>
                    )}
                    {selectedCaseDetail.clinicalMetadata.patientAgeSex && (
                      <div>
                        <span className="text-[10px] text-neutral-400 block font-medium">Patient</span>
                        <span className="font-bold text-neutral-800 dark:text-neutral-200">
                          {selectedCaseDetail.clinicalMetadata.patientAgeSex}
                        </span>
                      </div>
                    )}
                    {selectedCaseDetail.clinicalMetadata.acuity && (
                      <div>
                        <span className="text-[10px] text-neutral-400 block font-medium">Visual Acuity</span>
                        <span className="font-bold text-neutral-800 dark:text-neutral-200">
                          {selectedCaseDetail.clinicalMetadata.acuity}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Article Structured Sections */}
                {selectedCaseDetail.articleMetadata?.sections && selectedCaseDetail.articleMetadata.sections.length > 0 ? (
                  <div className="space-y-4 pt-2">
                    {selectedCaseDetail.articleMetadata.sections.map((sec, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                          {sec.heading}
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                          {sec.body}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-line">
                    {selectedCaseDetail.content}
                  </p>
                )}

                {/* Article References & Citations */}
                {selectedCaseDetail.articleMetadata?.citations && selectedCaseDetail.articleMetadata.citations.length > 0 && (
                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                      References & Literature Citations
                    </h5>
                    <ol className="list-decimal list-inside text-[11px] text-neutral-600 dark:text-neutral-400 space-y-1 pl-1">
                      {selectedCaseDetail.articleMetadata.citations.map((cite, idx) => (
                        <li key={idx} className="leading-relaxed">{cite}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Comments Section */}
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Peer Clinician Discussion ({selectedCaseDetail.comments.length})
                  </h4>

                  {selectedCaseDetail.comments.map((comm) => (
                    <div key={comm.id} className="p-3 rounded-xl bg-neutral-50 dark:bg-[#202024] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                          {comm.authorName} ({comm.authorCredentials})
                        </span>
                        <span className="text-[10px] text-neutral-400">{comm.createdAt}</span>
                      </div>
                      <p className="text-xs text-neutral-700 dark:text-neutral-300">{comm.content}</p>
                    </div>
                  ))}

                  <form
                    onSubmit={(e) => {
                      handleCommentSubmit(selectedCaseDetail.id, e);
                      const text = commentInputs[selectedCaseDetail.id]?.trim();
                      if (text) {
                        setSelectedCaseDetail((prev) =>
                          prev
                            ? {
                                ...prev,
                                comments: [
                                  ...prev.comments,
                                  {
                                    id: `c-${Date.now()}`,
                                    authorId: currentUser.id,
                                    authorName: currentUser.name,
                                    authorCredentials: currentUser.credentials,
                                    authorAvatar: currentUser.avatar,
                                    createdAt: 'Just now',
                                    content: text,
                                    likes: 0,
                                  },
                                ],
                              }
                            : null
                        );
                      }
                    }}
                    className="flex gap-2 pt-2"
                  >
                    <input
                      type="text"
                      value={commentInputs[selectedCaseDetail.id] || ''}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({ ...prev, [selectedCaseDetail.id]: e.target.value }))
                      }
                      placeholder="Share differential diagnosis or clinical pearl..."
                      className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#202024] px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      disabled={!commentInputs[selectedCaseDetail.id]?.trim()}
                      className="px-4 py-2 rounded-xl bg-blue-600 disabled:opacity-40 text-white text-xs font-bold"
                    >
                      Post
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* High-Resolution Medical Image Magnifier */}
      <AnimatePresence>
        {zoomedImage && (
          <div
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl max-h-[92vh] overflow-hidden rounded-3xl bg-neutral-950 flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-white text-xs">
                <span className="font-bold flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-400" />
                  {zoomedImage.instrument || 'High-Resolution Diagnostic Scan'}
                </span>
                <button
                  onClick={() => setZoomedImage(null)}
                  className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs"
                >
                  Close
                </button>
              </div>
              <div className="p-2 flex items-center justify-center bg-black">
                <img
                  src={zoomedImage.url}
                  alt={zoomedImage.title}
                  className="max-h-[80vh] w-auto object-contain rounded"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Save Notification Toast */}
      <AnimatePresence>
        {savedNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold border border-white/10"
          >
            <Bookmark className="h-4 w-4 fill-current text-amber-400" />
            <span>{savedNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
