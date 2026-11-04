import React, { useState } from 'react';
import { ArrowRight, Terminal, Copy, Check, Sparkles, MapPin, GraduationCap, Cpu, Layers, Server } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import confetti from 'canvas-confetti';

export default function Hero({ onOpenTerminal }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f7f7', '#10b981', '#8b5cf6']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-cyan/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-brand-violet/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Availability Status */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface-100 border border-brand-emerald/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-emerald"></span>
              </span>
              <span className="text-xs font-mono font-medium text-emerald-400">
                Available for Software Engineer Roles
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-[11px] text-slate-400 font-mono">
                Full-Stack &amp; AI Systems
              </span>
            </div>

            {/* Main Title & Catchphrase */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-violet">{personalInfo.name}</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-mono font-normal text-slate-400 mt-2">
                  Software Engineer &amp; Systems Builder
                </span>
              </h1>
            </div>

            {/* Crisp & Authentic Bio - Zero AI Slop */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Engineering high-throughput distributed backends, resilient event-driven architectures, and autonomous Multi-Agent AI systems.
              Proven track record from building scalable platforms under 350 concurrent VUs to enterprise HR and Multi-Agent engines at <span className="text-white font-medium">ISB Vietnam</span>.
            </p>

            {/* Quick Context Tags */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-cyan" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-brand-violet" />
                <span>HCMUS (GPA {personalInfo.gpa})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-brand-emerald" />
                <span>K8s HPA &amp; BullMQ</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#systems"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-cyan hover:bg-cyan-300 text-slate-950 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(0,247,247,0.3)] hover:shadow-[0_0_25px_rgba(0,247,247,0.5)] group"
              >
                <span>Explore Systems</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-100 hover:bg-surface-hover border border-surface-border hover:border-slate-500 text-slate-200 text-sm font-medium transition-all group"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-brand-emerald" />
                    <span className="text-brand-emerald font-mono">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400 group-hover:text-white" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-200/80 hover:bg-surface-100 border border-brand-cyan/20 text-brand-cyan hover:border-brand-cyan/50 text-xs font-mono transition-all"
              >
                <Terminal className="w-4 h-4" />
                <span>Interactive Terminal [Cmd+K]</span>
              </button>
            </div>
          </div>

          {/* Right Column: Sleek Interactive Code HUD Card */}
          <div className="lg:col-span-5">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan/30 via-brand-violet/20 to-brand-emerald/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500"></div>
              
              <div className="relative rounded-2xl bg-surface-100 border border-surface-border p-5 shadow-2xl font-mono text-xs overflow-hidden">
                
                {/* Window header */}
                <div className="flex items-center justify-between pb-4 border-b border-surface-border/80 text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-[11px] text-slate-400">khoa@production:~</span>
                  </div>
                  <span className="text-[10px] text-brand-cyan">zsh • v25.2</span>
                </div>

                {/* Simulated CLI prompt & Profile State */}
                <div className="pt-4 space-y-3">
                  <div>
                    <span className="text-brand-emerald">khoa@macbook</span>
                    <span className="text-slate-500">:</span>
                    <span className="text-brand-cyan">~</span>
                    <span className="text-slate-300"> $ whoami</span>
                  </div>
                  <div className="text-slate-300 pl-3 border-l-2 border-brand-cyan/40">
                    <p className="font-semibold text-white">Nguyễn Anh Khoa (@wokovn)</p>
                    <p className="text-slate-400 text-[11px]">VNUHCM - University of Science (Class of 2027)</p>
                  </div>

                  <div>
                    <span className="text-brand-emerald">khoa@macbook</span>
                    <span className="text-slate-500">:</span>
                    <span className="text-brand-cyan">~</span>
                    <span className="text-slate-300"> $ cat engineering_focus.json</span>
                  </div>
                  <div className="bg-surface-200 p-3 rounded-lg border border-surface-border/60 text-slate-300 space-y-1">
                    <p><span className="text-brand-cyan">"coreStack"</span>: [<span className="text-amber-300">"TypeScript"</span>, <span className="text-amber-300">"Node.js/Express 5"</span>, <span className="text-amber-300">"Spring Boot 4"</span>, <span className="text-amber-300">"React 19"</span>],</p>
                    <p><span className="text-brand-cyan">"distributed"</span>: [<span className="text-emerald-400">"Redis Lua"</span>, <span className="text-emerald-400">"BullMQ (9 workers)"</span>, <span className="text-emerald-400">"K8s HPA"</span>],</p>
                    <p><span className="text-brand-cyan">"aiSystems"</span>: [<span className="text-brand-violet">"Multi-Agent (MCP)"</span>, <span className="text-brand-violet">"FastAPI + vnTTS"</span>, <span className="text-brand-violet">"Gemini API"</span>],</p>
                    <p><span className="text-brand-cyan">"security"</span>: [<span className="text-rose-400">"Vault DEK Encryption"</span>, <span className="text-rose-400">"Blind Indexing"</span>, <span className="text-rose-400">"ReDoS Fix"</span>]</p>
                  </div>

                  <div>
                    <span className="text-brand-emerald">khoa@macbook</span>
                    <span className="text-slate-500">:</span>
                    <span className="text-brand-cyan">~</span>
                    <span className="text-slate-300"> $ ./check_system_status.sh</span>
                  </div>
                  <div className="text-[11px] space-y-1 text-slate-400">
                    <p className="text-emerald-400">✔ ArkNet: 87.2 RPS peak throughput verified</p>
                    <p className="text-emerald-400">✔ Test suite: 5,600+ passing tests (runtime cut 2x)</p>
                    <p className="text-brand-cyan animate-pulse">⚡ System healthy. Ready for deployment.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
