import React from 'react';
import { Trophy, ArrowRight, ShieldCheck } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { Link } from 'react-router-dom';

export const TransformationsPage: React.FC = () => {
  const { transformations } = useData();

  const publishedTransformations = transformations.filter((t) => t.isPublished && t.hasClientConsent);

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a] text-white min-h-screen">
      {/* HERO */}
      <section className="relative py-20 px-4 text-center border-b border-neutral-900 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4" /> PROVEN RESULTS
          </span>
          <h1 className="font-heading text-6xl sm:text-8xl text-white">
            MEMBER <span className="text-[#e8272a]">TRANSFORMATIONS</span>
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Real members, verified results. Every story represents sweat, consistency, and expert coaching at Beast Factory Gym.
          </p>
        </div>
      </section>

      {/* TRANSFORMATIONS GALLERY */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {publishedTransformations.map((item, index) => (
            <div key={item.id} className="glass-panel rounded-3xl p-8 border border-neutral-800 hover:border-[#e8272a]/40 transition-all flex flex-col lg:flex-row gap-8 items-center">
              {/* BEFORE & AFTER PHOTO SIDE-BY-SIDE */}
              <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 relative rounded-2xl overflow-hidden">
                <div className="relative h-72 rounded-xl overflow-hidden border border-neutral-800">
                  <img src={item.beforePhotoUrl} alt={`${item.clientName} Before`} className="w-full h-full object-cover filter grayscale" />
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/80 text-neutral-300 text-xs font-bold uppercase tracking-wider border border-neutral-700">
                    BEFORE {item.startingWeightKg ? `(${item.startingWeightKg} kg)` : ''}
                  </span>
                </div>

                <div className="relative h-72 rounded-xl overflow-hidden border border-[#e8272a]/50">
                  <img src={item.afterPhotoUrl} alt={`${item.clientName} After`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#e8272a] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-500/20">
                    AFTER {item.finalWeightKg ? `(${item.finalWeightKg} kg)` : ''}
                  </span>
                </div>
              </div>

              {/* STORY & TESTIMONIAL DETAILS */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Verified Member Result</span>
                  </div>
                  <h2 className="font-heading text-4xl text-white">{item.clientName}</h2>
                  <p className="text-xs text-[#e8272a] font-semibold uppercase tracking-wider mt-0.5">
                    {item.programName || 'Beast Transformation Program'} • {item.durationWeeks || 12} Weeks
                  </p>
                </div>

                <p className="text-neutral-300 text-sm leading-relaxed">{item.storyText}</p>

                {item.testimonialQuote && (
                  <blockquote className="border-l-2 border-[#e8272a] pl-4 italic text-neutral-400 text-xs leading-relaxed">
                    "{item.testimonialQuote}"
                  </blockquote>
                )}

                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Ready for your transformation?</span>
                  <Link to="/apply" className="px-6 py-2.5 rounded-full bg-[#e8272a] text-white font-heading text-base hover:bg-[#ff1e1e] flex items-center gap-1 transition-all">
                    <span>START YOUR JOURNEY</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
