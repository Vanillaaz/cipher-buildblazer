import React, { useState } from 'react';
import { loginAdmin } from '../services/authService';

export interface LoginModalProps {
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = loginAdmin(username, password);
      setIsSubmitting(false);

      if (res.success) {
        onLoginSuccess();
      } else {
        setErrorMsg(res.message);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030504]/96 backdrop-blur-xl animate-fade-in select-none">
      <div className="relative w-full max-w-md bg-[#080C0A] border border-[#00FF66]/40 rounded-xs shadow-[0_0_60px_rgba(0,255,102,0.25)] overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/50 mb-2">
            <span className="font-mono text-2xl font-extrabold text-[#00FF66]">⚡</span>
          </div>
          <h1 className="font-mono text-xl font-bold text-white tracking-wider uppercase">
            CIPHER Admin Portal
          </h1>
          <p className="font-mono text-xs text-gray-400">
            // Protected Content Management System
          </p>
        </div>

        {/* Authentication Header Badge */}
        <div className="bg-[#050806] border border-[#00FF66]/20 p-2.5 rounded-xs font-mono text-[11px] text-[#00FF66] flex items-center justify-between font-bold">
          <span>[ SECURE SYSTEM AUTHENTICATION ]</span>
          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
        </div>

        {/* Error Feedback */}
        {errorMsg && (
          <div className="bg-red-950/60 border border-red-500/50 p-3 rounded-xs font-mono text-xs text-red-400 animate-shake">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          {/* Username */}
          <div className="space-y-1">
            <label className="block text-gray-300">ADMIN USERNAME</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="w-full bg-[#050806] border border-[#00FF66]/30 focus:border-[#00FF66] text-white px-3.5 py-2.5 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#00FF66] transition-colors"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-gray-300">PASSWORD</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[10px] text-[#00FF66]/80 hover:text-[#00FF66] focus:outline-none"
              >
                {showPassword ? '[ HIDE ]' : '[ SHOW ]'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#050806] border border-[#00FF66]/30 focus:border-[#00FF66] text-white px-3.5 py-2.5 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#00FF66] transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#00FF66] text-black font-bold uppercase rounded-xs hover:bg-[#00E65C] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,102,0.4)] active:scale-98 cursor-pointer mt-4"
          >
            {isSubmitting ? (
              <>
                <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                VERIFYING CREDENTIALS...
              </>
            ) : (
              'LOGIN TO DASHBOARD →'
            )}
          </button>
        </form>

        <div className="text-center font-mono text-[10px] text-gray-500 pt-2 border-t border-[#00FF66]/10">
          SJEC CSE Association &bull; CIPHER Content Management Portal
        </div>
      </div>
    </div>
  );
};
