import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeBanner from './components/MarqueeBanner';
import ExperienceTimeline from './components/ExperienceTimeline';
import NeobrutalSystems from './components/NeobrutalSystems';
import SkillsMatrix from './components/SkillsMatrix';
import ContactFooter from './components/ContactFooter';
import ContactPage from './components/ContactPage';
import TerminalHUD from './components/TerminalHUD';
import { ScrollProgressRail } from './components/MotionPrimitives';
import { sfx } from './utils/sfx';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(false);
  const [pendingSection, setPendingSection] = useState(null);
  const [page, setPage] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#/contact') {
      return 'contact';
    }
    return 'home';
  });

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('wokovn_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('wokovn_theme', theme);
  }, [theme]);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === '#/contact') {
        setPage('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setPage('home');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const onGlobalKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onGlobalKey);
    return () => window.removeEventListener('keydown', onGlobalKey);
  }, []);

  const handleToggleTheme = () => {
    sfx.playSwitch(theme === 'light');
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleSfx = () => {
    const next = !sfxEnabled;
    setSfxEnabled(next);
    sfx.setEnabled(next);
  };

  const navigateToContact = () => {
    setPendingSection(null);
    setPage('contact');
    window.history.pushState(null, '', '#/contact');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const navigateHome = (sectionId) => {
    const scrollToTarget = (id) => {
      if (!id || id === '__top__') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    };

    if (sectionId) {
      window.history.pushState(null, '', `#${sectionId}`);
    } else {
      window.history.pushState(null, '', '#');
    }

    if (page === 'home') {
      scrollToTarget(sectionId || '__top__');
    } else {
      setPendingSection(sectionId || '__top__');
      setPage('home');
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  useEffect(() => {
    if (page !== 'home' || !pendingSection) return undefined;
    const target = pendingSection;
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        if (target === '__top__') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(target);
          if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 64;
            window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
          }
        }
        setPendingSection(null);
      });
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [page, pendingSection]);

  return (
    <div className="min-h-screen relative transition-colors duration-300 overflow-x-clip">
      <ScrollProgressRail />

      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        sfxEnabled={sfxEnabled}
        onToggleSfx={handleToggleSfx}
        currentPage={page}
        onNavigateHome={navigateHome}
        onNavigateContact={navigateToContact}
      />

      {page === 'contact' ? (
        <ContactPage key="contact-page" onBack={() => navigateHome()} />
      ) : (
        <main key="home-page" className="overflow-x-clip">
            <Hero
              onOpenTerminal={() => setTerminalOpen(true)}
              onNavigateContact={navigateToContact}
              theme={theme}
            />
            <MarqueeBanner />
            {/* HR-friendly order: 01 Background & Work Experience FIRST, then 02 Projects, 03 Skills */}
            <ExperienceTimeline />
            <NeobrutalSystems />
            <SkillsMatrix />
            <ContactFooter
              onOpenTerminal={() => setTerminalOpen(true)}
              onNavigateContact={navigateToContact}
            />
          </main>
        )}

      <TerminalHUD
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onNavigateContact={navigateToContact}
      />
    </div>
  );
}
