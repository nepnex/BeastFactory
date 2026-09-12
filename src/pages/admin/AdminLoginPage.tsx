import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Shield, ArrowRight, Mail } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import logoImg from '../../assets/images/logo.png';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    try {
      const res = await login(email || 'admin@beastfactory.com', password);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setErrorMessage(res.error || 'Authentication failed. Invalid credentials.');
      }
    } catch (err: any) {
      setErrorMessage('An unexpected authentication error occurred.');
    } finally {
      setSubmitting(false);
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
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-semibold text-center">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#e8272a]" /> ADMIN EMAIL / USERNAME
            </label>
            <input
              type="text"
              required
              placeholder="e.g. admin@beastfactory.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrorMessage(''); }}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#e8272a]" /> PASSWORD
            </label>
            <input
              type="password"
              required
              placeholder="Enter your admin password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrorMessage(''); }}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8272a]"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-[#e8272a] text-white font-heading text-lg font-bold hover:bg-[#ff1e1e] flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-500/20 disabled:opacity-50"
          >
            <span>{submitting ? 'AUTHENTICATING...' : 'AUTHENTICATE'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-neutral-900 text-center">
          <p className="text-[10px] text-neutral-500 uppercase tracking-widest flex items-center justify-center gap-1">
            <Shield className="w-3 h-3 text-emerald-500" /> Protected Operations Gateway • Supabase Auth
          </p>
        </div>
      </div>
    </div>
  );
};
