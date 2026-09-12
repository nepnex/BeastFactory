import React, { useState } from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { dataService } from '../../services/dataService';
import { AdminLayout } from '../../layouts/AdminLayout';
import { ServiceItem } from '../../types';

export const AdminServicesPage: React.FC = () => {
  const { services } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<ServiceItem, 'id'>>({
    name: '',
    slug: '',
    shortDescription: '',
    longDescription: '',
    iconName: 'Dumbbell',
    coverImageUrl: '',
    features: ['High Standards'],
    startingPriceNpr: 2500,
    isFeatured: true,
    isActive: true,
    displayOrder: services.length + 1,
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      slug: `service-${Date.now()}`,
      shortDescription: '',
      longDescription: '',
      iconName: 'Dumbbell',
      coverImageUrl: '',
      features: ['High Standards'],
      startingPriceNpr: 2500,
      isFeatured: true,
      isActive: true,
      displayOrder: services.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (s: ServiceItem) => {
    setEditingId(s.id);
    setFormData({ ...s });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      dataService.updateService(editingId, formData);
    } else {
      dataService.addService(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete service?')) {
      dataService.deleteService(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl text-white">SERVICES & <span className="text-[#e8272a]">FACILITIES</span></h1>
            <p className="text-xs text-neutral-400">Manage all dynamic programs, highlights, and facility offerings</p>
          </div>
          <button onClick={openAddModal} className="px-6 py-3 rounded-full bg-[#e8272a] text-white font-heading text-base hover:bg-[#ff1e1e] flex items-center gap-2 shadow-lg shadow-red-500/20">
            <Plus className="w-4 h-4" /> <span>ADD SERVICE</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.id} className="glass-panel rounded-3xl p-6 border border-neutral-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="font-heading text-2xl text-white">{s.name}</h3>
                <p className="text-xs text-neutral-400 line-clamp-3">{s.shortDescription}</p>
                {s.startingPriceNpr && (
                  <span className="text-xs font-bold text-[#e8272a]">Starting NPR {s.startingPriceNpr}</span>
                )}
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${s.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-500'}`}>
                  {s.isActive ? 'Active' : 'Inactive'}
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
              <h3 className="font-heading text-3xl text-white mb-4">{editingId ? 'EDIT SERVICE' : 'ADD SERVICE'}</h3>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">SERVICE NAME *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                </div>
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">SHORT DESCRIPTION</label>
                  <textarea rows={2} value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white"></textarea>
                </div>
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">STARTING PRICE (NPR)</label>
                  <input type="number" value={formData.startingPriceNpr || 0} onChange={(e) => setFormData({ ...formData, startingPriceNpr: Number(e.target.value) })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                </div>

                <div className="pt-2 border-t border-neutral-800 space-y-3">
                  <span className="text-[10px] text-[#e8272a] font-bold uppercase tracking-widest block">SEO & CUSTOM URL (OPTIONAL)</span>
                  <div>
                    <label className="block text-neutral-400 font-semibold mb-1">CUSTOM SLUG</label>
                    <input type="text" placeholder="e.g. personal-training" value={formData.slug || ''} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-neutral-400 font-semibold mb-1">SEO TITLE</label>
                    <input type="text" placeholder="Custom Page Title for Search Engines" value={formData.seoTitle || ''} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-neutral-400 font-semibold mb-1">SEO DESCRIPTION</label>
                    <input type="text" placeholder="Meta description for Search Engines..." value={formData.seoDescription || ''} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-white" />
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold hover:bg-[#ff1e1e]">
                  SAVE SERVICE
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
