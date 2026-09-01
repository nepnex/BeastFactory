import React, { useState } from 'react';
import { CalendarCheck, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { dataService } from '../../services/dataService';
import { AdminLayout } from '../../layouts/AdminLayout';
import { BookingStatus } from '../../types';

export const AdminBookingsPage: React.FC = () => {
  const { bookings } = useData();
  const [filter, setFilter] = useState<string>('all');

  const filteredBookings = bookings.filter((b) => (filter === 'all' ? true : b.status === filter));

  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    dataService.updateBookingStatus(id, newStatus);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      dataService.deleteBooking(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl text-white">BOOKINGS & <span className="text-[#e8272a]">TRIALS</span></h1>
            <p className="text-xs text-neutral-400">Manage all Spa sessions, Trainer appointments & Free Trial requests</p>
          </div>

          <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-2xl border border-neutral-800">
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
              <button key={st} onClick={() => setFilter(st)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${filter === st ? 'bg-[#e8272a] text-white font-bold' : 'text-neutral-400 hover:text-white'}`}>
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* BOOKINGS TABLE */}
        <div className="glass-panel rounded-3xl border border-neutral-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-[10px] text-neutral-400 uppercase tracking-widest bg-neutral-900/50">
                  <th className="p-4">CUSTOMER</th>
                  <th className="p-4">TYPE & DETAILS</th>
                  <th className="p-4">DATE & SLOT</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-xs">
                {filteredBookings.map((bk) => (
                  <tr key={bk.id} className="hover:bg-neutral-900/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{bk.customerName}</div>
                      <div className="text-neutral-400 font-mono text-[11px]">{bk.customerPhone}</div>
                      {bk.customerEmail && <div className="text-neutral-500 text-[10px]">{bk.customerEmail}</div>}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-neutral-900 border border-neutral-800 text-amber-500">
                        {bk.bookingType}
                      </span>
                      <p className="text-[11px] text-neutral-400 mt-1">{bk.adminNotes || 'General session'}</p>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white">{bk.preferredDate}</div>
                      <div className="text-neutral-400 text-[11px]">{bk.preferredTimeSlot}</div>
                    </td>
                    <td className="p-4">
                      <select value={bk.status} onChange={(e) => handleStatusChange(bk.id, e.target.value as BookingStatus)} className="bg-neutral-900 border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#e8272a] font-semibold">
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(bk.id)} className="p-2 text-neutral-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
