import React, { useState } from 'react';
import { useEvent } from '../../context/EventContext';
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Coins, 
  Users, 
  Trash2, 
  CheckCheck 
} from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  category: 'rsvp' | 'budget' | 'schedule' | 'vendor';
  read: boolean;
}

export const NotificationsPage: React.FC = () => {
  const { showToast } = useEvent();

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif_1',
      title: 'New RSVP Received',
      message: 'Marcus & Elena Vance confirmed attendance (+1 guest).',
      time: '15 mins ago',
      category: 'rsvp',
      read: false
    },
    {
      id: 'notif_2',
      title: 'Vendor Deposit Scheduled',
      message: 'Catering deposit for Grand Aurora ($1,500) has been recorded.',
      time: '2 hours ago',
      category: 'budget',
      read: false
    },
    {
      id: 'notif_3',
      title: 'Floor Plan Calibrated',
      message: 'Grand Ballroom 2D preset was saved with 10 tables.',
      time: '1 day ago',
      category: 'schedule',
      read: true
    },
    {
      id: 'notif_4',
      title: 'Vendor Contract Pending',
      message: 'Luminary Studios proposal requires sign-off before Friday.',
      time: '2 days ago',
      category: 'vendor',
      read: true
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'rsvp': return <Users className="w-4 h-4 text-cyan-400" />;
      case 'budget': return <Coins className="w-4 h-4 text-emerald-400" />;
      case 'vendor': return <AlertCircle className="w-4 h-4 text-amber-400" />;
      default: return <Clock className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>ACTIVITY & ALERTS</span>
            <span>·</span>
            <span>{notifications.filter(n => !n.read).length} UNREAD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Notifications
          </h1>
        </div>

        <button
          onClick={markAllAsRead}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors flex items-center gap-2"
        >
          <CheckCheck className="w-4 h-4 text-purple-400" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl border border-white/5 text-slate-500 text-xs">
            No notifications at this time.
          </div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              className={`glass-panel rounded-2xl p-4 sm:p-5 border transition-all flex items-start justify-between gap-4 ${
                !n.read ? 'border-purple-500/40 bg-[#0d1424]/90' : 'border-white/5 bg-[#080d19]/60'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  {getCategoryIcon(n.category)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white font-display">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-slate-500 font-mono mt-2 block">{n.time}</span>
                </div>
              </div>

              <button
                onClick={() => deleteNotification(n.id)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-white/5 transition-colors"
                title="Dismiss"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
