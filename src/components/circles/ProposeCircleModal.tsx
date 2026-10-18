import React, { useState } from 'react';
import { X, Sparkles, Plus, Hash, ShieldCheck, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OdGroup, CircleChannel } from '../../types';

interface ProposeCircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newCircle: Partial<OdGroup>) => void;
}

export const ProposeCircleModal: React.FC<ProposeCircleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Specialty Lenses');
  const [description, setDescription] = useState('');
  const [channelHandle, setChannelHandle] = useState('');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([
    'acute-triage',
    'clinical-polls',
    'pinned-protocols',
  ]);

  if (!isOpen) return null;

  const toggleChannel = (ch: string) => {
    setSelectedChannels((prev) =>
      prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    const channels: CircleChannel[] = selectedChannels.map((chName, idx) => ({
      id: `ch-custom-${Date.now()}-${idx}`,
      name: chName,
      description: `Discussions for #${chName}`,
      category:
        chName === 'pinned-protocols'
          ? 'protocols'
          : chName === 'clinical-polls'
          ? 'polls'
          : chName === 'voice-pearls'
          ? 'voice'
          : chName === 'grand-rounds'
          ? 'grand-rounds'
          : 'text',
    }));

    const newGroup: Partial<OdGroup> = {
      id: `grp-${Date.now()}`,
      name: name.trim(),
      category,
      description: description.trim(),
      channelHandle: channelHandle.trim()
        ? `@${channelHandle.replace('@', '').trim()}`
        : `@${name.replace(/\s+/g, '')}`,
      membersCount: 1,
      activeOnline: 1,
      activeDiscussions: 1,
      isJoined: true,
      coverImage:
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
      recentTopic: 'Welcoming founding members to this subspecialty community',
      channels,
      rules: [
        'Strictly HIPAA de-identified clinical materials only',
        'Peer-reviewed evidence citations encouraged',
        'Professional collegiality at all times',
      ],
    };

    onSubmit(newGroup);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Propose a Subspecialty Circle
              </h3>
              <p className="text-xs text-neutral-400">
                Create a dedicated community with Discord-style channels
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
              Circle Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Neuro-Optometric Rehabilitation Collective"
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                Subspecialty Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="Specialty Lenses">Specialty Lenses</option>
                <option value="Clinical Pathology">Clinical Pathology</option>
                <option value="Pediatrics">Pediatrics & Myopia</option>
                <option value="Anterior Segment">Anterior Segment</option>
                <option value="Glaucoma & Neuro">Glaucoma & Neuro</option>
                <option value="Practice Management">Practice Management</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                Handle (Optional)
              </label>
              <input
                type="text"
                value={channelHandle}
                onChange={(e) => setChannelHandle(e.target.value)}
                placeholder="@NeuroRehabCircle"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
              Clinical Scope & Mission *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the clinical topics, diagnostic puzzles, and protocols this community will address..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Select Channels */}
          <div>
            <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1.5">
              Initial Discord Channels to Create
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'acute-triage', label: '#acute-triage (Chat)' },
                { id: 'clinical-polls', label: '#clinical-polls (Consensus)' },
                { id: 'pinned-protocols', label: '#pinned-protocols (PDFs)' },
                { id: 'voice-pearls', label: '#voice-pearls (Audio)' },
                { id: 'grand-rounds', label: '#grand-rounds (Debates)' },
                { id: 'general-consult', label: '#general-consult (Text)' },
              ].map((item) => {
                const isChecked = selectedChannels.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleChannel(item.id)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-left border transition-colors cursor-pointer ${
                      isChecked
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded flex items-center justify-center border ${
                        isChecked
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-neutral-300 dark:border-neutral-600'
                      }`}
                    >
                      {isChecked && <Check className="h-3 w-3" />}
                    </div>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-sm transition-all cursor-pointer"
            >
              Launch Circle
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
