import React from 'react';
import { Stethoscope } from 'lucide-react';
import { DocShell } from './DocShell';
import type { DocSection } from '../subViews';
import { getLegalDocMeta } from '../subViews';

interface DisclaimerPageProps {
  onBackToHome: () => void;
  onEnterApp: () => void;
  onNavigate?: (view: 'howto' | 'terms' | 'privacy' | 'rules' | 'cookies' | 'disclaimer') => void;
}

const SECTIONS: DocSection[] = [
  {
    id: 'purpose',
    title: 'What FocusLinks Is — and Is Not',
    blocks: [
      {
        type: 'p',
        text: 'FocusLinks is a professional education and peer-collaboration platform for verified eye care professionals — physicians, optometrists, opticians, orthoptists, nurses, technicians, scientists, educators and trainees. Its purpose is to accelerate clinical learning: sharing de-identified cases, exchanging pearls, debating diagnostic pathways in consult hubs, and practicing the reasoning that makes chairside decisions better. It is a community of colleagues talking to colleagues.'
      },
      {
        type: 'p',
        text: 'FocusLinks is not a clinic, a pharmacy, a diagnostic laboratory, a referral agency or an emergency service. It does not provide medical care, does not issue prescriptions, does not interpret images for any specific patient, and does not substitute for examination, licensure or the treating clinician\u2019s judgment.'
      },
      {
        type: 'callout',
        tone: 'danger',
        title: 'Peer education, not medical advice',
        text: 'All clinical content on this platform — cases, pearls, answers, polls, articles, event talks and playbooks — is peer opinion shared for education. It is not medical advice, a standard of care, or a treatment protocol for any specific patient.'
      }
    ]
  },
  {
    id: 'no-relationship',
    title: 'No Doctor–Patient Relationship',
    blocks: [
      {
        type: 'p',
        text: 'Using FocusLinks — reading, posting, asking, answering, attending events or messaging colleagues — does not create a doctor–patient relationship between any two members, nor between you and FocusLinks. Members who discuss a case are acting as educators and peers, never as the treating provider of the patient behind a de-identified case.'
      },
      {
        type: 'p',
        text: 'This matters clinically: a peer answering a consult question cannot examine the patient, review the full chart, or follow up on outcomes. Their contribution is a data point for the treating clinician to weigh — not a second opinion that closes a decision, and not a supervision relationship.'
      }
    ]
  },
  {
    id: 'verify-before-acting',
    title: 'Verify Before You Act',
    blocks: [
      {
        type: 'p',
        text: 'Every clinical idea picked up here must pass through your own professional filter before it touches a patient. That filter includes:'
      },
      {
        type: 'list',
        items: [
          'Your own examination findings and the patient\u2019s full history, not the abbreviated version in a post.',
          'Licensed indications, contraindications and local formularies for any drug, concentration or dosing mentioned — verify against the approved label and current pharmacology references.',
          'Current guidelines and consensus documents relevant to your jurisdiction, which may differ from the practice norms discussed by international peers.',
          'Device manuals and calibration standards for any instrument parameter, nomogram or protocol shared by another member.',
          'Escalation to in-person specialist care whenever the clinical picture exceeds what a de-identified discussion can safely support.'
        ]
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Precision is your responsibility',
        text: 'Drug names, concentrations, dosing schedules and device settings travel through posts quickly. Always confirm them at source before prescribing or setting up equipment — a transposed digit in a forum post is not a prescription.'
      }
    ]
  },
  {
    id: 'no-emergencies',
    title: 'Never for Emergencies',
    blocks: [
      {
        type: 'p',
        text: 'FocusLinks is asynchronous by nature. No member is obliged to answer quickly, no moderator is on call, and no channel here is monitored for urgent clinical triage. It must therefore never be used to seek help for a patient who is currently at risk.'
      },
      {
        type: 'callout',
        tone: 'danger',
        title: 'If a patient is at risk right now',
        text: 'Contact your local emergency services, your on-call ophthalmology service, or direct the patient to the nearest emergency department immediately. Then, if it is useful for teaching, share the resolved case afterwards — the community learns best from completed stories, not live crises.'
      }
    ]
  },
  {
    id: 'de-identification',
    title: 'De-Identification Reminder',
    blocks: [
      {
        type: 'p',
        text: 'Every case shared on the platform must be fully de-identified before upload — no patient faces, names, file numbers, initials, birthdates, exact dates or practice serial numbers, in images or in text. This is both a Community Rule and a legal safeguard under privacy frameworks such as HIPAA and GDPR.'
      },
      {
        type: 'p',
        text: 'The Medical Disclaimer does not replace those obligations: even a brilliant teaching case is unacceptable on the platform if a patient could be identified from it. When in doubt, crop, generalize and describe — "62-year-old female" teaches the same pearl as a chart screenshot ever could.'
      }
    ]
  },
  {
    id: 'ce-events',
    title: 'Events, CE Hours & External Content',
    blocks: [
      {
        type: 'p',
        text: 'Event listings, symposium sessions and grand rounds on the central board may reference continuing-education credits (for example COPE, CME or comparable hours). Those references are supplied by event organizers for convenience. Whether a session counts toward your license is decided solely by your licensing or registration board — verify eligibility with them before relying on any CE claim.'
      },
      {
        type: 'p',
        text: 'Where posts link to external journals, guidelines, tools or websites, FocusLinks does not control and is not responsible for their content, availability or privacy practices. A link is a starting point for your own verification, never an endorsement of everything on the destination.'
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Simulations and demo content',
        text: 'Marketing demonstrations, interactive walkthroughs and illustrative scans shown on the public pages are simulated or fictional and contain no real patient data. They exist to show how the workspace behaves, not to teach a clinical finding.'
      }
    ]
  },
  {
    id: 'ai-and-simulation',
    title: 'Peer Content, AI Tools & Accuracy',
    blocks: [
      {
        type: 'p',
        text: 'Some contributions may be produced with the assistance of AI tools, drafts or simulations. Regardless of how content is created, the member who posts it is responsible for its clinical accuracy and for labeling uncertainty. AI outputs must never be presented as confirmed diagnoses, imaging reads or peer-reviewed evidence.'
      },
      {
        type: 'p',
        text: 'FocusLinks works to keep the platform accurate through verification, moderation and community correction, but we cannot guarantee that any specific contribution is complete, current or correct. Errors should be reported through the report action or to support@focuslinks.org so they can be corrected quickly.'
      }
    ]
  },
  {
    id: 'contact',
    title: 'Questions About This Disclaimer',
    blocks: [
      {
        type: 'p',
        text: 'If anything here is unclear — for example whether a case is safe to share, how to de-identify a tricky image set, or what your board accepts for CE credit — ask before posting. The How-To guide covers de-identification step by step, and support@focuslinks.org reaches a human on the clinical review board, typically within one business day.'
      },
      {
        type: 'p',
        text: 'For legal notices regarding content on the platform, contact legal@focuslinks.org. For privacy questions about your own data, contact privacy@focuslinks.org.'
      }
    ]
  }
];

export const DisclaimerPage: React.FC<DisclaimerPageProps> = ({ onBackToHome, onEnterApp, onNavigate }) => {
  const meta = getLegalDocMeta('disclaimer');
  return (
    <DocShell
      eyebrow="Legal & Policies"
      title="Medical"
      titleAccent="Disclaimer"
      icon={Stethoscope}
      accent={meta.accent}
      intro="How clinical content on FocusLinks must and must not be used: peer education to sharpen your judgment — never a replacement for it, and never an emergency channel."
      lastUpdated={meta.lastUpdated}
      readingTime={meta.readingTime}
      sections={SECTIONS}
      onBackToHome={onBackToHome}
      onEnterApp={onEnterApp}
      onNavigate={onNavigate}
    />
  );
};
