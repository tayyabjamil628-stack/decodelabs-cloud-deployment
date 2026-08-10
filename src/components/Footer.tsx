import React from 'react';
import { COMPANY_INFO, NAV_ITEMS } from '../data/content';
import { Terminal, Github, Linkedin, ArrowUp, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const elem = document.getElementById(targetId);
    if (elem) {
      const offsetTop = elem.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#060911] border-t border-slate-800 text-slate-400 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#hero"
              onClick={handleScrollTop}
              className="inline-flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white shadow-md">
                <Terminal className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-100 flex items-center gap-1">
                  Decode<span className="text-blue-400 font-extrabold">Labs</span>
                </span>
                <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase -mt-1">
                  Cloud Systems
                </span>
              </div>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              DecodeLabs builds reliable cloud-native web applications, high-availability AWS infrastructure architectures, and automated CI/CD deployment pipelines with modern TypeScript engineering standards.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{COMPANY_INFO.systemStatus}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{COMPANY_INFO.version}</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono text-slate-200 uppercase tracking-wider font-semibold">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="hover:text-blue-400 transition-colors focus:outline-none focus:text-blue-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture & External Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono text-slate-200 uppercase tracking-wider font-semibold">
              Cloud Target Spec
            </h4>
            <div className="space-y-1.5 font-mono text-[11px] text-slate-400">
              <p>AWS EC2 • Ubuntu 24.04</p>
              <p>Nginx Ingress Proxy</p>
              <p>AWS S3 Static Storage</p>
              <p>GitHub Actions (Phase 2)</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-blue-600 transition-colors"
                aria-label="LinkedIn Page"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>© {new Date().getFullYear()} DecodeLabs. All rights reserved. Phase 1 Production Foundation.</p>

          <a
            href="#hero"
            onClick={handleScrollTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors border border-slate-800"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
          </a>
        </div>

      </div>
    </footer>
  );
};
