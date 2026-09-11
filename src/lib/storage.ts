import { supabase, isSupabaseConfigured } from './supabase';

export const storageService = {
  /**
   * Uploads a image file to Supabase Storage bucket.
   * If Supabase is not configured, returns a mock local object URL for dev mode preview.
   */
  async uploadImage(file: File, bucket = 'beast-factory-assets'): Promise<string> {
    if (!isSupabaseConfigured || !supabase) {
      // Fallback dev preview URL
      return URL.createObjectURL(file);
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  },

  /**
   * Deletes an image from Supabase Storage by public URL or relative path.
   */
  async deleteImage(pathOrUrl: string, bucket = 'beast-factory-assets'): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase) return true;

    try {
      const path = pathOrUrl.includes('/') ? pathOrUrl.split(`${bucket}/`)[1] : pathOrUrl;
      if (!path) return false;

      const { error } = await supabase.storage.from(bucket).remove([path]);
      return !error;
    } catch {
      return false;
    }
  },
};
