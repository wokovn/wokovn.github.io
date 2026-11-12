import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  CheckCircle2,
  ExternalLink,
  FlaskConical,
  Terminal
} from 'lucide-react';
import { GithubIcon } from '../Icons';
import { SpotlightBentoCard } from '../MotionPrimitives';
import { sfx } from '../../utils/sfx';

const K6_PROFILES = {
  load: {
    label: 'LOAD (100 VUs)',
    p95: '6.2ms',
    rps: '412 req/s',
    status: '0.0% Err · Nominal Baseline',
    path: 'M 0 68 L 40 34 L 180 34 L 220 68 L 280 68'
  },
  stress: {
    label: 'STRESS (500 VUs)',
    p95: '8.5ms',
    rps: '1,180 req/s',
    status: 'Zero timeouts under peak concurrency',
    path: 'M 0 68 L 55 48 L 110 28 L 170 12 L 225 12 L 280 68'
  },
  spike: {
    label: 'SPIKE BURST',
    p95: '11.4ms',
    rps: '1,420 req/s',
    status: 'Sudden 5x traffic surge recovery',
    path: 'M 0 68 L 80 64 L 105 8 L 135 8 L 160 64 L 280 64'
  },
  soak: {
    label: 'SOAK ENDURANCE',
    p95: '7.1ms',
    rps: '540 req/s',
    status: 'Flat memory footprint (no leak)',
    path: 'M 0 68 L 25 28 L 255 28 L 280 68'
  }
};

export default function EshopQALab({ eshop }) {
  const [profile, setProfile] = useState('stress');
  const [autoCycle, setAutoCycle] = useState(true);
  const active = K6_PROFILES[profile];

  useEffect(() => {
    if (!autoCycle) return undefined;
    const keys = Object.keys(K6_PROFILES);
    const id = setInterval(() => {
      setProfile((prev) => keys[(keys.indexOf(prev) + 1) % keys.length]);
    }, 2600);
    return () => clearInterval(id);
  }, [autoCycle]);

  return (
    <SpotlightBentoCard className="p-5 sm:p-6 flex flex-col justify-between">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-[var(--border-hairline)]">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-[var(--signal)]">
              LAB 03 // QUALITY ENGINEERING &amp; K6
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight">
              EShop Automated Verification Suite
            </h3>
          </div>

          {eshop?.repo && (
            <a
              href={eshop.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="swiss-btn-secondary py-1.5 px-2.5 text-[11px]"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* 3 Verification Pillars */}
        <div className="grid grid-cols-3 gap-2 font-mono">
          <div className="bento-well p-2.5">
            <div className="text-base font-bold">117 runs</div>
            <div className="text-[10px] text-[var(--text-muted)]">39 Playwright POM</div>
          </div>
          <div className="bento-well p-2.5">
            <div className="text-base font-bold">150+ tests</div>
            <div className="text-[10px] text-[var(--text-muted)]">Newman CI API</div>
          </div>
          <div className="bento-well p-2.5">
            <div className="text-base font-bold text-[var(--signal)]">7 bugs</div>
            <div className="text-[10px] text-[var(--text-muted)]">Defects caught</div>
          </div>
        </div>

        {/* Interactive k6 Profile Curve Switcher */}
        <div className="bento-well p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] font-mono font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[var(--signal)]" />
              <span>K6 LOAD PROFILE SIMULATOR</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(K6_PROFILES).map((k) => (
                <button
                  key={k}
                  onClick={() => {
                    setAutoCycle(false);
                    sfx.playTick(760);
                    setProfile(k);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase ${
                    profile === k
                      ? 'tactile-chip-active'
                      : 'tactile-chip text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          {/* Animated SVG k6 Curve */}
          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3">
            <svg viewBox="0 0 280 76" className="w-full h-20 overflow-visible">
              <line x1="0" y1="68" x2="280" y2="68" stroke="var(--border-hairline)" />
              <line x1="0" y1="34" x2="280" y2="34" stroke="var(--border-hairline)" strokeDasharray="3 3" />
              <motion.path
                key={profile}
                d={active.path}
                fill="none"
                stroke="var(--signal)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-[var(--border-hairline)]">
              <span className="font-bold">{active.label}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                p95 {active.p95} · {active.rps}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>{active.status}</span>
          </div>
        </div>

        {/* CI Pipeline Micro-Log */}
        <div className="rounded-xl border border-[var(--border-strong)] bg-[#0D0D10] text-zinc-200 p-3 font-mono text-[10px] space-y-1">
          <div className="flex items-center justify-between text-zinc-400 pb-1 border-b border-zinc-800">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-[var(--signal)]" />
              <span>github-actions / qa-gate.yml</span>
            </span>
            <span className="text-emerald-400 font-bold">PASSING</span>
          </div>
          <div>✓ playwright test --project=chromium,firefox,webkit (117/117)</div>
          <div>✓ newman run eshop_api_collection.json (150+ assertions)</div>
          <div className="text-emerald-400">✓ k6 run stress_500vu.js → p95: ~8.5ms</div>
        </div>
      </div>

      <div className="pt-4 mt-5 border-t border-[var(--border-hairline)] flex flex-wrap gap-1.5">
        {['Playwright POM', 'Postman', 'Newman', 'k6', 'GitHub Actions', 'Allure'].map((t) => (
          <span key={t} className="swiss-tag text-[10px]">
            {t}
          </span>
        ))}
      </div>
    </SpotlightBentoCard>
  );
}

