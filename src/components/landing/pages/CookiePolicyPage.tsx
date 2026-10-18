import React from 'react';
import { Cookie } from 'lucide-react';
import { DocShell } from './DocShell';
import type { DocSection } from '../subViews';
import { getLegalDocMeta } from '../subViews';

interface CookiePolicyPageProps {
  onBackToHome: () => void;
  onEnterApp: () => void;
  onNavigate?: (view: 'howto' | 'terms' | 'privacy' | 'rules' | 'cookies' | 'disclaimer') => void;
}

const SECTIONS: DocSection[] = [
  {
    id: 'what-are',
    title: 'What Cookies & Local Storage Are',
    blocks: [
      {
        type: 'p',
        text: 'Cookies are small text files placed on your device by a website, and local storage is a related browser technology that keeps small amounts of data on your device between visits. Both are used to remember state — keeping you logged in, remembering that you prefer dark mode, and protecting the platform against abuse. Together with similar technologies they are referred to as "cookies" in this policy.'
      },
      {
        type: 'p',
        text: 'FocusLinks uses as few of these technologies as possible. Because the platform is advertising-free and peer-only by design, there is no third-party advertising network, no social-media pixel and no data-broker script on this website whose cookies we would need to catalogue or consent-manage.'
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Zero ad trackers — permanently',
        text: 'FocusLinks does not run third-party advertising or social-tracking cookies, and we never will. The only cookies and storage on this platform are strictly necessary or preference-related, and they are set by FocusLinks itself.'
      }
    ]
  },
  {
    id: 'what-we-use',
    title: 'What We Set & Why',
    blocks: [
      {
        type: 'p',
        text: 'The table below describes every category of cookie and local-storage entry the Service uses. None of them follow you across other websites or build a behavioural profile.'
      },
      {
        type: 'sub',
        points: [
          {
            label: 'Session & authentication (strictly necessary)',
            text: 'Keeps you signed in to the verified workspace and protects clinical content behind your login. Without it, the Service cannot deliver member-only discussion securely. Cleared when you sign out.'
          },
          {
            label: 'Security tokens (strictly necessary)',
            text: 'Short-lived anti-forgery and anti-abuse tokens that guard login, verification and posting actions against bots and credential-stuffing attempts.'
          },
          {
            label: 'Preferences (local storage)',
            text: 'Your dark/light theme choice, collapsed-or-expanded layout state and other interface preferences, so the workspace feels the way you left it. Contains no personal profile data.'
          },
          {
            label: 'Verification flow (strictly necessary)',
            text: 'Temporary state while you complete credential verification or onboarding steps, so progress is not lost between screens. Deleted when the flow completes.'
          },
          {
            label: 'Aggregate analytics (first-party only)',
            text: 'Where enabled, coarse page-level counts computed from first-party storage so we know which help pages are useful. No cross-site tracking, no selling, no profiling.'
          }
        ]
      }
    ]
  },
  {
    id: 'third-parties',
    title: 'Third-Party Requests',
    blocks: [
      {
        type: 'p',
        text: 'A small number of trusted infrastructure providers act on our instructions to run the Service — for example cloud hosting, email delivery and error monitoring. These providers may set narrowly scoped technical cookies necessary for security and load balancing while you are on the Service. They are contractually prohibited from using member data for their own purposes, and none of them are advertising companies.'
      },
      {
        type: 'p',
        text: 'Images you upload remain in FocusLinks storage. Public website fonts and icons, where used on the marketing pages, are either self-hosted or loaded in a privacy-preserving way so that your IP address is not harvested by third parties.'
      }
    ]
  },
  {
    id: 'control',
    title: 'How You Can Control Cookies',
    blocks: [
      {
        type: 'p',
        text: 'You remain in control. Every modern browser lets you review, block or delete cookies and clear local storage. Remember that the strictly necessary items exist to keep verified content secure — blocking them will degrade the experience rather than enhance privacy.'
      },
      {
        type: 'list',
        items: [
          'Browser settings: find "Privacy and security" in Chrome, Safari, Firefox or Edge to block or delete cookies per site.',
          'Clearing storage: use "Clear browsing data" to remove local storage; your theme and layout preferences will reset.',
          'Private browsing: session data is discarded automatically when an incognito or private window closes.',
          'Signing out: clears your authentication cookie immediately — the workspace cannot be opened behind a stale login.',
          'Opting out of optional emails is separate from cookies and can be done from any email footer or account settings.'
        ]
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Blocking strictly necessary storage',
        text: 'If you block strictly necessary cookies, verification and login may fail and clinical content will remain locked. This is by design: it is the same gate that keeps patient-safe discussion out of public view.'
      }
    ]
  },
  {
    id: 'dnt',
    title: 'Do Not Track & Consent',
    blocks: [
      {
        type: 'p',
        text: 'Because FocusLinks sets no advertising or cross-site tracking technologies, "Do Not Track" and Global Privacy Control signals require no special handling here: there is simply no third-party tracking to stop. Members in regions with strict consent regimes (EEA/UK and elsewhere) do not encounter a cookie wall for advertising because there is no advertising consent to give.'
      },
      {
        type: 'p',
        text: 'If we ever introduce a technology that would require consent under applicable law, we will ask for it first, granularly, and honour refusal — before the technology loads, not after.'
      }
    ]
  },
  {
    id: 'changes-contact',
    title: 'Changes & Contact',
    blocks: [
      {
        type: 'p',
        text: 'If our use of cookies or local storage ever changes — for instance if a new feature introduces a preference we need to store — this policy will be updated and the "Last updated" date revised before the change ships. Material additions affecting your rights will be announced in-product.'
      },
      {
        type: 'p',
        text: 'Questions about anything in this policy can be sent to privacy@focuslinks.org. For general platform help, the How-To guide and support@focuslinks.org are the fastest routes; for legal notices, use legal@focuslinks.org.'
      }
    ]
  }
];

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({ onBackToHome, onEnterApp, onNavigate }) => {
  const meta = getLegalDocMeta('cookies');
  return (
    <DocShell
      eyebrow="Legal & Policies"
      title="Cookie"
      titleAccent="Policy"
      icon={Cookie}
      accent={meta.accent}
      intro="The short, honest list of cookies and local storage FocusLinks sets — strictly necessary and preference entries only, with zero advertising trackers by design."
      lastUpdated={meta.lastUpdated}
      readingTime={meta.readingTime}
      sections={SECTIONS}
      onBackToHome={onBackToHome}
      onEnterApp={onEnterApp}
      onNavigate={onNavigate}
    />
  );
};
