import React from 'react';
import { ScrollText } from 'lucide-react';
import { DocShell } from './DocShell';
import type { DocSection } from '../subViews';
import { getLegalDocMeta } from '../subViews';

interface RulesPageProps {
  onBackToHome: () => void;
  onEnterApp: () => void;
  onNavigate?: (view: 'howto' | 'terms' | 'privacy' | 'rules' | 'cookies' | 'disclaimer') => void;
}

const SECTIONS: DocSection[] = [
  {
    id: 'purpose',
    title: 'Why These Rules Exist',
    blocks: [
      {
        type: 'p',
        text: 'FocusLinks exists because optometrists deserve a clinical space that is peer-only, de-identified and completely noise-free — no political rants, no advertisements, no algorithmic bait. These six Community Rules are the operating manual for keeping it that way. They apply everywhere on the platform: the feed, consult hubs, Q&A, Circles, Spotlight stories, Explore imagery, the directory, events and direct messages.'
      },
      {
        type: 'p',
        text: 'The rules are short by design. Behind each one sits a simple test: would a respected colleague in another country find this post safe, useful and professionally grounded? If you are unsure whether something crosses a line, that uncertainty is usually the answer — hold the post, de-identify harder, or ask the moderators first.'
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Rules are enforced, not decorative',
        text: 'Moderation is active and human-led, backed by automated screening. Violations follow the enforcement ladder at the bottom of this document — and every action can be appealed.'
      }
    ]
  },
  {
    id: 'rule-1',
    title: 'Rule 01 — Verified Practitioners Only',
    blocks: [
      {
        type: 'p',
        text: 'Every member must register with truthful, verifiable credentials and keep them current. The credibility of every consult answer, pearl and case depends on the community knowing that a real, qualified clinician stands behind each Membership ID.'
      },
      {
        type: 'list',
        items: [
          'Register only with your own degree, licence, registry or student credentials — never borrowed, altered or fabricated ones.',
          'Keep your profile truthful: name, credentials, institution, specialties and region must match reality.',
          'Students and residents must keep their Verified Student status accurate and upgrade upon graduation.',
          'Sponsors in a Credential Sponsor Handshake are accountable for the colleagues they vouch for.',
          'One human, one account — duplicate, shared or transferred accounts are prohibited.'
        ]
      },
      {
        type: 'callout',
        tone: 'danger',
        title: 'Zero-tolerance violation',
        text: 'Credential fraud is the single fastest route to a permanent ban. Fake credentials put patients at risk and poison the trust the whole platform runs on.'
      }
    ]
  },
  {
    id: 'rule-2',
    title: 'Rule 02 — De-Identify Every Patient, Every Time',
    blocks: [
      {
        type: 'p',
        text: 'Patient privacy is non-negotiable. Before anything is uploaded, remove every identifier that could connect clinical content to a real person. De-identification is a manual step today — make it a habit, not an afterthought.'
      },
      {
        type: 'list',
        items: [
          'Crop or cover patient faces, tattoos, jewellery and any distinguishing marks from slit-lamp photos, OCT captures and fundus images.',
          'Strip names, file numbers, MRNs, initials, birthdates, exact examination dates and practice serial numbers from images, files, EXIF-adjacent fields and text.',
          'Describe patients generically — "38-year-old male", "postmenopausal female" — never "my 9 a.m. Tuesday patient".',
          'Check device overlays: many imaging systems print patient identifiers by default; disable or mask them before capture.',
          'When in doubt about a rare case, alter or omit details that could identify a patient to neighbours or colleagues in a small community.'
        ]
      },
      {
        type: 'callout',
        tone: 'danger',
        title: 'Identifiable patient data is removed on sight',
        text: 'Posting identifiable patient information (PII) breaches these rules immediately. Moderators remove such content as a priority, restrict the account, and in serious or repeated cases ban the member. This protects patients first — and protects you, too.'
      }
    ]
  },
  {
    id: 'rule-3',
    title: 'Rule 03 — Clinical Excellence Only',
    blocks: [
      {
        type: 'p',
        text: 'FocusLinks is a professional sanctuary. Content that would never appear in a good journal club does not belong here, regardless of engagement potential.'
      },
      {
        type: 'list',
        items: [
          'No advertising, product promotion, sales funnels, affiliate links, discount codes or recruitment spam.',
          'No political, religious or ideological rants — however eye-care-adjacent they claim to be.',
          'No engagement bait: "like if you agree", karma farming, recycled listicles or AI-generated filler without clinical substance.',
          'No off-topic flood posting; one strong case teaches more than ten shallow ones.',
          'Disclose any relevant commercial relationship (e.g., you consult for a device maker) when discussing that product class.',
          'Event and CE promotions belong in the designated channels and must state the organising body honestly.'
        ]
      }
    ]
  },
  {
    id: 'rule-4',
    title: 'Rule 04 — Respect Your Peers',
    blocks: [
      {
        type: 'p',
        text: 'Rigorous debate is welcome; personal attacks are not. The community spans every continent, career stage and practice setting, and junior voices must be safe to ask basic questions.'
      },
      {
        type: 'list',
        items: [
          'Critique the clinical reasoning, never the person, their accent, country, gender, faith or institution.',
          'No harassment, stalking, doxxing, dogpiling or brigade-style voting campaigns.',
          'Attribute honestly — credit the source of cases, images and pearls you did not create; plagiarism is a moderation matter.',
          'Assume good faith: a question you find basic may be someone\u2019s first week in clinic.',
          'Respect copyright: only upload imagery and material you have the rights to use.'
        ]
      }
    ]
  },
  {
    id: 'rule-5',
    title: 'Rule 05 — Evidence Over Opinion',
    blocks: [
      {
        type: 'p',
        text: 'Peer opinion is the engine of this platform, but it must be labelled as such. Confident, evidence-grounded answers are what make consult hubs worth opening between patients.'
      },
      {
        type: 'list',
        items: [
          'Cite the study or guideline behind any protocol claim (LAMP, CITT, AOK, current consensus documents) whenever one exists.',
          'Clearly mark speculation, personal preference and single-case experience as such — "in my hands" is a valid label.',
          'State drug names, concentrations, dosing and device parameters precisely; vagueness is a clinical risk.',
          'Do not misrepresent AI outputs, simulation tools or provisional findings as confirmed diagnoses.',
          'Correct your own answers when new evidence or peer feedback shows a better path — updated thinking is a strength.'
        ]
      }
    ]
  },
  {
    id: 'rule-6',
    title: 'Rule 06 — Never Use FocusLinks for Emergencies',
    blocks: [
      {
        type: 'p',
        text: 'Asynchronous peer discussion can guide next-week management; it can never replace immediate, hands-on care. The platform is not monitored around the clock and no member owes anyone an urgent reply.'
      },
      {
        type: 'callout',
        tone: 'danger',
        title: 'If a patient is at risk right now',
        text: 'Escalate directly: local emergency services, your on-call ophthalmologist, or the nearest emergency department. Do not post, message or wait for consult answers. Posts seeking urgent real-time triage will be redirected to emergency pathways.'
      },
      {
        type: 'p',
        text: 'The same principle applies in reverse: if you see a post that suggests a patient is currently at risk, remind the author of emergency pathways and flag the post for moderators using the report button.'
      }
    ]
  },
  {
    id: 'enforcement',
    title: 'How Enforcement Works',
    blocks: [
      {
        type: 'p',
        text: 'Moderators — supported by automated screening — review reports and proactive scans. Actions are proportionate, recorded and consistent, and the seriousness of the violation matters more than the member\u2019s seniority or follower count.'
      },
      {
        type: 'sub',
        points: [
          { label: 'Private warning', text: 'Typical first step: an explanation of the breach with the chance to fix or delete the content.' },
          { label: 'Content removal', text: 'Breaching posts, images or answers are removed; privacy-critical removals happen without prior notice.' },
          { label: 'Permission restrictions', text: 'Posting holds, read-only mode, or removal from Circles, events and directory visibility for repeat issues.' },
          { label: 'Suspension', text: 'Temporary account lock for serious or accumulated violations, with the reason stated in writing.' },
          { label: 'Permanent ban', text: 'Reserved for credential fraud, patient-privacy violations, harassment campaigns or continued abuse after warnings.' }
        ]
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Every action can be appealed',
        text: 'Reply to the moderation notice or email support@focuslinks.org within 30 days. Appeals are reviewed by a different reviewer wherever staffing allows, and outcomes are always explained.'
      }
    ]
  },
  {
    id: 'reporting',
    title: 'Reporting a Problem',
    blocks: [
      {
        type: 'p',
        text: 'You are the community\u2019s early-warning system. Use the report action on any post, answer, profile or message, or email support@focuslinks.org with links and screenshots where possible. Reports about patient privacy are treated as highest priority and reviewed first.'
      },
      {
        type: 'p',
        text: 'Reports are confidential by default: the reported member is never told who flagged them unless the matter requires it (for example a legal claim). Good-faith reports never count against you, even if the moderators ultimately disagree with your reading of the rules.'
      }
    ]
  }
];

export const RulesPage: React.FC<RulesPageProps> = ({ onBackToHome, onEnterApp, onNavigate }) => {
  const meta = getLegalDocMeta('rules');
  return (
    <DocShell
      eyebrow="Legal & Policies"
      title="Community"
      titleAccent="Rules"
      icon={ScrollText}
      accent={meta.accent}
      intro="Six rules that keep FocusLinks a peer-only, de-identified, noise-free clinical sanctuary — what they mean in practice and how enforcement works."
      lastUpdated={meta.lastUpdated}
      readingTime={meta.readingTime}
      sections={SECTIONS}
      onBackToHome={onBackToHome}
      onEnterApp={onEnterApp}
      onNavigate={onNavigate}
    />
  );
};
