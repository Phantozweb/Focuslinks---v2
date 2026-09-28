import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, MessageSquare, Repeat2, Users, Check, Bell, Sparkles } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onViewDoctorProfile: (doctorId: string) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onViewDoctorProfile,
}) => {
  const [filter, setFilter] = useState<'all' | 'endorsement' | 'comment' | 'connection'>('all');

  if (!isOpen) return null;

  const filtered = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'endorsement':
        return <Award className="h-4 w-4 text-amber-500" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'repost':
        return <Repeat2 className="h-4 w-4 text-emerald-500" />;
      case 'connection':
        return <Users className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-neutral-400" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs">
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="w-screen max-w-md bg-white dark:bg-[#18181b] border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/70 dark:bg-[#141416]">
              <div>
                <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Bell className="h-4 w-4 text-blue-600" />
                  Clinical & Peer Notifications
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Endorsements, grand rounds replies, and colleague connections
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-800 px-4 pt-2 gap-2 text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`pb-2 font-semibold border-b-2 transition-colors ${
                  filter === 'all'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('endorsement')}
                className={`pb-2 font-semibold border-b-2 transition-colors ${
                  filter === 'endorsement'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Endorsements
              </button>
              <button
                onClick={() => setFilter('comment')}
                className={`pb-2 font-semibold border-b-2 transition-colors ${
                  filter === 'comment'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Discussions
              </button>
              <button
                onClick={() => setFilter('connection')}
                className={`pb-2 font-semibold border-b-2 transition-colors ${
                  filter === 'connection'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Connections
              </button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 transition-colors flex items-start gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 ${
                    item.unread ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                  }`}
                >
                  <div className="relative shrink-0 mt-0.5">
                    <img
                      src={item.actorAvatar}
                      alt={item.actorName}
                      className="h-10 w-10 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-700"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white dark:bg-[#18181b] rounded-full p-0.5 shadow-xs">
                      {getIcon(item.type)}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed">
                      <strong className="font-bold text-neutral-900 dark:text-neutral-100">
                        {item.actorName}
                      </strong>{' '}
                      <span className="text-[10px] text-blue-600 font-semibold">
                        ({item.actorCredentials})
                      </span>{' '}
                      {item.text}
                    </p>
                    <span className="text-[10px] text-neutral-400 block">{item.timeAgo}</span>
                  </div>

                  {item.unread && (
                    <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#141416] flex items-center justify-between text-xs">
              <span className="text-neutral-500">
                {notifications.filter((n) => n.unread).length} Unread Updates
              </span>
              <button
                onClick={onMarkAllAsRead}
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <Check className="h-3.5 w-3.5" /> Mark All as Read
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
