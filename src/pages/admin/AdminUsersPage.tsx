import React, { useState } from 'react';
import { Users, Search, Shield, UserCheck, Mail, Calendar } from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 'usr_1', name: 'Alexander Wright', email: 'alexander@venueflow.com', role: 'admin', joined: '2025-01-10', eventsCount: 4, status: 'active' },
    { id: 'usr_2', name: 'Elena Rostova', email: 'elena.r@luxuryevents.io', role: 'planner', joined: '2025-03-12', eventsCount: 7, status: 'active' },
    { id: 'usr_3', name: 'Marcus Sterling', email: 'marcus@sterlingholdings.com', role: 'host', joined: '2025-04-20', eventsCount: 2, status: 'active' },
    { id: 'usr_4', name: 'Sophia Chen', email: 'sophia@aurora-design.co', role: 'planner', joined: '2025-05-18', eventsCount: 5, status: 'active' },
    { id: 'usr_5', name: 'David Miller', email: 'david.m@apextech.com', role: 'host', joined: '2025-07-02', eventsCount: 1, status: 'active' },
  ]);

  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>MEMBERSHIP DIRECTORY</span>
            <span>·</span>
            <span>{users.length} REGISTERED ACCOUNTS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Manage Users & Permissions
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            View planners, event hosts, and platform administrators.
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-mono uppercase tracking-wider text-slate-400">
              <th className="p-4 pl-6">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Active Events</th>
              <th className="p-4">Joined Date</th>
              <th className="p-4 pr-6 text-right">Account State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs text-slate-300">
            {filtered.map(u => (
              <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 pl-6 font-semibold text-white">
                  <div>{u.name}</div>
                  <div className="text-[11px] text-slate-500 font-normal">{u.email}</div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                    u.role === 'admin' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-purple-500/20 text-purple-300'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4 font-mono">{u.eventsCount} Projects</td>
                <td className="p-4 font-mono text-slate-400">{u.joined}</td>
                <td className="p-4 pr-6 text-right">
                  <span className="text-emerald-400 font-bold text-xs">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
