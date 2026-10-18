import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShieldCheck, Briefcase, Award, Sparkles, Building2, MapPin, User, Stethoscope, Camera } from 'lucide-react';
import { DoctorProfile } from '../types';
import { DoctorAvatar } from './common/DoctorAvatar';

const AVATAR_PRESETS = [
  { label: 'Clinical Male (Lead)', url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80' },
  { label: 'Hospital Physician', url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80' },
  { label: 'Cornea Specialist', url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80' },
  { label: 'Faculty Researcher', url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=80' },
];

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: DoctorProfile;
  onSave: (updatedProfile: DoctorProfile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [formData, setFormData] = useState<DoctorProfile>(profile);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 bg-neutral-50/70 dark:bg-[#141416]">
            <div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Edit Professional Optometric Profile
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Update your verified credentials, clinical appointments, and licensure details
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Identity & Credentials */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <User className="h-4 w-4" /> Identity & Profile Picture
              </h3>

              {/* Profile Avatar Selection & Live Preview */}
              <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/60 dark:bg-neutral-900/50 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex flex-col items-center">
                  <DoctorAvatar
                    src={formData.avatar}
                    alt={formData.name}
                    className="h-18 w-18 rounded-full border-2 border-blue-500 shadow-md"
                    verified={formData.verified}
                    badgeSize="md"
                  />
                  <span className="text-[10px] text-neutral-500 mt-1">Live Avatar</span>
                </div>
                <div className="flex-1 w-full space-y-2">
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Doctor Portrait Presets
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {AVATAR_PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, avatar: p.url })}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          formData.avatar === p.url
                            ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                            : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:border-blue-400'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="url"
                    value={formData.avatar || ''}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-3 py-1.5 text-xs text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:outline-none"
                    placeholder="Or paste custom image URL..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Full Name & Title</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. Dr. Elena Vance"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Credentials / Fellowships</label>
                  <input
                    type="text"
                    value={formData.credentials}
                    onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                    className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. OD, FAAO, FSLS, Diplomate"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Professional Practice Headline
                </label>
                <textarea
                  rows={2}
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  placeholder="Summarize your clinical focus, faculty appointments, and subspecialties..."
                />
              </div>
            </div>

            {/* Practice & Location */}
            <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <Building2 className="h-4 w-4" /> Primary Practice & Appointment
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Current Clinical Role</label>
                  <input
                    type="text"
                    value={formData.currentRole}
                    onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                    className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Clinic / Hospital / Academic Center</label>
                  <input
                    type="text"
                    value={formData.clinicName}
                    onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                    className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] pl-9 pr-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Board Licensure & Verification */}
            <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" /> Licensure & Medical Registrations (Verified Status)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">State Board</label>
                  <input
                    type="text"
                    value={formData.licenseState}
                    onChange={(e) => setFormData({ ...formData, licenseState: e.target.value })}
                    className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">License #</label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">National Provider Identifier (NPI)</label>
                  <input
                    type="text"
                    value={formData.npiNumber}
                    onChange={(e) => setFormData({ ...formData, npiNumber: e.target.value })}
                    className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* "Open To" Preferences */}
            <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Practice Availability & Referral Preferences
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700/80 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                  <input
                    type="checkbox"
                    checked={formData.openTo.referrals}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        openTo: { ...formData.openTo, referrals: e.target.checked },
                      })
                    }
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    Patient Referrals & Co-Management
                  </span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700/80 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                  <input
                    type="checkbox"
                    checked={formData.openTo.consulting}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        openTo: { ...formData.openTo, consulting: e.target.checked },
                      })
                    }
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    Peer Consultations & Scleral Review
                  </span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700/80 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                  <input
                    type="checkbox"
                    checked={formData.openTo.clinicalTrials}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        openTo: { ...formData.openTo, clinicalTrials: e.target.checked },
                      })
                    }
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    Clinical Research & Investigator
                  </span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700/80 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                  <input
                    type="checkbox"
                    checked={formData.openTo.locumTenens}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        openTo: { ...formData.openTo, locumTenens: e.target.checked },
                      })
                    }
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    Locum Tenens / Surgical Coverage
                  </span>
                </label>
              </div>
            </div>

            {/* About / Clinical Statement */}
            <div className="space-y-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                About / Clinical Philosophy Statement
              </label>
              <textarea
                rows={4}
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202024] px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Detail your clinical passions, fellowship credentials, and research..."
              />
            </div>
          </form>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 border-t border-neutral-200 dark:border-neutral-800 px-6 py-4 bg-neutral-50/70 dark:bg-[#141416]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm font-semibold shadow-sm transition-colors"
            >
              <Check className="h-4 w-4" /> Save Profile Changes
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
