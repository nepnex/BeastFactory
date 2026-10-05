import React from 'react';
import { Sparkles, Megaphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { NoticeOffer } from '../types';

export const AnnouncementBanner: React.FC = () => {
  const { settings } = useData();
  const offersList: NoticeOffer[] = (settings.activeOffers && settings.activeOffers.length > 0)
    ? settings.activeOffers
    : [
        {
          id: 'offer_1',
          tag: 'NEW OFFER',
          title: '365 DAYS ANNUAL MEMBERSHIP DISCOUNT',
          description: 'Get exclusive access to gym floor, hydrotherapy sauna, and complimentary personal trainer sessions when you sign up this month!',
          actionText: 'CLAIM OFFER',
          actionUrl: '/membership',
          isHighPriority: true
        },
        {
          id: 'notice_1',
          tag: 'NOTICE',
          title: 'EARLY MORNING BATCH (3:30 AM OPENING)',
          description: 'Our morning session starts daily at 3:30 AM. Certified trainers available for morning motivation and technique guidance.',
          actionText: 'VIEW TIMINGS',
          actionUrl: '/contact'
        }
      ];

  if (offersList.length === 0) return null;

  return (
    <section className="bg-gradient-to-r from-neutral-950 via-[#140506] to-neutral-950 border-y border-[#e8272a]/30 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#e8272a]/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto space-y-4 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e8272a]/20 border border-[#e8272a]/40 flex items-center justify-center text-[#e8272a] shrink-0">
              <Megaphone className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide flex items-center gap-2">
                OFFERS & <span className="text-[#e8272a]">ANNOUNCEMENTS</span>
              </h3>
              <p className="text-xs text-neutral-400 font-medium">Latest gym notices, active discounts, and community updates</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-[11px] font-bold text-red-400 tracking-wider uppercase self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            LIVE NOTICES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offersList.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-3 ${
                item.isHighPriority
                  ? 'bg-neutral-900/90 border-[#e8272a]/50 shadow-lg shadow-red-500/10 hover:border-[#e8272a]'
                  : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.isHighPriority ? 'bg-[#e8272a] text-white' : 'bg-neutral-800 text-neutral-300'
                  }`}>
                    {item.tag || 'NOTICE'}
                  </span>
                  {item.isHighPriority && (
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> LIMITED TIME
                    </span>
                  )}
                </div>
                {item.imageUrl && (
                  <div className="h-40 rounded-xl overflow-hidden mb-2 bg-neutral-950 border border-neutral-800">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <h4 className="font-heading text-xl text-white tracking-wide">{item.title}</h4>
                <p className="text-neutral-300 text-xs leading-relaxed">{item.description}</p>
              </div>

              {item.actionText && item.actionUrl && (
                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-end">
                  <Link
                    to={item.actionUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e8272a] hover:text-[#ff1e1e] transition-colors"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
