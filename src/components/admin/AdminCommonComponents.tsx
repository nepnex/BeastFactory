import React, { useState } from 'react';
import { Search, Plus, Filter, AlertCircle } from 'lucide-react';

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  title,
  subtitle,
  actionLabel,
  onAction,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900 mb-8">
    <div>
      <h1 className="font-heading text-3xl sm:text-4xl text-white tracking-wide">{title}</h1>
      {subtitle && <p className="text-xs text-neutral-400 mt-1">{subtitle}</p>}
    </div>
    {actionLabel && onAction && (
      <button
        onClick={onAction}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#e8272a] hover:bg-[#ff1e1e] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-red-500/20 shrink-0"
      >
        <Plus className="w-4 h-4" />
        <span>{actionLabel}</span>
      </button>
    )}
  </div>
);

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDangerous?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDangerous = true,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-2xl ${isDangerous ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-neutral-800 text-neutral-300'}`}>
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading text-xl text-white">{title}</h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{message}</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-900">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold uppercase tracking-wider transition-colors border border-neutral-800"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2 rounded-xl text-white text-xs font-bold uppercase tracking-wider transition-colors ${
              isDangerous ? 'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/20' : 'bg-[#e8272a] hover:bg-[#ff1e1e]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
