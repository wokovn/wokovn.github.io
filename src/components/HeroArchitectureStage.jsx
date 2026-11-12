import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Play,
  Server,
  Shield,
  UserCheck
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { SpotlightBentoCard } from './MotionPrimitives';
import { sfx } from '../utils/sfx';

const WORKLOADS = [
  {
    id: 'arknet',
    label: '02. ARKNET BURST',
    badge: '350 Users · 87.2 RPS',
    totalMs: '15.8ms p95',
    summary:
      'Traffic automatically scales across 10 stateless servers while background queues keep user actions snappy.',
    nodes: [
      { id: 'n1', name: 'Nginx Ingress', role: 'Traffic Gateway', lat: '1.4ms', icon: Server },
      { id: 'n2', name: 'Express 5 Pods (x10)', role: 'Auto-Scaled APIs', lat: '6.8ms', icon: Activity },
      { id: 'n3', name: 'Redis Cache', role: 'Sub-ms Ranking', lat: '0.6ms', icon: Cpu },
      { id: 'n4', name: 'Queues & DB', role: 'Async Workers', lat: '7.0ms', icon: Shield }
    ]
  },
  {
    id: 'mcp',
    label: '03. AI AGENTS',
    badge: '~8h Work → 5m',
    totalMs: '5.8x Data Rows',
    summary:
      'One Lead Orchestrator delegates sub-tasks to 4 specialist AI agents reading company docs inside safe sandboxes.',
    nodes: [
      { id: 'n1', name: 'Lead Orchestrator', role: 'Task Planner', lat: '120ms', icon: Cpu },
      { id: 'n2', name: '4 Sub-Agents', role: 'Parallel Analysis', lat: '1.4s', icon: Activity },
      { id: 'n3', name: 'SQLite Sandbox', role: 'Read-Only Safe DB', lat: '18ms', icon: Server },
      { id: 'n4', name: 'Citation Audit', role: 'Fact Verification', lat: '45ms', icon: Shield }
    ]
  }
];

export default function HeroArchitectureStage({ onNavigateContact }) {
  const [mode, setMode] = useState('hiring'); // 'hiring' | 'arknet' | 'mcp'
  const [selectedNode, setSelectedNode] = useState(0);
  const [burstCount, setBurstCount] = useState(1);

  const currentWorkload = WORKLOADS.find((w) => w.id === mode);

  const triggerBurst = () => {
    sfx.playSwitch(true);
    setBurstCount((b) => b + 1);
  };

  return (
    <SpotlightBentoCard className="h-full flex flex-col justify-between p-4 sm:p-5" accentGlow>
      <div className="space-y-4">
        {/* Specimen Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border-hairline)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-wider text-[var(--text-muted)]">
              {mode === 'hiring' ? 'RECRUITER AT A GLANCE' : 'LIVE SYSTEM ARCHITECTURE'}
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--bg-well)] border border-[var(--border-hairline)]">
            {mode === 'hiring' ? '60-SEC READ' : currentWorkload?.badge}
          </span>
        </div>

        {/* Mode Switcher: Friendly Summary first for HR, plus Live Technical Tabs */}
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'hiring', label: '01. HIRING BRIEF', short: '01. BRIEF' },
            { id: 'arknet', label: '02. ARKNET TRACE', short: '02. ARKNET' },
            { id: 'mcp', label: '03. AI AGENTS', short: '03. AGENTS' }
          ].map((tab) => {
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sfx.playTick(740);
                  setMode(tab.id);
                  setSelectedNode(0);
                }}
                className={`px-2 py-2 rounded-xl text-[10px] font-mono font-bold text-center sm:text-left ${
                  active
                    ? 'tactile-chip-active'
                    : 'tactile-chip text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span className="sm:hidden block">{tab.short}</span>
                <span className="hidden sm:block truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {mode === 'hiring' ? (
            <motion.div
              key="hiring-panel"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {/* Plain-English Best Fit Roles */}
              <div className="bento-well p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[var(--signal)]">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>TARGET ROLES &amp; BEST FIT</span>
                </div>
                <div className="space-y-1.5">
                  {personalInfo.recruiterQuickRead.bestFitRoles.map((role) => (
                    <div
                      key={role}
                      className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-xs font-semibold flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] shrink-0" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Verified Highlights */}
              <div className="p-3.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-2">
                <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] block">
                  WHY INTERVIEW KHOA
                </span>
                <ul className="space-y-1.5 text-xs leading-snug">
                  {personalInfo.recruiterQuickRead.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-[var(--border-hairline)] text-[11px] font-mono text-[var(--text-muted)]">
                  {personalInfo.recruiterQuickRead.languages}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="bento-well p-3.5 space-y-3">
                <svg viewBox="0 0 400 28" className="w-full h-7 overflow-visible">
                  <line
                    x1="16"
                    y1="14"
                    x2="384"
                    y2="14"
                    stroke="var(--border-strong)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  {[0, 1, 2].map((packet) => (
                    <motion.circle
                      key={`${burstCount}-${packet}`}
                      r="4"
                      cy="14"
                      fill="var(--signal)"
                      initial={{ cx: 16, opacity: 0 }}
                      animate={{ cx: [16, 384], opacity: [0, 1, 1, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: packet * 0.48,
                        ease: 'linear'
                      }}
                    />
                  ))}
                  {[16, 138, 260, 384].map((xPos, i) => (
                    <circle
                      key={i}
                      cx={xPos}
                      cy="14"
                      r={selectedNode === i ? 5.5 : 4}
                      fill={selectedNode === i ? 'var(--signal)' : 'var(--bg-surface)'}
                      stroke="var(--text-primary)"
                      strokeWidth="1.5"
                    />
                  ))}
                </svg>

                <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
                  <span>TAP ANY COMPONENT STEP TO INSPECT ↓</span>
                  <span className="text-[var(--signal)] font-bold">INTERACTIVE</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {currentWorkload.nodes.map((node, idx) => {
                    const Icon = node.icon;
                    const isSelected = selectedNode === idx;
                    return (
                      <motion.button
                        key={`${currentWorkload.id}-${node.id}`}
                        onClick={() => {
                          sfx.playTick(680 + idx * 50);
                          setSelectedNode(idx);
                        }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-2.5 rounded-xl text-left ${
                          isSelected
                            ? 'tactile-chip-active'
                            : 'tactile-chip'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[9px] font-mono">
                          <span className={isSelected ? 'opacity-75' : 'text-[var(--text-muted)]'}>STEP 0{idx + 1}</span>
                          <span className={`font-bold tabular-nums ${isSelected ? 'text-emerald-300' : 'text-emerald-600 dark:text-emerald-400'}`}>
                            {node.lat}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-1.5">
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[var(--signal)]' : ''}`} />
                          <span className="text-xs font-bold truncate">{node.name}</span>
                        </div>
                        <div className={`text-[10px] font-mono truncate mt-0.5 ${isSelected ? 'opacity-75' : 'text-[var(--text-muted)]'}`}>
                          {node.role}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-xs space-y-1">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-[var(--signal)]">
                    ACTIVE: {currentWorkload.nodes[selectedNode].name.toUpperCase()}
                  </span>
                  <span className="text-[var(--text-muted)]">{currentWorkload.totalMs}</span>
                </div>
                <p className="text-[var(--text-muted)] leading-relaxed">{currentWorkload.summary}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action */}
      <div className="pt-3 mt-4 border-t border-[var(--border-hairline)] flex items-center justify-between gap-2 text-[10px] font-mono">
        {mode === 'hiring' ? (
          <>
            <span className="text-[var(--text-muted)]">READY TO SCHEDULE AN INTERVIEW?</span>
            <button
              type="button"
              onClick={onNavigateContact}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--signal)] text-white font-bold hover:opacity-90 transition-opacity"
            >
              <span>CONTACT PAGE</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </>
        ) : (
          <>
            <span className="text-[var(--text-muted)]">CLICK STEPS TO INSPECT</span>
            <button
              type="button"
              onClick={triggerBurst}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--text-primary)] text-[var(--bg-canvas)] font-bold hover:bg-[var(--signal)] transition-colors tabular-nums"
            >
              <Play className="w-2.5 h-2.5" />
              <span>DISPATCH TRACE [{burstCount}]</span>
            </button>
          </>
        )}
      </div>
    </SpotlightBentoCard>
  );
}
