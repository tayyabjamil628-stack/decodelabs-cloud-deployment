import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Technology } from './components/Technology';
import { FeaturedProject } from './components/FeaturedProject';
import { WhyDecodeLabs } from './components/WhyDecodeLabs';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { NotFound } from './components/NotFound';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleReturnHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If visiting /404 or any unrecognized subpath other than root / or index.html
  if (currentPath !== '/' && currentPath !== '/index.html' && !currentPath.startsWith('/#')) {
    return <NotFound onReturnHome={handleReturnHome} />;
  }

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
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

        {/* 4. Featured Project (Cloud Deployment Project) */}
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

