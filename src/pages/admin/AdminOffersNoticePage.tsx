import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Megaphone, Sparkles, Tag, Layers, Check } from 'lucide-react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { useData } from '../../hooks/useData';
import { dataService } from '../../services/dataService';
import { NoticeOffer } from '../../types';
import { ImageUploader } from '../../components/admin/ImageUploader';

export const AdminOffersNoticePage: React.FC = () => {
  const { settings } = useData();
  const offersList: NoticeOffer[] = settings.activeOffers || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<NoticeOffer, 'id'>>({
    tag: 'NEW OFFER',
    title: '',
    description: '',
    imageUrl: '',
    actionText: 'LEARN MORE',
    actionUrl: '/services',
    isHighPriority: true,
  });

  const openAddModal = (defaultTag: string = 'NEW OFFER') => {
    setEditingId(null);
    setFormData({
      tag: defaultTag,
      title: '',
      description: '',
      imageUrl: '',
      actionText: 'LEARN MORE',
      actionUrl: '/services',
      isHighPriority: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (item: NoticeOffer) => {
    setEditingId(item.id);
    setFormData({
      tag: item.tag,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl || '',
      actionText: item.actionText || 'LEARN MORE',
      actionUrl: item.actionUrl || '/services',
      isHighPriority: item.isHighPriority ?? true,
    });
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this offer/notice?')) {
      const updatedOffers = offersList.filter((o) => o.id !== id);
      dataService.saveSettings({
        ...settings,
        activeOffers: updatedOffers,
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedOffers: NoticeOffer[] = [];

    if (editingId) {
      updatedOffers = offersList.map((o) => (o.id === editingId ? { ...formData, id: editingId } : o));
    } else {
      const newOffer: NoticeOffer = { ...formData, id: `offer_${Date.now()}` };
      updatedOffers = [newOffer, ...offersList];
    }

    dataService.saveSettings({
      ...settings,
      activeOffers: updatedOffers,
    });

    setModalOpen(false);
  };

  const offersOnly = offersList.filter((item) => item.tag?.toUpperCase().includes('OFFER') || item.isHighPriority);
  const noticesOnly = offersList.filter((item) => !item.tag?.toUpperCase().includes('OFFER') && !item.isHighPriority);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* TOP HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl text-slate-900 flex items-center gap-3">
              OFFERS & <span className="text-[#e8272a]">ANNOUNCEMENTS</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Manage promotional offer banners, notices, descriptions, photos & action links live on the homepage.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openAddModal('NEW OFFER')}
              className="px-4 py-2.5 rounded-xl bg-[#e8272a] text-white font-heading text-xs font-bold hover:bg-red-700 transition-all flex items-center gap-2 shadow-md shadow-red-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>ADD NEW OFFER</span>
            </button>
            <button
              onClick={() => openAddModal('NOTICE')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-heading text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <Megaphone className="w-4 h-4" />
              <span>ADD NOTICE</span>
            </button>
          </div>
        </div>

        {/* SECTION 1: OFFERS SUBSECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#e8272a]" />
              <h2 className="font-heading text-2xl text-slate-900">PROMOTIONAL OFFERS</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                {offersOnly.length} Active
              </span>
            </div>
          </div>

          {offersOnly.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
              <Tag className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-600">No active promotional offers</p>
              <button
                onClick={() => openAddModal('NEW OFFER')}
                className="text-xs text-[#e8272a] font-bold hover:underline"
              >
                + Add First Offer
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offersOnly.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-3 hover:border-red-300 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e8272a] text-white text-[10px] font-bold uppercase">
                        {item.tag}
                      </span>
                      <span className="text-[10px] text-amber-600 font-bold uppercase flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Featured Offer
                      </span>
                    </div>

                    {item.imageUrl && (
                      <div className="h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    )}

                    <h3 className="font-heading text-lg text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#e8272a]">{item.actionText} ➔ {item.actionUrl}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 2: NOTICE BOARD SUBSECTION */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-slate-700" />
              <h2 className="font-heading text-2xl text-slate-900">NOTICE BOARD</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                {noticesOnly.length} Notices
              </span>
            </div>
          </div>

          {noticesOnly.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
              <Megaphone className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-600">No active gym notices</p>
              <button
                onClick={() => openAddModal('NOTICE')}
                className="text-xs text-slate-800 font-bold hover:underline"
              >
                + Add Gym Notice
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {noticesOnly.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-white text-[10px] font-bold uppercase">
                      {item.tag}
                    </span>

                    {item.imageUrl && (
                      <div className="h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    )}

                    <h3 className="font-heading text-lg text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">{item.actionText} ➔ {item.actionUrl}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MODAL EDIT/ADD */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-heading text-2xl text-slate-900">
                  {editingId ? 'EDIT OFFER / NOTICE' : 'CREATE OFFER OR NOTICE'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">BADGE / TAG</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. NEW OFFER or NOTICE"
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#e8272a]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">PRIORITY HIGHLIGHT</label>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isHighPriority: !formData.isHighPriority })}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                        formData.isHighPriority
                          ? 'bg-red-50 border-red-200 text-[#e8272a]'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {formData.isHighPriority ? '🔥 HIGHLIGHTED OFFER' : 'STANDARD NOTICE'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">TITLE</label>
                  <input
                    type="text"
                    required
                    placeholder="Title for announcement banner"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#e8272a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">DESCRIPTION</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Full announcement details..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#e8272a]"
                  />
                </div>

                <ImageUploader
                  label="BANNER PHOTO (OPTIONAL)"
                  value={formData.imageUrl || ''}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">BUTTON TEXT</label>
                    <input
                      type="text"
                      placeholder="e.g. CLAIM OFFER"
                      value={formData.actionText}
                      onChange={(e) => setFormData({ ...formData, actionText: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#e8272a]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">TARGET PAGE</label>
                    <select
                      value={formData.actionUrl}
                      onChange={(e) => setFormData({ ...formData, actionUrl: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#e8272a]"
                    >
                      <option value="/membership">/membership</option>
                      <option value="/services">/services</option>
                      <option value="/boxing">/boxing</option>
                      <option value="/spa">/spa</option>
                      <option value="/apply">/apply</option>
                      <option value="/contact">/contact</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#e8272a] text-white font-heading text-xs font-bold hover:bg-red-700 transition-all flex items-center gap-1.5 shadow-md shadow-red-500/20"
                  >
                    <Check className="w-4 h-4" />
                    <span>SAVE & PUBLISH</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
