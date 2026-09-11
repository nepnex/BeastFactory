import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Shield,
  Award,
  Waves,
  ShoppingBag,
  Sparkles,
  Layers,
  Inbox,
  CalendarCheck,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import logoImg from '../assets/images/logo.png';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navSections = [
    {
      group: 'DASHBOARD',
      items: [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
      ]
    },
    {
      group: 'CONTENT',
      items: [
        { name: 'Services', path: '/admin/services', icon: Sparkles },
        { name: 'Trainers', path: '/admin/trainers', icon: Dumbbell },
        { name: 'Founders', path: '/admin/founders', icon: Award },
        { name: 'Memberships', path: '/admin/memberships', icon: Layers },
        { name: 'Boxing', path: '/admin/boxing', icon: Shield },
        { name: 'Spa', path: '/admin/spa', icon: Waves },
        { name: 'Products', path: '/admin/products', icon: ShoppingBag },
        { name: 'Transformations', path: '/admin/transformations', icon: Users },
        { name: 'Gallery', path: '/admin/gallery', icon: Sparkles },
        { name: 'Testimonials', path: '/admin/testimonials', icon: Award },
        { name: 'FAQ', path: '/admin/faq', icon: Layers },
      ]
    },
    {
      group: 'OPERATIONS',
      items: [
        { name: 'Bookings', path: '/admin/bookings', icon: CalendarCheck },
        { name: 'Inquiries', path: '/admin/inquiries', icon: Inbox },
      ]
    },
    {
      group: 'SYSTEM',
      items: [
        { name: 'Settings', path: '/admin/settings', icon: Settings },
      ]
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex font-sans">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-64 flex-col bg-[#0a0a0a] border-r border-neutral-900 fixed top-0 bottom-0 z-40">
        {/* BRAND HEADER */}
        <div className="p-5 border-b border-neutral-900 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-3">
            <img src={logoImg} alt="Logo" className="w-8 h-8 object-contain" />
            <div>
              <span className="font-heading text-lg text-white block leading-none">BEAST <span className="text-[#e8272a]">ADMIN</span></span>
              <span className="text-[9px] uppercase tracking-widest text-neutral-500">Control Panel</span>
            </div>
          </Link>
          <Link to="/" target="_blank" className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white" title="View Public Website">
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* SIDEBAR NAVIGATION */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {navSections.map((sec) => (
            <div key={sec.group} className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold px-3 block mb-2">{sec.group}</span>
              {sec.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${active ? 'bg-[#e8272a] text-white font-bold shadow-md shadow-red-500/20' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'}`}>
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* LOGOUT FOOTER */}
        <div className="p-4 border-t border-neutral-900">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-4 h-4" />
            <span>LOGOUT ADMIN</span>
          </button>
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md lg:hidden flex">
          <div className="w-72 bg-[#0a0a0a] h-full p-5 flex flex-col justify-between overflow-y-auto border-r border-neutral-800">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <span className="font-heading text-xl text-white">BEAST <span className="text-[#e8272a]">ADMIN</span></span>
                <button onClick={() => setMobileOpen(false)} className="text-neutral-400"><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-6">
                {navSections.map((sec) => (
                  <div key={sec.group} className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold px-2 block mb-1">{sec.group}</span>
                    {sec.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium ${isActive(item.path) ? 'bg-[#e8272a] text-white font-bold' : 'text-neutral-400'}`}>
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold text-red-400 bg-red-500/10 mt-6">
              <LogOut className="w-4 h-4" /><span>LOGOUT ADMIN</span>
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* TOPBAR */}
        <header className="h-16 border-b border-neutral-900 bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-lg bg-neutral-900 text-neutral-300">
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider hidden sm:inline-block">
              BEAST FACTORY OPERATIONS PORTAL
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">SYSTEM ONLINE</span>
            </div>
            <Link to="/" target="_blank" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-white font-medium">
              <span>Public Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* CONTENT VIEWPORT */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
