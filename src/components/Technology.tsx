import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CAPABILITY_CARDS } from '../data/content';
import { CapabilityCard } from '../types';
import { CodeModal } from './CodeModal';
import { SectionHeading } from './ui/SectionHeading';
import { TechCard } from './ui/TechCard';

export const Technology: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    filename: string;
    language: string;
    code: string;
  }>({
    isOpen: false,
    title: '',
    filename: '',
    language: '',
    code: ''
  });

  const categories = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'cloud', label: 'Cloud Computing' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'web', label: 'Web Engineering' },
    { id: 'automation', label: 'Automation' },
    { id: 'devops', label: 'DevOps' },
  ];

  const filteredCards = activeTab === 'all'
    ? CAPABILITY_CARDS
    : CAPABILITY_CARDS.filter(card => card.category === activeTab);

  const handleOpenSnippet = (card: CapabilityCard) => {
    if (card.codeSnippet) {
      setModalConfig({
        isOpen: true,
        title: card.title,
        filename: card.codeSnippet.filename,
        language: card.codeSnippet.language,
        code: card.codeSnippet.code
      });
    }
  };

  return (
    <section id="capabilities" className="py-20 bg-[#080c14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Cloud Capabilities"
          title="Technical Architecture & Engineering Capabilities"
          subtitle="Our technology capabilities span full-stack web engineering, cloud server configuration, reverse proxy routing, and automated delivery pipelines."
          align="left"
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-800/80" role="tablist" aria-label="Capability Categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              role="tab"
              aria-selected={activeTab === cat.id}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                activeTab === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-[#111827] text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Capability Cards Grid with Scroll Reveal */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCards.map((card) => (
            <TechCard
              key={card.id}
              card={card}
              onOpenSnippet={handleOpenSnippet}
            />
          ))}
        </motion.div>

      </div>

      {/* Code Snippet Modal */}
      <CodeModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        title={modalConfig.title}
        filename={modalConfig.filename}
        language={modalConfig.language}
        code={modalConfig.code}
      />
    </section>
  );
};

