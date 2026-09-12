import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useData } from '../hooks/useData';
import { GYM_INFO } from '../data/gymData';
import { dataService } from '../services/dataService';
import { notificationService } from '../services/notificationService';
import { sanitizeNameInput, sanitizePhoneInput, isValidName, isValidPhone } from '../utils/validation';
import { SEO } from '../components/SEO';
import { getBreadcrumbSchema } from '../utils/schemaHelper';

export const ContactPage: React.FC = () => {
  const { settings } = useData();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const breadcrumbSchema = getBreadcrumbSchema(settings.siteUrl || 'https://beastfactorynepal.com', [
    { name: 'Home', url: '/' },
    { name: 'Contact Us', url: '/contact' }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isValidName(name)) {
      setErrorMsg('Please enter a valid name (letters only).');
      return;
    }

    if (!isValidPhone(phone)) {
      setErrorMsg('Please enter a valid phone number (7 to 15 digits).');
      return;
    }

    const lead = dataService.addLead({
      fullName: sanitizeNameInput(name),
      phone: sanitizePhoneInput(phone),
      inquiryType: 'general',
      message: message || 'General contact inquiry from website.',
    });

    try {
      await notificationService.createNotification({
        type: 'new_contact_inquiry',
        priority: 'HIGH',
        title: 'NEW CONTACT INQUIRY',
        message: `${name} submitted a general inquiry (${phone}).`,
        relatedId: lead.id,
        relatedType: 'inquiry',
        actionUrl: '/admin/inquiries',
      });
    } catch (err) {
      console.warn('Notification trigger handled gracefully:', err);
    }

    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a] text-white min-h-screen">
      <SEO
        title="Contact Us & Location | Gym in Damak-1, Jhapa"
        description="Contact Beast Factory Gym in Damak-1, Falgunanda Chowk, Jhapa, Nepal. Phone: +977 23577880. Open 365 days, 3:30 AM – 11:00 PM."
        canonicalPath="/contact"
        structuredData={breadcrumbSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
        <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">GET IN TOUCH</span>
        <h1 className="font-heading text-6xl sm:text-7xl text-white">
          CONTACT <span className="text-[#e8272a]">{settings.gymName}</span>
        </h1>
        <p className="text-neutral-400 text-base max-w-2xl mx-auto">
          Have questions about memberships, personal training, or facilities? Drop us a message or visit us in Damak.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-8 rounded-3xl border border-neutral-800 space-y-6">
            <h3 className="font-heading text-3xl text-white">LOCATION & DETAILS</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e8272a]/15 text-[#e8272a] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-neutral-400 font-bold uppercase">LOCATION ADDRESS</h4>
                  <p className="text-sm text-neutral-200 mt-0.5">{settings.locationAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e8272a]/15 text-[#e8272a] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-neutral-400 font-bold uppercase">PHONE</h4>
                  <p className="text-sm text-neutral-200 mt-0.5">{settings.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e8272a]/15 text-[#e8272a] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-neutral-400 font-bold uppercase">EMAIL</h4>
                  <p className="text-sm text-neutral-200 mt-0.5">{settings.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e8272a]/15 text-[#e8272a] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-neutral-400 font-bold uppercase">OPERATING HOURS</h4>
                  <p className="text-sm text-neutral-200 mt-0.5">{settings.daysOpen} — {settings.operatingHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div className="glass-panel p-8 rounded-3xl border border-neutral-800 text-center space-y-4 py-12">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl font-bold">✓</div>
              <h3 className="font-heading text-3xl text-white">MESSAGE SENT!</h3>
              <p className="text-xs text-neutral-300">Thank you, <strong>{name}</strong>. Our front desk team will contact you at <strong>{phone}</strong>.</p>
              <button onClick={() => setSubmitted(false)} className="px-6 py-2 rounded-full bg-[#e8272a] text-white text-xs font-bold uppercase">SEND ANOTHER MESSAGE</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-3xl border border-neutral-800 space-y-6">
              <h3 className="font-heading text-3xl text-white">SEND A DIRECT MESSAGE</h3>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-semibold text-center">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(sanitizeNameInput(e.target.value))}
                    placeholder="e.g. Bikram Gurung"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">PHONE / WHATSAPP *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(sanitizePhoneInput(e.target.value))}
                    placeholder="e.g. 9801234567"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">MESSAGE</label>
                <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help you..." className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]"></textarea>
              </div>

              <button type="submit" className="w-full py-4 rounded-xl bg-[#e8272a] text-white font-heading text-xl font-bold hover:bg-[#ff1e1e] flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                <span>SEND INQUIRY</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
