import React from 'react';
import { X, Award, GraduationCap, Globe, Check, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { Trainer } from '../types';
import { Link } from 'react-router-dom';
import logoImg from '../assets/images/logo.png';

interface CoachProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainer: Trainer | null;
}

export const CoachProfileModal: React.FC<CoachProfileModalProps> = ({
  isOpen,
  onClose,
  trainer,
}) => {
  if (!isOpen || !trainer) return null;

  const whatsappNumber = trainer.socials?.whatsapp
    ? trainer.socials.whatsapp.replace(/[^0-9]/g, '')
    : '97723577880';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="glass-panel max-w-4xl w-full rounded-3xl overflow-hidden border border-neutral-800 relative flex flex-col md:flex-row max-h-[90vh] my-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          aria-label="Close Coach Profile Modal"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 border border-neutral-700 text-white flex items-center justify-center hover:bg-[#e8272a] hover:border-[#e8272a] transition-all shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* COACH IMAGE COLUMN */}
        <div className="w-full md:w-5/12 h-72 sm:h-96 md:h-auto bg-neutral-950 relative overflow-hidden group">
          <img
            src={trainer.photoUrl}
            alt={trainer.fullName}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src = logoImg;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent"></div>

          <div className="absolute bottom-4 left-4 right-4 space-y-1">
            <span className="px-3 py-1 rounded-full bg-[#e8272a] text-white text-[10px] font-bold uppercase tracking-widest inline-block shadow-md">
              {trainer.yearsExperience}+ YEARS EXPERIENCE
            </span>
            {trainer.sessionPriceNpr && (
              <div className="text-white text-xs font-heading tracking-wide">
                NPR {trainer.sessionPriceNpr.toLocaleString()} / session
              </div>
            )}
          </div>
        </div>

        {/* COACH PROFILE DETAILS COLUMN */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-neutral-950/95 border-t md:border-t-0 md:border-l border-neutral-800 overflow-y-auto max-h-[75vh] md:max-h-none">
          <div className="space-y-5">
            {/* HEADER */}
            <div>
              <span className="text-[11px] font-bold text-[#e8272a] uppercase tracking-widest block mb-1">
                BEAST FACTORY CERTIFIED COACH
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wide">
                {trainer.fullName}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 font-semibold mt-1">
                {trainer.title}
              </p>
            </div>

            {/* SPECIALIZATIONS BADGES */}
            {trainer.specializations && trainer.specializations.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {trainer.specializations.map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px] font-medium flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-[#e8272a]" />
                    {spec}
                  </span>
                ))}
              </div>
            )}

            {/* BIO & STORY */}
            <div className="space-y-2 border-t border-neutral-900 pt-4">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">ABOUT THE COACH</h4>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                {trainer.fullBio || trainer.shortBio}
              </p>
            </div>

            {/* CERTIFICATIONS */}
            {trainer.certifications && trainer.certifications.length > 0 && (
              <div className="space-y-2 border-t border-neutral-900 pt-4">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#e8272a]" />
                  <span>CERTIFICATIONS & QUALIFICATIONS</span>
                </h4>
                <ul className="space-y-1.5">
                  {trainer.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-[#e8272a] shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* LANGUAGES SPOKEN */}
            {trainer.languages && trainer.languages.length > 0 && (
              <div className="flex items-center gap-2 border-t border-neutral-900 pt-3 text-xs text-neutral-400">
                <Globe className="w-3.5 h-3.5 text-[#e8272a]" />
                <span className="font-semibold text-neutral-300">Languages:</span>
                <span>{trainer.languages.join(', ')}</span>
              </div>
            )}

            {/* SOCIAL MEDIA LINKS */}
            {trainer.socials && (
              <div className="border-t border-neutral-900 pt-4 space-y-2">
                <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">CONNECT WITH COACH</h4>
                <div className="flex items-center gap-2">
                  {trainer.socials.facebook && (
                    <a
                      href={trainer.socials.facebook}
                      target="_blank"
                      rel="noreferrer"
                      title="Facebook Profile"
                      className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}
                  {trainer.socials.instagram && (
                    <a
                      href={trainer.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      title="Instagram Profile"
                      className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:border-transparent transition-all"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                  {trainer.socials.tiktok && (
                    <a
                      href={trainer.socials.tiktok}
                      target="_blank"
                      rel="noreferrer"
                      title="TikTok Profile"
                      className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-black hover:border-neutral-700 transition-all"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.12V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.48V13a8.28 8.28 0 0 0 5.73 2.25V11.8a4.84 4.84 0 0 1-3.77-1.34 4.8 4.8 0 0 1-1.23-3.77h4v-.03z"/>
                      </svg>
                    </a>
                  )}
                  {trainer.socials.whatsapp && (
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi Coach ${trainer.fullName}, I want to enquire about 1-on-1 personal training at Beast Factory Damak.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      title="WhatsApp Coach"
                      className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="pt-4 border-t border-neutral-900 flex flex-col sm:flex-row gap-3">
            <Link
              to={`/apply?trainer=${trainer.id}`}
              onClick={onClose}
              className="flex-1 py-3 px-5 rounded-2xl bg-[#e8272a] text-white font-heading text-xs uppercase tracking-wider hover:bg-[#ff1e1e] transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK 1-ON-1 COACHING</span>
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello Coach ${trainer.fullName}, I'm interested in personal coaching.`)}`}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-5 rounded-2xl bg-neutral-900 border border-neutral-800 text-white font-heading text-xs uppercase tracking-wider hover:bg-[#25D366] hover:border-[#25D366] transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
