import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, ArrowUpRight, Copy, Check, Terminal, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';

export default function ContactFooter({ onOpenTerminal }) {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.9 },
      colors: ['#FFE600', '#FF6584', '#00F0FF', '#4ECCA3', '#A388EE']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="py-20 relative z-10 border-t-2 border-[#121316] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Big Punchy Banner */}
        <div className="neo-card p-8 sm:p-12 bg-neo-yellow shadow-neo-2xl space-y-8 relative overflow-hidden">
          
          <div className="space-y-4 max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border-2 border-[#121316] bg-white text-xs font-mono font-black uppercase shadow-neo-sm">
              <span>// READY TO COLLABORATE?</span>
            </div>

            <h2 className="text-3xl sm:text-6xl font-black text-[#121316] tracking-tight leading-[1.05]">
              LET'S BUILD SOMETHING SICK TOGETHER.
            </h2>

            <p className="text-base sm:text-xl font-medium text-[#121316] leading-relaxed">
              Available for Software Engineer roles (Backend, Full-Stack, AI Systems). High throughput, resilient distributed architectures, zero fluff.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={handleCopyEmail}
                className="neo-btn-primary bg-white text-[#121316] text-base"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span>COPIED {personalInfo.email}!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 text-[#121316]" />
                    <span>COPY EMAIL ADDRESS</span>
                  </>
                )}
              </button>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-secondary text-base"
              >
                <LinkedinIcon className="w-5 h-5 text-[#121316]" />
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenTerminal}
                className="neo-btn-cyan text-xs font-mono"
              >
                <Terminal className="w-4 h-4" />
                <span>LAUNCH TERMINAL [Cmd+K]</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6 border-t-2 border-[#121316] text-xs font-mono font-bold text-slate-700">
          
          <div className="space-y-2 md:col-span-2">
            <div className="text-lg font-black text-[#121316] font-sans">
              {personalInfo.name} • @{personalInfo.handle}
            </div>
            <p className="text-slate-600 font-sans font-medium text-xs max-w-md">
              Designed and engineered by {personalInfo.name}. Built with React 19, Three.js WebGL, and Tailwind CSS.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-neo-green border border-[#121316]" />
              <span>HCM City, Vietnam: {time || 'GMT+7'}</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-black font-black uppercase block">Sections</span>
            <ul className="space-y-1.5 text-slate-600">
              <li><a href="#systems" className="hover:text-black hover:underline">Interactive Architecture</a></li>
              <li><a href="#experience" className="hover:text-black hover:underline">Work &amp; Academics</a></li>
              <li><a href="#skills" className="hover:text-black hover:underline">Technical Arsenal</a></li>
              <li><a href="#contact" className="hover:text-black hover:underline">Contact Info</a></li>
            </ul>
          </div>

          <div className="space-y-3 flex flex-col items-start md:items-end justify-between">
            <div className="flex gap-2">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm hover:-translate-y-0.5 transition-transform">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm hover:-translate-y-0.5 transition-transform">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#121316] bg-neo-yellow text-xs font-mono font-bold shadow-neo-sm hover:-translate-y-0.5 transition-all"
            >
              <span>BACK TO TOP ↑</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
