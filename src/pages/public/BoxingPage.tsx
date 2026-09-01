import React, { useState } from 'react';
import { Shield, Zap, Flame, CheckCircle, Clock } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { dataService } from '../../services/dataService';

export const BoxingPage: React.FC = () => {
  const { boxingPlans } = useData();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [applicant, setApplicant] = useState({ name: '', phone: '', batch: 'Morning (6:00 AM)' });
  const [success, setSuccess] = useState(false);

  const activePlans = boxingPlans.filter((p) => p.isActive);

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicant.name || !applicant.phone) return;
    dataService.addLead({
      fullName: applicant.name,
      phone: applicant.phone,
      inquiryType: 'membership',
      message: `Enrolling in Boxing Plan: ${selectedPlan || 'General Boxing'} (${applicant.batch})`,
    });
    setSuccess(true);
  };

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a] text-white min-h-screen">
      {/* HERO BANNER */}
      <section className="relative py-20 px-4 text-center border-b border-neutral-900 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" /> DEDICATED COMBAT ZONE
          </span>
          <h1 className="font-heading text-6xl sm:text-8xl text-white">
            BEAST <span className="text-[#e8272a]">BOXING & KICKBOXING</span>
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Forge agility, explosive power, and mental toughness in Damak's premier combat sports facility. Independent combat training modules separate from standard gym membership.
          </p>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="glass-panel p-6 rounded-3xl border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#e8272a]/15 text-[#e8272a] flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-2xl text-white">BOXING RING & HEAVY BAGS</h3>
            <p className="text-neutral-400 text-xs leading-relaxed">Standard elevated boxing ring, tear-drop bags, speed bags, and specialized leather wall pads.</p>
          </div>
          <div className="glass-panel p-6 rounded-3xl border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#e8272a]/15 text-[#e8272a] flex items-center justify-center font-bold">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-2xl text-white">CERTIFIED COMBAT COACHES</h3>
            <p className="text-neutral-400 text-xs leading-relaxed">1-on-1 pad work, footwork drills, and tactical sparring supervised by national-level champions.</p>
          </div>
          <div className="glass-panel p-6 rounded-3xl border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#e8272a]/15 text-[#e8272a] flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-2xl text-white">MORNING & EVENING BATCHES</h3>
            <p className="text-neutral-400 text-xs leading-relaxed">Flexible training slots designed for students, working professionals, and competitive fighters.</p>
          </div>
        </div>

        {/* BOXING PRICING PLANS */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">COMBAT FEES</span>
          <h2 className="font-heading text-4xl sm:text-5xl text-white mt-1">BOXING MEMBERSHIP <span className="text-[#e8272a]">PLANS</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {activePlans.map((plan) => (
            <div key={plan.id} className="glass-panel rounded-3xl p-8 border border-neutral-800 hover:border-[#e8272a]/50 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-[#e8272a] uppercase tracking-widest">{plan.durationText}</span>
                <h3 className="font-heading text-3xl text-white">{plan.programName}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{plan.description}</p>
                <div className="pt-2">
                  <span className="font-heading text-5xl text-white">NPR {plan.priceNpr.toLocaleString()}</span>
                </div>
                <div className="text-xs text-emerald-400 font-semibold pt-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{plan.scheduleDetails}</span>
                </div>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-neutral-800">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="text-xs text-neutral-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#e8272a] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button onClick={() => setSelectedPlan(plan.programName)} className="w-full py-3.5 rounded-full bg-[#e8272a] text-white font-heading text-lg tracking-wider hover:bg-[#ff1e1e] transition-all shadow-lg shadow-red-500/20">
                ENROLL IN THIS PROGRAM
              </button>
            </div>
          ))}
        </div>

        {/* QUICK ENROLLMENT MODAL */}
        {selectedPlan && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="glass-panel max-w-lg w-full p-8 rounded-3xl border border-[#e8272a]/40 relative">
              <button onClick={() => { setSelectedPlan(null); setSuccess(false); }} className="absolute top-4 right-4 text-neutral-400 hover:text-white font-bold">✕</button>
              
              {success ? (
                <div className="text-center space-y-4 py-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl font-bold">✓</div>
                  <h3 className="font-heading text-3xl text-white">ENROLLMENT RECEIVED!</h3>
                  <p className="text-xs text-neutral-300">Thank you, <strong>{applicant.name}</strong>. Our combat head coach will call you at <strong>{applicant.phone}</strong> to confirm your batch spot.</p>
                  <button onClick={() => { setSelectedPlan(null); setSuccess(false); }} className="px-6 py-2.5 rounded-full bg-[#e8272a] text-white font-heading text-sm">DONE</button>
                </div>
              ) : (
                <form onSubmit={handleEnroll} className="space-y-4">
                  <h3 className="font-heading text-3xl text-white">BOXING ENROLLMENT</h3>
                  <p className="text-xs text-[#e8272a] font-semibold">{selectedPlan}</p>

                  <div>
                    <label className="block text-xs text-neutral-400 font-semibold mb-1">YOUR NAME *</label>
                    <input type="text" required value={applicant.name} onChange={(e) => setApplicant({ ...applicant, name: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e8272a]" />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 font-semibold mb-1">PHONE / WHATSAPP *</label>
                    <input type="tel" required value={applicant.phone} onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e8272a]" />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 font-semibold mb-1">PREFERRED BATCH</label>
                    <select value={applicant.batch} onChange={(e) => setApplicant({ ...applicant, batch: e.target.value })} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e8272a]">
                      <option value="Morning (6:00 AM)">Morning (6:00 AM - 7:30 AM)</option>
                      <option value="Evening (5:30 PM)">Evening (5:30 PM - 7:00 PM)</option>
                    </select>
                  </div>

                  <button type="submit" className="w-full py-3.5 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold hover:bg-[#ff1e1e]">
                    CONFIRM BOOKING
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
