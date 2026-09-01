import React from 'react';
import { Trophy, Users, Target, Award } from 'lucide-react';
import aboutBg from '../assets/images/backgrounds/about-bg.webp';
import { useData } from '../hooks/useData';

export const AboutPage: React.FC = () => {
  const { founders, settings } = useData();

  const activeFounders = founders.filter((f) => f.isActive);

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a] text-white min-h-screen">
      {/* HERO */}
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
          <p className="font-heading text-xl text-[#e8272a] tracking-widest">{settings.tagline}</p>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Founded in 2018 at {settings.locationAddress}, Beast Factory was built with one clear mission: to create an uncompromised environment where individuals forge mental grit and physical excellence. Open {settings.daysOpen}, {settings.operatingHours}.
          </p>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-900">
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
              Whether you are a beginner or a seasoned athlete, our community and certified coaches push each other to break personal records every single day.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-neutral-800 space-y-4 hover:border-[#e8272a]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#e8272a]/15 border border-[#e8272a]/30 flex items-center justify-center text-[#e8272a]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-3xl text-white">RESULTS-DRIVEN COACHING</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              No generic routines. We analyze your body composition, mobility, and goals to build custom training & diet plans with physiotherapist consultation.
            </p>
          </div>
        </div>
      </section>

      {/* DEDICATED FOUNDERS / OUR TEAM SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold flex items-center justify-center gap-2">
            <Award className="w-4 h-4" /> LEADERSHIP & VISION
          </span>
          <h2 className="font-heading text-5xl sm:text-6xl text-white">MEET OUR <span className="text-[#e8272a]">FOUNDERS</span></h2>
          <p className="text-neutral-400 text-sm">The driving force behind Beast Factory Gym's standards, culture, and innovation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activeFounders.map((founder) => (
            <div key={founder.id} className="glass-panel rounded-3xl overflow-hidden border border-neutral-800 hover:border-[#e8272a]/50 transition-all duration-300 flex flex-col justify-between group">
              <div className="relative h-72 overflow-hidden bg-neutral-900">
                <img src={founder.photoUrl} alt={founder.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#e8272a] uppercase tracking-widest block">{founder.position}</span>
                  <h3 className="font-heading text-2xl text-white mt-0.5">{founder.name}</h3>
                  <p className="text-neutral-400 text-xs mt-2 leading-relaxed">{founder.shortBio}</p>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 space-y-2">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold block">EXPERTISE</span>
                  <div className="flex flex-wrap gap-1.5">
                    {founder.expertise.map((exp, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px]">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
