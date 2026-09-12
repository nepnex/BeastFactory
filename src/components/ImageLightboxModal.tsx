import React from 'react';
import { X } from 'lucide-react';

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  subtitle?: string;
  details?: string;
  category?: string;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  subtitle,
  details,
  category,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="glass-panel max-w-4xl w-full rounded-3xl overflow-hidden border border-neutral-800 relative flex flex-col md:flex-row max-h-[90vh] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-neutral-700 text-white flex items-center justify-center hover:bg-[#e8272a] hover:border-[#e8272a] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* IMAGE PREVIEW */}
        <div className="w-full md:w-3/5 h-72 sm:h-96 md:h-auto bg-black relative flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-contain max-h-[80vh]"
          />
        </div>

        {/* DETAILS SIDEBAR */}
        <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-neutral-950/80 border-t md:border-t-0 md:border-l border-neutral-800 overflow-y-auto">
          <div className="space-y-4">
            {category && (
              <span className="px-3 py-1 rounded-full bg-[#e8272a]/20 text-[#e8272a] text-[10px] font-bold uppercase tracking-widest border border-[#e8272a]/40 inline-block">
                {category}
              </span>
            )}
            <div>
              <h3 className="font-heading text-3xl sm:text-4xl text-white">{title}</h3>
              {subtitle && (
                <p className="text-xs text-[#e8272a] font-semibold uppercase tracking-wider mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            {details && (
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed border-t border-neutral-800 pt-4">
                {details}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
            <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-widest">
              BEAST FACTORY ATHLETIC GALLERY
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-bold text-white hover:bg-[#e8272a] hover:border-[#e8272a] transition-all"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
