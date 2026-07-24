import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Dumbbell, ChevronRight } from 'lucide-react';
import logoImg from '../assets/images/logo.png';
import { GYM_INFO } from '../data/gymData';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Membership', path: '/membership' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg overflow-hidden shadow-lg shadow-red-500/10 group-hover:scale-105 transition-transform">
              <img src={logoImg} alt="Beast Factory Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-heading text-2xl tracking-wider text-white flex items-center gap-1">
                BEAST <span className="text-[#e8272a]">FACTORY</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 block -mt-1 font-sans">
                The Fitness Paradise
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1 bg-neutral-900/60 p-1.5 rounded-full border border-neutral-800/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-[#e8272a] text-white font-bold shadow-md shadow-red-500/20'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* ACTION BUTTONS */}
          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${GYM_INFO.phone}`} className="flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-[#ff1e1e] transition-colors">
              <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#e8272a]">
                <Phone className="w-4 h-4" />
              </div>
              <span>{GYM_INFO.phone}</span>
            </a>
            <Link to="/apply" className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#e8272a] text-white font-heading tracking-wide text-base hover:bg-[#ff1e1e] transition-all shadow-lg shadow-red-500/25 active:scale-95">
              <Dumbbell className="w-4 h-4" />
              <span>JOIN NOW</span>
            </Link>
          </div>

          {/* MOBILE HAMBURGER */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-[#ff1e1e] focus:outline-none">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="lg:hidden glass-panel border-t border-neutral-800 mt-3 px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
              isActive(link.path) ? 'bg-[#e8272a]/15 text-[#ff1e1e] border border-[#e8272a]/30' : 'text-neutral-300 hover:bg-neutral-800/60 hover:text-white'
            }`}>
              <span>{link.name}</span>
              <ChevronRight className="w-4 h-4 text-neutral-500" />
            </Link>
          ))}
          <div className="pt-4 border-t border-neutral-800">
            <Link to="/apply" onClick={() => setIsOpen(false)} className="block w-full text-center py-3.5 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold shadow-lg shadow-red-500/20">
              JOIN NOW - GET STARTED
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
