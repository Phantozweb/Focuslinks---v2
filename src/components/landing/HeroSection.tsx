import React, { useState } from 'react';
import {
  ArrowRight,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  Layers,
  Eye,
  Users,
  Activity,
  Award,
  Vote,
  ZoomIn,
  Share2,
  Bookmark,
  Stethoscope,
  Globe2,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSectionProps {
  onEnterApp: (destination?: 'feed' | 'gallery' | 'groups' | 'doctors') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onEnterApp }) => {
  // Interactive clinical preview state
  const [activeTab, setActiveTab] = useState<'case' | 'poll' | 'circle'>('case');
  const [selectedScan, setSelectedScan] = useState<'oct' | 'slitlamp' | 'topography'>('oct');
  const [votedOption, setVotedOption] = useState<number | null>(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(34);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const pollOptions = [
    { text: 'Increase central sagittal vault by +40µm', votes: 24, percent: 56 },
    { text: 'Toric peripheral landing alignment at 180°', votes: 14, percent: 32 },
    { text: 'Maintain clearance & re-evaluate in 3 weeks', votes: 5, percent: 12 },
  ];

  const handleVote = (idx: number) => {
    setVotedOption(idx);
  };

  const handleLike = () => {
    if (hasLiked) {
      setHasLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setHasLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28">
      {/* Dynamic Background Mesh & Drift Animations */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Primary Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-3xl" />
        {/* Right Accent Glow (Drifting) */}
        <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-sky-500/12 dark:bg-sky-600/15 rounded-full blur-3xl animate-drift-slow" />
        {/* Left Accent Glow (Drifting Reverse) */}
        <div className="absolute bottom-10 left-[-5%] w-[450px] h-[450px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl animate-drift-slow-reverse" />

        {/* Subtle Decorative Grid Matrix */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Desktop Two-Column Layout (Left & Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ═══════════════════════════════════════════════
              LEFT COLUMN: High-Impact Typography & Conversion
              ═══════════════════════════════════════════════ */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            
            {/* Standout White/Dark Backdrop Card Badge with Top Glow and Thin Glowing Border */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-3 px-4.5 py-2.5 rounded-2xl bg-white/95 dark:bg-[#13131c]/95 border-2 border-neutral-200/70 dark:border-neutral-800 thin-glow-border shadow-xl shadow-neutral-900/5 dark:shadow-black/60 backdrop-blur-md relative"
            >
              {/* Subtle top brand light indicator */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              
              <div className="flex items-center justify-center h-6.5 w-6.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm shadow-blue-500/20">
                <Globe2 className="h-3.5 w-3.5" />
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-xs sm:text-sm font-extrabold text-neutral-900 dark:text-white tracking-tight">
                  World&apos;s First Platform for Optometrists
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
              </div>
            </motion.div>

            {/* Main Headline with Glossy Shine Gradient Sweep */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="space-y-3.5"
            >
              <h1 className="text-display-lg xl:text-display-xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.12]">
                The Global Platform for{' '}
                <span className="glossy-shine-text-light dark:glossy-shine-text-dark font-black">
                  Optometrists
                </span>
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                Connect chairside with optometrists worldwide. Share de-identified anterior & posterior scans, obtain peer case consults, explore clinical subspecialties, and form an international network.
              </p>
            </motion.div>

            {/* Dynamic Infinite-Looping Sliding Marquee Ticker */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="w-full overflow-hidden py-1"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-neutral-500 dark:text-neutral-400 mb-2.5 px-1 uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse shrink-0" />
                <span>Trending Clinical Focus Areas (Auto-Scroll):</span>
              </div>
              
              <div className="relative w-full overflow-hidden bg-neutral-100/40 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-neutral-800/80 rounded-2xl py-3 px-3">
                {/* Fade overlays for soft edges */}
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-neutral-50 dark:from-[#0c0c10] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-neutral-50 dark:from-[#0c0c10] to-transparent z-10 pointer-events-none" />
                
                <div className="animate-ticker flex gap-3 select-none">
                  {[
                    '#ScleralVault', '#MyopiaControl', '#AnteriorOCT', '#GlaucomaRx', '#CornealEctasia',
                    '#Orthokeratology', '#DiabeticRetinopathy', '#DryEyeProtocol', '#MacularDegeneration',
                    '#ScleralVault', '#MyopiaControl', '#AnteriorOCT', '#GlaucomaRx', '#CornealEctasia',
                    '#Orthokeratology', '#DiabeticRetinopathy', '#DryEyeProtocol', '#MacularDegeneration'
                  ].map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/90 dark:border-neutral-700/80 shadow-3xs hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Primary & Secondary Conversion Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              <button
                onClick={() => onEnterApp('feed')}
                className="group relative px-7 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
                <span>Enter FocusLinks</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onEnterApp('gallery')}
                className="px-6 py-4 rounded-2xl bg-white dark:bg-[#181820] hover:bg-neutral-50 dark:hover:bg-[#20202a] text-neutral-800 dark:text-neutral-200 font-bold text-sm sm:text-base flex items-center justify-center gap-2 border border-neutral-200 dark:border-neutral-700 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Compass className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Browse Clinical Cases</span>
              </button>
            </motion.div>

            {/* Key Trust Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-200/70 dark:border-neutral-800/80 text-left"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>Verified</span>
                </div>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Optometrists Network
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>De-Identified</span>
                </div>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Safe Clinical Imaging
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold text-xs sm:text-sm">
                  <Activity className="h-4 w-4 shrink-0" />
                  <span>24/7 Peer</span>
                </div>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Case Consults
                </span>
              </div>
            </motion.div>
          </div>

          {/* ═══════════════════════════════════════════════
              RIGHT COLUMN: Polished Clinical App Interface
              ═══════════════════════════════════════════════ */}
          <div className="lg:col-span-6 relative">
            
            {/* Ambient Outer Backing */}
            <div className="relative rounded-3xl p-1 sm:p-2 bg-gradient-to-tr from-blue-500/25 via-indigo-500/20 to-sky-400/25 shadow-2xl shadow-blue-900/15 dark:shadow-black/70">
              
              {/* Main Application Window */}
              <div className="rounded-2xl sm:rounded-[22px] bg-white dark:bg-[#15151c] border border-neutral-200/90 dark:border-neutral-800 overflow-hidden text-left shadow-xl">
                
                {/* Clean Clinical App Header (No dots, No demo labels) */}
                <div className="p-3.5 sm:p-4 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/90 dark:bg-[#181822]/90 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                      <Stethoscope className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                        <span>Clinical Case Feed</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                          Verified Case
                        </span>
                      </h3>
                    </div>
                  </div>

                  {/* Mode Navigation Tabs */}
                  <div className="flex items-center gap-1 bg-neutral-200/80 dark:bg-neutral-800 p-0.5 rounded-xl text-xs font-bold">
                    <button
                      onClick={() => setActiveTab('case')}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-[11px] ${
                        activeTab === 'case'
                          ? 'bg-white dark:bg-[#22222e] text-blue-600 dark:text-blue-400 shadow-xs'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      <Layers className="h-3 w-3" />
                      <span>Case Discussion</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('poll')}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-[11px] ${
                        activeTab === 'poll'
                          ? 'bg-white dark:bg-[#22222e] text-blue-600 dark:text-blue-400 shadow-xs'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      <Vote className="h-3 w-3" />
                      <span>Consensus Poll</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('circle')}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-[11px] ${
                        activeTab === 'circle'
                          ? 'bg-white dark:bg-[#22222e] text-blue-600 dark:text-blue-400 shadow-xs'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      <Users className="h-3 w-3" />
                      <span>Specialty Circle</span>
                    </button>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="p-4 sm:p-5 space-y-4">
                  
                  {/* TAB 1: Clinical Case Discussion */}
                  {activeTab === 'case' && (
                    <motion.div
                      key="case"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-3.5"
                    >
                      {/* Author Bar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80"
                            alt="Dr. Elena Rostova"
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/30"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                                Dr. Elena Rostova, Optometrist, FAAO
                              </h4>
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                                Verified
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                              Cornea & Specialty Contact Lenses • St. Louis, MO
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/60">
                          Scleral Vault Review
                        </span>
                      </div>

                      {/* Clinical Case Content */}
                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        <strong className="text-blue-600 dark:text-blue-400">Chairside Question:</strong> 42yo keratoconus post-PKP patient with 16.5mm quadrant-specific scleral lens. Anterior OCT shows 240µm central clearance with mild 3 o&apos;clock compression. Would you flatten the peripheral landing or maintain clearance?
                      </p>

                      {/* Clinical Metadata Badges */}
                      <div className="grid grid-cols-3 gap-2 py-1">
                        <div className="p-2 rounded-xl bg-neutral-50 dark:bg-[#1a1a24] border border-neutral-200/70 dark:border-neutral-800 text-center">
                          <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Lens Vault</span>
                          <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">240 µm</span>
                        </div>
                        <div className="p-2 rounded-xl bg-neutral-50 dark:bg-[#1a1a24] border border-neutral-200/70 dark:border-neutral-800 text-center">
                          <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Limbal Landing</span>
                          <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">45 µm</span>
                        </div>
                        <div className="p-2 rounded-xl bg-neutral-50 dark:bg-[#1a1a24] border border-neutral-200/70 dark:border-neutral-800 text-center">
                          <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Diameter</span>
                          <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">16.5 mm</span>
                        </div>
                      </div>

                      {/* Multimodal Diagnostic Scan Display */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                          <span>Diagnostic Multimodal Scans</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setSelectedScan('oct')}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                                selectedScan === 'oct'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                              }`}
                            >
                              Anterior OCT
                            </button>
                            <button
                              onClick={() => setSelectedScan('slitlamp')}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                                selectedScan === 'slitlamp'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                              }`}
                            >
                              Slit-Lamp
                            </button>
                            <button
                              onClick={() => setSelectedScan('topography')}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                                selectedScan === 'topography'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                              }`}
                            >
                              Topography
                            </button>
                          </div>
                        </div>

                        {/* Interactive Scan Window */}
                        <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-neutral-900 border border-neutral-200 dark:border-neutral-800 group">
                          {selectedScan === 'oct' && (
                            <img
                              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80"
                              alt="Anterior OCT Scan"
                              className="w-full h-full object-cover"
                            />
                          )}
                          {selectedScan === 'slitlamp' && (
                            <img
                              src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop&q=80"
                              alt="Slit-Lamp Biomicroscopy"
                              className="w-full h-full object-cover"
                            />
                          )}
                          {selectedScan === 'topography' && (
                            <img
                              src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80"
                              alt="Corneal Topography Map"
                              className="w-full h-full object-cover"
                            />
                          )}

                          {/* Real Diagnostic Callouts */}
                          <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-mono backdrop-blur-xs">
                            <ZoomIn className="h-3 w-3 text-sky-400" />
                            <span>
                              {selectedScan === 'oct'
                                ? 'OCT Caliper: 240µm Central Clearance'
                                : selectedScan === 'slitlamp'
                                ? 'Sodium Fluorescein 16x'
                                : 'Axial Tangential Elevation'}
                            </span>
                          </div>

                          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/75 text-emerald-400 text-[10px] font-bold backdrop-blur-xs">
                            ✓ De-Identified
                          </div>
                        </div>
                      </div>

                      {/* Interactive Reactions */}
                      <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-xs text-neutral-500 dark:text-neutral-400">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={handleLike}
                            className={`flex items-center gap-1.5 font-bold transition-colors cursor-pointer ${
                              hasLiked
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-neutral-600 dark:text-neutral-400 hover:text-blue-600'
                            }`}
                          >
                            <ThumbsUp className={`h-3.5 w-3.5 ${hasLiked ? 'fill-blue-600 dark:fill-blue-400' : ''}`} />
                            <span>{likeCount} Helpful</span>
                          </button>
                          <button
                            onClick={() => setShowReplies(!showReplies)}
                            className="flex items-center gap-1 font-semibold text-neutral-600 dark:text-neutral-400 hover:text-blue-600 cursor-pointer"
                          >
                            <MessageSquare className="h-3.5 w-3.5 text-indigo-500" />
                            <span>8 Peer Consults</span>
                          </button>
                          <button
                            onClick={() => setIsBookmarked(!isBookmarked)}
                            className={`cursor-pointer ${isBookmarked ? 'text-amber-500' : 'text-neutral-400 hover:text-neutral-600'}`}
                            title="Bookmark Case"
                          >
                            <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                          </button>
                        </div>
                        <button
                          onClick={() => onEnterApp('feed')}
                          className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 cursor-pointer text-xs"
                        >
                          <span>Open Case Details</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Expandable Peer Reply Sample */}
                      {showReplies && (
                        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#1a1a24] border border-neutral-200/80 dark:border-neutral-800 text-xs space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-neutral-900 dark:text-white">Dr. Marcus Vance, Optometrist</span>
                            <span className="text-[10px] text-neutral-400">FAAO • Cornea Fellow</span>
                          </div>
                          <p className="text-neutral-700 dark:text-neutral-300">
                            I recommend flattening the landing by 1.5 steps at the 3 o&apos;clock sector to relieve blanching without reducing central clearance.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* TAB 2: Clinical Consensus Poll */}
                  {activeTab === 'poll' && (
                    <motion.div
                      key="poll"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                            OD
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                              Clinical Consensus Poll
                            </h4>
                            <p className="text-[11px] text-neutral-400">
                              43 Optometrists Voted • Myopia Management Hub
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50">
                          Peer Consensus
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-semibold">
                        What is your primary intervention for progressive myopia with 0.32mm/yr axial elongation despite 0.05% atropine?
                      </p>

                      <div className="space-y-2 pt-1">
                        {pollOptions.map((opt, i) => (
                          <div
                            key={i}
                            onClick={() => handleVote(i)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                              votedOption === i
                                ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 font-bold'
                                : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 text-neutral-800 dark:text-neutral-200'
                            }`}
                          >
                            <div
                              className="absolute top-0 left-0 bottom-0 bg-blue-500/15 dark:bg-blue-500/25 transition-all duration-500"
                              style={{ width: `${opt.percent}%` }}
                            />
                            <div className="relative z-10 flex items-center justify-between text-xs">
                              <span className="flex items-center gap-2">
                                <span className={`h-4 w-4 rounded-full border flex items-center justify-center text-[9px] ${
                                  votedOption === i ? 'border-blue-600 bg-blue-600 text-white' : 'border-neutral-400'
                                }`}>
                                  {votedOption === i ? '✓' : i + 1}
                                </span>
                                <span>{opt.text}</span>
                              </span>
                              <span className="font-bold text-neutral-600 dark:text-neutral-300 ml-2">
                                {opt.percent}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] text-neutral-400 text-center pt-1">
                        Click any option above to participate in peer clinical consensus
                      </p>
                    </motion.div>
                  )}

                  {/* TAB 3: Specialty Circle */}
                  {activeTab === 'circle' && (
                    <motion.div
                      key="circle"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-3"
                    >
                      <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200">
                            Featured Subspecialty Circle
                          </span>
                          <h4 className="text-sm sm:text-base font-extrabold">
                            Scleral Lens & Irregular Cornea
                          </h4>
                          <p className="text-xs text-blue-100">1,240 Optometrists Collaborating</p>
                        </div>
                        <button
                          onClick={() => onEnterApp('groups')}
                          className="px-3 py-1.5 rounded-lg bg-white text-blue-700 font-bold text-xs shadow-xs hover:bg-neutral-100 cursor-pointer"
                        >
                          Join Circle
                        </button>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 flex items-center justify-between">
                          <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                            📌 Pinned: 2026 Scleral Fitting Vault Guidelines
                          </span>
                          <span className="text-blue-600 dark:text-blue-400 font-bold text-[11px]">
                            PDF Guide
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 flex items-center justify-between">
                          <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                            💬 Discussion: Limbal clearance with quadrant-specific toricity
                          </span>
                          <span className="text-neutral-400 text-[11px]">18 replies</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Application Bottom Status Bar */}
                <div className="px-4 py-2.5 bg-neutral-50 dark:bg-[#121218] border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                    <span>FocusLinks Clinical Network</span>
                  </span>
                  <button
                    onClick={() => onEnterApp('feed')}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Launch Platform</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Floating Satellite Badges */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="hidden sm:flex absolute -top-4 -left-4 items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-[#1c1c26]/95 border border-neutral-200/90 dark:border-neutral-700 shadow-xl backdrop-blur-md text-xs font-bold text-neutral-800 dark:text-white"
              >
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <Eye className="h-4 w-4 text-blue-500" />
                <span>Chairside Peer Consults</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="hidden sm:flex absolute -bottom-4 -right-4 items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-[#1c1c26]/95 border border-neutral-200/90 dark:border-neutral-700 shadow-xl backdrop-blur-md text-xs font-bold text-neutral-800 dark:text-white"
              >
                <Award className="h-4 w-4 text-amber-500" />
                <span>Verified Optometrists</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
