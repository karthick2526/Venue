import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvent } from '../../context/EventContext';
import { User, Mail, Lock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { EventType } from '../../types';

export const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const { showToast } = useEvent();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [eventType, setEventType] = useState<EventType>('Wedding');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter your email');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if (!agreedToTerms) {
      setErrorMessage('Please accept the Terms of Service and Privacy Policy');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await signup(fullName, email, password, eventType);
      if (res.success) {
        showToast('Your VenueFlow account is ready! Welcome.');
        navigate('/overview');
      } else {
        setErrorMessage(res.error || 'Registration failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080b13] relative flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      
      {/* Twilight Reception Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=80"
          alt="Atmospheric venue setup"
          className="w-full h-full object-cover filter brightness-[0.28] contrast-[1.15]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b13] via-[#080b13]/70 to-[#080b13]/40" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        
        {/* Brand header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#080b13] rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight font-display text-white">
              VENUE<span className="text-purple-400">FLOW</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 mt-1">
            Where your event stories come to life.
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-panel-glow rounded-3xl p-7 sm:p-9 border border-white/15 bg-[#0b101e]/92 shadow-2xl backdrop-blur-2xl">
          
          <div className="mb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400">
              CREATE YOUR ACCOUNT
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
              Start Your Event Journey
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Unify venue selection, 2D floor plans, guests, and budget.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/70 border border-rose-800/50 text-rose-200 text-xs">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Sterling"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            {/* Primary Event Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Primary Event Type
              </label>
              <select
                value={eventType}
                onChange={e => setEventType(e.target.value as EventType)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0d1424] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="Wedding">Wedding</option>
                <option value="Corporate">Corporate Summit</option>
                <option value="Birthday">Milestone Birthday</option>
                <option value="Academic">Academic Symposium</option>
                <option value="Social">Social / Charity Gala</option>
                <option value="Entertainment">Entertainment / Concert</option>
                <option value="Other">Other Bespoke Event</option>
              </select>
            </div>

            {/* Password and Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Terms & Privacy */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-400 select-none">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={e => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 rounded bg-white/5 border-white/20 text-purple-600 focus:ring-purple-500 accent-purple-600"
                />
                <span>
                  I agree to the <span className="text-purple-400 hover:underline">Terms of Service</span> and <span className="text-purple-400 hover:underline">Privacy Policy</span>.
                </span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-xl shadow-purple-950/50 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>

          <div className="mt-6 pt-4 border-t border-white/5 text-center text-xs text-slate-400">
            <span>Already have an account? </span>
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-2">
              Sign in instead
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};
