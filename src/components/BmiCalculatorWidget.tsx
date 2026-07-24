import React, { useState } from 'react';
import { Calculator, Activity, Flame, RefreshCw } from 'lucide-react';

export const BmiCalculatorWidget: React.FC = () => {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<number>(1.55);

  const heightMeters = height / 100;
  const bmi = parseFloat((weight / (heightMeters * heightMeters)).toFixed(1));
  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = Math.round(bmr * activity);
  const proteinGoal = Math.round(weight * 2.0);

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/30' };
    if (val <= 24.9) return { label: 'Normal Weight (Optimal)', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    if (val <= 29.9) return { label: 'Overweight', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' };
    return { label: 'Obese (Action Needed)', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' };
  };
  const category = getBmiCategory(bmi);

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#e8272a]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#e8272a]/15 border border-[#e8272a]/30 flex items-center justify-center text-[#e8272a]">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide">FITNESS & MACRO CALCULATOR</h3>
          <p className="text-xs text-neutral-400">Calculate your BMI, Daily Caloric Needs & Protein Target</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-neutral-400 font-medium mb-2">GENDER</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setGender('male')} className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${gender === 'male' ? 'bg-[#e8272a] text-white shadow-md shadow-red-500/20' : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'}`}>Male</button>
                <button onClick={() => setGender('female')} className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${gender === 'female' ? 'bg-[#e8272a] text-white shadow-md shadow-red-500/20' : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'}`}>Female</button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-neutral-400 font-medium mb-2">AGE (Years)</label>
              <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} min={12} max={90} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#e8272a] font-semibold" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 text-xs">
              <span className="text-neutral-400">WEIGHT</span>
              <span className="text-[#e8272a] font-bold text-base">{weight} kg</span>
            </div>
            <input type="range" min={40} max={150} value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 text-xs">
              <span className="text-neutral-400">HEIGHT</span>
              <span className="text-[#e8272a] font-bold text-base">{height} cm</span>
            </div>
            <input type="range" min={130} max={220} value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer" />
          </div>

          <div>
            <label className="block text-xs text-neutral-400 font-medium mb-2">ACTIVITY LEVEL</label>
            <select value={activity} onChange={(e) => setActivity(Number(e.target.value))} className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a] font-medium">
              <option value={1.2}>Sedentary (Little or no exercise)</option>
              <option value={1.375}>Lightly Active (1-3 gym days/week)</option>
              <option value={1.55}>Moderately Active (3-5 intense workouts)</option>
              <option value={1.725}>Very Active (6-7 heavy lifting days)</option>
            </select>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 relative">
          <div className="space-y-6">
            <div className="text-center pb-5 border-b border-neutral-800">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">YOUR BMI INDEX</span>
              <div className="font-heading text-5xl sm:text-6xl text-white mt-1">{bmi}</div>
              <div className={`mt-2 inline-block px-4 py-1 rounded-full text-xs font-bold border ${category.bg} ${category.color}`}>{category.label}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0a0a0a] p-4 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2 text-[#e8272a] text-xs font-medium mb-1"><Flame className="w-4 h-4" /><span>CALORIC GOAL</span></div>
                <div className="font-heading text-2xl text-white">{tdee} <span className="text-xs text-neutral-400 font-sans">kcal/day</span></div>
              </div>
              <div className="bg-[#0a0a0a] p-4 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2 text-[#ff1e1e] text-xs font-medium mb-1"><Activity className="w-4 h-4" /><span>PROTEIN TARGET</span></div>
                <div className="font-heading text-2xl text-white">{proteinGoal} <span className="text-xs text-neutral-400 font-sans">grams/day</span></div>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">Recommendations calculated for hypertrophy and lean muscle maintenance.</p>
          </div>
          <button onClick={() => { setWeight(70); setHeight(175); setAge(25); }} className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-neutral-400 hover:text-[#e8272a] transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /><span>Reset Values</span>
          </button>
        </div>
      </div>
    </div>
  );
};
