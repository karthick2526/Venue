import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvent } from '../../context/EventContext';
import { api } from '../../services/api';
import { Venue } from '../../types';
import { 
  Bookmark, 
  MapPin, 
  Users, 
  Star, 
  Trash2, 
  ArrowRight, 
  Building2, 
  Check 
} from 'lucide-react';
import { VenueImage } from '../../components/common/VenueImage';

export const SavedVenuesPage: React.FC = () => {
  const { user } = useAuth();
  const { venues, activeEvent, updateActiveEvent, showToast } = useEvent();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.getFavorites(user.id).then(favs => {
        // If empty, initialize with default favorites
        if (favs.length === 0) {
          setFavoriteIds(['grand-aurora', 'glasshouse-pavilion']);
        } else {
          setFavoriteIds(favs.map(f => f.id));
        }
        setLoading(false);
      });
    }
  }, [user]);

  const savedVenues = venues.filter(v => favoriteIds.includes(v.id));

  const handleRemove = async (venueId: string) => {
    if (!user) return;
    const next = favoriteIds.filter(id => id !== venueId);
    setFavoriteIds(next);
    await api.toggleFavorite(user.id, venueId);
    showToast('Removed venue from saved list', 'info');
  };

  const handleSelectForActiveEvent = async (venue: Venue) => {
    if (!activeEvent) return;
    await updateActiveEvent({
      venueId: venue.id,
      venueName: venue.name,
      venueImage: venue.image
    });
    showToast(`Assigned ${venue.name} to "${activeEvent.title}"!`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
          <span>CURATED SHORTLIST</span>
          <span>·</span>
          <span>{savedVenues.length} SAVED PROPERTIES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
          Saved Venues & Shortlist
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Your bookmarked candidate venues. Compare side-by-side or assign directly to your active celebration.
        </p>
      </div>

      {/* Grid */}
      {savedVenues.length === 0 ? (
        <div className="glass-panel p-16 text-center rounded-3xl border border-white/5 space-y-4">
          <Bookmark className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Saved Venues Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Browse our catalog and click the heart icon on any venue to add it to your shortlist.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
          >
            <span>Explore Venues</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedVenues.map(venue => {
            const isAssigned = activeEvent?.venueId === venue.id;

            return (
              <div
                key={venue.id}
                className="glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-48 relative overflow-hidden">
                    <VenueImage src={venue.image} alt={venue.name} className="w-full h-full" />
                    
                    <button
                      onClick={() => handleRemove(venue.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-rose-950/80 text-slate-300 hover:text-white backdrop-blur-md transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {isAssigned && (
                      <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold flex items-center gap-1 shadow">
                        <Check className="w-3 h-3" /> ACTIVE VENUE
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-purple-400" />
                        {venue.city}
                      </span>
                      <span className="flex items-center gap-1 text-amber-400 font-mono">
                        <Star className="w-3 h-3 fill-current" />
                        {venue.rating}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-display text-white group-hover:text-purple-300 transition-colors">
                      {venue.name}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {venue.tagline}
                    </p>

                    <div className="pt-2 text-xs text-slate-300 flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{venue.capacityMin} – {venue.capacityMax} Guests</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-white/5 mt-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white tabular-nums">${venue.pricePerDay.toLocaleString()}</span>
                    <span className="text-slate-500"> / day</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isAssigned && activeEvent && (
                      <button
                        onClick={() => handleSelectForActiveEvent(venue)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-purple-300 text-xs font-semibold transition-colors"
                      >
                        Select
                      </button>
                    )}
                    <Link
                      to={`/venues/${venue.id}`}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
