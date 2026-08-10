import React from 'react';
import { motion } from 'motion/react';
import { CapabilityCard } from '../../types';
import { Badge } from './Badge';
import { Server, Network, LayoutGrid, Zap, ShieldCheck, FileCode, CheckCircle2, ArrowRight } from 'lucide-react';

interface TechCardProps {
  card: CapabilityCard;
  onOpenSnippet?: (card: CapabilityCard) => void;
}

export const TechCard: React.FC<TechCardProps> = ({ card, onOpenSnippet }) => {
  let Icon = Server;
  if (card.iconName === 'Network') Icon = Network;
  if (card.iconName === 'LayoutGrid') Icon = LayoutGrid;
  if (card.iconName === 'Zap') Icon = Zap;
  if (card.iconName === 'ShieldCheck') Icon = ShieldCheck;

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="card-panel p-6 rounded-2xl flex flex-col justify-between space-y-6 group hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/30"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
            <Icon className="w-5 h-5" />
          </div>
          <Badge variant="cyan" size="sm">
            {card.category}
          </Badge>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-100 mb-2">{card.title}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{card.description}</p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {card.techStack.map((tech, idx) => (
            <Badge key={idx} variant="neutral" size="sm">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Key Features List */}
        <div className="pt-2 space-y-1.5 border-t border-slate-800/80">
          {card.keyFeatures.map((feature, fIdx) => (
            <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Snippet CTA if code snippet exists */}
      {card.codeSnippet ? (
        <button
          onClick={() => onOpenSnippet && onOpenSnippet(card)}
          className="w-full pt-3 mt-4 border-t border-slate-800 text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center justify-between group-hover:translate-x-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md p-1"
        >
          <span className="flex items-center gap-1.5 font-semibold">
            <FileCode className="w-4 h-4 text-cyan-400" />
            View {card.codeSnippet.filename}
          </span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      ) : (
        <div className="pt-3 mt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>Target Spec: Production</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Verified
          </span>
        </div>
      )}
    </motion.div>
  );
};
