import React from 'react';
import { Eye, Activity, Shield, Baby, Droplets, Layers, Pill, Tag, Sparkles, Check, Plus } from 'lucide-react';
import { QuestionTopic } from '../../types';

interface ConsultTopicPillsProps {
  topics: QuestionTopic[];
  selectedTopicId: string | null;
  onSelectTopic: (topicId: string | null) => void;
  onToggleFollowTopic: (topicId: string) => void;
}

const getTopicIcon = (iconName: string, className = "h-4 w-4") => {
  switch (iconName.toLowerCase()) {
    case 'eye':
      return <Eye className={className} />;
    case 'activity':
      return <Activity className={className} />;
    case 'shield':
      return <Shield className={className} />;
    case 'baby':
      return <Baby className={className} />;
    case 'droplets':
      return <Droplets className={className} />;
    case 'layers':
      return <Layers className={className} />;
    case 'pill':
      return <Pill className={className} />;
    default:
      return <Tag className={className} />;
  }
};

export const ConsultTopicPills: React.FC<ConsultTopicPillsProps> = ({
  topics,
  selectedTopicId,
  onSelectTopic,
  onToggleFollowTopic,
}) => {
  const activeTopic = topics.find((t) => t.id === selectedTopicId);

  return (
    <div className="space-y-3">
      {/* Horizontal Scroll Topic Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
        <button
          onClick={() => onSelectTopic(null)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            selectedTopicId === null
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 scale-[1.02]'
              : 'bg-white dark:bg-[#141418] text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>All Subspecialties</span>
        </button>

        {topics.map((topic) => {
          const isSelected = selectedTopicId === topic.id;
          return (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(isSelected ? null : topic.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 scale-[1.02]'
                  : 'bg-white dark:bg-[#141418] text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
              }`}
            >
              <span className={isSelected ? 'text-white' : 'text-neutral-500 dark:text-neutral-400'}>
                {getTopicIcon(topic.iconName, 'h-3.5 w-3.5')}
              </span>
              <span>{topic.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isSelected
                    ? 'bg-white/20 text-white font-extrabold'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
                }`}
              >
                {topic.questionsCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Expanded Active Topic Spotlight Panel */}
      {activeTopic && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-200/80 dark:border-blue-900/50 backdrop-blur-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/20 shrink-0">
                {getTopicIcon(activeTopic.iconName, 'h-5 w-5')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">
                    {activeTopic.name}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    Clinical Topic
                  </span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 max-w-2xl leading-relaxed">
                  {activeTopic.description}
                </p>
                <div className="text-[11px] text-neutral-400 mt-1 flex items-center gap-3">
                  <span>{activeTopic.questionsCount} Inquiries Recorded</span>
                  <span>•</span>
                  <span>{activeTopic.followersCount.toLocaleString()} Verified Doctors Following</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onToggleFollowTopic(activeTopic.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTopic.isFollowed
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                }`}
              >
                {activeTopic.isFollowed ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Following Topic</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5" />
                    <span>Follow Topic</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onSelectTopic(null)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Clear Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
