import React, { useState } from 'react';
import { Save, CheckCircle2, KeyRound } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { dataService } from '../../services/dataService';
import { AdminLayout } from '../../layouts/AdminLayout';
import { BusinessSettings } from '../../types';
import { updateAdminPassword } from '../../utils/security';

export const AdminSettingsPage: React.FC = () => {
  const { settings } = useData();
  const [formData, setFormData] = useState<BusinessSettings>({ ...settings });
  const [saved, setSaved] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dataService.saveSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChangePassword = async () => {
    setPwdError('');
    setPwdSuccess('');

    if (!newPassword || newPassword.length < 6) {
      setPwdError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdError('New passwords do not match.');
      return;
    }

    try {
      await updateAdminPassword(newPassword);
      setPwdSuccess('Admin password updated successfully with SHA-256 encryption!');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPwdSuccess(''), 4000);
    } catch {
      setPwdError('Failed to update password.');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="font-heading text-4xl text-slate-900">BUSINESS <span className="text-[#e8272a]">SETTINGS</span></h1>
          <p className="text-xs text-slate-500 font-medium">Configure global contact details, operating hours, and security credentials</p>
        </div>

        {saved && (
          <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-2xl text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>BUSINESS SETTINGS UPDATED SUCCESSFULLY!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">GYM BRAND NAME</label>
              <input type="text" value={formData.gymName} onChange={(e) => setFormData({ ...formData, gymName: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#e8272a] focus:bg-white" />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">TAGLINE</label>
              <input type="text" value={formData.tagline} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#e8272a] focus:bg-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">PHONE NUMBER</label>
              <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#e8272a] focus:bg-white" />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">SUPPORT EMAIL</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#e8272a] focus:bg-white" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">LOCATION ADDRESS</label>
            <input type="text" value={formData.locationAddress} onChange={(e) => setFormData({ ...formData, locationAddress: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#e8272a] focus:bg-white" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">OPERATING HOURS</label>
              <input type="text" value={formData.operatingHours} onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#e8272a] focus:bg-white" />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">DAYS OPEN</label>
              <input type="text" value={formData.daysOpen} onChange={(e) => setFormData({ ...formData, daysOpen: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#e8272a] focus:bg-white" />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h4 className="font-heading text-xl text-slate-900">SOCIAL MEDIA URLS</h4>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">FACEBOOK URL</label>
              <input type="text" value={formData.facebookUrl} onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white" />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">INSTAGRAM URL</label>
              <input type="text" value={formData.instagramUrl} onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white" />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">TIKTOK URL</label>
              <input type="text" value={formData.tiktokUrl} onChange={(e) => setFormData({ ...formData, tiktokUrl: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white" />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h4 className="font-heading text-xl text-slate-900">SEARCH ENGINE OPTIMIZATION (SEO) CONTROLS</h4>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">DEFAULT SITE TITLE</label>
              <input type="text" value={formData.siteTitle || ''} onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })} placeholder="e.g. Beast Factory Gym | Best Fitness Center in Damak, Jhapa" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white" />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">DEFAULT META DESCRIPTION</label>
              <textarea rows={3} value={formData.defaultMetaDescription || ''} onChange={(e) => setFormData({ ...formData, defaultMetaDescription: e.target.value })} placeholder="Default meta description for search engines..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">SITE URL (CANONICAL DOMAIN)</label>
                <input type="text" value={formData.siteUrl || ''} onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })} placeholder="https://beastfactorynepal.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white" />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">DEFAULT OG IMAGE URL</label>
                <input type="text" value={formData.defaultOgImage || ''} onChange={(e) => setFormData({ ...formData, defaultOgImage: e.target.value })} placeholder="https://beastfactorynepal.com/assets/hero_bg.png" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white" />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">GOOGLE MAPS EMBED / LISTING URL</label>
              <input type="text" value={formData.googleMapsUrl || ''} onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })} placeholder="https://maps.google.com/?q=Damak-1+Falgunanda+Chowk" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white" />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h4 className="font-heading text-xl text-slate-900 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#e8272a]" /> CHANGE ADMIN PASSWORD
            </h4>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              {pwdSuccess && (
                <p className="text-xs font-bold text-emerald-600 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  {pwdSuccess}
                </p>
              )}
              {pwdError && (
                <p className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                  {pwdError}
                </p>
              )}
              <div>
                <label className="block font-semibold text-slate-600 mb-1">NEW PASSWORD</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new admin password (min 6 chars)"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#e8272a]"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">CONFIRM NEW PASSWORD</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#e8272a]"
                />
              </div>
              <button
                type="button"
                onClick={handleChangePassword}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-black transition-colors"
              >
                UPDATE PASSWORD (SHA-256 ENCRYPTED)
              </button>
            </div>
          </div>

          <button type="submit" className="w-full py-4 rounded-xl bg-[#e8272a] text-white font-heading text-xl font-bold hover:bg-[#ff1e1e] flex items-center justify-center gap-2 shadow-lg shadow-red-500/20">
            <Save className="w-5 h-5" />
            <span>SAVE SETTINGS</span>
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};
