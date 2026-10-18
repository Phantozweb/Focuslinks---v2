import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Search,
  Info,
  ChevronDown,
  KeyRound,
  Award,
  PenLine,
  MessagesSquare,
  Users,
  Handshake,
  ShieldCheck,
  LifeBuoy,
  BookOpenCheck,
  ListChecks,
  Clock3,
  Mail,
  FileText,
  ScrollText,
  Cookie,
  Stethoscope
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HowToPageProps {
  onBackToHome: () => void;
  onEnterApp: () => void;
  onNavigate?: (view: 'howto' | 'terms' | 'privacy' | 'rules' | 'cookies' | 'disclaimer') => void;
}

/* --------------------------------- Content ---------------------------------- */

interface HowToEntry {
  id: string;
  q: string;
  a: string;
}

interface HowToCategory {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
  faqs: HowToEntry[];
}

const CATEGORIES: HowToCategory[] = [
  {
    id: 'start',
    label: 'Getting Started & Verification',
    icon: KeyRound,
    faqs: [
      {
        id: 'ht-1',
        q: 'How do I join FocusLinks and get my Membership ID?',
        a: 'From the landing page, choose "Free ID" (or Log In) and submit your professional credentials — a degree serial number, registry entry (NPI, GOC, or your national or state council) or college ID. The clinical review board vets your application, and once approved your personal Membership ID (like FL-29841-OD) unlocks the full workspace: feed, consult hubs, Circles, directory and events.'
      },
      {
        id: 'ht-1b',
        q: 'Which professions can join FocusLinks?',
        a: 'Every role in the eye care ecosystem is welcome: ophthalmologists, optometrists, opticians, orthoptists, ophthalmic nurses and technicians, vision scientists, academic faculty, residents and fellows, students, industry professionals, and public-health & vision rehabilitation specialists. Verification simply adapts to each pathway — clinicians submit degree serials or council and registry numbers, allied professionals use licensing or certification credentials, researchers and faculty verify through institutional affiliation, trainees register with a college ID, and industry and public-health members confirm their role with employer or organizational proof. The review board vets every pathway to the same verified standard.'
      },
      {
        id: 'ht-2',
        q: 'Why does my account say "Pending Verification" and how long does it take?',
        a: 'To keep FocusLinks a strictly clinical, advertising-free sanctuary for real practitioners, every registration passes licensing checks. Automatic database matches activate instantly; manual vetting — typical for regional, Indian academic degrees or student college IDs — usually completes within 12 hours. You will receive an email the moment your status flips to verified; check your spam folder if the wait runs long.'
      },
      {
        id: 'ht-3',
        q: 'I practice outside the US (e.g., India) — which credentials can I use?',
        a: 'FocusLinks runs a Universal Verification Framework precisely because registries are not standardized worldwide. State council registration is NOT required. You can activate your clinical profile with your college ID card, your professional degree serial number (B.Optom, M.Optom, MBBS/MD and other eye care qualifications), or clinical letterhead. The review board manually vets these submissions, so professionals from any region get the same peer benefits.'
      },
      {
        id: 'ht-4',
        q: 'What is a Credential Sponsor Handshake and how do I use it?',
        a: 'A currently verified, active member on FocusLinks can sponsor a trusted colleague who is registering, vouching for their credentials. Sponsored applications bypass the manual queue and activate instantly. To use it, ask a verified peer to send you a sponsor handshake from their directory profile, then complete your registration with the handshake code they share.'
      },
      {
        id: 'ht-5',
        q: 'Can students, residents and fellows join the workspace?',
        a: 'Yes — academic registries are fully supported across every training pathway. Optometry students and interns, ophthalmology and optometry residents and fellows, orthoptic students, and vision science PhD candidates all register with an active college ID card or university enrollment certificate and receive a Verified Student badge with educational read-and-participate access to case archives, diagnostic playbooks and peer discussions. Upgrade to practitioner verification automatically when you graduate.'
      }
    ]
  },
  {
    id: 'profile',
    label: 'Profile, Badges & Endorsements',
    icon: Award,
    faqs: [
      {
        id: 'ht-6',
        q: 'How do I complete my profile so peers trust it?',
        a: 'Open Settings and work top to bottom: add a clear profile photo, your credentials (degrees, fellowships, certifications), current institution, city or region, and a short bio covering your clinical passions. Then select your Clinical Specialties — this is what the directory search and hub rankings read. A complete profile is what turns a Connect request into an instant accept.'
      },
      {
        id: 'ht-7',
        q: 'How do peer endorsements actually work?',
        a: 'When certified peers endorse a specialty on your profile (open their profile, navigate to Clinical Specialties, and tick the check), it contributes to your Platform Reputation. Members with high endorsement volume surface as "Specialty Contributors" in feed listings and directory searches — a verified signal of trusted expertise that no self-written bio can fake.'
      },
      {
        id: 'ht-8',
        q: 'What badges exist on FocusLinks and how do I earn them?',
        a: 'Every verified member automatically receives a "Verified Practitioner" or "Verified Student" shield. On top of that: "Specialty Contributor" comes from peer endorsement volume, "Board Fellow (FAAO, FCOVD, FACS)" from verified fellowship credentials, and "Top Case Author" from consistently well-received case contributions. Badges appear across the feed, consult hubs and directory to highlight expertise.'
      },
      {
        id: 'ht-9',
        q: 'How do I add or change my clinical specialties later?',
        a: 'Open Settings → Clinical Specialties, add or remove the fields you actively practice, and save. Because specialty changes affect directory matching, a material change (like adding a surgical subspecialty) may trigger a quick re-check of the credentials that support it — usually seamless if your profile documents are already verified.'
      }
    ]
  },
  {
    id: 'posting',
    label: 'Posting Cases & Pearls',
    icon: PenLine,
    faqs: [
      {
        id: 'ht-10',
        q: 'What formats can I use to share a clinical case?',
        a: 'The composer supports five post formats, each color-coded in the feed: quick clinical pearls (amber), photo and media cases with per-image alt text, structured case reports (blue), multi-choice polls (purple), and long-form articles with repeatable sections and automatic read-time (emerald). Pick whichever format matches the teaching point — a one-line trick is a Pearl; a full workup is a Case Report.'
      },
      {
        id: 'ht-11',
        q: 'How do I de-identify a case before posting?',
        a: 'Run the checklist every time: (1) crop or cover patient faces and identifying marks; (2) remove names, file numbers, initials, birthdates, exact dates and practice serial numbers from images, file names and text; (3) describe patients generically, e.g., "62-year-old female"; (4) check device overlays that print identifiers by default and mask them. De-identification is manual today — make it a habit before every upload.'
      },
      {
        id: 'ht-12',
        q: 'How do I add images and alt text to a post?',
        a: 'In the composer, use the media button to upload slit-lamp photos, OCT captures or fundus images — up to multiple images per post, arranged automatically in a clean grid. Each image has an alt-text field: describe the finding ("inferotemporal RNFL thinning on 24-2 OCT") rather than the filename. Alt text makes your case searchable and accessible to peers using screen readers.'
      },
      {
        id: 'ht-13',
        q: 'Can I edit or delete a post after publishing?',
        a: 'Yes. Open your post, use the options menu to edit or delete it. Edits keep existing discussion threads and likes; deletion removes the post and its media from the feed immediately (short-lived cached copies may linger technically before being purged). Polls cannot change options once votes start arriving — close and repost if the choices were wrong.'
      },
      {
        id: 'ht-14',
        q: 'How do polls and community consensus work?',
        a: 'Choose the Poll format, write the clinical stem, and add up to four options (multi-choice supported). Votes fill in live with percentage bars so the community sees consensus forming in real time — great for management dilemmas ("slt first vs drops first"). Vote tallies stay visible to every verified peer, and you can vote too: the results update the moment you tap.'
      }
    ]
  },
  {
    id: 'consults',
    label: 'Consult Hubs & Q&A',
    icon: MessagesSquare,
    faqs: [
      {
        id: 'ht-15',
        q: 'How do I ask a clinical question in a Specialty Consult Hub?',
        a: 'Open Consults and pick the most relevant of the 19 specialty hubs — Retina & Macula, Glaucoma & Neuro, Scleral Lenses, Myopia Control and more. Tap "Ask a Question", then structure the case: age and sex, presenting vision and IOP, key findings, what imaging you have, and what specifically you are deciding. Precise stems get faster, better answers from hub specialists.'
      },
      {
        id: 'ht-16',
        q: 'How do I answer questions and get my answer "accepted"?',
        a: 'Open a question, read the structured case details, and write your recommendation with reasoning — cite the study or guideline behind any protocol claim (LAMP, CITT, current consensus) whenever one exists. Peers upvote answers as they arrive; the asker then marks one answer as "Accepted", which earns a Peer-Endorsed badge and moves you up that hub\u2019s leaderboard.'
      },
      {
        id: 'ht-17',
        q: 'What are hub leaderboards and how do I climb them?',
        a: 'Every hub keeps weekly and monthly leaderboards ranking members by accepted answers and upvotes. Consistent, evidence-cited answers in your specialty naturally move you up the ranks and can earn you hub titles — from "Field Printout Professor" to "Top Answerer". Leaderboards reset on their cycles, so a strong week of consults is always visible.'
      },
      {
        id: 'ht-18',
        q: 'How do I follow hubs so they appear in my workspace?',
        a: 'Tap "Follow" on any hub (or the Follow toggle in the hub header) and its new questions, accepted answers and protocol debates start surfacing in your feed and notifications. Follow the two or three hubs that match your daily caseload first — you can unfollow anytime, and trending tags inside each hub show what the specialty is debating right now.'
      }
    ]
  },
  {
    id: 'circles',
    label: 'Circles & Events',
    icon: Users,
    faqs: [
      {
        id: 'ht-19',
        q: 'How do I join a Clinical Circle?',
        a: 'Open the Circles hub and browse active specialty Circles — Scleral Contact Lenses, Myopia Control, Advanced Ocular Therapeutics, Neuro-Ophthalmology and more. Tap "Join" to enter the encrypted discussion space: organized channels like pinned-protocols, triage-guidelines and case-debates, plus the Circle\u2019s shared event board. You can join as many Circles as match your practice.'
      },
      {
        id: 'ht-20',
        q: 'How do I propose a brand-new Circle?',
        a: 'In the Circles hub, use "Propose a Circle": name it, choose the specialty category, write the purpose statement and suggest starting channels. The clinical review board reviews proposals to keep every Circle genuinely peer-run and clinically focused. Once approved, you become its founding lead and set the pinned protocols.'
      },
      {
        id: 'ht-21',
        q: 'Where do I find every upcoming event in one place?',
        a: 'The Circles hub hosts the central event board — the single calendar for Grand Rounds, symposia and workshops across all Circles, with dates, durations, CE references and RSVP counts. Open the calendar view to see the month at a glance, and RSVP directly from the board. No more digging through WhatsApp threads to find the event link.'
      },
      {
        id: 'ht-22',
        q: 'How do RSVPs and event reminders work?',
        a: 'Tap "Join" on an event card to flip your status to "Going" (or "Interested"); your RSVP appears in the attendee stack so colleagues can see who is attending. When the event approaches, FocusLinks sends a reminder notification with the joining link — so the Scleral Symposium you RSVP\u2019d to surfaces on time, every time.'
      }
    ]
  },
  {
    id: 'network',
    label: 'Directory & Networking',
    icon: Handshake,
    faqs: [
      {
        id: 'ht-23',
        q: 'How do I find the right specialist for a co-managed case?',
        a: 'Open the Eye Care Directory and combine the search box with the profession and specialty filters to narrow the verified registry. Profession chips cover ophthalmology, optometry, optical, orthoptics/nursing/imaging, research & academia, students & residents, and industry & public health; specialty filters then drill into subspecialties — neuro-optometry, low-vision rehabilitation, scleral fitters, and more. Open a profile first to review endorsed specialties, concordance, experience and certifications before reaching out, so your first message already has context.'
      },
      {
        id: 'ht-24',
        q: 'How do I connect with a colleague?',
        a: 'On any directory profile or peer card, tap "Connect" — the request shows as "Requested" until your peer accepts. Once accepted, you have an encrypted direct channel for case coordination. Connections are mutual by design: they power your For You feed, spotlight views and the peer endorsements that build reputation on both sides.'
      },
      {
        id: 'ht-25',
        q: 'Can I send a structured clinical note with my connection request?',
        a: 'Yes — when requesting a connection (or messaging an existing connection), attach a structured, HIPAA-safe diagnostic note: the de-identified case summary, the imaging you can share, and the specific question you need cleared. Specialists receiving a precise note can offer immediate feedback instead of a back-and-forth thread.'
      },
      {
        id: 'ht-26',
        q: 'What do the distance and verification markers on profiles mean?',
        a: 'The distance chip shows how near a peer practices to your region — useful for referrals that need a hands-on follow-up. The verified shield confirms their credentials passed the review board, and specialty endorsement ticks show community-vouched expertise. Together they let you triage "who to ask" in seconds.'
      }
    ]
  },
  {
    id: 'privacy',
    label: 'Privacy, Safety & Account',
    icon: ShieldCheck,
    faqs: [
      {
        id: 'ht-27',
        q: 'Is sharing slit-lamp photos and diagnostic scans actually safe here?',
        a: 'Yes — as long as every case is de-identified before upload (faces, names, file numbers and identifiers removed; generic descriptions used). Clinical discussion sits behind verified login only, is blocked from search-engine indexing, and is stored on encrypted cloud environments. Posting identifiable patient information breaks the Community Rules precisely so the space stays privacy-safe for everyone.'
      },
      {
        id: 'ht-28',
        q: 'How do I report a post, answer or member?',
        a: 'Use the report action on any post, answer, profile or message, or email support@focuslinks.org with links and screenshots. Reports about patient privacy are handled first, as highest priority. Reporting is confidential — the reported member is never told who flagged them, and good-faith reports never count against you.'
      },
      {
        id: 'ht-29',
        q: 'What does FocusLinks store on my device?',
        a: 'Only what makes the site feel yours: your dark/light theme choice and a few interface preferences in local storage, plus the strict-necessary session cookie that keeps your verified workspace secure. There are no advertising cookies and no third-party trackers — see the Cookie Policy in the footer for the complete, short list.'
      },
      {
        id: 'ht-30',
        q: 'How do I export or delete my account and data?',
        a: 'For most requests, Settings is enough: edit or delete your content, update credentials, or deactivate from Account. For a full data export (GDPR-style) or complete deletion, email privacy@focuslinks.org — we verify your Membership ID, then hand you a machine-readable archive or purge your data within 30 days, subject to the retention windows in the Privacy Policy.'
      }
    ]
  }
];

const LEGAL_CHIPS = [
  { view: 'terms' as const, label: 'Terms of Service', icon: FileText, cls: 'bg-blue-50 dark:bg-blue-950/70 border-blue-200/50 dark:border-blue-900/50 text-blue-700 dark:text-blue-300' },
  { view: 'privacy' as const, label: 'Privacy Policy', icon: ShieldCheck, cls: 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200/50 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300' },
  { view: 'rules' as const, label: 'Community Rules', icon: ScrollText, cls: 'bg-amber-50 dark:bg-amber-950/70 border-amber-200/50 dark:border-amber-900/50 text-amber-700 dark:text-amber-300' },
  { view: 'cookies' as const, label: 'Cookie Policy', icon: Cookie, cls: 'bg-orange-50 dark:bg-orange-950/70 border-orange-200/50 dark:border-orange-900/50 text-orange-700 dark:text-orange-300' },
  { view: 'disclaimer' as const, label: 'Medical Disclaimer', icon: Stethoscope, cls: 'bg-rose-50 dark:bg-rose-950/70 border-rose-200/50 dark:border-rose-900/50 text-rose-700 dark:text-rose-300' }
];

/* --------------------------------- Component -------------------------------- */

export const HowToPage: React.FC<HowToPageProps> = ({ onBackToHome, onEnterApp, onNavigate }) => {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState<string>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const totalFaqs = CATEGORIES.reduce((n, c) => n + c.faqs.length, 0);

  const filtered = CATEGORIES.filter((c) => activeCat === 'all' || c.id === activeCat).map((c) => ({
    ...c,
    faqs: c.faqs.filter((f) => {
      const s = search.trim().toLowerCase();
      return s === '' || f.q.toLowerCase().includes(s) || f.a.toLowerCase().includes(s);
    })
  })).filter((c) => c.faqs.length > 0);

  const resetFilters = () => {
    setSearch('');
    setActiveCat('all');
  };

  return (
    <div className="py-12 sm:py-20 relative overflow-hidden bg-white dark:bg-[#07070a] text-neutral-900 dark:text-neutral-100 font-sans">
      {/* Decorative ambient background — same treatment as the Clinical Guide */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl animate-[pulse_10s_infinite]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-[pulse_12s_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(#8080800d_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
        {/* Back navigation */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 bg-neutral-100 dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs transition-all hover:scale-[1.02] cursor-pointer mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home Overview</span>
        </motion.button>

        {/* Header */}
        <div className="max-w-4xl space-y-6 mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/50 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />
            <span>How To & Help Center</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-neutral-900 dark:text-white tracking-tight leading-none">
            The Complete{' '}
            <span className="glossy-shine-text-light dark:glossy-shine-text-dark font-black">
              How-To Guide
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
            Every practical answer in one place — joining and verification, posting de-identified cases, consult hubs, Circles and events, the directory, and your privacy controls. Search it, filter it, use it.
          </p>

          {/* Meta chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
              <BookOpenCheck className="h-3.5 w-3.5" />
              {totalFaqs} practical answers
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
              <ListChecks className="h-3.5 w-3.5" />
              {CATEGORIES.length} topics
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
              <Clock3 className="h-3.5 w-3.5" />
              Updated for the current release
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="space-y-4 max-w-5xl mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search how-to answers (e.g., 'verification', 'India', 'de-identify', 'RSVP')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 py-4 bg-neutral-50 dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/80 outline-none transition-all placeholder-neutral-400 dark:placeholder-neutral-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-neutral-950 dark:hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2 pt-1 select-none">
            <button
              onClick={() => {
                setActiveCat('all');
                setExpanded(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                activeCat === 'all'
                  ? 'bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white text-white dark:text-neutral-900 shadow-sm'
                  : 'bg-neutral-50 dark:bg-[#111116] border-neutral-200/60 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700'
              }`}
            >
              All Topics
            </button>
            {CATEGORIES.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCat(cat.id);
                    setExpanded(null);
                  }}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                    activeCat === cat.id
                      ? 'bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white text-white dark:text-neutral-900 shadow-sm'
                      : 'bg-neutral-50 dark:bg-[#111116] border-neutral-200/60 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <CatIcon className="h-3.5 w-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Answers */}
        <div className="space-y-12 mb-16 text-left max-w-5xl">
          {filtered.length === 0 ? (
            <div className="py-12 text-center space-y-3 bg-neutral-50 dark:bg-[#0c0c11] border border-neutral-200 dark:border-neutral-900 rounded-3xl">
              <p className="text-sm text-neutral-400 font-bold">No matching how-to answers found.</p>
              <p className="text-xs text-neutral-500 font-medium max-w-md mx-auto">
                Try a shorter keyword — or reset the filters to browse the complete help database.
              </p>
              <button
                onClick={resetFilters}
                className="text-xs font-black text-blue-600 hover:underline cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filtered.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <div key={cat.id} className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-white dark:bg-[#12121b] border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-xs">
                      <CatIcon className="h-4.5 w-4.5 text-blue-500" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white">
                      {cat.label}
                      <span className="ml-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider align-middle">
                        {cat.faqs.length} {cat.faqs.length === 1 ? 'answer' : 'answers'}
                      </span>
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {cat.faqs.map((item) => {
                      const isOpen = expanded === item.id;
                      return (
                        <div
                          key={item.id}
                          className="bg-neutral-50 dark:bg-[#0c0c11] border border-neutral-200/50 dark:border-neutral-900/80 rounded-2xl overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-800 transition-all duration-200"
                        >
                          <button
                            onClick={() => setExpanded(isOpen ? null : item.id)}
                            className="w-full p-5 flex items-start sm:items-center justify-between text-left cursor-pointer hover:bg-neutral-100/30 dark:hover:bg-[#12121b]/20 transition-all"
                          >
                            <div className="flex items-center gap-3.5 pr-4">
                              <span className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-500" />
                              <h4 className="text-sm font-black text-neutral-900 dark:text-white leading-snug">{item.q}</h4>
                            </div>
                            <ChevronDown className={`h-4.5 w-4.5 text-neutral-500 shrink-0 mt-0.5 sm:mt-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="border-t border-neutral-200/50 dark:border-neutral-900/60 px-12 py-5 bg-neutral-100/20 dark:bg-black/10 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium"
                              >
                                {item.a}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Support banner */}
        <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 flex items-start gap-4 max-w-5xl mb-12">
          <div className="h-9 w-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-black text-blue-950 dark:text-white">Still Stuck? We Answer Personally.</h4>
            <p className="text-xs text-blue-800/80 dark:text-blue-400/80 font-medium leading-relaxed">
              If your question is not covered here, write to{' '}
              <strong className="font-extrabold text-blue-900 dark:text-blue-300">support@focuslinks.org</strong>{' '}
              — a human on the clinical review board replies within one business day. Universities, state allied-health boards and practice clusters needing group setups get accelerated manual onboarding.
            </p>
          </div>
        </div>

        {/* Related policies */}
        {onNavigate && (
          <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-neutral-50 to-blue-50/20 dark:from-[#0b0b10] dark:to-[#0f1124]/30 border border-neutral-200/60 dark:border-neutral-800/80 space-y-5 max-w-5xl">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <LifeBuoy className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-sm sm:text-base font-black text-neutral-900 dark:text-white">
                Policies Behind the How-To
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {LEGAL_CHIPS.map((chip) => {
                const ChipIcon = chip.icon;
                return (
                  <button
                    key={chip.view}
                    onClick={() => onNavigate(chip.view)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black border transition-all cursor-pointer hover:scale-[1.03] ${chip.cls}`}
                  >
                    <ChipIcon className="h-3.5 w-3.5" />
                    {chip.label}
                  </button>
                );
              })}
            </div>
            <p className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              Every how-to answer above follows our Terms, Rules and Privacy commitments — the full documents live in the site footer too.
            </p>
          </div>
        )}

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
              Learned the Ropes?
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-none">
              Now Put the Workspace to Work
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-medium">
              Open the clinical feed, ask your first consult, and RSVP to the next grand rounds — free for verified eye care professionals.
            </p>
          </div>

          <button
            onClick={onEnterApp}
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
