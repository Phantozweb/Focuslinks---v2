import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Building2,
  GraduationCap,
  MapPin,
  Users,
  Eye,
  FileText,
  Briefcase,
  Share2,
  Download,
  Plus,
  ThumbsUp,
  MessageSquare,
  ExternalLink,
  ChevronRight,
  Stethoscope,
  Sparkles,
  Camera,
  Edit3,
  Bookmark,
  Calendar,
  Layers,
  Send,
  Sliders,
  Check
} from 'lucide-react';
import { DoctorProfile, SpecialtyEndorsement, ClinicalPost } from '../types';
import { DoctorAvatar } from './common/DoctorAvatar';

interface LinkedInProfileViewProps {
  profile: DoctorProfile;
  isCurrentUser: boolean;
  onEditProfile: () => void;
  onToggleEndorse: (specialtyId: string) => void;
  onSelectPost?: (post: ClinicalPost) => void;
  posts: ClinicalPost[];
  onOpenNewPost?: () => void;
  onSwitchDoctor?: (doctorId: string) => void;
  allDoctors?: DoctorProfile[];
  onBackToDirectory?: () => void;
}

export const LinkedInProfileView: React.FC<LinkedInProfileViewProps> = ({
  profile,
  isCurrentUser,
  onEditProfile,
  onToggleEndorse,
  posts,
  onOpenNewPost,
  onSwitchDoctor,
  allDoctors = [],
  onBackToDirectory,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'cases' | 'activity' | 'publications' | 'recommendations'>('overview');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionCount, setConnectionCount] = useState(profile.connectionsCount);
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [consultSent, setConsultSent] = useState(false);
  const [consultSubject, setConsultSubject] = useState('Scleral Lens Consultation / Referral');
  const [consultNote, setConsultNote] = useState('Hello Dr. Vance, I would like to refer a 38yo patient with severe pellucid marginal degeneration for custom scleral fitting...');

  const handleToggleConnect = () => {
    if (isConnected) {
      setIsConnected(false);
      setConnectionCount((prev) => prev - 1);
    } else {
      setIsConnected(true);
      setConnectionCount((prev) => prev + 1);
    }
  };

  const handleExportCV = () => {
    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  };

  const handleSendConsult = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSent(true);
    setTimeout(() => {
      setConsultSent(false);
      setShowConsultModal(false);
    }, 1800);
  };

  const doctorPosts = posts.filter((p) => p.author.id === profile.id);

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-5">
      {/* Context Bar: Personalized for My Profile vs Colleague View */}
      {isCurrentUser ? (
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-transparent border border-blue-500/20 text-xs shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-neutral-900 dark:text-white leading-tight">
                My Verified Clinical Profile
              </p>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                ID: <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{profile.membershipId || 'FL-29841-OD'}</span> • License: <span className="font-mono font-medium">{profile.licenseNumber || 'OPT-29841-CA'}</span> • {profile.licenseState || 'California Board of Optometry'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onEditProfile}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-xs cursor-pointer text-xs"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit My Profile</span>
            </button>
            <button
              onClick={handleExportCV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1f1f23] text-neutral-700 dark:text-neutral-300 font-semibold border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-2xs cursor-pointer text-xs"
            >
              <Download className="h-3.5 w-3.5 text-neutral-500" />
              <span>Export CV</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs">
          <div className="flex items-center gap-2">
            {onBackToDirectory && (
              <button
                onClick={onBackToDirectory}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-[#1f1f23] text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors shadow-2xs mr-1"
              >
                <span>← Back to Directory</span>
              </button>
            )}
            <span className="text-neutral-600 dark:text-neutral-400 font-medium">
              Viewing Colleague: <strong className="text-neutral-900 dark:text-white">{profile.name}</strong>
            </span>
          </div>
        </div>
      )}

      {/* Main Doctor Profile Header Card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b] overflow-hidden shadow-xs">
        {/* Cover Banner */}
        <div className="relative h-44 sm:h-56 w-full bg-linear-to-r from-blue-900 via-indigo-950 to-neutral-900 overflow-hidden">
          <img
            src={profile.bannerImage || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&auto=format&fit=crop&q=80'}
            alt="Clinic Banner"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&auto=format&fit=crop&q=80';
            }}
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          {/* Subtle Ophthalmic Grid Accent */}
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

          {/* Banner Tag */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white/90 border border-white/10 flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-blue-400" />
            <span>{profile.clinicName}</span>
          </div>

          {isCurrentUser && (
            <button
              onClick={onEditProfile}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 backdrop-blur-md p-2 rounded-full text-white/90 transition-colors"
              title="Update Banner"
            >
              <Camera className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Profile Details Container */}
        <div className="relative px-6 pb-6 pt-0">
          {/* Floating Avatar with Bulletproof Error Fallback */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4">
            <DoctorAvatar
              src={profile.avatar}
              alt={profile.name}
              className="h-28 w-28 sm:h-36 sm:w-36 rounded-full border-4 border-white dark:border-[#18181b] shadow-xl ring-2 ring-blue-500/20 bg-white dark:bg-neutral-800"
              verified={profile.verified}
              badgeSize="lg"
            />

            {/* Profile Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-end">
              {isCurrentUser ? (
                <>
                  <button
                    onClick={onEditProfile}
                    className="flex items-center gap-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-4 py-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-2xs"
                  >
                    <Edit3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={handleExportCV}
                    className="flex items-center gap-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-3.5 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <Download className="h-4 w-4 text-neutral-500" />
                    <span>Export Optometric CV</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleToggleConnect}
                    className={`flex items-center gap-1.5 rounded-lg px-5 py-2 text-sm font-semibold transition-colors shadow-2xs ${
                      isConnected
                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <Users className="h-4 w-4" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowConsultModal(true)}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-semibold transition-colors shadow-2xs"
                  >
                    <Stethoscope className="h-4 w-4" />
                    <span>Refer / Consult</span>
                  </button>

                  <button
                    onClick={handleExportCV}
                    className="flex items-center gap-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-3.5 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <Download className="h-4 w-4 text-neutral-500" />
                    <span className="hidden sm:inline">Export CV</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Export CV Toast */}
          <AnimatePresence>
            {showExportSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <strong>Clinical Dossier Generated:</strong> Comprehensive Curriculum Vitae with Case Portfolio exported as PDF.
                </span>
                <span className="font-mono text-[10px] uppercase bg-emerald-100 dark:bg-emerald-900 px-2 py-0.5 rounded">Ready</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Name & Credentials */}
          <div className="mt-4 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
                {profile.name}
              </h1>
              <span className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 rounded-md border border-blue-200 dark:border-blue-900/50">
                {profile.credentials}
              </span>
              <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> State Board Verified
              </span>
            </div>

            {/* Professional Headline */}
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed max-w-3xl">
              {profile.headline}
            </p>

            {/* Practice & Academic Anchor */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 pt-1 text-xs text-neutral-600 dark:text-neutral-400">
              <span className="flex items-center gap-1 font-semibold text-neutral-800 dark:text-neutral-200">
                <Building2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                {profile.clinicName}
              </span>
              <span className="flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                UC Berkeley School of Optometry
              </span>
              <span className="flex items-center gap-1 text-neutral-500">
                <MapPin className="h-3.5 w-3.5" />
                {profile.location}
              </span>
            </div>

            {/* Connections & Followers count */}
            <div className="flex items-center gap-3 pt-2 text-xs">
              <span className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {connectionCount.toLocaleString()} Optometric Connections
              </span>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <span className="text-neutral-600 dark:text-neutral-400">
                {profile.followersCount.toLocaleString()} Followers
              </span>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                58 Mutual Optometrists
              </span>
            </div>
          </div>

          {/* Verification & License Details Bar */}
          <div className="mt-4 p-3.5 rounded-xl bg-neutral-50 dark:bg-[#141417] border border-neutral-200/80 dark:border-neutral-800 text-xs grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <span className="text-neutral-400 dark:text-neutral-500 block text-[10px] uppercase font-semibold tracking-wider">Licensure Jurisdiction</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">{profile.licenseState}</span>
            </div>
            <div>
              <span className="text-neutral-400 dark:text-neutral-500 block text-[10px] uppercase font-semibold tracking-wider">Medical License & NPI</span>
              <span className="font-mono text-neutral-800 dark:text-neutral-200">{profile.licenseNumber} • NPI: {profile.npiNumber}</span>
            </div>
            <div>
              <span className="text-neutral-400 dark:text-neutral-500 block text-[10px] uppercase font-semibold tracking-wider">Therapeutic Certifications</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> TPA, TLG (Glaucoma) & DEA Active
              </span>
            </div>
          </div>

          {/* LinkedIn "Open To" Box */}
          <div className="mt-3 p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/70 dark:border-blue-900/40 text-xs">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">Open to Practice Opportunities & Referrals</span>
                  <span className="rounded bg-blue-600 text-white px-1.5 py-0.2 text-[10px] font-semibold">Active</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {profile.openTo.referrals && (
                    <span className="bg-white dark:bg-[#1a1a20] px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 font-medium">
                      ✓ Complex Scleral & Ectasia Referrals
                    </span>
                  )}
                  {profile.openTo.consulting && (
                    <span className="bg-white dark:bg-[#1a1a20] px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 font-medium">
                      ✓ Scleral & AS-OCT Peer Consulting
                    </span>
                  )}
                  {profile.openTo.clinicalTrials && (
                    <span className="bg-white dark:bg-[#1a1a20] px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 font-medium">
                      ✓ Clinical Trial Investigator
                    </span>
                  )}
                  {profile.openTo.locumTenens && (
                    <span className="bg-white dark:bg-[#1a1a20] px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 font-medium">
                      ✓ Locum Tenens / Surgical Coverage
                    </span>
                  )}
                </div>
              </div>
              {isCurrentUser && (
                <button
                  onClick={onEditProfile}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold shrink-0 ml-2"
                >
                  Edit Preferences
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Card (LinkedIn style) */}
      {isCurrentUser && (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b] p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                <Sliders className="h-4 w-4 text-blue-600" />
                Analytics & Clinical Network Reach
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Private to you • Updated 2 hours ago</p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
              +18% Optometric Engagement
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-1">
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#121215] border border-neutral-200/60 dark:border-neutral-800/60">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 block mb-0.5">Profile Views</span>
              <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{profile.profileViewsThisWeek}</span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">Past 7 days</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#121215] border border-neutral-200/60 dark:border-neutral-800/60">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 block mb-0.5">Post Impressions</span>
              <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">1,420</span>
              <span className="text-[10px] text-blue-600 block mt-0.5">Clinical Pearls Reach</span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#121215] border border-neutral-200/60 dark:border-neutral-800/60">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 block mb-0.5">Search Appearances</span>
              <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{profile.searchAppearances}</span>
              <span className="text-[10px] text-purple-600 block mt-0.5">Top: "Scleral Specialist SF"</span>
            </div>
          </div>
        </div>
      )}

      {/* Profile Section Tabs */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b] rounded-t-2xl px-3 pt-2 gap-1 overflow-x-auto shadow-2xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
          }`}
        >
          <Briefcase className="h-4 w-4" />
          <span>Credentials & Experience</span>
        </button>

        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'cases'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Clinical Case Portfolio</span>
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'activity'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Discussions & Cases ({doctorPosts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('publications')}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'publications'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Publications & CE ({profile.publications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'recommendations'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
          }`}
        >
          <ThumbsUp className="h-4 w-4" />
          <span>Recommendations ({profile.recommendations.length})</span>
        </button>
      </div>

      {/* Tab 1: Overview & Credentials */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* About Section */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b] p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                About / Practice Philosophy
              </h2>
              {isCurrentUser && (
                <button
                  onClick={onEditProfile}
                  className="text-neutral-400 hover:text-blue-600 p-1 rounded-md"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line space-y-3">
              {profile.about}
            </div>
          </div>

          {/* Clinical Specialties & Peer Endorsement Engine (LinkedIn Hallmark Feature) */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b] p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  Clinical Specialties & Peer Endorsements
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Endorsed by fellow Optometrists (ODs) and Ophthalmologist (MD) surgical co-managers
                </p>
              </div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-900/50">
                {profile.clinicalSpecialties.reduce((acc, s) => acc + s.endorsementsCount, 0)} Total Endorsements
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {profile.clinicalSpecialties.map((spec) => (
                <div
                  key={spec.id}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800/90 bg-neutral-50/50 dark:bg-[#131316] hover:border-blue-300 dark:hover:border-blue-800 transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                        {spec.name}
                      </h3>
                      <span className="shrink-0 text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
                        {spec.endorsementsCount}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 block mt-0.5">
                      {spec.category}
                    </span>
                  </div>

                  {/* Endorsers preview & Interactive Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60">
                    <div className="flex items-center -space-x-2">
                      {spec.endorsers.slice(0, 3).map((endorser, i) => (
                        <img
                          key={i}
                          src={endorser.avatar}
                          alt={endorser.name}
                          title={`${endorser.name} (${endorser.role})`}
                          className="h-6 w-6 rounded-full object-cover border-2 border-white dark:border-[#18181b]"
                        />
                      ))}
                      {spec.endorsers.length > 0 && (
                        <span className="text-[10px] text-neutral-500 ml-3">
                          Endorsed by {spec.endorsers[0].name.split(' ')[0]} + others
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onToggleEndorse(spec.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        spec.userEndorsed
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white dark:bg-[#202024] text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <ThumbsUp className={`h-3.5 w-3.5 ${spec.userEndorsed ? 'fill-white' : ''}`} />
                      <span>{spec.userEndorsed ? 'Endorsed ✓' : 'Endorse'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Practice Experience (LinkedIn Style Timeline) */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b] p-6 shadow-2xs space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                Clinical Experience & Practice Appointments
              </h2>
              {isCurrentUser && (
                <button onClick={onEditProfile} className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
                  <Plus className="h-3.5 w-3.5" /> Add Role
                </button>
              )}
            </div>

            <div className="space-y-6">
              {profile.experiences.map((exp, index) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-neutral-200 dark:border-neutral-800 pb-2 last:pb-0">
                  {/* Timeline bullet */}
                  <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white dark:border-[#18181b] ${
                    exp.isCurrent ? 'bg-blue-600 ring-4 ring-blue-500/20' : 'bg-neutral-400 dark:bg-neutral-600'
                  }`} />

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100">
                        {exp.title}
                      </h3>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                      <Building2 className="h-3.5 w-3.5" />
                      <span>{exp.clinic}</span>
                      <span className="text-neutral-400">•</span>
                      <span className="text-neutral-500 font-normal">{exp.location}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed pt-1">
                      {exp.description}
                    </p>

                    {exp.caseVolume && (
                      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-0.5">
                        <Users className="h-3.5 w-3.5" /> Case Volume: {exp.caseVolume}
                      </p>
                    )}

                    {/* Tech Stack Pills */}
                    {exp.technologiesUsed && exp.technologiesUsed.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.technologiesUsed.map((tech, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-neutral-100 dark:bg-[#202024] px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Residencies */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b] p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-indigo-600" />
              Optometry Education & Subspecialty Residencies
            </h2>

            <div className="space-y-4">
              {profile.education.map((edu) => (
                <div key={edu.id} className="p-4 rounded-xl bg-neutral-50/60 dark:bg-[#131316] border border-neutral-200/70 dark:border-neutral-800/80 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {edu.institution}
                      </h3>
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {edu.degree} — {edu.fieldOfStudy}
                      </p>
                    </div>
                    <span className="text-xs text-neutral-500 font-medium shrink-0">
                      {edu.startYear} – {edu.endYear}
                    </span>
                  </div>

                  {edu.honors && (
                    <p className="text-xs text-amber-700 dark:text-amber-400 font-medium pt-1 flex items-center gap-1">
                      <Award className="h-3.5 w-3.5" />
                      {edu.honors}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Board Certifications & Licensure */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b] p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              Board Certifications, Fellowships & Medical Credentials
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profile.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#131316] space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                      {cert.name}
                    </h3>
                    {cert.badge && (
                      <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                        {cert.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">{cert.issuingOrganization}</p>
                  <p className="text-[11px] text-neutral-500 font-mono pt-1">
                    Issued {cert.issueDate} • Credential: {cert.credentialId}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Instrumentation & Tech Stack Card */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b] p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Eye className="h-5 w-5 text-purple-600" />
              Diagnostic Instrumentation & Clinical Equipment Proficiency
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {profile.diagnosticTechnologies.map((tech, i) => (
                <div key={i} className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#141417]">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{tech.name}</span>
                    <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-1.5 py-0.5 rounded">
                      {tech.yearsUsing} yrs
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500 block mt-0.5">{tech.category}</span>
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> {tech.proficiency}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Clinical Case Portfolio */}
      {activeTab === 'cases' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b] p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  Featured Clinical Case Showcase
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  De-identified anterior segment photographs, profilometry maps, and therapeutic outcomes
                </p>
              </div>
              <button
                onClick={onOpenNewPost}
                className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
              >
                <Plus className="h-4 w-4" /> Publish New Case
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {doctorPosts
                .filter((p) => p.images && p.images.length > 0)
                .map((post) => (
                  <div
                    key={post.id}
                    className="group overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#131316] hover:shadow-md transition-all"
                  >
                    <div className="relative aspect-video overflow-hidden bg-black">
                      <img
                        src={post.images![0]}
                        alt="Clinical case"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-semibold text-white">
                        {post.clinicalMetadata?.instrumentUsed || 'Biomicroscopy'}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                          {post.clinicalMetadata?.patientAgeSex || 'Case'}
                        </span>
                        <span className="text-xs text-neutral-400">{post.createdAt}</span>
                      </div>
                      <p className="text-xs text-neutral-800 dark:text-neutral-200 font-medium line-clamp-3">
                        {post.content}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60 text-xs text-neutral-500">
                        <span>{post.likes} Colleagues Applauded</span>
                        <span>{post.comments.length} Discussion Replies</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Activity & Threads */}
      {activeTab === 'activity' && (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b] p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Threads & Clinical Discussions by {profile.name}
            </h2>
            <button
              onClick={onOpenNewPost}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Start Thread
            </button>
          </div>

          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {doctorPosts.map((post) => (
              <div key={post.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">{post.author.name}</span>
                  <span>posted {post.createdAt}</span>
                </div>
                <p className="text-sm text-neutral-800 dark:text-neutral-200 whitespace-pre-line leading-relaxed">
                  {post.content}
                </p>
                {post.images && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {post.images.map((img, i) => (
                      <img key={i} src={img} alt="Post asset" className="rounded-lg h-40 w-full object-cover" />
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-4 text-xs text-neutral-500 pt-2">
                  <span>❤️ {post.likes} likes</span>
                  <span>🔄 {post.reposts} reposts</span>
                  <span>💬 {post.comments.length} replies</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Publications & CE */}
      {activeTab === 'publications' && (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b] p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Peer-Reviewed Publications & Continuing Education (CE)
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Indexed in PubMed / MEDLINE and American Academy of Optometry proceedings
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {profile.publications.map((pub) => (
              <div
                key={pub.id}
                className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#131316] space-y-2"
              >
                <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {pub.title}
                </h3>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {pub.journal} • {pub.publicationDate}
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  <strong>Authors:</strong> {pub.authors}
                </p>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 italic bg-white dark:bg-[#18181b] p-3 rounded-lg border border-neutral-200/70 dark:border-neutral-800/70">
                  "{pub.abstractSnippet}"
                </p>
                {pub.doi && (
                  <div className="pt-1 flex items-center gap-2 text-xs">
                    <span className="font-mono text-[11px] text-neutral-500">DOI: {pub.doi}</span>
                    <a
                      href={pub.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
                    >
                      Read Publication <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Recommendations */}
      {activeTab === 'recommendations' && (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b] p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-blue-600" />
                Optometric Peer & Surgical Co-Management Recommendations
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Verified written endorsements from cornea surgeons, academic faculty, and optometric partners
              </p>
            </div>
            {isCurrentUser && (
              <button
                onClick={() => alert('Recommendation request link generated for fellow ODs!')}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Request Recommendation
              </button>
            )}
          </div>

          <div className="space-y-4">
            {profile.recommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#131316] space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={rec.authorAvatar}
                    alt={rec.authorName}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-blue-500/20"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{rec.authorName}</h3>
                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400">{rec.authorTitle}</p>
                    <p className="text-[11px] text-neutral-500">{rec.authorClinic} • {rec.date}</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 italic">Relationship: {rec.relationship}</p>
                <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed pt-1">
                  "{rec.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clinical Consultation Modal */}
      <AnimatePresence>
        {showConsultModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-800 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-emerald-600" />
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    Clinical Referral / Colleague Consult
                  </h3>
                </div>
                <button
                  onClick={() => setShowConsultModal(false)}
                  className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                >
                  ✕
                </button>
              </div>

              {consultSent ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">Consult Request Sent</h4>
                  <p className="text-xs text-neutral-500">
                    Dr. {profile.name} has been notified and will review your referral via secure clinic messaging.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendConsult} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Recipient
                    </label>
                    <div className="p-2 rounded-lg bg-neutral-50 dark:bg-[#131316] text-xs font-medium text-neutral-800 dark:text-neutral-200">
                      {profile.name} ({profile.credentials}) — {profile.clinicName}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Consult Subject / Category
                    </label>
                    <input
                      type="text"
                      value={consultSubject}
                      onChange={(e) => setConsultSubject(e.target.value)}
                      className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-3 py-2 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Clinical Background & Diagnostic Questions
                    </label>
                    <textarea
                      rows={4}
                      value={consultNote}
                      onChange={(e) => setConsultNote(e.target.value)}
                      className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-3 py-2 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-[11px] text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 shrink-0" />
                    <span>HIPAA Compliant encrypted channel between verified OD peers.</span>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowConsultModal(false)}
                      className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                    >
                      <Send className="h-3.5 w-3.5" /> Send Clinical Consult
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
