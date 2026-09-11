import React, { useState, useRef, useCallback } from 'react';
import { ChevronsLeftRight, Trophy } from 'lucide-react';
import { TransformationItem } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface BeforeAfterSliderProps {
  item: TransformationItem;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ item }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden select-none border border-neutral-800 touch-pan-y group cursor-ew-resize shadow-2xl"
    >
      {/* AFTER IMAGE (BACKGROUND LAYER) */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={item.afterPhotoUrl}
          alt={`${item.clientName} After`}
          className="w-full h-full object-cover object-center"
        />
        <span className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-[#e8272a] text-white text-xs font-heading tracking-wider shadow-xl shadow-red-500/30">
          AFTER {item.finalWeightKg ? `(${item.finalWeightKg} KG)` : ''}
        </span>
      </div>

      {/* BEFORE IMAGE (OVERLAY CLIP LAYER) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden transition-all ease-out"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={item.beforePhotoUrl}
          alt={`${item.clientName} Before`}
          className="absolute inset-0 w-full h-full object-cover object-center max-w-none filter grayscale"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
        />
        <span className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-black/85 text-neutral-300 text-xs font-heading tracking-wider border border-neutral-700">
          BEFORE {item.startingWeightKg ? `(${item.startingWeightKg} KG)` : ''}
        </span>
      </div>

      {/* DRAGGABLE SLIDER HANDLE */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white/90 shadow-[0_0_15px_rgba(232,39,42,0.8)] z-20 flex items-center justify-center transition-all"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-10 h-10 rounded-full bg-[#e8272a] border-2 border-white text-white flex items-center justify-center shadow-xl shadow-red-500/50 group-hover:scale-110 transition-transform">
          <ChevronsLeftRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
