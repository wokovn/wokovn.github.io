import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Cpu, 
  Database, 
  ExternalLink, 
  Volume2, 
  Play, 
  Pause, 
  Layers, 
  ShieldCheck, 
  Activity, 
  GitBranch, 
  CheckCircle2, 
  Code2, 
  Zap,
  BarChart3,
  Terminal,
  Radio
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import SpotlightCard from './SpotlightCard';
import { GithubIcon } from './Icons';

export default function BentoGrid() {
  const [hpaActive, setHpaActive] = useState(true);
  const [selectedDialect, setSelectedDialect] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activePipelineStep, setActivePipelineStep] = useState(0);

  const arknet = projects.find(p => p.id === 'arknet');
  const tts = projects.find(p => p.id === 'vietnamese-tts');
  const isb = projects.find(p => p.id === 'isb-systems');
  const petcarex = projects.find(p => p.id === 'petcarex');

  const handlePlayToggle = (index) => {
    if (selectedDialect === index && isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }
    setSelectedDialect(index);
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 5000);
  };

  return (
    <section id="bento-systems" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-widest">
              <span>// 02. ARCHITECTURE BENTO GRID</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
              Production Systems Showcase
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              Concrete implementations engineered for high throughput, sub-second latency, and fault tolerance.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-500">
            Hover cards for interactive spotlight • Click to inspect
          </div>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* =========================================================================
              BENTO 1: ARKNET DISTRIBUTED SOCIAL PLATFORM (8 COLS)
          ========================================================================= */}
          <SpotlightCard className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-lg bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                      <Server className="w-4 h-4" />
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      ArkNet: Distributed Social Media Platform
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-2xl pl-10">
                    High-concurrency microservices with hybrid push/pull feed engine, Redis Lua scripts, and Kubernetes HPA.
                  </p>
                </div>

                <a
                  href={arknet.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-slate-200 transition-all self-start sm:self-auto"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>Repository</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>

              {/* Interactive Pipeline Step Selector */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Interactive Topology Pipeline</span>
                  <span className="text-brand-cyan">Click step to inspect</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {arknet.architecture.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePipelineStep(idx)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        activePipelineStep === idx
                          ? 'bg-brand-cyan/10 border-brand-cyan text-white shadow-[0_0_15px_rgba(0,247,247,0.15)]'
                          : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-slate-500">0{idx + 1}</div>
                      <div className="text-xs font-bold text-white truncate">{item.step}</div>
                    </button>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] text-xs font-mono text-slate-300 flex items-center justify-between">
                  <div>
                    <span className="text-brand-cyan font-bold">{arknet.architecture[activePipelineStep].step}: </span>
                    <span>{arknet.architecture[activePipelineStep].desc}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 hidden sm:inline">Active Node</span>
                </div>
              </div>

              {/* Interactive Stress Test Inspector (Dynamic Gauge) */}
              <div className="p-5 rounded-2xl bg-black/30 border border-white/[0.06] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-white flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-emerald-400" />
                      <span>Stress Test Telemetry (350 Concurrent VUs)</span>
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Toggle baseline vs Kubernetes Horizontal Pod Autoscaling (HPA)
                    </p>
                  </div>

                  <div className="inline-flex p-1 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                    <button
                      onClick={() => setHpaActive(false)}
                      className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                        !hpaActive ? 'bg-rose-500/20 text-rose-300 font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Fixed Replicas (No HPA)
                    </button>
                    <button
                      onClick={() => setHpaActive(true)}
                      className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                        hpaActive ? 'bg-brand-emerald text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      K8s HPA (Scaled)
                    </button>
                  </div>
                </div>

                {/* Real Metrics Gauge */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Throughput</span>
                    <div className={`text-xl sm:text-2xl font-extrabold font-mono mt-0.5 ${hpaActive ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {hpaActive ? '87.2 RPS' : '36.0 RPS'}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">158K+ total reqs</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Error Rate</span>
                    <div className={`text-xl sm:text-2xl font-extrabold font-mono mt-0.5 ${hpaActive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {hpaActive ? '0.8%' : '28.4%'}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">&gt;3x failure drop</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Media Upload</span>
                    <div className={`text-xl sm:text-2xl font-extrabold font-mono mt-0.5 ${hpaActive ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {hpaActive ? '86.2%' : '34.5%'}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">BullMQ workers</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Pods Replicas</span>
                    <div className="text-xl sm:text-2xl font-extrabold font-mono text-brand-cyan mt-0.5">
                      {hpaActive ? '2 → 10' : '2 Fixed'}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Dynamic autoscaling</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Tags footer */}
            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/[0.08] mt-6">
              {arknet.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-white/[0.03] border border-white/[0.08] text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </SpotlightCard>

          {/* =========================================================================
              BENTO 2: VIETNAMESE REGIONAL TTS & AI SYNTHESIZER (4 COLS)
          ========================================================================= */}
          <SpotlightCard className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-lg bg-brand-violet/10 text-brand-violet border border-brand-violet/20">
                    <Volume2 className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Vietnamese Neural TTS</h3>
                    <p className="text-[11px] text-slate-400 font-mono">FastAPI • PyTorch CUDA</p>
                  </div>
                </div>

                <a
                  href={tts.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Multi-dialect neural speech synthesis (vnTTS/XTTSv2) combined with automated Brave scraping and Gemini LLM summarization.
              </p>

              {/* Tactile Dialect Deck */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Regional Acoustic Models</span>
                  {isPlayingAudio && (
                    <span className="text-brand-violet flex items-center gap-1">
                      <Radio className="w-3 h-3 animate-pulse" />
                      <span>Streaming</span>
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {tts.dialects.map((d, idx) => {
                    const isSelected = selectedDialect === idx;
                    const isCurrentPlaying = isSelected && isPlayingAudio;
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-brand-violet/10 border-brand-violet/40 text-white shadow-lg'
                            : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-white">{d.name}</span>
                          <button
                            onClick={() => handlePlayToggle(idx)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-1.5 transition-all ${
                              isCurrentPlaying
                                ? 'bg-brand-violet text-white font-bold'
                                : 'bg-white/[0.08] hover:bg-white/[0.15] text-slate-200'
                            }`}
                          >
                            {isCurrentPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                            <span>{isCurrentPlaying ? 'Stop' : 'Listen'}</span>
                          </button>
                        </div>

                        <p className="text-[11px] text-slate-300 italic truncate">
                          "{d.sampleText}"
                        </p>

                        {/* Animated waveform bars when playing */}
                        {isCurrentPlaying && (
                          <div className="flex items-end gap-1 h-3 mt-2">
                            <span className="w-1 bg-brand-violet h-3 animate-pulse"></span>
                            <span className="w-1 bg-brand-violet h-1 animate-bounce"></span>
                            <span className="w-1 bg-brand-violet h-3 animate-pulse"></span>
                            <span className="w-1 bg-brand-violet h-2 animate-bounce"></span>
                            <span className="w-1 bg-brand-violet h-3 animate-pulse"></span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Research Corpus Telemetry */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-[11px] font-mono text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Corpus Duration:</span>
                  <span className="text-white">27.1 Hours (14,475 pairs)</span>
                </div>
                <div className="flex justify-between">
                  <span>Audio Format:</span>
                  <span className="text-brand-violet">FFmpeg Transcoded MP3</span>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-white/[0.08] mt-4 flex flex-wrap gap-1.5">
              {['FastAPI', 'PyTorch (CUDA)', 'Gemini API', 'Supabase'].map((tag, i) => (
                <span key={i} className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.03] text-slate-400 border border-white/[0.06]">
                  {tag}
                </span>
              ))}
            </div>
          </SpotlightCard>

          {/* =========================================================================
              BENTO 3: ENTERPRISE MULTI-AGENT & SECURITY @ ISB VIETNAM (6 COLS)
          ========================================================================= */}
          <SpotlightCard className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-lg bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20">
                    <Cpu className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Multi-Agent Orchestration &amp; Security
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">ISB Vietnam Production Systems</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-brand-emerald text-xs font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>5.8x Row Analysis</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Lead Agent decomposes complex business queries and delegates to parallel Helper Agents with in-memory SQLite sandboxes.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-brand-cyan text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Vault Wrapped DEK</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Field-level PII encryption with wrapped data keys and HMAC blind indexing for zero-plaintext data leakage.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                    <Activity className="w-3.5 h-3.5" />
                    <span>ReDoS Optimization</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Eliminated catastrophic backtracking regex patterns, plunging contract parser latency from 3-18s down to &lt;200ms.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>Zero N+1 Queries</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Bulk CV screening engine in Java 21 / Spring Boot 4 with Grouped Rollups APIs eliminating nested query roundtrips.
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-white/[0.08] mt-6 flex flex-wrap gap-2">
              {['TypeScript', 'Next.js 15', 'Spring Boot 4', 'Vault DEK', 'Docker CI'].map((tag, i) => (
                <span key={i} className="px-2.5 py-1 text-[11px] font-mono rounded bg-white/[0.03] text-slate-300 border border-white/[0.06]">
                  {tag}
                </span>
              ))}
            </div>
          </SpotlightCard>

          {/* =========================================================================
              BENTO 4: DATABASE & AUTOMATED TEST HARNESS (6 COLS)
          ========================================================================= */}
          <SpotlightCard className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/20">
                    <Database className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      PetCareX &amp; 5,600+ Test Infrastructure
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">MSSQL • Vitest • Docker Testcontainers</p>
                  </div>
                </div>

                <a
                  href={petcarex.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Database Architecture Visual */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="text-xs font-bold text-amber-300 font-mono">
                    Sequential UUID (COMB) vs Random UUID
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Designed 3NF normalized schema for 30+ entities. Mitigated B-Tree index fragmentation through Sequential UUIDs on clustered keys and encapsulated inventory triggers.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="text-xs font-bold text-emerald-400 font-mono flex items-center justify-between">
                    <span>5,600+ Parallel Tests Execution</span>
                    <span className="text-[10px] text-slate-400 font-mono">352s → 162s (2x speedup)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Docker PostgreSQL isolated containers for per-worker test execution, eliminating database race conditions during CI/CD test runs.
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-white/[0.08] mt-6 flex flex-wrap gap-2">
              {['SQL Server (MSSQL)', 'Drizzle ORM', 'Vitest', 'Playwright', 'JMeter'].map((tag, i) => (
                <span key={i} className="px-2.5 py-1 text-[11px] font-mono rounded bg-white/[0.03] text-slate-300 border border-white/[0.06]">
                  {tag}
                </span>
              ))}
            </div>
          </SpotlightCard>

        </div>

      </div>
    </section>
  );
}
