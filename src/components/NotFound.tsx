import React from 'react';
import { Terminal, ArrowLeft, Home, Server, Globe, ShieldAlert } from 'lucide-react';
import { Button } from './ui/Button';

interface NotFoundProps {
  onReturnHome?: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onReturnHome }) => {
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onReturnHome) {
      onReturnHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-center items-center px-4 py-16 bg-tech-grid relative overflow-hidden select-none">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full card-panel p-8 sm:p-10 rounded-2xl bg-[#0b101d] border border-slate-800 shadow-2xl relative z-10 text-center space-y-6">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs font-semibold">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>HTTP 404 — Endpoint Not Found</span>
        </div>

        {/* Brand Terminal Header */}
        <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-extrabold text-white">
          <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
            <Terminal className="w-6 h-6" />
          </div>
          <span>Decode<span className="text-blue-400">Labs</span></span>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-slate-100">Requested Resource Unavailable</h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
            The target URL route or asset path could not be resolved by Nginx ingress. It may have been moved, renamed, or is restricted.
          </p>
        </div>

        {/* Terminal Log Container */}
        <div className="p-4 rounded-xl bg-[#050811] border border-slate-800 text-left font-mono text-[11px] text-slate-300 space-y-1">
          <p className="text-rose-400">$ nginx -t --check-route</p>
          <p className="text-slate-400">[ERR] 404 Route handler match failure</p>
          <p className="text-slate-400">[INF] Redirecting client to active ingress origin...</p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            icon={<Home className="w-4 h-4" />}
            iconPosition="left"
            onClick={handleHomeClick}
            className="w-full"
          >
            Return to Homepage
          </Button>
        </div>

        {/* System Specs */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <Server className="w-3 h-3 text-cyan-400" />
            AWS Ubuntu EC2 Target
          </span>
          <span className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-blue-400" />
            Nginx Proxy Node
          </span>
        </div>
      </div>
    </div>
  );
};
