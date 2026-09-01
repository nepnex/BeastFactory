import React, { useState } from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { dataService } from '../../services/dataService';
import { AdminLayout } from '../../layouts/AdminLayout';
import { Founder } from '../../types';

export const AdminFoundersPage: React.FC = () => {
  const { founders } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<Founder, 'id'>>({
    name: '',
    position: '',
    photoUrl: '',
    shortBio: '',
    roleDescription: '',
    expertise: ['Operations', 'Fitness'],
    displayOrder: founders.length + 1,
    isActive: true,
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      position: '',
      photoUrl: '',
      shortBio: '',
      roleDescription: '',
      expertise: ['Operations', 'Fitness'],
      displayOrder: founders.length + 1,
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (f: Founder) => {
    setEditingId(f.id);
    setFormData({ ...f });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      dataService.updateFounder(editingId, formData);
    } else {
      dataService.addFounder(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this founder profile?')) {
      dataService.deleteFounder(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl text-white">FOUNDERS / <span className="text-[#e8272a]">LEADERSHIP</span></h1>
            <p className="text-xs text-neutral-400">Manage profiles, bios, and roles for the 4 Beast Factory founders</p>
          </div>
          <button onClick={openAddModal} className="px-6 py-3 rounded-full bg-[#e8272a] text-white font-heading text-base hover:bg-[#ff1e1e] flex items-center gap-2 shadow-lg shadow-red-500/20">
            <Plus className="w-4 h-4" /> <span>ADD FOUNDER</span>
          </button>
        </div>

        {/* FOUNDERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {founders.map((f) => (
            <div key={f.id} className="glass-panel rounded-3xl p-5 border border-neutral-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="h-44 rounded-2xl overflow-hidden bg-neutral-900">
                  <img src={f.photoUrl || '/src/assets/images/logo.png'} alt={f.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] text-[#e8272a] font-bold uppercase">{f.position}</span>
                  <h3 className="font-heading text-2xl text-white">{f.name}</h3>
                  <p className="text-neutral-400 text-xs mt-1 line-clamp-3">{f.shortBio}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${f.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-500'}`}>
                  {f.isActive ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(f)} className="p-2 text-neutral-400 hover:text-white"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(f.id)} className="p-2 text-neutral-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="glass-panel max-w-lg w-full p-8 rounded-3xl border border-neutral-800 relative">
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-white font-bold">✕</button>
              <h3 className="font-heading text-3xl text-white mb-4">{editingId ? 'EDIT FOUNDER' : 'ADD NEW FOUNDER'}</h3>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">FULL NAME *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                </div>
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">POSITION / TITLE *</label>
                  <input type="text" required value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                </div>
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">PHOTO URL / IMAGE</label>
                  <input type="text" placeholder="/src/assets/images/trainers/trainer1.webp" value={formData.photoUrl} onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                </div>
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">SHORT BIOGRAPHY</label>
                  <textarea rows={3} value={formData.shortBio} onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white"></textarea>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} id="activeCheck" />
                  <label htmlFor="activeCheck" className="text-neutral-300 font-semibold">Active Status</label>
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold hover:bg-[#ff1e1e]">
                  SAVE FOUNDER PROFILE
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
