import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useData } from '../../hooks/useData';

export const FaqPage: React.FC = () => {
  const { faqs } = useData();

  const activeFaqs = faqs
    .filter((f) => f.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a] text-white min-h-screen">
      {/* HERO */}
      <section className="relative py-20 px-4 text-center border-b border-neutral-900 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4" /> SUPPORT & KNOWLEDGE
          </span>
          <h1 className="font-heading text-6xl sm:text-8xl text-white">
            FREQUENTLY ASKED <span className="text-[#e8272a]">QUESTIONS</span>
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our memberships, operating hours, personal coaching, sauna hydrotherapy, and boxing programs.
          </p>
        </div>
      </section>

      {/* FAQS ACCORDION LIST */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {activeFaqs.map((faq) => (
            <div key={faq.id} className="glass-panel rounded-2xl p-6 border border-neutral-800 space-y-3">
              <span className="text-[10px] font-bold text-[#e8272a] uppercase tracking-widest block">{faq.category || 'General'}</span>
              <h3 className="font-heading text-2xl text-white">{faq.question}</h3>
              <p className="text-neutral-300 text-sm leading-relaxed border-t border-neutral-800/80 pt-3">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
