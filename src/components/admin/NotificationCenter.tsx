import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  CheckCheck, 
  ChevronRight, 
  Sparkles, 
  CalendarCheck, 
  Inbox, 
  ShoppingBag, 
  Award, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { AdminNotification } from '../../types';
import { notificationService } from '../../services/notificationService';

export const NotificationCenter: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifs = async () => {
    const list = await notificationService.getNotifications(30);
    setNotifications(list);
  };

  useEffect(() => {
    fetchNotifs();

    // Listen for storage events (e.g. public submission in another tab)
    const handleStorageUpdate = () => {
      fetchNotifs();
    };
    window.addEventListener('beast_factory_storage_update', handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);

    // Subscribe to Supabase Realtime notifications
    const unsubscribe = notificationService.subscribeToRealtime(() => {
      fetchNotifs();
    });

    return () => {
      window.removeEventListener('beast_factory_storage_update', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
      unsubscribe();
    };
  }, []);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationClick = async (notif: AdminNotification) => {
    if (!notif.isRead) {
      await notificationService.markAsRead(notif.id);
      await fetchNotifs();
    }
    setDropdownOpen(false);
    navigate(notif.actionUrl || '/admin');
  };

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead();
    await fetchNotifs();
  };

  const getPriorityBadge = (priority: AdminNotification['priority']) => {
    switch (priority) {
      case 'HIGH':
        return <span className="w-2 h-2 rounded-full bg-[#C8102E] shrink-0 animate-pulse" title="High Priority" />;
      case 'NORMAL':
        return <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" title="Normal Priority" />;
      default:
        return <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" title="System Event" />;
    }
  };

  const getNotificationIcon = (type: AdminNotification['type']) => {
    if (type.includes('booking')) return <CalendarCheck className="w-4 h-4 text-rose-400" />;
    if (type.includes('inquiry') || type.includes('free_trial')) return <Inbox className="w-4 h-4 text-[#C8102E]" />;
    if (type.includes('product')) return <ShoppingBag className="w-4 h-4 text-sky-400" />;
    if (type.includes('transformation') || type.includes('testimonial')) return <Award className="w-4 h-4 text-amber-400" />;
    return <Sparkles className="w-4 h-4 text-emerald-400" />;
  };

  const formatTimeAgo = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* BELL TRIGGER BUTTON */}
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-label="Open Admin Notifications"
        className="relative p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all focus:outline-none"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#C8102E] text-white text-[10px] font-bold font-heading min-w-[18px] text-center shadow-lg shadow-red-600/40 animate-bounce">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* DROPDOWN MENU */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl bg-[#0A0A0A] border border-neutral-800 shadow-2xl backdrop-blur-xl z-50 overflow-hidden"
          >
            {/* HEADER */}
            <div className="px-5 py-4 border-b border-neutral-900 flex items-center justify-between bg-neutral-950/80">
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg text-white">NOTIFICATIONS</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#C8102E]/20 text-[#C8102E] text-[10px] font-bold border border-[#C8102E]/30">
                    {unreadCount} UNREAD
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="text-[11px] font-medium text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mark all read</span>
                </button>
              )}
            </div>

            {/* NOTIFICATION LIST */}
            <div className="max-h-96 overflow-y-auto divide-y divide-neutral-900">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-neutral-500 space-y-2">
                  <Bell className="w-8 h-8 mx-auto text-neutral-700" />
                  <p className="text-xs">No notifications yet</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => handleNotificationClick(n)}
                    className={`w-full text-left p-4 flex items-start gap-3 transition-colors group ${
                      n.isRead ? 'bg-transparent hover:bg-neutral-900/40' : 'bg-neutral-900/50 hover:bg-neutral-900/80'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 shrink-0 mt-0.5">
                      {getNotificationIcon(n.type)}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs text-white group-hover:text-[#C8102E] transition-colors truncate">
                          {n.title}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {getPriorityBadge(n.priority)}
                          <span className="text-[10px] text-neutral-500 font-medium">
                            {formatTimeAgo(n.createdAt)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* FOOTER */}
            <div className="p-3 border-t border-neutral-900 bg-neutral-950/80 text-center">
              <Link
                to="/admin/notifications"
                onClick={() => setDropdownOpen(false)}
                className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-[#C8102E] hover:text-[#E81235] transition-colors"
              >
                <span>VIEW ALL NOTIFICATIONS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
