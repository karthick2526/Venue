import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEvent } from '../../context/EventContext';
import { 
  Building2, 
  Layers, 
  Users, 
  Briefcase, 
  Clock, 
  Coins, 
  ArrowRight, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Maximize2,
  Calendar,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { VenueImage } from '../../components/common/VenueImage';
import { EventType } from '../../types';

export const LandingPage: React.FC = () => {
  const { venues } = useEvent();
  const navigate = useNavigate();
  const [selectedEventType, setSelectedEventType] = useState<EventType>('Wedding');

  const featuredVenue = venues.find(v => v.id === 'grand-aurora') || venues[0];
  const supportingVenues = venues.filter(v => v.id !== featuredVenue?.id).slice(0, 3);

  const eventTypes: { type: EventType; title: string; subtitle: string; image: string; tag: string }[] = [
    {
      type: 'Wedding',
      title: 'Luxury Weddings',
      subtitle: 'Enchanting grand ballrooms, starlit garden verandas, and bespoke aisle arrangements.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      tag: 'Grand Galas'
    },
    {
      type: 'Corporate',
      title: 'Executive Summits',
      subtitle: 'Keynote amphitheaters, panoramic skyline lofts, and precision acoustic staging.',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
      tag: 'Keynotes & Boardrooms'
    },
    {
      type: 'Birthday',
      title: 'Milestone Celebrations',
      subtitle: 'Exclusive glass pavilions, twilight terraces, and vibrant dance floor atmospheres.',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
      tag: 'Private Soirees'
    },
    {
      type: 'Academic',
      title: 'Conferences & Symposiums',
      subtitle: 'Historic stone courtyards, lecture halls, and academic banqueting estates.',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
      tag: 'Conferences'
    },
    {
      type: 'Social',
      title: 'Charity & Social Galas',
      subtitle: 'Tuscan hillside villas with rolling vineyards and candlelight dining terraces.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      tag: 'Red Carpet Receptions'
    },
    {
      type: 'Entertainment',
      title: 'Concerts & Productions',
      subtitle: 'Industrial brick foundries, high-ton rigging points, and nightclub-caliber sound.',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      tag: 'Live Showcases'
    },
    {
      type: 'Other',
      title: 'Bespoke Curations',
      subtitle: 'Customized floor configurations tailored to private fashion exhibitions and art bienniales.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      tag: 'Tailored Formats'
    }
  ];

  const currentEventInfo = eventTypes.find(e => e.type === selectedEventType) || eventTypes[0];

  const flowSteps = [
    {
      step: '01',
      title: 'Venue',
      desc: 'Discover certified estates with verified capacities, acoustics and pricing.',
      icon: Building2,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      step: '02',
      title: 'Space',
      desc: 'Design 2D spatial layouts with interactive stage, tables, and dance floor.',
      icon: Layers,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      step: '03',
      title: 'People',
      desc: 'Track RSVPs, dietary requirements, and live table seat assignments.',
      icon: Users,
      color: 'from-pink-500 to-rose-500'
    },
    {
      step: '04',
      title: 'Vendors',
      desc: 'Coordinate photography, catering, decor, audio, and contracts in sync.',
      icon: Briefcase,
      color: 'from-amber-500 to-orange-500'
    },
    {
      step: '05',
      title: 'Time',
      desc: 'Build minute-by-minute run of show timelines with live lead assignments.',
      icon: Clock,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      step: '06',
      title: 'Budget',
      desc: 'Keep every deposit, vendor quote, and contingency tied to actual costs.',
      icon: Coins,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-[#080b13] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200">
      <Navbar />

      {/* Hero Section: Cinematic Venue Background + Editorial Headline */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85"
            alt="VenueFlow Cinematic Event Reception"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.1]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b13] via-[#080b13]/60 to-transparent" />
          <div className="absolute inset-0 bg-radial from-purple-900/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/10 backdrop-blur-md text-xs text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="font-semibold tracking-wide">Connected Event Workspace</span>
            <span className="text-white/30">·</span>
            <span className="text-slate-300">Venue to Budget Flow</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white leading-[1.08] text-balance">
            PLAN THE PLACE. <br />
            <span className="purple-gradient-text">CREATE THE MOMENT.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Everything for your event in one connected canvas. Discover cinematic venues, draft 2D floor plans, arrange seating, and orchestrate vendors, schedules, and budgets.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/explore"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white font-bold text-sm hover:opacity-95 shadow-xl shadow-purple-950/50 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Explore Venues</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link
              to="/planner"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white font-semibold text-sm backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Launch 2D Space Planner</span>
            </Link>
          </div>

          {/* Micro trust markers */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>Interactive 2D Floor Plan Canvas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-pink-400" />
              <span>Dynamic Guest & Table Sync</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Real-time Budget Cost Integration</span>
            </div>
          </div>

        </div>
      </section>

      {/* Event Selector Section: Wedding, Corporate, Birthday, Academic, Social, Entertainment */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
            Tailored Experiences
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            What Are You Planning?
          </h3>
          <p className="text-sm text-slate-400 mt-2">
            Choose your event category and see how VenueFlow transforms the space and timeline.
          </p>
        </div>

        {/* Category Pill Switcher */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {eventTypes.map(item => {
            const isSelected = selectedEventType === item.type;
            return (
              <button
                key={item.type}
                onClick={() => setSelectedEventType(item.type)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/30'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                }`}
              >
                {item.type}
              </button>
            );
          })}
        </div>

        {/* Active Category Showcase Card */}
        <div className="glass-panel-glow rounded-3xl overflow-hidden border border-white/10 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 h-72 lg:h-96 relative">
            <VenueImage
              src={currentEventInfo.image}
              alt={currentEventInfo.title}
              className="w-full h-full"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-purple-300">
              {currentEventInfo.tag}
            </div>
          </div>

          <div className="lg:col-span-5 p-8 sm:p-12 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
              Curated Event System
            </span>
            <h4 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {currentEventInfo.title}
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {currentEventInfo.subtitle}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <Link
                to={`/explore?type=${selectedEventType}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors"
              >
                <span>Find {selectedEventType} Venues</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
              </Link>
              <Link
                to="/signup"
                className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors"
              >
                Start with this format →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Venue Showcase: Grand Aurora + Small Supporting Set */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
              Signature Properties
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Find Your Place.
            </h3>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>Browse all venues ({venues.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Hero Card */}
        {featuredVenue && (
          <div className="mb-10 glass-panel-glow rounded-3xl border border-purple-500/30 overflow-hidden grid grid-cols-1 lg:grid-cols-12 group">
            <div className="lg:col-span-7 h-80 lg:h-[440px] relative overflow-hidden">
              <VenueImage
                src={featuredVenue.image}
                alt={featuredVenue.name}
                className="w-full h-full"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-purple-600/90 text-white text-xs font-bold shadow-lg">
                ★ FEATURED VENUE
              </div>
            </div>

            <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    {featuredVenue.location}
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-mono">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {featuredVenue.rating} ({featuredVenue.reviewsCount})
                  </span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-bold font-display text-white group-hover:text-purple-300 transition-colors">
                  {featuredVenue.name}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {featuredVenue.description}
                </p>

                {/* Specs row */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-slate-400 block text-[11px]">Guest Capacity</span>
                    <span className="font-bold text-white tabular-nums">
                      {featuredVenue.capacityMin} – {featuredVenue.capacityMax} Guests
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-slate-400 block text-[11px]">Square Footage</span>
                    <span className="font-bold text-white tabular-nums">
                      {featuredVenue.sqFt.toLocaleString()} sq.ft
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {featuredVenue.amenities.slice(0, 3).map(a => (
                    <span key={a} className="text-[11px] text-slate-400">
                      • {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Rental Price</span>
                  <span className="text-2xl font-bold font-display text-white tabular-nums">
                    ${featuredVenue.pricePerDay.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400"> / day</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/venues/${featuredVenue.id}`}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-purple-950/40 transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Small Supporting Set (Avoid Repetitive Grids as per PDF page 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportingVenues.map(venue => (
            <div
              key={venue.id}
              className="glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="h-48 relative overflow-hidden">
                  <VenueImage
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full"
                  />
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-mono text-white flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-current" />
                    {venue.rating}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-purple-400" />
                    {venue.city}
                  </span>
                  <h5 className="font-bold text-base font-display text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                    {venue.name}
                  </h5>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {venue.tagline}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-white/5 mt-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white tabular-nums">${venue.pricePerDay.toLocaleString()}</span>
                  <span className="text-slate-500">/day</span>
                </div>
                <Link
                  to={`/venues/${venue.id}`}
                  className="text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center gap-1"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Space Planner Preview USP Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-2">
            Spatial Planning USP
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Design Your Space in 2D.
          </h3>
          <p className="text-sm text-slate-400 mt-2">
            Turn an empty venue into a tailored room setup with our drag-and-drop spatial planner.
          </p>
        </div>

        {/* Interactive-looking Planner Mock Canvas */}
        <div className="glass-panel-glow rounded-3xl border border-white/10 p-4 sm:p-8 bg-[#090d19]/90 relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-white/10 gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold font-display text-white">Grand Ballroom Preset Layout</span>
              <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                Live 2D Canvas
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">Total Seated Capacity: <strong className="text-white">70 Pax</strong></span>
              <Link
                to="/planner"
                className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>Open Full Editor</span>
                <Maximize2 className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Interactive Visual Floor Canvas Teaser */}
          <div className="w-full h-80 sm:h-96 rounded-2xl bg-[#060911] border border-white/10 bg-venue-grid relative overflow-hidden flex items-center justify-center p-6">
            
            {/* Top Stage */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-12 rounded-xl bg-purple-950/80 border border-purple-500/50 flex items-center justify-center shadow-lg shadow-purple-900/30">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Main Stage & Altar</span>
            </div>

            {/* Central Dance Floor */}
            <div className="w-36 sm:w-48 h-28 sm:h-36 rounded-2xl bg-pink-950/50 border border-pink-500/40 flex flex-col items-center justify-center text-center p-2 shadow-lg shadow-pink-900/20">
              <span className="text-xs font-bold text-pink-300">Dance Floor</span>
              <span className="text-[10px] text-pink-400/80 font-mono">Spotlight Zone</span>
            </div>

            {/* Surrounding Round Tables */}
            <div className="absolute left-8 top-20 w-16 h-16 rounded-full bg-indigo-950/80 border border-indigo-500/50 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-indigo-200">Table 1</span>
              <span className="text-[9px] text-slate-400">10 Seats</span>
            </div>

            <div className="absolute right-8 top-20 w-16 h-16 rounded-full bg-indigo-950/80 border border-indigo-500/50 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-indigo-200">Table 2</span>
              <span className="text-[9px] text-slate-400">10 Seats</span>
            </div>

            <div className="absolute left-8 bottom-12 w-16 h-16 rounded-full bg-indigo-950/80 border border-indigo-500/50 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-indigo-200">Table 3</span>
              <span className="text-[9px] text-slate-400">10 Seats</span>
            </div>

            <div className="absolute right-8 bottom-12 w-16 h-16 rounded-full bg-indigo-950/80 border border-indigo-500/50 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-indigo-200">Table 4</span>
              <span className="text-[9px] text-slate-400">10 Seats</span>
            </div>

            {/* Bar & Photobooth */}
            <div className="absolute left-1/4 bottom-3 px-4 py-1.5 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-[10px] font-medium text-cyan-300">
              Champagne Island
            </div>
            <div className="absolute right-1/4 bottom-3 px-4 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-[10px] font-medium text-emerald-300">
              Photobooth
            </div>

          </div>

          <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-slate-400">
            <span>Stage, Round Tables, Dance Floor, Entrance Arch, Bar, DJ Console</span>
            <Link to="/planner" className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1">
              <span>Try dragging and editing spatial elements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Connected Flow Section: Venue -> Space -> People -> Vendors -> Time -> Budget */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">
            The VenueFlow Architecture
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Everything In Sync.
          </h3>
          <p className="text-sm text-slate-400 mt-2">
            Every part of your event stays connected so nothing slips from paper to reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flowSteps.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="glass-panel rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} p-[1px] flex items-center justify-center`}>
                    <div className="w-full h-full bg-[#0d1424] rounded-[11px] flex items-center justify-center text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-purple-400 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h4 className="text-lg font-bold font-display text-white">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center border-t border-white/5">
        <div className="glass-panel-glow rounded-3xl p-10 sm:p-14 border border-purple-500/30 relative overflow-hidden space-y-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-[1px]">
            <div className="w-full h-full bg-[#080b13] rounded-[15px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Ready to Create Your Moment?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Find your venue, design your space, and connect every detail in one premium workspace.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-xl shadow-purple-950/50 transition-all active:scale-95"
            >
              Start Planning Free
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              Sign In to Existing Project
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
