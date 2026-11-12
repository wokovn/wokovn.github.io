import React, { useEffect, useId, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Check,
  Copy,
  ExternalLink,
  Layers,
  Pause,
  Play,
  Server,
  Terminal,
  Zap
} from 'lucide-react';
import { GithubIcon } from '../Icons';
import { SpotlightBentoCard } from '../MotionPrimitives';
import { sfx } from '../../utils/sfx';

export default function ArkNetStressLab({ arknet }) {
  const sliderId = useId();
  const [vus, setVus] = useState(350);
  const [hpaEnabled, setHpaEnabled] = useState(true);
  const [queueEnabled, setQueueEnabled] = useState(true);
  const [activeStep, setActiveStep] = useState(2);
  const [copiedLua, setCopiedLua] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [demoStep, setDemoStep] = useState(1);

  useEffect(() => {
    if (!autoPlay) return undefined;
    const states = [
      { vus: 350, hpa: false, queue: false, layer: 1 },
      { vus: 350, hpa: true, queue: true, layer: 3 },
      { vus: 480, hpa: true, queue: true, layer: 4 }
    ];
    const timer = setInterval(() => {
      setDemoStep((prev) => {
        const nextIdx = (prev + 1) % states.length;
        const s = states[nextIdx];
        setVus(s.vus);
        setHpaEnabled(s.hpa);
        setQueueEnabled(s.queue);
        setActiveStep(s.layer);
        return nextIdx;
      });
    }, 3200);
    return () => clearInterval(timer);
  }, [autoPlay]);

  // Calibrated simulation anchored on measured 350 VUs benchmarks:
  // Baseline (2 pods, no HPA): 36.0 RPS, 28.4% error, 34.5% media success
  // Optimized (10 pods HPA + BullMQ + Redis Lua): 87.2 RPS, 0.8% error, 86.2% media success
  const sim = useMemo(() => {
    const baseCap = queueEnabled ? 185 : 130;
    const hpaMaxPods = hpaEnabled ? Math.min(10, Math.max(2, Math.ceil(vus / 38))) : 2;
    const maxCapacityVus = baseCap * (hpaMaxPods / 2);
    const loadRatio = vus / maxCapacityVus;
    const overload = Math.max(0, loadRatio - 0.85);

    let rps;
    let errorRate;
    let mediaRate;
    let p95Ms;

    if (vus === 350 && !hpaEnabled && !queueEnabled) {
      rps = 36.0;
      errorRate = 28.4;
      mediaRate = 34.5;
      p95Ms = 4200;
    } else if (vus === 350 && hpaEnabled && queueEnabled) {
      rps = 87.2;
      errorRate = 0.8;
      mediaRate = 86.2;
      p95Ms = 185;
    } else {
      const targetRps = vus * 0.252;
      const effFactor = overload > 0 ? 1 / (1 + overload * 1.9) : 1;
      rps = Number(Math.max(12, targetRps * effFactor * (queueEnabled ? 1 : 0.72)).toFixed(1));
      errorRate = Number(
        Math.min(48, Math.max(0.2, overload * 34 + (queueEnabled ? 0.4 : 4.2))).toFixed(1)
      );
      mediaRate = Number(
        Math.max(
          18,
          Math.min(97, (queueEnabled ? 93 : 56) - overload * 48)
        ).toFixed(1)
      );
      p95Ms = Math.round(95 + (queueEnabled ? 0 : 260) + overload * 4600);
    }

    const cpuPerPod = Math.min(
      100,
      Math.round((vus / (hpaMaxPods * (queueEnabled ? 82 : 52))) * 100)
    );
    const saturated = cpuPerPod >= 88;

    return {
      pods: hpaMaxPods,
      cpuPerPod,
      saturated,
      rps,
      errorRate,
      mediaRate,
      p95Ms
    };
  }, [vus, hpaEnabled, queueEnabled]);

  const applyPreset = (preset) => {
    setAutoPlay(false);
    sfx.playSwitch(true);
    if (preset === 'baseline') {
      setVus(350);
      setHpaEnabled(false);
      setQueueEnabled(false);
    } else if (preset === 'optimized') {
      setVus(350);
      setHpaEnabled(true);
      setQueueEnabled(true);
    } else {
      setVus(480);
      setHpaEnabled(true);
      setQueueEnabled(true);
    }
  };

  const handleCopyLua = () => {
    navigator.clipboard.writeText(arknet?.codeSnippet || '');
    sfx.playSuccess();
    setCopiedLua(true);
    setTimeout(() => setCopiedLua(false), 2000);
  };

  return (
    <SpotlightBentoCard className="p-3.5 sm:p-4" accentGlow>
      <div className="space-y-3">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 pb-2.5 border-b border-[var(--border-hairline)]">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--signal)] text-white">
                LAB 01 // DISTRIBUTED SIMULATOR
              </span>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">
                Express 5 · Redis Lua · 9 BullMQ Queues · K8s HPA
              </span>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight">
              {arknet?.title}
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-2xl">
              Calibrated to real 350-VU load tests (158K+ requests served). Drag concurrent load or toggle autoscaling to inspect pod saturation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                sfx.playTick(720);
                setAutoPlay((a) => !a);
              }}
              className={`px-2 py-1.5 rounded-lg text-[10px] font-mono font-bold inline-flex items-center gap-1 ${
                autoPlay ? 'tactile-chip-active' : 'tactile-chip text-[var(--text-muted)]'
              }`}
              title="Toggle automatic live simulation tour"
            >
              {autoPlay ? <Pause className="w-3 h-3 text-[var(--signal)]" /> : <Play className="w-3 h-3 text-emerald-500" />}
              <span>{autoPlay ? 'AUTO DEMO' : 'PAUSED'}</span>
            </button>
            <button
              onClick={() => applyPreset('baseline')}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-semibold ${
                !hpaEnabled && !queueEnabled && vus === 350
                  ? 'bg-rose-600 text-white border border-rose-600 shadow-sm'
                  : 'tactile-chip'
              }`}
            >
              Simulate Baseline (2 Pods)
            </button>
            <button
              onClick={() => applyPreset('optimized')}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-semibold ${
                hpaEnabled && queueEnabled && vus === 350
                  ? 'bg-emerald-600 text-white border border-emerald-600 shadow-sm'
                  : 'tactile-chip'
              }`}
            >
              Simulate Benchmark (350 VUs)
            </button>
            {arknet?.repo && (
              <a
                href={arknet.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="swiss-btn-secondary py-1.5 px-3"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Repo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Control Console + Live Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Controls Panel */}
          <div className="lg:col-span-5 bento-well p-3.5 sm:p-4 flex flex-col justify-between space-y-3.5">
            <div className="space-y-4">
              {/* VU Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[var(--text-primary)]">CONCURRENT USERS (VUs)</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--text-primary)] text-[var(--bg-canvas)] font-bold tabular-nums">
                    {vus} VUs
                  </span>
                </div>
                <input
                  id={sliderId}
                  name="arknetVus"
                  type="range"
                  min={50}
                  max={500}
                  step={10}
                  value={vus}
                  onChange={(e) => {
                    setAutoPlay(false);
                    setVus(Number(e.target.value));
                  }}
                  aria-label="Concurrent virtual users"
                  className="w-full accent-[var(--signal)] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)]">
                  <span>50 idle</span>
                  <span className="font-bold text-[var(--text-primary)]">350 benchmark</span>
                  <span>500 spike</span>
                </div>
              </div>

              {/* Hardware Toggle Switches */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setAutoPlay(false);
                    const next = !hpaEnabled;
                    setHpaEnabled(next);
                    sfx.playSwitch(next);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between gap-2 tactile-chip ${
                    !hpaEnabled ? 'opacity-85' : ''
                  }`}
                >
                  <div>
                    <div className="text-xs font-mono font-bold">KUBERNETES HPA (2 → 10 PODS)</div>
                    <div className="text-[11px] text-[var(--text-muted)]">
                      Click to toggle CPU-based replica scaling
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-mono font-bold ${
                        hpaEnabled ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
                      }`}
                    >
                      {hpaEnabled ? 'ON' : 'OFF'}
                    </span>
                    <span
                      className={`w-8 h-4.5 p-0.5 rounded-full transition-colors flex items-center ${
                        hpaEnabled ? 'bg-emerald-500 justify-end' : 'bg-zinc-400 dark:bg-zinc-600 justify-start'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-white shadow-sm block" />
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAutoPlay(false);
                    const next = !queueEnabled;
                    setQueueEnabled(next);
                    sfx.playSwitch(next);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between gap-2 tactile-chip ${
                    !queueEnabled ? 'opacity-85' : ''
                  }`}
                >
                  <div>
                    <div className="text-xs font-mono font-bold">9 BULLMQ QUEUES + REDIS LUA</div>
                    <div className="text-[11px] text-[var(--text-muted)]">
                      Click to toggle async fanout &amp; ranking workers
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-mono font-bold ${
                        queueEnabled ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
                      }`}
                    >
                      {queueEnabled ? 'ON' : 'OFF'}
                    </span>
                    <span
                      className={`w-8 h-4.5 p-0.5 rounded-full transition-colors flex items-center ${
                        queueEnabled ? 'bg-emerald-500 justify-end' : 'bg-zinc-400 dark:bg-zinc-600 justify-start'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-white shadow-sm block" />
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Live Simulated KPI Readout */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--border-hairline)] font-mono">
              <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)]">
                <div className="text-[9px] text-[var(--text-muted)]">THROUGHPUT</div>
                <div className="text-base font-bold tabular-nums">{sim.rps} RPS</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
                  vs 36.0 baseline
                </div>
              </div>
              <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)]">
                <div className="text-[9px] text-[var(--text-muted)]">ERROR RATE</div>
                <div
                  className={`text-base font-bold tabular-nums ${
                    sim.errorRate > 5 ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {sim.errorRate}%
                </div>
                <div className="text-[10px] text-[var(--text-muted)]">
                  p95: {sim.p95Ms}ms
                </div>
              </div>
              <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)]">
                <div className="text-[9px] text-[var(--text-muted)]">MEDIA PIPELINE</div>
                <div className="text-base font-bold tabular-nums">{sim.mediaRate}%</div>
                <div className="text-[10px] text-[var(--text-muted)]">Async BullMQ</div>
              </div>
              <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)]">
                <div className="text-[9px] text-[var(--text-muted)]">CLUSTER STATE</div>
                <div className="text-base font-bold tabular-nums">{sim.pods} Pods</div>
                <div
                  className={`text-[10px] ${
                    sim.saturated ? 'text-rose-500 font-bold' : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {sim.cpuPerPod}% CPU avg
                </div>
              </div>
            </div>
          </div>

          {/* Live Topology Visualizer + Redis Lua */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
            {/* Animated Cluster Canvas */}
            <div className="bento-well p-3 sm:p-3.5 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="flex items-center gap-1.5 font-bold">
                  <Activity className="w-3.5 h-3.5 text-[var(--signal)]" />
                  <span>LIVE CLUSTER TOPOLOGY ({sim.pods} REPLICAS)</span>
                </span>
                <span
                  className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                    sim.saturated
                      ? 'bg-rose-500/15 text-rose-500'
                      : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {sim.saturated ? 'SATURATION WARNING' : 'NOMINAL HEALTH'}
                </span>
              </div>

              {/* Dynamic SVG Animated Traffic Conduit */}
              <div className="w-full overflow-hidden">
                <svg viewBox="0 0 600 44" className="w-full h-9">
                  <line
                    x1="20"
                    y1="22"
                    x2="580"
                    y2="22"
                    stroke="var(--border-strong)"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                  />
                  {[0, 1, 2, 3, 4].map((p) => (
                    <motion.circle
                      key={p}
                      r={sim.saturated ? 4.5 : 3.5}
                      cy={22}
                      fill={sim.saturated && p % 2 === 1 ? '#E11D48' : 'var(--signal)'}
                      initial={{ cx: 20, opacity: 0.9 }}
                      animate={{ cx: 580, opacity: [0.2, 1, 0.2] }}
                      transition={{
                        duration: Math.max(0.75, 2.4 - vus / 300),
                        repeat: Infinity,
                        delay: p * 0.32,
                        ease: 'linear'
                      }}
                    />
                  ))}
                  <rect x="8" y="10" width="78" height="24" rx="6" fill="var(--bg-surface)" stroke="var(--border-strong)" />
                  <text x="47" y="25" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fill="var(--text-primary)">
                    NGINX ({vus})
                  </text>
                  <rect x="502" y="10" width="90" height="24" rx="6" fill="var(--bg-surface)" stroke="var(--border-strong)" />
                  <text x="547" y="25" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fill="var(--text-primary)">
                    {queueEnabled ? 'BULLMQ (9)' : 'SYNC LOOP'}
                  </text>
                </svg>
              </div>

              {/* Animated Pod Grid (2 to 10 Replicas) */}
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-1.5 font-mono">
                <AnimatePresence>
                  {Array.from({ length: sim.pods }).map((_, idx) => (
                    <motion.div
                      key={`pod-${idx}`}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 24, delay: idx * 0.02 }}
                      className={`p-1.5 rounded-lg border text-[10px] transition-colors ${
                        sim.saturated
                          ? 'bg-rose-500/10 border-rose-500/50 text-rose-500'
                          : 'bg-[var(--bg-surface)] border-[var(--border-hairline)]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="flex items-center gap-1">
                          <Server className="w-2.5 h-2.5" />
                          <span>pod-{idx + 1}</span>
                        </span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            sim.saturated ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'
                          }`}
                        />
                      </div>
                      <div className="mt-1.5 w-full h-1 rounded-full bg-[var(--bg-well)] overflow-hidden">
                        <motion.div
                          animate={{ width: `${sim.cpuPerPod}%` }}
                          transition={{ duration: 0.35 }}
                          className={`h-full ${
                            sim.saturated ? 'bg-rose-500' : 'bg-emerald-500'
                          }`}
                        />
                      </div>
                      <div className="mt-1 text-[9px] text-[var(--text-muted)] tabular-nums">
                        CPU {sim.cpuPerPod}%
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Interactive 6-Layer Architecture Selector + Atomic Redis Lua */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="flex items-center gap-1.5 font-bold">
                  <Layers className="w-3.5 h-3.5 text-[var(--signal)]" />
                  <span>6-LAYER ARCHITECTURE TRACE</span>
                </span>
                <span className="text-[10px] font-bold text-[var(--signal)]">Tap any layer ↓</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {arknet?.architecture?.map((node, idx) => {
                  const selected = activeStep === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setAutoPlay(false);
                        sfx.playTick(700);
                        setActiveStep(idx);
                      }}
                      className={`relative p-1.5 rounded-xl text-left ${
                        selected ? 'tactile-chip-active' : 'tactile-chip'
                      }`}
                    >
                      <span className="text-[9px] font-mono opacity-60 block">0{idx + 1}</span>
                      <span className="text-[10px] font-mono font-bold block leading-tight">
                        {node.step}
                      </span>
                    </button>
                  );
                })}
              </div>

              {arknet?.architecture?.[activeStep] && (
                <div className="px-3 py-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-well)]/70 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-xs">
                  <span className="font-mono font-bold text-[var(--signal)] shrink-0">
                    [{arknet.architecture[activeStep].step}]
                  </span>
                  <span className="text-[var(--text-primary)] leading-snug">
                    {arknet.architecture[activeStep].desc}
                  </span>
                </div>
              )}

              {/* Copyable Atomic Redis Lua Box */}
              <div className="rounded-xl border border-[var(--border-strong)] bg-[#0D0D10] text-zinc-100 p-2.5 font-mono">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-zinc-400 pb-1.5 mb-1.5 border-b border-zinc-800">
                  <span className="flex items-center gap-1.5 text-zinc-200 font-semibold">
                    <Terminal className="w-3 h-3 text-[var(--signal)] shrink-0" />
                    <span>REDIS ATOMIC LUA (TIME-DECAY RANKING · &lt;1ms)</span>
                  </span>
                  <button
                    onClick={handleCopyLua}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors shrink-0"
                  >
                    {copiedLua ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[10px] text-emerald-400 overflow-x-auto max-h-[64px] overflow-y-auto leading-snug">
                  {arknet?.codeSnippet}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SpotlightBentoCard>
  );
}
