import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Send } from 'lucide-react';
import { dataService } from '../services/dataService';
import { notificationService } from '../services/notificationService';
import { GYM_INFO } from '../data/gymData';
import { sanitizeNameInput, sanitizePhoneInput, isValidName, isValidPhone } from '../utils/validation';
import { useData } from '../hooks/useData';
import { SEO } from '../components/SEO';
import { getBreadcrumbSchema } from '../utils/schemaHelper';

export const ApplicationPage: React.FC = () => {
  const { settings } = useData();
  const [searchParams] = useSearchParams();
  const selectedPlanParam = searchParams.get('plan') || 'regular';

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    plan: selectedPlanParam,
    preferredTime: 'morning',
    fitnessGoal: 'Muscle Gain & Strength',
    notes: ''
  });

  const breadcrumbSchema = getBreadcrumbSchema(settings.siteUrl || 'https://beastfactorynepal.com', [
    { name: 'Home', url: '/' },
    { name: 'Membership Application', url: '/apply' }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isValidName(formData.fullName)) {
      setErrorMsg('Please enter a valid full name (letters only).');
      return;
    }

    if (!isValidPhone(formData.phone)) {
      setErrorMsg('Please enter a valid phone number (7 to 15 digits).');
      return;
    }

    const isFreePass = formData.plan === 'free_pass';
    const lead = dataService.addLead({
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      inquiryType: isFreePass ? 'free_trial' : 'membership',
      message: `Plan: ${formData.plan} | Goal: ${formData.fitnessGoal} | Time: ${formData.preferredTime} | Notes: ${formData.notes}`,
    });

    try {
      if (isFreePass) {
        await notificationService.createNotification({
          type: 'new_free_trial',
          priority: 'HIGH',
          title: 'NEW FREE TRIAL REQUEST',
          message: `${formData.fullName} requested a free 1-day trial pass (${formData.preferredTime}).`,
          relatedId: lead.id,
          relatedType: 'inquiry',
          actionUrl: '/admin/inquiries',
        });
      } else {
        await notificationService.createNotification({
          type: 'new_membership_inquiry',
          priority: 'HIGH',
          title: 'NEW MEMBERSHIP INQUIRY',
          message: `${formData.fullName} applied for ${formData.plan} plan (${formData.phone}).`,
          relatedId: lead.id,
          relatedType: 'inquiry',
          actionUrl: '/admin/inquiries',
        });
      }
    } catch (err) {
      console.warn('Notification trigger handled gracefully:', err);
    }

    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a] text-white min-h-screen">
      <SEO
        title="Apply for Membership or Free 1-Day Trial Pass | Damak, Jhapa"
        description="Lock in your membership or claim a free 1-day trial pass at Beast Factory Gym in Damak, Jhapa. Quick online registration."
        canonicalPath="/apply"
        structuredData={breadcrumbSchema}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">JOIN BEAST FACTORY</span>
          <h1 className="font-heading text-5xl sm:text-6xl text-white">
            MEMBERSHIP <span className="text-[#e8272a]">APPLICATION</span>
          </h1>
          <p className="text-neutral-400 text-sm">Fill out the form below to lock in your membership or free 1-day pass.</p>
        </div>

        {submitted ? (
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#e8272a]/40 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#e8272a]/20 text-[#e8272a] flex items-center justify-center mx-auto border border-[#e8272a]/50">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-heading text-4xl text-white">APPLICATION RECEIVED!</h2>
            <p className="text-neutral-300 text-sm max-w-md mx-auto">
              Thank you, <strong className="text-[#e8272a]">{formData.fullName}</strong>. Our team will contact you at <strong className="text-[#e8272a]">{formData.phone}</strong> shortly to finalize your pass.
            </p>
            <p className="text-neutral-500 text-xs">You can also reach us directly at {GYM_INFO.phone}</p>
            <button onClick={() => setSubmitted(false)} className="px-8 py-3 rounded-full bg-[#e8272a] text-white font-heading text-lg font-bold hover:bg-[#ff1e1e]">
              SUBMIT ANOTHER APPLICATION
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-10 rounded-3xl border border-neutral-800 space-y-6">
            
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-semibold text-center">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">FULL NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bikram Gurung"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: sanitizeNameInput(e.target.value) })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">PHONE NUMBER *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9801234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: sanitizePhoneInput(e.target.value) })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">EMAIL ADDRESS</label>
                <input type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">MEMBERSHIP PLAN</label>
                <select value={formData.plan} onChange={(e) => setFormData({ ...formData, plan: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]">
                  <option value="regular">Regular Gym Access (NPR 2,500/mo)</option>
                  <option value="beast_pro">Beast Pro Transform (NPR 4,500/mo)</option>
                  <option value="vip_coaching">VIP Personal Coaching (NPR 9,000/mo)</option>
                  <option value="free_pass">Claim Free 1-Day Trial Pass</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">PREFERRED WORKOUT TIME</label>
                <select value={formData.preferredTime} onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]">
                  <option value="morning">Morning (3:30 AM - 10:00 AM)</option>
                  <option value="afternoon">Afternoon (10:00 AM - 4:00 PM)</option>
                  <option value="evening">Evening (4:00 PM - 11:00 PM)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">PRIMARY FITNESS GOAL</label>
                <select value={formData.fitnessGoal} onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]">
                  <option value="Muscle Gain & Strength">Muscle Gain & Body Building</option>
                  <option value="Weight Loss & Conditioning">Weight Loss Program</option>
                  <option value="CrossFit & Boxing">CrossFit & Boxing</option>
                  <option value="Zumba & Yoga">Zumba & Yoga</option>
                  <option value="General Health">General Health & Wellness</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">ADDITIONAL NOTES / MEDICAL HISTORY</label>
              <textarea rows={3} placeholder="Any prior injuries or specific requests..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]"></textarea>
            </div>

            <button type="submit" className="w-full py-4 rounded-xl bg-[#e8272a] text-white font-heading text-xl font-bold hover:bg-[#ff1e1e] shadow-xl shadow-red-500/20 flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              <span>SUBMIT APPLICATION NOW</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
