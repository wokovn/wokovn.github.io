import React, { useState } from 'react';
import { 
  Server, 
  Cpu, 
  Database, 
  ExternalLink, 
  Volume2, 
  Play, 
  Pause, 
  Layers, 
  ShieldAlert, 
  Activity, 
  GitBranch, 
  CheckCircle2, 
  Code2, 
  Zap,
  BarChart3
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { projects } from '../data/portfolioData';

export default function SystemsShowcase() {
  const [activeTab, setActiveTab] = useState('arknet');
  const [stressMode, setStressMode] = useState('hpa'); // 'baseline' vs 'hpa'
  const [playingDialect, setPlayingDialect] = useState(null);
  const [simulatedPlaying, setSimulatedPlaying] = useState(false);

  const arknet = projects.find(p => p.id === 'arknet');
  const tts = projects.find(p => p.id === 'vietnamese-tts');
  const isb = projects.find(p => p.id === 'isb-systems');
  const petcarex = projects.find(p => p.id === 'petcarex');
  const testing = projects.find(p => p.id === 'microservices-testing');

  const handleSimulateAudio = (dialectName) => {
    if (playingDialect === dialectName && simulatedPlaying) {
      setSimulatedPlaying(false);
      return;
    }
    setPlayingDialect(dialectName);
    setSimulatedPlaying(true);
    setTimeout(() => {
      setSimulatedPlaying(false);
    }, 4500);
  };

  return (
    <section id="systems" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider">
              <span>// 03. CORE PRODUCTION ARCHITECTURES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Featured Systems &amp; Technical Deep-Dives
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              Concrete implementations with verified performance benchmarks, real-world architecture trade-offs, and production code.
            </p>
          </div>

          {/* Quick System Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-surface-100 border border-surface-border">
            {[
              { id: 'arknet', label: 'ArkNet Platform', icon: Server },
              { id: 'vietnamese-tts', label: 'AI & Regional TTS', icon: Volume2 },
              { id: 'isb-systems', label: 'ISB Multi-Agent & HR', icon: Cpu },
              { id: 'petcarex', label: 'PetCareX Database', icon: Database },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
                    activeTab === tab.id
                      ? 'bg-brand-cyan text-slate-950 font-semibold shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-surface-hover'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            TAB 1: ARKNET (DISTRIBUTED SOCIAL PLATFORM)
        ========================================================================= */}
        {activeTab === 'arknet' && (
          <div className="rounded-2xl bg-surface-100/90 border border-surface-border p-6 lg:p-8 space-y-8 shadow-2xl">
            
            {/* Header info */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-surface-border">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30">
                    High-Concurrency Microservices
                  </span>
                  <span className="text-xs text-slate-400 font-mono">02/2026 - 05/2026</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  {arknet.title}
                </h3>
                <p className="text-slate-300 text-sm mt-1 max-w-3xl">
                  {arknet.tagline}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={arknet.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-200 hover:bg-surface-hover border border-surface-border hover:border-slate-500 text-xs font-mono text-slate-200 transition-all"
                >
                  <GithubIcon className="w-4 h-4 text-brand-cyan" />
                  <span>Source Code</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              {arknet.tags.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 text-xs font-mono rounded-md bg-surface-200 border border-surface-border/80 text-slate-300">
                  {t}
                </span>
              ))}
            </div>

            {/* Architecture Flowchart & Worker Topology */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-mono uppercase tracking-wider text-brand-cyan flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>Architecture &amp; Data Pipeline Topology</span>
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">Nginx Ingress → Express 5 → Redis → 9 BullMQ Queues</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {arknet.architecture.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-surface-200/90 border border-surface-border relative group hover:border-brand-cyan/40 transition-all">
                    <div className="text-[10px] font-mono text-slate-400">Step 0{idx + 1}</div>
                    <div className="text-sm font-bold text-white mt-1 group-hover:text-brand-cyan transition-colors">
                      {item.step}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Benchmark Comparison: Baseline vs K8s HPA */}
            <div className="p-6 rounded-xl bg-surface-200 border border-surface-border/80 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-mono uppercase tracking-wider text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-emerald-400" />
                    <span>Stress Test Telemetry (350 Concurrent Virtual Users)</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Comparing fixed 2-replica setup vs dynamic Kubernetes Horizontal Pod Autoscaling (HPA)
                  </p>
                </div>

                {/* Toggle Button */}
                <div className="inline-flex p-1 rounded-lg bg-surface-100 border border-surface-border">
                  <button
                    onClick={() => setStressMode('baseline')}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                      stressMode === 'baseline' ? 'bg-rose-500/20 text-rose-300 font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Baseline (No HPA)
                  </button>
                  <button
                    onClick={() => setStressMode('hpa')}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                      stressMode === 'hpa' ? 'bg-brand-emerald text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Kubernetes HPA (Scaled)
                  </button>
                </div>
              </div>

              {/* Benchmark Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-surface-100 border border-surface-border">
                  <span className="text-[10px] font-mono text-slate-400">Processed Throughput</span>
                  <div className={`text-2xl font-extrabold font-mono mt-1 ${stressMode === 'hpa' ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {stressMode === 'hpa' ? '87.2 RPS' : '36.0 RPS'}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                    {stressMode === 'hpa' ? '✔ 2.42x speedup (158K reqs)' : '⚠ Bottlenecked on CPU'}
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-surface-100 border border-surface-border">
                  <span className="text-[10px] font-mono text-slate-400">API Error Rate</span>
                  <div className={`text-2xl font-extrabold font-mono mt-1 ${stressMode === 'hpa' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {stressMode === 'hpa' ? '0.8%' : '28.4%'}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                    {stressMode === 'hpa' ? '✔ Slashed failures by >3x' : '✖ Connection timeouts'}
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-surface-100 border border-surface-border">
                  <span className="text-[10px] font-mono text-slate-400">Media Upload Success</span>
                  <div className={`text-2xl font-extrabold font-mono mt-1 ${stressMode === 'hpa' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {stressMode === 'hpa' ? '86.2%' : '34.5%'}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                    {stressMode === 'hpa' ? '✔ BullMQ async queue isolation' : '✖ Worker contention'}
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-surface-100 border border-surface-border">
                  <span className="text-[10px] font-mono text-slate-400">Pod Replicas</span>
                  <div className="text-2xl font-extrabold font-mono text-brand-cyan mt-1">
                    {stressMode === 'hpa' ? '2 → 10 Pods' : '2 Fixed Pods'}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                    {stressMode === 'hpa' ? '✔ Auto-scaled on CPU/RAM metrics' : '✖ Static resource ceiling'}
                  </span>
                </div>
              </div>

              {/* Code Snippet Spotlight */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-brand-cyan">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Redis Atomic Lua Script for Time-Decayed Trending Ranking</span>
                  </span>
                  <span>Zero Race Conditions • Sub-millisecond Execution</span>
                </div>
                <pre className="p-4 rounded-lg bg-surface-100 border border-surface-border text-xs text-slate-300 font-mono overflow-x-auto leading-relaxed">
                  <code>{arknet.codeSnippet}</code>
                </pre>
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 2: VIETNAMESE TTS & NEWS AI (MULTI-DIALECT)
        ========================================================================= */}
        {activeTab === 'vietnamese-tts' && (
          <div className="rounded-2xl bg-surface-100/90 border border-surface-border p-6 lg:p-8 space-y-8 shadow-2xl">
            
            {/* Header info */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-surface-border">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-brand-violet/20 text-brand-violet border border-brand-violet/30">
                    AI Research &amp; Neural Audio Synthesis
                  </span>
                  <span className="text-xs text-slate-400 font-mono">02/2026 - 05/2026</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  {tts.title}
                </h3>
                <p className="text-slate-300 text-sm mt-1 max-w-3xl">
                  {tts.tagline}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={tts.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-200 hover:bg-surface-hover border border-surface-border hover:border-slate-500 text-xs font-mono text-slate-200 transition-all"
                >
                  <GithubIcon className="w-4 h-4 text-brand-violet" />
                  <span>Source Code</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Pipeline Steps */}
            <div className="space-y-4">
              <h4 className="text-sm font-mono uppercase tracking-wider text-brand-violet flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Multi-Service Scrape → LLM → Neural TTS Pipeline</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {tts.architecture.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-surface-200 border border-surface-border hover:border-brand-violet/40 transition-all">
                    <span className="text-[10px] font-mono text-slate-400">Step 0{idx + 1}</span>
                    <div className="text-sm font-bold text-white mt-1">{item.step}</div>
                    <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Regional Dialect Simulator (Bắc - Trung - Nam) */}
            <div className="p-6 rounded-xl bg-surface-200 border border-surface-border space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-mono uppercase tracking-wider text-white flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-brand-cyan" />
                    <span>Regional Vietnamese Dialect Synthesis Simulator</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Select a dialect to preview the simulated regional acoustic model (vnTTS / XTTSv2)
                  </p>
                </div>
                {simulatedPlaying && (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-cyan/20 border border-brand-cyan/40 rounded-full text-brand-cyan text-xs font-mono animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping"></span>
                    <span>Synthesizing Voice...</span>
                  </div>
                )}
              </div>

              {/* Dialect Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tts.dialects.map((d, idx) => {
                  const isCurrent = playingDialect === d.name && simulatedPlaying;
                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-xl transition-all border ${
                        isCurrent
                          ? 'bg-surface-100 border-brand-cyan shadow-[0_0_20px_rgba(0,247,247,0.15)]'
                          : 'bg-surface-100/70 border-surface-border hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-white">{d.name}</span>
                        <button
                          onClick={() => handleSimulateAudio(d.name)}
                          className={`p-2 rounded-lg font-mono text-xs flex items-center gap-1 transition-all ${
                            isCurrent
                              ? 'bg-brand-cyan text-slate-950 font-bold'
                              : 'bg-surface-200 text-brand-cyan hover:bg-brand-cyan hover:text-slate-950'
                          }`}
                        >
                          {isCurrent ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          <span>{isCurrent ? 'Playing' : 'Listen'}</span>
                        </button>
                      </div>

                      <p className="text-xs text-slate-300 italic mb-3">
                        "{d.sampleText}"
                      </p>

                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-surface-border/60">
                        <span>{d.pitch}</span>
                        {isCurrent && (
                          <div className="flex items-end gap-1 h-3">
                            <span className="w-1 bg-brand-cyan h-3 animate-pulse"></span>
                            <span className="w-1 bg-brand-cyan h-2 animate-bounce"></span>
                            <span className="w-1 bg-brand-cyan h-3 animate-pulse"></span>
                            <span className="w-1 bg-brand-cyan h-1 animate-bounce"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-xs text-slate-400 font-mono bg-surface-100 p-3 rounded-lg border border-surface-border flex items-center justify-between">
                <span>Dataset: 27.1 Hours (14,475 audio-text pairs) across Vietnamese regional corpuses</span>
                <span className="text-brand-violet">FastAPI runtime + Supabase MP3 Storage</span>
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 3: ISB SYSTEMS (MULTI-AGENT & ENTERPRISE HR)
        ========================================================================= */}
        {activeTab === 'isb-systems' && (
          <div className="rounded-2xl bg-surface-100/90 border border-surface-border p-6 lg:p-8 space-y-8 shadow-2xl">
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-surface-border">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/30">
                    Production Systems @ ISB Vietnam
                  </span>
                  <span className="text-xs text-slate-400 font-mono">08/2026 - 11/2026</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  {isb.title}
                </h3>
                <p className="text-slate-300 text-sm mt-1 max-w-3xl">
                  {isb.tagline}
                </p>
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isb.features.map((feat, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-surface-200 border border-surface-border hover:border-slate-500 transition-all space-y-3">
                  <div className="flex items-center gap-2.5 text-brand-emerald font-semibold text-base">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>{feat.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {feat.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Architecture Highlights: Security & Parallel DB Containers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-surface-200 border border-surface-border">
                <span className="text-[10px] font-mono text-brand-cyan">PII Security</span>
                <div className="text-base font-bold text-white mt-1">HashiCorp Vault DEK</div>
                <p className="text-xs text-slate-400 mt-1">
                  Wrapped key encryption + HMAC blind indexing prevents plaintext leaks in DB backups.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-200 border border-surface-border">
                <span className="text-[10px] font-mono text-amber-400">ReDoS Mitigation</span>
                <div className="text-base font-bold text-white mt-1">3-18s down to &lt;200ms</div>
                <p className="text-xs text-slate-400 mt-1">
                  Refactored polynomial catastrophic backtracking regex patterns in HR email parser.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-200 border border-surface-border">
                <span className="text-[10px] font-mono text-emerald-400">CI/CD Parallelism</span>
                <div className="text-base font-bold text-white mt-1">5,600+ Vitest Tests</div>
                <p className="text-xs text-slate-400 mt-1">
                  Docker test containers with isolated per-worker databases cut CI duration by 2x (352s to 162s).
                </p>
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 4: PETCAREX (DATABASE-FIRST SYSTEMS)
        ========================================================================= */}
        {activeTab === 'petcarex' && (
          <div className="rounded-2xl bg-surface-100/90 border border-surface-border p-6 lg:p-8 space-y-8 shadow-2xl">
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-surface-border">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    Advanced Relational Database Design
                  </span>
                  <span className="text-xs text-slate-400 font-mono">09/2025 - 12/2025</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  {petcarex.title}
                </h3>
                <p className="text-slate-300 text-sm mt-1 max-w-3xl">
                  {petcarex.tagline}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={petcarex.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-200 hover:bg-surface-hover border border-surface-border hover:border-slate-500 text-xs font-mono text-slate-200 transition-all"
                >
                  <GithubIcon className="w-4 h-4 text-amber-400" />
                  <span>Source Code</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {petcarex.features.map((feat, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-surface-200 border border-surface-border hover:border-slate-500 transition-all space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-base">
                    <Database className="w-4 h-4" />
                    <span>{feat.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {feat.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-surface-200 border border-surface-border text-xs text-slate-300 font-mono space-y-2">
              <span className="text-brand-cyan">// Database Architecture Metrics</span>
              <p>• 3NF normalized schema with 30+ relational entities and strict foreign-key integrity.</p>
              <p>• Sequential UUID (COMB) indexes prevent B-Tree fragmentation from random UUID inserts.</p>
              <p>• Direct trigger encapsulation for real-time inventory deduction during prescription checkout.</p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
