import React, { useState } from 'react';
import { Trophy, Plus, Trash2, Edit3, ShieldCheck } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { dataService } from '../../services/dataService';
import { AdminLayout } from '../../layouts/AdminLayout';
import { TransformationStory } from '../../types';

export const AdminTransformationsPage: React.FC = () => {
  const { transformations } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<TransformationStory, 'id'>>({
    clientName: '',
    beforePhotoUrl: '/src/assets/images/trainers/trainer1.webp',
    afterPhotoUrl: '/src/assets/images/trainers/trainer2.webp',
    startingWeightKg: 90,
    finalWeightKg: 75,
    durationWeeks: 12,
    programName: 'Beast Fat Shred',
    storyText: '',
    testimonialQuote: '',
    hasClientConsent: true,
    isFeatured: true,
    displayOrder: transformations.length + 1,
    isPublished: true,
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      clientName: '',
      beforePhotoUrl: '/src/assets/images/trainers/trainer1.webp',
      afterPhotoUrl: '/src/assets/images/trainers/trainer2.webp',
      startingWeightKg: 90,
      finalWeightKg: 75,
      durationWeeks: 12,
      programName: 'Beast Fat Shred',
      storyText: '',
      testimonialQuote: '',
      hasClientConsent: true,
      isFeatured: true,
      displayOrder: transformations.length + 1,
      isPublished: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (t: TransformationStory) => {
    setEditingId(t.id);
    setFormData({ ...t });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hasClientConsent) {
      alert('Client consent verification is required before publishing transformation photos.');
      return;
    }
    if (editingId) {
      dataService.updateTransformation(editingId, formData);
    } else {
      dataService.addTransformation(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete transformation story?')) {
      dataService.deleteTransformation(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl text-white">MEMBER <span className="text-[#e8272a]">TRANSFORMATIONS</span></h1>
            <p className="text-xs text-neutral-400">Manage verified Before & After transformation stories and consent status</p>
          </div>
          <button onClick={openAddModal} className="px-6 py-3 rounded-full bg-[#e8272a] text-white font-heading text-base hover:bg-[#ff1e1e] flex items-center gap-2 shadow-lg shadow-red-500/20">
            <Plus className="w-4 h-4" /> <span>ADD TRANSFORMATION</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transformations.map((t) => (
            <div key={t.id} className="glass-panel rounded-3xl p-6 border border-neutral-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-2xl text-white">{t.clientName}</h3>
                  <span className="text-[10px] font-bold text-[#e8272a] uppercase">{t.durationWeeks || 12} Weeks</span>
                </div>
                <p className="text-xs text-neutral-300 line-clamp-2">{t.storyText}</p>
                <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Client Consent Verified</span>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${t.isPublished ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-500'}`}>
                  {t.isPublished ? 'Published' : 'Draft'}
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
              <h3 className="font-heading text-3xl text-white mb-4">{editingId ? 'EDIT STORY' : 'ADD STORY'}</h3>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">CLIENT NAME *</label>
                  <input type="text" required value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 font-semibold mb-1">BEFORE WEIGHT (KG)</label>
                    <input type="number" value={formData.startingWeightKg || 0} onChange={(e) => setFormData({ ...formData, startingWeightKg: Number(e.target.value) })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                  </div>
                  <div>
                    <label className="block text-neutral-400 font-semibold mb-1">AFTER WEIGHT (KG)</label>
                    <input type="number" value={formData.finalWeightKg || 0} onChange={(e) => setFormData({ ...formData, finalWeightKg: Number(e.target.value) })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">TRANSFORMATION STORY</label>
                  <textarea rows={3} value={formData.storyText} onChange={(e) => setFormData({ ...formData, storyText: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white"></textarea>
                </div>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2">
                  <input type="checkbox" checked={formData.hasClientConsent} onChange={(e) => setFormData({ ...formData, hasClientConsent: e.target.checked })} id="consentCheck" />
                  <label htmlFor="consentCheck" className="text-emerald-300 font-bold text-xs">Verify written client consent obtained for photo publication</label>
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold hover:bg-[#ff1e1e]">
                  SAVE STORY
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
