import React from 'react';
import { BmiCalculatorWidget } from '../components/BmiCalculatorWidget';
import { useData } from '../hooks/useData';
import { SEO } from '../components/SEO';
import { getBreadcrumbSchema } from '../utils/schemaHelper';
import { Flame, Scale, Droplets, Dumbbell } from 'lucide-react';

export const CalculatorPage: React.FC = () => {
  const { settings } = useData();

  const breadcrumbSchema = getBreadcrumbSchema(settings.siteUrl || 'https://beastfactorynepal.com', [
    { name: 'Home', url: '/' },
    { name: 'Fitness Calculator', url: '/calculator' }
  ]);

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a] text-white min-h-screen">
      <SEO
        title="BMI, TDEE & Macro Calculator | Beast Factory Gym Damak"
        description="Free interactive Body Mass Index (BMI), TDEE calorie calculator, macro split & 1-Rep Max tool by Beast Factory Gym in Damak, Jhapa."
        canonicalPath="/calculator"
        structuredData={breadcrumbSchema}
      />
      
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-12">
        <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">INTERACTIVE BODY COMPOSITION SUITE</span>
        <h1 className="font-heading text-6xl sm:text-7xl text-white">
          BEAST FACTORY <span className="text-[#e8272a]">CALCULATOR</span>
        </h1>
        <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Calculate your Body Mass Index (BMI), Daily Energy Expenditure (TDEE), target macro split, hydration needs, and 1-Rep Max strength benchmarks.
        </p>
      </div>

      {/* CALCULATOR WIDGET */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <BmiCalculatorWidget />
      </div>

      {/* CALCULATOR EXPLANATION & GUIDANCE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-neutral-900 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">UNDERSTANDING YOUR METRICS</span>
          <h2 className="font-heading text-4xl text-white">HOW OUR CALCULATOR WORKS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-xl text-white">Body Mass Index (BMI)</h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Establishes standard weight-to-height classification. Combined with muscle mass assessment at Beast Factory Damak for peak accuracy.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#e8272a]/15 border border-[#e8272a]/30 flex items-center justify-center text-[#e8272a]">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-xl text-white">TDEE & Caloric Target</h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Uses the Mifflin-St Jeor equation adjusted for training frequency to set daily intake for fat loss (-500 kcal) or bulking (+350 kcal).
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-xl text-white">Hydration Target</h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Calculates essential daily fluid intake needed for cellular hydration, joint lubrication, and peak cardiovascular performance.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Dumbbell className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-xl text-white">1-Rep Max (1RM)</h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Estimates your maximum single-rep strength using the Brzycki formula so you can structure your lifting percentages safely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
