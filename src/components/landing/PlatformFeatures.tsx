import React, { useState } from 'react';
import { Eye, Shield, Users, MessageSquare, ZoomIn, CheckCircle, ArrowRight, Stethoscope } from 'lucide-react';

interface PlatformFeaturesProps {
  onEnterApp: (destination?: 'feed' | 'consults' | 'qa' | 'gallery' | 'groups' | 'doctors') => void;
}

export const PlatformFeatures: React.FC<PlatformFeaturesProps> = ({ onEnterApp }) => {
  const [selectedFeature, setSelectedFeature] = useState<number>(0);

  const features = [
    {
      title: 'Peer Consults & Second Opinions',
      tag: 'Clinical Inquiries & Brain Trust',
      description:
        'Ask challenging clinical questions and follow specialized topics like Retina, Glaucoma, Sclerals, Myopia, and Dry Eye. Upvote verified doctor opinions and build a peer-reviewed knowledge vault.',
      icon: Stethoscope,
      highlights: [
        'Follow subspecialty topics (Retina, Glaucoma, Cornea, Myopia, Dry Eye)',
        'In-card interactive tabs: Top Consensus, Doctor Answers, Submit Opinion',
        'Personal study vault to bookmark difficult clinical consults',
      ],
      destination: 'consults' as const,
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
      caption: 'Interactive clinical inquiries with verified specialist peer consensus',
    },
    {
      title: 'Clinical Case Exchange & Consults',
      tag: 'Chairside Second Opinions',
      description:
        'Share challenging anterior and posterior segment cases with high-resolution imaging. Receive evidence-based opinions and management strategies from global peers within minutes.',
      icon: Eye,
      highlights: [
        'Upload multi-modal scans (OCT, Topography, Slit-Lamp)',
        'Built-in patient confidentiality protocols',
        'Tag cases by subspecialty and pathology',
      ],
      destination: 'feed' as const,
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
      caption: 'High-yield anterior segment case with clinical discussion',
    },
    {
      title: 'Subspecialty Circles & Hubs',
      tag: 'Targeted Clinical Communities',
      description:
        'Join focused circles dedicated to your specific clinical passions: Myopia Control, Sclerals & Keratoconus, Dry Eye, Glaucoma, and Low Vision.',
      icon: Users,
      highlights: [
        'Dedicated subspecialty discussion boards',
        'Clinical consensus polls & treatment protocols',
        'Peer-reviewed case studies & clinical articles',
      ],
      destination: 'groups' as const,
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
      caption: 'Specialty contact lens & irregular cornea circle discussions',
    },
    {
      title: 'Global Optometrist Directory',
      tag: 'Verified Peer Network',
      description:
        'Find colleagues worldwide for referral co-management, mentorship, and clinical collaboration. Every profile highlights clinical focus areas, credentials, and published cases.',
      icon: Shield,
      highlights: [
        'Verified optometrist profiles with credential badges',
        'Filter by subspecialty, location, and clinical interests',
        'Direct peer-to-peer messaging and referral inquiries',
      ],
      destination: 'doctors' as const,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=80',
      caption: 'International optometry directory and clinical credentials',
    },
    {
      title: 'Diagnostic Grid & Imaging Viewer',
      tag: 'Visual Clinical Archive',
      description:
        'Explore a visual gallery of real-world clinical findings. Zoom, inspect, and compare findings directly across diverse anterior and posterior pathologies.',
      icon: ZoomIn,
      highlights: [
        'Filter by imaging modality (OCT, Topography, Slit-Lamp, Fundus)',
        'Full-screen high-resolution zoom and pan view',
        'Quick comparison of normal vs. pathological scans',
      ],
      destination: 'gallery' as const,
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop&q=80',
      caption: 'Multimodal imaging viewer with full diagnostic metadata',
    },
  ];

  const current = features[selectedFeature];
  const CurrentIcon = current.icon;

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800/60">
          Core Capabilities
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mt-3">
          Designed for Everyday Optometric Practice
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-3">
          From quick chairside second opinions to deep subspecialty learning, FocusLinks brings the entire optometry profession together.
        </p>
      </div>

      {/* Feature Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {features.map((feat, index) => {
          const Icon = feat.icon;
          const isSelected = selectedFeature === index;
          return (
            <button
              key={index}
              onClick={() => setSelectedFeature(index)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.02]'
                  : 'bg-white dark:bg-[#15151b] border-neutral-200/80 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon
                  className={`h-5 w-5 ${
                    isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'
                  }`}
                />
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  0{index + 1}
                </span>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold leading-tight">
                  {feat.title}
                </h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Feature Detail Card */}
      <div className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#15151b] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Text Details (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
              <CurrentIcon className="h-3.5 w-3.5" />
              <span>{current.tag}</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4 leading-tight">
              {current.title}
            </h3>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
              {current.description}
            </p>

            {/* Checklist */}
            <div className="space-y-3 mb-8">
              {current.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 font-medium">
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <button
              onClick={() => onEnterApp(current.destination)}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Explore {current.title.split('&')[0]}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Visual Preview (5 cols) */}
        <div className="lg:col-span-5 bg-neutral-100 dark:bg-[#101014] p-6 sm:p-8 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-neutral-200/80 dark:border-neutral-800">
          <div className="rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-700 shadow-md relative group">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-56 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
              <p className="text-xs text-white font-medium">
                {current.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
