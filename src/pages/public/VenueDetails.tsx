import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEvent } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { 
  MapPin, 
  Users, 
  Star, 
  Heart, 
  Calendar, 
  ShieldCheck, 
  Layers, 
  Volume2, 
  Utensils, 
  Car, 
  Clock, 
  ArrowLeft,
  CheckCircle2,
  Check,
  Building
} from 'lucide-react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { VenueImage } from '../../components/common/VenueImage';

export const VenueDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { venues, activeEvent, updateActiveEvent, showToast } = useEvent();
  const { user } = useAuth();

  const venue = venues.find(v => v.id === id) || venues[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!venue) {
    return (
      <div className="min-h-screen bg-[#080b13] flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <Building className="w-12 h-12 text-slate-500 mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Venue Not Found</h2>
          <Link to="/explore" className="text-purple-400 hover:text-purple-300 text-sm font-semibold">
            Return to Explore Venues →
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = venue.gallery && venue.gallery.length > 0 ? venue.gallery : [venue.image];

  const handleSelectVenue = async () => {
    if (!activeEvent) {
      showToast('Please sign in or select an active event first', 'info');
      navigate('/login');
      return;
    }
    await updateActiveEvent({
      venueId: venue.id,
      venueName: venue.name,
      venueImage: venue.image
    });
    showToast(`"${venue.name}" is now confirmed as your event venue!`, 'success');
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      showToast('Please sign in to favorite venues', 'info');
      return;
    }
    setIsFavorite(!isFavorite);
    await api.toggleFavorite(user.id, venue.id);
    showToast(isFavorite ? 'Removed from favorites' : 'Saved to favorites!', 'success');
  };

  const isCurrentEventVenue = activeEvent?.venueId === venue.id;

  return (
    <div className="min-h-screen bg-[#080b13] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-purple-400" />
            <span>Back to All Venues</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleFavorite}
              className={`p-2 rounded-xl border transition-colors flex items-center gap-2 text-xs font-medium ${
                isFavorite 
                  ? 'bg-pink-600/20 border-pink-500/40 text-pink-300' 
                  : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-pink-400' : ''}`} />
              <span>{isFavorite ? 'Saved' : 'Save'}</span>
            </button>

            <Link
              to={`/compare?v1=${venue.id}`}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold transition-colors"
            >
              Compare Side-by-Side
            </Link>
          </div>
        </div>

        {/* Gallery Showcase */}
        <div className="space-y-4">
          <div className="w-full h-80 sm:h-[480px] rounded-3xl overflow-hidden glass-panel border border-white/10 relative">
            <VenueImage
              src={images[activeImageIndex] || venue.image}
              alt={venue.name}
              className="w-full h-full"
            />
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono text-purple-300 border border-white/10">
              {venue.city}, {venue.location}
            </div>
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-amber-300 flex items-center gap-1 border border-white/10">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>{venue.rating} ({venue.reviewsCount} reviews)</span>
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-purple-500 shadow-lg shadow-purple-950/50 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Venue Info & Booking Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Info Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
                Exclusive Event Venue
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold font-display text-white mt-1">
                {venue.name}
              </h1>
              <p className="text-sm text-purple-300/80 font-medium mt-1">
                {venue.tagline}
              </p>
            </div>

            <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
              <p>{venue.description}</p>
            </div>

            {/* Key Specs Matrix */}
            <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
              <h3 className="text-sm font-bold font-display text-white uppercase tracking-wider">
                Venue Architecture & Specifications
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-purple-400" />
                    <span>Capacity</span>
                  </span>
                  <p className="text-sm font-bold text-white font-mono">
                    {venue.capacityMin}–{venue.capacityMax} Pax
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-pink-400" />
                    <span>Floor Area</span>
                  </span>
                  <p className="text-sm font-bold text-white font-mono">
                    {venue.sqFt.toLocaleString()} sq.ft
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Sound Curfew</span>
                  </span>
                  <p className="text-sm font-bold text-white font-mono">
                    {venue.rules.curfew}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Max Decibels</span>
                  </span>
                  <p className="text-sm font-bold text-white font-mono">
                    {venue.rules.soundLimitDb} dB
                  </p>
                </div>
              </div>

              {/* Policy badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Utensils className="w-4 h-4 text-purple-400" />
                  <span>Outside Catering: {venue.rules.outsideCatering ? 'Permitted (Licensed)' : 'In-House Only'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Car className="w-4 h-4 text-purple-400" />
                  <span>Valet Service: {venue.rules.valetParking ? 'Complimentary On-Site' : 'Self-Park Available'}</span>
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
              <h3 className="text-sm font-bold font-display text-white uppercase tracking-wider">
                Included Amenities & Equipment
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {venue.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2D Space Planner Callout */}
            <div className="glass-panel-glow rounded-2xl p-6 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold font-display text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-400" />
                  <span>Interactive 2D Floor Plan Ready</span>
                </h4>
                <p className="text-xs text-slate-300 mt-1 max-w-md">
                  This venue includes calibrated dimensions for our visual space planner. Draft stage, guest tables, and dance floor immediately.
                </p>
              </div>
              <Link
                to="/planner"
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-950/40 shrink-0"
              >
                Launch Space Planner →
              </Link>
            </div>

          </div>

          {/* Sticky Booking/Action Card (4 cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="glass-panel-glow rounded-3xl p-6 sm:p-7 border border-white/10 space-y-6">
              
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block">Daily Rate</span>
                  <span className="text-3xl font-extrabold font-display text-white tabular-nums">
                    ${venue.pricePerDay.toLocaleString()}
                  </span>
                </div>
                <span className="text-xs text-slate-400">Full Day Access</span>
              </div>

              {activeEvent && (
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 text-xs space-y-1.5">
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Active Workspace Event</span>
                  <p className="font-bold text-white truncate">{activeEvent.title}</p>
                  <p className="text-[11px] text-purple-300 font-mono">
                    Date: {activeEvent.date} · Target: {activeEvent.guestTargetCount} Pax
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {isCurrentEventVenue ? (
                  <div className="w-full py-3 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Venue Confirmed for Active Event</span>
                  </div>
                ) : (
                  <button
                    onClick={handleSelectVenue}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-xl shadow-purple-950/50 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Select for Event</span>
                  </button>
                )}

                <Link
                  to="/planner"
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold text-center block transition-colors"
                >
                  Configure Room Layout First
                </Link>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Direct Venue Manager Scheduling Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>Free 48-Hour Reservation Hold</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};
