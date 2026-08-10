import React from 'react';
import { motion } from 'motion/react';
import { WHY_DECODELABS_REASONS } from '../data/content';
import { CheckCircle2, FileCode2, Lock, Layers, Shield, Terminal } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';

export const WhyDecodeLabs: React.FC = () => {
  return (
    <section id="why-us" className="py-20 bg-[#080c14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Engineering Principles"
          title="Why Partner with DecodeLabs?"
          subtitle="We operate with a disciplined engineering ethos focused on simplicity, security, and reproducible cloud infrastructure."
          align="left"
        />

        {/* 4 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WHY_DECODELABS_REASONS.map((reason, idx) => {
            let Icon = CheckCircle2;
            if (reason.icon === 'FileCode2') Icon = FileCode2;
            if (reason.icon === 'Lock') Icon = Lock;
            if (reason.icon === 'Layers') Icon = Layers;

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="card-panel p-8 rounded-2xl flex items-start gap-5 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-950/20 transition-all group"
              >
                <div className="p-3.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-100">{reason.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Callout Card */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-[#0d1527] to-[#0a101e] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0 hidden sm:flex">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">Declarative & Reproducible Workflows</h4>
              <p className="text-xs text-slate-300 max-w-2xl">
                Every server deployment and web build script is stored directly in version control. No untracked manual edits on live production servers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-cyan-400 shrink-0 bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-800">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Clean Architecture Guardrails</span>
          </div>
        </div>

      </div>
    </section>
  );
};

