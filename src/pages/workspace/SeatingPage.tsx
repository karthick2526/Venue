import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEvent } from '../../context/EventContext';
import { api } from '../../services/api';
import { Guest } from '../../types';
import { 
  Armchair, 
  Users, 
  Layers, 
  Plus, 
  UserMinus, 
  Sparkles, 
  Check, 
  ChevronDown, 
  Search,
  ArrowRight
} from 'lucide-react';

export const SeatingPage: React.FC = () => {
  const { activeEvent, layout, guests, refreshData, showToast } = useEvent();
  const [selectedTable, setSelectedTable] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract tables from layout elements
  const layoutTables = layout?.elements.filter(el => el.type.startsWith('table')) || [
    { id: 't1', type: 'table-round', label: 'VIP Table 1', capacity: 10, x: 0, y: 0, width: 80, height: 80, rotation: 0 },
    { id: 't2', type: 'table-round', label: 'VIP Table 2', capacity: 10, x: 0, y: 0, width: 80, height: 80, rotation: 0 },
    { id: 't3', type: 'table-round', label: 'Family East', capacity: 10, x: 0, y: 0, width: 80, height: 80, rotation: 0 },
    { id: 't4', type: 'table-round', label: 'Family West', capacity: 10, x: 0, y: 0, width: 80, height: 80, rotation: 0 },
    { id: 't5', type: 'table-round', label: 'Colleagues', capacity: 10, x: 0, y: 0, width: 80, height: 80, rotation: 0 },
    { id: 't6', type: 'table-round', label: 'Friends', capacity: 10, x: 0, y: 0, width: 80, height: 80, rotation: 0 },
  ];

  // Attending guests
  const attendingGuests = guests.filter(g => g.rsvpStatus === 'attending');
  const unassignedGuests = attendingGuests.filter(g => !g.tableAssignment);
  const totalSeated = attendingGuests.filter(g => g.tableAssignment).length;

  const handleAssign = async (guestId: string, tableName: string) => {
    await api.updateGuest(guestId, { tableAssignment: tableName });
    await refreshData();
    showToast(`Assigned guest to ${tableName}`);
  };

  const handleUnassign = async (guestId: string) => {
    await api.updateGuest(guestId, { tableAssignment: undefined });
    await refreshData();
    showToast('Unassigned guest from table');
  };

  const filteredTables = selectedTable === 'All' 
    ? layoutTables 
    : layoutTables.filter(t => t.label === selectedTable);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>SEATING ARCHITECTURE</span>
            <span>·</span>
            <span>{totalSeated} / {attendingGuests.length} CONFIRMED GUESTS SEATED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Table Seating Arrangement
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Assign confirmed guests to specific tables calibrated from your 2D space planner.
          </p>
        </div>

        <Link
          to="/planner"
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center gap-2 self-start sm:self-auto shadow-md shadow-purple-950/40"
        >
          <Layers className="w-4 h-4" />
          <span>Edit Tables on 2D Canvas</span>
        </Link>
      </div>

      {/* Seating Progress Bar Strip */}
      <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 font-medium">Seating Progress:</span>
          <span className="font-mono text-purple-300 font-bold">
            {attendingGuests.length > 0 ? Math.round((totalSeated / attendingGuests.length) * 100) : 0}% ({totalSeated} of {attendingGuests.length} Attending Placed)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${attendingGuests.length > 0 ? (totalSeated / attendingGuests.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Tables vs Unassigned Guests Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Tables Grid (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Table filter bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Filter Table:</span>
              <select
                value={selectedTable}
                onChange={e => setSelectedTable(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#0d1424] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
              >
                <option value="All">All Tables ({layoutTables.length})</option>
                {layoutTables.map(t => (
                  <option key={t.id} value={t.label}>{t.label}</option>
                ))}
              </select>
            </div>

            <span className="text-xs text-slate-500 font-mono">
              Total Table Capacity: {layoutTables.reduce((sum, t) => sum + (t.capacity || 10), 0)} Seats
            </span>
          </div>

          {/* Tables Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTables.map(table => {
              const assignedToThisTable = attendingGuests.filter(g => g.tableAssignment === table.label);
              const maxCap = table.capacity || 10;
              const isFull = assignedToThisTable.length >= maxCap;

              return (
                <div
                  key={table.id}
                  className="glass-panel-glow rounded-3xl p-5 border border-white/10 space-y-4 relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                        <Armchair className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold font-display text-white">{table.label}</h3>
                        <span className="text-[10px] text-slate-400">
                          {table.type === 'table-round' ? 'Round Table' : 'Banquet Rectangular'}
                        </span>
                      </div>
                    </div>

                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isFull 
                        ? 'bg-rose-500/20 text-rose-300' 
                        : 'bg-purple-500/20 text-purple-300'
                    }`}>
                      {assignedToThisTable.length} / {maxCap} Seats
                    </span>
                  </div>

                  {/* Seat Slots Visual Representation */}
                  <div className="min-h-[140px] p-3 rounded-2xl bg-[#060912]/80 border border-white/5 space-y-2">
                    {assignedToThisTable.length === 0 ? (
                      <div className="h-28 flex flex-col items-center justify-center text-center text-slate-500 text-xs">
                        <span>Table is currently vacant.</span>
                        <span className="text-[10px] text-slate-600 mt-0.5">Assign guests from the right panel.</span>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        {assignedToThisTable.map(guest => (
                          <div
                            key={guest.id}
                            className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/5 text-xs hover:bg-white/[0.06] transition-colors"
                          >
                            <div className="truncate pr-2">
                              <span className="font-semibold text-white truncate block">
                                {guest.name}
                              </span>
                              {guest.dietary && (
                                <span className="text-[10px] text-pink-300 font-mono">
                                  Diet: {guest.dietary}
                                </span>
                              )}
                            </div>

                            <button
                              onClick={() => handleUnassign(guest.id)}
                              className="p-1 rounded-md text-slate-500 hover:text-rose-400 transition-colors"
                              title="Unassign guest"
                            >
                              <UserMinus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quick assign to this table */}
                  {!isFull && unassignedGuests.length > 0 && (
                    <div className="pt-2 border-t border-white/5">
                      <select
                        onChange={e => {
                          if (e.target.value) handleAssign(e.target.value, table.label);
                          e.target.value = '';
                        }}
                        defaultValue=""
                        className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-purple-500"
                      >
                        <option value="" disabled>+ Assign an unseated guest here...</option>
                        {unassignedGuests.map(ug => (
                          <option key={ug.id} value={ug.id}>{ug.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Unassigned Guests Queue (4 cols) */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="glass-panel-glow rounded-3xl p-5 border border-white/10 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-pink-400" />
                <h3 className="text-xs font-bold font-display text-white uppercase tracking-wider">
                  Unseated Guests
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded">
                {unassignedGuests.length} Waiting
              </span>
            </div>

            {/* Search within unassigned */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Find unseated guest..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* List */}
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {unassignedGuests.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  <Check className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <p>All confirmed attending guests have been assigned to tables!</p>
                </div>
              ) : (
                unassignedGuests
                  .filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(guest => (
                    <div
                      key={guest.id}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white truncate">{guest.name}</span>
                        {guest.plusOnes ? (
                          <span className="text-[10px] font-mono text-purple-400">+{guest.plusOnes}</span>
                        ) : null}
                      </div>

                      {/* Dropdown to assign */}
                      <select
                        onChange={e => {
                          if (e.target.value) handleAssign(guest.id, e.target.value);
                          e.target.value = '';
                        }}
                        defaultValue=""
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#0d1424] border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-purple-500"
                      >
                        <option value="" disabled>Assign to table...</option>
                        {layoutTables.map(t => (
                          <option key={t.id} value={t.label}>{t.label}</option>
                        ))}
                      </select>
                    </div>
                  ))
              )}
            </div>

            <div className="pt-2 border-t border-white/5 text-center">
              <Link to="/guests" className="text-xs text-purple-400 hover:text-purple-300 font-semibold">
                Manage Full Guest List →
              </Link>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
