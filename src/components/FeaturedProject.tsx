import React, { useState } from 'react';
import { DEPLOYMENT_PIPELINE } from '../data/content';
import { SectionHeading } from './ui/SectionHeading';
import { Badge } from './ui/Badge';
import {
  Code,
  GitBranch,
  Workflow,
  Database,
  Server,
  Globe,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  Terminal,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export const FeaturedProject: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<number>(1);

  const selectedStage = DEPLOYMENT_PIPELINE.find((s) => s.id === selectedStageId) || DEPLOYMENT_PIPELINE[0];

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return Code;
      case 'GitBranch': return GitBranch;
      case 'Workflow': return Workflow;
      case 'Database': return Database;
      case 'Server': return Server;
      case 'Globe': return Globe;
      default: return Layers;
    }
  };

  return (
    <section id="project" className="py-20 bg-[#0b101d] border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Featured Project Blueprint"
          title="Cloud Deployment Project Pipeline"
          subtitle="This website serves as the live architectural artifact for our cloud infrastructure showcase — designed for high-availability deployment on AWS EC2, Ubuntu, Nginx, and S3."
          align="left"
        />

        {/* Phase Clarification Banner */}
        <div className="mb-10 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-200 font-semibold block">Deployment Pipeline Status</span>
              <span className="text-slate-400">Phase 1: Foundation Layout & Active Server Host. Phase 2: GitHub Actions CI/CD & S3 bundle sync.</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="emerald" pulse icon={<CheckCircle2 className="w-3 h-3" />}>
              Phase 1 Active
            </Badge>
            <Badge variant="amber" icon={<Clock className="w-3 h-3" />}>
              Phase 2 Target
            </Badge>
          </div>
        </div>

        {/* Interactive Architecture Flow Pipeline Stage Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Pipeline Step Selector Cards */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Pipeline Stage Technical Deep Dive
            </h3>

            <div className="space-y-2.5">
              {DEPLOYMENT_PIPELINE.map((stage) => {
                const Icon = getStageIcon(stage.icon);
                const isSelected = stage.id === selectedStageId;
                const isRoadmap = stage.status === 'roadmap';

                return (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStageId(stage.id)}
                    className={`w-full p-4 rounded-xl cursor-pointer transition-all duration-200 border flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                      isSelected
                        ? 'bg-blue-950/40 border-blue-500/80 shadow-md shadow-blue-950/40 scale-[1.01]'
                        : 'bg-[#111827] border-slate-800 hover:border-slate-700 hover:bg-[#162032]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2.5 rounded-lg ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-slate-400">0{stage.id}.</span>
                          <h4 className="text-xs font-bold text-slate-100">{stage.name}</h4>
                        </div>
                        <p className="text-[11px] text-slate-400">{stage.service}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {isRoadmap ? (
                        <Badge variant="amber" size="sm">
                          Phase 2
                        </Badge>
                      ) : (
                        <Badge variant="emerald" size="sm" icon={<CheckCircle2 className="w-3 h-3" />}>
                          Ready
                        </Badge>
                      )}
                      <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-blue-400 translate-x-1' : 'text-slate-600'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Stage Specification Inspector Panel */}
          <div className="lg:col-span-5 card-panel p-6 rounded-2xl border border-slate-800 bg-[#0d1424] space-y-6 lg:sticky lg:top-24">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  Stage 0{selectedStage.id} Specification
                </span>
                <h3 className="text-lg font-bold text-white">{selectedStage.name}</h3>
                <p className="text-xs font-mono text-slate-400">{selectedStage.service}</p>
              </div>

              <Badge
                variant={selectedStage.status === 'active' ? 'emerald' : 'amber'}
                pulse={selectedStage.status === 'active'}
              >
                {selectedStage.status === 'active' ? 'Phase 1 Active' : 'Phase 2 Target'}
              </Badge>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                Architectural Role
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                {selectedStage.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 font-mono">
                Technical Specifications & Tools
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {selectedStage.techSpecs.map((spec, sIdx) => (
                  <div key={sIdx} className="p-2.5 rounded-lg bg-[#080d18] border border-slate-800/80 text-slate-300 flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Spec
              </span>
              <span>DecodeLabs Architecture v1.0</span>
            </div>
          </div>

        </div>

        {/* Deployment Technologies Grid Summary */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center font-mono text-xs">
          <div className="p-4 rounded-xl card-panel">
            <span className="text-slate-400 block text-[10px] mb-1">Host OS</span>
            <span className="text-slate-200 font-bold">Ubuntu Linux</span>
          </div>
          <div className="p-4 rounded-xl card-panel">
            <span className="text-slate-400 block text-[10px] mb-1">Ingress Proxy</span>
            <span className="text-slate-200 font-bold">Nginx</span>
          </div>
          <div className="p-4 rounded-xl card-panel">
            <span className="text-slate-400 block text-[10px] mb-1">Compute Host</span>
            <span className="text-slate-200 font-bold">AWS EC2</span>
          </div>
          <div className="p-4 rounded-xl card-panel">
            <span className="text-slate-400 block text-[10px] mb-1">Asset Storage</span>
            <span className="text-slate-200 font-bold">AWS S3</span>
          </div>
          <div className="p-4 rounded-xl card-panel">
            <span className="text-slate-400 block text-[10px] mb-1">Version Control</span>
            <span className="text-slate-200 font-bold">GitHub</span>
          </div>
          <div className="p-4 rounded-xl card-panel">
            <span className="text-slate-400 block text-[10px] mb-1">CI/CD Engine</span>
            <span className="text-slate-200 font-bold text-amber-400">Actions (Phase 2)</span>
          </div>
        </div>

      </div>
    </section>
  );
};

