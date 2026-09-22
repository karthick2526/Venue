import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useEvent } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  DollarSign, 
  Star, 
  Heart, 
  ArrowRight, 
  SlidersHorizontal,
  ArrowUpDown,
  Building2,
  Check
} from 'lucide-react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { VenueImage } from '../../components/common/VenueImage';
import { EventType } from '../../types';

export const ExploreVenues: React.FC = () => {
  const { venues, showToast, activeEvent, updateActiveEvent } = useEvent();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialType = (searchParams.get('type') as EventType) || 'All';
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [capacityMin, setCapacityMin] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'capacity' | 'rating'>('recommended');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['grand-aurora', 'glasshouse-pavilion']));

  // Cities
  const cities = useMemo(() => {
    const list = Array.from(new Set(venues.map(v => v.city)));
    return ['All', ...list];
  }, [venues]);

  const filteredVenues = useMemo(() => {
    return venues.filter(v => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          v.name.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.location.toLowerCase().includes(q) ||
          v.amenities.some(a => a.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Event Type
      if (selectedType !== 'All') {
        if (!v.supportedEvents.includes(selectedType as EventType)) {
          return false;
        }
      }

      // City
      if (selectedCity !== 'All' && v.city !== selectedCity) {
        return false;
      }

      // Capacity
      if (capacityMin > 0 && v.capacityMax < capacityMin) {
        return false;
      }

      // Price
      if (v.pricePerDay > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-high') return b.pricePerDay - a.pricePerDay;
      if (sortBy === 'capacity') return b.capacityMax - a.capacityMax;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [venues, searchQuery, selectedType, selectedCity, capacityMin, maxPrice, sortBy]);

  const toggleFav = async (venueId: string) => {
    if (!user) {
      showToast('Sign in to save venues to your personal list', 'info');
      return;
    }
    const next = new Set(favorites);
    if (next.has(venueId)) {
      next.delete(venueId);
      showToast('Removed from saved venues', 'info');
    } else {
      next.add(venueId);
      showToast('Saved to favorite venues!', 'success');
    }
    setFavorites(next);
    await api.toggleFavorite(user.id, venueId);
  };

  const handleSelectForActiveEvent = async (venue: typeof venues[0]) => {
    if (!activeEvent) {
      showToast('Sign in or select an event to book this venue', 'info');
      return;
    }
    await updateActiveEvent({
      venueId: venue.id,
      venueName: venue.name,
      venueImage: venue.image
    });
    showToast(`Assigned ${venue.name} to "${activeEvent.title}"!`);
  };

  return (
    <div className="min-h-screen bg-[#080b13] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Page Header */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs text-purple-400 font-mono">
            <span>DISCOVERY & PORTFOLIO</span>
            <span>·</span>
            <span>{filteredVenues.length} PROPERTIES AVAILABLE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Discover Exceptional Venues
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Explore verified estates, palatial halls, and sky pavilions with direct 2D spatial layout compatibility.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/5 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by venue name, amenities, aesthetic..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Event Type Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedType}
                onChange={e => {
                  setSelectedType(e.target.value);
                  setSearchParams(e.target.value === 'All' ? {} : { type: e.target.value });
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0d1424] border border-white/10 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="All">All Event Types</option>
                <option value="Wedding">Weddings</option>
                <option value="Corporate">Corporate Summits</option>
                <option value="Birthday">Milestone Birthdays</option>
                <option value="Academic">Academic Symposiums</option>
                <option value="Social">Social Galas</option>
                <option value="Entertainment">Entertainment & Shows</option>
                <option value="Other">Bespoke Formats</option>
              </select>
            </div>

            {/* City Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0d1424] border border-white/10 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-purple-500"
              >
                {cities.map(c => (
                  <option key={c} value={c}>{c === 'All' ? 'All Locations' : c}</option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0d1424] border border-white/10 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="recommended">Featured First</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="capacity">Largest Capacity</option>
              </select>
            </div>

          </div>

          {/* Secondary Range Sliders */}
          <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Min Capacity:</span>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="25"
                  value={capacityMin}
                  onChange={e => setCapacityMin(Number(e.target.value))}
                  className="w-24 accent-purple-500"
                />
                <span className="font-mono text-purple-300 font-bold">{capacityMin} pax</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">Max Daily Rate:</span>
                <input
                  type="range"
                  min="5000"
                  max="20000"
                  step="1000"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-28 accent-pink-500"
                />
                <span className="font-mono text-pink-300 font-bold">${maxPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/compare"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Open Side-by-Side Compare Table →
              </Link>
            </div>
          </div>
        </div>

        {/* Venues Grid */}
        {filteredVenues.length === 0 ? (
          <div className="glass-panel rounded-2xl p-16 text-center space-y-4 border border-white/5">
            <Building2 className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No venues match your criteria</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your capacity range, event type filter, or price limit to see more properties.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('All');
                setSelectedCity('All');
                setCapacityMin(0);
                setMaxPrice(20000);
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map(venue => {
              const isFav = favorites.has(venue.id);
              const isCurrentVenue = activeEvent?.venueId === venue.id;

              return (
                <div
                  key={venue.id}
                  className="glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all group flex flex-col justify-between relative"
                >
                  <div>
                    {/* Image Area */}
                    <div className="h-56 relative overflow-hidden">
                      <VenueImage
                        src={venue.image}
                        alt={venue.name}
                        className="w-full h-full"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        {venue.featured && (
                          <span className="px-2.5 py-0.5 rounded-full bg-purple-600/90 backdrop-blur-md text-[10px] font-bold text-white shadow-md">
                            FEATURED
                          </span>
                        )}
                        {isCurrentVenue && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-600/90 backdrop-blur-md text-[10px] font-bold text-white shadow-md flex items-center gap-1">
                            <Check className="w-3 h-3" /> SELECTED
                          </span>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFav(venue.id);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                          isFav ? 'bg-pink-600 text-white' : 'bg-black/50 text-slate-300 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                      </button>

                      {/* Rating Overlay */}
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-xs font-mono text-white flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                        <span>{venue.rating}</span>
                        <span className="text-slate-400">({venue.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <div className="text-[11px] text-slate-400 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-purple-400" />
                          {venue.location}
                        </span>
                        <span className="font-mono text-purple-300">
                          {venue.sqFt.toLocaleString()} sq.ft
                        </span>
                      </div>

                      <h3 className="text-lg font-bold font-display text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                        {venue.name}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {venue.description}
                      </p>

                      {/* Specs pills */}
                      <div className="pt-1 flex items-center gap-4 text-xs text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{venue.capacityMin} – {venue.capacityMax} Guests</span>
                        </span>
                      </div>

                      {/* Amenity tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {venue.amenities.slice(0, 3).map(a => (
                          <span key={a} className="text-[10px] text-slate-400">
                            • {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Rental Rate</span>
                      <span className="text-lg font-bold font-display text-white tabular-nums">
                        ${venue.pricePerDay.toLocaleString()}
                      </span>
                      <span className="text-slate-400"> / day</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {activeEvent && !isCurrentVenue && (
                        <button
                          onClick={() => handleSelectForActiveEvent(venue)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-purple-300 text-xs font-medium transition-colors"
                        >
                          Select
                        </button>
                      )}
                      <Link
                        to={`/venues/${venue.id}`}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-xs hover:opacity-95 shadow-md shadow-purple-950/40 transition-all flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};
