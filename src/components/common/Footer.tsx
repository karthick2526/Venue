import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-[#05070e] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#080b13] rounded-[7px] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight font-display text-white">
                VENUE<span className="text-purple-400">FLOW</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plan the place. Create the moment. The connected venue discovery and visual spatial planning workspace.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Connected flow</span>
              <span>·</span>
              <span>Visual first</span>
              <span>·</span>
              <span>Portfolio grade</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Product Pillars</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/explore" className="hover:text-purple-400 transition-colors">Venue Discovery</Link></li>
              <li><Link to="/planner" className="hover:text-purple-400 transition-colors">Visual Space Planner</Link></li>
              <li><Link to="/guests" className="hover:text-purple-400 transition-colors">Guest RSVP Tracking</Link></li>
              <li><Link to="/seating" className="hover:text-purple-400 transition-colors">Table Seating Arrangement</Link></li>
              <li><Link to="/schedule" className="hover:text-purple-400 transition-colors">Run of Show Timeline</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Event Types</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/explore?type=Wedding" className="hover:text-purple-400 transition-colors">Luxury Weddings</Link></li>
              <li><Link to="/explore?type=Corporate" className="hover:text-purple-400 transition-colors">Corporate Summits</Link></li>
              <li><Link to="/explore?type=Social" className="hover:text-purple-400 transition-colors">Private Galas & Soirees</Link></li>
              <li><Link to="/explore?type=Entertainment" className="hover:text-purple-400 transition-colors">Concerts & Shows</Link></li>
              <li><Link to="/compare" className="hover:text-purple-400 transition-colors">Venue Comparison Matrix</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Workspace</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/overview" className="hover:text-purple-400 transition-colors">Event Command Center</Link></li>
              <li><Link to="/vendors" className="hover:text-purple-400 transition-colors">Vendor Coordination</Link></li>
              <li><Link to="/budget" className="hover:text-purple-400 transition-colors">Budget & Cost Breakdown</Link></li>
              <li>
                <Link to="/admin" className="flex items-center gap-1 hover:text-purple-400 transition-colors">
                  <span>Platform Admin</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} VenueFlow. Plan the place. Create the moment.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Acoustic & Venue Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
