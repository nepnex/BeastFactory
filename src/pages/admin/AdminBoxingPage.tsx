import React, { useState } from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { dataService } from '../../services/dataService';
import { AdminLayout } from '../../layouts/AdminLayout';
import { BoxingPlan } from '../../types';

export const AdminBoxingPage: React.FC = () => {
  const { boxingPlans } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<BoxingPlan, 'id'>>({
    programName: '',
    description: '',
    durationText: '1 Month',
    priceNpr: 3500,
    scheduleDetails: 'Morning & Evening Batches',
    features: ['Ring & Bag Access', 'Pad Work'],
    isActive: true,
    displayOrder: boxingPlans.length + 1,
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      programName: '',
      description: '',
      durationText: '1 Month',
      priceNpr: 3500,
      scheduleDetails: 'Morning & Evening Batches',
      features: ['Ring & Bag Access', 'Pad Work'],
      isActive: true,
      displayOrder: boxingPlans.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (p: BoxingPlan) => {
    setEditingId(p.id);
    setFormData({ ...p });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      dataService.updateBoxingPlan(editingId, formData);
    } else {
      dataService.addBoxingPlan(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete boxing plan?')) {
      dataService.deleteBoxingPlan(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl text-white">BOXING & <span className="text-[#e8272a]">COMBAT PLANS</span></h1>
            <p className="text-xs text-neutral-400">Manage independent combat sports pricing, batches, and programs</p>
          </div>
          <button onClick={openAddModal} className="px-6 py-3 rounded-full bg-[#e8272a] text-white font-heading text-base hover:bg-[#ff1e1e] flex items-center gap-2 shadow-lg shadow-red-500/20">
            <Plus className="w-4 h-4" /> <span>ADD BOXING PLAN</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {boxingPlans.map((p) => (
            <div key={p.id} className="glass-panel rounded-3xl p-6 border border-neutral-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[10px] text-[#e8272a] font-bold uppercase">{p.durationText}</span>
                <h3 className="font-heading text-3xl text-white">{p.programName}</h3>
                <p className="text-xs text-neutral-400">{p.description}</p>
                <div className="font-heading text-4xl text-white">NPR {p.priceNpr.toLocaleString()}</div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${p.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-500'}`}>
                  {p.isActive ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(p)} className="p-2 text-neutral-400 hover:text-white"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-2 text-neutral-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="glass-panel max-w-lg w-full p-8 rounded-3xl border border-neutral-800 relative">
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-white font-bold">✕</button>
              <h3 className="font-heading text-3xl text-white mb-4">{editingId ? 'EDIT BOXING PLAN' : 'ADD BOXING PLAN'}</h3>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">PROGRAM NAME *</label>
                  <input type="text" required value={formData.programName} onChange={(e) => setFormData({ ...formData, programName: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 font-semibold mb-1">DURATION TEXT</label>
                    <input type="text" value={formData.durationText} onChange={(e) => setFormData({ ...formData, durationText: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
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
                  SAVE BOXING PLAN
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
