import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Lead, Booking } from '../../types';

export const inquiryService = {
  getLeads: async (): Promise<Lead[] | null> => {
    if (!isSupabaseConfigured || !supabase) return null;
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) return null;

      return data.map((l) => ({
        id: l.id,
        fullName: l.name || l.full_name || '',
        phone: l.phone || '',
        email: l.email || undefined,
        inquiryType: l.type || l.inquiry_type || 'membership',
        message: l.message || undefined,
        status: (l.status as any) || 'new',
        adminNotes: l.internal_notes || l.admin_notes || undefined,
        createdAt: l.created_at || new Date().toISOString()
      }));
    } catch {
      return null;
    }
  },

  createLead: async (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<Lead | null> => {
    if (!isSupabaseConfigured || !supabase) return null;
    try {
      const dbPayload = {
        name: lead.fullName,
        email: lead.email,
        phone: lead.phone,
        type: lead.inquiryType,
        message: lead.message,
        status: 'new',
        internal_notes: lead.adminNotes
      };

      const { data, error } = await supabase.from('inquiries').insert(dbPayload).select().single();
      if (error || !data) return null;

      return {
        id: data.id,
        fullName: data.name,
        email: data.email || undefined,
        phone: data.phone || '',
        inquiryType: data.type || 'membership',
        message: data.message || undefined,
        status: data.status || 'new',
        adminNotes: data.internal_notes,
        createdAt: data.created_at
      };
    } catch {
      return null;
    }
  },

  updateLeadStatus: async (id: string, status: Lead['status'], notes?: string): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) return false;
    try {
      const dbPayload: Record<string, any> = { status };
      if (notes !== undefined) dbPayload.internal_notes = notes;

      const { error } = await supabase.from('inquiries').update(dbPayload).eq('id', id);
      return !error;
    } catch {
      return false;
    }
  },

  deleteLead: async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) return false;
    try {
      const { error } = await supabase.from('inquiries').delete().eq('id', id);
      return !error;
    } catch {
      return false;
    }
  }
};

export const bookingService = {
  getBookings: async (): Promise<Booking[] | null> => {
    if (!isSupabaseConfigured || !supabase) return null;
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) return null;

      return data.map((b) => ({
        id: b.id,
        bookingType: b.service_type || b.booking_type || 'trainer',
        spaServiceId: b.service_type === 'spa' ? b.target_id : undefined,
        trainerId: b.service_type === 'trainer' ? b.target_id : undefined,
        customerName: b.name || b.customer_name || '',
        customerPhone: b.phone || b.customer_phone || '',
        customerEmail: b.email || b.customer_email || undefined,
        preferredDate: b.booking_date || b.preferred_date || '',
        preferredTimeSlot: b.time_slot || b.preferred_time_slot || '',
        status: (b.status as any) || 'pending',
        adminNotes: b.notes || b.admin_notes || undefined,
        createdAt: b.created_at || new Date().toISOString()
      }));
    } catch {
      return null;
    }
  },

  createBooking: async (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking | null> => {
    if (!isSupabaseConfigured || !supabase) return null;
    try {
      const dbPayload = {
        name: booking.customerName,
        email: booking.customerEmail,
        phone: booking.customerPhone,
        service_type: booking.bookingType,
        target_id: booking.trainerId || booking.spaServiceId || booking.serviceOrPlanId,
        booking_date: booking.preferredDate,
        time_slot: booking.preferredTimeSlot,
        status: 'pending',
        notes: booking.adminNotes
      };

      const { data, error } = await supabase.from('bookings').insert(dbPayload).select().single();
      if (error || !data) return null;

      return {
        id: data.id,
        bookingType: data.service_type || 'trainer',
        customerName: data.name,
        customerEmail: data.email || undefined,
        customerPhone: data.phone || '',
        preferredDate: data.booking_date || '',
        preferredTimeSlot: data.time_slot || '',
        status: data.status || 'pending',
        adminNotes: data.notes,
        createdAt: data.created_at
      };
    } catch {
      return null;
    }
  },

  updateBookingStatus: async (id: string, status: Booking['status'], notes?: string): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) return false;
    try {
      const dbPayload: Record<string, any> = { status };
      if (notes !== undefined) dbPayload.notes = notes;

      const { error } = await supabase.from('bookings').update(dbPayload).eq('id', id);
      return !error;
    } catch {
      return false;
    }
  },

  deleteBooking: async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) return false;
    try {
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      return !error;
    } catch {
      return false;
    }
  }
};
