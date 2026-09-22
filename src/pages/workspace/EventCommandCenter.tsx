import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEvent } from '../../context/EventContext';
import { 
  Building2, 
  Layers, 
  Users, 
  Armchair, 
  Briefcase, 
  Clock, 
  Coins, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Sparkles,
  MapPin
} from 'lucide-react';
import { ProgressRing } from '../../components/widgets/ProgressRing';
import { VenueImage } from '../../components/common/VenueImage';

export const EventCommandCenter: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    events, 
    activeEvent, 
    setActiveEventId, 
    progress, 
    guests, 
    vendors, 
    schedule, 
    budget, 
    layout 
  } = useEvent();

  const currentEvent = events.find(e => e.id === id) || activeEvent;

  if (!currentEvent) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-xl font-bold text-white">Event Not Found</h2>
        <Link to="/events" className="text-purple-400 text-sm mt-2 inline-block">
          Return to All Events →
        </Link>
      </div>
    );
  }

  // Ensure this event is set as active
  if (activeEvent?.id !== currentEvent.id) {
    setActiveEventId(currentEvent.id);
  }

  // Seating counts
  const totalSeated = guests.filter(g => g.tableAssignment).length;
  const unseatedGuests = guests.filter(g => !g.tableAssignment).length;

  // Vendors confirmed
  const confirmedVendors = vendors.filter(v => v.status === 'confirmed' || v.status === 'completed').length;

  // Budget spent
  const totalSpent = budget.reduce((sum, item) => sum + item.actual, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Link
            to="/events"
            className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
              <span>COMMAND CENTER</span>
              <span>·</span>
              <span className="text-slate-400 uppercase">{currentEvent.eventType}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              {currentEvent.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/planner"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-purple-950/40 transition-all flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            <span>Launch Space Planner</span>
          </Link>
        </div>
      </div>

      {/* Main Hero Summary Card */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-mono text-purple-300">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              {currentEvent.date}
            </span>
            <span>·</span>
            <span>Target: <strong className="text-white font-mono">{currentEvent.guestTargetCount} Guests</strong></span>
            <span>·</span>
            <span>Budget: <strong className="text-white font-mono">${currentEvent.totalBudget.toLocaleString()}</strong></span>
          </div>

          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            {currentEvent.notes || 'All 6 planning modules are synced in real time for this celebration.'}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {progress?.milestones.map(m => (
              <div
                key={m.title}
                className={`px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 ${
                  m.completed 
                    ? 'bg-purple-500/15 border border-purple-500/30 text-purple-300' 
                    : 'bg-white/5 border border-white/5 text-slate-500'
                }`}
              >
                {m.completed ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <div className="w-2 h-2 rounded-full bg-slate-600" />}
                <span>{m.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Progress Indicator */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 border-t lg:border-t-0 lg:border-l border-white/10">
          <ProgressRing
            progress={progress ? progress.overallScore : 0}
            size={100}
            strokeWidth={8}
            subtitle="Readiness"
          />
          <span className="text-xs text-slate-400 mt-2">Overall Planning Health</span>
        </div>

      </div>

      {/* 6 Interconnected Pillar Cards (Venue, Space, People, Seating, Vendors, Timeline & Budget) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Pillar 1: Venue */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col justify-between space-y-4 hover:border-purple-500/30 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                currentEvent.venueName ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'
              }`}>
                {currentEvent.venueName ? 'Confirmed' : 'Needs Venue'}
              </span>
            </div>
            <h3 className="text-base font-bold font-display text-white">1. Event Venue</h3>
            <p className="text-xs text-slate-400 mt-1">
              {currentEvent.venueName || 'No certified venue linked to this celebration.'}
            </p>
          </div>
          <Link
            to="/explore"
            className="pt-3 border-t border-white/5 text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center justify-between"
          >
            <span>{currentEvent.venueName ? 'Change Venue' : 'Find Matching Venue'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Pillar 2: Space Planner */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col justify-between space-y-4 hover:border-pink-500/30 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/15 text-pink-300 uppercase">
                2D Canvas
              </span>
            </div>
            <h3 className="text-base font-bold font-display text-white">2. Spatial Layout</h3>
            <p className="text-xs text-slate-400 mt-1">
              {layout ? `${layout.elements.length} zones placed on calibrated floor.` : 'Draft room zones, tables, stage & dance floor.'}
            </p>
          </div>
          <Link
            to="/planner"
            className="pt-3 border-t border-white/5 text-xs text-pink-400 hover:text-pink-300 font-semibold flex items-center justify-between"
          >
            <span>Open 2D Space Planner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Pillar 3: Guest RSVPs */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col justify-between space-y-4 hover:border-cyan-500/30 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300">
                {guests.length} Invited
              </span>
            </div>
            <h3 className="text-base font-bold font-display text-white">3. Guest List & RSVP</h3>
            <p className="text-xs text-slate-400 mt-1">
              {guests.filter(g => g.rsvpStatus === 'attending').length} Confirmed · {guests.filter(g => g.rsvpStatus === 'pending').length} Awaiting reply
            </p>
          </div>
          <Link
            to="/guests"
            className="pt-3 border-t border-white/5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center justify-between"
          >
            <span>Manage Guest List</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Pillar 4: Table Seating */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col justify-between space-y-4 hover:border-purple-500/30 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Armchair className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-300">
                {totalSeated} Assigned
              </span>
            </div>
            <h3 className="text-base font-bold font-display text-white">4. Table Seating</h3>
            <p className="text-xs text-slate-400 mt-1">
              {unseatedGuests > 0 ? `${unseatedGuests} guests waiting for table assignment.` : 'All attending guests placed!'}
            </p>
          </div>
          <Link
            to="/seating"
            className="pt-3 border-t border-white/5 text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center justify-between"
          >
            <span>Arrange Seating Grid</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Pillar 5: Vendors */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col justify-between space-y-4 hover:border-amber-500/30 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300">
                {confirmedVendors} / {vendors.length}
              </span>
            </div>
            <h3 className="text-base font-bold font-display text-white">5. Vendors & Partners</h3>
            <p className="text-xs text-slate-400 mt-1">
              Photography, Catering, Lighting, DJ, Floral decor in sync.
            </p>
          </div>
          <Link
            to="/vendors"
            className="pt-3 border-t border-white/5 text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center justify-between"
          >
            <span>Coordinate Vendors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Pillar 6: Schedule & Budget */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col justify-between space-y-4 hover:border-emerald-500/30 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Coins className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300">
                ${totalSpent.toLocaleString()} Spent
              </span>
            </div>
            <h3 className="text-base font-bold font-display text-white">6. Timeline & Budget</h3>
            <p className="text-xs text-slate-400 mt-1">
              {schedule.length} run of show cues · ${Math.max(0, currentEvent.totalBudget - totalSpent).toLocaleString()} budget remaining.
            </p>
          </div>
          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <Link to="/schedule" className="text-emerald-400 hover:text-emerald-300 font-semibold">
              Schedule
            </Link>
            <Link to="/budget" className="text-pink-400 hover:text-pink-300 font-semibold">
              Budget Tracker →
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
