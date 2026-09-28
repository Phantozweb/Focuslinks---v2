import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Heart,
  Bookmark,
  Check,
  Share2,
  Stethoscope,
  Lightbulb,
  Award,
  Plus,
  RefreshCw,
  Flame,
  Volume2,
  VolumeX,
  Compass,
  Zap,
  List,
  SlidersHorizontal,
  Layers,
  ArrowDown
} from 'lucide-react';
import { DoctorProfile } from '../types';

export interface ClinicalPearlItem {
  id: string;
  specialty: string;
  specialtyColor: string;
  headline: string;
  takeaways: string[];
  chairsideRule: string;
  clinicalCitation?: string;
  doctor: {
    name: string;
    credentials: string;
    role: string;
    avatar: string;
  };
  likesCount: number;
  vaultSavesCount: number;
  readTimeSeconds: number;
  categoryTag?: string;
}

// Backwards-compatible alias
export type OptomShortItem = ClinicalPearlItem;

interface ClinicalPearlsProps {
  currentUser: DoctorProfile;
  onOpenNewPost: () => void;
  onViewDoctorProfile?: (name: string) => void;
}

export const CLINICAL_PEARLS_DATA: ClinicalPearlItem[] = [
  {
    id: 'pearl-1',
    specialty: 'Scleral Lenses',
    specialtyColor: 'from-blue-600 to-cyan-600',
    categoryTag: '#ScleralPearls',
    headline: 'Scleral Midday Fogging: The 3-Step Exclusion Rule',
    takeaways: [
      'Avoid immediately modifying the haptic landing curves before ruling out tear reservoir pollution.',
      'Meibomian Gland Shedding: Friction between the upper lid margin and lens edge sheds excessive mucin/lipids into the fluid bowl.',
      'Endothelial Exhaustion: Microcystic corneal edema can clinically mimic fluid reservoir haze. Check central pachymetry before and after 4 hours of wear.',
      'Viscosity Trick: Prescribe high-viscosity PF artificial tears (2 drops Celluvisc) into non-preserved saline to stabilize post-lens fluid.',
    ],
    chairsideRule:
      '💡 30-Second Rule: If particulate haze floats within the reservoir under slit-lamp beam, stabilize viscosity first. If the cornea itself is hazy after lens removal, evaluate endothelial pump cell density (specular microscopy).',
    clinicalCitation: 'Optometry & Vision Science 2021;98(3):214-222',
    doctor: {
      name: 'Dr. Marcus Vance',
      credentials: 'OD, FAAO, FSLS',
      role: 'Cornea & Contact Lens Specialist',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
    },
    likesCount: 412,
    vaultSavesCount: 228,
    readTimeSeconds: 25,
  },
  {
    id: 'pearl-2',
    specialty: 'Pediatric Myopia',
    specialtyColor: 'from-purple-600 to-indigo-600',
    categoryTag: '#MyopiaControl',
    headline: '0.05% vs 0.01% Atropine: What LAMP Actually Proved',
    takeaways: [
      'The 0.01% concentration failed to demonstrate statistically significant axial elongation control over placebo in year 2 of the LAMP trial.',
      '0.05% Atropine delivered more than DOUBLE the efficacy of 0.01% in arresting axial length progression (0.27mm vs 0.59mm over 2 years).',
      'Photopic pupil dilation with 0.05% is clinically tolerable (averages +1.03mm) and rarely causes symptomatic photophobia in pediatric cohorts.',
      'Combining 0.05% atropine with Ortho-K achieves synergistic arrest in fast progressors (>0.35 mm/yr).',
    ],
    chairsideRule:
      '💡 Chairside Protocol: Start fast-progressing pediatric myopes directly on 0.05% unpreserved atropine instead of 0.01%. Monitor axial length with optical biometry every 6 months.',
    clinicalCitation: 'Ophthalmology (LAMP Study) 2020;127(7):910-919',
    doctor: {
      name: 'Dr. Sarah Chen',
      credentials: 'OD, FAAO',
      role: 'Director of Pediatric Myopia Center',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
    },
    likesCount: 567,
    vaultSavesCount: 384,
    readTimeSeconds: 30,
  },
  {
    id: 'pearl-3',
    specialty: 'Corneal Topography',
    specialtyColor: 'from-amber-600 to-rose-600',
    categoryTag: '#CornealTopography',
    headline: 'Inferior Steepening on Pentacam: Keratoconus or Warpage?',
    takeaways: [
      'Contact Lens-Induced Warpage can closely mirror forme fruste keratoconus on axial curvature maps.',
      'Examine the Posterior Elevation Map: True keratoconus almost universally shows early elevation above the Best Fit Sphere (BFS) on the back surface.',
      'Lens warpage produces purely anterior surface distortion with normal, flat posterior elevation.',
      'Pachymetric distribution in warpage remains concentric, whereas ectasia shows rapid eccentric inferotemporal thinning.',
    ],
    chairsideRule:
      '💡 Diagnostic Pearl: Never diagnose early keratoconus in soft toric or RGP wearers based on axial curvature alone. Look at posterior elevation and repeat topography after 2-3 weeks of lens cessation.',
    clinicalCitation: 'Cornea 2019;38(6):701-708',
    doctor: {
      name: 'Dr. Elena Rostova',
      credentials: 'OD, PhD, FAAO',
      role: 'Anterior Segment & Research Fellow',
      avatar: 'https://images.unsplash.com/photo-1594824813579-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
    },
    likesCount: 341,
    vaultSavesCount: 260,
    readTimeSeconds: 28,
  },
  {
    id: 'pearl-4',
    specialty: 'Glaucoma & Neuro',
    specialtyColor: 'from-emerald-600 to-teal-600',
    categoryTag: '#GlaucomaPearls',
    headline: 'GAT Calibration Drift: The 2-Minute Tonometry Check',
    takeaways: [
      'Goldmann Applanation Tonometers (GAT) frequently drift by ±2 to 4 mmHg over 6-12 months of high clinic volume.',
      'Check at calibration markings 0, 2, and 6 using the calibration weight bar on your slit-lamp.',
      'A +3 mmHg calibration error can cause unnecessary escalation to second-line prostaglandin or SLT referral.',
      'Clean prism tip with 70% isopropyl alcohol and let air-dry for at least 5 minutes to prevent epithelial toxicity.',
    ],
    chairsideRule:
      '💡 Chairside Protocol: Check your lane tonometers on the 1st of every month. Document calibration checks in your clinic QA logbook.',
    clinicalCitation: 'American Journal of Ophthalmology 2018;189:88-93',
    doctor: {
      name: 'Dr. Kevin Patel',
      credentials: 'OD, FAAO',
      role: 'Glaucoma & Surgical Co-Management',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=80',
    },
    likesCount: 289,
    vaultSavesCount: 215,
    readTimeSeconds: 22,
  },
  {
    id: 'pearl-5',
    specialty: 'Anterior Segment',
    specialtyColor: 'from-rose-600 to-pink-600',
    categoryTag: '#CornealDisease',
    headline: 'Map-Dot-Fingerprint (EBMD) vs Recurrent Erosion',
    takeaways: [
      'Patients waking with acute photophobia and ripping pain often have undiagnosed EBMD in the contralateral asymptomatic eye.',
      'Look for negative fluorescein staining: loose, non-adherent epithelium shows instantaneous black puddles with cobalt blue filter.',
      'Bandage Soft Contact Lens (BCL) + PF Moxifloxacin is the gold-standard immediate chairside therapy.',
      'Post-healing: Prescribe hypertonic 5% NaCl ointment QHS for 3-6 months to draw out microcystic edema and foster hemi-desmosome anchoring.',
    ],
    chairsideRule:
      '💡 Clinical Pearl: Always examine the fellow eye with negative NaFl staining. 70% of traumatic RCE cases have underlying bilateral subclinical basement membrane dystrophy.',
    clinicalCitation: 'Clinical Ophthalmology 2022;16:341-352',
    doctor: {
      name: 'Dr. Maya Lin',
      credentials: 'OD, FAAO',
      role: 'Cornea & Ocular Surface Clinic',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&auto=format&fit=crop&q=80',
    },
    likesCount: 442,
    vaultSavesCount: 301,
    readTimeSeconds: 26,
  },
  {
    id: 'pearl-6',
    specialty: 'Retinal Diagnostics',
    specialtyColor: 'from-amber-500 to-orange-600',
    categoryTag: '#RetinaPearls',
    headline: 'Optos 200° Peripheral Lattice: When to Laser Barrier',
    takeaways: [
      'Asymptomatic atrophic round holes within lattice degeneration have less than a 1-2% risk of progressing to clinical retinal detachment.',
      'High-risk features that warrant retina specialist referral: tractional horseshoe tears at the margin, subclinical fluid cuffing >1 disc diameter, or history of RD in fellow eye.',
      'Ultra-widefield imaging detects 30% more peripheral lesions compared to standard 50° fundus photography.',
      'Always counsel high myopes on the 4 cardinal warning signs: flashes, sudden vitreous shower, curtain, and localized peripheral shadow.',
    ],
    chairsideRule:
      '💡 Referral Rule: Horseshoe tears with vitreous traction require urgent prophylactic barrier laser within 24-48 hours. Flat lattice with round atrophic holes can be monitored annually.',
    clinicalCitation: 'Retina Journal 2021;41(8):1620-1629',
    doctor: {
      name: 'Dr. James Thornton',
      credentials: 'OD, FAAO',
      role: 'Vitreoretinal Optometric Consultant',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80',
    },
    likesCount: 498,
    vaultSavesCount: 341,
    readTimeSeconds: 27,
  },
  {
    id: 'pearl-7',
    specialty: 'Ocular Surface',
    specialtyColor: 'from-teal-600 to-emerald-600',
    categoryTag: '#Demodex',
    headline: 'Demodex Blepharitis: Why Tea Tree Oil Is Outdated',
    takeaways: [
      'High-concentration tea tree oil (4-Terpineol) causes significant ocular stinging, epithelial sloughing, and poor long-term compliance.',
      'Cylindrical dandruff (collarettes) at the base of the eyelash is 100% pathognomonic for Demodex infestation.',
      'Lotilaner ophthalmic solution 0.25% (Xdemvy) targets parasite GABA-gated chloride channels directly with minimal ocular surface irritation.',
      'Dosing: 1 drop BID for 6 weeks eradicates 90%+ of mites and completely clears collarettes in >80% of patients.',
    ],
    chairsideRule:
      '💡 Slit-Lamp Pearl: Have the patient look down, focus at 25x on the upper lid lash base. If collarettes are present, discontinue tea tree scrubs and prescribe Lotilaner 0.25% BID x 6 weeks.',
    clinicalCitation: 'Cornea (Saturn-1 & Saturn-2 Trials) 2023;42(8):962-970',
    doctor: {
      name: 'Dr. Rachel Green',
      credentials: 'OD, FAAO',
      role: 'Dry Eye & Blepharitis Center',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
    },
    likesCount: 512,
    vaultSavesCount: 379,
    readTimeSeconds: 24,
  },
  {
    id: 'pearl-8',
    specialty: 'Glaucoma & Neuro',
    specialtyColor: 'from-indigo-600 to-violet-600',
    categoryTag: '#NeuroOptometry',
    headline: 'Subtle RAPD: The 0.3 Neutral Density Filter Trick',
    takeaways: [
      'Mild asymmetric glaucoma or early optic neuritis can produce an ambiguous swinging flashlight test.',
      'Hold a 0.3 log unit Neutral Density (ND) filter over the suspected normal eye.',
      'If the RAPD vanishes or reverses, the asymmetry is true and equals approximately 0.3-0.6 log units of afferent defect.',
      'Horner’s Syndrome confirmation: 0.5% Apraclonidine causes reversal of anisocoria (dilates the Horner’s pupil due to denervation supersensitivity).',
    ],
    chairsideRule:
      '💡 Neuro Pearl: Never rely on pupil size alone for RAPD. Test in dim ambient light with an intense finhoff transilluminator and quantitate with log ND filters.',
    clinicalCitation: 'Journal of Neuro-Ophthalmology 2020;40(2):189-195',
    doctor: {
      name: 'Dr. Kevin Patel',
      credentials: 'OD, FAAO',
      role: 'Glaucoma & Surgical Co-Management',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=80',
    },
    likesCount: 388,
    vaultSavesCount: 290,
    readTimeSeconds: 29,
  },
  {
    id: 'pearl-9',
    specialty: 'Retinal Diagnostics',
    specialtyColor: 'from-amber-600 to-red-600',
    categoryTag: '#OCTDiagnostics',
    headline: 'Plaquenil (HCQ) Toxicity: Asian vs Caucasian OCT Patterns',
    takeaways: [
      'The classic parafoveal "flying saucer" or parafoveal thinning pattern predominantly occurs in Caucasian patients.',
      'In Asian patients, over 50% of early hydroxychloroquine retinopathy manifests as PERICENTRAL outer retinal loss (beyond 7° from fovea).',
      'Screening recommendation: Use 30-2 or 24-2 HVF + widefield OCT in Asian patients, rather than 10-2 HVF alone.',
      'Cumulative safe daily dose cutoff: Keep under 5.0 mg/kg actual body weight.',
    ],
    chairsideRule:
      '💡 Vital Screening Rule: If your patient is of Asian descent on Plaquenil >5 years, order a 30-2 HVF and widefield OCT raster to catch pericentral ellipsoid disruption before foveal encroachment.',
    clinicalCitation: 'AAO Screening Recommendations Ophthalmology 2021;128(7):1089-1099',
    doctor: {
      name: 'Dr. James Thornton',
      credentials: 'OD, FAAO',
      role: 'Vitreoretinal Optometric Consultant',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80',
    },
    likesCount: 620,
    vaultSavesCount: 489,
    readTimeSeconds: 31,
  },
  {
    id: 'pearl-10',
    specialty: 'Scleral Lenses',
    specialtyColor: 'from-cyan-600 to-blue-700',
    categoryTag: '#ScleralFitting',
    headline: 'Optimal Scleral SAG Clearance: The 200 µm Threshold',
    takeaways: [
      'Initial clearance right after insertion should measure between 250-350 µm over the central cornea.',
      'Scleral lenses settle approximately 100 to 150 µm into the compressible conjunctival spongy tissue after 4-6 hours of wear.',
      'Final settled central clearance must stabilize around 150 to 200 µm.',
      'Under 100 µm risks late corneal touch; over 300 µm reduces visual acuity, induces midday fogging, and causes corneal hypoxia.',
    ],
    chairsideRule:
      '💡 Optical Comparison: Use the central lens center thickness (CT ~300 µm) as your visual optical comparator under slit lamp optic section.',
    clinicalCitation: 'Eye & Contact Lens 2022;48(5):204-211',
    doctor: {
      name: 'Dr. Marcus Vance',
      credentials: 'OD, FAAO, FSLS',
      role: 'Cornea & Contact Lens Specialist',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
    },
    likesCount: 435,
    vaultSavesCount: 310,
    readTimeSeconds: 23,
  },
  {
    id: 'pearl-11',
    specialty: 'Anterior Segment',
    specialtyColor: 'from-emerald-600 to-green-600',
    categoryTag: '#Keratoconus',
    headline: 'CXL Corneal Crosslinking: The 400 µm Stromal Rule',
    takeaways: [
      'Standard Dresden CXL protocol requires minimum 400 µm de-epithelialized stromal pachymetry to shield the corneal endothelium from cytotoxic UVA damage.',
      'If the cornea is <400 µm after epithelial removal, do NOT abandon crosslinking.',
      'Use hypo-osmolar 0.1% riboflavin saline solution drops every 2 minutes for 15-20 minutes to artificially swell the stroma back to >400 µm.',
      'Customized accelerated or contact-lens assisted CXL (CACXL) is now viable for advanced thin cones.',
    ],
    chairsideRule:
      '💡 Referral Timing: Refer keratoconus patients for CXL at the FIRST documented sign of progression (steepening Kmax >1.00D or pachymetric loss >10 µm), before thickness drops below 400 µm.',
    clinicalCitation: 'Journal of Cataract & Refractive Surgery 2020;46(8):1150-1160',
    doctor: {
      name: 'Dr. Elena Rostova',
      credentials: 'OD, PhD, FAAO',
      role: 'Anterior Segment & Research Fellow',
      avatar: 'https://images.unsplash.com/photo-1594824813579-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
    },
    likesCount: 395,
    vaultSavesCount: 285,
    readTimeSeconds: 28,
  },
  {
    id: 'pearl-12',
    specialty: 'Retinal Diagnostics',
    specialtyColor: 'from-rose-600 to-red-700',
    categoryTag: '#EmergencyOptom',
    headline: 'CRAO Central Retinal Artery Occlusion: The 4.5-Hour Window',
    takeaways: [
      'CRAO is the ophthalmological equivalent of an acute ischemic stroke (cerebral infarction).',
      'Cherry-red spot at the macula + profound painless unilateral vision loss (counting fingers or LP).',
      'Immediate chairside maneuvers: digital ocular massage (15s on, 5s off for 15 mins), rebreathing in paper bag (hypercapnia vasodilation), and IOP-lowering agents.',
      'CRITICAL: Send patient directly to an emergency stroke center for brain MRI and carotid Doppler workup. 25% of CRAO patients experience an overt cerebral stroke within 7 days.',
    ],
    chairsideRule:
      '💡 Chairside Protocol: CRAO is a medical emergency. Call your regional primary stroke center, initiate immediate transport, and order carotid Doppler + echocardiogram.',
    clinicalCitation: 'Stroke (AHA/ASA Scientific Statement) 2021;52(6):e282-e294',
    doctor: {
      name: 'Dr. James Thornton',
      credentials: 'OD, FAAO',
      role: 'Vitreoretinal Optometric Consultant',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80',
    },
    likesCount: 710,
    vaultSavesCount: 540,
    readTimeSeconds: 32,
  },
];

// Backwards-compatible constant export
export const OPTOM_SHORTS_DATA = CLINICAL_PEARLS_DATA;

export const OptomShorts: React.FC<ClinicalPearlsProps> = ({
  currentUser,
  onOpenNewPost,
  onViewDoctorProfile,
}) => {
  const [streamMode, setStreamMode] = useState<'stream' | 'focus'>('stream');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [likedMap, setLikedMap] = useState<{ [id: string]: boolean }>({});
  const [vaultMap, setVaultMap] = useState<{ [id: string]: boolean }>({});

  const specialties = [
    'All',
    'Scleral Lenses',
    'Pediatric Myopia',
    'Corneal Topography',
    'Glaucoma & Neuro',
    'Anterior Segment',
    'Retinal Diagnostics',
    'Ocular Surface',
  ];

  const filteredPearls = CLINICAL_PEARLS_DATA.filter((s) => {
    if (selectedSpecialty === 'All') return true;
    return s.specialty === selectedSpecialty;
  });

  const activePearl = filteredPearls[currentIndex] || filteredPearls[0] || CLINICAL_PEARLS_DATA[0];

  // Keyboard navigation for fast chairside flipping in Focus mode
  useEffect(() => {
    if (streamMode !== 'focus') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'j') {
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'k') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, filteredPearls.length, streamMode]);

  const handleNext = () => {
    if (currentIndex < filteredPearls.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // loop back
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(filteredPearls.length - 1);
    }
  };

  const toggleLike = (id: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleVault = (id: string) => {
    setVaultMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER & PEARL STREAM SWITCHER                              */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-3xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 dark:from-amber-950/20 dark:via-rose-950/20 dark:to-indigo-950/20 border border-amber-200/60 dark:border-neutral-800 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20 shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black tracking-tight text-neutral-900 dark:text-white">
                  Focus Clinical Pearls
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold uppercase tracking-wider">
                  Text Gems
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Peer-verified chairside rules, diagnostic traps, and board-level pearls for daily optometric rounds
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* View Mode Toggle: Continuous Stream vs Card Flip */}
            <div className="flex items-center gap-1 bg-white dark:bg-[#18181c] p-1 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <button
                onClick={() => setStreamMode('stream')}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  streamMode === 'stream'
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
                title="Continuous Pearl Stream"
              >
                <List className="h-3.5 w-3.5" />
                <span className="text-[11px]">Stream</span>
              </button>
              <button
                onClick={() => setStreamMode('focus')}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  streamMode === 'focus'
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
                title="Card by Card Focus Mode"
              >
                <Layers className="h-3.5 w-3.5" />
                <span className="text-[11px]">Card Mode</span>
              </button>
            </div>

            <button
              onClick={onOpenNewPost}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:scale-103 active:scale-97 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Add Pearl</span>
            </button>
          </div>
        </div>

        {/* Specialty Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 scrollbar-none snap-x">
          {specialties.map((spec) => {
            const isActive = selectedSpecialty === spec;
            return (
              <button
                key={spec}
                onClick={() => {
                  setSelectedSpecialty(spec);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 snap-start cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                    : 'bg-white dark:bg-[#18181b] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                }`}
              >
                {spec}
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. CONTINUOUS STREAM (VERIFIED CLINICAL PEARLS)                */}
      {/* ------------------------------------------------------------- */}
      {streamMode === 'stream' ? (
        <div className="w-full max-w-3xl space-y-4 sm:space-y-5 pb-16">
          <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
            <span className="font-semibold flex items-center gap-1 text-blue-600 dark:text-blue-400">
              <Zap className="h-3.5 w-3.5" />
              <span>Continuous Pearl Stream • {filteredPearls.length} Clinical Pearls</span>
            </span>
            <span>Peer-verified rounds stream</span>
          </div>

          {filteredPearls.map((pearl, index) => {
            const isLiked = !!likedMap[pearl.id];
            const isSaved = !!vaultMap[pearl.id];

            return (
              <motion.article
                key={pearl.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: Math.min(index * 0.04, 0.3) }}
                className="rounded-3xl bg-white dark:bg-[#161619] border border-neutral-200/90 dark:border-neutral-800 shadow-xs hover:shadow-md transition-all p-5 sm:p-7 space-y-4 relative overflow-hidden"
              >
                {/* Top Accent Strip */}
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${pearl.specialtyColor}`} />

                {/* Top Metadata Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-0.5 rounded-full text-white text-[10px] font-black uppercase tracking-wider bg-gradient-to-r ${pearl.specialtyColor} shadow-2xs`}
                    >
                      {pearl.specialty}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-semibold">
                      ⏱️ {pearl.readTimeSeconds}s read
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-neutral-400">
                    #{index + 1}
                  </span>
                </div>

                {/* Doctor Attribution */}
                <div className="flex items-center gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
                  <img
                    src={pearl.doctor.avatar}
                    alt={pearl.doctor.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/20"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white truncate">
                        {pearl.doctor.name}
                      </h4>
                      <span className="px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold">
                        {pearl.doctor.credentials}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block truncate">
                      {pearl.doctor.role}
                    </span>
                  </div>
                </div>

                {/* Big Headline */}
                <h3 className="text-base sm:text-lg md:text-xl font-black text-neutral-900 dark:text-white leading-snug tracking-tight">
                  {pearl.headline}
                </h3>

                {/* Key Takeaways */}
                <div className="space-y-2.5">
                  {pearl.takeaways.map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-extrabold text-[11px] flex items-center justify-center shrink-0 mt-0.5 border border-blue-200/50 dark:border-blue-900/50">
                        {i + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chairside Rule Box */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-200 leading-relaxed">
                  {pearl.chairsideRule}
                </div>

                {/* Citation & Action Dock */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                  {pearl.clinicalCitation ? (
                    <span className="text-[11px] text-neutral-400 italic truncate max-w-sm">
                      Ref: {pearl.clinicalCitation}
                    </span>
                  ) : (
                    <span className="text-[11px] text-neutral-400">FocusLinks Peer Review</span>
                  )}

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {/* Like button */}
                    <button
                      onClick={() => toggleLike(pearl.id)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isLiked
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400'
                          : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <Heart className={`h-3.5 w-3.5 ${isLiked ? 'fill-current text-rose-500' : ''}`} />
                      <span>{pearl.likesCount + (isLiked ? 1 : 0)}</span>
                    </button>

                    {/* Save to vault */}
                    <button
                      onClick={() => toggleVault(pearl.id)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isSaved
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400'
                          : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                      }`}
                      title="Save to Clinical Vault"
                    >
                      <Bookmark className={`h-3.5 w-3.5 ${isSaved ? 'fill-current text-amber-500' : ''}`} />
                      <span>{isSaved ? 'In Vault' : 'Save'}</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}

          {/* Endless Scroll Indicator */}
          <div className="p-6 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800 text-center space-y-2 bg-neutral-50/50 dark:bg-neutral-900/30">
            <div className="flex items-center justify-center gap-2 text-neutral-500 text-xs font-bold">
              <Sparkles className="h-4 w-4 text-amber-500 animate-spin" />
              <span>All {filteredPearls.length} clinical pearls loaded!</span>
            </div>
            <p className="text-xs text-neutral-400">
              New diagnostic gems verified by the FocusLinks Optometry Editorial Board weekly.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-2 px-4 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 transition-colors cursor-pointer"
            >
              Back to Top
            </button>
          </div>
        </div>
      ) : (
        /* ------------------------------------------------------------- */
        /* 3. CARD-BY-CARD (FOCUS FLIP MODE)                             */
        /* ------------------------------------------------------------- */
        <div className="w-full max-w-2xl relative flex flex-col md:flex-row gap-4 items-center justify-center">
          {/* Main Card View */}
          <div className="w-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePearl.id}
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -25, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full rounded-3xl bg-white dark:bg-[#151518] border-2 border-neutral-200/90 dark:border-neutral-800 shadow-xl overflow-hidden p-5 sm:p-7 md:p-8 flex flex-col justify-between min-h-[460px] sm:min-h-[500px]"
              >
                {/* Card Top Pill: Specialty & Read Time */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-[11px] font-black uppercase tracking-wider bg-gradient-to-r ${activePearl.specialtyColor} shadow-xs`}
                    >
                      {activePearl.specialty}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-semibold flex items-center gap-1">
                      <span>⏱️</span>
                      <span>~{activePearl.readTimeSeconds}s read</span>
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-neutral-400">
                    {currentIndex + 1} / {filteredPearls.length}
                  </span>
                </div>

                {/* Author Attribution */}
                <div className="flex items-center gap-3 pb-3 mb-4 border-b border-neutral-100 dark:border-neutral-800">
                  <img
                    src={activePearl.doctor.avatar}
                    alt={activePearl.doctor.name}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-blue-500/20"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-neutral-900 dark:text-white truncate">
                        {activePearl.doctor.name}
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold">
                        {activePearl.doctor.credentials}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block truncate">
                      {activePearl.doctor.role}
                    </span>
                  </div>
                </div>

                {/* Big High-Impact Headline */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-neutral-900 dark:text-white leading-snug tracking-tight mb-4">
                  {activePearl.headline}
                </h3>

                {/* High-Yield Text Bullet Points */}
                <div className="space-y-2.5 my-auto">
                  {activePearl.takeaways.map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-extrabold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Highlighted Chairside Rule Box */}
                <div className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-200 leading-relaxed">
                  {activePearl.chairsideRule}
                </div>

                {/* Citation Footer */}
                {activePearl.clinicalCitation && (
                  <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="italic truncate">Ref: {activePearl.clinicalCitation}</span>
                    <span className="font-bold text-neutral-500">Peer-Reviewed Consensus</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* SIDE INTERACTION DOCK                                         */}
          {/* ------------------------------------------------------------- */}
          <div className="flex md:flex-col items-center justify-center gap-3 shrink-0 py-2">
            {/* Previous Pearl Arrow */}
            <button
              onClick={handlePrev}
              aria-label="Previous clinical pearl"
              className="p-3 rounded-2xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 hover:border-blue-500 shadow-md transition-all cursor-pointer active:scale-90"
              title="Previous Pearl (Arrow Up / Left)"
            >
              <ChevronUp className="h-5 w-5" />
            </button>

            {/* Like / Helpful */}
            <button
              onClick={() => toggleLike(activePearl.id)}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-800 shadow-md transition-all cursor-pointer group active:scale-90"
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  likedMap[activePearl.id]
                    ? 'fill-rose-500 text-rose-500 scale-110'
                    : 'text-neutral-400 group-hover:text-rose-500'
                }`}
              />
              <span className="text-[10px] font-bold mt-1 text-neutral-500 dark:text-neutral-400">
                {activePearl.likesCount + (likedMap[activePearl.id] ? 1 : 0)}
              </span>
            </button>

            {/* Save to Clinical Vault */}
            <button
              onClick={() => toggleVault(activePearl.id)}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-800 shadow-md transition-all cursor-pointer group active:scale-90"
            >
              <Bookmark
                className={`h-5 w-5 transition-colors ${
                  vaultMap[activePearl.id]
                    ? 'fill-amber-500 text-amber-500 scale-110'
                    : 'text-neutral-400 group-hover:text-amber-500'
                }`}
              />
              <span className="text-[10px] font-bold mt-1 text-neutral-500 dark:text-neutral-400">
                {activePearl.vaultSavesCount + (vaultMap[activePearl.id] ? 1 : 0)}
              </span>
            </button>

            {/* Next Pearl Arrow */}
            <button
              onClick={handleNext}
              aria-label="Next clinical pearl"
              className="p-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all cursor-pointer active:scale-90"
              title="Next Pearl (Arrow Down / Right / Space)"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

