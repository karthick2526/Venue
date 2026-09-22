import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEvent } from '../../context/EventContext';
import { 
  Settings, 
  User, 
  Mail, 
  ShieldCheck, 
  Bell, 
  Globe, 
  Save, 
  Lock, 
  Check 
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useEvent();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currency, setCurrency] = useState('USD');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [gridSnap, setGridSnap] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateUser({ name, email });
      showToast('Settings saved successfully!');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
          <span>WORKSPACE CONFIGURATION</span>
          <span>·</span>
          <span>ACCOUNT & PREFERENCES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
          Settings
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage your account credentials, regional preferences, and visual canvas defaults.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Profile Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl font-bold text-purple-300">
                    {name ? name[0].toUpperCase() : 'U'}
                  </span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">{name}</h3>
              <p className="text-xs text-slate-400">{email}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 uppercase">
                  Role: {user?.role || 'Planner'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Preferences Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
          <h3 className="text-sm font-bold font-display text-white uppercase tracking-wider">
            Workspace Preferences
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div>
                <span className="font-semibold text-white block">Default Currency</span>
                <span className="text-slate-400">Budget items will display with this format</span>
              </div>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-[#0d1424] border border-white/10 text-white text-xs"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div>
                <span className="font-semibold text-white block">RSVP Email Notifications</span>
                <span className="text-slate-400">Receive alerts when guests update their attendance</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={e => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded bg-white/5 border-white/20 text-purple-600 focus:ring-purple-500 accent-purple-600"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div>
                <span className="font-semibold text-white block">2D Floor Plan Grid Snapping</span>
                <span className="text-slate-400">Calibrate placed tables to precise 10px intervals</span>
              </div>
              <input
                type="checkbox"
                checked={gridSnap}
                onChange={e => setGridSnap(e.target.checked)}
                className="w-4 h-4 rounded bg-white/5 border-white/20 text-purple-600 focus:ring-purple-500 accent-purple-600"
              />
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-purple-950/40 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save Changes'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
