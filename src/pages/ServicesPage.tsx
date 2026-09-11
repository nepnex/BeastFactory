import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useData } from '../hooks/useData';

export const ServicesPage: React.FC = () => {
  const { services } = useData();

  const activeServices = services
    .filter((s) => s.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a] text-white min-h-screen">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
        <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">WORLD CLASS FACILITIES</span>
        <h1 className="font-heading text-6xl sm:text-7xl text-white">
          OUR SERVICES & <span className="text-[#e8272a]">FACILITIES</span>
        </h1>
        <p className="text-neutral-400 text-base max-w-2xl mx-auto">
          Explore our comprehensive range of fitness programs — from weight loss and bodybuilding to sauna steam, boxing, zumba, and physiotherapy.
        </p>
      </div>

      {/* ALL SERVICES GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {activeServices.map((svc) => (
            <div key={svc.id} className="glass-panel p-5 rounded-2xl border border-neutral-800 hover:border-[#e8272a]/40 transition-all duration-300 text-center group hover:-translate-y-1">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-heading text-base sm:text-lg text-white group-hover:text-[#ff1e1e] transition-colors tracking-wide">{svc.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* DETAILED PROGRAMS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {activeServices.map((prog, index) => (
          <div
            key={prog.id}
            className={`glass-panel rounded-3xl p-8 border border-neutral-800 flex flex-col ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
            } gap-8 items-center hover:border-[#e8272a]/30 transition-all`}
          >
            <div className="w-full lg:w-1/2 h-80 rounded-2xl overflow-hidden relative">
              <img src={prog.coverImageUrl} alt={prog.name} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#e8272a] text-white text-xs font-bold uppercase">
                Featured Program
              </span>
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#e8272a] uppercase tracking-widest">BEAST SERVICE</span>
                <h2 className="font-heading text-4xl text-white mt-1">{prog.name}</h2>
                <p className="text-neutral-300 text-sm mt-3 leading-relaxed">{prog.longDescription}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs text-neutral-400 font-bold uppercase tracking-wider">KEY HIGHLIGHTS:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {prog.features.map((f, i) => (
                    <li key={i} className="text-xs text-neutral-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#e8272a] shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400">Starting NPR {prog.startingPriceNpr?.toLocaleString()}</span>
                <Link to="/apply" className="px-6 py-2.5 rounded-full bg-[#e8272a] text-white font-heading text-lg font-bold hover:bg-[#ff1e1e] transition-colors">
                  ENROLL NOW
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
