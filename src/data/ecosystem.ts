import type { LucideIcon } from 'lucide-react';
import {
  Stethoscope,
  Eye,
  Glasses,
  ScanEye,
  HeartPulse,
  Camera,
  Microscope,
  GraduationCap,
  ClipboardList,
  BookOpen,
  Building2,
  Globe2
} from 'lucide-react';

/**
 * FocusLinks Ecosystem — single source of truth for the professional-role taxonomy.
 *
 * Brand position: FocusLinks is the verified, peer-only network for the ENTIRE
 * eye care ecosystem — not a single profession. Every eye care contributor is
 * welcome: ophthalmologists, optometrists, opticians, orthoptists, ophthalmic
 * nurses & technicians, vision scientists, academic faculty, residents &
 * fellows, students, industry professionals, and public-health & vision
 * rehabilitation specialists.
 */

export type EcosystemRoleId =
  | 'ophthalmologist'
  | 'optometrist'
  | 'optician'
  | 'orthoptist'
  | 'ophthalmic-nurse'
  | 'ophthalmic-technician'
  | 'vision-scientist'
  | 'educator'
  | 'resident'
  | 'student'
  | 'industry'
  | 'public-health';

export type EcosystemCategory =
  | 'medical'
  | 'optometric'
  | 'allied'
  | 'research'
  | 'academic'
  | 'trainee'
  | 'industry'
  | 'community';

export interface EcosystemRole {
  id: EcosystemRoleId;
  /** Singular display label, e.g. "Ophthalmologist" */
  label: string;
  /** Plural display label, e.g. "Ophthalmologists" */
  plural: string;
  /** Ultra-short badge text for chips & cards */
  short: string;
  /** One-line description of what this role contributes */
  tagline: string;
  icon: LucideIcon;
  /** Complete Tailwind chip class string (light + dark) */
  badgeClasses: string;
  /** Tailwind gradient stops for avatars, e.g. "from-rose-500 to-red-400" */
  gradient: string;
  category: EcosystemCategory;
}

export const ECOSYSTEM_ROLES: EcosystemRole[] = [
  {
    id: 'ophthalmologist',
    label: 'Ophthalmologist',
    plural: 'Ophthalmologists',
    short: 'MD',
    tagline: 'Medical and surgical eye care — retina, cornea, glaucoma, oculoplastics and beyond.',
    icon: Stethoscope,
    badgeClasses: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900/60',
    gradient: 'from-rose-500 to-red-400',
    category: 'medical'
  },
  {
    id: 'optometrist',
    label: 'Optometrist',
    plural: 'Optometrists',
    short: 'OD',
    tagline: 'Primary eye care, refraction, contact lenses, myopia management and ocular therapeutics.',
    icon: Eye,
    badgeClasses: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900/60',
    gradient: 'from-blue-600 to-indigo-400',
    category: 'optometric'
  },
  {
    id: 'optician',
    label: 'Optician',
    plural: 'Opticians',
    short: 'Dispensing',
    tagline: 'Lens craft, dispensing, fitting and the art of precise vision correction.',
    icon: Glasses,
    badgeClasses: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900/60',
    gradient: 'from-amber-500 to-orange-400',
    category: 'allied'
  },
  {
    id: 'orthoptist',
    label: 'Orthoptist',
    plural: 'Orthoptists',
    short: 'Orthoptics',
    tagline: 'Binocular vision, strabismus and neuro-ocular assessment and therapy.',
    icon: ScanEye,
    badgeClasses: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-900/60',
    gradient: 'from-violet-500 to-purple-400',
    category: 'allied'
  },
  {
    id: 'ophthalmic-nurse',
    label: 'Ophthalmic Nurse',
    plural: 'Ophthalmic Nurses',
    short: 'Nurse',
    tagline: 'Peri-operative care, intravitreal clinics and the ophthalmic patient journey.',
    icon: HeartPulse,
    badgeClasses: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/50 dark:text-pink-300 dark:border-pink-900/60',
    gradient: 'from-pink-500 to-rose-400',
    category: 'allied'
  },
  {
    id: 'ophthalmic-technician',
    label: 'Ophthalmic Technician',
    plural: 'Ophthalmic Technicians',
    short: 'Imaging',
    tagline: 'OCT, fundus photography, visual fields and diagnostic imaging excellence.',
    icon: Camera,
    badgeClasses: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-900/60',
    gradient: 'from-cyan-500 to-sky-400',
    category: 'allied'
  },
  {
    id: 'vision-scientist',
    label: 'Vision Scientist',
    plural: 'Vision Scientists',
    short: 'PhD',
    tagline: 'Basic and translational research — from photoreceptors to population sight.',
    icon: Microscope,
    badgeClasses: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-900/60',
    gradient: 'from-indigo-500 to-blue-400',
    category: 'research'
  },
  {
    id: 'educator',
    label: 'Academic Faculty',
    plural: 'Academic Faculty',
    short: 'Faculty',
    tagline: 'Teaching the next generation — curriculum, clinics and conference halls.',
    icon: GraduationCap,
    badgeClasses: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900/60',
    gradient: 'from-emerald-500 to-teal-400',
    category: 'academic'
  },
  {
    id: 'resident',
    label: 'Resident & Fellow',
    plural: 'Residents & Fellows',
    short: 'Resident',
    tagline: 'Ophthalmology and optometry residents and fellows in advanced training.',
    icon: ClipboardList,
    badgeClasses: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-900/60',
    gradient: 'from-orange-500 to-amber-400',
    category: 'trainee'
  },
  {
    id: 'student',
    label: 'Student',
    plural: 'Students',
    short: 'Student',
    tagline: 'Optometry, ophthalmology and vision science students building their foundations.',
    icon: BookOpen,
    badgeClasses: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-900/60',
    gradient: 'from-teal-500 to-emerald-400',
    category: 'trainee'
  },
  {
    id: 'industry',
    label: 'Industry Professional',
    plural: 'Industry Professionals',
    short: 'Industry',
    tagline: 'Device, imaging and pharmaceutical teams building the future of eye care.',
    icon: Building2,
    badgeClasses: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900/60 dark:text-slate-300 dark:border-slate-800',
    gradient: 'from-slate-500 to-gray-400',
    category: 'industry'
  },
  {
    id: 'public-health',
    label: 'Public Health & Rehabilitation',
    plural: 'Public Health & Rehabilitation Specialists',
    short: 'Public Health',
    tagline: 'Low-vision rehabilitation, community screening and global sight initiatives.',
    icon: Globe2,
    badgeClasses: 'bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-950/50 dark:text-lime-300 dark:border-lime-900/60',
    gradient: 'from-lime-500 to-green-400',
    category: 'community'
  }
];

export const ROLE_MAP: Record<EcosystemRoleId, EcosystemRole> = ECOSYSTEM_ROLES.reduce(
  (acc, role) => {
    acc[role.id] = role;
    return acc;
  },
  {} as Record<EcosystemRoleId, EcosystemRole>
);

export function roleById(id: EcosystemRoleId): EcosystemRole {
  return ROLE_MAP[id];
}

/** True when a member's profession matches a directory filter chip. */
export function matchesDirectoryFilter(profession: EcosystemRoleId | undefined, filterId: string): boolean {
  if (filterId === 'all') return true;
  const filter = DIRECTORY_FILTERS.find((f) => f.id === filterId);
  if (!filter || !profession) return false;
  return filter.roles.includes(profession);
}

export interface DirectoryFilter {
  id: 'all' | 'ophthalmology' | 'optometry' | 'optical' | 'allied' | 'research' | 'trainee' | 'impact';
  label: string;
  roles: EcosystemRoleId[];
}

export const DIRECTORY_FILTERS: DirectoryFilter[] = [
  { id: 'all', label: 'All Professionals', roles: ECOSYSTEM_ROLES.map((r) => r.id) },
  { id: 'ophthalmology', label: 'Ophthalmology', roles: ['ophthalmologist', 'resident'] },
  { id: 'optometry', label: 'Optometry', roles: ['optometrist'] },
  { id: 'optical', label: 'Opticians & Optical', roles: ['optician'] },
  { id: 'allied', label: 'Orthoptics, Nursing & Imaging', roles: ['orthoptist', 'ophthalmic-nurse', 'ophthalmic-technician'] },
  { id: 'research', label: 'Research & Academia', roles: ['vision-scientist', 'educator'] },
  { id: 'trainee', label: 'Students & Residents', roles: ['resident', 'student'] },
  { id: 'impact', label: 'Industry & Public Health', roles: ['industry', 'public-health'] }
];

export const ECOSYSTEM_STATS: { value: string; label: string }[] = [
  { value: '12,400+', label: 'Verified eye care professionals' },
  { value: '94', label: 'Countries & territories' },
  { value: '12', label: 'Professional roles welcome' },
  { value: '480+', label: 'Specialty Circles & hubs' }
];

/** Primary brand tagline for the ecosystem era. */
export const NETWORK_TAGLINE = 'The Professional Network for the Entire Eye Care Ecosystem';

/** Compact tagline for tight spaces (navbar, footer brand). */
export const NETWORK_TAGLINE_SHORT = 'For the Entire Eye Care Ecosystem';

/** One-sentence umbrella description. */
export const NETWORK_SUBTAGLINE =
  'A verified, peer-only clinical home where ophthalmologists, optometrists, opticians, orthoptists, nurses, technicians, scientists, educators and trainees share de-identified cases, consult hubs and grand rounds.';

/** Short label used in copy, e.g. "free for the global eye care community". */
export const COMMUNITY_LABEL = 'the global eye care community';
