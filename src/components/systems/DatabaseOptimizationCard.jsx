import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Database, ExternalLink, Plus, RotateCcw } from 'lucide-react';
import { GithubIcon } from '../Icons';
import { SpotlightBentoCard } from '../MotionPrimitives';
import { sfx } from '../../utils/sfx';

export default function DatabaseOptimizationCard({ petcarex }) {
  const [strategy, setStrategy] = useState('comb');
  const [pages, setPages] = useState([95, 92, 88, 35]);
  const [splits, setSplits] = useState(0);
  const [autoCycle, setAutoCycle] = useState(true);

  useEffect(() => {
    if (!autoCycle) return undefined;
    let tick = 0;
    const id = setInterval(() => {
      tick += 1;
      if (tick % 4 === 0) {
        setPages([95, 92, 88, 35]);
        setSplits(0);
        setStrategy('comb');
      } else if (tick % 3 === 0) {
        setStrategy('random');
        setSplits((s) => s + 1);
        setPages([64, 58, 71, 49]);
      } else {
        setStrategy('comb');
        setPages((prev) => {
          const next = [...prev];
          const tailIdx = next.length - 1;
          next[tailIdx] = Math.min(100, next[tailIdx] + 18);
          return next;
        });
      }
    }, 2200);
    return () => clearInterval(id);
  }, [autoCycle]);

  const insertKey = (mode) => {
    setAutoCycle(false);
    setStrategy(mode);
    sfx.playTick(mode === 'comb' ? 780 : 420);
    if (mode === 'comb') {
      setPages((prev) => {
        const next = [...prev];
        const tailIdx = next.length - 1;
        if (next[tailIdx] < 96) {
          next[tailIdx] = Math.min(100, next[tailIdx] + 15);
        } else {
          next.push(25);
          if (next.length > 4) next.shift();
        }
        return next;
      });
    } else {
      setSplits((s) => s + 1);
      setPages((prev) =>
        prev.map((val) => {
          const bumped = val + Math.floor(Math.random() * 24 + 10);
          return bumped > 100 ? Math.floor(Math.random() * 25 + 42) : bumped;
        })
      );
    }
  };

  const resetSim = () => {
    sfx.playTick(540);
    setPages([95, 92, 88, 35]);
    setSplits(0);
    setStrategy('comb');
  };

  return (
    <SpotlightBentoCard className="p-5 sm:p-6 flex flex-col justify-between">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-[var(--border-hairline)]">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-[var(--signal)]">
              LAB 04 // B-TREE &amp; CI CONTAINERIZATION
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight">
              PetCareX Index &amp; Vitest CI Tuning
            </h3>
          </div>

          {petcarex?.repo && (
            <a
              href={petcarex.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="swiss-btn-secondary py-1.5 px-2.5 text-[11px]"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Interactive B-Tree Page Split Simulator */}
        <div className="bento-well p-3.5 space-y-3">
          <div className="flex items-center justify-between text-[10px] font-mono font-bold">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[var(--signal)]" />
              <span>B-TREE LEAF PAGE SIMULATOR</span>
            </span>
            <span className={splits > 0 ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400'}>
              {splits} PAGE SPLITS
            </span>
          </div>

          {/* 4 Live Leaf Pages */}
          <div className="grid grid-cols-4 gap-2 font-mono">
            {pages.map((fill, i) => {
              const fragmented = strategy === 'random' && fill < 72;
              return (
                <div
                  key={i}
                  className="p-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] space-y-1.5"
                >
                  <div className="flex justify-between text-[9px] text-[var(--text-muted)]">
                    <span>PG-0{i + 1}</span>
                    <span className="font-bold text-[var(--text-primary)] tabular-nums">{fill}%</span>
                  </div>
                  <div className="h-14 rounded-lg bg-[var(--bg-well)] flex items-end overflow-hidden p-0.5">
                    <motion.div
                      animate={{ height: `${fill}%` }}
                      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                      className={`w-full rounded-md ${
                        fragmented ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex gap-1.5">
              <button
                onClick={() => insertKey('comb')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--text-primary)] text-[var(--bg-canvas)] font-mono text-[10px] font-bold hover:opacity-90"
              >
                <Plus className="w-3 h-3" />
                <span>Insert COMB UUID</span>
              </button>
              <button
                onClick={() => insertKey('random')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-rose-500/50 text-rose-500 font-mono text-[10px] font-bold hover:bg-rose-500/10"
              >
                <Plus className="w-3 h-3" />
                <span>Insert UUIDv4</span>
              </button>
            </div>
            <button
              onClick={resetSim}
              aria-label="Reset B-Tree pages"
              className="tactile-chip p-1.5 rounded-lg"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5,600+ Vitest Docker Container Isolation */}
        <div className="p-3.5 rounded-xl border border-[var(--border-hairline)] space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[var(--text-muted)]">
              5,600+ VITEST + DOCKER TESTCONTAINERS
            </span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              352s → 162s (-54%)
            </span>
          </div>
          <p className="text-xs font-sans text-[var(--text-muted)] leading-relaxed">
            Isolated per-worker PostgreSQL containers eliminated lock contention across parallel CI threads, while PetCareX normalized 30+ entities in 3NF with composite indexing &amp; triggers.
          </p>
        </div>
      </div>

      <div className="pt-4 mt-5 border-t border-[var(--border-hairline)] flex flex-wrap gap-1.5">
        {['SQL Server', 'Sequential UUID', '3NF Schema', 'Vitest', 'Docker CI'].map((t) => (
          <span key={t} className="swiss-tag text-[10px]">
            {t}
          </span>
        ))}
      </div>
    </SpotlightBentoCard>
  );
}
