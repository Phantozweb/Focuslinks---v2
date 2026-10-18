import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  AlertCircle, 
  RefreshCw, 
  Check, 
  User, 
  UploadCloud, 
  Trash2, 
  FileCheck, 
  IdCard,
  Building
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (membershipId: string) => void;
  initialMode?: 'login' | 'onboarding';
}

export const AuthGateModal: React.FC<AuthGateModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  initialMode = 'login' 
}) => {
  const [mode, setMode] = useState<'login' | 'onboarding'>(initialMode);
  
  // Login states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');

  // Onboarding states
  const [onboardingStep, setOnboardingStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('');
  const [onboardingEmail, setOnboardingEmail] = useState('');
  const [specialty, setSpecialty] = useState('Cornea and Scleral');
  const [docType, setDocType] = useState('Hospital ID Card');
  const [docNumber, setDocNumber] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Sync mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setOnboardingStep(1);
      setStatus('idle');
      setErrorMessage('');
      setUploadedFileName('');
    }
  }, [isOpen, initialMode]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier || !password) {
      setStatus('error');
      setErrorMessage('Please enter your Gmail / FocusLinks ID and password.');
      return;
    }

    setStatus('verifying');

    setTimeout(() => {
      setStatus('success');
      
      let finalMembershipId = loginIdentifier.trim().toUpperCase();
      if (!finalMembershipId.startsWith('FL-')) {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        finalMembershipId = `FL-${randomNum}-OD`;
      }

      setTimeout(() => {
        onSuccess(finalMembershipId);
        onClose();
      }, 1500);
    }, 2000);
  };

  const handleOnboardingNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !onboardingEmail) {
      setStatus('error');
      setErrorMessage('Please fill in your full name and practice email address.');
      return;
    }
    setStatus('idle');
    setErrorMessage('');
    setOnboardingStep(2);
  };

  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docNumber) {
      setStatus('error');
      setErrorMessage('Please enter your Document or License number.');
      return;
    }
    if (!uploadedFileName) {
      setStatus('error');
      setErrorMessage('Please upload or attach your Hospital/College ID card or License card file to complete the mandatory check.');
      return;
    }

    setStatus('verifying');

    setTimeout(() => {
      setStatus('success');
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const generatedMembershipId = `FL-${randomNum}-OD`;

      setTimeout(() => {
        onSuccess(generatedMembershipId);
        onClose();
      }, 1500);
    }, 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setUploadedFileName(file.name);
      if (status === 'error') setStatus('idle');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFileName(e.target.files[0].name);
      if (status === 'error') setStatus('idle');
    }
  };

  const triggerMockFileAttach = () => {
    setUploadedFileName('verification_card_scan.pdf');
    if (status === 'error') setStatus('idle');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop filter blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Dialog Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md bg-white dark:bg-[#12121a] border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-left z-10"
        >
          {/* Top colored aesthetic bar */}
          <div className="h-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 h-8 w-8 rounded-full flex items-center justify-center text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white">
                {mode === 'login' ? 'Medical Professional Sign-In' : 'Clinical Membership Onboarding'}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {mode === 'login' 
                  ? 'Authorized Optometrists only. Credential verification check active.' 
                  : `Step ${onboardingStep} of 2: ${onboardingStep === 1 ? 'Clinical Profile Setup' : 'Mandatory ID Verification'}`}
              </p>
            </div>

            {status === 'verifying' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 flex flex-col items-center justify-center space-y-4 text-center"
              >
                <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Verifying Credentials...
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Establishing a secure clinical handshake
                  </p>
                </div>
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center space-y-4 text-center"
              >
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Check className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-neutral-950 dark:text-emerald-400">
                    Access Granted
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Welcome to FocusLinks. Unlocking clinical workspace...
                  </p>
                </div>
              </motion.div>
            )}

            {status !== 'verifying' && status !== 'success' && (
              <>
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-600 dark:text-red-400 flex items-start gap-2.5"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {/* LOGIN FORM MODE */}
                {mode === 'login' && (
                  <form onSubmit={handleAuthSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Gmail or FocusLinks ID
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
                        <input
                          type="text"
                          required
                          value={loginIdentifier}
                          onChange={(e) => {
                            setLoginIdentifier(e.target.value);
                            if (status === 'error') setStatus('idle');
                          }}
                          placeholder="doctor@gmail.com or FL-29841-OD"
                          className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-[#1a1a24] border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (status === 'error') setStatus('idle');
                          }}
                          placeholder="••••••••••••"
                          className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-[#1a1a24] border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="h-4.5 w-4.5" />
                      <span>Enter Workspace</span>
                    </button>

                    <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setMode('onboarding');
                          setOnboardingStep(1);
                          setStatus('idle');
                          setErrorMessage('');
                        }}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        Need a Free Clinical ID? Start Onboarding
                      </button>
                    </div>
                  </form>
                )}

                {/* ONBOARDING FLOW MODE */}
                {mode === 'onboarding' && (
                  <div className="space-y-4">
                    {/* STEP 1: Clinical Profile info */}
                    {onboardingStep === 1 && (
                      <form onSubmit={handleOnboardingNext} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                            Full Professional Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
                            <input
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => {
                                setFullName(e.target.value);
                                if (status === 'error') setStatus('idle');
                              }}
                              placeholder="Dr. Sarah Jenkins, OD"
                              className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-[#1a1a24] border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                            Practice Email (or Gmail)
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
                            <input
                              type="email"
                              required
                              value={onboardingEmail}
                              onChange={(e) => {
                                setOnboardingEmail(e.target.value);
                                if (status === 'error') setStatus('idle');
                              }}
                              placeholder="sarah.jenkins@gmail.com"
                              className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-[#1a1a24] border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                            Primary Specialized Focus
                          </label>
                          <div className="relative">
                            <Building className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
                            <select
                              value={specialty}
                              onChange={(e) => setSpecialty(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-[#1a1a24] border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white appearance-none"
                            >
                              <option value="Cornea and Scleral">Cornea and Scleral Contact Lenses</option>
                              <option value="Glaucoma & Therapeutics">Glaucoma and Therapeutics</option>
                              <option value="Pediatrics & Strabismus">Pediatrics and Strabismus</option>
                              <option value="Neuro-Optometry">Neuro-Optometric Rehabilitation</option>
                              <option value="General Practice">General Clinical Optometry</option>
                              <option value="Optometry Student">Academic Student / Intern</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full mt-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>Next: Document Verification</span>
                        </button>
                      </form>
                    )}

                    {/* STEP 2: ID Upload and verification Check */}
                    {onboardingStep === 2 && (
                      <form onSubmit={handleOnboardingSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                            Mandatory Document Type
                          </label>
                          <select
                            value={docType}
                            onChange={(e) => setDocType(e.target.value)}
                            className="w-full px-3.5 py-3 bg-neutral-50 dark:bg-[#1a1a24] border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
                          >
                            <option value="Hospital ID Card">Hospital ID Card</option>
                            <option value="College ID Card">College ID Card (For Students)</option>
                            <option value="Professional License ID">Professional License ID Card</option>
                            <option value="Clinic Registration Certificate">Clinical Registration / Business Certificate</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                            Document / ID Serial Number
                          </label>
                          <div className="relative">
                            <IdCard className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
                            <input
                              type="text"
                              required
                              value={docNumber}
                              onChange={(e) => {
                                setDocNumber(e.target.value);
                                if (status === 'error') setStatus('idle');
                              }}
                              placeholder="Enter Serial, Card No or License ID"
                              className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-[#1a1a24] border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
                            />
                          </div>
                        </div>

                        {/* Interactive Drag and Drop Upload Area */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                            Upload Verification ID Card Image
                          </label>
                          
                          <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={uploadedFileName ? undefined : triggerMockFileAttach}
                            className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer ${
                              isDragging 
                                ? 'border-blue-500 bg-blue-50/20 dark:bg-blue-950/10' 
                                : uploadedFileName 
                                  ? 'border-emerald-500/40 bg-emerald-50/10 dark:bg-emerald-950/5' 
                                  : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-[#16161f]'
                            }`}
                          >
                            {uploadedFileName ? (
                              <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-400 p-2.5 rounded-xl text-xs font-semibold">
                                <div className="flex items-center gap-2">
                                  <FileCheck className="h-4.5 w-4.5 shrink-0" />
                                  <span className="truncate max-w-[200px]">{uploadedFileName}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setUploadedFileName('');
                                  }}
                                  className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-2 text-neutral-500">
                                <UploadCloud className="h-8 w-8 mx-auto text-neutral-400 animate-pulse" />
                                <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                  Drag and drop your ID Card scan here, or <span className="text-blue-600 hover:underline">click to attach</span>
                                </div>
                                <p className="text-[10px] text-neutral-400 leading-normal">
                                  Supports PDF, JPG, PNG. Mandatory check for peer security clearance.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2.5 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setOnboardingStep(1);
                              setStatus('idle');
                            }}
                            className="col-span-1 py-3 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold text-xs rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer text-center"
                          >
                            Back
                          </button>
                          
                          <button
                            type="submit"
                            className="col-span-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <ShieldCheck className="h-4 w-4" />
                            <span>Verify and Activate Membership</span>
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setMode('login');
                          setStatus('idle');
                          setErrorMessage('');
                        }}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        Already have an active membership? Sign-In
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
