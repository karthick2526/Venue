import React, { useState } from 'react';
import { useEvent } from '../../context/EventContext';
import { Briefcase, Search, Plus, Star, Phone, Mail, CheckCircle2 } from 'lucide-react';

export const AdminVendorsPage: React.FC = () => {
  const { vendors } = useEvent();
  const [search, setSearch] = useState('');

  const filtered = vendors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>PARTNER ECOSYSTEM</span>
            <span>·</span>
            <span>{vendors.length} ACTIVE VENDORS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Manage Vendors
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit partner agreements, service categories, contact directories, and verified ratings.
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter vendors by name or category..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-mono uppercase tracking-wider text-slate-400">
              <th className="p-4 pl-6">Vendor Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Contact Info</th>
              <th className="p-4">Quoted Avg</th>
              <th className="p-4">Status</th>
              <th className="p-4 pr-6 text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs text-slate-300">
            {filtered.map(vendor => (
              <tr key={vendor.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 pl-6 font-semibold text-white">
                  {vendor.name}
                  {vendor.contactName && (
                    <span className="block text-[11px] text-slate-400 font-normal">
                      Lead: {vendor.contactName}
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/15 text-cyan-300">
                    {vendor.category}
                  </span>
                </td>
                <td className="p-4 text-slate-400 text-[11px]">
                  <div>{vendor.email}</div>
                  <div>{vendor.phone}</div>
                </td>
                <td className="p-4 font-mono font-bold text-white">
                  ${(vendor.quoteAmount || vendor.quotedCost || 0).toLocaleString()}
                </td>
                <td className="p-4 font-mono uppercase text-[11px] text-slate-300">
                  {vendor.status}
                </td>
                <td className="p-4 pr-6 text-right">
                  <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
