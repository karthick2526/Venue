import React, { useState } from 'react';
import { useEvent } from '../../context/EventContext';
import { api } from '../../services/api';
import { BudgetItem } from '../../types';
import { 
  Coins, 
  Plus, 
  Trash2, 
  Edit2, 
  CheckCircle2, 
  AlertCircle, 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  ArrowUpRight 
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const BudgetPage: React.FC = () => {
  const { activeEvent, budget, updateActiveEvent, refreshData, showToast } = useEvent();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BudgetItem | null>(null);

  // Form
  const [category, setCategory] = useState('Catering & Bar');
  const [itemTitle, setItemTitle] = useState('');
  const [allocated, setAllocated] = useState<number>(1000);
  const [actual, setActual] = useState<number>(1000);
  const [paidStatus, setPaidStatus] = useState<BudgetItem['paidStatus']>('unpaid');
  const [notes, setNotes] = useState('');

  // Total Budget edit modal state
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [newTotalBudget, setNewTotalBudget] = useState(activeEvent?.totalBudget || 25000);

  const categories = [
    'Venue & Facility',
    'Catering & Bar',
    'Decor & Floral',
    'Photo & Cinema',
    'Music & Lighting',
    'Planning & Staff',
    'Attire & Beauty',
    'Contingency Reserve'
  ];

  const openAddModal = () => {
    setEditingItem(null);
    setCategory('Catering & Bar');
    setItemTitle('');
    setAllocated(1000);
    setActual(1000);
    setPaidStatus('unpaid');
    setNotes('');
    setModalOpen(true);
  };

  const openEditModal = (item: BudgetItem) => {
    setEditingItem(item);
    setCategory(item.category);
    setItemTitle(item.item || item.description || '');
    setAllocated(item.allocated);
    setActual(item.actual);
    setPaidStatus(item.paidStatus || 'unpaid');
    setNotes(item.notes || '');
    setModalOpen(true);
  };

  const handleSaveExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle.trim() || !activeEvent) return;

    if (editingItem) {
      await api.updateBudgetItem(editingItem.id, {
        category,
        item: itemTitle.trim(),
        allocated: Number(allocated),
        actual: Number(actual),
        paidStatus,
        notes: notes.trim()
      });
      showToast(`Updated expense "${itemTitle.trim()}"`);
    } else {
      await api.addBudgetItem({
        eventId: activeEvent.id,
        category,
        item: itemTitle.trim(),
        allocated: Number(allocated),
        actual: Number(actual),
        paidStatus,
        notes: notes.trim()
      });
      showToast(`Added expense "${itemTitle.trim()}"`);
    }

    setModalOpen(false);
    await refreshData();
  };

  const handleDelete = async (id: string, titleStr: string) => {
    if (confirm(`Delete expense "${titleStr}"?`)) {
      await api.deleteBudgetItem(id);
      showToast(`Deleted "${titleStr}"`);
      await refreshData();
    }
  };

  const handleUpdateTotalBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEvent) return;
    await updateActiveEvent({ totalBudget: Number(newTotalBudget) });
    setBudgetModalOpen(false);
    showToast('Updated overall event budget target');
  };

  const totalBudgetCap = activeEvent?.totalBudget || 25000;
  const totalAllocated = budget.reduce((sum, item) => sum + item.allocated, 0);
  const totalActual = budget.reduce((sum, item) => sum + item.actual, 0);
  const variance = totalBudgetCap - totalActual;
  const spentRatio = totalBudgetCap > 0 ? Math.round((totalActual / totalBudgetCap) * 100) : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>FINANCIAL DISCIPLINE</span>
            <span>·</span>
            <span>${totalBudgetCap.toLocaleString()} TARGET BUDGET</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Budget & Expense Management
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor real-time vendor deposits, committed contracts, and actual spend variances.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setNewTotalBudget(totalBudgetCap);
              setBudgetModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors"
          >
            Adjust Budget Cap
          </button>
          <button
            onClick={openAddModal}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-purple-950/40 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* 4 Financial Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Target Cap
          </span>
          <p className="text-2xl font-bold font-display text-white tabular-nums">
            ${totalBudgetCap.toLocaleString()}
          </p>
          <span className="text-[10px] text-slate-400 font-mono">
            Full ceiling
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Allocated / Estimated
          </span>
          <p className="text-2xl font-bold font-display text-purple-300 tabular-nums">
            ${totalAllocated.toLocaleString()}
          </p>
          <span className="text-[10px] text-purple-400/80 font-mono">
            {totalBudgetCap > 0 ? Math.round((totalAllocated / totalBudgetCap) * 100) : 0}% earmarked
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Actual Spent
          </span>
          <p className="text-2xl font-bold font-display text-white tabular-nums">
            ${totalActual.toLocaleString()}
          </p>
          <span className="text-[10px] text-emerald-400 font-mono">
            {spentRatio}% of budget
          </span>
        </div>

        <div className={`glass-panel p-4 rounded-2xl border space-y-1 ${
          variance >= 0 ? 'border-emerald-500/30' : 'border-rose-500/30'
        }`}>
          <span className="text-[11px] font-medium uppercase tracking-wider block text-slate-400">
            {variance >= 0 ? 'Remaining Buffer' : 'Over Budget'}
          </span>
          <p className={`text-2xl font-bold font-display tabular-nums ${variance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            ${Math.abs(variance).toLocaleString()}
          </p>
          <span className="text-[10px] font-mono text-slate-400">
            {variance >= 0 ? 'Available for extras' : 'Reduce line items'}
          </span>
        </div>
      </div>

      {/* Progress Bar & Breakdown */}
      <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 font-medium">Budget Utilization:</span>
          <span className="font-mono text-purple-300 font-bold">
            ${totalActual.toLocaleString()} / ${totalBudgetCap.toLocaleString()} ({spentRatio}%)
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className={`h-full transition-all duration-700 ${
              spentRatio > 100 ? 'bg-rose-500' : 'bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-400'
            }`}
            style={{ width: `${Math.min(100, spentRatio)}%` }}
          />
        </div>
      </div>

      {/* Line Items Table */}
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-mono uppercase tracking-wider text-slate-400">
              <th className="p-4 pl-6">Category</th>
              <th className="p-4">Expense Item</th>
              <th className="p-4">Allocated</th>
              <th className="p-4">Actual Spend</th>
              <th className="p-4">Variance</th>
              <th className="p-4">Payment Status</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs text-slate-300">
            {budget.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">
                  No expense items recorded yet.
                </td>
              </tr>
            ) : (
              budget.map(item => {
                const diff = item.allocated - item.actual;

                return (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    
                    <td className="p-4 pl-6 font-mono text-purple-300">
                      {item.category}
                    </td>

                    <td className="p-4 font-semibold text-white">
                      {item.item}
                      {item.notes && (
                        <span className="block text-[10px] text-slate-500 font-normal font-sans">
                          {item.notes}
                        </span>
                      )}
                    </td>

                    <td className="p-4 font-mono font-medium text-slate-300">
                      ${item.allocated.toLocaleString()}
                    </td>

                    <td className="p-4 font-mono font-bold text-white">
                      ${item.actual.toLocaleString()}
                    </td>

                    <td className="p-4 font-mono">
                      <span className={diff >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {diff >= 0 ? `+$${diff.toLocaleString()}` : `-$${Math.abs(diff).toLocaleString()}`}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                        item.paidStatus === 'paid'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : item.paidStatus === 'partial'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-white/5 text-slate-400'
                      }`}>
                        {item.paidStatus}
                      </span>
                    </td>

                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.item || item.description || 'Expense')}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Budget Cap Modal */}
      <Modal
        isOpen={budgetModalOpen}
        onClose={() => setBudgetModalOpen(false)}
        title="Adjust Event Budget Cap"
        subtitle="Set the total financial allocation for this celebration"
      >
        <form onSubmit={handleUpdateTotalBudget} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Total Budget ($ USD)
            </label>
            <input
              type="number"
              min="1000"
              step="500"
              value={newTotalBudget}
              onChange={e => setNewTotalBudget(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setBudgetModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-purple-950/40"
            >
              Update Budget
            </button>
          </div>
        </form>
      </Modal>

      {/* Add / Edit Expense Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Edit Budget Expense' : 'Add New Expense Item'}
        subtitle="Record vendor costs, quotes, and payment terms"
      >
        <form onSubmit={handleSaveExpense} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Expense Item Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Wedding Cake & Dessert Bar"
              value={itemTitle}
              onChange={e => setItemTitle(e.target.value)}
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
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0e1627] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Payment Status
              </label>
              <select
                value={paidStatus}
                onChange={e => setPaidStatus(e.target.value as BudgetItem['paidStatus'])}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0e1627] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="unpaid">Unpaid</option>
                <option value="partial">Deposit / Partial</option>
                <option value="paid">Fully Settled</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Allocated Amount ($)
              </label>
              <input
                type="number"
                min="0"
                step="50"
                value={allocated}
                onChange={e => setAllocated(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Actual Spend ($)
              </label>
              <input
                type="number"
                min="0"
                step="50"
                value={actual}
                onChange={e => setActual(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Invoice / Note Details
            </label>
            <textarea
              rows={2}
              placeholder="Invoice #, due date, contract clauses..."
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
              {editingItem ? 'Save Changes' : 'Record Expense'}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
