import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Flame } from 'lucide-react';
import { useData } from '../hooks/useData';
import { TiltCard } from '../components/3d/TiltCard';
import { SEO } from '../components/SEO';
import { getBreadcrumbSchema } from '../utils/schemaHelper';

export const MembershipPage: React.FC = () => {
  const { membershipPlans, settings } = useData();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const activePlans = membershipPlans
    .filter((p) => p.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const breadcrumbSchema = getBreadcrumbSchema(settings.siteUrl || 'https://beastfactorynepal.com', [
    { name: 'Home', url: '/' },
    { name: 'Membership Plans', url: '/membership' }
  ]);

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a] text-white min-h-screen">
      <SEO
        title="Membership Plans & Pricing | Gym in Damak, Jhapa"
        description="Affordable & transparent gym membership packages in Damak, Jhapa at Beast Factory. Monthly & annual passes for regular gym access, Beast Pro, and VIP coaching."
        canonicalPath="/membership"
        structuredData={breadcrumbSchema}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-12">
        <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">FLEXIBLE MEMBERSHIP PACKAGES</span>
        <h1 className="font-heading text-6xl sm:text-7xl text-white">
          INVEST IN YOUR <span className="text-[#e8272a]">PHYSICAL POWER</span>
        </h1>
        <p className="text-neutral-400 text-base max-w-2xl mx-auto">
          No hidden fees. Transparent pricing for maximum value and results. {settings.daysOpen} • {settings.operatingHours}
        </p>

        <div className="pt-4 flex items-center justify-center gap-4">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
              billingCycle === 'monthly' ? 'bg-[#e8272a] text-white shadow-md shadow-red-500/20' : 'bg-neutral-900 border border-neutral-800 text-neutral-400'
            }`}
          >MONTHLY BILLING</button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all relative ${
              billingCycle === 'yearly' ? 'bg-[#e8272a] text-white shadow-md shadow-red-500/20' : 'bg-neutral-900 border border-neutral-800 text-neutral-400'
            }`}
          >YEARLY PASS <span className="text-[10px] text-emerald-400 ml-1 font-extrabold">(SAVE 20%)</span></button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {activePlans.map((plan) => (
          <TiltCard key={plan.id} maxDegree={plan.isPopular ? 6 : 4} depth={plan.isPopular ? 25 : 15}>
            <div className={`glass-panel rounded-3xl p-8 border h-full ${plan.isPopular ? 'border-[#e8272a] neon-glow-red scale-105' : 'border-neutral-800'} flex flex-col justify-between relative space-y-6`}>
              {plan.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#e8272a] text-white font-bold text-[10px] tracking-widest uppercase shadow-lg shadow-red-500/30">{plan.badgeText || 'BEST VALUE'}</span>
              )}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e8272a]/15 border border-[#e8272a]/30 flex items-center justify-center text-[#e8272a]">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-3xl text-white">{plan.name}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{plan.description}</p>
                <div className="pt-2">
                  <span className="font-heading text-4xl sm:text-5xl text-white">
                    NPR {billingCycle === 'monthly' ? plan.priceMonthlyNpr.toLocaleString() : (plan.priceYearlyNpr || plan.priceMonthlyNpr * 12).toLocaleString()}
                  </span>
                  <span className="text-xs text-neutral-400 font-sans ml-1">
                    {billingCycle === 'monthly' ? '/ month' : '/ year'}
                  </span>
                </div>
              </div>
              <ul className="space-y-3 pt-4 border-t border-neutral-800">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="text-xs text-neutral-300 flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#e8272a] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link to={`/apply?plan=${plan.id}`} className={`w-full text-center py-3.5 rounded-full font-heading text-lg tracking-wider transition-all ${plan.isPopular ? 'bg-[#e8272a] text-white font-bold shadow-lg shadow-red-500/25 hover:bg-[#ff1e1e]' : 'bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800'}`}>
                SELECT THIS PLAN
              </Link>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
};
