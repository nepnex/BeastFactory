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
              <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-[#e8272a] hover:border-[#e8272a]/40 transition-all font-bold text-xs">FB</a>
              <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-[#e8272a] hover:border-[#e8272a]/40 transition-all font-bold text-xs">IG</a>
              <a href={settings.tiktokUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-[#e8272a] hover:border-[#e8272a]/40 transition-all font-bold text-xs">TK</a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-xl text-white tracking-wide border-b border-neutral-800 pb-2">QUICK NAVIGATION</h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              {[
                { to: '/about', label: 'About Us & Founders' },
                { to: '/services', label: 'Programs & Training' },
                { to: '/boxing', label: 'Boxing & Kickboxing' },
                { to: '/spa', label: 'Sauna, Steam & Jacuzzi' },
                { to: '/membership', label: 'Membership Pricing' },
                { to: '/products', label: 'Store & Merchandise' },
                { to: '/transformations', label: 'Member Transformations' },
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
            <div className="pt-2">
              <Link to="/admin" className="inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-white transition-colors">
                <Lock className="w-3.5 h-3.5" /> <span>Admin Operations Portal</span>
              </Link>
            </div>
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
