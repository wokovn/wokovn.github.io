import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Cpu, 
  Database, 
  Volume2, 
  Play, 
  Pause, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck, 
  Zap, 
  Activity, 
  Lock, 
  Sliders, 
  Radio, 
  Flame,
  Layers,
  Globe,
  Mic,
  Bot,
  Sparkles
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import { playDialectAudio, stopDialectAudio } from '../utils/audioPlayer';

export default function NeobrutalSystems() {
  // ArkNet States
  const [activeStep, setActiveStep] = useState(0);
  const [isHpaActive, setIsHpaActive] = useState(true);

  // TTS States
  const [activeDialect, setActiveDialect] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Vault Security States
  const [isEncrypted, setIsEncrypted] = useState(true);

  const arknet = projects.find(p => p.id === 'arknet');
  const tts = projects.find(p => p.id === 'vietnamese-tts');
  const isb = projects.find(p => p.id === 'isb-systems');
  const petcarex = projects.find(p => p.id === 'petcarex');

  // Stop audio if component unmounts
  useEffect(() => {
    return () => {
      stopDialectAudio();
    };
  }, []);

  const handleAudioPlay = (index) => {
    if (activeDialect === index && isPlayingAudio) {
      stopDialectAudio();
      setIsPlayingAudio(false);
      return;
    }

    setActiveDialect(index);
    const targetDialect = tts.dialects[index];
    if (!targetDialect) return;

    // Dialect specific acoustic pitch/rate configurations
    const configs = [
      { pitch: 1.15, rate: 1.0 },  // Bac (Ha Noi) - clear & higher pitch
      { pitch: 0.85, rate: 0.95 }, // Trung (Hue) - deeper tone
      { pitch: 1.0, rate: 1.05 }   // Nam (Sai Gon) - natural & dynamic
    ];

    const cfg = configs[index] || { pitch: 1.0, rate: 1.0 };

    playDialectAudio(
      targetDialect.sampleText,
      cfg,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );
  };

  return (
    <section id="systems" className="py-20 relative z-10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-2 border-[#121316]"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border-2 border-[#121316] bg-neo-cyan text-xs font-mono font-bold shadow-neo-sm uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#121316]" />
              <span>// 01. CORE SYSTEMS ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#121316] mt-3 tracking-tight">
              INTERACTIVE ARCHITECTURE LAB
            </h2>
            <p className="text-sm sm:text-base text-slate-700 mt-2 max-w-2xl font-medium">
              Explore hands-on interactive telemetry, live topology nodes, and regional audio synthesis. Zero text walls.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-[#121316] bg-white font-mono text-xs font-bold shadow-neo-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-neo-green animate-pulse" />
            <span>4 INTERACTIVE LABS</span>
          </div>
        </motion.div>

        {/* =========================================================================
            SYSTEM 1: ARKNET DISTRIBUTED PLATFORM (STRESS TEST & TOPOLOGY LAB)
        ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="neo-card p-6 sm:p-8 bg-white shadow-neo-xl space-y-8"
        >
          
          {/* Card Top Titlebar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#121316]">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl border-2 border-[#121316] bg-neo-yellow shadow-neo-sm flex items-center justify-center">
                  <Globe className="w-6 h-6 text-[#121316]" />
                </span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#121316] tracking-tight">
                    ArkNet: Scalable Distributed Social Platform
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-slate-600 font-bold">
                    Node.js (Express 5) • Redis Lua • 9 BullMQ Queues • Kubernetes HPA
                  </p>
                </div>
              </div>
            </div>

            <a
              href={arknet.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn-secondary text-xs self-start sm:self-auto"
            >
              <GithubIcon className="w-4 h-4" />
              <span>SOURCE CODE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Flowchart Nodes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-[#121316] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-neo-pink" />
                <span>INTERACTIVE DATAFLOW TOPOLOGY (CLICK A NODE)</span>
              </span>
              <span className="text-slate-500 hidden sm:inline">Inspect decoupled pipeline responsibilities</span>
            </div>

            {/* 6 Step Interactive Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {arknet.architecture.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3 rounded-xl border-2 border-[#121316] text-left transition-all ${
                    activeStep === idx
                      ? 'bg-neo-yellow shadow-neo font-bold scale-[1.02]'
                      : 'bg-[#FFFDF7] hover:bg-slate-100 shadow-neo-sm'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold block text-slate-500">
                    STEP 0{idx + 1}
                  </span>
                  <span className="text-xs font-black text-[#121316] truncate block mt-0.5">
                    {item.step}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Node Detail Box */}
            <div className="p-4 rounded-xl border-2 border-[#121316] bg-neo-cyan/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-neo-sm">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-neo-cyan border border-[#121316] font-mono text-xs font-black">
                  {arknet.architecture[activeStep].step}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#121316]">
                  {arknet.architecture[activeStep].desc}
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-600">
                ACTIVE PIPELINE INSPECTION
              </span>
            </div>
          </div>

          {/* =========================================================================
              STRESS TEST TELEMETRY (DEDICATED #telemetry TARGET)
          ========================================================================= */}
          <div id="telemetry" className="p-6 rounded-2xl border-2 border-[#121316] bg-[#FFFDF7] shadow-neo space-y-6 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#121316] bg-neo-green font-mono text-[11px] font-bold">
                  <Zap className="w-3 h-3 text-[#121316] fill-[#121316]" />
                  <span>350 VIRTUAL USERS (VUs) STRESS BENCHMARK</span>
                </span>
                <h4 className="text-lg sm:text-xl font-black text-[#121316] mt-1.5">
                  Baseline Ceiling vs Kubernetes Dynamic Autoscaling
                </h4>
              </div>

              {/* Physical Chunky Switch Button */}
              <div className="flex items-center p-1.5 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm">
                <button
                  onClick={() => setIsHpaActive(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    !isHpaActive ? 'bg-neo-pink text-white shadow-sm' : 'text-slate-600 hover:text-black'
                  }`}
                >
                  Fixed (2 Pods)
                </button>
                <button
                  onClick={() => setIsHpaActive(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    isHpaActive ? 'bg-neo-yellow text-[#121316] shadow-sm' : 'text-slate-600 hover:text-black'
                  }`}
                >
                  K8s HPA (Scaled)
                </button>
              </div>
            </div>

            {/* Dynamic Telemetry Meter Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Metric 1: Throughput */}
              <div className="p-4 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm space-y-2">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-600">
                  <span>THROUGHPUT</span>
                  <span className={`px-1.5 py-0.5 rounded border border-[#121316] text-[10px] ${isHpaActive ? 'bg-neo-yellow' : 'bg-slate-200'}`}>
                    {isHpaActive ? '2.42x BOOST' : 'BOTTLENECK'}
                  </span>
                </div>
                <div className="text-3xl font-black font-mono text-[#121316]">
                  {isHpaActive ? '87.2 RPS' : '36.0 RPS'}
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full h-3 rounded-full border border-[#121316] bg-slate-100 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${isHpaActive ? 'bg-neo-green w-[88%]' : 'bg-slate-400 w-[36%]'}`}
                  />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold">
                  {isHpaActive ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="text-emerald-700">158,000+ requests handled</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5 text-neo-pink flex-shrink-0" />
                      <span className="text-rose-700">CPU saturation ceiling</span>
                    </>
                  )}
                </div>
              </div>

              {/* Metric 2: Error Rate */}
              <div className="p-4 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm space-y-2">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-600">
                  <span>API ERROR RATE</span>
                  <span className={`px-1.5 py-0.5 rounded border border-[#121316] text-[10px] ${isHpaActive ? 'bg-neo-green' : 'bg-neo-pink text-white'}`}>
                    {isHpaActive ? 'STABLE' : 'FAILS'}
                  </span>
                </div>
                <div className={`text-3xl font-black font-mono ${isHpaActive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isHpaActive ? '0.8%' : '28.4%'}
                </div>
                <div className="w-full h-3 rounded-full border border-[#121316] bg-slate-100 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${isHpaActive ? 'bg-emerald-500 w-[8%]' : 'bg-rose-500 w-[84%]'}`}
                  />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold">
                  {isHpaActive ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="text-emerald-700">Slashed failures by &gt;3x</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5 text-neo-pink flex-shrink-0" />
                      <span className="text-rose-700">Connection dropouts</span>
                    </>
                  )}
                </div>
              </div>

              {/* Metric 3: Media Upload */}
              <div className="p-4 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm space-y-2">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-600">
                  <span>MEDIA SUCCESS</span>
                  <span className={`px-1.5 py-0.5 rounded border border-[#121316] text-[10px] ${isHpaActive ? 'bg-neo-cyan' : 'bg-amber-200'}`}>
                    {isHpaActive ? 'BULLMQ' : 'OVERLOAD'}
                  </span>
                </div>
                <div className="text-3xl font-black font-mono text-[#121316]">
                  {isHpaActive ? '86.2%' : '34.5%'}
                </div>
                <div className="w-full h-3 rounded-full border border-[#121316] bg-slate-100 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${isHpaActive ? 'bg-neo-cyan w-[86%]' : 'bg-amber-400 w-[34%]'}`}
                  />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold">
                  {isHpaActive ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="text-emerald-700">9 BullMQ worker queues</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span className="text-amber-700">Worker concurrency lock</span>
                    </>
                  )}
                </div>
              </div>

            </div>

          </div>

        </motion.div>

        {/* =========================================================================
            SYSTEM 2: VIETNAMESE NEURAL TTS & NEWS AI (TACTILE AUDIO DECK LAB)
        ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="neo-card p-6 sm:p-8 bg-white shadow-neo-xl space-y-8"
        >
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#121316]">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl border-2 border-[#121316] bg-neo-pink text-white shadow-neo-sm flex items-center justify-center">
                  <Mic className="w-6 h-6 text-[#121316]" />
                </span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#121316] tracking-tight">
                    Vietnamese Neural TTS &amp; AI Summarizer
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-slate-600 font-bold">
                    FastAPI • PyTorch CUDA • Brave Scraper • Gemini LLM • Supabase
                  </p>
                </div>
              </div>
            </div>

            <a
              href={tts.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn-secondary text-xs self-start sm:self-auto"
            >
              <GithubIcon className="w-4 h-4" />
              <span>REPOSITORY</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Tactile Retro Audio Cassette Deck */}
          <div className="p-6 rounded-2xl border-2 border-[#121316] bg-[#FFFDF7] shadow-neo space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-neo-pink" />
                <span className="font-mono font-black text-sm text-[#121316] uppercase">
                  TACTILE REGIONAL DIALECT DECK
                </span>
              </div>

              {/* Equalizer animation when playing */}
              {isPlayingAudio ? (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#121316] bg-neo-pink text-white text-xs font-mono font-bold animate-pulse">
                  <div className="flex items-end gap-1 h-3.5">
                    <span className="w-1 bg-white h-3.5 animate-bounce"></span>
                    <span className="w-1 bg-white h-2 animate-pulse"></span>
                    <span className="w-1 bg-white h-3.5 animate-bounce"></span>
                    <span className="w-1 bg-white h-1 animate-pulse"></span>
                    <span className="w-1 bg-white h-3.5 animate-bounce"></span>
                  </div>
                  <span>PLAYING DIALECT AUDIO...</span>
                </div>
              ) : (
                <span className="text-xs font-mono text-slate-500 font-bold flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-slate-700" />
                  <span>Click 'Listen' to trigger regional speech synthesis</span>
                </span>
              )}
            </div>

            {/* 3 Dialect Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tts.dialects.map((d, idx) => {
                const isSelected = activeDialect === idx;
                const isCurrentPlaying = isSelected && isPlayingAudio;
                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border-2 border-[#121316] transition-all ${
                      isSelected
                        ? 'bg-neo-yellow shadow-neo scale-[1.01]'
                        : 'bg-white shadow-neo-sm hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-black text-sm text-[#121316]">
                        {d.name}
                      </span>
                      <button
                        onClick={() => handleAudioPlay(idx)}
                        className={`px-3 py-1.5 rounded-xl border-2 border-[#121316] font-mono text-xs font-black shadow-neo-sm transition-all ${
                          isCurrentPlaying
                            ? 'bg-neo-pink text-white'
                            : 'bg-white hover:bg-neo-cyan'
                        }`}
                      >
                        {isCurrentPlaying ? (
                          <span className="flex items-center gap-1">
                            <Pause className="w-3.5 h-3.5" /> STOP
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Play className="w-3.5 h-3.5" /> LISTEN
                          </span>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-slate-700 italic font-medium leading-relaxed mb-3">
                      "{d.sampleText}"
                    </p>

                    <div className="pt-2 border-t border-[#121316]/20 flex items-center justify-between text-[11px] font-mono text-slate-600 font-bold">
                      <span>{d.pitch}</span>
                      <span className="px-1.5 py-0.5 rounded bg-white border border-[#121316]">vnTTS</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pipeline Step Overview */}
            <div className="p-4 rounded-xl border-2 border-[#121316] bg-white text-xs font-mono font-bold flex flex-wrap items-center justify-between gap-3 shadow-neo-sm">
              <span className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#121316]" />
                <span>RESEARCH DATASET:</span>
                <span className="bg-neo-green px-2 py-0.5 rounded border border-[#121316]">
                  27.1 Hours (14,475 pairs)
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span>ENCODING:</span>
                <span className="bg-neo-purple/30 px-2 py-0.5 rounded border border-[#121316]">
                  FFmpeg MP3 (64k)
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span>INFERENCE:</span>
                <span className="bg-neo-cyan px-2 py-0.5 rounded border border-[#121316]">
                  PyTorch CUDA (GPU)
                </span>
              </span>
            </div>

          </div>

        </motion.div>

        {/* =========================================================================
            SYSTEM 3 & 4: ISB MULTI-AGENT SECURITY & PETCAREX DATABASE LAB
        ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* ISB Vietnam Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="neo-card p-6 sm:p-8 bg-white shadow-neo-xl space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#121316]">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl border-2 border-[#121316] bg-neo-purple/40 font-bold text-base flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[#121316]" />
                  </span>
                  <div>
                    <h3 className="text-xl font-black text-[#121316]">
                      Multi-Agent &amp; Vault Security
                    </h3>
                    <p className="text-xs font-mono font-bold text-slate-600">ISB Vietnam Production Systems</p>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-md border border-[#121316] bg-neo-green font-mono text-[10px] font-black">
                  ENTERPRISE
                </span>
              </div>

              {/* Interactive Vault DEK Toggle */}
              <div className="p-4 rounded-xl border-2 border-[#121316] bg-[#FFFDF7] shadow-neo-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#121316]">
                    <Lock className="w-4 h-4 text-neo-pink" />
                    <span>HASHICORP VAULT DEK &amp; BLIND INDEX</span>
                  </div>
                  <button
                    onClick={() => setIsEncrypted(!isEncrypted)}
                    className="px-2.5 py-1 rounded-lg border border-[#121316] bg-neo-yellow text-[11px] font-mono font-bold shadow-neo-sm"
                  >
                    {isEncrypted ? 'Show Plaintext' : 'Encrypt Data'}
                  </button>
                </div>

                <div className="p-3 rounded-lg border border-[#121316] bg-white font-mono text-xs space-y-1">
                  <div className="text-slate-500 text-[10px]">DATABASE ROW STORAGE:</div>
                  <div className="font-bold text-[#121316] break-all">
                    {isEncrypted ? 'vault:v1:7kX9q2pL0m... (Wrapped DEK)' : 'email: "khoa@isb.com", ssn: "079205..."'}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold pt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Exact-match queries run over HMAC Blind Index without decrypting database.</span>
                  </div>
                </div>
              </div>

              {/* Performance Badges */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm">
                  <span className="text-[10px] text-slate-500 font-bold block">AGENT ENGINE</span>
                  <span className="text-base font-black text-[#121316] block mt-0.5">5.8x Row Volume</span>
                  <span className="text-[10px] text-slate-600">SQLite in-memory sandboxes</span>
                </div>

                <div className="p-3 rounded-xl border-2 border-[#121316] bg-white shadow-neo-sm">
                  <span className="text-[10px] text-slate-500 font-bold block">ReDoS FIX</span>
                  <span className="text-base font-black text-[#121316] block mt-0.5">3-18s → &lt;200ms</span>
                  <span className="text-[10px] text-slate-600">Polynomial regex tuned</span>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t-2 border-[#121316] flex flex-wrap gap-2">
              {['TypeScript', 'Next.js 15', 'Java 21', 'Spring Boot 4', 'Vault', 'n8n'].map((t, i) => (
                <span key={i} className="neo-tag text-[11px]">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* PetCareX Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="neo-card p-6 sm:p-8 bg-white shadow-neo-xl space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#121316]">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl border-2 border-[#121316] bg-neo-green font-bold text-base flex items-center justify-center">
                    <Database className="w-5 h-5 text-[#121316]" />
                  </span>
                  <div>
                    <h3 className="text-xl font-black text-[#121316]">
                      PetCareX &amp; 5,600+ Test Suite
                    </h3>
                    <p className="text-xs font-mono font-bold text-slate-600">MSSQL 3NF • Vitest • Docker CI</p>
                  </div>
                </div>

                <a
                  href={petcarex.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn-secondary text-xs"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>

              {/* B-Tree Fragmentation Visualizer */}
              <div className="p-4 rounded-xl border-2 border-[#121316] bg-[#FFFDF7] shadow-neo-sm space-y-3">
                <div className="font-mono text-xs font-bold text-[#121316]">
                  SEQUENTIAL COMB UUID vs RANDOM UUID
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Sequential UUID (COMB):</span>
                      <span className="font-bold text-emerald-600">0% Page Splits</span>
                    </div>
                    <div className="w-full h-3 rounded-full border border-[#121316] bg-slate-100 overflow-hidden">
                      <div className="h-full bg-neo-green w-[98%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Random UUID (v4):</span>
                      <span className="font-bold text-rose-600">74% Fragmentation</span>
                    </div>
                    <div className="w-full h-3 rounded-full border border-[#121316] bg-slate-100 overflow-hidden">
                      <div className="h-full bg-rose-500 w-[74%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Harness Stats */}
              <div className="p-4 rounded-xl border-2 border-[#121316] bg-neo-yellow/20 space-y-1 text-xs font-mono">
                <div className="font-bold text-[#121316] flex items-center justify-between">
                  <span>5,600+ UNIT &amp; INTEGRATION TESTS</span>
                  <span className="text-emerald-700 font-black">2x SPEEDUP</span>
                </div>
                <p className="text-slate-700 text-[11px] pt-1">
                  Docker test containers with isolated per-worker databases slashed pipeline runtime from 352s down to 162s.
                </p>
              </div>

            </div>

            <div className="pt-4 border-t-2 border-[#121316] flex flex-wrap gap-2">
              {['SQL Server', 'Drizzle ORM', 'Vitest', 'Docker', 'Playwright'].map((t, i) => (
                <span key={i} className="neo-tag text-[11px]">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
