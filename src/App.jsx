import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeBanner from './components/MarqueeBanner';
import NeobrutalSystems from './components/NeobrutalSystems';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsMatrix from './components/SkillsMatrix';
import ContactFooter from './components/ContactFooter';
import TerminalHUD from './components/TerminalHUD';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#121316] font-sans selection:bg-neo-yellow selection:text-[#121316] relative">
      
      {/* Top Navbar */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Hero Section with Three.js 3D WebGL */}
      <main>
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />

        {/* Playful Infinite Marquee Banner */}
        <MarqueeBanner />

        {/* Interactive Architecture Lab (ArkNet, TTS, ISB, PetCareX) */}
        <NeobrutalSystems />

        {/* Experience & Education */}
        <ExperienceTimeline />

        {/* Technical Skills Arsenal */}
        <SkillsMatrix />
      </main>

      {/* Contact & Footer */}
      <ContactFooter onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Retro Terminal HUD Modal (Cmd+K) */}
      <TerminalHUD isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

    </div>
  );
}
