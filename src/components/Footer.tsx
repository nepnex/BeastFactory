import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Dumbbell, Clock, Lock } from 'lucide-react';
import logoImg from '../assets/images/logo.png';
import { useData } from '../hooks/useData';

import nepnexLogo from '../assets/images/nepnex_logo.png';

export const Footer: React.FC = () => {
  const { settings } = useData();

  return (
    <footer className="bg-[#0a0a0a] border-t border-neutral-900 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#e8272a] to-transparent opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md shadow-red-500/10">
                <img src={logoImg} alt="Beast Factory Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-heading text-2xl tracking-wider text-white">BEAST <span className="text-[#e8272a]">FACTORY</span></span>
                <span className="block text-[10px] text-neutral-500 uppercase tracking-widest">{settings.tagline}</span>
              </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Damak's premier strength & conditioning fitness facility. International standard machinery, expert certified trainers, boxing combat zone, sauna jacuzzi spa, and an unbeatable hardcore training environment. {settings.daysOpen}.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href={settings.facebookUrl} target="_blank" rel="noreferrer" title="Facebook" className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:scale-105 transition-all">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href={settings.instagramUrl} target="_blank" rel="noreferrer" title="Instagram" className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:border-transparent hover:scale-105 transition-all">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href={settings.tiktokUrl} target="_blank" rel="noreferrer" title="TikTok" className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-black hover:border-neutral-700 hover:scale-105 transition-all">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.12V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.48V13a8.28 8.28 0 0 0 5.73 2.25V11.8a4.84 4.84 0 0 1-3.77-1.34 4.8 4.8 0 0 1-1.23-3.77h4v-.03z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-xl text-white tracking-wide border-b border-neutral-800 pb-2">QUICK NAVIGATION</h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              {[
                { to: '/about', label: 'About Us & Founders' },
                { to: '/services', label: 'Programs & Training' },
                { to: '/boxing', label: 'Boxing & Combat Zone' },
                { to: '/spa', label: 'Sauna, Steam & Jacuzzi' },
                { to: '/membership', label: 'Membership Pricing' },
                { to: '/products', label: 'Store & Merchandise' },
                { to: '/transformations', label: 'Member Transformations' },
                { to: '/calculator', label: 'BMI & Diet Calculator' },
                { to: '/gallery', label: 'Photo Gallery' },
                { to: '/faq', label: 'Support & FAQs' },
              ].map((l) => (
                <li key={l.to}><Link to={l.to} className="hover:text-[#ff1e1e] transition-colors flex items-center gap-2"><span className="text-[#e8272a]">›</span> {l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-xl text-white tracking-wide border-b border-neutral-800 pb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#e8272a]" />OPERATING HOURS
            </h3>
            <div className="space-y-3 text-sm text-neutral-300">
              <div className="flex justify-between border-b border-neutral-900 pb-2">
                <span className="text-neutral-400">Hours:</span>
                <span className="font-semibold text-[#e8272a]">{settings.operatingHours}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Days:</span>
                <span className="text-emerald-400 font-medium">{settings.daysOpen}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-xl text-white tracking-wide border-b border-neutral-800 pb-2">CONTACT & LOCATION</h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-[#e8272a] shrink-0 mt-0.5" /><span>{settings.locationAddress}</span></li>
              <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-[#e8272a] shrink-0" /><span>{settings.phone}</span></li>
              <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-[#e8272a] shrink-0" /><span>{settings.email}</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <div className="flex items-center gap-2">
            <p>© {new Date().getFullYear()} Beast Factory Gym. All Rights Reserved.</p>
          </div>
          
          <a
            href="https://nepnex.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-900/90 border border-neutral-800 hover:border-[#0088cc]/60 hover:bg-neutral-800 transition-all text-neutral-300 hover:text-white group"
          >
            <span className="text-[11px] text-neutral-400">Developed by</span>
            <img src={nepnexLogo} alt="NepNex Technologies" className="h-5 object-contain" />
            <span className="font-bold text-xs bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent group-hover:from-sky-300 group-hover:to-blue-400">NepNex Technologies</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
