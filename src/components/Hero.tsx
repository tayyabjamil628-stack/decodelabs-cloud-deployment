import React from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/content';
import { CloudVisualizer } from './CloudVisualizer';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';

export const Hero: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (elem) {
      const offsetTop = elem.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-tech-grid">
      {/* Background Subtle Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & CTAs */}
          <motion.div
            className="lg:col-span-6 space-y-6 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status pill badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-mono shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-slate-400">DecodeLabs Cloud Architecture</span>
              <span className="text-slate-600">•</span>
              <span className="text-blue-400 font-semibold">{COMPANY_INFO.region}</span>
            </motion.div>

            {/* Hero Heading */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Building Reliable Solutions for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200">Cloud</span>
            </motion.h1>

            {/* Supporting Subtext */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
              {COMPANY_INFO.subtagline} We design and engineer production-grade web systems, high-availability AWS infrastructure, and automated delivery pipelines built for predictability and performance.
            </motion.p>

            {/* Key Engineering Pillars Bullet Points */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 pt-2 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>AWS EC2 & S3 Infrastructure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Nginx Reverse Proxy Ingress</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Automated CI/CD Workflows</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>TypeScript & React Client</span>
              </div>
            </motion.div>

            {/* Dual CTAs */}
            <motion.div variants={itemVariants} className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                href="#project"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={(e: any) => handleScrollTo(e, 'project')}
              >
                Explore Project
              </Button>

              <Button
                variant="outline"
                size="lg"
                href="#contact"
                onClick={(e: any) => handleScrollTo(e, 'contact')}
              >
                Get in Touch
              </Button>
            </motion.div>

            {/* Technical Stats Summary bar */}
            <motion.div variants={itemVariants} className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <span className="text-slate-300 font-semibold text-sm block">100% Type Safe</span>
                <span className="text-slate-400 text-[11px]">Strict TypeScript</span>
              </div>
              <div>
                <span className="text-slate-300 font-semibold text-sm block">Sub-100ms</span>
                <span className="text-slate-400 text-[11px]">First Contentful Paint</span>
              </div>
              <div>
                <span className="text-slate-300 font-semibold text-sm block">AWS Ready</span>
                <span className="text-slate-400 text-[11px]">Nginx & EC2 Target</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Visual with entrance animation */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <CloudVisualizer />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

