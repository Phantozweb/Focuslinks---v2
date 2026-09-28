import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft,
  Search,
  Activity,
  Lock,
  Zap,
  ArrowRight,
  Bookmark,
  Layers,
  ThumbsUp,
  MessageCircle,
  TrendingUp,
  Award,
  AlertTriangle,
  Lightbulb,
  Cpu,
  BookOpen,
  Filter,
  Check,
  ChevronDown,
  Info,
  Sliders,
  Scale,
  Globe,
  Handshake
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AboutPageProps {
  onBackToHome: () => void;
  onEnterApp: (destination?: 'feed' | 'gallery' | 'groups' | 'doctors') => void;
  initialTab?: GuideTab;
}

type GuideTab = 'beginner' | 'advanced' | 'tips' | 'playbooks' | 'faqs';

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToHome, onEnterApp, initialTab = 'beginner' }) => {
  const [activeGuideTab, setActiveGuideTab] = useState<GuideTab>(initialTab);
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const [faqSearch, setFaqSearch] = useState<string>('');
  const [activeFaqCat, setActiveFaqCat] = useState<string>('all');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  React.useEffect(() => {
    setActiveGuideTab(initialTab);
  }, [initialTab]);

  // Sample clinical case showcase
  const sampleCases = [
    {
      id: 'case-1',
      difficulty: 'Clinical Case',
      badge: 'Scleral Lens Landing',
      badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      title: 'Extreme 64D Apex Keratoconus Fitting',
      modality: 'AS-OCT Imaging',
      doctor: {
        name: 'Dr. Elena Vance, OD, FCOVD',
        avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=150',
        credentials: 'SUNY Optometry'
      },
      findings: 'Patient presenting with severe corneal thinning and Vogt\'s striae. Optimal sagittal clearance targeted to 250μm to prevent apical scarring.',
      concordanceScore: 98,
      likes: 24,
      comments: 6
    },
    {
      id: 'case-2',
      difficulty: 'Board Level',
      badge: 'Cobalt Dye Filter',
      badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      title: 'Dendritic Corneal Lesion (HSV Keratitis)',
      modality: 'Slit Lamp Fluorescein',
      doctor: {
        name: 'Dr. Richard Chen, OD, FAAO',
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150',
        credentials: 'UC Berkeley Optometry'
      },
      findings: 'Distinct terminal bulbing observed on staining. Prescribed Ganciclovir 0.15% ophthalmic gel 5x daily. Monitored for trophic thinning.',
      concordanceScore: 100,
      likes: 38,
      comments: 12
    }
  ];

  // FAQ and Support Page Data
  const faqData = [
    {
      id: 'faq-1',
      category: 'licensing',
      question: "How does FocusLinks verify my license if I practice in India or outside the US?",
      answer: "We support a highly flexible Universal Verification Framework. Since formal optometry registration is not universally formalized in India and many other regions, state council registration is NOT expected or required to register. You can activate your clinical profile using your college ID card, your B.Optom or M.Optom degree serial number, or clinical letterhead. Our clinical review board manual-vets these within 12 hours."
    },
    {
      id: 'faq-2',
      category: 'licensing',
      question: "Why does my account say 'Pending Verification' and how long does it take?",
      answer: "To ensure that FocusLinks remains a strictly clinical, advertising-free, noise-free sanctuary for real practitioners, every single registration undergoes strict licensing checks. Automatic database matches are instant; however, if you registered with regional, Indian academic degrees, or student college IDs, our board manual-vets the credentials. Vetting is highly responsive and typically takes under 12 hours."
    },
    {
      id: 'faq-3',
      category: 'licensing',
      question: "What is a 'Credential Sponsor Handshake' and how does it work?",
      answer: "A Credential Sponsor Handshake allows currently verified, active optometrists on FocusLinks to sponsor and instantly vouch for trusted colleagues who are registering on the platform. If an active peer sponsors you, your credentials bypass the queue and activate instantly, allowing immediate collaborative discussions."
    },
    {
      id: 'faq-4',
      category: 'compliance',
      question: "Is sharing Slit-Lamp photos and diagnostic scans safe on FocusLinks?",
      answer: "Yes, fully. FocusLinks utilizes state-of-the-art browser-side WebAssembly to de-identify files before upload. When you select a Slit-Lamp photo or OCT scan, our local scripts instantly strip camera EXIF data, specific capture timestamps, and localized GPS coordinates in memory. No protected health information (PHI) is ever transmitted or stored on our servers."
    },
    {
      id: 'faq-5',
      category: 'compliance',
      question: "What specific guidelines must I follow to ensure 100% HIPAA and GDPR compliance?",
      answer: "When posting patient cases, you must make sure that: (1) All patient faces, names, file numbers, and initials are cropped out or completely hidden. (2) Case descriptions state general age/gender (e.g., '62-year-old female') rather than birthdates. (3) Any internal practice serial numbers are excluded. FocusLinks automatically assigns randomized clinical hashes (e.g., 'CASE-491A') to protect your uploads."
    },
    {
      id: 'faq-6',
      category: 'compliance',
      question: "Where is my diagnostic data and discussion history hosted?",
      answer: "All discussion threads, diagnostic consults, and case histories are stored on secure, end-to-end encrypted cloud environments. Access to view any discussion is locked strictly behind our verified doctor login, preventing indexing by general search engines or public exposure."
    },
    {
      id: 'faq-7',
      category: 'practice',
      question: "How do I co-manage or request peer advice on high-order aberration or scleral cases?",
      answer: "Navigate to the Feed, click 'Create Case Study', fill in the fitting challenges (e.g., severe keratoconus with asymmetric corneal toricity), and upload your topographical or OCT scans. Fellow specialists in specialty contacts will get a notification and can offer immediate feedback directly on your post or via encrypted private consults."
    },
    {
      id: 'faq-8',
      category: 'practice',
      question: "How do the dynamic image filters work in the case study views?",
      answer: "Our image viewer includes custom clinical excitation overlays: Toggle between Natural White, Cobalt Blue, and Fluorescein Yellow-Green filters. Hold 'Shift' and scroll on the active image to adjust the excitation filter opacity, which mathematically balances contrast to clearly highlight apical scars or pooling borders."
    },
    {
      id: 'faq-9',
      category: 'practice',
      question: "Can I directly refer patients or collaborate with neuro-optometrists on FocusLinks?",
      answer: "Yes. The Doctors Directory allows you to filter the entire verified registry by specialized fellowship boards (such as [FAAO] or [FCOVD]) or tags (like #neuro, #lowvision, #sclerals). You can initiate direct secure discussions to coordinate specialized rehabilitation plans and co-manage patients."
    },
    {
      id: 'faq-10',
      category: 'reputation',
      question: "What are 'Group Circles' and who can initiate them?",
      answer: "Group Circles are encrypted clinical discussion hubs focusing on specific specialties (e.g., Specialty Scleral Contact Lenses, Myopia Control, Advanced Ocular Therapeutics). Any verified optometrist can join existing active Circles or request to initiate a new Circle to foster collaborative study groups and discuss recent literature."
    },
    {
      id: 'faq-11',
      category: 'reputation',
      question: "How do peer endorsements influence my clinical reputation on the platform?",
      answer: "When certified optometrists check or endorse specific specialties on your professional profile, it contributes to your Platform Reputation. Peers with high endorsement volume are highlighted as 'Specialty Contributors' in feed listings and directory searches, establishing trusted expertise in their field."
    },
    {
      id: 'faq-12',
      category: 'reputation',
      question: "Can optometry students or residents join the FocusLinks workspace?",
      answer: "Yes. Academic student registries are fully supported. Students, interns, and clinical residents can register using their active college ID card or university enrollment certificate. They receive educational read-access to case archives, diagnostic playbooks, and peer discussions to accelerate their clinical education."
    },
    {
      id: 'faq-13',
      category: 'reputation',
      question: "Who gets professional badges on FocusLinks and what do they unlock?",
      answer: "Every registered clinician or verified student receives a 'Verified Practitioner' or 'Verified Student' badge on their profile. Specialty badges like 'Specialty Contributor', 'Board Fellow (FAAO / FCOVD)', or 'Top Case Author' are awarded based on verified fellowship credentials, case contributions, and high-concordance diagnostic scoring. These badges unlock advanced ocular diagnostic calculator suites and priority peer-consult routing."
    }
  ];

  // Beginner steps
  const steps = [
    {
      step: "01",
      title: "Universal Credentials Match",
      badge: "Verification Phase",
      desc: "Practitioners submit their registry credentials (NPI, GOC, Indian State Councils, or Academic University degrees). Our background verification systems cross-reference records globally to secure a vetted, peer-only clinical sanctuary for all.",
      icon: <Lock className="h-5 w-5 text-blue-500" />
    },
    {
      step: "02",
      title: "Automatic HIPAA Metadata Scrubbing",
      desc: "Upload slit-lamp photos, OCT scans, or fundus imaging safely. Our client-side code scrubs patient names, dates, GPS coordinates, and camera EXIF metadata directly inside your browser before the image is even transmitted. Zero patient information leaks.",
      icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />
    },
    {
      step: "03",
      title: "Encrypted Direct Peer Handshake",
      desc: "Need immediate secondary diagnostic clearance? Search peer listings by specialized fellowship (FAAO, FCOVD) and send an encrypted direct peer connection request accompanied by a structured, HIPAA-safe diagnostic note.",
      icon: <Users className="h-5 w-5 text-indigo-500" />
    },
    {
      step: "04",
      title: "Diagnose with Precision Web-Tools",
      desc: "Interact with clinical cases using high-resolution built-in utilities: simulate cobalt blue dye staining with fluorescein toggles, measure anterior depths with precision digital calipers, and analyze multi-spectral ocular scans.",
      icon: <Activity className="h-5 w-5 text-pink-500" />
    }
  ];

  // Advanced tips and tricks
  const tipsAndShortcuts = [
    {
      id: 'tip-1',
      title: "Search Operators & Specialty Filtering",
      summary: "How to instantly isolate specialty scleral consultants vs. neuro-optometrists.",
      detail: "In the Doctor Directory, use brackets to filter by fellowship boards. For example, typing '[FAAO]' or '[FCOVD]' isolates board-certified clinical fellows immediately. You can also append hashtags like '#cornea' or '#glaucoma' to locate specific case discussion histories."
    },
    {
      id: 'tip-2',
      title: "Anisotropic slitting and Slit-Lamp Presets",
      summary: "Maximizing image resolution for fluorescein staining reviews.",
      detail: "When viewing high-res case images, hold 'Shift' and scroll to fine-tune the blue filter intensity. Toggle between Natural White, Cobalt Blue, and Fluorescein Yellow-Green filters. Yellow filters are mathematically balanced to highlight high-contrast pooling borders."
    },
    {
      id: 'tip-3',
      title: "Silent Co-Management Protocol (HIPAA Safe)",
      summary: "Safely discussing sensitive high-order aberrations without revealing patient context.",
      detail: "Before posting a case study, click 'Scrub Patient Identifiers'. Our browser-level web assembly parser replaces file names with non-sequential clinical hashes (e.g., 'CASE-82F3') and overrides embedded date timestamps. FocusLinks does not store patient names anywhere."
    },
    {
      id: 'tip-4',
      title: "Peer Endorsements and Specialized Credibility",
      summary: "Earn verified specialty ranks from clinical optometrists.",
      detail: "To endorse a peer, open their profile, navigate to 'Clinical Specialties' and click the checkmark. High endorsement volume grants specific diagnostic credentials, positioning you as an authority in the global registry."
    }
  ];

  return (
    <div className="py-12 sm:py-20 relative overflow-hidden bg-white dark:bg-[#07070a] text-neutral-900 dark:text-neutral-100 font-sans">
      
      {/* Decorative ambient background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-[pulse_10s_infinite]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl animate-[pulse_12s_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(#8080800d_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Back navigation button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 bg-neutral-100 dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs transition-all hover:scale-[1.02] cursor-pointer mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home Overview</span>
        </motion.button>

        {/* Header Section */}
        <div className="max-w-4xl space-y-6 mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200/50 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
            <span>Optometric Practice Playbook</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-neutral-900 dark:text-white tracking-tight leading-none">
            The Complete{' '}
            <span className="glossy-shine-text-light dark:glossy-shine-text-dark font-black">
              User Handbook
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
            From verified credentials boarding to custom anterior vault fluorescent clearance diagnostics—unlock every clinical tool, co-management standard, and power-user practice tip in one comprehensive guide.
          </p>
        </div>

        {/* Dynamic Category Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-12 select-none">
          {[
            { id: 'beginner', label: 'Beginner Guide', desc: 'Registry checks & account setup' },
            { id: 'advanced', label: 'Advanced Protocols', desc: 'Diagnostic imaging & co-management' },
            { id: 'tips', label: 'Power-User Tips', desc: 'Shortcuts, search & analytics' },
            { id: 'playbooks', label: 'Practice Case Playbooks', desc: 'Keratoconus & therapeutics' },
            { id: 'faqs', label: 'FAQ & Support Portal', desc: 'Direct support, badges & regional guidelines' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveGuideTab(tab.id as GuideTab)}
              className={`px-5 py-3 rounded-2xl text-xs font-extrabold transition-all cursor-pointer text-left flex flex-col gap-0.5 border ${
                activeGuideTab === tab.id
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/10'
                  : 'bg-neutral-50 dark:bg-[#111116] border-neutral-200/60 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[9px] font-medium opacity-80 ${activeGuideTab === tab.id ? 'text-blue-100' : 'text-neutral-500'}`}>
                {tab.desc}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Guides Viewport */}
        <div className="mb-24">
          <AnimatePresence mode="wait">
            
            {/* BEGINNER TAB */}
            {activeGuideTab === 'beginner' && (
              <motion.div
                key="beginner"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-12 text-left"
              >
                <div className="max-w-3xl space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">Getting Started for Beginners</h3>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                    Welcome to FocusLinks. This guide covers how to set up your verified clinician profile and connect securely with colleagues.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {steps.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-6 sm:p-8 rounded-3xl bg-neutral-50 dark:bg-[#0c0c11] border border-neutral-200/50 dark:border-neutral-900/70 hover:border-blue-500/40 hover:shadow-xl hover:shadow-neutral-900/5 dark:hover:shadow-black/20 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
                    >
                      <div className="absolute right-6 top-4 text-6xl sm:text-7xl font-black text-neutral-200/50 dark:text-neutral-800/15 pointer-events-none group-hover:scale-110 transition-transform">
                        {item.step}
                      </div>

                      <div className="space-y-4">
                        <div className="h-10 w-10 rounded-xl bg-white dark:bg-[#12121b] border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-xs">
                          {item.icon}
                        </div>
                        
                        <div className="space-y-1 max-w-[85%]">
                          <h4 className="text-base font-black text-neutral-900 dark:text-white leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ADVANCED TAB */}
            {activeGuideTab === 'advanced' && (
              <motion.div
                key="advanced"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-12 text-left"
              >
                <div className="max-w-3xl space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">Advanced Diagnostic Protocols</h3>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                    Leverage advanced web assembly and image diagnostics to co-manage severe ocular pathology while keeping patient data fully protected.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#0c0c11] border border-neutral-200 dark:border-neutral-900 space-y-3.5">
                    <div className="h-9 w-9 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Sliders className="h-4.5 w-4.5" />
                    </div>
                    <h4 className="text-sm font-black text-neutral-900 dark:text-white">Spectral Lens Filters</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                      Toggle cobalt blue excitation overlays with fluorescein yellow filtration. Yellow barrier filters block excess background blue light to mathematically enhance raw green fluorescence border contrast.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#0c0c11] border border-neutral-200 dark:border-neutral-900 space-y-3.5">
                    <div className="h-9 w-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Scale className="h-4.5 w-4.5" />
                    </div>
                    <h4 className="text-sm font-black text-neutral-900 dark:text-white">Precision Digital Calipers</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                      Assess anterior clearance heights on sagittal OCT slices. Measure distance from the cornea apex to the lens posterior surface directly within the image viewer. Optimal targets: 200-250 microns.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#0c0c11] border border-neutral-200 dark:border-neutral-900 space-y-3.5">
                    <div className="h-9 w-9 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                      <Cpu className="h-4.5 w-4.5" />
                    </div>
                    <h4 className="text-sm font-black text-neutral-900 dark:text-white">EXIF De-Identification</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                      Every JPEG/PNG upload passes through browser-level memory buffers to strip camera manufacturer names, capture timestamps, and highly precise localized GPS coordinate structures instantly.
                    </p>
                  </div>

                </div>

                {/* Regulatory compliance advisory */}
                <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 flex items-start gap-4">
                  <div className="h-9 w-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Info className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-black text-amber-900 dark:text-white">Compliance Standard Notice (HIPAA & GDPR)</h4>
                    <p className="text-xs text-amber-800/80 dark:text-amber-400/80 font-medium leading-relaxed">
                      FocusLinks complies with active HIPAA standards. Practitioners must always confirm that case descriptions exclude any direct patient identifiers (including initials, exact diagnostic dates, or case reference numbers unique to their clinical software).
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* POWER-USER TIPS */}
            {activeGuideTab === 'tips' && (
              <motion.div
                key="tips"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-12 text-left"
              >
                <div className="max-w-3xl space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">Power-User Tips & Tricks</h3>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                    Optimize your clinical workflow. Expand each prompt to understand advanced shortcuts and search methods.
                  </p>
                </div>

                <div className="space-y-3.5 max-w-4xl">
                  {tipsAndShortcuts.map((tip) => {
                    const isExpanded = expandedTip === tip.id;
                    return (
                      <div
                        key={tip.id}
                        className="bg-neutral-50 dark:bg-[#0c0c11] border border-neutral-200/50 dark:border-neutral-900/80 rounded-2xl overflow-hidden transition-all duration-300"
                      >
                        <button
                          onClick={() => setExpandedTip(isExpanded ? null : tip.id)}
                          className="w-full p-5 flex items-center justify-between text-left cursor-pointer hover:bg-neutral-100/50 dark:hover:bg-neutral-900/30 transition-all"
                        >
                          <div className="space-y-0.5">
                            <h4 className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white">{tip.title}</h4>
                            <p className="text-[10px] text-neutral-400 font-medium">{tip.summary}</p>
                          </div>
                          <ChevronDown className={`h-4 w-4 text-neutral-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="border-t border-neutral-200/50 dark:border-neutral-900/60 px-5 py-4 bg-neutral-100/30 dark:bg-black/10 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium"
                            >
                              {tip.detail}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* PLAYBOOKS */}
            {activeGuideTab === 'playbooks' && (
              <motion.div
                key="playbooks"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-12 text-left"
              >
                <div className="max-w-3xl space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">Optometric Practice Use Cases</h3>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                    Real scenarios demonstrating how global optometrists leverage FocusLinks to optimize high-order aberration fittings and diagnostic clearances.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  <div className="p-6 sm:p-8 bg-neutral-50 dark:bg-[#0c0c11] border border-neutral-200 dark:border-neutral-900 rounded-3xl space-y-4">
                    <span className="text-[10px] font-black uppercase text-blue-500 tracking-wider">Use Case A • Scleral Lenses</span>
                    <h4 className="text-base font-black text-neutral-900 dark:text-white">Anterior Vault Clearances on Irregular Astigmatism</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                      <strong>Scenario:</strong> You are fitting a 30-year-old with Pellucid Marginal Degeneration. The trial scleral lens lands heavily on the corneal limbus.
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                      <strong>FocusLinks Action:</strong> Upload your optical coherence tomographer (OCT) cross-section to the <em>Case Loop Feed</em>. Receive advice on limbal clearance parameters and haptic sector modifications from registered scleral experts in minutes.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 bg-neutral-50 dark:bg-[#0c0c11] border border-neutral-200 dark:border-neutral-900 rounded-3xl space-y-4">
                    <span className="text-[10px] font-black uppercase text-emerald-500 tracking-wider">Use Case B • Myopia Control</span>
                    <h4 className="text-base font-black text-neutral-900 dark:text-white">Ortho-K Centration Challenges</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                      <strong>Scenario:</strong> Orthokeratology topography map reveals a classic &quot;smiley face&quot; pattern, indicating high superior lens positioning.
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                      <strong>FocusLinks Action:</strong> Consult registered pediatric ortho-k specialists by sending a direct note. Secure a quick recommendation to deepen the lens alignment curve (AC) and optimize base curve centration.
                    </p>
                  </div>

                </div>
              </motion.div>
            )}

            {/* FAQS TAB */}
            {activeGuideTab === 'faqs' && (
              <motion.div
                key="faqs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-12 text-left"
              >
                {/* Intro Title */}
                <div className="max-w-3xl space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">Clinical FAQ & Support Portal</h3>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                    Search or browse verified guidelines, regulatory compliance standards, regional licensing details, and practice workflow guides.
                  </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="space-y-4 max-w-5xl">
                  {/* Search input field */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search FAQs (e.g., 'HIPAA', 'India', 'Filters', 'Endorsements')..."
                      value={faqSearch}
                      onChange={(e) => setFaqSearch(e.target.value)}
                      className="w-full pl-12 pr-5 py-4 bg-neutral-50 dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/80 outline-none transition-all placeholder-neutral-400 dark:placeholder-neutral-500"
                    />
                    {faqSearch && (
                      <button
                        onClick={() => setFaqSearch('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-neutral-950 dark:hover:text-white cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Sub-categories Selector badges */}
                  <div className="flex flex-wrap gap-2 pt-1 select-none">
                    {[
                      { id: 'all', label: 'All Questions' },
                      { id: 'licensing', label: 'Licensing & Verification' },
                      { id: 'compliance', label: 'Privacy & Compliance' },
                      { id: 'practice', label: 'Practice & Co-Management' },
                      { id: 'reputation', label: 'Reputation & Circles' }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveFaqCat(cat.id);
                          setExpandedFaq(null);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                          activeFaqCat === cat.id
                            ? 'bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white text-white dark:text-neutral-900 shadow-sm'
                            : 'bg-neutral-50 dark:bg-[#111116] border-neutral-200/60 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* FAQ Accordions List */}
                <div className="space-y-4 max-w-5xl">
                  {(() => {
                    const filteredFaq = faqData.filter((item) => {
                      const matchesCategory = activeFaqCat === 'all' || item.category === activeFaqCat;
                      const matchesSearch = faqSearch === '' || 
                        item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
                        item.answer.toLowerCase().includes(faqSearch.toLowerCase());
                      return matchesCategory && matchesSearch;
                    });

                    if (filteredFaq.length === 0) {
                      return (
                        <div className="py-12 text-center space-y-3 bg-neutral-50 dark:bg-[#0c0c11] border border-neutral-200 dark:border-neutral-900 rounded-3xl">
                          <p className="text-sm text-neutral-400 font-bold">No matching guidelines found.</p>
                          <p className="text-xs text-neutral-500 font-medium max-w-md mx-auto">
                            Try adjusting your query or resetting category filters to browse the complete handbook database.
                          </p>
                          <button
                            onClick={() => {
                              setFaqSearch('');
                              setActiveFaqCat('all');
                            }}
                            className="text-xs font-black text-blue-600 hover:underline cursor-pointer"
                          >
                            Reset Search Filters
                          </button>
                        </div>
                      );
                    }

                    return filteredFaq.map((item) => {
                      const isExpanded = expandedFaq === item.id;
                      return (
                        <div
                          key={item.id}
                          className="bg-neutral-50 dark:bg-[#0c0c11] border border-neutral-200/50 dark:border-neutral-900/80 rounded-2xl overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-800 transition-all duration-200"
                        >
                          <button
                            onClick={() => setExpandedFaq(isExpanded ? null : item.id)}
                            className="w-full p-5 flex items-start sm:items-center justify-between text-left cursor-pointer hover:bg-neutral-100/30 dark:hover:bg-[#12121b]/20 transition-all"
                          >
                            <div className="flex items-center gap-3.5 pr-4">
                              <span className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-500" />
                              <h4 className="text-sm font-black text-neutral-900 dark:text-white leading-snug">{item.question}</h4>
                            </div>
                            <ChevronDown className={`h-4.5 w-4.5 text-neutral-500 shrink-0 mt-0.5 sm:mt-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="border-t border-neutral-200/50 dark:border-neutral-900/60 px-12 py-5 bg-neutral-100/20 dark:bg-black/10 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium"
                              >
                                {item.answer}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    });
                  })()}
                </div>

                {/* Helpful Guidance Footer Banner */}
                <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 flex items-start gap-4 max-w-5xl">
                  <div className="h-9 w-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-black text-blue-950 dark:text-white">Need Additional Assistance or Specialized Setup?</h4>
                    <p className="text-xs text-blue-800/80 dark:text-blue-400/80 font-medium leading-relaxed">
                      If you represent a clinical university, regional state allied health board, or co-management practice cluster and require specific group setups, reach out directly to our integration team at <strong className="font-extrabold text-blue-900 dark:text-blue-300">support@focuslinks.org</strong> for accelerated manual boarding.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Global Universal Inclusivity & Equity Section */}
        <div className="mb-24 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-neutral-50 to-blue-50/20 dark:from-[#0b0b10] dark:to-[#0f1124]/30 border border-neutral-200/60 dark:border-neutral-800/80 text-left space-y-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/2 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Globe className="h-5 w-5 animate-[spin_40s_linear_infinite]" />
                </div>
                <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-widest">Universal Inclusivity & Equity</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white leading-tight">
                Empowering Global Optometry: Bridging Emerging & Developed Practice
              </h2>
              
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                Clinical excellence is universal. High-quality diagnostic guidance should not be limited by regional infrastructure. Because many nations—including developing regions like India—do not use Western-style registries like NPI or GOC, FocusLinks features a <strong>Universal Verification Framework</strong>. Every practitioner gets the same peer-to-peer benefits, regardless of where they practice.
              </p>
            </div>
            
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="p-5 bg-white dark:bg-[#111116] border border-neutral-200/60 dark:border-neutral-800/70 rounded-2xl space-y-2">
                <h4 className="text-xs font-black text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  India & Regional Registries
                </h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium leading-normal">
                  Optometrists registered with Indian State Allied Health Councils, local clinics, or holding clinical degrees (B.Optom / M.Optom) from recognized universities can sign up instantly with their credentials.
                </p>
              </div>

              <div className="p-5 bg-white dark:bg-[#111116] border border-neutral-200/60 dark:border-neutral-800/70 rounded-2xl space-y-2">
                <h4 className="text-xs font-black text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  Academic & Degree Validation
                </h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium leading-normal">
                  Simply input your university degree certificate registration number or college roll code. Our human-in-the-loop clinical review board approves accounts within 12 hours.
                </p>
              </div>

              <div className="p-5 bg-white dark:bg-[#111116] border border-neutral-200/60 dark:border-neutral-800/70 rounded-2xl space-y-2 sm:col-span-2 lg:col-span-1">
                <h4 className="text-xs font-black text-neutral-900 dark:text-white flex items-center gap-2">
                  <Handshake className="h-4 w-4 text-indigo-500 animate-[pulse_3s_infinite]" />
                  Global Peer Endorsements
                </h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium leading-normal">
                  Already verified colleagues can directly endorse and sponsor international optometrists to unlock the platform instantly, accelerating global peer-to-peer mentorship.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why FocusLinks is Useful Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 text-left">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-widest">Clinical Value Proposition</span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">Why FocusLinks is Useful for Daily Practice</h2>
            </div>
            
            <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
              Daily optometric practice is demanding. Co-managing irregular astigmatism, pediatric ortho-k clearance, or progressive glaucoma shouldn&apos;t require scrolling past generic social media posts or facing compliance risks in unencrypted messaging groups.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "100% Noise-Free Professionalism",
                  desc: "Zero political rants, zero advertisements. Every discussion is locked to board-vetted clinical findings and therapeutics."
                },
                {
                  title: "Instant Case Consensus",
                  desc: "Post a diagnostic challenge and receive feedback from global corneal and glaucoma specialists within minutes, rather than days."
                },
                {
                  title: "Interactive Ocular Toolsets",
                  desc: "Simulate specialized slit-lamp dye staining and adjust cobalt filters to audit ocular clearances dynamically from any browser."
                }
              ].map((value, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1 shrink-0">
                    <CheckCircle2 className="h-4.5 w-4.5 text-blue-500" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white">{value.title}</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-neutral-100 dark:bg-[#111116] border border-neutral-200/50 dark:border-neutral-800 space-y-6">
            <h3 className="text-sm font-black text-neutral-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span>Real High-Fidelity Cases in Loop</span>
            </h3>

            {/* Displaying ExploreView clone styles */}
            <div className="space-y-4">
              {sampleCases.map(item => (
                <div key={item.id} className="p-5 bg-white dark:bg-[#0c0c11] border border-neutral-200 dark:border-neutral-900 rounded-2xl space-y-3 shadow-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 rounded-full font-black text-neutral-600 dark:text-neutral-400">
                      {item.difficulty}
                    </span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full border font-black uppercase tracking-wider ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white leading-snug">{item.title}</h4>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium line-clamp-2">{item.findings}</p>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-900/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={item.doctor.avatar} className="h-6 w-6 rounded-lg object-cover" />
                      <div className="text-left">
                        <p className="text-[8px] font-black text-neutral-900 dark:text-white">{item.doctor.name}</p>
                        <p className="text-[7px] text-neutral-500 dark:text-neutral-400">{item.doctor.credentials}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 text-[9px] text-neutral-500 font-bold">
                      <span className="flex items-center gap-0.5"><ThumbsUp className="h-2.5 w-2.5" /> {item.likes}</span>
                      <span className="flex items-center gap-0.5"><MessageCircle className="h-2.5 w-2.5" /> {item.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CTA Launch Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute top-[-50%] right-[-10%] w-[350px] h-[350px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 bg-white/20 rounded-md">
              Secure Registry Check
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-none">
              Ready to Access Your Professional Workspace?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-medium">
              Join active clinical colleagues globally. Verify credentials and co-manage cases securely.
            </p>
          </div>

          <button
            onClick={() => onEnterApp('feed')}
            className="px-8 py-4 rounded-2xl bg-white hover:bg-neutral-50 text-blue-600 font-extrabold text-sm sm:text-base transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-black/10 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Launch Workspace</span>
            <ArrowRight className="h-4.5 w-4.5" />
          </button>
        </motion.div>

      </div>
    </div>
  );
};
