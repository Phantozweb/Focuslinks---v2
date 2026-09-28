import React, { useState } from 'react';
import {
  GraduationCap,
  Stethoscope,
  Building2,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Compass,
  Briefcase,
  Eye,
  ShieldCheck,
  BookOpen,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface MilestoneStage {
  id: string;
  level: string;
  stageNumber: string;
  title: string;
  yearsExperience: string;
  shortDesc: string;
  icon: React.ElementType;
  accentColor: {
    primary: string;
    bg: string;
    border: string;
    glow: string;
    badge: string;
    tagBg: string;
  };
  focusArea: string;
  keyResponsibilities: string[];
  platformPrivileges: string[];
  diagnosticScope: string;
  advocacyRole: string;
}

const MILESTONES: MilestoneStage[] = [
  {
    id: 'student-resident',
    stageNumber: '01',
    level: 'Academic Foundation',
    title: 'Student & Academic Resident',
    yearsExperience: 'Pre-Licensure / Year 1-4',
    shortDesc: 'Mastering clinical theory, absorbing rare pathology case presentations, and completing intensive institutional externships.',
    icon: GraduationCap,
    accentColor: {
      primary: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-50 dark:bg-sky-950/30',
      border: 'border-sky-200 dark:border-sky-800/80',
      glow: 'group-hover:shadow-sky-500/20',
      badge: 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300',
      tagBg: 'bg-sky-500'
    },
    focusArea: 'Anterior Segment Basics & Pathology Observation',
    keyResponsibilities: [
      'Comprehensive slit lamp examination and baseline corneal assessment',
      'Observing specialty lens fitting protocols under preceptor supervision',
      'Study of de-identified keratoconus & irregular cornea case logs',
      'Preparation for national clinical licensure examinations'
    ],
    platformPrivileges: [
      'Full study access to the de-identified Anterior Segment Scan Vault',
      'Read & participate in peer clinical discussion threads',
      'Academic Resident verification badge on student profile',
      'Direct access to specialty fitting clinical playbooks'
    ],
    diagnosticScope: 'Observational / Supervised Clinic Externships',
    advocacyRole: 'Student Chapter Participant'
  },
  {
    id: 'associate-od',
    stageNumber: '02',
    level: 'Early Practice',
    title: 'Early Career Associate OD',
    yearsExperience: 'Years 1 - 3 Post-Licensure',
    shortDesc: 'Transitioning into full autonomous chair time, fine-tuning diagnostic efficiency, and managing acute ocular surface cases.',
    icon: Stethoscope,
    accentColor: {
      primary: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      border: 'border-blue-200 dark:border-blue-800/80',
      glow: 'group-hover:shadow-blue-500/20',
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
      tagBg: 'bg-blue-500'
    },
    focusArea: 'Full Chair Autonomy & Acute Pathology Triage',
    keyResponsibilities: [
      'Independent daily patient scheduling and clinical decision-making',
      'Triage of corneal ulcers, foreign bodies, and dry eye syndromes',
      'Initial fitting of gas permeable and entry-level scleral lenses',
      'Building professional co-management relationships with local corneal surgeons'
    ],
    platformPrivileges: [
      'Verified Licensed Optometrist Directory listing',
      'Submit complex cases for rapid second opinions from senior colleagues',
      'Direct peer-to-peer referral messaging without intermediaries',
      'Full voting rights on independent practice clinical surveys'
    ],
    diagnosticScope: 'Independent Primary Eye Care & Specialty Diagnostics',
    advocacyRole: 'Early Career Advocacy Member'
  },
  {
    id: 'independent-clinician',
    stageNumber: '03',
    level: 'Established Practice',
    title: 'Independent Practice Clinician',
    yearsExperience: 'Years 4 - 8 In Practice',
    shortDesc: 'Driving clinical excellence in independent practice, cultivating specialty niche care, and establishing regional co-management networks.',
    icon: Building2,
    accentColor: {
      primary: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/30',
      border: 'border-indigo-200 dark:border-indigo-800/80',
      glow: 'group-hover:shadow-indigo-500/20',
      badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
      tagBg: 'bg-indigo-500'
    },
    focusArea: 'Specialty Contact Lenses & Disease Co-Management',
    keyResponsibilities: [
      'Advanced scleral lens landing zone design & quadrant-specific profiling',
      'Management of post-graft, PMD, and severe keratoconus cases',
      'Co-managing cross-linking and corneal transplant surgical cases',
      'Guiding clinic staff and optimizing diagnostic imaging instrumentation'
    ],
    platformPrivileges: [
      'Featured regional listing in the peer referral network',
      'Host regional clinical study circles and journal reviews',
      'Contribute verified case files to the collective scan repository',
      'Co-management export tools to simplify doctor-to-doctor transfer'
    ],
    diagnosticScope: 'Advanced Anterior Segment & Irregular Cornea Rehabilitation',
    advocacyRole: 'Regional Chapter Lead'
  },
  {
    id: 'specialty-director',
    stageNumber: '04',
    level: 'Advanced Mastery',
    title: 'Specialty Care Director',
    yearsExperience: 'Years 9 - 14 In Practice',
    shortDesc: 'Directing specialized anterior segment clinics, implementing cutting-edge anterior OCT protocols, and publishing clinical pearls.',
    icon: Briefcase,
    accentColor: {
      primary: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-50 dark:bg-violet-950/30',
      border: 'border-violet-200 dark:border-violet-800/80',
      glow: 'group-hover:shadow-violet-500/20',
      badge: 'bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-300',
      tagBg: 'bg-violet-500'
    },
    focusArea: 'Tertiary Referral Clinic & Specialty Technology Adoption',
    keyResponsibilities: [
      'Directing advanced specialty contact lens & dry eye service lines',
      'Troubleshooting recalcitrant scleral impingements and microcystic edema',
      'Advising regional colleagues on non-responsive anterior segment cases',
      'Supervising clinical externs and new associate practitioners'
    ],
    platformPrivileges: [
      'Direct referral pipeline receiving complex cases from peers',
      'Author and publish specialty fitting guides in FocusLinks library',
      'Serve as clinical moderator for live anterior segment case threads',
      'Advisory input on upcoming collective purchasing agreements'
    ],
    diagnosticScope: 'Tertiary Cornea Specialty & Complex Vault Optimization',
    advocacyRole: 'Clinical Advisory Board Representative'
  },
  {
    id: 'senior-fellow',
    stageNumber: '05',
    level: 'Leadership & Fellowship',
    title: 'Senior Fellow, Mentor & Leader',
    yearsExperience: '15+ Years / Board Fellow (FAAO / FCOVD)',
    shortDesc: 'Shaping the future of optometry through peer mentorship, fellowship committees, clinical education, and safeguarding independent practice.',
    icon: Award,
    accentColor: {
      primary: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/30',
      border: 'border-purple-200 dark:border-purple-800/80',
      glow: 'group-hover:shadow-purple-500/20',
      badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
      tagBg: 'bg-purple-500'
    },
    focusArea: 'Intergenerational Mentorship & Global Optometric Unity',
    keyResponsibilities: [
      'Serving on credentialing and peer review fellowship panels',
      'Mentoring early-career optometrists navigating private practice ownership',
      'Delivering peer-reviewed grand rounds and non-commercial clinical lectures',
      'Championing independent optometry against corporate commoditization'
    ],
    platformPrivileges: [
      'Senior Fellow Gold Key Credential badge across all discussions',
      'Host accredited virtual grand rounds and case review panels',
      'Permanent voting seat on the FocusLinks Standards Council',
      'Authoritative peer reviews on high-complexity clinical submissions'
    ],
    diagnosticScope: 'Fellowship-Level Cornea, Ocular Surface & Practice Leadership',
    advocacyRole: 'Senior Council Trustee'
  }
];

interface GrowthMilestonesProps {
  onSelectMilestoneAction?: (milestone: MilestoneStage) => void;
}

export const GrowthMilestones: React.FC<GrowthMilestonesProps> = ({
  onSelectMilestoneAction
}) => {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(MILESTONES[1].id);
  const [hoveredMilestoneId, setHoveredMilestoneId] = useState<string | null>(null);

  // The displayed milestone is either hovered or active
  const displayedMilestone = MILESTONES.find(
    (m) => m.id === (hoveredMilestoneId || activeMilestoneId)
  ) || MILESTONES[1];

  return (
    <div className="mb-14 text-left">
      {/* Section Header */}
      <div className="space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <Compass className="h-4 w-4" />
          <span>Professional Career Continuum</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
          Optometric Growth Milestones
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium max-w-3xl leading-relaxed">
          The journey of an independent optometrist is continuous. Explore how your clinical responsibilities, diagnostic autonomy, and FocusLinks community privileges expand as you progress from student extern to senior fellow.
        </p>
      </div>

      {/* Interactive Step Track - Desktop & Tablet */}
      <div className="relative mb-8">
        {/* Connecting Progress Bar */}
        <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 -translate-y-1/2 bg-neutral-200 dark:bg-neutral-800 -z-0 rounded-full">
          <div 
            className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-purple-600 rounded-full transition-all duration-500"
            style={{
              width: `${(MILESTONES.findIndex(m => m.id === (hoveredMilestoneId || activeMilestoneId)) / (MILESTONES.length - 1)) * 100}%`
            }}
          />
        </div>

        {/* Milestone Cards Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative z-10">
          {MILESTONES.map((milestone, idx) => {
            const Icon = milestone.icon;
            const isCurrent = (hoveredMilestoneId || activeMilestoneId) === milestone.id;
            const isSelected = activeMilestoneId === milestone.id;

            return (
              <motion.div
                key={milestone.id}
                onMouseEnter={() => setHoveredMilestoneId(milestone.id)}
                onMouseLeave={() => setHoveredMilestoneId(null)}
                onClick={() => {
                  setActiveMilestoneId(milestone.id);
                  if (onSelectMilestoneAction) {
                    onSelectMilestoneAction(milestone);
                  }
                }}
                whileHover={{ y: -4, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 border text-left flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-white dark:bg-[#161622] border-blue-500/80 shadow-md shadow-blue-500/10 dark:shadow-blue-500/5 ring-2 ring-blue-500/20'
                    : 'bg-white/80 dark:bg-[#111117] border-neutral-200/90 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs'
                }`}
              >
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${milestone.accentColor.badge}`}>
                    Stage {milestone.stageNumber}
                  </span>
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${milestone.accentColor.bg} ${milestone.accentColor.primary}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1 my-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    {milestone.level}
                  </span>
                  <h3 className={`text-xs font-bold leading-snug transition-colors ${
                    isCurrent ? 'text-blue-600 dark:text-blue-400 font-extrabold' : 'text-neutral-900 dark:text-white'
                  }`}>
                    {milestone.title}
                  </h3>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1">
                    {milestone.shortDesc}
                  </p>
                </div>

                {/* Bottom Timeline Indicator */}
                <div className="pt-3 mt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-neutral-400 dark:text-neutral-500">
                    {milestone.yearsExperience}
                  </span>
                  <span className={`flex items-center gap-1 font-bold ${
                    isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity'
                  }`}>
                    <span>Explore</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

                {/* Animated active indicator dot */}
                {isSelected && (
                  <div className="absolute -top-1.5 right-3 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-[#111117] animate-pulse" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expanded Milestone Detail Deep-Dive Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={displayedMilestone.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-[#111118] border border-neutral-200 dark:border-neutral-800/90 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Banner of Selected Milestone */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-5 mb-6">
            <div className="flex items-center gap-3.5">
              <div className={`p-3 rounded-2xl ${displayedMilestone.accentColor.bg} ${displayedMilestone.accentColor.primary} shadow-xs`}>
                <displayedMilestone.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${displayedMilestone.accentColor.badge}`}>
                    Milestone Stage {displayedMilestone.stageNumber}
                  </span>
                  <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500">
                    {displayedMilestone.yearsExperience}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white mt-0.5">
                  {displayedMilestone.title}
                </h3>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Clinical Responsibility</span>
              <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                {displayedMilestone.focusArea}
              </p>
            </div>
          </div>

          {/* Detailed Columns: Core Chair Responsibilities vs Platform Privileges */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Chair Time & Competencies (7 cols) */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 mb-2.5">
                  <Eye className="h-3.5 w-3.5 text-blue-500" />
                  <span>Clinical Chair Time & Key Competencies</span>
                </h4>
                <div className="space-y-2">
                  {displayedMilestone.keyResponsibilities.map((resp, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-neutral-50/70 dark:bg-[#161622] border border-neutral-200/60 dark:border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagnostic Scope Badge */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Diagnostic Scope:</span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold text-[11px]">
                  {displayedMilestone.diagnosticScope}
                </span>
              </div>
            </div>

            {/* Right Column: Platform Privileges & Advocacy (5 cols) */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 mb-2.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-purple-500" />
                  <span>FocusLinks Privileges Unlocked</span>
                </h4>
                <div className="space-y-2">
                  {displayedMilestone.platformPrivileges.map((priv, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-neutral-50/70 dark:bg-[#161622] border border-neutral-200/60 dark:border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{priv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community & Advocacy Voice Role */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-blue-200/60 dark:border-blue-900/40 text-left space-y-1">
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Advocacy Voice</span>
                <p className="text-xs font-bold text-neutral-900 dark:text-white">
                  {displayedMilestone.advocacyRole}
                </p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Direct representation in platform governance and mutual peer support initiatives.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-6 border-t border-neutral-100 dark:border-neutral-800 text-xs">
            <span className="text-neutral-500 dark:text-neutral-400 font-medium">
              Hover over or click any milestone card above to inspect stage expectations and unlocked permissions.
            </span>
            <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold">
              <span>All career stages welcome in the collective</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
