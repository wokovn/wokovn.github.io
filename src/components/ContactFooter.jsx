import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Globe, Copy, Check, ArrowUp, Heart, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';
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
      particleCount: 50,
      spread: 60,
      origin: { y: 0.9 },
      colors: ['#00f7f7', '#10b981', '#8b5cf6']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="py-20 relative z-10 border-t border-surface-border bg-surface-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Contact Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-surface-100 via-surface-100/90 to-surface-200 border border-surface-border shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider">
              <span>// 06. READY TO COLLABORATE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Let's Build Something High-Impact Together.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Open to Software Engineer (Backend, Full-Stack, AI Systems) opportunities, high-throughput distributed architectures, and technical deep-dives.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand-cyan hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(0,247,247,0.3)] group"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>Copied {personalInfo.email}!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-slate-950" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-surface-200 hover:bg-surface-hover border border-surface-border hover:border-slate-500 text-slate-200 text-sm font-medium transition-all"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                <span>Connect on LinkedIn</span>
              </a>

              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-surface-200/80 hover:bg-surface-100 border border-brand-cyan/20 text-brand-cyan text-xs font-mono transition-all"
              >
                <Terminal className="w-4 h-4" />
                <span>sudo hire</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Meta & Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6 border-t border-surface-border/60 text-xs font-mono text-slate-400">
          
          <div className="space-y-2 md:col-span-2">
            <div className="text-white font-bold font-sans text-sm">
              {personalInfo.name} • @{personalInfo.handle}
            </div>
            <p className="text-slate-400 font-sans max-w-sm">
              Crafted with React 19, Vite, and Tailwind CSS. Hosted on GitHub Pages with custom domain <span className="text-brand-cyan">wokovn.id.vn</span>.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>HCM City, Vietnam: {time || 'GMT+7'}</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-slate-300 font-semibold block">Navigation</span>
            <ul className="space-y-1.5">
              <li><a href="#systems" className="hover:text-brand-cyan transition-colors">Featured Systems</a></li>
              <li><a href="#benchmarks" className="hover:text-brand-cyan transition-colors">Stress Telemetry</a></li>
              <li><a href="#experience" className="hover:text-brand-cyan transition-colors">Experience</a></li>
              <li><a href="#skills" className="hover:text-brand-cyan transition-colors">Technical Matrix</a></li>
            </ul>
          </div>

          <div className="space-y-2 flex flex-col items-start md:items-end justify-between">
            <div className="space-y-1.5 text-left md:text-right">
              <span className="text-slate-300 font-semibold block">Social &amp; Repos</span>
              <div className="flex gap-3">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-white p-1 rounded hover:bg-surface-100">
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white p-1 rounded hover:bg-surface-100">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a href={personalInfo.customDomain} target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan p-1 rounded hover:bg-surface-100" title="Custom Domain">
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
