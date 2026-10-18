import { QuestionTopic, ClinicalQuestion, TopicCategory } from '../types';
import { CURRENT_USER, OTHER_DOCTORS } from './mockData';

/* ------------------------------------------------------------------
   Consult hub categories — the 6 browsable sections of the hub gallery
   ------------------------------------------------------------------ */
export const MOCK_TOPIC_CATEGORIES: TopicCategory[] = [
  {
    id: 'cat-medical',
    name: 'Medical & Ocular Disease',
    tagline: 'Retina, glaucoma, neuro, urgent care & ocular inflammation',
    iconName: 'Stethoscope',
    gradient: 'from-rose-500 to-orange-400',
    accentText: 'text-rose-600 dark:text-rose-400',
  },
  {
    id: 'cat-anterior',
    name: 'Anterior Segment & Lenses',
    tagline: 'Cornea, sclerals, dry eye & contact lens fitting',
    iconName: 'Shield',
    gradient: 'from-blue-500 to-cyan-400',
    accentText: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'cat-peds',
    name: 'Pediatrics & Binocular Vision',
    tagline: 'Myopia control, strabismus, amblyopia & vision therapy',
    iconName: 'Baby',
    gradient: 'from-violet-500 to-fuchsia-400',
    accentText: 'text-violet-600 dark:text-violet-400',
  },
  {
    id: 'cat-surgical',
    name: 'Surgical & Perioperative',
    tagline: 'Cataract & refractive co-management protocols',
    iconName: 'Layers',
    gradient: 'from-emerald-500 to-teal-400',
    accentText: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'cat-tech',
    name: 'Technology & Imaging',
    tagline: 'OCT, imaging roundtables, AI & digital diagnostics',
    iconName: 'Zap',
    gradient: 'from-amber-500 to-orange-400',
    accentText: 'text-amber-600 dark:text-amber-400',
  },
  {
    id: 'cat-practice',
    name: 'Practice & Career',
    tagline: 'Billing, optics, students & new grads, practice growth',
    iconName: 'Briefcase',
    gradient: 'from-indigo-500 to-blue-400',
    accentText: 'text-indigo-600 dark:text-indigo-400',
  },
];

export const MOCK_TOPICS: QuestionTopic[] = [
  {
    id: 'topic-retina',
    name: 'Retina & Macula',
    slug: 'retina',
    description: 'OCT biomarker interpretation, diabetic retinopathy, wet/dry AMD, pachychoroid, CSR, and vitreoretinal consults.',
    iconName: 'Eye',
    bannerColor: 'from-amber-500/20 to-orange-500/10 text-amber-500 border-amber-500/30',
    gradient: 'from-amber-500 via-orange-500 to-amber-600',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
    followersCount: 4820,
    questionsCount: 342,
    isFollowed: true,
    isPopular: true,
    isTrending: true,
    isStudentFriendly: true,
    trendingTags: ['#OCT-A', '#Pachychoroid', '#CSR', '#AntiVEGF', '#DiabeticMacular'],
    recentActivity: '14 new consults today • High peer engagement',
    categoryId: 'cat-medical',
    weeklyAsks: 14,
    acceptanceRate: 91,
    hubRules: [
      'De-identify every OCT screenshot before posting.',
      'State patient age, sex and IOP in the opening line.',
      'No product promotions — clinical discussion only.',
    ],
  },
  {
    id: 'topic-glaucoma',
    name: 'Glaucoma & Neuro',
    slug: 'glaucoma',
    description: 'Target IOP strategy, RNFL progression algorithms, 10-2 vs 24-2 perimetry, SLT protocols, and neuro-optic disc dilemmas.',
    iconName: 'Activity',
    bannerColor: 'from-emerald-500/20 to-teal-500/10 text-emerald-500 border-emerald-500/30',
    gradient: 'from-emerald-500 via-teal-500 to-emerald-600',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    followersCount: 5120,
    questionsCount: 418,
    isFollowed: true,
    isPopular: true,
    isStudentFriendly: true,
    trendingTags: ['#TargetIOP', '#SLT', '#RNFLThinning', '#10-2Fields', '#Hysteresis'],
    recentActivity: '21 consensus opinions reached this week',
    categoryId: 'cat-medical',
    weeklyAsks: 11,
    acceptanceRate: 94,
    hubRules: [
      'Include visual field printouts or GPA trends when available.',
      'Quote target IOP and central corneal thickness in every ask.',
      'Flag acute pressure spikes or acute Pupillary issues as STAT.',
    ],
  },
  {
    id: 'topic-cornea',
    name: 'Cornea & Sclerals',
    slug: 'cornea',
    description: 'Irregular astigmatism, keratoconus cross-linking thresholds, AS-OCT scleral landing alignment, and ectasia management.',
    iconName: 'Shield',
    bannerColor: 'from-blue-500/20 to-indigo-500/10 text-blue-500 border-blue-500/30',
    gradient: 'from-blue-500 via-indigo-500 to-sky-500',
    imageUrl: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=600&q=80',
    followersCount: 6340,
    questionsCount: 520,
    isFollowed: true,
    isPopular: true,
    isRecommended: true,
    isTrending: true,
    isStudentFriendly: true,
    trendingTags: ['#ScleralToric', '#Keratoconus', '#Ectasia', '#CXLTiming', '#AS-OCT'],
    recentActivity: 'Most active specialty hub • 98% consensus rate',
    categoryId: 'cat-anterior',
    weeklyAsks: 13,
    acceptanceRate: 96,
    hubRules: [
      'Post sagittal depth & limbal vault readings for scleral fits.',
      'List current lens material, Dk/t and wear schedule.',
      'Students welcome — attendings endorse the top clinical pearls.',
    ],
  },
  {
    id: 'topic-myopia',
    name: 'Pediatrics & Myopia',
    slug: 'myopia',
    description: 'Axial elongation arrest, 0.05% vs 0.025% atropine efficacy, Ortho-K adjustments, and binocular vision anomalies.',
    iconName: 'Baby',
    bannerColor: 'from-purple-500/20 to-pink-500/10 text-purple-500 border-purple-500/30',
    gradient: 'from-purple-500 via-pink-500 to-indigo-500',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
    followersCount: 3910,
    questionsCount: 284,
    isFollowed: true,
    isRecommended: true,
    isStudentFriendly: true,
    trendingTags: ['#LAMPStudy', '#LowDoseAtropine', '#Ortho-K', '#AxialLength', '#MyopiaControl'],
    recentActivity: '9 inquiries active • Strong pediatric interest',
    categoryId: 'cat-peds',
    weeklyAsks: 9,
    acceptanceRate: 89,
    hubRules: [
      'Always post the axial length trend, not just the refraction.',
      'Cite the study (LAMP, AOK, CITT) behind any protocol claim.',
      'Remove parent- and school-identifying details from photos.',
    ],
  },
  {
    id: 'topic-dry-eye',
    name: 'Dry Eye & Aesthetics',
    slug: 'dry-eye',
    description: 'Interventional IPL, RF, meibography analysis, autologous serum drops, neurotrophic keratitis, and Demodex blepharitis.',
    iconName: 'Droplets',
    bannerColor: 'from-sky-500/20 to-cyan-500/10 text-sky-500 border-sky-500/30',
    gradient: 'from-sky-500 via-cyan-500 to-blue-500',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    followersCount: 4210,
    questionsCount: 312,
    isFollowed: false,
    isPopular: true,
    isTrending: true,
    isStudentFriendly: true,
    trendingTags: ['#Lotilaner', '#Xdemvy', '#IPLProtocol', '#Meibography', '#Neurotrophic'],
    recentActivity: 'Hot protocol updates for Demodex & IPL',
    categoryId: 'cat-anterior',
    weeklyAsks: 10,
    acceptanceRate: 87,
    hubRules: [
      'Attach meibography grade and TBUT in seconds.',
      'List prior therapies tried before asking for escalation.',
      'Share IPL settings with device model and Fitzpatrick type.',
    ],
  },
  {
    id: 'topic-cataract',
    name: 'Cataract & Surgical',
    slug: 'cataract',
    description: 'Premium presbyopia IOL calculations, dysphotopsia resolution, post-op TASS vs endophthalmitis, and corneal edema.',
    iconName: 'Layers',
    bannerColor: 'from-rose-500/20 to-red-500/10 text-rose-500 border-rose-500/30',
    gradient: 'from-rose-500 via-red-500 to-pink-600',
    imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80',
    followersCount: 3450,
    questionsCount: 198,
    isFollowed: false,
    trendingTags: ['#ToricIOL', '#EDOF', '#Dysphotopsia', '#TASSvsEndo', '#CornealEdema'],
    recentActivity: 'Surgical co-management discussion active',
    categoryId: 'cat-surgical',
    weeklyAsks: 7,
    acceptanceRate: 92,
    hubRules: [
      'Post the biometry / IOL power strategy with the ask.',
      'Distinguish day-1 from week-1 post-op questions.',
      'Suspected TASS or endophthalmitis threads are STAT by default.',
    ],
  },
  {
    id: 'topic-pharma',
    name: 'Therapeutics & Systemic',
    slug: 'pharma',
    description: 'Off-label prescribing, GLP-1 receptor agonist ocular sequelae, Plaquenil screening protocols, and steroid response management.',
    iconName: 'Pill',
    bannerColor: 'from-violet-500/20 to-indigo-500/10 text-violet-500 border-violet-500/30',
    gradient: 'from-violet-500 via-purple-600 to-indigo-600',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80',
    followersCount: 2980,
    questionsCount: 176,
    isFollowed: false,
    isRecommended: true,
    isTrending: true,
    isStudentFriendly: true,
    trendingTags: ['#GLP1Retinopathy', '#Plaquenil', '#SteroidResponse', '#Netarsudil', '#OffLabel'],
    recentActivity: 'New clinical trials and dosing alerts',
    categoryId: 'cat-medical',
    weeklyAsks: 8,
    acceptanceRate: 90,
    hubRules: [
      'Cite the trial (SUSTAIN-6, VICI, etc.) behind every claim.',
      'List the full systemic medication table before interaction asks.',
      'Any dosing change needs attending-level confirmation.',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  EXPANDED HUB CATALOG — 12 additional micro-community topic hubs */
  /* ---------------------------------------------------------------- */
  {
    id: 'topic-uveitis',
    name: 'Uveitis & Inflammation',
    slug: 'uveitis',
    description: 'Anterior uveitis workups, HLA-B27 & JIA associations, sarcoid labs, steroid taper pacing, and masquerade syndromes.',
    iconName: 'Flame',
    bannerColor: 'from-rose-500/20 to-red-500/10 text-rose-500 border-rose-500/30',
    gradient: 'from-rose-500 via-red-500 to-orange-500',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    followersCount: 2180,
    questionsCount: 148,
    isFollowed: false,
    isTrending: true,
    isStudentFriendly: true,
    trendingTags: ['#HLAB27', '#Sarcoidosis', '#JIAUveitis', '#SteroidTaper', '#Masquerade'],
    recentActivity: '9 active inflammatory workups this week',
    categoryId: 'cat-medical',
    weeklyAsks: 9,
    acceptanceRate: 82,
    hubRules: [
      'Post anterior chamber cell & flare grade with the ask.',
      'List systemic history: IBD, sarcoid, serologies, HLA status.',
      'For tapers, state current drop strength and daily frequency.',
    ],
  },
  {
    id: 'topic-clfit',
    name: 'Contact Lens Fitting',
    slug: 'contact-lens-fitting',
    description: 'Soft toric stability, multifocal optics, Ortho-K night lenses, Dk/t calculations, and daily-disposable troubleshooting.',
    iconName: 'Target',
    bannerColor: 'from-cyan-500/20 to-sky-500/10 text-cyan-500 border-cyan-500/30',
    gradient: 'from-cyan-500 via-sky-500 to-blue-500',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    followersCount: 2860,
    questionsCount: 201,
    isFollowed: false,
    isTrending: true,
    isStudentFriendly: true,
    trendingTags: ['#Multifocal', '#ToricStability', '#OrthoK', '#DKt', '#DailyDisposables'],
    recentActivity: '11 fitting challenges posted this week',
    categoryId: 'cat-anterior',
    weeklyAsks: 11,
    acceptanceRate: 88,
    hubRules: [
      'Include base curve, diameter and over-refraction.',
      'Note photopic & scotopic pupil sizes for multifocal asks.',
      'Post lens rotation marks (laser) photos for toric issues.',
    ],
  },
  {
    id: 'topic-kconus',
    name: 'Keratoconus & Cross-Linking',
    slug: 'keratoconus',
    description: 'Pentacam Kmax & PPS staging, epi-on vs epi-off CXL protocols, Intacs segments, and progression criteria consensus.',
    iconName: 'Cone',
    bannerColor: 'from-indigo-500/20 to-violet-500/10 text-indigo-500 border-indigo-500/30',
    gradient: 'from-indigo-500 via-violet-500 to-purple-500',
    imageUrl: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=600&q=80',
    followersCount: 3320,
    questionsCount: 247,
    isFollowed: true,
    isPopular: true,
    isRecommended: true,
    isStudentFriendly: true,
    trendingTags: ['#Kmax', '#CXL', '#Pentacam', '#Intacs', '#Hydrops'],
    recentActivity: 'Progression-threshold consensus draft pinned',
    categoryId: 'cat-anterior',
    weeklyAsks: 8,
    acceptanceRate: 91,
    hubRules: [
      'Attach Pentacam 4-map (Kmax, PPS, thinnest pachymetry).',
      'Document progression rate before discussing CXL timing.',
      'Ask about eye-rubbing cessation counseling on every case.',
    ],
  },
  {
    id: 'topic-bvvt',
    name: 'Binocular Vision & VT',
    slug: 'binocular-vision',
    description: 'Convergence insufficiency therapy, fusional vergence reserves, accommodation anomalies, and vision therapy home programs.',
    iconName: 'Focus',
    bannerColor: 'from-violet-500/20 to-purple-500/10 text-violet-500 border-violet-500/30',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
    followersCount: 1840,
    questionsCount: 132,
    isFollowed: false,
    isRecommended: true,
    isStudentFriendly: true,
    trendingTags: ['#ConvergenceInsufficiency', '#NPC', '#VergenceVT', '#Accommodation', '#CITT'],
    recentActivity: 'CI home-protocol templates updated',
    categoryId: 'cat-peds',
    weeklyAsks: 6,
    acceptanceRate: 86,
    hubRules: [
      'Post NPC, PFV blur/break/recover and near phoria numbers.',
      'Reference CITT outcomes when comparing VT protocols.',
      'Include school impact notes for pediatric therapy plans.',
    ],
  },
  {
    id: 'topic-strab',
    name: 'Strabismus & Amblyopia',
    slug: 'strabismus-amblyopia',
    description: 'Patching vs atropine dosing, stereoacuity milestones, incomitancy workups, and co-managed surgical referrals.',
    iconName: 'Crosshair',
    bannerColor: 'from-fuchsia-500/20 to-pink-500/10 text-fuchsia-500 border-fuchsia-500/30',
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    followersCount: 1610,
    questionsCount: 118,
    isFollowed: false,
    isRecommended: true,
    isStudentFriendly: true,
    trendingTags: ['#Amblyopia', '#AtropineVsPatching', '#Stereoacuity', '#Parks3Step', '#PEDIG'],
    recentActivity: 'PEDIG adherence hot-topics under review',
    categoryId: 'cat-peds',
    weeklyAsks: 5,
    acceptanceRate: 89,
    hubRules: [
      'State current acuities (optotypes!) and fixation pattern.',
      'Document glasses-wear duration before escalation debates.',
      'Surgical referrals: include measured deviations at distance/near.',
    ],
  },
  {
    id: 'topic-refractive',
    name: 'Refractive Surgery Co-Mgmt',
    slug: 'refractive-co-mgmt',
    description: 'LASIK/PRK candidacy topography, SMILE referrals, post-op steroid protocols, and ectasia risk screening consensus.',
    iconName: 'Zap',
    bannerColor: 'from-teal-500/20 to-emerald-500/10 text-teal-500 border-teal-500/30',
    gradient: 'from-teal-500 via-emerald-500 to-green-500',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    followersCount: 2450,
    questionsCount: 176,
    isFollowed: false,
    isPopular: true,
    trendingTags: ['#LASIK', '#SMILE', '#PentacamEctasia', '#PostOpDrops', '#TransPRK'],
    recentActivity: 'Candidacy screening checklist v2 pinned',
    categoryId: 'cat-surgical',
    weeklyAsks: 7,
    acceptanceRate: 93,
    hubRules: [
      'Include CCT, refraction stability and topography maps.',
      'Compute tissue Removed % and residual stromal bed in asks.',
      'Post-op day timeline must accompany drop-protocol questions.',
    ],
  },
  {
    id: 'topic-oct',
    name: 'OCT & Imaging',
    slug: 'oct-imaging',
    description: 'B-scan artifact rejection, GCC vs RNFL analytics, OCT-A choriocapillaris slab reads, and widefield imaging protocols.',
    iconName: 'ScanEye',
    bannerColor: 'from-sky-500/20 to-blue-500/10 text-sky-500 border-sky-500/30',
    gradient: 'from-sky-500 via-blue-500 to-indigo-500',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
    followersCount: 3740,
    questionsCount: 289,
    isFollowed: true,
    isTrending: true,
    isStudentFriendly: true,
    trendingTags: ['#OCTA', '#GCC', '#ArtifactRejection', '#Choriocapillaris', '#Segmentation'],
    recentActivity: '12 image-review threads open right now',
    categoryId: 'cat-tech',
    weeklyAsks: 12,
    acceptanceRate: 84,
    hubRules: [
      'Post scan quality index with every B-scan question.',
      'Annotate segmentation errors before asking for reads.',
      'Pair structure (OCT) with function (VF) when available.',
    ],
  },
  {
    id: 'topic-ai',
    name: 'AI & Digital Health',
    slug: 'ai-digital-health',
    description: 'Autonomous DR screening, fundus AI graders, tele-optometry workflows, EHR automation, and device validation claims.',
    iconName: 'Bot',
    bannerColor: 'from-amber-500/20 to-orange-500/10 text-amber-500 border-amber-500/30',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80',
    followersCount: 1980,
    questionsCount: 94,
    isFollowed: false,
    isTrending: true,
    isStudentFriendly: true,
    trendingTags: ['#AutonomousDR', '#TeleOptometry', '#AIValidation', '#FundusGrading', '#EHR'],
    recentActivity: 'Fastest-growing hub • 14 new asks this week',
    categoryId: 'cat-tech',
    weeklyAsks: 14,
    acceptanceRate: 78,
    hubRules: [
      'Name the device & FDA clearance status in deployment asks.',
      'Never post identifiable patient data in telehealth threads.',
      'Vendor marketing posts are removed — share outcomes instead.',
    ],
  },
  {
    id: 'topic-retinaimaging',
    name: 'Retina Imaging Roundtable',
    slug: 'retina-imaging',
    description: 'Ultra-widefield grading, en-face OCT, fundus autofluorescence pattern reads, and weekly peer image-review case rounds.',
    iconName: 'Microscope',
    bannerColor: 'from-blue-500/20 to-indigo-500/10 text-blue-500 border-blue-500/30',
    gradient: 'from-blue-500 via-indigo-500 to-blue-600',
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80',
    followersCount: 1520,
    questionsCount: 106,
    isFollowed: false,
    isStudentFriendly: true,
    trendingTags: ['#UWF', '#EnFaceOCT', '#FAF', '#CaseRounds', '#Grading'],
    recentActivity: 'Friday image rounds • new case drop weekly',
    categoryId: 'cat-tech',
    weeklyAsks: 6,
    acceptanceRate: 81,
    hubRules: [
      'One image set per thread — crop away patient identifiers.',
      'State device (Optos, Eidon, Spectralis) and field of view.',
      'Weekly round threads: guess the diagnosis before scrolling.',
    ],
  },
  {
    id: 'topic-billing',
    name: 'Practice Management & Billing',
    slug: 'practice-billing',
    description: 'CPT & ICD-10 coding, medical-necessity documentation, 92004 vs -02 dilemmas, and payer appeal win strategies.',
    iconName: 'Receipt',
    bannerColor: 'from-blue-500/20 to-indigo-500/10 text-blue-500 border-blue-500/30',
    gradient: 'from-blue-500 via-indigo-500 to-violet-500',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
    followersCount: 2680,
    questionsCount: 214,
    isFollowed: false,
    isPopular: true,
    trendingTags: ['#CPT', '#ICD10', '#MedicalNecessity', '#PriorAuth', '#Appeals'],
    recentActivity: 'Medicare policy digest • weekly updates',
    categoryId: 'cat-practice',
    weeklyAsks: 10,
    acceptanceRate: 76,
    hubRules: [
      'Redact ALL patient identifiers from EOB screenshots.',
      'State payer, plan type and region — rules vary wildly.',
      'Coding advice is education, not legal counsel.',
    ],
  },
  {
    id: 'topic-students',
    name: 'Students & New Grads',
    slug: 'students-new-grads',
    description: 'NBEO prep, residency applications, first-job contract review, and mentorship threads moderated by attending ODs.',
    iconName: 'GraduationCap',
    bannerColor: 'from-emerald-500/20 to-teal-500/10 text-emerald-500 border-emerald-500/30',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
    followersCount: 4120,
    questionsCount: 388,
    isFollowed: true,
    isTrending: true,
    isStudentFriendly: true,
    trendingTags: ['#NBEO', '#ResidencyMatch', '#FirstJob', '#Contracts', '#Mentorship'],
    recentActivity: 'Most welcoming hub • students answer daily',
    categoryId: 'cat-practice',
    weeklyAsks: 16,
    acceptanceRate: 72,
    hubRules: [
      'Contract reviews: anonymize practice names & regions.',
      'NBEO threads use spoiler tags for recent exam content.',
      'Attending mentors endorse answers — cite sources where possible.',
    ],
  },
  {
    id: 'topic-optics',
    name: 'Optics & Dispensing',
    slug: 'optics-dispensing',
    description: 'Prism slab-off calculations, PAL design selection, high-Rx lens materials, and digital freeform troubleshooting.',
    iconName: 'Glasses',
    bannerColor: 'from-teal-500/20 to-cyan-500/10 text-teal-500 border-teal-500/30',
    gradient: 'from-teal-500 via-cyan-500 to-sky-500',
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80',
    followersCount: 1720,
    questionsCount: 143,
    isFollowed: false,
    isRecommended: true,
    isStudentFriendly: true,
    trendingTags: ['#SlabOff', '#PALDesign', '#Prism', '#HighRx', '#Freeform'],
    recentActivity: 'Prism worksheet templates refreshed',
    categoryId: 'cat-practice',
    weeklyAsks: 5,
    acceptanceRate: 87,
    hubRules: [
      'Post full Rx, frame measurements and vertex distance.',
      'Prism asks: state the optical issue at distance vs near.',
      'Material advice must include Abbe value and impact rating.',
    ],
  },
];

export const MOCK_QUESTIONS: ClinicalQuestion[] = [
  {
    id: 'q-retina-1',
    title: 'How do you differentiate chronic Central Serous Chorioretinopathy (CSR) with flat irregular PED from occult Type 1 CNV on SD-OCT when OCT-A is unavailable?',
    content: `I have a 47-year-old male architect presenting with metamorphopsia OD for 8 weeks. SD-OCT reveals shallow subretinal fluid (SRF) adjacent to a flat, irregular pigment epithelial detachment (FIPED) with double-layer sign. 
    
There is subfoveal choroidal thickening (pachychoroid phenotype ~490µm), but no intraretinal cysts or hard exudates. We currently do not have OCT-Angiography in our satellite branch, and retinal specialist referral waiting time is approximately 6 weeks. 

What clinical clues or in-office diagnostic maneuvers do colleagues use to determine whether to trial Spironolactone / Eplerenone vs rushing for emergency anti-VEGF referral?`,
    topicId: 'topic-retina',
    topicName: 'Retina & Macula',
    tags: ['Retina', 'OCT', 'CSR', 'Pachychoroid', 'Anti-VEGF', 'Macula'],
    author: OTHER_DOCTORS[0], // Dr. Marcus Chen
    createdAt: '3 hours ago',
    upvotes: 142,
    downvotes: 3,
    userVote: 'up',
    answersCount: 4,
    viewsCount: 1890,
    isFollowed: true,
    isBookmarked: true,
    savedFolder: 'Retina Diagnostic Dilemmas',
    images: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&auto=format&fit=crop&q=80',
    ],
    clinicalData: {
      patientAgeSex: '47-year-old Male',
      visualAcuity: 'OD: 20/40 (was 20/20 at last annual)',
      intraocularPressure: '14 mmHg OU',
      chiefComplaint: 'Mild central distortion and perceived dimness reading blueprints',
      instrumentUsed: 'Heidelberg Spectralis SD-OCT & Autofluorescence',
      medicalHistory: 'Exogenous corticosteroid nasal spray for seasonal allergies, high-stress deadline work',
    },
    urgency: 'case-consult',
    answers: [
      {
        id: 'ans-r1-1',
        questionId: 'q-retina-1',
        author: CURRENT_USER,
        createdAt: '1 hour ago',
        content: `This is the quintessential pachychoroid dilemma that keeps ODs up at night. The "Double Layer Sign" (DLS) in pachychoroid disease harbors occult Type 1 neovascularization in up to 35-45% of cases even without massive exudation.

Here is my clinical rule of thumb when OCT-A is unavailable:

1. **Look closely for the "Hyperreflective Material Under the RPE" vs Homogeneous Fluid**:
   - In pure non-neovascular chronic CSR, the space beneath the separated RPE is usually hyporeflective or moderately homogeneous.
   - If you see **heterogeneous or moderately hyperreflective internal reflectivity** within that flat irregular PED, assume Type 1 CNV until proven otherwise.

2. **Fundus Autofluorescence (FAF) Clues**:
   - Chronic CSR typically shows classic gravitational tracking gutters with mottled hyper/hypo-autofluorescence.
   - If there is focal intense hyper-FAF surrounded by a halo of hypo-FAF directly corresponding to the FIPED edge, that strongly hints at active neovascular proliferation.

3. **Check the Contralateral Asymptomatic Eye**:
   - Perform a raster scan of the left eye. Pachyvessels with choroidal vascular hyperpermeability without RPE attenuation support systemic pachychoroid predisposition.

4. **Management Recommendation**:
   - First step: Stop the nasal steroid immediately (consult with his PCP). Steroid cessation alone resolves acute/subacute CSR in over 60% of cases.
   - **Do NOT initiate systemic eplerenone/spironolactone** blindly without baseline renal and potassium panels, and remember the VICI trial showed mineralocorticoid antagonists were not superior to placebo for chronic CSR.
   - If visual acuity drops by even 1 line or you note any subretinal hemorrhage on dilated 90D examination, expedite that retina referral to 48 hours for anti-VEGF loading.`,
        upvotes: 98,
        downvotes: 1,
        userVote: 'up',
        isAcceptedAnswer: true,
        isPeerEndorsed: true,
        clinicalPearlsCited: [
          'Heterogeneous internal reflectivity within flat irregular PED correlates with occult Type 1 CNV in ~40% of pachychoroid eyes.',
          'Always discontinue topical, inhalational, or dermal corticosteroids prior to prescribing medical therapy.',
        ],
        comments: [
          {
            id: 'c-ans-1',
            author: OTHER_DOCTORS[2],
            content: 'Brilliant breakdown Dr. Sirenjeev. We did a retrospective review at our tertiary clinic, and 38% of our "chronic CSR" cases sent without OCT-A turned out to have sub-RPE capillary networks on dye angiography.',
            createdAt: '45 mins ago',
            likes: 18,
            isLiked: true,
          },
        ],
      },
      {
        id: 'ans-r1-2',
        questionId: 'q-retina-1',
        author: OTHER_DOCTORS[1], // Dr. Sarah Jenkins
        createdAt: '2 hours ago',
        content: `I would also add: look for the presence of **"Subretinal Fibrin" or "Shaggy Photoreceptors"** on the high-resolution B-scan. 

When you have acute or recent fluid shift in CSR, the outer segments of photoreceptors elongate and appear as jagged, shaggy projections dipping into the serous fluid. If you see fibrin sheets (dense hyperreflective deposits floating in the SRF), that signals high protein leakage which can occur in both, but combined with localized retinal hemorrhage is almost pathognomonic for CNV.

Can you perform an urgent B-scan or fundus photography with a green/red-free filter to rule out subtle micro-hemorrhages?`,
        upvotes: 46,
        downvotes: 0,
        clinicalPearlsCited: ['Red-free photography exposes subtle micro-hemorrhages masked under serous detachments.'],
        comments: [],
      },
    ],
  },
  {
    id: 'q-glaucoma-1',
    title: 'Target IOP achieved (13 mmHg on Latanoprostene Bunod), but RNFL progression continues on 24-2 & 10-2 VF. What is your next protocol?',
    content: `62-year-old female with moderate primary open-angle glaucoma (POAG). Baseline IOP was 22 OD, 24 OS. Currently well tolerated on Vyzulta (latanoprostene bunod 0.024%) with measured morning IOP consistently 12-14 mmHg in both eyes. Pachymetry: 545µm OU.

However, over the last 18 months, Guided Progression Analysis (GPA) on Zeiss Cirrus OCT shows definite RNFL thinning in the inferotemporal sector OD (-4.2 µm/year, p < 0.01). Repeat 10-2 Humphrey visual field confirms deepening paracentral scotoma within 3 degrees of fixation.

Corneal hysteresis (CH) was checked yesterday and measured 7.8 mmHg OD (notably low).

Questions for glaucoma subspecialists:
1. Would you add a secondary aqueous suppressant (Rhopressa vs Dorzolamide/Timolol) to push target below 10 mmHg?
2. Or proceed directly to Selective Laser Trabeculoplasty (SLT) 360°?
3. How much weight do you give to nocturnal blood pressure dips or sleep apnea in progressive low/normal tension IOP?`,
    topicId: 'topic-glaucoma',
    topicName: 'Glaucoma & Neuro',
    tags: ['Glaucoma', 'RNFL', 'Progression', 'Target IOP', 'SLT', 'Visual Fields', 'Hysteresis'],
    author: OTHER_DOCTORS[2], // Dr. Elena Rostova
    createdAt: '6 hours ago',
    upvotes: 188,
    downvotes: 2,
    userVote: 'up',
    answersCount: 5,
    viewsCount: 2410,
    isFollowed: true,
    isBookmarked: true,
    savedFolder: 'Glaucoma Board Cases',
    clinicalData: {
      patientAgeSex: '62-year-old Female',
      visualAcuity: 'OD: 20/20, OS: 20/20',
      intraocularPressure: 'OD: 13 mmHg, OS: 13 mmHg (measured at 9:30 AM)',
      chiefComplaint: 'Asymptomatic, routine 6-month glaucoma follow-up',
      instrumentUsed: 'Zeiss Cirrus OCT + HFA3 24-2C / 10-2',
      medicalHistory: 'Mild nocturnal hypotension, cold extremities (Raynaud phenomenon), migrainous headache history',
    },
    urgency: 'grand-rounds',
    answers: [
      {
        id: 'ans-g1-1',
        questionId: 'q-glaucoma-1',
        author: OTHER_DOCTORS[3], // Dr. Tariq Al-Mansoor
        createdAt: '4 hours ago',
        content: `The low corneal hysteresis (7.8 mmHg) and paracentral fixation scotoma in a patient with cold extremities and nocturnal hypotension screams **vascular dysregulation / Flammer syndrome component** on top of mechanical POAG.

Here is my recommended protocol:

1. **Re-evaluate IOP Fluctuations with Diurnal / Peak Testing**:
   - Single in-clinic morning IOP readings miss peak spikes that often occur upon waking (supine posture). Have her come in at 4:30 PM, or better yet, check diurnal phase if possible.

2. **Add Rhopressa (Netarsudil 0.02%) or SLT**:
   - Why Netarsudil? Beyond lowering trabecular resistance, ROCK inhibitors reduce episcleral venous pressure (EVP) and have documented neuroprotective and retinal blood flow enhancing effects in experimental models.
   - Alternatively, 360° SLT can smooth out IOP volatility and eliminate adherence friction.

3. **Nocturnal Systemic Workup**:
   - Order a 24-hour ambulatory blood pressure monitoring (ABPM) test with her cardiologist. If her diastolic blood pressure drops below 50-55 mmHg during sleep ("over-dippers"), her ocular perfusion pressure (OPP = 2/3 MAP - IOP) plummets, causing ischemic optic nerve head damage despite "normal" 13 mmHg IOP!
   - Advise her to avoid taking systemic antihypertensive medications right before bedtime.`,
        upvotes: 124,
        downvotes: 1,
        userVote: 'up',
        isAcceptedAnswer: true,
        isPeerEndorsed: true,
        clinicalPearlsCited: [
          'Corneal Hysteresis < 8.0 mmHg is an independent risk factor for glaucoma progression at normal IOP levels.',
          'Nocturnal diastolic dips below 50 mmHg trigger critical drops in ocular perfusion pressure.',
        ],
        comments: [
          {
            id: 'c-g1-1',
            author: CURRENT_USER,
            content: 'Spot on Tariq. We also check for sleep apnea; up to 30% of progressive NTG patients have undiagnosed obstructive sleep apnea with nocturnal desaturations.',
            createdAt: '2 hours ago',
            likes: 24,
            isLiked: true,
          },
        ],
      },
    ],
  },
  {
    id: 'q-cornea-1',
    title: 'Scleral lens blanching at 3 o\'clock and 9 o\'clock with 280µm central clearance. Should I steepen the landing or order a toric peripheral curve?',
    content: `Fitting an 18mm diagnostic scleral lens on a 34-year-old with bilateral Keratoconus (Kmax 58.2D OD). Central clearance is pristine at 280µm after 2 hours settling. Limbal vault is 80µm with no touch.

However, evaluating the haptic under slit lamp with diffuse cobalt and white light reveals focal sectorial blanching of the episcleral vessels at the horizontal meridian (3 & 9 o'clock), with mild edge lift and tear exchange bubbles creeping in at 6 and 12 o'clock.

Patient reports mild awareness and ocular fatigue after 4 hours of wear.

Would you flatten the horizontal meridian or steepen the vertical meridian to create a toric landing zone (toric haptic)? What step difference do you start with?`,
    topicId: 'topic-cornea',
    topicName: 'Cornea & Sclerals',
    tags: ['Sclerals', 'Cornea', 'Keratoconus', 'Haptic', 'Toric Landing', 'Fitting'],
    author: OTHER_DOCTORS[4], // Dr. Rachel Adams
    createdAt: '8 hours ago',
    upvotes: 112,
    downvotes: 0,
    userVote: 'up',
    answersCount: 3,
    viewsCount: 1650,
    isFollowed: true,
    isBookmarked: false,
    clinicalData: {
      patientAgeSex: '34-year-old Male',
      visualAcuity: '20/20- with over-refraction',
      intraocularPressure: '15 mmHg',
      chiefComplaint: 'Lens comfort degrades after 3-4 hours, redness upon removal',
      instrumentUsed: 'Corneal Scleral Profiler & Slit Lamp High Mag',
    },
    urgency: 'case-consult',
    answers: [
      {
        id: 'ans-c1-1',
        questionId: 'q-cornea-1',
        author: CURRENT_USER,
        createdAt: '5 hours ago',
        content: `Classic manifestation of scleral toricity! Beyond 15.0mm diameter, the human sclera is rarely spherical — it is almost universally with-the-rule toric (steeper vertically, flatter horizontally).

Your lens is bearing on the flat horizontal meridian (3 and 9 o'clock) causing compression blanching, and lifting off the steep vertical meridian (6 and 12 o'clock) allowing micro-bubbles to sneak under the reservoir.

**Here is the exact prescription modification formula:**
1. **Change from spherical landing to Toric Haptic (Landing Zone)**:
   - **Horizontal Meridian (Flat Axis - 0°/180°)**: FLATTEN by 2 to 3 steps (approx. 60µm to 90µm increase in clearance). This will immediately relieve the vascular blanching and impingement.
   - **Vertical Meridian (Steep Axis - 90°/270°)**: STEEPEN by 2 to 3 steps (approx. 60µm decrease). This drops the edge down onto the conjunctiva and completely seals off the bubble intake.

2. **Verify Central Vault Post-Settling**:
   - Because you are aligning the haptics properly, the lens will settle an additional 30-50µm deeper into the spongy conjunctival tissue. 
   - Since your current clearance is 280µm, you can keep the sagittal depth as-is or increase by +25µm to prevent eventual central touch after 12-hour wear.`,
        upvotes: 89,
        downvotes: 0,
        userVote: 'up',
        isAcceptedAnswer: true,
        isPeerEndorsed: true,
        clinicalPearlsCited: [
          'Human scleras are toric in >95% of eyes fitted with lenses >15.0mm diameter.',
          'When horizontal meridian blanches and vertical meridian lifts, flatten flat and steepen steep.',
        ],
        comments: [],
      },
    ],
  },
  {
    id: 'q-myopia-1',
    title: 'Child progressing 0.85D/year on 0.01% low-dose Atropine. Should we switch to 0.05% Atropine, add Ortho-K, or combine both?',
    content: `8-year-old female patient with progressive axial myopia. 
- Age 7: -1.75 OD, -1.50 OS. Axial length: 23.40mm OD, 23.32mm OS. Initiated 0.01% compounded atropine nightly.
- Age 8 (12-month checkup): -2.60 OD, -2.35 OS. Axial length: 23.78mm OD (+0.38mm elongation!), 23.69mm OS.

Both parents are high myopes (-6.50D and -8.00D). Pupil dilation on 0.01% is unnoticeable and accommodation amplitude is preserved at 12D.

Given the LAMP (Low-Concentration Atropine for Myopia Progression) study outcomes, what is your preferred second-line escalation strategy?`,
    topicId: 'topic-myopia',
    topicName: 'Pediatrics & Myopia',
    tags: ['Myopia', 'Pediatrics', 'Atropine', 'Ortho-K', 'Axial Length', 'LAMP Study'],
    author: OTHER_DOCTORS[5], // Dr. Jonathan Vance
    createdAt: '12 hours ago',
    upvotes: 94,
    downvotes: 1,
    answersCount: 3,
    viewsCount: 1420,
    isFollowed: false,
    isBookmarked: false,
    clinicalData: {
      patientAgeSex: '8-year-old Female',
      visualAcuity: 'Corrects to 20/20 OU',
      intraocularPressure: '16 mmHg OU',
      chiefComplaint: 'Rapid refractive drift over the past year despite drops',
      medicalHistory: 'High parental myopia, avid reader, 4+ hours screen time daily',
    },
    urgency: 'routine',
    answers: [
      {
        id: 'ans-m1-1',
        questionId: 'q-myopia-1',
        author: OTHER_DOCTORS[0], // Dr. Marcus Chen
        createdAt: '10 hours ago',
        content: `The LAMP study Phase 1 & 2 demonstrated conclusively that **0.05% atropine is roughly double the efficacy of 0.01%** in slowing axial elongation (0.27mm vs 0.41mm elongation over 2 years), with negligible clinically significant adverse effects on photophobia or reading in Caucasian and Asian cohorts.

Here is my algorithmic step:
1. **Immediate Step: Escalate to 0.05% Atropine**:
   - Increase concentration to 0.05% right away. 0.01% is simply a non-responder dose for this rapid progressor.
2. **Consider Combination Therapy (Ortho-K + 0.05% Atropine)**:
   - Kinoshita et al. and the AOK study revealed that combining Ortho-K with low-concentration atropine provides a synergistic additive effect, especially in fast progressors or children with larger baseline pupil diameters.
3. **Lifestyle Counseling**:
   - Target a minimum of 120 minutes of daily outdoor natural light exposure and enforce the 20-20-20 rule. Outdoor sunlight triggers retinal dopamine release, which slows scleral remodeling.`,
        upvotes: 68,
        downvotes: 0,
        isAcceptedAnswer: true,
        clinicalPearlsCited: [
          '0.05% concentration of atropine demonstrated maximum clinical slowing of axial length elongation with manageable side effect profile in the LAMP study.',
        ],
        comments: [],
      },
    ],
  },
  {
    id: 'q-dryeye-1',
    title: 'Severe MGD with refractory Demodex blepharitis despite tea tree oil foam. Experiences with Xdemvy (lotilaner 0.25%)?',
    content: `58-year-old female with chronic bilateral burning, cylindrical collarettes at the eyelash base (12+ per lid), and persistent telangiectasias. She has been using Cliradex tea tree oil wipes for 6 months with severe stinging and minimal reduction in mite burden.

Meibography shows 40% gland dropout inferiorly. TBUT is 3 seconds.

Has anyone switched patients directly to topical Lotilaner (Xdemvy)? What was the clearance timeline, and did you observe rebound infestation at 3-6 months post-treatment?`,
    topicId: 'topic-dry-eye',
    topicName: 'Dry Eye & Aesthetics',
    tags: ['Dry Eye', 'Demodex', 'Xdemvy', 'Lotilaner', 'MGD', 'Blepharitis'],
    author: OTHER_DOCTORS[1], // Dr. Sarah Jenkins
    createdAt: '1 day ago',
    upvotes: 79,
    downvotes: 0,
    answersCount: 2,
    viewsCount: 1180,
    isFollowed: false,
    isBookmarked: true,
    savedFolder: 'Ocular Surface Protocols',
    urgency: 'routine',
    answers: [
      {
        id: 'ans-de1-1',
        questionId: 'q-dryeye-1',
        author: CURRENT_USER,
        createdAt: '18 hours ago',
        content: `We have transitioned over 45 patients to Lotilaner ophthalmic solution 0.25% (Xdemvy) in our dry eye specialty clinic over the past year. 

**Clinical Findings & Protocol:**
- **Tolerance**: Night and day difference compared to tea tree oil. TTO wipes burn, cause contact dermatitis, and have poor patient compliance. Lotilaner has virtually no ocular surface toxicity or stinging.
- **Clearance Speed**: By week 2, collarettes loosen noticeably. By week 6 (completion of the BID 6-week course), >85% of our patients achieve complete collarette resolution (≤2 collarettes per upper lid).
- **MGD Improvement**: Once the parasitic burden and bacterial co-infection (Bacillus oleronius) are eliminated, the meibum expression quality dramatically transitions from toothpaste-like to clear olive oil.
- **Rebound Prevention**: Advise patients to wash bed linens, pillows, and makeup brushes at >60°C during week 3 of treatment. We re-check at 6 months; less than 8% have needed a maintenance touch-up.`,
        upvotes: 54,
        downvotes: 0,
        isAcceptedAnswer: true,
        clinicalPearlsCited: [
          'Lotilaner selectively inhibits Demodex GABA-gated chloride channels without toxic stinging associated with high-concentration terpinen-4-ol.',
        ],
        comments: [],
      },
    ],
  },
  {
    id: 'q-glaucoma-2',
    title: 'Pseudoexfoliation Glaucoma with sudden unilateral spike to 38 mmHg. Is Argon / SLT contraindicated during acute inflammatory flare?',
    content: `71-year-old male with known unilateral Pseudoexfoliation (PXF) OD. Routine IOP was 18 mmHg on Travoprost. He woke up this morning with mild brow ache and blurred vision; measured IOP is 38 mmHg OD, 15 mmHg OS. 
    
Slit lamp shows heavy flaky dandruff material on the pupillary border and anterior lens capsule, 1+ pigment flare in the anterior chamber, but no corneal edema. Gonioscopy reveals wide open grade IV angle with dense Sampaolesi line.

Can SLT be safely performed right after lowering IOP with oral acetazolamide, or does heavy trabecular pigmentation increase the risk of severe post-laser pressure spikes?`,
    topicId: 'topic-glaucoma',
    topicName: 'Glaucoma & Neuro',
    tags: ['PXF', 'Glaucoma', 'SLT', 'Sampaolesi', 'IOP Spike', 'Emergency'],
    author: OTHER_DOCTORS[3], // Dr. Tariq Al-Mansoor
    createdAt: '1 day ago',
    upvotes: 105,
    downvotes: 1,
    answersCount: 2,
    viewsCount: 1530,
    isFollowed: false,
    isBookmarked: false,
    urgency: 'urgent',
    answers: [
      {
        id: 'ans-g2-1',
        questionId: 'q-glaucoma-2',
        author: OTHER_DOCTORS[2], // Dr. Elena Rostova
        createdAt: '22 hours ago',
        content: `**Warning: Do NOT perform SLT today during acute pressure spike in heavy PXF!**

Because the trabecular meshwork in PXF is saturated with melanin and pseudoexfoliative fibrillar protein, the laser energy absorption is dramatically higher than in standard open-angle glaucoma. Applying standard SLT energy in an eye already at 38 mmHg risks triggering an intractable spike to 50+ mmHg and acute decompensation.

**Acute Protocol:**
1. **Medical Decompression in Clinic**:
   - 1 drop Apraclonidine 1% or Brimonidine 0.2%
   - 1 drop Timolol 0.5% (if no cardiac/asthma contraindications)
   - Oral Acetazolamide (Diamox) 500mg sequel or 250mg tablets stat.
2. **Control Pigment Dispersion**:
   - The 1+ anterior chamber pigment release is causing trabecular blockade. Add a short course of topical Pred Forte (prednisolone acetate 1%) QID for 4-5 days.
3. **When to Laser?**:
   - Once IOP stabilizes < 20 mmHg for at least 2 weeks and the AC is quiet, you CAN perform SLT, but **treat only 180 degrees** and dial the power down significantly (start at 0.4 - 0.6 mJ, observing for minimal cavitation bubbles). Pre-treat and post-treat with Brimonidine.`,
        upvotes: 72,
        downvotes: 0,
        isAcceptedAnswer: true,
        clinicalPearlsCited: [
          'In heavily pigmented PXF angles, treat only 180° with reduced laser energy to prevent refractory post-SLT pressure crises.',
        ],
        comments: [],
      },
    ],
  },
  {
    id: 'q-pharma-1',
    title: 'Patient on Semaglutide (Ozempic) 1.0mg weekly with mild NPDR. What is your screening protocol for rapid diabetic retinopathy worsening?',
    content: `52-year-old female with Type 2 Diabetes (HbA1c recently plunged from 10.4% down to 6.8% over 4 months following initiation of Semaglutide). 

Baseline dilated exam 6 months ago showed mild non-proliferative diabetic retinopathy (3 microaneurysms in the temporal macula OD). 

Given the SUSTAIN-6 clinical trial safety signals regarding rapid glycemic correction and paradoxical short-term retinopathy progression, how frequently do you schedule dilated exams and OCT in these GLP-1 patients?`,
    topicId: 'topic-pharma',
    topicName: 'Therapeutics & Systemic',
    tags: ['Semaglutide', 'GLP-1', 'Diabetic Retinopathy', 'SUSTAIN-6', 'Pharmacology'],
    author: OTHER_DOCTORS[4], // Dr. Rachel Adams
    createdAt: '2 days ago',
    upvotes: 62,
    downvotes: 0,
    answersCount: 1,
    viewsCount: 920,
    isFollowed: false,
    isBookmarked: false,
    urgency: 'routine',
    answers: [
      {
        id: 'ans-p1-1',
        questionId: 'q-pharma-1',
        author: OTHER_DOCTORS[0], // Dr. Marcus Chen
        createdAt: '1 day ago',
        content: `Crucial clinical query. The phenomenon is known as "Early Worsening of Diabetic Retinopathy" (EWDR), and it was first documented decades ago with rapid insulin pumps.

It is NOT that the GLP-1 molecule itself is toxic to pericytes; rather, when HbA1c drops by more than 2.0% within a 3-6 month window, sudden drop in interstitial glucose levels induces osmotic changes and upregulates VEGF expression before retinal microvasculature adapts.

**Our Protocol for GLP-1 rapid glycemic drops (>2% HbA1c reduction in <6 months):**
- **Interval**: Rather than waiting for the standard 12-month annual diabetic check, see her at **3-month to 4-month intervals** for the first year.
- **Modalities**: Perform ultra-widefield fundus photography (Optos/Eidon) and macula SD-OCT at every visit to detect early cotton wool spots, intraretinal microvascular abnormalities (IRMA), or subclinical macular thickening.
- **Communication**: Send a consultation note to her endocrinologist noting baseline status so that glycemic titration can be coordinated if macular edema develops.`,
        upvotes: 48,
        downvotes: 0,
        isAcceptedAnswer: true,
        clinicalPearlsCited: [
          'Rapid HbA1c drop >2.0% triggers transient upregulation of VEGF and early worsening of retinopathy (EWDR).',
        ],
        comments: [],
      },
    ],
  },
  {
    id: 'q-student-cornea-1',
    title: 'Student & Resident Case Round: 22-year-old soft contact lens wearer with 1.1mm peripheral infiltrate & lucid interval. Sterile CLPU vs Microbial Keratitis?',
    content: `A 22-year-old college student presents with moderate right eye discomfort, foreign body sensation, and sectoral injection for 24 hours. She admits to sleeping in monthly replacement silicone hydrogel lenses for 4 nights during midterm exams.

Slit lamp examination shows a 1.1mm round, creamy-white subepithelial infiltrate located at the 4 o'clock mid-peripheral cornea. There is a distinct 1.0mm clear zone (lucid interval) between the lesion and the limbus. Fluorescein staining reveals a pinpoint punctate epithelial defect strictly smaller than the underlying infiltrative opacity. There is mild anterior chamber reaction (trace cells, no hypopyon). 

**Student & Resident Learning Question:**
How do you systematically differentiate a sterile Contact Lens Peripheral Ulcer (CLPU) / marginal keratitis from an early infectious Pseudomonas or Staph microbial keratitis at the slit lamp? What clinical pearl dictates when to culture and fortify vs treat with a 4th-gen fluoroquinolone monotherapy?`,
    topicId: 'topic-cornea',
    topicName: 'Cornea & Sclerals',
    tags: ['Cornea', 'ContactLens', 'BoardReview', 'StudentCase', 'DifferentialDiagnosis', 'Infiltrates'],
    author: OTHER_DOCTORS[1], // Dr. Sarah Jenkins
    createdAt: '4 hours ago',
    upvotes: 118,
    downvotes: 0,
    answersCount: 2,
    viewsCount: 1420,
    isFollowed: true,
    isBookmarked: true,
    isStudentFriendly: true,
    trainingLevel: 'student-friendly',
    urgency: 'case-consult',
    images: [
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1000&auto=format&fit=crop&q=80',
    ],
    clinicalData: {
      patientAgeSex: '22-year-old Female',
      visualAcuity: 'OD: 20/25 (best corrected), OS: 20/20',
      intraocularPressure: '15 mmHg OU',
      chiefComplaint: 'Redness, watery discharge, and gritty sensation on waking',
      instrumentUsed: 'Haag-Streit Slit Lamp & Cobalt Blue with Wratten #12 filter',
      medicalHistory: 'Extended contact lens wear, no previous ocular infections',
    },
    answers: [
      {
        id: 'ans-stud-1',
        questionId: 'q-student-cornea-1',
        author: {
          id: 'doc-student-maya',
          name: 'Maya Patel',
          credentials: 'OD Candidate (Class of 2027)',
          headline: '3rd Year Clinician • ICO • Passionate about Cornea & Anterior Segment',
          currentRole: 'Optometry Intern',
          clinicName: 'Illinois College of Optometry Clinical Centers',
          location: 'Chicago, IL',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
          bannerImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
          verified: true,
          licenseNumber: 'STU-IL-2027-89',
          licenseState: 'IL',
          npiNumber: 'STUDENT',
          deActive: false,
          connectionsCount: 340,
          followersCount: 680,
          profileViewsThisWeek: 88,
          searchAppearances: 142,
          openTo: { referrals: false, locumTenens: false, clinicalTrials: false, consulting: false },
          about: 'Optometry student exploring cornea, specialty contact lenses, and urgent eye care.',
          clinicalSpecialties: [],
          experiences: [],
          education: [],
          certifications: [],
          publications: [],
          diagnosticTechnologies: [],
          recommendations: [],
          featuredPostsIds: [],
        },
        createdAt: '2 hours ago',
        authorRoleBadge: "OD Student (ICO '27)",
        isStudentContribution: true,
        isAttendingEndorsed: true,
        endorsedByDoctorName: 'Dr. Marcus Chen, OD, FAAO (Attending Endorsement)',
        content: `As an OD-3 reviewing for NBEO Part 2, here is the high-yield diagnostic grid we memorize in clinic:

1. **Size Ratio (Epithelial Defect vs Stroma Infiltrate)**:
   - In **Sterile CLPU**: The epithelial staining defect is characteristically **smaller** than the underlying stromal infiltrate (often pinpoint or 1:2 ratio).
   - In **Infectious Microbial Keratitis (MK)**: The epithelial defect matches or **exceeds** the size of the stromal infiltrate (1:1 ratio or larger), with active stromal necrosis and enzymatic digestion.

2. **Location & The "Lucid Interval"**:
   - The presence of a clear, non-infiltrated 1.0mm zone between the lesion and the limbus is classic for sterile CLPU (caused by staphylococcal endotoxins trapped under the lens).
   - Infectious ulcers often present centrally or paracentrally without a neat peripheral margin.

3. **Pain & Discharge**:
   - CLPU presents with mild-to-moderate foreign body ache, watery discharge, and minimal photophobia.
   - Microbial keratitis causes severe throbbing pain, thick mucopurulent discharge, and intense photophobia with lid edema.

**Proposed Management Protocol:**
- Discontinue all contact lens wear immediately (throw away current lenses and case).
- Monotherapy with a fluoroquinolone (e.g. Moxifloxacin 0.5% or Besifloxacin 0.6%) q1h-q2h for the first 24-48 hours.
- Mandatory 24-hour slit lamp re-evaluation to verify stabilization.
- Do NOT prescribe topical steroid or combination drops until re-epithelialization is confirmed!`,
        upvotes: 84,
        downvotes: 0,
        isAcceptedAnswer: true,
        clinicalPearlsCited: [
          'CLPU rule: Epithelial staining area is strictly smaller than the underlying stromal infiltrate (sterile hypersensitivity trait).',
          'Never add combination steroid/antibiotic until the epithelial barrier has fully closed.',
        ],
        comments: [
          {
            id: 'c-stud-1',
            author: OTHER_DOCTORS[0], // Dr. Marcus Chen
            content: 'Outstanding reasoning, Maya! Exactly how we teach this on grand rounds. The 1:1 staining ratio versus small focal defect is the single most reliable discriminator in the emergency chair.',
            createdAt: '1 hour ago',
            likes: 24,
            isLiked: true,
          },
        ],
      },
      {
        id: 'ans-stud-2',
        questionId: 'q-student-cornea-1',
        author: CURRENT_USER,
        createdAt: '45 mins ago',
        authorRoleBadge: 'Attending OD, FAAO',
        content: `Echoing Dr. Chen's endorsement of Maya's analysis! One clinical pearl to add for students and new graduates:

**"When in Doubt, Treat as Infectious until Day 2"**:
Even if a lesion ticks every box for a sterile CLPU, an early *Pseudomonas* or *Acanthamoeba* keratitis can masquerade as a mild focal infiltrate within the first 12 to 24 hours. 

Therefore, our gold standard rule:
- Never assume 100% sterility on Day 1.
- Dose high-potency fluoroquinolone (Vigamox or Besivance) q2h while awake.
- If the lesion is unchanged or smaller after 24 hours with reduced conjunctival injection, your CLPU diagnosis is confirmed!`,
        upvotes: 42,
        downvotes: 0,
        clinicalPearlsCited: [
          'Assume infectious keratitis on Day 1 until 24-hour slit lamp follow-up proves stability.',
        ],
        comments: [],
      },
    ],
  },

  /* ==================================================================
     NEW HUB QUESTIONS — one seeded consult per newly added topic hub
     ================================================================== */

  // topic-uveitis
  {
    id: 'q-uveitis-1',
    title: 'Third episode of HLA-B27 positive acute anterior uveitis in 6 months. How slow should the prednisolone acetate taper be to prevent rebound?',
    content: `48-year-old male, HLA-B27 positive, presenting with his third episode of acute anterior uveitis OU-spaced OD this year. Current findings: 3+ cells and 2+ flare in the anterior chamber, keratic precipitates fine and stellate, IOP 28 mmHg OD (elevated — possible steroid responder component from the drops he started 5 days ago elsewhere).

He is on prednisolone acetate 1% Q2H while awake started by an urgent care clinic with no taper plan.

Questions for colleagues:
1. What taper schedule do you use after control is achieved in recurrent HLA-B27 AAU (strength + frequency steps)?
2. Should the elevated IOP change the steroid choice (difluprednate vs pred acetate vs loteprednol)?
3. When do you pull the trigger on a systemic workup / rheumatology co-management — after 3 recurrences, or sooner?`,
    topicId: 'topic-uveitis',
    topicName: 'Uveitis & Inflammation',
    tags: ['Uveitis', 'HLA-B27', 'Steroid Taper', 'Steroid Responder', 'Recurrent AAU'],
    author: OTHER_DOCTORS[5], // Dr. Priya Sharma
    createdAt: '2 hours ago',
    upvotes: 66,
    downvotes: 1,
    answersCount: 2,
    viewsCount: 980,
    isFollowed: false,
    isBookmarked: false,
    isStudentFriendly: true,
    urgency: 'case-consult',
    clinicalData: {
      patientAgeSex: '48-year-old Male',
      visualAcuity: 'OD: 20/30, OS: 20/20',
      intraocularPressure: 'OD: 28 mmHg, OS: 16 mmHg',
      chiefComplaint: 'Pain, photophobia and blurred vision OD for 3 days, third episode this year',
      instrumentUsed: 'Slit lamp with flare meter + gonioscopy',
      medicalHistory: 'HLA-B27 positive, lower back stiffness (sacroiliitis query), no IBD or psoriasis diagnosed',
    },
    answers: [
      {
        id: 'ans-uve1-1',
        questionId: 'q-uveitis-1',
        author: OTHER_DOCTORS[1], // Dr. Amara Thorne
        createdAt: '1 hour ago',
        content: `Classic recurrent HLA-B27 AAU. Three principles for the taper:

1. **Length of full-strength dosing matters more than the back end.** With 3+ cell at presentation, keep pred acetate 1% Q2H for 5-7 days until cells fall to trace, then step down by one frequency tier every 5-7 days (Q2H → QID → TID → BID → daily → stop over ~4-6 weeks total). A 2-week "crash taper" is the #1 cause of rebound flares in these patients.

2. **Switch the IOP problem, do not chase it.** At 28 mmHg on day 5, move from pred acetate to loteprednol etabonate 0.5% QID for the maintenance phase — it retains efficacy with a much lower responder rate — and keep monitoring IOP weekly while on any steroid. Difluprednate would make the pressure worse.

3. **Cycloplegia is not optional here.** Add homatropine 5% at bedtime (not short-acting drops) to prevent posterior synechiae and break the pain-photophobia cycle.

On the systemic question: three documented recurrences in 12 months with HLA-B27 positivity is already my threshold for rheumatology referral — ask for sacroiliac imaging given his back stiffness. Also counsel that recurrence risk is real (~50% in HLA-B27 patients) so he needs a flare action plan, not just this prescription.`,
        upvotes: 41,
        downvotes: 0,
        isAcceptedAnswer: true,
        isPeerEndorsed: true,
        clinicalPearlsCited: [
          'Taper one frequency tier every 5-7 days once cells are trace; total course 4-6 weeks in recurrent HLA-B27 AAU.',
          'Loteprednol is the maintenance steroid of choice in steroid responders.',
        ],
        comments: [
          {
            id: 'c-uve1-1',
            author: OTHER_DOCTORS[3], // Dr. Tariq Al-Mansoor
            content: 'Agreed on the loteprednol swap. One addition — document gonioscopy now; HLA-B27 patients on chronic intermittent steroids deserve a baseline trabecular status.',
            createdAt: '35 mins ago',
            likes: 9,
            isLiked: false,
          },
        ],
      },
      {
        id: 'ans-uve1-2',
        questionId: 'q-uveitis-1',
        author: CURRENT_USER,
        createdAt: '20 mins ago',
        content: `Echoing the taper plan above. Two practical add-ons from our clinic flow sheet:

- **Give the patient a written flare protocol**: "if pain + photophobia return, restart at the last controlled frequency and call us" — it prevents the urgent-care steroid roulette that produced this 5-day Q2H-with-no-plan situation.
- **Check the other eye at every visit.** HLA-B27 AAU alternates eyes between episodes; a quiet-looking fellow eye can still be the next flare site, and documenting baseline cells there saves arguments later.`,
        upvotes: 17,
        downvotes: 0,
        clinicalPearlsCited: ['Written flare action plans reduce urgent-care steroid mismanagement in recurrent AAU.'],
        comments: [],
      },
    ],
  },

  // topic-clfit
  {
    id: 'q-clfit-1',
    title: 'Center-near multifocal soft lens: dominant-eye distance blur after 1 week of adaptation. Do you increase D Add power or switch the near-center design?',
    content: `45-year-old emerging presbyope, -1.25 OU, fitted with a popular center-near daily multifocal about 10 days ago.

Current status: near VA 20/20 OU at 40cm with excellent reading stamina, but the DOMINANT eye gives 20/25- distance vision with a soft "smoky" quality that annoys her most while driving. Non-dominant eye distance is acceptable (20/20-). Photopic pupil ~4.2mm. She is mildly myope, so distance blur is noticed more than in the average presbyope.

Do you:
1. Add +0.25D to the distance (D) add power in the dominant eye and re-check?
2. Step the D add DOWN even though near is the priority?
3. Switch the dominant eye to a center-distance design (modified monovision hybrid)?
4. Something else entirely?`,
    topicId: 'topic-clfit',
    topicName: 'Contact Lens Fitting',
    tags: ['Multifocal', 'Presbyopia', 'Center-Near', 'Dominant Eye', 'Fitting'],
    author: OTHER_DOCTORS[6], // Dr. Jonathan Reyes
    createdAt: '6 hours ago',
    upvotes: 58,
    downvotes: 0,
    answersCount: 2,
    viewsCount: 760,
    isFollowed: false,
    isBookmarked: false,
    isStudentFriendly: true,
    urgency: 'routine',
    clinicalData: {
      patientAgeSex: '45-year-old Female',
      visualAcuity: 'Distance 20/25- OD (dominant), 20/20- OS; Near 20/20 OU @ 40cm',
      intraocularPressure: '15 mmHg OU',
      chiefComplaint: 'Smoky distance blur in dominant eye while driving after 10 days of multifocal wear',
      instrumentUsed: 'Pupil gauge (photopic 4.2mm) + over-refraction',
    },
    answers: [
      {
        id: 'ans-clf1-1',
        questionId: 'q-clfit-1',
        author: OTHER_DOCTORS[4], // Dr. Raj Patel
        createdAt: '4 hours ago',
        content: `Before touching add powers, rule out the freebies: do a **loose-lens over-refraction on the dominant eye**. Ten days in, a residual -0.25 sph on the D eye is the most common cause of exactly this complaint, and bumping the base curve/power fixes it without touching the optics.

If the OR is plano, then my hierarchy:
1. **+0.25D MORE minus on the D add** (i.e. reduce D add by one step). In center-near designs the dominant eye carries the distance load, and you can usually sacrifice one add step there while the non-dominant eye still carries near — the binocular system tolerates it far better than patients fear.
2. **Check the scotopic pupil.** At 4.2mm photopic she is fine, but if her scotopic pupil is 6mm+ (night driver!), a center-near optic zone creates nighttime halo/ghosting that no add tweak fixes — that is a design-switch indicator, not a power indicator.
3. **Hybrid approach last**: center-distance lens on the dominant eye + center-near on the non-dominant eye. It works, but expect 2-3 weeks of binocular re-adaptation.

Adaptation warning: do not let her "push through" more than 2 weeks of dominant-eye distance blur — dissatisfaction after that point rarely self-resolves.`,
        upvotes: 33,
        downvotes: 0,
        isAcceptedAnswer: true,
        clinicalPearlsCited: [
          'Over-refract before re-fitting: residual -0.25 sph on the dominant eye mimics multifocal add error.',
          'Scotopic pupil ≥6mm in a symptomatic night driver is a design-switch indicator, not a power tweak.',
        ],
        comments: [],
      },
      {
        id: 'ans-clf1-2',
        questionId: 'q-clfit-1',
        author: CURRENT_USER,
        createdAt: '1 hour ago',
        content: `Adding one pre-check to the excellent algorithm above: **verify lens centration and movement first**. A center-near lens that sits 0.5mm high decenters the near zone off the visual axis and produces exactly this dominant-eye distance smokiness — and it looks like an "add problem" at the phoropter. Re-mark the optic zone position with the lens on-eye under white light before you change a single power.`,
        upvotes: 21,
        downvotes: 0,
        clinicalPearlsCited: ['A high-riding center-near multifocal mimics dominant-eye add error; verify on-eye optic zone centration first.'],
        comments: [],
      },
    ],
  },

  // topic-kconus
  {
    id: 'q-kconus-1',
    title: 'Kmax 55.0 → 56.4D in 12 months with thinnest pachymetry 412µm in a 19-year-old. Epi-on or epi-off cross-linking?',
    content: `19-year-old male, bilateral keratoconus, recently confirmed progressing.

Pentacam OD: Kmax 56.4D (55.0D twelve months ago = +1.4D/yr), thinnest point 412µm, posterior elevation +45µm at the thinnest point, PPS clearly abnormal. BSCVA still 20/25 with rigid lens over-refraction. AS-OCT shows stromal thinning without scarring, no hydrops history. Admitted heavy eye rubbing — counseled repeatedly, still catches himself.

For the CXL-experienced colleagues:
1. Epi-off (Dresden) vs epi-on for this thinness — does 412µm change your protocol (hypotonic riboflavin)?
2. Expected visual trajectory post-CXL — when do you introduce/continue RGP/scleral wear?
3. Any role for simultaneous Intacs at this stage?`,
    topicId: 'topic-kconus',
    topicName: 'Keratoconus & Cross-Linking',
    tags: ['Keratoconus', 'CXL', 'Kmax', 'Pentacam', 'Progression'],
    author: OTHER_DOCTORS[2], // Dr. Sarah Jenkins
    createdAt: '10 hours ago',
    upvotes: 121,
    downvotes: 2,
    answersCount: 1,
    viewsCount: 1620,
    isFollowed: true,
    isBookmarked: true,
    savedFolder: 'Cornea Board Cases',
    urgency: 'case-consult',
    clinicalData: {
      patientAgeSex: '19-year-old Male',
      visualAcuity: 'OD: 20/40 uncorrected, 20/25 with RGP over-refraction',
      intraocularPressure: '16 mmHg OU',
      chiefComplaint: 'Two spectacle Rx changes in one year, increasing ghosting at night',
      instrumentUsed: 'Pentacam HR + AS-OCT',
      medicalHistory: 'Atopic dermatitis, chronic eye rubbing (counseled), no ocular surgery',
    },
    answers: [
      {
        id: 'ans-kcx1-1',
        questionId: 'q-kconus-1',
        author: OTHER_DOCTORS[3], // Dr. Tariq Al-Mansoor
        createdAt: '7 hours ago',
        content: `This is a textbook treating case: **documented progression (+1.4D Kmax/year) at age 19 with 412µm thinnest — cross-link, do not watch.**

**Protocol choice:** With 412µm, standard epi-off Dresden (which requires ≥400µm stromal bed after epithelium removal) is borderline — after epi removal you may drop to ~390µm. The evidence-supported options:
- **Epi-off with hypotonic riboflavin 0.1%** (pre-treated until stroma swells >400µm) — the classic modification for thin corneas, with Leipzig cohort data showing equivalent stiffening.
- **Epi-on (transepithelial)** with enhanced riboflavin delivery — gentler surface course, but meta-analyses show slightly lower stiffening effect; I reserve it for very thin or non-compliant-healing corneas.

My pick for a 19-year-old: epi-off + hypotonic protocol, UV 9mW/cm² accelerated or 3mW standard depending on the surgeon's platform experience.

**On Intacs:** not simultaneous. Add segments only if, 6+ months post-CXL, BSCVA in glasses remains poor and topography still shows unacceptable asymmetry — CXL stabilizes, Intacs reshape.

**Co-mgmt pearls:** keep the RGP/scleral fit going (CXL does not correct vision), expect a 1-month surface-healing window with the CXL-induced haze period, and make eye-rubbing cessation a documented treatment goal — CXL on a cornea that keeps getting rubbed is fighting a losing battle. His atopic dermatitis referral may do more for his cornea than any laser.`,
        upvotes: 78,
        downvotes: 1,
        isAcceptedAnswer: true,
        isPeerEndorsed: true,
        clinicalPearlsCited: [
          'Documented Kmax progression >1D/year in a teenager is a CXL indication, regardless of good BSCVA.',
          'Hypotonic riboflavin epi-off is the standard modification when the stromal bed approaches the 400µm Dresden limit.',
        ],
        comments: [
          {
            id: 'c-kcx1-1',
            author: CURRENT_USER,
            content: 'Seconding the hypotonic epi-off choice at this pachymetry. From the OD chair: pre-op topography ON and OFF RGP needs a 2-week lens hiatus for accurate mapping — worth scheduling now.',
            createdAt: '3 hours ago',
            likes: 14,
            isLiked: true,
          },
        ],
      },
    ],
  },

  // topic-bvvt
  {
    id: 'q-bvvt-1',
    title: '9-year-old with symptomatic convergence insufficiency: NPC 14cm break, PFV blur 14/20/8Δ. Office-based VT or home pencil push-ups first?',
    content: `9-year-old boy, fourth grade, referred for "skips lines and headaches after 20 minutes of reading".

Findings: near exophoria 14Δ, NPC break 14cm (recovery 20cm), PFV at near blur 14Δ / break 20Δ / recover 8Δ, accommodation amplitudes normal for age, stereo 40 arcsec. CISS (Convergence Insufficiency Symptom Survey) score 36 — clearly symptomatic. No refractive error worth correcting (+0.50 OU).

The parents have read about "eye exercises online" and want the cheapest route; our schedule has VT openings in ~3 weeks.

Given the evidence base:
1. Is home pencil push-up therapy alone defensible, or should I insist on office-based VT with home reinforcement?
2. What does a realistic 12-week protocol look like (in-office frequency + home minutes/day)?
3. Which outcome measures do you re-check and at what intervals to justify continued therapy?`,
    topicId: 'topic-bvvt',
    topicName: 'Binocular Vision & VT',
    tags: ['Convergence Insufficiency', 'Vision Therapy', 'CITT', 'NPC', 'PFV'],
    author: OTHER_DOCTORS[7], // Dr. Maya Lin
    createdAt: '1 day ago',
    upvotes: 47,
    downvotes: 0,
    answersCount: 1,
    viewsCount: 690,
    isFollowed: false,
    isBookmarked: false,
    isStudentFriendly: true,
    trainingLevel: 'student-friendly',
    urgency: 'routine',
    clinicalData: {
      patientAgeSex: '9-year-old Male',
      visualAcuity: '20/20 OU at distance and near',
      intraocularPressure: 'Normal, age-appropriate',
      chiefComplaint: 'Headaches and line-skipping after 20 minutes of near work; CISS score 36',
      instrumentUsed: 'Von Graefe phorias, RPM prism bar, Bernell WI kit',
      medicalHistory: 'Full-term birth, no ADHD dx, no prior vision therapy',
    },
    answers: [
      {
        id: 'ans-bvv1-1',
        questionId: 'q-bvvt-1',
        author: OTHER_DOCTORS[6], // Dr. Jonathan Reyes
        createdAt: '20 hours ago',
        content: `The CITT trials settle this one: **office-based vergence/accommodative therapy with home reinforcement is the evidence-based standard** — it achieved normalized NPC and PFV in ~73% of children at 12 weeks, vs ~33-43% for home pencil push-ups alone (CITT Study Group, Arch Ophthalmol 2008; CITT-ART NEJM 2019 for the symptom outcomes).

**Realistic protocol:**
- In-office: 60-minute sessions, 1×/week, 12 weeks.
- Home: 15-20 minutes/day, 5 days/week — vary it (Brock string, aperture rule, tranaglyph/computer vergence) so he does not plateau.
- First 4 visits: motor milestones (NPC <6cm break, PFV break ≥30Δ base-out). Weeks 5-8: integration with saccades and accommodation. Weeks 9-12: real-world reading loads.

**Outcome re-checks every 4 visits:** NPC break/recovery, PFV blur/break/recovery at near, near phoria, CISS score. The CISS drop (expect >10 points) is what convinces parents the fee is worth it.

**Counseling line for the cost question:** pencil push-ups are not wrong, they are just under-dosed — think of office VT as physical therapy with a coach, and home work as the daily reps between sessions. Given his CISS of 36 and near exophoria of 14Δ, he is squarely the phenotype that fails home-only programs.`,
        upvotes: 29,
        downvotes: 0,
        isAcceptedAnswer: true,
        isStudentContribution: false,
        clinicalPearlsCited: [
          'CITT: office-based vergence therapy + home reinforcement normalizes NPC/PFV in ~73% at 12 weeks vs ~40% for home pencil push-ups.',
          'Re-measure NPC, PFV, phoria and CISS every 4 visits to justify continued therapy.',
        ],
        comments: [],
      },
    ],
  },

  // topic-strab
  {
    id: 'q-strab-1',
    title: '5-year-old anisometropic amblyopia: 20/60 OD after 6 weeks of full-time glasses. Patching 2h/day vs atropine 0.05% — which do you start first?',
    content: `5-year-old girl, first spectacle correction prescribed 6 weeks ago: R +5.50 -1.00 x 180, L +1.25. Wearing habits good (parent tracks daily).

Current acuities (Allen cards / HOTV matching): OD 20/60, OS 20/20. Fixation OU central steady. No strabismus on cover test at distance or near. Fundus normal OU.

The family travels frequently for work and grandma does childcare 3 days a week — adherence to a 2-hour daily patch is going to be inconsistent, though they are motivated.

PEDIG data suggests both work. How do you choose?
1. Patch 2h/day vs atropine 0.05% daily vs weekend-only atropine — what is your first-line pick at this acuity level and why?
2. How much more refractive adaptation do you allow before escalating (is 6 weeks enough)?
3. Recheck interval and what VA gain per cycle tells you the treatment is working?`,
    topicId: 'topic-strab',
    topicName: 'Strabismus & Amblyopia',
    tags: ['Amblyopia', 'Anisometropic', 'Patching', 'Atropine', 'PEDIG'],
    author: OTHER_DOCTORS[5], // Dr. Priya Sharma
    createdAt: '1 day ago',
    upvotes: 39,
    downvotes: 0,
    answersCount: 1,
    viewsCount: 540,
    isFollowed: false,
    isBookmarked: false,
    isStudentFriendly: true,
    urgency: 'routine',
    clinicalData: {
      patientAgeSex: '5-year-old Female',
      visualAcuity: 'OD: 20/60 (HOTV matching), OS: 20/20',
      intraocularPressure: 'Normal OU',
      chiefComplaint: 'Reduced right acuity found at school screening, now in full-time glasses x6 weeks',
      instrumentUsed: 'HOTV matching cards + Teller/fixation behavior',
      medicalHistory: 'Full-term, no developmental concerns, no strabismus',
    },
    answers: [
      {
        id: 'ans-str1-1',
        questionId: 'q-strab-1',
        author: OTHER_DOCTORS[0], // Dr. Marcus Chen
        createdAt: '22 hours ago',
        content: `Nice work letting the glasses work first — **do not escalate yet.** Refractive adaptation for anisometropic amblyopia continues for 12-16+ weeks; PEDIG's own cohort showed a meaningful share of 3-7 year olds gaining 2+ lines from glasses alone by week 18. I recheck at 6-week intervals and only treat what is left after ~4 months of full-time wear.

**When you do escalate, pick by adherence, not by efficacy:**
- Patching 2h/day and daily atropine 0.05% produce statistically equivalent outcomes for moderate amblyopia (PEDIG ATS-1), and weekend-atropine performs similarly for mild-moderate (ATS-4).
- At 20/60 (moderate range) with this family's travel schedule, **atropine 0.05% daily wins on logistics**: no sticker charts across time zones, works whether grandma remembers or not, and school do not need to know. Watch for light sensitivity and explain the 4-6 week lag before VA moves.
- If they prefer patching, prescribe it as "2 hours in ONE contiguous block at home" — fragmented dosing loses the effect.

**Cycle structure:** recheck every 6-8 weeks; expect ≥1 line per cycle. Two consecutive cycles with <1 line gain = switch modality or interrogate adherence. Stop when OD is within 1 line of OS or plateaus across two full cycles; maintain with part-time atropine/patch weekends for 3-6 months to prevent regression.`,
        upvotes: 26,
        downvotes: 0,
        isAcceptedAnswer: true,
        isPeerEndorsed: true,
        clinicalPearlsCited: [
          'Allow 12-16 weeks of full-time glasses before treating residual anisometropic amblyopia.',
          'PEDIG ATS-1: 2h daily patching ≈ daily atropine 0.05% for moderate amblyopia — choose by adherence profile.',
        ],
        comments: [],
      },
    ],
  },

  // topic-refractive
  {
    id: 'q-refractive-1',
    title: '28-year-old -7.50D with CCT 498µm and normal Pentacam: is PRK with mitomycin-C safer than SMILE here? Co-mgmt consensus?',
    content: `28-year-old software engineer wanting refractive surgery. Rx: -7.50 -0.75 x 170 OD, -7.25 -0.50 x 10 OS, stable ≥3 years. CCT 498µm OU, Pentacam normal posterior elevation, no forme fruste ectasia markers (no IS/A > 1, no inferior steepening). Mild asymptomatic dry eye (OSDI 8, TBUT 7s).

The surgical center quotes him LASIK and SMILE; my instinct says the thin cornea + high myopia combination changes the conversation.

For the co-mgmt ODs and the surgeons here:
1. With 498µm and -7.50D, does PRK + MMC beat SMILE on tissue budget, or am I overthinking it?
2. What residual stromal bed / percent-tissue-altered numbers do you use as hard gates?
3. Post-op protocol expectations for the comanaging OD: drop sequence, haze surveillance with MMC, dry eye management?`,
    topicId: 'topic-refractive',
    topicName: 'Refractive Surgery Co-Mgmt',
    tags: ['PRK', 'SMILE', 'LASIK', 'CCT', 'Ectasia Risk', 'MMC'],
    author: OTHER_DOCTORS[8], // Dr. Chloe Bennett
    createdAt: '2 days ago',
    upvotes: 73,
    downvotes: 1,
    answersCount: 2,
    viewsCount: 1210,
    isFollowed: false,
    isBookmarked: false,
    urgency: 'case-consult',
    clinicalData: {
      patientAgeSex: '28-year-old Male',
      visualAcuity: '20/20 best-corrected OU',
      intraocularPressure: '14 mmHg OU',
      chiefComplaint: 'Wants freedom from -7.50D glasses; contact lens intolerance',
      instrumentUsed: 'Pentacam HR, Oculus Keratograph 5M, Topolyser',
      medicalHistory: 'Mild dry eye (OSDI 8), no FKD history, stable Rx x3 years',
    },
    answers: [
      {
        id: 'ans-ref1-1',
        questionId: 'q-refractive-1',
        author: OTHER_DOCTORS[3], // Dr. Tariq Al-Mansoor
        createdAt: '1 day ago',
        content: `You are not overthinking it — this is exactly the profile where the tissue math decides.

**Run the gates:**
- **RSB (residual stromal bed) ≥ 300µm** after ablation + flap/side-cut. For -7.50D: a ~135µm central ablation (6.5mm zone) + 110µm LASIK flap leaves an RSB that violates the gate on a 498µm cornea. LASIK is out.
- **PTA (percent tissue altered) ≤ 40%**, ideally < 38%. (CCT - ablation depth) / CCT. Ablating ~135µm on 498µm = 27% from ablation alone; add any flap and you are past 40%.

**PRK + MMC vs SMILE:** both preserve tissue (no flap), and both are defensible here:
- PRK + MMC 0.02% × 30-60s gives predictable outcomes to -7.50D with haze control; healing is the trade-off (3-5 days epithelial pain, months of steroid taper).
- SMILE keeps Bowman layer intact and dries out less, but at -7.50D the cap thickness math is tighter and enhancement options later are harder.

My checklist for him: **PRK + MMC as first choice at 498µm**, SMILE as acceptable second if he prioritizes comfort, surface-ablation-only surgeon if the SMILE platform quote looks salesy. And pre-treat the dry eye regardless — 7s TBUT will drift worse for 3-6 months post-op.`,
        upvotes: 44,
        downvotes: 0,
        isAcceptedAnswer: true,
        isPeerEndorsed: true,
        clinicalPearlsCited: [
          'PTA (percent tissue altered) ≤ 40% and RSB ≥ 300µm are the hard ectasia gates for high myopia on thin corneas.',
          'At CCT 498µm with -7.50D, surface ablation with MMC avoids the flap and preserves the tissue budget.',
        ],
        comments: [
          {
            id: 'c-ref1-1',
            author: OTHER_DOCTORS[1], // Dr. Amara Thorne
            content: 'Would add: repeat topography at two different machines before signing off — single-device Pentacam screening misses what dual-device screening catches in borderline normals.',
            createdAt: '1 day ago',
            likes: 11,
            isLiked: false,
          },
        ],
      },
      {
        id: 'ans-ref1-2',
        questionId: 'q-refractive-1',
        author: CURRENT_USER,
        createdAt: '18 hours ago',
        content: `From the co-managing chair, here is the protocol I hand surgeons for PRK+MMC at this correction:

- **Day 0-5**: bandage CL, OFX QID, pred forte Q2H-QID per surgeon, oral analgesia planned BEFORE day 1.
- **Week 1-4**: steroid step-down (e.g. QID → TID → BID) with weekly IOP checks — steroid responders show up in week 2-3.
- **Haze surveillance**: months 1-3 at every visit; grade haze, never let a taper stall if haze grade rises. MMC makes late haze rare but not zero at -7.50D.
- **Dry eye**: start preservative-free ATs pre-op, add punctal plugs if TBUT drops <5s post-op.

Counsel him on the realistic timeline: legal driving vision day 4-7, good vision by week 2-3, stable refraction month 2-3. If he wants "fast and forgettable", that argument belongs to SMILE, not PRK.`,
        upvotes: 25,
        downvotes: 0,
        clinicalPearlsCited: ['Steroid-response IOP checks are weekly through the month 1-4 PRK taper; MMC does not exempt the cornea from haze surveillance at high corrections.'],
        comments: [],
      },
    ],
  },

  // topic-oct
  {
    id: 'q-oct-1',
    title: 'Superior RNFL wedge defect that vanished on repeat scan 2 weeks later — how do you standardize artifact rejection in myopic tilted discs?',
    content: `58-year-old myope (-6.50 OU), tilted discs with peripapillary atrophy. Screening Cirrus OCT showed a superior wedge RNFL defect OD (SP-RNFL flagged, GCA normal). Two weeks later, same machine, same tech: the defect is gone and RNFL is borderline-normal. 10-2 VF full and reliable both visits.

This is the third time this year our office has been burned by a "wedge" that was really segmentation/PPA artifact in a tilted disc.

How do you structure artifact rejection so it is consistent across techs:
1. What minimum QC checklist do you run before treating any OCT defect as real (signal strength, segmentation lines, PPA inclusion, eye tracking)?
2. Do you demand VF correlation before acting, or can OCT defects be actionable alone in glaucoma suspects?
3. Any device-specific tips (Cirrus vs Spectralis vs Optovue) for tilted myopic discs?`,
    topicId: 'topic-oct',
    topicName: 'OCT & Imaging',
    tags: ['OCT', 'RNFL', 'Artifact', 'Tilted Disc', 'Myopia', 'Glaucoma'],
    author: OTHER_DOCTORS[1], // Dr. Amara Thorne
    createdAt: '3 days ago',
    upvotes: 88,
    downvotes: 0,
    answersCount: 1,
    viewsCount: 980,
    isFollowed: true,
    isBookmarked: false,
    isStudentFriendly: true,
    urgency: 'grand-rounds',
    clinicalData: {
      patientAgeSex: '58-year-old Male',
      visualAcuity: '20/20 OU with correction',
      intraocularPressure: '17 mmHg OU, CCT 512µm',
      chiefComplaint: 'Routine glaucoma suspect screening, asymptomatic',
      instrumentUsed: 'Cirrus HD-OCT 5000 (x2 scans, 2 weeks apart) + HFA 10-2',
      medicalHistory: '-6.50D myopia OU, tilted discs, PPA OU, no family glaucoma history',
    },
    answers: [
      {
        id: 'ans-oct1-1',
        questionId: 'q-oct-1',
        author: CURRENT_USER,
        createdAt: '2 days ago',
        content: `Built this checklist after our own tilted-disc false-positive war. **No OCT defect is actionable until every line passes:**

1. **Signal strength ≥ 7/10 (Cirrus) / ≥ 20dB (Spectralis)** — below that, RNFL maps are fiction.
2. **Segmentation overlay ON**: confirm the RNFL boundary trace follows the actual nerve fiber layer, not the RPE of PPA or a vitreous traction strand. Misidentification at the disc margin is the #1 tilted-disc artifact.
3. **PPA inclusion check**: in myopic tilted discs the calculation ellipse often straddles gamma zone atrophy — shift it or mentally discount sectors that overlap PPA.
4. **Eye tracking / fixation check** — a blink or decentered scan produces sector dropout that mimics a wedge.
5. **Anatomic plausibility**: true defects respect the raphe and correlate with disc rim thinning on the same clock hour. "Defects" that stop at the PPA border or wrap oddly are usually artifact.

**On VF correlation:** for glaucoma suspects, I require either (a) confirmation on a second imaging modality (GCC asymmetrically thin at the matching location, or good quality post-mortem equivalent: red-free photo showing RNFL bundle defect) or (b) a matching VF defect before I label anything glaucomatous. Structure-function agreement is what separates disease from dust.

**Device tips:** Spectralis eye-tracking + ART mean of ~16 scans is dramatically more reproducible on tilted discs; with Cirrus, re-run with the optic disc scan centered manually rather than relying on auto-centering. And keep a one-page "artifact library" printout in the tech room — the FAO/ASFO and manufacturer atlases have excellent examples to train pattern recognition.`,
        upvotes: 52,
        downvotes: 0,
        isAcceptedAnswer: true,
        isPeerEndorsed: true,
        clinicalPearlsCited: [
          'In tilted myopic discs, calculation ellipses straddling peripapillary atrophy manufacture phantom RNFL wedge defects.',
          'Label OCT defects as glaucomatous only with structure-function agreement or cross-modality confirmation.',
        ],
        comments: [],
      },
    ],
  },

  // topic-ai
  {
    id: 'q-ai-1',
    title: 'Autonomous AI diabetic retinopathy screening in our primary-care network: who owns the liability when patients fail to return for dilated exams?',
    content: `Our healthcare system is piloting an autonomous AI DR screening device (FDA-cleared, no-dilation, no-human-read) in three primary care clinics. The device refers ~12% for dilated examination and is ungradable in ~9% (cataract, small pupils).

The workflow gap that has everyone nervous: the device result is documented in the PCP chart, but there is no closed loop ensuring the referred/ungradable patients actually reach an eye care provider. Legal says "follow the FDA labeling"; operations says "send a letter"; I say we need a real protocol.

For those who have deployed this:
1. What handoff protocol do you use for AI-referred and ungradable patients (who owns the follow-up — PCP, screening program, or the eyecare provider)?
2. What documentation protects the comanaging OD if a patient is lost to follow-up and presents with PDR two years later?
3. How do you audit the loop (metrics, cadence)?`,
    topicId: 'topic-ai',
    topicName: 'AI & Digital Health',
    tags: ['AI', 'Autonomous DR', 'TeleOptometry', 'Liability', 'Care Coordination'],
    author: OTHER_DOCTORS[6], // Dr. Jonathan Reyes
    createdAt: '2 days ago',
    upvotes: 54,
    downvotes: 0,
    answersCount: 1,
    viewsCount: 720,
    isFollowed: false,
    isBookmarked: false,
    isStudentFriendly: true,
    urgency: 'routine',
    clinicalData: {
      patientAgeSex: 'Population-level workflow question (no single patient)',
      chiefComplaint: 'Designing a closed-loop referral protocol for autonomous AI DR screening',
      instrumentUsed: 'FDA-cleared autonomous AI DR camera (2-site pilot, planned 3-site)',
      medicalHistory: 'Network of 3 primary care clinics, ~4,100 eligible diabetic patients/yr',
    },
    answers: [
      {
        id: 'ans-ai1-1',
        questionId: 'q-ai-1',
        author: OTHER_DOCTORS[8], // Dr. Chloe Bennett
        createdAt: '1 day ago',
        content: `We run this exact program. The answer that protects everyone: **the screening program owns the loop, and "ownership" must be a named role, not a department.**

**Protocol that survived our legal review:**
1. **Same-day disposition, not a letter.** The AI-referred or ungradable patient leaves the PCP visit with a booked eye-care appointment (on-site scheduler) or a documented refusal. A letter with an 800 number is how PDR cases happen.
2. **The FDA labeling is your floor, not your protocol.** The DeNovo labeling says positive/ungradable → dilated exam; it does not define WHO ensures that happens. Your policy document must: name the responsible party (screening program care coordinator), the follow-up window (e.g. 90 days), and the escalation ladder (call at 2 weeks, certified letter at 4 weeks, PCP escalation at 8 weeks).
3. **Documentation that protects the OD:** every encounter charted as "referred from autonomous AI DR screening, result [X], appointment [date/refusal documented], patient counseled on risk of vision loss without exam." A signed patient-acknowledgment of the referral for refusals. This is what makes a 2-year-later PDR case defensible — the record shows a functioning loop and an informed patient who opted out.
4. **Audit metrics:** loop-closure rate (referred patients with completed exam / all referrals), ungradable rate, time-to-exam median. Review monthly at first, quarterly once stable. Loop closure <80% is a program failure regardless of the AI sensitivity.

One more: put the OD community in the referral path early. If every AI-positive lands with "the nearest retina clinic in 6 weeks", patients float. Contract the overflow to local ODs who dilate same-month.`,
        upvotes: 38,
        downvotes: 0,
        isAcceptedAnswer: true,
        isPeerEndorsed: true,
        clinicalPearlsCited: [
          'FDA labeling defines the follow-up requirement, not the owner; a named care-coordinator role and escalation ladder close the loop.',
          'Loop-closure rate below 80% is a program failure regardless of AI algorithm sensitivity.',
        ],
        comments: [],
      },
    ],
  },

  // topic-retinaimaging
  {
    id: 'q-retinaimaging-1',
    title: 'Do you still order 7-field ETDRS for referral letters, or has ultra-widefield fully replaced it in your DR grading workflow?',
    content: `Our clinic shoots ultra-widefield (Optos) on every diabetic patient and grades DR from those. Two retina groups in our area disagree: one accepts UWF grading in referrals, the other still asks for "7-field ETDRS comparable" documentation before triaging.

Where does the evidence and practice actually land in 2025?
1. Is UWF alone adequate for DR severity grading in referral letters?
2. Do peripheral lesions on UWF change management (anti-VEGF timing, follow-up interval), or just look scary?
3. For those who do both: what is your actual workflow (UWF + macula OCT, with 7-field only for specific indications)?`,
    topicId: 'topic-retinaimaging',
    topicName: 'Retina Imaging Roundtable',
    tags: ['UWF', 'ETDRS', 'Diabetic Retinopathy', 'Grading', 'Referral'],
    author: OTHER_DOCTORS[0], // Dr. Marcus Chen
    createdAt: '4 days ago',
    upvotes: 61,
    downvotes: 0,
    answersCount: 2,
    viewsCount: 810,
    isFollowed: false,
    isBookmarked: false,
    urgency: 'routine',
    answers: [
      {
        id: 'ans-rim1-1',
        questionId: 'q-retinaimaging-1',
        author: OTHER_DOCTORS[1], // Dr. Amara Thorne
        createdAt: '3 days ago',
        content: `The honest answer: **UWF is the better screening instrument, ETDRS-7 is still the better grading language.**

**On adequacy:** UWF (with STE detection) documents peripheral lesions in ~10-15% of eyes graded ETDRS-mild-moderate that would be missed on 7-field — but the ETDRS severity scale itself is built on 7 fields. So for a referral letter that a retina surgeon will triage on, I report ETDRS-level severity from the posterior pole PLUS a narrative line about peripheral findings ("peripheral NVE suspected at 9 o'clock periphery OD"). That sentence is what changes triage.

**Do peripheral lesions change management?** Yes — peripheral non-perfusion and NVE territory can shift a routine 12-month follow-up to 4-6 months or trigger anti-VEGF conversation earlier. "Scary" is only useful when it changes an interval.

**My actual workflow:** UWF color + autofluorescence on every diabetic, macula OCT on every diabetic (MEd3 is a stronger predictor of treatment need than any photo), and 7-field or UWF-steered simulated ETDRS fields only for: referral letters where the receiving surgeon requests it, disc edema workups, and quarterly-per-protocol studies. This hybrid documents everything without pretending the old protocol disappeared.`,
        upvotes: 31,
        downvotes: 0,
        isAcceptedAnswer: true,
        clinicalPearlsCited: [
          'UWF documents peripheral lesions in 10-15% of eyes that 7-field ETDRS misses, but ETDRS remains the severity language retina surgeons triage on.',
          'Macular OCT (center point thickness / DME detection) is a stronger treatment-need predictor than any fundus photograph.',
        ],
        comments: [],
      },
      {
        id: 'ans-rim1-2',
        questionId: 'q-retinaimaging-1',
        author: OTHER_DOCTORS[7], // Dr. Maya Lin
        createdAt: '3 days ago',
        content: `Co-sign. One practical add: whatever you send, attach BOTH the UWF montage AND a 3x3 / 6x6 macula OCT cube report. In our network the retina group's triage nurse converts every referral to "yes/no/when" from two things — CMT with DME status and any neovascular signal. Severity scale debates dissolve when those two numbers are on page 1.`,
        upvotes: 18,
        downvotes: 0,
        clinicalPearlsCited: ['Referral triage is driven by CMT/DME status + neovascular signal — put both on page 1 of the letter.'],
        comments: [],
      },
    ],
  },

  // topic-billing
  {
    id: 'q-billing-1',
    title: 'Diabetic follow-up with refraction: 92004 vs 92002 + separate E/M — how do you document medical necessity for the macula OCT?',
    content: `Medicare patient, type 2 DM, returns for 6-month diabetic eye exam. Visit includes: refraction (Rx changed), dilated exam showing mild NPDR stable vs last year, and I want to bill macula OCT for the first time because of a subtle parafoveal thickness change.

My billing team split on:
1. Can I bill 92004 (comprehensive + dilation) AND an E/M for medical decision making in the same visit? Or is 92002 the right code when the exam is problem-focused?
2. What documentation actually supports medical necessity for the OCT (ICD-10, wording in the plan)?
3. How do you handle the refraction charge — ABN every time, or is there a cleaner workflow?`,
    topicId: 'topic-billing',
    topicName: 'Practice Management & Billing',
    tags: ['CPT', '92004', 'Medical Necessity', 'Medicare', 'OCT Billing', 'ABN'],
    author: OTHER_DOCTORS[6], // Dr. Jonathan Reyes
    createdAt: '3 days ago',
    upvotes: 83,
    downvotes: 0,
    answersCount: 1,
    viewsCount: 1140,
    isFollowed: false,
    isBookmarked: true,
    savedFolder: 'Billing Playbook',
    urgency: 'routine',
    answers: [
      {
        id: 'ans-bil1-1',
        questionId: 'q-billing-1',
        author: OTHER_DOCTORS[8], // Dr. Chloe Bennett
        createdAt: '2 days ago',
        content: `This is the most-audited visit type in optometry, so let's be precise.

**1. Code pairing.** You cannot pair 92004 (or 92002) with a separate E/M for the same date *when the comprehensive code already includes evaluation of the presenting problem* — payers deny that as bundled. The clean structure when a medical decision is made: **skip 9200x entirely and bill the E/M level you actually performed (99213/99214) with modifier -25 if anything minor-procedure-ish accompanies it**, plus the OCT. The refraction-with-diabetic-exam is exactly a medical decision-making visit (stable chronic illness + data review), so 92004 vs E/M should be decided by what you DOCUMENT, and the E/M route pays better and survives audit when documentation matches.

**2. OCT medical necessity.** The diagnosis drives it: E11.3319 (T2DM with mild NPDR without macular edema, right eye) supports OCT when the plan states a *change*: "new parafoveal thickening question vs prior — OCT to evaluate for early DME." Medical necessity language = why this test on this date changes management, not "diabetic — routine OCT." Add the laterality specifics and reference the comparison study (date of prior exam/photo). "Routine diabetic monitoring" as the indication is the #1 denial trigger.

**3. Refraction charge.** The refraction (92015) is statutorily non-covered by Medicare — the ABN is your protection. Cleanest workflow: annual standing ABN signed at first diabetic visit of the year where the patient acknowledges refraction is non-covered + your fee; re-sign only when the fee changes. Keep a $0-tolerance habit: refraction never rides inside the E/M documentation, it is always its own line with its own consent trail.`,
        upvotes: 47,
        downvotes: 0,
        isAcceptedAnswer: true,
        isPeerEndorsed: true,
        clinicalPearlsCited: [
          'When medical decision making is performed, bill the E/M (9921x) + OCT instead of 92004 + E/M — the pairing is a bundled-service denial magnet.',
          'OCT medical necessity language must state the change in findings and how the test changes management; "routine monitoring" invites denial.',
        ],
        comments: [],
      },
    ],
  },

  // topic-students
  {
    id: 'q-students-1',
    title: 'First job offer: $85K base + 5% production vs pure 25% of collections — how do you actually model the break-even?',
    content: `Fourth year here with two offers on the table (different states, so cost of living differs, but let's compare the raw structures):

**Offer A:** $85,000 salary + 5% of personal production (collections) above $200K.
**Offer B:** Pure 25% of collections, no base, 60-day ramp guarantee of $1,500/week.

I keep hearing "new grads should take the base" but also that 25% is the real money. How do you:
1. Model expected collections for a new grad honestly (what % of a practice's annual collections does a new associate actually produce in year 1)?
2. Compute the break-even production where B beats A?
3. What contract terms matter more than the comp structure (non-compete radius, guarantee length, who owns the patient records, review cadence)?`,
    topicId: 'topic-students',
    topicName: 'Students & New Grads',
    tags: ['First Job', 'Contracts', 'Compensation', 'New Grad', 'Negotiation'],
    author: OTHER_DOCTORS[7], // Dr. Maya Lin
    createdAt: '5 days ago',
    upvotes: 129,
    downvotes: 0,
    answersCount: 2,
    viewsCount: 2100,
    isFollowed: true,
    isBookmarked: true,
    savedFolder: 'Career Planning',
    isStudentFriendly: true,
    trainingLevel: 'student-friendly',
    urgency: 'routine',
    answers: [
      {
        id: 'ans-stu2-1',
        questionId: 'q-students-1',
        author: CURRENT_USER,
        createdAt: '4 days ago',
        content: `Congrats on two offers — let's make this arithmetic instead of folklore.

**Step 1 — honest year-1 collections for an associate.** A supported new grad in a busy practice typically collects **$300K-$450K in year 1** (3-4 exam days/week, ~25-35 exams/week + optics + medical billing). Below $250K usually means the schedule was never filled — a practice problem, not a you problem.

**Step 2 — the break-even.** 
- Offer A at $350K collections: $85,000 + 5% × ($350K - $200K) = $85,000 + $7,500 = **$92,500**.
- Offer B at $350K: 25% × $350K = **$87,500**.
- B beats A when 0.25C > 92,500 → **C > $370K** (once A's bonus threshold is passed). Under ~$370K collections, the base offer wins every time; B only wins in a fast, well-booked satellite where you control your schedule.

**Step 3 — the terms that actually decide your life:**
1. **Non-compete radius & duration** (state-enforceability varies wildly; 5 miles can be a life sentence in a small city).
2. **Guarantee length & clawback** — is B's 60-day guarantee truly unconditional, or netted back out of later draws?
3. **Production definition** — collections vs net receipts vs adjusted; "collections after insurance write-offs AND refunds" is the honest one. Ask which exams, procedures and spectacle sales count toward your number.
4. **Schedule ownership** — who fills your canceled slots, and is your recall system yours?
5. **Review cadence** — a written 6-month production review with the practice owner is worth more than any percentage point.

One negotiation line that works: "I'll take the base structure if we add a written 6-month review tied to a production milestone." Both sides save face and you get momentum on paper.`,
        upvotes: 71,
        downvotes: 0,
        isAcceptedAnswer: true,
        isPeerEndorsed: true,
        clinicalPearlsCited: [
          'Break-even: pure 25% of collections beats $85K + 5%-above-$200K only above roughly $370K year-1 collections.',
          'Non-compete enforceability and the production definition (collections vs adjusted) decide more career outcomes than the headline percentage.',
        ],
        comments: [
          {
            id: 'c-stu2-1',
            author: OTHER_DOCTORS[7], // Dr. Maya Lin
            content: 'This is the exact framework I needed — the break-even math and the "who fills your canceled slots" clause are going straight into my negotiation notes.',
            createdAt: '3 days ago',
            likes: 19,
            isLiked: true,
          },
        ],
      },
      {
        id: 'ans-stu2-2',
        questionId: 'q-students-1',
        author: OTHER_DOCTORS[6], // Dr. Jonathan Reyes
        createdAt: '2 days ago',
        content: `Adding the tax/expense dimension the raw comparison misses: a pure-percentage offer has **no benefits floor**. Price out the package difference — health insurance premium share, CE allowance, licensure/DEA fees, 401k match — and subtract it from B's upside before comparing. In my state that bundle is worth $14-18K/yr; a "25% looks bigger" offer often isn't once you fund your own benefits.

Also: B's 60-day guarantee at $1,500/week = $18K runway, which is decent. Ask what happens in months 3-6 if builds are slower than expected — the dangerous part of no-base offers is the uncapped downside, not the capped guarantee.`,
        upvotes: 34,
        downvotes: 0,
        clinicalPearlsCited: ['Price the benefits floor (health, CE, retirement match) into any pure-percentage offer before comparing to a salaried structure.'],
        comments: [],
      },
    ],
  },

  // topic-optics
  {
    id: 'q-optics-1',
    title: '2.5Δ vertical imbalance at the reading level in an anisometropic PAL wearer — slab-off on which eye, and how much compensation?',
    content: `62-year-old successful PAL wearer for years, new anisometropia after cataract surgery IOL refresh: R -4.25 -1.00 x 180, L -0.75 sph. Segment drop to the reading level measures ~5mm below the distance OC.

Calculated induced vertical prism at the reading level (Prentice, ~0.6Δ per D of anisometropia per cm): about 2.1-2.5Δ base-down OD relative to OS — she now reports a "swimming floor" on stairs.

1. Do you slab-off the more minus (right) lens, and is a 60-70% compensation (1.5-1.75Δ) the right starting point vs full correction?
2. Reverse slab-off vs slab-off — when does each win?
3. Any PAL-specific caveats (which progressive designs tolerate slab-off best), or would you switch her to a dedicated near/office pair instead?`,
    topicId: 'topic-optics',
    topicName: 'Optics & Dispensing',
    tags: ['Slab-Off', 'Vertical Imbalance', 'Anisometropia', 'PAL', 'Prism'],
    author: OTHER_DOCTORS[2], // Dr. Sarah Jenkins
    createdAt: '6 days ago',
    upvotes: 44,
    downvotes: 0,
    answersCount: 1,
    viewsCount: 620,
    isFollowed: false,
    isBookmarked: false,
    isStudentFriendly: true,
    urgency: 'routine',
    clinicalData: {
      patientAgeSex: '62-year-old Female',
      visualAcuity: '20/20 OU corrected with new post-cataract Rx',
      chiefComplaint: 'Floor "swims" on stairs and reading drifts vertically since new IOLs',
      instrumentUsed: 'Lensmeter with seg-drop measurement (5mm below distance OC)',
      medicalHistory: 'Bilateral cataract extraction with monofocal IOLs this year',
    },
    answers: [
      {
        id: 'ans-opt1-1',
        questionId: 'q-optics-1',
        author: OTHER_DOCTORS[6], // Dr. Jonathan Reyes
        createdAt: '5 days ago',
        content: `Your Prentice math is right: 0.6Δ per diopter per cm × 3.5D difference × 0.5cm below OC ≈ **1.05Δ per eye, ~2.1Δ relative imbalance** at the reading level. She is symptomatic, so treat.

**Which eye:** slab-off creates base-up in the treated lens — you slab-off the lens carrying the **most minus** (or least plus) power, i.e. the right eye here, neutralizing the base-down that its reading region induces. Patient ends up balanced at near.

**How much:** full 2.1-2.5Δ compensation in a long-adapted PAL wearer is asking for adaptation trouble in the distance viewing area (you are altering the lens above the seg). Start at **~65% compensation (≈1.5Δ)** and reassess at 2 weeks. If she is happy but not fully comfortable, the second pair can go to 100%.

**Slab-off vs reverse slab-off:** classic slab-off (base-up at near) on the minus lens is the default. **Reverse slab-off (base-down at near, on the plus lens)** wins when the minus lens already needs a thick rounding or when you want to avoid the visible groove line in a premium PAL — cosmesis and the specific progressive design drive that call more than optics (both are optically equivalent at near).

**PAL caveats:** choose a design with a wide corridor and known slab-off tolerance (digital freeform slabs re-graded by the lab preserve the distance design better than legacy molds). Give the lab BOTH the amount AND the "compensate 65%" instruction in writing, and verify with a lensmeter at the reading level when the job lands — slab-off prism is the most commonly mis-filled specialty Rx in dispensing.

And yes — always offer the escape hatch: a dedicated office/near pair with zero imbalance solves stairs AND screen work, often for less than two slab-off jobs. Many patients end up wanting both.`,
        upvotes: 27,
        downvotes: 0,
        isAcceptedAnswer: true,
        clinicalPearlsCited: [
          'Slab-off goes on the most minus (or least plus) lens; start at ~65% of the calculated imbalance and titrate on the second pair.',
          'Classic and reverse slab-off are optically equivalent at near — corridor design and cosmesis decide which you order.',
        ],
        comments: [],
      },
    ],
  },

  // topic-cataract (hub seed for the surgical category's flagship)
  {
    id: 'q-cataract-1',
    title: 'Post-op day 2 after uncomplicated phaco: diffuse stromal haze with 1+ cell — DLK stage II? When do you call the surgeon tonight?',
    content: `68-year-old female, POD2 after routine phaco + monofocal IOL OD (surgery uneventful per the op note).

Exam: VA 20/60 (was 20/30 on day 1), diffuse white granular stromal haze in the inferior-intermediate periphery with wrinkling of the flap interface, 1+ cell and flare, no hypopyon, IOP 14 mmHg, no pain increase per patient. The surgical center is 90 minutes away and the surgeon reviews "routine" PODs asynchronously.

1. Where does this fall on the DLK staging (I-IV), and does the interface wrinkling bump it to stage II requiring escalation?
2. Is a same-day call justified at POD2 with good IOP, or is a 24-hour intensification + recheck defensible?
3. What does the intensified protocol look like (dose, duration) before the surgeon takes over?`,
    topicId: 'topic-cataract',
    topicName: 'Cataract & Surgical',
    tags: ['Cataract', 'DLK', 'Post-Op', 'Co-Management', 'Escalation'],
    author: OTHER_DOCTORS[4], // Dr. Raj Patel
    createdAt: '3 days ago',
    upvotes: 67,
    downvotes: 0,
    answersCount: 1,
    viewsCount: 890,
    isFollowed: false,
    isBookmarked: false,
    urgency: 'urgent',
    clinicalData: {
      patientAgeSex: '68-year-old Female',
      visualAcuity: 'OD: 20/60 (POD2), OS: 20/25',
      intraocularPressure: 'OD: 14 mmHg, OS: 16 mmHg',
      chiefComplaint: 'Increasing blur and mild foreign-body sensation OD since day after surgery',
      instrumentUsed: 'Slit lamp with high-mag interface evaluation',
      medicalHistory: 'T2DM (HbA1c 6.9%), no prior corneal disease, uneventful phaco per op note',
    },
    answers: [
      {
        id: 'ans-cat1-1',
        questionId: 'q-cataract-1',
        author: OTHER_DOCTORS[3], // Dr. Tariq Al-Mansoor
        createdAt: '2 days ago',
        content: `Interface wrinkling + diffuse granular haze = **stage II DLK. Call the surgeon today** — stage II is exactly the stage where same-day intensification prevents progression to stage III (suppuration-like central clumping) and permanent scarring. The 90-minute distance argues for earlier, not later, escalation because your escalation window is measured in hours, and steroid intensification must be confirmed as started.

**What you can do before the surgeon answers:**
1. Intensify prednisolone acetate 1% to **Q1H while awake + Q2H overnight** (or switch to difluprednate Q2H if the surgeon prefers) — document the exact time you started.
2. Cycloplege (cyclopentolate BID) for comfort and to prevent synechiae from the 1+ cell.
3. NO topical NSAIDs (corneal melt risk in active interface inflammation), no steroid taper of course.

**What the surgeon will want on the call:** VA trend (20/30 → 20/60), interface description (granular vs clumped), cell/flare grade, IOP, and your photos if the slit lamp has a camera — stage III decisions are made from those details.

**Recheck cadence once intensified:** daily until haze improves; if haze centralizes, cells jump, or pain escalates, that is stage III territory → surgical irrigation. The good news: stage II caught at POD2 with quiet IOP almost always resolves with medical intensification alone.`,
        upvotes: 39,
        downvotes: 0,
        isAcceptedAnswer: true,
        isPeerEndorsed: true,
        clinicalPearlsCited: [
          'Flap-interface wrinkling with diffuse granular haze at POD2 is stage II DLK — same-day surgeon escalation plus Q1H steroid intensification.',
          'Never add topical NSAIDs during active interface inflammation — corneal melt risk.',
        ],
        comments: [],
      },
    ],
  },
];
