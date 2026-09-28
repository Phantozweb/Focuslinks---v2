import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is FocusLinks?',
      a: 'FocusLinks is the premier global platform designed specifically for Optometrists. It provides a secure, distraction-free environment to share clinical cases, seek peer second opinions, join subspecialty circles, and build an international professional network.',
    },
    {
      q: 'Who can join and use FocusLinks?',
      a: 'FocusLinks is built for registered Optometrists, optometry residents, clinical fellows, faculty, and optometry students across the globe. Members can verify their credentials to earn verified practitioner badges.',
    },
    {
      q: 'Is FocusLinks free to use?',
      a: 'Yes! Core access to FocusLinks—including reading clinical feeds, exploring diagnostic cases, participating in specialty circles, and connecting in the directory—is completely free for the global optometry community.',
    },
    {
      q: 'How is patient confidentiality and privacy protected?',
      a: 'All clinical imaging, OCT scans, and case discussions must be fully de-identified before uploading. Our platform strictly adheres to medical confidentiality guidelines, ensuring no patient identifiable information (PII) is shared.',
    },
  ];

  return (
    <section id="faq-section" className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800/60">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mt-3">
          Everything You Need to Know
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2">
          Simple, transparent answers about how FocusLinks works for optometrists.
        </p>
      </div>

      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#15151b] overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-neutral-500 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/80 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
