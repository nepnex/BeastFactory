import React, { useState } from 'react';
import { Waves, Clock, Calendar, Phone, User, Mail, Send } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { dataService } from '../../services/dataService';
import { notificationService } from '../../services/notificationService';
import { SpaService } from '../../types';

export const SpaPage: React.FC = () => {
  const { spaServices, settings } = useData();

  // Booking Wizard State
  const [selectedSpa, setSelectedSpa] = useState<SpaService | null>(null);
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 11:00 AM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableServices = spaServices.filter((s) => s.isAvailable);

  const startBooking = (spa: SpaService) => {
    setSelectedSpa(spa);
    setStep(1);
    setIsSubmitted(false);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSpa || !name || !phone) return;

    // Persist booking to backend / dataService
    const booking = dataService.addBooking({
      bookingType: 'spa',
      serviceOrPlanId: selectedSpa.id,
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      preferredDate: date,
      preferredTimeSlot: timeSlot,
      adminNotes: `Spa Hydrotherapy Request: ${selectedSpa.title}`,
    });

    try {
      await notificationService.createNotification({
        type: 'new_spa_booking',
        priority: 'HIGH',
        title: 'NEW SPA BOOKING',
        message: `${name} booked ${selectedSpa.title} for ${date} (${timeSlot}).`,
        relatedId: booking.id,
        relatedType: 'booking',
        actionUrl: '/admin/bookings',
      });
    } catch (err) {
      console.warn('Notification creation handled gracefully:', err);
    }

    // Also record lead entry
    dataService.addLead({
      fullName: name,
      phone: phone,
      email: email,
      inquiryType: 'spa',
      message: `Booked ${selectedSpa.title} on ${date} (${timeSlot})`,
    });

    setIsSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a] text-white min-h-screen">
      {/* HERO */}
      <section className="relative py-20 px-4 text-center border-b border-neutral-900 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold flex items-center justify-center gap-2">
            <Waves className="w-4 h-4" /> WELLNESS & RECOVERY
          </span>
          <h1 className="font-heading text-6xl sm:text-8xl text-white">
            BEAST FACTORY <span className="text-[#e8272a]">SPA & JACUZZI</span>
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Accelerate muscle repair, alleviate joint stiffness, and release mental stress in Damak's premier Finnish dry sauna, steam bath, and hydrotherapy jacuzzi suite.
          </p>
        </div>
      </section>

      {/* SPA SERVICES GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">TREATMENT PACKAGES</span>
          <h2 className="font-heading text-4xl sm:text-6xl text-white mt-1">HYDROTHERAPY & <span className="text-[#e8272a]">RECOVERY</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {availableServices.map((spa) => (
            <div key={spa.id} className="glass-panel rounded-3xl overflow-hidden border border-neutral-800 hover:border-[#e8272a]/50 transition-all flex flex-col justify-between group">
              <div className="relative h-64 overflow-hidden">
                <img src={spa.imageUrl} alt={spa.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#e8272a] text-white text-xs font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {spa.durationMinutes} mins
                </span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-3xl text-white group-hover:text-[#ff1e1e] transition-colors">{spa.title}</h3>
                  <p className="text-neutral-400 text-xs mt-2 leading-relaxed">{spa.description}</p>
                </div>

                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-semibold">FEE</span>
                    <span className="font-heading text-3xl text-white">NPR {spa.priceNpr.toLocaleString()}</span>
                  </div>
                  <button onClick={() => startBooking(spa)} className="px-6 py-3 rounded-full bg-[#e8272a] text-white font-heading text-base hover:bg-[#ff1e1e] shadow-lg shadow-red-500/20 active:scale-95 transition-all">
                    BOOK SESSION
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7-STEP SPA BOOKING WIZARD MODAL */}
      {selectedSpa && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel max-w-xl w-full p-8 rounded-3xl border border-[#e8272a]/40 relative">
            <button onClick={() => setSelectedSpa(null)} className="absolute top-4 right-4 text-neutral-400 hover:text-white font-bold text-xl">✕</button>

            {isSubmitted ? (
              <div className="text-center space-y-5 py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl font-bold">✓</div>
                <h3 className="font-heading text-4xl text-white">SPA BOOKING CONFIRMED!</h3>
                <p className="text-sm text-neutral-300">
                  Thank you, <strong className="text-[#e8272a]">{name}</strong>. Your session for <strong className="text-white">{selectedSpa.title}</strong> has been scheduled for <strong className="text-[#e8272a]">{date}</strong> at <strong className="text-white">{timeSlot}</strong>.
                </p>
                <p className="text-xs text-neutral-500">Our receptionist will call you at {phone} prior to your appointment.</p>
                <button onClick={() => setSelectedSpa(null)} className="px-8 py-3 rounded-full bg-[#e8272a] text-white font-heading text-lg">
                  DONE
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div>
                    <span className="text-[10px] text-[#e8272a] font-bold uppercase tracking-widest">SPA BOOKING STEP {step} OF 7</span>
                    <h3 className="font-heading text-2xl text-white mt-0.5">{selectedSpa.title}</h3>
                  </div>
                  <span className="font-heading text-xl text-white">NPR {selectedSpa.priceNpr}</span>
                </div>

                {/* STEP 1: SERVICE CONFIRMATION */}
                {step === 1 && (
                  <div className="space-y-4">
                    <p className="text-xs text-neutral-300 leading-relaxed">{selectedSpa.description}</p>
                    <div className="bg-neutral-900/90 p-4 rounded-2xl border border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
                      <span>Treatment Duration:</span>
                      <span className="font-bold text-[#e8272a]">{selectedSpa.durationMinutes} Minutes</span>
                    </div>
                    <button type="button" onClick={() => setStep(2)} className="w-full py-3.5 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold">
                      PROCEED TO DATE SELECT →
                    </button>
                  </div>
                )}

                {/* STEP 2: PREFERRED DATE */}
                {step === 2 && (
                  <div className="space-y-4">
                    <label className="block text-xs text-neutral-400 font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#e8272a]" /> SELECT PREFERRED DATE *
                    </label>
                    <input type="date" min={new Date().toISOString().split('T')[0]} value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]" />
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setStep(1)} className="w-1/3 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold">BACK</button>
                      <button type="button" onClick={() => setStep(3)} className="w-2/3 py-3 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold">CONTINUE →</button>
                    </div>
                  </div>
                )}

                {/* STEP 3: TIME SLOT */}
                {step === 3 && (
                  <div className="space-y-4">
                    <label className="block text-xs text-neutral-400 font-semibold flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#e8272a]" /> SELECT TIME SLOT *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['7:00 AM - 8:00 AM', '10:00 AM - 11:00 AM', '2:00 PM - 3:00 PM', '6:00 PM - 7:00 PM', '8:00 PM - 9:00 PM'].map((slot) => (
                        <button key={slot} type="button" onClick={() => setTimeSlot(slot)} className={`py-3 rounded-xl text-xs font-semibold border ${timeSlot === slot ? 'bg-[#e8272a] text-white border-[#e8272a]' : 'bg-neutral-900 text-neutral-400 border-neutral-800'}`}>
                          {slot}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setStep(2)} className="w-1/3 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold">BACK</button>
                      <button type="button" onClick={() => setStep(4)} className="w-2/3 py-3 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold">CONTINUE →</button>
                    </div>
                  </div>
                )}

                {/* STEP 4: CUSTOMER NAME */}
                {step === 4 && (
                  <div className="space-y-4">
                    <label className="block text-xs text-neutral-400 font-semibold flex items-center gap-2">
                      <User className="w-4 h-4 text-[#e8272a]" /> YOUR FULL NAME *
                    </label>
                    <input type="text" required placeholder="e.g. Ramesh Karki" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]" />
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setStep(3)} className="w-1/3 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold">BACK</button>
                      <button type="button" onClick={() => { if (name) setStep(5); }} className="w-2/3 py-3 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold">CONTINUE →</button>
                    </div>
                  </div>
                )}

                {/* STEP 5: PHONE / WHATSAPP */}
                {step === 5 && (
                  <div className="space-y-4">
                    <label className="block text-xs text-neutral-400 font-semibold flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#e8272a]" /> PHONE / WHATSAPP NUMBER *
                    </label>
                    <input type="tel" required placeholder="e.g. 9801234567" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]" />
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setStep(4)} className="w-1/3 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold">BACK</button>
                      <button type="button" onClick={() => { if (phone) setStep(6); }} className="w-2/3 py-3 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold">CONTINUE →</button>
                    </div>
                  </div>
                )}

                {/* STEP 6: EMAIL (OPTIONAL) */}
                {step === 6 && (
                  <div className="space-y-4">
                    <label className="block text-xs text-neutral-400 font-semibold flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#e8272a]" /> EMAIL ADDRESS (OPTIONAL)
                    </label>
                    <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]" />
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setStep(5)} className="w-1/3 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold">BACK</button>
                      <button type="button" onClick={() => setStep(7)} className="w-2/3 py-3 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold">REVIEW BOOKING →</button>
                    </div>
                  </div>
                )}

                {/* STEP 7: REVIEW & SUBMIT */}
                {step === 7 && (
                  <div className="space-y-4">
                    <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-2 text-xs text-neutral-300">
                      <div className="flex justify-between"><span>Service:</span><span className="text-white font-bold">{selectedSpa.title}</span></div>
                      <div className="flex justify-between"><span>Date & Slot:</span><span className="text-[#e8272a] font-bold">{date} ({timeSlot})</span></div>
                      <div className="flex justify-between"><span>Customer:</span><span className="text-white font-bold">{name} ({phone})</span></div>
                      <div className="flex justify-between border-t border-neutral-800 pt-2 font-bold text-sm"><span>Total Fee:</span><span className="text-[#e8272a]">NPR {selectedSpa.priceNpr}</span></div>
                    </div>
                    <button type="submit" className="w-full py-4 rounded-xl bg-[#e8272a] text-white font-heading text-xl font-bold hover:bg-[#ff1e1e] flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      <span>SUBMIT SPA BOOKING REQUEST</span>
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
