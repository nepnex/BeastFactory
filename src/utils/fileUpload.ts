import { supabase, isSupabaseConfigured } from '../lib/supabase';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
];

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export interface UploadResult {
  success: boolean;
  publicUrl?: string;
  error?: string;
}

/**
 * Validates file MIME type, size, and sanitizes filenames for secure asset uploads.
 */
export async function uploadAssetFile(
  file: File,
  folder: string = 'uploads'
): Promise<UploadResult> {
  // 1. Validate File Size
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      success: false,
      error: `File size exceeds maximum allowed limit of 5 MB (File size: ${(file.size / (1024 * 1024)).toFixed(2)} MB).`,
    };
  }

  // 2. Validate MIME type strictly
  if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return {
      success: false,
      error: `Invalid image type (${file.type}). Allowed formats: JPEG, PNG, WebP, GIF, AVIF.`,
    };
  }

  // 3. Generate Safe Filename (slugify name, add timestamp + random UUID string)
  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const cleanBaseName = file.name
    .split('.')[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .slice(0, 30);
  
  const safeFileName = `${folder}/${cleanBaseName}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

  if (!isSupabaseConfigured || !supabase) {
    return {
      success: false,
      error: 'Supabase storage is not configured. Upload failed.',
    };
  }

  try {
    const { data, error } = await supabase.storage
      .from('beast-factory-assets')
      .upload(safeFileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      return { success: false, error: error.message };
    }

    const { data: urlData } = supabase.storage
      .from('beast-factory-assets')
      .getPublicUrl(data.path);

    return {
      success: true,
      publicUrl: urlData.publicUrl,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Storage upload error occurred.',
    };
  }
}
