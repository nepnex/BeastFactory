import React, { useState } from 'react';
import { Waves, Plus, Trash2, Edit3 } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { dataService } from '../../services/dataService';
import { AdminLayout } from '../../layouts/AdminLayout';
import { SpaService } from '../../types';

export const AdminSpaPage: React.FC = () => {
  const { spaServices } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<SpaService, 'id'>>({
    title: '',
    description: '',
    durationMinutes: 45,
    priceNpr: 1000,
    imageUrl: '',
    isAvailable: true,
    displayOrder: spaServices.length + 1,
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      durationMinutes: 45,
      priceNpr: 1000,
      imageUrl: '',
      isAvailable: true,
      displayOrder: spaServices.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (s: SpaService) => {
    setEditingId(s.id);
    setFormData({ ...s });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      dataService.updateSpaService(editingId, formData);
    } else {
      dataService.addSpaService(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete spa treatment?')) {
      dataService.deleteSpaService(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl text-white">SPA & <span className="text-[#e8272a]">HYDROTHERAPY SERVICES</span></h1>
            <p className="text-xs text-neutral-400">Manage Sauna, Steam, Jacuzzi, and Cupping treatment packages</p>
          </div>
          <button onClick={openAddModal} className="px-6 py-3 rounded-full bg-[#e8272a] text-white font-heading text-base hover:bg-[#ff1e1e] flex items-center gap-2 shadow-lg shadow-red-500/20">
            <Plus className="w-4 h-4" /> <span>ADD TREATMENT</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spaServices.map((s) => (
            <div key={s.id} className="glass-panel rounded-3xl p-6 border border-neutral-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[10px] text-sky-400 font-bold uppercase">{s.durationMinutes} Mins Session</span>
                <h3 className="font-heading text-3xl text-white">{s.title}</h3>
                <p className="text-xs text-neutral-400">{s.description}</p>
                <div className="font-heading text-4xl text-white">NPR {s.priceNpr.toLocaleString()}</div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${s.isAvailable ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-500'}`}>
                  {s.isAvailable ? 'Available' : 'Unavailable'}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(s)} className="p-2 text-neutral-400 hover:text-white"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(s.id)} className="p-2 text-neutral-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="glass-panel max-w-lg w-full p-8 rounded-3xl border border-neutral-800 relative">
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-white font-bold">✕</button>
              <h3 className="font-heading text-3xl text-white mb-4">{editingId ? 'EDIT TREATMENT' : 'ADD TREATMENT'}</h3>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">TREATMENT TITLE *</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 font-semibold mb-1">DURATION (MINUTES)</label>
                    <input type="number" value={formData.durationMinutes} onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                  </div>
                  <div>
                    <label className="block text-neutral-400 font-semibold mb-1">PRICE (NPR)</label>
                    <input type="number" value={formData.priceNpr} onChange={(e) => setFormData({ ...formData, priceNpr: Number(e.target.value) })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">DESCRIPTION</label>
                  <textarea rows={2} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white"></textarea>
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold hover:bg-[#ff1e1e]">
                  SAVE SPA TREATMENT
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
