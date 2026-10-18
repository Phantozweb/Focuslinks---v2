import React, { useState } from 'react';
import {
  Settings,
  Shield,
  ShieldCheck,
  Bell,
  Eye,
  Sliders,
  Download,
  Lock,
  FileCheck,
  Building,
  MapPin,
  Mail,
  UserCheck,
  Smartphone,
  Layers,
  Database,
  CheckCircle2,
  RefreshCw,
  Sun,
  Moon,
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';
import { DoctorProfile } from '../types';

interface SettingsViewProps {
  currentUser: DoctorProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onUpdateProfile?: (updated: Partial<DoctorProfile>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentUser,
  darkMode,
  onToggleDarkMode,
  onUpdateProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'practice' | 'hipaa' | 'notifications' | 'credentials' | 'appearance'>('practice');

  // Interactive settings state
  const [openForReferrals, setOpenForReferrals] = useState(currentUser.openTo?.referrals ?? true);
  const [openForConsults, setOpenForConsults] = useState(currentUser.openTo?.consulting ?? true);
  const [openForLocum, setOpenForLocum] = useState(currentUser.openTo?.locumTenens ?? false);
  const [autoDeidentify, setAutoDeidentify] = useState(true);
  const [embedWatermark, setEmbedWatermark] = useState(true);
  const [anonymizeMetadata, setAnonymizeMetadata] = useState(true);
  const [losslessDicom, setLosslessDicom] = useState(true);
  const [notifyCases, setNotifyCases] = useState(true);
  const [notifyConsults, setNotifyConsults] = useState(true);
  const [notifyEndorsements, setNotifyEndorsements] = useState(true);
  const [notifyCeReminders, setNotifyCeReminders] = useState(true);
  const [isSavedToast, setIsSavedToast] = useState(false);

  const handleSave = () => {
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 3000);
  };

  const navItems = [
    { id: 'practice' as const, label: 'Practice & Specialty', icon: Building, desc: 'Clinic setup, referrals & clinical scope' },
    { id: 'credentials' as const, label: 'Licensing & Verification', icon: ShieldCheck, desc: 'OD license, NPI & COPE ID' },
    { id: 'hipaa' as const, label: 'HIPAA & Diagnostic Vault', icon: Shield, desc: 'De-identification rules & scan formats' },
    { id: 'notifications' as const, label: 'Clinical Alerts', icon: Bell, desc: 'Consult mentions, pearls & rounds' },
    { id: 'appearance' as const, label: 'Display & DICOM Viewer', icon: Sliders, desc: 'Theme, high-contrast & viewport' },
  ];

  return (
    <div className="w-full space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {isSavedToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-xl flex items-center gap-3 animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-xs font-bold">Clinical Preferences Saved Successfully</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="rounded-3xl bg-white dark:bg-[#121217] border border-neutral-200/80 dark:border-neutral-800/80 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/50">
              Settings & Compliance
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              ID: {currentUser.membershipId || 'FL-29841-OD'}
            </span>
          </div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
            Doctor Practice & Account Settings
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Manage your verified clinical profile, referral availability, HIPAA de-identification rules, and diagnostic display preferences.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-97 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer self-start md:self-auto"
        >
          Save Changes
        </button>
      </div>

      {/* Grid Layout: Sidebar Navigation + Main Settings Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Settings Tabs (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full p-4 rounded-2xl flex items-start gap-3.5 text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 shadow-2xs'
                    : 'bg-white dark:bg-[#121217] border border-neutral-200/80 dark:border-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isActive ? 'bg-blue-600 text-white shadow-xs' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                }`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold leading-tight">{item.label}</p>
                  <p className="text-[11px] text-neutral-400 font-normal leading-tight mt-1">
                    {item.desc}
                  </p>
                </div>
                <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${isActive ? 'translate-x-0.5 text-blue-600' : 'text-neutral-300 dark:text-neutral-600'}`} />
              </button>
            );
          })}

          {/* Export & Compliance Card */}
          <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-[#15151c] border border-neutral-200/80 dark:border-neutral-800/80 space-y-3 mt-4">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 dark:text-neutral-200">
              <Database className="h-4 w-4 text-blue-500" />
              <span>Data & CE Export</span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Download your verified cases, grand rounds transcripts, and COPE certificates in compliant ZIP package.
            </p>
            <button
              onClick={() => {
                alert('Export initiated: Generating encrypted clinical archive package (.zip)...');
              }}
              className="w-full py-2 px-3 rounded-xl bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-bold text-[11px] border border-neutral-200 dark:border-neutral-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-neutral-500" />
              <span>Export Clinical Archive</span>
            </button>
          </div>
        </div>

        {/* Right Settings Content Panel (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121217] border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm space-y-6">
          
          {/* TAB 1: PRACTICE & SPECIALTY */}
          {activeTab === 'practice' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-base font-extrabold text-neutral-900 dark:text-white">
                  Clinical Practice & Referral Scope
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Configure your primary clinic affiliation, subspecialty focus, and colleague referral openness.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Primary Practice / Institute
                  </label>
                  <input
                    type="text"
                    defaultValue={currentUser.clinicName}
                    className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#16161e] px-3.5 py-2 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Practice Location & State
                  </label>
                  <input
                    type="text"
                    defaultValue={currentUser.location}
                    className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#16161e] px-3.5 py-2 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Referral Toggles */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Colleague Referral Openness
                </h3>

                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#16161e] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">Open to Direct Patient Referrals</p>
                    <p className="text-[11px] text-neutral-500">Allow verified OD colleagues to send complex anterior/scleral referrals</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={openForReferrals}
                    onChange={(e) => setOpenForReferrals(e.target.checked)}
                    className="h-5 w-5 rounded accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#16161e] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">Open for Clinical Tele-Consults</p>
                    <p className="text-[11px] text-neutral-500">Accept second-opinion case reviews from verified practitioners</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={openForConsults}
                    onChange={(e) => setOpenForConsults(e.target.checked)}
                    className="h-5 w-5 rounded accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#16161e] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">Locum Tenens & Surgical Sabbatical</p>
                    <p className="text-[11px] text-neutral-500">Signal availability for specialty coverage in your licensed state</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={openForLocum}
                    onChange={(e) => setOpenForLocum(e.target.checked)}
                    className="h-5 w-5 rounded accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CREDENTIALS & LICENSING */}
          {activeTab === 'credentials' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-base font-extrabold text-neutral-900 dark:text-white">
                  Optometric Licensing & Professional Identity
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Your credentials are cross-referenced with national databases (NPI / ARBO) for sovereign platform verification.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-950 dark:text-emerald-300">
                    Sovereign OD Credential Verified
                  </p>
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-400">
                    Membership ID: <span className="font-mono font-bold">{currentUser.membershipId || 'FL-29841-OD'}</span> • Status Active
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    State License #
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentUser.licenseNumber || 'OD-59821-CA'}
                    className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-[#16161e] px-3.5 py-2 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    State Jurisdiction
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentUser.licenseState || 'California (CA)'}
                    className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-[#16161e] px-3.5 py-2 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    National Provider (NPI)
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentUser.npiNumber || '1982736450'}
                    className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-[#16161e] px-3.5 py-2 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#16161e] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white">OE TRACKER / COPE Sync</p>
                  <p className="text-[11px] text-neutral-500">Automatically sync CE credits to Association of Regulatory Boards of Optometry (ARBO)</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-bold font-mono">
                  Connected
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: HIPAA & DIAGNOSTIC VAULT */}
          {activeTab === 'hipaa' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-base font-extrabold text-neutral-900 dark:text-white">
                  HIPAA De-identification & Diagnostic Privacy
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Enforce automatic redaction of patient Protected Health Information (PHI) before scan upload.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#16161e] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">Automated PHI Header Stripping</p>
                    <p className="text-[11px] text-neutral-500">Strips patient names, MRN, DOB, and exam IDs from DICOM / JPEG / PNG scans</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoDeidentify}
                    onChange={(e) => setAutoDeidentify(e.target.checked)}
                    className="h-5 w-5 rounded accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#16161e] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">Clinical Watermark on Export</p>
                    <p className="text-[11px] text-neutral-500">Embeds non-destructive peer educational watermark with your OD ID</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={embedWatermark}
                    onChange={(e) => setEmbedWatermark(e.target.checked)}
                    className="h-5 w-5 rounded accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#16161e] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">Lossless Diagnostic Resolution</p>
                    <p className="text-[11px] text-neutral-500">Preserves uncompressed micrometric optical resolution for AS-OCT and topography</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={losslessDicom}
                    onChange={(e) => setLosslessDicom(e.target.checked)}
                    className="h-5 w-5 rounded accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-base font-extrabold text-neutral-900 dark:text-white">
                  Clinical Alert & Notification Matrix
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Select which clinical events trigger high-priority alerts and push notifications.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#16161e] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">Case Differential Replies & Pearls</p>
                    <p className="text-[11px] text-neutral-500">Alert when a colleague adds a diagnosis or cites your pearl</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyCases}
                    onChange={(e) => setNotifyCases(e.target.checked)}
                    className="h-5 w-5 rounded accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#16161e] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">Direct Clinical Consult Requests</p>
                    <p className="text-[11px] text-neutral-500">Urgent peer review pings from fellow optometrists</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyConsults}
                    onChange={(e) => setNotifyConsults(e.target.checked)}
                    className="h-5 w-5 rounded accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#16161e] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">COPE CE Expiration & License Alerts</p>
                    <p className="text-[11px] text-neutral-500">Reminders when renewal cycle deadlines or grand rounds approach</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyCeReminders}
                    onChange={(e) => setNotifyCeReminders(e.target.checked)}
                    className="h-5 w-5 rounded accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: APPEARANCE & VIEWER */}
          {activeTab === 'appearance' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-base font-extrabold text-neutral-900 dark:text-white">
                  Display Theme & Diagnostic Viewing Modes
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Optimize your viewing environment for clinical exam rooms or bright ambient light.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-[#16161e] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white">Theme Mode</p>
                  <p className="text-[11px] text-neutral-500">
                    Currently using {darkMode ? 'Dark Clinical Theme (recommended for exam rooms)' : 'Light Clean Theme'}
                  </p>
                </div>
                <button
                  onClick={onToggleDarkMode}
                  className="px-4 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-neutral-600" />}
                  <span>{darkMode ? 'Switch to Light' : 'Switch to Dark'}</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
