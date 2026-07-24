import React from 'react';
import { Plus } from 'lucide-react';
import { GYM_INFO } from '../data/gymData';

export const SocialBar: React.FC = () => {
  return (
    <div className="fixed right-6 bottom-8 z-40 hidden sm:flex flex-col gap-3 group">
      <div className="glass-panel p-2.5 rounded-2xl flex flex-col gap-3 shadow-2xl border border-neutral-800 transition-all duration-300">
        <a href={GYM_INFO.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-[#e8272a] hover:border-[#e8272a]/40 hover:scale-110 transition-all font-bold text-xs" title="Facebook">FB</a>
        <a href={GYM_INFO.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-[#e8272a] hover:border-[#e8272a]/40 hover:scale-110 transition-all font-bold text-xs" title="Instagram">IG</a>
        <a href={GYM_INFO.tiktok} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-[#e8272a] hover:border-[#e8272a]/40 hover:scale-110 transition-all font-bold text-xs" title="TikTok">TK</a>
        <div className="w-10 h-10 rounded-xl bg-[#e8272a] text-white flex items-center justify-center font-bold">
          <Plus className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
