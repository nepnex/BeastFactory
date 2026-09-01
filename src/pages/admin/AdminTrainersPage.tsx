import React, { useState } from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { dataService } from '../../services/dataService';
import { AdminLayout } from '../../layouts/AdminLayout';
import { Trainer } from '../../types';

export const AdminTrainersPage: React.FC = () => {
  const { trainers } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<Trainer, 'id'>>({
    fullName: '',
    photoUrl: '',
    title: '',
    shortBio: '',
    fullBio: '',
    yearsExperience: 5,
    specializations: ['Strength', 'Fat Loss'],
    certifications: ['Certified Personal Trainer'],
    languages: ['Nepali', 'English'],
    sessionPriceNpr: 1500,
    isAvailable: true,
    isFeatured: true,
    displayOrder: trainers.length + 1,
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      fullName: '',
      photoUrl: '',
      title: '',
      shortBio: '',
      fullBio: '',
      yearsExperience: 5,
      specializations: ['Strength', 'Fat Loss'],
      certifications: ['Certified Personal Trainer'],
      languages: ['Nepali', 'English'],
      sessionPriceNpr: 1500,
      isAvailable: true,
      isFeatured: true,
      displayOrder: trainers.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (t: Trainer) => {
    setEditingId(t.id);
    setFormData({ ...t });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      dataService.updateTrainer(editingId, formData);
    } else {
      dataService.addTrainer(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete trainer profile?')) {
      dataService.deleteTrainer(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl text-white">COACHES & <span className="text-[#e8272a]">TRAINERS</span></h1>
            <p className="text-xs text-neutral-400">Manage certified trainers, bios, specializations, and session pricing</p>
          </div>
          <button onClick={openAddModal} className="px-6 py-3 rounded-full bg-[#e8272a] text-white font-heading text-base hover:bg-[#ff1e1e] flex items-center gap-2 shadow-lg shadow-red-500/20">
            <Plus className="w-4 h-4" /> <span>ADD COACH</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainers.map((t) => (
            <div key={t.id} className="glass-panel rounded-3xl p-6 border border-neutral-800 flex flex-col justify-between space-y-4">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-neutral-900 shrink-0">
                  <img src={t.photoUrl || '/src/assets/images/logo.png'} alt={t.fullName} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-[#e8272a] font-bold uppercase">{t.title}</span>
                  <h3 className="font-heading text-2xl text-white">{t.fullName}</h3>
                  <p className="text-xs text-neutral-400 font-semibold">{t.yearsExperience}+ Years Exp • NPR {t.sessionPriceNpr || 0}/session</p>
                  <p className="text-neutral-300 text-xs line-clamp-2 pt-1">{t.shortBio}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${t.isAvailable ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-500'}`}>
                  {t.isAvailable ? 'Available' : 'Unavailable'}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(t)} className="p-2 text-neutral-400 hover:text-white"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-2 text-neutral-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="glass-panel max-w-lg w-full p-8 rounded-3xl border border-neutral-800 relative">
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-white font-bold">✕</button>
              <h3 className="font-heading text-3xl text-white mb-4">{editingId ? 'EDIT COACH' : 'ADD NEW COACH'}</h3>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">FULL NAME *</label>
                  <input type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                </div>
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">TITLE / ROLE *</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 font-semibold mb-1">YEARS EXPERIENCE</label>
                    <input type="number" value={formData.yearsExperience} onChange={(e) => setFormData({ ...formData, yearsExperience: Number(e.target.value) })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                  </div>
                  <div>
                    <label className="block text-neutral-400 font-semibold mb-1">SESSION PRICE (NPR)</label>
                    <input type="number" value={formData.sessionPriceNpr || 0} onChange={(e) => setFormData({ ...formData, sessionPriceNpr: Number(e.target.value) })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">PHOTO URL</label>
                  <input type="text" value={formData.photoUrl} onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                </div>
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">SHORT BIO</label>
                  <textarea rows={2} value={formData.shortBio} onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white"></textarea>
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold hover:bg-[#ff1e1e]">
                  SAVE COACH PROFILE
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
