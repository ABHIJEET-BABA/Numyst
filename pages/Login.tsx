import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Lock, User, AlertCircle } from 'lucide-react';
import { APP_NAME } from '../constants';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginAdmin } = useShop();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid aristocratic credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mysore-900 px-6 relative overflow-hidden">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-gold-600/5 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gold-600/5 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif tracking-[0.2em] text-gold-400 uppercase mb-2">{APP_NAME}</h2>
          <p className="text-stone-500 uppercase tracking-widest text-[10px]">Admin Access Protocol</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 bg-white/5 p-10 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-sm">
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-4 rounded-xl border border-red-400/20 animate-shake">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-gold-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Admin ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-stone-200 outline-none focus:border-gold-500/50 transition-all placeholder-stone-700"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-gold-500 transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="Access Key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-stone-200 outline-none focus:border-gold-500/50 transition-all placeholder-stone-700"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gold-600 hover:bg-gold-500 text-white py-4 rounded-2xl uppercase tracking-[0.3em] text-xs font-bold transition-all shadow-[0_0_20px_rgba(170,132,28,0.2)] hover:shadow-[0_0_30px_rgba(170,132,28,0.3)] active:scale-95"
          >
            Authenticate
          </button>
        </form>

        <p className="text-center mt-8 text-stone-600 text-[10px] uppercase tracking-widest">
          Secure Environment • Restricted Access
        </p>
      </div>
    </div>
  );
};