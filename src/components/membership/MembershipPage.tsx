import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Activity, 
  Globe, 
  Award, 
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Lock,
  Check,
  FileCheck,
  UploadCloud,
  Trash2,
  RefreshCw,
  Eye,
  MessageSquare,
  BookOpen,
  Scale,
  QrCode,
  Layers,
  HelpCircle,
  Target,
  Milestone,
  Shield,
  Stethoscope,
  ChevronRight,
  GraduationCap,
  Building2,
  CheckCircle2,
  Sparkle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GrowthMilestones } from './GrowthMilestones';

interface MembershipPageProps {
  onBackToHome: () => void;
  onEnterApp: (destination?: 'feed' | 'gallery' | 'groups' | 'doctors') => void;
  onGetFreeId: () => void;
  isLoggedIn: boolean;
  currentUserMembershipId?: string;
  onSuccessLogin?: (membershipId: string) => void;
}

interface PerkComparisonItem {
  feature: string;
  category: string;
  student: string;
  clinician: string;
  fellow: string;
  detail: string;
}

const COMPARISON_PERKS: PerkComparisonItem[] = [
  {
    feature: 'Specialist Directory Presence',
    category: 'Networking & Discovery',
    student: 'Resident Roster',
    clinician: 'Full Practice Listing',
    fellow: 'Featured Senior Fellow',
    detail: 'Searchable geographic and specialty locator enabling peer patient referrals.'
  },
  {
    feature: 'Verified Digital Membership Credential',
    category: 'Identity',
    student: 'Student ID Key',
    clinician: 'Licensed Clinician Key',
    fellow: 'Fellowship Council Key',
    detail: 'Unique cryptographic credential verifying authentic clinical standing.'
  },
  {
    feature: 'Peer Co-Management Referral Tool',
    category: 'Patient Care',
    student: 'Read-Only Case Log',
    clinician: 'Direct Referrals & Messages',
    fellow: 'Complex Case Consultations',
    detail: 'Secure doctor-to-doctor communication channel without corporate intermediaries.'
  },
  {
    feature: 'Anterior Segment & OCT Scan Gallery',
    category: 'Clinical Knowledge',
    student: 'Full Access & Study Mode',
    clinician: 'Upload, Discuss & Tag',
    fellow: 'Case Moderator & Reviewer',
    detail: 'Repository of de-identified keratoconus, scleral clearance, and anterior segment images.'
  },
  {
    feature: 'Clinical Playbooks & Protocol Guides',
    category: 'Practice Resources',
    student: 'Foundational Guides',
    clinician: 'Full Protocol Library',
    fellow: 'Authoring & Committee Review',
    detail: 'Practical fitting guides, landing zone calculations, and dry eye staging algorithms.'
  },
  {
    feature: 'Regional Study Circles & Panels',
    category: 'Community',
    student: 'Student Chapter Access',
    clinician: 'Local Practice Circles',
    fellow: 'Panel Host & Moderator',
    detail: 'Virtual peer rounds and regional optometric discussion chapters.'
  },
  {
    feature: 'Independent Practice Advocacy Voice',
    category: 'Advocacy',
    student: 'Observing Member',
    clinician: 'Active Voting Member',
    fellow: 'Advisory Committee Lead',
    detail: 'Participate in surveys, policy discussions, and initiatives supporting independent practice.'
  },
  {
    feature: 'Resident & Early Career Mentorship',
    category: 'Education',
    student: 'Mentee Placement',
    clinician: 'Peer Collaboration',
    fellow: 'Active Clinical Mentor',
    detail: 'Connecting rising clinicians with experienced specialty lens fitters and practice owners.'
  }
];

export const MembershipPage: React.FC<MembershipPageProps> = ({
  onBackToHome,
  onEnterApp,
  onGetFreeId,
  isLoggedIn,
  currentUserMembershipId,
  onSuccessLogin
}) => {
  // Track selection state (Students & Residents vs Licensed Clinicians vs Fellows/Mentors)
  const [selectedCohort, setSelectedCohort] = useState<'student' | 'clinician' | 'fellow'>('clinician');
  
  // Perks view mode: 'now' vs 'roadmap'
  const [perkTimelineTab, setPerkTimelineTab] = useState<'available_today' | 'target_roadmap'>('available_today');

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Onboarding Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [specialty, setSpecialty] = useState('Cornea & Specialty Lenses');
  const [licenseType, setLicenseType] = useState('State/National Optometry License');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [onboardingStatus, setOnboardingStatus] = useState<'idle' | 'submitting' | 'verifying_db' | 'generating_id' | 'success' | 'error'>('idle');
  const [generatedId, setGeneratedId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Form Submission
  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !licenseNumber.trim()) {
      setOnboardingStatus('error');
      setErrorMessage('Please provide your full legal name, clinical email, and professional license or student registration number.');
      return;
    }

    setErrorMessage('');
    setOnboardingStatus('submitting');

    setTimeout(() => {
      setOnboardingStatus('verifying_db');
      setTimeout(() => {
        setOnboardingStatus('generating_id');
        setTimeout(() => {
          const randomNum = Math.floor(1000 + Math.random() * 9000);
          const newId = `FL-${randomNum}-OD`;
          setGeneratedId(newId);
          setOnboardingStatus('success');

          if (onSuccessLogin) {
            onSuccessLogin(newId);
          }
        }, 1200);
      }, 1200);
    }, 1000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setUploadedFileName(file.name);
      if (onboardingStatus === 'error') setOnboardingStatus('idle');
    }
  };

  const activeId = currentUserMembershipId || generatedId;
  const showConnectedIdCard = isLoggedIn || onboardingStatus === 'success';

  const FAQS = [
    {
      q: 'Is FocusLinks membership genuinely free for optometrists?',
      a: 'Yes, 100%. FocusLinks is structured as a non-commercial professional collective founded by and for optometrists. There are no monthly subscriptions, paywalled case discussions, or hidden fees. We believe peer clinical connection and patient co-management should be universally accessible.'
    },
    {
      q: 'How does credential verification work, and why is it necessary?',
      a: 'Because optometrists discuss real anterior segment pathologies, complex keratoconus management, and patient care workflows, keeping the community strictly verified eye-care professionals is vital. We verify credentials against active state, national, or collegiate registers to ensure a secure, trusted peer environment.'
    },
    {
      q: 'Can optometry students and international residents join?',
      a: 'Absolutely. We have a dedicated Academic Track for optometry students, interns, and academic residents. Students gain early exposure to rare anterior segment cases, clinical fitting pearls, and mentorship from seasoned clinicians worldwide.'
    },
    {
      q: 'How does FocusLinks handle patient privacy and clinical images?',
      a: 'All clinical submissions, anterior segment photographs, and OCT scans must be fully de-identified in strict compliance with HIPAA (US), GDPR (EU), and equivalent international privacy standards. No patient names, birthdates, or identifying clinical markers are permitted.'
    },
    {
      q: 'What is the long-term vision of FocusLinks?',
      a: 'Our long-term target is to build an independent digital harbor for optometry: a platform that preserves the clinical autonomy of independent practices, facilitates cross-regional patient referrals, provides non-commercial clinical education, and unites colleagues across the globe in genuine peer collaboration.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 text-left relative selection:bg-blue-600 selection:text-white">
      {/* Subtle Background Lighting */}
      <div className="absolute top-16 left-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[900px] right-8 w-[380px] h-[380px] bg-gradient-to-tr from-sky-500/5 via-blue-500/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Navigation & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs transition-all hover:scale-[1.01] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home Overview</span>
        </motion.button>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span>Founding Member Cohort • Free Clinical Access</span>
        </div>
      </div>

      {/* Hero Header Section — Professional, Grounded & Visionary */}
      <div className="relative max-w-4xl space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <Stethoscope className="h-4 w-4" />
          <span>Built By Optometrists, For Optometrists</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
          A Dedicated Digital Space for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500">Optometric Unity</span>
        </h1>
        
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal max-w-3xl">
          Independent eye-care professionals thrive when connected. FocusLinks was established as a non-commercial, practitioner-led movement to bring students, practicing clinicians, and specialty fellows together into one unified, transparent clinical workspace.
        </p>

        {/* Real Core Value Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
          <div className="p-3 rounded-2xl bg-white dark:bg-[#121219] border border-neutral-200/80 dark:border-neutral-800/80 text-left">
            <p className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-blue-500" />
              <span>100% Free Forever</span>
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">No subscription paywalls</p>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-[#121219] border border-neutral-200/80 dark:border-neutral-800/80 text-left">
            <p className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              <span>Verified Doctors Only</span>
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">Authentic peer dialogue</p>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-[#121219] border border-neutral-200/80 dark:border-neutral-800/80 text-left">
            <p className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <Scale className="h-3.5 w-3.5 text-purple-500" />
              <span>Independent Focus</span>
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">Free of corporate influence</p>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-[#121219] border border-neutral-200/80 dark:border-neutral-800/80 text-left">
            <p className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-sky-500" />
              <span>Cross-Border Reach</span>
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">Global referral exchange</p>
          </div>
        </div>
      </div>

      {/* ACTIVE MEMBER CREDENTIAL CARD & WORKSPACE ACCESS (Shown when verified/logged in) */}
      <AnimatePresence>
        {showConnectedIdCard && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
            {/* Digital Membership Pass Card (5 Columns) */}
            <div className="lg:col-span-5 bg-gradient-to-tr from-[#13131c] via-[#0d0d12] to-[#181827] border border-neutral-800 p-6 sm:p-7 rounded-3xl text-left relative overflow-hidden flex flex-col justify-between shadow-lg">
              <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-white font-bold uppercase tracking-wider">
                    <QrCode className="h-4 w-4 text-blue-400" />
                    <span>FocusLinks Clinical Pass</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">Verified Professional Member</p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[10px] uppercase tracking-wider border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span>Active & Verified</span>
                </div>
              </div>

              <div className="space-y-3.5 my-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Member Name</span>
                  <p className="text-lg font-bold text-white tracking-tight">{fullName || 'Verified Optometrist'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-neutral-800/80">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Primary Specialty</span>
                    <p className="text-xs font-semibold text-neutral-300">{specialty}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">FocusLinks Key ID</span>
                    <p className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 w-fit">
                      {activeId || 'FL-3982-OD'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono tracking-wider pt-3 border-t border-neutral-800/60">
                <span>IDENTITY CLEARED</span>
                <span>DE-IDENTIFIED AUDIT COMPLIANT</span>
              </div>
            </div>

            {/* Direct Member Launchpad (7 Columns) */}
            <div className="lg:col-span-7 bg-white dark:bg-[#111117] border border-neutral-200 dark:border-neutral-800/80 p-6 sm:p-7 rounded-3xl shadow-sm flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">Clinical Workspace Portal</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Your membership credential is linked. Jump directly into any workspace module below.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
                <button
                  onClick={() => onEnterApp('feed')}
                  className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#161621] border border-neutral-200/80 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500/80 text-left transition-all group cursor-pointer"
                >
                  <p className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                    <span>Clinical Case Feed</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">Review active complex case files, corneal imaging questions, and peer insights.</p>
                </button>

                <button
                  onClick={() => onEnterApp('doctors')}
                  className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#161621] border border-neutral-200/80 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500/80 text-left transition-all group cursor-pointer"
                >
                  <p className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                    <span>Verified Colleague Directory</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">Locate specialty cornea, scleral, and pediatrics peers for referral handshakes.</p>
                </button>

                <button
                  onClick={() => onEnterApp('gallery')}
                  className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#161621] border border-neutral-200/80 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500/80 text-left transition-all group cursor-pointer"
                >
                  <p className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                    <span>Ocular Scan Repository</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">Explore high-resolution anterior segment OCT scans and lens vault profiles.</p>
                </button>

                <button
                  onClick={() => onEnterApp('groups')}
                  className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#161621] border border-neutral-200/80 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500/80 text-left transition-all group cursor-pointer"
                >
                  <p className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                    <span>Regional Study Circles</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">Connect with regional chapters and specialty study groups across countries.</p>
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Logged in via FocusLinks Credential ID</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Session Protected</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION: WHY WE STARTED & OUR TARGET VISION */}
      <div className="mb-14 bg-gradient-to-br from-neutral-50 via-white to-blue-50/20 dark:from-[#111116] dark:via-[#111117] dark:to-[#131624] border border-neutral-200/90 dark:border-neutral-800/90 rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Target className="h-3.5 w-3.5 text-blue-500" />
            <span>Our Founding Philosophy</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            Why FocusLinks Exists: Breaking the Isolation in Optometry
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
            For decades, independent optometrists have worked in silos. Private practice doctors navigate complex corneal pathologies and retail pressures alone. Meanwhile, commercial platforms monetize eye doctors, sell sponsored product placements, and fracture clinical referrals into corporate closed networks.
          </p>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
            <strong className="text-neutral-900 dark:text-white">Our target vision is straightforward:</strong> to establish a permanent, non-commercial peer haven. A place where an optometrist fitting their first quadrant-specific scleral lens in São Paulo can get feedback from a veteran cornea fellow in Boston within two hours—without algorithms, paywalls, or marketing noise.
          </p>
        </div>

        {/* 3 Real Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 mt-8 border-t border-neutral-200/70 dark:border-neutral-800/70">
          <div className="space-y-1.5 text-left">
            <div className="h-8 w-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Uncompromised Independence</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              We do not accept pharmaceutical or corporate board seat control. The clinical discussions remain guided strictly by evidence-based medicine.
            </p>
          </div>

          <div className="space-y-1.5 text-left">
            <div className="h-8 w-8 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Practitioner-Centric Security</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Patient confidentiality is sacred. Every shared case is scrubbed and formatted to protect both patient privacy and doctor liability.
            </p>
          </div>

          <div className="space-y-1.5 text-left">
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Intergenerational Mentorship</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Connecting senior specialty fellows with residents so clinical expertise in specialty contact lenses and anterior segment disease is passed forward.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION: CAREER GROWTH MILESTONES (INTERACTIVE CONTINUUM) */}
      <GrowthMilestones
        onSelectMilestoneAction={(milestone) => {
          if (milestone.id === 'student-resident') {
            setSelectedCohort('student');
          } else if (milestone.id === 'senior-fellow' || milestone.id === 'specialty-director') {
            setSelectedCohort('fellow');
          } else {
            setSelectedCohort('clinician');
          }
        }}
      />

      {/* SECTION: PROFESSIONAL COHORTS & MEMBERSHIP TRACKS (Grounded & Professional, not gamey levels) */}
      <div className="mb-14">
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Users className="h-4 w-4" />
            <span>Professional Cohorts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            Structured for Every Stage of Clinical Practice
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium max-w-2xl">
            Whether you are in your final residency year or have chaired an optometry board for twenty years, FocusLinks provides a tailored, respected clinical role.
          </p>
        </div>

        {/* Cohort Tab Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 bg-neutral-100/80 dark:bg-[#14141e] rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 mb-6">
          <button
            onClick={() => setSelectedCohort('student')}
            className={`p-3.5 rounded-xl text-left transition-all cursor-pointer flex items-center gap-3 ${
              selectedCohort === 'student'
                ? 'bg-white dark:bg-[#1a1a26] text-neutral-900 dark:text-white shadow-xs border border-neutral-200/80 dark:border-neutral-700/80'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <div className={`p-2 rounded-lg ${selectedCohort === 'student' ? 'bg-blue-600 text-white' : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-500'}`}>
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold">Students & Residents</p>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Academic & Residency Track</p>
            </div>
          </button>

          <button
            onClick={() => setSelectedCohort('clinician')}
            className={`p-3.5 rounded-xl text-left transition-all cursor-pointer flex items-center gap-3 ${
              selectedCohort === 'clinician'
                ? 'bg-white dark:bg-[#1a1a26] text-neutral-900 dark:text-white shadow-xs border border-neutral-200/80 dark:border-neutral-700/80'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <div className={`p-2 rounded-lg ${selectedCohort === 'clinician' ? 'bg-blue-600 text-white' : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-500'}`}>
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold">Practicing Clinicians</p>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Independent & Hospital ODs</p>
            </div>
          </button>

          <button
            onClick={() => setSelectedCohort('fellow')}
            className={`p-3.5 rounded-xl text-left transition-all cursor-pointer flex items-center gap-3 ${
              selectedCohort === 'fellow'
                ? 'bg-white dark:bg-[#1a1a26] text-neutral-900 dark:text-white shadow-xs border border-neutral-200/80 dark:border-neutral-700/80'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <div className={`p-2 rounded-lg ${selectedCohort === 'fellow' ? 'bg-blue-600 text-white' : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-500'}`}>
              <Award className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold">Fellows & Mentors</p>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400">FAAO, FCOVD & Clinical Leaders</p>
            </div>
          </button>
        </div>

        {/* Selected Cohort Detailed Breakdown Card */}
        <div className="bg-white dark:bg-[#111117] border border-neutral-200 dark:border-neutral-800/80 rounded-3xl p-6 sm:p-8 shadow-xs">
          {selectedCohort === 'student' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                    Academic Community Track
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1">Optometry Students & Academic Residents</h3>
                </div>
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Requires Accredited University or Residency Verification</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">What You Receive As a Student Member</h4>
                  <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Full access to the verified anterior segment case feed and rare pathology scans.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Clinical fitting playbooks for specialty scleral, orthokeratology, and PMD lenses.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Direct invitation to resident study circles and peer board-preparation rounds.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Early mentorship matching with practicing optometrists in your desired practice area.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">What We Ask From Students</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    We ask that students approach discussions with academic rigor, cite recent literature where applicable, and respect patient de-identification guidelines. You represent the future of independent optometry.
                  </p>
                  <div className="p-3 bg-neutral-50 dark:bg-[#161621] rounded-xl border border-neutral-200/60 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-400 mt-2">
                    <strong>Verification requirement:</strong> Upload a valid college ID card or official university institutional email.
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedCohort === 'clinician' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                    Core Practitioner Track
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1">Licensed Clinical Optometrists</h3>
                </div>
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Requires Active State or National License Vetting</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">What You Receive As a Practicing Clinician</h4>
                  <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Searchable profile in the Verified Optometrist Locator for peer-to-peer patient referrals.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Post challenging cases and receive second opinions on OCT corneal topography in hours.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Direct peer messaging for seamless cross-practice patient handshakes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Independent practice advocacy: vote on community guidelines and mutual support initiatives.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">What We Ask From Clinicians</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Actively collaborate, maintain respectful peer communication, and keep referrals patient-first. We ask doctors to share practical pearls from their chair time so our collective diagnostic capacity grows.
                  </p>
                  <div className="p-3 bg-neutral-50 dark:bg-[#161621] rounded-xl border border-neutral-200/60 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-400 mt-2">
                    <strong>Verification requirement:</strong> Professional license number and practice email for standard registration checks.
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedCohort === 'fellow' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                    Senior Fellowship Track
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1">Specialty Fellows, Mentors & Educators</h3>
                </div>
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Board Fellowship or Clinical Educator Standing</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">What You Receive As a Senior Fellow</h4>
                  <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Featured Senior Practitioner badge in the global directory and case discussion feeds.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Opportunity to author and lead protocol guides for advanced irregular cornea fittings.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Host accredited virtual grand rounds and case panels for the broader network.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Advisory Committee seat guiding independent optometry advocacy statements.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">What We Ask From Fellows</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Provide mentorship to younger colleagues, moderate clinical discussions with constructive wisdom, and help uphold the highest standards of diagnostic accuracy across the network.
                  </p>
                  <div className="p-3 bg-neutral-50 dark:bg-[#161621] rounded-xl border border-neutral-200/60 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-400 mt-2">
                    <strong>Verification requirement:</strong> Fellowship credentials (FAAO, FCOVD, Dip. Scleral, etc.) or academic faculty standing.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION: WHAT YOU RECEIVE — TODAY VS OUR TARGET ROADMAP (Honest & Transparent) */}
      <div className="mb-14">
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Milestone className="h-4 w-4" />
            <span>Honest Value Transparency</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            What Members Get Today vs. What We Are Building
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium max-w-2xl">
            We refuse to make inflated promises. Here is a clear, honest breakdown of the live clinical features available immediately, alongside our community-backed roadmap for the coming year.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setPerkTimelineTab('available_today')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              perkTimelineTab === 'available_today'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-neutral-100 dark:bg-[#161622] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Available Right Now (Day 1 Access)
          </button>
          <button
            onClick={() => setPerkTimelineTab('target_roadmap')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              perkTimelineTab === 'target_roadmap'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-neutral-100 dark:bg-[#161622] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Target Roadmap (In Development)
          </button>
        </div>

        {/* Content for Available Today vs Roadmap */}
        {perkTimelineTab === 'available_today' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl space-y-2">
              <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Verified Peer Directory</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Connect and exchange direct referral handshakes with verified specialty optometrists. Search by region and clinical focus (Cornea, Scleral, Dry Eye, Myopia).
              </p>
            </div>

            <div className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl space-y-2">
              <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Active Case Discussion Feed</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Post de-identified anterior segment cases, discuss fitting challenges, and receive real peer second opinions from experienced colleagues.
              </p>
            </div>

            <div className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl space-y-2">
              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">OCT & Diagnostic Scan Vault</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Upload and review corneal topography, scleral clearance OCT cross-sections, and anterior segment photographs for collaborative diagnostic study.
              </p>
            </div>

            <div className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl space-y-2">
              <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Specialty Lens Playbooks</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Community-contributed clinical references detailing landing zone alignment, vault height calculation, and troubleshooting for irregular corneas.
              </p>
            </div>

            <div className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl space-y-2">
              <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                <QrCode className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Digital Verified Member ID</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                A permanent, verified cryptographic credential indicating active verified standing in the independent optometric collective.
              </p>
            </div>

            <div className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl space-y-2">
              <div className="h-9 w-9 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Regional Practice Circles</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Join regional optometric study groups to coordinate on local referral channels, regional managed care updates, and clinical roundtables.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-neutral-50/70 dark:bg-[#13131c] border border-dashed border-neutral-300 dark:border-neutral-700/80 p-5 rounded-2xl space-y-2">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Target: Q3 2026</span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Standardized EHR Referral Exporter</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                A one-click, privacy-compliant summary generator that allows seamless export of co-management notes directly into common optometric EHR systems.
              </p>
            </div>

            <div className="bg-neutral-50/70 dark:bg-[#13131c] border border-dashed border-neutral-300 dark:border-neutral-700/80 p-5 rounded-2xl space-y-2">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Target: Q4 2026</span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Independent Supply Purchasing Coalition</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Leveraging collective member volume to negotiate transparent pricing on specialty diagnostic supplies and lab equipment without middlemen markup.
              </p>
            </div>

            <div className="bg-neutral-50/70 dark:bg-[#13131c] border border-dashed border-neutral-300 dark:border-neutral-700/80 p-5 rounded-2xl space-y-2">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Target: 2027</span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Accredited Peer-Led Clinical CE</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Non-commercial, peer-reviewed continuing education webinars hosted directly by fellows and academic faculty without pharmaceutical sponsorship influence.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* SECTION: DETAILED COMPARATIVE PERKS TABLE */}
      <div className="mb-14">
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Layers className="h-4 w-4" />
            <span>Comprehensive Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            Comparison of Membership Allowances
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium max-w-2xl">
            A clear overview of how platform access, publishing privileges, and community roles differ across practice stages.
          </p>
        </div>

        <div className="bg-white dark:bg-[#111117] border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-neutral-50 dark:bg-[#151522] border-b border-neutral-200 dark:border-neutral-800">
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 tracking-wider w-[35%]">
                    Clinical Feature & Scope
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase text-neutral-600 dark:text-neutral-300 tracking-wider text-center w-[21%]">
                    Students & Residents
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase text-blue-600 dark:text-blue-400 tracking-wider text-center w-[22%] bg-blue-500/5">
                    Practicing Clinicians
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase text-purple-600 dark:text-purple-400 tracking-wider text-center w-[22%]">
                    Fellows & Mentors
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                {COMPARISON_PERKS.map((perk, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/10 transition-colors">
                    <td className="p-4 sm:p-5 space-y-1">
                      <span className="block text-xs font-bold text-neutral-900 dark:text-white">{perk.feature}</span>
                      <span className="block text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">{perk.detail}</span>
                    </td>
                    
                    <td className="p-4 sm:p-5 text-center text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      <span className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[11px]">
                        {perk.student}
                      </span>
                    </td>

                    <td className="p-4 sm:p-5 text-center text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-500/5">
                      <span className="px-2 py-1 rounded-md bg-blue-100/60 dark:bg-blue-900/40 text-[11px]">
                        {perk.clinician}
                      </span>
                    </td>

                    <td className="p-4 sm:p-5 text-center text-xs font-bold text-purple-700 dark:text-purple-300">
                      <span className="px-2 py-1 rounded-md bg-purple-100/60 dark:bg-purple-900/40 text-[11px]">
                        {perk.fellow}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-neutral-50 dark:bg-[#151521] border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400 font-medium flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-blue-500 shrink-0" />
            <span>All tiers are 100% free of charge. Tier assignment is based strictly on verified professional credentials, ensuring appropriate clinical roles.</span>
          </div>
        </div>
      </div>

      {/* SECTION: REAL VETTING / ONBOARDING FORM AREA (Clean & Professional) */}
      {!showConnectedIdCard && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#111117] border border-neutral-200 dark:border-neutral-800/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 relative mb-14">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Official Verification Gateway</span>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Activate Your FocusLinks Practitioner Credential
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed">
              To preserve authentic clinical dialogue and protect patient de-identification standards, we verify that all members are licensed eye-care professionals or registered optometry students.
            </p>
          </div>

          <form onSubmit={handleOnboardingSubmit} className="space-y-4">
            {onboardingStatus === 'error' && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-xs text-red-600 dark:text-red-400 font-semibold">
                {errorMessage}
              </div>
            )}

            {/* Progress Vetting Screen */}
            {(onboardingStatus === 'submitting' || onboardingStatus === 'verifying_db' || onboardingStatus === 'generating_id') && (
              <div className="py-10 text-center space-y-3 bg-neutral-50 dark:bg-[#161621] border border-neutral-200 dark:border-neutral-800 rounded-2xl">
                <RefreshCw className="h-7 w-7 text-blue-600 animate-spin mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {onboardingStatus === 'submitting' && 'Validating professional submission details...'}
                    {onboardingStatus === 'verifying_db' && 'Cross-referencing credential against optometry registrar...'}
                    {onboardingStatus === 'generating_id' && 'Issuing cryptographic FocusLinks Practitioner ID...'}
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    FocusLinks verified practitioner network validation active
                  </p>
                </div>
              </div>
            )}

            {onboardingStatus !== 'submitting' && onboardingStatus !== 'verifying_db' && onboardingStatus !== 'generating_id' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1 text-left">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                      Full Legal / Professional Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (onboardingStatus === 'error') setOnboardingStatus('idle');
                      }}
                      placeholder="e.g. Dr. Jennifer Hayes, OD"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-[#1a1a24] border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white font-medium"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1 text-left">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                      Practice or Clinical Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (onboardingStatus === 'error') setOnboardingStatus('idle');
                      }}
                      placeholder="e.g. jhayes@hayesvisioncenter.com"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-[#1a1a24] border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Specialty Area */}
                  <div className="space-y-1 text-left">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                      Primary Clinical Specialty
                    </label>
                    <select
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      className="w-full px-3 py-2.5 bg-neutral-50 dark:bg-[#1a1a24] border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white font-semibold"
                    >
                      <option value="Cornea & Specialty Lenses">Cornea & Specialty Scleral Lenses</option>
                      <option value="Myopia Management & Ortho-K">Myopia Management & Ortho-K</option>
                      <option value="Glaucoma & Anterior Segment">Glaucoma & Anterior Segment Disease</option>
                      <option value="Dry Eye & Ocular Surface">Dry Eye & Ocular Surface Disease</option>
                      <option value="Neuro-Optometry & Rehabilitation">Neuro-Optometric Rehabilitation</option>
                      <option value="Comprehensive Clinical Practice">Comprehensive Independent Practice</option>
                      <option value="Optometry Student / Resident">Academic Student / Resident</option>
                    </select>
                  </div>

                  {/* Vetting Document Type */}
                  <div className="space-y-1 text-left">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                      Verification Credential Type
                    </label>
                    <select
                      value={licenseType}
                      onChange={(e) => setLicenseType(e.target.value)}
                      className="w-full px-3 py-2.5 bg-neutral-50 dark:bg-[#1a1a24] border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white font-semibold"
                    >
                      <option value="State/National Optometry License">State / National Optometry License</option>
                      <option value="Hospital Staff Credential ID">Hospital / Surgical Center Staff Credential</option>
                      <option value="Academic Institution / Student ID">College / University Student ID (Residents)</option>
                      <option value="Fellowship Diploma (FAAO/FCOVD)">Fellowship Credential (FAAO, FCOVD)</option>
                    </select>
                  </div>
                </div>

                {/* License/Serial Input */}
                <div className="space-y-1 text-left">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                    License / Registration / Student ID Number
                  </label>
                  <input
                    type="text"
                    required
                    value={licenseNumber}
                    onChange={(e) => {
                      setLicenseNumber(e.target.value);
                      if (onboardingStatus === 'error') setOnboardingStatus('idle');
                    }}
                    placeholder="e.g. OD-48192-MA, GOC-01-29184, or STU-88219"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-[#1a1a24] border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white font-medium"
                  />
                </div>

                {/* Upload Verification Document */}
                <div className="space-y-1 text-left">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                    Verification Document / ID Card Scan (Optional for Pre-vetting)
                  </label>
                  
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={uploadedFileName ? undefined : () => setUploadedFileName('license_verification_copy.png')}
                    className={`border border-dashed rounded-xl p-5 text-center transition-all cursor-pointer ${
                      isDragging 
                        ? 'border-blue-500 bg-blue-50/20 dark:bg-blue-950/10' 
                        : uploadedFileName 
                          ? 'border-emerald-500/40 bg-emerald-50/10 dark:bg-emerald-950/5' 
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/40 dark:bg-[#15151e]'
                    }`}
                  >
                    {uploadedFileName ? (
                      <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-400 p-2.5 rounded-lg text-xs font-semibold">
                        <div className="flex items-center gap-2">
                          <FileCheck className="h-4 w-4 shrink-0" />
                          <span className="truncate max-w-[220px]">{uploadedFileName}</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadedFileName('');
                          }}
                          className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1 text-neutral-500">
                        <UploadCloud className="h-6 w-6 mx-auto text-neutral-400" />
                        <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                          Drop photo of your license or ID card here, or <span className="text-blue-600 hover:underline">click to attach file</span>
                        </div>
                        <p className="text-[10px] text-neutral-400">
                          PDF, JPG, PNG accepted. Stored securely and de-identified.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/15 hover:shadow-blue-600/25 transition-all hover:scale-[1.005] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Verify Clinical Credentials & Issue FocusLinks Pass</span>
                </button>
              </>
            )}
          </form>
        </div>
      )}

      {/* SECTION: FREQUENTLY ASKED QUESTIONS (PRACTICAL & GROUNDED) */}
      <div className="max-w-4xl mx-auto mb-14 text-left">
        <div className="space-y-2 mb-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <HelpCircle className="h-4 w-4" />
            <span>Clarity for Clinicians</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
            Everything you need to know about our privacy standards, verification process, and independence.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx} 
                className="bg-white dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronRight className={`h-4 w-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-90 text-blue-500' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FINAL INVITATION FOOTER BANNER */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-neutral-950 text-white text-center space-y-4 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            Join the Movement Protecting Independent Optometry
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Whether you want to find trusted specialty co-management peers, discuss complex scleral fittings, or connect with the global optometric community—FocusLinks is your digital home.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                if (showConnectedIdCard) {
                  onEnterApp('feed');
                } else {
                  window.scrollTo({ top: 900, behavior: 'smooth' });
                }
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <span>{showConnectedIdCard ? 'Open Clinical Workspace' : 'Claim Your Free Member ID'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onBackToHome}
              className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl border border-white/10 transition-all cursor-pointer"
            >
              Learn More on Home
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
