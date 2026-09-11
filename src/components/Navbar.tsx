import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  ChevronDown, 
  ShoppingBag, 
  TrendingUp, 
  Calculator, 
  HelpCircle, 
  Mail, 
  Menu, 
  X, 
  Calendar,
  Lock,
  ArrowRight
} from 'lucide-react';
import logoImg from '../assets/images/logo.png';
import { useData } from '../hooks/useData';

export const Navbar: React.FC = () => {
  const { settings } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menus when route changes
  useEffect(() => {
    setIsOpen(false);
    setMoreDropdownOpen(false);
  }, [location.pathname]);

  // Track scroll state for sticky navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle outside click for "More" dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary top-level navigation links
  const primaryNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Boxing', path: '/boxing' },
    { name: 'Spa & Sauna', path: '/spa' },
    { name: 'Membership', path: '/membership' },
  ];

  // Secondary navigation links in "More" dropdown
  const moreNavLinks = [
    { name: 'Store', path: '/products', icon: ShoppingBag, desc: 'Gym merch & supplements' },
    { name: 'Transformations', path: '/transformations', icon: TrendingUp, desc: 'Real member results' },
    { name: 'Calculator', path: '/calculator', icon: Calculator, desc: 'BMI & fitness tools' },
    { name: 'FAQ', path: '/faq', icon: HelpCircle, desc: 'Answers to common questions' },
    { name: 'Contact', path: '/contact', icon: Mail, desc: 'Get in touch & find us' },
  ];

  // All navigation links for mobile view
  const allMobileNavLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'SERVICES', path: '/services' },
    { name: 'TRAINERS', path: '/trainers' },
    { name: 'BOXING', path: '/boxing' },
    { name: 'SPA & SAUNA', path: '/spa' },
    { name: 'MEMBERSHIP', path: '/membership' },
    { name: 'TRANSFORMATIONS', path: '/transformations' },
    { name: 'STORE', path: '/products' },
    { name: 'CALCULATOR', path: '/calculator' },
    { name: 'FAQ', path: '/faq' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isMoreActive = moreNavLinks.some(link => location.pathname === link.path);

  // Framer Motion variants
  const mobileOverlayVariants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.25, ease: [0.32, 0, 0.67, 0] }
    },
    open: {
      opacity: 1,
      transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] }
    }
  };

  const containerVariants = {
    closed: {},
    open: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 15 },
    open: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl py-3'
            : 'bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3.5 group shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-lg shadow-red-500/10 group-hover:scale-105 transition-all duration-300 border border-neutral-800/80">
                <img src={logoImg} alt="Beast Factory Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl sm:text-2xl tracking-wider text-white flex items-center leading-none">
                  BEAST <span className="text-[#C8102E] ml-1">FACTORY</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-sans font-medium mt-1">
                  {settings.tagline || 'The Fitness Paradise'}
                </span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-neutral-900/70 p-1.5 rounded-full border border-neutral-800/80 backdrop-blur-md shadow-inner">
              {primaryNavLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                      active
                        ? 'bg-[#C8102E] text-white shadow-md shadow-red-600/30'
                        : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* MORE DROPDOWN */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setMoreDropdownOpen(false);
                  }}
                  aria-expanded={moreDropdownOpen}
                  aria-haspopup="true"
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide flex items-center gap-1 transition-all duration-200 focus:outline-none ${
                    isMoreActive || moreDropdownOpen
                      ? 'bg-neutral-800 text-[#C8102E]'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-[#C8102E]' : ''}`} />
                </button>

                {/* DROPDOWN MENU */}
                <AnimatePresence>
                  {moreDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0A0A0A] border border-neutral-800 p-2 shadow-2xl backdrop-blur-xl z-50"
                    >
                      <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-widest text-neutral-500 border-b border-neutral-900 mb-1">
                        Explore Beast Factory
                      </div>
                      {moreNavLinks.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMoreDropdownOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all duration-150 group ${
                              active
                                ? 'bg-[#C8102E]/15 text-[#C8102E] font-bold border border-[#C8102E]/30'
                                : 'text-neutral-300 hover:text-white hover:bg-neutral-900 border border-transparent'
                            }`}
                          >
                            <div className={`p-2 rounded-lg transition-colors ${active ? 'bg-[#C8102E] text-white' : 'bg-neutral-900 text-neutral-400 group-hover:text-[#C8102E] group-hover:bg-neutral-800'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-semibold text-white group-hover:text-[#C8102E] transition-colors">{item.name}</div>
                              <div className="text-[10px] text-neutral-500 line-clamp-1">{item.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* ACTION BUTTONS (DESKTOP) */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${settings.phone || '+977 23577880'}`}
                className="hidden xl:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white transition-colors group"
                title="Call Gym"
              >
                <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#C8102E] group-hover:border-[#C8102E]/50 group-hover:scale-105 transition-all">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium tracking-wide">{settings.phone || '+977 23577880'}</span>
              </a>

              <Link
                to="/apply"
                className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C8102E] text-white font-heading tracking-wider text-sm hover:bg-[#E81235] hover:shadow-lg hover:shadow-red-600/30 transition-all duration-200 active:scale-95 group font-bold"
              >
                <span>JOIN NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* MOBILE HAMBURGER BUTTON */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation-overlay"
              className="lg:hidden p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/50 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            variants={mobileOverlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col justify-between overflow-hidden lg:hidden"
          >
            {/* MOBILE MENU HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-900 shrink-0">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-red-500/10 border border-neutral-800">
                  <img src={logoImg} alt="Beast Factory Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="font-heading text-xl tracking-wider text-white block">
                    BEAST <span className="text-[#C8102E]">FACTORY</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-neutral-500 block">
                    {settings.tagline || 'The Fitness Paradise'}
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation menu"
                className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* SCROLLABLE NAV LINKS CONTAINER */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
              <motion.div variants={containerVariants} initial="closed" animate="open" className="space-y-1">
                {allMobileNavLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <motion.div key={link.path} variants={itemVariants}>
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between py-3 px-4 rounded-xl font-heading tracking-wider text-lg transition-all ${
                          active
                            ? 'text-[#C8102E] bg-neutral-900/90 border-l-4 border-[#C8102E] font-bold'
                            : 'text-neutral-200 hover:text-white hover:bg-neutral-900/50'
                        }`}
                      >
                        <span>{link.name}</span>
                        {active && <span className="w-2 h-2 rounded-full bg-[#C8102E]" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* MOBILE MENU FOOTER & CTAS */}
            <div className="p-6 border-t border-neutral-900 bg-neutral-950/80 shrink-0 space-y-4">
              {/* Phone Link */}
              <a
                href={`tel:${settings.phone || '+977 23577880'}`}
                className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-neutral-300 hover:text-[#C8102E] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C8102E]" />
                <span>{settings.phone || '+977 23577880'}</span>
              </a>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/apply"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-3.5 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-heading text-sm tracking-wider hover:bg-neutral-800 transition-colors text-center"
                >
                  <Calendar className="w-4 h-4 text-[#C8102E]" />
                  <span>FREE TRIAL</span>
                </Link>
                <Link
                  to="/apply"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-3.5 px-3 rounded-xl bg-[#C8102E] text-white font-heading text-sm tracking-wider font-bold shadow-lg shadow-red-600/30 hover:bg-[#E81235] transition-colors text-center"
                >
                  <span>JOIN NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Admin Portal link inside mobile drawer footer */}
              <div className="text-center pt-1">
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Operations Portal</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
