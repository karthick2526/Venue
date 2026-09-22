import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvent } from '../../context/EventContext';
import { Lock, Mail, Eye, EyeOff, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { showToast } = useEvent();
  const navigate = useNavigate();

  const [email, setEmail] = useState('karthick@venueflow.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        showToast('Welcome back to VenueFlow!');
        navigate('/overview');
      } else {
        setErrorMessage(res.error || 'Invalid credentials');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = (type: 'karthick' | 'admin') => {
    if (type === 'karthick') {
      setEmail('karthick@venueflow.com');
      setPassword('password123');
    } else {
      setEmail('admin@venueflow.com');
      setPassword('admin123');
    }
  };

  return (
    <div className="min-h-screen bg-[#080b13] relative flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      
      {/* Cinematic Twilight Venue Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=80"
          alt="VenueFlow Twilight Atmosphere"
          className="w-full h-full object-cover filter brightness-[0.32] contrast-[1.15]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b13] via-[#080b13]/70 to-[#080b13]/40" />
        <div className="absolute inset-0 bg-radial from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Main Form Center Panel */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* Brand Link */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#080b13] rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight font-display text-white">
              VENUE<span className="text-purple-400">FLOW</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 mt-1">
            Plan the place. Create the moment.
          </p>
        </div>

        {/* Glass Card */}
        <div className="glass-panel-glow rounded-3xl p-7 sm:p-8 border border-white/15 bg-[#0b101e]/90 shadow-2xl backdrop-blur-2xl">
          
          <div className="mb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400">
              WELCOME BACK
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
              Sign In to Your Journey
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Access your connected event workspace and 2D spatial plans.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800/50 text-rose-200 text-xs">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => showToast('Demo password is: password123', 'info')}
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded bg-white/5 border-white/20 text-purple-600 focus:ring-purple-500 accent-purple-600"
                />
                <span>Remember this device</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-xl shadow-purple-950/50 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Signing in...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>

          {/* Demo quick accounts */}
          <div className="mt-6 pt-4 border-t border-white/10 space-y-2 text-center">
            <span className="text-[11px] text-slate-400 block">Quick Demo Logins:</span>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handleFillDemo('karthick')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-purple-300 transition-colors"
              >
                Host (Karthick)
              </button>
              <button
                onClick={() => handleFillDemo('admin')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-cyan-300 transition-colors"
              >
                Admin User
              </button>
            </div>
          </div>

          {/* Footer Link */}
          <div className="mt-6 pt-4 border-t border-white/5 text-center text-xs text-slate-400">
            <span>Don't have an account yet? </span>
            <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-2">
              Create an account
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};
