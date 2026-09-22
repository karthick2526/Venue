import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvent } from '../../context/EventContext';
import { 
  LayoutDashboard, 
  Layers, 
  CalendarDays, 
  Users, 
  Armchair, 
  Briefcase, 
  Clock, 
  Coins, 
  Bookmark, 
  Bell, 
  Settings, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  Plus, 
  ChevronDown, 
  LogOut, 
  ExternalLink,
  Sparkles,
  Calendar,
  Building
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { EventType } from '../../types';

export const WorkspaceLayout: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { 
    events, 
    activeEvent, 
    setActiveEventId, 
    createEvent, 
    progress 
  } = useEvent();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [eventMenuOpen, setEventMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);

  // New Event Form State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventType, setNewEventType] = useState<EventType>('Wedding');
  const [newEventDate, setNewEventDate] = useState('2026-11-20');
  const [newEventGuests, setNewEventGuests] = useState(150);
  const [newEventBudget, setNewEventBudget] = useState(25000);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim() || !user) return;
    setIsSubmitting(true);
    try {
      const created = await createEvent({
        userId: user.id,
        title: newEventTitle.trim(),
        eventType: newEventType,
        date: newEventDate,
        guestTargetCount: Number(newEventGuests),
        totalBudget: Number(newEventBudget),
        notes: 'Newly planned event workspace'
      });
      setCreateEventModalOpen(false);
      setNewEventTitle('');
      navigate(`/events/${created.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navItems = [
    { label: 'Overview', path: '/overview', icon: LayoutDashboard },
    { label: 'Space Planner', path: '/planner', icon: Layers, highlight: true },
    { label: 'My Events', path: '/events', icon: CalendarDays },
    { label: 'Guest List', path: '/guests', icon: Users },
    { label: 'Table Seating', path: '/seating', icon: Armchair },
    { label: 'Vendors', path: '/vendors', icon: Briefcase },
    { label: 'Schedule', path: '/schedule', icon: Clock },
    { label: 'Budget Tracker', path: '/budget', icon: Coins },
    { label: 'Saved Venues', path: '/saved', icon: Bookmark },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col antialiased">
      
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-30 h-16 border-b border-white/5 bg-[#080d19]/90 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6">
        
        {/* Left Side: Mobile toggle + Logo + Active Event Dropdown */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Wordmark */}
          <Link to="/" className="flex items-center gap-2 mr-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#080b13] rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              </div>
            </div>
            <span className="hidden sm:inline text-lg font-bold font-display tracking-tight text-white">
              VENUE<span className="text-purple-400">FLOW</span>
            </span>
          </Link>

          {/* Active Event Switcher */}
          <div className="relative">
            <button
              onClick={() => setEventMenuOpen(!eventMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors text-xs sm:text-sm"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="max-w-[140px] sm:max-w-[200px] truncate">
                <span className="font-semibold text-white block truncate">
                  {activeEvent ? activeEvent.title : 'Select Event'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {eventMenuOpen && (
              <div className="absolute left-0 mt-2 w-72 rounded-2xl glass-panel-glow bg-[#0d1424]/98 border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Switch Active Event
                </div>
                <div className="space-y-1 max-h-56 overflow-y-auto">
                  {events.map(ev => {
                    const isSelected = activeEvent?.id === ev.id;
                    return (
                      <button
                        key={ev.id}
                        onClick={() => {
                          setActiveEventId(ev.id);
                          setEventMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          isSelected ? 'bg-purple-600/30 text-purple-200 font-semibold' : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <div className="truncate">
                          <p className="truncate font-medium">{ev.title}</p>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-2.5 h-2.5" />
                            {ev.date} · {ev.guestTargetCount} guests
                          </span>
                        </div>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => {
                      setEventMenuOpen(false);
                      setCreateEventModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-semibold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create New Event</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Progress Badge */}
          {progress && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
              <span className="text-slate-400">Progress:</span>
              <span className="font-mono font-bold text-purple-400">{progress.overallScore}%</span>
            </div>
          )}
        </div>

        {/* Right Side: Quick Action + Explore Venues + User Profile */}
        <div className="flex items-center gap-3">
          <Link
            to="/explore"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
          >
            <Building className="w-3.5 h-3.5 text-purple-400" />
            <span>Find Venues</span>
          </Link>

          <Link
            to="/planner"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold hover:opacity-95 shadow-md shadow-purple-950/40 transition-all active:scale-95"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Space Planner</span>
            <span className="sm:hidden">Planner</span>
          </Link>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 p-[1px]">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-purple-300">
                      {user?.name ? user.name[0].toUpperCase() : 'U'}
                    </span>
                  )}
                </div>
              </div>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel-glow bg-[#0d1424]/98 border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-white/5">
                  <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                </div>
                <div className="py-1 space-y-0.5 text-xs">
                  <Link
                    to="/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Account Settings</span>
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-cyan-300 hover:bg-white/5 transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Admin Console</span>
                    </Link>
                  )}
                  <Link
                    to="/"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Public Landing Page</span>
                  </Link>
                </div>
                <div className="pt-1 border-t border-white/5">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      logout();
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace Frame with Expandable Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Expandable Sidebar */}
        <aside
          className={`hidden md:flex flex-col border-r border-white/5 bg-[#080c17]/95 transition-all duration-300 shrink-0 ${
            sidebarCollapsed ? 'w-18' : 'w-64'
          }`}
        >
          {/* Collapse/Expand Toggle Button */}
          <div className="p-3 border-b border-white/5 flex items-center justify-end">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/overview' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 font-semibold shadow-inner'
                      : item.highlight
                      ? 'text-pink-300 hover:bg-pink-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-purple-400' : 'group-hover:text-white'}`} />
                  {!sidebarCollapsed && (
                    <span className="truncate tracking-wide">{item.label}</span>
                  )}
                  {!sidebarCollapsed && item.highlight && (
                    <span className="ml-auto text-[10px] font-mono uppercase bg-pink-500/20 text-pink-300 px-1.5 py-0.5 rounded">
                      2D
                    </span>
                  )}
                </Link>
              );
            })}

            {isAdmin && (
              <div className="pt-3 mt-3 border-t border-white/5">
                <Link
                  to="/admin"
                  title={sidebarCollapsed ? 'Admin Console' : undefined}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>Admin Workspace</span>}
                </Link>
              </div>
            )}
          </div>

          {/* Active Event Footer Card in Sidebar */}
          {!sidebarCollapsed && activeEvent && (
            <div className="p-3 m-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-1">Active Event</div>
              <div className="text-xs font-bold text-white truncate">{activeEvent.title}</div>
              <div className="text-[11px] text-purple-400 font-mono mt-0.5 flex items-center justify-between">
                <span>{activeEvent.eventType}</span>
                <span>{activeEvent.guestTargetCount} Guests</span>
              </div>
            </div>
          )}
        </aside>

        {/* Mobile Animated Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <div className="relative w-72 max-w-[85vw] h-full bg-[#080d19] border-r border-white/10 p-4 flex flex-col z-50 animate-in slide-in-from-left duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <span className="text-lg font-bold font-display text-white">
                  VENUE<span className="text-purple-400">FLOW</span>
                </span>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 space-y-1 overflow-y-auto">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-purple-600/20 text-purple-300 font-semibold border border-purple-500/30'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-purple-400" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-rose-400 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Create Event Modal */}
      <Modal
        isOpen={createEventModalOpen}
        onClose={() => setCreateEventModalOpen(false)}
        title="Create New Event"
        subtitle="Initialize a dedicated spatial planning workspace"
      >
        <form onSubmit={handleCreateEvent} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Event Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Summer Gala 2026, Maya & Leo's Wedding"
              value={newEventTitle}
              onChange={e => setNewEventTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Event Type
              </label>
              <select
                value={newEventType}
                onChange={e => setNewEventType(e.target.value as EventType)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0e1627] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="Wedding">Wedding</option>
                <option value="Corporate">Corporate</option>
                <option value="Birthday">Birthday</option>
                <option value="Academic">Academic</option>
                <option value="Social">Social Gala</option>
                <option value="Entertainment">Entertainment / Concert</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Target Date
              </label>
              <input
                type="date"
                required
                value={newEventDate}
                onChange={e => setNewEventDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0e1627] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
              >
              </input>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Target Guests
              </label>
              <input
                type="number"
                min="10"
                max="5000"
                value={newEventGuests}
                onChange={e => setNewEventGuests(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Total Budget ($)
              </label>
              <input
                type="number"
                min="1000"
                step="500"
                value={newEventBudget}
                onChange={e => setNewEventBudget(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setCreateEventModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold hover:opacity-95 shadow-lg shadow-purple-950/40 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Initialize Event'}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
