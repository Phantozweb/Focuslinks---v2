import React, { useState } from 'react';
import { ChevronDown, GraduationCap, ArrowRight } from 'lucide-react';

interface HowToSectionProps {
  onOpenHowTo: () => void;
}

const QUICK_ANSWERS = [
  {
    q: 'How do I join and get verified?',
    a: 'Submit your credentials — a degree serial, registry entry (NPI, GOC, or your national or state council) or college ID — and the clinical review board verifies you, usually within 12 hours, whatever your role in eye care. Your Membership ID then unlocks the full workspace.',
  },
  {
    q: 'What can I actually do on FocusLinks?',
    a: 'Share de-identified cases in five formats, ask questions in 19 specialty consult hubs, join clinical Circles and their grand rounds, explore diagnostic imagery, and connect with verified colleagues in the directory.',
  },
  {
    q: 'Is it free to use?',
    a: 'Yes — core access is completely free for the global eye care community: reading the clinical feed, exploring diagnostic cases, participating in Circles and connecting in the directory.',
  },
  {
    q: 'How is patient privacy protected?',
    a: 'Everything is de-identified before upload — no faces, names, file numbers or identifiers. Clinical discussion stays behind verified login, blocked from search engines, on encrypted cloud environments.',
  },
  {
    q: 'I practice outside the US. Can I still join?',
    a: 'Absolutely. The Universal Verification Framework accepts college IDs, professional degree serials (B.Optom, M.Optom, MBBS/MD and other eye care qualifications) and clinical letterhead — state council registration is NOT required to register.',
  },
  {
    q: 'Where do I find every upcoming event?',
    a: 'The Circles hub hosts the central event board — every grand rounds, symposium and workshop across all Circles in one calendar, with one-tap RSVPs and automatic reminders. No more digging through group chats.',
  },
];

export const HowToSection: React.FC<HowToSectionProps> = ({ onOpenHowTo }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="how-to-section" className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800/60">
          <GraduationCap className="h-3.5 w-3.5" />
          <span>How To — Quick Answers</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mt-3">
          Learn How FocusLinks Works
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2">
          Practical, step-by-step answers to the questions eye care professionals ask most — so you spend less time figuring out the platform and more time on clinical work.
        </p>
      </div>

      <div className="space-y-3.5">
        {QUICK_ANSWERS.map((faq, idx) => {
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

      <div className="mt-10 flex justify-center">
        <button
          onClick={onOpenHowTo}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-black shadow-lg shadow-neutral-900/10 dark:shadow-black/30 transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
        >
          <span>Open the full How-To guide</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};
