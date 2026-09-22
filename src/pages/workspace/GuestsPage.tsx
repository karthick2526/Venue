import React, { useState } from 'react';
import { useEvent } from '../../context/EventContext';
import { api } from '../../services/api';
import { Guest } from '../../types';
import { 
  Users, 
  Plus, 
  Search, 
  Trash2, 
  Edit2, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Mail, 
  Phone, 
  Utensils, 
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const GuestsPage: React.FC = () => {
  const { activeEvent, guests, refreshData, showToast } = useEvent();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'attending' | 'pending' | 'declined'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState<Guest['rsvpStatus']>('pending');
  const [plusOnes, setPlusOnes] = useState(0);
  const [dietary, setDietary] = useState('');
  const [tableAssignment, setTableAssignment] = useState('');
  const [notes, setNotes] = useState('');

  const openAddModal = () => {
    setEditingGuest(null);
    setName('');
    setEmail('');
    setPhone('');
    setRsvpStatus('pending');
    setPlusOnes(0);
    setDietary('');
    setTableAssignment('');
    setNotes('');
    setModalOpen(true);
  };

  const openEditModal = (g: Guest) => {
    setEditingGuest(g);
    setName(g.name);
    setEmail(g.email || '');
    setPhone(g.phone || '');
    setRsvpStatus(g.rsvpStatus);
    setPlusOnes(g.plusOnes || 0);
    setDietary(g.dietary || '');
    setTableAssignment(g.tableAssignment || '');
    setNotes(g.notes || '');
    setModalOpen(true);
  };

  const handleSaveGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !activeEvent) return;

    if (editingGuest) {
      await api.updateGuest(editingGuest.id, {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        rsvpStatus,
        plusOnes: Number(plusOnes),
        dietary: dietary.trim(),
        tableAssignment: tableAssignment.trim() || undefined,
        notes: notes.trim()
      });
      showToast(`Updated details for ${name.trim()}`);
    } else {
      await api.addGuest({
        eventId: activeEvent.id,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        rsvpStatus,
        plusOnes: Number(plusOnes),
        dietary: dietary.trim(),
        tableAssignment: tableAssignment.trim() || undefined,
        notes: notes.trim()
      });
      showToast(`Added ${name.trim()} to guest list`);
    }

    setModalOpen(false);
    await refreshData();
  };

  const handleDelete = async (id: string, nameStr: string) => {
    if (confirm(`Remove ${nameStr} from guest list?`)) {
      await api.deleteGuest(id);
      showToast(`Removed ${nameStr}`);
      await refreshData();
    }
  };

  const handleStatusQuickChange = async (guest: Guest, newStatus: Guest['rsvpStatus']) => {
    await api.updateGuest(guest.id, { rsvpStatus: newStatus });
    await refreshData();
    showToast(`Updated RSVP for ${guest.name} to ${newStatus}`);
  };

  // Filtered list
  const filteredGuests = guests.filter(g => {
    if (filterStatus !== 'all' && g.rsvpStatus !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        g.name.toLowerCase().includes(q) ||
        (g.email && g.email.toLowerCase().includes(q)) ||
        (g.tableAssignment && g.tableAssignment.toLowerCase().includes(q)) ||
        (g.dietary && g.dietary.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Calculations
  const totalCount = guests.length;
  const attendingCount = guests.filter(g => g.rsvpStatus === 'attending').length;
  const pendingCount = guests.filter(g => g.rsvpStatus === 'pending').length;
  const declinedCount = guests.filter(g => g.rsvpStatus === 'declined').length;
  const totalHeads = guests.reduce((sum, g) => sum + 1 + (g.plusOnes || 0), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>PEOPLE & HOSPITALITY</span>
            <span>·</span>
            <span>{totalCount} GUESTS REGISTERED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Guest List & RSVPs
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Track confirmations, dietary preferences, plus-ones, and synchronized table seating.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-purple-950/40 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Guest</span>
        </button>
      </div>

      {/* Metric Counters Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Total Invited
          </span>
          <p className="text-2xl font-bold font-display text-white tabular-nums">
            {totalCount}
          </p>
          <span className="text-[10px] text-slate-400 font-mono">
            {totalHeads} Total Pax (with +1s)
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 space-y-1">
          <span className="text-[11px] font-medium text-emerald-400 uppercase tracking-wider block flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Attending
          </span>
          <p className="text-2xl font-bold font-display text-white tabular-nums">
            {attendingCount}
          </p>
          <span className="text-[10px] text-emerald-400/80 font-mono">
            {totalCount > 0 ? Math.round((attendingCount / totalCount) * 100) : 0}% Confirmed
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 space-y-1">
          <span className="text-[11px] font-medium text-amber-400 uppercase tracking-wider block flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Awaiting RSVP
          </span>
          <p className="text-2xl font-bold font-display text-white tabular-nums">
            {pendingCount}
          </p>
          <span className="text-[10px] text-amber-400/80 font-mono">
            Reminder queue active
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-rose-500/20 space-y-1">
          <span className="text-[11px] font-medium text-rose-400 uppercase tracking-wider block flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> Declined
          </span>
          <p className="text-2xl font-bold font-display text-white tabular-nums">
            {declinedCount}
          </p>
          <span className="text-[10px] text-rose-400/80 font-mono">
            Seats freed up
          </span>
        </div>
      </div>

      {/* Search & Filter Tabs */}
      <div className="glass-panel p-4 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, table, dietary, email..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs self-start sm:self-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterStatus === 'all' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setFilterStatus('attending')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterStatus === 'attending' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Attending ({attendingCount})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterStatus === 'pending' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilterStatus('declined')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterStatus === 'declined' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Declined ({declinedCount})
          </button>
        </div>

      </div>

      {/* Guest Table */}
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[750px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-mono uppercase tracking-wider text-slate-400">
              <th className="p-4 pl-6">Guest Name</th>
              <th className="p-4">Contact Info</th>
              <th className="p-4">RSVP Status</th>
              <th className="p-4">Party Size</th>
              <th className="p-4">Table Assignment</th>
              <th className="p-4">Dietary</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs text-slate-300">
            {filteredGuests.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">
                  No guests found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredGuests.map(guest => (
                <tr key={guest.id} className="hover:bg-white/[0.02] transition-colors">
                  
                  {/* Name */}
                  <td className="p-4 pl-6 font-semibold text-white">
                    {guest.name}
                    {guest.notes && (
                      <span className="block text-[10px] text-slate-500 font-normal font-sans line-clamp-1">
                        {guest.notes}
                      </span>
                    )}
                  </td>

                  {/* Contact */}
                  <td className="p-4 text-slate-400">
                    <div className="space-y-0.5 text-[11px]">
                      {guest.email && <div className="flex items-center gap-1 truncate"><Mail className="w-3 h-3 text-slate-500" /> {guest.email}</div>}
                      {guest.phone && <div className="flex items-center gap-1 truncate"><Phone className="w-3 h-3 text-slate-500" /> {guest.phone}</div>}
                    </div>
                  </td>

                  {/* RSVP Status dropdown */}
                  <td className="p-4">
                    <select
                      value={guest.rsvpStatus}
                      onChange={e => handleStatusQuickChange(guest, e.target.value as Guest['rsvpStatus'])}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold focus:outline-none border ${
                        guest.rsvpStatus === 'attending'
                          ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                          : guest.rsvpStatus === 'pending'
                          ? 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                          : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                      }`}
                    >
                      <option value="attending">Attending</option>
                      <option value="pending">Pending</option>
                      <option value="declined">Declined</option>
                    </select>
                  </td>

                  {/* Party */}
                  <td className="p-4 font-mono">
                    <span className="font-bold text-white">{1 + (guest.plusOnes || 0)}</span>
                    <span className="text-slate-500 text-[10px]"> (1 + {guest.plusOnes || 0})</span>
                  </td>

                  {/* Table Assignment */}
                  <td className="p-4">
                    {guest.tableAssignment ? (
                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-xs">
                        {guest.tableAssignment}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[11px] italic">Unassigned</span>
                    )}
                  </td>

                  {/* Dietary */}
                  <td className="p-4 text-slate-400">
                    {guest.dietary ? (
                      <span className="flex items-center gap-1 text-pink-300 font-medium text-[11px]">
                        <Utensils className="w-3 h-3 text-pink-400" />
                        {guest.dietary}
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(guest)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                        title="Edit Guest"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(guest.id, guest.name)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 transition-colors"
                        title="Delete Guest"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Guest Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingGuest ? 'Edit Guest Details' : 'Add Guest to List'}
        subtitle="Manage RSVP, party size, and table assignment"
      >
        <form onSubmit={handleSaveGuest} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Eleanor Vance"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="eleanor@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 019-2834"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                RSVP Status
              </label>
              <select
                value={rsvpStatus}
                onChange={e => setRsvpStatus(e.target.value as Guest['rsvpStatus'])}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0e1627] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="attending">Attending</option>
                <option value="pending">Pending Reply</option>
                <option value="declined">Declined</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Plus-Ones Count
              </label>
              <input
                type="number"
                min="0"
                max="5"
                value={plusOnes}
                onChange={e => setPlusOnes(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Table Assignment
              </label>
              <input
                type="text"
                placeholder="e.g. VIP Table 1, Table 2"
                value={tableAssignment}
                onChange={e => setTableAssignment(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Dietary Requirements
              </label>
              <input
                type="text"
                placeholder="e.g. Vegan, Halal, Nut Allergy"
                value={dietary}
                onChange={e => setDietary(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Notes
            </label>
            <textarea
              rows={2}
              placeholder="Relationship, hotel accommodation, transport details..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-purple-950/40"
            >
              {editingGuest ? 'Save Changes' : 'Add Guest'}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
