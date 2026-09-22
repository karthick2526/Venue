import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useEvent } from '../../context/EventContext';
import { 
  Plus, 
  X, 
  Check, 
  Minus, 
  Star, 
  MapPin, 
  Users, 
  Layers, 
  Clock, 
  Volume2, 
  Utensils, 
  Car, 
  ArrowLeft 
} from 'lucide-react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { VenueImage } from '../../components/common/VenueImage';

export const CompareVenues: React.FC = () => {
  const { venues, activeEvent, updateActiveEvent, showToast } = useEvent();
  const [searchParams] = useSearchParams();

  const v1Param = searchParams.get('v1');
  const defaultVenues = [
    venues.find(v => v.id === v1Param) || venues[0],
    venues.find(v => v.id === 'glasshouse-pavilion') || venues[1],
    venues.find(v => v.id === 'villa-bella-vista') || venues[2]
  ].filter(Boolean);

  const [selectedVenueIds, setSelectedVenueIds] = useState<string[]>(
    defaultVenues.map(v => v!.id)
  );

  const selectedVenues = selectedVenueIds
    .map(id => venues.find(v => v.id === id))
    .filter(Boolean) as typeof venues;

  const handleAddVenue = (venueId: string) => {
    if (selectedVenueIds.length >= 4) {
      showToast('You can compare up to 4 venues simultaneously', 'info');
      return;
    }
    if (!selectedVenueIds.includes(venueId)) {
      setSelectedVenueIds([...selectedVenueIds, venueId]);
    }
  };

  const handleRemoveVenue = (venueId: string) => {
    if (selectedVenueIds.length <= 1) {
      showToast('Keep at least 1 venue in comparison view', 'info');
      return;
    }
    setSelectedVenueIds(selectedVenueIds.filter(id => id !== venueId));
  };

  const handleSelectForActiveEvent = async (venue: typeof venues[0]) => {
    if (!activeEvent) {
      showToast('Sign in or select an active event first', 'info');
      return;
    }
    await updateActiveEvent({
      venueId: venue.id,
      venueName: venue.name,
      venueImage: venue.image
    });
    showToast(`Assigned ${venue.name} to "${activeEvent.title}"!`);
  };

  const unselectedVenues = venues.filter(v => !selectedVenueIds.includes(v.id));

  return (
    <div className="min-h-screen bg-[#080b13] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4 text-purple-400" />
              <span>Back to Venue Catalog</span>
            </Link>
            <h1 className="text-3xl font-bold font-display text-white tracking-tight">
              Compare Venues Side-by-Side
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Evaluate capacity, square footage, catering allowances, and acoustic limits across candidate spaces.
            </p>
          </div>

          {/* Add Venue Dropdown */}
          {unselectedVenues.length > 0 && selectedVenueIds.length < 4 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Add venue:</span>
              <select
                onChange={e => {
                  if (e.target.value) handleAddVenue(e.target.value);
                  e.target.value = '';
                }}
                defaultValue=""
                className="px-3 py-2 rounded-xl bg-[#0d1424] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="" disabled>Select a venue to add...</option>
                {unselectedVenues.map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Comparison Matrix Table */}
        <div className="glass-panel-glow rounded-3xl border border-white/10 overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            
            {/* Headers: Venue Photos & Titles */}
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="p-6 w-56 text-xs uppercase tracking-wider text-slate-400 font-semibold align-bottom">
                  Metric / Feature
                </th>
                {selectedVenues.map(venue => (
                  <th key={venue.id} className="p-6 min-w-[220px] align-top">
                    <div className="space-y-3 relative">
                      <button
                        onClick={() => handleRemoveVenue(venue.id)}
                        className="absolute -top-2 -right-2 p-1.5 rounded-full bg-black/70 hover:bg-rose-900/80 text-slate-400 hover:text-white transition-colors"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="h-28 rounded-xl overflow-hidden relative">
                        <VenueImage src={venue.image} alt={venue.name} className="w-full h-full" />
                      </div>

                      <div>
                        <div className="flex items-center gap-1 text-[11px] text-purple-300">
                          <MapPin className="w-3 h-3" />
                          <span>{venue.city}</span>
                        </div>
                        <h4 className="text-base font-bold font-display text-white mt-0.5 line-clamp-1">
                          {venue.name}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-amber-400 font-mono mt-1">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{venue.rating} ({venue.reviewsCount})</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <span className="text-xl font-bold font-display text-white tabular-nums">
                          ${venue.pricePerDay.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400"> / day</span>
                      </div>

                      <button
                        onClick={() => handleSelectForActiveEvent(venue)}
                        className={`w-full py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                          activeEvent?.venueId === venue.id
                            ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                            : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-950/40'
                        }`}
                      >
                        {activeEvent?.venueId === venue.id ? 'Selected Venue' : 'Select for Event'}
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body Rows */}
            <tbody className="divide-y divide-white/5 text-xs text-slate-300">
              {/* Capacity */}
              <tr>
                <td className="p-4 font-semibold text-slate-400 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>Guest Capacity</span>
                </td>
                {selectedVenues.map(venue => (
                  <td key={venue.id} className="p-4 font-bold text-white font-mono">
                    {venue.capacityMin} – {venue.capacityMax} Guests
                  </td>
                ))}
              </tr>

              {/* Square Footage */}
              <tr>
                <td className="p-4 font-semibold text-slate-400 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-pink-400" />
                  <span>Floor Space Area</span>
                </td>
                {selectedVenues.map(venue => (
                  <td key={venue.id} className="p-4 font-bold text-white font-mono">
                    {venue.sqFt.toLocaleString()} sq.ft
                  </td>
                ))}
              </tr>

              {/* Sound Curfew */}
              <tr>
                <td className="p-4 font-semibold text-slate-400 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Evening Curfew</span>
                </td>
                {selectedVenues.map(venue => (
                  <td key={venue.id} className="p-4 font-mono">
                    {venue.rules.curfew}
                  </td>
                ))}
              </tr>

              {/* Max Decibels */}
              <tr>
                <td className="p-4 font-semibold text-slate-400 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <span>Max Sound Volume</span>
                </td>
                {selectedVenues.map(venue => (
                  <td key={venue.id} className="p-4 font-mono">
                    {venue.rules.soundLimitDb} dB
                  </td>
                ))}
              </tr>

              {/* Outside Catering */}
              <tr>
                <td className="p-4 font-semibold text-slate-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-purple-400" />
                  <span>Outside Catering</span>
                </td>
                {selectedVenues.map(venue => (
                  <td key={venue.id} className="p-4">
                    {venue.rules.outsideCatering ? (
                      <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" /> Permitted (BYO Allowed)
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Minus className="w-3.5 h-3.5" /> In-House Only
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Valet Parking */}
              <tr>
                <td className="p-4 font-semibold text-slate-400 flex items-center gap-2">
                  <Car className="w-4 h-4 text-purple-400" />
                  <span>Valet Parking Service</span>
                </td>
                {selectedVenues.map(venue => (
                  <td key={venue.id} className="p-4">
                    {venue.rules.valetParking ? (
                      <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" /> Included on-site
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Minus className="w-3.5 h-3.5" /> Self-parking only
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Supported Events */}
              <tr>
                <td className="p-4 font-semibold text-slate-400">
                  Ideal Event Formats
                </td>
                {selectedVenues.map(venue => (
                  <td key={venue.id} className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {venue.supportedEvents.map(ev => (
                        <span key={ev} className="text-[10px] text-slate-300">
                          {ev} ·
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Full Details link */}
              <tr className="bg-white/[0.01]">
                <td className="p-4 font-semibold text-slate-400">
                  Detailed Page
                </td>
                {selectedVenues.map(venue => (
                  <td key={venue.id} className="p-4">
                    <Link
                      to={`/venues/${venue.id}`}
                      className="text-purple-400 hover:text-purple-300 font-semibold"
                    >
                      View Full Specs →
                    </Link>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

      </main>

      <Footer />
    </div>
  );
};
