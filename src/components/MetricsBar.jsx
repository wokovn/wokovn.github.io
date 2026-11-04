import React from 'react';
import { Zap, CheckCircle2, Cpu, ShieldCheck, TrendingUp } from 'lucide-react';
import { coreMetrics } from '../data/portfolioData';
import SpotlightCard from './SpotlightCard';

export default function MetricsBar() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'check-circle': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'cpu': return <Cpu className="w-5 h-5 text-brand-cyan" />;
      case 'shield': return <ShieldCheck className="w-5 h-5 text-brand-violet" />;
      default: return <TrendingUp className="w-5 h-5 text-brand-cyan" />;
    }
  };

  return (
    <section id="benchmarks" className="py-14 relative z-10 border-y border-white/[0.06] bg-[#070b14]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-widest">
              <span>// 01. HARD SYSTEM TELEMETRY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Stress-Tested Performance &amp; Production Scale
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-500">
            Automated k6 benchmarks &amp; Docker container test telemetry
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coreMetrics.map((metric, idx) => (
            <SpotlightCard
              key={idx}
              className="p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                  {getIcon(metric.icon)}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-slate-400">
                  {metric.badge}
                </span>
              </div>

              <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
                {metric.value}
              </div>

              <div className="text-sm font-semibold text-slate-200 mt-1">
                {metric.label}
              </div>

              <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                {metric.detail}
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
}
