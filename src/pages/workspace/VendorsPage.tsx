import React, { useState } from 'react';
import { useEvent } from '../../context/EventContext';
import { api } from '../../services/api';
import { Vendor, VendorCategory } from '../../types';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit2, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  DollarSign, 
  Camera, 
  Utensils, 
  Sparkles, 
  Music, 
  Car, 
  Check 
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const VendorsPage: React.FC = () => {
  const { activeEvent, vendors, refreshData, showToast } = useEvent();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);

  // Form
  const [name, setName] = useState('');
  const [category, setCategory] = useState<VendorCategory>('Photography');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Vendor['status']>('inquiry');
  const [quoteAmount, setQuoteAmount] = useState<number>(2500);
  const [depositPaid, setDepositPaid] = useState<number>(500);
  const [notes, setNotes] = useState('');

  const categories: VendorCategory[] = [
    'Photography',
    'Catering',
    'Decoration',
    'Music',
    'Makeup',
    'Transport'
  ];

  const categoryIcons: Record<string, React.FC<any>> = {
    Photography: Camera,
    Catering: Utensils,
    Decoration: Sparkles,
    Music: Music,
    Makeup: Sparkles,
    Transport: Car,
    Other: Briefcase
  };

  const openAddModal = () => {
    setEditingVendor(null);
    setName('');
    setCategory('Photography');
    setContactName('');
    setPhone('');
    setEmail('');
    setStatus('inquiry');
    setQuoteAmount(2500);
    setDepositPaid(500);
    setNotes('');
    setModalOpen(true);
  };

  const openEditModal = (v: Vendor) => {
    setEditingVendor(v);
    setName(v.name);
    setCategory(v.category);
    setContactName(v.contactName || v.contactPerson || '');
    setPhone(v.phone || '');
    setEmail(v.email || '');
    setStatus(v.status);
    setQuoteAmount(v.quoteAmount || v.quotedCost || 0);
    setDepositPaid(v.depositPaid);
    setNotes(v.notes || '');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !activeEvent) return;

    if (editingVendor) {
      await api.updateVendor(editingVendor.id, {
        name: name.trim(),
        category,
        contactName: contactName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        status,
        quoteAmount: Number(quoteAmount),
        depositPaid: Number(depositPaid),
        notes: notes.trim()
      });
      showToast(`Updated ${name.trim()}`);
    } else {
      await api.addVendor({
        eventId: activeEvent.id,
        name: name.trim(),
        category,
        contactName: contactName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        status,
        quoteAmount: Number(quoteAmount),
        depositPaid: Number(depositPaid),
        notes: notes.trim()
      });
      showToast(`Added ${name.trim()} to vendor roster`);
    }

    setModalOpen(false);
    await refreshData();
  };

  const handleDelete = async (id: string, nameStr: string) => {
    if (confirm(`Remove ${nameStr} from vendors?`)) {
      await api.deleteVendor(id);
      showToast(`Removed ${nameStr}`);
      await refreshData();
    }
  };

  const filteredVendors = selectedCategory === 'All'
    ? vendors
    : vendors.filter(v => v.category === selectedCategory);

  const totalQuotes = vendors.reduce((sum, v) => sum + (v.quoteAmount || v.quotedCost || 0), 0);
  const totalDeposits = vendors.reduce((sum, v) => sum + v.depositPaid, 0);
  const confirmedCount = vendors.filter(v => v.status === 'confirmed' || v.status === 'completed').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>VENDOR COORDINATION</span>
            <span>·</span>
            <span>{vendors.length} PARTNERS TRACKED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Vendors & Creative Partners
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Coordinate photography, catering, sound, floral styling, and contracts in sync with your event budget.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-purple-950/40 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Vendor</span>
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Confirmed Contracts
          </span>
          <p className="text-2xl font-bold font-display text-white tabular-nums">
            {confirmedCount} / {vendors.length}
          </p>
          <span className="text-[10px] text-emerald-400 font-mono">
            {vendors.length > 0 ? Math.round((confirmedCount / vendors.length) * 100) : 0}% Secured
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Total Quoted
          </span>
          <p className="text-2xl font-bold font-display text-white tabular-nums">
            ${totalQuotes.toLocaleString()}
          </p>
          <span className="text-[10px] text-purple-300 font-mono">
            Across all categories
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Deposits Paid
          </span>
          <p className="text-2xl font-bold font-display text-white tabular-nums">
            ${totalDeposits.toLocaleString()}
          </p>
          <span className="text-[10px] text-cyan-400 font-mono">
            Committed to dates
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Remaining Balances
          </span>
          <p className="text-2xl font-bold font-display text-white tabular-nums">
            ${(totalQuotes - totalDeposits).toLocaleString()}
          </p>
          <span className="text-[10px] text-slate-400 font-mono">
            Due upon execution
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
            selectedCategory === 'All' ? 'bg-purple-600 text-white font-semibold' : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          All Categories ({vendors.length})
        </button>
        {categories.map(cat => {
          const count = vendors.filter(v => v.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                selectedCategory === cat ? 'bg-purple-600 text-white font-semibold' : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map(vendor => {
          const Icon = categoryIcons[vendor.category] || Briefcase;

          return (
            <div
              key={vendor.id}
              className="glass-panel rounded-2xl p-5 border border-white/5 hover:border-purple-500/30 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-300 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 block">
                        {vendor.category}
                      </span>
                      <h3 className="text-base font-bold font-display text-white group-hover:text-purple-300 transition-colors">
                        {vendor.name}
                      </h3>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                    vendor.status === 'confirmed' || vendor.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : vendor.status === 'quoted'
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {vendor.status}
                  </span>
                </div>

                {vendor.notes && (
                  <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                    {vendor.notes}
                  </p>
                )}

                {/* Contact row */}
                <div className="mt-4 pt-3 border-t border-white/5 space-y-1 text-xs text-slate-400">
                  {vendor.contactName && (
                    <div className="text-slate-300 font-medium">{vendor.contactName}</div>
                  )}
                  {vendor.email && (
                    <div className="flex items-center gap-1.5 text-[11px] truncate">
                      <Mail className="w-3 h-3 text-slate-500" />
                      <span>{vendor.email}</span>
                    </div>
                  )}
                  {vendor.phone && (
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <Phone className="w-3 h-3 text-slate-500" />
                      <span>{vendor.phone}</span>
                    </div>
                  )}
                </div>

                {/* Financials */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/5 text-xs">
                  <div className="p-2 rounded-lg bg-white/[0.02]">
                    <span className="text-slate-500 text-[10px] block">Quote Amount</span>
                    <span className="font-mono font-bold text-white">${(vendor.quoteAmount || vendor.quotedCost || 0).toLocaleString()}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02]">
                    <span className="text-slate-500 text-[10px] block">Deposit Paid</span>
                    <span className="font-mono font-bold text-emerald-400">${vendor.depositPaid.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(vendor)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Edit Vendor"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(vendor.id, vendor.name)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 transition-colors"
                  title="Delete Vendor"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingVendor ? 'Edit Vendor Details' : 'Add Creative Partner'}
        subtitle="Manage quote amounts, contact leads, and contracts"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Company / Vendor Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Luminary Vision Studios"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as VendorCategory)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0e1627] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Contract Status
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as Vendor['status'])}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0e1627] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="inquiry">Initial Inquiry</option>
                <option value="quoted">Proposal / Quoted</option>
                <option value="confirmed">Contract Confirmed</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Quote Amount ($)
              </label>
              <input
                type="number"
                min="0"
                step="50"
                value={quoteAmount}
                onChange={e => setQuoteAmount(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Deposit Paid ($)
              </label>
              <input
                type="number"
                min="0"
                step="50"
                value={depositPaid}
                onChange={e => setDepositPaid(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Contact Person
              </label>
              <input
                type="text"
                placeholder="e.g. Marcus Vance"
                value={contactName}
                onChange={e => setContactName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 234-5678"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="contact@vendor.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Service Notes & Deliverables
            </label>
            <textarea
              rows={2}
              placeholder="Load-in time, sound equipment list, special dietary requirements..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
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
              {editingVendor ? 'Save Changes' : 'Add Vendor'}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
