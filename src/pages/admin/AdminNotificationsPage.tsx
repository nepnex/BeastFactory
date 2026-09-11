import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  CheckCheck, 
  Filter, 
  Inbox, 
  CalendarCheck, 
  ShoppingBag, 
  Award, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { AdminNotification, NotificationPriority } from '../../types';
import { notificationService } from '../../services/notificationService';

export const AdminNotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const fetchNotifs = async () => {
    setLoading(true);
    const list = await notificationService.getNotifications(100);
    setNotifications(list);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifs();
    window.addEventListener('beast_factory_storage_update', fetchNotifs);
    return () => window.removeEventListener('beast_factory_storage_update', fetchNotifs);
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await notificationService.markAsRead(id);
    fetchNotifs();
  };

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead();
    fetchNotifs();
  };

  const filteredNotifications = notifications.filter((n) => {
    if (selectedFilter === 'unread') return !n.isRead;
    if (selectedFilter === 'bookings') return n.relatedType === 'booking' || n.type.includes('booking');
    if (selectedFilter === 'inquiries') return n.relatedType === 'inquiry' || n.type.includes('inquiry') || n.type.includes('trial');
    if (selectedFilter === 'system') return n.priority === 'SYSTEM' || n.type.includes('published') || n.type.includes('image');
    return true;
  });

  const getPriorityBadge = (priority: NotificationPriority) => {
    switch (priority) {
      case 'HIGH':
        return <span className="px-2.5 py-0.5 rounded-full bg-[#C8102E]/20 text-[#C8102E] text-[10px] font-bold border border-[#C8102E]/40">HIGH PRIORITY</span>;
      case 'NORMAL':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/40">NORMAL</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-[10px] font-bold border border-sky-500/40">SYSTEM</span>;
    }
  };

  const getIcon = (type: AdminNotification['type']) => {
    if (type.includes('booking')) return <CalendarCheck className="w-5 h-5 text-rose-400" />;
    if (type.includes('inquiry') || type.includes('free_trial')) return <Inbox className="w-5 h-5 text-[#C8102E]" />;
    if (type.includes('product')) return <ShoppingBag className="w-5 h-5 text-sky-400" />;
    if (type.includes('transformation') || type.includes('testimonial')) return <Award className="w-5 h-5 text-amber-400" />;
    return <Sparkles className="w-5 h-5 text-emerald-400" />;
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl text-white flex items-center gap-3">
              ADMIN <span className="text-[#e8272a]">NOTIFICATIONS</span>
              {unreadCount > 0 && (
                <span className="px-3 py-1 rounded-full bg-[#C8102E] text-white text-xs font-bold font-heading">
                  {unreadCount} UNREAD
                </span>
              )}
            </h1>
            <p className="text-xs text-neutral-400">Real-time alerts for member inquiries, booking requests, and system events</p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-200 hover:text-white hover:border-neutral-700 flex items-center gap-2 transition-all self-start sm:self-auto"
            >
              <CheckCheck className="w-4 h-4 text-emerald-400" />
              <span>MARK ALL AS READ</span>
            </button>
          )}
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap items-center gap-2 border-b border-neutral-900 pb-4">
          {[
            { id: 'all', label: 'All Notifications', count: notifications.length },
            { id: 'unread', label: 'Unread', count: unreadCount },
            { id: 'bookings', label: 'Bookings', count: notifications.filter((n) => n.relatedType === 'booking' || n.type.includes('booking')).length },
            { id: 'inquiries', label: 'Inquiries & Leads', count: notifications.filter((n) => n.relatedType === 'inquiry' || n.type.includes('inquiry')).length },
            { id: 'system', label: 'System Logs', count: notifications.filter((n) => n.priority === 'SYSTEM').length },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider flex items-center gap-2 transition-all ${
                selectedFilter === f.id
                  ? 'bg-[#C8102E] text-white font-bold shadow-md shadow-red-500/20'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              <span>{f.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedFilter === f.id ? 'bg-black/30 text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* NOTIFICATION CARDS LIST */}
        {loading ? (
          <div className="text-center py-16 text-neutral-500">Loading notifications...</div>
        ) : filteredNotifications.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-neutral-800 text-center space-y-3">
            <Bell className="w-10 h-10 mx-auto text-neutral-600" />
            <h3 className="font-heading text-2xl text-white">NO NOTIFICATIONS FOUND</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">There are currently no notifications matching the selected filter criteria.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((item) => (
              <div
                key={item.id}
                className={`glass-panel p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  item.isRead
                    ? 'border-neutral-800/80 bg-neutral-950/40 opacity-80'
                    : 'border-[#C8102E]/40 bg-neutral-900/60 shadow-lg shadow-red-600/5'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-heading text-xl text-white">{item.title}</h3>
                      {getPriorityBadge(item.priority)}
                      {!item.isRead && (
                        <span className="px-2 py-0.5 rounded-full bg-[#C8102E] text-white text-[9px] font-bold">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">{item.message}</p>
                    <span className="text-[10px] text-neutral-500 font-medium block">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800/80 w-full sm:w-auto justify-end">
                  {!item.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(item.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold transition-colors"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={async () => {
                      if (!item.isRead) await handleMarkAsRead(item.id);
                      navigate(item.actionUrl || '/admin');
                    }}
                    className="px-4 py-1.5 rounded-xl bg-[#C8102E] text-white font-heading text-xs font-bold hover:bg-[#E81235] transition-all flex items-center gap-1.5"
                  >
                    <span>VIEW DETAILS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
