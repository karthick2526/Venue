import React, { useState } from 'react';
import { useEvent } from '../../context/EventContext';
import { api } from '../../services/api';
import { Venue, EventType } from '../../types';
import { 
  Building2, 
  Plus, 
  Search, 
  Star, 
  MapPin, 
  Trash2, 
  Edit2, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { VenueImage } from '../../components/common/VenueImage';

export const AdminVenuesPage: React.FC = () => {
  const { venues, refreshData, showToast } = useEvent();

  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('San Francisco, CA');
  const [city, setCity] = useState('San Francisco');
  const [pricePerDay, setPricePerDay] = useState(8500);
  const [capacityMin, setCapacityMin] = useState(50);
  const [capacityMax, setCapacityMax] = useState(300);
  const [sqFt, setSqFt] = useState(6500);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80');

  const handleCreateVenue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newVenue: Venue = {
      id: `venue_${Date.now()}`,
      name: name.trim(),
      tagline: tagline.trim() || 'Signature architectural venue',
      description: description.trim() || 'Exceptional event property with full spatial planning compatibility.',
      location: location.trim(),
      city: city.trim(),
      pricePerDay: Number(pricePerDay),
      capacityMin: Number(capacityMin),
      capacityMax: Number(capacityMax),
      sqFt: Number(sqFt),
      image: imageUrl,
      gallery: [imageUrl],
      rating: 4.9,
      reviewsCount: 1,
      amenities: ['Bridal Suite', 'AV Integration', 'Valet Parking', 'Catering Prep Kitchen'],
      rules: {
        curfew: '01:00 AM',
        soundLimitDb: 95,
        outsideCatering: true,
        valetParking: true
      },
      supportedEvents: ['Wedding', 'Corporate', 'Social', 'Entertainment'],
      featured: true
    };

    await api.createVenue(newVenue);
    await refreshData();
    setModalOpen(false);
    showToast(`Added "${name.trim()}" to venue catalog!`);
    setName('');
  };

  const filteredVenues = venues.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>INVENTORY CURATION</span>
            <span>·</span>
            <span>{venues.length} CERTIFIED PROPERTIES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Manage Venues
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Add, update, or retire venue properties in the platform marketplace.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-cyan-950/40 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Venue</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter venues by name or city..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Venues Table */}
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-mono uppercase tracking-wider text-slate-400">
              <th className="p-4 pl-6">Venue Name & City</th>
              <th className="p-4">Daily Rate</th>
              <th className="p-4">Capacity Range</th>
              <th className="p-4">Floor Area</th>
              <th className="p-4">Rating</th>
              <th className="p-4 pr-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs text-slate-300">
            {filteredVenues.map(venue => (
              <tr key={venue.id} className="hover:bg-white/[0.02] transition-colors">
                
                <td className="p-4 pl-6 font-semibold text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10">
                      <VenueImage src={venue.image} alt={venue.name} className="w-full h-full" />
                    </div>
                    <div>
                      <span className="block font-bold">{venue.name}</span>
                      <span className="text-[11px] text-slate-500">{venue.city}, {venue.location}</span>
                    </div>
                  </div>
                </td>

                <td className="p-4 font-mono font-bold text-cyan-300">
                  ${venue.pricePerDay.toLocaleString()} / day
                </td>

                <td className="p-4 font-mono">
                  {venue.capacityMin} – {venue.capacityMax} Pax
                </td>

                <td className="p-4 font-mono text-slate-300">
                  {venue.sqFt.toLocaleString()} sq.ft
                </td>

                <td className="p-4">
                  <span className="flex items-center gap-1 font-mono text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {venue.rating} ({venue.reviewsCount})
                  </span>
                </td>

                <td className="p-4 pr-6 text-right">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 font-bold">
                    Active
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Venue Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Register New Venue Property"
        subtitle="Publish to the discovery catalog and spatial planner"
      >
        <form onSubmit={handleCreateVenue} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Property Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. The Glasshouse Observatory"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                City
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Daily Rate ($ USD)
              </label>
              <input
                type="number"
                required
                value={pricePerDay}
                onChange={e => setPricePerDay(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Min Pax
              </label>
              <input
                type="number"
                value={capacityMin}
                onChange={e => setCapacityMin(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Max Pax
              </label>
              <input
                type="number"
                value={capacityMax}
                onChange={e => setCapacityMax(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Sq. Footage
              </label>
              <input
                type="number"
                value={sqFt}
                onChange={e => setSqFt(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Photo URL
            </label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono"
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
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-cyan-950/40"
            >
              Publish Venue
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
