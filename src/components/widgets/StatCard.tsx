import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  accentColor?: 'purple' | 'pink' | 'cyan' | 'amber' | 'emerald';
  badge?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subValue,
  icon: Icon,
  accentColor = 'purple',
  badge,
  onClick
}) => {
  const colorMap = {
    purple: {
      border: 'border-purple-500/20 hover:border-purple-500/40',
      iconBg: 'bg-purple-500/10 text-purple-400',
      glow: 'shadow-purple-950/20'
    },
    pink: {
      border: 'border-pink-500/20 hover:border-pink-500/40',
      iconBg: 'bg-pink-500/10 text-pink-400',
      glow: 'shadow-pink-950/20'
    },
    cyan: {
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/10 text-cyan-400',
      glow: 'shadow-cyan-950/20'
    },
    amber: {
      border: 'border-amber-500/20 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400',
      glow: 'shadow-amber-950/20'
    },
    emerald: {
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      glow: 'shadow-emerald-950/20'
    }
  };

  const currentTheme = colorMap[accentColor];

  return (
    <div
      onClick={onClick}
      className={`glass-panel rounded-2xl p-5 border transition-all duration-300 ${currentTheme.border} ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      } relative overflow-hidden group`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${currentTheme.iconBg} transition-transform group-hover:scale-110`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold font-display text-white tabular-nums tracking-tight">
          {value}
        </span>
        {badge && (
          <span className="text-xs text-purple-400 font-medium font-mono">
            {badge}
          </span>
        )}
      </div>

      {subValue && (
        <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5 truncate">
          {subValue}
        </p>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};
