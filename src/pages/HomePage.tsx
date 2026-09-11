import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, ArrowRight, Star } from 'lucide-react';
import heroBg from '../assets/images/hero_bg.png';
import logoImg from '../assets/images/logo.png';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { BmiCalculatorWidget } from '../components/BmiCalculatorWidget';
import { useData } from '../hooks/useData';

export const HomePage: React.FC = () => {
  const { services, trainers, testimonials, settings } = useData();

  const activeServices = services.filter((s) => s.isActive);
  const featuredServices = activeServices.filter((s) => s.isFeatured).length > 0 ? activeServices.filter((s) => s.isFeatured) : activeServices;
  const activeTrainers = trainers.filter((t) => t.isAvailable);
  const featuredTrainers = activeTrainers.filter((t) => t.isFeatured).length > 0 ? activeTrainers.filter((t) => t.isFeatured) : activeTrainers;
  const publishedTestimonials = testimonials.filter((t) => t.isPublished);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Beast Factory Gym" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/70 to-[#0a0a0a]/20"></div>
          <div className="absolute top-[20%] left-[30%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(232,39,42,0.12)_0%,transparent_70%)] pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-[#e8272a]/40 backdrop-blur-md shadow-lg shadow-red-500/10">
            <span className="w-2 h-2 rounded-full bg-[#e8272a] animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">
              Est. 2021 · {settings.daysOpen} · {settings.operatingHours}
            </span>
          </motion.div>

          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="w-40 h-40 sm:w-48 sm:h-48 mx-auto">
            <img src={logoImg} alt="Beast Factory Emblem" className="w-full h-full object-contain drop-shadow-2xl" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="font-heading text-6xl sm:text-8xl md:text-9xl tracking-tight leading-none text-white drop-shadow-2xl">
            BEAST <span className="text-gradient-red">FACTORY</span>
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="font-heading text-xl sm:text-2xl text-[#e8272a] tracking-widest">
            {settings.tagline}
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed">
            Elite coaching, cutting-edge equipment, and a community that refuses to quit. This is where transformation actually happens.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/apply" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#e8272a] text-white font-heading text-xl tracking-wider hover:bg-[#ff1e1e] hover:scale-105 transition-all shadow-xl shadow-red-500/30 flex items-center justify-center gap-2 group">
              <span>JOIN NOW →</span>
            </Link>
            <Link to="/membership" className="w-full sm:w-auto px-8 py-4 rounded-full bg-neutral-900/90 border border-neutral-700 text-white font-heading text-xl tracking-wider hover:bg-neutral-800 hover:border-[#e8272a]/50 transition-all flex items-center justify-center gap-2">
              <span>EXPLORE MEMBERSHIP</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. TICKER MARQUEE */}
      <MarqueeTicker />

      {/* 3. STATS */}
      <section className="py-16 bg-[#0a0a0a] relative border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '1000+', label: 'Active Members' },
              { val: '15+', label: 'Certified Coaches' },
              { val: '50+', label: 'Heavy Machines' },
              { val: '365', label: 'Days Open / Year' },
            ].map((s) => (
              <div key={s.label} className="glass-panel p-6 rounded-2xl border border-neutral-800">
                <div className="font-heading text-4xl sm:text-5xl text-[#e8272a] mb-1">{s.val}</div>
                <div className="text-xs text-neutral-400 font-semibold uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ALL SERVICES GRID */}
      <section className="py-24 bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">WHAT WE OFFER</span>
            <h2 className="font-heading text-4xl sm:text-6xl text-white mt-1">OUR <span className="text-[#e8272a]">SERVICES</span></h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {activeServices.map((svc) => (
              <div key={svc.id} className="glass-panel p-5 rounded-2xl border border-neutral-800 hover:border-[#e8272a]/40 transition-all duration-300 text-center group hover:-translate-y-1">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="font-heading text-base sm:text-lg text-white group-hover:text-[#ff1e1e] transition-colors tracking-wide">{svc.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROGRAMS */}
      <section className="py-24 bg-[#111111] relative border-y border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">WORLD-CLASS TRAINING</span>
              <h2 className="font-heading text-4xl sm:text-6xl text-white mt-1">FITNESS <span className="text-[#e8272a]">PROGRAMS</span></h2>
            </div>
            <Link to="/services" className="mt-4 md:mt-0 text-sm font-bold text-[#e8272a] hover:text-[#ff1e1e] flex items-center gap-1">
              <span>VIEW ALL PROGRAMS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.slice(0, 3).map((program) => (
              <div key={program.id} className="group glass-panel rounded-3xl overflow-hidden border border-neutral-800 hover:border-[#e8272a]/40 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between">
                <div className="relative h-56 overflow-hidden">
                  <img src={program.coverImageUrl} alt={program.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent"></div>
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#e8272a] text-white text-xs font-bold uppercase tracking-wider">Training</span>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-2xl text-white group-hover:text-[#ff1e1e] transition-colors">{program.name}</h3>
                    <p className="text-neutral-400 text-xs mt-2 leading-relaxed">{program.shortDescription}</p>
                  </div>
                  <ul className="space-y-2 pt-2 border-t border-neutral-800/80">
                    {program.features.map((feat, idx) => (
                      <li key={idx} className="text-xs text-neutral-300 flex items-center gap-2">
                        <Dumbbell className="w-3.5 h-3.5 text-[#e8272a] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BMI CALCULATOR */}
      <section className="py-20 bg-[#0a0a0a] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BmiCalculatorWidget />
        </div>
      </section>

      {/* 7. TRAINERS */}
      <section className="py-24 bg-[#111111] border-y border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">ELITE COACHING TEAM</span>
            <h2 className="font-heading text-4xl sm:text-6xl text-white mt-1">MEET THE <span className="text-[#e8272a]">BEAST COACHES</span></h2>
            <p className="text-neutral-400 text-sm mt-3">Certified professionals dedicated to maximizing your strength, technique, and discipline.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredTrainers.map((trainer) => (
              <div key={trainer.id} className="glass-panel rounded-3xl overflow-hidden border border-neutral-800 group hover:border-[#e8272a]/50 transition-all duration-300">
                <div className="relative h-80 overflow-hidden">
                  <img src={trainer.photoUrl} alt={trainer.fullName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-xs font-bold text-[#e8272a] uppercase tracking-widest">{trainer.title}</span>
                  <h3 className="font-heading text-2xl text-white">{trainer.fullName}</h3>
                  <p className="text-xs text-neutral-400">{trainer.specializations.join(', ')} • {trainer.yearsExperience}+ Years</p>
                  <p className="text-neutral-300 text-xs pt-2 border-t border-neutral-800">{trainer.shortBio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. REVIEWS */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-1 text-[#e8272a] mb-2">
              {[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-current" />))}
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl text-white">WHAT OUR <span className="text-[#e8272a]">MEMBERS SAY</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {publishedTestimonials.map((rev) => (
              <div key={rev.id} className="glass-panel p-6 rounded-3xl border border-neutral-800 flex flex-col justify-between space-y-4">
                <p className="text-neutral-300 text-sm italic leading-relaxed">"{rev.comment}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
                  <div className="w-10 h-10 rounded-full bg-[#e8272a]/20 border border-[#e8272a]/40 flex items-center justify-center text-[#e8272a] font-heading text-lg">{rev.name.charAt(0)}</div>
                  <div>
                    <h4 className="font-heading text-lg text-white">{rev.name}</h4>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Verified Member</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA BANNER */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#e8272a]"></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-heading text-5xl sm:text-7xl text-white font-bold tracking-tight">READY TO RELEASE YOUR INNER BEAST?</h2>
          <p className="text-white/80 font-medium text-lg max-w-xl mx-auto">Join Damak's most powerful fitness community today. {settings.daysOpen} • {settings.operatingHours}</p>
          <div>
            <Link to="/apply" className="inline-block px-10 py-4 rounded-full bg-[#0a0a0a] text-white font-heading text-2xl tracking-wider hover:bg-neutral-900 transition-transform hover:scale-105 shadow-2xl">
              CLAIM YOUR FREE TRIAL PASS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
