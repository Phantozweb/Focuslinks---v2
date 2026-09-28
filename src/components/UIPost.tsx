import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  X,
  Sparkles,
  BookOpen,
  BarChart2,
  Stethoscope,
  Image as ImageIcon,
  Images,
  Camera,
  ShieldCheck,
  Upload,
  Plus,
  Trash2,
  Clock,
  Globe,
  Tag,
  ChevronDown,
  Check,
  AlertCircle,
  Type as TypeIcon,
  AlignLeft,
  ListOrdered,
  Calendar,
} from 'lucide-react';
import { DoctorProfile, ClinicalPost, ClinicalArticleSection } from '../types';

/* ================================================================== */
/*  TYPES & CONSTANTS                                                  */
/* ================================================================== */

export type UIPostType = 'pearl' | 'media' | 'case' | 'poll' | 'article';

export interface UIPostProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: DoctorProfile;
  onSubmitPost: (newPost: Partial<ClinicalPost>) => void;
  initialMode?: UIPostType;
}

interface ComposerImage {
  id: string;
  src: string;
  alt: string;
}

interface PostFormatDef {
  id: UIPostType;
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  /** selected tile border + tint */
  selected: string;
  /** icon tile colors */
  iconTile: string;
  /** publish button */
  publishBtn: string;
}

const POST_FORMATS: PostFormatDef[] = [
  {
    id: 'pearl',
    label: 'Clinical Pearl',
    hint: 'Short, high-yield insight',
    icon: Sparkles,
    selected:
      'border-amber-400 dark:border-amber-500/70 bg-amber-50/80 dark:bg-amber-950/30 ring-1 ring-amber-300 dark:ring-amber-500/40',
    iconTile: 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
    publishBtn:
      'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/25 focus-visible:ring-amber-500',
  },
  {
    id: 'media',
    label: 'Photo / Media',
    hint: 'Share clinic photos & scans',
    icon: Images,
    selected:
      'border-blue-400 dark:border-blue-500/70 bg-blue-50/80 dark:bg-blue-950/30 ring-1 ring-blue-300 dark:ring-blue-500/40',
    iconTile: 'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400',
    publishBtn:
      'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25 focus-visible:ring-blue-500',
  },
  {
    id: 'case',
    label: 'Case Report',
    hint: 'Structured clinical case',
    icon: Stethoscope,
    selected:
      'border-emerald-400 dark:border-emerald-500/70 bg-emerald-50/80 dark:bg-emerald-950/30 ring-1 ring-emerald-300 dark:ring-emerald-500/40',
    iconTile: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
    publishBtn:
      'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25 focus-visible:ring-emerald-500',
  },
  {
    id: 'poll',
    label: 'Poll',
    hint: 'Peer consensus vote',
    icon: BarChart2,
    selected:
      'border-purple-400 dark:border-purple-500/70 bg-purple-50/80 dark:bg-purple-950/30 ring-1 ring-purple-300 dark:ring-purple-500/40',
    iconTile: 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400',
    publishBtn:
      'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/25 focus-visible:ring-purple-500',
  },
  {
    id: 'article',
    label: 'Article',
    hint: 'Long-form, sections & refs',
    icon: BookOpen,
    selected:
      'border-indigo-400 dark:border-indigo-500/70 bg-indigo-50/80 dark:bg-indigo-950/30 ring-1 ring-indigo-300 dark:ring-indigo-500/40',
    iconTile: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400',
    publishBtn:
      'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25 focus-visible:ring-indigo-500',
  },
];

const SAMPLE_SCANS = [
  {
    id: 'slit-lamp',
    name: 'Slit Lamp Cornea',
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'as-oct',
    name: 'AS-OCT Scleral Vault',
    url: 'https://images.unsplash.com/photo-1583912267670-6575ad472688?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'optos',
    name: 'Optos 200° Widefield',
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'pentacam',
    name: 'Pentacam Topography',
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
  },
];

const SUGGESTED_TAGS = [
  '#OptometryPearls',
  '#SlitLamp',
  '#Myopia',
  '#ScleralLens',
  '#Glaucoma',
  '#RetinaImaging',
  '#DryEye',
  '#OrthoK',
  '#CornealTopography',
  '#NeuroOptometry',
];

const MAX_MEDIA_IMAGES = 6;
const MAX_CASE_IMAGES = 4;
const MAX_TAGS = 5;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* ================================================================== */
/*  SMALL LOCAL UI HELPERS                                             */
/* ================================================================== */

const inputBase =
  'w-full rounded-xl border bg-neutral-50/50 dark:bg-[#18181b] px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors';
const inputError =
  'border-rose-400 dark:border-rose-500/70 bg-rose-50/40 dark:bg-rose-950/20';
const inputOk = 'border-neutral-200 dark:border-neutral-800';

const FieldError: React.FC<{ id: string; message?: string }> = ({ id, message }) => {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
      <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
};

const CharCount: React.FC<{ value: string; max: number }> = ({ value, max }) => {
  const len = value.length;
  const near = len > max * 0.9;
  return (
    <span
      className={`text-[10px] font-semibold tabular-nums ${
        near ? 'text-amber-600 dark:text-amber-400' : 'text-neutral-400 dark:text-neutral-500'
      }`}
    >
      {len} / {max}
    </span>
  );
};

const FieldLabel: React.FC<{
  htmlFor: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  accent?: string;
  requiredHint?: boolean;
  right?: React.ReactNode;
}> = ({ htmlFor, children, icon, accent = 'text-neutral-600 dark:text-neutral-300', requiredHint, right }) => (
  <div className="mb-1.5 flex items-center justify-between gap-2">
    <label htmlFor={htmlFor} className={`flex items-center gap-1.5 text-xs font-bold ${accent}`}>
      {icon}
      <span>{children}</span>
      {requiredHint && (
        <span className="font-medium text-neutral-400 dark:text-neutral-500">(required)</span>
      )}
    </label>
    {right}
  </div>
);

/* ================================================================== */
/*  MAIN COMPOSER                                                      */
/* ================================================================== */

export const UIPost: React.FC<UIPostProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSubmitPost,
  initialMode = 'pearl',
}) => {
  const prefersReducedMotion = useReducedMotion() ?? false;

  // ---------- shared composer state ----------
  const [activeType, setActiveType] = useState<UIPostType>(initialMode);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [showSamplePicker, setShowSamplePicker] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // ---------- pearl ----------
  const [pearlHeadline, setPearlHeadline] = useState('');
  const [pearlBody, setPearlBody] = useState('');

  // ---------- media / case shared images ----------
  const [attachedImages, setAttachedImages] = useState<ComposerImage[]>([]);
  const [mediaCaption, setMediaCaption] = useState('');

  // ---------- poll context ----------
  const [pollContext, setPollContext] = useState('');

  // ---------- case ----------
  const [caseComplaint, setCaseComplaint] = useState('');
  const [patientAgeSex, setPatientAgeSex] = useState('');
  const [instrumentUsed, setInstrumentUsed] = useState('');
  const [visualAcuity, setVisualAcuity] = useState('');
  const [intraocularPressure, setIntraocularPressure] = useState('');
  const [diagnosisType, setDiagnosisType] = useState<'Definitive' | 'Differential / Peer Review' | 'Case Showcase'>('Definitive');
  const [caseBody, setCaseBody] = useState('');

  // ---------- poll ----------
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
  const [pollMultipleChoice, setPollMultipleChoice] = useState(false);
  const [pollEndsIn, setPollEndsIn] = useState<'1 day' | '3 days' | '1 week'>('1 week');

  // ---------- article ----------
  const [articleTitle, setArticleTitle] = useState('');
  const [articleSubtitle, setArticleSubtitle] = useState('');
  const [articleAbstract, setArticleAbstract] = useState('');
  const [articleSections, setArticleSections] = useState<{ id: string; heading: string; body: string }[]>([
    { id: 'sec-0', heading: '', body: '' },
  ]);
  const [articleCitations, setArticleCitations] = useState('');

  // ---------- refs ----------
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const mediaFileInputRef = useRef<HTMLInputElement>(null);
  const typeOptionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // ================================================================
  //  DRAFT DIRTY / VALIDATION
  // ================================================================

  const isDraftDirty = useMemo(() => {
    return (
      pearlHeadline.trim() !== '' ||
      pearlBody.trim() !== '' ||
      mediaCaption.trim() !== '' ||
      attachedImages.length > 0 ||
      caseComplaint.trim() !== '' ||
      patientAgeSex.trim() !== '' ||
      instrumentUsed.trim() !== '' ||
      visualAcuity.trim() !== '' ||
      intraocularPressure.trim() !== '' ||
      caseBody.trim() !== '' ||
      pollQuestion.trim() !== '' ||
      pollOptions.some((o) => o.trim() !== '') ||
      pollContext.trim() !== '' ||
      articleTitle.trim() !== '' ||
      articleSubtitle.trim() !== '' ||
      articleAbstract.trim() !== '' ||
      articleSections.some((s) => s.heading.trim() !== '' || s.body.trim() !== '') ||
      articleCitations.trim() !== '' ||
      selectedTags.length > 0
    );
  }, [
    pearlHeadline, pearlBody, mediaCaption, attachedImages, caseComplaint,
    patientAgeSex, instrumentUsed, visualAcuity, intraocularPressure, caseBody,
    pollQuestion, pollOptions, pollContext, articleTitle, articleSubtitle,
    articleAbstract, articleSections, articleCitations, selectedTags,
  ]);

  /** Field-level errors for the active format, keyed by field id. */
  const fieldErrors = useMemo(() => {
    const errors: Record<string, string> = {};
    if (activeType === 'pearl') {
      if (!pearlBody.trim()) errors['pearl-body'] = 'Write your clinical pearl before publishing.';
    } else if (activeType === 'media') {
      if (attachedImages.length === 0) errors['media-images'] = 'Attach at least one photo.';
      attachedImages.forEach((img) => {
        if (!img.alt.trim()) {
          errors[`media-alt-${img.id}`] = 'Describe this photo so screen-reader colleagues can follow along.';
        }
      });
    } else if (activeType === 'case') {
      if (!caseComplaint.trim()) errors['case-complaint'] = 'Add the chief complaint or case title.';
      if (!caseBody.trim()) errors['case-body'] = 'Document findings, differential diagnosis and management.';
    } else if (activeType === 'poll') {
      if (!pollQuestion.trim()) errors['poll-question'] = 'Ask a question to run the poll.';
      const filled = pollOptions.filter((o) => o.trim()).length;
      if (filled < 2) errors['poll-options'] = 'Add at least 2 answer options.';
      pollOptions.forEach((opt, i) => {
        if (!opt.trim()) errors[`poll-option-${i}`] = 'Option text is empty.';
      });
    } else if (activeType === 'article') {
      if (!articleTitle.trim()) errors['article-title'] = 'Give your article a headline.';
      if (!articleAbstract.trim()) errors['article-abstract'] = 'Write a short abstract so peers can scan the takeaways.';
    }
    return errors;
  }, [activeType, pearlBody, attachedImages, caseComplaint, caseBody, pollQuestion, pollOptions, articleTitle, articleAbstract]);

  const errorCount = Object.keys(fieldErrors).length;
  const isFormValid = errorCount === 0;
  const activeFormat = POST_FORMATS.find((f) => f.id === activeType) ?? POST_FORMATS[0];

  const showErrorFor = (fieldId: string) => (touched[fieldId] || submitAttempted) && !!fieldErrors[fieldId];

  const markTouched = (fieldId: string) => setTouched((prev) => ({ ...prev, [fieldId]: true }));

  // ================================================================
  //  FOCUS MANAGEMENT (trap, escape, focus return)
  // ================================================================

  useEffect(() => {
    if (!isOpen) return;
    // remember trigger + move focus into the dialog
    triggerRef.current = (document.activeElement as HTMLElement) ?? null;
    const focusTimer = window.setTimeout(() => panelRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(focusTimer);
      // return focus to the trigger that opened the composer
      triggerRef.current?.focus?.();
      triggerRef.current = null;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        if (showDiscardConfirm) {
          setShowDiscardConfirm(false);
          return;
        }
        requestClose();
        return;
      }

      if (e.key === 'Tab') {
        const panel = panelRef.current;
        if (!panel) return;
        const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const activeEl = document.activeElement as HTMLElement | null;
        const inside = activeEl && panel.contains(activeEl);
        if (e.shiftKey && (activeEl === first || !inside)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (activeEl === last || !inside)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, showDiscardConfirm, isDraftDirty]);

  // ================================================================
  //  CLOSE / DISCARD FLOW
  // ================================================================

  const resetDraft = () => {
    setPearlHeadline('');
    setPearlBody('');
    setAttachedImages([]);
    setMediaCaption('');
    setCaseComplaint('');
    setPatientAgeSex('');
    setInstrumentUsed('');
    setVisualAcuity('');
    setIntraocularPressure('');
    setDiagnosisType('Definitive');
    setCaseBody('');
    setPollQuestion('');
    setPollOptions(['', '']);
    setPollMultipleChoice(false);
    setPollEndsIn('1 week');
    setPollContext('');
    setArticleTitle('');
    setArticleSubtitle('');
    setArticleAbstract('');
    setArticleSections([{ id: `sec-${Date.now()}`, heading: '', body: '' }]);
    setArticleCitations('');
    setSelectedTags([]);
    setCustomTagInput('');
    setTouched({});
    setSubmitAttempted(false);
    setShowSamplePicker(false);
    setIsDragging(false);
  };

  const requestClose = () => {
    if (isDraftDirty) {
      setShowDiscardConfirm(true);
    } else {
      onClose();
    }
  };

  const handleConfirmDiscard = () => {
    resetDraft();
    setShowDiscardConfirm(false);
    onClose();
  };

  // ================================================================
  //  FORMAT SWITCHING + RADIOGROUP KEYBOARD NAV
  // ================================================================

  // Re-sync the active format whenever the composer is (re)opened.
  useEffect(() => {
    if (isOpen) setActiveType(initialMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialMode]);

  const handleTypeKeyDown = (e: React.KeyboardEvent) => {
    const idx = POST_FORMATS.findIndex((f) => f.id === activeType);
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % POST_FORMATS.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (idx - 1 + POST_FORMATS.length) % POST_FORMATS.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = POST_FORMATS.length - 1;
    if (next === -1) return;
    e.preventDefault();
    const nextFormat = POST_FORMATS[next];
    setActiveType(nextFormat.id);
    typeOptionRefs.current[next]?.focus();
  };

  // ================================================================
  //  MEDIA HANDLING (upload + drag & drop + samples)
  // ================================================================

  const handleFiles = (files: FileList | File[] | null, cap: number) => {
    if (!files) return;
    const room = cap - attachedImages.length;
    if (room <= 0) return;
    const imageFiles = Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .slice(0, room);

    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setAttachedImages((prev) =>
            prev.length >= cap
              ? prev
              : [
                  ...prev,
                  {
                    id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                    src: result,
                    alt: '',
                  },
                ]
          );
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddSampleScan = (preset: (typeof SAMPLE_SCANS)[number], cap: number) => {
    setAttachedImages((prev) =>
      prev.length >= cap
        ? prev
        : [
            ...prev,
            { id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, src: preset.url, alt: preset.name },
          ]
    );
  };

  const handleRemoveImage = (id: string) => {
    setAttachedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleUpdateImageAlt = (id: string, alt: string) => {
    setAttachedImages((prev) => prev.map((img) => (img.id === id ? { ...img, alt } : img)));
  };

  const imageCap = activeType === 'media' ? MAX_MEDIA_IMAGES : MAX_CASE_IMAGES;

  // ================================================================
  //  TAGS
  // ================================================================

  const normalizeTag = (raw: string) => {
    const trimmed = raw.trim().replace(/^#+/, '').replace(/\s+/g, '');
    return trimmed ? `#${trimmed}` : '';
  };

  const addTag = (raw: string) => {
    const tag = normalizeTag(raw);
    if (!tag) return;
    setSelectedTags((prev) =>
      prev.includes(tag) || prev.length >= MAX_TAGS ? prev : [...prev, tag]
    );
    setCustomTagInput('');
  };

  const toggleSuggestedTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : prev.length >= MAX_TAGS ? prev : [...prev, tag]
    );
  };

  // ================================================================
  //  SUBMIT
  // ================================================================

  const articleReadTime = useMemo(() => {
    const body = [
      articleTitle,
      articleSubtitle,
      articleAbstract,
      ...articleSections.map((s) => `${s.heading} ${s.body}`),
    ].join(' ');
    const words = body.trim() ? body.trim().split(/\s+/).length : 0;
    return Math.max(1, Math.round(words / 200));
  }, [articleTitle, articleSubtitle, articleAbstract, articleSections]);

  const buildPayload = (): Partial<ClinicalPost> => {
    const images = attachedImages.map((img) => img.src);
    const imageAlts = attachedImages.map((img) => img.alt.trim());

    if (activeType === 'pearl') {
      return {
        content: pearlBody.trim(),
        pearlHeadline: pearlHeadline.trim() || undefined,
        tags: selectedTags,
        cardCategory: 'pearl',
      };
    }

    if (activeType === 'media') {
      return {
        content: mediaCaption.trim() || 'Photo update shared on FocusLinks.',
        images,
        imageAlts,
        tags: selectedTags,
        cardCategory: 'media',
      };
    }

    if (activeType === 'case') {
      return {
        content: caseBody.trim(),
        tags: selectedTags,
        images: images.length > 0 ? images : undefined,
        imageAlts: images.length > 0 ? imageAlts : undefined,
        aspectRatio: 'wide',
        cardCategory: 'oct',
        clinicalMetadata: {
          patientAgeSex: patientAgeSex.trim() || undefined,
          chiefComplaint: caseComplaint.trim(),
          instrumentUsed: instrumentUsed.trim() || undefined,
          acuity: visualAcuity.trim() || undefined,
          intraocularPressure: intraocularPressure.trim() || undefined,
          diagnosisType,
        },
      };
    }

    if (activeType === 'poll') {
      const filledOptions = pollOptions.filter((o) => o.trim());
      return {
        content: pollContext.trim() || pollQuestion.trim(),
        tags: selectedTags,
        cardCategory: 'poll',
        poll: {
          question: pollQuestion.trim(),
          // context text travels as the post content alongside the poll
          options: filledOptions.map((text, i) => ({
            id: `opt-${Date.now()}-${i}`,
            text,
            votes: 1,
          })),
          totalVotes: filledOptions.length,
          multipleChoice: pollMultipleChoice || undefined,
          endsIn: `${pollEndsIn} left`,
        },
      };
    }

    // article
    const sections: ClinicalArticleSection[] = articleSections
      .filter((s) => s.heading.trim() || s.body.trim())
      .map((s) => ({ heading: s.heading.trim() || 'Clinical Discussion', body: s.body.trim() }));
    const citations = articleCitations
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean);

    return {
      content: articleAbstract.trim(),
      tags: selectedTags,
      cardCategory: 'article',
      articleMetadata: {
        title: articleTitle.trim(),
        subtitle: articleSubtitle.trim() || undefined,
        abstract: articleAbstract.trim(),
        readTimeMinutes: articleReadTime,
        sections: sections.length > 0 ? sections : undefined,
        citations: citations.length > 0 ? citations : undefined,
        peerReviewed: true,
      },
    };
  };

  const handleSubmit = () => {
    if (!isFormValid || isSubmitting) {
      setSubmitAttempted(true);
      return;
    }
    setIsSubmitting(true);
    const payload = buildPayload();

    // brief simulated publish state (house style: async simulation)
    window.setTimeout(() => {
      onSubmitPost(payload);
      resetDraft();
      setIsSubmitting(false);
      onClose();
    }, 450);
  };

  // ================================================================
  //  RENDER
  // ================================================================

  const motionTransition = {
    duration: prefersReducedMotion ? 0 : 0.22,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md overflow-hidden">
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="uipost-title"
            initial={{ opacity: 0, scale: 0.98, y: prefersReducedMotion ? 0 : 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: prefersReducedMotion ? 0 : 25 }}
            transition={motionTransition}
            className="relative w-full sm:max-w-3xl lg:max-w-4xl max-h-[92dvh] sm:max-h-[90dvh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-white/95 dark:bg-[#141420]/95 backdrop-blur-xl border border-neutral-200/70 dark:border-white/10 shadow-2xl overflow-hidden focus:outline-none"
          >
            {/* Brand gradient signature bar */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 shrink-0" aria-hidden="true" />

            {/* Mobile drag indicator */}
            <div className="sm:hidden flex justify-center pt-2.5 pb-1" aria-hidden="true">
              <div className="w-10 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>

            {/* ================================================================ */}
            {/* 1. TOP BAR — identity, audience, close                            */}
            {/* ================================================================ */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-neutral-200/70 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={currentUser.avatar}
                  alt={`${currentUser.name}, ${currentUser.credentials}`}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/30"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">
                      {currentUser.name}
                    </span>
                    <span className="hidden sm:inline px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold border border-blue-200/60 dark:border-blue-900/50">
                      {currentUser.credentials}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#1e1e22] text-[11px] font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <Globe className="h-3 w-3 text-blue-500" aria-hidden="true" />
                      <span>Anyone on FocusLinks</span>
                      <ChevronDown className="h-2.5 w-2.5 opacity-60" aria-hidden="true" />
                    </button>
                    <span className="hidden md:inline-flex items-center text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      <ShieldCheck className="h-3 w-3 inline mr-0.5" aria-hidden="true" />
                      HIPAA Protected
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={requestClose}
                aria-label="Close composer"
                className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* ================================================================ */}
            {/* 2. FORMAT SELECTOR — accessible radiogroup                        */}
            {/* ================================================================ */}
            <div className="px-3 sm:px-6 pt-3 pb-2 border-b border-neutral-200/70 dark:border-white/10 bg-neutral-50/60 dark:bg-white/[0.02] shrink-0">
              <div
                role="radiogroup"
                aria-label="Post format"
                aria-describedby="uipost-format-hint"
                onKeyDown={handleTypeKeyDown}
                className="grid grid-cols-2 sm:grid-cols-5 gap-2"
              >
                {/* screen-reader-only instruction */}
                <p id="uipost-format-hint" className="sr-only">
                  Choose the format of your post. Use arrow keys to move between formats.
                </p>

                {POST_FORMATS.map((format, idx) => {
                  const isSelected = activeType === format.id;
                  const Icon = format.icon;
                  return (
                    <button
                      key={format.id}
                      ref={(el) => {
                        typeOptionRefs.current[idx] = el;
                      }}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => setActiveType(format.id)}
                      className={`relative flex items-center gap-2.5 sm:flex-col sm:items-start sm:gap-1.5 text-left px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 motion-reduce:transition-none ${
                        isSelected
                          ? format.selected
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b] hover:border-neutral-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg shrink-0 ${format.iconTile}`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-neutral-900 dark:text-neutral-100">
                          {format.label}
                          {isSelected && <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" aria-hidden="true" />}
                        </span>
                        <span className="hidden sm:block text-[10px] leading-tight text-neutral-500 dark:text-neutral-400">
                          {format.hint}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================================================================ */}
            {/* 3. SCROLLABLE FORM BODY                                           */}
            {/* ================================================================ */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 overscroll-contain">
              {/* aria-live error summary (announced politely) */}
              <div aria-live="polite" className="sr-only">
                {submitAttempted && errorCount > 0
                  ? `${errorCount} field${errorCount === 1 ? '' : 's'} need attention: ${Object.values(fieldErrors)[0]}`
                  : ''}
              </div>

              {/* -------------------------------------------------------------- */}
              {/* 3a. PEARL                                                       */}
              {/* -------------------------------------------------------------- */}
              {activeType === 'pearl' && (
                <div className="space-y-4">
                  <div>
                    <FieldLabel
                      htmlFor="pearl-headline"
                      icon={<TypeIcon className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />}
                      accent="text-amber-700 dark:text-amber-400"
                      right={<CharCount value={pearlHeadline} max={120} />}
                    >
                      Bold headline
                    </FieldLabel>
                    <input
                      id="pearl-headline"
                      type="text"
                      value={pearlHeadline}
                      onChange={(e) => setPearlHeadline(e.target.value)}
                      maxLength={120}
                      placeholder="e.g. Scleral Lens Mid-Day Fogging: 3 Key Chairside Checks"
                      className={`${inputBase} ${inputOk} font-bold text-sm sm:text-base py-3`}
                    />
                    <p id="pearl-headline-hint" className="mt-1 text-[11px] text-neutral-400 dark:text-neutral-500">
                      Optional — a sharp takeaway banner rendered above your pearl in the feed.
                    </p>
                  </div>

                  <div>
                    <FieldLabel
                      htmlFor="pearl-body"
                      icon={<Sparkles className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />}
                      accent="text-amber-700 dark:text-amber-400"
                      requiredHint
                      right={<CharCount value={pearlBody} max={1500} />}
                    >
                      Clinical pearl
                    </FieldLabel>
                    <textarea
                      id="pearl-body"
                      rows={7}
                      value={pearlBody}
                      onChange={(e) => setPearlBody(e.target.value)}
                      onBlur={() => markTouched('pearl-body')}
                      maxLength={1500}
                      aria-invalid={showErrorFor('pearl-body')}
                      aria-describedby={showErrorFor('pearl-body') ? 'err-pearl-body' : undefined}
                      placeholder={`What's on your clinical mind today, Dr. ${currentUser.name.split(' ').slice(-1)[0]}? Share diagnostic insights, observations, or discussion...`}
                      className={`${inputBase} ${showErrorFor('pearl-body') ? inputError : inputOk} py-3 leading-relaxed resize-none`}
                    />
                    <FieldError id="err-pearl-body" message={showErrorFor('pearl-body') ? fieldErrors['pearl-body'] : undefined} />
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------- */}
              {/* 3b. PHOTO / MEDIA                                               */}
              {/* -------------------------------------------------------------- */}
              {activeType === 'media' && (
                <div className="space-y-4">
                  {/* Drop zone (also shown under existing images while more can be added) */}
                  {attachedImages.length < MAX_MEDIA_IMAGES && (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        handleFiles(e.dataTransfer.files, MAX_MEDIA_IMAGES);
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => mediaFileInputRef.current?.click()}
                        className={`w-full py-7 sm:py-9 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer text-center px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 motion-reduce:transition-none ${
                          showErrorFor('media-images')
                            ? 'border-rose-400 dark:border-rose-500/70 bg-rose-50/40 dark:bg-rose-950/20'
                            : isDragging
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                            : 'border-neutral-300 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 bg-neutral-50/60 dark:bg-[#18181b]/60'
                        }`}
                        aria-describedby={showErrorFor('media-images') ? 'err-media-images' : undefined}
                      >
                        <span className="p-2.5 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/25">
                          <Camera className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                          {isDragging ? 'Drop photos to attach' : 'Drag & drop clinic photos, or click to browse'}
                        </span>
                        <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          Up to {MAX_MEDIA_IMAGES} photos · JPG / PNG / WebP
                        </span>
                      </button>
                      <FieldError id="err-media-images" message={showErrorFor('media-images') ? fieldErrors['media-images'] : undefined} />
                    </div>
                  )}

                  {/* Attached images with per-image alt text */}
                  {attachedImages.length > 0 && (
                    <ul className="space-y-3" aria-label="Attached photos">
                      {attachedImages.map((img, idx) => {
                        const altError = showErrorFor(`media-alt-${img.id}`);
                        return (
                          <li
                            key={img.id}
                            className="flex flex-col sm:flex-row gap-3 p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b]"
                          >
                            <div className="relative sm:w-36 shrink-0">
                              <img
                                src={img.src}
                                alt={img.alt.trim() || `Attached photo ${idx + 1}, alt text pending`}
                                className="w-full h-28 sm:h-24 object-cover rounded-xl border border-neutral-200/70 dark:border-neutral-700/70"
                              />
                              <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-bold">
                                {idx + 1}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <label
                                  htmlFor={`media-alt-${img.id}`}
                                  className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300"
                                >
                                  Image description (alt text){' '}
                                  <span className="text-rose-500 dark:text-rose-400" aria-hidden="true">
                                    *
                                  </span>
                                </label>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(img.id)}
                                  aria-label={`Remove photo ${idx + 1}`}
                                  className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                >
                                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                                </button>
                              </div>
                              <input
                                id={`media-alt-${img.id}`}
                                type="text"
                                value={img.alt}
                                onChange={(e) => handleUpdateImageAlt(img.id, e.target.value)}
                                onBlur={() => markTouched(`media-alt-${img.id}`)}
                                maxLength={200}
                                aria-required="true"
                                aria-invalid={altError}
                                aria-describedby={`media-alt-hint-${img.id}${altError ? ` err-media-alt-${img.id}` : ''}`}
                                placeholder={`Describe what colleagues can't see — e.g. "Slit-lamp photo of inferior corneal staining"`}
                                className={`${inputBase} ${altError ? inputError : inputOk}`}
                              />
                              <p id={`media-alt-hint-${img.id}`} className="mt-1 text-[10px] text-neutral-400 dark:text-neutral-500">
                                Required — screen readers announce this to visually impaired peers.
                              </p>
                              <FieldError
                                id={`err-media-alt-${img.id}`}
                                message={altError ? fieldErrors[`media-alt-${img.id}`] : undefined}
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {/* Sample scans helper */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowSamplePicker((v) => !v)}
                      aria-expanded={showSamplePicker}
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                    >
                      <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      {showSamplePicker ? 'Hide sample scans' : 'No photos handy? Use a sample scan'}
                    </button>
                    {showSamplePicker && (
                      <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {SAMPLE_SCANS.map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => handleAddSampleScan(preset, MAX_MEDIA_IMAGES)}
                            disabled={attachedImages.length >= MAX_MEDIA_IMAGES}
                            className="group relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 text-left transition-all cursor-pointer disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                          >
                            <img
                              src={preset.url}
                              alt={preset.name}
                              className="h-16 w-full object-cover group-hover:scale-105 transition-transform motion-reduce:transition-none"
                            />
                            <span className="block p-1.5 text-[10px] font-bold text-neutral-800 dark:text-neutral-200 truncate">
                              {preset.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Caption */}
                  <div>
                    <FieldLabel
                      htmlFor="media-caption"
                      icon={<AlignLeft className="h-3.5 w-3.5 text-blue-500" aria-hidden="true" />}
                      accent="text-blue-700 dark:text-blue-400"
                      right={<CharCount value={mediaCaption} max={800} />}
                    >
                      Caption
                    </FieldLabel>
                    <textarea
                      id="media-caption"
                      rows={4}
                      value={mediaCaption}
                      onChange={(e) => setMediaCaption(e.target.value)}
                      maxLength={800}
                      placeholder="Add context for your photos — device, findings, or why this caught your eye..."
                      className={`${inputBase} ${inputOk} resize-none leading-relaxed`}
                    />
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------- */}
              {/* 3c. CASE REPORT                                                 */}
              {/* -------------------------------------------------------------- */}
              {activeType === 'case' && (
                <div className="space-y-4">
                  <div>
                    <FieldLabel
                      htmlFor="case-complaint"
                      icon={<Stethoscope className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />}
                      accent="text-emerald-700 dark:text-emerald-400"
                      requiredHint
                      right={<CharCount value={caseComplaint} max={140} />}
                    >
                      Chief complaint / case title
                    </FieldLabel>
                    <input
                      id="case-complaint"
                      type="text"
                      value={caseComplaint}
                      onChange={(e) => setCaseComplaint(e.target.value)}
                      onBlur={() => markTouched('case-complaint')}
                      maxLength={140}
                      aria-invalid={showErrorFor('case-complaint')}
                      aria-describedby={showErrorFor('case-complaint') ? 'err-case-complaint' : undefined}
                      placeholder="e.g. 46yo F with recurrent corneal erosion & severe awakening pain"
                      className={`${inputBase} ${showErrorFor('case-complaint') ? inputError : inputOk} font-bold py-3`}
                    />
                    <FieldError id="err-case-complaint" message={showErrorFor('case-complaint') ? fieldErrors['case-complaint'] : undefined} />
                  </div>

                  {/* Structured clinical metadata grid */}
                  <fieldset className="p-3.5 rounded-2xl bg-neutral-50/70 dark:bg-[#18181b]/70 border border-neutral-200 dark:border-neutral-800">
                    <legend className="px-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      Clinical metadata
                    </legend>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label htmlFor="case-age" className="block text-[11px] font-semibold text-neutral-500 mb-1">
                          Age / Sex
                        </label>
                        <input
                          id="case-age"
                          type="text"
                          value={patientAgeSex}
                          onChange={(e) => setPatientAgeSex(e.target.value)}
                          maxLength={40}
                          placeholder="e.g. 46yo F"
                          className={`${inputBase} ${inputOk} font-bold`}
                        />
                      </div>
                      <div>
                        <label htmlFor="case-instrument" className="block text-[11px] font-semibold text-neutral-500 mb-1">
                          Instrument
                        </label>
                        <input
                          id="case-instrument"
                          type="text"
                          value={instrumentUsed}
                          onChange={(e) => setInstrumentUsed(e.target.value)}
                          maxLength={80}
                          placeholder="e.g. AS-OCT & Slit Lamp"
                          className={`${inputBase} ${inputOk} font-bold`}
                        />
                      </div>
                      <div>
                        <label htmlFor="case-diagnosis-type" className="block text-[11px] font-semibold text-neutral-500 mb-1">
                          Diagnosis type
                        </label>
                        <select
                          id="case-diagnosis-type"
                          value={diagnosisType}
                          onChange={(e) => setDiagnosisType(e.target.value as typeof diagnosisType)}
                          className={`${inputBase} ${inputOk} font-bold cursor-pointer`}
                        >
                          <option value="Definitive">Definitive</option>
                          <option value="Differential / Peer Review">Differential / Peer Review</option>
                          <option value="Case Showcase">Case Showcase</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="case-acuity" className="block text-[11px] font-semibold text-neutral-500 mb-1">
                          Visual acuity
                        </label>
                        <input
                          id="case-acuity"
                          type="text"
                          value={visualAcuity}
                          onChange={(e) => setVisualAcuity(e.target.value)}
                          maxLength={80}
                          placeholder="e.g. 20/40 → 20/20 with BCL"
                          className={`${inputBase} ${inputOk} font-bold`}
                        />
                      </div>
                      <div>
                        <label htmlFor="case-iop" className="block text-[11px] font-semibold text-neutral-500 mb-1">
                          IOP
                        </label>
                        <input
                          id="case-iop"
                          type="text"
                          value={intraocularPressure}
                          onChange={(e) => setIntraocularPressure(e.target.value)}
                          maxLength={80}
                          placeholder="e.g. 15 mmHg OD / 14 mmHg OS"
                          className={`${inputBase} ${inputOk} font-bold`}
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* Case images (optional) */}
                  {attachedImages.length < MAX_CASE_IMAGES && (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        handleFiles(e.dataTransfer.files, MAX_CASE_IMAGES);
                      }}
                      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                    >
                      <button
                        type="button"
                        onClick={() => mediaFileInputRef.current?.click()}
                        className={`flex-1 py-4 rounded-2xl border-2 border-dashed flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs font-bold text-neutral-600 dark:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                          isDragging
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                            : 'border-neutral-300 dark:border-neutral-700 hover:border-emerald-500 dark:hover:border-emerald-500 bg-neutral-50/60 dark:bg-[#18181b]/60'
                        }`}
                      >
                        <Upload className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                        Attach diagnostic scans (drag & drop or browse)
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowSamplePicker((v) => !v)}
                        aria-expanded={showSamplePicker}
                        className="px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        Sample scans
                      </button>
                    </div>
                  )}

                  {showSamplePicker && attachedImages.length < MAX_CASE_IMAGES && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {SAMPLE_SCANS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleAddSampleScan(preset, MAX_CASE_IMAGES)}
                          className="group relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-emerald-500 text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="h-16 w-full object-cover group-hover:scale-105 transition-transform motion-reduce:transition-none"
                          />
                          <span className="block p-1.5 text-[10px] font-bold text-neutral-800 dark:text-neutral-200 truncate">
                            {preset.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {attachedImages.length > 0 && (
                    <ul className="space-y-2" aria-label="Attached case images">
                      {attachedImages.map((img, idx) => (
                        <li
                          key={img.id}
                          className="flex items-center gap-3 p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181b]"
                        >
                          <img
                            src={img.src}
                            alt={img.alt.trim() || `Case image ${idx + 1}`}
                            className="h-12 w-16 object-cover rounded-lg"
                          />
                          <input
                            type="text"
                            value={img.alt}
                            onChange={(e) => handleUpdateImageAlt(img.id, e.target.value)}
                            maxLength={200}
                            aria-label={`Describe case image ${idx + 1} for screen readers`}
                            placeholder="Describe this scan for screen readers (optional but recommended)"
                            className={`${inputBase} ${inputOk} flex-1`}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(img.id)}
                            aria-label={`Remove case image ${idx + 1}`}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Findings body */}
                  <div>
                    <FieldLabel
                      htmlFor="case-body"
                      icon={<ListOrdered className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />}
                      accent="text-emerald-700 dark:text-emerald-400"
                      requiredHint
                      right={<CharCount value={caseBody} max={2000} />}
                    >
                      Findings, differential diagnosis & management
                    </FieldLabel>
                    <textarea
                      id="case-body"
                      rows={7}
                      value={caseBody}
                      onChange={(e) => setCaseBody(e.target.value)}
                      onBlur={() => markTouched('case-body')}
                      maxLength={2000}
                      aria-invalid={showErrorFor('case-body')}
                      aria-describedby={showErrorFor('case-body') ? 'err-case-body' : undefined}
                      placeholder="Document slit-lamp findings, corneal staining, imaging interpretation, and therapeutic follow-up..."
                      className={`${inputBase} ${showErrorFor('case-body') ? inputError : inputOk} resize-none leading-relaxed`}
                    />
                    <FieldError id="err-case-body" message={showErrorFor('case-body') ? fieldErrors['case-body'] : undefined} />
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------- */}
              {/* 3d. POLL                                                        */}
              {/* -------------------------------------------------------------- */}
              {activeType === 'poll' && (
                <div className="space-y-4">
                  <div>
                    <FieldLabel
                      htmlFor="poll-question"
                      icon={<BarChart2 className="h-3.5 w-3.5 text-purple-500" aria-hidden="true" />}
                      accent="text-purple-700 dark:text-purple-400"
                      requiredHint
                      right={<CharCount value={pollQuestion} max={200} />}
                    >
                      Clinical question
                    </FieldLabel>
                    <input
                      id="poll-question"
                      type="text"
                      value={pollQuestion}
                      onChange={(e) => setPollQuestion(e.target.value)}
                      onBlur={() => markTouched('poll-question')}
                      maxLength={200}
                      aria-invalid={showErrorFor('poll-question')}
                      aria-describedby={showErrorFor('poll-question') ? 'err-poll-question' : undefined}
                      placeholder="e.g. What is your primary intervention for persistent scleral lens midday fogging?"
                      className={`${inputBase} ${showErrorFor('poll-question') ? inputError : inputOk} font-bold py-3`}
                    />
                    <FieldError id="err-poll-question" message={showErrorFor('poll-question') ? fieldErrors['poll-question'] : undefined} />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/70 dark:border-purple-900/40">
                    <div className="flex items-center justify-between mb-2.5">
                      <span id="poll-options-label" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                        Options ({pollOptions.filter((o) => o.trim()).length}/{pollOptions.length} filled · max 4)
                      </span>
                      {pollOptions.length < 4 && (
                        <button
                          type="button"
                          onClick={() => setPollOptions((prev) => [...prev, ''])}
                          className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          Add option
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {pollOptions.map((option, idx) => {
                        const optError = showErrorFor(`poll-option-${idx}`);
                        return (
                          <div key={idx} className="flex items-center gap-2">
                            <span
                              aria-hidden="true"
                              className="h-7 w-7 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold text-xs flex items-center justify-center shrink-0"
                            >
                              {idx + 1}
                            </span>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) =>
                                setPollOptions((prev) => prev.map((o, i) => (i === idx ? e.target.value : o)))
                              }
                              onBlur={() => markTouched(`poll-option-${idx}`)}
                              maxLength={80}
                              aria-label={`Option ${idx + 1} text`}
                              aria-invalid={optError}
                              aria-describedby={optError ? `err-poll-option-${idx}` : undefined}
                              placeholder={`Option ${idx + 1}`}
                              className={`flex-1 px-3.5 py-2 rounded-xl border bg-white dark:bg-[#1e1e22] text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors ${
                                optError ? 'border-rose-400 dark:border-rose-500/70' : 'border-neutral-200 dark:border-neutral-800'
                              }`}
                            />
                            {pollOptions.length > 2 && (
                              <button
                                type="button"
                                onClick={() => setPollOptions((prev) => prev.filter((_, i) => i !== idx))}
                                aria-label={`Remove option ${idx + 1}`}
                                className="p-2 text-neutral-400 hover:text-rose-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                              >
                                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <FieldError id="err-poll-options" message={showErrorFor('poll-options') ? fieldErrors['poll-options'] : undefined} />
                    {pollOptions.map((_, idx) => (
                      <FieldError
                        key={idx}
                        id={`err-poll-option-${idx}`}
                        message={showErrorFor(`poll-option-${idx}`) ? fieldErrors[`poll-option-${idx}`] : undefined}
                      />
                    ))}

                    {/* Poll settings: duration + multiple choice */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 mt-3 border-t border-purple-200/50 dark:border-purple-900/40">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-purple-500" aria-hidden="true" />
                        <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300" id="poll-ends-label">
                          Ends in
                        </span>
                        <div role="group" aria-labelledby="poll-ends-label" className="flex items-center gap-1.5">
                          {(['1 day', '3 days', '1 week'] as const).map((dur) => (
                            <button
                              key={dur}
                              type="button"
                              onClick={() => setPollEndsIn(dur)}
                              aria-pressed={pollEndsIn === dur}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                                pollEndsIn === dur
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                              }`}
                            >
                              {dur}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          id="poll-multiple"
                          type="checkbox"
                          checked={pollMultipleChoice}
                          onChange={(e) => setPollMultipleChoice(e.target.checked)}
                          className="h-4 w-4 rounded accent-purple-600 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500"
                        />
                        <label htmlFor="poll-multiple" className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 cursor-pointer">
                          Allow multiple choice
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Optional context */}
                  <div>
                    <FieldLabel htmlFor="poll-context" accent="text-neutral-500 dark:text-neutral-400">
                      Clinical background & context (optional)
                    </FieldLabel>
                    <textarea
                      id="poll-context"
                      rows={4}
                      value={pollContext}
                      onChange={(e) => setPollContext(e.target.value)}
                      maxLength={800}
                      placeholder="Provide relevant history, symptoms, or findings to help colleagues vote informedly..."
                      className={`${inputBase} ${inputOk} resize-none leading-relaxed`}
                    />
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------- */}
              {/* 3e. ARTICLE                                                     */}
              {/* -------------------------------------------------------------- */}
              {activeType === 'article' && (
                <div className="space-y-4">
                  <div>
                    <FieldLabel
                      htmlFor="article-title"
                      icon={<BookOpen className="h-3.5 w-3.5 text-indigo-500" aria-hidden="true" />}
                      accent="text-indigo-700 dark:text-indigo-400"
                      requiredHint
                      right={<CharCount value={articleTitle} max={160} />}
                    >
                      Headline
                    </FieldLabel>
                    <input
                      id="article-title"
                      type="text"
                      value={articleTitle}
                      onChange={(e) => setArticleTitle(e.target.value)}
                      onBlur={() => markTouched('article-title')}
                      maxLength={160}
                      aria-invalid={showErrorFor('article-title')}
                      aria-describedby={showErrorFor('article-title') ? 'err-article-title' : undefined}
                      placeholder="e.g. Efficacy of 0.05% Atropine Combined with Orthokeratology in Rapid Axial Elongation"
                      className="w-full px-1 py-2 text-lg sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white placeholder:text-neutral-300 dark:placeholder:text-neutral-600 bg-transparent border-b border-neutral-200 dark:border-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors"
                    />
                    <FieldError id="err-article-title" message={showErrorFor('article-title') ? fieldErrors['article-title'] : undefined} />
                  </div>

                  <div>
                    <FieldLabel htmlFor="article-subtitle" accent="text-neutral-500 dark:text-neutral-400" right={<CharCount value={articleSubtitle} max={240} />}>
                      Subtitle (optional)
                    </FieldLabel>
                    <input
                      id="article-subtitle"
                      type="text"
                      value={articleSubtitle}
                      onChange={(e) => setArticleSubtitle(e.target.value)}
                      maxLength={240}
                      placeholder="One-line study design or value proposition..."
                      className={`${inputBase} ${inputOk}`}
                    />
                  </div>

                  <div>
                    <FieldLabel
                      htmlFor="article-abstract"
                      icon={<AlignLeft className="h-3.5 w-3.5 text-indigo-500" aria-hidden="true" />}
                      accent="text-indigo-700 dark:text-indigo-400"
                      requiredHint
                      right={<CharCount value={articleAbstract} max={1200} />}
                    >
                      Abstract
                    </FieldLabel>
                    <textarea
                      id="article-abstract"
                      rows={4}
                      value={articleAbstract}
                      onChange={(e) => setArticleAbstract(e.target.value)}
                      onBlur={() => markTouched('article-abstract')}
                      maxLength={1200}
                      aria-invalid={showErrorFor('article-abstract')}
                      aria-describedby={showErrorFor('article-abstract') ? 'err-article-abstract' : undefined}
                      placeholder="Summarise the clinical objective, method and key outcome in a few sentences..."
                      className={`${inputBase} ${showErrorFor('article-abstract') ? inputError : inputOk} resize-none leading-relaxed`}
                    />
                    <FieldError id="err-article-abstract" message={showErrorFor('article-abstract') ? fieldErrors['article-abstract'] : undefined} />
                  </div>

                  {/* Repeatable sections */}
                  <fieldset className="p-3.5 rounded-2xl bg-neutral-50/70 dark:bg-[#18181b]/70 border border-neutral-200 dark:border-neutral-800">
                    <legend className="px-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      Sections
                    </legend>
                    <div className="space-y-4">
                      {articleSections.map((section, idx) => (
                        <div key={section.id} className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-neutral-600 dark:text-neutral-300">
                              Section {idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setArticleSections((prev) =>
                                  prev.length > 1 ? prev.filter((s) => s.id !== section.id) : prev
                                )
                              }
                              disabled={articleSections.length === 1}
                              aria-label={`Remove section ${idx + 1}`}
                              className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            >
                              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={section.heading}
                            onChange={(e) =>
                              setArticleSections((prev) =>
                                prev.map((s) => (s.id === section.id ? { ...s, heading: e.target.value } : s))
                              )
                            }
                            maxLength={120}
                            aria-label={`Section ${idx + 1} heading`}
                            placeholder="Heading (e.g. Diagnostic Biometry & Methodology)"
                            className={`${inputBase} ${inputOk} font-bold`}
                          />
                          <textarea
                            rows={3}
                            value={section.body}
                            onChange={(e) =>
                              setArticleSections((prev) =>
                                prev.map((s) => (s.id === section.id ? { ...s, body: e.target.value } : s))
                              )
                            }
                            maxLength={2000}
                            aria-label={`Section ${idx + 1} body text`}
                            placeholder="Section body..."
                            className={`${inputBase} ${inputOk} resize-none leading-relaxed`}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setArticleSections((prev) => [
                          ...prev,
                          { id: `sec-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, heading: '', body: '' },
                        ])
                      }
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                      Add section
                    </button>
                  </fieldset>

                  {/* Citations */}
                  <div>
                    <FieldLabel htmlFor="article-citations" accent="text-neutral-500 dark:text-neutral-400">
                      Literature citations (optional, one per line)
                    </FieldLabel>
                    <textarea
                      id="article-citations"
                      rows={2}
                      value={articleCitations}
                      onChange={(e) => setArticleCitations(e.target.value)}
                      placeholder={'Kinoshita N, et al. Ophthalmology 2020;127(9):1143-1154.\nYam JC, et al. LAMP Study. Ophthalmology 2022;129(3):308-321.'}
                      className={`${inputBase} ${inputOk} resize-none font-mono text-[11px]`}
                    />
                  </div>

                  {/* Read time */}
                  <div
                    className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 px-1"
                    aria-label={`Estimated read time: about ${articleReadTime} minute${articleReadTime === 1 ? '' : 's'}`}
                  >
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Estimated read time: ~{articleReadTime} min</span>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------- */}
              {/* 3f. SHARED TAG PICKER (all formats)                             */}
              {/* -------------------------------------------------------------- */}
              <div className="space-y-2.5 pt-4 mt-2 border-t border-neutral-100 dark:border-neutral-800/80">
                <FieldLabel
                  htmlFor="uipost-tag-input"
                  icon={<Tag className="h-3.5 w-3.5 text-blue-500" aria-hidden="true" />}
                  accent="text-neutral-600 dark:text-neutral-300"
                  right={
                    <span className="text-[10px] font-semibold text-neutral-400">
                      {selectedTags.length}/{MAX_TAGS} tags
                    </span>
                  }
                >
                  Topic hashtags
                </FieldLabel>

                {/* Selected tags */}
                {selectedTags.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5" aria-label="Selected tags">
                    {selectedTags.map((tag) => (
                      <li key={tag}>
                        <button
                          type="button"
                          onClick={() => setSelectedTags((prev) => prev.filter((t) => t !== tag))}
                          aria-label={`Remove tag ${tag}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-xs cursor-pointer hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                          {tag}
                          <X className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Custom tag entry */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addTag(customTagInput);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    id="uipost-tag-input"
                    type="text"
                    value={customTagInput}
                    onChange={(e) => setCustomTagInput(e.target.value)}
                    maxLength={30}
                    disabled={selectedTags.length >= MAX_TAGS}
                    placeholder={selectedTags.length >= MAX_TAGS ? 'Tag limit reached' : 'Add a custom tag and press Enter'}
                    className={`${inputBase} ${inputOk} flex-1`}
                  />
                  <button
                    type="submit"
                    disabled={selectedTags.length >= MAX_TAGS || !normalizeTag(customTagInput)}
                    className="px-3 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    Add
                  </button>
                </form>

                {/* Suggestions */}
                <div className="flex flex-wrap gap-1.5" aria-label="Suggested tags">
                  {SUGGESTED_TAGS.filter((t) => !selectedTags.includes(t)).map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleSuggestedTag(tag)}
                      aria-pressed={false}
                      disabled={selectedTags.length >= MAX_TAGS}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ================================================================ */}
            {/* 4. FOOTER — cancel + publish                                     */}
            {/* ================================================================ */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-t border-neutral-200/70 dark:border-white/10 bg-white/70 dark:bg-[#141420]/90 backdrop-blur-sm shrink-0">
              <button
                type="button"
                onClick={requestClose}
                className="px-4 py-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Discard
              </button>

              <div className="flex items-center gap-3">
                {submitAttempted && errorCount > 0 && (
                  <span className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {errorCount} field{errorCount === 1 ? '' : 's'} need attention
                  </span>
                )}
                <button
                  type="button"
                  disabled={!isFormValid || isSubmitting}
                  onClick={handleSubmit}
                  aria-label={
                    isSubmitting
                      ? 'Publishing, please wait'
                      : `Publish ${activeFormat.label} post`
                  }
                  className={`px-5 sm:px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 motion-reduce:transition-none ${
                    isFormValid && !isSubmitting
                      ? activeFormat.publishBtn
                      : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  {isSubmitting
                    ? 'Publishing…'
                    : activeType === 'pearl'
                    ? 'Post Pearl'
                    : activeType === 'media'
                    ? 'Share Photos'
                    : activeType === 'case'
                    ? 'Share Case'
                    : activeType === 'poll'
                    ? 'Launch Poll'
                    : 'Publish Article'}
                </button>
              </div>
            </div>

            {/* ================================================================ */}
            {/* 5. CONFIRM-DISCARD OVERLAY (nested alert dialog)                 */}
            {/* ================================================================ */}
            <AnimatePresence>
              {showDiscardConfirm && (
                <motion.div
                  initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
                  className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
                  role="alertdialog"
                  aria-modal="true"
                  aria-labelledby="uipost-discard-title"
                  aria-describedby="uipost-discard-desc"
                >
                  <motion.div
                    initial={{ scale: prefersReducedMotion ? 1 : 0.95, y: prefersReducedMotion ? 0 : 8 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: prefersReducedMotion ? 1 : 0.95, y: prefersReducedMotion ? 0 : 8 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-sm rounded-2xl bg-white dark:bg-[#1c1c22] border border-neutral-200/70 dark:border-white/10 shadow-2xl p-5"
                  >
                    <h2 id="uipost-discard-title" className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      Discard this draft?
                    </h2>
                    <p id="uipost-discard-desc" className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      You've started a {activeFormat.label.toLowerCase()} post. Closing now will permanently discard your text, images and tags.
                    </p>
                    <div className="mt-4 flex items-center justify-end gap-2.5">
                      <button
                        type="button"
                        autoFocus
                        onClick={() => setShowDiscardConfirm(false)}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        Keep editing
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmDiscard}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        Discard draft
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hidden multi-file inputs */}
            <input
              ref={mediaFileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                handleFiles(e.target.files, imageCap);
                e.target.value = '';
              }}
              className="hidden"
              aria-hidden="true"
              tabIndex={-1}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
