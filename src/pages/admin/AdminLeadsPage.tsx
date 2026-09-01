import React, { useState } from 'react';
import { Inbox, CheckCircle, Trash2, Filter } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { dataService } from '../../services/dataService';
import { AdminLayout } from '../../layouts/AdminLayout';
import { LeadStatus } from '../../types';

export const AdminLeadsPage: React.FC = () => {
  const { leads } = useData();
  const [filter, setFilter] = useState<string>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');

  const filteredLeads = leads.filter((l) => (filter === 'all' ? true : l.status === filter));

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    dataService.updateLeadStatus(id, newStatus);
  };

  const handleSaveNotes = (id: string) => {
    dataService.updateLeadStatus(id, leads.find((l) => l.id === id)?.status || 'new', notesText);
    setEditingNotesId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      dataService.deleteLead(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl text-white">LEADS & <span className="text-[#e8272a]">INQUIRIES</span></h1>
            <p className="text-xs text-neutral-400">Manage all prospective member applications, trial requests & contact inquiries</p>
          </div>

          <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-2xl border border-neutral-800">
            <Filter className="w-4 h-4 text-neutral-400 ml-2" />
            {['all', 'new', 'contacted', 'interested', 'converted', 'closed'].map((st) => (
              <button key={st} onClick={() => setFilter(st)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${filter === st ? 'bg-[#e8272a] text-white font-bold' : 'text-neutral-400 hover:text-white'}`}>
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* LEADS TABLE */}
        <div className="glass-panel rounded-3xl border border-neutral-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-[10px] text-neutral-400 uppercase tracking-widest bg-neutral-900/50">
                  <th className="p-4">NAME & PHONE</th>
                  <th className="p-4">TYPE</th>
                  <th className="p-4">MESSAGE</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4">ADMIN NOTES</th>
                  <th className="p-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-xs">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-neutral-900/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{lead.fullName}</div>
                      <div className="text-neutral-400 font-mono text-[11px]">{lead.phone}</div>
                      {lead.email && <div className="text-neutral-500 text-[10px]">{lead.email}</div>}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-neutral-900 border border-neutral-800 text-[#e8272a]">
                        {lead.inquiryType}
                      </span>
                    </td>
                    <td className="p-4 max-w-xs text-neutral-300">
                      <p className="line-clamp-2">{lead.message || 'No details provided.'}</p>
                      <span className="text-[9px] text-neutral-500 block mt-1">{new Date(lead.createdAt).toLocaleString()}</span>
                    </td>
                    <td className="p-4">
                      <select value={lead.status} onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)} className="bg-neutral-900 border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#e8272a] font-semibold">
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="interested">Interested</option>
                        <option value="converted">Converted</option>
                        <option value="not_interested">Not Interested</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-4">
                      {editingNotesId === lead.id ? (
                        <div className="flex gap-2">
                          <input type="text" value={notesText} onChange={(e) => setNotesText(e.target.value)} className="bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1 text-xs text-white" />
                          <button onClick={() => handleSaveNotes(lead.id)} className="text-emerald-400 font-bold text-xs">Save</button>
                        </div>
                      ) : (
                        <div onClick={() => { setEditingNotesId(lead.id); setNotesText(lead.adminNotes || ''); }} className="cursor-pointer text-neutral-400 hover:text-white italic text-[11px]">
                          {lead.adminNotes || '+ Click to add note'}
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(lead.id)} className="p-2 text-neutral-400 hover:text-red-400">
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
