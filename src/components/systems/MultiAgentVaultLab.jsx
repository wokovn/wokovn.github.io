import React, { useEffect, useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Bot,
  Lock,
  Pause,
  Play,
  Zap
} from 'lucide-react';
import { SpotlightBentoCard } from '../MotionPrimitives';
import { sfx } from '../../utils/sfx';

const GRAPH_NODES = [
  {
    id: 'orc',
    x: 320,
    y: 44,
    w: 168,
    h: 44,
    kind: 'orchestrator',
    label: 'LEAD ORCHESTRATOR',
    sub: 'Plan · Delegate · PG Checkpoint',
    spec: 'Decomposes complex multi-domain prompts into parallel sub-tasks and persists graph checkpoints in PostgreSQL.'
  },
  {
    id: 'h1',
    x: 92,
    y: 148,
    w: 132,
    h: 42,
    kind: 'agent',
    label: 'AGENT 01 · SQL',
    sub: 'Schema & Aggregations',
    spec: 'Generates bounded SQL queries, executes inside isolated SQLite sandbox, and returns typed row slices.'
  },
  {
    id: 'h2',
    x: 244,
    y: 148,
    w: 132,
    h: 42,
    kind: 'agent',
    label: 'AGENT 02 · DOCS',
    sub: 'Contract & SOP Reader',
    spec: 'Retrieves company policies, SOP handbooks, and renewal clauses from indexed corporate document stores.'
  },
  {
    id: 'h3',
    x: 396,
    y: 148,
    w: 132,
    h: 42,
    kind: 'agent',
    label: 'AGENT 03 · AUDIT',
    sub: 'Citation Verifier',
    spec: 'Cross-checks numerical facts between Agent 01 and Agent 02 (~4x source coverage) before approving synthesis.'
  },
  {
    id: 'h4',
    x: 548,
    y: 148,
    w: 132,
    h: 42,
    kind: 'agent',
    label: 'AGENT 04 · SYNTH',
    sub: 'Report Assembler',
    spec: 'Compiles verified tables, citations, and anomalies into structured executive summaries (~8h work down to ~5m).'
  },
  {
    id: 'docs',
    x: 120,
    y: 266,
    w: 148,
    h: 42,
    kind: 'resource',
    label: 'COMPANY DOCS',
    sub: 'SOPs · Policies · Contracts',
    spec: 'Company knowledge repository feeding verified clauses and KPI definitions to helper agents.'
  },
  {
    id: 'skills',
    x: 320,
    y: 266,
    w: 156,
    h: 42,
    kind: 'resource',
    label: 'SKILLS & MCP TOOLS',
    sub: 'sql_exec · doc_grep · diff',
    spec: 'Modular MCP skill registry exposing safe typed tools (schema introspection, regex diff, summarization).'
  },
  {
    id: 'sandbox',
    x: 520,
    y: 266,
    w: 152,
    h: 42,
    kind: 'resource',
    label: 'SQLITE SANDBOX',
    sub: 'Read-Only Ephemeral RAM',
    spec: 'Per-run isolated in-memory SQLite instance safeguarding production PostgreSQL during autonomous execution.'
  }
];

const GRAPH_EDGES = [
  // Orchestrator <-> 4 Sub-Agents
  { id: 'e-o-1', from: 'orc', to: 'h1', path: 'M 280 66 C 200 90, 120 100, 92 127', dur: 1.7, bidirectional: true },
  { id: 'e-o-2', from: 'orc', to: 'h2', path: 'M 304 66 C 280 96, 255 106, 244 127', dur: 1.4, bidirectional: true },
  { id: 'e-o-3', from: 'orc', to: 'h3', path: 'M 336 66 C 360 96, 385 106, 396 127', dur: 1.5, bidirectional: true },
  { id: 'e-o-4', from: 'orc', to: 'h4', path: 'M 360 66 C 440 90, 520 100, 548 127', dur: 1.8, bidirectional: true },
  // Agent-to-Agent cross verification
  { id: 'e-1-2', from: 'h1', to: 'h2', path: 'M 158 148 L 178 148', dur: 1.1, bidirectional: true },
  { id: 'e-2-3', from: 'h2', to: 'h3', path: 'M 310 148 L 330 148', dur: 1.1, bidirectional: true },
  { id: 'e-3-4', from: 'h3', to: 'h4', path: 'M 462 148 L 482 148', dur: 1.1, bidirectional: true },
  // Sub-Agents <-> Company Docs, Skills/MCP & SQLite Sandbox
  { id: 'e-1-doc', from: 'h1', to: 'docs', path: 'M 92 169 C 92 208, 114 222, 120 245', dur: 1.6, bidirectional: true },
  { id: 'e-2-doc', from: 'h2', to: 'docs', path: 'M 225 169 C 196 206, 152 218, 134 245', dur: 1.5, bidirectional: true },
  { id: 'e-2-sk', from: 'h2', to: 'skills', path: 'M 255 169 C 276 206, 298 220, 310 245', dur: 1.35, bidirectional: true },
  { id: 'e-3-sk', from: 'h3', to: 'skills', path: 'M 385 169 C 364 206, 342 220, 330 245', dur: 1.45, bidirectional: true },
  { id: 'e-1-sb', from: 'h1', to: 'sandbox', path: 'M 118 169 C 225 224, 395 224, 500 245', dur: 2.1, bidirectional: true },
  { id: 'e-3-sb', from: 'h3', to: 'sandbox', path: 'M 412 169 C 450 206, 488 220, 512 245', dur: 1.55, bidirectional: true },
  { id: 'e-4-sk', from: 'h4', to: 'skills', path: 'M 526 169 C 460 212, 390 220, 346 245', dur: 1.85, bidirectional: true }
];

const REVERSE_PATHS = {
  'e-o-1': 'M 92 127 C 120 100, 200 90, 280 66',
  'e-o-2': 'M 244 127 C 255 106, 280 96, 304 66',
  'e-o-3': 'M 396 127 C 385 106, 360 96, 336 66',
  'e-o-4': 'M 548 127 C 520 100, 440 90, 360 66',
  'e-1-2': 'M 178 148 L 158 148',
  'e-2-3': 'M 330 148 L 310 148',
  'e-3-4': 'M 482 148 L 462 148',
  'e-1-doc': 'M 120 245 C 114 222, 92 208, 92 169',
  'e-2-doc': 'M 134 245 C 152 218, 196 206, 225 169',
  'e-2-sk': 'M 310 245 C 298 220, 276 206, 255 169',
  'e-3-sk': 'M 330 245 C 342 220, 364 206, 385 169',
  'e-1-sb': 'M 500 245 C 395 224, 225 224, 118 169',
  'e-3-sb': 'M 512 245 C 488 220, 450 206, 412 169',
  'e-4-sk': 'M 346 245 C 390 220, 460 212, 526 169'
};

const MESSAGE_STREAM = [
  '[ORC → H1,H2,H3,H4] dispatch(task="Q3_ops_audit", checkpoint="pg_cp_881")',
  '[H2 ↔ COMPANY DOCS] fetch("hr_renewal_sop_v4.md", sections=[3, 7])',
  '[H1 ↔ SKILLS/MCP] invoke("sqlite_ro_query", rows_scanned="5.8x")',
  '[H1 → H3] emit_slice(table="contracts_q3", hash="a94c1f")',
  '[H3 ↔ SQLITE SANDBOX] verify_totals(expected=14820, actual=14820, match=100%)',
  '[H3 → H4] approve_citations(sources=14, confidence=0.98)',
  '[H4 → ORC] commit_synthesis(duration="4m52s", checkpoint="saved")'
];

export default function MultiAgentVaultLab({ initialTab = 'agents', lockedMode = false }) {
  const vaultInputId = useId();
  const redosGradId = useId();
  const [tab, setTab] = useState(initialTab);
  const [selectedNodeId, setSelectedNodeId] = useState('orc');
  const [streaming, setStreaming] = useState(true);
  const [msgCursor, setMsgCursor] = useState(0);

  const [piiInput, setPiiInput] = useState('anhkhoa.nguyen4405@gmail.com');
  const [blindIndex, setBlindIndex] = useState('hmac_sha256:9f84b2...e31c');
  const [vaultCipher, setVaultCipher] = useState('vault:v1:WrappedDEK:8kXq2pL9...');
  const [raceRun, setRaceRun] = useState(0);
  const [autoCycle, setAutoCycle] = useState(true);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (!streaming || tab !== 'agents') return undefined;
    const id = setInterval(() => {
      setMsgCursor((prev) => (prev + 1) % MESSAGE_STREAM.length);
    }, 1500);
    return () => clearInterval(id);
  }, [streaming, tab]);

  useEffect(() => {
    if (!autoCycle) return undefined;
    if (tab === 'agents' && streaming) {
      const order = ['orc', 'a1', 'docs', 'a2', 'mcp', 'a3', 'db', 'a4'];
      const id = setInterval(() => {
        setSelectedNodeId((prev) => {
          const i = order.indexOf(prev);
          return order[(i + 1) % order.length];
        });
      }, 2400);
      return () => clearInterval(id);
    }
    if (tab === 'vault') {
      const id = setInterval(() => {
        setRaceRun((prev) => (prev % 4) + 1);
      }, 2100);
      return () => clearInterval(id);
    }
    return undefined;
  }, [autoCycle, streaming, tab]);

  useEffect(() => {
    let active = true;
    const computeCrypto = async () => {
      try {
        const enc = new TextEncoder().encode(piiInput || 'empty');
        const digest = await window.crypto.subtle.digest('SHA-256', enc);
        const hex = Array.from(new Uint8Array(digest))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
        const b64 = btoa(String.fromCharCode(...new Uint8Array(digest).slice(0, 14)));
        if (active) {
          setBlindIndex(`hmac_sha256:${hex.slice(0, 12)}...${hex.slice(-6)}`);
          setVaultCipher(`vault:v1:DEK_Wrap:${b64}`);
        }
      } catch {
        // Fallback if subtle crypto unavailable
      }
    };
    computeCrypto();
    return () => {
      active = false;
    };
  }, [piiInput]);

  const selectedNode = GRAPH_NODES.find((n) => n.id === selectedNodeId) || GRAPH_NODES[0];
  const visibleLogs = [
    MESSAGE_STREAM[msgCursor],
    MESSAGE_STREAM[(msgCursor + 1) % MESSAGE_STREAM.length],
    MESSAGE_STREAM[(msgCursor + 2) % MESSAGE_STREAM.length]
  ];

  return (
    <SpotlightBentoCard className="p-4 sm:p-5 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-hairline)]">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-[var(--signal)]">
              {tab === 'agents'
                ? '02 // ISB VIETNAM · CONTINUOUS MULTI-AGENT MESH'
                : '03 // ISB VIETNAM · VAULT CRYPTOGRAPHY & REDOS'}
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight">
              {tab === 'agents'
                ? 'Lead Orchestrator + 4 Helper Agents & Knowledge Mesh'
                : 'HashiCorp Vault DEK & ReDoS Tuning'}
            </h3>
          </div>

          {!lockedMode && (
            <div className="inline-flex p-1 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-well)] self-start">
              {[
                { id: 'agents', label: 'Multi-Agent' },
                { id: 'vault', label: 'Vault + ReDoS' }
              ].map((item) => {
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      sfx.playTick(720);
                      setTab(item.id);
                    }}
                    className={`relative px-3 py-1 rounded-lg text-[11px] font-mono font-semibold z-10 transition-colors ${
                      active ? 'text-[var(--bg-canvas)]' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="isbTabPill"
                        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                        className="absolute inset-0 rounded-lg bg-[var(--text-primary)] -z-10"
                      />
                    )}
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'agents' ? (
            <motion.div
              key="agents"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="space-y-3.5"
            >
              {/* Status & Stream Control */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                <span className="flex items-center gap-1.5 font-bold">
                  <Activity
                    className={`w-3.5 h-3.5 text-[var(--signal)] ${
                      streaming ? 'animate-pulse' : ''
                    }`}
                  />
                  <span>
                    {streaming
                      ? 'LIVE BIDIRECTIONAL AGENT-SKILL-DOC BUS'
                      : 'STREAM PAUSED · CLICK NODE TO INSPECT'}
                  </span>
                </span>

                <button
                  onClick={() => {
                    const next = !streaming;
                    setStreaming(next);
                    sfx.playSwitch(next);
                  }}
                  className="tactile-chip inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold"
                >
                  {streaming ? <Pause className="w-3 h-3 text-[var(--signal)]" /> : <Play className="w-3 h-3 text-emerald-500" />}
                  <span>{streaming ? 'PAUSE MESH' : 'RESUME MESH'}</span>
                </button>
              </div>

              {/* Scalable Vector Node-Edge Topology Canvas */}
              <div className="bento-well p-2 sm:p-2.5 space-y-2">
                <div className="flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)] px-1">
                  <span className="sm:hidden">Swipe diagram ↔ or tap node pills</span>
                  <span className="hidden sm:inline">CLICK ANY GRAPH NODE TO INSPECT ROLE →</span>
                  <span className="text-[var(--signal)] font-bold">8 INTERACTIVE NODES</span>
                </div>
                <div className="overflow-x-auto pb-1">
                  <svg
                    viewBox="0 0 640 306"
                    className="min-w-[540px] sm:min-w-0 w-full sm:max-h-[235px] h-auto select-none"
                    role="img"
                    aria-label="Continuous Multi-Agent Orchestrator Graph with 4 Sub-Agents, Company Docs, MCP Skills, and SQLite Sandbox"
                  >
                  {/* Curved Communication Links + Continuous Bidirectional Signal Packets */}
                  {GRAPH_EDGES.map((edge, idx) => {
                    const connected =
                      edge.from === selectedNodeId || edge.to === selectedNodeId;
                    return (
                      <g key={edge.id}>
                        <path
                          d={edge.path}
                          fill="none"
                          stroke={connected ? 'var(--signal)' : 'var(--border-strong)'}
                          strokeWidth={connected ? 1.8 : 1.1}
                          strokeOpacity={connected ? 0.95 : 0.48}
                          strokeDasharray="4 4"
                        />

                        {streaming && (
                          <>
                            {/* Downstream Packet (Signal Vermilion) */}
                            <circle r={connected ? 3.4 : 2.5} fill="#FF3B00">
                              <animateMotion
                                dur={`${edge.dur}s`}
                                repeatCount="indefinite"
                                begin={`${(idx % 5) * 0.28}s`}
                                path={edge.path}
                              />
                            </circle>

                            {/* Return Response Packet (Emerald) */}
                            {edge.bidirectional && REVERSE_PATHS[edge.id] && (
                              <circle r={connected ? 2.8 : 2.1} fill="#10B981">
                                <animateMotion
                                  dur={`${edge.dur * 1.15}s`}
                                  repeatCount="indefinite"
                                  begin={`${((idx + 2) % 5) * 0.31}s`}
                                  path={REVERSE_PATHS[edge.id]}
                                />
                              </circle>
                            )}
                          </>
                        )}
                      </g>
                    );
                  })}

                  {/* Interactive Vector Nodes */}
                  {GRAPH_NODES.map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    const x0 = node.x - node.w / 2;
                    const y0 = node.y - node.h / 2;

                    const isOrc = node.kind === 'orchestrator';
                    const isRes = node.kind === 'resource';

                    return (
                      <g
                        key={node.id}
                        onClick={() => {
                          setAutoCycle(false);
                          sfx.playTick(740);
                          setSelectedNodeId(node.id);
                        }}
                        className="cursor-pointer"
                      >
                        <rect
                          x={x0}
                          y={y0}
                          width={node.w}
                          height={node.h}
                          rx="10"
                          fill={
                            isSelected
                              ? 'var(--text-primary)'
                              : isOrc
                              ? 'var(--bg-surface)'
                              : isRes
                              ? 'var(--bg-surface)'
                              : 'var(--bg-surface)'
                          }
                          stroke={
                            isSelected
                              ? 'var(--signal)'
                              : isOrc
                              ? 'var(--signal)'
                              : 'var(--border-strong)'
                          }
                          strokeWidth={isSelected || isOrc ? 1.8 : 1}
                        />
                        {/* Status Dot */}
                        <circle
                          cx={x0 + 11}
                          cy={node.y - 6}
                          r="2.8"
                          fill={
                            isOrc
                              ? '#FF3B00'
                              : isRes
                              ? '#0057FF'
                              : '#10B981'
                          }
                        />
                        <text
                          x={x0 + 19}
                          y={node.y - 3}
                          fontSize="8.8"
                          fontFamily="JetBrains Mono, monospace"
                          fontWeight="700"
                          fill={isSelected ? 'var(--bg-canvas)' : 'var(--text-primary)'}
                        >
                          {node.label}
                        </text>
                        <text
                          x={x0 + 11}
                          y={node.y + 11}
                          fontSize="7.4"
                          fontFamily="JetBrains Mono, monospace"
                          fill={isSelected ? 'var(--bg-well)' : 'var(--text-muted)'}
                        >
                          {node.sub}
                        </text>
                      </g>
                    );
                  })}
                  </svg>
                </div>

                {/* Mobile-only thumb-friendly node picker */}
                <div className="flex sm:hidden flex-wrap gap-1 pt-1 border-t border-[var(--border-hairline)]">
                  {GRAPH_NODES.map((node) => {
                    const active = selectedNodeId === node.id;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => {
                          setAutoCycle(false);
                          sfx.playTick(740);
                          setSelectedNodeId(node.id);
                        }}
                        className={`px-2 py-1 rounded-lg text-[9px] font-mono font-bold ${
                          active
                            ? 'tactile-chip-active'
                            : 'tactile-chip text-[var(--text-muted)]'
                        }`}
                      >
                        {node.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Node Spec + Rolling Message Bus */}
              <div className="grid grid-cols-1 gap-2">
                <div className="p-2.5 sm:p-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono">
                    <span className="font-bold flex items-center gap-1.5 text-[var(--signal)]">
                      <Bot className="w-3.5 h-3.5" />
                      <span>INSPECTOR: {selectedNode.label}</span>
                    </span>
                    <span className="text-[var(--text-muted)]">{selectedNode.sub}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {selectedNode.spec}
                  </p>
                </div>

                {/* Continuous Live Message Exchange Bus */}
                <div className="rounded-xl border border-[var(--border-strong)] bg-[#0D0D10] text-zinc-200 p-2.5 sm:p-3 font-mono text-[10px] space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-zinc-400 pb-1 border-b border-zinc-800">
                    <span>INTER-AGENT MESSAGE BUS</span>
                    <span className="text-emerald-400 font-bold">5.8x ROWS · ~8h → 5m</span>
                  </div>
                  {visibleLogs.map((line, i) => (
                    <div
                      key={`${msgCursor}-${i}`}
                      className={`break-words sm:truncate ${i === 0 ? 'text-emerald-400 font-semibold' : 'text-zinc-400'}`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="vault"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="space-y-4"
            >
              <div className="bento-well p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[var(--signal)]" />
                    <span>LIVE VAULT DEK + BLIND INDEX SANDBOX</span>
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400">SHA-256 LIVE</span>
                </div>

                <input
                  id={vaultInputId}
                  name="vaultPiiInput"
                  type="text"
                  value={piiInput}
                  onChange={(e) => setPiiInput(e.target.value)}
                  placeholder="Type any PII string to hash & wrap..."
                  className="w-full px-3 py-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] text-xs font-mono outline-none focus:border-[var(--signal)]"
                />

                <div className="grid grid-cols-1 gap-1.5 font-mono text-[11px]">
                  <div className="p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-hairline)] flex items-center justify-between gap-2">
                    <span className="text-[9px] text-[var(--text-muted)] shrink-0">BLIND INDEX</span>
                    <span className="truncate font-semibold text-emerald-600 dark:text-emerald-400">
                      {blindIndex}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-hairline)] flex items-center justify-between gap-2">
                    <span className="text-[9px] text-[var(--text-muted)] shrink-0">WRAPPED DEK</span>
                    <span className="truncate font-semibold">{vaultCipher}</span>
                  </div>
                </div>
              </div>

              {(() => {
                const uid = redosGradId;
                const presets = [
                  { len: 12, x: 56, legacyY: 96, linearY: 98, legacyMs: '14ms', linearMs: '8ms', badge: 'OK', danger: false },
                  { len: 24, x: 162, legacyY: 85, linearY: 96, legacyMs: '420ms', linearMs: '45ms', badge: 'SLOW', danger: false },
                  { len: 32, x: 268, legacyY: 50, linearY: 93, legacyMs: '3,400ms', linearMs: '110ms', badge: 'LAG', danger: true },
                  { len: 40, x: 374, legacyY: 14, linearY: 90, legacyMs: '18,000ms', linearMs: '165ms', badge: 'STALL', danger: true },
                ];
                const activeIdx = raceRun === 0 ? 3 : (raceRun - 1) % presets.length;
                const active = presets[activeIdx];
                return (
                  <div className="p-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-well)]/35 space-y-2 font-mono">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold">
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[var(--signal)]" />
                        <span>REGEX LATENCY VS. INPUT LENGTH</span>
                      </span>
                      <div className="flex items-center gap-1" role="group" aria-label="Select input character length">
                        {presets.map((p, idx) => (
                          <button
                            key={p.len}
                            type="button"
                            onClick={() => {
                              setAutoCycle(false);
                              sfx.playSwitch(true);
                              setRaceRun(idx + 1);
                            }}
                            className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                              activeIdx === idx
                                ? 'tactile-chip-active'
                                : 'tactile-chip text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                            }`}
                          >
                            {p.len}ch
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="relative rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)]/70 p-2.5 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[9px] font-bold">
                        <span className="inline-flex items-center gap-1.5 text-rose-500">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          <span>O(2ⁿ) Backtracking Regex</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>O(n) Linear Parser (&lt;200ms)</span>
                        </span>
                      </div>

                      <svg viewBox="0 0 410 112" className="w-full h-[108px] overflow-visible" aria-label="Exponential regex backtracking vs linear parser latency chart">
                        <defs>
                          <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.28" />
                            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Y-axis scale references */}
                        <text x="4" y="18" className="fill-rose-500/80 text-[8px] font-bold">18s</text>
                        <text x="4" y="72" className="fill-rose-500/80 text-[8px] font-bold">1s SLA</text>
                        <text x="4" y="100" className="fill-current opacity-45 text-[8px] font-bold">0ms</text>

                        <line x1="40" y1="70" x2="392" y2="70" stroke="#f43f5e" strokeOpacity="0.32" strokeDasharray="3 3" />
                        <line x1="40" y1="100" x2="392" y2="100" stroke="currentColor" strokeOpacity="0.18" />

                        {/* Exponential area + curve O(2^n) */}
                        <path
                          d="M 56 96 C 122 94, 200 80, 268 50 C 316 29, 348 19, 374 14 L 374 100 L 56 100 Z"
                          fill={`url(#${uid})`}
                        />
                        <path
                          d="M 56 96 C 122 94, 200 80, 268 50 C 316 29, 348 19, 374 14"
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />

                        {/* Linear curve O(n) */}
                        <path
                          d="M 56 98 L 162 96 L 268 93 L 374 90"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />

                        {/* Active input cursor */}
                        <line
                          x1={active.x}
                          y1="8"
                          x2={active.x}
                          y2="100"
                          stroke="currentColor"
                          strokeOpacity="0.3"
                          strokeDasharray="2 2"
                        />

                        {/* Points on Exponential & Linear curves */}
                        <circle cx={active.x} cy={active.legacyY} r="4.8" fill="#f43f5e" stroke="var(--bg-canvas)" strokeWidth="1.5" />
                        <circle cx={active.x} cy={active.linearY} r="4.8" fill="#10b981" stroke="var(--bg-canvas)" strokeWidth="1.5" />

                        {presets.map((p, idx) => (
                          <text
                            key={p.len}
                            x={p.x}
                            y="110"
                            textAnchor="middle"
                            className={`text-[8.5px] font-bold ${
                              activeIdx === idx ? 'fill-current opacity-100' : 'fill-current opacity-45'
                            }`}
                          >
                            {p.len} chars
                          </text>
                        ))}
                      </svg>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="px-2.5 py-1.5 rounded-lg border border-rose-500/25 bg-rose-500/5 flex items-center justify-between">
                        <span className="text-[var(--text-muted)]">Pre-Fix Regex</span>
                        <span className="text-rose-500 font-bold">
                          {active.legacyMs} · {active.badge}
                        </span>
                      </div>
                      <div className="px-2.5 py-1.5 rounded-lg border border-emerald-500/25 bg-emerald-500/5 flex items-center justify-between">
                        <span className="text-[var(--text-muted)]">Linear Parser</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          {active.linearMs} · SAFE
                        </span>
                      </div>
                    </div>

                    <p className="font-sans text-[11px] leading-snug text-[var(--text-muted)]">
                      Long secrets trigger exponential retries (<span className="font-mono font-semibold text-rose-500">3–18s CPU freeze</span>) in legacy regex; the hardened parser scans once in <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">&lt;200ms</span>.
                    </p>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pt-4 mt-5 border-t border-[var(--border-hairline)] flex flex-wrap gap-1.5">
        {(tab === 'agents'
          ? ['TypeScript', 'Vue 3', 'PostgreSQL', 'MCP', 'In-Memory SQLite', 'n8n']
          : ['Next.js 15', 'React 19', 'Node.js', 'HashiCorp Vault', 'HMAC Blind Index', '23/24 Fixes']
        ).map((t) => (
          <span key={t} className="swiss-tag text-[10px]">
            {t}
          </span>
        ))}
      </div>
    </SpotlightBentoCard>
  );
}
