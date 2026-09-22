import React, { useState } from 'react';
import { useEvent } from '../../context/EventContext';
import { CalendarDays, Search, Users, Coins, MapPin, CheckCircle } from 'lucide-react';

export const AdminEventsPage: React.FC = () => {
  const { events } = useEvent();
  const [search, setSearch] = useState('');

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.eventType.toLowerCase().includes(search.toLowerCase()) ||
    (e.venueName && e.venueName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>PIPELINE TELEMETRY</span>
            <span>·</span>
            <span>{events.length} TOTAL PLATFORM CELEBRATIONS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            All Events Pipeline
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit live events across all registered hosts, assigned venues, and budget allocations.
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by title, event type, or venue..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-mono uppercase tracking-wider text-slate-400">
              <th className="p-4 pl-6">Event Title & Type</th>
              <th className="p-4">Target Date</th>
              <th className="p-4">Linked Venue</th>
              <th className="p-4">Target Guests</th>
              <th className="p-4">Total Budget</th>
              <th className="p-4 pr-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs text-slate-300">
            {filtered.map(ev => (
              <tr key={ev.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 pl-6 font-semibold text-white">
                  <div>{ev.title}</div>
                  <span className="text-[10px] font-mono uppercase text-cyan-400">{ev.eventType}</span>
                </td>
                <td className="p-4 font-mono text-slate-300">{ev.date}</td>
                <td className="p-4 text-slate-300">
                  {ev.venueName || <span className="text-slate-500 italic">Unassigned</span>}
                </td>
                <td className="p-4 font-mono font-bold text-white">
                  {ev.guestTargetCount} Pax
                </td>
                <td className="p-4 font-mono font-bold text-cyan-300">
                  ${ev.totalBudget.toLocaleString()}
                </td>
                <td className="p-4 pr-6 text-right">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 font-bold">
                    Active
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
