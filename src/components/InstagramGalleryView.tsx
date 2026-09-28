import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  MessageCircle,
  Eye,
  Camera,
  Sparkles,
  Stethoscope,
  X,
  Share2,
  Bookmark,
  ShieldCheck,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { ClinicalPost, DoctorProfile } from '../types';

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  modality: 'Slit Lamp' | 'Corneal Topography' | 'AS-OCT / Retina' | 'Fluorescein Staining' | 'Meibography';
  author: DoctorProfile;
  diagnosis: string;
  findings: string;
  likes: number;
  commentsCount: number;
  postRef?: ClinicalPost;
}

interface InstagramGalleryViewProps {
  posts: ClinicalPost[];
  currentUser: DoctorProfile;
  onViewDoctorProfile: (doctorId: string) => void;
  onOpenNewPost: () => void;
}

export const InstagramGalleryView: React.FC<InstagramGalleryViewProps> = ({
  posts,
  currentUser,
  onViewDoctorProfile,
  onOpenNewPost,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Visuals');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [likedMap, setLikedMap] = useState<{ [id: string]: boolean }>({});

  const categories = [
    'All Visuals',
    'Slit Lamp',
    'Corneal Topography',
    'AS-OCT / Retina',
    'Fluorescein Staining',
    'Meibography',
  ];

  // Curated clinical photography gallery items
  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&auto=format&fit=crop&q=80',
      title: 'Salzmann’s Nodular Degeneration Biomicroscopy',
      modality: 'Slit Lamp',
      author: currentUser,
      diagnosis: 'Salzmann’s Nodular Degeneration (Anterior Stroma)',
      findings: 'Elevated blue-white subepithelial nodular masses anterior to Bowman’s layer with localized tear break-up.',
      likes: 142,
      commentsCount: 28,
    },
    {
      id: 'gal-2',
      image: 'https://images.unsplash.com/photo-1583912267670-6575ad472688?w=1200&auto=format&fit=crop&q=80',
      title: 'Vault Clearance on 18.0mm Scleral (AS-OCT)',
      modality: 'AS-OCT / Retina',
      author: currentUser,
      diagnosis: 'Post-Graft Irregular Ectasia Optical Clearance',
      findings: 'Central apical fluid clearance of 260µm with harmonious landing zone alignment across 4 quadrants.',
      likes: 198,
      commentsCount: 45,
    },
    {
      id: 'gal-3',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&auto=format&fit=crop&q=80',
      title: 'Orthokeratology Bull’s Eye Fluorescein Pattern',
      modality: 'Fluorescein Staining',
      author: currentUser,
      diagnosis: 'Ideal Reverse Geometry Ortho-K Fit',
      findings: 'Central 4mm bearing zone, 360-degree deep fluorescein pooling in return zone, and even peripheral alignment.',
      likes: 215,
      commentsCount: 39,
    },
    {
      id: 'gal-4',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&auto=format&fit=crop&q=80',
      title: 'Enhanced Depth Imaging (EDI-OCT) Optic Disc Drusen',
      modality: 'AS-OCT / Retina',
      author: currentUser,
      diagnosis: 'Buried Optic Disc Drusen with Pseudopapilledema',
      findings: 'Signal-poor rounded core with hyper-reflective margin distinguishing it from true intracranial papilledema.',
      likes: 260,
      commentsCount: 52,
    },
    {
      id: 'gal-5',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&auto=format&fit=crop&q=80',
      title: 'Pellucid Marginal Degeneration Topographic Crab-Claw',
      modality: 'Corneal Topography',
      author: currentUser,
      diagnosis: 'Inferior Peripheral Ectasia (Pellucid)',
      findings: 'Marked inferior steepening with classic "kissing birds" / crab-claw pattern on tangential curvature map.',
      likes: 184,
      commentsCount: 31,
    },
    {
      id: 'gal-6',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&auto=format&fit=crop&q=80',
      title: 'Infrared Meibography: Truncation & Tortuosity',
      modality: 'Meibography',
      author: currentUser,
      diagnosis: 'Obstructive Meibomian Gland Dysfunction (Grade 3)',
      findings: '45% gland dropout in lower tarsal plate with marked ductal tortuosity, treated with 4 cycles of IPL.',
      likes: 167,
      commentsCount: 22,
    },
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === 'All Visuals') return true;
    return item.modality === selectedCategory;
  });

  const toggleLike = (id: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-5 pb-28 md:pb-16">
      {/* Ophthalmic Visual Showcase Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white dark:bg-[#18181b] p-4 sm:p-5 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-rose-500" />
            <h1 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Ophthalmic Diagnostic & Clinical Imagery
            </h1>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            High-resolution slit-lamp photography, topography maps, fluorescein patterns, and OCT diagnostics
          </p>
        </div>

        <button
          onClick={onOpenNewPost}
          className="flex items-center gap-1.5 rounded-full bg-linear-to-r from-rose-500 to-indigo-600 text-white px-4 py-2 text-xs font-semibold shadow-xs hover:opacity-95 transition-opacity min-h-[40px]"
        >
          <Camera className="h-3.5 w-3.5" />
          <span>Upload Clinical Visual</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all min-h-[36px] ${
              selectedCategory === cat
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-2xs'
                : 'bg-white dark:bg-[#18181b] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Visual Grid (Advanced Responsive Gallery) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {filteredItems.map((item) => {
          const isLiked = likedMap[item.id];
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-black border border-neutral-200 dark:border-neutral-800 shadow-2xs cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Modality Tag */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/15">
                {item.modality}
              </div>

              {/* Hover Dark Overlay (Instagram Style) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-4 flex flex-col justify-end text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <img
                    src={item.author.avatar}
                    alt={item.author.name}
                    className="h-6 w-6 rounded-full object-cover ring-1 ring-white/60"
                  />
                  <span className="text-xs font-semibold">{item.author.name}</span>
                </div>
                <h3 className="text-xs font-bold line-clamp-2 leading-snug">{item.title}</h3>

                <div className="flex items-center gap-4 mt-2 pt-2 border-t border-white/20 text-xs font-semibold">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                    {item.likes + (isLiked ? 1 : 0)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" />
                    {item.commentsCount}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Instagram Case Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Left: High-Res Image */}
              <div className="md:w-3/5 bg-black flex items-center justify-center relative overflow-hidden min-h-[300px]">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="max-h-[85vh] w-full object-contain"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                  {selectedItem.modality}
                </div>
              </div>

              {/* Right: Clinical Details & Discussion */}
              <div className="md:w-2/5 flex flex-col justify-between p-5 bg-white dark:bg-[#18181b] overflow-y-auto">
                <div className="space-y-4">
                  {/* Doctor Info */}
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={selectedItem.author.avatar}
                        alt={selectedItem.author.name}
                        className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-500/20"
                      />
                      <div>
                        <button
                          onClick={() => {
                            onViewDoctorProfile(selectedItem.author.id);
                            setSelectedItem(null);
                          }}
                          className="text-xs font-bold text-neutral-900 dark:text-neutral-100 hover:underline flex items-center gap-1"
                        >
                          {selectedItem.author.name}
                          <span className="text-[10px] text-blue-600 font-semibold">
                            ({selectedItem.author.credentials})
                          </span>
                        </button>
                        <p className="text-[10px] text-neutral-400 truncate max-w-[170px]">
                          {selectedItem.author.clinicName}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="p-1 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Diagnosis */}
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                      Biomicroscopic Diagnosis
                    </span>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                      {selectedItem.diagnosis}
                    </h3>
                  </div>

                  {/* Findings */}
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#121215] border border-neutral-200/80 dark:border-neutral-800 text-xs space-y-1.5">
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200 block">
                      Diagnostic Findings & Optical Parameters:
                    </span>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {selectedItem.findings}
                    </p>
                  </div>

                  {/* Sample Peer Comments */}
                  <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      Peer Discussion ({selectedItem.commentsCount})
                    </span>

                    <div className="text-xs space-y-2 max-h-40 overflow-y-auto pr-1">
                      <div className="p-2.5 rounded-lg bg-neutral-50/70 dark:bg-[#141418] space-y-0.5">
                        <span className="font-bold text-neutral-900 dark:text-neutral-100">
                          Dr. Marcus Chen (OD, FAAO)
                        </span>
                        <p className="text-neutral-600 dark:text-neutral-300 text-[11px]">
                          Pristine resolution. What magnification and slit beam angle did you use for the optical section?
                        </p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-neutral-50/70 dark:bg-[#141418] space-y-0.5">
                        <span className="font-bold text-neutral-900 dark:text-neutral-100">
                          Dr. Sarah Jenkins (OD)
                        </span>
                        <p className="text-neutral-600 dark:text-neutral-300 text-[11px]">
                          The tear film stability under cobalt blue is remarkably uniform post-treatment!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleLike(selectedItem.id)}
                        className="flex items-center gap-1 text-xs font-semibold text-rose-500"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            likedMap[selectedItem.id] ? 'fill-rose-500' : ''
                          }`}
                        />
                        <span>{selectedItem.likes + (likedMap[selectedItem.id] ? 1 : 0)}</span>
                      </button>
                      <button className="flex items-center gap-1 text-xs font-semibold text-neutral-500">
                        <MessageCircle className="h-4 w-4" />
                        <span>{selectedItem.commentsCount}</span>
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        onViewDoctorProfile(selectedItem.author.id);
                        setSelectedItem(null);
                      }}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      View Doctor Profile →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
