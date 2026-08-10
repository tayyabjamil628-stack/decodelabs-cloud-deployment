import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'cyan' | 'emerald' | 'amber' | 'neutral';
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  pulse = false,
  className = '',
  icon,
}) => {
  const variantStyles = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    neutral: 'bg-slate-800/80 text-slate-300 border-slate-700/80',
  };

  const pulseStyles = {
    blue: 'bg-blue-400',
    cyan: 'bg-cyan-400',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    neutral: 'bg-slate-400',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px] font-mono',
    md: 'px-2.5 py-1 text-xs font-mono',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border font-medium whitespace-nowrap tracking-wide ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {pulse && (
        <span className={`w-1.5 h-1.5 rounded-full ${pulseStyles[variant]} animate-pulse`} />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
