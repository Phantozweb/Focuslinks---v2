import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  BookOpen,
  BarChart2,
  Stethoscope,
  Image as ImageIcon,
  ShieldCheck,
  Upload,
  Plus,
  Trash2,
  Clock,
  Globe,
  Tag,
  ChevronDown,
  Check,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { DoctorProfile, ClinicalPost, ClinicalArticleSection } from '../types';

export interface UIPostProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: DoctorProfile;
  onSubmitPost: (newPost: Partial<ClinicalPost>) => void;
  initialMode?: 'pearl' | 'article' | 'case' | 'poll';
}

export type UIPostType = 'pearl' | 'article' | 'poll' | 'case';

export const UIPost: React.FC<UIPostProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSubmitPost,
  initialMode = 'pearl',
}) => {
  // Current active post format
  const [activeType, setActiveType] = useState<UIPostType>(initialMode);

  // Common Composer State
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80'
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(['#ClinicalOptometry']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'wide' | 'square' | 'tall'>('wide');

  // 1. Post / Pearl State
  const [isPearlFormat, setIsPearlFormat] = useState(true);
  const [pearlHeadline, setPearlHeadline] = useState('Scleral Lens Mid-Day Fogging: 3 Key Chairside Checks');

  // 2. Article State (LinkedIn Article / Long-form inspired)
  const [articleTitle, setArticleTitle] = useState(
    'Efficacy of 0.05% Atropine Combined with Orthokeratology in Rapid Axial Elongation'
  );
  const [articleSubtitle, setArticleSubtitle] = useState(
    'A retrospective longitudinal evaluation of pediatric myopia control combining peripheral retinal defocus with pharmacologic muscarinic receptor inhibition.'
  );
  const [articleCategory, setArticleCategory] = useState('Myopia Management');
  const [articleCitations, setArticleCitations] = useState(
    'Kinoshita N, et al. Ophthalmology 2020;127(9):1143-1154.\nYam JC, et al. LAMP Study. Ophthalmology 2022;129(3):308-321.'
  );

  // 3. Poll State (LinkedIn Poll inspired)
  const [pollQuestion, setPollQuestion] = useState(
    'What is your first-line intervention for persistent scleral lens midday fogging?'
  );
  const [pollOptions, setPollOptions] = useState<string[]>([
    'Increase reservoir viscosity (PF tears + saline)',
    'Flatten peripheral landing zone to reduce blanching',
    'Prescribe low-dose fluorometholone & treat MGD',
    'Switch to ultra-high Dk/t silicone hydrogel material',
  ]);
  const [pollDuration, setPollDuration] = useState<'1_day' | '3_days' | '1_week' | '2_weeks'>('1_week');

  // 4. Clinical Case State
  const [caseChiefComplaint, setCaseChiefComplaint] = useState(
    '46yo F with Recurrent Corneal Erosion & Severe Awakening Pain'
  );
  const [patientAgeSex, setPatientAgeSex] = useState('46yo F');
  const [instrumentUsed, setInstrumentUsed] = useState('AS-OCT & Slit Lamp');
  const [visualAcuity, setVisualAcuity] = useState('OD: 20/40 -> 20/20 with BCL');
  const [intraocularPressure, setIntraocularPressure] = useState('15 mmHg OD / 14 mmHg OS');
  const [differentialDiagnosis, setDifferentialDiagnosis] = useState(
    'EBMD (Map-Dot-Fingerprint) vs. Traumatic Erosion'
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  // High-Resolution Diagnostic Scan Presets
  const presetScans = [
    {
      id: 'slit-lamp',
      name: 'Slit Lamp Cornea',
      category: 'Anterior',
      url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'as-oct',
      name: 'AS-OCT Scleral Vault',
      category: 'Cornea',
      url: 'https://images.unsplash.com/photo-1583912267670-6575ad472688?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'optos',
      name: 'Optos 200° Widefield',
      category: 'Retina',
      url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'pentacam',
      name: 'Pentacam Topography',
      category: 'Cornea',
      url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
    },
  ];

  // Topic Tags
  const availableTags = [
    '#OptometryPearls',
    '#ClinicalArticle',
    '#ScleralLenses',
    '#MyopiaManagement',
    '#AnteriorSegment',
    '#Cornea',
    '#Glaucoma',
    '#DryEye',
    '#RetinaImaging',
    '#OrthoK',
  ];

  // Set default content when switching type if blank
  useEffect(() => {
    if (activeType === 'pearl' && !content) {
      setContent(
        `When troubleshooting midday fogging (MDF), avoid instinctively redesigning the peripheral landing zone before checking these 3 factors:\n\n1. Meibomian Gland Shedding: Lipids and mucin debris from eyelid margin friction shed directly into the tear bowl.\n2. Endothelial Decompensation: Microcystic corneal edema can mimic lens fogging. Measure central pachymetry pre- and post-wear.\n3. Fluid Reservoir Stability: High-viscosity preservative-free artificial tears (e.g., 2 drops Celluvisc + non-preserved saline) significantly stabilize the post-lens fluid reservoir.`
      );
      if (!selectedTags.includes('#OptometryPearls')) {
        setSelectedTags(['#OptometryPearls', '#ScleralLenses']);
      }
    } else if (activeType === 'article' && !content) {
      setContent(
        `Background & Clinical Objective:\nPediatric high-progressor myopia (axial elongation > 0.35 mm/year) often fails to reach optimal stabilization with monotherapy alone. Combining peripheral retinal defocus from custom orthokeratology with low-dose pharmacologic muscarinic receptor inhibition creates a synergistic arrest of scleral tissue remodeling.\n\nDiagnostic Biometry & Methodology:\nFifty-two pediatric patients (aged 7-14, baseline spherical equivalent -2.50D to -6.50D) were monitored longitudinally over 24 months using Haag-Streit Lenstar optical biometry. Treatment protocol combined nightly Ortho-K wear with 0.05% non-preserved atropine administered 20 minutes prior to lens insertion.\n\nClinical Outcomes & Results:\nAt 24 months, 86% of patients in the dual-therapy cohort exhibited axial elongation under 0.10 mm/year (mean: 0.07 ± 0.03 mm/year), compared to 0.18 ± 0.05 mm/year in the Ortho-K monotherapy control. Pupil dilation remained clinically insignificant (<1.2 mm).\n\nKey Takeaways for Eye Care Specialists:\nDual-action therapy offers an evidence-backed intervention for fast progressors. Regular optical biometry every 6 months is indispensable for tracking efficacy.`
      );
      if (!selectedTags.includes('#ClinicalArticle')) {
        setSelectedTags(['#ClinicalArticle', '#MyopiaManagement']);
      }
    } else if (activeType === 'poll' && !content) {
      setContent(
        `Patient has worn 16.5mm scleral lenses for 8 months with comfortable 250µm apical clearance, zero limbal touch, and no sectorial blanching. However, dense particulate haze accumulates in the tear reservoir within 3-4 hours of insertion, reducing visual acuity from 20/20 to 20/60. Slit-lamp shows significant meibomian gland capping. Which intervention would you prioritize first?`
      );
      if (!selectedTags.includes('#OptometryPearls')) {
        setSelectedTags(['#OptometryPearls', '#ScleralLenses']);
      }
    } else if (activeType === 'case' && !content) {
      setContent(
        `Patient presented with severe right ocular pain awakening her at 3:00 AM with photophobia and profuse epiphora.\n\nSlit-lamp examination revealed a localized 2.5mm epithelial defect in the inferior-central cornea with ragged edges and negative sodium fluorescein pooling under the loose flap. AS-OCT confirmed focal basement membrane dystrophy with epithelial micro-cysts.\n\nManagement: Therapeutic bandage soft contact lens (Air Optix Night & Day, 8.4mm BC) placed with preservative-free moxifloxacin TID and hypertonic NaCl 5% ointment at bedtime once re-epithelialized.`
      );
      if (!selectedTags.includes('#AnteriorSegment')) {
        setSelectedTags(['#AnteriorSegment', '#Cornea']);
      }
    }
  }, [activeType]);

  if (!isOpen) return null;

  // Article reading time calculation
  const calculateReadTime = (): number => {
    const text = (articleTitle + ' ' + articleSubtitle + ' ' + content).trim();
    const words = text ? text.split(/\s+/).length : 0;
    return Math.max(1, Math.round(words / 150));
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          setShowImagePicker(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPollOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const handleUpdatePollOption = (index: number, val: string) => {
    const updated = [...pollOptions];
    updated[index] = val;
    setPollOptions(updated);
  };

  const handleRemovePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    let finalContent = content.trim();
    let sections: ClinicalArticleSection[] | undefined = undefined;

    if (activeType === 'article') {
      if (!articleTitle.trim()) {
        setIsSubmitting(false);
        return;
      }
      finalContent = articleSubtitle.trim() || finalContent;

      // Extract sections from paragraphs
      const paragraphs = content.split('\n\n').filter((p) => p.trim());
      sections = paragraphs.map((p, index) => {
        const lines = p.split('\n');
        if (lines.length > 1 && lines[0].endsWith(':')) {
          return {
            heading: lines[0].replace(':', ''),
            body: lines.slice(1).join('\n').trim(),
          };
        }
        return {
          heading: index === 0 ? 'Clinical Overview' : `Clinical Discussion (Part ${index + 1})`,
          body: p.trim(),
        };
      });
    }

    const citationList = articleCitations
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean);

    const newPostData: Partial<ClinicalPost> = {
      content: finalContent || 'Clinical update shared on FocusLinks.',
      tags: selectedTags,
      images: selectedImage ? [selectedImage] : undefined,
      aspectRatio,
      cardCategory:
        activeType === 'article'
          ? 'article'
          : activeType === 'pearl'
          ? 'pearl'
          : activeType === 'poll'
          ? 'poll'
          : 'oct',
      pearlHeadline:
        activeType === 'pearl' && isPearlFormat ? pearlHeadline.trim() : undefined,
      articleMetadata:
        activeType === 'article'
          ? {
              title: articleTitle.trim(),
              subtitle: articleSubtitle.trim(),
              abstract: finalContent,
              readTimeMinutes: calculateReadTime(),
              sections: sections && sections.length > 0 ? sections : undefined,
              citations: citationList.length > 0 ? citationList : undefined,
              peerReviewed: true,
            }
          : undefined,
      clinicalMetadata:
        activeType === 'case'
          ? {
              patientAgeSex,
              chiefComplaint: caseChiefComplaint,
              instrumentUsed,
              acuity: visualAcuity,
              intraocularPressure,
              diagnosisType: 'Case Showcase',
            }
          : undefined,
      poll:
        activeType === 'poll'
          ? {
              question: pollQuestion.trim(),
              options: pollOptions.filter((o) => o.trim()).map((text, i) => ({
                id: `opt-${Date.now()}-${i}`,
                text,
                votes: 1,
              })),
              totalVotes: pollOptions.filter((o) => o.trim()).length,
            }
          : undefined,
    };

    onSubmitPost(newPostData);
    setIsSubmitting(false);
    onClose();
  };

  const isFormValid =
    activeType === 'article'
      ? articleTitle.trim().length > 0 && content.trim().length > 0
      : activeType === 'pearl'
      ? (!isPearlFormat || pearlHeadline.trim().length > 0) && content.trim().length > 0
      : activeType === 'poll'
      ? pollQuestion.trim().length > 0 && pollOptions.filter((o) => o.trim()).length >= 2
      : caseChiefComplaint.trim().length > 0 && content.trim().length > 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 25 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full sm:max-w-3xl lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-white dark:bg-[#121214] border border-neutral-200/90 dark:border-neutral-800 shadow-2xl overflow-hidden"
        >
          {/* Mobile Drag Indicator */}
          <div className="sm:hidden flex justify-center pt-2.5 pb-1">
            <div className="w-10 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          </div>

          {/* ========================================================= */}
          {/* TOP BAR: Author Avatar, Audience Selector, Close Button   */}
          {/* ========================================================= */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-[#161619]/70 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/30"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    {currentUser.name}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold">
                    {currentUser.credentials}
                  </span>
                </div>

                {/* Audience Pill (LinkedIn style) */}
                <div className="flex items-center gap-1.5 mt-0.5">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#1e1e22] text-[11px] font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <Globe className="h-3 w-3 text-blue-500" />
                    <span>Anyone on FocusLinks</span>
                    <ChevronDown className="h-2.5 w-2.5 opacity-60" />
                  </button>
                  <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">•</span>
                  <span className="hidden sm:inline text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold items-center gap-1">
                    <ShieldCheck className="h-3 w-3 inline mr-0.5" />
                    HIPAA Protected
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* ========================================================= */}
          {/* FULL WIDTH SMOOTH DYNAMIC TABS BAR (LinkedIn/X inspired)  */}
          {/* ========================================================= */}
          <div className="px-4 sm:px-6 pt-3 pb-2 bg-neutral-100/50 dark:bg-[#151518]/50 border-b border-neutral-200/80 dark:border-neutral-800">
            <div className="relative grid grid-cols-4 p-1 rounded-2xl bg-neutral-200/70 dark:bg-neutral-800/80 w-full gap-1">
              {/* Tab 1: Clinical Post */}
              <button
                type="button"
                onClick={() => setActiveType('pearl')}
                className={`relative z-10 flex items-center justify-center gap-1.5 py-2 px-1 sm:px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeType === 'pearl'
                    ? 'text-neutral-900 dark:text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {activeType === 'pearl' && (
                  <motion.div
                    layoutId="uipost-active-pill"
                    className="absolute inset-0 bg-white dark:bg-[#202024] rounded-xl shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <Sparkles className="relative z-10 h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span className="relative z-10 truncate">Clinical Post</span>
              </button>

              {/* Tab 2: Article */}
              <button
                type="button"
                onClick={() => setActiveType('article')}
                className={`relative z-10 flex items-center justify-center gap-1.5 py-2 px-1 sm:px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeType === 'article'
                    ? 'text-neutral-900 dark:text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {activeType === 'article' && (
                  <motion.div
                    layoutId="uipost-active-pill"
                    className="absolute inset-0 bg-white dark:bg-[#202024] rounded-xl shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <BookOpen className="relative z-10 h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span className="relative z-10 truncate">Article</span>
              </button>

              {/* Tab 3: Poll */}
              <button
                type="button"
                onClick={() => setActiveType('poll')}
                className={`relative z-10 flex items-center justify-center gap-1.5 py-2 px-1 sm:px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeType === 'poll'
                    ? 'text-neutral-900 dark:text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {activeType === 'poll' && (
                  <motion.div
                    layoutId="uipost-active-pill"
                    className="absolute inset-0 bg-white dark:bg-[#202024] rounded-xl shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <BarChart2 className="relative z-10 h-3.5 w-3.5 text-purple-500 shrink-0" />
                <span className="relative z-10 truncate">Poll</span>
              </button>

              {/* Tab 4: Clinical Case */}
              <button
                type="button"
                onClick={() => setActiveType('case')}
                className={`relative z-10 flex items-center justify-center gap-1.5 py-2 px-1 sm:px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeType === 'case'
                    ? 'text-neutral-900 dark:text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {activeType === 'case' && (
                  <motion.div
                    layoutId="uipost-active-pill"
                    className="absolute inset-0 bg-white dark:bg-[#202024] rounded-xl shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <Stethoscope className="relative z-10 h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span className="relative z-10 truncate">Case File</span>
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* MAIN DYNAMIC COMPOSER (Intuitive, Native Social Media UX) */}
          {/* ========================================================= */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-5 space-y-4">
            {/* ------------------------------------------------------- */}
            {/* 1. SHORT CLINICAL POST INTERFACE                        */}
            {/* ------------------------------------------------------- */}
            {activeType === 'pearl' && (
              <div className="space-y-4">
                {/* Takeaway Headline Toggle */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40">
                  <div className="flex items-center gap-2.5">
                    <span className="p-1.5 rounded-xl bg-blue-600 text-white shadow-xs">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <div>
                      <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block">
                        Featured Clinical Headline Banner
                      </span>
                      <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        Highlight a key diagnostic finding or takeaway above your post
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isPearlFormat}
                    onChange={(e) => setIsPearlFormat(e.target.checked)}
                    className="h-4 w-4 rounded accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* Headline Input */}
                {isPearlFormat && (
                  <div>
                    <input
                      type="text"
                      value={pearlHeadline}
                      onChange={(e) => setPearlHeadline(e.target.value)}
                      placeholder="Post Headline (e.g. Scleral Lens Mid-Day Fogging: 3 Key Chairside Checks)"
                      className="w-full px-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#18181b] text-sm sm:text-base font-bold text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                )}

                {/* Main Post Textarea */}
                <div>
                  <textarea
                    rows={7}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={`What's on your clinical mind today, Dr. ${currentUser.name.split(' ').slice(-1)[0]}? Share diagnostic insights, observations, or discussion...`}
                    className="w-full px-4 py-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#18181b] text-sm sm:text-base text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* 2. LONG-FORM ARTICLE INTERFACE (LinkedIn Article style) */}
            {/* ------------------------------------------------------- */}
            {activeType === 'article' && (
              <div className="space-y-4">
                {/* Article Cover Image Header (Optional) */}
                {selectedImage ? (
                  <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-black/5 group">
                    <img
                      src={selectedImage}
                      alt="Article Cover"
                      className="h-44 sm:h-52 w-full object-cover"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowImagePicker(true)}
                        className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-white text-xs font-semibold hover:bg-black transition-colors"
                      >
                        Change Cover
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedImage(null)}
                        className="p-1 rounded-lg bg-black/70 backdrop-blur-sm text-white hover:text-rose-400 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-white font-medium">
                      Article Cover Image
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowImagePicker(true)}
                    className="w-full py-6 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 bg-neutral-50/50 dark:bg-[#18181b]/50 text-neutral-500 dark:text-neutral-400 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ImageIcon className="h-6 w-6 text-blue-500" />
                    <span className="text-xs font-bold">Add a Cover Photo / Scan for your Article</span>
                    <span className="text-[11px] text-neutral-400">High-resolution anterior or posterior imaging recommended</span>
                  </button>
                )}

                {/* Article Headline Input */}
                <div>
                  <input
                    type="text"
                    value={articleTitle}
                    onChange={(e) => setArticleTitle(e.target.value)}
                    placeholder="Article Headline (e.g. Efficacy of 0.05% Atropine Combined with Orthokeratology)"
                    className="w-full px-1 py-2 text-lg sm:text-2xl font-black text-neutral-900 dark:text-white placeholder:text-neutral-300 dark:placeholder:text-neutral-600 bg-transparent border-b border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Subtitle / Synopsis */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      value={articleSubtitle}
                      onChange={(e) => setArticleSubtitle(e.target.value)}
                      placeholder="Write a brief subtitle or study abstract..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#18181b] text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <select
                      value={articleCategory}
                      onChange={(e) => setArticleCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#18181b] text-xs font-semibold text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                    >
                      <option value="Myopia Management">Myopia Management</option>
                      <option value="Scleral Lenses & Cornea">Scleral Lenses & Cornea</option>
                      <option value="Anterior Segment">Anterior Segment</option>
                      <option value="Glaucoma & Neuro">Glaucoma & Neuro</option>
                      <option value="Dry Eye & Ocular Surface">Dry Eye & Ocular Surface</option>
                      <option value="Retinal Diagnostics">Retinal Diagnostics</option>
                    </select>
                  </div>
                </div>

                {/* Reading time metric */}
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 px-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Estimated Read Time: ~{calculateReadTime()} min read</span>
                </div>

                {/* Full Article Body */}
                <div>
                  <textarea
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write the full article body here. Feel free to structure with paragraph breaks or headings like 'Background:', 'Methodology:', 'Results:'..."
                    className="w-full px-4 py-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#18181b] text-sm sm:text-base text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* References */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                    Literature Citations & Peer References (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={articleCitations}
                    onChange={(e) => setArticleCitations(e.target.value)}
                    placeholder="One peer citation per line (e.g. Ophthalmology 2020;127(9):1143-1154)..."
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#18181b] text-xs text-neutral-700 dark:text-neutral-300 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none font-mono"
                  />
                </div>
              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* 3. INTERACTIVE POLL INTERFACE (LinkedIn Poll style)     */}
            {/* ------------------------------------------------------- */}
            {activeType === 'poll' && (
              <div className="space-y-4">
                {/* Question input */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                    <BarChart2 className="h-4 w-4" />
                    <span>Your Clinical Question</span>
                  </label>
                  <input
                    type="text"
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                    placeholder="e.g. What is your primary intervention for persistent scleral lens midday fogging?"
                    className="w-full px-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#18181b] text-sm sm:text-base font-bold text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  />
                </div>

                {/* Poll Options (Tap to add stuffs) */}
                <div className="space-y-2.5 p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/70 dark:border-purple-900/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      Poll Options ({pollOptions.length}/5)
                    </span>
                    {pollOptions.length < 5 && (
                      <button
                        type="button"
                        onClick={handleAddPollOption}
                        className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add Option</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-2">
                    {pollOptions.map((option, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="h-7 w-7 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleUpdatePollOption(idx, e.target.value)}
                          placeholder={`Option ${idx + 1}...`}
                          className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1e1e22] text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        />
                        {pollOptions.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleRemovePollOption(idx)}
                            aria-label="Remove option"
                            className="p-2 text-neutral-400 hover:text-rose-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Poll Duration */}
                  <div className="flex items-center justify-between pt-2 border-t border-purple-200/50 dark:border-purple-900/40 text-xs">
                    <span className="text-neutral-500 font-medium">Poll Duration:</span>
                    <div className="flex items-center gap-1.5">
                      {(['1_day', '3_days', '1_week', '2_weeks'] as const).map((dur) => (
                        <button
                          key={dur}
                          type="button"
                          onClick={() => setPollDuration(dur)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                            pollDuration === dur
                              ? 'bg-purple-600 text-white'
                              : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100'
                          }`}
                        >
                          {dur.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Case context for the poll */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1.5">
                    Clinical Background & Context (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Provide relevant clinical history, patient symptoms, or findings to help colleagues vote informedly..."
                    className="w-full px-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#18181b] text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* 4. CLINICAL CASE FILE INTERFACE                         */}
            {/* ------------------------------------------------------- */}
            {activeType === 'case' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <Stethoscope className="h-4 w-4" />
                    <span>Chief Complaint & Case Presentation</span>
                  </label>
                  <input
                    type="text"
                    value={caseChiefComplaint}
                    onChange={(e) => setCaseChiefComplaint(e.target.value)}
                    placeholder="e.g. 46yo F with Recurrent Corneal Erosion & Severe Ocular Pain"
                    className="w-full px-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#18181b] text-sm sm:text-base font-bold text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>

                {/* Patient Clinical Parameters Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
                      Age / Sex
                    </label>
                    <input
                      type="text"
                      value={patientAgeSex}
                      onChange={(e) => setPatientAgeSex(e.target.value)}
                      placeholder="e.g. 46yo F"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#18181b] text-xs font-bold text-neutral-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
                      Instrument
                    </label>
                    <input
                      type="text"
                      value={instrumentUsed}
                      onChange={(e) => setInstrumentUsed(e.target.value)}
                      placeholder="e.g. AS-OCT & Slit Lamp"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#18181b] text-xs font-bold text-neutral-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
                      Visual Acuity
                    </label>
                    <input
                      type="text"
                      value={visualAcuity}
                      onChange={(e) => setVisualAcuity(e.target.value)}
                      placeholder="e.g. 20/40 -> 20/20"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#18181b] text-xs font-bold text-neutral-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
                      IOP
                    </label>
                    <input
                      type="text"
                      value={intraocularPressure}
                      onChange={(e) => setIntraocularPressure(e.target.value)}
                      placeholder="e.g. 15 mmHg"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#18181b] text-xs font-bold text-neutral-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Biomicroscopy Findings, Differential Diagnosis & Management
                  </label>
                  <textarea
                    rows={7}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Document slit-lamp findings, corneal staining, anterior segment OCT interpretation, and therapeutic follow-up..."
                    className="w-full px-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#18181b] text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* INLINE ATTACHED MEDIA (LinkedIn / Instagram style)       */}
            {/* ------------------------------------------------------- */}
            {selectedImage && activeType !== 'article' && (
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 group">
                <img
                  src={selectedImage}
                  alt="Attached Diagnostic Scan"
                  className={`w-full object-cover transition-all ${
                    aspectRatio === 'square'
                      ? 'aspect-square max-h-[360px]'
                      : aspectRatio === 'tall'
                      ? 'aspect-[4/5] max-h-[420px]'
                      : 'aspect-[16/9] max-h-[320px]'
                  }`}
                />

                {/* Aspect Ratio & Remove Toolbar Overlay */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <div className="hidden sm:flex items-center bg-black/70 backdrop-blur-sm p-1 rounded-xl gap-1">
                    <button
                      type="button"
                      onClick={() => setAspectRatio('wide')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        aspectRatio === 'wide' ? 'bg-white text-black' : 'text-neutral-300'
                      }`}
                    >
                      16:9
                    </button>
                    <button
                      type="button"
                      onClick={() => setAspectRatio('square')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        aspectRatio === 'square' ? 'bg-white text-black' : 'text-neutral-300'
                      }`}
                    >
                      1:1
                    </button>
                    <button
                      type="button"
                      onClick={() => setAspectRatio('tall')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        aspectRatio === 'tall' ? 'bg-white text-black' : 'text-neutral-300'
                      }`}
                    >
                      4:5
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowImagePicker(true)}
                    className="px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-sm text-white text-xs font-semibold hover:bg-black transition-colors"
                  >
                    Change
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    aria-label="Remove image"
                    className="p-1.5 rounded-xl bg-black/70 backdrop-blur-sm text-white hover:text-rose-400 hover:bg-black transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-white font-medium">
                  High-Resolution Ophthalmic Imaging Attached
                </div>
              </div>
            )}

            {/* Quick Image Picker Popover */}
            {showImagePicker && (
              <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-[#1a1a1e] border border-neutral-200 dark:border-neutral-800 space-y-2.5 animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  <span>Select Ophthalmic Image or Upload</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-semibold"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      <span>Upload file</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowImagePicker(false)}
                      className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {presetScans.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setSelectedImage(preset.url);
                        setShowImagePicker(false);
                      }}
                      className="group relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 text-left transition-all"
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="h-16 w-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="block p-1.5 text-[11px] font-bold text-neutral-800 dark:text-neutral-200 truncate">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Inline Hashtag Chips */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
                <span className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  <span>Topic Hashtags</span>
                </span>
                <span className="text-[11px] text-neutral-400">Tap to toggle tags</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {availableTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* HIDDEN FILE INPUT */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* ========================================================= */}
          {/* BOTTOM TOOLBAR: Actions, Media Trigger & Publish CTA      */}
          {/* ========================================================= */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/90 dark:bg-[#141416]/90 backdrop-blur-sm">
            {/* Media Attachment Tools */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowImagePicker(!showImagePicker)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#1e1e22] text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <ImageIcon className="h-4 w-4 text-blue-500" />
                <span>{selectedImage ? 'Imaging Attached' : 'Attach Scan / Image'}</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Upload Photo from Device"
              >
                <Upload className="h-4 w-4" />
              </button>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                Discard
              </button>

              <button
                type="button"
                disabled={!isFormValid || isSubmitting}
                onClick={() => handleSubmit()}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
                  isFormValid && !isSubmitting
                    ? activeType === 'article'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25 active:scale-97'
                      : activeType === 'pearl'
                      ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/25 active:scale-97'
                      : activeType === 'poll'
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/25 active:scale-97'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25 active:scale-97'
                    : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting
                  ? 'Publishing...'
                  : activeType === 'article'
                  ? 'Publish Article'
                  : activeType === 'pearl'
                  ? 'Post Pearl'
                  : activeType === 'poll'
                  ? 'Launch Poll'
                  : 'Share Case'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
