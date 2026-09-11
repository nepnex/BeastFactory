import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Sparkles } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { AdminLayout } from '../../layouts/AdminLayout';
import { AdminPageHeader, ConfirmDialog } from '../../components/admin/AdminCommonComponents';
import { ImageUploader } from '../../components/admin/ImageUploader';
import { GalleryItem } from '../../types';

export const AdminGalleryPage: React.FC = () => {
  const { galleryItems, setGalleryItems } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Facility',
    imageUrl: '',
    displayOrder: 1,
    isActive: true,
  });

  const categories = [
    'Facility', 'Strength Area', 'Cardio', 'CrossFit', 'Boxing', 'Spa', 'Sauna', 'Steam', 'Jacuzzi', 'Locker', 'Cafe', 'Futsal'
  ];

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Facility',
      imageUrl: '',
      displayOrder: galleryItems.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      imageUrl: item.imageUrl,
      displayOrder: item.displayOrder,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) return;

    if (editingItem) {
      setGalleryItems(
        galleryItems.map((item) =>
          item.id === editingItem.id ? { ...item, ...formData } : item
        )
      );
    } else {
      const newItem: GalleryItem = {
        id: `gal-${Date.now()}`,
        ...formData,
      };
      setGalleryItems([...galleryItems, newItem]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTargetId) return;
    setGalleryItems(galleryItems.filter((item) => item.id !== deleteTargetId));
    setDeleteTargetId(null);
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="GALLERY MANAGEMENT"
        subtitle="Manage photo gallery images and facility showcases"
        actionLabel="Add Photo"
        onAction={handleOpenAdd}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryItems.map((item) => (
          <div key={item.id} className="glass-panel rounded-2xl overflow-hidden border border-neutral-800 flex flex-col justify-between group">
            <div className="relative h-44 overflow-hidden bg-neutral-900">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                {item.category}
              </span>
            </div>
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-heading text-lg text-white">{item.title}</h4>
                <p className="text-[11px] text-neutral-400">Order: {item.displayOrder}</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
                <span className={`text-[10px] font-bold uppercase ${item.isActive ? 'text-emerald-400' : 'text-neutral-500'}`}>
                  {item.isActive ? 'Active' : 'Hidden'}
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleOpenEdit(item)} className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteTargetId(item.id)} className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6">
            <h3 className="font-heading text-2xl text-white">
              {editingItem ? 'EDIT GALLERY ITEM' : 'ADD GALLERY ITEM'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e8272a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e8272a]"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <ImageUploader
                label="Gallery Photo"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              />

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="accent-[#e8272a] rounded w-4 h-4"
                  />
                  Active & Displayed
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
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        title="Delete Photo?"
        message="Are you sure you want to remove this item from the gallery?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </AdminLayout>
  );
};
