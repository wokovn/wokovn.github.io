import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database
} from 'lucide-react';
import { GithubIcon } from '../Icons';

export default function DatabaseOptimizationCard({ petcarex }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="neo-card p-5 sm:p-7 bg-white shadow-neo-xl border-2 border-[#121316] space-y-6 flex flex-col justify-between"
    >
      <div className="space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#121316]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl border-2 border-[#121316] bg-neo-green font-bold flex items-center justify-center">
              <Database className="w-5 h-5 text-[#121316]" />
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#121316] tracking-tight">
                Database Architecture &amp; CI Suite
              </h3>
              <p className="text-xs font-mono font-bold text-slate-600">MSSQL 3NF • Vitest • Docker CI</p>
            </div>
          </div>

          {petcarex?.repo && (
            <a
              href={petcarex.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn-secondary text-xs py-1.5 px-2.5"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Architecture Impact Box */}
        <div className="p-3 rounded-xl border-2 border-[#121316] bg-neo-green/10 space-y-1">
          <span className="text-[10px] font-mono font-black text-[#121316] uppercase block">
            CODE QUALITY &amp; DATABASE OPTIMIZATION:
          </span>
          <p className="text-xs text-slate-800 font-medium leading-relaxed">
            Engineered an automated test harness with over <strong>5,600+ test cases</strong>, cutting CI pipeline runtime by 50% (from 352s to 162s) and eliminating B-Tree index fragmentation via Sequential COMB UUIDs.
          </p>
        </div>

        {/* B-Tree Fragmentation Visualizer */}
        <div className="p-3.5 rounded-xl border-2 border-[#121316] bg-[#FFFDF7] shadow-neo-sm space-y-2.5">
          <div className="font-mono text-xs font-bold text-[#121316]">
            SEQUENTIAL COMB UUID vs RANDOM UUID
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span>Sequential COMB UUID (Optimized):</span>
                <span className="font-bold text-emerald-600">0% B-Tree Page Splits</span>
              </div>
              <div className="w-full h-2.5 rounded-full border border-[#121316] bg-slate-100 overflow-hidden">
                <div className="h-full bg-neo-green w-[98%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span>Random UUIDv4 (Standard):</span>
                <span className="font-bold text-rose-600">74% IOPS &amp; RAM Waste</span>
              </div>
              <div className="w-full h-2.5 rounded-full border border-[#121316] bg-slate-100 overflow-hidden">
                <div className="h-full bg-rose-500 w-[74%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Test Harness Stats */}
        <div className="p-3 rounded-xl border-2 border-[#121316] bg-neo-yellow/20 space-y-1 text-xs font-mono">
          <div className="font-bold text-[#121316] flex items-center justify-between">
            <span>5,600+ AUTOMATED TEST SUITE</span>
            <span className="text-emerald-700 font-black">2x SPEEDUP</span>
          </div>
          <p className="text-slate-700 text-[11px] pt-0.5 leading-relaxed">
            Parallel Docker test containers isolate worker environments, cutting full pipeline execution from 352s down to 162s.
          </p>
        </div>

      </div>

      {/* Tech Tags */}
      <div className="pt-3 border-t-2 border-[#121316] flex flex-wrap gap-1.5">
        {['SQL Server', 'Drizzle ORM', 'Vitest', 'Docker', 'Playwright'].map((t, i) => (
          <span key={i} className="neo-tag text-[10px]">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
