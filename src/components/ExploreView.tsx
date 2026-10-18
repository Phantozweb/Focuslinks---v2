import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Flame,
  Award,
  TrendingUp,
  Sparkles,
  Eye,
  Bookmark,
  Heart,
  MessageCircle,
  Share2,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  HelpCircle,
  CheckCircle2,
  ShieldCheck,
  Stethoscope,
  Maximize2,
  Filter,
  Layers,
  ArrowUpRight,
  Compass,
  AlertTriangle,
  LayoutGrid,
  List,
  Check,
  Clock,
  X
} from 'lucide-react';
import { ClinicalPost, DoctorProfile } from '../types';

interface ExploreViewProps {
  posts: ClinicalPost[];
  currentUser: DoctorProfile;
  onViewDoctorProfile: (doctorId: string) => void;
  onOpenNewPost: () => void;
  onBookmarkPost?: (postId: string) => void;
}

export interface ExplorePost {
  id: string;
  rank?: number;
  badge?: string;
  badgeColor?: string;
  title: string;
  modality: string;
  specialty: string;
  specialtyColor: string;
  doctor: {
    id?: string;
    name: string;
    credentials: string;
    role?: string;
    avatar: string;
  };
  image?: string;
  aspectRatio?: 'tall' | 'square' | 'wide';
  concordanceScore?: number;
  peerCitations?: number;
  likes: number;
  commentsCount: number;
  diagnosis?: string;
  differential?: string[];
  findings?: string;
  chairsideTakeaway?: string;
  citation?: string;
  tags: string[];
  difficulty?: 'Board Level' | 'Fellowship' | 'Clinical Case' | 'Grand Rounds';
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  posts,
  currentUser,
  onViewDoctorProfile,
  onOpenNewPost,
  onBookmarkPost,
}) => {
  const [viewDensity, setViewDensity] = useState<'grid' | 'feed'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('trending');
  const [isCriteriaExpanded, setIsCriteriaExpanded] = useState(false);
  
  // Modals & Interactivity
  const [selectedPostModal, setSelectedPostModal] = useState<ExplorePost | null>(null);
  const [postLikesMap, setPostLikesMap] = useState<{ [id: string]: boolean }>({});
  
  // Spot Dx Challenge State
  const [revealedMystery, setRevealedMystery] = useState(false);
  const [mysteryUserVote, setMysteryUserVote] = useState<string | null>(null);
  
  // Clinical Vault Saved IDs
  const [savedVaultIds, setSavedVaultIds] = useState<{ [id: string]: boolean }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trending clinical search topics
  const trendingSearches = [
    '#PentacamElevation',
    '#ScleralMDF',
    '#Atropine0.05%Study',
    '#NarrowAngleOCT',
    '#OptosRetinalLattice',
    '#SalzmannDegeneration',
    '#PellucidMarginal',
    '#DemodexXdemvy',
  ];

  // Algorithmic Curation Categories
  const categoryTabs = [
    { id: 'trending', label: 'All Cases & Posts', icon: Sparkles },
    { id: 'cornea', label: 'Corneal Topography & Scleral', icon: Layers },
    { id: 'oct', label: 'AS-OCT & Retinal Scans', icon: TrendingUp },
    { id: 'glaucoma', label: 'Glaucoma & Neuro', icon: ShieldCheck },
    { id: 'myopia', label: 'Pediatric Myopia', icon: Flame },
    { id: 'rare', label: 'Rare Pathologies', icon: AlertTriangle },
  ];

  // Unified Database of Clinical Posts (Imaging Cases + High-Yield Diagnostic Posts)
  const unifiedExplorePosts: ExplorePost[] = useMemo(() => [
    {
      id: 'post-rank-1',
      rank: 1,
      badge: '#1 Top Ranked Case',
      badgeColor: 'from-amber-500 to-rose-500',
      title: 'Oculus Pentacam Belin/Ambrosio BAD-D Progression in 14yo',
      modality: 'Pentacam HR Quad-Map',
      specialty: 'Cornea & Ectasia',
      specialtyColor: 'from-blue-600 to-indigo-600',
      doctor: {
        id: 'doc-lin',
        name: 'Dr. Sarah Lin',
        credentials: 'OD, FAAO',
        role: 'Cornea Fellow',
        avatar: 'https://images.unsplash.com/photo-1594824813583-0663678007a0?w=400&auto=format&fit=crop&q=80',
      },
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&auto=format&fit=crop&q=80',
      aspectRatio: 'wide',
      concordanceScore: 98,
      peerCitations: 184,
      likes: 312,
      commentsCount: 67,
      diagnosis: 'Early Ectasia with Posterior Elevation Shift',
      differential: ['Forme Fruste Keratoconus', 'Pellucid Marginal Degeneration', 'Warpage from SCL'],
      findings: 'Back elevation displays +18µm shift from best-fit sphere at the 4.5mm optical zone with ART-max ratio 2.85.',
      chairsideTakeaway: 'Always cross-reference pachymetric progression index (PPI) with posterior elevation before refitting into standard soft toric lenses.',
      tags: ['#CornealTopography', '#Keratoconus', '#PentacamHR'],
      difficulty: 'Fellowship',
    },
    {
      id: 'post-rank-2',
      rank: 2,
      badge: '#2 Most Cited Scan',
      badgeColor: 'from-blue-600 to-indigo-600',
      title: 'Optovue Solix AS-OCT Scleral Landing Zone Toricity Alignment',
      modality: 'Optovue Solix AS-OCT',
      specialty: 'Specialty Lenses',
      specialtyColor: 'from-indigo-600 to-purple-600',
      doctor: {
        id: 'doc-vance',
        name: 'Dr. Marcus Vance',
        credentials: 'OD, FSLS, FAAO',
        role: 'Specialty Contact Lens Lead',
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
      },
      image: 'https://images.unsplash.com/photo-1583912267670-6575ad472688?w=1000&auto=format&fit=crop&q=80',
      aspectRatio: 'tall',
      concordanceScore: 96,
      peerCitations: 142,
      likes: 245,
      commentsCount: 42,
      diagnosis: 'Quadrant-Specific Scleral Asymmetry Correction',
      differential: ['Circumferential Edge Lift', 'Scleral Impingement', 'Sectoral Toric Mismatch'],
      findings: 'Uniform 240µm apical fluid chamber clearance at 4 hours settling with complete blanching prevention at 16.5mm.',
      chairsideTakeaway: 'Quadrant-specific haptics prevent conjunctival prolapse and midday fogging in over 85% of asymmetric scleras.',
      tags: ['#ScleralLenses', '#ASOCT', '#CorneaSpecialty'],
      difficulty: 'Fellowship',
    },
    {
      id: 'post-rank-3',
      rank: 3,
      badge: '#3 Clinical Insight',
      badgeColor: 'from-amber-600 to-orange-600',
      title: 'Scleral Lens Mid-Day Fogging (MDF): 3 Key Chairside Checks',
      modality: 'Clinical Protocol',
      specialty: 'Specialty Lenses',
      specialtyColor: 'from-sky-500 to-blue-600',
      doctor: {
        id: 'doc-elena-vance',
        name: 'Dr. Elena Vance',
        credentials: 'OD, FAAO, FSLS',
        role: 'Clinical Director of Cornea',
        avatar: 'https://images.unsplash.com/photo-1594824813501-4838e82ef573?w=400&auto=format&fit=crop&q=80',
      },
      aspectRatio: 'square',
      concordanceScore: 99,
      peerCitations: 176,
      likes: 428,
      commentsCount: 89,
      diagnosis: 'Midday Fogging Secondary to Micro-Debris Seepage',
      differential: ['Apical Over-Vaulting', 'Loose Edge Haptic Mismatch', 'Unmanaged Meibomian Gland Dysfunction'],
      findings: 'Non-preserved saline in fluid reservoir shows lipid emulsion particles under slit-lamp cobalt blue filter within 3 hours.',
      chairsideTakeaway: 'Always check landing-zone toricity first before changing reservoir solution. Excessive vault (>350µm) draws lipid debris into the chamber.',
      citation: 'Carrasquillo KG, et al. Eye Contact Lens. 2017;43(5):310-318.',
      tags: ['#ScleralLenses', '#MidDayFogging', '#ChairsideDx'],
      difficulty: 'Clinical Case',
    },
    {
      id: 'post-rank-4',
      rank: 4,
      badge: '#4 High Peer Engagement',
      badgeColor: 'from-purple-600 to-pink-600',
      title: 'Haag-Streit Slit-Lamp Biomicroscopy of Salzmann’s Nodules',
      modality: 'Slit-Lamp Biomicroscopy 25x',
      specialty: 'Anterior Segment',
      specialtyColor: 'from-emerald-600 to-teal-600',
      doctor: {
        id: 'doc-rostova',
        name: 'Dr. Elena Rostova',
        credentials: 'OD, MSc',
        role: 'Anterior Segment Specialist',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
      },
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1000&auto=format&fit=crop&q=80',
      aspectRatio: 'square',
      concordanceScore: 94,
      peerCitations: 98,
      likes: 198,
      commentsCount: 31,
      diagnosis: 'Salzmann Nodular Degeneration Secondary to Ocular Rosacea',
      differential: ['Band Keratopathy', 'Map-Dot-Fingerprint Dystrophy', 'Corneal Keloid'],
      findings: 'Multiple elevated bluish-gray elevated subepithelial masses anterior to Bowman membrane with peripheral neovascular pannus.',
      chairsideTakeaway: 'Aggressive meibomian hygiene and topical lifitegrast/cyclosporine can shrink early peripheral nodules and prevent surgical PTK.',
      tags: ['#AnteriorSegment', '#SlitLamp', '#CorneaDx'],
      difficulty: 'Board Level',
    },
    {
      id: 'post-rank-5',
      rank: 5,
      badge: 'Glaucoma Focus',
      badgeColor: 'from-emerald-600 to-teal-600',
      title: 'Heidelberg Spectralis RNFL Asymmetry in Pre-Perimetric Glaucoma',
      modality: 'Spectralis OCT-A & RNFL',
      specialty: 'Glaucoma & Neuro',
      specialtyColor: 'from-emerald-600 to-green-600',
      doctor: {
        id: 'doc-kim',
        name: 'Dr. David Kim',
        credentials: 'OD, Glaucoma Diplomate',
        role: 'Glaucoma Clinical Attending',
        avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80',
      },
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1000&auto=format&fit=crop&q=80',
      aspectRatio: 'tall',
      concordanceScore: 92,
      peerCitations: 110,
      likes: 184,
      commentsCount: 39,
      diagnosis: 'Inferotemporal RNFL Wedge Defect with Ganglion Cell Dropout',
      differential: ['Physiological Cup Asymmetry', 'Non-Arteritic AION', 'Optic Disc Drusen'],
      findings: 'Focal 35µm thinning at inferotemporal clock hour 7 with corresponding macular ganglion cell-IPL asymmetry map loss.',
      chairsideTakeaway: 'Always correlate Macular Ganglion Cell Complex (GCC) thinning with circumpapillary RNFL; GCC drops up to 3 years before visual field changes on 24-2.',
      tags: ['#GlaucomaDx', '#SpectralisOCT', '#RNFL'],
      difficulty: 'Board Level',
    },
    {
      id: 'post-rank-6',
      badge: 'Narrow Angle Protocol',
      badgeColor: 'from-teal-600 to-cyan-600',
      title: 'Narrow Angle Glaucoma: Dynamic Gonioscopy vs AS-OCT Rule',
      modality: 'Anterior Chamber Analysis',
      specialty: 'Glaucoma & Neuro',
      specialtyColor: 'from-teal-600 to-emerald-600',
      doctor: {
        id: 'doc-kim',
        name: 'Dr. David Kim',
        credentials: 'OD, Glaucoma Diplomate',
        role: 'Glaucoma Clinical Attending',
        avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80',
      },
      aspectRatio: 'wide',
      concordanceScore: 97,
      peerCitations: 138,
      likes: 356,
      commentsCount: 72,
      diagnosis: 'Appositional vs Synechial Angle Closure',
      differential: ['Pupillary Block', 'Plateau Iris Syndrome', 'Lens Vault Induced Closure'],
      findings: 'Dynamic compression gonioscopy opens trabecular meshwork in quadrant 3, differentiating reversible apposition from permanent PAS.',
      chairsideTakeaway: 'Dark-room provocation test combined with AS-OCT angle opening distance (AOD500 < 200µm) provides 92% sensitivity for occludable angles.',
      citation: 'Foster PJ, et al. Br J Ophthalmol. 2002;86(2):238-242.',
      tags: ['#Glaucoma', '#Gonioscopy', '#ASOCT'],
      difficulty: 'Board Level',
    },
    {
      id: 'post-rank-7',
      badge: 'Pediatric Protocol',
      badgeColor: 'from-amber-600 to-orange-600',
      title: 'Pediatric Axial Elongation Deceleration with 0.05% Atropine + DIMS',
      modality: 'IOLMaster 700 Biometry',
      specialty: 'Pediatric Myopia',
      specialtyColor: 'from-amber-500 to-rose-500',
      doctor: {
        id: 'doc-vance',
        name: 'Dr. Marcus Vance',
        credentials: 'OD, FSLS, FAAO',
        role: 'Specialty Contact Lens Lead',
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
      },
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&auto=format&fit=crop&q=80',
      aspectRatio: 'square',
      concordanceScore: 97,
      peerCitations: 135,
      likes: 289,
      commentsCount: 54,
      diagnosis: 'Combination Therapy in Fast Axial Progressor',
      differential: ['Single Modality DIMS Failure', 'Compliance Non-Adherence', 'Spurious Biometric Spike'],
      findings: 'Axial length progression decreased from 0.42mm/yr down to 0.08mm/yr following 6-month combined protocol.',
      chairsideTakeaway: 'Biometry (axial length) is non-negotiable in modern myopia management; refractive change alone can conceal up to 0.2mm of elongation masked by accommodation.',
      tags: ['#MyopiaManagement', '#PediatricOptometry', '#Biometry'],
      difficulty: 'Clinical Case',
    },
    {
      id: 'post-rank-8',
      badge: 'Demodex Blepharitis Protocol',
      badgeColor: 'from-rose-600 to-red-600',
      title: 'Demodex Blepharitis: High-Power Slit Lamp Collarette Protocol',
      modality: 'Slit Lamp 40x Bio',
      specialty: 'Anterior Segment',
      specialtyColor: 'from-rose-500 to-pink-600',
      doctor: {
        id: 'doc-elena-vance',
        name: 'Dr. Elena Vance',
        credentials: 'OD, FAAO, FSLS',
        role: 'Clinical Director of Cornea',
        avatar: 'https://images.unsplash.com/photo-1594824813501-4838e82ef573?w=400&auto=format&fit=crop&q=80',
      },
      aspectRatio: 'wide',
      concordanceScore: 96,
      peerCitations: 148,
      likes: 312,
      commentsCount: 47,
      diagnosis: 'Demodex Folliculorum Infestation',
      differential: ['Staphylococcal Blepharitis', 'Seborrheic Blepharitis', 'Anterior Blepharitis Non-Specific'],
      findings: 'Cylindrical dandruff collarettes wrapping base of eyelashes in downward gaze at 25x-40x magnification.',
      chairsideTakeaway: 'Ask patient to look down. Collarettes are 100% pathognomonic for Demodex. Prescribe lotilaner 0.03% (Xdemvy) bid for 6 weeks.',
      citation: 'Trattler W, et al. Cornea. 2022;41(10):1245-1251.',
      tags: ['#Demodex', '#DryEye', '#AnteriorSegment'],
      difficulty: 'Clinical Case',
    },
    {
      id: 'post-rank-9',
      badge: 'Retina Emergency',
      badgeColor: 'from-indigo-600 to-purple-600',
      title: 'Peripheral Retinal Lattice: Flashes vs Floaters Scleral Depression Rule',
      modality: 'Optos UWF & BIO 20D',
      specialty: 'Retina & Posterior',
      specialtyColor: 'from-indigo-600 to-violet-600',
      doctor: {
        id: 'doc-lin',
        name: 'Dr. Sarah Lin',
        credentials: 'OD, FAAO',
        role: 'Cornea Fellow',
        avatar: 'https://images.unsplash.com/photo-1594824813583-0663678007a0?w=400&auto=format&fit=crop&q=80',
      },
      aspectRatio: 'square',
      concordanceScore: 98,
      peerCitations: 165,
      likes: 388,
      commentsCount: 52,
      diagnosis: 'Horseshoe Tear at Posterior Margin of Lattice',
      differential: ['Operculated Hole', 'Atrophic Hole without Fluid', 'Lattice without Vitreoretinal Traction'],
      findings: 'Pigmented lattice at 1:30 position with flap tear and localized subretinal fluid under BIO with scleral indentation.',
      chairsideTakeaway: 'Flashes (photopsia) with new floaters mandate 360° scleral depression. Ultra-widefield photos miss up to 12% of extreme anterior tears without dynamic indentation.',
      citation: 'Byer NE. Ophthalmology. 2001;108(9):1649-1655.',
      tags: ['#Retina', '#Optos', '#BIO'],
      difficulty: 'Fellowship',
    }
  ], []);

  // Filter unified explore posts
  const filteredExplorePosts = useMemo(() => {
    return unifiedExplorePosts.filter((post) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(q);
        const matchDx = post.diagnosis?.toLowerCase().includes(q) || false;
        const matchTag = post.tags.some((t) => t.toLowerCase().includes(q));
        const matchDoc = post.doctor.name.toLowerCase().includes(q);
        const matchFindings = post.findings?.toLowerCase().includes(q) || false;
        const matchTakeaway = post.chairsideTakeaway?.toLowerCase().includes(q) || false;
        if (!matchTitle && !matchDx && !matchTag && !matchDoc && !matchFindings && !matchTakeaway) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory === 'cornea') {
        return post.tags.some((t) => t.includes('Cornea') || t.includes('Topography') || t.includes('Scleral')) ||
               post.specialty.includes('Cornea') || post.specialty.includes('Specialty Lenses');
      }
      if (selectedCategory === 'oct') {
        return post.modality.includes('OCT') || post.tags.some((t) => t.includes('OCT')) || post.specialty.includes('Retina');
      }
      if (selectedCategory === 'glaucoma') {
        return post.specialty.includes('Glaucoma') || post.tags.some((t) => t.includes('Glaucoma'));
      }
      if (selectedCategory === 'myopia') {
        return post.specialty.includes('Myopia') || post.tags.some((t) => t.includes('Myopia'));
      }
      if (selectedCategory === 'rare') {
        return post.difficulty === 'Fellowship' || post.tags.some((t) => t.includes('Emergency') || t.includes('Retina'));
      }

      return true; // 'trending'
    });
  }, [unifiedExplorePosts, searchQuery, selectedCategory]);

  const toggleSaveVault = (id: string, label: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isSaved = !!savedVaultIds[id];
    setSavedVaultIds((prev) => ({ ...prev, [id]: !isSaved }));
    setToastMessage(!isSaved ? `"${label.slice(0, 32)}..." Saved to Vault` : 'Removed from Vault');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const togglePostLikes = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPostLikesMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full space-y-5">
      {/* ============================================================== */}
      {/* 1. SEARCH-FIRST EXPLORE HEADER (Focused & Clean)                */}
      {/* ============================================================== */}
      <section className="rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-[#161618] p-3 sm:p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Main Search Bar with Criteria Expansion Toggle */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsCriteriaExpanded(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clinical posts, AS-OCT, Pentacam, Keratoconus, #Scleral..."
              className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-[#1f1f23] pl-10 pr-24 py-2.5 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:border-blue-500 focus:bg-white dark:focus:bg-[#252529] focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-12 top-2.5 p-1 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}

            {/* Criteria Expand Button */}
            <button
              onClick={() => setIsCriteriaExpanded(!isCriteriaExpanded)}
              className={`absolute right-2 top-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                isCriteriaExpanded
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <Filter className="h-3 w-3" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* View Density Switcher (Grid vs Stream) */}
          <div className="flex items-center gap-1 self-end sm:self-auto shrink-0 bg-neutral-100 dark:bg-[#1f1f23] p-1 rounded-xl border border-neutral-200/80 dark:border-neutral-800">
            <button
              onClick={() => setViewDensity('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewDensity === 'grid'
                  ? 'bg-white dark:bg-[#2b2b30] text-neutral-900 dark:text-white shadow-2xs'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Grid View</span>
            </button>
            <button
              onClick={() => setViewDensity('feed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewDensity === 'feed'
                  ? 'bg-white dark:bg-[#2b2b30] text-neutral-900 dark:text-white shadow-2xs'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Stream View</span>
            </button>
          </div>
        </div>

        {/* TAP-TO-EXPAND CRITERIA DRAWER */}
        <AnimatePresence>
          {isCriteriaExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-3 overflow-hidden"
            >
              {/* Algorithmic Categories */}
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-1.5">
                  Explore Specialties & Categories:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {categoryTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isSelected = selectedCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedCategory(tab.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-neutral-100 dark:bg-[#202024] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                        }`}
                      >
                        <Icon className="h-3 w-3" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Trending Hashtags */}
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-1.5 flex items-center gap-1">
                  <Flame className="h-3 w-3 text-rose-500" />
                  Trending Clinical Search Criteria:
                </span>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x">
                  {trendingSearches.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-[#202024] text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-800 hover:border-blue-400 hover:text-blue-600 transition-colors shrink-0 snap-start cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tray Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500">
                <span>{filteredExplorePosts.length} clinical posts match current criteria</span>
                <button
                  onClick={() => setIsCriteriaExpanded(false)}
                  className="font-bold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <span>Close Drawer</span>
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compact active filter bar when collapsed and a filter or query is active */}
        {!isCriteriaExpanded && (selectedCategory !== 'trending' || searchQuery) && (
          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px]">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-neutral-400 font-semibold">Active:</span>
              {selectedCategory !== 'trending' && (
                <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200/60 dark:border-blue-900/50 flex items-center gap-1">
                  {categoryTabs.find((t) => t.id === selectedCategory)?.label}
                  <button
                    onClick={() => setSelectedCategory('trending')}
                    className="hover:text-blue-900 dark:hover:text-white cursor-pointer ml-1"
                  >
                    ×
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold flex items-center gap-1">
                  "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery('')}
                    className="hover:text-neutral-900 dark:hover:text-white cursor-pointer ml-1"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
            <button
              onClick={() => setIsCriteriaExpanded(true)}
              className="text-blue-600 dark:text-blue-400 font-bold shrink-0 hover:underline cursor-pointer ml-2"
            >
              Modify Filters
            </button>
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 2. RESPONSIVE EXPLORE GRID (2 COLUMNS IN MOBILE AS REQUESTED!)  */}
      {/* ============================================================== */}
      {viewDensity === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3.5 md:gap-4">
          {filteredExplorePosts.map((post) => {
            const isSaved = !!savedVaultIds[post.id];
            const isLiked = !!postLikesMap[post.id];

            return (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.18 }}
                onClick={() => setSelectedPostModal(post)}
                className="rounded-2xl sm:rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-[#18181b] overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between relative cursor-pointer"
              >
                {/* Visual Header: If has image, render image preview; if text-only, render specialty header bar */}
                {post.image ? (
                  <div className="relative overflow-hidden bg-neutral-950 aspect-4/3 sm:aspect-16/10">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    
                    {/* Top Modality & Vault Button */}
                    <div className="absolute top-2 inset-x-2 flex items-center justify-between gap-1">
                      <span className="text-[9px] font-black uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white truncate max-w-[80%]">
                        {post.modality}
                      </span>
                      <button
                        onClick={(e) => toggleSaveVault(post.id, post.title, e)}
                        className={`p-1.5 rounded-full transition-all cursor-pointer backdrop-blur-md ${
                          isSaved
                            ? 'bg-amber-500 text-white'
                            : 'bg-black/50 text-white hover:text-amber-400'
                        }`}
                        title="Save to Vault"
                      >
                        <Bookmark className={`h-3 w-3 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-2 inset-x-2 text-white">
                      <span className="text-[9px] font-bold text-blue-300 truncate block">
                        {post.specialty}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className={`h-1.5 w-full bg-gradient-to-r ${post.specialtyColor}`} />
                )}

                {/* Card Content Area */}
                <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between space-y-2">
                  {/* Category Pill for text posts */}
                  {!post.image && (
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 truncate">
                        {post.specialty}
                      </span>
                      <button
                        onClick={(e) => toggleSaveVault(post.id, post.title, e)}
                        className={`p-1 rounded-full transition-all cursor-pointer ${
                          isSaved
                            ? 'text-amber-500'
                            : 'text-neutral-400 hover:text-amber-500'
                        }`}
                        title="Save to Vault"
                      >
                        <Bookmark className={`h-3 w-3 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xs sm:text-[13px] font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Compact snippet */}
                  {post.chairsideTakeaway && (
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed hidden sm:block">
                      {post.chairsideTakeaway}
                    </p>
                  )}

                  {/* Author Row */}
                  <div className="flex items-center gap-1.5 pt-1 border-t border-neutral-100 dark:border-neutral-800/80">
                    <img
                      src={post.doctor.avatar}
                      alt={post.doctor.name}
                      className="h-5 w-5 sm:h-6 sm:w-6 rounded-full object-cover ring-1 ring-blue-500/20 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 dark:text-neutral-200 truncate block">
                        {post.doctor.name.replace('Dr. ', '')}
                      </span>
                      <span className="text-[9px] text-neutral-400 truncate block hidden sm:block">
                        {post.doctor.credentials}
                      </span>
                    </div>
                  </div>

                  {/* Footer Metrics */}
                  <div className="flex items-center justify-between pt-1 text-neutral-400 text-[10px]">
                    <button
                      onClick={(e) => togglePostLikes(post.id, e)}
                      className="flex items-center gap-1 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <Heart className={`h-3 w-3 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{post.likes + (isLiked ? 1 : 0)}</span>
                    </button>

                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{post.commentsCount}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Stream / Detailed Feed View */
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredExplorePosts.map((post) => {
            const isSaved = !!savedVaultIds[post.id];
            const isLiked = !!postLikesMap[post.id];

            return (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-[#18181b] overflow-hidden shadow-xs hover:shadow-md transition-all p-4 sm:p-6 space-y-3 cursor-pointer"
                onClick={() => setSelectedPostModal(post)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.doctor.avatar}
                      alt={post.doctor.name}
                      className="h-9 w-9 rounded-full object-cover ring-1 ring-blue-500/20"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {post.doctor.name}
                      </h4>
                      <p className="text-[10px] text-blue-600 dark:text-blue-400">
                        {post.doctor.credentials} • {post.specialty}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                    {post.modality}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white leading-snug">
                  {post.title}
                </h3>

                {post.image && (
                  <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-black">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                )}

                {post.findings && (
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 bg-neutral-50 dark:bg-[#1f1f23] p-3 rounded-xl">
                    <span className="font-bold">Findings:</span> {post.findings}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-400">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => togglePostLikes(post.id, e)}
                      className="flex items-center gap-1 hover:text-rose-500 cursor-pointer"
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{post.likes + (isLiked ? 1 : 0)}</span>
                    </button>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.commentsCount} comments</span>
                    </span>
                  </div>

                  <button
                    onClick={(e) => toggleSaveVault(post.id, post.title, e)}
                    className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-amber-500 cursor-pointer"
                  >
                    <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. INTERACTIVE SPOT THE DX CHALLENGE                           */}
      {/* ============================================================== */}
      <section className="rounded-3xl border border-neutral-200/90 dark:border-neutral-800 bg-gradient-to-br from-indigo-50/70 via-white to-sky-50/70 dark:from-[#15151c] dark:via-[#161619] dark:to-[#121217] p-4 sm:p-6 shadow-xs mt-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
            Dx
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
              Daily Diagnostic Challenge: Spot the Pathology
            </h3>
            <p className="text-[11px] text-neutral-500">
              Test your clinical acumen against community concordance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-4 relative aspect-4/3 rounded-2xl overflow-hidden bg-black">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80"
              alt="Challenge Case"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[9px] font-bold">
              Pentacam Topo Quad-Map
            </div>
          </div>

          <div className="md:col-span-8 space-y-3">
            <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 leading-relaxed">
              17yo male, uncorrected visual acuity drop OD 20/20 to 20/40 over 6 months with scissors reflex on retinoscopy. K-max 49.2D. Primary diagnosis?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'kc', label: 'Early Progressive Keratoconus', correct: true },
                { id: 'pmd', label: 'Pellucid Marginal Degeneration', correct: false },
                { id: 'warpage', label: 'Contact Lens Corneal Warpage', correct: false },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setMysteryUserVote(opt.id);
                    setRevealedMystery(true);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                    mysteryUserVote === opt.id
                      ? opt.correct
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                        : 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1a1a1e] hover:border-blue-400 text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt.label}</span>
                    {revealedMystery && opt.correct && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {revealedMystery && (
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium pt-1">
                ✓ 92% of Cornea & Scleral Circle clinicians concord with Progressive Keratoconus. Recommend baseline corneal cross-linking (CXL) consultation.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. UNIFIED POST INSPECTION MODAL                                */}
      {/* ============================================================== */}
      <AnimatePresence>
        {selectedPostModal && (
          <div
            onClick={() => setSelectedPostModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full rounded-3xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col relative"
            >
              {/* Header Bar */}
              <div className="p-4 sm:p-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedPostModal.doctor.avatar}
                    alt={selectedPostModal.doctor.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/20"
                  />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {selectedPostModal.doctor.name}
                    </h3>
                    <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                      {selectedPostModal.doctor.credentials} • {selectedPostModal.specialty}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleSaveVault(selectedPostModal.id, selectedPostModal.title, e)}
                    className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Bookmark className={`h-3.5 w-3.5 ${savedVaultIds[selectedPostModal.id] ? 'fill-current text-amber-500' : ''}`} />
                    <span>{savedVaultIds[selectedPostModal.id] ? 'Saved' : 'Save to Vault'}</span>
                  </button>
                  <button
                    onClick={() => setSelectedPostModal(null)}
                    className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 text-sm font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-7 overflow-y-auto space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {selectedPostModal.modality}
                  </span>
                  {selectedPostModal.difficulty && (
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                      {selectedPostModal.difficulty}
                    </span>
                  )}
                </div>

                <h2 className="text-base sm:text-xl font-black text-neutral-900 dark:text-white leading-snug">
                  {selectedPostModal.title}
                </h2>

                {selectedPostModal.image && (
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-black border border-neutral-200 dark:border-neutral-800">
                    <img
                      src={selectedPostModal.image}
                      alt={selectedPostModal.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {selectedPostModal.findings && (
                  <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#202024] border border-neutral-100 dark:border-neutral-800 text-xs sm:text-sm">
                    <span className="font-bold text-neutral-900 dark:text-white">Clinical Findings: </span>
                    <span className="text-neutral-700 dark:text-neutral-300">{selectedPostModal.findings}</span>
                  </div>
                )}

                {selectedPostModal.chairsideTakeaway && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-200 leading-relaxed">
                    <span className="font-bold">Chairside Takeaway: </span>
                    {selectedPostModal.chairsideTakeaway}
                  </div>
                )}

                {selectedPostModal.differential && selectedPostModal.differential.length > 0 && (
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">
                      Differential Diagnoses:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPostModal.differential.map((d, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 font-medium"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPostModal.citation && (
                  <p className="text-[11px] text-neutral-400 italic">
                    Reference Citation: {selectedPostModal.citation}
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/40">
                <button
                  onClick={(e) => togglePostLikes(selectedPostModal.id, e)}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    postLikesMap[selectedPostModal.id]
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${postLikesMap[selectedPostModal.id] ? 'fill-current' : ''}`} />
                  <span>{selectedPostModal.likes + (postLikesMap[selectedPostModal.id] ? 1 : 0)} Likes</span>
                </button>

                <button
                  onClick={() => setSelectedPostModal(null)}
                  className="px-5 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Vault Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold border border-white/10"
          >
            <Bookmark className="h-4 w-4 fill-current text-amber-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
