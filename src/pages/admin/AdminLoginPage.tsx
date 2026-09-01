import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import logoImg from '../../assets/images/logo.png';

export const AdminLoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4">
      <div className="glass-panel max-w-md w-full p-8 rounded-3xl border border-neutral-800 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#e8272a]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[#e8272a]/15 border border-[#e8272a]/30 flex items-center justify-center mx-auto text-[#e8272a]">
            <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="font-heading text-4xl text-white">BEAST FACTORY <span className="text-[#e8272a]">ADMIN</span></h1>
          <p className="text-xs text-neutral-400">Enter administrator credentials to access management portal.</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#e8272a]" /> ADMIN PASSWORD
            </label>
            <input
              type="password"
              required
              placeholder="Enter admin password (default: beast2026)"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]"
            />
            {error && (
              <p className="text-xs text-red-400 mt-2 font-semibold">Invalid password. Try "beast2026" or "admin".</p>
            )}
          </div>

          <button type="submit" className="w-full py-3.5 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold hover:bg-[#ff1e1e] flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-500/20">
            <span>AUTHENTICATE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-neutral-900 text-center">
          <p className="text-[10px] text-neutral-500 uppercase tracking-widest flex items-center justify-center gap-1">
            <Shield className="w-3 h-3 text-emerald-500" /> Protected Operations Gateway
          </p>
        </div>
      </div>
    </div>
  );
};
