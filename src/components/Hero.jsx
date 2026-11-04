import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Terminal, Copy, Check, Sparkles, MapPin, GraduationCap, Server, ShieldCheck, Cpu } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import ThreeScene from './ThreeScene';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-cyan/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[350px] bg-brand-violet/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Value */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-7"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-emerald"></span>
              </span>
              <span className="text-xs font-mono text-emerald-400 font-medium tracking-tight">
                Available for Software Engineer Roles
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-xs text-slate-400 font-mono">
                HCMUS • ISB Vietnam
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="text-xs font-mono text-brand-cyan uppercase tracking-widest flex items-center gap-2">
                <span>&lt;developer id="wokovn"&gt;</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                Nguyễn Anh Khoa
              </h1>
              <p className="text-xl sm:text-2xl font-mono text-slate-400 font-light">
                Engineering <span className="text-white font-medium">Distributed Backends</span> &amp; <span className="text-white font-medium">Multi-Agent AI</span>.
              </p>
            </motion.div>

            {/* Technical Bio */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-sans">
              Specialized in high-concurrency event-driven microservices, Redis Lua atomic pipelines, and autonomous agent orchestration. Proven under <span className="text-white font-semibold underline decoration-brand-cyan/40 underline-offset-4">350 concurrent VUs</span> (87.2 RPS) and enterprise Multi-Agent pipelines at <span className="text-white font-semibold">ISB Vietnam</span>.
            </motion.p>

            {/* Telemetry Chips */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-200/80 border border-surface-border text-xs font-mono text-slate-300">
                <Server className="w-3.5 h-3.5 text-brand-cyan" />
                <span>87.2 RPS • K8s HPA</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-200/80 border border-surface-border text-xs font-mono text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-brand-violet" />
                <span>5.8x Multi-Agent Throughput</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-200/80 border border-surface-border text-xs font-mono text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Vault Wrapped DEK</span>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#bento-systems"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Architectures</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-surface-100 hover:bg-surface-hover border border-white/10 hover:border-white/20 text-slate-200 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-brand-emerald" />
                    <span className="text-brand-emerald font-mono">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-surface-200/60 hover:bg-surface-100 border border-brand-cyan/20 text-brand-cyan text-xs font-mono transition-all hover:border-brand-cyan/50"
              >
                <Terminal className="w-4 h-4" />
                <span>Terminal [Cmd+K]</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Three.js 3D WebGL Canvas Component */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-full aspect-square max-w-[500px] rounded-3xl border border-white/[0.08] bg-gradient-to-b from-surface-100/40 to-surface-200/40 backdrop-blur-2xl shadow-2xl overflow-hidden group">
              {/* Three.js interactive scene */}
              <ThreeScene />

              {/* Top bar overlay */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>interactive-node-cluster.obj</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
