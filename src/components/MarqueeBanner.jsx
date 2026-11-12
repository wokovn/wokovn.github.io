import React from 'react';

export default function MarqueeBanner() {
  const items = [
    'TYPESCRIPT & NODE.JS',
    '87.2 RPS @ 350 VUs',
    'REACT 19 / NEXT.JS 15 / VUE 3',
    'MULTI-AGENT ORCHESTRATION (MCP)',
    '5,600+ VITEST + DOCKER CI',
    'VAULT WRAPPED DEK & BLIND INDEX',
    'KUBERNETES HPA AUTOSCALING',
    'PLAYWRIGHT + K6 500 VUs',
    'POSTGRESQL & REDIS LUA'
  ];

  return (
    <div className="w-full border-y border-[var(--border-hairline)] bg-[var(--bg-surface)] py-3 overflow-hidden select-none relative z-20 group">
      <div className="flex w-fit animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap">
        {[...items, ...items, ...items].map((label, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 text-[11px] font-mono font-semibold tracking-wider text-[var(--text-primary)] mx-4 uppercase"
          >
            <span>{label}</span>
            <span className="text-[var(--signal)] font-black">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
