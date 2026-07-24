import React from 'react';
import { Trophy, Users, Target } from 'lucide-react';
import aboutBg from '../assets/images/backgrounds/about-bg.webp';
import { GYM_INFO } from '../data/gymData';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a] text-white min-h-screen">
      
      <section className="relative py-20 px-4 text-center border-b border-neutral-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={aboutBg} alt="Beast Factory Gym" className="w-full h-full object-cover opacity-20 filter blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">OUR LEGACY & MISSION</span>
          <h1 className="font-heading text-6xl sm:text-8xl text-white">
            ABOUT <span className="text-[#e8272a]">BEAST FACTORY</span>
          </h1>
          <p className="font-heading text-xl text-[#e8272a] tracking-widest">{GYM_INFO.tagline}</p>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Founded in 2018 at {GYM_INFO.location}, Beast Factory was built with one clear mission: to create an uncompromised environment where individuals forge mental grit and physical excellence. Open {GYM_INFO.daysOpen}, {GYM_INFO.hours}.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-panel p-8 rounded-3xl border border-neutral-800 space-y-4 hover:border-[#e8272a]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#e8272a]/15 border border-[#e8272a]/30 flex items-center justify-center text-[#e8272a]">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-3xl text-white">PREMIUM STANDARDS</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              International grade equipment, heavy Olympic weights, specialized functional turf, sauna steam & jacuzzi, and in-house nutrition café — zero compromises.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-neutral-800 space-y-4 hover:border-[#e8272a]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#e8272a]/15 border border-[#e8272a]/30 flex items-center justify-center text-[#e8272a]">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-3xl text-white">SUPPORTIVE COMMUNITY</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Whether you are a beginner or a seasoned athlete, our community and certified coaches (both male & female) push each other to break personal records every single day.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-neutral-800 space-y-4 hover:border-[#e8272a]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#e8272a]/15 border border-[#e8272a]/30 flex items-center justify-center text-[#e8272a]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-3xl text-white">RESULTS-DRIVEN COACHING</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              No generic routines. We analyze your body composition, mobility, and goals to build custom training & diet plans with physiotherapist consultation and cupping therapy support.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};
