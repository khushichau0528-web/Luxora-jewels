import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, MapPin, KeyRound, ShieldAlert, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { UserRole } from '../../types';

export const AuthModal: React.FC = () => {
  const { activeModal, setActiveModal, login, register, showToast } = useStore();
  const [isRegister, setIsRegister] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('Customer');
  const [error, setError] = useState<string | null>(null);

  if (activeModal !== 'auth') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isRegister) {
      if (!fullName.trim() || !email.trim() || !password.trim()) {
        setError('Please complete all required fields.');
        return;
      }
      const res = register(fullName, email, password, role, phone);
      if (!res.success) {
        setError(res.message);
      }
    } else {
      const res = login(email, password);
      if (!res.success) {
        setError(res.message);
      }
    }
  };

  const handleQuickLogin = (demoRole: 'Admin' | 'Customer') => {
    if (demoRole === 'Admin') {
      login('admin@luxora.com', 'Password@123');
    } else {
      login('customer@luxora.com', 'Password@123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#12141c] border border-[#3b372b] rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#25231c] bg-[#161823]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#d4af37]/15 text-[#d4af37]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-luxury text-base text-white font-bold">
                {isRegister ? 'Create Collector Account' : 'Sign in to Luxora Vault'}
              </h3>
              <p className="text-[11px] text-[#888]">ASP.NET Identity & Role Management</p>
            </div>
          </div>
          <button
            id="close-auth-modal-btn"
            onClick={() => setActiveModal(null)}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Login Pills */}
        <div className="p-4 bg-[#171926] border-b border-[#25231c] space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#d4af37] block">
            1-Click Demo Profiles (Instant Verification):
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              id="btn-quick-admin-login"
              type="button"
              onClick={() => handleQuickLogin('Admin')}
              className="px-3 py-2 rounded-xl bg-[#232738] hover:bg-[#d4af37] hover:text-black text-white text-xs font-semibold transition-all text-left flex items-center gap-2"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#d4af37]" />
              <div>
                <span className="block font-bold">Admin Portal</span>
                <span className="text-[9px] opacity-70">admin@luxora.com</span>
              </div>
            </button>

            <button
              id="btn-quick-customer-login"
              type="button"
              onClick={() => handleQuickLogin('Customer')}
              className="px-3 py-2 rounded-xl bg-[#232738] hover:bg-[#d4af37] hover:text-black text-white text-xs font-semibold transition-all text-left flex items-center gap-2"
            >
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <div>
                <span className="block font-bold">Customer Profile</span>
                <span className="text-[9px] opacity-70">customer@luxora.com</span>
              </div>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {isRegister && (
            <div>
              <label className="block text-[#a9a7a0] mb-1 font-medium">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#777] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Lady Clara Ravenscroft"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#161824] border border-[#2d2a20] rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[#a9a7a0] mb-1 font-medium">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#777] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="client@luxora.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#161824] border border-[#2d2a20] rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#a9a7a0] mb-1 font-medium">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#777] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#161824] border border-[#2d2a20] rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          {isRegister && (
            <>
              <div>
                <label className="block text-[#a9a7a0] mb-1 font-medium">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#777] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2831"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#161824] border border-[#2d2a20] rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#a9a7a0] mb-1 font-medium">Account Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full bg-[#161824] border border-[#2d2a20] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Customer">Customer (Store Shopping & Orders)</option>
                  <option value="Admin">Administrator (Store Management)</option>
                </select>
              </div>
            </>
          )}

          <button
            id="btn-auth-submit"
            type="submit"
            className="w-full py-3 bg-[#d4af37] text-black font-bold uppercase tracking-wider rounded-xl hover:bg-[#c49f2b] transition-all shadow-md mt-2"
          >
            {isRegister ? 'Register Account' : 'Authenticate & Sign In'}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError(null);
              }}
              className="text-xs text-[#9d9b92] hover:text-[#d4af37] transition-colors"
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register as Customer or Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
