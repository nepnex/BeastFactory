import React, { useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { storageService } from '../../lib/storage';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  bucket?: string;
  aspectRatio?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Image Upload',
  bucket = 'beast-factory-assets',
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      const url = await storageService.uploadImage(file, bucket);
      onChange(url);
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
        {label}
      </label>

      {value ? (
        <div className="relative group w-full h-44 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <label className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <label className="w-full h-36 border-2 border-dashed border-neutral-800 hover:border-[#e8272a]/50 rounded-2xl flex flex-col items-center justify-center p-4 bg-neutral-900/50 cursor-pointer transition-all hover:bg-neutral-900">
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-neutral-400">
              <Loader2 className="w-6 h-6 text-[#e8272a] animate-spin" />
              <span className="text-xs">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-neutral-400">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300">
                <ImageIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-neutral-300">Click to upload image</span>
              <span className="text-[10px] text-neutral-500">PNG, JPG, WEBP up to 5MB</span>
            </div>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={uploading} />
        </label>
      )}

      {error && <p className="text-[11px] text-red-400 font-medium">{error}</p>}
    </div>
  );
};
