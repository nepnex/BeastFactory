import React, { useState } from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { dataService } from '../../services/dataService';
import { AdminLayout } from '../../layouts/AdminLayout';
import { Trainer } from '../../types';

import { ImageUploader } from '../../components/admin/ImageUploader';

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
            <h1 className="font-heading text-4xl text-slate-900">COACHES & <span className="text-[#e8272a]">TRAINERS</span></h1>
            <p className="text-xs text-slate-500 font-medium">Manage certified trainers, bios, specializations, and session pricing</p>
          </div>
          <button onClick={openAddModal} className="px-6 py-3 rounded-full bg-[#e8272a] text-white font-heading text-base hover:bg-[#ff1e1e] flex items-center gap-2 shadow-lg shadow-red-500/20">
            <Plus className="w-4 h-4" /> <span>ADD COACH</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainers.map((t) => (
            <div key={t.id} className="glass-panel rounded-3xl p-6 border border-slate-200 bg-white flex flex-col justify-between space-y-4 shadow-sm">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img src={t.photoUrl || '/src/assets/images/logo.png'} alt={t.fullName} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-[#e8272a] font-bold uppercase">{t.title}</span>
                  <h3 className="font-heading text-2xl text-slate-900">{t.fullName}</h3>
                  <p className="text-xs text-slate-500 font-semibold">{t.yearsExperience}+ Years Exp • NPR {t.sessionPriceNpr || 0}/session</p>
                  <p className="text-slate-600 text-xs line-clamp-2 pt-1">{t.shortBio}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${t.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {t.isAvailable ? 'Available' : 'Unavailable'}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(t)} className="p-2 text-slate-400 hover:text-slate-700"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-lg w-full p-8 rounded-3xl border border-slate-200 relative shadow-2xl">
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-bold">✕</button>
              <h3 className="font-heading text-3xl text-slate-900 mb-4">{editingId ? 'EDIT COACH' : 'ADD NEW COACH'}</h3>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">FULL NAME *</label>
                  <input type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white focus:border-[#e8272a] outline-none" />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">TITLE / ROLE *</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white focus:border-[#e8272a] outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">YEARS EXPERIENCE</label>
                    <input type="number" value={formData.yearsExperience} onChange={(e) => setFormData({ ...formData, yearsExperience: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white focus:border-[#e8272a] outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">SESSION PRICE (NPR)</label>
                    <input type="number" value={formData.sessionPriceNpr || 0} onChange={(e) => setFormData({ ...formData, sessionPriceNpr: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white focus:border-[#e8272a] outline-none" />
                  </div>
                </div>
                <ImageUploader
                  label="TRAINER PHOTO"
                  value={formData.photoUrl}
                  onChange={(url) => setFormData({ ...formData, photoUrl: url })}
                />
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">SHORT BIO</label>
                  <textarea rows={2} value={formData.shortBio} onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white focus:border-[#e8272a] outline-none"></textarea>
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <label className="block text-slate-600 font-semibold mb-2">SOCIAL & CONTACT LINKS</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Facebook URL" value={formData.socials?.facebook || ''} onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, facebook: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs focus:bg-white" />
                    <input type="text" placeholder="Instagram URL" value={formData.socials?.instagram || ''} onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, instagram: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs focus:bg-white" />
                    <input type="text" placeholder="TikTok URL" value={formData.socials?.tiktok || ''} onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, tiktok: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs focus:bg-white" />
                    <input type="text" placeholder="WhatsApp Number" value={formData.socials?.whatsapp || ''} onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, whatsapp: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs focus:bg-white" />
                  </div>
                  <input type="email" placeholder="Gmail / Email Address" value={formData.socials?.email || ''} onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, email: e.target.value } })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs mt-3 focus:bg-white" />
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <span className="text-[10px] text-[#e8272a] font-bold uppercase tracking-widest block">SEO & CUSTOM URL (OPTIONAL)</span>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">CUSTOM SLUG</label>
                    <input type="text" placeholder="e.g. coach-bikram" value={formData.slug || ''} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">SEO TITLE</label>
                    <input type="text" placeholder="Custom Page Title for Search Engines" value={formData.seoTitle || ''} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">SEO DESCRIPTION</label>
                    <input type="text" placeholder="Meta description for Search Engines..." value={formData.seoDescription || ''} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 focus:bg-white" />
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold hover:bg-[#ff1e1e] shadow-lg shadow-red-500/20">
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
