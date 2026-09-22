import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvent } from '../../context/EventContext';
import { 
  Building2, 
  Layers, 
  Users, 
  Briefcase, 
  Clock, 
  Coins, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { StatCard } from '../../components/widgets/StatCard';
import { ProgressRing } from '../../components/widgets/ProgressRing';
import { VenueImage } from '../../components/common/VenueImage';

export const OverviewPage: React.FC = () => {
  const { user } = useAuth();
  const { 
    activeEvent, 
    progress, 
    guests, 
    vendors, 
    schedule, 
    budget, 
    layout, 
    showToast 
  } = useEvent();
  const navigate = useNavigate();

  if (!activeEvent) {
    return (
      <div className="p-8 max-w-5xl mx-auto text-center space-y-4">
        <Building2 className="w-12 h-12 text-purple-400 mx-auto" />
        <h2 className="text-2xl font-bold font-display text-white">No Active Event Selected</h2>
        <p className="text-sm text-slate-400">Initialize an event to begin spatial planning and management.</p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
        >
          <Plus className="w-4 h-4" />
          <span>Create or Select Event</span>
        </Link>
      </div>
    );
  }

  // Days until event calculation
  const eventDateObj = new Date(activeEvent.date);
  const today = new Date();
  const diffTime = eventDateObj.getTime() - today.getTime();
  const daysToGo = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Guest stats
  const totalGuests = guests.length;
  const attendingGuests = guests.filter(g => g.rsvpStatus === 'attending').length;
  const pendingGuests = guests.filter(g => g.rsvpStatus === 'pending').length;

  // Budget stats
  const totalSpent = budget.reduce((sum, item) => sum + item.actual, 0);
  const budgetRatio = activeEvent.totalBudget > 0 ? Math.round((totalSpent / activeEvent.totalBudget) * 100) : 0;

  // Vendor stats
  const confirmedVendors = vendors.filter(v => v.status === 'confirmed' || v.status === 'completed').length;

  // Next upcoming schedule item
  const nextItem = schedule.find(s => s.status !== 'completed') || schedule[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Greeting & Active Event Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>EVENT WORKSPACE</span>
            <span>·</span>
            <span className="text-slate-400 uppercase tracking-wider">{activeEvent.eventType}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Welcome back, {user?.name.split(' ')[0]}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Here is your live planning pulse for <strong className="text-slate-200">{activeEvent.title}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/planner"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-purple-950/40 transition-all flex items-center gap-2"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Open 2D Space Planner</span>
          </Link>
          <Link
            to={`/events/${activeEvent.id}`}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>Command Center</span>
            <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
          </Link>
        </div>
      </div>

      {/* Hero Event Card & Countdown */}
      <div className="glass-panel-glow rounded-3xl border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative group">
        
        {/* Left Venue Visual (5 cols) */}
        <div className="lg:col-span-5 h-64 lg:h-auto min-h-[220px] relative overflow-hidden">
          <VenueImage
            src={activeEvent.venueImage || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80'}
            alt={activeEvent.venueName || 'Venue'}
            className="w-full h-full"
            fallbackTitle={activeEvent.venueName}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b101e] via-transparent to-transparent lg:bg-gradient-to-r" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider block">Selected Venue</span>
            <p className="text-sm font-bold text-white font-display truncate">
              {activeEvent.venueName || 'No Venue Selected Yet'}
            </p>
          </div>
        </div>

        {/* Right Event Info & Progress Gauge (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-pink-400">
                Primary Celebration
              </span>
              <h2 className="text-2xl font-bold font-display text-white mt-1">
                {activeEvent.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  {activeEvent.date}
                </span>
                <span>·</span>
                <span className="font-mono text-purple-300">{daysToGo} days to go</span>
              </div>
            </div>

            {/* Dynamic Progress Radial */}
            <div className="shrink-0 flex items-center gap-3 bg-white/[0.02] p-2 rounded-2xl border border-white/5">
              <ProgressRing
                progress={progress ? progress.overallScore : 0}
                size={76}
                strokeWidth={6}
              />
              <div className="text-left pr-2">
                <span className="text-xs font-bold text-white block">Readiness</span>
                <span className="text-[10px] text-slate-400">Dynamic Score</span>
              </div>
            </div>
          </div>

          {/* Quick Milestones Mini Bar */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Connected Milestones Completed:</span>
              <span className="font-mono text-purple-400 font-bold">
                {progress?.milestones.filter(m => m.completed).length || 0} / 6
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 transition-all duration-700"
                style={{ width: `${progress ? progress.overallScore : 0}%` }}
              />
            </div>
          </div>

          {/* Actions & Next Task Callout */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Next recommended step:</span>
              <strong className="text-white">
                {!progress?.hasLayout ? 'Draft 2D Floor Plan' : !progress?.milestones[2].completed ? 'Review Pending RSVPs' : 'Confirm Vendor Contracts'}
              </strong>
            </div>
            <Link
              to={!progress?.hasLayout ? '/planner' : '/guests'}
              className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
            >
              <span>Take Action</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </div>

      {/* 4 Connected Stat Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Guests */}
        <StatCard
          label="Confirmed Guests"
          value={`${attendingGuests} / ${totalGuests}`}
          subValue={`${pendingGuests} RSVPs pending reply`}
          icon={Users}
          accentColor="purple"
          badge={`${totalGuests > 0 ? Math.round((attendingGuests / totalGuests) * 100) : 0}%`}
          onClick={() => navigate('/guests')}
        />

        {/* Budget */}
        <StatCard
          label="Budget Allocated"
          value={`$${totalSpent.toLocaleString()}`}
          subValue={`Target: $${activeEvent.totalBudget.toLocaleString()}`}
          icon={Coins}
          accentColor="pink"
          badge={`${budgetRatio}%`}
          onClick={() => navigate('/budget')}
        />

        {/* Vendors */}
        <StatCard
          label="Vendors Confirmed"
          value={`${confirmedVendors} / ${vendors.length}`}
          subValue={`${vendors.length - confirmedVendors} pending contract`}
          icon={Briefcase}
          accentColor="cyan"
          badge={`${confirmedVendors}/${vendors.length}`}
          onClick={() => navigate('/vendors')}
        />

        {/* Space Layout */}
        <StatCard
          label="Spatial Layout"
          value={`${layout?.elements.length || 0} Elements`}
          subValue={layout ? 'Canvas synchronized' : 'Needs configuration'}
          icon={Layers}
          accentColor="amber"
          badge="2D"
          onClick={() => navigate('/planner')}
        />

      </div>

      {/* Two Column Section: Next Timeline Items & Planning Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 cols: Upcoming Schedule Highlight & 2D Space Preview */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 2D Space Planner Live Status Box */}
          <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display text-white">Visual Space Planner</h3>
                  <p className="text-xs text-slate-400">Interactive room architecture & table seats</p>
                </div>
              </div>
              <Link
                to="/planner"
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <span>Edit Canvas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mini preview canvas */}
            <div className="w-full h-44 rounded-xl bg-[#060911] border border-white/5 bg-venue-grid relative overflow-hidden flex items-center justify-center p-4">
              {layout && layout.elements.length > 0 ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-1 z-10">
                    <span className="text-xs font-bold text-white block font-display">
                      {layout.name}
                    </span>
                    <span className="text-[11px] text-purple-300 font-mono">
                      {layout.elements.length} zones & tables configured
                    </span>
                  </div>
                  {/* Decorative element outlines */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 rounded bg-purple-500/20 border border-purple-500/40 text-[9px] text-purple-300 flex items-center justify-center">
                    Stage
                  </div>
                  <div className="absolute w-20 h-16 rounded-xl bg-pink-500/15 border border-pink-500/30 text-[9px] text-pink-300 flex items-center justify-center">
                    Dance Floor
                  </div>
                  <div className="absolute left-6 top-8 w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/40" />
                  <div className="absolute right-6 top-8 w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/40" />
                  <div className="absolute left-6 bottom-4 w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/40" />
                  <div className="absolute right-6 bottom-4 w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/40" />
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <span className="text-xs text-slate-400 block">No layout elements placed yet</span>
                  <Link
                    to="/planner"
                    className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold"
                  >
                    Place First Table
                  </Link>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Seating configuration synchronized with Guest List</span>
              <Link to="/seating" className="text-pink-400 hover:text-pink-300 font-medium">
                View Seating Grid →
              </Link>
            </div>
          </div>

          {/* Next Schedule Milestones */}
          <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold font-display text-white">Event Run of Show</h3>
              </div>
              <Link
                to="/schedule"
                className="text-xs font-semibold text-purple-400 hover:text-purple-300"
              >
                Full Timeline ({schedule.length}) →
              </Link>
            </div>

            {schedule.length === 0 ? (
              <p className="text-xs text-slate-500">No schedule items configured yet.</p>
            ) : (
              <div className="space-y-2.5">
                {schedule.slice(0, 4).map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-purple-300 font-bold bg-purple-500/10 px-2 py-0.5 rounded">
                        {item.time}
                      </span>
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <span className="text-[11px] text-slate-400">{item.location} · {item.category}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                      item.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : item.status === 'in-progress'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-white/5 text-slate-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right 5 cols: Dynamic Checklist Milestones */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel-glow rounded-2xl p-6 border border-white/10 space-y-5">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400">
                DYNAMIC PROGRESS
              </span>
              <h3 className="text-base font-bold font-display text-white mt-1">
                Connected Planning Checklist
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Calculated dynamically from real data across your workspace.
              </p>
            </div>

            <div className="space-y-3">
              {progress?.milestones.map((m, idx) => (
                <div
                  key={m.title}
                  className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                    m.completed
                      ? 'bg-purple-950/20 border-purple-500/30'
                      : 'bg-white/[0.02] border-white/5'
                  }`}
                >
                  <div className="mt-0.5">
                    {m.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-500">
                        {idx + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-bold ${m.completed ? 'text-white' : 'text-slate-300'}`}>
                        {m.title}
                      </p>
                      <span className="text-[10px] font-mono text-purple-400">+{m.weight}%</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/5 text-center">
              <Link
                to={`/events/${activeEvent.id}`}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Open Full Event Command Center</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
