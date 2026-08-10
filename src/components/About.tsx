import React from 'react';
import { CORE_PILLARS } from '../data/content';
import { Code2, Cloud, Cpu, GitBranch, Shield, Server, Check } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#0b101d] border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="About DecodeLabs"
          title="Engineering Modern Systems with Precision & Discipline"
          subtitle="DecodeLabs is a cloud-focused technology organization dedicated to engineering reliable digital infrastructure, high-performance web applications, and automated deployment architectures."
          align="left"
        />

        {/* Company Overview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          
          {/* Main Narrative Card */}
          <div className="lg:col-span-7 card-panel p-8 rounded-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-400" />
                Our Core Focus Areas
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Modern technology ecosystems demand predictable runtime behavior, zero-downtime deployments, and maintainable software patterns. At DecodeLabs, we specialize in bridging frontend user experiences with robust backend cloud server orchestration.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our engineering workflows emphasize modular code bases, strict type safety, containerization, and Infrastructure as Code (IaC) principles to ensure every environment behaves deterministically.
              </p>
            </div>

            {/* Checklist of foundational practices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Clean Architecture & Modular Code</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Automated Infrastructure Provisioning</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Nginx Reverse Proxy Optimization</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Strict Security & Firewalls (UFW)</span>
              </div>
            </div>
          </div>

          {/* Core Philosophy Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#121b2d] to-[#0c1220] p-8 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6 shadow-xl">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">The Engineering Standard</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                We believe in grounded, evidence-based system development. Instead of superficial claims, we prioritize observable system health, clean documentation, and resilient automated deployment pipelines.
              </p>

              <div className="space-y-3 font-mono text-xs pt-2">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Primary Operating System</span>
                  <span className="text-slate-200 font-semibold">Ubuntu Linux 24.04 LTS</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Primary Web Proxy</span>
                  <span className="text-slate-200 font-semibold">Nginx Ingress Server</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Client Framework</span>
                  <span className="text-slate-200 font-semibold">React 19 & TypeScript 5.8</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_PILLARS.map((pillar, idx) => {
            let Icon = Code2;
            if (pillar.icon === 'Cloud') Icon = Cloud;
            if (pillar.icon === 'Cpu') Icon = Cpu;
            if (pillar.icon === 'GitBranch') Icon = GitBranch;

            return (
              <div
                key={idx}
                className="card-panel p-6 rounded-xl flex flex-col justify-between space-y-4 group hover:-translate-y-1 transition-all hover:border-blue-500/40"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-100 mb-2">{pillar.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{pillar.description}</p>
                </div>

                {pillar.metric && (
                  <div className="pt-3 border-t border-slate-800/80 font-mono text-xs">
                    <span className="text-cyan-400 font-bold block">{pillar.metric}</span>
                    <span className="text-slate-400 text-[10px]">{pillar.metricLabel}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

