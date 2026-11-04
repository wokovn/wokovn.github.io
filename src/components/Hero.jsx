import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Copy, Check, Terminal, Sparkles, MapPin, GraduationCap, Briefcase, Zap, ShieldCheck, Activity, Cpu } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import ThreeScene from './ThreeScene';
import confetti from 'canvas-confetti';

export default function Hero({ onOpenTerminal }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#FFE600', '#FF6584', '#00F0FF', '#4ECCA3', '#A388EE']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Playful Neobrutal Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Top Playful Badge Cluster - ZERO EMOJIS, 100% CLEAN ICONS */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-[#121316] bg-neo-green font-mono text-xs font-bold shadow-neo-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#121316] animate-ping" />
                <Zap className="w-3.5 h-3.5 text-[#121316]" />
                <span>OPEN FOR SDE ROLES</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-[#121316] bg-neo-yellow font-mono text-xs font-bold shadow-neo-sm transform -rotate-2 hover:rotate-0 transition-transform">
                <GraduationCap className="w-3.5 h-3.5 text-[#121316]" />
                <span>HCMUS IT (GPA {personalInfo.gpa})</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-[#121316] bg-neo-pink text-white font-mono text-xs font-bold shadow-neo-sm transform rotate-2 hover:rotate-0 transition-transform">
                <Briefcase className="w-3.5 h-3.5 text-white" />
                <span>ISB VIETNAM INTERN</span>
              </div>
            </div>

            {/* Giant Punchy Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#121316] tracking-tight leading-[1.05]">
                NGUYỄN ANH KHOA
              </h1>
              <div className="inline-block px-3 py-1 bg-neo-yellow border-2 border-[#121316] shadow-neo transform -rotate-1">
                <p className="text-lg sm:text-2xl font-black font-mono uppercase text-[#121316]">
                  SOFTWARE ENGINEER • SYSTEMS &amp; AI
                </p>
              </div>
            </div>

            {/* Sharp, Informative, No-BS Summary */}
            <p className="text-base sm:text-lg text-slate-800 leading-relaxed max-w-2xl font-medium">
              I build <span className="bg-neo-cyan px-1.5 py-0.5 border border-[#121316] font-bold">high-throughput distributed backends</span>, event-driven pipelines, and <span className="bg-neo-purple/30 px-1.5 py-0.5 border border-[#121316] font-bold">autonomous Multi-Agent systems</span>. Hands-on experience optimizing systems under 350 concurrent VUs and delivering production security architecture at ISB Vietnam.
            </p>

            {/* Key Micro-Widgets (Informative Pills) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-3 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm">
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 font-bold">
                  <Activity className="w-3 h-3 text-neo-pink" />
                  <span>THROUGHPUT</span>
                </div>
                <span className="text-lg font-black text-[#121316] font-mono">87.2 RPS</span>
                <span className="text-[10px] text-slate-600 block">350 VUs (K8s HPA)</span>
              </div>

              <div className="p-3 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm">
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 font-bold">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>TEST HARNESS</span>
                </div>
                <span className="text-lg font-black text-[#121316] font-mono">5,600+</span>
                <span className="text-[10px] text-slate-600 block">Vitest + Docker CI</span>
              </div>

              <div className="p-3 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm">
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 font-bold">
                  <Cpu className="w-3 h-3 text-neo-purple" />
                  <span>MULTI-AGENT</span>
                </div>
                <span className="text-lg font-black text-[#121316] font-mono">5.8x Rows</span>
                <span className="text-[10px] text-slate-600 block">SQLite Sandbox</span>
              </div>

              <div className="p-3 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm">
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 font-bold">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>PII SECURITY</span>
                </div>
                <span className="text-lg font-black text-[#121316] font-mono">&lt;200ms</span>
                <span className="text-[10px] text-slate-600 block">Vault Wrapped DEK</span>
              </div>
            </div>

            {/* CTA Buttons with Chunky Hard Shadows */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <a
                href="#systems"
                className="neo-btn-primary text-base"
              >
                <span>EXPLORE ARCHITECTURES</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="neo-btn-secondary text-base"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span>COPIED EMAIL!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 text-slate-600" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenTerminal}
                className="neo-btn-cyan text-xs font-mono"
              >
                <Terminal className="w-4 h-4" />
                <span>TERMINAL [Cmd+K]</span>
              </button>
            </div>

          </motion.div>

          {/* Right Column: Three.js in a Neo-Brutalist Computer Window */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="neo-card overflow-hidden bg-white shadow-neo-xl transform hover:rotate-1 transition-transform">
              
              {/* Window Header */}
              <div className="px-4 py-3 border-b-2 border-[#121316] bg-neo-yellow flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-[#121316] bg-neo-pink" />
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-[#121316] bg-neo-cyan" />
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-[#121316] bg-neo-green" />
                  <span className="ml-2 font-mono font-bold text-xs text-[#121316]">
                    interactive_cluster.obj
                  </span>
                </div>
                <div className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-[#121316]">
                  THREE.JS
                </div>
              </div>

              {/* ThreeScene canvas viewport */}
              <div className="relative bg-[#FFFDF7] p-2">
                <ThreeScene />
              </div>

              {/* Window Footer Status */}
              <div className="px-4 py-2 border-t-2 border-[#121316] bg-white flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span>FPS: 60 • Drag or Click 3D shapes</span>
                <span className="font-bold text-[#121316]">PLAYFUL WEBGL</span>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

