import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AdminNotification, NotificationType, NotificationPriority } from '../types';

const INITIAL_MOCK_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 'notif-1',
    type: 'new_membership_inquiry',
    priority: 'HIGH',
    title: 'NEW MEMBERSHIP INQUIRY',
    message: 'Rajesh Gurung submitted an annual Beast Pro plan inquiry.',
    relatedId: 'lead-101',
    relatedType: 'inquiry',
    actionUrl: '/admin/inquiries',
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-2',
    type: 'new_spa_booking',
    priority: 'HIGH',
    title: 'NEW SPA BOOKING',
    message: 'Bikash Adhikari requested a Finnish Wood Sauna Session.',
    relatedId: 'bk-201',
    relatedType: 'booking',
    actionUrl: '/admin/bookings',
    isRead: false,
    createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-3',
    type: 'new_free_trial',
    priority: 'HIGH',
    title: 'NEW FREE TRIAL REQUEST',
    message: 'Sita Dahal requested a free 1-day pass for morning Zumba class.',
    relatedId: 'lead-102',
    relatedType: 'inquiry',
    actionUrl: '/admin/inquiries',
    isRead: true,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
];

const getLocalStorageNotifications = (): AdminNotification[] => {
  try {
    const data = localStorage.getItem('beast_factory_notifications');
    return data ? JSON.parse(data) : INITIAL_MOCK_NOTIFICATIONS;
  } catch {
    return INITIAL_MOCK_NOTIFICATIONS;
  }
};

const setLocalStorageNotifications = (notifications: AdminNotification[]) => {
  try {
    localStorage.setItem('beast_factory_notifications', JSON.stringify(notifications));
    window.dispatchEvent(new Event('beast_factory_storage_update'));
  } catch (err) {
    console.error('Failed to update local notifications', err);
  }
};

export const notificationService = {
  // Create a new notification
  createNotification: async (params: {
    type: NotificationType;
    priority?: NotificationPriority;
    title: string;
    message: string;
    relatedId?: string;
    relatedType?: 'inquiry' | 'booking' | 'product' | 'transformation' | 'testimonial' | 'service';
    actionUrl?: string;
  }): Promise<void> => {
    const priority = params.priority || (
      ['new_membership_inquiry', 'new_free_trial', 'new_trainer_booking', 'new_spa_booking', 'new_contact_inquiry'].includes(params.type)
        ? 'HIGH'
        : ['new_product_inquiry', 'new_transformation', 'new_testimonial'].includes(params.type)
        ? 'NORMAL'
        : 'SYSTEM'
    );

    const actionUrl = params.actionUrl || (
      params.relatedType === 'inquiry' ? '/admin/inquiries' :
      params.relatedType === 'booking' ? '/admin/bookings' :
      params.relatedType === 'product' ? '/admin/products' :
      params.relatedType === 'transformation' ? '/admin/transformations' :
      params.relatedType === 'testimonial' ? '/admin/testimonials' :
      '/admin'
    );

    // 1. Save to Supabase database if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('notifications').insert([{
          type: params.type,
          priority: priority,
          title: params.title,
          message: params.message,
          related_id: params.relatedId || null,
          related_type: params.relatedType || null,
          action_url: actionUrl,
          is_read: false,
        }]);

        if (error) {
          console.warn('Supabase notification insert warning (falling back to local):', error.message);
        }
      } catch (err) {
        console.warn('Failed to insert Supabase notification:', err);
      }
    }

    // 2. Always maintain local state for immediate reactive UI & offline compatibility
    const current = getLocalStorageNotifications();
    const newNotif: AdminNotification = {
      id: `notif_${Date.now()}`,
      type: params.type,
      priority,
      title: params.title,
      message: params.message,
      relatedId: params.relatedId,
      relatedType: params.relatedType,
      actionUrl,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    setLocalStorageNotifications([newNotif, ...current]);
  },

  // Fetch recent notifications
  getNotifications: async (limit = 30): Promise<AdminNotification[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit);

        if (!error && data && data.length > 0) {
          const mapped: AdminNotification[] = data.map((item) => ({
            id: item.id,
            type: item.type as NotificationType,
            priority: item.priority as NotificationPriority,
            title: item.title,
            message: item.message,
            relatedId: item.related_id,
            relatedType: item.related_type,
            actionUrl: item.action_url || '/admin',
            isRead: Boolean(item.is_read),
            createdAt: item.created_at,
          }));
          return mapped;
        }
      } catch (err) {
        console.warn('Failed to fetch notifications from Supabase:', err);
      }
    }

    return getLocalStorageNotifications().slice(0, limit);
  },

  // Mark single notification as read
  markAsRead: async (id: string): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('notifications')
          .update({ is_read: true })
          .eq('id', id);
      } catch (err) {
        console.warn('Failed to mark notification read on Supabase:', err);
      }
    }

    const current = getLocalStorageNotifications();
    const updated = current.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    setLocalStorageNotifications(updated);
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('notifications')
          .update({ is_read: true })
          .eq('is_read', false);
      } catch (err) {
        console.warn('Failed to mark all notifications read on Supabase:', err);
      }
    }

    const current = getLocalStorageNotifications();
    const updated = current.map((n) => ({ ...n, isRead: true }));
    setLocalStorageNotifications(updated);
  },

  // Subscribe to real-time notifications
  subscribeToRealtime: (onNewNotification: (notif: AdminNotification) => void) => {
    if (!isSupabaseConfigured || !supabase) return () => {};

    const channel = supabase
      .channel('admin-notifications-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          const item = payload.new;
          if (item) {
            const notif: AdminNotification = {
              id: item.id,
              type: item.type as NotificationType,
              priority: item.priority as NotificationPriority,
              title: item.title,
              message: item.message,
              relatedId: item.related_id,
              relatedType: item.related_type,
              actionUrl: item.action_url || '/admin',
              isRead: Boolean(item.is_read),
              createdAt: item.created_at,
            };

            // Sync local storage
            const current = getLocalStorageNotifications();
            if (!current.some((n) => n.id === notif.id)) {
              setLocalStorageNotifications([notif, ...current]);
            }

            onNewNotification(notif);
          }
        }
      )
      .subscribe();

    return () => {
      if (supabase) {
        supabase.removeChannel(channel);
      }
    };
  },
};
