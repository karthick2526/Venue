import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Building2, 
  Users, 
  Briefcase, 
  CalendarDays, 
  Settings, 
  ArrowLeft,
  Sparkles,
  LogOut
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const adminNav = [
    { label: 'Admin Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Manage Venues', path: '/admin/venues', icon: Building2 },
    { label: 'Manage Vendors', path: '/admin/vendors', icon: Briefcase },
    { label: 'Manage Users', path: '/admin/users', icon: Users },
    { label: 'All Events', path: '/admin/events', icon: CalendarDays },
    { label: 'Platform Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#060810] text-slate-100 flex flex-col antialiased">
      
      {/* Admin Top Banner */}
      <header className="h-16 border-b border-cyan-500/20 bg-[#080e1d]/90 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#060810] rounded-[7px] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <span className="text-lg font-bold font-display tracking-tight text-white">
              VENUE<span className="text-cyan-400">FLOW</span>
            </span>
          </Link>
          <span className="text-[10px] font-mono uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded ml-2">
            ADMIN CONSOLE
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/overview"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs transition-colors border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Workspace</span>
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Admin Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 border-r border-white/5 bg-[#070b16] p-4 space-y-1 shrink-0 hidden md:block">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 py-2">
            System Administration
          </div>
          {adminNav.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 font-semibold shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : ''}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </aside>

        {/* Admin Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
};
