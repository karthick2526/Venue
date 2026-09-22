import React, { useState } from 'react';
import { useEvent } from '../../context/EventContext';
import { api } from '../../services/api';
import { ScheduleItem } from '../../types';
import { 
  Clock, 
  Plus, 
  Trash2, 
  Edit2, 
  CheckCircle2, 
  MapPin, 
  User, 
  Calendar, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const SchedulePage: React.FC = () => {
  const { activeEvent, schedule, refreshData, showToast } = useEvent();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);

  // Form
  const [time, setTime] = useState('02:00 PM');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Main Ballroom');
  const [category, setCategory] = useState('Program');
  const [leadPerson, setLeadPerson] = useState('');
  const [status, setStatus] = useState<ScheduleItem['status']>('pending');

  const openAddModal = () => {
    setEditingItem(null);
    setTime('02:00 PM');
    setTitle('');
    setDescription('');
    setLocation('Main Ballroom');
    setCategory('Program');
    setLeadPerson('');
    setStatus('pending');
    setModalOpen(true);
  };

  const openEditModal = (item: ScheduleItem) => {
    setEditingItem(item);
    setTime(item.time);
    setTitle(item.title);
    setDescription(item.description || '');
    setLocation(item.location || 'Main Ballroom');
    setCategory(item.category);
    setLeadPerson(item.leadPerson || '');
    setStatus(item.status);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !activeEvent) return;

    if (editingItem) {
      await api.updateScheduleItem(editingItem.id, {
        time,
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        category: category.trim(),
        leadPerson: leadPerson.trim(),
        status
      });
      showToast(`Updated timeline item "${title.trim()}"`);
    } else {
      await api.addScheduleItem({
        eventId: activeEvent.id,
        time,
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        category: category.trim(),
        leadPerson: leadPerson.trim(),
        status,
        order: schedule.length + 1
      });
      showToast(`Added "${title.trim()}" to schedule`);
    }

    setModalOpen(false);
    await refreshData();
  };

  const handleDelete = async (id: string, titleStr: string) => {
    if (confirm(`Remove "${titleStr}" from run of show?`)) {
      await api.deleteScheduleItem(id);
      showToast(`Removed "${titleStr}"`);
      await refreshData();
    }
  };

  const handleToggleStatus = async (item: ScheduleItem) => {
    const nextStatus = item.status === 'completed' ? 'pending' : 'completed';
    await api.updateScheduleItem(item.id, { status: nextStatus });
    await refreshData();
    showToast(`Marked "${item.title}" as ${nextStatus}`);
  };

  const completedCount = schedule.filter(s => s.status === 'completed').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>RUN OF SHOW TIMELINE</span>
            <span>·</span>
            <span>{schedule.length} MILESTONES DEFINED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Event Schedule & Execution
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Minute-by-minute timeline with designated leads, zones, and live progress checkoffs.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-purple-950/40 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Timeline Cue</span>
        </button>
      </div>

      {/* Progress Strip */}
      <div className="glass-panel p-4 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Execution Readiness</span>
            <span className="text-[11px] text-slate-400">
              {completedCount} of {schedule.length} cues marked completed
            </span>
          </div>
        </div>

        <div className="w-full sm:w-64 h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${schedule.length > 0 ? (completedCount / schedule.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 sm:pl-10 space-y-6 before:content-[''] before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-pink-500 before:to-white/10">
        {schedule.length === 0 ? (
          <div className="glass-panel p-12 text-center text-slate-500 text-xs rounded-2xl border border-white/5">
            No schedule cues added yet. Click "Add Timeline Cue" to build your run of show.
          </div>
        ) : (
          schedule.map(item => {
            const isDone = item.status === 'completed';

            return (
              <div key={item.id} className="relative group">
                
                {/* Timeline node dot */}
                <button
                  onClick={() => handleToggleStatus(item)}
                  className={`absolute -left-6 sm:-left-10 top-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isDone 
                      ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-950/50' 
                      : 'bg-[#080d19] border-purple-500/60 text-purple-400 group-hover:scale-110'
                  }`}
                  title={isDone ? 'Mark Pending' : 'Mark Completed'}
                >
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
                </button>

                {/* Timeline Card */}
                <div className={`glass-panel rounded-2xl p-5 border transition-all ${
                  isDone 
                    ? 'border-emerald-500/20 bg-emerald-950/10' 
                    : 'border-white/5 hover:border-purple-500/30'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/15 px-2.5 py-1 rounded-lg border border-purple-500/30">
                        {item.time}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase bg-white/5 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                        title="Edit Item"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className={`text-base font-bold font-display ${isDone ? 'text-slate-300 line-through' : 'text-white'}`}>
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-white/5 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-purple-400" />
                      <span>{item.location}</span>
                    </span>
                    {item.leadPerson && (
                      <span className="flex items-center gap-1.5">
                        <User className="w-3 h-3 text-cyan-400" />
                        <span>Lead: <strong className="text-slate-300 font-normal">{item.leadPerson}</strong></span>
                      </span>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Edit Timeline Cue' : 'Add Run of Show Cue'}
        subtitle="Specify execution time, location zone, and lead"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Cue Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Grand Entrance & First Dance"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Time (e.g. 05:30 PM)
              </label>
              <input
                type="text"
                required
                placeholder="05:30 PM"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0e1627] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="Program">Program / Ceremony</option>
                <option value="Hospitality">Food & Beverage</option>
                <option value="Technical">Technical & AV</option>
                <option value="Logistics">Logistics & Load-in</option>
                <option value="Social">Reception & Dancing</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Location Zone
              </label>
              <input
                type="text"
                placeholder="e.g. Main Ballroom, Courtyard"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Designated Lead
              </label>
              <input
                type="text"
                placeholder="e.g. Stage Manager, DJ"
                value={leadPerson}
                onChange={e => setLeadPerson(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Description & Cues
            </label>
            <textarea
              rows={2}
              placeholder="Audio track fade, lighting spotlight, champagne pouring..."
              value={description}
              onChange={e => setDescription(e.target.value)}
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
              {editingItem ? 'Save Changes' : 'Add Cue'}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
