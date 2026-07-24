import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    'STRENGTH TRAINING',
    'PERSONAL COACHING',
    'CARDIO & FAT LOSS',
    'CROSS FIT',
    'KICK-BOXING',
    'SAUNA & JACUZZI',
    'ZUMBA & YOGA',
    'BEAST MODE ON',
    '365 DAYS OPEN',
  ];

  return (
    <div className="bg-[#e8272a] py-3.5 overflow-hidden border-y border-red-800/40 shadow-lg shadow-red-500/10">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-4">
            <span className="font-heading text-xl sm:text-2xl text-white font-bold tracking-wider">
              {text}
            </span>
            <span className="w-2 h-2 rounded-full bg-white/70 inline-block"></span>
          </div>
        ))}
      </div>
    </div>
  );
};
