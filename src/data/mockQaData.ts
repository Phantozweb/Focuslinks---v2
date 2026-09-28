import { QuestionTopic, ClinicalQuestion } from '../types';
import { CURRENT_USER, OTHER_DOCTORS } from './mockData';

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
];
