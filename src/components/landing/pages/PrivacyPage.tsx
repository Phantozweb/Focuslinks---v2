import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { DocShell } from './DocShell';
import type { DocSection } from '../subViews';
import { getLegalDocMeta } from '../subViews';

interface PrivacyPageProps {
  onBackToHome: () => void;
  onEnterApp: () => void;
  onNavigate?: (view: 'howto' | 'terms' | 'privacy' | 'rules' | 'cookies' | 'disclaimer') => void;
}

const SECTIONS: DocSection[] = [
  {
    id: 'overview',
    title: 'Overview & Scope',
    blocks: [
      {
        type: 'p',
        text: 'This Privacy Policy explains what information FocusLinks collects, why we collect it, how it is protected, and the choices and rights you have. It applies to all visitors, applicants and verified members of the Service worldwide. FocusLinks is the data controller for the personal data described here, and you can reach our privacy team at any point at privacy@focuslinks.org.'
      },
      {
        type: 'p',
        text: 'FocusLinks was built around a simple data philosophy: collect the minimum needed to verify clinicians and run the community, never touch identifiable patient data, and never build an advertising business on our members. This policy should be read together with our Terms of Service, Community Rules and Cookie Policy.'
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'The short version',
        text: 'We collect your professional identity and platform activity, we never want your patients\u2019 personal data, we never sell or ad-target with member data, and all clinical discussion is locked behind verified login and out of search engines.'
      }
    ]
  },
  {
    id: 'collect',
    title: 'Information We Collect',
    blocks: [
      {
        type: 'p',
        text: 'We collect the following categories of information, always limited to what the community model requires:'
      },
      {
        type: 'sub',
        points: [
          {
            label: 'Identity & credentials',
            text: 'Full name, email address, professional credentials (degree, licence, registry or student ID), institution and graduation details submitted during verification, plus your Membership ID and login method.'
          },
          {
            label: 'Professional profile',
            text: 'Your chosen specialties, endorsements, bio, profile photo, city or region, preferred language and the connections you establish with other members.'
          },
          {
            label: 'Member Content & activity',
            text: 'Posts, cases, images, pearls, polls, articles, questions, answers, votes, event RSVPs, Circle memberships and messages you choose to publish or exchange inside the workspace.'
          },
          {
            label: 'Technical & usage data',
            text: 'IP address, browser and device type, theme and layout preferences, referral source and coarse interaction analytics used to keep the Service healthy and secure.'
          },
          {
            label: 'Support & moderation records',
            text: 'Tickets, appeals, reports and enforcement notes, retained so that moderation decisions remain consistent and auditable.'
          }
        ]
      },
      {
        type: 'p',
        text: 'Credential documents used purely for verification (college IDs, degree certificates, letterhead) are used to decide your application and are not displayed to other members; only your verified status and the badge you qualify for are shown.'
      }
    ]
  },
  {
    id: 'patient-privacy',
    title: 'Patient Privacy & De-Identification-First Design',
    blocks: [
      {
        type: 'p',
        text: 'FocusLinks is a clinician community, not a medical record system, and it is not designed to receive patient files. Our rules require you to de-identify every case before upload: crop or cover faces, remove names, file numbers, initials, exact dates and practice serial numbers, and describe patients generically (for example "62-year-old female"). We do not build fields, storage or tooling for patient identity data, and we do not want it.'
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'If patient data reaches us anyway',
        text: 'If identifiable patient information is posted, our moderators remove it as a priority and may restrict the account under the Community Rules. Server-side, such content is treated as confidential, access-restricted and deleted once the moderation record is complete. If you are a patient and believe data about you appears on the Service, contact privacy@focuslinks.org and we will act on it urgently.'
      },
      {
        type: 'p',
        text: 'Because Member Content is de-identified by design, the clinical discussions hosted on FocusLinks are generally outside the definition of protected health information under HIPAA; nevertheless we operate the platform to HIPAA-grade safeguards so that members can discuss care confidently and lawfully.'
      }
    ]
  },
  {
    id: 'use',
    title: 'How We Use Information',
    blocks: [
      {
        type: 'list',
        items: [
          'To verify eligibility and issue your Membership ID, badge and workspace permissions.',
          'To operate core community features: feeds, consult hubs, Circles, events, the directory, Spotlight stories and Explore imagery.',
          'To keep the Service safe — fraud and bot detection, credential-fraud screening, moderation, enforcement and appeals.',
          'To personalise your experience (For You feed ranking, saved Vault items, theme and layout preferences) without ad targeting.',
          'To communicate essential service updates, verification outcomes, security alerts and — only with your opt-in — product announcements.',
          'To produce aggregated, anonymised statistics (for example community growth or hub activity) that cannot identify any individual member.',
          'To comply with law, respond to lawful requests and enforce our Terms, Community Rules and this policy.'
        ]
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'What we never do',
        text: 'We never sell member data, never share it with advertisers or data brokers, and never run third-party advertising or social-tracking pixels inside the workspace. FocusLinks is an advertising-free platform by design.'
      }
    ]
  },
  {
    id: 'legal-basis',
    title: 'Legal Bases for Processing (GDPR)',
    blocks: [
      {
        type: 'p',
        text: 'For members and visitors in the European Economic Area and the United Kingdom, we process personal data on the following legal bases, depending on the purpose:'
      },
      {
        type: 'sub',
        points: [
          { label: 'Contract (Art. 6(1)(b))', text: 'Operating your account, verification, Member Content delivery, connections, Circles and events — the core of the service you signed up for.' },
          { label: 'Legitimate interests (Art. 6(1)(f))', text: 'Security, fraud prevention, moderation, service improvement analytics and protecting the clinical integrity of the community, balanced against your rights.' },
          { label: 'Consent (Art. 6(1)(a))', text: 'Optional communications such as product newsletters, and any non-essential cookies or local storage beyond those described in the Cookie Policy.' },
          { label: 'Legal obligation (Art. 6(1)(c))', text: 'Retaining moderation and account records where law requires, and responding to lawful requests from authorities.' }
        ]
      },
      {
        type: 'p',
        text: 'Where we rely on consent, you can withdraw it at any time from account settings or by contacting us, without affecting the lawfulness of processing carried out before withdrawal.'
      }
    ]
  },
  {
    id: 'sharing',
    title: 'How Information Is Shared',
    blocks: [
      {
        type: 'p',
        text: 'The Service is a community, so some of your data is inherently visible to other verified members — that visibility is the point, and you control the content of it:'
      },
      {
        type: 'list',
        items: [
          'Verified members can see your profile (name, credentials level, specialties, endorsements, region) and the Member Content you publish.',
          'Service providers (cloud hosting, email delivery, error monitoring) process data under contract strictly on our instructions, with confidentiality and security obligations.',
          'Professional advisers (legal, audit) and authorities may receive data where reasonably necessary for legal claims or to comply with law.',
          'In a merger, acquisition or asset sale, member data may transfer to the successor entity under this same policy, with notice given beforehand.',
          'Aggregated, de-identified statistics may be published (for example "12,400+ members") that cannot reasonably identify you.'
        ]
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Search-engine shield',
        text: 'Clinical discussion, diagnostic consults and case histories sit strictly behind verified login. We block search-engine indexing of member content, so your cases and questions do not appear in public search results.'
      }
    ]
  },
  {
    id: 'security',
    title: 'Security & Where Data Lives',
    blocks: [
      {
        type: 'p',
        text: 'All discussion threads, diagnostic consults and case histories are stored on secure cloud environments with encryption in transit and at rest. Access to view any clinical discussion is locked strictly behind verified doctor login, preventing public exposure or indexing. Administrative access follows least-privilege principles, is logged, and is limited to trained staff who need it to run the Service.'
      },
      {
        type: 'list',
        items: [
          'Transport encryption (TLS) on every connection and encryption at rest for stored data.',
          'Verified-only access gates for all clinical content, with no public sharing URLs.',
          'Continuous vulnerability monitoring, dependency updates and incident-response runbooks.',
          'Strict no-index headers for authenticated surfaces, keeping member content out of search engines.',
          'A 72-hour breach-notification commitment to members and regulators where law requires.'
        ]
      }
    ]
  },
  {
    id: 'retention',
    title: 'Data Retention',
    blocks: [
      {
        type: 'p',
        text: 'We keep personal data only as long as needed for the purposes above:'
      },
      {
        type: 'list',
        items: [
          'Account and profile data: retained while your account is active, and for 30 days after deletion requests to allow restoration in case of mistake, then purged.',
          'Member Content: retained until you delete it; deleting your account removes your content unless it cannot be separated from community records, in which case it is anonymised.',
          'Verification records and credential submissions: retained for the minimum period required to evidence lawful verification and prevent fraud re-attempts, then destroyed.',
          'Moderation and enforcement records: retained for 24 months to keep decisions consistent, unless a longer period is legally required.',
          'Technical logs: retained on short rolling windows (typically 30–90 days) for security and reliability.'
        ]
      }
    ]
  },
  {
    id: 'rights',
    title: 'Your Privacy Rights & Choices',
    blocks: [
      {
        type: 'p',
        text: 'Wherever you live, you can exercise the following rights over your personal data; EEA/UK members hold them as GDPR rights, and we extend the same standards globally:'
      },
      {
        type: 'list',
        items: [
          'Access — request a copy of the personal data we hold about you.',
          'Rectification — correct inaccurate profile or credential data (most of it is editable directly in Settings).',
          'Erasure — request deletion of your account and data, subject to the retention windows above.',
          'Portability — receive your content and profile data in a structured, machine-readable format.',
          'Objection and restriction — object to processing based on legitimate interests or ask us to pause processing while a dispute is resolved.',
          'Withdrawal of consent — for optional communications and non-essential storage, at any time.',
          'Non-discrimination — exercising these rights never degrades the core service you receive.'
        ]
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'How to exercise your rights',
        text: 'Use in-product Settings for profile corrections, or email privacy@focuslinks.org for anything else. We verify identity through your Membership ID and respond within 30 days. EEA/UK members may also complain to their supervisory authority.'
      }
    ]
  },
  {
    id: 'international',
    title: 'International Transfers',
    blocks: [
      {
        type: 'p',
        text: 'FocusLinks serves a global community, and member data may be processed in countries other than your own, including countries whose data-protection laws differ. Where personal data leaves the EEA or UK, we rely on recognised safeguards such as adequacy decisions or standard contractual clauses, and we apply the security measures described in this policy regardless of where the data is stored.'
      },
      {
        type: 'p',
        text: 'By using the Service, you understand that your Member Content is visible to verified colleagues around the world and that community features inherently operate across borders. If you have questions about a specific transfer, contact privacy@focuslinks.org.'
      }
    ]
  },
  {
    id: 'children',
    title: 'Children & Sensitive Data',
    blocks: [
      {
        type: 'p',
        text: 'The Service is intended exclusively for adult professionals and students in optometry programmes. We do not knowingly collect data from anyone under 18, and accounts discovered to belong to minors are closed and their data deleted. Patients of any age are never users of the Service, and identifiable data about them is prohibited under the Community Rules.'
      },
      {
        type: 'callout',
        tone: 'danger',
        title: 'Special-category data',
        text: 'Please do not post special-category personal data about yourself or others (health data beyond generic clinical descriptions, biometric identifiers, religion, sexuality or political views) unless it is genuinely necessary for a clinical teaching point and fully de-identified as our rules require.'
      }
    ]
  },
  {
    id: 'changes-contact',
    title: 'Changes to This Policy & Contact',
    blocks: [
      {
        type: 'p',
        text: 'We may update this Privacy Policy as the platform and the law evolve. The "Last updated" date above always reflects the current version, and material changes will be announced in-product or by email before they take effect. Continued use of the Service after an update means you accept the revised policy.'
      },
      {
        type: 'p',
        text: 'FocusLinks\u2019 privacy team can be reached at privacy@focuslinks.org for any question, request or complaint about your data. For legal notices, use legal@focuslinks.org; for everything else, support@focuslinks.org is the fastest route.'
      }
    ]
  }
];

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBackToHome, onEnterApp, onNavigate }) => {
  const meta = getLegalDocMeta('privacy');
  return (
    <DocShell
      eyebrow="Legal & Policies"
      title="FocusLinks"
      titleAccent="Privacy Policy"
      icon={ShieldCheck}
      accent={meta.accent}
      intro="How the verified community handles professional data — and why a de-identification-first, ad-free design means we never want your patients' personal information in the first place."
      lastUpdated={meta.lastUpdated}
      readingTime={meta.readingTime}
      sections={SECTIONS}
      onBackToHome={onBackToHome}
      onEnterApp={onEnterApp}
      onNavigate={onNavigate}
    />
  );
};
