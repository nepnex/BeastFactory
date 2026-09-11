import React from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  CalendarCheck,
  Dumbbell,
  Sparkles,
  Layers,
  ShoppingBag,
  Plus,
  ArrowUpRight,
  UserPlus,
  PackagePlus,
  CalendarPlus
} from 'lucide-react';
import { useData } from '../../hooks/useData';
import { AdminLayout } from '../../layouts/AdminLayout';

export const AdminDashboardOverview: React.FC = () => {
  const { leads, bookings, trainers, services, membershipPlans } = useData();

  const todayStr = new Date().toISOString().split('T')[0];

  const totalInquiries = leads ? leads.length : 0;
  const pendingInquiries = leads ? leads.filter((l) => l.status === 'new').length : 0;
  const todaysBookings = bookings ? bookings.filter((b) => b.preferredDate === todayStr || b.status === 'pending').length : 0;
  const totalTrainers = trainers ? trainers.length : 0;
  const activeServices = services ? services.filter((s) => s.isActive).length : 0;
  const activeMemberships = membershipPlans ? membershipPlans.filter((m) => m.isActive).length : 0;

  return (
    <AdminLayout>
      <div className="space-[#1e1e1e] space-y-8">
        {/* HEADER METRICS */}
        <div>
          <h1 className="font-heading text-4xl text-white">BEAST FACTORY <span className="text-[#e8272a]">ADMIN</span></h1>
          <p className="text-xs text-neutral-400">Real-time Operations Dashboard & Database Management Gateway</p>
        </div>

        {/* 6 TOP KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="bg-[#0a0a0a] p-5 rounded-2xl border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">TOTAL INQUIRIES</span>
              <Inbox className="w-4 h-4 text-[#e8272a]" />
            </div>
            <div className="font-heading text-4xl text-white">{totalInquiries}</div>
          </div>

          <div className="bg-[#0a0a0a] p-5 rounded-2xl border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">PENDING INQUIRIES</span>
              <Inbox className="w-4 h-4 text-amber-500" />
            </div>
            <div className="font-heading text-4xl text-white">{pendingInquiries}</div>
          </div>

          <div className="bg-[#0a0a0a] p-5 rounded-2xl border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">TODAY'S BOOKINGS</span>
              <CalendarCheck className="w-4 h-4 text-sky-400" />
            </div>
            <div className="font-heading text-4xl text-white">{todaysBookings}</div>
          </div>

          <div className="bg-[#0a0a0a] p-5 rounded-2xl border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">TOTAL TRAINERS</span>
              <Dumbbell className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-heading text-4xl text-white">{totalTrainers}</div>
          </div>

          <div className="bg-[#0a0a0a] p-5 rounded-2xl border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">ACTIVE SERVICES</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <div className="font-heading text-4xl text-white">{activeServices}</div>
          </div>

          <div className="bg-[#0a0a0a] p-5 rounded-2xl border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">MEMBERSHIPS</span>
              <Layers className="w-4 h-4 text-rose-400" />
            </div>
            <div className="font-heading text-4xl text-white">{activeMemberships}</div>
          </div>
        </div>

        {/* QUICK ACTIONS ROW */}
        <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-neutral-800 space-y-4">
          <h3 className="font-heading text-xl text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#e8272a]" /> QUICK ACTIONS
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <Link to="/admin/trainers" className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-white font-medium transition-colors">
              <UserPlus className="w-4 h-4 text-[#e8272a]" />
              <span>Add Trainer</span>
            </Link>
            <Link to="/admin/services" className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-white font-medium transition-colors">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Add Service</span>
            </Link>
            <Link to="/admin/products" className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-white font-medium transition-colors">
              <PackagePlus className="w-4 h-4 text-sky-400" />
              <span>Add Product</span>
            </Link>
            <Link to="/admin/transformations" className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-white font-medium transition-colors">
              <CalendarPlus className="w-4 h-4 text-emerald-400" />
              <span>Transformation</span>
            </Link>
            <Link to="/admin/bookings" className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-white font-medium transition-colors">
              <CalendarCheck className="w-4 h-4 text-amber-400" />
              <span>View Bookings</span>
            </Link>
            <Link to="/admin/inquiries" className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-white font-medium transition-colors">
              <Inbox className="w-4 h-4 text-rose-400" />
              <span>View Inquiries</span>
            </Link>
          </div>
        </div>

        {/* RECENT INQUIRIES & BOOKINGS TABLES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* RECENT INQUIRIES */}
          <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-heading text-2xl text-white flex items-center gap-2">
                <Inbox className="w-5 h-5 text-[#e8272a]" /> RECENT INQUIRIES
              </h3>
              <Link to="/admin/inquiries" className="text-xs font-bold text-[#e8272a] hover:underline flex items-center gap-0.5">
                <span>VIEW ALL</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {leads.slice(0, 5).map((lead) => (
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
          <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-neutral-800 space-y-4">
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
              {bookings.slice(0, 5).map((bk) => (
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
