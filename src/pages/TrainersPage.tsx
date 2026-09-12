import React from 'react';
import { Dumbbell, Award, GraduationCap, Trophy, Globe, Flame } from 'lucide-react';
import { useData } from '../hooks/useData';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { getBreadcrumbSchema, getTrainerSchema } from '../utils/schemaHelper';
import logoImg from '../assets/images/logo.png';

export const TrainersPage: React.FC = () => {
  const { trainers, settings } = useData();

  const activeTrainers = trainers
    .filter((t) => t.isAvailable)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const siteUrl = settings.siteUrl || 'https://beastfactorynepal.com';
  const breadcrumbSchema = getBreadcrumbSchema(siteUrl, [
    { name: 'Home', url: '/' },
    { name: 'Elite Coaches & Trainers', url: '/trainers' }
  ]);
  const trainerSchemas = activeTrainers.map((t) => getTrainerSchema(siteUrl, t));

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a] text-white min-h-screen">
      <SEO
        title="Personal Trainers & Certified Fitness Coaches in Damak, Jhapa"
        description="Meet the certified personal trainers and bodybuilding coaches at Beast Factory Gym in Damak, Jhapa. Expert 1-on-1 coaching, nutrition & contest prep."
        canonicalPath="/trainers"
        structuredData={[breadcrumbSchema, ...trainerSchemas]}
      />
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
        {activeTrainers.map((trainer) => (
          <div key={trainer.id} className="glass-panel rounded-3xl overflow-hidden border border-neutral-800 hover:border-[#e8272a]/40 transition-all space-y-4 p-6">
            <div className="h-72 sm:h-80 rounded-2xl overflow-hidden relative bg-neutral-900">
              <img
                src={trainer.photoUrl}
                alt={trainer.fullName}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = logoImg;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
            </div>
            <div className="space-y-3 text-left flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#e8272a] uppercase tracking-widest">{trainer.title}</span>
                <h3 className="font-heading text-3xl text-white">{trainer.fullName}</h3>
                <p className="text-xs text-neutral-400 font-medium">{trainer.specializations.join(', ')} • {trainer.yearsExperience}+ Years</p>
                <p className="text-neutral-300 text-xs pt-3 border-t border-neutral-800 leading-relaxed">{trainer.shortBio}</p>
              </div>

              {/* TRAINER SOCIALS & CONTACT */}
              <div className="flex items-center gap-2 pt-3 border-t border-neutral-900">
                {trainer.socials?.facebook && (
                  <a href={trainer.socials.facebook} target="_blank" rel="noreferrer" title="Facebook" className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                {trainer.socials?.instagram && (
                  <a href={trainer.socials.instagram} target="_blank" rel="noreferrer" title="Instagram" className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:border-transparent transition-all">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
                {trainer.socials?.tiktok && (
                  <a href={trainer.socials.tiktok} target="_blank" rel="noreferrer" title="TikTok" className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-black hover:border-neutral-700 transition-all">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.12V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.48V13a8.28 8.28 0 0 0 5.73 2.25V11.8a4.84 4.84 0 0 1-3.77-1.34 4.8 4.8 0 0 1-1.23-3.77h4v-.03z"/>
                    </svg>
                  </a>
                )}
                {trainer.socials?.whatsapp && (
                  <a href={`https://wa.me/${trainer.socials.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" title="WhatsApp" className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </a>
                )}
                {trainer.socials?.email && (
                  <a href={`mailto:${trainer.socials.email}`} title="Gmail / Email" className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-rose-600 hover:border-rose-600 transition-all">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
