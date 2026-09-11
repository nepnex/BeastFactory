import React, { useState } from 'react';
import { Plus, Trash2, Edit3, ShoppingBag } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { dataService } from '../../services/dataService';
import { AdminLayout } from '../../layouts/AdminLayout';
import { ProductItem } from '../../types';
import { ImageUploader } from '../../components/admin/ImageUploader';

export const AdminProductsPage: React.FC = () => {
  const { products } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<ProductItem, 'id'>>({
    name: '',
    description: '',
    category: 'Merchandise',
    priceNpr: 1500,
    imageUrls: [''],
    sku: '',
    inStock: true,
    isFeatured: true,
    displayOrder: products.length + 1,
    isActive: true,
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      category: 'Merchandise',
      priceNpr: 1500,
      imageUrls: [''],
      sku: `SKU-${Date.now()}`,
      inStock: true,
      isFeatured: true,
      displayOrder: products.length + 1,
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (p: ProductItem) => {
    setEditingId(p.id);
    setFormData({ ...p, imageUrls: p.imageUrls?.length ? p.imageUrls : [''] });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      dataService.updateProduct(editingId, formData);
    } else {
      dataService.addProduct(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete product?')) {
      dataService.deleteProduct(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl text-white">PRODUCTS <span className="text-[#e8272a]">CATALOG</span></h1>
            <p className="text-xs text-neutral-400">Manage gym merchandise, gear, apparel, and supplement inventory</p>
          </div>
          <button onClick={openAddModal} className="px-6 py-3 rounded-full bg-[#e8272a] text-white font-heading text-base hover:bg-[#ff1e1e] flex items-center gap-2 shadow-lg shadow-red-500/20">
            <Plus className="w-4 h-4" /> <span>ADD PRODUCT</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="glass-panel rounded-3xl p-6 border border-neutral-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="h-44 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 relative">
                  {p.imageUrls && p.imageUrls[0] ? (
                    <img src={p.imageUrls[0]} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-600">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] text-sky-400 font-bold uppercase border border-neutral-700">
                    {p.category}
                  </span>
                </div>
                <h3 className="font-heading text-2xl text-white">{p.name}</h3>
                <p className="text-xs text-neutral-400 line-clamp-2">{p.description}</p>
                <div className="font-heading text-3xl text-white">NPR {p.priceNpr.toLocaleString()}</div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${p.inStock ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  {p.inStock ? 'In Stock' : 'Out of Stock'}
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
            <div className="glass-panel max-w-lg w-full p-8 rounded-3xl border border-neutral-800 relative max-h-[90vh] overflow-y-auto">
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-white font-bold">✕</button>
              <h3 className="font-heading text-3xl text-white mb-4">{editingId ? 'EDIT PRODUCT' : 'ADD PRODUCT'}</h3>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                {/* PRODUCT PHOTO UPLOADER */}
                <ImageUploader
                  label="Product Photo"
                  value={formData.imageUrls[0] || ''}
                  onChange={(url) => setFormData({ ...formData, imageUrls: [url] })}
                  bucket="beast-factory-assets"
                />

                <div>
                  <label className="block text-neutral-400 font-semibold mb-1">PRODUCT NAME *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 font-semibold mb-1">CATEGORY</label>
                    <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white" />
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
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.inStock} onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })} id="stockCheck" />
                  <label htmlFor="stockCheck" className="text-neutral-300 font-semibold">Available In Stock</label>
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold hover:bg-[#ff1e1e]">
                  SAVE PRODUCT
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
