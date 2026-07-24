import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Dumbbell, ChevronRight } from 'lucide-react';
import logoImg from '../assets/images/logo.png';
import { GYM_INFO } from '../data/gymData';
import { AnimatePresence, motion } from 'framer-motion';

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
            <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform duration-300">
              <img src={logoImg} alt="Beast Factory Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-heading text-xl sm:text-2xl tracking-wider text-white flex items-center gap-1">
                BEAST <span className="text-[#e8272a]">FACTORY</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-neutral-500 block -mt-1 font-sans">
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
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80 text-neutral-200 hover:text-[#ff1e1e] focus:outline-none backdrop-blur-md transition-all active:scale-95" aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* PREMIUM FULLSCREEN OVERLAY MENU FOR MOBILE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[70px] bottom-0 z-40 bg-[#0a0a0afb] backdrop-blur-xl border-t border-neutral-900/50 flex flex-col justify-between p-6 overflow-y-auto lg:hidden"
          >
            <div className="flex flex-col gap-2 mt-4">
              {navLinks.map((link, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={link.path}
                >
                  <Link 
                    to={link.path} 
                    onClick={() => setIsOpen(false)} 
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl text-lg font-heading tracking-wider transition-all duration-300 ${
                      isActive(link.path) 
                        ? 'bg-[#e8272a] text-white shadow-xl shadow-red-600/20' 
                        : 'text-neutral-300 hover:bg-neutral-900/60 hover:text-white border border-transparent hover:border-neutral-800'
                    }`}
                  >
                    <span>{link.name.toUpperCase()}</span>
                    <ChevronRight className={`w-5 h-5 transition-transform ${isActive(link.path) ? 'text-white' : 'text-neutral-600'}`} />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 pt-6 border-t border-neutral-900 flex flex-col gap-4"
            >
              <a href={`tel:${GYM_INFO.phone}`} className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-white font-semibold">
                <Phone className="w-5 h-5 text-[#e8272a]" />
                <span>Call Center: {GYM_INFO.phone}</span>
              </a>
              <Link to="/apply" onClick={() => setIsOpen(false)} className="w-full text-center py-4.5 rounded-2xl bg-[#e8272a] text-white font-heading text-xl font-bold shadow-xl shadow-red-600/30 tracking-widest active:scale-[0.98] transition-transform">
                JOIN NOW — START TODAY
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
