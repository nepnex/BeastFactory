import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Trainer } from '../../types';

export const trainerService = {
  getTrainers: async (): Promise<Trainer[] | null> => {
    if (!isSupabaseConfigured || !supabase) return null;
    try {
      const { data, error } = await supabase
        .from('trainers')
        .select('*')
        .order('display_order', { ascending: true });

      if (error || !data) return null;

      return data.map((t) => ({
        id: t.id,
        fullName: t.name || t.full_name || '',
        photoUrl: t.image_url || t.photo_url || '',
        title: t.role || t.title || '',
        shortBio: t.bio || t.short_bio || '',
        fullBio: t.full_bio || t.bio || '',
        yearsExperience: t.years_experience ?? 5,
        specializations: Array.isArray(t.specialties) ? t.specialties : Array.isArray(t.specializations) ? t.specializations : [],
        certifications: Array.isArray(t.certifications) ? t.certifications : [],
        languages: Array.isArray(t.languages) ? t.languages : ['English', 'Nepali'],
        isAvailable: t.is_active ?? t.is_available ?? true,
        isFeatured: t.featured ?? t.is_featured ?? false,
        displayOrder: t.display_order ?? 0
      }));
    } catch {
      return null;
    }
  },

  addTrainer: async (trainer: Omit<Trainer, 'id'>): Promise<Trainer | null> => {
    if (!isSupabaseConfigured || !supabase) return null;
    try {
      const dbPayload = {
        name: trainer.fullName,
        role: trainer.title,
        bio: trainer.shortBio,
        image_url: trainer.photoUrl,
        specialties: trainer.specializations,
        experience: `${trainer.yearsExperience} Years`,
        certifications: trainer.certifications,
        featured: trainer.isFeatured,
        is_active: trainer.isAvailable
      };

      const { data, error } = await supabase.from('trainers').insert(dbPayload).select().single();
      if (error || !data) return null;

      return {
        id: data.id,
        fullName: data.name,
        title: data.role,
        shortBio: data.bio || '',
        fullBio: data.bio || '',
        photoUrl: data.image_url || '',
        yearsExperience: trainer.yearsExperience,
        specializations: data.specialties || [],
        certifications: data.certifications || [],
        languages: ['English', 'Nepali'],
        isAvailable: data.is_active,
        isFeatured: data.featured,
        displayOrder: data.display_order ?? 0
      };
    } catch {
      return null;
    }
  },

  updateTrainer: async (id: string, updated: Partial<Trainer>): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) return false;
    try {
      const dbPayload: Record<string, any> = {};
      if (updated.fullName !== undefined) dbPayload.name = updated.fullName;
      if (updated.title !== undefined) dbPayload.role = updated.title;
      if (updated.shortBio !== undefined) dbPayload.bio = updated.shortBio;
      if (updated.photoUrl !== undefined) dbPayload.image_url = updated.photoUrl;
      if (updated.specializations !== undefined) dbPayload.specialties = updated.specializations;
      if (updated.certifications !== undefined) dbPayload.certifications = updated.certifications;
      if (updated.isFeatured !== undefined) dbPayload.featured = updated.isFeatured;
      if (updated.isAvailable !== undefined) dbPayload.is_active = updated.isAvailable;

      const { error } = await supabase.from('trainers').update(dbPayload).eq('id', id);
      return !error;
    } catch {
      return false;
    }
  },

  deleteTrainer: async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) return false;
    try {
      const { error } = await supabase.from('trainers').delete().eq('id', id);
      return !error;
    } catch {
      return false;
    }
  }
};
