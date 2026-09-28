import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const CommunityPreview: React.FC = () => {
  const testimonials = [
    {
      quote:
        'FocusLinks gives our profession what we’ve needed for years: a dedicated clinical exchange without the noise, algorithms, or non-clinical clutter of generic apps.',
      author: 'Dr. Marcus Vance, Optometrist, FAAO',
      specialty: 'Cornea & Contact Lens Specialist',
      location: 'Melbourne, Australia',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&auto=format&fit=crop&q=80',
    },
    {
      quote:
        'Being able to post anterior OCT scans and discuss complex scleral lens vaults with colleagues across time zones has elevated my everyday patient outcomes.',
      author: 'Dr. Elena Rostova, Optometrist',
      specialty: 'Ocular Surface & Specialty Lenses',
      location: 'St. Louis, MO, USA',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&auto=format&fit=crop&q=80',
    },
    {
      quote:
        'The subspecialty circles are pure gold. Whether it is discussing the latest low-concentration atropine trials or scleral lens troubleshooting, the peer feedback is immediate.',
      author: 'Dr. David Adebayo, Optometrist, FCOptom',
      specialty: 'Glaucoma & Pediatric Optometry',
      location: 'London, United Kingdom',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=120&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-neutral-100/50 dark:bg-[#0c0c10]/50 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800/60">
            Voices of Optometry
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mt-3">
            Trusted by Optometrists Across the Globe
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-3">
            Hear why clinicians are choosing FocusLinks as their primary hub for clinical collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#15151b] border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-neutral-300 dark:text-neutral-700" />
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/20"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                      {t.author}
                    </h4>
                    <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                  </div>
                  <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                    {t.specialty}
                  </p>
                  <p className="text-[10px] text-neutral-400">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
