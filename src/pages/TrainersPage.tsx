import React from 'react';
import { TRAINERS } from '../data/gymData';

export const TrainersPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
        <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">CERTIFIED COACHES</span>
        <h1 className="font-heading text-6xl sm:text-7xl text-white">
          OUR EXPERT <span className="text-[#e8272a]">TRAINERS</span>
        </h1>
        <p className="text-neutral-400 text-base max-w-2xl mx-auto">
          Dedicated mentors who guide your technique, push your physical thresholds, and track your long-term success. Both male and female coaches available.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {TRAINERS.map((trainer) => (
          <div key={trainer.id} className="glass-panel rounded-3xl overflow-hidden border border-neutral-800 hover:border-[#e8272a]/40 transition-all space-y-4 p-6">
            <div className="h-80 rounded-2xl overflow-hidden relative">
              <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
            </div>
            <div className="space-y-2 text-left">
              <span className="text-xs font-bold text-[#e8272a] uppercase tracking-widest">{trainer.role}</span>
              <h3 className="font-heading text-3xl text-white">{trainer.name}</h3>
              <p className="text-xs text-neutral-400 font-medium">{trainer.specialty} • {trainer.experience}</p>
              <p className="text-neutral-300 text-xs pt-3 border-t border-neutral-800 leading-relaxed">{trainer.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
