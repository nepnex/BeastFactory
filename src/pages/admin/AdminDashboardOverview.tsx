import React from 'react';
import { Link } from 'react-router-dom';
import { Inbox, CalendarCheck, Dumbbell, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { AdminLayout } from '../../layouts/AdminLayout';

export const AdminDashboardOverview: React.FC = () => {
  const { leads, bookings, trainers, products } = useData();

  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const pendingBookingsCount = bookings.filter((b) => b.status === 'pending').length;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* HEADER METRICS */}
        <div>
          <h1 className="font-heading text-4xl text-white">OPERATIONS <span className="text-[#e8272a]">DASHBOARD</span></h1>
          <p className="text-xs text-neutral-400">Real-time Overview of Leads, Bookings, Services & Management Modules</p>
        </div>

        {/* METRICS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-semibold uppercase tracking-wider">NEW LEADS</span>
              <Inbox className="w-5 h-5 text-[#e8272a]" />
            </div>
            <div className="font-heading text-5xl text-white">{newLeadsCount}</div>
            <span className="text-[10px] text-neutral-500 block">Total Inquiries: {leads.length}</span>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-semibold uppercase tracking-wider">PENDING BOOKINGS</span>
              <CalendarCheck className="w-5 h-5 text-amber-500" />
            </div>
            <div className="font-heading text-5xl text-white">{pendingBookingsCount}</div>
            <span className="text-[10px] text-neutral-500 block">Total Bookings: {bookings.length}</span>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-semibold uppercase tracking-wider">ACTIVE COACHES</span>
              <Dumbbell className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="font-heading text-5xl text-white">{trainers.length}</div>
            <span className="text-[10px] text-neutral-500 block">Roster Available</span>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-semibold uppercase tracking-wider">PRODUCTS CATALOG</span>
              <ShoppingBag className="w-5 h-5 text-sky-400" />
            </div>
            <div className="font-heading text-5xl text-white">{products.length}</div>
            <span className="text-[10px] text-neutral-500 block">Active Merchandise</span>
          </div>
        </div>

        {/* RECENT INQUIRIES & BOOKINGS TABLES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* RECENT LEADS */}
          <div className="glass-panel p-6 rounded-3xl border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-heading text-2xl text-white flex items-center gap-2">
                <Inbox className="w-5 h-5 text-[#e8272a]" /> RECENT INQUIRIES
              </h3>
              <Link to="/admin/leads" className="text-xs font-bold text-[#e8272a] hover:underline flex items-center gap-0.5">
                <span>VIEW ALL</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {leads.slice(0, 4).map((lead) => (
                <div key={lead.id} className="bg-neutral-900 p-3.5 rounded-2xl border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-heading text-lg text-white">{lead.fullName}</h4>
                    <p className="text-xs text-neutral-400">{lead.phone} • <span className="capitalize text-[#e8272a] font-semibold">{lead.inquiryType}</span></p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${lead.status === 'new' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT BOOKINGS */}
          <div className="glass-panel p-6 rounded-3xl border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-heading text-2xl text-white flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-amber-500" /> RECENT BOOKINGS
              </h3>
              <Link to="/admin/bookings" className="text-xs font-bold text-[#e8272a] hover:underline flex items-center gap-0.5">
                <span>VIEW ALL</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {bookings.slice(0, 4).map((bk) => (
                <div key={bk.id} className="bg-neutral-900 p-3.5 rounded-2xl border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-heading text-lg text-white">{bk.customerName}</h4>
                    <p className="text-xs text-neutral-400">{bk.preferredDate} ({bk.preferredTimeSlot})</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${bk.status === 'pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {bk.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
