import React from 'react';
import { Link } from 'react-router-dom';
import { useEvent } from '../../context/EventContext';
import { 
  Building2, 
  Users, 
  Briefcase, 
  CalendarDays, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { StatCard } from '../../components/widgets/StatCard';

export const AdminOverviewPage: React.FC = () => {
  const { venues, events, vendors } = useEvent();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <span>PLATFORM TELEMETRY</span>
          <span>·</span>
          <span>SUPERUSER VIEW</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
          VenueFlow Administration
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Global overview of certified venues, registered vendors, user accounts, and live event pipelines.
        </p>
      </div>

      {/* Global Stat Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Certified Venues"
          value={venues.length}
          subValue="Across 6 metro regions"
          icon={Building2}
          accentColor="cyan"
        />

        <StatCard
          label="Active Events"
          value={events.length}
          subValue="Under live planning"
          icon={CalendarDays}
          accentColor="purple"
        />

        <StatCard
          label="Registered Vendors"
          value={vendors.length}
          subValue="Photography, Catering & Audio"
          icon={Briefcase}
          accentColor="pink"
        />

        <StatCard
          label="Platform Users"
          value="18"
          subValue="Hosts & event planners"
          icon={Users}
          accentColor="emerald"
        />
      </div>

      {/* Management Quick Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Venues Management Quick Box */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold font-display text-white">Venues Catalog</h3>
            </div>
            <Link to="/admin/venues" className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1">
              <span>Manage All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Curate property specs, add new ballrooms or garden estates, update daily pricing, sound limits, and floor plan presets.
          </p>

          <div className="space-y-2 pt-2 border-t border-white/5">
            {venues.slice(0, 3).map(v => (
              <div key={v.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/[0.02]">
                <span className="font-semibold text-white">{v.name}</span>
                <span className="font-mono text-cyan-300">${v.pricePerDay.toLocaleString()} / day</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vendors Network Quick Box */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-5 h-5 text-pink-400" />
              <h3 className="text-base font-bold font-display text-white">Vendor Network</h3>
            </div>
            <Link to="/admin/vendors" className="text-xs text-pink-400 hover:text-pink-300 font-semibold flex items-center gap-1">
              <span>Manage All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Audit vendor certifications, category approvals, standard pricing bounds, and customer reviews.
          </p>

          <div className="space-y-2 pt-2 border-t border-white/5">
            {vendors.slice(0, 3).map(vend => (
              <div key={vend.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/[0.02]">
                <div>
                  <span className="font-semibold text-white">{vend.name}</span>
                  <span className="text-[10px] text-slate-500 ml-2 font-mono">({vend.category})</span>
                </div>
                <span className="font-mono text-pink-300">${(vend.quoteAmount || vend.quotedCost || 0).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
