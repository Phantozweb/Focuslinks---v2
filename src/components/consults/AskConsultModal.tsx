import React, { useState } from 'react';
import { X, Stethoscope, Sparkles, Send, Tag, AlertCircle, Camera, Check } from 'lucide-react';
import { QuestionTopic, DoctorProfile, ClinicalQuestion } from '../../types';

interface AskConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  topics: QuestionTopic[];
  currentUser: DoctorProfile;
  onSubmitQuestion: (newQuestionData: Omit<ClinicalQuestion, 'id' | 'createdAt' | 'upvotes' | 'downvotes' | 'answersCount' | 'viewsCount' | 'answers'>) => void;
}

const PRESET_SCANS = [
  { label: 'Retina OCT B-scan', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&auto=format&fit=crop&q=80' },
  { label: 'Slit Lamp Anterior Segment', url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1000&auto=format&fit=crop&q=80' },
  { label: 'Corneal Topography Map', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1000&auto=format&fit=crop&q=80' },
];

export const AskConsultModal: React.FC<AskConsultModalProps> = ({
  isOpen,
  onClose,
  topics,
  currentUser,
  onSubmitQuestion,
}) => {
  const [title, setTitle] = useState('');
  const [topicId, setTopicId] = useState(topics[0]?.id || 'topic-retina');
  const [content, setContent] = useState('');
  const [urgency, setUrgency] = useState<'routine' | 'urgent' | 'case-consult' | 'grand-rounds'>('case-consult');
  const [tagsInput, setTagsInput] = useState('Retina, OCT, SecondOpinion');
  
  // Patient Context
  const [patientAgeSex, setPatientAgeSex] = useState('');
  const [visualAcuity, setVisualAcuity] = useState('');
  const [intraocularPressure, setIntraocularPressure] = useState('');
  const [instrumentUsed, setInstrumentUsed] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  
  // Image URL
  const [imageUrl, setImageUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const selectedTopic = topics.find((t) => t.id === topicId) || topics[0];
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    const hasClinicalData = patientAgeSex || visualAcuity || intraocularPressure || instrumentUsed || medicalHistory;

    onSubmitQuestion({
      title: title.trim(),
      content: content.trim(),
      topicId: selectedTopic.id,
      topicName: selectedTopic.name,
      tags: tags.length > 0 ? tags : [selectedTopic.name],
      author: currentUser,
      urgency,
      images: imageUrl.trim() ? [imageUrl.trim()] : undefined,
      clinicalData: hasClinicalData
        ? {
            patientAgeSex: patientAgeSex.trim() || undefined,
            visualAcuity: visualAcuity.trim() || undefined,
            intraocularPressure: intraocularPressure.trim() || undefined,
            instrumentUsed: instrumentUsed.trim() || undefined,
            medicalHistory: medicalHistory.trim() || undefined,
          }
        : undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-950/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-white dark:bg-[#121217] border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-neutral-900 dark:text-white">
                Initiate Clinical Case Consult
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Receive evidence-based opinions and treatment consensus from verified specialists.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          
          {/* Consult Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Consult Query / Core Question <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How do you differentiate chronic CSR with flat irregular PED from occult CNV on SD-OCT?"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16161b] text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-semibold"
            />
          </div>

          {/* Subspecialty Topic & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                Subspecialty Topic <span className="text-red-500">*</span>
              </label>
              <select
                value={topicId}
                onChange={(e) => {
                  setTopicId(e.target.value);
                  const found = topics.find((t) => t.id === e.target.value);
                  if (found) {
                    setTagsInput(`${found.name.split(' ')[0]}, Consult`);
                  }
                }}
                className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16161b] text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
              >
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.questionsCount} inquiries)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                Consult Urgency
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16161b] text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
              >
                <option value="case-consult">Clinical Consult (Standard 24h)</option>
                <option value="urgent">STAT Second Opinion (Time-Critical)</option>
                <option value="grand-rounds">Grand Rounds / Academic Dilemma</option>
                <option value="routine">Routine Practice Protocol</option>
              </select>
            </div>
          </div>

          {/* Patient Case Parameters */}
          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#16161c] border border-neutral-200 dark:border-neutral-800 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
              Patient Parameters & Baseline Vitals (Optional)
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div>
                <label className="text-neutral-500 block mb-1">Age & Sex</label>
                <input
                  type="text"
                  value={patientAgeSex}
                  onChange={(e) => setPatientAgeSex(e.target.value)}
                  placeholder="e.g. 48-yo Male"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#111114] text-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-neutral-500 block mb-1">Visual Acuity</label>
                <input
                  type="text"
                  value={visualAcuity}
                  onChange={(e) => setVisualAcuity(e.target.value)}
                  placeholder="e.g. 20/40 OD, 20/20 OS"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#111114] text-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-neutral-500 block mb-1">IOP (mmHg)</label>
                <input
                  type="text"
                  value={intraocularPressure}
                  onChange={(e) => setIntraocularPressure(e.target.value)}
                  placeholder="e.g. 14 OD, 15 OS"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#111114] text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="text-neutral-500 block mb-1">Diagnostic Modality Used</label>
              <input
                type="text"
                value={instrumentUsed}
                onChange={(e) => setInstrumentUsed(e.target.value)}
                placeholder="e.g. Heidelberg Spectralis OCT, Humphrey 24-2C, AS-OCT"
                className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#111114] text-neutral-900 dark:text-white"
              />
            </div>
          </div>

          {/* Narrative Body */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Clinical Findings & Case Presentation <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Present the history of present illness, examination findings, failed therapies, and specific questions for the community..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16161b] text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-y"
            />
          </div>

          {/* Scan Link & Presets */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Diagnostic Imaging URL (Optional)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://... (direct link to image scan)"
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16161b] text-neutral-900 dark:text-white mb-2"
            />

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-neutral-400">Quick scan samples:</span>
              {PRESET_SCANS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className={`text-[11px] px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                    imageUrl === preset.url
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Index Tags (Comma-separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Retina, Glaucoma, OCT, Therapy"
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#16161b] text-neutral-900 dark:text-white"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs text-neutral-500">
              Posting as <strong className="text-neutral-800 dark:text-neutral-200">{currentUser.name}</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim() || !content.trim()}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white shadow-md shadow-blue-500/25 transition-all cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Transmit Consult to Network</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
