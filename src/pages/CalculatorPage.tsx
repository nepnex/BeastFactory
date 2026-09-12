import React from 'react';
import { BmiCalculatorWidget } from '../components/BmiCalculatorWidget';
import { useData } from '../hooks/useData';
import { SEO } from '../components/SEO';
import { getBreadcrumbSchema } from '../utils/schemaHelper';

export const CalculatorPage: React.FC = () => {
  const { settings } = useData();

  const breadcrumbSchema = getBreadcrumbSchema(settings.siteUrl || 'https://beastfactorynepal.com', [
    { name: 'Home', url: '/' },
    { name: 'Fitness Calculator', url: '/calculator' }
  ]);

  return (
    <div className="pt-28 pb-20 bg-[#0a0a0a] text-white min-h-screen">
      <SEO
        title="BMI & Fitness Calculator | Beast Factory Gym Damak"
        description="Free interactive BMI & Body Fat fitness calculator by Beast Factory Gym Damak. Calculate your Body Mass Index and ideal daily calorie intake."
        canonicalPath="/calculator"
        structuredData={breadcrumbSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-12">
        <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold">INTERACTIVE FITNESS TOOL</span>
        <h1 className="font-heading text-6xl sm:text-7xl text-white">
          BMI & MACRO <span className="text-[#e8272a]">CALCULATOR</span>
        </h1>
        <p className="text-neutral-400 text-base max-w-2xl mx-auto">
          Calculate your Body Mass Index (BMI), Daily Caloric Expenditure (TDEE), and daily protein target for hypertrophy.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <BmiCalculatorWidget />
      </div>
    </div>
  );
};
