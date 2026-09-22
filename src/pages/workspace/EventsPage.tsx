import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvent } from '../../context/EventContext';
import { EventItem, EventType } from '../../types';
import { 
  CalendarDays, 
  Plus, 
  Trash2, 
  Edit3, 
  Users, 
  Coins, 
  Calendar, 
  Check, 
  ArrowRight,
  Sparkles,
  Building
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const EventsPage: React.FC = () => {
  const { user } = useAuth();
  const { 
    events, 
    activeEvent, 
    setActiveEventId, 
    createEvent, 
    deleteEvent, 
    showToast 
  } = useEvent();
  const navigate = useNavigate();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState<EventType>('Wedding');
  const [date, setDate] = useState('2026-12-15');
  const [guestTargetCount, setGuestTargetCount] = useState(120);
  const [totalBudget, setTotalBudget] = useState(20000);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !user) return;
    setIsSubmitting(true);
    try {
      const created = await createEvent({
        userId: user.id,
        title: title.trim(),
        eventType,
        date,
        guestTargetCount: Number(guestTargetCount),
        totalBudget: Number(totalBudget),
        notes: notes.trim() || 'New event workspace'
      });
      setCreateModalOpen(false);
      setTitle('');
      navigate(`/events/${created.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this event workspace?')) {
      await deleteEvent(id);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>EVENT PORTFOLIO</span>
            <span>·</span>
            <span>{events.length} ACTIVE PROJECTS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            My Events
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Switch between planned celebrations, adjust targets, or initialize a new project workspace.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-purple-950/40 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Event</span>
        </button>
      </div>

      {/* Events Grid */}
      {events.length === 0 ? (
        <div className="glass-panel rounded-3xl p-16 text-center space-y-4 border border-white/5">
          <CalendarDays className="w-12 h-12 text-purple-400 mx-auto" />
          <h3 className="text-xl font-bold text-white font-display">No Events Created Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Get started by initializing your first event to select venues and design your room layout.
          </p>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
          >
            Create Your First Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(ev => {
            const isActive = activeEvent?.id === ev.id;
            return (
              <div
                key={ev.id}
                onClick={() => {
                  setActiveEventId(ev.id);
                  navigate(`/events/${ev.id}`);
                }}
                className={`glass-panel rounded-2xl p-6 border transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  isActive
                    ? 'border-purple-500/60 shadow-xl shadow-purple-950/30'
                    : 'border-white/5 hover:border-white/20'
                }`}
              >
                <div>
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase bg-purple-500/15 text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                      {ev.eventType}
                    </span>
                    {isActive ? (
                      <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Active Workspace
                      </span>
                    ) : (
                      <button
                        onClick={(e) => handleDelete(ev.id, e)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <h3 className="text-xl font-bold font-display text-white group-hover:text-purple-300 transition-colors">
                    {ev.title}
                  </h3>

                  <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>{ev.date}</span>
                  </div>

                  {ev.venueName && (
                    <div className="mt-2 text-xs text-slate-300 flex items-center gap-2 truncate">
                      <Building className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                      <span className="truncate">{ev.venueName}</span>
                    </div>
                  )}

                  {/* Targets Row */}
                  <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-white/5 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                        <Users className="w-3 h-3 text-cyan-400" />
                        Target Guests
                      </span>
                      <p className="font-mono font-bold text-white tabular-nums">
                        {ev.guestTargetCount} Pax
                      </p>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                        <Coins className="w-3 h-3 text-amber-400" />
                        Budget
                      </span>
                      <p className="font-mono font-bold text-white tabular-nums">
                        ${ev.totalBudget.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-purple-400 font-semibold group-hover:underline">
                    Enter Command Center
                  </span>
                  <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Event Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Initialize New Event"
        subtitle="Create an interconnected event planning space"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Event Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sterling Tech Summit 2026"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Event Type
              </label>
              <select
                value={eventType}
                onChange={e => setEventType(e.target.value as EventType)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0e1627] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="Wedding">Wedding</option>
                <option value="Corporate">Corporate</option>
                <option value="Birthday">Birthday</option>
                <option value="Academic">Academic</option>
                <option value="Social">Social Gala</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0e1627] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Target Guests
              </label>
              <input
                type="number"
                min="10"
                max="5000"
                value={guestTargetCount}
                onChange={e => setGuestTargetCount(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Total Budget ($)
              </label>
              <input
                type="number"
                min="1000"
                step="500"
                value={totalBudget}
                onChange={e => setTotalBudget(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Notes & Vision
            </label>
            <textarea
              rows={2}
              placeholder="Theme, color schemes, audio visual requirements..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-purple-950/40 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Initialize Event'}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
