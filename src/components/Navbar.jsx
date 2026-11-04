import React, { useState, useEffect } from 'react';
import { Terminal, ExternalLink, Menu, X, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({ onOpenTerminal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Systems', href: '#bento-systems' },
    { name: 'Benchmarks', href: '#benchmarks' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#090d16]/85 backdrop-blur-md border-b border-surface-border/80 py-3 shadow-xl shadow-black/30' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-surface-100 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan font-mono font-bold group-hover:border-brand-cyan group-hover:shadow-[0_0_15px_rgba(0,247,247,0.3)] transition-all">
            &gt;_
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-semibold tracking-tight text-white group-hover:text-brand-cyan transition-colors">
              wokovn<span className="text-brand-cyan">.dev</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              Software Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-100/60 p-1.5 rounded-full border border-surface-border/60 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-surface-hover/80 rounded-full transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls & Terminal HUD trigger */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-100 border border-surface-border hover:border-brand-cyan/50 text-slate-300 hover:text-brand-cyan text-xs font-mono transition-all group"
            title="Launch Terminal HUD"
          >
            <Terminal className="w-3.5 h-3.5 text-brand-cyan group-hover:animate-pulse" />
            <span>Terminal</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-surface-200 border border-surface-border rounded text-slate-400 font-mono">
              Cmd+K
            </kbd>
          </button>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-surface-100 border border-surface-border hover:border-slate-500 text-slate-300 hover:text-white transition-all"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-surface-100 border border-surface-border hover:border-blue-500/50 text-slate-300 hover:text-blue-400 transition-all"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20 hover:from-brand-cyan/30 hover:to-brand-violet/30 border border-brand-cyan/40 text-brand-cyan hover:text-white text-xs font-medium transition-all shadow-[0_0_15px_rgba(0,247,247,0.15)]"
          >
            Get In Touch
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-lg bg-surface-100 border border-surface-border text-brand-cyan"
            aria-label="Open Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-surface-100 border border-surface-border text-slate-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-100/95 backdrop-blur-xl border-b border-surface-border px-4 py-4 space-y-2 mt-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-surface-hover"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-surface-border flex items-center justify-between">
            <div className="flex gap-2">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-surface-200 rounded-lg text-slate-300">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-surface-200 rounded-lg text-slate-300">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 bg-brand-cyan text-slate-950 font-semibold text-xs rounded-lg"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
