import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, ArrowUpRight, Zap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({ onOpenTerminal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { name: 'Systems', href: '#systems' },
    { name: 'Telemetry', href: '#telemetry' },
    { name: 'Track Record', href: '#experience' },
    { name: 'Arsenal', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['systems', 'telemetry', 'experience', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Brand / Logo */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 border-[#121316] bg-white shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg transition-all group"
        >
          <div className="w-7 h-7 rounded-lg bg-neo-yellow border-2 border-[#121316] flex items-center justify-center">
            <Zap className="w-4 h-4 text-[#121316] fill-[#121316]" />
          </div>
          <div className="flex items-center gap-1.5 font-bold font-mono tracking-tight text-[#121316]">
            <span>wokovn</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-neo-cyan border border-[#121316] uppercase">
              dev
            </span>
          </div>
        </a>

        {/* Desktop Nav Pills */}
        <nav className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-2xl border-2 border-[#121316] bg-white shadow-neo">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3.5 py-1.5 text-xs font-bold font-mono transition-all rounded-lg border ${
                  isActive
                    ? 'bg-neo-yellow border-[#121316] text-[#121316] shadow-neo-sm'
                    : 'text-[#121316] border-transparent hover:bg-slate-100 hover:border-[#121316]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right CTA cluster */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border-2 border-[#121316] bg-white shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg text-xs font-mono font-bold transition-all"
            title="Launch Interactive Terminal"
          >
            <Terminal className="w-4 h-4 text-[#121316]" />
            <span>Cmd+K</span>
          </button>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border-2 border-[#121316] bg-white shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg transition-all"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4 text-[#121316]" />
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border-2 border-[#121316] bg-white shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg transition-all"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4 text-[#121316]" />
          </a>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-[#121316] bg-neo-pink text-white font-black text-xs uppercase tracking-wider shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg transition-all"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={onOpenTerminal}
            className="p-2.5 rounded-xl border-2 border-[#121316] bg-neo-yellow shadow-neo"
          >
            <Terminal className="w-4 h-4 text-[#121316]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border-2 border-[#121316] bg-white shadow-neo"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#121316]" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-7xl mx-auto rounded-2xl border-2 border-[#121316] bg-white p-4 shadow-neo-lg space-y-2 pointer-events-auto">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-4 py-2 rounded-xl text-sm font-bold font-mono transition-all ${
                  isActive
                    ? 'bg-neo-yellow border-2 border-[#121316]'
                    : 'hover:bg-slate-100 border border-transparent hover:border-[#121316]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <div className="pt-2 border-t-2 border-[#121316] flex items-center justify-between">
            <div className="flex gap-2">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-[#121316]">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-[#121316]">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')} 
              className="px-4 py-2 rounded-xl border-2 border-[#121316] bg-neo-pink text-white font-bold text-xs"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
