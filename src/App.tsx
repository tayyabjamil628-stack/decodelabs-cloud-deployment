import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Technology } from './components/Technology';
import { FeaturedProject } from './components/FeaturedProject';
import { WhyDecodeLabs } from './components/WhyDecodeLabs';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Sticky Header Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About DecodeLabs */}
        <About />

        {/* 3. Cloud / Technology Capabilities */}
        <Technology />

        {/* 4. Featured Project */}
        <FeaturedProject />

        {/* 5. Why DecodeLabs */}
        <WhyDecodeLabs />

        {/* 6. Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
