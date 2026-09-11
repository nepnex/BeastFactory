import React, { useState } from 'react';
import { Plus, Trash2, Edit3, HelpCircle } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { AdminLayout } from '../../layouts/AdminLayout';
import { AdminPageHeader, ConfirmDialog } from '../../components/admin/AdminCommonComponents';
import { FAQItem } from '../../types';

export const AdminFaqPage: React.FC = () => {
  const { faqs, setFaqs } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    displayOrder: 1,
    isActive: true,
  });

  const categories = ['General', 'Membership', 'Coaching', 'Spa & Hydrotherapy', 'Boxing & Combat'];

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      displayOrder: faqs.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: FAQItem) => {
    setEditingItem(item);
    setFormData({
      question: item.question,
      answer: item.answer,
      category: item.category || 'General',
      displayOrder: item.displayOrder,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setFaqs(faqs.map((f) => (f.id === editingItem.id ? { ...f, ...formData } : f)));
    } else {
      const newItem: FAQItem = {
        id: `faq-${Date.now()}`,
        ...formData,
      };
      setFaqs([...faqs, newItem]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTargetId) return;
    setFaqs(faqs.filter((f) => f.id !== deleteTargetId));
    setDeleteTargetId(null);
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="FAQ MANAGEMENT"
        subtitle="Manage frequently asked questions and public support queries"
        actionLabel="Add Question"
        onAction={handleOpenAdd}
      />

      <div className="space-y-4">
        {faqs.map((f) => (
          <div key={f.id} className="glass-panel p-6 rounded-2xl border border-neutral-800 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#e8272a] uppercase tracking-widest">{f.category}</span>
                <h4 className="font-heading text-xl text-white">{f.question}</h4>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleOpenEdit(f)} className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => setDeleteTargetId(f.id)} className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed border-t border-neutral-800/80 pt-3">{f.answer}</p>
          </div>
        ))}
      </div>

      {/* FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6">
            <h3 className="font-heading text-2xl text-white">
              {editingItem ? 'EDIT FAQ' : 'ADD FAQ'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
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

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e8272a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">Answer</label>
                <textarea
                  required
                  rows={4}
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e8272a]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="accent-[#e8272a] rounded w-4 h-4"
                  />
                  Active
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
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        title="Delete FAQ?"
        message="Are you sure you want to remove this question from the FAQ list?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </AdminLayout>
  );
};
