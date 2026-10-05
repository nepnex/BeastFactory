import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, ArrowRight, Star, ExternalLink, UserCheck } from 'lucide-react';
import heroBg from '../assets/images/hero_bg.png';
import logoImg from '../assets/images/logo.png';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { BmiCalculatorWidget } from '../components/BmiCalculatorWidget';
import { useData } from '../hooks/useData';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { SEO } from '../components/SEO';
import { getLocalBusinessSchema } from '../utils/schemaHelper';
import { CoachProfileModal } from '../components/CoachProfileModal';
import { ProgressiveImage } from '../components/ProgressiveImage';
import { Trainer } from '../types';

import { AnnouncementBanner } from '../components/AnnouncementBanner';

export const HomePage: React.FC = () => {
  const { services, trainers, testimonials, settings } = useData();
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  const activeServices = services.filter((s) => s.isActive);
  const featuredServices = activeServices.filter((s) => s.isFeatured).length > 0 ? activeServices.filter((s) => s.isFeatured) : activeServices;
  const activeTrainers = trainers.filter((t) => t.isAvailable);
  const featuredTrainers = activeTrainers.filter((t) => t.isFeatured).length > 0 ? activeTrainers.filter((t) => t.isFeatured) : activeTrainers;
  const publishedTestimonials = testimonials.filter((t) => t.isPublished);

  const localBusinessSchema = getLocalBusinessSchema(settings);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <SEO
        title="Beast Factory | Best Gym & Fitness Center in Damak, Jhapa"
        description="Beast Factory is the premier bodybuilding gym, personal training center, boxing ring, and hydrotherapy sauna spa in Damak-1, Jhapa, Nepal. Open 365 days, 3:30 AM – 11:00 PM."
        canonicalPath="/"
        structuredData={localBusinessSchema}
      />
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Beast Factory Gym" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/70 to-[#0a0a0a]/20"></div>
          <div className="absolute top-[20%] left-[30%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(232,39,42,0.15)_0%,transparent_70%)] pointer-events-none blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-[#e8272a]/40 backdrop-blur-md shadow-lg shadow-red-500/10">
            <span className="w-2 h-2 rounded-full bg-[#e8272a] animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">
              Est. 2021 · {settings.daysOpen} · {settings.operatingHours}
            </span>
          </motion.div>

          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="w-40 h-40 sm:w-48 sm:h-48 mx-auto">
            <img src={logoImg} alt="Beast Factory Emblem" className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(232,39,42,0.3)] hover:scale-105 transition-transform duration-300" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="font-heading text-6xl sm:text-8xl md:text-9xl tracking-tight leading-none text-white drop-shadow-2xl">
            BEAST <span className="text-gradient-red text-3d-red">FACTORY</span>
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="font-heading text-xl sm:text-2xl text-[#e8272a] tracking-widest">
            {settings.tagline}
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed">
            Elite coaching, cutting-edge equipment, and a community that refuses to quit. This is where transformation actually happens.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/apply" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#e8272a] text-white font-heading text-xl tracking-wider hover:bg-[#ff1e1e] hover:scale-105 transition-all shadow-2xl shadow-red-500/40 flex items-center justify-center gap-2 group border border-red-500/30">
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
              <div key={s.label} className="glass-panel-3d p-6 rounded-2xl border border-neutral-800 hover:border-[#e8272a]/40 transition-all duration-300">
                <div className="font-heading text-4xl sm:text-5xl text-[#e8272a] mb-1 drop-shadow-md">{s.val}</div>
                <div className="text-xs text-neutral-400 font-semibold uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENTS & OFFERS BANNER */}
      <AnnouncementBanner />

      {/* 4. ALL SERVICES GRID */}
      <section className="py-24 bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">WHAT WE OFFER</span>
            <h2 className="font-heading text-4xl sm:text-6xl text-white mt-1">OUR <span className="text-[#e8272a]">SERVICES</span></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeServices.map((svc) => (
              <div 
                key={svc.id} 
                className="glass-panel p-5 rounded-2xl border border-neutral-800 hover:border-[#e8272a]/50 transition-all duration-300 flex items-center gap-4 group hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e8272a]/15 border border-[#e8272a]/30 flex items-center justify-center text-[#e8272a] shrink-0 font-bold text-lg group-hover:bg-[#e8272a] group-hover:text-white transition-colors">
                  ✓
                </div>
                <div>
                  <h4 className="font-heading text-lg sm:text-xl text-white group-hover:text-[#ff1e1e] transition-colors tracking-wide leading-snug">
                    {svc.name}
                  </h4>
                  {svc.shortDescription && (
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-1">{svc.shortDescription}</p>
                  )}
                </div>
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
              <Tilt3DCard key={program.id} depth={18}>
                <div className="group glass-panel-3d rounded-3xl overflow-hidden border border-neutral-800 hover:border-[#e8272a]/60 transition-all duration-300 flex flex-col justify-between h-full">
                  <div className="relative h-56 overflow-hidden">
                    <ProgressiveImage
                      src={program.coverImageUrl}
                      alt={program.name}
                      containerClassName="w-full h-full"
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent z-10 pointer-events-none"></div>
                    <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#e8272a] text-white text-xs font-bold uppercase tracking-wider shadow-lg">Training</span>
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
              </Tilt3DCard>
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
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">ELITE COACHING TEAM</span>
              <h2 className="font-heading text-4xl sm:text-6xl text-white mt-1">MEET THE <span className="text-[#e8272a]">BEAST COACHES</span></h2>
              <p className="text-neutral-400 text-sm mt-3">Certified professionals dedicated to maximizing your strength, technique, and discipline.</p>
            </div>
            <Link to="/trainers" className="mt-4 md:mt-0 text-sm font-bold text-[#e8272a] hover:text-[#ff1e1e] flex items-center gap-1 shrink-0">
              <span>VIEW ALL COACHES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredTrainers.map((trainer) => (
              <Tilt3DCard key={trainer.id} depth={20}>
                <div
                  onClick={() => setSelectedTrainer(trainer)}
                  className="glass-panel-3d rounded-3xl overflow-hidden border border-neutral-800 group hover:border-[#e8272a]/70 transition-all duration-300 cursor-pointer relative"
                >
                  <div className="relative h-80 overflow-hidden bg-neutral-950">
                    <ProgressiveImage
                      src={trainer.photoUrl}
                      alt={trainer.fullName}
                      containerClassName="w-full h-full"
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 pointer-events-none"></div>
                    <span className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-neutral-700 group-hover:border-[#e8272a] group-hover:bg-[#e8272a] transition-all shadow-lg flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>VIEW PROFILE</span>
                    </span>
                  </div>
                  <div className="p-6 space-y-2 text-left">
                    <span className="text-xs font-bold text-[#e8272a] uppercase tracking-widest block">{trainer.title}</span>
                    <h3 className="font-heading text-2xl text-white group-hover:text-[#ff1e1e] transition-colors flex items-center justify-between">
                      <span>{trainer.fullName}</span>
                      <span className="text-xs font-sans text-neutral-400 font-normal">➔</span>
                    </h3>
                    <p className="text-xs text-neutral-400">{trainer.specializations.join(', ')} • {trainer.yearsExperience}+ Years</p>
                    <p className="text-neutral-300 text-xs pt-2 border-t border-neutral-800 leading-relaxed">{trainer.shortBio}</p>
                  </div>
                </div>
              </Tilt3DCard>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PHOTO GALLERY SHOWCASE */}
      <section className="py-24 bg-[#111111] border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">FACILITY & ATMOSPHERE</span>
              <h2 className="font-heading text-4xl sm:text-6xl text-white mt-1">PHOTO <span className="text-[#e8272a]">GALLERY</span></h2>
              <p className="text-neutral-400 text-sm mt-2">Take a visual tour of our heavy lifting zone, combat ring, Finnish sauna, and luxury spa.</p>
            </div>
            <Link to="/gallery" className="mt-4 md:mt-0 text-sm font-bold text-[#e8272a] hover:text-[#ff1e1e] flex items-center gap-1 shrink-0">
              <span>EXPLORE FULL GALLERY</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {useData().galleryItems.filter(g => g.isActive).slice(0, 4).map((item) => (
              <Link key={item.id} to="/gallery" className="group glass-panel rounded-2xl overflow-hidden border border-neutral-800 relative h-64">
                <ProgressiveImage
                  src={item.imageUrl}
                  alt={item.title}
                  containerClassName="w-full h-full"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80 z-10 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <span className="text-[10px] text-[#e8272a] font-bold uppercase tracking-wider block">{item.category}</span>
                  <h4 className="font-heading text-xl text-white group-hover:text-[#ff1e1e] transition-colors">{item.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. REVIEWS */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="flex items-center justify-center gap-1 text-[#e8272a]">
              {[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-current" />))}
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl text-white">WHAT OUR <span className="text-[#e8272a]">MEMBERS SAY</span></h2>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Genuine testimonials submitted and verified by Beast Factory Damak members.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {publishedTestimonials.map((rev) => {
              const reviewerName = rev.memberName || rev.name || 'Member';
              return (
                <div key={rev.id} className="glass-panel p-6 rounded-3xl border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-[#e8272a]/40 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 font-bold uppercase">
                        {rev.source || 'Direct Member'}
                      </span>
                    </div>
                    <p className="text-neutral-300 text-xs sm:text-sm italic leading-relaxed">"{rev.comment}"</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#e8272a]/20 border border-[#e8272a]/40 flex items-center justify-center text-[#e8272a] font-heading text-lg">
                        {reviewerName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-heading text-base text-white">{reviewerName}</h4>
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                          {rev.isVerified ? 'Verified Member' : 'Member Review'}
                        </span>
                      </div>
                    </div>
                    {rev.sourceUrl && (
                      <a href={rev.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-lg bg-neutral-900 border border-neutral-800" title="View Review Source">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <a
              href={settings.googleMapsUrl || 'https://maps.app.goo.gl/K1E2VLizXKFXfwov5'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-neutral-900 border border-neutral-700 text-white font-heading text-sm hover:bg-[#e8272a] hover:border-[#e8272a] transition-all shadow-lg group"
            >
              <span>VIEW ALL REVIEWS ON GOOGLE MAPS</span>
              <ExternalLink className="w-4 h-4 text-[#e8272a] group-hover:text-white transition-colors" />
            </a>
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

      {/* COACH PROFILE MODAL */}
      <CoachProfileModal
        isOpen={!!selectedTrainer}
        onClose={() => setSelectedTrainer(null)}
        trainer={selectedTrainer}
      />
    </div>
  );
};
