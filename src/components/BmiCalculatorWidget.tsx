import React, { useState } from 'react';
import {
  Calculator,
  Activity,
  Flame,
  RefreshCw,
  Droplets,
  Dumbbell,
  Scale,
  Zap,
  Check,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const BmiCalculatorWidget: React.FC = () => {
  // Global Inputs State
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [activeTab, setActiveTab] = useState<'bmi' | 'macros' | 'hydration' | 'onerm'>('bmi');

  // Body Metrics
  const [weightKg, setWeightKg] = useState<number>(72);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [age, setAge] = useState<number>(26);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<number>(1.55);
  const [fitnessGoal, setFitnessGoal] = useState<'cut' | 'maintain' | 'bulk'>('maintain');

  // Imperial Helpers
  const weightLbs = Math.round(weightKg * 2.20462);
  const totalInches = Math.round(heightCm / 2.54);
  const heightFeet = Math.floor(totalInches / 12);
  const heightRemainingInches = totalInches % 12;

  // 1-Rep Max Inputs
  const [liftWeight, setLiftWeight] = useState<number>(100);
  const [liftReps, setLiftReps] = useState<number>(5);

  // Calculations
  const heightMeters = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightMeters * heightMeters)).toFixed(1));

  // Mifflin-St Jeor BMR Formula
  const bmr = Math.round(
    gender === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161
  );

  // Total Daily Energy Expenditure (TDEE)
  const tdee = Math.round(bmr * activity);

  // Target Calories based on Goal
  let targetCalories = tdee;
  if (fitnessGoal === 'cut') targetCalories = Math.max(1200, tdee - 500);
  if (fitnessGoal === 'bulk') targetCalories = tdee + 350;

  // Macro Calculation (Protein 2.2g/kg for lifters, Fat 0.9g/kg, rest Carbs)
  const proteinGrams = Math.round(weightKg * 2.2);
  const fatGrams = Math.round(weightKg * 0.9);
  const proteinCalories = proteinGrams * 4;
  const fatCalories = fatGrams * 9;
  const carbCalories = Math.max(0, targetCalories - (proteinCalories + fatCalories));
  const carbGrams = Math.round(carbCalories / 4);

  // Daily Water Requirement (Liters)
  const dailyWaterLiters = (weightKg * 0.035 + (activity > 1.4 ? 0.75 : 0.4)).toFixed(1);
  const waterGlasses = Math.round(parseFloat(dailyWaterLiters) * 4); // 250ml per glass

  // 1-Rep Max (Brzycki Formula)
  const oneRepMax = Math.round(liftWeight / (1.0278 - 0.0278 * liftReps));

  // BMI Category & Styling
  const getBmiCategory = (val: number) => {
    if (val < 18.5) {
      return { label: 'Underweight', color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/30', percentage: 18 };
    }
    if (val <= 24.9) {
      return { label: 'Normal Weight (Optimal)', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30', percentage: 48 };
    }
    if (val <= 29.9) {
      return { label: 'Overweight', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30', percentage: 75 };
    }
    return { label: 'Obese (Action Recommended)', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30', percentage: 95 };
  };

  const category = getBmiCategory(bmi);

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-neutral-800 shadow-2xl relative overflow-hidden space-y-8">
      {/* GLOW DECORATION */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#e8272a]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* HEADER & TOP CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#e8272a]/15 border border-[#e8272a]/30 flex items-center justify-center text-[#e8272a]">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide">BEAST BODY & FITNESS CALCULATOR</h3>
            <p className="text-xs text-neutral-400">Precision metrics for BMI, TDEE, Macros, Hydration & 1-Rep Max</p>
          </div>
        </div>

        {/* METRIC / IMPERIAL TOGGLE */}
        <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-full self-start md:self-auto">
          <button
            onClick={() => setUnitSystem('metric')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              unitSystem === 'metric' ? 'bg-[#e8272a] text-white shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            METRIC (KG / CM)
          </button>
          <button
            onClick={() => setUnitSystem('imperial')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              unitSystem === 'imperial' ? 'bg-[#e8272a] text-white shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            IMPERIAL (LBS / FT)
          </button>
        </div>
      </div>

      {/* TABS SELECTOR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-neutral-900/90 p-1.5 rounded-2xl border border-neutral-800">
        <button
          onClick={() => setActiveTab('bmi')}
          className={`py-3 px-4 rounded-xl text-xs font-heading tracking-wider flex items-center justify-center gap-2 transition-all ${
            activeTab === 'bmi'
              ? 'bg-[#e8272a] text-white font-bold shadow-lg shadow-red-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>BMI & TDEE</span>
        </button>

        <button
          onClick={() => setActiveTab('macros')}
          className={`py-3 px-4 rounded-xl text-xs font-heading tracking-wider flex items-center justify-center gap-2 transition-all ${
            activeTab === 'macros'
              ? 'bg-[#e8272a] text-white font-bold shadow-lg shadow-red-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>MACROS & GOALS</span>
        </button>

        <button
          onClick={() => setActiveTab('hydration')}
          className={`py-3 px-4 rounded-xl text-xs font-heading tracking-wider flex items-center justify-center gap-2 transition-all ${
            activeTab === 'hydration'
              ? 'bg-[#e8272a] text-white font-bold shadow-lg shadow-red-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
          }`}
        >
          <Droplets className="w-4 h-4" />
          <span>HYDRATION</span>
        </button>

        <button
          onClick={() => setActiveTab('onerm')}
          className={`py-3 px-4 rounded-xl text-xs font-heading tracking-wider flex items-center justify-center gap-2 transition-all ${
            activeTab === 'onerm'
              ? 'bg-[#e8272a] text-white font-bold shadow-lg shadow-red-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span>1-REP MAX (1RM)</span>
        </button>
      </div>

      {/* CALCULATOR MAIN CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT PARAMETERS COLUMN */}
        <div className="lg:col-span-6 space-y-6">
          {activeTab !== 'onerm' ? (
            <>
              {/* GENDER & AGE */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-2">GENDER</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                        gender === 'male'
                          ? 'bg-[#e8272a] text-white shadow-md'
                          : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      MALE
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                        gender === 'female'
                          ? 'bg-[#e8272a] text-white shadow-md'
                          : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      FEMALE
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-2">AGE (Years)</label>
                  <input
                    type="number"
                    min={12}
                    max={90}
                    value={age}
                    onChange={(e) => setAge(Math.max(12, Math.min(90, Number(e.target.value))))}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-[#e8272a]"
                  />
                </div>
              </div>

              {/* WEIGHT SLIDER */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">BODY WEIGHT</span>
                  <span className="text-[#e8272a] font-heading text-xl">
                    {unitSystem === 'metric' ? `${weightKg} kg` : `${weightLbs} lbs`}
                  </span>
                </div>
                <input
                  type="range"
                  min={35}
                  max={160}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#e8272a]"
                />
              </div>

              {/* HEIGHT SLIDER */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">HEIGHT</span>
                  <span className="text-[#e8272a] font-heading text-xl">
                    {unitSystem === 'metric'
                      ? `${heightCm} cm`
                      : `${heightFeet}' ${heightRemainingInches}"`}
                  </span>
                </div>
                <input
                  type="range"
                  min={120}
                  max={220}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#e8272a]"
                />
              </div>

              {/* ACTIVITY LEVEL SELECTOR */}
              <div>
                <label className="block text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-2">
                  DAILY ACTIVITY LEVEL
                </label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white font-semibold focus:outline-none focus:border-[#e8272a]"
                >
                  <option value={1.2}>Sedentary (Office desk job, minimal exercise)</option>
                  <option value={1.375}>Lightly Active (1-3 gym workouts/week)</option>
                  <option value={1.55}>Moderately Active (3-5 intense gym sessions)</option>
                  <option value={1.725}>Very Active (6-7 heavy lifting/athlete days)</option>
                </select>
              </div>

              {/* FITNESS GOAL SELECTOR */}
              {activeTab === 'macros' && (
                <div>
                  <label className="block text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-2">
                    PRIMARY FITNESS GOAL
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFitnessGoal('cut')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                        fitnessGoal === 'cut'
                          ? 'bg-[#e8272a] border-[#e8272a] text-white shadow-md'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      FAT LOSS (-500 kcal)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFitnessGoal('maintain')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                        fitnessGoal === 'maintain'
                          ? 'bg-[#e8272a] border-[#e8272a] text-white shadow-md'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      MAINTAIN
                    </button>
                    <button
                      type="button"
                      onClick={() => setFitnessGoal('bulk')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                        fitnessGoal === 'bulk'
                          ? 'bg-[#e8272a] border-[#e8272a] text-white shadow-md'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      BULKING (+350 kcal)
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* 1-REP MAX (1RM) INPUTS */
            <div className="space-y-6">
              <div>
                <label className="block text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-2">
                  WEIGHT LIFTED ({unitSystem === 'metric' ? 'KG' : 'LBS'})
                </label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={liftWeight}
                  onChange={(e) => setLiftWeight(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-lg font-heading text-white focus:outline-none focus:border-[#e8272a]"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-2">
                  REPETITIONS COMPLETED (1 TO 12 REPS)
                </label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={liftReps}
                  onChange={(e) => setLiftReps(Math.max(1, Math.min(12, Number(e.target.value))))}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-lg font-heading text-white focus:outline-none focus:border-[#e8272a]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2 text-xs text-neutral-400">
                <span className="font-bold text-white uppercase block">Brzycki Formula Guidance</span>
                <p>1RM calculations are accurate for rep ranges between 1 and 10. Warm up thoroughly before attempting heavy single attempts.</p>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setWeightKg(72);
                setHeightCm(175);
                setAge(26);
                setLiftWeight(100);
                setLiftReps(5);
              }}
              className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-[#e8272a] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* RESULTS & BREAKDOWN COLUMN */}
        <div className="lg:col-span-6 bg-neutral-950/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative">
          {activeTab === 'bmi' && (
            <div className="space-y-6">
              <div className="text-center pb-6 border-b border-neutral-800">
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-1">YOUR BODY MASS INDEX (BMI)</span>
                <div className="font-heading text-6xl sm:text-7xl text-white">{bmi}</div>
                <div className={`mt-3 inline-block px-4 py-1.5 rounded-full text-xs font-bold border ${category.bg} ${category.color}`}>
                  {category.label}
                </div>
              </div>

              {/* BMI VISUAL GAUGE BAR */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                  <span>Under (18.5)</span>
                  <span>Normal (24.9)</span>
                  <span>Over (29.9)</span>
                  <span>Obese (30+)</span>
                </div>
                <div className="h-3 w-full bg-neutral-900 rounded-full overflow-hidden flex relative border border-neutral-800">
                  <div className="w-1/4 bg-sky-500/40"></div>
                  <div className="w-1/4 bg-emerald-500/40"></div>
                  <div className="w-1/4 bg-amber-500/40"></div>
                  <div className="w-1/4 bg-red-500/40"></div>
                  <div
                    className="absolute top-0 bottom-0 w-2.5 bg-white shadow-lg border border-black rounded-full transition-all duration-300 transform -translate-x-1/2"
                    style={{ left: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-neutral-900/90 p-4 rounded-2xl border border-neutral-800">
                  <div className="flex items-center gap-2 text-[#e8272a] text-xs font-bold mb-1">
                    <Flame className="w-4 h-4" />
                    <span>DAILY TDEE</span>
                  </div>
                  <div className="font-heading text-3xl text-white">
                    {tdee} <span className="text-xs text-neutral-400 font-sans">kcal/day</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 block mt-1">Maintenance Level</span>
                </div>

                <div className="bg-neutral-900/90 p-4 rounded-2xl border border-neutral-800">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                    <Activity className="w-4 h-4" />
                    <span>BASE BMR</span>
                  </div>
                  <div className="font-heading text-3xl text-white">
                    {bmr} <span className="text-xs text-neutral-400 font-sans">kcal/day</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 block mt-1">At Complete Rest</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'macros' && (
            <div className="space-y-6">
              <div className="text-center pb-6 border-b border-neutral-800">
                <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold block mb-1">TARGET CALORIES FOR YOUR GOAL</span>
                <div className="font-heading text-6xl sm:text-7xl text-white">{targetCalories} <span className="text-xl text-neutral-400 font-sans">kcal</span></div>
                <span className="text-xs text-neutral-400 uppercase tracking-wider font-bold mt-1 block">
                  GOAL: {fitnessGoal === 'cut' ? 'Fat Loss & Shredding' : fitnessGoal === 'bulk' ? 'Lean Mass Bulking' : 'Weight Maintenance'}
                </span>
              </div>

              {/* MACROS BREAKDOWN CARDS */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-neutral-900/90 p-3.5 rounded-2xl border border-neutral-800 text-center">
                  <span className="text-[10px] text-[#e8272a] font-bold uppercase block">PROTEIN</span>
                  <div className="font-heading text-2xl text-white mt-1">{proteinGrams}g</div>
                  <span className="text-[10px] text-neutral-400 block">{proteinCalories} kcal</span>
                </div>

                <div className="bg-neutral-900/90 p-3.5 rounded-2xl border border-neutral-800 text-center">
                  <span className="text-[10px] text-amber-400 font-bold uppercase block">CARBS</span>
                  <div className="font-heading text-2xl text-white mt-1">{carbGrams}g</div>
                  <span className="text-[10px] text-neutral-400 block">{carbCalories} kcal</span>
                </div>

                <div className="bg-neutral-900/90 p-3.5 rounded-2xl border border-neutral-800 text-center">
                  <span className="text-[10px] text-sky-400 font-bold uppercase block">FATS</span>
                  <div className="font-heading text-2xl text-white mt-1">{fatGrams}g</div>
                  <span className="text-[10px] text-neutral-400 block">{fatCalories} kcal</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hydration' && (
            <div className="space-y-6 text-center">
              <div className="pb-6 border-b border-neutral-800">
                <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold block mb-1">RECOMMENDED DAILY WATER INTAKE</span>
                <div className="font-heading text-6xl sm:text-7xl text-white">{dailyWaterLiters} <span className="text-xl text-neutral-400 font-sans">Liters</span></div>
                <span className="text-xs text-neutral-400 uppercase tracking-wider font-bold mt-1 block">
                  Approx. {waterGlasses} Standard Glasses (250ml) per day
                </span>
              </div>

              <div className="bg-neutral-900/90 p-6 rounded-2xl border border-neutral-800 space-y-3 text-left">
                <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase">
                  <Droplets className="w-4 h-4" />
                  <span>Hydration Tips for Athletes</span>
                </div>
                <ul className="text-xs text-neutral-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span>Drink 500ml of water 30 minutes before heavy lifting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span>Sip electrolytes during intense boxing or sauna sessions.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'onerm' && (
            <div className="space-y-6 text-center">
              <div className="pb-6 border-b border-neutral-800">
                <span className="text-xs uppercase tracking-widest text-[#e8272a] font-semibold block mb-1">ESTIMATED 1-REP MAX (1RM)</span>
                <div className="font-heading text-6xl sm:text-7xl text-white">
                  {oneRepMax} <span className="text-xl text-neutral-400 font-sans">{unitSystem === 'metric' ? 'kg' : 'lbs'}</span>
                </div>
              </div>

              {/* REP PERCENTAGE TABLE */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block">95% 1RM (2 Reps)</span>
                  <span className="font-heading text-lg text-white">{Math.round(oneRepMax * 0.95)} {unitSystem === 'metric' ? 'kg' : 'lbs'}</span>
                </div>
                <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block">90% 1RM (4 Reps)</span>
                  <span className="font-heading text-lg text-white">{Math.round(oneRepMax * 0.90)} {unitSystem === 'metric' ? 'kg' : 'lbs'}</span>
                </div>
                <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block">85% 1RM (6 Reps)</span>
                  <span className="font-heading text-lg text-white">{Math.round(oneRepMax * 0.85)} {unitSystem === 'metric' ? 'kg' : 'lbs'}</span>
                </div>
              </div>
            </div>
          )}

          {/* CTA TO CONSULT COACH */}
          <div className="pt-4 border-t border-neutral-800">
            <Link
              to="/apply?plan=trial"
              className="w-full py-3.5 px-6 rounded-2xl bg-[#e8272a] text-white font-heading text-sm hover:bg-[#ff1e1e] transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 group"
            >
              <span>CLAIM FREE TRIAL PASS & COACH CONSULTATION</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
