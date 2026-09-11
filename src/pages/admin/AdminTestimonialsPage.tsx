import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Star } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { AdminLayout } from '../../layouts/AdminLayout';
import { AdminPageHeader, ConfirmDialog } from '../../components/admin/AdminCommonComponents';
import { Testimonial } from '../../types';

export const AdminTestimonialsPage: React.FC = () => {
  const { testimonials, setTestimonials } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    rating: 5,
    isVerified: true,
    isPublished: true,
    displayOrder: 1,
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      comment: '',
      rating: 5,
      isVerified: true,
      isPublished: true,
      displayOrder: testimonials.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Testimonial) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      comment: item.comment,
      rating: item.rating,
      isVerified: item.isVerified,
      isPublished: item.isPublished,
      displayOrder: item.displayOrder,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setTestimonials(
        testimonials.map((t) => (t.id === editingItem.id ? { ...t, ...formData } : t))
      );
    } else {
      const newItem: Testimonial = {
        id: `rev-${Date.now()}`,
        ...formData,
      };
      setTestimonials([...testimonials, newItem]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTargetId) return;
    setTestimonials(testimonials.filter((t) => t.id !== deleteTargetId));
    setDeleteTargetId(null);
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="TESTIMONIALS MANAGEMENT"
        subtitle="Manage client reviews and member testimonials"
        actionLabel="Add Review"
        onAction={handleOpenAdd}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="glass-panel p-6 rounded-3xl border border-neutral-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className={`text-[10px] font-bold uppercase ${t.isPublished ? 'text-emerald-400' : 'text-neutral-500'}`}>
                  {t.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="text-neutral-300 text-xs italic leading-relaxed">"{t.comment}"</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
              <div>
                <h4 className="font-heading text-lg text-white">{t.name}</h4>
                {t.isVerified && <span className="text-[10px] text-emerald-400 font-bold uppercase">Verified Member</span>}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleOpenEdit(t)} className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => setDeleteTargetId(t.id)} className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6">
            <h3 className="font-heading text-2xl text-white">
              {editingItem ? 'EDIT TESTIMONIAL' : 'ADD TESTIMONIAL'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">Member Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e8272a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  required
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e8272a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">Testimonial Quote</label>
                <textarea
                  required
                  rows={3}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e8272a]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="accent-[#e8272a] rounded w-4 h-4"
                  />
                  Publish Online
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-900">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-900 text-neutral-400 text-xs font-semibold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#e8272a] hover:bg-[#ff1e1e] text-white text-xs font-bold uppercase"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        title="Delete Testimonial?"
        message="Are you sure you want to remove this testimonial review?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </AdminLayout>
  );
};
