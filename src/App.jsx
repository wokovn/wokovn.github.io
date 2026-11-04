import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MetricsBar from './components/MetricsBar';
import SystemsShowcase from './components/SystemsShowcase';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsMatrix from './components/SkillsMatrix';
import ContactFooter from './components/ContactFooter';
import TerminalHUD from './components/TerminalHUD';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080c15] text-slate-100 font-sans selection:bg-brand-cyan/20 selection:text-brand-cyan relative">
      
      {/* Background Subtle Grid Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      {/* Top Navbar */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Hero Section */}
      <main>
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />

        {/* Engineering Metrics Ribbon */}
        <MetricsBar />

        {/* Systems Showcase (ArkNet, Vietnamese TTS, ISB, PetCareX) */}
        <SystemsShowcase />

        {/* Experience & Education */}
        <ExperienceTimeline />

        {/* Technical Skills Matrix */}
        <SkillsMatrix />
      </main>

      {/* Contact & Footer */}
      <ContactFooter onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Interactive Terminal HUD Modal (Cmd+K) */}
      <TerminalHUD isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

    </div>
  );
}
