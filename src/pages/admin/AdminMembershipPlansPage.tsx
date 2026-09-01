import React, { useState } from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { dataService } from '../../services/dataService';
import { AdminLayout } from '../../layouts/AdminLayout';
import { MembershipPlan } from '../../types';

export const AdminMembershipPlansPage: React.FC = () => {
  const { membershipPlans } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<MembershipPlan, 'id'>>({
    name: '',
    description: '',
    priceMonthlyNpr: 2500,
    priceYearlyNpr: 24000,
    features: ['Access to Gym'],
    badgeText: 'POPULAR',
    isPopular: false,
    isActive: true,
    displayOrder: membershipPlans.length + 1,
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      priceMonthlyNpr: 2500,
      priceYearlyNpr: 24000,
      features: ['Access to Gym'],
      badgeText: 'POPULAR',
      isPopular: false,
      isActive: true,
      displayOrder: membershipPlans.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (p: MembershipPlan) => {
    setEditingId(p.id);
    setFormData({ ...p });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      dataService.updateMembershipPlan(editingId, formData);
    } else {
      dataService.addMembershipPlan(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete membership plan?')) {
      dataService.deleteMembershipPlan(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl text-white">MEMBERSHIP <span className="text-[#e8272a]">PLANS</span></h1>
            <p className="text-xs text-neutral-400">Manage gym subscription pricing, monthly & yearly billing rates</p>
          </div>
          <button onClick={openAddModal} className="px-6 py-3 rounded-full bg-[#e8272a] text-white font-heading text-base hover:bg-[#ff1e1e] flex items-center gap-2 shadow-lg shadow-red-500/20">
            <Plus className="w-4 h-4" /> <span>ADD PLAN</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {membershipPlans.map((p) => (
            <div key={p.id} className="glass-panel rounded-3xl p-6 border border-neutral-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {p.isPopular && <span className="px-3 py-1 rounded-full bg-[#e8272a] text-white text-[10px] font-bold uppercase">{p.badgeText || 'POPULAR'}</span>}
                <h3 className="font-heading text-3xl text-white">{p.name}</h3>
                <p className="text-xs text-neutral-400">{p.description}</p>
                <div className="font-heading text-4xl text-white">NPR {p.priceMonthlyNpr.toLocaleString()} <span className="text-xs font-sans text-neutral-400">/ mo</span></div>
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
              <h3 className="font-heading text-3xl text-white mb-4">{editingId ? 'EDIT PLAN' : 'ADD PLAN'}</h3>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">PLAN NAME *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 font-semibold mb-1">MONTHLY PRICE (NPR)</label>
                    <input type="number" value={formData.priceMonthlyNpr} onChange={(e) => setFormData({ ...formData, priceMonthlyNpr: Number(e.target.value) })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                  </div>
                  <div>
                    <label className="block text-neutral-400 font-semibold mb-1">YEARLY PRICE (NPR)</label>
                    <input type="number" value={formData.priceYearlyNpr || 0} onChange={(e) => setFormData({ ...formData, priceYearlyNpr: Number(e.target.value) })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">DESCRIPTION</label>
                  <textarea rows={2} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white"></textarea>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.isPopular} onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })} id="popularCheck" />
                  <label htmlFor="popularCheck" className="text-neutral-300 font-semibold">Featured / Highlighted Plan</label>
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold hover:bg-[#ff1e1e]">
                  SAVE MEMBERSHIP PLAN
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
