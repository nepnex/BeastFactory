import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { GYM_INFO } from '../data/gymData';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
        <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">GET IN TOUCH</span>
        <h1 className="font-heading text-6xl sm:text-7xl text-white">
          CONTACT <span className="text-[#e8272a]">BEAST FACTORY</span>
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
                  <p className="text-sm text-neutral-200 mt-0.5">{GYM_INFO.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e8272a]/15 text-[#e8272a] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-neutral-400 font-bold uppercase">PHONE</h4>
                  <p className="text-sm text-neutral-200 mt-0.5">{GYM_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e8272a]/15 text-[#e8272a] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-neutral-400 font-bold uppercase">EMAIL</h4>
                  <p className="text-sm text-neutral-200 mt-0.5">info@beastfactory.com.np</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e8272a]/15 text-[#e8272a] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-neutral-400 font-bold uppercase">OPERATING HOURS</h4>
                  <p className="text-sm text-neutral-200 mt-0.5">{GYM_INFO.daysOpen} — {GYM_INFO.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form className="glass-panel p-8 rounded-3xl border border-neutral-800 space-y-6">
            <h3 className="font-heading text-3xl text-white">SEND A DIRECT MESSAGE</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">YOUR NAME</label>
                <input type="text" placeholder="John Doe" className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">PHONE / WHATSAPP</label>
                <input type="tel" placeholder="9800000000" className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">MESSAGE</label>
              <textarea rows={4} placeholder="How can we help you..." className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]"></textarea>
            </div>

            <button type="button" className="w-full py-4 rounded-xl bg-[#e8272a] text-white font-heading text-xl font-bold hover:bg-[#ff1e1e] flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              <span>SEND INQUIRY</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
