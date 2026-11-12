import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Menu,
  X,
  ArrowUpRight,
  Sun,
  Moon,
  Volume2,
  VolumeX
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';
import { sfx } from '../utils/sfx';

export default function Navbar({
  onOpenTerminal,
  theme,
  onToggleTheme,
  sfxEnabled,
  onToggleSfx,
  currentPage,
  onNavigateHome,
  onNavigateContact
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#systems' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact Page', href: '#/contact', isPage: true }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      if (currentPage === 'contact') {
        setActiveSection('/contact');
        return;
      }
      const sections = ['experience', 'systems', 'skills'];
      const scrollPos = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sections[i]);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    sfx.playTick(720);
    setMobileMenuOpen(false);
    if (link.isPage) {
      onNavigateContact();
      return;
    }
    const targetId = link.href.replace('#', '');
    onNavigateHome(targetId);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-2.5 bg-[var(--bg-canvas)]/92 backdrop-blur-md border-b border-[var(--border-hairline)] pointer-events-none">
      <div className="max-w-7xl mx-auto relative flex items-center justify-between pointer-events-auto">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            sfx.playTick(640);
            onNavigateHome();
          }}
          className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border transition-all backdrop-blur-md ${
            scrolled
              ? 'bg-[var(--bg-surface)]/90 border-[var(--border-strong)] shadow-sm'
              : 'bg-[var(--bg-surface)]/80 border-[var(--border-hairline)]'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-[var(--signal)] inline-block" />
          <span className="font-mono font-bold text-xs tracking-tight">
            wokovn<span className="text-[var(--text-muted)]">.dev</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-well)] text-[var(--text-muted)] border border-[var(--border-hairline)]">
            SWE
          </span>
        </a>

        {/* Centered Floating Nav */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1 p-1 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]/85 backdrop-blur-md shadow-sm"
        >
          {navLinks.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative px-3.5 py-1.5 text-xs font-mono font-semibold transition-colors duration-200 rounded-xl whitespace-nowrap ${
                  isActive
                    ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)] shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-well)]/60'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="hidden lg:flex items-center gap-1.5">
          <button
            onClick={onToggleSfx}
            title={sfxEnabled ? 'Mute Tactile UI Audio' : 'Enable Tactile UI Audio'}
            className={`px-2.5 py-2 rounded-xl border text-[11px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md transition-colors ${
              sfxEnabled
                ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)] border-[var(--text-primary)]'
                : 'bg-[var(--bg-surface)]/85 text-[var(--text-muted)] border-[var(--border-hairline)] hover:text-[var(--text-primary)]'
            }`}
          >
            {sfxEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline">SFX</span>
          </button>

          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Paper Mode' : 'Switch to Dark Mode'}
            className="px-2.5 py-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]/85 backdrop-blur-md text-[11px] font-mono font-semibold flex items-center gap-1.5 hover:border-[var(--border-strong)] transition-colors"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden lg:inline">PAPER</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">INK</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              sfx.playTick(760);
              onOpenTerminal();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]/85 backdrop-blur-md hover:border-[var(--border-strong)] text-[11px] font-mono font-semibold transition-colors"
            title="Open Interactive CLI (Cmd+K)"
          >
            <Terminal className="w-3.5 h-3.5 text-[var(--signal)]" />
            <span>⌘K</span>
          </button>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]/85 backdrop-blur-md hover:border-[var(--border-strong)] transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]/85 backdrop-blur-md hover:border-[var(--border-strong)] transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={() => {
              sfx.playTick(720);
              onNavigateContact();
            }}
            className="hidden lg:inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[var(--signal)] text-white font-mono font-bold text-[11px] uppercase tracking-wide hover:opacity-90 transition-opacity"
          >
            <span>Hire / Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile & Tablet Controls */}
        <div className="lg:hidden flex items-center gap-1.5">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]/90 backdrop-blur-md"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]/90 backdrop-blur-md"
            aria-label="Open Terminal"
          >
            <Terminal className="w-4 h-4 text-[var(--signal)]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)]/90 backdrop-blur-md"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-2.5 max-w-7xl mx-auto rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)]/95 backdrop-blur-lg p-3.5 shadow-lg space-y-1.5 pointer-events-auto"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`block px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-colors ${
                    isActive
                      ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)]'
                      : 'hover:bg-[var(--bg-well)]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="pt-2 mt-2 border-t border-[var(--border-hairline)] flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-[var(--border-hairline)]"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-[var(--border-hairline)]"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <button
                  onClick={onToggleSfx}
                  className="px-2.5 py-1 rounded-lg border border-[var(--border-hairline)] text-[10px] font-mono font-bold"
                >
                  SFX: {sfxEnabled ? 'ON' : 'OFF'}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateContact();
                }}
                className="px-3.5 py-2 rounded-xl bg-[var(--signal)] text-white font-mono font-bold text-xs"
              >
                Contact Page
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
