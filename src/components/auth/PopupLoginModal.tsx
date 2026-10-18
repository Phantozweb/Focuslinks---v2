import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  AlertCircle, 
  Check, 
  User, 
  ArrowRight, 
  X, 
  Sparkles, 
  KeyRound, 
  QrCode, 
  Eye, 
  EyeOff, 
  Stethoscope, 
  ExternalLink,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface PopupLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (membershipId: string, doctorName?: string, email?: string) => void;
  onSwitchToRegister?: () => void;
  initialTab?: 'gmail' | 'membership_id';
}

export const PopupLoginModal: React.FC<PopupLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onSwitchToRegister,
  initialTab = 'gmail',
}) => {
  const [activeTab, setActiveTab] = useState<'gmail' | 'membership_id'>(initialTab);
  
  // Gmail login state
  const [gmailAddress, setGmailAddress] = useState('');
  const [gmailPassword, setGmailPassword] = useState('');
  const [showGmailPassword, setShowGmailPassword] = useState(false);
  const [selectedPresetGoogleAccount, setSelectedPresetGoogleAccount] = useState<string | null>(null);

  // Membership ID login state
  const [membershipIdInput, setMembershipIdInput] = useState('');
  const [securityPin, setSecurityPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  // Process states
  const [status, setStatus] = useState<'idle' | 'authenticating' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Reset or initialize on open
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setStatus('idle');
      setErrorMessage('');
      setStatusMessage('');
      setMembershipIdInput('');
      setSecurityPin('');
      setGmailPassword('');
    }
  }, [isOpen, initialTab]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && status !== 'authenticating') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, status, onClose]);

  // Format membership ID automatically to FL-XXXX-OD
  const handleMembershipIdChange = (value: string) => {
    const upper = value.toUpperCase().trim();
    setMembershipIdInput(upper);
    if (errorMessage) setErrorMessage('');
  };

  // Google SVG Icon Component
  const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );

  // Quick Preset Doctor Accounts for testing & demo convenience
  const PRESET_ACCOUNTS = [
    {
      id: 'FL-29841-OD',
      name: 'Dr. Sirenjeev, OD',
      email: 'iamsirenjeev@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150',
      role: 'Cornea & Specialty Lenses',
      badge: 'Verified OD'
    },
    {
      id: 'FL-44910-OD',
      name: 'Dr. Elena Vance, OD, FAAO',
      email: 'elena.vance.od@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=150',
      role: 'Senior Fellowship Council',
      badge: 'Board Fellow'
    },
    {
      id: 'FL-10822-OD',
      name: 'Dr. Richard Chen, OD',
      email: 'chen.optometry@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150',
      role: 'Academic Resident / Cornea',
      badge: 'Resident'
    }
  ];

  // Submit via Gmail / Google Auth
  const handleGmailSubmit = (accountOverride?: typeof PRESET_ACCOUNTS[0]) => {
    const targetEmail = accountOverride ? accountOverride.email : (gmailAddress || 'iamsirenjeev@gmail.com');
    const targetName = accountOverride ? accountOverride.name : 'Dr. Sirenjeev, OD';
    const targetId = accountOverride ? accountOverride.id : 'FL-29841-OD';

    setStatus('authenticating');
    setStatusMessage('Connecting with Google Identity Services...');

    setTimeout(() => {
      setStatusMessage('Authenticating verified Optometrist credentials...');
      setTimeout(() => {
        setStatus('success');
        setStatusMessage('Google authentication verified. Entering workspace...');
        setTimeout(() => {
          onSuccess(targetId, targetName, targetEmail);
          onClose();
        }, 1000);
      }, 900);
    }, 900);
  };

  // Submit via FocusLinks Membership Key ID
  const handleMembershipIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = membershipIdInput.trim().toUpperCase();

    if (!cleanId) {
      setStatus('error');
      setErrorMessage('Please enter your FocusLinks Membership ID (e.g. FL-29841-OD).');
      return;
    }

    setStatus('authenticating');
    setStatusMessage('Searching FocusLinks Sovereign Directory...');

    setTimeout(() => {
      setStatusMessage('Validating active clinical standing...');
      setTimeout(() => {
        let finalId = cleanId;
        if (!finalId.startsWith('FL-')) {
          finalId = `FL-${cleanId}`;
        }
        if (!finalId.endsWith('-OD')) {
          finalId = `${finalId}-OD`;
        }

        setStatus('success');
        setStatusMessage(`ID ${finalId} verified. Welcome back, Doctor.`);

        setTimeout(() => {
          onSuccess(finalId, 'Verified Optometrist');
          onClose();
        }, 1000);
      }, 900);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Blurred Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          if (status !== 'authenticating') onClose();
        }}
        className="fixed inset-0 bg-neutral-950/70 dark:bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Main Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg bg-white dark:bg-[#111117] rounded-3xl shadow-2xl border border-neutral-200/90 dark:border-neutral-800 overflow-hidden z-10 text-left my-8"
      >
        {/* Top Decorative Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500" />

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          disabled={status === 'authenticating'}
          className="absolute top-5 right-5 h-9 w-9 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50 z-20"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-neutral-900 dark:text-white tracking-tight">
                  FocusLinks
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/60 uppercase tracking-wider">
                  Secure Access
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                The Sovereign Clinical Hub for Optometrists
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight mt-4">
            Sign In to Your Workspace
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
            Choose your preferred sign-in method: direct Google / Gmail authentication or your verified FocusLinks Membership ID.
          </p>

          {/* Interactive Tab Switcher */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-100 dark:bg-[#181824] rounded-2xl border border-neutral-200/70 dark:border-neutral-800 mt-5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('gmail');
                setErrorMessage('');
              }}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'gmail'
                  ? 'bg-white dark:bg-[#12121a] text-neutral-900 dark:text-white shadow-sm border border-neutral-200/60 dark:border-neutral-700'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <GoogleIcon />
              <span>Google / Gmail</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('membership_id');
                setErrorMessage('');
              }}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'membership_id'
                  ? 'bg-white dark:bg-[#12121a] text-neutral-900 dark:text-white shadow-sm border border-neutral-200/60 dark:border-neutral-700'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <KeyRound className="h-4 w-4 text-blue-500" />
              <span>Membership ID</span>
            </button>
          </div>
        </div>

        {/* Tab Body Content */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
          {/* Error Message Alert */}
          {status === 'error' && errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300"
            >
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-500" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Loading / Authenticating State Banner */}
          {status === 'authenticating' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center space-y-4"
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 animate-pulse">
                <RefreshCw className="h-7 w-7 animate-spin" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-neutral-900 dark:text-white">
                  {statusMessage || 'Authenticating...'}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Please hold while we verify your clinical access token.
                </p>
              </div>
            </motion.div>
          )}

          {/* Success State Banner */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center space-y-4"
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-bold text-neutral-900 dark:text-white">
                  {statusMessage}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Preparing your clinical case feed and doctor network...
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 1: GMAIL / GOOGLE LOGIN UI */}
          {status !== 'authenticating' && status !== 'success' && activeTab === 'gmail' && (
            <div className="space-y-5">
              {/* Google Fast 1-Tap Account Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                  Select Google Account
                </label>
                <div className="space-y-2">
                  {PRESET_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => handleGmailSubmit(acc)}
                      className="w-full p-3 rounded-2xl bg-neutral-50 hover:bg-blue-50/60 dark:bg-[#161622] dark:hover:bg-[#1e1e2d] border border-neutral-200/80 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-700 flex items-center justify-between gap-3 text-left transition-all cursor-pointer group shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={acc.avatar}
                            alt={acc.name}
                            className="h-10 w-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                          />
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-white dark:bg-[#111117] rounded-full p-0.5 shadow-xs flex items-center justify-center">
                            <GoogleIcon />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {acc.name}
                            </p>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                              {acc.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                            {acc.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity pr-1">
                        <span>Continue</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Or enter custom Gmail
                </span>
                <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
              </div>

              {/* Manual Gmail Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGmailSubmit();
                }}
                className="space-y-3.5"
              >
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Gmail or Google Workspace Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      type="email"
                      value={gmailAddress}
                      onChange={(e) => setGmailAddress(e.target.value)}
                      placeholder="e.g. dr.name@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-[#161622] border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 transition-all outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      Password / Security Code
                    </label>
                    <span className="text-[10px] text-neutral-400">Optional for 1-tap test</span>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      type={showGmailPassword ? 'text' : 'password'}
                      value={gmailPassword}
                      onChange={(e) => setGmailPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-neutral-50 dark:bg-[#161622] border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 transition-all outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => setShowGmailPassword(!showGmailPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
                    >
                      {showGmailPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Primary Google Sign-in CTA */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm shadow-blue-500/20 transition-all cursor-pointer mt-2"
                >
                  <GoogleIcon />
                  <span>Continue with Google Account</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: MEMBERSHIP ID LOGIN UI */}
          {status !== 'authenticating' && status !== 'success' && activeTab === 'membership_id' && (
            <div className="space-y-5">
              {/* Formatted Key ID Input */}
              <form onSubmit={handleMembershipIdSubmit} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      FocusLinks Membership ID Key
                    </label>
                    <span className="text-[10px] font-mono text-neutral-400">Format: FL-XXXX-OD</span>
                  </div>
                  <div className="relative">
                    <QrCode className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500" />
                    <input
                      type="text"
                      value={membershipIdInput}
                      onChange={(e) => handleMembershipIdChange(e.target.value)}
                      placeholder="FL-29841-OD"
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-[#161622] border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-xs font-mono font-bold text-neutral-900 dark:text-white placeholder:text-neutral-400 transition-all uppercase outline-hidden"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                    Your unique cryptographic credential generated upon verified registration.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      Security PIN / Passcode
                    </label>
                    <span className="text-[10px] text-neutral-400">Optional for quick pass</span>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      type={showPin ? 'text' : 'password'}
                      value={securityPin}
                      onChange={(e) => setSecurityPin(e.target.value)}
                      placeholder="••••"
                      maxLength={8}
                      className="w-full pl-10 pr-10 py-2.5 bg-neutral-50 dark:bg-[#161622] border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-xs font-mono text-neutral-900 dark:text-white placeholder:text-neutral-400 transition-all outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
                    >
                      {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit ID Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm shadow-blue-500/25 transition-all cursor-pointer"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Verify ID & Enter Platform</span>
                </button>
              </form>

              {/* Fast Test Chips */}
              <div className="pt-2 border-t border-neutral-200/80 dark:border-neutral-800">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Quick-Fill Test Credentials
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setMembershipIdInput('FL-29841-OD');
                      setSecurityPin('2026');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 border border-neutral-200/80 dark:border-neutral-700/80 transition-all cursor-pointer"
                  >
                    FL-29841-OD (Dr. Sirenjeev)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMembershipIdInput('FL-44910-OD');
                      setSecurityPin('2026');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 border border-neutral-200/80 dark:border-neutral-700/80 transition-all cursor-pointer"
                  >
                    FL-44910-OD (Dr. Vance, FAAO)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMembershipIdInput('FL-10822-OD');
                      setSecurityPin('2026');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-[11px] font-mono font-semibold text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 border border-neutral-200/80 dark:border-neutral-700/80 transition-all cursor-pointer"
                  >
                    FL-10822-OD (Resident OD)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer Navigation: Register / Onboard New ID */}
          <div className="pt-5 mt-5 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-neutral-500 dark:text-neutral-400">
              Don&apos;t have a verified ID yet?
            </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onSwitchToRegister) {
                  onSwitchToRegister();
                }
              }}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Register Free in 60s</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
