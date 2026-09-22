import React, { useState } from 'react';
import { Settings, ShieldCheck, Database, Save, Check } from 'lucide-react';
import { useEvent } from '../../context/EventContext';

export const AdminSettingsPage: React.FC = () => {
  const { showToast } = useEvent();
  const [platformFeePercent, setPlatformFeePercent] = useState(3.5);
  const [allowInstantBookings, setAllowInstantBookings] = useState(true);
  const [requireVendorVerification, setRequireVendorVerification] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Platform configurations updated!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-4 border-b border-white/5">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <span>SYSTEM CONTROLS</span>
          <span>·</span>
          <span>GLOBAL PLATFORM RULES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
          Platform Settings
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure transaction fees, vendor verification requirements, and global marketplace defaults.
        </p>
      </div>

      <form onSubmit={handleSave} className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div>
              <span className="font-semibold text-white block">Platform Booking Commission (%)</span>
              <span className="text-slate-400">Percentage charged per venue reservation transaction</span>
            </div>
            <input
              type="number"
              step="0.1"
              value={platformFeePercent}
              onChange={e => setPlatformFeePercent(Number(e.target.value))}
              className="w-20 px-3 py-1.5 rounded-lg bg-[#0d1424] border border-white/10 text-white font-mono text-xs text-right"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div>
              <span className="font-semibold text-white block">Require Vendor Background Verification</span>
              <span className="text-slate-400">Only verified vendors are showcased in the discovery catalog</span>
            </div>
            <input
              type="checkbox"
              checked={requireVendorVerification}
              onChange={e => setRequireVendorVerification(e.target.checked)}
              className="w-4 h-4 rounded bg-white/5 border-white/20 text-cyan-600 focus:ring-cyan-500 accent-cyan-600"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div>
              <span className="font-semibold text-white block">Allow Instant Venue Inquiries</span>
              <span className="text-slate-400">Enable direct calendar hold requests for certified properties</span>
            </div>
            <input
              type="checkbox"
              checked={allowInstantBookings}
              onChange={e => setAllowInstantBookings(e.target.checked)}
              className="w-4 h-4 rounded bg-white/5 border-white/20 text-cyan-600 focus:ring-cyan-500 accent-cyan-600"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div>
              <span className="font-semibold text-white block text-amber-300">Maintenance Mode</span>
              <span className="text-slate-400">Restricts user workspace writes during database schema updates</span>
            </div>
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={e => setMaintenanceMode(e.target.checked)}
              className="w-4 h-4 rounded bg-white/5 border-white/20 text-amber-600 focus:ring-amber-500 accent-amber-600"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-cyan-950/40 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Configurations</span>
          </button>
        </div>
      </form>
    </div>
  );
};
