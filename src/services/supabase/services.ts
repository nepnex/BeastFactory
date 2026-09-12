import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { ServiceItem } from '../../types';

export const serviceService = {
  getServices: async (): Promise<ServiceItem[] | null> => {
    if (!isSupabaseConfigured || !supabase) return null;
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (error || !data) return null;

      return data.map((s) => ({
        id: s.id,
        name: s.title || s.name || '',
        category: s.category || 'gym',
        shortDescription: s.description || s.short_description || '',
        fullDescription: s.full_description || s.description || '',
        iconName: s.icon_name || 'Dumbbell',
        coverImageUrl: s.image_url || s.cover_image_url || s.image || '',
        features: Array.isArray(s.features) ? s.features : [],
        isFeatured: s.popular ?? s.is_featured ?? false,
        isActive: s.is_active ?? true,
        displayOrder: s.display_order ?? 0
      }));
    } catch {
      return null;
    }
  },

  addService: async (service: Omit<ServiceItem, 'id'>): Promise<ServiceItem | null> => {
    if (!isSupabaseConfigured || !supabase) return null;
    try {
      const dbPayload = {
        title: service.name,
        description: service.shortDescription,
        category: service.category,
        icon_name: service.iconName,
        image_url: service.coverImageUrl,
        features: service.features,
        popular: service.isFeatured,
        is_active: service.isActive
      };

      const { data, error } = await supabase.from('services').insert(dbPayload).select().single();
      if (error || !data) return null;

      return {
        id: data.id,
        name: data.title,
        shortDescription: data.description || '',
        fullDescription: data.description || '',
        category: data.category,
        iconName: data.icon_name,
        coverImageUrl: data.image_url || '',
        features: data.features || [],
        isFeatured: data.popular,
        isActive: data.is_active,
        displayOrder: data.display_order ?? 0
      };
    } catch {
      return null;
    }
  },

  updateService: async (id: string, updated: Partial<ServiceItem>): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) return false;
    try {
      const dbPayload: Record<string, any> = {};
      if (updated.name !== undefined) dbPayload.title = updated.name;
      if (updated.shortDescription !== undefined) dbPayload.description = updated.shortDescription;
      if (updated.category !== undefined) dbPayload.category = updated.category;
      if (updated.iconName !== undefined) dbPayload.icon_name = updated.iconName;
      if (updated.coverImageUrl !== undefined) dbPayload.image_url = updated.coverImageUrl;
      if (updated.features !== undefined) dbPayload.features = updated.features;
      if (updated.isFeatured !== undefined) dbPayload.popular = updated.isFeatured;
      if (updated.isActive !== undefined) dbPayload.is_active = updated.isActive;

      const { error } = await supabase.from('services').update(dbPayload).eq('id', id);
      return !error;
    } catch {
      return false;
    }
  },

  deleteService: async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) return false;
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      return !error;
    } catch {
      return false;
    }
  }
};
