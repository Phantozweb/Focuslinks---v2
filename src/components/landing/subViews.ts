import type { LucideIcon } from 'lucide-react';
import {
  FileText,
  ShieldCheck,
  ScrollText,
  Cookie,
  Stethoscope
} from 'lucide-react';

/**
 * Central registry of every landing sub-view.
 * 'home' | 'about' | 'membership' are the classic navbar views;
 * 'howto' is the How-To help center; the rest are legal/policy pages
 * that are intentionally reachable ONLY from the footer, never the menu.
 */
export type LandingSubView =
  | 'home'
  | 'about'
  | 'membership'
  | 'howto'
  | 'terms'
  | 'privacy'
  | 'rules'
  | 'cookies'
  | 'disclaimer';

export type LegalDocId = 'terms' | 'privacy' | 'rules' | 'cookies' | 'disclaimer';

export const isLegalView = (view: LandingSubView): view is LegalDocId =>
  view === 'terms' || view === 'privacy' || view === 'rules' || view === 'cookies' || view === 'disclaimer';

/* ----------------------------- Doc content types ---------------------------- */

export type DocBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'sub'; points: { label: string; text: string }[] }
  | { type: 'callout'; tone: 'info' | 'warn' | 'danger' | 'success'; title: string; text: string };

export interface DocSection {
  id: string;
  title: string;
  blocks: DocBlock[];
}

/* ------------------------------- Doc accents -------------------------------- */

export interface DocAccent {
  /** Eyebrow chip container classes */
  chip: string;
  /** Icon tile (header + section numbers) */
  tile: string;
  /** Accent text (section numbers) */
  number: string;
  /** List bullet dot */
  dot: string;
  /** Card hover border */
  hover: string;
}

export const DOC_ACCENTS: Record<'blue' | 'emerald' | 'amber' | 'orange' | 'rose' | 'indigo', DocAccent> = {
  blue: {
    chip: 'bg-blue-50 dark:bg-blue-950/70 border-blue-200/50 dark:border-blue-900/50 text-blue-700 dark:text-blue-300',
    tile: 'bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400',
    number: 'text-blue-600 dark:text-blue-400',
    dot: 'bg-blue-500',
    hover: 'hover:border-blue-500/40'
  },
  emerald: {
    chip: 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200/50 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300',
    tile: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400',
    number: 'text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500',
    hover: 'hover:border-emerald-500/40'
  },
  amber: {
    chip: 'bg-amber-50 dark:bg-amber-950/70 border-amber-200/50 dark:border-amber-900/50 text-amber-700 dark:text-amber-300',
    tile: 'bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400',
    number: 'text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-500',
    hover: 'hover:border-amber-500/40'
  },
  orange: {
    chip: 'bg-orange-50 dark:bg-orange-950/70 border-orange-200/50 dark:border-orange-900/50 text-orange-700 dark:text-orange-300',
    tile: 'bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400',
    number: 'text-orange-600 dark:text-orange-400',
    dot: 'bg-orange-500',
    hover: 'hover:border-orange-500/40'
  },
  rose: {
    chip: 'bg-rose-50 dark:bg-rose-950/70 border-rose-200/50 dark:border-rose-900/50 text-rose-700 dark:text-rose-300',
    tile: 'bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400',
    number: 'text-rose-600 dark:text-rose-400',
    dot: 'bg-rose-500',
    hover: 'hover:border-rose-500/40'
  },
  indigo: {
    chip: 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-200/50 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300',
    tile: 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400',
    number: 'text-indigo-600 dark:text-indigo-400',
    dot: 'bg-indigo-500',
    hover: 'hover:border-indigo-500/40'
  }
};

/* ------------------------------ Legal doc meta ------------------------------ */

export interface LegalDocMeta {
  id: LegalDocId;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  accent: DocAccent;
  blurb: string;
  lastUpdated: string;
  readingTime: string;
}

export const LAST_UPDATED = 'October 19, 2026';

export const LEGAL_DOCS: LegalDocMeta[] = [
  {
    id: 'terms',
    label: 'Terms of Service',
    shortLabel: 'Terms',
    icon: FileText,
    accent: DOC_ACCENTS.blue,
    blurb: 'The agreement between you and FocusLinks — eligibility, acceptable use, content licensing and liability.',
    lastUpdated: LAST_UPDATED,
    readingTime: '9 min read'
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    shortLabel: 'Privacy',
    icon: ShieldCheck,
    accent: DOC_ACCENTS.emerald,
    blurb: 'What we collect, how we protect de-identified clinical content, and the rights you have over your data.',
    lastUpdated: LAST_UPDATED,
    readingTime: '8 min read'
  },
  {
    id: 'rules',
    label: 'Community Rules',
    shortLabel: 'Rules',
    icon: ScrollText,
    accent: DOC_ACCENTS.amber,
    blurb: 'The six rules that keep FocusLinks a peer-only, de-identified, noise-free clinical sanctuary.',
    lastUpdated: LAST_UPDATED,
    readingTime: '6 min read'
  },
  {
    id: 'cookies',
    label: 'Cookie Policy',
    shortLabel: 'Cookies',
    icon: Cookie,
    accent: DOC_ACCENTS.orange,
    blurb: 'The handful of strictly-necessary cookies we set — and why this platform ships zero ad trackers.',
    lastUpdated: LAST_UPDATED,
    readingTime: '4 min read'
  },
  {
    id: 'disclaimer',
    label: 'Medical Disclaimer',
    shortLabel: 'Disclaimer',
    icon: Stethoscope,
    accent: DOC_ACCENTS.rose,
    blurb: 'Peer education, not medical advice — how clinical content on FocusLinks must and must not be used.',
    lastUpdated: LAST_UPDATED,
    readingTime: '5 min read'
  }
];

export const getLegalDocMeta = (id: LegalDocId): LegalDocMeta =>
  LEGAL_DOCS.find((d) => d.id === id) ?? LEGAL_DOCS[0];
