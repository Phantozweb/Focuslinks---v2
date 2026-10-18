import React from 'react';
import { FileText } from 'lucide-react';
import { DocShell } from './DocShell';
import type { DocSection } from '../subViews';
import { getLegalDocMeta } from '../subViews';

interface TermsPageProps {
  onBackToHome: () => void;
  onEnterApp: () => void;
  onNavigate?: (view: 'howto' | 'terms' | 'privacy' | 'rules' | 'cookies' | 'disclaimer') => void;
}

const SECTIONS: DocSection[] = [
  {
    id: 'agreement',
    title: 'Agreement to These Terms',
    blocks: [
      {
        type: 'p',
        text: 'These Terms of Service ("Terms") form a binding agreement between you and FocusLinks ("FocusLinks", "we", "us"), the operator of the FocusLinks clinical platform, and govern your access to and use of our website, workspace, mobile interfaces, directories, consult hubs, circles, events and related services (collectively, the "Service"). By creating an account, claiming a Membership ID, or otherwise using the Service, you confirm that you have read, understood and accepted these Terms in full.'
      },
      {
        type: 'p',
        text: 'If you are using the Service on behalf of a practice, academic institution or department, you represent that you are authorised to bind that entity, and that entity also accepts these Terms. If you do not agree with any part of these Terms, you must discontinue use of the Service. These Terms apply together with our Privacy Policy, Community Rules, Cookie Policy and Medical Disclaimer, each of which is incorporated into this agreement by reference.'
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Plain-language summary',
        text: 'FocusLinks is a verified, peer-only community for eye care professionals. Use it professionally, protect patient privacy, stand behind your credentials, and treat peer content as peer opinion — never as a replacement for your own clinical judgement.'
      }
    ]
  },
  {
    id: 'eligibility',
    title: 'Eligibility & the Verified Community',
    blocks: [
      {
        type: 'p',
        text: 'FocusLinks exists to keep clinical discussion peer-only and advertising-free. Registration is therefore limited to verified eye care professionals and students in training — ophthalmologists, optometrists, opticians, orthoptists, ophthalmic nurses and technicians, vision scientists, academics, residents and students — and every application passes through our verification workflow before workspace access is unlocked. You must be at least 18 years old and legally able to form a binding contract to hold an account.'
      },
      {
        type: 'sub',
        points: [
          {
            label: 'Practitioners',
            text: 'Licensed practitioners — physicians (MD/DO), optometrists (OD), opticians, orthoptists, ophthalmic nurses and technicians — holding a recognised degree, licence or registry number (NPI, GOC, national or state councils, nursing or dispensing registries, or equivalent) may register as Verified Practitioners.'
          },
          {
            label: 'Students & residents',
            text: 'Students, interns and residents in eye care programmes — optometry, ophthalmology, orthoptics and vision science — may register with an active college ID or enrolment certificate and receive Verified Student access with educational read-and-participate permissions.'
          },
          {
            label: 'Universal verification',
            text: 'Because registries are not standardised worldwide, our Universal Verification Framework accepts college IDs, degree serial numbers and clinical letterhead, with manual vetting by the clinical review board — typically within 12 hours.'
          },
          {
            label: 'Credential Sponsor Handshake',
            text: 'A currently verified member may sponsor a trusted colleague, bypassing the manual queue. Sponsors remain accountable for the accuracy of the credentials they vouch for.'
          }
        ]
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Credentials must be truthful',
        text: 'Submitting false, altered or borrowed credentials — including misrepresenting your degree, fellowship, registry status or student status — is grounds for immediate suspension and permanent banning, regardless of when the misrepresentation is discovered.'
      }
    ]
  },
  {
    id: 'accounts',
    title: 'Your Account & Membership ID',
    blocks: [
      {
        type: 'p',
        text: 'Each member receives a unique FocusLinks Membership ID (for example FL-29841-OD) that identifies you across the workspace. Your account is personal to you as a clinician, and you are responsible for maintaining the confidentiality of your login method and for all activity that occurs under your account.'
      },
      {
        type: 'list',
        items: [
          'One account per practitioner. Maintaining duplicate, shared or transferred accounts is prohibited.',
          'Keep your profile accurate — name, credentials, institution, specialties and location must reflect reality and be kept up to date.',
          'Notify us immediately at support@focuslinks.org if you suspect unauthorised access to your account.',
          'You may not sell, rent, sublicense or otherwise transfer your account or Membership ID to any other person or entity.',
          'Impersonating another clinician, institution or FocusLinks staff member is strictly prohibited.',
          'We may reclaim or deactivate Membership IDs that remain unused in breach of these Terms or that were issued in error.'
        ]
      }
    ]
  },
  {
    id: 'clinical-use',
    title: 'Clinical Use & Professional Responsibility',
    blocks: [
      {
        type: 'p',
        text: 'The Service is a professional education and peer-collaboration platform. Everything you read here — cases, pearls, consult answers, poll results, event sessions and playbooks — is contributed by other clinicians for educational purposes and represents peer opinion, not a standard of care, a prescription, or a directive. FocusLinks does not practise medicine and does not endorse any specific diagnostic or therapeutic approach.'
      },
      {
        type: 'p',
        text: 'You remain solely and fully responsible for every clinical decision you make for your patients. Before acting on any content found on FocusLinks, you must independently verify it against your own examination findings, licensed indications, current literature, local regulations and your professional judgement. Never delay or replace direct patient care, emergency services or a formal referral because of something posted on the Service.'
      },
      {
        type: 'callout',
        tone: 'danger',
        title: 'No doctor–patient relationship and no emergency channel',
        text: 'Nothing on FocusLinks creates a doctor–patient relationship between members, or between you and FocusLinks. The Service must never be used to seek, triage or deliver urgent or emergency care. If a patient is at risk, contact your local emergency services immediately.'
      }
    ]
  },
  {
    id: 'content',
    title: 'Your Content & Licence',
    blocks: [
      {
        type: 'p',
        text: 'You retain ownership of the clinical content you post — pearls, cases, images, polls, articles, comments and event material ("Member Content"). By posting Member Content you grant FocusLinks a worldwide, non-exclusive, royalty-free licence to host, store, reproduce, adapt for formatting, and display that content within the Service, and to reference anonymised, aggregated statistics about it for product improvement.'
      },
      {
        type: 'list',
        items: [
          'You confirm you hold all rights needed to post your Member Content, including rights to clinical images you captured.',
          'You are solely responsible for de-identifying Member Content before upload; identifiable patient information is banned under our Community Rules.',
          'You may delete your Member Content at any time; residual cached copies may persist for a short technical window before being purged.',
          'If you believe content infringes your rights, send a takedown notice to legal@focuslinks.org with the material, the basis of your claim and your contact details.',
          'FocusLinks may remove or limit distribution of Member Content that breaches these Terms or the Community Rules.'
        ]
      },
      {
        type: 'p',
        text: 'Other members may cite, learn from and be inspired by your contributions inside the community. Except for the licence above, nothing transfers ownership of your content to us or to other members, and commercial scraping or bulk re-publication of Member Content outside the Service is expressly forbidden.'
      }
    ]
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable Use Standards',
    blocks: [
      {
        type: 'p',
        text: 'FocusLinks is a clinical sanctuary — zero political rants, zero advertisements, zero noise. To protect that standard, you agree not to use the Service to do any of the following:'
      },
      {
        type: 'list',
        items: [
          'Post, upload or transmit identifiable patient information of any kind (faces, names, file numbers, initials, exact dates or practice serial numbers).',
          'Advertise, sell, solicit or promote commercial products, devices, pharmaceuticals, courses or services outside the designated, clearly labelled channels (if any).',
          'Publish political, religious or inflammatory material unrelated to clinical practice.',
          'Harass, demean, discriminate against or personally attack any member, profession, institution or region.',
          'Plagiarise peer contributions or repost others\u2019 cases and images without attribution.',
          'Attempt to access non-public areas, scrape or bulk-download Member Content, or interfere with the Service\u2019s operation or security.',
          'Upload malware, probe vulnerabilities, or circumvent authentication, rate limits or verification checks.',
          'Use the Service for any unlawful purpose or in violation of any medical, privacy or professional regulation applicable to you.'
        ]
      }
    ]
  },
  {
    id: 'events',
    title: 'Circles, Events & Continuing Education',
    blocks: [
      {
        type: 'p',
        text: 'Circles are member-run and member-moderated specialty hubs. Events, grand rounds and symposia listed on the central event board are organised by Circles, institutions or FocusLinks itself. Where an event references continuing-education credits (for example COPE- or CME-style hours), those references are provided by the event organiser for convenience.'
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Verify CE credit with your licensing board',
        text: 'Acceptance of any CE hour claim is governed solely by your local licensing or registration board. FocusLinks makes no warranty that any event, session or recording will be accepted for CE credit in your jurisdiction, and you should confirm eligibility before relying on it.'
      },
      {
        type: 'p',
        text: 'Recordings, slides and protocols shared inside Circles remain subject to the Member Content rules above. Circle leads may remove participants from their Circle for conduct that violates the Community Rules, and FocusLinks may step in where violations are systemic or severe.'
      }
    ]
  },
  {
    id: 'membership',
    title: 'Membership, Fees & Benefit Changes',
    blocks: [
      {
        type: 'p',
        text: 'Core access to FocusLinks — reading the clinical feed, exploring diagnostic imagery, joining Circles, participating in consult hubs and connecting in the directory — is free for the verified global eye care community. Optional paid tiers, when offered, will always be described with their price, billing cycle and included benefits before you commit.'
      },
      {
        type: 'list',
        items: [
          'Paid benefits (if introduced) renew automatically until cancelled, and cancellation takes effect at the end of the current cycle.',
          'We may add, modify or retire free benefits; material reductions will be announced in advance through the announcements channel.',
          'Promotional benefits (for example milestone rewards or early-access features) are personal, non-transferable and may be withdrawn if obtained through abuse.',
          'If a payment is required for any tier, taxes will be itemised where applicable, and refunds will follow the policy stated at the point of sale.'
        ]
      }
    ]
  },
  {
    id: 'moderation',
    title: 'Moderation & Enforcement',
    blocks: [
      {
        type: 'p',
        text: 'The clinical review board and automated safeguards monitor the Service for breaches of these Terms and the Community Rules. Enforcement is applied proportionately and consistently, and is intended to protect patients, members and the clinical integrity of the community.'
      },
      {
        type: 'sub',
        points: [
          { label: 'Step 1 — Notice', text: 'Most first-time issues receive a private warning with an explanation and the opportunity to correct the content or behaviour.' },
          { label: 'Step 2 — Removal', text: 'Breaching content may be edited, hidden or removed without notice where patient privacy or member safety is at risk.' },
          { label: 'Step 3 — Restrictions', text: 'Repeat or serious breaches can result in limited permissions: posting holds, read-only mode or removal from Circles and events.' },
          { label: 'Step 4 — Suspension or ban', text: 'Fake credentials, patient-privacy violations, harassment or platform abuse can lead to suspension or a permanent ban of the account and, where necessary, related accounts.' }
        ]
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Right of appeal',
        text: 'Every enforcement action can be appealed by replying to the moderation notice or writing to support@focuslinks.org. Appeals are reviewed by a different reviewer than the one who issued the action wherever staffing allows.'
      }
    ]
  },
  {
    id: 'disclaimers-liability',
    title: 'Disclaimers & Limitation of Liability',
    blocks: [
      {
        type: 'p',
        text: 'The Service is provided on an "as is" and "as available" basis. FocusLinks disclaims all warranties of any kind, whether express or implied, including fitness for a particular purpose, accuracy of clinical content, and uninterrupted availability. We do not warrant that the Service will be error-free, secure without interruption, or that defects will be corrected in every case.'
      },
      {
        type: 'list',
        items: [
          'To the maximum extent permitted by law, FocusLinks\u2019 aggregate liability arising out of or relating to the Service is limited to the greater of the fees you paid us in the 12 months preceding the claim or USD 100.',
          'FocusLinks will not be liable for indirect, incidental, special, consequential or punitive damages, including loss of data, goodwill or professional or economic advantage.',
          'We are not liable for the acts, omissions or content of any member, Circle, event organiser or third-party link.',
          'Nothing in these Terms excludes liability that cannot be excluded under applicable law, including statutory consumer guarantees.'
        ]
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Clinical decisions stay yours',
        text: 'Because every case is different and technology can fail, the final safety net is always your own licensed clinical judgement applied at the chairside — supported, never replaced, by this community.'
      }
    ]
  },
  {
    id: 'changes',
    title: 'Changes to These Terms',
    blocks: [
      {
        type: 'p',
        text: 'We may update these Terms as the platform evolves — for example when new features ship, new regions come online, or regulations change. The current version is always available in the footer of the website, and the "Last updated" date at the top of this document reflects the latest revision. For material changes that significantly affect your rights, we will also announce the update through in-product notices or email to registered members.'
      },
      {
        type: 'p',
        text: 'Continuing to use the Service after a revision takes effect constitutes acceptance of the updated Terms. If you disagree with a revision, you may stop using the Service and request deletion of your account at any time.'
      }
    ]
  },
  {
    id: 'contact',
    title: 'Governing Law & Contact',
    blocks: [
      {
        type: 'p',
        text: 'These Terms are governed by the laws applicable at the registered office of FocusLinks, without regard to conflict-of-law rules, and any dispute will be resolved in the courts of that jurisdiction unless mandatory local law provides otherwise. Some jurisdictions provide consumer protections that cannot be waived; where they apply, they prevail over these Terms to that extent.'
      },
      {
        type: 'p',
        text: 'Notices under these Terms may be sent to legal@focuslinks.org, or to the FocusLinks registered address published on the website. We will send notices to you through the email address on your account or through in-product messaging, and notices sent that way are deemed received one day after dispatch.'
      }
    ]
  }
];

export const TermsPage: React.FC<TermsPageProps> = ({ onBackToHome, onEnterApp, onNavigate }) => {
  const meta = getLegalDocMeta('terms');
  return (
    <DocShell
      eyebrow="Legal & Policies"
      title="FocusLinks"
      titleAccent="Terms of Service"
      icon={FileText}
      accent={meta.accent}
      intro="The working agreement for every member of the verified community: who can join, how credentials are handled, what you may post, and how clinical responsibility is shared."
      lastUpdated={meta.lastUpdated}
      readingTime={meta.readingTime}
      sections={SECTIONS}
      onBackToHome={onBackToHome}
      onEnterApp={onEnterApp}
      onNavigate={onNavigate}
    />
  );
};
